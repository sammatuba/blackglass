/* Diegetic artifact registry. Generated PNGs land in assets/artifacts/
   (scripts/sync-artifacts.mjs copies them from the generator); the glob
   compiles whether or not any exist, so content can reference artifacts
   before they're generated and fall back to the CSS/emoji presentation. */

const files = import.meta.glob<{ default: string }>('./assets/artifacts/*.png', { eager: true })

const BY_ID: Record<string, string> = {}
for (const [path, mod] of Object.entries(files)) {
  const id = path.replace('./assets/artifacts/', '').replace(/\.png$/, '')
  BY_ID[id] = mod.default
}

/** resolved URL for an artifact id, or undefined when not generated yet */
export function artifactUrl(id?: string): string | undefined {
  return id ? BY_ID[id] : undefined
}
