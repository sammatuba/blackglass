/* The cross-suite season record, read straight from each game's persisted
   store. Pure and injectable (tests pass a fake getter) so the zero-point
   and legacy record shapes stay covered — a completed case is worked even
   when it scored 0, matching the radar store's own semantics. */

import { rankFor } from '../games/shared/grade'

export type StoreGetter = (key: string) => string | null

const fromLocalStorage: StoreGetter = (key) => localStorage.getItem(key)

export interface SeasonRecord {
  anthology: { lived: number; total: number; rank: string } | null
  radar: { score: number; streak: number; worked: number } | null
  exam: number | null
}

/** count worked case records — `true` (legacy saves) and numbers (best
    points, including 0) both mean the case was worked */
export function countWorkedCases(cases: unknown): number {
  if (!cases || typeof cases !== 'object') return 0
  return Object.values(cases as Record<string, unknown>).filter(
    (v) => v === true || typeof v === 'number',
  ).length
}

export function readSeason(get: StoreGetter = fromLocalStorage): SeasonRecord | null {
  const rec: SeasonRecord = { anthology: null, radar: null, exam: null }
  try {
    const bg = JSON.parse(get('cgAI_blackglass_v2') ?? 'null') as
      | { state?: { scores?: Record<string, { best?: number }> } }
      | null
    const scores = bg?.state?.scores
    if (scores) {
      const lived = Object.keys(scores).length
      const total = Object.values(scores).reduce((n, r) => n + (r.best ?? 0), 0)
      if (lived > 0) rec.anthology = { lived, total, rank: rankFor(total, lived) }
    }
    const rd = JSON.parse(get('cgAI_scamradar_v1') ?? 'null') as
      | { state?: { totalScore?: number; bestStreak?: number; rounds?: number; cases?: unknown } }
      | null
    const rs = rd?.state
    if (rs) {
      const worked = countWorkedCases(rs.cases)
      const played = (rs.totalScore ?? 0) > 0 || (rs.rounds ?? 0) > 0 || worked > 0
      if (played) rec.radar = { score: rs.totalScore ?? 0, streak: rs.bestStreak ?? 0, worked }
    }
    const ex = Number(get('cgAI_tellExam_best') ?? '')
    if (Number.isFinite(ex) && ex > 0) rec.exam = ex
  } catch {
    /* private mode or a partial write: the strip stays quiet */
  }
  if (!rec.anthology && !rec.radar && !rec.exam) return null
  return rec
}

/* ——— station stamps: one line per desk station ——— */

export function anthologyStamp(get: StoreGetter = fromLocalStorage): string | null {
  const rec = readSeason(get)?.anthology
  return rec ? `${rec.total} · ${rec.rank}` : null
}

export function radarStamp(get: StoreGetter = fromLocalStorage): string | null {
  const rec = readSeason(get)?.radar
  return rec ? `${rec.score} pts · streak ${rec.streak}×` : null
}

export function examStamp(get: StoreGetter = fromLocalStorage): string | null {
  const rec = readSeason(get)?.exam
  return rec != null ? `${rec}% best` : null
}
