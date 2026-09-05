/* Dev helper: load the hub and confirm the hero path is healthy —
   capability gate → idle import → canvas renders, zero console errors.
   The hero chunk is NOT precached, so this also exercises the
   degrade-to-CSS-gradient path on any load failure. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(`${BASE}/blackglass/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500) // idle callback + hero chunk import + first frames

const canvasCount = await page.locator('canvas').count()
const heroTitle = await page.getByRole('heading', { name: /see clearly/i }).count()
await page.screenshot({ path: '/tmp/hub-hero.png' })

console.log(JSON.stringify({ canvasCount, heroTitle, errors }, null, 2))
await browser.close()
process.exit(errors.length === 0 && canvasCount > 0 && heroTitle === 1 ? 0 : 1)
