/* Dev helper: drive Maya's morning → Bea's phone → the council → For You →
   the Dr. Anita page, verify the artifact clip plays for real (video + poster),
   then ride the coda out to the rack. Exits 0 only when every checkpoint lands.

   The story holds the bea-won chain on `inspected: 'anita'`, so opening the
   link in For You is required — no race with the coda moment. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
// smoke runs use the fast pace; cadence math is covered by pacing.test.ts
await page.addInitScript(() => {
  try {
    localStorage.setItem('cgAI_glassos_pace', '8')
  } catch {
    /* about:blank */
  }
})
page.on('pageerror', (e) => errors.push(String(e)))
const settle = (ms) => page.waitForTimeout(ms)
const tapWhen = async (name, timeout = 15000) => {
  const loc = page.getByRole('button', { name }).first()
  await loc.waitFor({ state: 'visible', timeout })
  await loc.click()
  await settle(400)
}
const tryTap = async (name, timeout = 4000) => {
  try { await tapWhen(name, timeout); return true } catch { return false }
}

// GitHub Pages has no SPA fallback — direct routes 404 there; fall in
// through the hub when that happens (the game route is the local fast path)
const direct = await page.goto(`${BASE}/blackglass/blackglass`, { waitUntil: 'networkidle' })
if (!direct?.ok()) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: /Three phones\. One morning/i }).first().click()
  await settle(800)
}
await settle(500)
await tapWhen(/THREE PHONES/i)
await tapWhen(/pick up/i)
await settle(8200)
await tapWhen(/Swipe up to open/i)
await tapWhen(/Open the family GC/i, 15000)
await tapWhen(/Open Messages/i)
await tapWhen(/Santos Family GC/i)
await settle(9000)
await tapWhen(/❤️ and scroll past/i)
await tryTap(/Lock the phone/i, 12000)
await settle(2500)
await page.screenshot({ path: '/tmp/av-1-rack.png' })

// Bea's phone — the wake narrative may land before or after unlock
await tapWhen(/CONSULT/i, 15000)
await settle(3000)
if (!await tryTap(/Open Maya first/i, 4000)) {
  await tryTap(/Swipe up to open/i, 12000)
  await tapWhen(/Open Maya first/i, 15000)
}
await settle(1500)
await page.screenshot({ path: '/tmp/av-2-bea.png' })
if (!await tryTap(/Open Messages/i, 4000)) await settle(1000)
await tryTap(/Open Messages/i, 6000)
await tapWhen(/maya 4ever/i, 10000)
await settle(2000)
await page.screenshot({ path: '/tmp/av-3-bea-thread.png' })
await tapWhen(/Screenshot it to the council/i, 10000)
await settle(1500)
await page.screenshot({ path: '/tmp/av-4-after-council.png' })
await tapWhen(/Back to home/i, 12000)
await settle(600)
await tapWhen(/Open Messages/i, 8000)
await tapWhen(/For You/i, 10000)

// the trap's link lands here; bea-won is gated on opening it, so the thread
// waits for the player instead of racing into the coda
const link = page.getByRole('button', { name: /EXPOSED vegetable/i }).first()
await link.waitFor({ state: 'visible', timeout: 15000 })
await settle(600)
await page.screenshot({ path: '/tmp/av-5-foryou.png' })
await link.click()
await settle(500)

// the Browser app opens the clip; wait for metadata (readyState ≥ 1)
await page.locator('video').first().waitFor({ state: 'visible', timeout: 10000 })
await page.waitForFunction(() => (document.querySelector('video')?.readyState ?? 0) >= 1, null, { timeout: 10000 })
const vids = await page.locator('video').evaluateAll((els) =>
  els.map((e) => ({ src: (e.getAttribute('src') ?? '').slice(0, 80), poster: (e.getAttribute('poster') ?? '').slice(0, 80), ready: e.readyState, err: e.error?.message ?? null })))
await page.screenshot({ path: '/tmp/av-6-anita.png' })
console.log('video elements:', JSON.stringify(vids))

// the chain resumes once the page is inspected: coda moment, then the rack
const coda = page.locator('div[role="dialog"][aria-label="Narrative moment"] button').first()
await coda.waitFor({ state: 'visible', timeout: 20000 })
await page.screenshot({ path: '/tmp/av-7-coda.png' })
await coda.click()
await page.getByText(/2 of 3 lived/i).first().waitFor({ state: 'visible', timeout: 15000 })
await page.screenshot({ path: '/tmp/av-8-rack.png' })

const videoOk = vids.some((v) =>
  v.src.includes('dr-anita') && v.poster.includes('dr-anita') && v.ready >= 1 && !v.err)
console.log('video ok:', videoOk)
console.log('errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(videoOk && errors.length === 0 ? 0 : 2)
