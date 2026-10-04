import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { EXAM_ITEMS, type ExamItem } from './exam-data'
import { artifactUrl } from '../blackglass/artifacts'
import { FadeIn } from '../../ui/FadeIn'

/* =====================================================================
   TELL EXAM — the objective pedagogy measure (E6, docs/game-design-eval.md).

   The anthology plants tells in every diegetic artifact ("a seamless image
   is a failed image"). This exam flips the player from target to examiner:
   the same artifacts the family was fooled by, one at a time — tap where you
   think the tell is, then reveal. Scoring is the manifest itself: a marker
   lands when it falls within HIT_RADIUS of a planted tell's normalized
   coordinates. No tracking, best score in localStorage (cgAI_ prefix).

   Exam data is AUTO-GENERATED from play/blackglass-phones/assets/manifest.json
   by scripts/sync-artifacts.mjs — regenerate there, re-run sync, done.
   ===================================================================== */

const HIT_RADIUS = 0.13
const MAX_MARKERS = 5
const BEST_KEY = 'cgAI_tellExam_best'

interface Marker {
  x: number
  y: number
}

interface RoundResult {
  itemId: string
  found: number
  total: number
  falseAlarms: number
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function loadBest(): number {
  try {
    const v = localStorage.getItem(BEST_KEY)
    return v ? Number(v) : 0
  } catch {
    return 0
  }
}

function aspectClass(aspect: string): string {
  return aspect === '9:16' ? 'mx-auto w-full max-w-[340px]' : 'w-full'
}

/* — one artifact round: place markers → reveal — */

function ExamRound({
  item,
  index,
  count,
  onDone,
}: {
  item: ExamItem
  index: number
  count: number
  onDone: (r: RoundResult) => void
}) {
  const [markers, setMarkers] = useState<Marker[]>([])
  const [revealed, setRevealed] = useState(false)
  const imgRef = useRef<HTMLDivElement | null>(null)

  const src = artifactUrl(item.id)
  const total = item.tells.length

  const place = (x: number, y: number) => {
    if (revealed) return
    setMarkers((m) => (m.length >= MAX_MARKERS ? m : [...m, { x, y }]))
  }

  const onImageClick = (e: ReactMouseEvent) => {
    const box = imgRef.current?.getBoundingClientRect()
    if (!box) return
    place((e.clientX - box.left) / box.width, (e.clientY - box.top) / box.height)
  }

  // keyboard: Enter places at center, arrows nudge the last marker, Backspace removes it
  const onImageKey = (e: ReactKeyboardEvent) => {
    if (revealed) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      place(0.5, 0.5)
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault()
      setMarkers((m) => m.slice(0, -1))
    } else if (e.key.startsWith('Arrow') && markers.length > 0) {
      e.preventDefault()
      const d = 0.04
      const dx = e.key === 'ArrowLeft' ? -d : e.key === 'ArrowRight' ? d : 0
      const dy = e.key === 'ArrowUp' ? -d : e.key === 'ArrowDown' ? d : 0
      setMarkers((m) => m.map((mk, i) => (i === m.length - 1 ? { x: clamp(mk.x + dx), y: clamp(mk.y + dy) } : mk)))
    }
  }

  const reveal = () => {
    const unmatched = item.tells.map((t) => ({ t, taken: false }))
    let found = 0
    for (const mk of markers) {
      let best = -1
      let bestD = Infinity
      unmatched.forEach((u, i) => {
        if (u.taken) return
        const d = Math.hypot(u.t.x - mk.x, u.t.y - mk.y)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      if (best >= 0 && bestD <= HIT_RADIUS) {
        unmatched[best].taken = true
        found++
      }
    }
    setRevealed(true)
    return { found, falseAlarms: markers.length - found }
  }

  const [lastRound, setLastRound] = useState<{ found: number; falseAlarms: number } | null>(null)

  const foundByTell = (tellId: string): boolean => {
    if (!revealed || !lastRound) return false
    // recompute claim per tell for rendering (deterministic, cheap)
    const unmatched = [...item.tells]
    const claimed = new Set<string>()
    for (const mk of markers) {
      let best = -1
      let bestD = Infinity
      unmatched.forEach((t, i) => {
        if (claimed.has(t.id)) return
        const d = Math.hypot(t.x - mk.x, t.y - mk.y)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      if (best >= 0 && bestD <= HIT_RADIUS) claimed.add(unmatched[best].id)
    }
    return claimed.has(tellId)
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold tracking-[0.25em] text-train uppercase">
          Artifact {index + 1} of {count}
        </p>
        <p className="text-2xs text-ink-400 tabular-nums">
          {markers.length}/{MAX_MARKERS} markers
        </p>
      </div>
      <h2 className="font-display mt-1 text-2xl font-semibold text-ink-100">{item.title}</h2>
      <p className="mt-1 text-sm text-ink-400">{item.what}</p>

      <div
        ref={imgRef}
        onClick={onImageClick}
        onKeyDown={onImageKey}
        role="application"
        aria-label={`Artifact image: ${item.title}. Click or tap where you suspect a planted tell. Keyboard: Enter places a marker at center, arrow keys nudge it, Backspace removes it.`}
        tabIndex={0}
        className={`relative mt-4 cursor-crosshair overflow-hidden rounded-xl border border-ink-700 bg-ink-800 outline-none focus-visible:ring-2 focus-visible:ring-play/70 ${aspectClass(item.aspect)}`}
        style={{ aspectRatio: item.aspect === '9:16' ? '9 / 16' : '4 / 3' }}
      >
        {src ? (
          <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
        ) : (
          <span className="grid h-full place-items-center text-3xl opacity-40" aria-hidden="true">
            🖼️
          </span>
        )}

        {/* player markers */}
        {markers.map((mk, i) => (
          <span
            key={`${mk.x}-${mk.y}-${i}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
              revealed ? 'border-ok' : 'border-play'
            } bg-black/30`}
            style={{ left: `${mk.x * 100}%`, top: `${mk.y * 100}%`, width: 26, height: 26 }}
            aria-hidden="true"
          />
        ))}

        {/* planted tells on reveal */}
        {revealed &&
          item.tells.map((t) => {
            const found = foundByTell(t.id)
            return (
              <span
                key={t.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
                  found ? 'border-ok' : 'border-dashed border-warn'
                } bg-black/40`}
                style={{ left: `${t.x * 100}%`, top: `${t.y * 100}%`, width: 34, height: 34 }}
                aria-hidden="true"
              />
            )
          })}
      </div>

      {!revealed ? (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              const r = reveal()
              setLastRound(r)
            }}
            className="min-h-[44px] flex-1 rounded-xl bg-train px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Reveal the tells
          </button>
          <button
            type="button"
            onClick={() => setMarkers([])}
            className="min-h-[44px] rounded-xl border border-ink-600 px-4 py-2.5 text-sm text-ink-300 transition-colors hover:border-ink-400"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex items-baseline justify-between rounded-xl border border-ink-700 bg-ink-800/70 px-4 py-3">
            <span className="text-sm text-ink-300">
              Spotted <strong className="text-ok tabular-nums">{lastRound?.found ?? 0}</strong> of{' '}
              <span className="tabular-nums">{total}</span>
              {(lastRound?.falseAlarms ?? 0) > 0 && (
                <span className="text-ink-400"> · {lastRound?.falseAlarms} flagged, nothing there</span>
              )}
            </span>
            <button
              type="button"
              onClick={() => onDone({ itemId: item.id, found: lastRound?.found ?? 0, total, falseAlarms: lastRound?.falseAlarms ?? 0 })}
              className="min-h-[44px] rounded-xl bg-play px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              {index + 1 < count ? 'Next artifact' : 'See results'}
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {item.tells.map((t) => {
              const found = foundByTell(t.id)
              return (
                <li key={t.id} className="rounded-xl border border-ink-700 bg-ink-800/70 p-3">
                  <p className={`text-sm font-semibold ${found ? 'text-ok' : 'text-warn'}`}>
                    {found ? '✓ you spotted' : '○ you missed'} — {t.label}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-400">{t.detail}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

function clamp(v: number): number {
  return Math.min(1, Math.max(0, v))
}

export default function TellExam() {
  const [deck, setDeck] = useState<ExamItem[]>([])
  const [round, setRound] = useState(0)
  const [results, setResults] = useState<RoundResult[]>([])
  const [best, setBest] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.title = 'Tell Exam · BLACKGLASS'
    setBest(loadBest())
  }, [])

  const totals = useMemo(() => {
    const found = results.reduce((n, r) => n + r.found, 0)
    const total = EXAM_ITEMS.reduce((n, it) => n + it.tells.length, 0)
    const alarms = results.reduce((n, r) => n + r.falseAlarms, 0)
    return { found, total, alarms }
  }, [results])

  const onRoundDone = (r: RoundResult) => {
    const rs = [...results, r]
    setResults(rs)
    const found = rs.reduce((n, x) => n + x.found, 0)
    const total = EXAM_ITEMS.reduce((n, it) => n + it.tells.length, 0)
    const pct = total ? Math.round((found / total) * 100) : 0
    if (pct > best) {
      setBest(pct)
      try {
        localStorage.setItem(BEST_KEY, String(pct))
      } catch {
        /* private mode: fine */
      }
    }
    if (round + 1 >= deck.length) setDone(true)
    else setRound(round + 1)
  }

  const start = () => {
    setDeck(shuffle(EXAM_ITEMS))
    setRound(0)
    setResults([])
    setDone(false)
  }

  const pct = totals.total ? Math.round((totals.found / totals.total) * 100) : 0

  return (
    <div className="desk-scene min-h-dvh">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
        <Link to="/" className="text-sm text-ink-400 transition-colors hover:text-ink-100">
          ‹ Hub
        </Link>

        {deck.length === 0 || done ? (
          /* ——— intro / results ——— */
          <FadeIn>
            <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-train uppercase">Train</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-ink-100">Tell Exam</h1>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-400">
              Every synthetic image in the anthology was generated <em>convincing-but-flawed</em> — each flaw
              planted on purpose. You&apos;ve been fooled by them from the inside; now look from the outside.
              Find every planted tell. <strong className="text-ink-200">The tell is the payload.</strong>
            </p>

            {done ? (
              <div className="mt-6">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl border border-ink-700 bg-ink-800/70 p-3">
                    <div className="font-display text-3xl font-semibold text-ink-100 tabular-nums">{pct}%</div>
                    <div className="mt-0.5 text-[10px] tracking-wide text-ink-400 uppercase">This run</div>
                  </div>
                  <div className="rounded-xl border border-ink-700 bg-ink-800/70 p-3">
                    <div className="font-display text-3xl font-semibold text-ok tabular-nums">
                      {totals.found}/{totals.total}
                    </div>
                    <div className="mt-0.5 text-[10px] tracking-wide text-ink-400 uppercase">Tells found</div>
                  </div>
                  <div className="rounded-xl border border-ink-700 bg-ink-800/70 p-3">
                    <div className="font-display text-3xl font-semibold text-train tabular-nums">{best}%</div>
                    <div className="mt-0.5 text-[10px] tracking-wide text-ink-400 uppercase">Best</div>
                  </div>
                </div>
                <p className="mt-4 rounded-xl border border-ink-700 bg-ink-800/70 p-4 text-sm leading-relaxed text-ink-300">
                  {pct >= 80
                    ? 'You see clearly. Most people never look twice — you looked twice at everything.'
                    : pct >= 50
                      ? 'Halfway to seeing clearly. The tells you missed are waiting in the list above — go find them in the image.'
                      : 'The feeds win this round. Scroll back through what you missed, then run it again — the eye is trainable.'}
                </p>
              </div>
            ) : (
              best > 0 && (
                <p className="mt-4 text-sm text-ink-400">
                  Personal best: <span className="text-train tabular-nums">{best}%</span>
                </p>
              )
            )}

            <button
              type="button"
              onClick={start}
              className="mt-6 min-h-[44px] w-full rounded-xl bg-train px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              {done ? 'Run it again' : 'Begin the exam'}
            </button>
            <p className="mt-3 text-2xs leading-relaxed text-ink-400">
              {EXAM_ITEMS.length} artifacts · {totals.total || 15} planted tells · tap the image to place a
              marker (keyboard: Enter / arrows / Backspace). Best played after the anthology — you&apos;ve
              seen these from the inside. Nothing leaves this device.
            </p>
            <p className="mt-6 text-sm text-ink-400">
              Keep training: <Link to="/scam-radar" className="text-train underline-offset-2 hover:underline">Scam Radar</Link>
            </p>
          </FadeIn>
        ) : (
          /* ——— a round ——— */
          <FadeIn key={round} className="mt-8">
            <ExamRound
              item={deck[round]}
              index={round}
              count={deck.length}
              onDone={onRoundDone}
            />
          </FadeIn>
        )}
      </div>
    </div>
  )
}
