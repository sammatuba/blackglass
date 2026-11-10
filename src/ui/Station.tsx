import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { prefetchRoute } from '../app/prefetch'
import type { IconName } from '../app/registry'
import { Icon } from './Icon'

export type StationAccent = 'play' | 'train' | 'learn'

const ACCENT_VAR: Record<StationAccent, string> = {
  play: 'var(--color-play)',
  train: 'var(--color-train)',
  learn: 'var(--color-learn)',
}

const ACCENT_TEXT: Record<StationAccent, string> = {
  play: 'text-play',
  train: 'text-train',
  learn: 'text-learn',
}

const ACCENT_BORDER: Record<StationAccent, string> = {
  play: 'hover:border-play/60 focus-visible:border-play/60',
  train: 'hover:border-train/60 focus-visible:border-train/60',
  learn: 'hover:border-learn/60 focus-visible:border-learn/60',
}

/* One station of the operator's console: a piece of desk hardware that is
   also a plain link into the game. The silhouette carries a status LED
   (lit once a record exists), the record stamp speaks the desk's chip
   language, and hover/focus warms the route chunk (app/prefetch.ts) so
   the click lands on an already-booted module. */
export function Station({
  odId,
  id,
  to,
  kicker,
  name,
  line,
  icon,
  accent,
  stamp,
  hotkey,
}: {
  odId: string
  /** prefetch id — mirrors app/prefetch.ts */
  id: string
  to: string
  kicker: string
  name: string
  line: string
  icon: IconName
  accent: StationAccent
  /** the record line, e.g. “159 · WATCHER” — null renders UNPLAYED */
  stamp: string | null
  hotkey?: string
}) {
  return (
    <Link
      to={to}
      data-od-id={odId}
      aria-label={`${name} — ${stamp ? `record ${stamp}` : 'not played yet'}`}
      onPointerEnter={() => prefetchRoute(id)}
      onFocus={() => prefetchRoute(id)}
      style={{ '--station-accent': ACCENT_VAR[accent] } as CSSProperties}
      className={`group relative flex gap-4 rounded-card border border-ink-700 bg-ink-800/60 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-800/90 focus-visible:-translate-y-0.5 ${ACCENT_BORDER[accent]}`}
    >
      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-ink-700 bg-ink-900/80">
        <Icon name={icon} className={`h-7 w-7 ${ACCENT_TEXT[accent]}`} />
        <span className={`station-led absolute -right-1 -top-1${stamp ? ' is-live' : ''}`} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-2xs font-semibold tracking-[0.22em] ${ACCENT_TEXT[accent]} uppercase`}>
          {kicker}
        </span>
        <span className="font-display mt-1 block text-xl font-semibold text-ink-100">{name}</span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-400">{line}</span>
        <span
          className={`mt-3 inline-block rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] uppercase ${
            stamp ? `border-current/40 ${ACCENT_TEXT[accent]}` : 'border-ink-600 text-ink-500'
          }`}
        >
          {stamp ? `✓ ${stamp}` : 'Unplayed'}
        </span>
      </span>
      {hotkey && (
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-4 hidden h-6 w-6 place-items-center rounded-md border border-ink-700 text-[11px] font-semibold text-ink-500 group-hover:border-ink-500 group-hover:text-ink-300 lg:grid"
        >
          {hotkey}
        </span>
      )}
    </Link>
  )
}
