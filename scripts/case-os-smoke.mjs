/* Dev helper: smoke Cases 02 + 03 on glassOS through their key paths. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const tap = async (name, timeout = 4000) => {
  await page.getByRole('button', { name }).first().click({ timeout })
  await page.waitForTimeout(350)
}
const settle = (ms) => page.waitForTimeout(ms)
const home = async () => {
  await page.getByRole('button', { name: 'Home', exact: true }).click({ force: true }).catch(() => {})
  await settle(350)
}

async function openCase(card) {
  await page.goto(`${BASE}/blackglass/scam-radar`, { waitUntil: 'networkidle' })
  await settle(500)
  await tap(card)
  await settle(5500) // opening beats
  await tap(/Swipe up to open/i)
  await settle(400)
}

/* ---- CASE 02: SEC path ---- */
await openCase(/Guaranteed/i)
await tap(/Messages/i)
await settle(300)
await tap(/VIP Desk/i)
await settle(400)
await page.screenshot({ path: '/tmp/g1-vip.png' })
await tap(/Check the company at the SEC first/i)
await settle(5600)
await page.screenshot({ path: '/tmp/g2-sec-link.png' })
await tap(/SEC Memorandum/i)
await settle(700)
await page.screenshot({ path: '/tmp/g3-sec-page.png' })
await settle(2200) // let the aftermath land
await page.screenshot({ path: '/tmp/g4-debrief.png', fullPage: true })

/* ---- CASE 03: engage→stop path ---- */
await openCase(/On Hold/i)
await tap(/Messages/i)
await settle(300)
await tap(/PHLPost-Express/i)
await settle(400)
await tap(/Reply “YES” — hear the agent out first/i)
await settle(5600)
await page.screenshot({ path: '/tmp/p1-agent.png' })
await tap(/Hang up · block · report/i)
await settle(2500)
await page.screenshot({ path: '/tmp/p2-debrief.png' })

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
