import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FlagValue } from '../../engine/os/types'

/* Anthology progress. Per anchor: which phones have been lived and the
   decision flags recorded in each run — the timeline epilogue reads
   them to render your version of events. cgAI_ prefix per convention. */

interface AnchorProgress {
  /** phoneId -> lived */
  completed: Record<string, boolean>
  /** phoneId -> final flags of that run (maya_choice, bea_vc, w1…) */
  runs: Record<string, Record<string, FlagValue>>
}

interface BlackglassState {
  anchors: Record<string, AnchorProgress>
  completePhone: (anchorId: string, phoneId: string, flags: Record<string, FlagValue>) => void
  reset: () => void
}

export const useBlackglass = create<BlackglassState>()(
  persist(
    (set) => ({
      anchors: {},
      completePhone: (anchorId, phoneId, flags) =>
        set((s) => {
          const prev = s.anchors[anchorId] ?? { completed: {}, runs: {} }
          return {
            anchors: {
              ...s.anchors,
              [anchorId]: {
                completed: { ...prev.completed, [phoneId]: true },
                runs: { ...prev.runs, [phoneId]: flags },
              },
            },
          }
        }),
      reset: () => set({ anchors: {} }),
    }),
    { name: 'cgAI_blackglass_v2' },
  ),
)
