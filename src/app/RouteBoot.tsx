import { BrandMark } from '../ui/BrandMark'

/* The route-loading screen. It replaces the old bare “Loading…” line that
   sat alone on the near-black page — the black gap visitors read as a
   broken link. Shown only while a lazy game chunk streams in; the hub's
   hover prefetch (app/prefetch.ts) usually has it warm before the click,
   and reduced motion gets the static frame (the global CSS override
   stills the shimmer). */

export default function RouteBoot() {
  return (
    <div
      role="status"
      aria-label="Loading the next module"
      className="route-boot grid min-h-dvh place-items-center bg-ink-950"
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <BrandMark className="h-9 w-9 text-play" />
        <p className="text-2xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
          Booting
        </p>
        <div className="boot-scan" aria-hidden="true" />
        <p className="max-w-xs text-[11px] leading-relaxed text-ink-500">
          Acquiring signal.
        </p>
      </div>
    </div>
  )
}
