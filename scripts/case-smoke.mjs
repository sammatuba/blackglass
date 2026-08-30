/* Dev helper: drive Scam Radar Case 01 through two decision paths. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 900 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const tap = async (name, timeout = 3000) => {
  await page.getByRole('button', { name }).first().click({ timeout })
  await page.waitForTimeout(350)
}

// keep tapping Continue until a given heading shows up
const drainUntil = async (pattern, max = 12) => {
  for (let i = 0; i < max; i++) {
    if (await page.getByText(pattern).first().isVisible().catch(() => false)) return
    const cont = page.getByRole('button', { name: /^Continue|Debrief$/i }).first()
    if (!(await cont.isVisible().catch(() => false))) return
    await cont.click()
    await page.waitForTimeout(300)
  }
}

await page.goto(`${BASE}/blackglass/scam-radar`, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

// open case 01
await tap(/It’s Me, Again/i)
await page.screenshot({ path: '/tmp/case-lock.png' })

// frame 1 → continue
await tap(/Continue/i)
await page.screenshot({ path: '/tmp/case-thread.png' })

// decision 1: probe
await tap(/Ask something only the real Renz knows/i)
await page.screenshot({ path: '/tmp/case-probe.png' })
await tap(/Continue/i)

// decision 2: verify
await tap(/Call the saved number anyway/i)
await page.waitForTimeout(350)
await drainUntil(/Debrief · Case 01/i)
await page.waitForTimeout(400)
await page.screenshot({ path: '/tmp/case-debrief.png' })

// replay via the call-first path
await tap(/Replay this case/i)
await tap(/Continue/i)
await tap(/Call Renz’s saved number/i)
await page.waitForTimeout(350)
await drainUntil(/Debrief · Case 01/i)
await page.waitForTimeout(400)
await page.screenshot({ path: '/tmp/case-debrief2.png' })

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
