/* Dev helper: Anchor VI (DRAFT) — flag-gated season check.
   1. without ?draft=vi the compromised-phone card must NOT exist
   2. with ?draft=vi: the phone plays — the ghost tile opens its exposing
      page, the P4 stage flips to uneasy, screen-time + ledger surfaces render
   3. axe serious/critical clean at every held state
   Local: node scripts/draft-vi-smoke.mjs   (against npm run preview) */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'
import { axeCheck } from './lib/axe.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch({ channel: 'chrome' })
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
await page.addInitScript(() => {
  try {
    localStorage.setItem('cgAI_glassos_pace', '8')
  } catch {
    /* about:blank */
  }
})
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))
const settle = (ms) => page.waitForTimeout(ms)
const tapWhen = async (name, timeout = 15000) => {
  const loc = page.getByRole('button', { name }).first()
  await loc.waitFor({ state: 'visible', timeout })
  await loc.click()
  await settle(400)
}
const tryTap = async (name, timeout = 2500) => {
  try {
    const loc = page.getByRole('button', { name }).first()
    await loc.waitFor({ state: 'visible', timeout })
    await loc.click()
    await settle(300)
    return true
  } catch {
    return false
  }
}
const assert = (cond, msg) => {
  if (!cond) throw new Error(`ASSERT: ${msg}`)
}

/* ---- 1. gated: no card without the flag ---- */
let direct = await gotoWithRetry(page, `${BASE}/blackglass/blackglass`, { attempts: 2 }).catch(() => null)
if (!direct?.ok()) {
  await gotoWithRetry(page, `${BASE}/blackglass/`)
  const card = page.getByRole('link', { name: /Three phones\. One morning/i }).first()
  await card.waitFor({ state: 'visible', timeout: 15000 })
  await card.click()
  await settle(800)
}
await settle(500)
assert((await page.getByText(/THE COMPROMISED PHONE/i).count()) === 0, 'draft card is hidden without ?draft=vi')

/* ---- 2. flagged: the draft anchor plays ---- */
direct = await gotoWithRetry(page, `${BASE}/blackglass/blackglass?draft=vi`, { attempts: 2 }).catch(() => null)
if (!direct?.ok()) throw new Error('the ?draft=vi route did not load')
await settle(800)
await tapWhen(/THE COMPROMISED PHONE/i)
await settle(400)
await tapWhen(/You \(DRAFT\)/i) // DRAFT/TBC title — smoke updated when canon lands
await settle(4500) // opening pushes: the 3:47 sends
await tapWhen(/Swipe up to open/i)
await tapWhen(/Pick it up/i, 12000) // the hand-over moment opens the GC
await settle(1200)
assert((await page.getByText(/3:47 AM/).count()) > 0, 'the sends-you-did-not-make are in the GC')
const stageBefore = await page.locator('.os-skin[data-stage]').getAttribute('data-stage')
assert(stageBefore === 'clean', `stage starts clean (got ${stageBefore})`)

/* ---- the SPOT loop: reply → home → ghost tile → the page exposes it ---- */
await tapWhen(/Open System Tools/i)
await settle(2500)
await tapWhen(/^Home$/i, 8000)
await tapWhen(/Open System Tools/i, 8000) // the ghost tile — native-looking, not native
await settle(1200)
assert((await page.getByText(/Installed: 11 days ago/).count()) > 0, 'the exposing page renders')
assert((await page.getByText(/You have never opened this app on purpose/).count()) > 0, 'the tell is authored on the page')
const stageAfter = await page.locator('.os-skin[data-stage]').getAttribute('data-stage')
assert(stageAfter === 'uneasy', `finding the first anomaly moves the stage to uneasy (got ${stageAfter})`)
await axeCheck(page, 'draft-vi exposing page')

/* ---- screen-time surface (Settings) ---- */
await tapWhen(/^Home$/i, 8000)
await tapWhen(/Open Settings/i, 8000)
assert((await page.getByText(/System services/).count()) > 0, 'screen-time rows render in Settings')
assert((await page.getByText(/2:58–4:12 AM/).count()) > 0, 'the overnight gap is authored data')
await axeCheck(page, 'draft-vi screentime')

/* ---- the ledger row you never sent ---- */
await tapWhen(/^Home$/i, 8000)
await tapWhen(/Open Wallet/i, 8000)
assert((await page.getByText(/3:47 AM/).count()) > 0, 'the 3:47 transfer sits in the ledger')
await page.getByRole('button', { name: /Transfer · 0915-•••-•••• · 3:47 AM/ }).first().click()
await settle(600)
assert((await page.getByText(/You were asleep at 3:47 AM/).count()) > 0, 'the row re-reads as the verdict')
await axeCheck(page, 'draft-vi ledger')

/* ---- complete the SPOT loop: mail rule + screen time → assembly ---- */
await tapWhen(/^Home$/i, 8000)
await tapWhen(/Open Messages/i, 8000)
await tapWhen(/Santos Family GC/i, 8000)
await tapWhen(/Check the mail rules/i, 8000)
await settle(2000)
await tapWhen(/Tap to open in Browser/i, 8000) // the pushed link → the forwarding page
await settle(800)
assert((await page.getByText(/records-keeper@vaultmail\.services/).count()) > 0, 'the forwarding rule renders')
// the routine moment (systemic cause, V2) rises after the second anomaly —
// it holds the pass, so dismiss it before navigating
await tapWhen(/Keep looking/i, 10000)
await settle(500)
await tapWhen(/^Home$/i, 8000)
await tapWhen(/Open Messages/i, 8000)
await tapWhen(/Santos Family GC/i, 8000)
await tapWhen(/Check the screen time/i, 8000)
await settle(2000) // the nudge opens Settings; assembly flips the stage
assert((await page.locator('.os-skin[data-stage]').getAttribute('data-stage')) === 'compromised', 'full assembly moves the stage to compromised')
// the guide push + mirror epilogue rise in the same drain — the performed
// report is on screen before you sign it
await page.getByRole('button', { name: /Sign the report/i }).first().waitFor({ state: 'visible', timeout: 12000 })
assert((await page.getByText(/field at the bottom of the report/).count()) > 0, 'the performed report renders')
await tapWhen(/Sign the report/i, 8000)

/* ---- completion → the rack wakes Mama (phone 2) ---- */
await settle(4500)
await tapWhen(/Mama \(DRAFT\)/i, 12000)
await settle(4500)
await tapWhen(/Swipe up to open/i)
await tapWhen(/Read what arrived/i, 12000)
await settle(800)
assert((await page.getByText(/3:47 AM/).count()) > 0, 'Mama’s phone shows the sends as they arrived')
// her replies live in the DM to the holder, not the GC the moment opens —
// navigate with tolerant taps (banners and beats can sit over any one step)
await tryTap(/^Home$/i)
await tryTap(/^Home$/i)
await tryTap(/Open Messages/i)
await tryTap(/Anak/i)
await tapWhen(/okay ka lang ba talaga/i, 12000)
await settle(2500)
// the mirror text is on screen before you put the phone down
await page.getByRole('button', { name: /Put the phone down/i }).first().waitFor({ state: 'visible', timeout: 12000 })
assert((await page.getByText(/smallest plainest words she has/).count()) > 0, 'the epilogue mirror lands on Mama')
await tapWhen(/Put the phone down/i, 8000)
await axeCheck(page, 'draft-vi mama mirror')

console.log('draft-vi ok — errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
