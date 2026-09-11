/* Dev helper: artifact surfaces — gallery zoom on a diegetic image, and
   voice-note play/pause in the message list (voiceclone, Tita Merly).
   Local:  node scripts/artifact-smoke.mjs   (against npm run preview)
   Live:   SHOT_BASE=https://sammatuba.github.io/blackglass node scripts/artifact-smoke.mjs */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
// smoke runs use the fast pace; cadence math is covered by pacing.test.ts
await page.addInitScript(() => {
  try {
    localStorage.setItem('cgAI_glassos_pace', '8')
  } catch {
    /* about:blank */
  }
})
page.on('pageerror', (e) => errors.push(String(e)))
const settle = (ms) => page.waitForTimeout(ms)
const tapWhen = async (name, timeout = 15000) => {
  const loc = page.getByRole('button', { name }).first()
  await loc.waitFor({ state: 'visible', timeout })
  await loc.click()
  await settle(400)
}
const assert = (cond, msg) => {
  if (!cond) throw new Error(`ASSERT: ${msg}`)
}

const direct = await page.goto(`${BASE}/blackglass/blackglass`, { waitUntil: 'networkidle' })
if (!direct?.ok()) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: /Three phones\. One morning/i }).first().click()
  await settle(800)
}
await settle(500)

/* ---- voiceclone, Tita Merly: enter the evening ---- */
await tapWhen(/IT’S ME/i)
await tapWhen(/pick up/i)
await settle(4500)
await tapWhen(/Swipe up to open/i)
await tapWhen(/Open Viber/i, 12000) // the kitchen moment
await settle(300)

/* ---- gallery zoom on the damage photo ---- */
await tapWhen(/Open Gallery/i, 8000)
await tapWhen(/the damage/i, 8000)
await page.getByRole('dialog', { name: /Photo:/ }).waitFor({ state: 'visible', timeout: 5000 })
await tapWhen(/Zoom in/i, 5000)
assert((await page.getByText('2×').count()) > 0, 'zoom in shows the 2× badge')
await page.screenshot({ path: '/tmp/artifact-1-zoom.png' })
await tapWhen(/Zoom out/i, 5000)
assert((await page.getByText('1×').count()) > 0, 'zoom out returns to 1×')
await tapWhen(/Close photo/i, 5000) // close the viewer

/* ---- voice-note play / pause in the thread ---- */
await tapWhen(/^Home$/i, 5000) // leave the Gallery
await tapWhen(/Open Messages/i, 8000)
await tapWhen(/Kuya Renz/i)
await settle(6500) // the listen chain
const play = page.getByRole('button', { name: /Play voice message/ }).first()
await play.waitFor({ state: 'visible', timeout: 8000 })
await play.click()
await page.getByRole('button', { name: /Pause voice message/ }).first().waitFor({ state: 'visible', timeout: 3000 })
await settle(500)
await page.screenshot({ path: '/tmp/artifact-2-voice.png' })
await page.getByRole('button', { name: /Pause voice message/ }).first().click()
await page.getByRole('button', { name: /Play voice message/ }).first().waitFor({ state: 'visible', timeout: 3000 })

console.log('artifact ok — errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
