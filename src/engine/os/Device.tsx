import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import type { AppId, CaseOS, OSMessage, OSMoment, OSState } from './types'
import {
  applyPushAt,
  applyRule,
  clearCall,
  dismissMoment as closeMoment,
  forwardMessage,
  initialOSState,
  markReplied,
  pendingRules,
  setCallPhase,
  visibleMessages,
} from './runtime'
import { isMuted, onMuteChange, sfx, vibrate } from './sound'
import { buildLauncherLayout, homeAppsFor, showPageDots } from './launcher'
import { AppIcon, AppGlyph } from './ios/AppIcon'
import './ios/tokens.css'
import { ambientMs, bannerMs, continueMs, openingMs, proseMs, scaled, settleMs, typingMs } from './pacing'
import { nextAmbientBeat } from './ambient'
import { MessagesApp, AssistantApp, GalleryApp, PhoneApp, BrowserApp, ContactsApp, NotesApp, SettingsApp, SERVICE_LABEL } from './apps'
import { APP_META } from './apps/shared'
import { FullscreenToggle, MuteToggle, PhoneStage, timeMood, wallpaperHue } from './Stage'
import { aiRegen, aiThumbs } from './runtime'

/* glassOS Device — the found-phone shell. Lock → home → apps, with a
   rule-processing engine pacing messages, calls, and evidence. */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export interface Banner {
  id: number
  app: string
  icon: string
  title: string
  text: string
  /** where the message landed — tapping the banner opens the thread */
  threadId: string
  /** assistant arrival — taps open the Ask app, not Messages */
  ai?: boolean
}

export function GlassOS({
  caseDef,
  initialState,
  onStateChange,
  onExit,
  onComplete,
}: {
  caseDef: CaseOS
  /** resume a saved run — the phone wakes on the lock screen, world as it was left */
  initialState?: OSState
  /** called with the live state as it changes (debounced); enables resume */
  onStateChange?: (state: OSState) => void
  onExit: () => void
  onComplete: (state: OSState) => void
}) {
  const returning = useRef(!!initialState).current
  const [locked, setLocked] = useState(true)
  const [app, setApp] = useState<AppId | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [browserPage, setBrowserPage] = useState<string | null>(null)
  const [galleryPhotoId, setGalleryPhotoId] = useState<string | null>(null)
  const [returnTo, setReturnTo] = useState<{ app: AppId; threadId: string | null; browserPage: string | null } | null>(null)
  const [os, setOS] = useState<OSState>(() => initialState ?? initialOSState(caseDef))
  const [typingIn, setTypingIn] = useState<string | null>(null)
  const [banners, setBanners] = useState<Banner[]>([])
  const [bannerLog, setBannerLog] = useState<Banner[]>([])
  const [shadeOpen, setShadeOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [pulse, setPulse] = useState(0)
  const [confirmExit, setConfirmExit] = useState(false)

  const osRef = useRef(os)
  osRef.current = os
  const cancelledRef = useRef(false)
  const completedRef = useRef(false)
  const lockedRef = useRef(locked)
  lockedRef.current = locked
  const viewRef = useRef<{ app: AppId | null; threadId: string | null; browserPage: string | null }>({ app: null, threadId: null, browserPage: null })
  viewRef.current = { app, threadId, browserPage }
  const bannerId = useRef(0)
  const changeRef = useRef(onStateChange)
  changeRef.current = onStateChange

  /* persist the live run (debounced) so exiting and coming back resumes */
  useEffect(() => {
    if (completedRef.current) return
    const t = setTimeout(() => {
      if (!completedRef.current) changeRef.current?.(osRef.current)
    }, 600)
    return () => clearTimeout(t)
  }, [os])



  /* ---------- rule processing ---------- */

  const pushBanner = useCallback(
    (threadId: string, text: string) => {
      if (lockedRef.current) return // the lock screen already previews arrivals
      const t = caseDef.threads.find((x) => x.id === threadId)
      if (!t) return
      const inView =
        (t.service === 'assistant' && viewRef.current.app === 'assistant') ||
        (t.service !== 'assistant' && viewRef.current.app === 'messages' && viewRef.current.threadId === threadId)
      if (inView) return
      const meta = t.service === 'assistant' ? APP_META.assistant : APP_META.messages
      const id = ++bannerId.current
      const banner: Banner = { id, app: t.service === 'assistant' ? 'ask' : t.service, icon: meta.icon, title: t.name, text, threadId, ai: t.service === 'assistant' }
      setBanners((b) => [...b.slice(-2), banner])
      setBannerLog((log) => [...log.slice(-19), banner])
      setUnread((n) => Math.min(99, n + 1))
      setTimeout(() => setBanners((b) => b.filter((x) => x.id !== id)), Math.max(2500, scaled(bannerMs(text))))
    },
    [caseDef],
  )

  /* one pump at a time: a reply that lands mid-burst queues a re-run instead
     of interleaving two storylines into the same thread */
  const pumping = useRef(false)
  const rerun = useRef(false)

  const processRules = useCallback(async () => {
    if (pumping.current) {
      rerun.current = true
      return
    }
    pumping.current = true
    try {
      do {
        rerun.current = false
        while (true) {
          // a prose interstitial is up: hold the world until it's dismissed
          if (osRef.current.moment) break
          const ready = pendingRules(caseDef, osRef.current)
          if (ready.length === 0) break
          for (const rule of ready) {
            if (cancelledRef.current) return
            let s = applyRule(osRef.current, rule)
            osRef.current = s
            setOS(s)
            if (rule.push) {
              // typing is derived from the pushes: a burst shows the indicator
              // once, its lines land seconds apart, and prose gets reading air
              let typingThread: string | null = null
              let ticks: ReturnType<typeof setInterval> | null = null
              const stopTyping = () => {
                if (ticks) clearInterval(ticks)
                ticks = null
                if (typingThread) setTypingIn(null)
                typingThread = null
              }
              const startTyping = (threadId: string) => {
                typingThread = threadId
                setTypingIn(threadId)
                ticks = setInterval(() => sfx.typing(), 260)
              }
              const hasThemLine = rule.push.some((p) => {
                const kind = p.msg.kind
                return kind !== 'narr' && kind !== 'aside' && (p.msg.from ?? 'them') === 'them'
              })
              // a rule may ask for a bare typing beat with no line of its own
              if (rule.typingIn && !hasThemLine) {
                startTyping(rule.typingIn)
                await sleep(scaled(typingMs('')))
                stopTyping()
                if (cancelledRef.current) return
              }
              for (let idx = 0; idx < rule.push.length; idx++) {
                if (cancelledRef.current) {
                  stopTyping()
                  return
                }
                const p = rule.push[idx]
                const kind = p.msg.kind
                const silent = kind === 'narr' || kind === 'aside'
                const fromThem = (p.msg.from ?? 'them') === 'them'
                const text = p.msg.text ?? ''
                if (silent || !fromThem) {
                  stopTyping()
                  await sleep(scaled(silent ? proseMs(text) : continueMs()))
                } else if (typingThread !== p.threadId) {
                  stopTyping()
                  startTyping(p.threadId)
                  const media = kind === 'voice' || kind === 'photo' || kind === 'link' ? 650 : 0
                  await sleep(scaled(typingMs(text) + media))
                } else {
                  // the same sender, still going: another line, not a new beat
                  await sleep(scaled(continueMs()))
                }
                s = applyPushAt(osRef.current, rule, idx)
                osRef.current = s
                setOS(s)
                if (!silent && p.msg.from !== 'you') {
                  if (p.msg.kind === 'ai') sfx.aiAnswer()
                  else sfx.receive()
                  vibrate(18)
                  setPulse((n) => n + 1)
                }
                if (p.msg.from === 'them' && p.msg.text) pushBanner(p.threadId, p.msg.text)
              }
              stopTyping()
            }
            if (rule.incomingCall) {
              // ring until answered/declined (the overlay handles the phases)
              sfx.callIncoming()
              vibrate([60, 80, 60])
            }
            await sleep(scaled(settleMs()))
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
      } while (rerun.current && !cancelledRef.current)
    } finally {
      pumping.current = false
    }
  }, [caseDef, onComplete, pushBanner])

  useEffect(() => {
    cancelledRef.current = false
    // a returning phone is already mid-conversation — unlocking restarts the pump
    if (returning) return () => { cancelledRef.current = true }
    void (async () => {
      // deliver the opening messages (you're on the lock screen; the phone buzzes)
      for (let i = 0; i < caseDef.opening.length; i++) {
        if (cancelledRef.current) return
        const p = caseDef.opening[i]
        await sleep(scaled(openingMs(p.msg.text ?? '', i === 0)))
        const s = applyPushAt(osRef.current, { id: '__push', when: {}, push: [p] }, 0)
        osRef.current = s
        setOS(s)
        if (p.msg.from !== 'you') {
          sfx.receive()
          vibrate([30, 60, 30])
          setPulse((n) => n + 1)
        }
      }
      void processRules()
    })()
    return () => {
      cancelledRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------- ambient life (M9 slow burn) ---------- */

  /* A separate, deliberately slow channel: the ordinary day the story
     interrupts. It never interleaves a rule burst (if the pump owns the world,
     the beat waits and re-tries), never lands under a moment or call, and
     nothing arrives until the phone is inhabited (os_engaged — set by the
     first app open). Resumed runs deliver from the persisted ambientIndex
     (review 2026-11-14: the loop must not skip resume — the persisted index
     IS the delivery cursor). Exhausts its queue and goes quiet. */
  useEffect(() => {
    if (!caseDef.ambient?.length) return
    let cancelled = false
    void (async () => {
      while (!cancelled) {
        await sleep(scaled(ambientMs()))
        if (cancelled) return
        const beat = nextAmbientBeat(caseDef, osRef.current, { pumping: pumping.current })
        if (!beat) {
          // gated this tick (moment/call/burst/not-yet-engaged) → retry; the
          // endFlag or an exhausted queue settles the channel for good
          const st = osRef.current
          if (st.done || st.flags[caseDef.endFlag]) return
          if ((st.ambientIndex ?? 0) >= (caseDef.ambient?.length ?? 0)) return
          continue
        }
        const i = osRef.current.ambientIndex ?? 0
        let s = applyPushAt(osRef.current, { id: '__ambient', when: {}, push: [beat] }, 0)
        s = { ...s, ambientIndex: i + 1 }
        osRef.current = s
        setOS(s)
        if (beat.msg.from !== 'you') {
          sfx.receive()
          vibrate(14)
          setPulse((n) => n + 1)
        }
        if (beat.msg.from === 'them' && beat.msg.text) pushBanner(beat.threadId, beat.msg.text)
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseDef])

  /* re-run the rule pump after any player action */
  const bump = useCallback(() => {
    void processRules()
  }, [processRules])

  /* ---------- navigation ---------- */

  const openApp = useCallback((id: AppId, opts?: { threadId?: string; pageId?: string; photoId?: string }) => {
    sfx.open()
    vibrate(8)
    // the phone is inhabited: the ambient channel may start breathing
    if (!osRef.current.flags.os_engaged) {
      const s: OSState = { ...osRef.current, flags: { ...osRef.current.flags, os_engaged: true } }
      osRef.current = s
      setOS(s)
    }
    const from = viewRef.current
    // An attachment or link crosses apps, but the way back should lead to
    // the conversation you were reading, not to an unrelated home screen.
    if (from.app !== id) {
      setReturnTo(from.app ? { app: from.app, threadId: from.threadId, browserPage: from.browserPage } : null)
    }
    setApp(id)
    setGalleryPhotoId(id === 'gallery' ? opts?.photoId ?? null : null)
    if (opts?.threadId) setThreadId(opts.threadId)
    if (opts?.pageId) setBrowserPage(opts.pageId)
  }, [])

  const goHome = useCallback(() => {
    sfx.open()
    setApp(null)
    setThreadId(null)
    setGalleryPhotoId(null)
    setReturnTo(null)
    setShadeOpen(false)
  }, [])

  const goBack = useCallback(() => {
    if (!returnTo) { goHome(); return }
    sfx.open()
    setApp(returnTo.app)
    setThreadId(returnTo.threadId)
    setBrowserPage(returnTo.browserPage)
    setGalleryPhotoId(null)
    setReturnTo(null)
  }, [returnTo, goHome])

  /** pull down the notification shade; clears the unread count */
  const openShade = useCallback(() => {
    sfx.open()
    setShadeOpen(true)
    setUnread(0)
  }, [])

  /** the power control: screen off, the world held exactly where it is */
  const lockPhone = useCallback(() => {
    sfx.open()
    vibrate(8)
    setShadeOpen(false)
    setLocked(true)
  }, [])

  /** leave the device: flush the live run first so nothing is lost */
  const exitNow = useCallback(() => {
    if (!completedRef.current) changeRef.current?.(osRef.current)
    onExit()
  }, [onExit])

  const unlock = useCallback(() => {
    sfx.unlock()
    vibrate(12)
    setLocked(false)
    // narrative rules key off this (the anthology's waking beats)
    const s = { ...osRef.current, flags: { ...osRef.current.flags, os_unlocked: true } }
    osRef.current = s
    setOS(s)
    bump()
  }, [bump])

  /* keyboard: Esc = back/home, Enter unlocks; the exit dialog takes over while open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (confirmExit) {
        if (e.key === 'Escape') setConfirmExit(false)
        return
      }
      if (shadeOpen) {
        if (e.key === 'Escape') setShadeOpen(false)
        return
      }
      if (e.key === 'Enter' && locked) unlock()
      if (e.key === 'Escape' && !locked) {
        if (os.call && os.call.phase === 'incoming') return // must answer
        // Let a photo viewer, forward sheet or prose moment handle Escape
        // without accidentally leaving the whole app behind it.
        if (document.querySelector('.device-frame [role="dialog"]')) return
        if (app) goBack()
        else lockPhone()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [locked, unlock, goBack, app, os.call, confirmExit, shadeOpen, lockPhone])

  /* ---------- call sound loop ---------- */
  useEffect(() => {
    if (os.call?.phase !== 'incoming') return
    const ring = setInterval(() => sfx.callIncoming(), 2600)
    return () => clearInterval(ring)
  }, [os.call?.phase])

  /* a rule can drop the line (the scammer hangs up); sweep it after a beat */
  useEffect(() => {
    if (os.call?.phase !== 'ended') return
    const t = setTimeout(() => {
      if (osRef.current.call?.phase === 'ended') {
        const ns = clearCall(osRef.current)
        osRef.current = ns
        setOS(ns)
      }
    }, 1600)
    return () => clearTimeout(t)
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

  const dismissMoment = useCallback(() => {
    const momentId = osRef.current.moment
    const destination = caseDef.moments?.find((m) => m.id === momentId)?.openThread
    const s = closeMoment(osRef.current)
    osRef.current = s
    setOS(s)
    // The button says "Open the family GC" — it must really take the player
    // into that conversation, not make them hunt through a launcher first.
    // Assistant threads live in their own app, not Messages.
    if (destination) {
      const thread = caseDef.threads.find((t) => t.id === destination)
      if (thread?.service === 'assistant') openApp('assistant')
      else if (thread) openApp('messages', { threadId: destination })
    }
    bump()
  }, [bump, caseDef, openApp])

  /* ---------- derived ---------- */

  const device = useMemo(
    () => (
      <DeviceFrame
        caseDef={caseDef}
        locked={locked}
        returning={returning}
        brightness={brightness}
        onBrightness={setBrightness}
        onUnlock={unlock}
        onLock={lockPhone}
        onExitRequest={() => setConfirmExit(true)}
        app={app}
        threadId={threadId}
        browserPage={browserPage}
        galleryPhotoId={galleryPhotoId}
        backApp={returnTo?.app ?? null}
        onGoBack={goBack}
        os={os}
        typingIn={typingIn}
        onOpenApp={openApp}
        onOpenThread={(tid) => openApp('messages', { threadId: tid })}
        onCloseThread={() => setThreadId(null)}
        onOpenPage={(pid) => openApp('browser', { pageId: pid })}
        onGoHome={goHome}
        onInspect={(id, evidence) => {
          sfx.evidence()
          setPulse((n) => n + 1)
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
        onAiAction={(msgId, action) => {
          // regen / thumbs-up on an assistant answer: pure state moves,
          // plus the ai_thumbs flag content can hear
          if (action === 'regen') sfx.open()
          else sfx.send()
          const ns = action === 'regen' ? aiRegen(osRef.current, msgId) : aiThumbs(osRef.current, msgId)
          osRef.current = ns
          setOS(ns)
          bump()
        }}
        onForward={(m, to) => {
          // pure expression: the copy lands in the thread, no flags move
          sfx.send()
          vibrate(10)
          const ns = forwardMessage(osRef.current, to, { pageId: m.pageId, caption: m.caption })
          osRef.current = ns
          setOS(ns)
        }}
        onAcceptCall={acceptCall}
        onEndCall={endCall}
        onDismissMoment={dismissMoment}
        bannerLog={bannerLog}
        shadeOpen={shadeOpen}
        unread={unread}
        onOpenShade={openShade}
        onCloseShade={() => setShadeOpen(false)}
        onClearLog={() => setBannerLog([])}
      />
    ),
    [caseDef, locked, returning, brightness, unlock, lockPhone, app, threadId, browserPage, galleryPhotoId, returnTo, goBack, os, typingIn, openApp, goHome, onExit, acceptCall, endCall, dismissMoment, bump, pushBanner, bannerLog, shadeOpen, unread, openShade],
  )

  const ringing = os.call?.phase === 'incoming'

  return (
    <>
      <PhoneStage
        hue={wallpaperHue(caseDef.phone.wallpaper)}
        mood={timeMood(caseDef.phone.time, caseDef.phone.meridiem)}
        pulse={pulse}
        ringing={ringing}
        header={
          <div className="pov-chrome relative z-10 flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3 sm:flex-nowrap sm:pt-4">
            <button
              type="button"
              onClick={() => setConfirmExit(true)}
              aria-label="Put the phone down"
              className="order-1 inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm text-ink-300 transition-colors hover:text-ink-100 sm:order-none"
            >
              <span aria-hidden="true">‹</span><span className="sm:hidden">Put down</span><span className="hidden sm:inline">Put the phone down</span>
            </button>
            <span className="order-3 w-full text-center text-[11px] leading-relaxed tracking-wide text-ink-300 uppercase sm:order-none sm:w-auto sm:min-w-0 sm:flex-1 sm:truncate">
              {caseDef.level} · {caseDef.tagline}
            </span>
            <div className="order-2 shrink-0 sm:order-none"><FullscreenToggle /></div>
          </div>
        }
      >
        <div className="relative w-full">
          {device}
          {/* notification banners ride with the device; tap to open the thread.
              They sit below the app header so nav controls stay reachable. */}
          <div className={`os-skin ${caseDef.phone.theme ? `theme-${caseDef.phone.theme}` : ''} os-safe-banners pointer-events-none absolute left-1/2 z-50 w-[88%] -translate-x-1/2 space-y-2`}>
            {banners.map((b) => (
              <button
                key={b.id}
                type="button"
                data-banner
                onClick={() => openApp(b.ai ? 'assistant' : 'messages', b.ai ? undefined : { threadId: b.threadId })}
                className="animate-banner pointer-events-auto block w-full rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-panel)] px-4 py-3 text-left text-[var(--os-ink)] shadow-2xl backdrop-blur-md"
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xs font-bold tracking-wide text-[var(--os-dim)] uppercase">
                    {b.icon} {b.app}
                  </span>
                  <span className="ml-auto text-2xs text-[var(--os-faint)]">now</span>
                </span>
                <span className="mt-0.5 block text-[13px] font-bold text-[var(--os-ink)]">{b.title}</span>
                <span className="line-clamp-2 block text-[13px] leading-snug text-[var(--os-dim)]">{b.text}</span>
              </button>
            ))}
          </div>
        </div>
      </PhoneStage>

      {confirmExit && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/65 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Put the phone down?"
        >
          <div className="w-full max-w-xs rounded-2xl border border-ink-700 bg-ink-800/95 p-5 shadow-2xl">
            <h2 className="font-display text-lg font-semibold text-ink-100">Put the phone down?</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">
              {onStateChange
                ? 'Your messages, decisions, and discoveries are saved on this device. Pick it up again whenever you like.'
                : 'Your progress in this case will reset when you leave.'}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                autoFocus
                type="button"
                onClick={() => setConfirmExit(false)}
                className="flex-1 rounded-full bg-train px-4 py-2.5 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
              >
                Keep playing
              </button>
              <button
                type="button"
                onClick={exitNow}
                className="flex-1 rounded-full border border-ink-600 px-4 py-2.5 text-sm font-semibold text-ink-300 transition-colors hover:border-ink-400"
              >
                Put it down
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* =====================================================================
   Device frame: bezel, status bar, lock, home, app surface
   ===================================================================== */

function DeviceFrame(props: {
  caseDef: CaseOS
  locked: boolean
  returning: boolean
  brightness: number
  onBrightness: (n: number) => void
  onUnlock: () => void
  onLock: () => void
  onExitRequest: () => void
  app: AppId | null
  threadId: string | null
  browserPage: string | null
  galleryPhotoId: string | null
  backApp: AppId | null
  onGoBack: () => void
  os: OSState
  typingIn: string | null
  onOpenApp: (id: AppId, opts?: { threadId?: string; pageId?: string; photoId?: string }) => void
  onOpenThread: (id: string) => void
  onCloseThread: () => void
  onOpenPage: (id: string) => void
  onGoHome: () => void
  onInspect: (id: string, evidence?: string) => void
  onSendReply: (reply: CaseOS['replies'][number]) => void
  onAiAction: (msgId: string, action: 'regen' | 'thumbs') => void
  onForward: (msg: OSMessage, toThreadId: string) => void
  onAcceptCall: () => void
  onEndCall: (declined: boolean) => void
  onDismissMoment: () => void
  bannerLog: Banner[]
  shadeOpen: boolean
  unread: number
  onOpenShade: () => void
  onCloseShade: () => void
  onClearLog: () => void
}) {
  const { caseDef, locked, os } = props
  const shadeStart = useRef<number | null>(null)
  const lastHome = useRef(0)

  const shadeDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    shadeStart.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const shadeUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = shadeStart.current
    shadeStart.current = null
    if (start != null && e.clientY - start > 28) props.onOpenShade()
  }
  const goHomeOnce = () => {
    const now = performance.now()
    if (now - lastHome.current < 350) return
    lastHome.current = now
    props.onGoHome()
  }

  return (
    <div className="device-shell relative mx-auto w-full max-w-[400px]">
      <div className="device-frame relative overflow-hidden rounded-[3.25rem] border border-white/12 bg-[#05070d] p-1.5">
        {/* screen */}
        <div
          className={`os-skin relative h-[74dvh] max-h-[800px] min-h-[640px] overflow-hidden rounded-[2.75rem] bg-[var(--os-bg)] ${
            caseDef.phone.theme ? `theme-${caseDef.phone.theme}` : ''
          }`}
        >
          {/* wallpaper is always behind */}
          <div className={`wall-${caseDef.phone.wallpaper} absolute inset-0`} aria-hidden="true" />
          {/* brightness dim */}
          <div
            className="pointer-events-none absolute inset-0 z-40 bg-black transition-opacity duration-300"
            style={{ opacity: (100 - props.brightness) / 145 }}
            aria-hidden="true"
          />
          {/* the island is hardware, not UI — it rides above the dim, on the
              lock screen and off it */}
          <DynamicIsland />

          {locked ? (
            <LockScreen
              caseDef={caseDef}
              os={os}
              returning={props.returning}
              onUnlock={props.onUnlock}
              onExit={props.onExitRequest}
            />
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

          {/* prose interstitial — the world holds until it's dismissed */}
          {os.moment && (
            <MomentOverlay
              moment={caseDef.moments?.find((m) => m.id === os.moment)}
              onDismiss={props.onDismissMoment}
            />
          )}

          {/* notification shade — the banner history, each row opens its thread */}
          {props.shadeOpen && (
            <div
              className="animate-fadein absolute inset-0 z-[44] flex flex-col bg-[#05070d]/95 backdrop-blur-md"
              role="dialog"
              aria-label="Notifications"
            >
              <div className="os-safe-shade flex items-center justify-between px-4 pb-2">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Notifications</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={props.onClearLog}
                    className="rounded-full border border-[var(--os-hairline)] px-3 py-1 text-[11px] text-[var(--os-dim)]"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={props.onCloseShade}
                    aria-label="Close notifications"
                    className="rounded-full bg-[var(--os-chip)] px-3 py-1 text-[11px] font-semibold text-[var(--os-ink)]"
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="os-safe-shade-list min-h-0 flex-1 space-y-2 overflow-y-auto px-3">
                {props.bannerLog.length === 0 ? (
                  <p className="px-2 py-10 text-center text-xs text-[var(--os-faint)]">No notifications yet.</p>
                ) : (
                  [...props.bannerLog].reverse().map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        if (b.ai) props.onOpenApp('assistant')
                        else props.onOpenThread(b.threadId)
                        props.onCloseShade()
                      }}
                      className="block w-full rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-panel)] px-4 py-3 text-left"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-2xs font-bold tracking-wide text-[var(--os-faint)] uppercase">
                          {b.icon} {b.app}
                        </span>
                        <span className="ml-auto text-2xs text-[var(--os-faint)]">now</span>
                      </span>
                      <span className="mt-0.5 block text-[13px] font-bold text-[var(--os-ink)]">{b.title}</span>
                      <span className="line-clamp-2 block text-[12px] leading-snug text-[var(--os-dim)]">{b.text}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
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
          {/* status bar sits above everything except call overlay; pulling
              down from its centre opens the shade */}
          {!locked && (
            <>
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-30 h-[46px] w-[200px] -translate-x-1/2 touch-none"
                onPointerDown={shadeDown}
                onPointerUp={shadeUp}
                onPointerCancel={() => {
                  shadeStart.current = null
                }}
              />
              <StatusBar
                time={caseDef.phone.time}
                battery={caseDef.phone.battery}
                unread={props.unread}
                onOpenShade={props.onOpenShade}
                onLock={props.onLock}
              />
            </>
          )}
        </div>
        {/* gesture bar */}
        {!locked && (
          <button
            type="button"
            aria-label="Home"
            onClick={goHomeOnce}
            onPointerUp={goHomeOnce}
            className="os-gesturebar os-safe-gesturebar absolute left-1/2 z-40 h-5 w-28 -translate-x-1/2 touch-none rounded-full transition-colors before:absolute before:-inset-x-8 before:-inset-y-3 before:content-['']"
          />
        )}
      </div>
    </div>
  )
}

function StatusBar({
  time,
  battery,
  unread,
  onOpenShade,
  onLock,
}: {
  time: string
  battery: number
  unread: number
  onOpenShade: () => void
  onLock: () => void
}) {
  return (
    <div className="os-status-row">
      <span className="tabular-nums">{time}</span>
      <span className="os-status-glyphs">
        <MuteToggle />
        <button
          type="button"
          onClick={onLock}
          aria-label="Lock the phone"
          title="Lock the phone"
          className="os-ctl pointer-events-auto relative grid place-items-center rounded-full before:absolute before:-inset-y-3 before:-inset-x-[3px] before:content-['']"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3v8" />
            <path d="M6.4 6.4a8 8 0 1 0 11.2 0" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onOpenShade}
          aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
          className="os-ctl pointer-events-auto relative grid place-items-center rounded-full before:absolute before:-inset-y-3 before:-inset-x-[3px] before:content-['']"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          {unread > 0 && (
            <span className="absolute -top-1 -right-1.5 grid h-3 min-w-3 place-items-center rounded-full bg-red-500 px-0.5 text-[8px] font-bold text-white">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
        <span className="os-status-glyphs" aria-hidden="true">
          {/* code-drawn signal / wifi / battery — iOS glyph grammar */}
          <svg viewBox="0 0 18 12" className="os-g-sig" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="1" />
            <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
            <rect x="10" y="3" width="3" height="9" rx="1" />
            <rect x="15" y="0.5" width="3" height="11.5" rx="1" opacity="0.35" />
          </svg>
          <svg viewBox="0 0 16 12" className="os-g-wifi" fill="currentColor">
            <path d="M8 11 0.9 4.5A10.4 10.4 0 0 1 15.1 4.5Z" />
          </svg>
          <BatteryGlyph level={battery} />
        </span>
      </span>
    </div>
  )
}

/** the battery glyph — the level paints the fill (the % numeral lives on
    the lock screen's battery widget, iOS grammar) */
function BatteryGlyph({ level, className = 'os-g-batt' }: { level: number; className?: string }) {
  return (
    <svg viewBox="0 0 27 13" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="23" height="12" rx="4" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2.5" y="2.5" width={Math.max(2, 19 * (level / 100))} height="8" rx="2" fill="currentColor" />
      <path d="M25.4 4.6v3.8c1-.4 1.6-1 1.6-1.9s-.6-1.5-1.6-1.9Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

/* the dynamic island — hardware, not UI: a black pill in the top inset
   that surfaces the phone's silent state; expansion states (call,
   moment) arrive with the control center in M8.3 via data-state */
function DynamicIsland() {
  const [muted, setM] = useState(isMuted())
  useEffect(() => onMuteChange(setM), [])
  return (
    <div className="os-island" data-state={muted ? 'muted' : undefined} aria-hidden="true">
      {muted && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H3v6h3l5 4z" />
          <path d="m16 9 5 6m0-6-5 6" />
        </svg>
      )}
    </div>
  )
}

/* full-screen prose interstitial — the anthology's narration channel */
function MomentOverlay({
  moment,
  onDismiss,
}: {
  moment?: OSMoment
  onDismiss: () => void
}) {
  useEffect(() => {
    sfx.open()
  }, [])
  return (
    <div
      className="os-safe-moment animate-fadein absolute inset-0 z-[45] flex flex-col justify-center overflow-y-auto bg-[var(--os-bg)] px-7"
      role="dialog"
      aria-label="Narrative moment"
    >
      <div className="space-y-3.5">
        {(moment?.text ?? []).map((p, i) => (
          <p key={i} className="os-narr text-[15px] leading-[1.65]">
            {p}
          </p>
        ))}
      </div>
      <button
        autoFocus
        type="button"
        onClick={onDismiss}
        className="mt-8 w-full rounded-full bg-[var(--os-accent)] px-5 py-3 text-sm font-bold text-[var(--os-accent-ink)] transition-transform active:scale-[0.98]"
      >
        {moment?.label ?? 'Continue'}
      </button>
    </div>
  )
}

function LockScreen({
  caseDef,
  os,
  returning,
  onUnlock,
  onExit,
}: {
  caseDef: CaseOS
  os: OSState
  returning: boolean
  onUnlock: () => void
  onExit: () => void
}) {
  const preview = caseDef.threads
    .map((t) => {
      const msgs = visibleMessages(os, t.id)
      const last = msgs[msgs.length - 1]
      return last ? { t, last } : null
    })
    .filter(Boolean)
    .slice(0, 3) as { t: CaseOS['threads'][number]; last: OSMessage }[]

  // iOS lock widgets — glanceable and data-honest: the battery is always
  // known; missed calls / voicemails / saved notes only chip in when the
  // case actually seeds them (M8.2 review finding: the row was planned
  // but missing)
  const missedCalls = caseDef.recents?.filter((c) => c.missed).length ?? 0
  const voicemails = caseDef.voicemails?.length ?? 0
  const lockWidgets: { key: string; label: string; glyph: ReactNode }[] = [
    {
      key: 'battery',
      label: `${caseDef.phone.battery}%`,
      glyph: <BatteryGlyph level={caseDef.phone.battery} className="h-[3.3cqw] w-auto" />,
    },
    ...(missedCalls > 0
      ? [{ key: 'missed', label: `${missedCalls} missed`, glyph: <AppGlyph app="phone" className="h-3.5 w-3.5" /> }]
      : []),
    ...(voicemails > 0
      ? [
          {
            key: 'voicemail',
            label: `${voicemails} voicemail${voicemails > 1 ? 's' : ''}`,
            glyph: (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="7.2" cy="12.4" r="3.1" />
                <circle cx="16.8" cy="12.4" r="3.1" />
                <path d="M4.5 17.5h15" />
              </svg>
            ),
          },
        ]
      : []),
    ...(os.evidence.length > 0
      ? [{ key: 'notes', label: `${os.evidence.length} in Notes`, glyph: <AppGlyph app="notes" className="h-3.5 w-3.5" /> }]
      : []),
  ]

  const dragStart = useRef<number | null>(null)
  const swipeDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientY
  }
  const swipeUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = dragStart.current
    dragStart.current = null
    if (start != null && start - e.clientY > 52) onUnlock()
  }

  return (
    <div
      className="os-safe-lock absolute inset-0 z-20 flex touch-none flex-col px-6 text-[var(--os-ink)]"
      onPointerDown={swipeDown}
      onPointerUp={swipeUp}
      onPointerCancel={() => {
        dragStart.current = null
      }}
    >
      <div className="text-center">
        <svg
          viewBox="0 0 24 24"
          className="mx-auto mb-1.5 h-4 w-4 opacity-80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <rect x="5.5" y="10.5" width="13" height="9.5" rx="2.8" />
          <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
        </svg>
        <div className="text-[15px] font-medium tracking-wide opacity-85">{caseDef.phone.day}</div>
        <div className="font-display os-lock-clock font-semibold drop-shadow">
          {caseDef.phone.time}
          <span className="ml-1.5 align-baseline text-[4.6cqw] font-medium opacity-75">{caseDef.phone.meridiem}</span>
        </div>
      </div>

      <div className="os-lock-widgets">
        {lockWidgets.map((w) => (
          <span
            key={w.key}
            className="flex items-center gap-1.5 rounded-full bg-[var(--os-panel)]/70 px-3 py-1.5 backdrop-blur-md"
          >
            {w.glyph}
            <span className="text-[11px] font-semibold tabular-nums">{w.label}</span>
          </span>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        {returning && (
          <p className="flex items-center justify-center gap-1.5 pb-1 text-2xs tracking-wide opacity-80">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--os-ok)]" aria-hidden="true" />
            While you were away
          </p>
        )}
        {preview.map(({ t, last }) => (
          <button
            key={t.id}
            type="button"
            onClick={onUnlock}
            className="block w-full rounded-3xl border border-[var(--os-hairline)] bg-[var(--os-panel)]/90 px-4 py-3 text-left backdrop-blur-md transition-colors hover:bg-[var(--os-panel)]"
          >
            <div className="text-[11px] font-bold uppercase tracking-wide opacity-75">
              {SERVICE_LABEL[t.service]}
            </div>
            <div className="text-[13px] font-bold">{t.name}</div>
            <div className="line-clamp-1 text-[12.5px] opacity-85">
              {last.kind === 'voice' ? '🎙️ Voice message' : last.kind === 'photo' ? '📷 Photo' : last.kind === 'link' ? '🔗 Link' : last.text}
            </div>
          </button>
        ))}
        {returning && (
          <p className="pt-1 text-center text-2xs italic leading-snug text-[var(--os-faint)]">
            The conversation is where you left it.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onUnlock}
        className="mx-auto mt-5 flex h-11 items-center gap-2 rounded-full bg-[var(--os-chip)] px-5 text-[12px] font-semibold backdrop-blur-md transition-colors hover:bg-[var(--os-chip-bg-hover)]"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 14 6-6 6 6" />
        </svg>
        Swipe up to open
      </button>
      {caseDef.phone.lockNote && (
        <p className="mt-3 text-center text-2xs italic leading-snug text-[var(--os-faint)]">{caseDef.phone.lockNote}</p>
      )}
      <div className="mt-1 flex justify-center">
        <button
          type="button"
          onClick={onExit}
          className="pov-only h-11 items-center rounded-full px-4 text-2xs text-[var(--os-faint)] transition-colors hover:text-[var(--os-dim)]"
        >
          Put the phone down
        </button>
      </div>
      <p className="sr-only">Swipe up or press Enter to open the phone.</p>
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

  // the case's home layout, one ordered list — the launcher pages and docks it
  const apps = homeAppsFor(caseDef.threads, { notes: os.evidence.length || undefined, messages: newReplies || undefined })
  const layout = buildLauncherLayout(apps)
  const [page, setPage] = useState(0)
  const safePage = Math.min(page, layout.pages.length - 1)

  const renderApp = (id: AppId, badge?: number) => {
    const meta = APP_META[id]
    return (
      <button
        key={id}
        type="button"
        onClick={() => onOpenApp(id)}
        aria-label={`Open ${meta.name}`}
        className="group flex flex-col items-center gap-1.5"
      >
        <AppIcon app={id} badge={badge} />
        <span className="text-2xs font-medium opacity-85">{meta.name}</span>
      </button>
    )
  }

  return (
    <div className="os-safe-home absolute inset-0 z-10 flex flex-col px-6 text-[var(--os-ink)]">
      <div className="grid flex-1 grid-cols-4 content-start gap-x-[4.6cqw] gap-y-5 [grid-auto-rows:min-content]">
        {layout.pages[safePage].cells.map((cell, i) =>
          cell ? renderApp(cell.id, cell.badge) : <span key={`empty-${i}`} aria-hidden="true" />,
        )}
      </div>

      <div className="mt-auto">
        {showPageDots(layout) && (
          <div className="os-page-dots" role="tablist" aria-label="Home pages">
            {layout.pages.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === safePage}
                aria-label={`Home page ${i + 1}`}
                onClick={() => setPage(i)}
                className="os-page-dot"
                data-active={i === safePage}
              />
            ))}
          </div>
        )}
        <div className="mx-auto mb-3 w-max rounded-full bg-[var(--os-chip)] px-4 py-1 text-2xs text-[var(--os-dim)]">
          {os.evidence.length > 0 ? `${os.evidence.length} saved in Notes` : 'glassOS 4.0'}
        </div>
        <div className="flex items-center justify-around rounded-[2rem] bg-[var(--os-chip)] px-4 py-3 backdrop-blur-md">
          {layout.dock.map(({ id, badge }) => (
            <button
              key={id}
              type="button"
              onClick={() => onOpenApp(id)}
              aria-label={`Open ${APP_META[id].name}`}
              className="relative"
            >
              <AppIcon app={id} badge={badge} />
            </button>
          ))}
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
  galleryPhotoId: string | null
  backApp: AppId | null
  onGoBack: () => void
  os: OSState
  typingIn: string | null
  onOpenApp: (id: AppId, opts?: { threadId?: string; pageId?: string; photoId?: string }) => void
  onOpenThread: (id: string) => void
  onCloseThread: () => void
  onOpenPage: (id: string) => void
  onGoHome: () => void
  onInspect: (id: string, evidence?: string) => void
  onSendReply: (reply: CaseOS['replies'][number]) => void
  onAiAction: (msgId: string, action: 'regen' | 'thumbs') => void
  onForward: (msg: OSMessage, toThreadId: string) => void
  onBrightness: (n: number) => void
}) {
  const { app } = props
  const meta = APP_META[app]
  const inner = (() => {
    switch (app) {
      case 'messages':
        return <MessagesApp caseDef={props.caseDef} os={props.os} typingIn={props.typingIn} activeThreadId={props.threadId} onOpenThread={props.onOpenThread} onCloseThread={props.onCloseThread} onSendReply={props.onSendReply} onOpenPage={props.onOpenPage} onOpenPhoto={(id) => props.onOpenApp('gallery', { photoId: id })} onForward={props.onForward} />
      case 'assistant':
        return <AssistantApp caseDef={props.caseDef} os={props.os} typingIn={props.typingIn} onSendReply={props.onSendReply} onOpenPage={props.onOpenPage} onInspect={props.onInspect} onAiAction={props.onAiAction} />
      case 'gallery':
        return <GalleryApp caseDef={props.caseDef} os={props.os} initialPhotoId={props.galleryPhotoId} onInspect={props.onInspect} />
      case 'phone':
        return <PhoneApp caseDef={props.caseDef} os={props.os} onInspect={props.onInspect} />
      case 'browser':
        return <BrowserApp caseDef={props.caseDef} os={props.os} pageId={props.browserPage} onOpenPage={props.onOpenPage} onInspect={props.onInspect} />
      case 'contacts':
        return <ContactsApp caseDef={props.caseDef} os={props.os} onInspect={props.onInspect} />
      case 'notes':
        return <NotesApp caseDef={props.caseDef} os={props.os} onOpenSource={(evidenceId) => {
          const photo = props.caseDef.photos.find((p) => p.evidence === evidenceId)
          if (photo) { props.onOpenApp('gallery', { photoId: photo.id }); return }
          const page = props.caseDef.pages.find((p) => p.evidence === evidenceId)
          if (page) props.onOpenApp('browser', { pageId: page.id })
        }} />
      case 'settings':
        return <SettingsApp caseDef={props.caseDef} os={props.os} onBrightness={props.onBrightness} />
    }
  })()

  return (
    <div className="absolute inset-0 z-20 flex animate-appopen flex-col bg-[var(--os-bg)]/95 backdrop-blur-xl">
      <div className="os-safe-app flex items-center gap-2 px-4 pb-2">
        <button
          type="button"
          onClick={props.onGoBack}
          aria-label={props.backApp ? `Back to ${APP_META[props.backApp].name}` : 'Back to home'}
          className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--os-chip)] text-sm text-[var(--os-ink)] transition-colors hover:bg-[var(--os-hover)] before:absolute before:-inset-2 before:content-['']"
        >
          ‹
        </button>
        <span className="truncate text-[13px] font-bold text-[var(--os-ink)]">{meta.name}</span>
      </div>
      <div className="os-app-body min-h-0 flex-1">{inner}</div>
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
  const swipeStart = useRef<number | null>(null)
  const callSwipeStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (call.phase === 'incoming') swipeStart.current = e.clientY
  }
  const callSwipeEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (start == null || call.phase !== 'incoming') return
    const dy = start - e.clientY
    if (dy > 56) onAccept()
    else if (dy < -56) onEnd(true)
  }
  return (
    <div
      className="os-safe-call absolute inset-0 z-50 flex animate-fadein touch-none flex-col items-center bg-gradient-to-b from-[var(--os-panel)]/98 to-[var(--os-bg)]/98 px-6 text-[var(--os-ink)] backdrop-blur-xl"
      onPointerDown={callSwipeStart}
      onPointerUp={callSwipeEnd}
      onPointerCancel={() => {
        swipeStart.current = null
      }}
    >
      <div className="text-2xs tracking-[0.25em] text-[var(--os-dim)] uppercase">
        {call.phase === 'incoming' ? 'Incoming Viber call' : outgoing ? `Calling ${saved ? 'saved contact' : 'number'}` : call.phase === 'live' ? 'Connected' : 'Call ended'}
      </div>
      <div className="font-display mt-6 grid h-24 w-24 place-items-center rounded-full bg-[var(--os-chip)] text-4xl font-semibold">
        {call.from.trim().charAt(0)}
      </div>
      <div className="mt-4 text-center">
        <div className="text-xl font-bold">{call.from}</div>
        <div className="mt-1 text-[12px] text-[var(--os-dim)]">{call.number}</div>
        {call.sub && <div className="mt-1 text-2xs text-[var(--os-faint)]">{call.sub}</div>}
      </div>

      {live && call.transcript && (
        <div className="mt-6 w-full max-w-xs space-y-2.5" aria-live="polite">
          {call.transcript.map((line, i) => (
            <p
              key={i}
              className="rounded-xl bg-[var(--os-chip)] px-3.5 py-2 text-center text-[12.5px] leading-relaxed opacity-0 [animation:rise_0.5s_ease_forwards]"
              style={{ animationDelay: `${i * 1.4}s` }}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      <div className="mt-auto flex w-full flex-col items-center">
        {call.phase === 'incoming' && (
          <p className="pov-only mb-4 items-center justify-center text-2xs tracking-wide text-[var(--os-faint)]">
            Swipe up to answer · down to decline
          </p>
        )}
        <div className="flex items-center gap-10">
        {call.phase === 'incoming' ? (
          <>
            <button
              type="button"
              onClick={() => onEnd(true)}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--os-danger)] text-2xl shadow-lg transition-transform active:scale-95">
                ✕
              </span>
              <span className="text-2xs text-[var(--os-dim)]">Decline</span>
            </button>
            <button type="button" onClick={onAccept} className="flex flex-col items-center gap-1.5">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--os-ok)] text-2xl shadow-lg transition-transform active:scale-95">
                ✆
              </span>
              <span className="text-2xs text-[var(--os-dim)]">Accept</span>
            </button>
          </>
        ) : (
          <button type="button" onClick={() => onEnd(false)} className="flex flex-col items-center gap-1.5">
            <span
              className={`grid h-16 w-16 place-items-center rounded-full text-2xl shadow-lg transition-transform active:scale-95 ${
                live ? 'bg-[var(--os-danger)]' : 'bg-[var(--os-chip)]'
              }`}
            >
              {live ? '✕' : '↺'}
            </span>
            <span className="text-2xs text-[var(--os-dim)]">{live ? 'End call' : 'Close'}</span>
          </button>
        )}
        </div>
      </div>
      {live && (
        <div className="mt-4 flex items-end gap-[3px]" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-[var(--os-ok)]/70"
              style={{ height: 6 + Math.abs(Math.sin(i * 1.7)) * 18, animation: `pulse-wave 1.1s ease-in-out ${i * 0.08}s infinite alternate` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
