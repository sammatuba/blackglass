/* Dev helper: drive the Scam Radar feed loop end-to-end and screenshot. */

import { axeCheck } from './lib/axe.mjs'
import { gotoWithRetry, launchAuditBrowser } from './lib/nav.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await launchAuditBrowser({ channel: process.env.SMOKE_CHANNEL || 'chrome' })
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 900 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

// deep links 404 on hosts without SPA rewrites — fall in through the hub card
const direct = await gotoWithRetry(page, `${BASE}/blackglass/scam-radar`, { attempts: 2 }).catch(() => null)
if (!direct?.ok()) {
  await gotoWithRetry(page, `${BASE}/blackglass/`)
  const card = page.getByRole('link', { name: /Scam Radar|Start scam training/i }).first()
  await card.waitFor({ state: 'visible', timeout: 15000 })
  await card.click()
  await page.waitForTimeout(900)
}
errors.length = 0 // the hub-fallback probe's expected 404s are not game errors
await page.waitForTimeout(700)
await page.screenshot({ path: '/tmp/radar-menu.png' })

await page.getByRole('button', { name: /Feed Triage/i }).click()
await page.waitForTimeout(500)

// answer all 10 with the keyboard: cycle 1/2/3
for (let i = 0; i < 10; i++) {
  await page.waitForTimeout(250)
  await page.keyboard.press(['1', '2', '3'][i % 3])
  await page.waitForTimeout(350)
  await page.screenshot({ path: `/tmp/radar-item-${i}.png` })
  await page.keyboard.press('Enter')
}
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/radar-debrief.png' })
await axeCheck(page, 'radar debrief')

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
