/* Dev helper: drive Maya's morning → Bea's phone → council → For You →
   the Dr. Anita page, and verify the artifact clip plays (video element). */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
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

await page.goto(`${BASE}/blackglass/blackglass`, { waitUntil: 'networkidle' })
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
await settle(6000)
await page.screenshot({ path: '/tmp/av-4-after-council.png' })
await tapWhen(/Back to home/i, 8000)
await settle(600)
await tapWhen(/Open Messages/i, 8000)
await tapWhen(/For You/i, 10000)
await settle(3000)
await page.screenshot({ path: '/tmp/av-5-foryou.png' })
// dismiss any narrative moment overlaying the thread (e.g. bea-afterglow)
for (let i = 0; i < 3; i++) {
  const dlgBtn = page.locator('div[role="dialog"] button').first()
  if (await dlgBtn.count()) { await dlgBtn.click(); await settle(800) } else break
}
const link = page.getByText(/EXPOSED|Anita/i).first()
if (await link.count()) { await link.click(); await settle(2500) }
await page.screenshot({ path: '/tmp/av-6-anita.png' })
const vids = await page.locator('video').evaluateAll((els) =>
  els.map((e) => ({ src: (e.getAttribute('src') ?? '').slice(0, 80), poster: (e.getAttribute('poster') ?? '').slice(0, 80), ready: e.readyState })))
console.log('video elements:', JSON.stringify(vids))
console.log('errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(vids.length > 0 ? 0 : 2)
