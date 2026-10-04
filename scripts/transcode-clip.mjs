#!/usr/bin/env node
/* Trim/transcode a source video into a dist-ready artifact clip.
   Used for the legit-baseline contrast clip (public-domain VOA footage) and
   usable for any future clip that must respect the ≤5 MB artifact ceiling.

     node scripts/transcode-clip.mjs <in> <out> [startSec] [durSec]

   Defaults: start 60, duration 10 — well past any cold-open. */
import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path

const [input, output, start = '60', dur = '10'] = process.argv.slice(2)
if (!input || !output || !existsSync(input)) {
  console.error('usage: node scripts/transcode-clip.mjs <in> <out> [startSec=60] [durSec=10]')
  process.exit(1)
}

execFileSync(ffmpeg, [
  '-y',
  '-ss', start,
  '-i', input,
  '-t', dur,
  '-vf', 'scale=-2:min(720\\,ih)',
  '-c:v', 'libvpx-vp9', '-crf', '34', '-b:v', '0',
  '-c:a', 'libopus', '-b:a', '64k',
  '-movflags', '+faststart',
  output,
], { stdio: ['ignore', 'ignore', 'inherit'] })

const mb = statSync(output).size / 1e6
console.log(`wrote ${output} — ${mb.toFixed(1)} MB`)
if (mb > 5) console.log('  ⚠ over the 5 MB artifact ceiling — raise -crf (e.g. 36) or shorten')
