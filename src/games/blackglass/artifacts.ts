/* Diegetic artifact registry. Files live in public/artifacts/ — ONE dist copy
   shared with the legacy mirror (dedupe decision 2026-10-04), synced by
   scripts/sync-artifacts.mjs which also emits artifact-list.ts (id → formats
   present). Resolution rules:

     - still/poster: .webp when synced (canonical, precached), else .png
     - clip: .mp4/.webm when present — a page plays for real only then
     - unknown id → undefined, content falls back to the CSS/emoji presentation */

import { ARTIFACT_FORMATS } from './artifact-list'

const BASE = `${import.meta.env.BASE_URL}artifacts/`

/** resolved still/poster URL for an artifact id, or undefined when not generated yet */
export function artifactUrl(id?: string): string | undefined {
  if (!id) return undefined
  const fmts = ARTIFACT_FORMATS[id]
  if (!fmts) return undefined
  if (fmts.includes('webp')) return `${BASE}${id}.webp`
  if (fmts.includes('png')) return `${BASE}${id}.png`
  return undefined
}

/** resolved clip URL for an artifact id, or undefined when no clip exists yet */
export function artifactVideo(id?: string): string | undefined {
  if (!id) return undefined
  const fmts = ARTIFACT_FORMATS[id]
  if (!fmts) return undefined
  const clip = fmts.find((f) => f === 'mp4' || f === 'webm')
  return clip ? `${BASE}${id}.${clip}` : undefined
}

/* Voice notes — real audio behind the chat's voice-message chrome.
   mp3/wav/ogg land in public/voicenotes/ via the same sync flow; until a
   note exists, voicenoteUrl returns undefined and the bubble stays
   waveform-only (the pre-audio presentation). */

import { VOICE_FILES } from './voice-list'

/** resolved audio URL for a voice note id, or undefined when not generated yet */
export function voicenoteUrl(id?: string): string | undefined {
  if (!id) return undefined
  const hit = VOICE_FILES.find((f) => f.startsWith(`${id}.`))
  return hit ? `${import.meta.env.BASE_URL}voicenotes/${hit}` : undefined
}
