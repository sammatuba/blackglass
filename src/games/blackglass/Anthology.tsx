import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlassOS } from '../../engine/os/Device'
import type { FlagValue } from '../../engine/os/types'
import type { AnthologyAnchor } from './types'
import { useBlackglass } from './state'
import { FadeIn } from '../../ui/FadeIn'

type Screen =
  | 'anchors'
  | 'rack'
  | { phone: string }
  | 'timeline'
  | 'reflection'

/* The anthology orchestrator: anchor select, a rack of phones, sequenced
   unlocks, and the shared epilogue (the one timeline none of the phones
   could see). Each phone is a full glassOS run; choices carry across
   phones and into the timeline. */

const PHONE_THEME_ACCENT: Record<string, string> = {
  maya: '#f0c46f',
  tita: '#b27a2e',
  bea: '#1d9bf0',
}

function verbFor(phoneId: string): string {
  return phoneId === 'maya' ? 'DECIDE' : phoneId === 'tita' ? 'FORWARD' : phoneId === 'bea' ? 'CONSULT' : 'SCROLL'
}

export function Anthology({ anchors }: { anchors: AnthologyAnchor[] }) {
  const [anchorId, setAnchorId] = useState<string | null>(null)
  const anchor = anchors.find((a) => a.id === anchorId) ?? null

  useEffect(() => {
    document.title = 'BLACKGLASS · the phone anthology'
  }, [anchorId])

  if (!anchor) return <AnchorSelect anchors={anchors} onPick={setAnchorId} />
  return <AnchorRun key={anchor.id} anchor={anchor} onBack={() => setAnchorId(null)} />
}

/* =====================================================================
   ANCHOR SELECT — the four stories
   ===================================================================== */

function AnchorSelect({ anchors, onPick }: { anchors: AnthologyAnchor[]; onPick: (id: string) => void }) {
  const progress = useBlackglass((s) => s.anchors)
  return (
    <div className="desk-scene min-h-dvh">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
        <Link to="/" className="text-sm text-ink-400 transition-colors hover:text-ink-100">
          ‹ Hub
        </Link>
        <FadeIn>
          <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-play uppercase">BLACKGLASS</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-ink-100">The phone anthology</h1>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-400">
            One family. The same deception moving through different phones, different habits of
            trust. You cannot see clearly from one position — so you will hold all of them.
          </p>
        </FadeIn>
        <div className="mt-8 space-y-3">
          {anchors.map((a, i) => {
            const prog = progress[a.id]
            const done = a.order.filter((id) => prog?.completed[id]).length
            const all = done === a.order.length
            return (
              <FadeIn key={a.id} delay={0.05 + i * 0.04}>
                <button
                  type="button"
                  onClick={() => onPick(a.id)}
                  className="group flex w-full flex-col rounded-2xl border border-ink-700 bg-ink-800/60 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-play/60"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-play uppercase">
                      Anchor {['I', 'II', 'III', 'IV'][i] ?? i + 1} <span className="ml-1 font-medium text-ink-400 normal-case">· {a.order.length === 1 ? 'one phone' : `${a.order.length} phones`}</span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${
                        all ? 'bg-emerald-500/15 text-emerald-300' : done > 0 ? 'bg-play/15 text-play' : 'bg-ink-700/80 text-ink-400'
                      }`}
                    >
                      {all ? '✓ lived' : done > 0 ? `${done} of ${a.order.length} lived` : 'unplayed'}
                    </span>
                  </div>
                  <h2 className="font-display mt-1.5 text-2xl font-semibold text-ink-100">
                    {a.title} <span className="text-ink-400">{a.subtitle}</span>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{a.blurb}</p>
                  <p className="font-display mt-2 text-[13.5px] italic text-ink-300">{a.question}</p>
                </button>
              </FadeIn>
            )
          })}
        </div>
        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <ResetButton />
            <p className="mt-3 text-[11px] text-ink-400">
              Every character is fictional. The manipulation mechanics are not — see world/guardrails.md.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

/* =====================================================================
   ONE ANCHOR — rack, phones, epilogue
   ===================================================================== */

function AnchorRun({ anchor, onBack }: { anchor: AnthologyAnchor; onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>('rack')
  const [runKey, setRunKey] = useState(0)
  const [wakeNote, setWakeNote] = useState<string | null>(null)
  const progress = useBlackglass((s) => s.anchors[anchor.id])
  const completePhone = useBlackglass((s) => s.completePhone)

  const completed = progress?.completed ?? {}
  const runs = progress?.runs ?? {}
  const doneCount = anchor.order.filter((id) => completed[id]).length
  const allDone = doneCount === anchor.order.length

  useEffect(() => {
    document.title = `BLACKGLASS · ${anchor.title} — ${anchor.subtitle}`
  }, [anchor])

  /* a decision flag recorded in any phone run */
  const findChoice = (key: string): FlagValue | undefined => {
    for (const run of Object.values(runs)) if (run[key] !== undefined) return run[key]
    return undefined
  }

  /* ---- a phone run ---- */
  if (typeof screen === 'object') {
    const phoneId = screen.phone
    const base = anchor.phones[phoneId]
    /* sequenced recognition: completions from other phones ride in as
       initial flags (rules key on done_maya and friends) */
    const initialFlags: Record<string, FlagValue> = { ...base.initialFlags }
    for (const other of anchor.order) {
      if (other !== phoneId && completed[other]) initialFlags[`done_${other}`] = true
    }
    const mayaChoice = findChoice('maya_choice')
    if (mayaChoice !== undefined) initialFlags.maya_choice = mayaChoice
    const caseDef = { ...base, initialFlags }
    return (
      <GlassOS
        key={`${phoneId}-${runKey}`}
        caseDef={caseDef}
        onExit={() => setScreen('rack')}
        onComplete={(state) => {
          const wasEntry = !completed[phoneId] && phoneId === anchor.entry
          completePhone(anchor.id, phoneId, state.flags)
          if (wasEntry) {
            const others = anchor.order.filter((id) => id !== anchor.entry)
            const names = others.map((id) => anchor.phones[id].title.replace(' 💛', ''))
            setWakeNote(
              names.length > 1
                ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]} have woken up.`
                : `${names[0]} has woken up.`,
            )
          }
          setScreen('rack')
        }}
      />
    )
  }

  /* ---- timeline epilogue ---- */
  if (screen === 'timeline') {
    return (
      <div className="desk-scene min-h-dvh">
        <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
          <button type="button" onClick={() => setScreen('rack')} className="text-sm text-ink-400 transition-colors hover:text-ink-100">
            ‹ The rack
          </button>
          <FadeIn>
            <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-play uppercase">{anchor.question}</p>
            <h1 className="font-display mt-2 text-3xl font-semibold text-ink-100">{anchor.timeline.title}</h1>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-400">{anchor.timeline.intro}</p>
          </FadeIn>

          {anchor.silentWitness && (
            <FadeIn delay={0.06}>
              <div className="mt-6 rounded-2xl border border-ink-600 bg-ink-900/80 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[11px] font-bold tracking-[0.25em] text-ink-400 uppercase">{anchor.silentWitness.label}</span>
                  <span className="text-[11px] tabular-nums text-ink-400">{anchor.silentWitness.time}</span>
                </div>
                <p className="font-display mt-1 text-lg font-semibold text-ink-100">{anchor.silentWitness.who}</p>
                <div className="mt-3 space-y-2">
                  {anchor.silentWitness.lines.map((l, i) => (
                    <p key={i} className="text-[13px] leading-relaxed text-ink-300">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          <ol className="mt-8 space-y-0">
            {anchor.timeline.events.map((ev, i) => {
              const dyn = ev.dynamic
              const chosen = dyn ? findChoice(dyn.key) : undefined
              const text = dyn ? (chosen !== undefined ? (dyn.map[String(chosen)] ?? dyn.fallback) : dyn.fallback) : ev.text
              return (
                <FadeIn key={i} delay={Math.min(0.3, i * 0.04)}>
                  <li className="relative flex gap-4 pb-7">
                    {i < anchor.timeline.events.length - 1 && (
                      <span className="absolute left-[52px] top-9 bottom-0 w-px bg-ink-700" aria-hidden="true" />
                    )}
                    <span className="w-11 shrink-0 pt-0.5 text-right text-[12px] font-bold tabular-nums text-ink-300">{ev.time}</span>
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-ink-900"
                      style={{ background: PHONE_THEME_ACCENT[ev.who] ?? '#8b8b8b' }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: PHONE_THEME_ACCENT[ev.who] ?? '#8b8b8b' }}>
                        {ev.label}
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-300">{text}</span>
                    </span>
                  </li>
                </FadeIn>
              )
            })}
          </ol>
          <FadeIn delay={0.2}>
            <div className="mt-4 rounded-2xl border border-play/30 bg-play/8 p-5">
              {anchor.timeline.close.map((c, i) => (
                <p key={i} className={`${i > 0 ? 'mt-3' : ''} text-[14px] leading-relaxed text-ink-200`}>
                  {c}
                </p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setScreen('reflection')}
              className="mt-6 w-full rounded-full bg-play px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
            >
              What you carry forward
            </button>
          </FadeIn>
        </div>
      </div>
    )
  }

  /* ---- reflection ---- */
  if (screen === 'reflection') {
    return (
      <div className="desk-scene min-h-dvh">
        <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
          <button type="button" onClick={() => setScreen('rack')} className="text-sm text-ink-400 transition-colors hover:text-ink-100">
            ‹ The rack
          </button>
          <FadeIn>
            <h1 className="font-display mt-8 text-3xl font-semibold text-ink-100">{anchor.reflection.title}</h1>
          </FadeIn>
          <div className="mt-6 space-y-3">
            {anchor.reflection.cards.map((card, i) => (
              <FadeIn key={card.who + card.line} delay={0.05 + i * 0.05}>
                <div className="rounded-2xl border border-ink-700 bg-ink-800/60 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: PHONE_THEME_ACCENT[card.who] ?? '#8b8b8b' }}>
                      {card.verb}
                    </span>
                    <span className="text-[11px] text-ink-400">{anchor.phones[card.who]?.title ?? card.who}</span>
                  </div>
                  <h2 className="font-display mt-1.5 text-xl font-semibold text-ink-100">{card.line}</h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-400">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.25}>
            <p className="mt-8 text-center text-[14.5px] leading-relaxed text-ink-300">{anchor.reflection.coda}</p>
            <button
              type="button"
              onClick={() => setScreen('rack')}
              className="mt-8 w-full rounded-full border border-ink-600 px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-ink-400"
            >
              Back to the rack
            </button>
          </FadeIn>
        </div>
      </div>
    )
  }

  /* ---- the rack ---- */
  return (
    <div className="desk-scene min-h-dvh">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-16">
        <button type="button" onClick={onBack} className="text-sm text-ink-400 transition-colors hover:text-ink-100">
          ‹ The anthology
        </button>

        <FadeIn>
          <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-play uppercase">BLACKGLASS</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-ink-100">
            {anchor.title} <span className="text-ink-400">{anchor.subtitle}</span>
          </h1>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-400">{anchor.blurb}</p>
          <p className="font-display mt-3 text-[15px] italic text-ink-300">{anchor.question}</p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mt-5 rounded-xl border border-ink-700 bg-ink-800/70 px-4 py-3 text-[12.5px] text-ink-300">
            {doneCount === 0 ? (
              <>
                Start with <span className="font-bold text-ink-100">{anchor.phones[anchor.entry].title}</span>.
                {anchor.order.length > 1
                  ? ' The others wake up once you’ve lived it from inside her phone — the order is the point.'
                  : ' No scam this time. No lie. Just the feed.'}
              </>
            ) : allDone ? (
              <>All lived. Now see the one timeline none of them could.</>
            ) : (
              <>{doneCount} of {anchor.order.length} lived. Pick up another phone — order changes what you’ll feel.</>
            )}
          </div>
        </FadeIn>

        {wakeNote && (
          <FadeIn>
            <p className="mt-3 rounded-xl border border-play/40 bg-play/10 px-4 py-3 text-[13px] font-semibold text-play" role="status">
              ✦ {wakeNote}
            </p>
          </FadeIn>
        )}

        <FadeIn delay={0.1}>
          <div className={`mt-6 grid gap-3 ${anchor.order.length > 1 ? 'sm:grid-cols-3' : ''}`}>
            {anchor.order.map((id) => {
              const p = anchor.phones[id]
              const done = !!completed[id]
              const open = id === anchor.entry || !!completed[anchor.entry]
              const accent = PHONE_THEME_ACCENT[p.phone.theme ?? ''] ?? '#8b8b8b'
              return (
                <button
                  key={id}
                  type="button"
                  disabled={!open}
                  onClick={() => {
                    setWakeNote(null)
                    setRunKey((k) => k + 1)
                    setScreen({ phone: id })
                  }}
                  className={`group flex flex-col rounded-2xl border p-4 text-left transition-all ${
                    open ? 'border-ink-700 bg-ink-800/60 hover:-translate-y-0.5' : 'cursor-not-allowed border-ink-800 bg-ink-900/50 opacity-60'
                  }`}
                >
                  <span
                    className="relative block h-24 w-14 rounded-[0.8rem] border border-white/15 bg-[#05070d] p-[3px]"
                    style={{ boxShadow: open ? `0 0 22px -2px ${accent}55` : 'none' }}
                    aria-hidden="true"
                  >
                    <span className={`relative block h-full w-full overflow-hidden rounded-[0.6rem] wall-${p.phone.wallpaper}`}>
                      <span className="absolute left-1/2 top-1 h-1 w-4 -translate-x-1/2 rounded-full bg-black/50" />
                      <span className={`absolute inset-0 grid place-items-center ${p.phone.theme === 'maya' ? 'text-white/85' : 'text-black/60'} text-sm`}>
                        {done ? '✓' : open ? (p.phone.theme === 'maya' ? '🌙' : '☀️') : '🔒'}
                      </span>
                    </span>
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[13.5px] font-bold text-ink-100">{p.title}</span>
                    <span className="rounded px-1.5 py-0.5 text-[9.5px] font-black tracking-[0.15em]" style={{ background: `${accent}22`, color: accent }}>
                      {verbFor(id)}
                    </span>
                  </span>
                  <span className="mt-1 block text-[11.5px] leading-snug text-ink-400">
                    {open ? p.blurb.split('. ')[0] + '.' : `Locked — live ${anchor.phones[anchor.entry].title}’s story first.`}
                  </span>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wide" style={{ color: done ? '#6ee7b7' : accent }}>
                    {done ? '✓ lived' : open ? 'pick up' : 'asleep'}
                  </span>
                </button>
              )
            })}
          </div>
        </FadeIn>

        {allDone && (
          <FadeIn delay={0.14}>
            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => setScreen('timeline')}
                className="group flex w-full flex-col rounded-2xl border border-play/40 bg-gradient-to-br from-ink-800 to-ink-800/40 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-play"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-ink-100">{anchor.timeline.title}</h2>
                  <span className="rounded-full bg-play/15 px-2.5 py-1 text-[11px] font-bold text-play uppercase">Open</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{anchor.timeline.intro}</p>
              </button>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.18}>
          <div className="mt-10 text-center">
            <ResetButton />
            <p className="mt-3 text-[11px] text-ink-400">
              Every character is fictional. The manipulation mechanics are not — see world/guardrails.md.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

function ResetButton() {
  const reset = useBlackglass((s) => s.reset)
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Reset anthology progress? All lived phones and choices are forgotten.')) reset()
      }}
      className="text-xs text-ink-400 underline-offset-4 transition-colors hover:text-ink-100 hover:underline"
    >
      Reset anthology progress
    </button>
  )
}
