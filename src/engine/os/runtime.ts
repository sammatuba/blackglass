import type { FlagValue, OSMessage, OSRule, OSState, CaseOS, OSSource } from './types'

/* Pure rule engine for glassOS. A rule fires when every `when`
   condition holds; firing appends messages to thread inboxes (after a
   typing beat, paced by the UI layer), sets flags, collects evidence,
   and may raise a call. Pure logic — tested in runtime.test.ts. */

let pushSeq = 0

export function initialOSState(caseDef?: CaseOS): OSState {
  return {
    inbox: {},
    flags: { ...(caseDef?.initialFlags ?? {}) },
    applied: [],
    sentReplies: [],
    inspected: [],
    evidence: [],
    ai: {},
    call: null,
    moment: null,
    stage: caseDef?.phone?.stage ?? 'clean',
    idle: 0,
    done: false,
  }
}

/** close the active prose interstitial (the rule pump resumes) and mark
    it seen — rules key on `dismissed:<id>` to continue after a moment */
export function dismissMoment(state: OSState): OSState {
  const id = state.moment
  if (!id) return state
  return { ...state, moment: null, flags: { ...state.flags, [`dismissed:${id}`]: true } }
}

function condMet(rule: OSRule, state: OSState): boolean {
  const w = rule.when
  if (w.flag && !state.flags[w.flag]) return false
  if (w.allFlags?.some((f) => !state.flags[f])) return false
  if (w.notFlag && state.flags[w.notFlag]) return false
  if (w.replySent && !state.sentReplies.includes(w.replySent)) return false
  if (w.call && (!state.call || state.call.phase !== w.call)) return false
  if (w.callDeclined != null) {
    if (!state.call || Boolean(state.call.declined) !== Boolean(w.callDeclined)) return false
  }
  if (w.inspected && !state.inspected.includes(w.inspected)) return false
  // dwell (P5): needs N idle player beats since the last rule fired.
  // Old saves predate the counter — they read as 0, never error.
  if (rule.dwell != null && (state.idle ?? 0) < rule.dwell) return false
  return true
}

/** every rule whose conditions hold and that hasn't fired yet, in
    author order — branches stay independent because readiness is
    per-rule, not positional */
export function pendingRules(caseDef: CaseOS, state: OSState): OSRule[] {
  return caseDef.rules.filter((r) => !state.applied.includes(r.id) && condMet(r, state))
}

function appendMsg(
  state: OSState,
  threadId: string,
  msg: Omit<OSMessage, 'id' | 'from'> & { from?: OSMessage['from'] },
): OSState {
  const delivered: OSMessage = {
    ...msg,
    id: `p${++pushSeq}`,
    from: msg.from ?? 'them',
  } as OSMessage
  return {
    ...state,
    inbox: {
      ...state.inbox,
      [threadId]: [...(state.inbox[threadId] ?? []), delivered],
    },
  }
}

/** apply a rule's state effects — flags, evidence, incoming call —
    but NOT message pushes (the UI lands those after its typing beat) */
export function applyRule(state: OSState, rule: OSRule): OSState {
  let s: OSState = {
    ...state,
    inbox: { ...state.inbox },
    flags: { ...state.flags },
    applied: [...state.applied, rule.id],
    sentReplies: [...state.sentReplies],
    inspected: [...state.inspected],
    evidence: [...state.evidence],
    // the world just spoke: the idle clock restarts (dwell counts beats
    // the player acts without new story beats)
    idle: 0,
  }
  if (rule.stage) s.stage = rule.stage
  if (rule.set) s.flags = { ...s.flags, ...rule.set }
  if (rule.evidence) {
    for (const e of rule.evidence) if (!s.evidence.includes(e)) s.evidence.push(e)
  }
  if (rule.incomingCall) {
    s.call = {
      callId: rule.incomingCall.callId,
      from: rule.incomingCall.from,
      number: rule.incomingCall.number,
      sub: rule.incomingCall.sub,
      direction: rule.incomingCall.direction,
      transcript: rule.incomingCall.transcript,
      phase: 'incoming',
    }
  }
  if (rule.endCall && s.call) {
    s.call = { ...s.call, phase: 'ended' }
  }
  if (rule.moment) s.moment = rule.moment
  return s
}

/** land exactly one message push (called after its delivery delay) */
export function applyPushAt(state: OSState, rule: OSRule, index: number): OSState {
  const p = rule.push?.[index]
  if (!p) return state
  return appendMsg(state, p.threadId, p.msg)
}

/** one more idle player beat (P5 dwell): replies, inspections, forwards,
    ai actions — anything the player does while the world stays quiet */
function beat(state: OSState): OSState {
  return { ...state, idle: (state.idle ?? 0) + 1 }
}

/** a player beat that isn't a state mutation — opening a thread or an app.
    The Device layer calls this so "the player is poking around" counts too. */
export function markBeat(state: OSState): OSState {
  return beat(state)
}

/** the player sends a suggested reply: record it + echo it into the thread */
export function markReplied(state: OSState, threadId: string, replyId: string, label: string, set?: Record<string, FlagValue>): OSState {
  const withEcho = beat(appendMsg(state, threadId, { from: 'you', text: label }))
  return {
    ...withEcho,
    sentReplies: [...withEcho.sentReplies, replyId],
    flags: set ? { ...withEcho.flags, ...set } : withEcho.flags,
  }
}

export function markInspected(state: OSState, id: string, evidence?: string): OSState {
  const inspected = state.inspected.includes(id) ? state.inspected : [...state.inspected, id]
  const ev = evidence && !state.evidence.includes(evidence) ? [...state.evidence, evidence] : state.evidence
  return beat({ ...state, inspected, evidence: ev })
}

/** the player forwards a link: a marked copy lands in the target thread.
    Pure expression — it sets no flags, so authored branches stay intact */
export function forwardMessage(state: OSState, toThreadId: string, link: { pageId?: string; caption?: string }): OSState {
  return beat(
    appendMsg(state, toThreadId, {
      from: 'you',
      kind: 'link',
      pageId: link.pageId,
      caption: link.caption,
      forwarded: true,
    }),
  )
}

/** the answer currently displayed for an assistant message, given the
    applied variants — regen cycles, thumbs-up swaps to the confident one */
export function currentAnswer(
  msg: OSMessage,
  ai?: OSState['ai'][string],
): { text: string; sources?: OSSource[]; via: 'base' | 'regen' | 'thumbs' } {
  const v = msg.variants
  if (ai?.thumbs && v?.thumbs) return { ...v.thumbs, via: 'thumbs' }
  if (v?.regen?.length && ai?.regen) {
    const pick = v.regen[Math.min(ai.regen, v.regen.length) - 1]
    if (pick) return { ...pick, via: 'regen' }
  }
  return { text: msg.text ?? '', sources: msg.sources, via: 'base' }
}

/** regenerate an assistant answer: cycle its regen variants (the citation
    never improves — it just comes back wearing different confidence).
    Old saves predate the `ai` record — they read as empty, never error. */
export function aiRegen(state: OSState, msgId: string): OSState {
  const ai = state.ai ?? {}
  const applied = ai[msgId]?.regen ?? 0
  return beat({ ...state, ai: { ...ai, [msgId]: { ...ai[msgId], regen: applied + 1 } } })
}

/** thumbs-up an assistant answer: it comes back more confident — and the
    phone remembers you liked being agreed with (flag, so content can hear it) */
export function aiThumbs(state: OSState, msgId: string): OSState {
  const ai = state.ai ?? {}
  return beat({
    ...state,
    flags: { ...state.flags, ai_thumbs: true },
    ai: { ...ai, [msgId]: { ...ai[msgId], thumbs: true } },
  })
}

/** the player dials a recent call back — the far side rings; what answers
    is authored (transcript lines connect, or nobody picks up). A beat: the
    phone leaves your hand for a moment. */
export function dialCall(
  state: OSState,
  call: { callId: string; from: string; number: string; transcript?: string[] },
): OSState {
  return beat({
    ...state,
    call: { ...call, direction: 'out' as const, phase: 'incoming' as const },
  })
}

export function setCallPhase(state: OSState, phase: 'incoming' | 'live' | 'ended', declined = false): OSState {
  if (!state.call) return state
  return { ...state, call: { ...state.call, phase, declined: declined || state.call.declined } }
}

export function clearCall(state: OSState): OSState {
  return { ...state, call: null }
}

export function visibleMessages(state: OSState, threadId: string): OSMessage[] {
  return state.inbox[threadId] ?? []
}

/** outcome lookup on the recorded decision flags (first match wins) */
export function resolveOutcome(caseDef: CaseOS, flags: Record<string, FlagValue>) {
  return (
    caseDef.outcomes?.find((o) =>
      Object.entries(o.match).every(([k, v]) => String(flags[k]) === String(v)),
    ) ?? caseDef.outcomes?.[caseDef.outcomes.length - 1] ?? { match: {}, title: '—', text: '', points: 0 }
  )
}

/** every collectible evidence id in a case, deduped */
export function evidenceIds(caseDef: CaseOS): string[] {
  const clues: string[] = []
  for (const p of caseDef.photos) if (p.evidence) clues.push(p.evidence)
  for (const pg of caseDef.pages) if (pg.evidence) clues.push(pg.evidence)
  for (const c of caseDef.contacts) {
    if (c.evidence) clues.push(c.evidence)
    for (const x of c.xrefs ?? []) if (x.evidence) clues.push(x.evidence)
  }
  for (const v of caseDef.voicemails ?? []) if (v.evidence) clues.push(v.evidence)
  for (const r of caseDef.wallet?.rows ?? []) if (r.evidence) clues.push(r.evidence)
  for (const r of caseDef.rules) for (const e of r.evidence ?? []) clues.push(e)
  return [...new Set(clues)]
}

export const EVIDENCE_BONUS_CAP = 10
export function evidenceBonus(caseDef: CaseOS, state: OSState): { found: number; total: number; bonus: number } {
  const unique = evidenceIds(caseDef)
  const found = unique.filter((id) => state.evidence.includes(id)).length
  return { found, total: unique.length, bonus: Math.round((found / Math.max(1, unique.length)) * EVIDENCE_BONUS_CAP) }
}
