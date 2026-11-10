export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 2.5 21 12l-9 9.5L3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2.5v19M3 12h18" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
    </svg>
  )
}
