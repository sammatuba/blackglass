import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FlagValue, OSState } from '../../engine/os/types'

/* Anthology progress. Per anchor:
   - completed: which phones have been lived
   - runs: the decision flags recorded in each lived run — the timeline
     epilogue and the convergence finale read them to render your version
   - evidence / inspected: the discovery record of each lived run
   - live: the in-progress glassOS state, so a run resumes where it was left
   cgAI_ prefix per convention. */

export interface AnchorProgress {
  /** phoneId -> lived */
  completed: Record<string, boolean>
  /** phoneId -> final flags of that run (maya_choice, bea_vc, w1…) */
  runs: Record<string, Record<string, FlagValue>>
  /** phoneId -> evidence ids collected in the lived run */
  evidence: Record<string, string[]>
  /** phoneId -> inspected ids (pages, photos…) in the lived run */
  inspected: Record<string, string[]>
  /** phoneId -> in-progress OS state (resumable) */
  live: Record<string, OSState>
}

export function emptyAnchorProgress(): AnchorProgress {
  return { completed: {}, runs: {}, evidence: {}, inspected: {}, live: {} }
}

/** persisted progress can predate any field — read through defaults */
export function anchorProgress(progress: AnchorProgress | undefined): AnchorProgress {
  if (!progress) return emptyAnchorProgress()
  return {
    completed: progress.completed ?? {},
    runs: progress.runs ?? {},
    evidence: progress.evidence ?? {},
    inspected: progress.inspected ?? {},
    live: progress.live ?? {},
  }
}

interface BlackglassState {
  anchors: Record<string, AnchorProgress>
  saveLive: (anchorId: string, phoneId: string, state: OSState) => void
  clearLive: (anchorId: string, phoneId: string) => void
  completePhone: (
    anchorId: string,
    phoneId: string,
    flags: Record<string, FlagValue>,
    evidence: string[],
    inspected: string[],
  ) => void
  reset: () => void
}

const touch = (
  anchors: Record<string, AnchorProgress>,
  anchorId: string,
  fn: (prev: AnchorProgress) => AnchorProgress,
): Record<string, AnchorProgress> => ({
  ...anchors,
  [anchorId]: fn(anchorProgress(anchors[anchorId])),
})

export const useBlackglass = create<BlackglassState>()(
  persist(
    (set) => ({
      anchors: {},
      saveLive: (anchorId, phoneId, state) =>
        set((s) => ({
          anchors: touch(s.anchors, anchorId, (prev) => ({
            ...prev,
            live: { ...prev.live, [phoneId]: state },
          })),
        })),
      clearLive: (anchorId, phoneId) =>
        set((s) => ({
          anchors: touch(s.anchors, anchorId, (prev) => {
            const { [phoneId]: _gone, ...live } = prev.live
            return { ...prev, live }
          }),
        })),
      completePhone: (anchorId, phoneId, flags, evidence, inspected) =>
        set((s) => ({
          anchors: touch(s.anchors, anchorId, (prev) => {
            const { [phoneId]: _gone, ...live } = prev.live
            return {
              ...prev,
              completed: { ...prev.completed, [phoneId]: true },
              runs: { ...prev.runs, [phoneId]: flags },
              evidence: { ...prev.evidence, [phoneId]: evidence },
              inspected: { ...prev.inspected, [phoneId]: inspected },
              live,
            }
          }),
        })),
      reset: () => set({ anchors: {} }),
    }),
    { name: 'cgAI_blackglass_v2' },
  ),
)
