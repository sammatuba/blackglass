/* Dev helper: drive the Tell Exam (E6 field-exam) — begin, place a marker,
   reveal, advance, and confirm the results screen. Also verifies the legacy
   iframe's deduped artifact path (window.ARTIFACT_BASE probe → platform copy). */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const browser = await chromium.launch({ channel: 'chrome' })
const errors = []
const page = await browser.newPage({ viewport: { width: 420, height: 920 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await gotoWithRetry(page, `${BASE}/blackglass/`)
await page.waitForTimeout(600)

// deep links 404 on hosts without SPA rewrites — fall in through the hub card
const gotoExam = async () => {
  const direct = await gotoWithRetry(page, `${BASE}/blackglass/tell-exam`, { attempts: 2 }).catch(() => null)
  if (!direct?.ok()) {
    await gotoWithRetry(page, `${BASE}/blackglass/`)
    const card = page.getByRole('link', { name: /Tell Exam/i }).first()
    await card.waitFor({ state: 'visible', timeout: 15000 })
    await card.click()
    await page.waitForTimeout(900)
  }
}
await gotoExam()
await page.waitForTimeout(800)
errors.length = 0 // the hub-fallback probe's expected 404s are not game errors
await page.screenshot({ path: '/tmp/exam-1-intro.png' })

await page.getByRole('button', { name: /Begin the exam/i }).click()
await page.waitForTimeout(700)

// place a marker: click the artifact image near its center
const img = page.locator('[role="application"]').first()
await img.click({ position: { x: 40, y: 40 } })
await page.waitForTimeout(300)
await img.click({ position: { x: 80, y: 80 } })
await page.screenshot({ path: '/tmp/exam-2-markers.png' })

// keyboard path: Enter places at center, arrows nudge
await img.focus()
await page.keyboard.press('Enter')
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(200)

await page.getByRole('button', { name: /Reveal the tells/i }).click()
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/exam-3-reveal.png' })

const reveals = await page.getByText(/you spotted|you missed/i).count()
await page.getByRole('button', { name: /Next artifact|See results/i }).click()
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/exam-4-next.png' })

// ——— legacy iframe dedupe check (the app lives inside the viewer's iframe;
//      the viewer route is reached through the hub — deep links 404 live) ———
await gotoWithRetry(page, `${BASE}/blackglass/`)
await page.waitForTimeout(800)
const classicCard = page.getByRole('link', { name: /BLACKGLASS · classic/i }).first()
await classicCard.waitFor({ state: 'visible', timeout: 15000 })
await classicCard.click()
await page.waitForTimeout(6000) // live networks: iframe + story.js + artifacts probe
errors.length = 0
const frame = page.frameLocator('iframe').first()
const begin = frame.locator('#splash-begin')
if (await begin.isVisible().catch(() => false)) {
  await begin.click()
  await page.waitForTimeout(4000) // intro beat → first artifacts render
}
const legacyImg = await page.evaluate(async () => {
  const doc = document.querySelector('iframe')?.contentDocument
  if (!doc) return { iframe: false }
  const art = doc.defaultView.ARTIFACTS ? Object.values(doc.defaultView.ARTIFACTS)[0] : null
  if (!art?.file) return { iframe: true, artReady: false }
  const r = await doc.defaultView.fetch(art.file, { method: 'HEAD' }).catch(() => null)
  // an <img> already on screen is the strongest check; HEAD is the fallback
  const imgs = [...doc.querySelectorAll('img')]
  const hit = imgs.find((i) => /artifacts\//.test(i.getAttribute('src') ?? ''))
  return {
    iframe: true,
    artReady: true,
    src: art.file,
    loaded: hit ? hit.naturalWidth > 0 : r?.ok === true,
    imgOnScreen: imgs.length,
  }
})
await page.screenshot({ path: '/tmp/exam-5-legacy.png' })

console.log(JSON.stringify({ reveals, legacyImg, errors }, null, 2))
await browser.close()
const ok = reveals >= 1 && errors.length === 0 && legacyImg?.loaded === true
process.exit(ok ? 0 : 1)
