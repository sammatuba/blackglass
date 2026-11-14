import type { FamilyId } from '../families'
import type { FeedItem } from './items'
import { FEED_ITEMS } from './items'
import type { FamilyRecord } from '../state'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** lower = less practiced; unseen families sort first */
function familyMastery(family: Record<FamilyId, FamilyRecord>, item: FeedItem): number {
  if (item.families.length === 0) return 1 // legit items are neutral
  let worst = 1
  for (const f of item.families) {
    const rec = family[f] ?? { seen: 0, hit: 0 }
    const m = rec.seen === 0 ? 0 : rec.hit / rec.seen
    worst = Math.min(worst, m)
  }
  return worst
}

/**
 * A round = 10 reads: 5 scams, 3 legit, 2 verify (clamped to what's
 * available), weighted toward the families you've mastered least, ordered
 * so the shift opens easy (levels ascend within shuffled groups) and the
 * subtlest verdict (verify) never opens the round.
 *
 * opts.warmup — the player's FIRST shift is a short, gentle teach: 3 reads
 * (2 classic scams + 1 legit), no verify verdict, scams from level 1 only.
 * The ease-in the design assessment asked for; verified by the review
 * rework (2026-11-14), which caught the ordering-only version as too thin.
 */
export function buildRound(
  family: Record<FamilyId, FamilyRecord>,
  n = 10,
  opts: { warmup?: boolean } = {},
): FeedItem[] {
  const quota: Record<string, number> = opts.warmup
    ? { scam: 2, legit: 1, verify: 0 }
    : { scam: 5, legit: 3, verify: 2 }
  const maxLevel = opts.warmup ? 1 : 3
  const picked: FeedItem[] = []
  for (const verdict of ['scam', 'legit', 'verify'] as const) {
    const pool = shuffle(FEED_ITEMS.filter((i) => i.verdict === verdict && i.level <= maxLevel))
    pool.sort((a, b) => familyMastery(family, a) - familyMastery(family, b))
    picked.push(...pool.slice(0, quota[verdict]))
  }
  // open easy: shuffle within each level, then levels ascend
  const levels = [1, 2, 3]
  const ordered = levels.flatMap((lv) => shuffle(picked.filter((i) => i.level === lv)))
  // warm-up invariant: at least one read before the first verify
  const firstVerify = ordered.findIndex((i) => i.verdict === 'verify')
  if (firstVerify === 0) {
    const swap = ordered.findIndex((i) => i.verdict !== 'verify')
    if (swap > 0) [ordered[0], ordered[swap]] = [ordered[swap], ordered[0]]
  }
  return ordered.slice(0, n)
}

export interface AnswerResult {
  quality: 'hit' | 'partial' | 'miss'
  points: number
  /** families the player correctly engaged with */
  hitFamilies: FeedItem['families']
  banner: string
}

export const VERDICT_PAIRS: [string, string][] = [
  ['scam', 'verify'],
  ['verify', 'scam'],
  /* verify-first on a genuinely legit message is over-caution, not a miss:
     the pause is the habit the game teaches — it earns half credit
     (fixed 2026-11-13; the old table punished the taught reflex). Pairs are
     [answer, correct verdict]. */
  ['verify', 'legit'],
]

export function judge(item: FeedItem, answer: FeedItem['verdict'], streak: number): AnswerResult {
  if (answer === item.verdict) {
    const points = 10 + Math.min(streak, 5) * 2
    return { quality: 'hit', points, hitFamilies: item.families, banner: 'Scam-ready read ✓' }
  }
  const pair: [string, string] = [answer, item.verdict]
  const adjacent = VERDICT_PAIRS.some(([a, b]) => a === pair[0] && b === pair[1])
  if (adjacent) {
    return {
      quality: 'partial',
      points: 5,
      hitFamilies: item.families,
      banner: 'Right instinct — half read',
    }
  }
  return { quality: 'miss', points: 0, hitFamilies: [], banner: 'Missed read' }
}

/* ---- the round's /100 signal ----
   The desk grade measures the reads you made, so the denominator is
   the maximum still available at the moment each read was answered —
   streak bonus included on both sides. A perfect round reads 100. */

/** most points one read can earn at the current streak */
export function readMax(streak: number): number {
  return 10 + 2 * Math.min(streak, 5)
}

/** the round signal: earned points over the honest maximum, as /100 */
export function signalFor(points: number, max: number): number {
  return max > 0 ? Math.min(100, Math.round((points / max) * 100)) : 0
}
