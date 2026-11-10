/* Dev helper: the navigation-performance gate. Every assertion is isolated
   from the mechanism that could satisfy it vacuously (M6.7 review):
   - service workers are BLOCKED in both contexts (no precache shortcuts),
   - idle warm-up is disabled via the __BG_SKIP_IDLE_WARM__ probe seam, so
     the hover is the only prefetcher (a chunk request must NOT fire before
     the hover and MUST fire after it),
   - the destination chunk's response is HELD by routing, and the console
     boot (.route-boot) must appear WHILE the response is still held —
     boot-after-download cannot pass — bounded at 1000 ms from the click,
   - a click during an in-flight hover prefetch still boots (requested ≠
     resolved in app/prefetch.ts),
   - a cold programmatic click (no hover, no focus) boots the same way,
   - the destination must mount its OWN control after release.
   Zero console errors is part of the gate.
     Local: node scripts/nav-perf.mjs   (needs `npm run preview` running) */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch({ channel: process.env.SMOKE_CHANNEL || 'chrome' })
const errors = []

const throttle = async (page) => {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Network.enable')
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8, // ~1.6 Mbps — a slow link
    uploadThroughput: (750 * 1024) / 8,
  })
  return cdp
}

// — 1+2. hover prefetch (idle warm-up off), then a click while the chunk is
//        still in flight: the boot must cover the hub UNTIL the chunk lands —
const context1 = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: 'block' })
const page = await context1.newPage()
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
await page.addInitScript(() => {
  Object.defineProperty(window, '__BG_SKIP_IDLE_WARM__', { value: true })
})
await throttle(page)

const chunkTimes = []
let heldRoute = null
await context1.route(/blackglass-[\w-]+\.js/, (route) => {
  chunkTimes.push(Date.now())
  heldRoute = route // hold the response — the boot must win the race
})

await gotoWithRetry(page, `${BASE}/blackglass/`)
await page.waitForSelector('[data-od-id="desk"]', { timeout: 30000 })
await page.waitForTimeout(1500) // any stray warm-up would have fired by now
errors.length = 0 // navigation noise from the throttled boot is not game errors

const station = page.locator('[data-od-id="station-rack"]')
await station.scrollIntoViewIfNeeded()
if (chunkTimes.length > 0) throw new Error('ASSERT: a blackglass chunk fired before the hover — idle warm-up is not isolated')
await station.hover()
await page.waitForTimeout(1200)
if (chunkTimes.length === 0) throw new Error('ASSERT: hovering the station never fired the route chunk request')

const t0 = Date.now()
await station.click() // the prefetch is still in flight (held) — not ready
await page.waitForSelector('.route-boot', { timeout: 1000 }) // boot DURING the fetch
const inFlightBootMs = Date.now() - t0
await page.screenshot({ path: '/tmp/navperf-1-boot.png' })
await heldRoute.continue()
heldRoute = null
await page.getByRole('heading', { name: /The phone anthology/i }).waitFor({ timeout: 45000 }) // the rack, not the hub
const warmNavMs = Date.now() - t0
await page.screenshot({ path: '/tmp/navperf-2-landed.png' })
await page.close()
await context1.close()

// — 3. cold hub click, no hover, no focus, no prefetch, no warm anything —
const context2 = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: 'block' })
const page2 = await context2.newPage()
page2.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page2.on('pageerror', (e) => errors.push(String(e)))
await page2.addInitScript(() => {
  Object.defineProperty(window, '__BG_SKIP_IDLE_WARM__', { value: true })
})
await throttle(page2)

let heldExam = null
await context2.route(/tell-exam-[\w-]+\.js/, (route) => {
  heldExam = route
})

await gotoWithRetry(page2, `${BASE}/blackglass/`)
await page2.waitForSelector('[data-od-id="station-lens"]', { timeout: 30000 })
await page2.waitForTimeout(800)
const t1 = Date.now()
// programmatic click fires no pointerenter/focus — the cold path
await page2.evaluate(() => (document.querySelector('[data-od-id="station-lens"]') ?? document.body).click())
await page2.waitForSelector('.route-boot', { timeout: 1000 }) // boot DURING the fetch
const coldBootMs = Date.now() - t1
await page2.screenshot({ path: '/tmp/navperf-3-boot.png' })
await heldExam.continue()
await page2.getByRole('button', { name: /Begin the exam|Run it again/i }).waitFor({ timeout: 45000 })
const coldNavMs = Date.now() - t1
await page2.screenshot({ path: '/tmp/navperf-4-landed.png' })
await page2.close()
await context2.close()

await browser.close()
const ok = errors.length === 0
console.log(JSON.stringify({ hoverPrefetchFired: chunkTimes.length > 0, inFlightBootMs, warmNavMs, coldBootMs, coldNavMs, errors }, null, 2))
process.exit(ok ? 0 : 1)
