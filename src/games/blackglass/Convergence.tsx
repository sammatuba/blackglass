import { useMemo } from 'react'
import { FadeIn } from '../../ui/FadeIn'
import { CONVERGENCE } from './content/convergence'
import { allRuns, anchorStats, choiceText, globalStats } from './progress'
import { useBlackglass } from './state'
import type { AnthologyAnchor } from './types'

/* THE CONVERGENCE — the global finale. The season assembled from the
   player's recorded choices, with the discovery record as a signal report.
   Unlocked by the anchor select once every phone has been lived. */

const WHO_ACCENT: Record<string, string> = {
  maya: '#f0c46f',
  tita: '#b27a2e',
  bea: '#1d9bf0',
}

export function Convergence({ anchors, onBack }: { anchors: AnthologyAnchor[]; onBack: () => void }) {
  const progress = useBlackglass((s) => s.anchors)
  const runs = useMemo(() => allRuns(progress), [progress])
  const stats = useMemo(() => globalStats(anchors, progress), [anchors, progress])
  const pct = stats.cluesTotal ? Math.round((stats.clues / stats.cluesTotal) * 100) : 0

  return (
    <div className="desk-scene animate-screen min-h-dvh">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
        <button type="button" onClick={onBack} className="text-sm text-ink-400 transition-colors hover:text-ink-100">
          ‹ The anthology
        </button>

        <FadeIn>
          <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-play uppercase">BLACKGLASS · the season</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-ink-100">{CONVERGENCE.title}</h1>
          <p className="font-display mt-1 text-xl italic text-ink-300">{CONVERGENCE.subtitle}</p>
          <div className="mt-4 space-y-3">
            {CONVERGENCE.intro.map((p, i) => (
              <p key={i} className="max-w-xl text-[14.5px] leading-relaxed text-ink-300">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>

        {CONVERGENCE.chapters.map((ch) => (
          <section key={ch.kicker} className="mt-12">
            <FadeIn>
              <p className="text-[11px] font-bold tracking-[0.25em] text-play uppercase">{ch.kicker}</p>
              <h2 className="font-display mt-1 text-2xl font-semibold text-ink-100">{ch.title}</h2>
            </FadeIn>
            <ol className="mt-5">
              {ch.events.map((ev, i) => {
                const accent = WHO_ACCENT[ev.who] ?? '#8b8b8b'
                const text = choiceText(ev, runs) ?? ev.text
                return (
                  <FadeIn key={`${ch.kicker}-${i}`} delay={Math.min(0.25, i * 0.04)}>
                    <li className="relative flex gap-4 pb-7">
                      {i < ch.events.length - 1 && (
                        <span className="absolute left-[52px] top-9 bottom-0 w-px bg-ink-700" aria-hidden="true" />
                      )}
                      <span className="w-11 shrink-0 pt-0.5 text-right text-[12px] font-bold tabular-nums text-ink-300">{ev.time}</span>
                      <span
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-ink-900"
                        style={{ background: accent }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: accent }}>
                          {ev.label}
                        </span>
                        <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-300">{text}</span>
                      </span>
                    </li>
                  </FadeIn>
                )
              })}
            </ol>
          </section>
        ))}

        <FadeIn>
          <div className="mt-6 rounded-2xl border border-play/30 bg-play/8 p-5">
            <h2 className="font-display text-xl font-semibold text-ink-100">{CONVERGENCE.throughline.title}</h2>
            <div className="mt-3 space-y-3">
              {CONVERGENCE.throughline.paragraphs.map((p, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-ink-200">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-8 rounded-2xl border border-ink-700 bg-ink-800/60 p-5">
            <p className="text-[11px] font-bold tracking-[0.25em] text-play uppercase">Signal report</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <ReportStat value={`${stats.lived}/${stats.phones}`} label="phones lived" />
              <ReportStat value={`${stats.clues}/${stats.cluesTotal}`} label="clues found" />
              <ReportStat value={`${pct}%`} label="discovery" />
            </div>
            <div className="mt-5 space-y-3">
              {anchors.map((a) => {
                const s = anchorStats(a, progress[a.id])
                return (
                  <div key={a.id}>
                    <div className="flex items-baseline justify-between gap-3 text-[12px]">
                      <span className="truncate font-semibold text-ink-200">
                        {a.title} <span className="font-normal text-ink-400">{a.subtitle}</span>
                      </span>
                      <span className="shrink-0 tabular-nums text-ink-400">
                        {s.lived}/{s.phones} · {s.cluesTotal ? `${s.clues}/${s.cluesTotal} clues` : 'no clue trail'}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-700">
                      <div
                        className="h-full rounded-full bg-play transition-all"
                        style={{ width: `${s.phones ? (s.lived / s.phones) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-10 space-y-3 text-center">
            {CONVERGENCE.close.map((p, i) => (
              <p key={i} className="text-[14.5px] leading-relaxed text-ink-300">
                {p}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={onBack}
            className="mt-8 w-full rounded-full border border-ink-600 px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-ink-400"
          >
            Back to the anthology
          </button>
        </FadeIn>
      </div>
    </div>
  )
}

function ReportStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-900/60 px-3 py-3">
      <div className="font-display text-2xl font-semibold tabular-nums text-ink-100">{value}</div>
      <div className="mt-0.5 text-[10.5px] tracking-wide text-ink-400 uppercase">{label}</div>
    </div>
  )
}
