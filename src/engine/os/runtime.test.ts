import { describe, expect, it } from 'vitest'
import {
  applyPushAt,
  applyRule,
  initialOSState,
  markInspected,
  markReplied,
  pendingRules,
  resolveOutcome,
  setCallPhase,
  clearCall,
  evidenceBonus,
  visibleMessages,
} from './runtime'
import type { CaseOS } from './types'

const caseDef: CaseOS = {
  id: 't',
  title: 'T',
  tagline: '',
  blurb: '',
  level: '',
  minutes: '',
  families: [],
  phone: { wallpaper: 'wall-dusk', time: '9:47', meridiem: 'PM', day: 'Tuesday', battery: 80 },
  contacts: [{ id: 'renz', name: 'Renz', number: '+63 917 555 0143', evidence: 'ev-contact' }],
  threads: [
    { id: 'scammer', service: 'viber', name: 'Renz?', number: '+63 994 000 0000', hue: 220 },
  ],
  opening: [{ threadId: 'scammer', msg: { text: 'Tita it’s me' } }],
  photos: [{ id: 'p1', title: 'accident', kind: 'photo', evidence: 'ev-photo' }],
  pages: [],
  notes: [],
  evidenceLabels: { 'ev-contact': '', 'ev-photo': '', 'ev-script': '' },
  endFlag: 'case-over',
  replies: [
    { id: 'r1', threadId: 'scammer', label: 'Who is this?', set: { d1: 'probe' } },
    { id: 'r2', threadId: 'scammer', requires: 'asked', label: 'Calling the real Renz', set: { d2: 'verify' } },
  ],
  rules: [
    { id: 'a', when: { replySent: 'r1' }, typingIn: 'scammer', push: [{ threadId: 'scammer', msg: { text: 'Tita naman!!' } }], set: { asked: true }, evidence: ['ev-script'] },
    { id: 'b', when: { flag: 'asked' }, incomingCall: { callId: 'c1', from: 'Renz (real)', number: '+63 917 555 0143', direction: 'out' } },
    { id: 'c', when: { call: 'ended', callDeclined: false }, push: [{ threadId: 'scammer', msg: { text: 'Tita?? bakit po??' } }], set: { truth: true } },
  ],
  checklist: [],
  tells: [],
  outcomes: [
    { match: { d1: 'probe', d2: 'verify' }, title: 'Verified', text: '', points: 45 },
    { match: {}, title: 'Fallback', text: '', points: 5 },
  ],
}

describe('glassOS runtime', () => {
  it('opens with the opening pushes pending and empty inboxes', () => {
    const s = initialOSState()
    expect(visibleMessages(s, 'scammer')).toHaveLength(0)
    expect(pendingRules(caseDef, s)).toHaveLength(0)
  })

  it('echoes a sent reply into the thread and records flags', () => {
    let s = initialOSState()
    s = markReplied(s, 'scammer', 'r1', 'Who is this?', { d1: 'probe' })
    const thread = visibleMessages(s, 'scammer')
    expect(thread).toHaveLength(1)
    expect(thread[0].from).toBe('you')
    expect(thread[0].text).toBe('Who is this?')
    expect(s.flags.d1).toBe('probe')
  })

  it('fires a reply-triggered rule chain in author order', () => {
    let s = initialOSState()
    s = markReplied(s, 'scammer', 'r1', 'Who is this?', { d1: 'probe' })
    // rule 'a' (on replySent r1) readies; applying it sets `asked`,
    // which readies rule 'b' on the next pass
    expect(pendingRules(caseDef, s)).toHaveLength(1)
    const ready = [pendingRules(caseDef, s)[0], ...pendingRules(caseDef, applyRule(s, pendingRules(caseDef, s)[0]))]
    expect(ready.map((r) => r.id)).toEqual(['a', 'b'])
    s = applyRule(s, ready[0])
    expect(s.flags.asked).toBe(true)
    expect(s.evidence).toContain('ev-script')
    s = applyPushAt(s, ready[0], 0)
    expect(visibleMessages(s, 'scammer')).toHaveLength(2)
    expect(applyPushAt(s, ready[0], 5)).toBe(s) // out of range is a no-op
    s = applyRule(s, ready[1])
    expect(s.call?.phase).toBe('incoming')
    expect(s.call?.direction).toBe('out')
  })

  it('gates a reply on a required flag', () => {
    const s = initialOSState()
    const offered = caseDef.replies.filter((r) => !r.requires || s.flags[r.requires])
    expect(offered.map((r) => r.id)).toEqual(['r1'])
  })

  it('walks the call lifecycle and unlocks the aftermath', () => {
    let s = applyRule(initialOSState(), caseDef.rules[1])
    s = setCallPhase(s, 'live')
    s = setCallPhase(s, 'ended')
    const ready = pendingRules(caseDef, s)
    expect(ready.map((r) => r.id)).toEqual(['c'])
    s = applyRule(s, ready[0])
    expect(s.flags.truth).toBe(true)
    s = applyPushAt(s, ready[0], 0)
    expect(visibleMessages(s, 'scammer')).toHaveLength(1)
    s = clearCall(s)
    expect(s.call).toBeNull()
  })

  it('collects inspection evidence once and resolves outcomes with fallback', () => {
    let s = initialOSState()
    s = markInspected(s, 'p1', 'ev-photo')
    s = markInspected(s, 'p1', 'ev-photo')
    expect(s.inspected).toEqual(['p1'])
    expect(s.evidence.filter((e) => e === 'ev-photo')).toHaveLength(1)
    s = markReplied(s, 'scammer', 'r1', 'Who is this?', { d1: 'probe' })
    s = markReplied(s, 'scammer', 'r2', 'Calling the real Renz', { d2: 'verify' })
    expect(resolveOutcome(caseDef, s.flags).points).toBe(45)
    expect(resolveOutcome(caseDef, {}).title).toBe('Fallback')
  })

  it('computes the evidence bonus from all case clue sources', () => {
    let s = initialOSState()
    const b0 = evidenceBonus(caseDef, s)
    expect(b0.total).toBe(3) // contact + photo + rule evidence
    expect(b0.bonus).toBe(0)
    s = markInspected(s, 'p1', 'ev-photo')
    s = markInspected(s, 'renz', 'ev-contact')
    s = applyRule(s, { id: 'x', when: {}, evidence: ['ev-script'] })
    const b1 = evidenceBonus(caseDef, s)
    expect(b1.found).toBe(3)
    expect(b1.bonus).toBe(10)
  })
})
