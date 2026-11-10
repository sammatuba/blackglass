/* Route chunk warm-up.

   App.tsx lazy-loads every game behind a single Suspense boundary, and
   React Router v7 wraps navigation in startTransition — a suspending
   destination keeps the stale page on screen and never shows the
   fallback. The App's boot gate (RouteBootGate) therefore needs to know
   two different states, which this module tracks separately:
   - requested: a fetch is in flight (NOT warm — a click during it still
     deserves the boot screen)
   - ready: the chunk resolved and the module can mount instantly
   Stations call prefetchRoute() on hover/focus; the hub warms everything
   once when the browser goes idle. */

const loaders: Record<string, () => Promise<unknown>> = {
  'scam-radar': () => import('../games/scam-radar'),
  blackglass: () => import('../games/blackglass'),
  'tell-exam': () => import('../games/tell-exam'),
  glassbox: () => import('../games/glassbox/OneInAThousand'),
  'glassbox-feed': () => import('../games/glassbox/TheFeedDial'),
}

const inflight = new Map<string, Promise<unknown>>()
const ready = new Set<string>()

/** start loading a route's chunk now; safe to call repeatedly, and a
    failed warm-up can be retried later */
export function prefetchRoute(id: string): void {
  const load = loaders[id]
  if (!load || ready.has(id) || inflight.has(id)) return
  const p = load().then(
    () => {
      ready.add(id)
      inflight.delete(id)
    },
    () => inflight.delete(id),
  )
  inflight.set(id, p)
}

/** the chunk has RESOLVED — the module mounts instantly */
export function isRouteReady(id: string): boolean {
  return ready.has(id)
}

/** the in-flight promise, if a fetch is currently running */
export function routeInflight(id: string): Promise<unknown> | undefined {
  return inflight.get(id)
}

/** prefetch and hand back the in-flight promise (undefined when ready) */
export function ensureRoute(id: string): Promise<unknown> | undefined {
  prefetchRoute(id)
  return inflight.get(id)
}

export function warmAllRoutes(): void {
  for (const id of Object.keys(loaders)) prefetchRoute(id)
}

/** schedule the full warm-up for when the browser is idle; a plain timer
    covers engines without requestIdleCallback. `__BG_SKIP_IDLE_WARM__` is
    a probe seam — scripts/nav-perf.mjs sets it to isolate hover prefetch
    from the idle warm-up so the gate can't pass vacuously. */
export function warmRoutesWhenIdle(timeoutMs = 3000): void {
  if ((window as unknown as { __BG_SKIP_IDLE_WARM__?: boolean }).__BG_SKIP_IDLE_WARM__) return
  const w = window as unknown as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  }
  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(() => warmAllRoutes(), { timeout: timeoutMs })
  } else {
    window.setTimeout(warmAllRoutes, 800)
  }
}
