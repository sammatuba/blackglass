import { describe, expect, it } from 'vitest'
import { anthologyStamp, countWorkedCases, examStamp, radarStamp, readSeason, type StoreGetter } from './season'

/* the persisted-store parsers: the desk presents records, it never
   invents them — and a worked case is worked even when it scored 0,
   matching the radar store's own semantics (state.test.ts) */

const fake =
  (stores: Record<string, unknown>): StoreGetter =>
  (key) => {
    if (!(key in stores)) return null
    const v = stores[key]
    /* the exam best is stored as a raw string, not JSON — pass it through */
    return typeof v === 'string' ? v : JSON.stringify(v)
  }

const radar = (state: Record<string, unknown>) => fake({ cgAI_scamradar_v1: { state, version: 0 } })

describe('readSeason', () => {
  it('a fresh visitor gets null everywhere', () => {
    expect(readSeason(() => null)).toBeNull()
    expect(radarStamp(() => null)).toBeNull()
    expect(anthologyStamp(() => null)).toBeNull()
    expect(examStamp(() => null)).toBeNull()
  })

  it('a completed zero-point case is worked and stamps the station', () => {
    const rec = readSeason(radar({ totalScore: 0, bestStreak: 0, rounds: 0, cases: { 'on-hold': 0 } }))
    expect(rec?.radar).toEqual({ score: 0, streak: 0, worked: 1 })
    expect(radarStamp(radar({ totalScore: 0, bestStreak: 0, rounds: 0, cases: { 'on-hold': 0 } }))).toBe(
      '0 pts · streak 0×',
    )
  })

  it('a legacy boolean case save still reads as worked', () => {
    expect(countWorkedCases({ voice: true, other: 12 })).toBe(2)
    const rec = readSeason(radar({ totalScore: 0, bestStreak: 0, cases: { voice: true } }))
    expect(rec?.radar?.worked).toBe(1)
  })

  it('an empty store with no record of play stays null', () => {
    expect(readSeason(radar({ totalScore: 0, bestStreak: 0, rounds: 0, cases: {} }))).toBeNull()
  })

  it('the full season reads all three stores', () => {
    const get = fake({
      cgAI_blackglass_v2: { state: { scores: { a: { best: 88 }, b: { best: 71 } } }, version: 0 },
      cgAI_scamradar_v1: { state: { totalScore: 184, bestStreak: 6, rounds: 3, cases: { voice: 47 } }, version: 0 },
      cgAI_tellExam_best: '73',
    })
    const rec = readSeason(get)
    expect(rec?.anthology).toMatchObject({ lived: 2, total: 159 })
    expect(rec?.radar).toMatchObject({ score: 184, streak: 6, worked: 1 })
    expect(rec?.exam).toBe(73)
    expect(anthologyStamp(get)).toBe('159 · WATCHER')
    expect(radarStamp(get)).toBe('184 pts · streak 6×')
    expect(examStamp(get)).toBe('73% best')
  })

  it('a corrupt store degrades quietly', () => {
    expect(readSeason(() => '{not json')).toBeNull()
  })
})
