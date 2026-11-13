import { chromium } from 'playwright-core'

/* GitHub Pages intermittently stalls a document response (the navigation
   request never completes even though the HTML is served). Audit drivers
   should retry rather than fail a whole run on a CDN hiccup. */

export async function gotoWithRetry(page, url, { attempts = 3, retryDelayMs = 800, ...opts } = {}) {
  let last
  for (let i = 0; i < attempts; i++) {
    try {
      return await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000, ...opts })
    } catch (e) {
      last = e
      if (i < attempts - 1) await page.waitForTimeout(retryDelayMs * (i + 1))
    }
  }
  throw last
}

/* Chromium's built-in async DNS resolver intermittently stalls under WSL2's
   NAT resolver (2026-11-11 root cause, proven with an A/B probe): the
   navigation never commits — zero requests issued, zero failures logged —
   while curl/getaddrinfo on the same host answers in milliseconds. Retries
   inside the page cannot fix it because no request ever leaves. Launching
   with async DNS off makes Chromium use the system resolver; on the affected
   host every load is then fast and reliable (43–1300 ms), and elsewhere the
   flag only switches Chromium to getaddrinfo. The durable machine-level
   alternative is fixing WSL2's resolver (mirrored networking or a real DNS
   server in /etc/resolv.conf) — user's call, documented in HANDOFF. */
export async function launchAuditBrowser(opts = {}) {
  /* 2026-11-13: WSL2 GPU passthrough turned flaky on this machine — headless
     chromium wedges or dies mid-run when the three.js hero renders (click
     "stable" timeouts; probe browsers "closed" mid-run; in-page async loops
     — even plain timers — starve after seconds of software-GL rendering).
     --disable-gpu alone is NOT enough: Playwright's default
     --enable-unsafe-swiftshader keeps WebGL alive as a CPU loop, and the
     --force-prefers-reduced-motion flag proved unreliable on this build.
     The durable audit answer is the app's own capability gate:
     emulated prefers-reduced-motion at the CONTEXT level makes
     GlassHero.capable() return false, so the hero chunk never loads — the
     designed degrade path — and the app's global reduced-motion handling
     stills every animation for the stability checks. SMOKE_ANIMATION=1 opts
     back in on a healthy-GPU machine (hub canvas assert). */
  const args = ['--disable-async-dns', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
  /* SMOKE_HEADED=1 + xvfb-run: when the host compositor is dead (WSLg loses
     its display → zero BeginFrames → rAF starved machine-wide, screenshots
     hang, click-stability times out), a headed chromium under its own Xvfb
     display gets a working compositor and frames flow again. */
  const browser = await chromium.launch({ headless: process.env.SMOKE_HEADED !== '1', args, ...opts })
  if (process.env.SMOKE_ANIMATION !== '1') {
    const newPage = browser.newPage.bind(browser)
    browser.newPage = (pageOpts = {}) =>
      browser.newContext({ ...pageOpts, reducedMotion: 'reduce' }).then((ctx) => ctx.newPage())
  }
  /* diagnostic screenshots must never fail a gate on the flaky compositor:
     race each screenshot against a dwell timeout — a hung frame capture
     resolves as undefined instead of wedging the smoke */
  const newPageFinal = browser.newPage.bind(browser)
  browser.newPage = async (pageOpts = {}) => {
    const page = await newPageFinal(pageOpts)
    const origShot = page.screenshot.bind(page)
    page.screenshot = (shotOpts) =>
      Promise.race([
        origShot(shotOpts).catch(() => undefined),
        new Promise((r) => setTimeout(() => r(undefined), 12000)),
      ])
    return page
  }
  return browser
}

/* Prove the hub rather than assume its URL: it renders at ${BASE}/blackglass/
   on base-blackglass hosts (Pages, local preview) and at ${BASE}/ on root-base
   hosts (Workers). A bare 200 proves nothing — on Workers /blackglass/ is the
   anthology route. Returns the path that mounted the hub, or throws. */
export async function gotoHub(page, BASE) {
  for (const path of ['/blackglass/', '/']) {
    await gotoWithRetry(page, `${BASE}${path}`)
    const ok = await page
      .getByRole('heading', { name: /see clearly/i })
      .first()
      .waitFor({ state: 'visible', timeout: 20000 })
      .then(() => true)
      .catch(() => false)
    if (ok) return path
  }
  throw new Error('the hub never mounted on either candidate path')
}

/* Audit click: scroll into view, then force. Playwright's actionability
   "stable" check waits for two compositor-aligned frames; on the flaky WSL2
   graphics stack of 2026-11-13 the compositor intermittently stops producing
   frames and every strict click times out even though the page is healthy
   (text/CDP asserts keep working — see hub-smoke's probe session). The smokes
   assert actionability by other means (visible text, axe, endpoints), so the
   pixel-stability gate is dropped here; os-smoke's force-fallback clicks
   already follow this pattern. */
export async function clickAudit(page, locator, { timeout = 15000 } = {}) {
  await locator.scrollIntoViewIfNeeded({ timeout }).catch(() => {})
  await locator.click({ force: true, timeout })
}
