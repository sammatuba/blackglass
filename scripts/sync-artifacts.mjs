#!/usr/bin/env node
/* Copy generated diegetic artifacts from the legacy generator into the
   platform so the glassOS games render them. Run after gen-images.mjs:

     GEMINI_API_KEY=… node play/blackglass-phones/gen-images.mjs
     node scripts/sync-artifacts.mjs */
import { cpSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SRC = new URL('../play/blackglass-phones/assets', import.meta.url)
const DEST = new URL('../src/games/blackglass/assets/artifacts', import.meta.url)

mkdirSync(DEST, { recursive: true })
const pngs = readdirSync(SRC).filter((f) => f.endsWith('.png'))
for (const f of pngs) cpSync(join(SRC.pathname, f), join(DEST.pathname, f))
console.log(`synced ${pngs.length} artifact(s):`, pngs.join(', ') || '(none generated yet)')
