import { useEffect, useRef, useState } from 'react'
import { gameSfx } from '../../engine/os/sound'
import { GRADE_COLOR, GRADE_NAME, type Grade } from './grade'

/* the pure grade logic lives in grade.ts (no UI, no engine imports);
   this module is the desk's UI voice over it */
export { GRADE_COLOR, GRADE_NAME, RANKS, gradeFor, rankFor, type Grade } from './grade'

/* =====================================================================
   THE DESK — the suite's shared game-layer UI: one stamp, one fanfare,
   one meter. Used by the anthology's verdict dossier (score.ts
   re-exports the grade logic), the Scam Radar feed triage and case
   debriefs, and the Tell Exam results.

   The fanfare grows with the grade; reduced motion gets the stamp
   immediately and the total without the count.
   ===================================================================== */

/** the verdict fanfare — its arpeggio grows with the grade */
const FANFARE_NOTES: Record<Grade, number> = { S: 5, A: 4, B: 3, C: 2 }

/** count a total up with desk ticks, then slam the stamp and play the
    grade-sized fanfare. Returns the eased count and whether the stamp
    has landed. Reduced motion: the full total and the stamp at once. */
export function useCountUp(total: number, grade: Grade): { count: number; stamped: boolean } {
  const reduced =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(reduced ? total : 0)
  const [stamped, setStamped] = useState(reduced)
  const sounded = useRef(false)

  useEffect(() => {
    if (reduced) {
      if (!sounded.current) {
        sounded.current = true
        gameSfx.stamp()
        gameSfx.fanfare(FANFARE_NOTES[grade])
      }
      return
    }
    const DURATION = 950
    const t0 = performance.now()
    let raf = 0
    let lastTick = 0
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / DURATION)
      const eased = 1 - Math.pow(1 - k, 3)
      setCount(Math.round(eased * total))
      if (t - lastTick > 90 && k < 1) {
        lastTick = t
        gameSfx.tick()
      }
      if (k < 1) {
        raf = requestAnimationFrame(step)
      } else if (!sounded.current) {
        sounded.current = true
        setStamped(true)
        gameSfx.stamp()
        gameSfx.fanfare(FANFARE_NOTES[grade])
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [reduced, total, grade])

  return { count, stamped }
}

/** the grade stamp — dashed ghost until `stamped`, then the slam */
export function GradeStamp({ grade, stamped }: { grade: Grade; stamped: boolean }) {
  const color = GRADE_COLOR[grade]
  return (
    <div
      className={`verdict-stamp${stamped ? ' is-stamped' : ''}`}
      style={{ color, borderColor: `${color}88`, background: `${color}0f` }}
      aria-label={`Grade ${grade}, ${GRADE_NAME[grade]}`}
    >
      <span className="verdict-stamp-grade">{grade}</span>
      <span className="verdict-stamp-name">{GRADE_NAME[grade]}</span>
    </div>
  )
}

/** the desk meter — positional color plus text beside it, never color alone */
export function DeskMeter({
  ratio,
  label,
  step,
  note,
}: {
  ratio: number
  label: string
  /** the current step name, shown on the label row */
  step?: string
  /** the quiet line under the meter */
  note?: string
}) {
  const pct = Math.round(Math.min(1, Math.max(0, ratio)) * 100)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="signal-rail-label">{label}</span>
        {step && <span className="signal-tension-step">{step}</span>}
      </div>
      <div className="signal-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
        <span
          className="signal-meter-fill"
          style={{ width: `${pct}%`, background: ratio >= 0.8 ? '#f87171' : ratio >= 0.5 ? '#f5b942' : '#818cf8' }}
        />
      </div>
      {note && <p className="signal-tension-note">{note}</p>}
    </div>
  )
}
