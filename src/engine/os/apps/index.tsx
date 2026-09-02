import { useEffect, useRef, useState } from 'react'
import type { CaseOS, OSMessage, OSState } from '../types'
import { visibleMessages } from '../runtime'
import { isMuted, setMuted, sfx } from '../sound'
import { Avatar, EmptyState } from './shared'
/* The glassOS apps. Every app is an evidence surface. */

export const SERVICE_LABEL: Record<string, string> = {
  sms: 'Messages',
  viber: 'Viber',
  messenger: 'Messenger',
  tiktok: 'TikTok',
  threads: 'Threads',
}

/* =====================================================================
   MESSAGES — the game lives here (Duskwood loop)
   ===================================================================== */

export function MessagesApp({
  caseDef,
  os,
  typingIn,
  activeThreadId,
  onOpenThread,
  onSendReply,
  onOpenPage,
  onInspect,
}: {
  caseDef: CaseOS
  os: OSState
  typingIn: string | null
  activeThreadId: string | null
  onOpenThread: (id: string) => void
  onSendReply: (reply: CaseOS['replies'][number]) => void
  onOpenPage: (id: string) => void
  onInspect: (id: string, evidence?: string) => void
}) {
  const caseOver = !!os.flags[caseDef.endFlag]
  if (!activeThreadId) {
    return <ThreadList caseDef={caseDef} os={os} onOpenThread={onOpenThread} />
  }
  const thread = caseDef.threads.find((t) => t.id === activeThreadId)
  if (!thread) return <EmptyState icon="💬" title="Conversation not found" />
  return (
    <Conversation
      caseDef={caseDef}
      os={os}
      thread={thread}
      typing={typingIn === thread.id}
      caseOver={caseOver}
      onSendReply={onSendReply}
      onOpenPage={onOpenPage}
      onInspect={onInspect}
    />
  )
}

function ThreadList({
  caseDef,
  os,
  onOpenThread,
}: {
  caseDef: CaseOS
  os: OSState
  onOpenThread: (id: string) => void
}) {
  const rows = caseDef.threads.map((t) => {
    const msgs = visibleMessages(os, t.id)
    const last = msgs[msgs.length - 1]
    const offered = caseDef.replies.some(
      (r) =>
        r.threadId === t.id &&
        !os.sentReplies.includes(r.id) &&
        (!r.requires || os.flags[r.requires]) &&
        !(r.hideWhen && os.flags[r.hideWhen]),
    )
    return { t, last, offered, count: msgs.length }
  })
  return (
    <div className="h-full overflow-y-auto pb-6">
      {rows.map(({ t, last, offered, count }) =>
        count === 0 ? null : (
          <button
            key={t.id}
            type="button"
            onClick={() => onOpenThread(t.id)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--os-hover)]"
          >
            <Avatar name={t.name} hue={t.hue} />
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-2">
                <span className="truncate text-[14px] font-bold text-[var(--os-ink)]">{t.name}</span>
                {last?.at && <span className="ml-auto shrink-0 text-[10px] text-[var(--os-faint)]">{last.at}</span>}
              </span>
              <span className={`mt-0.5 line-clamp-1 block text-[12.5px] ${offered ? 'font-semibold text-[var(--os-ink)]' : 'text-[var(--os-dim)]'}`}>
                {typingHint(t.id, caseDef, os) ? (
                  <span className="italic text-[var(--os-accent)]">typing…</span>
                ) : last ? (
                  `${last.from === 'you' ? 'You: ' : ''}${
                    last.kind === 'voice'
                      ? '🎙️ Voice message'
                      : last.kind === 'photo'
                        ? '📷 Photo'
                        : last.kind === 'link'
                          ? '🔗 ' + (caseDef.pages.find((p) => p.id === last.pageId)?.url ?? 'Link')
                          : last.text
                  }`
                ) : (
                  ' '
                )}
              </span>
            </span>
            {offered && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--os-accent)]" aria-label="Your reply is being asked for" />}
          </button>
        ),
      )}
    </div>
  )
}

function typingHint(_threadId: string, _caseDef: CaseOS, _os: OSState): boolean {
  return false // the conversation view shows its own indicator; list hinting stays subtle
}

function Conversation({
  caseDef,
  os,
  thread,
  typing,
  caseOver,
  onSendReply,
  onOpenPage,
  onInspect,
}: {
  caseDef: CaseOS
  os: OSState
  thread: CaseOS['threads'][number]
  typing: boolean
  caseOver: boolean
  onSendReply: (reply: CaseOS['replies'][number]) => void
  onOpenPage: (id: string) => void
  onInspect: (id: string, evidence?: string) => void
}) {
  const msgs = visibleMessages(os, thread.id)
  const offered = caseOver
    ? []
    : caseDef.replies.filter(
        (r) =>
          r.threadId === thread.id &&
          !os.sentReplies.includes(r.id) &&
          (!r.requires || os.flags[r.requires]) &&
          !(r.hideWhen && os.flags[r.hideWhen]),
      )
  const endRef = useRef<HTMLDivElement>(null)
  const playedVoice = useRef<Set<string>>(new Set())

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [msgs.length, typing, offered.length])

  const playVoice = (m: OSMessage) => {
    playedVoice.current.add(m.id)
    void m
  }

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-[var(--os-hairline)] px-4 py-2.5">
        <Avatar name={thread.name} hue={thread.hue} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-bold text-[var(--os-ink)]">{thread.name}</div>
          <div className="truncate text-[10.5px] text-[var(--os-dim)]">
            {thread.members
              ? `${thread.members.length + 1} members · ${SERVICE_LABEL[thread.service]}`
              : thread.number
                ? `${thread.number}${thread.saved ? ' · saved contact' : ' · not in your contacts'}`
                : SERVICE_LABEL[thread.service]}
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-4" aria-live="polite">
        {msgs.length === 0 && (
          <p className="pt-8 text-center text-xs text-[var(--os-faint)]">No messages yet.</p>
        )}
        {msgs.map((m) => {
          if (m.kind === 'narr' || m.kind === 'aside') {
            return (
              <div key={m.id} className={m.kind === 'narr' ? 'os-narr' : 'os-aside'}>
                {m.text}
              </div>
            )
          }
          if (m.from === 'sys' && !m.kind) {
            return (
              <p key={m.id} className="mx-8 rounded-full bg-[var(--os-chip)] px-3 py-1 text-center text-[10.5px] text-[var(--os-dim)]">
                {m.text}
              </p>
            )
          }
          const out = m.from === 'you'
          return (
            <div key={m.id} className={`flex ${out ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] ${
                  m.kind === 'callcard'
                    ? 'w-full max-w-none'
                    : `rounded-2xl px-3.5 py-2 text-[13.5px] leading-relaxed ${
                        out ? 'rounded-br-md bg-[var(--os-bub-out)] text-[var(--os-bub-out-ink)]' : 'rounded-bl-md bg-[var(--os-bub-in)] text-[var(--os-ink)]'
                      }`
                }`}
              >
                {!out && thread.members && m.at && (
                  <div className="mb-0.5 text-[10px] font-bold text-[var(--os-dim)]">{thread.members[0]}</div>
                )}
                {m.kind === 'voice' ? (
                  <VoiceBubble secs={m.secs ?? 5} onPlay={() => playVoice(m)} note={m.caption} />
                ) : m.kind === 'photo' ? (
                  <button
                    type="button"
                    onClick={() => {
                      sfx.open()
                      if (m.photoId) onInspect(m.photoId, caseDef.photos.find((p) => p.id === m.photoId)?.evidence)
                    }}
                    className="block w-full text-left"
                  >
                    <span className="block overflow-hidden rounded-xl bg-[var(--os-panel)]">
                      <span className="flex aspect-[4/3] items-center justify-center text-3xl opacity-40" aria-hidden="true">
                        🖼️
                      </span>
                    </span>
                    <span className="mt-1 block text-[11px] opacity-70">📷 {m.caption ?? 'Tap to view photo'}</span>
                  </button>
                ) : m.kind === 'link' ? (
                  <button
                    type="button"
                    onClick={() => {
                      sfx.open()
                      if (m.pageId) onOpenPage(m.pageId)
                    }}
                    className="block w-full text-left"
                  >
                    <span className="block overflow-hidden rounded-xl border border-[var(--os-hairline)] bg-[var(--os-panel)]">
                      <span className="flex items-center gap-2 px-2.5 py-2">
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-400/90 text-xs font-black text-black">!</span>
                        <span className="min-w-0">
                          <span className="block truncate text-[12px] font-bold">{caseDef.pages.find((p) => p.id === m.pageId)?.title ?? 'Link'}</span>
                          <span className="block truncate text-[10.5px] opacity-55">{caseDef.pages.find((p) => p.id === m.pageId)?.url}</span>
                        </span>
                      </span>
                    </span>
                    <span className="mt-1 block text-[11px] opacity-70">🔗 Tap to open in Browser</span>
                  </button>
                ) : m.kind === 'callcard' ? (
                  <div className="rounded-xl border border-[var(--os-hairline)] bg-[var(--os-chip)] px-3 py-2 text-center text-[12px] text-[var(--os-ink)]">
                    {m.text}
                  </div>
                ) : (
                  m.text
                )}
                {m.at && m.kind !== 'callcard' && (
                  <div className={`mt-0.5 text-[9.5px] ${out ? 'text-right' : ''} text-[var(--os-faint)]`}>{m.at}</div>
                )}
              </div>
            </div>
          )
        })}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-[var(--os-bub-in)] px-4 py-3" aria-label={`${thread.name} is typing`}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[var(--os-dim)]"
                  style={{ animation: `typing-dot 1.1s ease-in-out ${i * 0.18}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* replies */}
      <div className="border-t border-[var(--os-hairline)] px-3 pb-5 pt-2.5">
        {caseOver ? (
          <div className="rounded-xl border border-[var(--os-chip-border)] bg-[var(--os-chip-bg)] px-4 py-2.5 text-center text-[12px] font-semibold text-[var(--os-ink)]">
            ⌖ Case complete — the debrief is loading…
          </div>
        ) : offered.length > 0 ? (
          <div className="space-y-2" role="group" aria-label="Suggested replies">
            {offered.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onSendReply(r)}
                className="block w-full rounded-2xl border border-[var(--os-chip-border)] bg-[var(--os-chip-bg)] px-4 py-2.5 text-left transition-colors hover:bg-[var(--os-chip-bg-hover)]"
              >
                <span className="block text-[13.5px] font-semibold text-[var(--os-ink)]">{r.label}</span>
                {r.sub && <span className="mt-0.5 block text-[11px] leading-snug text-[var(--os-dim)]">{r.sub}</span>}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-[var(--os-chip)] px-4 py-2.5 text-[12.5px] text-[var(--os-faint)]">
            <span aria-hidden="true">✎</span> Reply with a suggested message…
          </div>
        )}
      </div>
    </div>
  )
}

function VoiceBubble({ secs, onPlay, note }: { secs: number; onPlay: () => void; note?: string }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const bars = Array.from({ length: 20 }, (_, i) => 20 + Math.round(60 * Math.abs(Math.sin(i * 1.3))))

  const start = () => {
    if (playing) return
    onPlay()
    setPlaying(true)
    setProgress(0)
    const t0 = performance.now()
    const dur = Math.min(secs, 5) * 400 // compressed playback for pacing
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / dur)
      setProgress(p)
      if (p < 1) requestAnimationFrame(tick)
      else setPlaying(false)
    }
    requestAnimationFrame(tick)
  }

  return (
    <div>
      <button type="button" onClick={start} className="flex items-center gap-2.5" aria-label={`Play voice message, ${secs} seconds`}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--os-chip)] text-[11px]">
          {playing ? '❚❚' : '▶'}
        </span>
        <span className="flex h-6 items-center gap-[2px]" aria-hidden="true">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`w-[2.5px] rounded-full transition-colors ${i / bars.length < progress ? 'bg-[var(--os-accent)]' : 'bg-[var(--os-faint)]'}`}
              style={{ height: `${playing ? h * (0.6 + Math.random() * 0.6) : h}%` }}
            />
          ))}
        </span>
        <span className="text-[11px] tabular-nums opacity-70">0:{String(secs).padStart(2, '0')}</span>
      </button>
      {note && progress >= 1 && (
        <p className="mt-1.5 border-t border-[var(--os-hairline)] pt-1.5 text-[11px] italic leading-snug opacity-75">{note}</p>
      )}
    </div>
  )
}

/* =====================================================================
   GALLERY
   ===================================================================== */

export function GalleryApp({
  caseDef,
  os,
  onInspect,
}: {
  caseDef: CaseOS
  os: OSState
  onInspect: (id: string, evidence?: string) => void
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const photos = caseDef.photos.filter((p) => !p.requires || os.flags[p.requires])
  const open = photos.find((p) => p.id === openId)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open && !os.inspected.includes(open.id)) onInspect(open.id, open.evidence)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open?.id])

  if (photos.length === 0) return <EmptyState icon="🌸" title="No photos yet" sub="Photos arrive as the story moves." />
  return (
    <div className="h-full overflow-y-auto px-3 pb-8">
      <div className="grid grid-cols-2 gap-2 pt-1">
        {photos.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              sfx.open()
              setOpenId(p.id)
            }}
            className="group text-left"
          >
            <span className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-[var(--os-hairline)] bg-gradient-to-br from-[#2a3a5c] to-[#131c30] text-3xl opacity-90 transition-opacity group-hover:opacity-100" aria-hidden="true">
              {p.emoji ?? (p.kind === 'meme' ? '🥬' : p.kind === 'screenshot' ? '📱' : '🖼️')}
            </span>
            <span className="mt-1 block truncate text-[11px] text-[var(--os-dim)]">{p.title}</span>
            {!os.inspected.includes(p.id) && <span className="mt-0.5 block text-[10px] font-semibold text-[var(--os-accent)]">new</span>}
          </button>
        ))}
      </div>

      {open && (
        <div className="absolute inset-0 z-50 flex animate-fadein flex-col bg-black/95 p-4 pt-10" role="dialog" aria-label={`Photo: ${open.title}`}>
          <button type="button" onClick={() => setOpenId(null)} className="absolute left-4 top-3 rounded-full bg-[var(--os-chip)] px-3 py-1.5 text-xs text-[var(--os-ink)]" aria-label="Close photo">
            ‹ Back
          </button>
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-[var(--os-hairline)] bg-gradient-to-br from-[#2a3a5c] to-[#131c30] text-5xl opacity-80" aria-hidden="true">
              {open.emoji ?? (open.kind === 'meme' ? '🥬' : open.kind === 'screenshot' ? '📱' : '🖼️')}
            </div>
            <h3 className="mt-3 text-sm font-bold text-[var(--os-ink)]">{open.title}</h3>
            {open.tells && open.tells.length > 0 && (
              <div className="mt-3 space-y-2 overflow-y-auto">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--os-accent)] uppercase">Look again</p>
                {open.tells.map((t) => (
                  <div key={t.label} className="rounded-xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-3">
                    <div className="text-[12px] font-bold text-[var(--os-ink)]">🔍 {t.label}</div>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-[var(--os-dim)]">{t.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* =====================================================================
   PHONE — voicemails + recents
   ===================================================================== */

export function PhoneApp({
  caseDef,
  os,
  onInspect,
}: {
  caseDef: CaseOS
  os: OSState
  onInspect: (id: string, evidence?: string) => void
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const vms = caseDef.voicemails ?? []
  const open = vms.find((v) => v.id === openId)

  useEffect(() => {
    if (open && !os.inspected.includes(open.id)) onInspect(open.id, open.evidence)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open?.id])

  return (
    <div className="h-full overflow-y-auto pb-8">
      <h3 className="px-4 pt-2 text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Voicemail</h3>
      {vms.length === 0 ? (
        <p className="px-4 py-6 text-xs text-[var(--os-faint)]">No voicemails.</p>
      ) : (
        vms.map((v) => (
          <div key={v.id} className="px-3">
            <button
              type="button"
              onClick={() => {
                sfx.open()
                setOpenId(v.id === openId ? null : v.id)
              }}
              className="mt-2 flex w-full items-center gap-3 rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-chip)] px-3.5 py-3 text-left transition-colors hover:bg-[var(--os-hover)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--os-chip)] text-sm" aria-hidden="true">
                🎙️
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-bold text-[var(--os-ink)]">{v.from}</span>
                <span className="block truncate text-[11px] text-[var(--os-dim)]">
                  {v.number} · {v.at} · 0:{String(v.secs).padStart(2, '0')}
                </span>
              </span>
              <span className="text-[var(--os-faint)]">{openId === v.id ? '⌃' : '›'}</span>
            </button>
            {openId === v.id && (
              <div className="mt-1 space-y-1.5 rounded-xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-3" aria-live="polite">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Transcript</p>
                {v.transcript.map((line, i) => (
                  <p key={i} className="text-[12.5px] leading-relaxed text-[var(--os-ink)]">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))
      )}
      {(caseDef.recents?.length ?? 0) > 0 && (
        <>
          <h3 className="mt-5 px-4 text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Recents</h3>
          {(caseDef.recents ?? []).map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5">
              <span className={`text-sm ${r.missed ? 'text-red-400' : 'text-[var(--os-dim)]'}`} aria-hidden="true">
                {r.missed ? '↙' : r.outgoing ? '↗' : '📞'}
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-[13px] font-semibold ${r.missed ? 'text-red-300' : 'text-[var(--os-ink)]'}`}>{r.name}</span>
                <span className="block text-[10.5px] text-[var(--os-faint)]">{r.number}</span>
              </span>
              <span className="text-[10.5px] text-[var(--os-faint)]">{r.at}</span>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

/* =====================================================================
   BROWSER — fake pages you can actually open
   ===================================================================== */

export function BrowserApp({
  caseDef,
  os,
  pageId,
  onOpenPage,
  onInspect,
}: {
  caseDef: CaseOS
  os: OSState
  pageId: string | null
  onOpenPage: (id: string) => void
  onInspect: (id: string, evidence?: string) => void
}) {
  const page = caseDef.pages.find((p) => p.id === pageId)
  const visited = caseDef.pages.filter((p) => os.inspected.includes(p.id))
  const [payState, setPayState] = useState<'idle' | 'processing' | 'failed'>('idle')
  const pageRef = useRef(page?.id)
  useEffect(() => {
    if (pageRef.current !== page?.id) {
      pageRef.current = page?.id
      setPayState('idle')
    }
    if (page && !os.inspected.includes(page.id)) onInspect(page.id, page.evidence)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page?.id])

  if (!page) {
    return (
      <div className="flex h-full flex-col items-center px-6 pt-10 text-center">
        <div className="text-3xl opacity-30" aria-hidden="true">🌐</div>
        <p className="mt-2 text-sm font-semibold text-[var(--os-dim)]">No page open</p>
        {visited.length > 0 ? (
          <>
            <p className="mt-1 text-xs text-[var(--os-faint)]">Recently opened from messages:</p>
            <div className="mt-3 w-full space-y-2">
              {visited.map((p) => (
                <button key={p.id} type="button" onClick={() => onOpenPage(p.id)} className="block w-full rounded-xl border border-[var(--os-hairline)] bg-[var(--os-chip)] px-3.5 py-2.5 text-left text-left">
                  <span className="block truncate text-[12.5px] font-semibold text-[var(--os-ink)]">{p.title}</span>
                  <span className="block truncate text-[10.5px] text-[var(--os-faint)]">{p.url}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-1 text-xs text-[var(--os-faint)]">Links you receive in messages open here.</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* URL bar */}
      <div className="mx-3 flex items-center gap-2 rounded-full border border-[var(--os-hairline)] bg-[var(--os-chip)] px-3.5 py-2">
        <span className="text-[10px]" aria-hidden="true">🔒</span>
        <span className="min-w-0 flex-1 truncate text-[11.5px] text-[var(--os-ink)]">{page.url}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 pt-3">
        <div className="overflow-hidden rounded-2xl border border-[var(--os-hairline)] bg-white text-[#1a2233]">
          {/* page header */}
          {page.kind !== 'video' && page.kind !== 'social' && (
            <div className={`px-4 py-2 text-[11px] font-bold tracking-wide uppercase ${page.kind === 'gov' ? 'bg-[#1d4ed8] text-white' : 'bg-[#eef1f6] text-[#5b6b85]'}`}>
              {page.badge ?? (page.kind === 'gov' ? 'Official government service' : 'Secure checkout')}
            </div>
          )}
          {page.kind === 'video' ? (
            <VideoPageBody page={page} />
          ) : page.kind === 'social' ? (
            <SocialPageBody page={page} />
          ) : (
          <div className="space-y-3 p-4">
            <h3 className="text-[17px] font-extrabold leading-tight">{page.title}</h3>
            {page.headline && <p className="text-[12px] font-semibold text-[#5b6b85]">{page.headline}</p>}
            {page.body?.map((b, i) => (
              <p key={i} className="text-[12.5px] leading-relaxed">{b}</p>
            ))}
            {page.amount && (
              <div className="rounded-xl border-2 border-[#e6e9f0] p-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-semibold text-[#5b6b85]">Amount due</span>
                  <span className="text-[20px] font-extrabold tabular-nums">{page.amount}</span>
                </div>
                {page.payee && <p className="mt-1 text-[11px] text-[#8b97ab]">Payee: {page.payee}</p>}
                {page.fields && (
                  <div className="mt-3 space-y-1.5">
                    {page.fields.map((f) => (
                      <div key={f} className="rounded-lg bg-[#f2f4f8] px-3 py-2 text-[11px] text-[#8b97ab]">{f}</div>
                    ))}
                  </div>
                )}
                {page.kind === 'checkout' && (
                  <button
                    type="button"
                    onClick={() => {
                      setPayState('processing')
                      sfx.send()
                      onInspect(page.id + '-pay', page.evidence ? page.evidence + '-pay' : undefined)
                      setTimeout(() => setPayState('failed'), 2600)
                    }}
                    disabled={payState !== 'idle'}
                    className="mt-3 w-full rounded-xl bg-[#2563eb] py-3 text-[13px] font-bold text-white disabled:opacity-80"
                  >
                    {payState === 'idle' ? `Pay ${page.amount} now` : payState === 'processing' ? 'Contacting payment gateway…' : '✕ Gateway unreachable'}
                  </button>
                )}
                {page.kind === 'checkout' && payState === 'failed' && (
                  <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-[11px] leading-relaxed text-red-700">
                    Payment gateway could not be reached. (Sandbox note: a real page like this takes your money instantly — the only unreachable gateway here is pretend.)
                  </p>
                )}
                {page.kind === 'dashboard' && (
                  <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-800">
                    Your balance is “growing.” Try withdrawing it.
                  </p>
                )}
              </div>
            )}
          </div>
          )}
        </div>

        {/* tells */}
        {page.tells && page.tells.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--os-accent)] uppercase">Look again</p>
            {page.tells.map((t) => (
              <div key={t.label} className="rounded-xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-3">
                <div className="text-[12px] font-bold text-[var(--os-ink)]">🔍 {t.label}</div>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-[var(--os-dim)]">{t.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* =====================================================================
   CONTACTS
   ===================================================================== */

export function ContactsApp({
  caseDef,
  os,
  onInspect,
}: {
  caseDef: CaseOS
  os: OSState
  onInspect: (id: string, evidence?: string) => void
}) {
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const list = caseDef.contacts.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.number.includes(q))
  const open = caseDef.contacts.find((c) => c.id === openId)

  useEffect(() => {
    if (open && !os.inspected.includes(open.id)) onInspect(open.id, open.evidence)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open?.id])

  return (
    <div className="flex h-full flex-col px-3">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search contacts"
        aria-label="Search contacts"
        className="mx-1 mb-2 rounded-full border border-[var(--os-hairline)] bg-[var(--os-chip)] px-4 py-2 text-[13px] text-[var(--os-ink)] placeholder:text-[var(--os-faint)] focus:outline-none"
      />
      <div className="min-h-0 flex-1 overflow-y-auto pb-6">
        {list.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              sfx.open()
              setOpenId(c.id === openId ? null : c.id)
            }}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--os-hover)]"
          >
            <Avatar name={c.name} hue={(c.name.length * 57) % 360} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-bold text-[var(--os-ink)]">{c.name}</span>
              <span className="block truncate text-[11px] text-[var(--os-dim)]">{c.number}</span>
            </span>
            {c.relation && <span className="shrink-0 text-[10px] text-[var(--os-faint)]">{c.relation}</span>}
          </button>
        ))}
        {list.length === 0 && <p className="px-3 py-6 text-center text-xs text-[var(--os-faint)]">No contacts match.</p>}
        {open && (
          <div className="mt-3 rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-4" aria-live="polite">
            <div className="text-[15px] font-bold text-[var(--os-ink)]">{open.name}</div>
            <div className="mt-0.5 text-[12.5px] text-[var(--os-dim)]">{open.number}</div>
            {open.relation && <div className="mt-0.5 text-[11px] text-[var(--os-faint)]">{open.relation}</div>}
            {open.evidence && (
              <p className="mt-3 rounded-xl border border-[var(--os-chip-border)] bg-[var(--os-chip-bg)] p-3 text-[12px] leading-relaxed text-[var(--os-ink)]">
                ⌕ Cross-check: the number texting you is <span className="font-bold">not this one</span>. Saved contacts don’t change silently — that’s the whole point of them.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* =====================================================================
   NOTES
   ===================================================================== */

export function NotesApp({ caseDef, os }: { caseDef: CaseOS; os: OSState }) {
  const evidence = os.evidence.map((id) => ({ id, label: caseDef.evidenceLabels?.[id] ?? id }))
  return (
    <div className="h-full overflow-y-auto px-4 pb-8">
      <div className="mt-1 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-4">
        <div className="text-[11px] font-bold tracking-[0.2em] text-amber-300 uppercase">Case notes</div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--os-ink)]">{caseDef.blurb}</p>
      </div>

      <h3 className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Evidence collected · {evidence.length}</h3>
      {evidence.length === 0 ? (
        <p className="mt-2 text-xs leading-relaxed text-[var(--os-faint)]">
          Nothing yet. Evidence appears here when you inspect photos, numbers, and pages — the way you would on a real phone.
        </p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {evidence.map((e) => (
            <li key={e.id} className="flex gap-2 rounded-xl border border-[var(--os-hairline)] bg-[var(--os-chip)] px-3 py-2 text-[12.5px] leading-relaxed text-[var(--os-ink)]">
              <span className="text-[var(--os-accent)]" aria-hidden="true">✓</span> {e.label}
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Notes</h3>
      <div className="mt-2 space-y-2 pb-2">
        {caseDef.notes.map((n) => (
          <div key={n.title} className="rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-3.5">
            <div className="text-[12.5px] font-bold text-[var(--os-ink)]">{n.title}</div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--os-dim)]">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* =====================================================================
   SETTINGS
   ===================================================================== */

export function SettingsApp({
  caseDef,
  onBrightness,
}: {
  caseDef: CaseOS
  os: OSState
  onBrightness: (n: number) => void
}) {
  const [muted, setM] = useState(isMuted())
  const [bright, setBright] = useState(100)
  return (
    <div className="h-full overflow-y-auto px-4 pb-8">
      <h3 className="mt-1 text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Display</h3>
      <div className="mt-2 rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-4">
        <label htmlFor="brightness" className="text-[12.5px] font-semibold text-[var(--os-ink)]">
          Brightness
        </label>
        <input
          id="brightness"
          type="range"
          min={20}
          max={100}
          value={bright}
          onChange={(e) => {
            const v = Number(e.target.value)
            setBright(v)
            onBrightness(v)
          }}
          className="mt-2 w-full accent-[var(--os-accent)]"
        />
      </div>

      <h3 className="mt-4 text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">Sound</h3>
      <button
        type="button"
        role="switch"
        aria-checked={!muted}
        onClick={() => {
          const m = !muted
          setMuted(m)
          setM(m)
          if (!m) sfx.unlock()
        }}
        className="mt-2 flex w-full items-center justify-between rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-4"
      >
        <span className="text-[12.5px] font-semibold text-[var(--os-ink)]">Interface sounds</span>
        <span className={`relative h-6 w-11 rounded-full transition-colors ${!muted ? 'bg-[var(--os-accent)]' : 'bg-[var(--os-chip)]'}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${!muted ? 'left-[22px]' : 'left-0.5'}`} />
        </span>
      </button>

      <h3 className="mt-4 text-[10px] font-bold tracking-[0.2em] text-[var(--os-faint)] uppercase">About this phone</h3>
      <div className="mt-2 space-y-1 rounded-2xl border border-[var(--os-hairline)] bg-[var(--os-chip)] p-4 text-[12px] text-[var(--os-dim)]">
        <p>glassOS 4.0 · sandbox device</p>
        <p>Nothing here is real: not the numbers, not the pages, not the money. That’s what makes it safe to practice on.</p>
        <p className="text-[var(--os-faint)]">{caseDef.phone.day} · battery {caseDef.phone.battery}%</p>
      </div>
    </div>
  )
}

/* fake short-video player (the anthology's debunker trap) */
function VideoPageBody({ page }: { page: CaseOS['pages'][number] }) {
  return (
    <div>
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#1c2333] to-[#0d1220]">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-lg text-white backdrop-blur-sm" aria-hidden="true">
          ▶
        </span>
        {page.tag && (
          <span className="absolute bottom-2 left-2 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-black tracking-widest text-white">
            {page.tag}
          </span>
        )}
        {page.views && (
          <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white/85">
            {page.views} views
          </span>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-[15px] font-bold leading-snug">{page.title}</h3>
          <p className="mt-0.5 text-[11.5px] text-[#5b6b85]">
            {page.creator}
            {page.creatorSub ? ` · ${page.creatorSub}` : ''}
          </p>
        </div>
        {page.body?.map((b, i) => (
          <p key={i} className="text-[12.5px] leading-relaxed">
            {b}
          </p>
        ))}
      </div>
    </div>
  )
}

/* fake social post (quote-sharing the trap onward) */
function SocialPageBody({ page }: { page: CaseOS['pages'][number] }) {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1d9bf0] text-[13px] font-black text-white" aria-hidden="true">
          {(page.creator ?? '?').replace('@', '').slice(0, 1).toUpperCase()}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-bold">{page.creator}</div>
          <div className="truncate text-[11px] text-[#5b6b85]">{page.creatorSub}</div>
        </div>
      </div>
      {page.body?.map((b, i) => (
        <p key={i} className="text-[13px] leading-relaxed">
          {b}
        </p>
      ))}
      {page.badge && (
        <div className="rounded-xl border border-[#e6e9f0] bg-[#f2f4f8] px-3 py-2 text-[11px] text-[#5b6b85]">{page.badge}</div>
      )}
      {page.views && <p className="text-[11px] text-[#8b97ab]">{page.views}</p>}
    </div>
  )
}
