import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { AppId, CaseOS, OSMessage, OSState } from './types'
import {
  applyPushAt,
  applyRule,
  clearCall,
  initialOSState,
  markReplied,
  pendingRules,
  setCallPhase,
  visibleMessages,
} from './runtime'
import { sfx, vibrate } from './sound'
import { MessagesApp, GalleryApp, PhoneApp, BrowserApp, ContactsApp, NotesApp, SettingsApp } from './apps'
import { APP_META } from './apps/shared'

/* glassOS Device — the found-phone shell. Lock → home → apps, with a
   rule-processing engine pacing messages, calls, and evidence. */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export interface Banner {
  id: number
  app: string
  icon: string
  title: string
  text: string
}

export function GlassOS({
  caseDef,
  onExit,
  onComplete,
}: {
  caseDef: CaseOS
  onExit: () => void
  onComplete: (state: OSState) => void
}) {
  const [locked, setLocked] = useState(true)
  const [app, setApp] = useState<AppId | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [browserPage, setBrowserPage] = useState<string | null>(null)
  const [os, setOS] = useState<OSState>(() => initialOSState())
  const [typingIn, setTypingIn] = useState<string | null>(null)
  const [banners, setBanners] = useState<Banner[]>([])
  const [brightness, setBrightness] = useState(100)

  const osRef = useRef(os)
  osRef.current = os
  const cancelledRef = useRef(false)
  const completedRef = useRef(false)
  const lockedRef = useRef(locked)
  lockedRef.current = locked
  const viewRef = useRef<{ app: AppId | null; threadId: string | null }>({ app: null, threadId: null })
  viewRef.current = { app, threadId }
  const bannerId = useRef(0)

  /* ---------- rule processing ---------- */

  const pushBanner = useCallback(
    (threadId: string, text: string) => {
      if (lockedRef.current) return // the lock screen already previews arrivals
      const t = caseDef.threads.find((x) => x.id === threadId)
      if (!t) return
      const inView = viewRef.current.app === 'messages' && viewRef.current.threadId === threadId
      if (inView) return
      const meta = APP_META.messages
      const id = ++bannerId.current
      setBanners((b) => [...b.slice(-2), { id, app: t.service, icon: meta.icon, title: t.name, text }])
      setTimeout(() => setBanners((b) => b.filter((x) => x.id !== id)), 3400)
    },
    [caseDef],
  )

  const processRules = useCallback(async () => {
    while (true) {
      const ready = pendingRules(caseDef, osRef.current)
      if (ready.length === 0) break
      for (const rule of ready) {
        if (cancelledRef.current) return
        if (rule.typingIn) {
          setTypingIn(rule.typingIn)
          const ticks = setInterval(() => sfx.typing(), 260)
          await sleep(1500 + (rule.push?.length ?? 1) * 350)
          clearInterval(ticks)
          setTypingIn(null)
          if (cancelledRef.current) return
        }
        let s = applyRule(osRef.current, rule)
        osRef.current = s
        setOS(s)
        if (rule.push) {
          for (let idx = 0; idx < rule.push.length; idx++) {
            if (cancelledRef.current) return
            await sleep(idx === 0 ? 250 : 950)
            s = applyPushAt(osRef.current, rule, idx)
            osRef.current = s
            setOS(s)
            const p = rule.push[idx]
            if (p.msg.from !== 'you') {
              sfx.receive()
              vibrate(18)
            }
            if (p.msg.from === 'them' && p.msg.text) pushBanner(p.threadId, p.msg.text)
          }
        }
        if (rule.incomingCall) {
          // ring until answered/declined (the overlay handles the phases)
          sfx.callIncoming()
          vibrate([60, 80, 60])
        }
        await sleep(350)
      }
    }
    // the end flag settles the case: close any call, hand state to the debrief
    if (osRef.current.flags[caseDef.endFlag] && !completedRef.current) {
      completedRef.current = true
      if (osRef.current.call) {
        const s = clearCall(osRef.current)
        osRef.current = s
        setOS(s)
      }
      await sleep(700)
      if (!cancelledRef.current) onComplete(osRef.current)
    }
  }, [caseDef, onComplete, pushBanner])

  useEffect(() => {
    cancelledRef.current = false
    void (async () => {
      // deliver the opening messages (you're on the lock screen; the phone buzzes)
      for (let i = 0; i < caseDef.opening.length; i++) {
        if (cancelledRef.current) return
        await sleep(i === 0 ? 600 : 900)
        const p = caseDef.opening[i]
        const s = applyPushAt(osRef.current, { id: '__push', when: {}, push: [p] }, 0)
        osRef.current = s
        setOS(s)
        if (p.msg.from !== 'you') {
          sfx.receive()
          vibrate([30, 60, 30])
        }
      }
      void processRules()
    })()
    return () => {
      cancelledRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* re-run the rule pump after any player action */
  const bump = useCallback(() => {
    void processRules()
  }, [processRules])

  /* ---------- navigation ---------- */

  const openApp = useCallback((id: AppId, opts?: { threadId?: string; pageId?: string }) => {
    sfx.open()
    vibrate(8)
    setApp(id)
    if (opts?.threadId) setThreadId(opts.threadId)
    if (opts?.pageId) setBrowserPage(opts.pageId)
  }, [])

  const goHome = useCallback(() => {
    sfx.open()
    setApp(null)
    setThreadId(null)
  }, [])

  const unlock = useCallback(() => {
    sfx.unlock()
    vibrate(12)
    setLocked(false)
  }, [])

  /* keyboard: Esc = back/home, Enter unlocks */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && locked) unlock()
      if (e.key === 'Escape' && !locked) {
        if (os.call && os.call.phase === 'incoming') return // must answer
        if (app) goHome()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [locked, unlock, goHome, app, os.call])

  /* ---------- call sound loop ---------- */
  useEffect(() => {
    if (os.call?.phase !== 'incoming') return
    const ring = setInterval(() => sfx.callIncoming(), 2600)
    return () => clearInterval(ring)
  }, [os.call?.phase])

  const acceptCall = useCallback(() => {
    sfx.callConnect()
    vibrate(30)
    const ns = setCallPhase(osRef.current, 'live')
    osRef.current = ns
    setOS(ns)
  }, [])

  const endCall = useCallback(
    (declined: boolean) => {
      sfx.callEnd()
      const ns = declined ? clearCall(setCallPhase(osRef.current, 'ended', true)) : setCallPhase(osRef.current, 'ended')
      osRef.current = ns
      setOS(ns)
      bump()
      setTimeout(() => {
        if (osRef.current.call?.phase === 'ended') {
          const ns2 = clearCall(osRef.current)
          osRef.current = ns2
          setOS(ns2)
        }
      }, 1400)
    },
    [bump],
  )

  /* ---------- derived ---------- */

  const evidenceCount = os.evidence.length

  const device = useMemo(
    () => (
      <DeviceFrame
        caseDef={caseDef}
        locked={locked}
        brightness={brightness}
        onBrightness={setBrightness}
        onUnlock={unlock}
        app={app}
        threadId={threadId}
        browserPage={browserPage}
        os={os}
        typingIn={typingIn}
        onOpenApp={openApp}
        onOpenThread={(tid) => openApp('messages', { threadId: tid })}
        onOpenPage={(pid) => openApp('browser', { pageId: pid })}
        onGoHome={goHome}
        onInspect={(id, evidence) => {
          sfx.evidence()
          const cur = osRef.current
          const ns = evidence
            ? { ...cur, inspected: cur.inspected.includes(id) ? cur.inspected : [...cur.inspected, id], evidence: cur.evidence.includes(evidence) ? cur.evidence : [...cur.evidence, evidence] }
            : { ...cur, inspected: cur.inspected.includes(id) ? cur.inspected : [...cur.inspected, id] }
          osRef.current = ns
          setOS(ns)
          bump()
        }}
        onSendReply={(reply) => {
          sfx.send()
          vibrate(10)
          const ns = markReplied(osRef.current, reply.threadId, reply.id, reply.label, reply.set)
          osRef.current = ns
          setOS(ns)
          bump()
        }}
        onAcceptCall={acceptCall}
        onEndCall={endCall}
        onExit={onExit}
      />
    ),
    [caseDef, locked, brightness, unlock, app, threadId, browserPage, os, typingIn, openApp, goHome, onExit, acceptCall, endCall, bump, pushBanner],
  )

  return (
    <div className="relative">
      {device}
      {/* notification banners float above the device */}
      <div className="pointer-events-none absolute left-1/2 top-3 z-50 w-[88%] -translate-x-1/2 space-y-2">
        {banners.map((b) => (
          <div
            key={b.id}
            className="animate-banner rounded-2xl border border-white/10 bg-[#111827]/95 px-4 py-3 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wide text-white/50 uppercase">
                {b.icon} {b.app}
              </span>
              <span className="ml-auto text-[10px] text-white/40">now</span>
            </div>
            <div className="mt-0.5 text-[13px] font-bold text-white/95">{b.title}</div>
            <div className="line-clamp-2 text-[12.5px] leading-snug text-white/75">{b.text}</div>
          </div>
        ))}
      </div>
      {evidenceCount > 0 && app === null && !locked && (
        <p className="mt-3 text-center text-xs text-ink-400" aria-live="polite">
          🧩 clues found this case: <span className="font-semibold text-ink-300">{evidenceCount}</span> — they’re in Notes
        </p>
      )}
    </div>
  )
}

/* =====================================================================
   Device frame: bezel, status bar, lock, home, app surface
   ===================================================================== */

function DeviceFrame(props: {
  caseDef: CaseOS
  locked: boolean
  brightness: number
  onBrightness: (n: number) => void
  onUnlock: () => void
  app: AppId | null
  threadId: string | null
  browserPage: string | null
  os: OSState
  typingIn: string | null
  onOpenApp: (id: AppId, opts?: { threadId?: string; pageId?: string }) => void
  onOpenThread: (id: string) => void
  onOpenPage: (id: string) => void
  onGoHome: () => void
  onInspect: (id: string, evidence?: string) => void
  onSendReply: (reply: CaseOS['replies'][number]) => void
  onAcceptCall: () => void
  onEndCall: (declined: boolean) => void
  onExit: () => void
}) {
  const { caseDef, locked, os } = props
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <div className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#05070d] p-1.5 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.95)]">
        {/* screen */}
        <div className="relative h-[74dvh] max-h-[760px] min-h-[560px] overflow-hidden rounded-[2rem] bg-[#0b1220]">
          {/* wallpaper is always behind */}
          <div className={`wall-${caseDef.phone.wallpaper} absolute inset-0`} aria-hidden="true" />
          {/* brightness dim */}
          <div
            className="pointer-events-none absolute inset-0 z-40 bg-black transition-opacity duration-300"
            style={{ opacity: (100 - props.brightness) / 145 }}
            aria-hidden="true"
          />

          {locked ? (
            <LockScreen caseDef={caseDef} os={os} onUnlock={props.onUnlock} />
          ) : props.app ? (
            <AppSurface {...props} app={props.app} />
          ) : (
            <HomeScreen caseDef={caseDef} os={os} onOpenApp={props.onOpenApp} />
          )}

          {/* incoming / live call overlay */}
          {os.call && (
            <CallOverlay
              call={os.call}
              caseDef={caseDef}
              onAccept={props.onAcceptCall}
              onEnd={props.onEndCall}
            />
          )}

          {/* glare */}
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
            style={{
              background:
                'linear-gradient(115deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 100%)',
            }}
            aria-hidden="true"
          />
          {/* status bar sits above everything except call overlay */}
          {!locked && <StatusBar time={caseDef.phone.time} meridiem={caseDef.phone.meridiem} battery={caseDef.phone.battery} />}
        </div>
        {/* gesture bar */}
        {!locked && (
          <button
            type="button"
            aria-label="Home"
            onClick={props.onGoHome}
            className="absolute bottom-1.5 left-1/2 z-40 h-5 w-28 -translate-x-1/2 rounded-full bg-white/25 transition-colors hover:bg-white/40"
          />
        )}
      </div>
      <button
        type="button"
        onClick={props.onExit}
        className="mx-auto mt-3 block text-xs text-ink-400 transition-colors hover:text-ink-100"
      >
        ‹ Put the phone down
      </button>
    </div>
  )
}

function StatusBar({ time, meridiem, battery }: { time: string; meridiem: string; battery: number }) {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-white/90">
      <span>
        {time} <span className="opacity-70">{meridiem}</span>
      </span>
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="text-[9px] tracking-tighter">••••</span>
        <span>⌃</span>
        <span className="tabular-nums">{battery}%</span>
        <span className="inline-block h-2.5 w-5 rounded-[3px] border border-white/70">
          <span className="block h-full w-full rounded-[2px] bg-white/80" style={{ width: `${battery}%` }} />
        </span>
      </span>
    </div>
  )
}

function LockScreen({ caseDef, os, onUnlock }: { caseDef: CaseOS; os: OSState; onUnlock: () => void }) {
  const preview = caseDef.threads
    .map((t) => {
      const msgs = visibleMessages(os, t.id)
      const last = msgs[msgs.length - 1]
      return last ? { t, last } : null
    })
    .filter(Boolean)
    .slice(0, 3) as { t: CaseOS['threads'][number]; last: OSMessage }[]

  return (
    <div className="absolute inset-0 z-20 flex flex-col px-6 pb-6 pt-14 text-white">
      <div className="text-center">
        <div className="text-[13px] font-medium tracking-wide opacity-80">{caseDef.phone.day}</div>
        <div className="font-display text-6xl font-semibold tracking-tight drop-shadow">
          {caseDef.phone.time}
          <span className="ml-1.5 text-xl opacity-75">{caseDef.phone.meridiem}</span>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        {preview.map(({ t, last }) => (
          <button
            key={t.id}
            type="button"
            onClick={onUnlock}
            className="block w-full rounded-2xl bg-black/45 px-4 py-3 text-left backdrop-blur-md transition-colors hover:bg-black/60"
          >
            <div className="text-[11px] font-bold tracking-wide opacity-75">
              {t.service === 'sms' ? 'Messages' : t.service === 'viber' ? 'Viber' : 'Messenger'}
            </div>
            <div className="text-[13px] font-bold">{t.name}</div>
            <div className="line-clamp-1 text-[12.5px] opacity-85">
              {last.kind === 'voice' ? '🎙️ Voice message' : last.kind === 'photo' ? '📷 Photo' : last.kind === 'link' ? '🔗 Link' : last.text}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onUnlock}
        className="mx-auto mt-5 flex items-center gap-2 rounded-full bg-white/12 px-5 py-2.5 text-[12px] font-semibold backdrop-blur-md transition-colors hover:bg-white/25"
      >
        ⌃ Swipe up to open
      </button>
      {caseDef.phone.lockNote && (
        <p className="mt-3 text-center text-[10.5px] italic leading-snug opacity-60">{caseDef.phone.lockNote}</p>
      )}
      <p className="sr-only">Press Enter or activate the unlock button to open the phone.</p>
    </div>
  )
}

function HomeScreen({
  caseDef,
  os,
  onOpenApp,
}: {
  caseDef: CaseOS
  os: OSState
  onOpenApp: (id: AppId, opts?: { threadId?: string; pageId?: string }) => void
}) {
  const newReplies = caseDef.replies.filter((r) => !os.sentReplies.includes(r.id) && (!r.requires || os.flags[r.requires])).length

  const tiles: { id: AppId; badge?: number }[] = [
    { id: 'gallery' },
    { id: 'phone' },
    { id: 'contacts' },
    { id: 'notes', badge: os.evidence.length || undefined },
  ]
  const dockApps: { id: AppId; badge?: number }[] = [
    { id: 'messages', badge: newReplies > 0 ? newReplies : undefined },
    { id: 'browser' },
    { id: 'settings' },
  ]

  const renderIcon = ({ id, badge }: { id: AppId; badge?: number }) => {
    const meta = APP_META[id]
    return (
      <button
        key={id}
        type="button"
        onClick={() => onOpenApp(id)}
        aria-label={`Open ${meta.name}`}
        className="group flex flex-col items-center gap-1.5"
      >
        <span
          className={`relative grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-lg backdrop-blur-md transition-transform group-active:scale-95 ${meta.tile}`}
        >
          {meta.icon}
          {badge != null && badge > 0 && (
            <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {badge}
            </span>
          )}
        </span>
        <span className="text-[10px] font-medium opacity-85">{meta.name}</span>
      </button>
    )
  }

  return (
    <div className="absolute inset-0 z-10 flex flex-col px-5 pb-4 pt-12 text-white">
      <div className="grid grid-cols-4 gap-x-3 gap-y-5">
        {tiles.map(renderIcon)}
      </div>

      <div className="mt-auto">
        <div className="mx-auto mb-4 w-max rounded-full bg-white/10 px-4 py-1 text-[10px] opacity-70">
          {os.evidence.length > 0 ? `🧩 ${os.evidence.length} clue${os.evidence.length > 1 ? 's' : ''} in Notes` : 'glassOS 4.0'}
        </div>
        <div className="flex items-center justify-around rounded-3xl bg-white/12 px-4 py-3 backdrop-blur-md">
          {dockApps.map(({ id, badge }) => {
            const meta = APP_META[id]
            return (
              <button
                key={id}
                type="button"
                onClick={() => onOpenApp(id)}
                aria-label={`Open ${meta.name}`}
                className="relative grid h-13 w-13 place-items-center rounded-2xl text-2xl shadow-lg transition-transform active:scale-95"
              >
                {meta.icon}
                {badge != null && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function AppSurface(props: {
  caseDef: CaseOS
  app: AppId
  threadId: string | null
  browserPage: string | null
  os: OSState
  typingIn: string | null
  onOpenApp: (id: AppId, opts?: { threadId?: string; pageId?: string }) => void
  onOpenThread: (id: string) => void
  onOpenPage: (id: string) => void
  onGoHome: () => void
  onInspect: (id: string, evidence?: string) => void
  onSendReply: (reply: CaseOS['replies'][number]) => void
  onBrightness: (n: number) => void
}) {
  const { app } = props
  const meta = APP_META[app]
  const inner = (() => {
    switch (app) {
      case 'messages':
        return <MessagesApp caseDef={props.caseDef} os={props.os} typingIn={props.typingIn} activeThreadId={props.threadId} onOpenThread={props.onOpenThread} onSendReply={props.onSendReply} onOpenPage={props.onOpenPage} onInspect={props.onInspect} />
      case 'gallery':
        return <GalleryApp caseDef={props.caseDef} os={props.os} onInspect={props.onInspect} />
      case 'phone':
        return <PhoneApp caseDef={props.caseDef} os={props.os} onInspect={props.onInspect} />
      case 'browser':
        return <BrowserApp caseDef={props.caseDef} os={props.os} pageId={props.browserPage} onOpenPage={props.onOpenPage} onInspect={props.onInspect} />
      case 'contacts':
        return <ContactsApp caseDef={props.caseDef} os={props.os} onInspect={props.onInspect} />
      case 'notes':
        return <NotesApp caseDef={props.caseDef} os={props.os} />
      case 'settings':
        return <SettingsApp caseDef={props.caseDef} os={props.os} onBrightness={props.onBrightness} />
    }
  })()

  return (
    <div className="absolute inset-0 z-20 flex animate-appopen flex-col bg-[#0d1526]/95 backdrop-blur-xl">
      <div className="mt-9 flex items-center gap-2 px-4 pb-2">
        <button
          type="button"
          onClick={props.onGoHome}
          aria-label="Home"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-sm text-white/80 transition-colors hover:bg-white/20"
        >
          ‹
        </button>
        <span className="truncate text-[13px] font-bold text-white/95">{meta.name}</span>
      </div>
      <div className="min-h-0 flex-1">{inner}</div>
    </div>
  )
}

/* =====================================================================
   Call overlay
   ===================================================================== */

function CallOverlay({
  call,
  caseDef,
  onAccept,
  onEnd,
}: {
  call: NonNullable<OSState['call']>
  caseDef: CaseOS
  onAccept: () => void
  onEnd: (declined: boolean) => void
}) {
  const outgoing = call.direction === 'out'
  const live = call.phase === 'live'
  const saved = caseDef.contacts.some((c) => c.number === call.number)
  return (
    <div className="absolute inset-0 z-50 flex animate-fadein flex-col items-center bg-gradient-to-b from-[#101a30]/98 to-[#05070d]/98 px-6 pb-10 pt-16 text-white backdrop-blur-xl">
      <div className="text-[10px] tracking-[0.25em] opacity-60 uppercase">
        {call.phase === 'incoming' ? 'Incoming Viber call' : outgoing ? `Calling ${saved ? 'saved contact' : 'number'}` : call.phase === 'live' ? 'Connected' : 'Call ended'}
      </div>
      <div className="font-display mt-6 grid h-24 w-24 place-items-center rounded-full bg-white/10 text-4xl font-semibold">
        {call.from.trim().charAt(0)}
      </div>
      <div className="mt-4 text-center">
        <div className="text-xl font-bold">{call.from}</div>
        <div className="mt-1 text-[12px] opacity-70">{call.number}</div>
        {call.sub && <div className="mt-1 text-[11px] opacity-55">{call.sub}</div>}
      </div>

      {live && call.transcript && (
        <div className="mt-6 w-full max-w-xs space-y-2.5" aria-live="polite">
          {call.transcript.map((line, i) => (
            <p
              key={i}
              className="rounded-xl bg-white/8 px-3.5 py-2 text-center text-[12.5px] leading-relaxed opacity-0 [animation:rise_0.5s_ease_forwards]"
              style={{ animationDelay: `${i * 1.4}s` }}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center gap-10">
        {call.phase === 'incoming' ? (
          <>
            <button
              type="button"
              onClick={() => onEnd(true)}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-red-500 text-2xl shadow-lg transition-transform active:scale-95">
                ✕
              </span>
              <span className="text-[11px] opacity-70">Decline</span>
            </button>
            <button type="button" onClick={onAccept} className="flex flex-col items-center gap-1.5">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-2xl shadow-lg transition-transform active:scale-95">
                ✆
              </span>
              <span className="text-[11px] opacity-70">Accept</span>
            </button>
          </>
        ) : (
          <button type="button" onClick={() => onEnd(false)} className="flex flex-col items-center gap-1.5">
            <span
              className={`grid h-16 w-16 place-items-center rounded-full text-2xl shadow-lg transition-transform active:scale-95 ${
                live ? 'bg-red-500' : 'bg-white/15'
              }`}
            >
              {live ? '✕' : '↺'}
            </span>
            <span className="text-[11px] opacity-70">{live ? 'End call' : 'Close'}</span>
          </button>
        )}
      </div>
      {live && (
        <div className="mt-4 flex items-end gap-[3px]" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-emerald-400/70"
              style={{ height: 6 + Math.abs(Math.sin(i * 1.7)) * 18, animation: `pulse-wave 1.1s ease-in-out ${i * 0.08}s infinite alternate` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
