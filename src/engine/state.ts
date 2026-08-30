import type { ChoiceValue, Frame, StoryDef } from './types'

/* Pure engine logic — no React, no DOM. Tested in engine.test.ts. */

export interface StoryState {
  completed: Record<string, boolean>
  choices: Record<string, ChoiceValue>
}

export function blankState(): StoryState {
  return { completed: {}, choices: {} }
}

export function needsMet(needs: string[] | undefined, state: StoryState): boolean {
  if (!needs || needs.length === 0) return true
  return needs.every((entry) => {
    const eq = entry.indexOf('=')
    if (eq > 0) {
      // "key=value" gates on a recorded choice
      return String(state.choices[entry.slice(0, eq)]) === entry.slice(eq + 1)
    }
    return !!state.completed[entry]
  })
}

/**
 * Index of the next visible frame at or after `from`, or null when the
 * flow is exhausted (frames gated on unmet `needs` are skipped).
 */
export function nextFrame(flow: Frame[], from: number, state: StoryState): number | null {
  let idx = from
  while (idx < flow.length) {
    if (needsMet(flow[idx].needs, state)) return idx
    idx++
  }
  return null
}

export function isEndBeat(b: unknown): b is { t: 'end'; kind?: string } {
  return (b as { t?: string })?.t === 'end'
}

export function mergeSet(
  state: StoryState,
  set: Record<string, ChoiceValue> | undefined,
): StoryState {
  if (!set) return state
  return { ...state, choices: { ...state.choices, ...set } }
}

/** Resolve a dynamic timeline text against recorded choices. */
export function resolveDynamic(
  text: string,
  dynamic: { key: string; map: Record<string, string>; fallback?: string } | undefined,
  choices: Record<string, ChoiceValue>,
): string {
  if (!dynamic) return text
  const v = choices[dynamic.key]
  return (v != null && dynamic.map[String(v)]) || dynamic.fallback || text
}

/** localStorage-backed store, namespaced per story with the cgAI_ prefix. */
const PREFIX = 'cgAI_'

export function loadStoryState(storeKey: string): StoryState {
  try {
    const raw = localStorage.getItem(PREFIX + storeKey)
    if (!raw) return blankState()
    const parsed = JSON.parse(raw) as Partial<StoryState>
    return {
      completed: parsed.completed ?? {},
      choices: parsed.choices ?? {},
    }
  } catch {
    return blankState()
  }
}

export function saveStoryState(storeKey: string, state: StoryState): void {
  try {
    localStorage.setItem(PREFIX + storeKey, JSON.stringify(state))
  } catch {
    /* private mode / storage full — play session-only */
  }
}

export function clearStoryState(storeKey: string): void {
  try {
    localStorage.removeItem(PREFIX + storeKey)
  } catch {
    /* ignore */
  }
}

export function entryUnlocked(story: StoryDef, state: StoryState, phoneId: string): boolean {
  return phoneId === story.entry || !!state.completed[story.entry]
}
