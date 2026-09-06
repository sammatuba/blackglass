/* Dev helper: drive the kangkong anchor to the artifact surfaces and
   screenshot them; report every <img> that resolves to a bundled file. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
page.on('pageerror', (e) => errors.push(String(e)))
const tap = async (name, timeout = 8000) => { await page.getByRole('button', { name }).first().click({ timeout }); await page.waitForTimeout(400) }
const settle = (ms) => page.waitForTimeout(ms)
const scan = async (label) => {
  const imgs = await page.locator('img').evaluateAll((els) =>
    els.map((e) => ({ src: (e.getAttribute('src') ?? '').slice(0, 70), ok: e.naturalWidth > 0 })))
  console.log(label, JSON.stringify(imgs))
}

await page.goto(`${BASE}/blackglass/blackglass`, { waitUntil: 'networkidle' })
await settle(500)
await tap(/THREE PHONES/i)
await tap(/pick up/i)
await settle(8200)
await tap(/Swipe up to open/i)
await tap(/Open the family GC/i, 12000)
await tap(/Open Messages/i)
await tap(/Santos Family GC/i)
await settle(9000)
await page.screenshot({ path: '/tmp/artifact-thread.png' })
await scan('thread:')

const link = page.getByText(/EXPOSED|dangerous|kangkong/i).first()
if (await link.count()) {
  await link.click()
  await settle(1500)
  await page.screenshot({ path: '/tmp/artifact-browser.png' })
  await scan('browser:')
}
console.log('errors:', errors.length ? errors : 'none')
await browser.close()
