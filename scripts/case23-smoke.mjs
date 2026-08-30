import { chromium } from 'playwright-core'
const BASE = 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 900 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
const tap = async (name) => { await page.getByRole('button', { name }).first().click({ timeout: 3000 }); await page.waitForTimeout(300) }
const drainUntil = async (pattern, max = 12) => {
  for (let i = 0; i < max; i++) {
    if (await page.getByText(pattern).first().isVisible().catch(() => false)) return
    const cont = page.getByRole('button', { name: /^Continue|Debrief$/i }).first()
    if (!(await cont.isVisible().catch(() => false))) return
    await cont.click(); await page.waitForTimeout(250)
  }
}
await page.goto(`${BASE}/blackglass/scam-radar`, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await tap(/On Hold/i)
await tap(/Continue/i)
await tap(/Open the shop’s official app/i)
await drainUntil(/Debrief · Case 03/i)
await page.waitForTimeout(300)
await page.screenshot({ path: '/tmp/case3-debrief.png', fullPage: true })
// case 2 spot test
await tap(/Back to cases/i)
await tap(/Guaranteed/i)
await tap(/Continue/i)
await tap(/Look the company up at the SEC/i)
await drainUntil(/Debrief · Case 02/i)
await page.waitForTimeout(300)
await page.screenshot({ path: '/tmp/case2-debrief.png' })
console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
