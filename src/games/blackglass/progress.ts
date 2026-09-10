import type { FlagValue } from '../../engine/os/types'
import { evidenceIds } from '../../engine/os/runtime'
import { anchorProgress, type AnchorProgress } from './state'
import type { AnthologyAnchor } from './types'

/* Pure progress + finale resolution helpers. The anthology screens and
   the convergence read through these; unit-tested in progress.test.ts. */

export interface DiscoveryStats {
  phones: number
  lived: number
  clues: number
  cluesTotal: number
}

/** a decision flag recorded in any run (across anchors when given all runs) */
export function findChoice(
  runs: Record<string, Record<string, FlagValue>>,
  key: string,
): FlagValue | undefined {
  for (const run of Object.values(runs)) if (run[key] !== undefined) return run[key]
  return undefined
}

/** merge every anchor's recorded runs — convergence choice keys are unique */
export function allRuns(
  anchorsProgress: Record<string, AnchorProgress>,
): Record<string, Record<string, FlagValue>> {
  const merged: Record<string, Record<string, FlagValue>> = {}
  for (const [anchorId, p] of Object.entries(anchorsProgress)) {
    for (const [phoneId, run] of Object.entries(anchorProgress(p).runs)) {
      merged[`${anchorId}:${phoneId}`] = run
    }
  }
  return merged
}

export function anchorStats(anchor: AnthologyAnchor, progress?: AnchorProgress): DiscoveryStats {
  const p = anchorProgress(progress)
  const cluesTotal = anchor.order.reduce((n, id) => n + evidenceIds(anchor.phones[id]).length, 0)
  const clues = anchor.order.reduce((n, id) => n + (p.evidence[id]?.length ?? 0), 0)
  return {
    phones: anchor.order.length,
    lived: anchor.order.filter((id) => p.completed[id]).length,
    clues,
    cluesTotal,
  }
}

export function globalStats(
  anchors: AnthologyAnchor[],
  anchorsProgress: Record<string, AnchorProgress>,
): DiscoveryStats {
  return anchors.reduce<DiscoveryStats>(
    (acc, a) => {
      const s = anchorStats(a, anchorsProgress[a.id])
      return {
        phones: acc.phones + s.phones,
        lived: acc.lived + s.lived,
        clues: acc.clues + s.clues,
        cluesTotal: acc.cluesTotal + s.cluesTotal,
      }
    },
    { phones: 0, lived: 0, clues: 0, cluesTotal: 0 },
  )
}

export function allPhonesLived(
  anchors: AnthologyAnchor[],
  anchorsProgress: Record<string, AnchorProgress>,
): boolean {
  const s = globalStats(anchors, anchorsProgress)
  return s.phones > 0 && s.lived === s.phones
}

/** phones picked up but not finished — the rack offers Continue for these */
export function livePhones(anchor: AnthologyAnchor, progress?: AnchorProgress): string[] {
  const p = anchorProgress(progress)
  return anchor.order.filter((id) => p.live[id] && !p.completed[id])
}

/** dynamic timeline line: the recorded choice, else the authored fallback */
export function choiceText(
  event: { dynamic?: { key: string; fallback: string; map: Record<string, string> } },
  runs: Record<string, Record<string, FlagValue>>,
): string | undefined {
  if (!event.dynamic) return undefined
  const chosen = findChoice(runs, event.dynamic.key)
  if (chosen === undefined) return event.dynamic.fallback
  return event.dynamic.map[String(chosen)] ?? event.dynamic.fallback
}
