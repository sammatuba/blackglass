import { Link } from 'react-router-dom'
import { PILLAR_META, STATUS_LABEL, type GameEntry } from '../app/registry'
import { Icon } from './Icon'

export function GameCard({ game }: { game: GameEntry }) {
  const pillar = PILLAR_META[game.pillar]
  const href = game.route ?? `/legacy/${game.legacyPath ?? ''}`
  return (
    <Link
      to={href}
      className={`group relative flex flex-col rounded-2xl border border-ink-700 bg-ink-800/70 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-ink-800 hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.7)] ${pillar.border} focus-visible:-translate-y-1`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${pillar.iconBg}`}
        >
          <Icon name={game.icon} className="h-6 w-6" />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${pillar.chipBg}`}
        >
          {STATUS_LABEL[game.status]}
        </span>
      </div>

      <h3 className="font-display text-xl leading-snug font-semibold text-ink-100">
        {game.title}
      </h3>
      <p className={`mt-0.5 text-sm font-medium ${pillar.text}`}>{game.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-400">{game.description}</p>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-1.5">
          {game.topics.map((t) => (
            <span
              key={t}
              className="rounded-md bg-ink-700/60 px-2 py-0.5 text-xs text-ink-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-ink-700/60 pt-3">
          <span className="text-xs tracking-wide text-ink-400 uppercase">{game.meta}</span>
          <span
            className={`text-lg transition-transform duration-200 group-hover:translate-x-1 ${pillar.text}`}
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
