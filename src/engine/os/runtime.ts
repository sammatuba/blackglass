import type { FlagValue, OSMessage, OSRule, OSState, CaseOS } from './types'

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
    call: null,
    moment: null,
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
  }
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

/** the player sends a suggested reply: record it + echo it into the thread */
export function markReplied(state: OSState, threadId: string, replyId: string, label: string, set?: Record<string, FlagValue>): OSState {
  const withEcho = appendMsg(state, threadId, { from: 'you', text: label })
  return {
    ...withEcho,
    sentReplies: [...withEcho.sentReplies, replyId],
    flags: set ? { ...withEcho.flags, ...set } : withEcho.flags,
  }
}

export function markInspected(state: OSState, id: string, evidence?: string): OSState {
  const inspected = state.inspected.includes(id) ? state.inspected : [...state.inspected, id]
  const ev = evidence && !state.evidence.includes(evidence) ? [...state.evidence, evidence] : state.evidence
  return { ...state, inspected, evidence: ev }
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

export const EVIDENCE_BONUS_CAP = 10
export function evidenceBonus(caseDef: CaseOS, state: OSState): { found: number; total: number; bonus: number } {
  const clues: string[] = []
  for (const p of caseDef.photos) if (p.evidence) clues.push(p.evidence)
  for (const pg of caseDef.pages) if (pg.evidence) clues.push(pg.evidence)
  for (const c of caseDef.contacts) if (c.evidence) clues.push(c.evidence)
  for (const v of caseDef.voicemails ?? []) if (v.evidence) clues.push(v.evidence)
  for (const r of caseDef.rules) for (const e of r.evidence ?? []) clues.push(e)
  const unique = [...new Set(clues)]
  const found = unique.filter((id) => state.evidence.includes(id)).length
  return { found, total: unique.length, bonus: Math.round((found / Math.max(1, unique.length)) * EVIDENCE_BONUS_CAP) }
}
