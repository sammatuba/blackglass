#!/usr/bin/env node
/* Copy generated diegetic artifacts from the legacy generator into the
   platform so the glassOS games render them. Stills (png) and clips
   (webm/mp4 — the video register, see research/ai-visual-workflows-2026.md
   §2.1) both sync; stills are the poster frames for their clips:

     node play/blackglass-phones/gen-images.mjs      # or the ChatGPT worksheet
     node scripts/sync-artifacts.mjs */
import { cpSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SRC = new URL('../play/blackglass-phones/assets', import.meta.url)
const DEST = new URL('../src/games/blackglass/assets/artifacts', import.meta.url)

const ARTIFACT_RE = /\.(png|webm|mp4)$/

mkdirSync(DEST, { recursive: true })
const files = readdirSync(SRC).filter((f) => ARTIFACT_RE.test(f))
for (const f of files) cpSync(join(SRC.pathname, f), join(DEST.pathname, f))
console.log(`synced ${files.length} artifact(s):`, files.join(', ') || '(none generated yet)')
