import { chromium } from 'playwright-core'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 900 } })
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto('http://localhost:4173/blackglass/scam-radar', { waitUntil: 'networkidle' })
await page.waitForTimeout(700)
await page.screenshot({ path: '/tmp/final-menu.png', fullPage: true })
console.log('errors:', errors.length ? errors : 'none')
await browser.close()
