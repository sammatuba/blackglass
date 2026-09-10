/* Dev helper: glassOS device chrome — banners are tappable, the notification
   shade keeps the history, and shade rows open their thread.
   Local:  node scripts/shade-smoke.mjs   (against npm run preview)
   Live:   SHOT_BASE=https://sammatuba.github.io/blackglass node scripts/shade-smoke.mjs */
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
const assert = (cond, msg) => {
  if (!cond) throw new Error(`ASSERT: ${msg}`)
}

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
await tapWhen(/Open the family GC/i, 15000) // dismiss the wake moment; stay on home

// messages land off-screen → a banner drops
const banner = page.getByRole('button', { name: /Salamat po Ate/ }).first()
await banner.waitFor({ state: 'visible', timeout: 10000 })
await page.screenshot({ path: '/tmp/shade-1-banner.png' })

// tapping the banner opens its thread
await banner.click()
await settle(600)
assert((await page.getByText('Santos Family GC 🏠').count()) > 0, 'banner tap opened the GC thread')
await page.screenshot({ path: '/tmp/shade-2-thread.png' })

// back home: the bell carries the unread count
await tapWhen(/^Home$/i, 5000)
const bell = page.getByRole('button', { name: /Notifications/ }).first()
await bell.waitFor({ state: 'visible', timeout: 5000 })
assert(/unread/.test((await bell.getAttribute('aria-label')) ?? ''), 'bell shows an unread count')
await bell.click()
await settle(500)
const shade = page.getByRole('dialog', { name: 'Notifications' })
await shade.waitFor({ state: 'visible', timeout: 5000 })
assert((await page.getByText(/Salamat po Ate/).count()) > 0, 'shade lists the notification')
await page.screenshot({ path: '/tmp/shade-3-shade.png' })

// a shade row opens the thread and closes the shade
await page.getByRole('button', { name: /Salamat po Ate/ }).first().click()
await settle(600)
assert((await page.getByRole('dialog', { name: 'Notifications' }).count()) === 0, 'shade closed after opening a thread')
assert((await page.getByText('Santos Family GC 🏠').count()) > 0, 'shade row opened the GC thread')
assert((await bell.getAttribute('aria-label')) === 'Notifications', 'unread cleared after opening the shade')

console.log('shade ok — errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
