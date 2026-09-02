import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/* PhoneStage — the world around the device. A desk at night: the phone
   rests on the surface, emits its wallpaper's light, and leans toward the
   pointer. Pure CSS scene + rAF pointer tilt; no assets, no dependencies.
   The stage is engine-level so every glassOS game inherits it. */

const WALLPAPER_HUE: Record<string, number> = {
  dusk: 258,
  dawn: 318,
  leaf: 158,
  grid: 215,
  /* anthology wallpapers */
  mtpulag: 168,
  lastsupper: 36,
  tweet: 205,
}

export function wallpaperHue(wallpaper: string): number {
  return WALLPAPER_HUE[wallpaper] ?? 220
}

export function PhoneStage({
  hue,
  pulse = 0,
  ringing = false,
  header,
  footer,
  children,
}: {
  hue: number
  /** increment to flash the glow (message arrived, evidence found) */
  pulse?: number
  ringing?: boolean
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const fine = useRef(false)

  useEffect(() => {
    fine.current = window.matchMedia('(pointer: fine)').matches
    return () => cancelAnimationFrame(frame.current)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!fine.current) return
    const el = bodyRef.current
    if (!el) return
    const nx = (e.clientX / window.innerWidth) * 2 - 1
    const ny = (e.clientY / window.innerHeight) * 2 - 1
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--tx', nx.toFixed(3))
      el.style.setProperty('--ty', ny.toFixed(3))
    })
  }, [])

  const onPointerLeave = useCallback(() => {
    const el = bodyRef.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.setProperty('--tx', '0')
    el.style.setProperty('--ty', '0')
  }, [])

  return (
    <div className="stage-root" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {/* the desk plane, catching the phone's light */}
      <div className="stage-surface" style={{ '--stage-hue': hue } as CSSProperties} aria-hidden="true" />
      {header}
      <div className="stage-tilt">
        <div className="stage-body" ref={bodyRef} style={{ '--stage-hue': hue } as CSSProperties}>
          {/* wallpaper-hued light bleed; remounts on pulse to replay the flash */}
          <div
            key={pulse}
            className={`stage-glow${ringing ? ' stage-glow-ringing' : ''}`}
            aria-hidden="true"
          />
          <div className="stage-shadow" aria-hidden="true" />
          {children}
        </div>
      </div>
      {footer}
    </div>
  )
}

/** kiosk toggle: fullscreens the enclosing .stage-root, unmounts out of it */
export function FullscreenToggle() {
  const btn = useRef<HTMLButtonElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const sync = () => setOn(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  function toggle() {
    const stage = btn.current?.closest('.stage-root') as HTMLElement | null
    if (!stage) return
    if (document.fullscreenElement) void document.exitFullscreen()
    else void stage.requestFullscreen().catch(() => {})
  }

  return (
    <button
      ref={btn}
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Exit fullscreen' : 'Fullscreen'}
      title={on ? 'Exit fullscreen' : 'Fullscreen'}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-sm text-ink-300 transition-colors hover:text-ink-100"
    >
      {on ? '⤡' : '⛶'}
    </button>
  )
}
