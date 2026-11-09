/* Dev helper: verify continuity and the inhabited shell — leave a phone
   mid-run, come back, and it wakes on the lock screen with the conversation
   exactly where it was. Also exercises the lock control, swipe-to-unlock,
   and pull-down notifications.
   Local:  node scripts/resume-smoke.mjs  (against npm run preview)
   Live:   SHOT_BASE=https://sammatuba.github.io node scripts/resume-smoke.mjs */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'

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
const drag = async (from, to) => {
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  await page.mouse.move(to.x, to.y, { steps: 12 })
  await page.mouse.up()
  await settle(500)
}
const assert = (cond, msg) => {
  if (!cond) throw new Error(`ASSERT: ${msg}`)
}

// enter the game (deep link locally; hub fallback where the host 404s a route)
// the deep link is expected to 404 where the host has no SPA fallback; never
// wait for networkidle on it — a 404 document can leave the request hung
const direct = await gotoWithRetry(page, `${BASE}/blackglass/blackglass`, { attempts: 2 }).catch(() => null)
if (!direct?.ok()) {
  await gotoWithRetry(page, `${BASE}/`)
  await page.getByRole('link', { name: /Three phones\. One morning/i }).first().click()
  await settle(800)
}
await settle(500)
await tapWhen(/THREE PHONES/i)
await tapWhen(/pick up/i)
await settle(8200)
await tapWhen(/Swipe up to open/i)
await tapWhen(/Open the family GC/i, 15000)
// the moment's button opens the GC thread directly (moment-to-thread contract)
await settle(9000)

// the waking narration has landed; leave before choosing (no pending moment)
const nar = page.getByText(/You stop\. Not at the article\./)
await nar.first().waitFor({ state: 'visible', timeout: 8000 })
await page.screenshot({ path: '/tmp/resume-1-mid-run.png' })
await tapWhen(/Lock the phone/i)
await page.screenshot({ path: '/tmp/resume-2-lock.png' })
assert((await page.getByText(/Swipe up to open/i).count()) > 0, 'power control returns to the lock screen')
await tapWhen(/Put the phone down/i)
await tapWhen(/^Put it down$/i)
await settle(600)
await page.screenshot({ path: '/tmp/resume-3-rack.png' })
assert((await page.getByText(/You left this one mid-conversation/i).count()) > 0, 'rack shows the resume hint')

// pick it back up: it wakes locked, says you were away, and a swipe opens it
await tapWhen(/continue/i, 8000)
await settle(1000)
assert((await page.getByText(/While you were away/i).count()) > 0, 'returning lock names the time away')
assert((await page.getByText(/Swipe up to open/i).count()) > 0, 'restored phone wakes locked')
await page.screenshot({ path: '/tmp/resume-4-restored-lock.png' })
await drag({ x: 210, y: 700 }, { x: 210, y: 500 })
assert((await page.getByText(/Swipe up to open/i).count()) === 0, 'swipe up unlocks the phone')
await page.getByRole('button', { name: /Open Messages/i }).waitFor({ state: 'visible', timeout: 5000 })
await page.screenshot({ path: '/tmp/resume-5-home.png' })

// pull down from the top centre to open the shade
await drag({ x: 210, y: 10 }, { x: 210, y: 120 })
await page.getByRole('dialog', { name: /Notifications/i }).waitFor({ state: 'visible', timeout: 5000 })
await page.screenshot({ path: '/tmp/resume-6-shade.png' })
await tapWhen(/Close notifications/i)

await tapWhen(/Open Messages/i, 8000)
await tapWhen(/Santos Family GC/i, 8000)
await settle(800)
await page.screenshot({ path: '/tmp/resume-7-thread.png' })
assert((await nar.count()) === 1, `narration message appears exactly once (got ${await nar.count()})`)

console.log('resume ok — errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
