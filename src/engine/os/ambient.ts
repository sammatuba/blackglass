/* The ambient channel's scheduling decision — pure, so the slow-burn
   contract is unit-testable (review finding 2026-11-14: resume semantics
   were untested and the Device loop skipped ambient entirely on resumed
   runs; the loop must consult the persisted ambientIndex instead). */

import type { CaseOS, OSPush, OSState } from './types'

/** external world-state the pump layer owns (single-flight, etc.) */
export interface AmbientGate {
  /** a rule burst owns the world — the beat waits and re-tries */
  pumping: boolean
}

/** the next ambient beat to land, or null when the channel is quiet:
    exhausted, gated by a moment/call/burst, the endFlag set, or the
    phone not yet inhabited (os_engaged). Resumed runs deliver from the
    persisted ambientIndex; legacy saves without one start at 0. */
export function nextAmbientBeat(caseDef: CaseOS, state: OSState, gate: AmbientGate): OSPush | null {
  const beats = caseDef.ambient
  if (!beats?.length) return null
  if (state.done || state.flags[caseDef.endFlag]) return null
  if (state.moment || state.call || gate.pumping) return null
  if (!state.flags.os_engaged) return null
  const i = state.ambientIndex ?? 0
  return beats[i] ?? null
}
