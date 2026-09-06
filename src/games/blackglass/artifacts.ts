/* Diegetic artifact registry. Generated files land in assets/artifacts/
   (scripts/sync-artifacts.mjs copies them from the generator); the glob
   compiles whether or not any exist, so content can reference artifacts
   before they're generated and fall back to the CSS/emoji presentation.

   Stills (png) are the canonical artifact AND the poster frame for the
   video-native ones; clips (webm/mp4) are the register upgrade — a page
   plays for real only when a clip exists (artifactVideo). */

const stills = import.meta.glob<{ default: string }>('./assets/artifacts/*.png', { eager: true })
const clips = import.meta.glob<{ default: string }>('./assets/artifacts/*.{webm,mp4}', { eager: true })

const STILL_BY_ID: Record<string, string> = {}
for (const [path, mod] of Object.entries(stills)) {
  const id = path.replace('./assets/artifacts/', '').replace(/\.png$/, '')
  STILL_BY_ID[id] = mod.default
}

const CLIP_BY_ID: Record<string, string> = {}
for (const [path, mod] of Object.entries(clips)) {
  const id = path.replace('./assets/artifacts/', '').replace(/\.(webm|mp4)$/, '')
  CLIP_BY_ID[id] = mod.default
}

/** resolved still/poster URL for an artifact id, or undefined when not generated yet */
export function artifactUrl(id?: string): string | undefined {
  return id ? STILL_BY_ID[id] : undefined
}

/** resolved clip URL for an artifact id, or undefined when no clip exists yet */
export function artifactVideo(id?: string): string | undefined {
  return id ? CLIP_BY_ID[id] : undefined
}
