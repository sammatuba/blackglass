import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gameByLegacyPath } from '../registry'

/** Chrome around a legacy vanilla app, embedded same-origin. */
export default function LegacyViewer() {
  // pathname inside the /legacy/* route, e.g. "blackglass-phones"
  const rest = useLocation()
    .pathname.replace(/^\/?legacy\/?/, '')
    .replace(/\/+$/, '')
    .replace(/\/index\.html$/, '')
  const game = gameByLegacyPath(rest)
  // legacy apps ship verbatim from play/ into dist/legacy/play/<app>/
  const src = `${import.meta.env.BASE_URL}legacy/play/${rest}/index.html`

  useEffect(() => {
    document.title = game ? `${game.title} · BLACKGLASS` : 'Legacy game · BLACKGLASS'
  }, [game])

  if (!game) {
    return (
      <div className="grid min-h-dvh place-items-center bg-ink-950 px-6 text-center">
        <div>
          <p className="text-ink-100">No legacy game at <code className="text-ink-300">{rest}</code>.</p>
          <Link to="/" className="mt-3 inline-block text-play underline-offset-4 hover:underline">
            ‹ Back to the hub
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-dvh flex-col bg-ink-950">
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-ink-800 px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            className="shrink-0 rounded-md px-2 py-1 text-sm text-ink-300 transition-colors hover:text-ink-100"
          >
            ‹ Hub
          </Link>
          <span className="truncate text-sm font-semibold text-ink-100">
            {game ? game.title : rest}
            {game && <span className="ml-2 font-normal text-ink-400">{game.tagline}</span>}
          </span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-md px-2 py-1 text-xs text-ink-400 transition-colors hover:text-ink-100"
        >
          Open standalone ↗
        </a>
      </header>
      <iframe
        src={src}
        title={game ? `${game.title} game` : rest}
        className="min-h-0 w-full flex-1 border-0 bg-white"
      />
    </div>
  )
}
