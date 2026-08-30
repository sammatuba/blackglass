import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const FAMILIES = [
  'Urgency & pressure',
  'Authority & impersonation',
  'Payment & money movement',
  'Too good to be true',
  'Emotional leverage & secrecy',
  'Channel anomalies',
]

/**
 * Phase-2 replaces this teaser with the full trainer:
 * Feed Triage (rapid judging) + Case Files (narrative defense scenarios).
 */
export default function ScamRadar() {
  useEffect(() => {
    document.title = 'Scam Radar · BLACKGLASS'
  }, [])

  return (
    <div className="min-h-dvh bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950">
      <div className="mx-auto max-w-2xl px-5 py-14">
        <Link to="/" className="text-sm text-ink-400 transition-colors hover:text-ink-100">
          ‹ Back to the hub
        </Link>

        <p className="mt-10 text-xs font-semibold tracking-[0.3em] text-train uppercase">
          Train · in development
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-ink-100">Scam Radar</h1>
        <p className="mt-4 leading-relaxed text-ink-400">
          The story made you the observer — <em>Scam Radar</em> makes you the target, safely.
          Two modes are being built on the same phone engine that powers the BLACKGLASS anthology:
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl border border-ink-700 bg-ink-800/70 p-5">
            <h2 className="font-display text-xl font-semibold text-ink-100">
              Feed Triage <span className="ml-2 align-middle text-xs font-bold tracking-wide text-train uppercase">Next build</span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">
              A live feed of texts, DMs, emails, and calls. Judge each one —{' '}
              <span className="font-semibold text-train">Scam</span>,{' '}
              <span className="font-semibold text-learn">Legit</span>, or{' '}
              <span className="font-semibold text-play">Verify first</span> — build a streak,
              and learn the flags behind every verdict.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-700 bg-ink-800/70 p-5">
            <h2 className="font-display text-xl font-semibold text-ink-100">
              Case Files <span className="ml-2 align-middle text-xs font-bold tracking-wide text-ink-400 uppercase">Soon</span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">
              Narrative scams on your own phone: inspect the artifacts, gather clues, choose
              your response — disengage, verify through official channels, report, warn family —
              and live the consequences.
            </p>
          </div>
        </div>

        <h2 className="mt-10 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
          The six red-flag families
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {FAMILIES.map((f) => (
            <li key={f} className="rounded-full border border-ink-700 bg-ink-800/60 px-3 py-1.5 text-sm text-ink-300">
              {f}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-ink-400">
          Meanwhile, the PLAY pillar is live:{' '}
          <Link to="/legacy/blackglass-phones/" className="text-play underline-offset-4 hover:underline">
            play the BLACKGLASS anthology
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
