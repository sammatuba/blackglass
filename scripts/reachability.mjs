#!/usr/bin/env node
/* P9 reachability ledger (docs/OVERNIGHT-BUILD-2026-11-07.md §P4):
   walks every anchor's CaseOS — every ending has a drivable flag path, every
   openThread/photo/page/moment/reply reference resolves, artifact and
   voicenote files exist on disk. Writes docs/REACHABILITY-LEDGER.md.

   Thin wrapper: the analysis lives in src/games/blackglass/reachability.ts
   (typed, unit-gated) and runs under vitest so `npm test` always re-checks it.

     npm run reachability        # regenerate docs/REACHABILITY-LEDGER.md
*/
import { spawnSync } from 'node:child_process'

const result = spawnSync('npx', ['vitest', 'run', 'src/games/blackglass/reachability.test.ts'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
process.exit(result.status ?? 1)
