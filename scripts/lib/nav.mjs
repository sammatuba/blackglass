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
