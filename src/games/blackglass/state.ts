import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FlagValue } from '../../engine/os/types'

/* Anthology progress. Per anchor: which phones have been lived and what
   was decided in them (choices carry into the other phones and the
   timeline epilogue). cgAI_ prefix per platform convention. */

interface AnchorProgress {
  /** phoneId -> lived */
  completed: Record<string, boolean>
  /** decision flags recorded across runs (maya_choice, tita_choice, …) */
  choices: Record<string, FlagValue>
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
          const prev = s.anchors[anchorId] ?? { completed: {}, choices: {} }
          const choices = { ...prev.choices }
          for (const [k, v] of Object.entries(flags)) if (k.endsWith('_choice')) choices[k] = v
          return {
            anchors: {
              ...s.anchors,
              [anchorId]: { completed: { ...prev.completed, [phoneId]: true }, choices },
            },
          }
        }),
      reset: () => set({ anchors: {} }),
    }),
    { name: 'cgAI_blackglass_v1' },
  ),
)
