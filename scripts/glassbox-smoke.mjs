/* Dev helper: drive the Glassbox 01 scrollytelling dossier — hub entry,
   pinned stage on every step, the dot reveal, presets, the defense lever,
   the 320px fit, reduced motion, overflow, and axe. Deep links may 404 on
   hosts without SPA rewrites, so the driver falls in through the hub.
     Local: node scripts/glassbox-smoke.mjs
     Live:  SHOT_BASE=https://sammatuba.github.io node scripts/glassbox-smoke.mjs */
import { chromium } from 'playwright-core'
import { gotoWithRetry } from './lib/nav.mjs'
import { axeCheck } from './lib/axe.mjs'

const BASE = process.env.SHOT_BASE ?? 'http://localhost:4173'
const ROOT = `${BASE}/blackglass`
const PAGE = `${ROOT}/glassbox/one-in-a-thousand`
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' },
)
const errors = []
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const gotoGlassbox = async (target = page) => {
  const direct = await gotoWithRetry(target, PAGE, { attempts: 2 }).catch(() => null)
  if (!direct?.ok()) {
    await gotoWithRetry(target, `${ROOT}/`)
    const card = target.getByRole('link', { name: /One in a Thousand/i }).first()
    await card.waitFor({ state: 'visible', timeout: 15000 })
    await card.click()
    await target.waitForTimeout(900)
    return true
  }
  return false
}

/* Put a step's content on the reading line; the page's rAF-throttled
   scroll listener should then make that step active. This is a jump, which
   also proves Page Down / scrollbar drags do not leave the stage stale. */
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

const opacity = (target, selector) =>
  target.locator(selector).first().evaluate((el) => getComputedStyle(el).opacity)

// ——— hub integration ———
await gotoWithRetry(page, `${ROOT}/`)
await page.waitForTimeout(1000)
const feature = page.locator('[data-od-id="glassbox-feature"]')
const featureVisible = await feature.isVisible()
const shelf = page.locator('[data-od-id="learn-reference-shelf"]')
const shelfOpen = await shelf.evaluate((el) => el.open)
const hubAxe = await axeCheck(page, 'hub with Glassbox')
await shelf.scrollIntoViewIfNeeded()
await page.waitForTimeout(700)
await shelf.locator('summary').click()
await page.waitForTimeout(200)
const shelfOpenAfter = await shelf.evaluate((el) => el.open)
const shelfLinks = await shelf.getByRole('link').count()
const shelfCloseLabel = await shelf.getByText('Close ›').isVisible()
const shelfOverflow = await page.evaluate(
  () => document.documentElement.scrollWidth - window.innerWidth,
)
await page.screenshot({ path: '/tmp/glassbox-0-hub.png' })
await shelf.locator('summary').click()
await feature.scrollIntoViewIfNeeded()
await page.waitForTimeout(900)
const hubErrors = [...errors]
errors.length = 0

// ——— direct route (with live fallback) ———
const fellBack = await gotoGlassbox()
await page.waitForTimeout(700)
// only the fallback probe's expected 404s are cleared; a direct load stays checked
if (fellBack) errors.length = 0
const heading = await page.getByRole('heading', { name: /one in a thousand/i, level: 1 }).count()
const railDisplay = await page.locator('.scroll-progress').evaluate((el) => getComputedStyle(el).display)
const defaultProfit = (await page.locator('[data-od-id="glassbox-profit"]').textContent())?.trim()
await page.screenshot({ path: '/tmp/glassbox-1-hero.png' })

// presets: the human crew is thin; AI scale restores the margin
await page.getByRole('button', { name: 'Human crew' }).click()
await page.waitForTimeout(200)
const humanProfit = (await page.locator('[data-od-id="glassbox-profit"]').textContent())?.trim()
await page.getByRole('button', { name: 'AI line' }).click()
await page.waitForTimeout(200)
const aiProfit = (await page.locator('[data-od-id="glassbox-profit"]').textContent())?.trim()

// ——— scrolly: every step activates, stages fit, dots reveal ———
const sections = ['ledger', 'sample', 'machine', 'defense']
const stepCounts = { ledger: 4, sample: 4, machine: 4, defense: 4 }
const inactiveSteps = []
const stageClipping = []
let dotsAtField = null
let dotsAtPayment = null
for (const id of sections) {
  for (let i = 0; i < stepCounts[id]; i++) {
    const active = await focusStep(page, id, i)
    if (active !== String(i)) inactiveSteps.push(`${id}:${i}→${active}`)
    const clip = await stageFit(page, id)
    if (clip === null || clip > 1) stageClipping.push(`${id}:${clip}`)
    if (id === 'sample' && i === 0) {
      dotsAtField = { replied: await opacity(page, '#sample .dot-replied'), paid: await opacity(page, '#sample .dot-paid') }
    }
    if (id === 'sample' && i === 2) {
      await page.waitForTimeout(600)
      dotsAtPayment = { replied: await opacity(page, '#sample .dot-replied'), paid: await opacity(page, '#sample .dot-paid') }
    }
    if (id === 'ledger' && i === 3) {
      await page.screenshot({ path: '/tmp/glassbox-2-ledger.png' })
    }
    if (id === 'sample' && i === 2) {
      await page.screenshot({ path: '/tmp/glassbox-3-sample.png' })
    }
    if (id === 'machine' && i === 3) {
      await page.screenshot({ path: '/tmp/glassbox-4-machine.png' })
    }
  }
}

// ——— the defense lever ———
await focusStep(page, 'defense', 3)
const defenseProfitStart = (
  await page.locator('[data-od-id="glassbox-profit-defense"]').textContent()
)?.trim()
const breakEvenText = (await page.locator('[data-od-id="glassbox-break-even"]').textContent())?.trim()
const verify = page.locator('#verify-share')
await verify.focus()
await page.keyboard.press('End')
await page.waitForTimeout(300)
const deployedProfit = (
  await page.locator('[data-od-id="glassbox-profit-defense"]').textContent()
)?.trim()
await page.screenshot({ path: '/tmp/glassbox-5-defense.png' })

// the live animation path (Motion) must also land on the dead line
await page.keyboard.press('Home')
await page.waitForTimeout(200)
await page.getByRole('button', { name: 'Test 100% adoption' }).click()
await page.waitForTimeout(1500)
const testedProfit = (
  await page.locator('[data-od-id="glassbox-profit-defense"]').textContent()
)?.trim()

const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
// reveal the close before axe so its paper-free cards are audited too
await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
await page.waitForTimeout(700)
await page.screenshot({ path: '/tmp/glassbox-6-close.png' })
const axe = await axeCheck(page, 'glassbox')

// ——— 320px: overflow and a pinned sheet that still fits ———
await page.setViewportSize({ width: 320, height: 568 })
await page.waitForTimeout(400)
const smallOverflow = await page.evaluate(
  () => document.documentElement.scrollWidth - window.innerWidth,
)
const smallClipping = []
const smallActive = []
for (const id of sections) {
  const active = await focusStep(page, id, stepCounts[id] - 1, 300)
  smallActive.push(`${id}:${active}`)
  const clip = await stageFit(page, id)
  if (clip === null || clip > 1) smallClipping.push(`${id}:${clip}`)
}
await page.screenshot({ path: '/tmp/glassbox-7-small.png' })

// ——— desktop: the two-column scrolly keeps its own focus line ———
const desktopErrors = []
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
desktop.on('console', (m) => m.type() === 'error' && desktopErrors.push(m.text()))
desktop.on('pageerror', (e) => desktopErrors.push(String(e)))
await gotoGlassbox(desktop)
await desktop.waitForTimeout(500)
const desktopActive = []
let desktopSticky = false
for (const id of sections) {
  const active = await focusStep(desktop, id, stepCounts[id] - 1, 300)
  desktopActive.push(`${id}:${active}`)
  if (id === 'sample') {
    await desktop.screenshot({ path: '/tmp/glassbox-8-desktop.png' })
    const stage = await desktop.locator('#sample .scrolly-stage').boundingBox()
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
await gotoGlassbox(reduced)
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
await focusStep(reduced, 'defense', 3, 300)
await reduced.locator('#verify-share').focus()
await reduced.keyboard.press('End')
await reduced.waitForTimeout(250)
const reducedProfit = (
  await reduced.locator('[data-od-id="glassbox-profit-defense"]').textContent()
)?.trim()
const reducedOverflow = await reduced.evaluate(
  () => document.documentElement.scrollWidth - window.innerWidth,
)

console.log(
  JSON.stringify(
    {
      featureVisible,
      shelfOpen,
      shelfOpenAfter,
      shelfLinks,
      shelfCloseLabel,
      shelfOverflow,
      hubAxe,
      hubErrors,
      fellBack,
      heading,
      railDisplay,
      defaultProfit,
      humanProfit,
      aiProfit,
      inactiveSteps,
      stageClipping,
      dotsAtField,
      dotsAtPayment,
      defenseProfitStart,
      breakEvenText,
      deployedProfit,
      testedProfit,
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
      reducedProfit,
      reducedOverflow,
      reducedErrors,
      errors,
    },
    null,
    2,
  ),
)
await browser.close()

const ok =
  errors.length === 0 &&
  desktopErrors.length === 0 &&
  reducedErrors.length === 0 &&
  axe === 0 &&
  hubAxe === 0 &&
  hubErrors.length === 0 &&
  featureVisible &&
  shelfOpen === false &&
  shelfOpenAfter &&
  shelfLinks === 4 &&
  shelfCloseLabel &&
  shelfOverflow <= 1 &&
  heading === 1 &&
  railDisplay !== 'none' &&
  defaultProfit === '₱450,000' &&
  humanProfit === '₱500' &&
  aiProfit === '₱450,000' &&
  inactiveSteps.length === 0 &&
  stageClipping.length === 0 &&
  dotsAtField?.replied === '0' &&
  dotsAtField?.paid === '0' &&
  dotsAtPayment?.replied === '1' &&
  dotsAtPayment?.paid === '1' &&
  defenseProfitStart === '₱450,000' &&
  /98\.3%/.test(breakEvenText ?? '') &&
  deployedProfit?.startsWith('−₱') &&
  testedProfit?.startsWith('−₱') &&
  overflow <= 1 &&
  smallOverflow <= 1 &&
  smallClipping.length === 0 &&
  smallActive.join() === 'ledger:3,sample:3,machine:3,defense:3' &&
  desktopActive.join() === 'ledger:3,sample:3,machine:3,defense:3' &&
  desktopOverflow <= 1 &&
  desktopSticky &&
  reducedState.revealOpacity === '1' &&
  reducedState.revealTransform === 'none' &&
  reducedState.rail === 'none' &&
  reducedProfit?.startsWith('−₱') &&
  reducedOverflow <= 1
process.exit(ok ? 0 : 1)
