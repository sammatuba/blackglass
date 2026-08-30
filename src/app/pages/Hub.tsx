import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GAMES, PILLAR_META, type Pillar } from '../registry'
import { GameCard } from '../../ui/GameCard'
import { FadeIn } from '../../ui/FadeIn'
import GlassHero from '../../three/GlassHero'

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
        <section className="relative py-16 text-center sm:py-24" aria-labelledby="hero-title">
          <GlassHero />
          <div className="relative">
            <FadeIn>
              <p className="text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
                A game suite for the age of synthetic media
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
                Play the story. Train the instincts. Learn the concepts.
                Free, in your browser, no account — progress stays on your device.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/scam-radar"
                  className="rounded-full bg-train px-6 py-3 text-sm font-bold text-ink-950 shadow-[0_8px_30px_-8px_rgba(245,185,66,0.5)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Start scam training →
                </Link>
                <Link
                  to="/legacy/blackglass-phones/"
                  className="rounded-full border border-ink-600 px-6 py-3 text-sm font-semibold text-ink-100 transition-colors duration-200 hover:border-play hover:text-play"
                >
                  Play the anthology
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
            <section key={pillar} className="py-10 sm:py-14" aria-labelledby={`pillar-${pillar}`}>
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
              <div className={`grid gap-4 sm:grid-cols-2 ${games.length > 2 ? 'lg:grid-cols-3' : ''}`}>
                {games.map((game, i) => (
                  <FadeIn key={game.id} delay={i * 0.06}>
                    <GameCard game={game} />
                  </FadeIn>
                ))}
              </div>
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
