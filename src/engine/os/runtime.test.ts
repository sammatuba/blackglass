import { describe, expect, it } from 'vitest'
import {
  applyPushAt,
  applyRule,
  forwardMessage,
  initialOSState,
  markInspected,
  markReplied,
  pendingRules,
  resolveOutcome,
  setCallPhase,
  clearCall,
  evidenceBonus,
  visibleMessages,
  aiRegen,
  aiThumbs,
  currentAnswer,
} from './runtime'
import type { CaseOS, OSMessage, OSState } from './types'

const caseDef: CaseOS = {
  id: 't',
  title: 'T',
  tagline: '',
  blurb: '',
  level: '',
  minutes: '',
  families: [],
  phone: { wallpaper: 'dusk', time: '9:47', meridiem: 'PM', day: 'Tuesday', battery: 80 },
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

  it('forwards a link as a marked copy without touching story flags', () => {
    let s = initialOSState()
    s = markReplied(s, 'scammer', 'r1', 'Who is this?', { d1: 'probe' })
    s = forwardMessage(s, 'other', { pageId: 'pg1', caption: 'from Renz' })
    const thread = visibleMessages(s, 'other')
    expect(thread).toHaveLength(1)
    expect(thread[0].from).toBe('you')
    expect(thread[0].kind).toBe('link')
    expect(thread[0].pageId).toBe('pg1')
    expect(thread[0].caption).toBe('from Renz')
    expect(thread[0].forwarded).toBe(true)
    expect(s.flags).toEqual({ d1: 'probe' })
    expect(s.sentReplies).toEqual(['r1'])
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

  it('cycles assistant regen variants without ever improving the citation', () => {
    let s = initialOSState()
    const msg: OSMessage = {
      id: 'ai1',
      from: 'them',
      kind: 'ai',
      text: 'base answer',
      sources: [{ id: 's1', ref: 'Fake Journal, 2024', detail: 'does not exist', verdict: 'missing' }],
      variants: {
        regen: [
          { text: 'regen one', sources: [{ id: 's2', ref: 'Fake Journal B, 2023', detail: 'also does not exist', verdict: 'missing' }] },
          { text: 'regen two' },
        ],
        thumbs: { text: 'MORE confident base answer' },
      },
    }
    // no variants applied → the base answer
    expect(currentAnswer(msg, s.ai['ai1']).via).toBe('base')
    expect(currentAnswer(msg, s.ai['ai1']).text).toBe('base answer')
    // each regen advances one variant; past the end it clamps to the last
    s = aiRegen(s, 'ai1')
    expect(currentAnswer(msg, s.ai['ai1']).text).toBe('regen one')
    s = aiRegen(s, 'ai1')
    expect(currentAnswer(msg, s.ai['ai1']).text).toBe('regen two')
    s = aiRegen(s, 'ai1')
    expect(currentAnswer(msg, s.ai['ai1']).text).toBe('regen two')
  })

  it('thumbs-up swaps to the more confident answer and raises the ai_thumbs flag', () => {
    let s = initialOSState()
    const msg: OSMessage = {
      id: 'ai2',
      from: 'them',
      kind: 'ai',
      text: 'uncertain answer',
      variants: { thumbs: { text: 'absolutely certain answer' } },
    }
    s = aiThumbs(s, 'ai2')
    const answer = currentAnswer(msg, s.ai['ai2'])
    expect(answer.via).toBe('thumbs')
    expect(answer.text).toBe('absolutely certain answer')
    expect(s.flags['ai_thumbs']).toBe(true)
    // thumbs survives a regen — you chose to be agreed with
    s = aiRegen(s, 'ai2')
    expect(currentAnswer(msg, s.ai['ai2']).via).toBe('thumbs')
  })
})

describe('staged theming (P4)', () => {
  it('starts on the phone\'s declared stage, defaulting to clean', () => {
    expect(initialOSState(caseDef).stage).toBe('clean')
    const dirty: CaseOS = { ...caseDef, phone: { ...caseDef.phone, stage: 'compromised' } }
    expect(initialOSState(dirty).stage).toBe('compromised')
  })

  it('moves the stage when a fired rule carries one', () => {
    let s = initialOSState()
    s = applyRule(s, { id: 'r-stage', when: {}, stage: 'uneasy' })
    expect(s.stage).toBe('uneasy')
    s = applyRule(s, { id: 'r-stage2', when: {}, stage: 'compromised' })
    expect(s.stage).toBe('compromised')
  })

  it('leaves the stage alone when a rule carries none', () => {
    let s = applyRule(initialOSState(), { id: 'r-stage', when: {}, stage: 'uneasy' })
    s = applyRule(s, { id: 'r-plain', when: {}, push: [{ threadId: 'scammer', msg: { text: 'hi' } }] })
    expect(s.stage).toBe('uneasy')
  })
})

describe('dwell triggers (P5)', () => {
  const dwellCase: CaseOS = {
    ...caseDef,
    rules: [
      { id: 'dwell2', when: {}, dwell: 2, push: [{ threadId: 'scammer', msg: { text: 'the phone reaches back' } }] },
      { id: 'after', when: { flag: 'dwell_seen' }, set: { dwell_seen2: true } },
    ],
  }

  it('holds a dwell rule until the idle count is reached', () => {
    let s = initialOSState(dwellCase)
    expect(pendingRules(dwellCase, s).map((r) => r.id)).not.toContain('dwell2')
    s = markInspected(s, 'p1')
    expect(pendingRules(dwellCase, s).map((r) => r.id)).not.toContain('dwell2')
    s = markInspected(s, 'p1') // re-inspecting the same item still counts as a beat
    expect(pendingRules(dwellCase, s).map((r) => r.id)).toContain('dwell2')
  })

  it('counts replies, forwards and ai actions as beats', () => {
    let s = initialOSState(dwellCase)
    s = markReplied(s, 'scammer', 'r1', 'Who is this?')
    s = forwardMessage(s, 'scammer', {})
    s = aiRegen(s, 'm1')
    expect(pendingRules(dwellCase, s).map((r) => r.id)).toContain('dwell2')
    s = applyRule(s, dwellCase.rules[0])
    // one more ai action is a fresh beat, but the rule has fired once — never again
    s = aiThumbs(s, 'm1')
    expect(s.applied).toContain('dwell2')
    expect(pendingRules(dwellCase, s).map((r) => r.id)).not.toContain('dwell2')
  })

  it('fires once and resets the idle clock on every rule fire', () => {
    let s = initialOSState(dwellCase)
    s = markInspected(s, 'p1')
    s = markInspected(s, 'p1')
    s = applyRule(s, dwellCase.rules[0]) // fires: idle resets to 0
    expect(s.idle).toBe(0)
    // the chained rule ('after') needs no beats; firing it also resets the clock
    s = { ...s, flags: { ...s.flags, dwell_seen: true } }
    const ready = pendingRules(dwellCase, s)
    expect(ready.map((r) => r.id)).toEqual(['after'])
    const after = applyRule(s, ready[0])
    expect(after.idle).toBe(0)
  })

  it('reads old saves without the counter as zero, never erroring', () => {
    const old: OSState = { ...initialOSState(dwellCase), idle: undefined }
    expect(pendingRules(dwellCase, old).map((r) => r.id)).not.toContain('dwell2')
  })

  it('reads old saves without the ai record — regen and thumbs never error', () => {
    // persisted payloads from before the field existed arrive without it
    const old: OSState = { ...initialOSState(dwellCase), ai: undefined as unknown as OSState['ai'] }
    const s = aiRegen(old, 'm1')
    expect(s.ai?.['m1']?.regen).toBe(1)
    const s2 = aiThumbs(s, 'm1')
    expect(s2.ai?.['m1']?.thumbs).toBe(true)
    expect(s2.flags['ai_thumbs']).toBe(true)
    // and a save with the record but an unseen message still works
    const s3 = aiThumbs(s2, 'unseen')
    expect(s3.ai?.['unseen']?.thumbs).toBe(true)
  })
})
