import { describe, expect, it } from 'vitest'
import { nextAmbientBeat, type AmbientGate } from './ambient'
import { initialOSState } from './runtime'
import type { CaseOS } from './types'

const IDLE: AmbientGate = { pumping: false }

const caseDef = {
  id: 'test-case',
  endFlag: 'done_flag',
  ambient: [
    { threadId: 'gc', msg: { from: 'them', text: 'beat one' } },
    { threadId: 'gc', msg: { from: 'them', text: 'beat two' } },
  ],
} as unknown as CaseOS

describe('nextAmbientBeat — the slow-burn delivery contract (review rework 2026-11-14)', () => {
  it('delivers beats in order once the phone is inhabited', () => {
    const st = { ...initialOSState(caseDef), flags: { os_engaged: true } }
    expect(nextAmbientBeat(caseDef, st, IDLE)?.msg.text).toBe('beat one')
    const after = { ...st, ambientIndex: 1 }
    expect(nextAmbientBeat(caseDef, after, IDLE)?.msg.text).toBe('beat two')
  })

  it('nothing lands until the phone is inhabited (os_engaged)', () => {
    expect(nextAmbientBeat(caseDef, initialOSState(caseDef), IDLE)).toBeNull()
  })

  it('resumed runs deliver from the persisted cursor — ambient is not lost on resume', () => {
    // the reviewed defect: the old loop exited early on resume, so a saved
    // ambientIndex of 1 never delivered 'beat two'
    const resumed = { ...initialOSState(caseDef), flags: { os_engaged: true }, ambientIndex: 1 }
    expect(nextAmbientBeat(caseDef, resumed, IDLE)?.msg.text).toBe('beat two')
  })

  it('legacy saves without a cursor start at 0', () => {
    const legacy = { ...initialOSState(caseDef), flags: { os_engaged: true }, ambientIndex: undefined }
    expect(nextAmbientBeat(caseDef, legacy, IDLE)?.msg.text).toBe('beat one')
  })

  it('an exhausted queue is quiet', () => {
    const done = { ...initialOSState(caseDef), flags: { os_engaged: true }, ambientIndex: 2 }
    expect(nextAmbientBeat(caseDef, done, IDLE)).toBeNull()
  })

  it('the world gates hold: moment up, call live, rule burst pumping, case done', () => {
    const st = { ...initialOSState(caseDef), flags: { os_engaged: true } }
    expect(nextAmbientBeat(caseDef, { ...st, moment: 'm1' }, IDLE)).toBeNull()
    expect(nextAmbientBeat(caseDef, { ...st, call: { callId: 'c', from: 'x', number: 'y', direction: 'in', phase: 'live' } }, IDLE)).toBeNull()
    expect(nextAmbientBeat(caseDef, st, { pumping: true })).toBeNull()
    expect(nextAmbientBeat(caseDef, { ...st, flags: { os_engaged: true, done_flag: true } }, IDLE)).toBeNull()
  })

  it('a case without ambient beats is always quiet', () => {
    const bare = { id: 'x', endFlag: 'f' } as unknown as CaseOS
    expect(nextAmbientBeat(bare, { ...initialOSState(bare), flags: { os_engaged: true } }, IDLE)).toBeNull()
  })
})
