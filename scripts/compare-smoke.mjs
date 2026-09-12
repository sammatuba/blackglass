/* Dev helper: the side-by-side artifact compare. Seeds kangkong with Maya
   lived so Bea is unlocked, drives her into the Gallery, and compares the
   kangkong screenshot with the ampalaya sibling — the batch tell.
   Local:  node scripts/compare-smoke.mjs
   Live:   SHOT_BASE=https://sammatuba.github.io/blackglass node scripts/compare-smoke.mjs */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'

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
// Maya lived is enough to wake the rest of the kangkong anchor
await page.addInitScript(() => {
  const anchors = {
    kangkong: {
      completed: { maya: true },
      runs: { maya: { maya_choice: 'hearted' } },
      evidence: {},
      inspected: {},
      live: {},
    },
  }
  localStorage.setItem('cgAI_blackglass_v2', JSON.stringify({ state: { anchors }, version: 0 }))
})
page.on('pageerror', (e) => errors.push(String(e)))
const settle = (ms) => page.waitForTimeout(ms)
const assert = (cond, msg) => {
  if (!cond) throw new Error(`ASSERT: ${msg}`)
}
const tapWhen = async (name, timeout = 15000) => {
  const loc = page.getByRole('button', { name }).first()
  await loc.waitFor({ state: 'visible', timeout })
  await loc.click()
  await settle(300)
}

const direct = await gotoWithRetry(page, `${BASE}/blackglass/blackglass`, { attempts: 2 }).catch(() => null)
if (!direct?.ok()) {
  await gotoWithRetry(page, `${BASE}/`)
  await page.getByRole('link', { name: /Three phones\. One morning/i }).first().click()
  await settle(800)
}
await settle(500)

/* Bea's run: awake because Maya was lived in the seed */
await tapWhen(/THREE PHONES/i)
await tapWhen(/Bea/) // the cold open clears itself at 8×
await tapWhen(/Swipe up to open/i)
await tapWhen(/Open Maya first/i) // the wake moment; bea_fast lands after it
await settle(1500) // the batch screenshots require bea_fast

/* the gallery now holds the batch */
await tapWhen(/Open Gallery/i)
await page.getByText(/Screenshot · kangkong link preview/i).first().waitFor({ state: 'visible', timeout: 10000 })
await tapWhen(/Screenshot · kangkong link preview/i)
const viewer = page.getByRole('dialog', { name: /Photo: Screenshot · kangkong link preview/ })

/* compare picks the ampalaya sibling */
await tapWhen(/⇄ Compare/i)
const sheet = page.getByRole('dialog', { name: 'Pick an artifact to compare' })
await sheet.waitFor({ state: 'visible', timeout: 5000 })
assert((await sheet.getByText(/malunggay link preview/i).count()) > 0, 'the malunggay third is offered too')
await sheet.getByRole('button', { name: /Screenshot · ampalaya link preview/i }).first().click()
await settle(400)

/* side by side, with the batch tell named */
await page.getByText(/The sameness is the tell/i).waitFor({ state: 'visible', timeout: 5000 })
assert((await viewer.locator('img[src*="clickbait"]').count()) === 2, 'two artifacts render side by side')
await page.screenshot({ path: '/tmp/compare-1-side-by-side.png' })

/* a side opens full size; Back exits to the gallery */
await viewer.getByRole('button', { name: /Screenshot · ampalaya link preview/i }).first().click()
await settle(400)
await page.getByRole('button', { name: /Zoom in/i }).waitFor({ state: 'visible', timeout: 5000 })
const full = page.getByRole('dialog', { name: /Photo: Screenshot · ampalaya link preview/ })
assert((await full.locator('img[src*="ampalaya-clickbait"]').count()) === 1, 'the ampalaya artifact is open full size')
await tapWhen(/Close photo/i)
await page.getByText(/Screenshot · kangkong link preview/i).first().waitFor({ state: 'visible', timeout: 5000 })

console.log('compare ok — errors:', errors.length ? errors : 'none')
await browser.close()
