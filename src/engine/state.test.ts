import { describe, expect, it } from 'vitest'
import {
  blankState,
  entryUnlocked,
  mergeSet,
  needsMet,
  nextFrame,
  resolveDynamic,
} from './state'
import type { Frame, StoryDef } from './types'

const s = blankState()

describe('needsMet', () => {
  it('passes with no needs', () => {
    expect(needsMet(undefined, s)).toBe(true)
    expect(needsMet([], s)).toBe(true)
  })
  it('gates on completed phones', () => {
    const state = { ...blankState(), completed: { maya: true } }
    expect(needsMet(['maya'], state)).toBe(true)
    expect(needsMet(['maya', 'tita'], state)).toBe(false)
  })
  it('gates on recorded choices with key=value', () => {
    const state = { ...blankState(), choices: { decision2: 'verify' } }
    expect(needsMet(['decision2=verify'], state)).toBe(true)
    expect(needsMet(['decision2=pay'], state)).toBe(false)
  })
})

describe('nextFrame', () => {
  const flow: Frame[] = [
    { beats: [] },
    { beats: [], needs: ['locked-phone'] },
    { beats: [] },
    { beats: [], needs: ['never-done'] },
    { beats: [] },
  ]
  it('returns the first visible frame', () => {
    expect(nextFrame(flow, 0, s)).toBe(0)
  })
  it('skips gated frames', () => {
    expect(nextFrame(flow, 1, s)).toBe(2)
  })
  it('returns null when the flow is exhausted', () => {
    expect(nextFrame(flow, 5, s)).toBeNull()
  })
  it('reveals gated frames once needs are met', () => {
    const state = { ...blankState(), completed: { 'locked-phone': true } }
    expect(nextFrame(flow, 1, state)).toBe(1)
  })
})

describe('mergeSet', () => {
  it('merges choice values immutably', () => {
    const merged = mergeSet(s, { key: 'value' })
    expect(merged.choices.key).toBe('value')
    expect(s.choices.key).toBeUndefined()
  })
  it('no-ops on undefined', () => {
    expect(mergeSet(s, undefined)).toBe(s)
  })
})

describe('resolveDynamic', () => {
  it('maps a recorded choice', () => {
    const choices = { sent: 'yes' }
    expect(resolveDynamic('base', { key: 'sent', map: { yes: 'she sent it' } }, choices)).toBe('she sent it')
  })
  it('falls back when the choice is unrecorded or unmapped', () => {
    expect(resolveDynamic('base', { key: 'sent', map: {}, fallback: 'unknown' }, {})).toBe('unknown')
    expect(resolveDynamic('base', undefined, {})).toBe('base')
  })
})

describe('entryUnlocked', () => {
  const story: StoryDef = {
    id: 'x',
    storeKey: 'x',
    title: 'X',
    entry: 'maya',
    order: ['maya', 'bea'],
    phones: {},
  }
  it('unlocks the entry always and others only after it', () => {
    expect(entryUnlocked(story, s, 'maya')).toBe(true)
    expect(entryUnlocked(story, s, 'bea')).toBe(false)
    const done = { ...blankState(), completed: { maya: true } }
    expect(entryUnlocked(story, done, 'bea')).toBe(true)
  })
})
