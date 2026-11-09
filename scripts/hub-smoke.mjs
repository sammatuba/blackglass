/* Dev helper: load the hub and confirm the hero path is healthy —
   capability gate → idle import → canvas renders, zero console errors.
   The hero chunk is NOT precached, so this also exercises the
   degrade-to-CSS-gradient path on any load failure.
   NOTE: this one takes the ORIGIN as SHOT_BASE (it appends /blackglass/):
     Local: node scripts/hub-smoke.mjs
     Live:  SHOT_BASE=https://sammatuba.github.io node scripts/hub-smoke.mjs */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'
import { axeCheck } from './lib/axe.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch({ channel: process.env.SMOKE_CHANNEL || 'chrome' })
const errors = []
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

// seed a season before the app boots so the YOUR SEASON strip renders.
// Fresh visitors correctly see nothing — this asserts the record path:
// anthology 88+71=159 → WATCHER, radar 184, exam 73%.
await page.addInitScript(() => {
  localStorage.setItem(
    'cgAI_blackglass_v2',
    JSON.stringify({ state: { scores: { 'vc-tita': { best: 88, grade: 'S', plays: 1 }, 'kk-maya': { best: 71, grade: 'A', plays: 1 } } }, version: 0 }),
  )
  localStorage.setItem(
    'cgAI_scamradar_v1',
    JSON.stringify({ state: { totalScore: 184, bestStreak: 6, rounds: 3, bestRoundSignal: 82, family: {}, cases: { voice: 47 } }, version: 0 }),
  )
  localStorage.setItem('cgAI_tellExam_best', '73')
})

await gotoWithRetry(page, `${BASE}/blackglass/`)
await page.waitForTimeout(2500) // idle callback + hero chunk import + first frames

const canvasCount = await page.locator('canvas').count()
const heroTitle = await page.getByRole('heading', { name: /see clearly/i }).count()
const seasonText = (await page.locator('[data-od-id="season"]').textContent().catch(() => '')) ?? ''
const seasonOk =
  /YOUR SEASON ACROSS THE SUITE/i.test(seasonText) &&
  seasonText.includes('159') &&
  seasonText.includes('184') &&
  seasonText.includes('73%') &&
  /WATCHER/.test(seasonText)
await page.screenshot({ path: '/tmp/hub-hero.png' })
await axeCheck(page, 'hub')

console.log(JSON.stringify({ canvasCount, heroTitle, seasonOk, seasonText: seasonText.slice(0, 200), errors }, null, 2))
await browser.close()
process.exit(errors.length === 0 && canvasCount > 0 && heroTitle === 1 && seasonOk ? 0 : 1)
