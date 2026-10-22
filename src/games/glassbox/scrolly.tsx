import { useEffect, useRef, useState, type ReactNode } from 'react'

/* =====================================================================
   Scrollytelling primitives for Glassbox.

   The stage pins while the narrative steps scroll past. A focus line
   below the mobile stage (64% of the viewport; 48% on desktop) decides
   which step is active. One passive scroll listener, coalesced into a
   single rAF, reads four rects and sets state only when the step
   changes — no per-frame work beyond that. The active class drives
   opacity/transform emphasis. Every step is always in the DOM in
   reading order: the scroll effect is emphasis, never disclosure.
   ===================================================================== */

/* Desktop reads at the middle of the viewport. On mobile the pinned
   sheet owns the top 44dvh, so the reading line sits at 64%, inside
   the narrative steps below it. */
const FOCUS_DESKTOP = 0.48
const FOCUS_MOBILE = 0.64

const focusLine = () =>
  window.matchMedia('(min-width: 900px)').matches ? FOCUS_DESKTOP : FOCUS_MOBILE

function nearestStep(nodes: (HTMLDivElement | null)[], focus: number): number {
  let best = -1
  let bestDistance = Infinity
  nodes.forEach((node, index) => {
    if (!node) return
    const rect = node.getBoundingClientRect()
    if (focus >= rect.top && focus <= rect.bottom) {
      best = index
      bestDistance = 0
      return
    }
    const distance = Math.min(Math.abs(focus - rect.top), Math.abs(focus - rect.bottom))
    if (distance < bestDistance) {
      bestDistance = distance
      best = index
    }
  })
  return best
}

function useActiveStep(count: number) {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const nodes = refs.current.slice(0, count)
    if (!nodes.some(Boolean)) return

    let focus = focusLine()
    let frame = 0

    const pick = () => {
      frame = 0
      const index = nearestStep(nodes, window.innerHeight * focus)
      if (index >= 0) setActive(index)
      setReady(true)
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(pick)
    }

    const onResize = () => {
      focus = focusLine()
      schedule()
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
    }
  }, [count])

  const setStepRef = (index: number) => (node: HTMLDivElement | null) => {
    refs.current[index] = node
  }

  return { active, ready, setStepRef }
}

export function ScrollySection({
  id,
  labelledBy,
  header,
  stage,
  steps,
}: {
  id: string
  labelledBy: string
  header: ReactNode
  stage: (active: number) => ReactNode
  steps: ReactNode[]
}) {
  const { active, ready, setStepRef } = useActiveStep(steps.length)

  return (
    <section id={id} aria-labelledby={labelledBy} className="scrolly-scene">
      {header}
      <div className="scrolly" data-ready={ready ? 'true' : 'false'} data-active-step={active}>
        <div className="scrolly-stage">{stage(active)}</div>
        <div className="scrolly-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`scrolly-step${active === index ? ' is-active' : ''}`}
              data-step={index}
            >
              <div className="scrolly-step-inner" ref={setStepRef(index)}>
                <p className="scrolly-step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <div className="scrolly-step-body">{step}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** The top rail uses a native scroll timeline; browsers without it simply hide the rail. */
export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />
}
