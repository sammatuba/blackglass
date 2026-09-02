/* Dev helper: drive the BLACKGLASS anthology on glassOS — Maya's full
   morning (unlock, wake beat, the GC, the DECIDE choice, coda), the
   unlock of Tita and Bea, Tita's recognition beat, and the epilogue. */
import { chromium } from 'playwright-core'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const tap = async (name, timeout = 6000) => {
  await page.getByRole('button', { name }).first().click({ timeout })
  await page.waitForTimeout(400)
}
const settle = (ms) => page.waitForTimeout(ms)
const shot = (p) => page.screenshot({ path: p })

await page.goto(`${BASE}/blackglass/blackglass`, { waitUntil: 'networkidle' })
await settle(700)
await shot('/tmp/bg-1-rack.png')

// MAYA — pick up the phone
await tap(/pick up/i)
await settle(8200) // the opening pushes buzz in on the lock screen (~8s)
await shot('/tmp/bg-2-maya-lock.png')
await tap(/Swipe up to open/i)
await tap(/Open the family GC/i, 12000) // the wake moment (after the pump drains)
await settle(300)
await shot('/tmp/bg-3-maya-wake.png')

// open the GC thread and let the stop chain land
await tap(/Open Messages/i)
await tap(/Santos Family GC/i)
await settle(9000)
await shot('/tmp/bg-4-maya-gc.png')

// THE CHOICE — heart-react (the moral fulcrum)
await tap(/❤️ and scroll past/i)
await settle(3000)
await shot('/tmp/bg-5-maya-choice.png')
await tap(/Lock the phone/i, 10000) // the coda moment
await settle(400)
await shot('/tmp/bg-6-maya-coda.png')
await settle(2200) // completion lands you back on the rack; the others wake
await shot('/tmp/bg-7-rack-unlocked.png')

// TITA — recognition beat should fire (maya lived)
await tap(/pick up/i, 4000) // first pick-up card = Tita (anchor order)
await settle(4500) // opening pushes on the lock screen
await tap(/Swipe up to open/i)
await tap(/Pick up the phone/i, 12000) // the kitchen moment
await settle(300)
await shot('/tmp/bg-8-tita-kitchen.png')
await tap(/Open Viber/i, 8000).catch(async () => {
  // the dismiss label routes home; open the thread from Messages
  await tap(/Open Messages/i)
  await tap(/Joy A\./i)
})
await settle(9000) // Joy's chain (typing beat + pushes)
await shot('/tmp/bg-9-tita-joy.png')

// FORWARD: the voice-note path (all paths reconverge on the forward)
await tap(/Send Joy a voice note/i)
await settle(4000)
await shot('/tmp/bg-10-tita-forward.png') // the composed forward in the GC
await tap(/Later that morning/i, 12000) // the kitchen coda moment
await settle(3500) // recognition chain (maya lived): her question lands
await shot('/tmp/bg-11-tita-recog.png')
await settle(6000) // let the chain drain → completion → rack
await shot('/tmp/bg-12-rack-2of3.png')

// BEA — the trap that agrees with her
await tap(/pick up/i, 5000)
await settle(4000)
await tap(/Swipe up to open/i)
await tap(/Open Maya first/i, 12000) // the insomnia moment
await settle(5000) // her fast correct debunk lands
await tap(/Open Messages/i)
await tap(/maya 4ever/i)
await settle(2500)
await shot('/tmp/bg-13-bea-maya.png')
await tap(/Open TikTok/i) // the CONSULT choice
await settle(6000) // the trap: Dr. Anita link lands
await shot('/tmp/bg-14-bea-trap.png')
await tap(/Don’t put it down yet/i, 15000) // the afterglow moment
await settle(4000) // recognition: the share travels
await shot('/tmp/bg-15-bea-recog.png')
await settle(6000) // drain → rack, all three lived
await shot('/tmp/bg-16-rack-done.png')

// THE EPILOGUE — the one timeline none of them could see
await tap(/The morning, all at once/i, 5000)
await settle(1500)
await shot('/tmp/bg-17-timeline.png')

console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
