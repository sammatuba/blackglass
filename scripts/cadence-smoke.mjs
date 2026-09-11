/* Dev helper: the human-cadence audit. Runs at REAL pace (1×) and measures
   the rhythm the player feels — the typing beat before a reply, the pause
   between the player's message and the reaction, the arrival of the line.
   Unit tests cover the math; this proves it reaches the DOM.
   Local:  node scripts/cadence-smoke.mjs   (against npm run preview)
   Live:   SHOT_BASE=https://sammatuba.github.io/blackglass node scripts/cadence-smoke.mjs */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
// this audit must feel the real thing: undo any smoke fast-pace override
await page.addInitScript(() => {
  try {
    localStorage.removeItem('cgAI_glassos_pace')
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
  await settle(300)
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

/* ---- voiceclone, Tita: every reply is a human on the other end ---- */
await tapWhen(/IT’S ME/i)
await tapWhen(/pick up/i)
// the opening previews drip in; wait for the last one (the photo)
await page.getByText('📷 Photo').first().waitFor({ state: 'visible', timeout: 15000 })
await tapWhen(/Swipe up to open/i)
await tapWhen(/Open Viber/i, 15000) // the kitchen moment
await tapWhen(/Open Messages/i)
await tapWhen(/Kuya Renz/i)
await settle(9000) // the listen chain (narr, aside, narr) gets its reading air

const countThem = () => page.locator('[data-from="them"]').count()
const beforeThem = await countThem()
await tapWhen(/Ask him where he is/i)
const tReply = Date.now()

// watch the reaction: the indicator comes first, then the line lands
let typingAt = 0
let landedAt = 0
while (Date.now() - tReply < 25000) {
  if (!typingAt && (await page.locator('[aria-label$="is typing"]').count()) > 0) typingAt = Date.now()
  if ((await countThem()) > beforeThem) {
    landedAt = Date.now()
    break
  }
  await page.waitForTimeout(60)
}
assert(landedAt > 0, 'the other side replies')
assert(typingAt > 0, 'the typing indicator shows before the line lands')
const beat = landedAt - typingAt
const reaction = landedAt - tReply
assert(beat >= 1000, `the typing beat is human, not instant (${beat}ms)`)
assert(beat <= 4500, `the typing beat does not drag (${beat}ms)`)
assert(reaction >= 2000, `the reaction is not instant (${reaction}ms)`)

console.log(JSON.stringify({ reactionMs: reaction, typingBeatMs: beat, errors }, null, 2))
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
