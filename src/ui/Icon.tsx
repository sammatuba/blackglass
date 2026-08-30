import type { JSX } from 'react'
import type { IconName } from '../app/registry'

const PATHS: Record<IconName, JSX.Element> = {
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5A2.5 2.5 0 0 1 6.5 2.5H20v19H6.5A2.5 2.5 0 0 1 4 19Z" />
      <path d="M20 17.5H6.5A2.5 2.5 0 0 0 4 20" />
      <path d="M9 7.5h7" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      <path d="m12 12 6.4-6.4" />
    </>
  ),
  loop: (
    <>
      <path d="M4.6 11A7.5 7.5 0 0 1 18 6.5" />
      <path d="M19.4 13A7.5 7.5 0 0 1 6 17.5" />
      <path d="M18 2.5v4h-4" />
      <path d="M6 21.5v-4h4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20.5 20.5-5.6-5.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="3.5" width="14" height="17.5" rx="2" />
      <rect x="9" y="1.5" width="6" height="4" rx="1" />
      <path d="M9 11h6" />
      <path d="M9 15h4" />
    </>
  ),
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
