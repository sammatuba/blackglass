/* Dev helper: render platform routes to static HTML files so a headless
   linter (e.g. `od lint`) can judge the real DOM, not the JS shell.
   Writes /tmp/bg-render/<name>.html (+ a full-page screenshot). */
import { chromium } from 'playwright-core'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const OUT = process.env.RENDER_OUT ?? '/tmp/bg-render'
mkdirSync(OUT, { recursive: true })

const routes = [
  ['hub', '/blackglass/'],
  ['radar', '/blackglass/scam-radar/'],
  ['maya', '/blackglass/blackglass'],
]

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))

for (const [name, path] of routes) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  const html = await page.evaluate(() => document.documentElement.outerHTML)
  writeFileSync(`${OUT}/${name}.html`, `<!doctype html>\n${html}`)
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true })
  console.log(name, html.length, 'bytes')
}
await browser.close()
if (errors.length) console.log('pageerrors:', errors)
