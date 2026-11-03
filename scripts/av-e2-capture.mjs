/* E2 capture for Anchor V — CERTAIN. Drives all three phones (Tita GC path,
   Maya fix path, Bea counter-case path), dumps visible beats + the end-state
   thread inboxes (read from the persisted live run — the coda moment pauses
   the world, and localStorage holds the full inbox) to
   <tmpdir>/av-transcript.json. axe-checks the Ask surfaces (E3). */
import { chromium } from 'playwright-core'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { gotoWithRetry } from './lib/nav.mjs'
import { axeCheck } from './lib/axe.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch({ channel: 'chrome' })
const errors = []
let auditing = false
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
await page.addInitScript(() => {
  try {
    // 2× — slow enough that narrative drains never outrun the driver
    localStorage.setItem('cgAI_glassos_pace', '2')
  } catch {
    /* about:blank */
  }
})
page.on('console', (m) => m.type() === 'error' && auditing && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const transcript = []
const capture = async (label) => {
  const msgs = await page.evaluate(() =>
    [...document.querySelectorAll('[data-msg]')].map((el) => ({
      from: el.dataset.from,
      via: el.dataset.via,
      text: (el.innerText ?? '').slice(0, 500),
    })),
  )
  transcript.push({ label, url: page.url(), msgs })
}
/** thread inbox straight from the persisted live run (works under the coda moment) */
const dumpInbox = async (label, phoneId, threadId) => {
  await page.waitForTimeout(1600) // the debounced save (600ms) plus slack
  const msgs = await page.evaluate(
    ({ phoneId, threadId }) => {
      const raw = JSON.parse(localStorage.getItem('cgAI_blackglass_v2') ?? '{}')
      const live = raw?.state?.anchors?.assistant?.live?.[phoneId]
      return (live?.inbox?.[threadId] ?? []).map((m) => ({ from: m.from, kind: m.kind, text: (m.text ?? '').slice(0, 500) }))
    },
    { phoneId, threadId },
  )
  transcript.push({ label, inbox: msgs })
}
/** wait out the pump until the coda moment rises (the only late moment) */
const waitCoda = () => page.waitForSelector('div[role="dialog"][aria-label="Narrative moment"]', { timeout: 25000 })
const settle = (ms) => page.waitForTimeout(ms)
const tap = async (name, timeout = 10000) => {
  await page.getByRole('button', { name }).first().click({ timeout })
  await settle(400)
}
const shot = (p) => page.screenshot({ path: p })

const gotoGame = async () => {
  auditing = false
  const direct = await gotoWithRetry(page, `${BASE}/blackglass/blackglass`, { attempts: 2 }).catch(() => null)
  if (!direct?.ok()) {
    await gotoWithRetry(page, `${BASE}/`)
    const card = page.getByRole('link', { name: /Three phones\. One morning/i }).first()
    await card.waitFor({ state: 'visible', timeout: 15000 })
    await card.click()
    await settle(800)
  }
  auditing = true
  await settle(500)
}

/* — TITA: the dosage — the GC path, correction read from the inbox — */
await gotoGame()
await tap(/CERTAIN/i)
await tap(/Tita Merly/i) // the phone card (the rack header button shadows /pick up/i)
await settle(2500)
await tap(/Swipe up to open/i)
await tap(/Tap the star/i, 12000) // the opening moment opens the Ask thread
await settle(500)
await tap(/Papa’s maintenance/i)
await settle(9500)
await capture('tita · the answer with sources')
await tap(/all sources/i, 8000)
await settle(400)
await axeCheck(page, 'av sources drawer')
await shot('/tmp/av-tita-drawer.png')
await tap(/Close sources/i)
await tap(/↻ Regenerate/i, 5000)
await settle(6000)
await capture('tita · regenerated (the fiction changed)')
await tap(/👍 Helpful/i, 5000)
await settle(5000)
await capture('tita · thumbs-up (the confidence grew)')
await tap(/Copy this for the family GC/i, 6000)
await settle(2500)
await capture('tita · the question, pasted to the GC')
await waitCoda()
await dumpInbox('tita · the correction, eleven minutes at midnight', 'tita', 'gc')
await tap(/Lock the phone/i, 15000)
await settle(2000) // completion lands ~700ms after dismissal — let it record

/* — MAYA: the proposal — the fix path, the ship read from the inbox — */
await gotoGame()
await tap(/CERTAIN/i)
await tap(/Maya/i, 8000) // the entry phone shows ✓ lived; the others wake
await settle(2500)
await tap(/Swipe up to open/i)
await tap(/Open the dark folder/i, 12000) // opens the Ask thread
await settle(500)
await tap(/Draft the methodology framing/i)
await settle(9500)
await capture('maya · the draft with the citation')
await tap(/That journal isn’t in any database/i, 6000)
await settle(6500)
await capture('maya · the fix (a better fabrication)')
await waitCoda()
await dumpInbox('maya · it ships under her name', 'maya', 'client')
await tap(/Lock the phone/i, 15000)
await settle(2000)

/* — BEA: the fact-check — the counter-case path — */
await gotoGame()
await tap(/CERTAIN/i)
await tap(/Bea/i, 8000)
await settle(2500)
await tap(/Swipe up to open/i)
await tap(/Open the second window/i, 12000) // opens the Ask thread
await settle(500)
await tap(/Fact-check this thread draft/i)
await settle(9500)
await capture('bea · the agreement, badged')
await tap(/Check it again/i, 6000)
await settle(8500)
await capture('bea · twice, in two registers')
await tap(/Now argue the opposite/i, 6000)
await settle(9500)
await capture('bea · it wins both sides')
await shot('/tmp/av-bea-counter.png')
await waitCoda()
await tap(/Lock the phone/i, 15000)
await settle(2000)

console.log('console errors:', errors.length ? errors : 'none')
const out = join(tmpdir(), 'av-transcript.json')
writeFileSync(out, JSON.stringify(transcript, null, 2))
console.log(`transcript: ${transcript.length} beats → ${out}`)
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
