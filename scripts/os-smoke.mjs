/* Dev helper: drive glassOS Case 01 — unlock, snoop, decide, call, debrief. */

import { axeCheck } from './lib/axe.mjs'
import { gotoHub, gotoWithRetry, launchAuditBrowser } from './lib/nav.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await launchAuditBrowser({ channel: process.env.SMOKE_CHANNEL || 'chrome' })
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const tap = async (name, timeout = 4000) => {
  const loc = page.getByRole('button', { name }).first()
  try {
    await loc.click({ timeout })
  } catch {
    // at 8× pace a rule-pumped notification banner can sit over the target
    // momentarily — force through rather than fail the flow (banner children
    // keep their pointer events by design)
    await loc.click({ force: true, timeout })
  }
  await page.waitForTimeout(400)
}
const settle = (ms) => page.waitForTimeout(ms)

// prove the destination, not the response — /blackglass/scam-radar only means
// the radar on base-blackglass hosts; on root-base hosts (Workers) it is the
// anthology route. Deep links also 404 on hosts without SPA rewrites, so the
// fallback enters through the hub's feed-desk station (per host base).
const direct = await gotoWithRetry(page, `${BASE}/blackglass/scam-radar`, { attempts: 2 }).catch(() => null)
const onRadar =
  direct?.ok() &&
  (await page
    .getByRole('button', { name: /It’s Me, Again/i })
    .first()
    .waitFor({ state: 'visible', timeout: 6000 })
    .then(() => true)
    .catch(() => false))
if (!onRadar) {
  await gotoHub(page, BASE)
  const card = page.getByRole('link', { name: /Scam Radar|Start scam training/i }).first()
  await card.waitFor({ state: 'visible', timeout: 15000 })
  await card.click()
  await page
    .getByRole('button', { name: /It’s Me, Again/i })
    .first()
    .waitFor({ state: 'visible', timeout: 15000 })
    .catch(() => {})
  await page.waitForTimeout(900)
}
errors.length = 0 // the hub-fallback probe's expected 404s are not game errors
await settle(600)
await tap(/It’s Me, Again/i)

// opening messages arrive on the lock screen
await settle(5200)
await page.screenshot({ path: '/tmp/os-1-lock.png' })

// unlock → home
await tap(/Swipe up to open/i)
await settle(500)
await page.screenshot({ path: '/tmp/os-2-home.png' })
await axeCheck(page, 'os home')

// messages → thread
await tap(/Messages/i)
await settle(400)
await page.screenshot({ path: '/tmp/os-3-threads.png' })
await tap(/Renz\?/i)
await settle(600)
await page.screenshot({ path: '/tmp/os-4-convo.png' })

// decision 1: probe → escalation + photo
await tap(/Ask something only the real Renz knows/i)
await settle(4200)
await page.screenshot({ path: '/tmp/os-5-escalation.png' })

// gallery: inspect the accident photo
await tap('Home', { timeout: 3000 }).catch(() => {})
await page.getByRole('button', { name: 'Home', exact: true }).click({ force: true }).catch(() => {})
await settle(400)
await tap(/Gallery/i)
await settle(400)
await page.screenshot({ path: '/tmp/os-6-gallery.png' })
await tap(/IMG_2041/i)
await settle(700)
await page.screenshot({ path: '/tmp/os-7-photo.png' })
await tap(/Close photo/i)
await settle(300)

// contacts: check the saved number
await tap('Home', { timeout: 3000 }).catch(() => {})
await page.getByRole('button', { name: 'Home', exact: true }).click({ force: true }).catch(() => {})
await tap(/Contacts/i)
await settle(400)
await tap(/Renz Santos/i)
await settle(500)
await page.screenshot({ path: '/tmp/os-8-contact.png' })

// back to the thread; decision 2: verify. The thread list reorders live as
// GC beats land, so re-enter deterministically and confirm the Renz thread
// actually shows the decision before tapping it — a mis-landed click into
// another thread must heal, not fail the smoke.
for (let attempt = 0; attempt < 3; attempt++) {
  await tap('Home', { timeout: 3000 }).catch(() => {})
  await page.getByRole('button', { name: 'Home', exact: true }).click({ force: true }).catch(() => {})
  await tap(/Messages/i)
  await settle(400)
  await page.getByRole('button', { name: /Renz\?/i }).first().click({ timeout: 6000 }).catch(() => {})
  await settle(800)
  if ((await page.getByRole('button', { name: /Call the saved number anyway/i }).count()) > 0) break
  if (attempt === 2) throw new Error('ASSERT: the verify decision never rendered in the Renz thread')
}
await tap(/Call the saved number anyway/i, 8000)
await settle(900)
await page.screenshot({ path: '/tmp/os-9-call.png' })

// accept → transcript → end
await tap(/Accept/i)
await settle(5500)
await page.screenshot({ path: '/tmp/os-10-live.png' })
await tap(/End call/i)
await settle(2500)
await page.screenshot({ path: '/tmp/os-11-debrief.png', fullPage: true })
await axeCheck(page, 'os debrief')

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
