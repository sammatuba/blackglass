import { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Hub from './app/pages/Hub'
import LegacyViewer from './app/pages/LegacyViewer'
import RouteBoot from './app/RouteBoot'
import { ensureRoute, isRouteReady } from './app/prefetch'

const ScamRadar = lazy(() => import('./games/scam-radar'))
const Blackglass = lazy(() => import('./games/blackglass'))
const TellExam = lazy(() => import('./games/tell-exam'))
const Glassbox = lazy(() => import('./games/glassbox/OneInAThousand'))
const FeedDial = lazy(() => import('./games/glassbox/TheFeedDial'))

/* pathname → the prefetch id of the chunk that route needs */
const ROUTE_MODULES: { pattern: RegExp; id: string }[] = [
  { pattern: /^\/scam-radar(\/|$)/, id: 'scam-radar' },
  { pattern: /^\/blackglass(\/|$)/, id: 'blackglass' },
  { pattern: /^\/tell-exam/, id: 'tell-exam' },
  { pattern: /^\/glassbox\/the-feed-dial/, id: 'glassbox-feed' },
  { pattern: /^\/glassbox/, id: 'glassbox' },
]

function destModule(pathname: string): string | null {
  return ROUTE_MODULES.find((r) => r.pattern.test(pathname))?.id ?? null
}

/* React Router v7 wraps navigation in startTransition, so a suspending
   destination keeps the previous page on screen — the Suspense fallback
   below only fires on cold deep links, never on in-app navigation, and no
   effect inside the retained tree can run while the transition is parked.

   The boot gate therefore listens where navigation is still urgent:
   history.pushState/replaceState fire synchronously inside the click, so
   the overlay's setState commits immediately (discrete priority) and the
   console boot covers the stale page while the chunk streams in. It lifts
   two frames after the chunk resolves, letting the router's transition
   commit the destination first. In-flight chunks are NOT ready (prefetch
   tracks requested vs resolved separately), so a click during a hover
   prefetch still gets feedback. */
function RouteBootGate() {
  const [pending, setPending] = useState(false)

  useEffect(() => {
    let raf1 = 0
    let raf2 = 0
    let alive = true

    const show = (dest: string) => {
      if (!alive) return
      setPending(true)
      ensureRoute(dest)?.then(() => {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (alive) setPending(false)
          }),
        )
      })
    }

    const wrap =
      (orig: History['pushState']) =>
      function (this: History, ...args: Parameters<History['pushState']>) {
        const result = orig.apply(this, args)
        try {
          const raw = args[2]
          const url = typeof raw === 'string' ? new URL(raw, location.href) : null
          const dest = url ? destModule(url.pathname) : null
          if (dest && !isRouteReady(dest)) show(dest)
        } catch {
          /* a malformed URL must never break navigation */
        }
        return result
      }

    const origPush = history.pushState
    const origReplace = history.replaceState
    history.pushState = wrap(origPush)
    history.replaceState = wrap(origReplace)
    return () => {
      alive = false
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      history.pushState = origPush
      history.replaceState = origReplace
    }
  }, [])

  if (!pending) return null
  return (
    <div className="fixed inset-0 z-50 bg-ink-950">
      <RouteBoot />
    </div>
  )
}

export default function App() {
  return (
    <>
      <RouteBootGate />
      <Suspense fallback={<RouteBoot />}>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/scam-radar/*" element={<ScamRadar />} />
          <Route path="/blackglass" element={<Blackglass />} />
          <Route path="/tell-exam" element={<TellExam />} />
          <Route path="/glassbox" element={<Glassbox />} />
          <Route path="/glassbox/one-in-a-thousand" element={<Glassbox />} />
          <Route path="/glassbox/the-feed-dial" element={<FeedDial />} />
          <Route path="/legacy/*" element={<LegacyViewer />} />
          <Route path="*" element={<Hub />} />
        </Routes>
      </Suspense>
    </>
  )
}
