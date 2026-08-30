import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FamilyId } from './families'

export type ReadQuality = 'hit' | 'partial' | 'miss'

export interface FamilyRecord {
  seen: number
  hit: number
}

interface RadarState {
  totalScore: number
  bestStreak: number
  rounds: number
  family: Record<FamilyId, FamilyRecord>
  cases: Record<string, boolean>
  /** record one judged item; hitFamilies = families judged correctly */
  addResult: (args: {
    families: FamilyId[]
    hitFamilies: FamilyId[]
    points: number
    streak: number
  }) => void
  completeCase: (id: string, points: number) => void
  reset: () => void
}

const emptyFamily = {
  urgency: { seen: 0, hit: 0 },
  authority: { seen: 0, hit: 0 },
  payment: { seen: 0, hit: 0 },
  toogood: { seen: 0, hit: 0 },
  emotion: { seen: 0, hit: 0 },
  channel: { seen: 0, hit: 0 },
}

export const useRadar = create<RadarState>()(
  persist(
    (set) => ({
      totalScore: 0,
      bestStreak: 0,
      rounds: 0,
      family: { ...emptyFamily },
      cases: {},
      addResult: ({ families, hitFamilies, points, streak }) =>
        set((s) => {
          const family = { ...s.family }
          for (const f of families) {
            const rec = family[f] ?? { seen: 0, hit: 0 }
            family[f] = {
              seen: rec.seen + 1,
              hit: rec.hit + (hitFamilies.includes(f) ? 1 : 0),
            }
          }
          return {
            family,
            totalScore: s.totalScore + points,
            bestStreak: Math.max(s.bestStreak, streak),
          }
        }),
      completeCase: (id, points) =>
        set((s) => ({
          cases: { ...s.cases, [id]: true },
          totalScore: s.totalScore + points,
        })),
      reset: () => set({ totalScore: 0, bestStreak: 0, rounds: 0, family: { ...emptyFamily }, cases: {} }),
    }),
    { name: 'cgAI_scamradar_v1' },
  ),
)
