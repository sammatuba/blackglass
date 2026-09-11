/* Dev helper: verify THE CONVERGENCE — seed a fully-lived season (with
   recorded choices) into localStorage, open the anthology, assert the finale
   unlocks, resolves the dynamic lines, and reports the discovery totals.
   Local:  node scripts/finale-smoke.mjs
   Live:   SHOT_BASE=https://sammatuba.github.io/blackglass node scripts/finale-smoke.mjs */
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
const assert = (cond, msg) => {
  if (!cond) throw new Error(`ASSERT: ${msg}`)
}

// a fully-lived season with specific choices + some evidence
const anchors = {
  kangkong: {
    completed: { maya: true, tita: true, bea: true },
    runs: {
      maya: { maya_choice: 'hearted' },
      tita: { tita_choice: 'voicenote' },
      bea: { bea_choice: 'council' },
    },
    evidence: { maya: ['ev-kk-page', 'ev-kk-shot'], tita: [], bea: ['ev-anita'] },
    inspected: {},
    live: {},
  },
  voiceclone: {
    completed: { tita: true, maya: true, bea: true },
    runs: {
      tita: { tita_vc: 'asked', tita_sent: 'sent' },
      maya: { maya_vc: 'wait', maya_vc2: 'wait10' },
      bea: { bea_vc: 'present' },
    },
    evidence: {},
    inspected: {},
    live: {},
  },
  deepfake: {
    completed: { tita: true, maya: true, bea: true },
    runs: {
      tita: { df_tita: 'forward', df_tita_act: 'register' },
      maya: { df_maya: 'called' },
      bea: { df_bea: 'receipts' },
    },
    evidence: {},
    inspected: {},
    live: {},
  },
  fiveweeks: {
    completed: { bea: true },
    runs: { bea: { w1: 'nuance', w3: 'satout', w4: 'unmuted' } },
    evidence: {},
    inspected: {},
    live: {},
  },
}

await page.addInitScript((seed) => {
  localStorage.setItem('cgAI_blackglass_v2', JSON.stringify({ state: { anchors: seed }, version: 0 }))
}, anchors)

const direct = await page.goto(`${BASE}/blackglass/blackglass`, { waitUntil: 'networkidle' })
if (!direct?.ok()) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: /Three phones\. One morning/i }).first().click()
  await settle(800)
}
await settle(600)

// the unlock card is open, not locked
const card = page.getByRole('button', { name: /The one timeline none of them could see/i }).first()
await card.waitFor({ state: 'visible', timeout: 10000 })
await page.screenshot({ path: '/tmp/finale-1-unlocked.png' })
await card.click()
await settle(600)
await page.getByText('THE CONVERGENCE').first().waitFor({ state: 'visible', timeout: 10000 })

// dynamic lines resolve from the seeded choices
const expected = [
  'She hearted it. Her name went into the thread as evidence that somebody had checked.',
  'She asked Joy about the cousin first.',
  'She stopped explaining and called Maya — “I’m here, what do you need.”',
  'She opened the muted list and let the complications back in.',
  'She pulled receipts — registry numbers, filings, the SEC list. None matched.',
]
for (const line of expected) {
  assert((await page.getByText(line, { exact: false }).count()) > 0, `dynamic line present: ${line.slice(0, 40)}…`)
}

// signal report totals: 10/10 phones, some clues
assert((await page.getByText('10/10').count()) > 0, 'signal report shows 10/10 phones lived')
assert((await page.getByText(/clues found/i).count()) > 0, 'signal report shows clues found')
assert((await page.getByText('Verification is a practice, not a verdict. The pause is the point.').count()) > 0, 'closing line present')

await page.screenshot({ path: '/tmp/finale-2-convergence.png', fullPage: true })
console.log('finale ok — errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
