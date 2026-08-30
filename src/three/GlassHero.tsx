import { useEffect, useState, type ComponentType } from 'react'

/**
 * Capability gate for the Three.js hero. Anything unsure of itself —
 * reduced-motion preference, little RAM, few cores — gets the plain
 * CSS gradient instead. The scene itself loads only when the browser
 * is idle, so it never blocks first paint or the initial JS budget.
 */
function capable(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const nav = navigator as Navigator & { deviceMemory?: number }
  if ((nav.deviceMemory ?? 8) < 4) return false
  if ((navigator.hardwareConcurrency ?? 8) <= 2) return false
  return true
}

type IdleHandle = number

export default function GlassHero() {
  const [Scene, setScene] = useState<ComponentType<{ active: boolean }> | null>(null)
  const [active, setActive] = useState(false)
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!capable()) return
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => IdleHandle
      cancelIdleCallback?: (h: IdleHandle) => void
    }
    let handle: IdleHandle
    if (win.requestIdleCallback) {
      handle = win.requestIdleCallback(() => void import('./HeroScene').then((m) => setScene(() => m.default)))
    } else {
      handle = window.setTimeout(() => void import('./HeroScene').then((m) => setScene(() => m.default)), 400) as unknown as IdleHandle
    }
    return () => {
      if (win.cancelIdleCallback) win.cancelIdleCallback(handle)
      else clearTimeout(handle)
    }
  }, [])

  // pause the render loop entirely once the hero scrolls out of view
  useEffect(() => {
    if (!wrapper || !Scene) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.05 })
    io.observe(wrapper)
    return () => io.disconnect()
  }, [wrapper, Scene])

  return (
    <div ref={setWrapper} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Scene && (
        <div className="opacity-55 transition-opacity duration-700 ease-out" style={{ width: '100%', height: '100%' }}>
          <Scene active={active} />
        </div>
      )}
    </div>
  )
}
