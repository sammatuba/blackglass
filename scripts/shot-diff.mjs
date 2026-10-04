#!/usr/bin/env node
/* E7 screenshot-diff (docs/game-design-eval.md, facet 3).
   Visual regression net under the design system: keep a committed baseline,
   then diff fresh screenshots against it per screen/skin.

     node scripts/shot-diff.mjs baseline   # (re)record /tmp/shots-diff/*.png
     node scripts/shot-diff.mjs compare    # diff fresh shots vs baseline

   Baselines live in shots-baseline/ (committed). Threshold: pixelmatch
   colorDistance 0.1, maxDiff 0.5% of pixels — cosmetic jitter passes,
   real layout/token drift fails. */
import { mkdirSync, readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'

const HERE = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const BASELINE = join(HERE, '..', 'shots-baseline')
const FRESH = '/tmp/shots-diff'
const MODE = process.argv[2] ?? 'compare'
const MAX_DIFF_PCT = 0.5

const SCREENS = [
  { name: 'hub', url: '/blackglass/', viewport: { width: 1280, height: 800 }, settle: 2500 },
  { name: 'radar-menu', url: '/blackglass/scam-radar', viewport: { width: 420, height: 900 }, settle: 900 },
  { name: 'anthology-maya', url: '/blackglass/blackglass', viewport: { width: 420, height: 920 }, settle: 1500 },
]

async function capture() {
  mkdirSync(FRESH, { recursive: true })
  const browser = await chromium.launch({ channel: 'chrome' })
  const page = await browser.newPage()
  for (const s of SCREENS) {
    const p2 = await browser.newPage({ viewport: s.viewport })
    await gotoWithRetry(p2, `http://localhost:4173${s.url}`)
    await p2.waitForTimeout(s.settle)
    await p2.screenshot({ path: join(FRESH, `${s.name}.png`), fullPage: false })
    console.log(`  shot ${s.name}`)
    await p2.close()
  }
  await browser.close()
}

function compare() {
  if (!existsSync(BASELINE)) {
    console.error('no shots-baseline/ — record one first: node scripts/shot-diff.mjs baseline')
    process.exit(1)
  }
  let failures = 0
  for (const s of SCREENS) {
    const a = join(BASELINE, `${s.name}.png`)
    const b = join(FRESH, `${s.name}.png`)
    if (!existsSync(a) || !existsSync(b)) {
      console.log(`  ⚠ ${s.name}: missing shot (baseline: ${existsSync(a)}, fresh: ${existsSync(b)})`)
      failures++
      continue
    }
    const imgA = PNG.sync.read(readFileSync(a))
    const imgB = PNG.sync.read(readFileSync(b))
    if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
      console.log(`  ✗ ${s.name}: size changed ${imgA.width}×${imgA.height} → ${imgB.width}×${imgB.height}`)
      failures++
      continue
    }
    const diff = new PNG({ width: imgA.width, height: imgA.height })
    const n = pixelmatch(imgA.data, imgB.data, diff.data, imgA.width, imgA.height, { threshold: 0.1 })
    const pct = (n / (imgA.width * imgA.height)) * 100
    if (pct > MAX_DIFF_PCT) {
      writeFileSync(join(FRESH, `${s.name}-diff.png`), PNG.sync.write(diff))
      console.log(`  ✗ ${s.name}: ${pct.toFixed(2)}% pixels differ (max ${MAX_DIFF_PCT}%) — diff at ${FRESH}/${s.name}-diff.png`)
      failures++
    } else {
      console.log(`  ✓ ${s.name}: ${pct.toFixed(2)}% differ`)
    }
  }
  process.exit(failures ? 1 : 0)
}

if (MODE === 'baseline') {
  mkdirSync(BASELINE, { recursive: true })
  await capture()
  for (const s of SCREENS) {
    const src = join(FRESH, `${s.name}.png`)
    if (existsSync(src)) {
      writeFileSync(join(BASELINE, `${s.name}.png`), readFileSync(src))
      console.log(`  baseline ${s.name}`)
    }
  }
  console.log('baseline recorded in shots-baseline/')
} else {
  await capture()
  compare()
}
