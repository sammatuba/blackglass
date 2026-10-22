/* Dev helper: drive Glassbox 02 — hub entry, all four pinned sections,
   the weight sliders, the 35-day chart, the cap, the context payment,
   the 320px fit, reduced motion, overflow, and axe. Deep links may 404
   on hosts without SPA rewrites, so the driver falls in through the hub.
     Local: node scripts/feed-dial-smoke.mjs
     Live:  SHOT_BASE=https://sammatuba.github.io node scripts/feed-dial-smoke.mjs */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'
import { axeCheck } from './lib/axe.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const ROOT = `${BASE}/blackglass`
const PAGE = `${ROOT}/glassbox/the-feed-dial`
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' },
)
const errors = []
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const gotoFeedDial = async (target = page) => {
  const direct = await gotoWithRetry(target, PAGE, { attempts: 2 }).catch(() => null)
  if (!direct?.ok()) {
    await gotoWithRetry(target, `${ROOT}/`)
    const card = target.getByRole('link', { name: /The Feed Dial/i }).first()
    await card.waitFor({ state: 'visible', timeout: 15000 })
    await card.click()
    await target.waitForTimeout(900)
    return true
  }
  return false
}

const focusStep = async (target, sectionId, index, settle = 220) => {
  await target.evaluate(
    ({ sectionId, index }) => {
      const section = document.getElementById(sectionId)
      const inner = section.querySelectorAll('.scrolly-step-inner')[index]
      const focus = innerHeight * (matchMedia('(min-width: 900px)').matches ? 0.48 : 0.64)
      window.scrollBy(0, inner.getBoundingClientRect().top - focus)
    },
    { sectionId, index },
  )
  await target.waitForTimeout(settle)
  return (await target.locator(`#${sectionId} .scrolly`).getAttribute('data-active-step')) ?? ''
}

const stageFit = async (target, sectionId) => {
  const stage = await target.locator(`#${sectionId} .scrolly-stage`).boundingBox()
  const inner = await target.locator(`#${sectionId} .scrolly-stage > *`).boundingBox()
  return stage && inner ? Math.round(inner.height - stage.height) : null
}

const text = (target, selector) =>
  target.locator(selector).first().textContent().then((value) => value?.trim() ?? '')

const percentIn = (value) => Number(value.match(/(\d+(?:\.\d+)?)%/)?.[1] ?? NaN)

const nudgeRange = async (target, selector, key, times = 1) => {
  await target.locator(selector).focus()
  for (let i = 0; i < times; i++) await target.keyboard.press(key)
  await target.waitForTimeout(250)
}

// ——— hub integration ———
await gotoWithRetry(page, `${ROOT}/`)
await page.waitForTimeout(1000)
const featureVisible = await page.locator('[data-od-id="glassbox-feature"]').first().isVisible()
const feedCard = page.locator('a[href*="/glassbox/the-feed-dial"]').first()
const feedCardVisible = await feedCard.isVisible()
const feedCardText = (await feedCard.textContent())?.replace(/\s+/g, ' ').trim() ?? ''
const hubAxe = await axeCheck(page, 'hub with Feed Dial')
const hubOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
await feedCard.scrollIntoViewIfNeeded()
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/feed-dial-0-hub.png' })
const hubErrors = [...errors]
errors.length = 0

// ——— direct route (with live fallback) ———
const fellBack = await gotoFeedDial()
await page.waitForTimeout(700)
if (fellBack) errors.length = 0
const heading = await page.getByRole('heading', { name: /the feed dial/i, level: 1 }).count()
const railDisplay = await page.locator('.scroll-progress').evaluate((el) => getComputedStyle(el).display)
const heroSlip = (await text(page, '[data-od-id="feed-hero"] .feed-slip')).replace(/\s+/g, ' ')
await page.screenshot({ path: '/tmp/feed-dial-1-hero.png' })

// ——— scrolly: every step activates and every stage fits ———
const sections = ['feed', 'dial', 'weeks', 'cap']
const stepCounts = { feed: 4, dial: 4, weeks: 4, cap: 4 }
const inactiveSteps = []
const stageClipping = []
let projectionDefault = ''
let projectionMax = ''
let projectionMin = ''
let projectionRestored = ''
let chartBars = 0
let weekOneLine = ''
let weekFiveLine = ''
let capConflict = ''
let capContext = ''
let capClicks = ''
let capConflictCapped = ''
let capContextCapped = ''
let capNoveltyLeads = false
let capContextLeads = false
let capClicksCapped = ''
let capPaidPressed = null
let capConflictPaid = ''
let capContextPaid = ''
let capClicksPaid = ''
let capMarkerDefault = ''
let capMarkerPaid = ''
let capStageFitPaid = null
let capConflictUncappedPaid = ''
let capContextUncappedPaid = ''

for (const id of sections) {
  for (let i = 0; i < stepCounts[id]; i++) {
    const active = await focusStep(page, id, i)
    if (active !== String(i)) inactiveSteps.push(`${id}:${i}→${active}`)
    const clip = await stageFit(page, id)
    if (clip === null || clip > 1) stageClipping.push(`${id}:${clip}`)

    if (id === 'dial' && i === 0) {
      projectionDefault = await text(page, '[data-od-id="feed-projection-conflict"]')
      const slider = page.locator('#conflict-boost')
      await slider.focus()
      await page.keyboard.press('End')
      await page.waitForTimeout(300)
      projectionMax = await text(page, '[data-od-id="feed-projection-conflict"]')
      await page.keyboard.press('Home')
      await page.waitForTimeout(300)
      projectionMin = await text(page, '[data-od-id="feed-projection-conflict"]')
      // return to the default 2× so the cap section measures the shipped dial
      await nudgeRange(page, '#conflict-boost', 'ArrowRight', 20)
      projectionRestored = await text(page, '[data-od-id="feed-projection-conflict"]')
    }
    if (id === 'weeks' && i === 0) {
      weekOneLine = await text(page, '[data-od-id="feed-weeks"] .feed-week-line')
      chartBars = await page.locator('[data-od-id="feed-weeks"] .feed-chart-day').count()
    }
    if (id === 'weeks' && i === 3) {
      weekFiveLine = await text(page, '[data-od-id="feed-weeks"] .feed-week-line')
      await page.screenshot({ path: '/tmp/feed-dial-4-weeks.png' })
    }
    if (id === 'cap' && i === 3) {
      capConflict = await text(page, '[data-od-id="feed-cap-conflict"]')
      capContext = await text(page, '[data-od-id="feed-cap-context"]')
      capClicks = await text(page, '[data-od-id="feed-cap-clicks"]')
      capMarkerDefault = await page
        .locator('[data-od-id="feed-cap-marker"]')
        .evaluate((el) => el.style.left)
      await page.screenshot({ path: '/tmp/feed-dial-5-cap.png' })
    }
    if (id === 'feed' && i === 3) {
      await page.screenshot({ path: '/tmp/feed-dial-2-feed.png' })
    }
    if (id === 'dial' && i === 2) {
      await page.screenshot({ path: '/tmp/feed-dial-3-dial.png' })
    }
  }
}

// ——— the cap and the context payment ———
await focusStep(page, 'cap', 3)
await nudgeRange(page, '#conflict-cap', 'End')
capConflictCapped = await text(page, '[data-od-id="feed-cap-conflict"]')
capContextCapped = await text(page, '[data-od-id="feed-cap-context"]')
capClicksCapped = await text(page, '[data-od-id="feed-cap-clicks"]')
capNoveltyLeads = percentIn(capConflictCapped) < percentIn(capContextCapped)
const capPaidButton = page.getByRole('button', { name: /Pay for context/i })
await capPaidButton.click()
await page.waitForTimeout(350)
capPaidPressed = await capPaidButton.getAttribute('aria-pressed')
capConflictPaid = await text(page, '[data-od-id="feed-cap-conflict"]')
capContextPaid = await text(page, '[data-od-id="feed-cap-context"]')
capClicksPaid = await text(page, '[data-od-id="feed-cap-clicks"]')
capContextLeads = percentIn(capContextPaid) > percentIn(capConflictPaid)
capMarkerPaid = await page.locator('[data-od-id="feed-cap-marker"]').evaluate((el) => el.style.left)
capStageFitPaid = await stageFit(page, 'cap')
await page.screenshot({ path: '/tmp/feed-dial-6-cap-paid.png' })

await nudgeRange(page, '#conflict-cap', 'Home')
capConflictUncappedPaid = await text(page, '[data-od-id="feed-cap-conflict"]')
capContextUncappedPaid = await text(page, '[data-od-id="feed-cap-context"]')
await capPaidButton.click()
await page.waitForTimeout(250)
const capPaidPressedOff = await capPaidButton.getAttribute('aria-pressed')

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
await page.waitForTimeout(700)
await page.screenshot({ path: '/tmp/feed-dial-7-close.png' })
const axe = await axeCheck(page, 'feed dial')

// ——— 320px: no overflow, every pinned sheet still fits ———
await page.setViewportSize({ width: 320, height: 568 })
await page.waitForTimeout(400)
const smallOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
const smallClipping = []
const smallActive = []
for (const id of sections) {
  const active = await focusStep(page, id, stepCounts[id] - 1, 300)
  smallActive.push(`${id}:${active}`)
  const clip = await stageFit(page, id)
  if (clip === null || clip > 1) smallClipping.push(`${id}:${clip}`)
}
await page.screenshot({ path: '/tmp/feed-dial-8-small.png' })

// ——— desktop: sticky stage and active steps ———
const desktopErrors = []
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
desktop.on('console', (m) => m.type() === 'error' && desktopErrors.push(m.text()))
desktop.on('pageerror', (e) => desktopErrors.push(String(e)))
await gotoFeedDial(desktop)
await desktop.waitForTimeout(500)
const desktopActive = []
let desktopSticky = false
for (const id of sections) {
  const active = await focusStep(desktop, id, stepCounts[id] - 1, 300)
  desktopActive.push(`${id}:${active}`)
  if (id === 'weeks') {
    await desktop.screenshot({ path: '/tmp/feed-dial-9-desktop.png' })
    const stage = await desktop.locator('#weeks .scrolly-stage').boundingBox()
    desktopSticky = stage !== null && Math.round(stage.y) === 72
  }
}
const desktopOverflow = await desktop.evaluate(
  () => document.documentElement.scrollWidth - window.innerWidth,
)

// ——— reduced motion: static, readable, still interactive ———
const reducedErrors = []
const reduced = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
})
reduced.on('console', (m) => m.type() === 'error' && reducedErrors.push(m.text()))
reduced.on('pageerror', (e) => reducedErrors.push(String(e)))
await gotoFeedDial(reduced)
await reduced.waitForTimeout(500)
const reducedState = await reduced.evaluate(() => {
  const reveal = document.querySelector('.scroll-reveal')
  const rail = document.querySelector('.scroll-progress')
  return {
    revealOpacity: reveal ? getComputedStyle(reveal).opacity : null,
    revealTransform: reveal ? getComputedStyle(reveal).transform : null,
    rail: rail ? getComputedStyle(rail).display : null,
  }
})
await focusStep(reduced, 'cap', 3, 300)
await reduced.locator('#conflict-cap').focus()
await reduced.keyboard.press('End')
await reduced.waitForTimeout(250)
await reduced.getByRole('button', { name: /Pay for context/i }).click()
await reduced.waitForTimeout(250)
const reducedPaid = await reduced
  .getByRole('button', { name: /Pay for context/i })
  .getAttribute('aria-pressed')
const reducedConflict = await text(reduced, '[data-od-id="feed-cap-conflict"]')
const reducedContext = await text(reduced, '[data-od-id="feed-cap-context"]')
const reducedOverflow = await reduced.evaluate(
  () => document.documentElement.scrollWidth - window.innerWidth,
)

console.log(
  JSON.stringify(
    {
      featureVisible,
      feedCardVisible,
      feedCardText,
      hubOverflow,
      hubAxe,
      hubErrors,
      fellBack,
      heading,
      railDisplay,
      heroSlip,
      inactiveSteps,
      stageClipping,
      projectionDefault,
      projectionMax,
      projectionMin,
      projectionRestored,
      chartBars,
      weekOneLine,
      weekFiveLine,
      capConflict,
      capContext,
      capClicks,
      capConflictCapped,
      capContextCapped,
      capClicksCapped,
      capNoveltyLeads,
      capPaidPressed,
      capConflictPaid,
      capContextPaid,
      capClicksPaid,
      capContextLeads,
      capMarkerDefault,
      capMarkerPaid,
      capStageFitPaid,
      capConflictUncappedPaid,
      capContextUncappedPaid,
      capPaidPressedOff,
      overflow,
      axe,
      smallOverflow,
      smallClipping,
      smallActive,
      desktopActive,
      desktopOverflow,
      desktopSticky,
      desktopErrors,
      reducedState,
      reducedPaid,
      reducedConflict,
      reducedContext,
      reducedOverflow,
      reducedErrors,
      errors,
    },
    null,
    2,
  ),
)
await browser.close()

const markerMoved =
  parseFloat(capMarkerPaid) < parseFloat(capMarkerDefault) && Number.isFinite(parseFloat(capMarkerPaid))
const ok =
  errors.length === 0 &&
  desktopErrors.length === 0 &&
  reducedErrors.length === 0 &&
  axe === 0 &&
  hubAxe === 0 &&
  hubErrors.length === 0 &&
  featureVisible &&
  feedCardVisible &&
  /The Feed Dial/.test(feedCardText) &&
  /67%/.test(feedCardText) &&
  hubOverflow <= 1 &&
  heading === 1 &&
  railDisplay !== 'none' &&
  /1,247 → 2,547/.test(heroSlip) &&
  /No single week was a lie/.test(heroSlip) &&
  inactiveSteps.length === 0 &&
  stageClipping.length === 0 &&
  projectionDefault === 'conflict 67%' &&
  projectionMax === 'conflict 82%' &&
  projectionMin === 'conflict 27%' &&
  projectionRestored === 'conflict 67%' &&
  chartBars === 35 &&
  /Week 1/.test(weekOneLine) &&
  /44% conflict/.test(weekOneLine) &&
  /Week 5/.test(weekFiveLine) &&
  /67% conflict/.test(weekFiveLine) &&
  capConflict === '67%' &&
  capContext === '13%' &&
  capClicks === '11' &&
  capConflictCapped === '27%' &&
  capContextCapped === '29%' &&
  capClicksCapped === '8' &&
  capNoveltyLeads &&
  capPaidPressed === 'true' &&
  capConflictPaid === '22%' &&
  capContextPaid === '40%' &&
  capClicksPaid === '7.3' &&
  capContextLeads &&
  markerMoved &&
  capStageFitPaid !== null &&
  capStageFitPaid <= 1 &&
  capConflictUncappedPaid === '62%' &&
  capContextUncappedPaid === '20%' &&
  percentIn(capContextUncappedPaid) > 13 &&
  capPaidPressedOff === 'false' &&
  overflow <= 1 &&
  smallOverflow <= 1 &&
  smallClipping.length === 0 &&
  smallActive.join() === 'feed:3,dial:3,weeks:3,cap:3' &&
  desktopActive.join() === 'feed:3,dial:3,weeks:3,cap:3' &&
  desktopOverflow <= 1 &&
  desktopSticky &&
  reducedState.revealOpacity === '1' &&
  reducedState.revealTransform === 'none' &&
  reducedState.rail === 'none' &&
  reducedPaid === 'true' &&
  percentIn(reducedContext) > percentIn(reducedConflict) &&
  reducedOverflow <= 1
process.exit(ok ? 0 : 1)
