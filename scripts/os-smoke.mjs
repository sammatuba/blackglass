/* Dev helper: drive glassOS Case 01 — unlock, snoop, decide, call, debrief. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const tap = async (name, timeout = 4000) => {
  await page.getByRole('button', { name }).first().click({ timeout })
  await page.waitForTimeout(400)
}
const settle = (ms) => page.waitForTimeout(ms)

await page.goto(`${BASE}/blackglass/scam-radar`, { waitUntil: 'networkidle' })
await settle(600)
await tap(/It’s Me, Again/i)

// opening messages arrive on the lock screen
await settle(5200)
await page.screenshot({ path: '/tmp/os-1-lock.png' })

// unlock → home
await tap(/Swipe up to open/i)
await settle(500)
await page.screenshot({ path: '/tmp/os-2-home.png' })

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

// back to the thread; decision 2: verify
await tap('Home', { timeout: 3000 }).catch(() => {})
await page.getByRole('button', { name: 'Home', exact: true }).click({ force: true }).catch(() => {})
await tap(/Messages/i)
await settle(300)
await tap(/Renz\?/i)
await settle(400)
await tap(/Call the saved number anyway/i)
await settle(900)
await page.screenshot({ path: '/tmp/os-9-call.png' })

// accept → transcript → end
await tap(/Accept/i)
await settle(5500)
await page.screenshot({ path: '/tmp/os-10-live.png' })
await tap(/End call/i)
await settle(2500)
await page.screenshot({ path: '/tmp/os-11-debrief.png', fullPage: true })

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
