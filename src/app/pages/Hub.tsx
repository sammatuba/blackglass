import { useEffect, useRef, useState, type RefObject } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GAMES } from '../registry'
import { BrandMark } from '../../ui/BrandMark'
import { Station } from '../../ui/Station'
import { FadeIn } from '../../ui/FadeIn'
import { Icon } from '../../ui/Icon'
import GlassHero from '../../three/GlassHero'
import { warmRoutesWhenIdle, prefetchRoute } from '../prefetch'
import { anthologyStamp, examStamp, radarStamp, readSeason } from '../season'
import { EXPLORABLES, type ExplorableEntry } from '../../games/glassbox/catalog'
import { PRESETS, computeScam } from '../../games/glassbox/model'
import { DEFAULT_DIAL, simulateFeed } from '../../games/glassbox/feed-model'
import { formatCount, formatNumber, formatPercent, formatPeso } from '../../games/glassbox/format'

/* THE OPERATOR'S CONSOLE — the hub as the desk itself. The suite's shared
   fiction is the signal desk (M6.5/M6.6); the hub joins it: everything
   playable is a station of equipment, the season is your operator badge,
   and the legacy pieces live in one archive drawer. Minimal reading — the
   stations carry one line each; the games themselves do the explaining. */

const HOTKEY_ROUTES: Record<string, string> = {
  '1': '/blackglass',
  '2': '/scam-radar',
  '3': '/tell-exam',
  '4': '/glassbox/one-in-a-thousand',
  '5': '/glassbox/the-feed-dial',
}

export default function Hub() {
  const navigate = useNavigate()
  const [archiveOpen, setArchiveOpen] = useState(false)
  const archiveRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    document.title = 'BLACKGLASS — Seeing Clearly in a World Shaped by AI'
  }, [])

  // the desk warms every route chunk once the browser is idle — later
  // navigations land on an already-booted module, even on a cold cache
  useEffect(() => {
    warmRoutesWhenIdle()
  }, [])

  // operator shortcuts: 1–5 jump straight to a station, 6 opens the archive
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
      if (e.key === '6') {
        e.preventDefault()
        setArchiveOpen((o) => !o)
        if (!archiveOpen) {
          const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
          archiveRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' })
        }
        return
      }
      const to = HOTKEY_ROUTES[e.key]
      if (to) {
        e.preventDefault()
        navigate(to)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

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
          The operator’s console · every record stays on this device
        </p>
      </header>

      <main id="main" className="relative z-10 mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        {/* THE CONSOLE HEADER — the suite's statement, compressed; the
            desk below is the navigation, so the marketing CTAs are gone */}
        <section data-od-id="hero" className="relative py-14 text-center sm:py-20" aria-labelledby="hero-title">
          <GlassHero />
          <div className="relative">
            <FadeIn>
              <p className="text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
                The desk is live · signal acquired
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
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-400 sm:text-base">
                Live the story. Train the reflex. Take the mechanism apart. Every record stays
                on this device.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* THE DESK — every playable thing is a station. Hovering (or
            focusing) a station warms its route chunk before the click. */}
        <section data-od-id="desk" className="py-8 sm:py-10" aria-labelledby="desk-title">
          <FadeIn>
            <div className="mb-5 flex items-baseline gap-3">
              <h2 id="desk-title" className="text-2xs font-semibold tracking-[0.24em] text-play uppercase">
                The desk
              </h2>
              <p className="hidden text-[11px] text-ink-500 sm:block">
                pick a station — keys 1–6 (6 opens the archive)
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-4 lg:grid-cols-3">
            <FadeIn>
              <Station
                odId="station-rack"
                id="blackglass"
                to="/blackglass"
                kicker="Play · the phone rack"
                name="BLACKGLASS"
                line="Thirteen phones, one family's season. Pick up; the desk records every flag you catch."
                icon="phone"
                accent="play"
                stamp={anthologyStamp()}
                hotkey="1"
              />
            </FadeIn>
            <FadeIn delay={0.06}>
              <Station
                odId="station-feed"
                id="scam-radar"
                to="/scam-radar"
                kicker="Train · the feed desk"
                name="Scam Radar"
                line="Judge the live feed, work the case files. Train the pause that beats the scam."
                icon="radar"
                accent="train"
                stamp={radarStamp()}
                hotkey="2"
              />
            </FadeIn>
            <FadeIn delay={0.12}>
              <Station
                odId="station-lens"
                id="tell-exam"
                to="/tell-exam"
                kicker="Train · the lens bench"
                name="Tell Exam"
                line="The synthetic images, one at a time — tap the flaw they planted on purpose."
                icon="eye"
                accent="train"
                stamp={examStamp()}
                hotkey="3"
              />
            </FadeIn>
          </div>

          {/* THE GLASSBOX LAB — the learn pillar keeps its live paper
              readouts; the numbers are computed, not decorative */}
          <div className="mt-4 space-y-4">
            {EXPLORABLES.map((piece, i) => (
              <FadeIn key={piece.id} delay={i * 0.06}>
                <GlassboxCard piece={piece} hotkey={i === 0 ? '4' : '5'} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* YOUR SEASON — the operator badge. One record across the scored
            surfaces, read from each game's persisted store directly:
            importing a game module would break the lazy-loading boundary,
            so this strip parses localStorage and stays silent until
            something has been played. */}
        <SeasonStrip />

        {/* THE ARCHIVE — every legacy piece in one drawer. The desk shows
            only current work; the archive keeps the old shelf playable
            without the NEW/LEGACY badge guessing game. */}
        <ArchiveDrawer
          games={GAMES.filter((g) => g.status === 'legacy')}
          openRef={archiveRef}
          open={archiveOpen}
          setOpen={setArchiveOpen}
        />
      </main>

      <footer className="relative z-10 border-t border-ink-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-center text-xs text-ink-400 sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <p>
            Depicts deception; never enables it — fictional brands, numbers, and people, throughout.
          </p>
          <p>
            <span className="text-ink-300">BLACKGLASS</span> · the operator’s desk
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ——— the records: parsers live in app/season.ts (pure, tested) ——— */

/* ——— YOUR SEASON: the cross-suite record strip ——— */

const SEASON_PREFETCH: Record<string, string> = {
  '/blackglass': 'blackglass',
  '/scam-radar': 'scam-radar',
  '/tell-exam': 'tell-exam',
}

function seasonPrefetchId(to: string): string {
  return SEASON_PREFETCH[to] ?? 'blackglass'
}

function SeasonStrip() {
  const rec = readSeason()
  if (!rec) return null
  const cells = [
    {
      to: '/blackglass',
      label: 'The anthology',
      value: rec.anthology ? String(rec.anthology.total) : null,
      sub: rec.anthology ? `${rec.anthology.lived} phones lived · ${rec.anthology.rank}` : 'not started yet',
    },
    {
      to: '/scam-radar',
      label: 'Scam Radar',
      value: rec.radar ? String(rec.radar.score) : null,
      sub: rec.radar ? `best streak ${rec.radar.streak}×` : 'not started yet',
    },
    {
      to: '/tell-exam',
      label: 'Tell Exam',
      value: rec.exam != null ? `${rec.exam}%` : null,
      sub: rec.exam != null ? 'tells spotted, best run' : 'not started yet',
    },
  ]
  return (
    <section
      data-od-id="season"
      aria-labelledby="season-title"
      className="relative z-10 rounded-card border border-ink-700 bg-ink-800/40 p-5 sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="season-title" className="text-2xs font-semibold tracking-[0.22em] text-play uppercase">
          Your season across the suite
        </h2>
        <p className="text-2xs text-ink-400">stays on this device</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {cells.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            onPointerEnter={() => prefetchRoute(seasonPrefetchId(c.to))}
            onFocus={() => prefetchRoute(seasonPrefetchId(c.to))}
            className="group rounded-xl border border-ink-700 bg-ink-900/50 px-4 py-3.5 transition-colors hover:border-ink-400"
          >
            <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">{c.label}</p>
            <p className="font-display mt-1 text-3xl font-semibold tabular-nums text-ink-100">
              {c.value ?? <span className="text-ink-500">—</span>}
            </p>
            <p className="mt-0.5 text-[11.5px] text-ink-400 transition-colors group-hover:text-ink-300">{c.sub}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ——— THE GLASSBOX LAB: the explorables keep their computed readouts ——— */

function GlassboxCard({ piece, hotkey }: { piece: ExplorableEntry; hotkey: string }) {
  const prefetchId = piece.preview === 'feed' ? 'glassbox-feed' : 'glassbox'
  return (
    <Link
      to={piece.route}
      data-od-id="glassbox-feature"
      aria-labelledby={`glassbox-${piece.id}-title`}
      onPointerEnter={() => prefetchRoute(prefetchId)}
      onFocus={() => prefetchRoute(prefetchId)}
      className="group relative grid gap-5 rounded-card border border-ink-700 bg-ink-800/40 p-5 transition-colors hover:border-learn/60 sm:grid-cols-[1.15fr_0.85fr] sm:items-center sm:p-6"
    >
      <div>
        <div className="flex items-center gap-2">
          <p className="text-2xs font-semibold tracking-[0.22em] text-learn uppercase">
            Learn · the glassbox lab · {piece.number} · {piece.minutes} minutes · no score
          </p>
          <span
            aria-hidden="true"
            className="hidden h-6 w-6 shrink-0 place-items-center rounded-md border border-ink-700 text-[11px] font-semibold text-ink-500 lg:grid"
          >
            {hotkey}
          </span>
        </div>
        <h3
          id={`glassbox-${piece.id}-title`}
          className="font-display mt-2 text-2xl font-semibold text-ink-100 sm:text-3xl"
        >
          {piece.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">{piece.tagline}</p>
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

/* ——— THE ARCHIVE DRAWER: every legacy piece, one place ——— */

function ArchiveDrawer({
  games,
  openRef,
  open,
  setOpen,
}: {
  games: typeof GAMES
  openRef: RefObject<HTMLDetailsElement | null>
  open: boolean
  setOpen: (open: boolean) => void
}) {
  return (
    <FadeIn>
      <details
        ref={openRef}
        open={open}
        onToggle={(e) => setOpen(e.currentTarget.open)}
        data-od-id="archive"
        className="group desk-plate rounded-card border border-ink-700 bg-ink-800/30 px-5 py-4 sm:px-6"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink-200 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ink-700 bg-ink-900/80 text-ink-400">
              <Icon name="book" className="h-4 w-4" />
            </span>
            The archive — {games.length} legacy pieces, kept playable
          </span>
          <span className="shrink-0 text-xs font-normal text-ink-400 group-open:hidden">Open ›</span>
          <span className="hidden shrink-0 text-xs font-normal text-ink-400 group-open:inline">Close ›</span>
        </summary>
        <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 border-t border-ink-700 pt-3 sm:grid-cols-2">
          {games.map((g) => (
            <li key={g.id}>
              <Link
                to={`/legacy/${g.legacyPath}`}
                className="archive-row group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-700/50 text-ink-300" aria-hidden="true">
                  <Icon name={g.icon} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-semibold text-ink-100">{g.title}</span>
                  <span className="block truncate text-[11.5px] text-ink-400">
                    {g.tagline} · {g.meta}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-ink-400 transition-colors group-hover:text-ink-200">Open ›</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-ink-700 pt-3 text-xs leading-relaxed text-ink-400">
          The reference shelf, kept exactly as it was built. The concepts now live inside the
          desk above.
        </p>
      </details>
    </FadeIn>
  )
}
