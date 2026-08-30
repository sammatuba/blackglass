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
 * available), weighted toward the families you've mastered least.
 */
export function buildRound(family: Record<FamilyId, FamilyRecord>, n = 10): FeedItem[] {
  const quota: Record<string, number> = { scam: 5, legit: 3, verify: 2 }
  const picked: FeedItem[] = []
  for (const verdict of ['scam', 'legit', 'verify'] as const) {
    const pool = shuffle(FEED_ITEMS.filter((i) => i.verdict === verdict))
    pool.sort((a, b) => familyMastery(family, a) - familyMastery(family, b))
    picked.push(...pool.slice(0, quota[verdict]))
  }
  // shuffle while keeping at least one read before the first verify
  return shuffle(picked).slice(0, n)
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
