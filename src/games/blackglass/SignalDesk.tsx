import { useEffect, useRef, useState } from 'react'
import type { CaseOS, OSState } from '../../engine/os/types'
import { gameSfx } from '../../engine/os/sound'
import { MOVE_COLOR, clueLabel, gradeFor, GRADE_COLOR, scoreRun, tensionLevel, type CaseGame, type MoveKind } from './score'

/* =====================================================================
   THE SIGNAL DESK — the live game layer around the glass.

   Desktop (≥1200px): two desk rails flanking the phone — the case file
   (objective, stakes, the episode's pressure meter) and the signal desk
   (clues, reflexes, the move feed). The POV contract keeps them out of
   the glass; they are desk furniture, not phone chrome.

   Mobile POV: no chrome is allowed inside the full-bleed phone, so the
   desk speaks in short toasts above the gesture bar — a clue found, a
   reflex landing, the pressure ratcheting. Pointer-transparent, gone in
   three seconds, silent while a moment or a call owns the screen.
   ===================================================================== */

interface DeskEvent {
  id: number
  tone: 'clue' | 'tension' | MoveKind
  title: string
  body: string
}

const EVENT_TTL = 3000

export function SignalDesk({ caseDef, game, state }: { caseDef: CaseOS; game: CaseGame; state: OSState }) {
  const [events, setEvents] = useState<DeskEvent[]>([])
  const prev = useRef<OSState>(state)
  const nextId = useRef(1)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    const before = prev.current
    prev.current = state
    if (before === state) return
    const fresh: DeskEvent[] = []
    // a moment or call owning the screen silences the desk entirely —
    // no visible toast and no sound for events that land underneath it
    const quietNow = !!state.moment || !!state.call

    for (const id of state.evidence) {
      if (!before.evidence.includes(id)) {
        fresh.push({ id: nextId.current++, tone: 'clue', title: 'CLUE FOUND', body: clueLabel(caseDef, id) })
      }
    }
    for (const rid of state.sentReplies) {
      if (before.sentReplies.includes(rid)) continue
      const w = game.moves[rid]
      if (!w || w.kind === 'neutral') continue
      fresh.push({
        id: nextId.current++,
        tone: w.kind,
        title: `${w.kind.toUpperCase()}${w.points > 0 ? ` +${w.points}` : ''}`,
        body: w.note,
      })
      if (!quietNow) gameSfx[w.kind]()
    }
    const t0 = tensionLevel(game, before.flags)
    const t1 = tensionLevel(game, state.flags)
    if (t1.ratio > t0.ratio) {
      fresh.push({ id: nextId.current++, tone: 'tension', title: `${game.tensionName} ▲`, body: t1.label })
      if (!quietNow) gameSfx.tension()
    }

    if (fresh.length === 0) return
    setEvents((q) => [...q, ...fresh].slice(-3))
    for (const e of fresh) {
      timers.current.push(setTimeout(() => setEvents((q) => q.filter((x) => x.id !== e.id)), EVENT_TTL))
    }
  }, [state, caseDef, game])

  const live = scoreRun(caseDef, game, state)
  const tension = tensionLevel(game, state.flags)
  const grade = gradeFor(live.total)
  const recent = live.moves.slice(-4).reverse()
  const quiet = !!state.moment || !!state.call

  return (
    <>
      {/* desk rails — wide desktop only, outside the glass */}
      <aside className="signal-rail signal-rail-left" aria-label="Case file">
        <p className="signal-rail-kicker">THE CASE FILE</p>
        <p className="signal-rail-id">{caseDef.id} · {caseDef.title}</p>
        <p className="signal-rail-label">OBJECTIVE</p>
        <p className="signal-rail-copy">{game.objective}</p>
        <p className="signal-rail-label">AT STAKE</p>
        <p className="signal-rail-copy">{game.stakes}</p>
        <div className="signal-tension">
          <div className="flex items-baseline justify-between gap-2">
            <span className="signal-rail-label">{game.tensionName}</span>
            <span className="signal-tension-step">{tension.label}</span>
          </div>
          <div className="signal-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(tension.ratio * 100)} aria-label={game.tensionName}>
            <span
              className="signal-meter-fill"
              style={{ width: `${tension.ratio * 100}%`, background: tension.ratio >= 0.8 ? '#f87171' : tension.ratio >= 0.5 ? '#f5b942' : '#818cf8' }}
            />
          </div>
          <p className="signal-tension-note">It rises no matter who holds the phone.</p>
        </div>
      </aside>

      <aside className="signal-rail signal-rail-right" aria-label="Signal desk">
        <p className="signal-rail-kicker">THE SIGNAL DESK</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="signal-total tabular-nums">{live.total}</span>
          <span className="signal-total-max">/100</span>
          <span className="signal-grade-chip" style={{ color: GRADE_COLOR[grade], borderColor: `${GRADE_COLOR[grade]}55`, background: `${GRADE_COLOR[grade]}14` }}>
            {grade}
          </span>
        </div>
        <div className="signal-rows">
          <div className="signal-row">
            <span>CLUES</span>
            <span className="tabular-nums">{live.cluesFound}/{live.cluesTotal} · +{live.cluePoints}</span>
          </div>
          <div className="signal-row">
            <span>REFLEX</span>
            <span className="tabular-nums">+{live.reflexScaled}</span>
          </div>
        </div>
        <p className="signal-rail-label mt-4">MOVES</p>
        {recent.length === 0 ? (
          <p className="signal-rail-copy text-ink-500">Nothing sent yet. The desk is listening.</p>
        ) : (
          <ul className="signal-moves">
            {recent.map((m) => (
              <li key={m.id} className="signal-move">
                <span className="signal-move-kind" style={{ color: MOVE_COLOR[m.kind], borderColor: `${MOVE_COLOR[m.kind]}44` }}>
                  {m.kind}
                </span>
                <span className="signal-move-label">{m.label}</span>
                <span className="signal-move-pts tabular-nums" style={{ color: MOVE_COLOR[m.kind] }}>{m.points > 0 ? `+${m.points}` : '—'}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* POV toasts — inside the full-bleed phone's safe bottom, never blocking */}
      {!quiet && events.length > 0 && (
        <div className="signal-toasts" aria-live="polite">
          {events.map((e) => (
            <div key={e.id} className={`signal-toast signal-toast-${e.tone}`}>
              <span className="signal-toast-title">{e.title}</span>
              <span className="signal-toast-body">{e.body}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}