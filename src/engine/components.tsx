import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type {
  AppHead,
  Artifact,
  Beat,
  CallBeat,
  Choice,
  ComposeBeat,
  Frame,
  GalleryBeat,
  LinkBeat,
  MsgBeat,
  Notif,
  NotifBeat,
  PhoneDef,
  PhotoBeat,
  RecogBeat,
  SysBeat,
  TransferBeat,
  VideoBeat,
  VoiceBeat,
  WeekheadBeat,
  AsideBeat,
} from './types'

/* =====================================================================
   Renderers for every beat, plus device chrome. Ported from the
   anthology's app.js; visual language: a phone made of CSS.
   ===================================================================== */

const ArtifactCtx = createContext<Record<string, Artifact>>({})
export function ArtifactProvider({
  artifacts,
  children,
}: {
  artifacts?: Artifact[]
  children: ReactNode
}) {
  const value = useMemo(
    () => Object.fromEntries((artifacts ?? []).map((a) => [a.id, a])),
    [artifacts],
  )
  return <ArtifactCtx.Provider value={value}>{children}</ArtifactCtx.Provider>
}

export function useArtifact(id: string | undefined): Artifact | undefined {
  const all = useContext(ArtifactCtx)
  return id ? all[id] : undefined
}

/* ---------------- artifact image with CSS-fallback ---------------- */

export function ArtifactImg({ id, className }: { id?: string; className?: string }) {
  const art = useArtifact(id)
  const [failed, setFailed] = useState(false)
  if (!art?.file || failed) return null
  return <img src={art.file} alt="" loading="lazy" onError={() => setFailed(true)} className={className} />
}

/* ---------------- device chrome ---------------- */

export function StatusBar({ time }: { time: string }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold tracking-wide text-white/85">
      <span>{time}</span>
      <span className="flex items-center gap-1.5 opacity-80" aria-hidden="true">
        <span className="text-[9px] tracking-tighter">••••</span>
        <span>⌃</span>
        <span>▮</span>
      </span>
    </div>
  )
}

export function DeviceChip({
  name,
  verb,
  onBack,
}: {
  name: string
  verb: string
  onBack?: () => void
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-sm text-white/80 transition-colors hover:bg-white/20"
        >
          ‹
        </button>
      )}
      <span className="truncate text-xs font-bold text-white/90">{name}</span>
      {verb && <span className="shrink-0 text-[10px] tracking-[0.18em] text-white/50 uppercase">{verb}</span>}
    </div>
  )
}

export function Wallpaper({ id, className }: { id: string; className?: string }) {
  return <div className={`wall-${id} ${className ?? ''}`} aria-hidden="true" />
}

export function LockScreen({
  phone,
  notifs,
}: {
  phone: PhoneDef
  notifs?: Notif[]
}) {
  const dim = phone.lock.brightness <= 30
  return (
    <div className="relative min-h-full overflow-hidden rounded-[inherit]">
      <Wallpaper id={phone.lock.wallpaper} className="absolute inset-0" />
      <div className="relative flex min-h-[420px] flex-col px-5 pt-10 pb-6 text-white">
        <div className="text-center">
          <div className="text-[13px] font-medium tracking-wide opacity-80">{phone.lock.day}</div>
          <div className="font-display mt-1 text-5xl font-semibold tracking-tight drop-shadow">
            {phone.lock.time}
            {phone.lock.meridiem && <span className="ml-1 text-base opacity-75">{phone.lock.meridiem}</span>}
          </div>
          {dim && <div className="mt-2 text-[11px] opacity-70">brightness {phone.lock.brightness}%</div>}
        </div>
        <div className="mt-auto space-y-2">
          {(notifs ?? []).map((n, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-black/45 px-3.5 py-2.5 backdrop-blur-sm ${n.dim ? 'opacity-60' : ''}`}
            >
              <div className="text-[11px] font-bold tracking-wide opacity-80">{n.app}</div>
              <div className="text-[13px] leading-snug">{n.text}</div>
              {n.sub && <div className="text-[11px] leading-snug opacity-70">{n.sub}</div>}
            </div>
          ))}
        </div>
        {phone.lock.wallpaperNote && (
          <p className="mt-3 text-center text-[11px] italic leading-snug opacity-65">{phone.lock.wallpaperNote}</p>
        )}
      </div>
    </div>
  )
}

export function HomeScreen({ phone }: { phone: PhoneDef }) {
  return (
    <div className="relative min-h-full overflow-hidden rounded-[inherit]">
      <Wallpaper id={phone.lock.wallpaper} className="absolute inset-0" />
      <div className="relative min-h-[420px] px-5 pt-8 pb-6 text-white">
        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
          {(phone.home?.apps ?? []).map((a, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 ${a.dim ? 'opacity-50' : ''}`}>
              <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-xl backdrop-blur-sm">
                {a.icon}
                {a.badge && (
                  <span className="absolute -top-1 -right-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                    {a.badge}
                  </span>
                )}
              </div>
              <span className="line-clamp-2 text-center text-[9px] leading-tight opacity-85">{a.label}</span>
            </div>
          ))}
          {(phone.home?.folders ?? []).map((f, i) => (
            <div key={`f${i}`} className={`flex flex-col items-center gap-1 ${f.dim ? 'opacity-50' : ''}`}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-0.5">
                  {(f.items ?? []).slice(0, 4).map((_, k) => (
                    <span key={k} className="h-3 w-3 rounded-[3px] bg-white/50" />
                  ))}
                </div>
              </div>
              <span className="line-clamp-2 text-center text-[9px] leading-tight opacity-85">{f.label}</span>
            </div>
          ))}
        </div>
        {phone.lock.wallpaperNote && (
          <p className="absolute bottom-4 left-0 right-0 text-center text-[11px] italic opacity-65">
            {phone.lock.wallpaperNote}
          </p>
        )}
      </div>
    </div>
  )
}

export function AppHeadView({ app }: { app: AppHead }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/12 text-base">
        {app.icon ?? '💬'}
      </div>
      <div className="min-w-0">
        <div className="truncate text-[13px] font-bold text-white/95">{app.chat ?? app.name}</div>
        <div className="truncate text-[11px] text-white/55">{app.chat ? app.name : app.sub}</div>
      </div>
    </div>
  )
}

/* ---------------- beats ---------------- */

function msgMeta(b: MsgBeat | ComposeBeat | VoiceBeat | PhotoBeat) {
  return [b.sender, b.time].filter(Boolean).join(' · ')
}

function MsgView({ b, composing }: { b: MsgBeat | ComposeBeat; composing?: boolean }) {
  const out = b.side === 'out'
  return (
    <div className={`msg flex flex-col ${out ? 'items-end' : 'items-start'}`}>
      {msgMeta(b) && <div className="mb-0.5 px-1 text-[10px] text-white/45">{msgMeta(b)}</div>}
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
          out ? 'rounded-br-md bg-emerald-600/85 text-white' : 'rounded-bl-md bg-[#2a3550] text-white/95'
        } ${composing ? 'animate-pulse opacity-80' : ''}`}
      >
        {b.text}
      </div>
    </div>
  )
}

function VoiceView({ b }: { b: VoiceBeat }) {
  const out = b.side === 'out'
  const bars = Array.from({ length: 22 }, (_, i) => 20 + Math.round(60 * Math.abs(Math.sin(i * 1.3))))
  return (
    <div className={`flex flex-col ${out ? 'items-end' : 'items-start'}`}>
      {msgMeta(b) && <div className="mb-0.5 px-1 text-[10px] text-white/45">{msgMeta(b)}</div>}
      <div className="flex max-w-[85%] items-center gap-2.5 rounded-2xl bg-[#2a3550] px-3.5 py-2.5">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-[10px] text-white/90">
          ▶
        </span>
        <span className="flex h-6 flex-1 items-center gap-[2px]" aria-hidden="true">
          {bars.map((h, i) => (
            <span key={i} className="w-[2.5px] rounded-full bg-white/55" style={{ height: `${h}%` }} />
          ))}
        </span>
        <span className="text-[11px] tabular-nums text-white/70">
          0:{String(b.secs).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

function LinkView({ b }: { b: LinkBeat }) {
  return (
    <div className="mx-1 overflow-hidden rounded-xl border border-white/10 bg-[#111a2e]">
      <ArtifactImg id={b.artifact} className="aspect-[1.91/1] w-full object-cover" />
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-amber-400/90 text-sm font-black text-black">
          !
        </div>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-bold text-white/95">{b.title}</div>
          <div className="truncate text-[11px] text-white/50">{b.domain}</div>
        </div>
      </div>
    </div>
  )
}

function VideoView({ b }: { b: VideoBeat }) {
  return (
    <div className="mx-1">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
        <ArtifactImg id={b.artifact} className="aspect-video w-full object-cover" />
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/70 via-transparent to-black/30">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-lg text-white backdrop-blur-sm">
            ▶
          </span>
        </div>
        {b.tag && (
          <span className="absolute top-2 left-2 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {b.tag}
          </span>
        )}
        {b.views && (
          <span className="absolute right-2 bottom-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white/85">
            ▷ {b.views}
          </span>
        )}
        <div className="absolute bottom-2 left-2 max-w-[70%]">
          <div className="truncate text-[12px] font-bold text-white">{b.creator}</div>
          {b.sub && <div className="truncate text-[10px] text-white/70">{b.sub}</div>}
        </div>
      </div>
      {b.caption && <p className="mt-1.5 px-1 text-[12px] leading-relaxed text-white/70">{b.caption}</p>}
    </div>
  )
}

function PhotoView({ b }: { b: PhotoBeat }) {
  const out = b.side === 'out'
  return (
    <div className={`flex flex-col ${out ? 'items-end' : 'items-start'}`}>
      {msgMeta(b) && <div className="mb-0.5 px-1 text-[10px] text-white/45">{msgMeta(b)}</div>}
      <div className="max-w-[85%] rounded-2xl bg-[#2a3550] p-1.5">
        <div className="overflow-hidden rounded-xl bg-[#1a2438]">
          <ArtifactImg id={b.artifact} className="aspect-[4/3] w-full object-cover" />
        </div>
        {b.caption && <p className="px-1.5 py-1 text-[11px] text-white/70">{b.caption}</p>}
      </div>
    </div>
  )
}

function GalleryView({ b }: { b: GalleryBeat }) {
  return (
    <div className="mx-1 flex gap-1.5 overflow-x-auto pb-1">
      {b.artifacts.map((id) => (
        <div key={id} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a2438]">
          <ArtifactImg id={id} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

function NotifView({ b }: { b: NotifBeat }) {
  return (
    <div className="mx-6 rounded-2xl bg-black/50 px-3.5 py-2.5 backdrop-blur-sm">
      <div className="text-[10px] font-bold tracking-wide text-white/70">{b.app}</div>
      <div className="text-[12px] leading-snug text-white/90">{b.text}</div>
      {b.time && <div className="mt-0.5 text-[10px] text-white/45">{b.time}</div>}
    </div>
  )
}

function WeekheadView({ b }: { b: WeekheadBeat }) {
  return (
    <div className="mx-1 flex items-baseline gap-2 border-b border-white/10 pb-1.5">
      <span className="font-display text-lg font-semibold text-white/90">{b.week}</span>
      {b.date && <span className="text-[11px] text-white/50">{b.date}</span>}
      {b.stat && <span className="ml-auto text-[10px] tracking-wide text-white/45 uppercase">{b.stat}</span>}
    </div>
  )
}

function CallView({ b }: { b: CallBeat }) {
  const incoming = b.state === 'incoming'
  return (
    <div className="mx-2 rounded-2xl border border-white/10 bg-gradient-to-b from-[#1b2740] to-[#141d31] px-4 py-5 text-center">
      <div className="text-[10px] tracking-[0.2em] text-white/55 uppercase">{incoming ? 'incoming call' : 'calling…'}</div>
      <div className="font-display mx-auto mt-3 grid h-14 w-14 place-items-center rounded-full bg-white/12 text-xl font-semibold text-white">
        {b.who.trim().charAt(0)}
      </div>
      <div className="mt-2 text-[14px] font-bold text-white/95">{b.who}</div>
      {b.sub && <div className="text-[11px] text-white/55">{b.sub}</div>}
      <div className="mt-3 flex items-center justify-center gap-8 text-lg" aria-hidden="true">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-red-500/90 text-white">✕</span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500/90 text-white">✆</span>
      </div>
    </div>
  )
}

function TransferView({ b }: { b: TransferBeat }) {
  const done = b.stage === 'done'
  return (
    <div className="mx-2 overflow-hidden rounded-2xl border border-sky-400/25 bg-gradient-to-b from-[#0e2a4a] to-[#0a1c33]">
      <div className="flex items-center justify-between bg-sky-400/15 px-4 py-2">
        <span className="text-[12px] font-black tracking-wide text-sky-300">{b.app ?? 'GCash'}</span>
        <span className="text-[11px] font-semibold text-sky-200/90">{done ? '✓ Sent' : 'Send Money'}</span>
      </div>
      <div className="px-4 py-3 text-center">
        <div className="font-display text-3xl font-semibold text-white">₱{b.amount}</div>
        <div className="mt-0.5 text-[12px] text-white/70">to {b.to}</div>
        <div className="mt-1 text-[11px] text-white/50">Balance{done ? ' now' : ''} ₱{b.balance}</div>
      </div>
    </div>
  )
}

function AsideView({ b }: { b: AsideBeat }) {
  return (
    <p className="px-6 text-center text-[12px] leading-relaxed text-white/55">
      <span className="opacity-60">[</span> {b.text} <span className="opacity-60">]</span>
    </p>
  )
}

function paras(text: string | string[]): ReactNode {
  const arr = Array.isArray(text) ? text : [text]
  return arr.map((t, i) => (
    <p key={i}>{t}</p>
  ))
}

function SysView({ b }: { b: SysBeat }) {
  return (
    <div className="mx-10 rounded-full bg-white/8 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-white/60">
      {b.text}
    </div>
  )
}

function RecogView({ b }: { b: RecogBeat }) {
  return (
    <div className="mx-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
      <div className="text-[10px] font-bold tracking-[0.22em] text-white/50 uppercase">⟲ recognition</div>
      <p className="mt-1 text-[13px] leading-relaxed text-white/90">{b.text}</p>
    </div>
  )
}

export function BeatView({ beat }: { beat: Beat }) {
  switch (beat.t) {
    case 'narr':
      return (
        <div className="space-y-2.5 px-5 text-[14px] leading-relaxed text-white/85 [&_p]:text-white/85">
          {paras(beat.text)}
        </div>
      )
    case 'world':
      return (
        <div className="space-y-2.5 border-l-2 border-white/15 px-5 text-[13px] leading-relaxed text-white/65">
          {paras(beat.text)}
        </div>
      )
    case 'aside':
      return <AsideView b={beat} />
    case 'sys':
      return <SysView b={beat} />
    case 'msg':
      return <MsgView b={beat} />
    case 'compose':
      return <MsgView b={beat} composing />
    case 'link':
      return <LinkView b={beat} />
    case 'voice':
      return <VoiceView b={beat} />
    case 'notif':
      return <NotifView b={beat} />
    case 'video':
      return <VideoView b={beat} />
    case 'photo':
      return <PhotoView b={beat} />
    case 'gallery':
      return <GalleryView b={beat} />
    case 'weekhead':
      return <WeekheadView b={beat} />
    case 'call':
      return <CallView b={beat} />
    case 'transfer':
      return <TransferView b={beat} />
    case 'app':
      return <AppHeadView app={beat.appHead} />
    case 'recog-tag':
      return <RecogView b={beat} />
    default:
      return null
  }
}

/* ---------------- footers ---------------- */

export function ContinueFooter({ label, onNext }: { label: string; onNext: () => void }) {
  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-6 pb-4">
      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-full bg-white px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
      >
        {label}
      </button>
    </div>
  )
}

export function ChoiceBlock({ choice, onChoose }: { choice: Choice; onChoose: (index: number) => void }) {
  return (
    <div className="space-y-2 px-4">
      <div className="px-1 text-[11px] font-bold tracking-[0.18em] text-white/55 uppercase">
        {choice.verb} · {choice.prompt}
      </div>
      {choice.options.map((opt, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChoose(i)}
          className="block w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left transition-colors hover:border-white/40 hover:bg-white/10"
        >
          <span className="block text-[14px] font-semibold text-white/95">{opt.label}</span>
          {opt.sub && <span className="mt-0.5 block text-[12px] leading-snug text-white/55">{opt.sub}</span>}
        </button>
      ))}
      {choice.footnote && <p className="px-1 text-[11px] leading-snug text-white/45">{choice.footnote}</p>}
    </div>
  )
}

/** The chosen option, rendered as the record of what you did. */
export function ChosenMarker({ verb, label }: { verb: string; label: string }) {
  return (
    <div className="mx-4 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5">
      <span className="mr-2 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.16em] text-white/85 uppercase">
        {verb}
      </span>
      <span className="text-[13px] font-semibold text-white/95">{label}</span>
    </div>
  )
}

export function EndFooter({
  phone,
  onBack,
  backLabel = 'Back',
}: {
  phone: PhoneDef
  onBack: () => void
  backLabel?: string
}) {
  return (
    <div className="px-5 pt-8 pb-6 text-center">
      <div className="mx-auto mb-4 h-px w-16 bg-white/25" aria-hidden="true" />
      <div className="text-[13px] font-bold text-white/90">{phone.name}</div>
      <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-white/70 italic">{phone.lesson}</p>
      <button
        type="button"
        onClick={onBack}
        className="mt-5 w-full rounded-full bg-white px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
      >
        {backLabel}
      </button>
    </div>
  )
}

/* ---------------- frame ---------------- */

/** A frame's chrome + beats, rendered as one scroll unit. */
export function FrameView({
  phone,
  frame,
  children,
}: {
  phone: PhoneDef
  frame: Frame
  /** footer: continue / choice / end — the caller decides */
  children?: ReactNode
}) {
  return (
    <div className="space-y-3 pb-2">
      {frame.lock && <LockScreen phone={phone} notifs={frame.notifs} />}
      {frame.home && <HomeScreen phone={phone} />}
      {frame.app && <AppHeadView app={frame.app} />}
      {frame.beats.map((b, i) =>
        (b as { t: string }).t === 'end' ? null : <BeatView key={i} beat={b as Beat} />,
      )}
      {children}
    </div>
  )
}
