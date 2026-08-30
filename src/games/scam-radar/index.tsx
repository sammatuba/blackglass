import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FAMILIES } from './families'
import { useRadar } from './state'
import { FeedGame } from './feed/FeedGame'
import { FadeIn } from '../../ui/FadeIn'

type Mode = 'menu' | 'feed'

export default function ScamRadar() {
  const [mode, setMode] = useState<Mode>('menu')
  const totalScore = useRadar((s) => s.totalScore)
  const bestStreak = useRadar((s) => s.bestStreak)
  const reset = useRadar((s) => s.reset)

  useEffect(() => {
    document.title = 'Scam Radar · BLACKGLASS'
  }, [])

  return (
    <div className="min-h-dvh bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950">
      {mode === 'menu' ? (
        <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
          <Link to="/" className="text-sm text-ink-400 transition-colors hover:text-ink-100">
            ‹ Hub
          </Link>

          <FadeIn>
            <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-train uppercase">Train</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-ink-100">Scam Radar</h1>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-400">
              The story made you the observer — this makes you the target, safely. Judge real-world
              messages, learn the flags behind every verdict, and build the reflex that beats the
              scam: the pause.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="mt-5 flex gap-2 text-center">
              <div className="flex-1 rounded-xl border border-ink-700 bg-ink-800/70 p-3">
                <div className="font-display text-2xl font-semibold text-train tabular-nums">{totalScore}</div>
                <div className="mt-0.5 text-[10px] tracking-wide text-ink-400 uppercase">Radar score</div>
              </div>
              <div className="flex-1 rounded-xl border border-ink-700 bg-ink-800/70 p-3">
                <div className="font-display text-2xl font-semibold text-ink-100 tabular-nums">{bestStreak}×</div>
                <div className="mt-0.5 text-[10px] tracking-wide text-ink-400 uppercase">Best streak</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <button
              type="button"
              onClick={() => setMode('feed')}
              className="group mt-6 flex w-full flex-col rounded-2xl border border-train/40 bg-gradient-to-br from-ink-800 to-ink-800/40 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-train"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-ink-100">Feed Triage</h2>
                <span className="rounded-full bg-train/15 px-2.5 py-1 text-[11px] font-bold text-train uppercase">
                  Play
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
                Ten live messages: texts, emails, DMs, calls. Scam, Legit, or Verify first?
                Streaks multiply — wrong reads teach the flags.
              </p>
              <span className="mt-2 text-xs text-ink-400">
                ~4 min · keyboard-friendly (1 / 2 / 3)
              </span>
            </button>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="mt-4 rounded-2xl border border-ink-700 bg-ink-800/40 p-5 opacity-80">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-ink-100">Case Files</h2>
                <span className="rounded-full bg-ink-700 px-2.5 py-1 text-[11px] font-bold text-ink-300 uppercase">
                  Next drop
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
                Full narrative scams on your own phone: inspect the artifacts, work the clues,
                choose your response — and live the consequences.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <h2 className="mt-10 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
              The six red-flag families
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {FAMILIES.map((f) => (
                <li key={f.id} className="rounded-xl border border-ink-700 bg-ink-800/50 p-3.5">
                  <div className="text-sm font-bold text-ink-100">
                    <span aria-hidden="true">{f.icon}</span> {f.label}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink-400">{f.hint}</p>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.22}>
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset your radar score, streaks, and mastery?')) reset()
                }}
                className="text-xs text-ink-400 underline-offset-4 transition-colors hover:text-ink-100 hover:underline"
              >
                Reset progress
              </button>
              <p className="mt-3 text-[11px] text-ink-400">
                Every scenario is fictional. Names, numbers, and links are invented for training —
                see world/guardrails.md.
              </p>
            </div>
          </FadeIn>
        </div>
      ) : (
        <FeedGame onExit={() => setMode('menu')} />
      )}
    </div>
  )
}
