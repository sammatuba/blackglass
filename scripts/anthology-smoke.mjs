/* Dev helper: drive the BLACKGLASS anthology on glassOS.
   Covers: anchor select, voiceclone (Tita: the cloned-voice call, the
   GCash send, the real-Renz reveal), a full fiveweeks run to the
   dynamic timeline, and a deepfake spot-check.
   TRANSCRIPT=1 additionally dumps the visible chat bubbles at each beat to
   <tmpdir>/bg-transcript.json — the E2 playthrough judge's input
   (docs/game-design-eval.md, facet 2). */
import { chromium } from 'playwright-core'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { gotoWithRetry } from './lib/nav.mjs'
import { axeCheck } from './lib/axe.mjs'

const TRANSCRIPT = !!process.env.TRANSCRIPT
const transcript = []
const capture = async (label) => {
  if (!TRANSCRIPT) return
  const msgs = await page.evaluate(() =>
    [...document.querySelectorAll('[data-msg]')].map((el) => ({
      from: el.dataset.from,
      text: (el.innerText ?? '').slice(0, 400),
    })),
  )
  transcript.push({ label, url: page.url(), msgs })
}

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch({ channel: 'chrome' })
const errors = []
// console errors are only collected while we're actually in the game: the
// hub fallback probes a deep link that 404s on hosts without SPA rewrites
let auditing = false
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
// smoke runs use the fast pace; cadence math is covered by pacing.test.ts
await page.addInitScript(() => {
  try {
    localStorage.setItem('cgAI_glassos_pace', '8')
  } catch {
    /* about:blank */
  }
})
page.on('console', (m) => m.type() === 'error' && auditing && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const tap = async (name, timeout = 8000) => {
  await page.getByRole('button', { name }).first().click({ timeout })
  await page.waitForTimeout(400)
}
const settle = (ms) => page.waitForTimeout(ms)
const shot = (p) => page.screenshot({ path: p })
const tryTap = async (name, timeout = 2000) => {
  try {
    const loc = page.getByRole('button', { name }).first()
    await loc.waitFor({ state: 'visible', timeout })
    await loc.click({ timeout })
    await settle(300)
    return true
  } catch {
    return false
  }
}

// enter the game (deep link locally; hub fallback where the host 404s a route)
const gotoGame = async () => {
  auditing = false
  // the deep link is expected to 404 where the host has no SPA fallback; never
  // wait for networkidle on it — a 404 document can leave the request hung
  const direct = await gotoWithRetry(page, `${BASE}/blackglass/blackglass`, { attempts: 2 }).catch(() => null)
  if (!direct?.ok()) {
    await gotoWithRetry(page, `${BASE}/blackglass/`)
    const card = page.getByRole('link', { name: /Three phones\. One morning/i }).first()
    await card.waitFor({ state: 'visible', timeout: 15000 })
    await card.click()
    await settle(800)
  }
  auditing = true
  await settle(500)
}

await gotoGame()
await shot('/tmp/bg-0-select.png')

/* ============ ANCHOR II — IT'S ME (voiceclone) ============ */
await tap(/IT’S ME/i)
await settle(500)
await shot('/tmp/bg-1-vc-rack.png')
await tap(/Tita Merly/i)
await settle(4500) // opening pushes: voice note + number + damage photo
await tap(/Swipe up to open/i)
await tap(/Open Viber/i, 12000) // the kitchen moment opens the thread
await settle(300)
await shot('/tmp/bg-2-vc-kitchen.png')
await settle(6500) // the listen chain: play, the transcript aside, it's him
await shot('/tmp/bg-3-vc-voice.png')
await capture('voiceclone · the listen chain')
await axeCheck(page, 'anthology vc thread')

// the choice — and the clone calls live
await tap(/Ask him where he is/i)
await settle(800)
await shot('/tmp/bg-4-vc-call.png')
await tap(/Accept/i, 5000)
await settle(3200) // transcript lines land
await shot('/tmp/bg-5-vc-live.png')
await capture('voiceclone · live call transcript')
await tap(/End call/i, 5000)
await settle(1500)
// the ledger moment rises before the send (P2 cross-reference); its button
// opens the Wallet — dismiss, then go home via the gesture bar
await tap(/Open the ledger/i, 8000)
await settle(500)

// the send (home → Messages → the GCash thread)
await tap(/^Home$/i, 4000)
await tap(/Open Messages/i)
await tap(/Send Money/i, 8000)
await settle(2500)
await shot('/tmp/bg-6-vc-gcash.png')
await capture('voiceclone · the send')
await tap(/Send it — he needs you right now/i)
await settle(2200) // success + the GC reveal starts landing
// at fast test pace the case can drain before the script follows it into the
// GC; if the phone handed back early, that completion is the thing we wanted
if (await page.getByRole('button', { name: /^Home$/i }).first().isVisible().catch(() => false)) {
  await tryTap(/^Home$/i)
  await tryTap(/Open Messages/i)
  await tryTap(/Santos Family GC/i)
}
await settle(8000) // drain → completion → rack, the others wake
await shot('/tmp/bg-8-vc-rack-awake.png')

/* ============ ANCHOR IV — FIVE WEEKS (full run) ============ */
await gotoGame()
await tap(/FIVE WEEKS/i)
await settle(400)
await tap(/Bea/i)
await settle(700)
await tap(/Swipe up to open/i)
await tap(/Open the feed/i, 12000) // the Week 1 moment opens the feed
await settle(800)
await tap(/Cut the caveats/i)
await settle(3500)
await tap(/Cut the hedges/i)
await settle(3500)
await tap(/Quote-post the correction/i)
await settle(3500)
await tap(/Leave them muted/i)
await settle(2000)
await tap(/Open the Wallet/i, 8000) // the ledger moment (P2) rises before the webinar — dismiss it
await settle(5000) // the webinar chain drains → completion
await shot('/tmp/bg-9-5w-webinar.png')
await axeCheck(page, 'anthology 5w webinar')
await settle(2500)
await tap(/What five weeks did/i, 8000)
await settle(1200)
await shot('/tmp/bg-10-5w-timeline.png')
await capture('fiveweeks · dynamic timeline')

/* ============ ANCHOR III — GUARANTEED (Tita spot-check) ============ */
await gotoGame()
await tap(/GUARANTEED/i)
await settle(400)
await tap(/Tita Merly/i)
await settle(4000)
await tap(/Swipe up to open/i)
await tap(/Open Viber/i, 12000) // the Sunday moment opens the thread
await settle(5500) // the watch chain
await shot('/tmp/bg-11-df-linda.png')
await tap(/Forward to the family GC/i)
await settle(2000)
await tap(/Open the Wallet/i, 8000) // the ledger moment (P2) rises before the registration branch
await tryTap(/^Home$/i)
await tryTap(/Open Messages/i)
await tryTap(/Auntie Linda/i)
await tap(/Reserve a slot/i, 8000)
await settle(1500)
await shot('/tmp/bg-12-df-register.png')
await tap(/Lock the phone/i, 12000) // the "what you do not see" coda
await settle(500)
await shot('/tmp/bg-13-df-coda.png')
await capture('deepfake · the coda')
await settle(2500)

/* ============ ANCHOR I — THREE PHONES (spot-check) ============ */
await gotoGame()
await tap(/THREE PHONES/i)
await tap(/Maya/i)
await settle(8200)
await tap(/Swipe up to open/i)
await tap(/Open the family GC/i, 12000) // opens the GC
await settle(9000)
await tap(/❤️ and scroll past/i)
await tap(/Lock the phone/i, 10000)
await settle(2500)
await shot('/tmp/bg-14-kangkong-awake.png')

/* ============ ANCHOR V — CERTAIN (Ask spot-check: Tita's dosage) ============ */
await gotoGame()
await tap(/CERTAIN/i)
await settle(400)
await tap(/Tita Merly/i)
await settle(3000)
await tap(/Swipe up to open/i)
await tap(/Tap the star/i, 12000) // the opening moment opens the Ask thread
await settle(400)
await shot('/tmp/bg-15-av-home.png')
await settle(600)
await shot('/tmp/bg-16-av-ask.png')
await tap(/Papa’s maintenance/i) // the first prompt
await settle(9000) // compose beat + streaming answer
await shot('/tmp/bg-17-av-answer.png')
await capture('assistant · the dosage answer')
await tap(/all sources/i, 8000) // the drawer of checked citations
await settle(500)
await shot('/tmp/bg-18-av-sources.png')
await tap(/Close sources/i)
await tap(/↻ Regenerate/i, 4000)
await settle(5000) // the regen composes in fresh
await shot('/tmp/bg-19-av-regen.png')
await capture('assistant · regenerated')
await tap(/So I give him the 10 tonight/i, 8000) // the follow prompt
await settle(2500)
await tryTap(/Open the Wallet/i, 6000) // the ledger moment (P2) rises before the correction — dismiss it
await settle(1500)
// beat the coda out the door: watch Joy's correction land in the GC if the
// pump is still draining; the moment overlay wins otherwise (tolerant taps)
await tryTap(/Home/i)
await tryTap(/Open Messages/i)
await tryTap(/Santos Family GC/i)
await settle(9000)
await shot('/tmp/bg-20-av-correction.png')
await capture('assistant · the correction')
await tap(/Lock the phone/i, 15000) // the coda moment (up or rising)
await settle(500)
await shot('/tmp/bg-21-av-coda.png')

console.log('console errors:', errors.length ? errors : 'none')
if (TRANSCRIPT) {
  const out = join(tmpdir(), 'bg-transcript.json')
  writeFileSync(out, JSON.stringify(transcript, null, 2))
  console.log(`transcript: ${transcript.length} beats → ${out}`)
}
await browser.close()
process.exit(errors.length === 0 ? 0 : 2)
