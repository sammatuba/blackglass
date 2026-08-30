/* Dev helper: drive the Scam Radar feed loop end-to-end and screenshot. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 900 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(`${BASE}/blackglass/scam-radar`, { waitUntil: 'networkidle' })
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

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
