import type { ReactNode } from 'react'
import type { AppId } from '../types'
import { APP_META } from '../apps/shared'

/**
 * Code-drawn squircle app icons — M8.2 THE IPHONE PASS.
 * The tile (color identity) comes from APP_META; the glyph is drawn here in
 * a single white stroke/fill grammar, iOS-like but entirely fictional. No
 * Apple bitmaps, SF Symbols, or font glyphs — the BRAND_NOTICE rule from the
 * reference study applies to this project too (world/guardrails.md).
 */

const GLYPHS: Record<AppId, ReactNode> = {
  messages: (
    <path
      d="M12 3C6.9 3 3 6.5 3 11c0 2.2 1 4.2 2.7 5.6-.1 1.1-.5 2.3-1.4 3.4 1.7-.1 3.3-.7 4.5-1.5 1 .3 2.1.5 3.2.5 5.1 0 9-3.5 9-8S17.1 3 12 3Z"
      fill="currentColor"
    />
  ),
  assistant: <path d="M12 2l2.3 6.7L21 11l-6.7 2.3L12 20l-2.3-6.7L3 11l6.7-2.3Z" fill="currentColor" />,
  gallery: (
    <g fill="currentColor">
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <ellipse key={r} cx="12" cy="6.6" rx="2.5" ry="4.1" opacity="0.82" transform={`rotate(${r} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2" opacity="0.95" />
    </g>
  ),
  phone: (
    <path
      d="M6.6 3h3.1l1.6 4.2-2.1 1.6a12.4 12.4 0 0 0 6 6l1.6-2.1L21 14.3v3.1A2.6 2.6 0 0 1 18.4 20 15.5 15.5 0 0 1 4 5.6 2.6 2.6 0 0 1 6.6 3Z"
      fill="currentColor"
    />
  ),
  browser: (
    <g>
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16.8 7.2 10.7 10.7 7.2 16.8l6.1-3.5Z" fill="currentColor" />
    </g>
  ),
  contacts: (
    <path
      d="M12 11.6a3.9 3.9 0 1 0-3.9-3.9 3.9 3.9 0 0 0 3.9 3.9Zm0 2.1c-3.6 0-7.2 1.8-7.2 4.3v1h14.4v-1c0-2.5-3.6-4.3-7.2-4.3Z"
      fill="currentColor"
    />
  ),
  notes: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <rect x="4.5" y="3.5" width="15" height="17" rx="2.6" />
      <path d="M8 8.6h8M8 12h8M8 15.4h5.2" />
    </g>
  ),
  settings: (
    <path
      d="M12 8.2a3.8 3.8 0 1 0 3.8 3.8A3.8 3.8 0 0 0 12 8.2Zm8.5 3.8c0 .4 0 .8-.1 1.2l2 1.6-1.9 3.2-2.3-.9a7.4 7.4 0 0 1-2.1 1.2l-.4 2.4h-3.7l-.4-2.4a7.4 7.4 0 0 1-2.1-1.2l-2.3.9-1.9-3.2 2-1.6a7.6 7.6 0 0 1 0-2.4l-2-1.6L6.2 6l2.3.9a7.4 7.4 0 0 1 2.1-1.2l.4-2.4h3.7l.4 2.4a7.4 7.4 0 0 1 2.1 1.2L19.5 6l1.9 3.2-2 1.6c.1.4.1.8.1 1.2Z"
      fill="currentColor"
    />
  ),
}

export function AppIcon({ app, badge }: { app: AppId; badge?: number }) {
  const meta = APP_META[app]
  return (
    <span className={`os-app-icon relative ${meta.tile}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {GLYPHS[app]}
      </svg>
      {badge != null && badge > 0 && (
        <span className="absolute -top-1 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--os-danger)] px-1 text-2xs font-bold text-[var(--os-danger-ink)]">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </span>
  )
}

/** the bare glyph, sized by the caller — lock-screen widgets reuse the
    home icons' grammar so the phone reads as one system */
export function AppGlyph({ app, className }: { app: AppId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {GLYPHS[app]}
    </svg>
  )
}
