import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GAMES, PILLAR_META, type GameEntry, type Pillar } from '../registry'
import { GameCard } from '../../ui/GameCard'
import { FadeIn } from '../../ui/FadeIn'
import GlassHero from '../../three/GlassHero'
import { EXPLORABLES, type ExplorableEntry } from '../../games/glassbox/catalog'
import { PRESETS, computeScam } from '../../games/glassbox/model'
import { DEFAULT_DIAL, simulateFeed } from '../../games/glassbox/feed-model'
import { formatCount, formatNumber, formatPercent, formatPeso } from '../../games/glassbox/format'

const PILLAR_ORDER: Pillar[] = ['play', 'train', 'learn']

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 2.5 21 12l-9 9.5L3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2.5v19M3 12h18" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
    </svg>
  )
}

export default function Hub() {
  useEffect(() => {
    document.title = 'BLACKGLASS — Seeing Clearly in a World Shaped by AI'
  }, [])

  return (
    <div className="min-h-dvh bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-ink-800 focus-visible:px-4 focus-visible:py-2"
      >
        Skip to content
      </a>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 sm:px-8">
        <div className="flex items-center gap-2.5 text-ink-100">
          <BrandMark className="h-6 w-6 text-play" />
          <span className="text-sm font-bold tracking-[0.22em]">BLACKGLASS</span>
        </div>
        <p className="hidden text-xs tracking-[0.18em] text-ink-400 uppercase sm:block">
          AI safety · scam readiness · cyber-security
        </p>
      </header>

      <main id="main" className="relative z-10 mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        {/* HERO */}
        <section data-od-id="hero" className="relative py-16 text-center sm:py-24" aria-labelledby="hero-title">
          <GlassHero />
          <div className="relative">
            <FadeIn>
              <p className="text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
                An explorable suite for the age of synthetic media
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1
                id="hero-title"
                className="font-display mx-auto mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold text-balance text-ink-100 sm:text-6xl"
              >
                See clearly in a world shaped by AI.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-400 sm:text-lg">
                Live the story. Take the mechanism apart. Practice the reflex.
                Free, in your browser, no account — progress stays on your device.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/scam-radar"
                  className="rounded-full border border-train/60 px-6 py-3 text-sm font-bold text-train transition-colors duration-200 hover:bg-train/10"
                >
                  Start scam training →
                </Link>
                <Link
                  to="/blackglass"
                  className="rounded-full border border-ink-600 px-6 py-3 text-sm font-semibold text-ink-100 transition-colors duration-200 hover:border-play hover:text-play"
                >
                  Play the anthology
                </Link>
                <Link
                  to="/glassbox/one-in-a-thousand"
                  className="rounded-full border border-learn/60 px-6 py-3 text-sm font-semibold text-learn transition-colors duration-200 hover:bg-learn/10"
                >
                  Try Glassbox →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* PILLARS */}
        {PILLAR_ORDER.map((pillar) => {
          const meta = PILLAR_META[pillar]
          const games = GAMES.filter((g) => g.pillar === pillar)
          return (
            <section key={pillar} data-od-id={`pillar-${pillar}`} className="py-10 sm:py-14" aria-labelledby={`pillar-${pillar}`}>
              <FadeIn>
                <div className="mb-6 flex items-baseline gap-3">
                  <span className={`font-display text-3xl font-semibold ${meta.text}`} aria-hidden="true">
                    {pillar === 'play' ? '01' : pillar === 'train' ? '02' : '03'}
                  </span>
                  <div>
                    <h2 id={`pillar-${pillar}`} className="font-display text-2xl font-semibold text-ink-100">
                      {meta.name}
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-400">{meta.blurb}</p>
                  </div>
                </div>
              </FadeIn>
              {pillar === 'learn' ? (
                <div className="space-y-4">
                  {EXPLORABLES.map((piece, i) => (
                    <FadeIn key={piece.id} delay={i * 0.06}>
                      <GlassboxCard piece={piece} />
                    </FadeIn>
                  ))}
                  <ReferenceShelf games={games} />
                </div>
              ) : (
                <div className={`grid gap-4 sm:grid-cols-2 ${games.length > 2 ? 'lg:grid-cols-3' : ''}`}>
                  {games.map((game, i) => (
                    <FadeIn key={game.id} delay={i * 0.06}>
                      <GameCard game={game} />
                    </FadeIn>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </main>

      <footer className="relative z-10 border-t border-ink-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-center text-xs text-ink-400 sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <p>
            Depicts deception; never enables it — every scenario obeys{' '}
            <span className="text-ink-300">world/guardrails.md</span>: fictional brands, numbers, and people.
          </p>
          <p>
            <span className="text-ink-300">BLACKGLASS</span> · research → world → craft → play
          </p>
        </div>
      </footer>
    </div>
  )
}

/* The explorable is the pillar; the legacy card games remain playable as
   reference, collapsed so their separate visual language doesn't compete
   with the flagship work. */
function GlassboxCard({ piece }: { piece: ExplorableEntry }) {
  return (
    <Link
      to={piece.route}
      data-od-id="glassbox-feature"
      aria-labelledby={`glassbox-${piece.id}-title`}
      className="group grid gap-5 rounded-card border border-ink-700 bg-ink-800/40 p-5 transition-colors hover:border-learn/60 sm:grid-cols-[1.15fr_0.85fr] sm:items-center sm:p-6"
    >
      <div>
        <p className="text-2xs font-semibold tracking-[0.22em] text-learn uppercase">
          Glassbox {piece.number} · {piece.minutes} minutes · no score
        </p>
        <h3
          id={`glassbox-${piece.id}-title`}
          className="font-display mt-2 text-2xl font-semibold text-ink-100 sm:text-3xl"
        >
          {piece.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">{piece.tagline}</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-400">{piece.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-learn">
          Take it apart
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
            →
          </span>
        </span>
      </div>

      <div aria-hidden="true" className="paper-slip relative">
        {piece.preview === 'feed' ? <FeedPreview /> : <LedgerPreview />}
      </div>
    </Link>
  )
}

function LedgerPreview() {
  const day = computeScam(PRESETS.ai)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-2xs font-semibold tracking-[0.18em] text-[var(--paper-dim)] uppercase">
          Expected day
        </p>
        <span className="paper-stamp">Illustrative</span>
      </div>
      <p className="font-display mt-3 text-3xl font-semibold tabular-nums text-[var(--paper-ink)]">
        {formatPeso(day.profit)}
      </p>
      <p className="text-xs text-[var(--paper-dim)]">profit per day at the default line</p>
      <div className="mt-3 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
        {Array.from({ length: 40 }, (_, i) => (
          <span
            key={i}
            className={`aspect-square ${
              i === 7
                ? 'rounded-[1px] bg-[var(--paper-green)]'
                : i === 13 || i === 26 || i === 34
                  ? 'rounded-full bg-[var(--paper-amber)]'
                  : 'rounded-full bg-[var(--paper-faint)] opacity-40'
            }`}
          />
        ))}
      </div>
      <div className="mt-3 space-y-0.5 border-t border-[var(--paper-line)] pt-2 text-xs text-[var(--paper-dim)]">
        <p>
          <span className="text-[var(--paper-ink)]">{formatNumber(PRESETS.ai.reach)}</span> reached ·{' '}
          <span className="text-[var(--paper-ink)]">{formatCount(day.payments)}</span> paid
        </p>
        <p>1 in {formatNumber(day.messagesPerPayment)} messages finds a payer.</p>
      </div>
    </>
  )
}

const FEED_PREVIEW = simulateFeed(DEFAULT_DIAL)
const FEED_PREVIEW_WEEKS = [6, 13, 20, 27, 34].map((index) => FEED_PREVIEW.days[index])

function FeedPreview() {
  const week = FEED_PREVIEW.weekFive

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-2xs font-semibold tracking-[0.18em] text-[var(--paper-dim)] uppercase">
          Week five
        </p>
        <span className="paper-stamp">Illustrative</span>
      </div>
      <p className="font-display mt-3 text-3xl font-semibold tabular-nums text-[var(--paper-ink)]">
        {formatPercent(week.shares.outrage, 0)}
      </p>
      <p className="text-xs text-[var(--paper-dim)]">of Bea&apos;s feed is conflict</p>
      <div className="feed-preview-chart mt-3">
        {FEED_PREVIEW_WEEKS.map((day, index) => (
          <div key={index} className="feed-preview-day">
            <span className="seg-outrage" style={{ height: `${day.shares.outrage * 100}%` }} />
            <span className="seg-novelty" style={{ height: `${day.shares.novelty * 100}%` }} />
            <span className="seg-grounding" style={{ height: `${day.shares.grounding * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="feed-preview-weeks">
        <span>W1</span>
        <span>W5</span>
      </div>
      <div className="mt-3 space-y-0.5 border-t border-[var(--paper-line)] pt-2 text-xs text-[var(--paper-dim)]">
        <p>
          <span className="text-[var(--paper-ink)]">{formatPercent(week.shares.grounding, 0)}</span>{' '}
          context ·{' '}
          <span className="text-[var(--paper-ink)]">{formatCount(week.clicks)}</span> clicks/day
        </p>
        <p>35 days at the default dial. No post has to be false.</p>
      </div>
    </>
  )
}

function ReferenceShelf({ games }: { games: GameEntry[] }) {
  return (
    <FadeIn>
      <details
        data-od-id="learn-reference-shelf"
        className="group rounded-card border border-ink-700 bg-ink-800/30 px-5 py-4 sm:px-6"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink-200 [&::-webkit-details-marker]:hidden">
          <span>The reference shelf — {games.length} legacy concept games</span>
          <span className="shrink-0 text-xs font-normal text-ink-400 group-open:hidden">Open ›</span>
          <span className="hidden shrink-0 text-xs font-normal text-ink-400 group-open:inline">Close ›</span>
        </summary>
        <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 border-t border-ink-700 pt-3 sm:grid-cols-2">
          {games.map((g) => (
            <li key={g.id}>
              <Link
                to={`/legacy/${g.legacyPath}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink-700/50"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-learn/12 text-sm text-learn" aria-hidden="true">
                  {g.icon === 'eye' ? '👁' : g.icon === 'clipboard' ? '📋' : g.icon === 'search' ? '🔍' : '⚖'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-semibold text-ink-100">{g.title}</span>
                  <span className="block truncate text-[11.5px] text-ink-400">
                    {g.tagline} · {g.meta}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-ink-400 transition-colors group-hover:text-learn">Open ›</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-ink-700 pt-3 text-xs leading-relaxed text-ink-400">
          These card games ship as they were built — vanilla, playable, honest about their age. They
          remain as reference, not as the pillar&apos;s flagship; the concepts now live inside the
          explorables above.
        </p>
      </details>
    </FadeIn>
  )
}
