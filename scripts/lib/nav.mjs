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
export function launchAuditBrowser(opts = {}) {
  return chromium.launch({ args: ['--disable-async-dns'], ...opts })
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
