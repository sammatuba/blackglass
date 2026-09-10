/* Dev helper: verify continuity — leave a phone mid-run, come back, and the
   conversation resumes where it was (unlocked, restored, no rule replay).
   Local:  node scripts/resume-smoke.mjs  (against npm run preview)
   Live:   SHOT_BASE=https://sammatuba.github.io/blackglass node scripts/resume-smoke.mjs */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
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

// enter the game (deep link locally; hub fallback where the host 404s a route)
const direct = await page.goto(`${BASE}/blackglass/blackglass`, { waitUntil: 'networkidle' })
if (!direct?.ok()) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: /Three phones\. One morning/i }).first().click()
  await settle(800)
}
await settle(500)
await tapWhen(/THREE PHONES/i)
await tapWhen(/pick up/i)
await settle(8200)
await tapWhen(/Swipe up to open/i)
await tapWhen(/Open the family GC/i, 15000)
await tapWhen(/Open Messages/i)
await tapWhen(/Santos Family GC/i)
await settle(9000)

// the waking narration has landed; leave before choosing (no pending moment)
const nar = page.getByText(/You stop\. Not at the article\./)
await nar.first().waitFor({ state: 'visible', timeout: 8000 })
await page.screenshot({ path: '/tmp/resume-1-mid-run.png' })
await tapWhen(/‹ Put the phone down/i)
await tapWhen(/^Put it down$/i)
await settle(600)
await page.screenshot({ path: '/tmp/resume-2-rack.png' })
assert((await page.getByText(/You left this one mid-conversation/i).count()) > 0, 'rack shows the resume hint')

// pick it back up: unlocked, inbox restored, no duplicate pushes
await tapWhen(/continue/i, 8000)
await settle(1000)
await page.screenshot({ path: '/tmp/resume-3-restored.png' })
assert((await page.getByText(/Swipe up to open/i).count()) === 0, 'restored phone is unlocked')
assert((await page.getByText(/‹ Put the phone down/i).count()) > 0, 'device chrome visible after resume')
await tapWhen(/Open Messages/i, 8000)
await tapWhen(/Santos Family GC/i, 8000)
await settle(800)
await page.screenshot({ path: '/tmp/resume-4-thread.png' })
assert((await nar.count()) === 1, `narration message appears exactly once (got ${await nar.count()})`)

console.log('resume ok — errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
