import type { FlagValue } from '../../engine/os/types'
import { GradeStamp, useCountUp } from '../shared/desk'
import { FadeIn } from '../../ui/FadeIn'
import type { AnthologyAnchor } from './types'
import { MOVE_COLOR, caseGame, tensionLevel, type RunScore } from './score'

/* =====================================================================
   THE VERDICT — the case-closed dossier. The grade stamps what you SAW
   and the reflexes you practiced; the outcome line tells what HAPPENED.
   They are deliberately separate: Tita's money moves on every path.
   ===================================================================== */

export function Verdict({
  anchor,
  phoneId,
  score,
  flags,
  newBest,
  onRack,
  onReplay,
}: {
  anchor: AnthologyAnchor
  phoneId: string
  score: RunScore
  flags: Record<string, FlagValue>
  newBest: boolean
  onRack: () => void
  onReplay: () => void
}) {
  const phone = anchor.phones[phoneId]
  const game = caseGame(phone.id)
  const tension = game ? tensionLevel(game, flags) : null
  const { count, stamped } = useCountUp(score.total, score.grade)

  return (
    <div className="desk-scene animate-screen min-h-dvh">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.3em] text-play uppercase">CASE CLOSED · {phone.id}</p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-ink-100">
            {phone.title} <span className="text-ink-400">— the verdict</span>
          </h1>
        </FadeIn>

        {/* the stamp */}
        <FadeIn delay={0.08}>
          <div className="verdict-hero mt-6 rounded-2xl border border-ink-700 bg-ink-800/60 p-6">
            <div className="flex flex-wrap items-center gap-6">
              <GradeStamp grade={score.grade} stamped={stamped} />
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-[0.25em] text-ink-400 uppercase">SIGNAL</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-semibold tabular-nums text-ink-100">{count}</span>
                  <span className="text-lg text-ink-500">/100</span>
                </p>
                {newBest && <p className="mt-1.5 text-[12px] font-bold tracking-wide text-play uppercase">✦ New best</p>}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-ink-700 bg-ink-900/60 px-4 py-3">
                <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">Clues seen</p>
                <p className="mt-1 text-[15px] font-bold tabular-nums text-ink-100">
                  {score.cluesFound}/{score.cluesTotal} <span className="font-semibold text-learn">+{score.cluePoints}</span>
                </p>
              </div>
              <div className="rounded-xl border border-ink-700 bg-ink-900/60 px-4 py-3">
                <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">Reflexes</p>
                <p className="mt-1 text-[15px] font-bold tabular-nums text-ink-100">
                  {score.reflexPoints}/{score.reflexMax} <span className="font-semibold text-learn">+{score.reflexScaled}</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-ink-400">
              The grade measures what you saw and the reflexes you practiced — never what you saved.
            </p>
          </div>
        </FadeIn>

        {/* the moves */}
        {score.moves.length > 0 && (
          <FadeIn delay={0.14}>
            <p className="mt-8 text-[11px] font-bold tracking-[0.25em] text-ink-400 uppercase">HOW YOU MOVED</p>
            <ul className="mt-3 space-y-2">
              {score.moves.map((m) => (
                <li key={m.id} className="rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="rounded px-1.5 py-0.5 text-2xs font-black tracking-[0.15em] uppercase" style={{ color: MOVE_COLOR[m.kind], background: `${MOVE_COLOR[m.kind]}16` }}>
                      {m.kind}
                    </span>
                    <span className="text-[12px] font-bold tabular-nums" style={{ color: MOVE_COLOR[m.kind] }}>
                      {m.points > 0 ? `+${m.points}` : '—'}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] font-semibold text-ink-100">{m.label}</p>
                  {m.note && <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-400">{m.note}</p>}
                </li>
              ))}
            </ul>
          </FadeIn>
        )}

        {/* what you missed */}
        {score.missed.length > 0 && (
          <FadeIn delay={0.18}>
            <div className="mt-6 rounded-xl border border-train/30 bg-train/8 px-4 py-3">
              <p className="text-[11px] font-bold tracking-[0.25em] text-train uppercase">STILL OUT THERE · {score.missed.length}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300">{score.missed.join(' · ')}</p>
              <p className="mt-1 text-[12px] text-ink-400">Another run would see them.</p>
            </div>
          </FadeIn>
        )}

        {/* what happened — separate from the grade */}
        <FadeIn delay={0.22}>
          <div className="mt-6 rounded-2xl border border-ink-600 bg-ink-900/80 p-5">
            <p className="text-[11px] font-bold tracking-[0.25em] text-ink-400 uppercase">WHAT HAPPENED</p>
            <p className="font-display mt-2 text-[15.5px] leading-relaxed text-ink-200">{score.outcome}</p>
            {game && tension && (
              <p className="mt-3 border-t border-ink-700 pt-3 text-[12.5px] leading-relaxed text-ink-400">
                {game.tensionName} ended at <span className="font-semibold text-ink-200">{tension.label}</span>. It rose no
                matter what you chose — the pressure was never yours to stop, only to see.
              </p>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.26}>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onRack}
              className="flex-1 rounded-full bg-play px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
            >
              Back to the rack
            </button>
            <button
              type="button"
              onClick={onReplay}
              className="flex-1 rounded-full border border-ink-600 px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-ink-400"
            >
              Live it again
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}