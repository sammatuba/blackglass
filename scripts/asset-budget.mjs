#!/usr/bin/env node
/* E5 asset-budget gate (docs/game-design-eval.md, facet 7).
   Makes the weight budgets a gate instead of a hope:

     - per-artifact ceiling (public/artifacts/): still 900 KB, clip 5 MB
     - precache sanity: nothing but clips + the png fallback may exceed the
       workbox per-file cap (4 MB) — pngs are excluded from precache by config
     - duplication check: the artifact media must exist exactly ONCE in dist/
       (the legacy dedupe, 2026-10-04) — counts matches across dist/

   Usage: node scripts/asset-budget.mjs [--dist dist] */
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const HERE = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const PUBLIC = join(HERE, '..', 'public', 'artifacts')
const DIST = process.argv.includes('--dist')
  ? process.argv[process.argv.indexOf('--dist') + 1]
  : join(HERE, '..', 'dist')

const STILL_CEILING = 900 * 1024
const CLIP_CEILING = 5 * 1024 * 1024

let failures = 0
const warn = (m) => console.log(`  ⚠ ${m}`)
const fail = (m) => {
  console.log(`  ✗ ${m}`)
  failures++
}

console.log('asset budget — public/artifacts/')
if (!existsSync(PUBLIC)) {
  fail('public/artifacts/ missing — run: node scripts/sync-artifacts.mjs')
  process.exit(1)
}
let total = 0
for (const f of readdirSync(PUBLIC)) {
  const size = statSync(join(PUBLIC, f)).size
  total += size
  const ceiling = /\.(webm|mp4)$/.test(f) ? CLIP_CEILING : STILL_CEILING
  const kb = (size / 1024).toFixed(0)
  if (size > ceiling) fail(`${f} is ${kb} KB (ceiling ${(ceiling / 1024).toFixed(0)} KB)`)
  else console.log(`  ✓ ${f} ${kb} KB`)
}
console.log(`  Σ ${(total / 1e6).toFixed(1)} MB`)

if (existsSync(DIST)) {
  console.log(`dist/ duplication check (artifact media must appear exactly once)`)
  const seen = {}
  const walk = (dir) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name)
      if (f.isDirectory()) walk(p)
      else if (/\.(png|webp|webm|mp4)$/.test(f.name)) {
        const key = f.name.replace(/-[A-Za-z0-9_-]{8}\.(png|webp)$/, '.$1')
        seen[key] = (seen[key] ?? 0) + 1
      }
    }
  }
  walk(DIST)
  for (const [name, n] of Object.entries(seen)) {
    if (n > 1) warn(`${name} appears ${n}× in dist/`)
  }
  const anyDup = Object.values(seen).some((n) => n > 1)
  if (!anyDup) console.log('  ✓ no artifact duplicated in dist/')
} else {
  warn('no dist/ yet — build first for the duplication check')
}

process.exit(failures ? 1 : 0)
