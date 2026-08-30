/* Dev helper: screenshot routes with real scrolling + console error capture. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'

const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(`${BASE}/blackglass/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

// scroll through the page so whileInView sections reveal
await page.evaluate(async () => {
  const h = document.body.scrollHeight
  for (let y = 0; y <= h; y += 600) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 120))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(800)
await page.screenshot({ path: '/tmp/hub-full.png', fullPage: true })
console.log('hub title:', await page.title())

// legacy viewer
await page.goto(`${BASE}/blackglass/legacy/blackglass-phones/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.screenshot({ path: '/tmp/legacy.png' })

// unknown legacy path → graceful fallback
await page.goto(`${BASE}/blackglass/legacy/nope/`, { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/legacy-404.png' })

// scam radar teaser
await page.goto(`${BASE}/blackglass/scam-radar`, { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/radar.png' })

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
