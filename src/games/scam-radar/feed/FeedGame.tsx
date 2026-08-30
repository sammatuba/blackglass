import { useCallback, useEffect, useState } from 'react'
import { FAMILY_BY_ID, VERDICT_META, type Verdict } from '../families'
import { useRadar } from '../state'
import { buildRound, judge } from './round'
import type { FeedItem } from './items'
import { FadeIn } from '../../../ui/FadeIn'

const CHANNEL_META: Record<FeedItem['channel'], { label: string; icon: string }> = {
  sms: { label: 'Text message', icon: '💬' },
  viber: { label: 'Viber', icon: '📱' },
  email: { label: 'Email', icon: '✉️' },
  dm: { label: 'Messenger DM', icon: '👥' },
  listing: { label: 'Marketplace listing', icon: '🏷️' },
  call: { label: 'Voicemail transcript', icon: '📞' },
  post: { label: 'Social post', icon: '📰' },
  wallet: { label: 'In-app wallet alert', icon: '🔔' },
}

type Phase = 'playing' | 'debrief'

export function FeedGame({ onExit }: { onExit: () => void }) {
  const familyRec = useRadar((s) => s.family)
  const addResult = useRadar((s) => s.addResult)
  const [round, setRound] = useState<FeedItem[]>(() => buildRound(familyRec))
  const [idx, setIdx] = useState(0)
  const [streak, setStreak] = useState(0)
  const [roundScore, setRoundScore] = useState(0)
  const [answered, setAnswered] = useState<{ result: ReturnType<typeof judge>; streakAfter: number } | null>(null)
  const [phase, setPhase] = useState<Phase>('playing')

  const item = round[idx]
  const progress = `${idx + (answered ? 1 : 0)}/${round.length}`

  const answer = useCallback(
    (v: Verdict) => {
      if (answered || !item) return
      const result = judge(item, v, streak)
      const streakAfter = result.quality === 'hit' ? streak + 1 : 0
      setAnswered({ result, streakAfter })
      setStreak(streakAfter)
      setRoundScore((s) => s + result.points)
      addResult({
        families: item.families,
        hitFamilies: result.hitFamilies,
        points: result.points,
        streak: streakAfter,
      })
    },
    [answered, item, streak, addResult],
  )

  const next = useCallback(() => {
    if (!answered) return
    if (idx + 1 >= round.length) {
      const rounds = useRadar.getState().rounds + 1
      useRadar.setState({ rounds })
      setPhase('debrief')
    } else {
      setIdx((i) => i + 1)
      setAnswered(null)
    }
  }, [answered, idx, round.length])

  // keyboard: 1 scam · 2 verify · 3 legit · enter next
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'playing') return
      if (!answered && (e.key === '1' || e.key === '2' || e.key === '3')) {
        answer(e.key === '1' ? 'scam' : e.key === '2' ? 'verify' : 'legit')
      } else if (answered && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answered, phase, answer, next])

  if (phase === 'debrief') {
    const score = useRadar.getState().totalScore
    return (
      <Debrief
        score={roundScore}
        total={score}
        count={round.length}
        bestStreak={Math.max(streak, useRadar.getState().bestStreak)}
        onAgain={() => {
          setRound(buildRound(useRadar.getState().family))
          setIdx(0)
          setStreak(0)
          setRoundScore(0)
          setAnswered(null)
          setPhase('playing')
        }}
        onExit={onExit}
      />
    )
  }

  if (!item) return null
  const ch = CHANNEL_META[item.channel]
  const result = answered?.result

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-10">
      {/* header */}
      <div className="flex items-center justify-between gap-3 pt-4">
        <button type="button" onClick={onExit} className="text-sm text-ink-400 transition-colors hover:text-ink-100">
          ‹ Menu
        </button>
        <div className="flex items-center gap-3 text-xs font-semibold text-ink-300">
          <span className="tabular-nums">{progress}</span>
          <span className="text-train tabular-nums">{roundScore} pts</span>
          <span className={streak >= 2 ? 'text-orange-400' : 'text-ink-400'}>
            {streak >= 2 ? '🔥 ' : ''}
            {streak}× streak
          </span>
        </div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
        <div
          className="h-full rounded-full bg-train transition-all duration-300"
          style={{ width: `${(idx + (answered ? 1 : 0)) * (100 / round.length)}%` }}
        />
      </div>

      {/* the message */}
      <FadeIn key={item.id} className="mt-5">
        <article className="rounded-2xl border border-ink-700 bg-ink-800/80 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-md bg-ink-700/70 px-2 py-1 text-[11px] font-semibold text-ink-300">
              <span aria-hidden="true">{ch.icon}</span> {ch.label}
            </span>
            <span className="text-[11px] text-ink-400">level {item.level}</span>
          </div>
          <div className="mt-3">
            <div className="text-sm font-bold text-ink-100">{item.sender}</div>
            {item.handle && <div className="text-xs text-ink-400">{item.handle}</div>}
          </div>
          {item.subject && (
            <div className="mt-2 border-l-2 border-ink-600 pl-2.5 text-sm font-semibold text-ink-200">
              {item.subject}
            </div>
          )}
          <p className="mt-2 text-[14px] leading-relaxed whitespace-pre-line text-ink-300">{item.text}</p>
        </article>
      </FadeIn>

      {/* verdict or feedback */}
      {!answered ? (
        <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Your read">
          {(['scam', 'verify', 'legit'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => answer(v)}
              className={`rounded-xl border px-2 py-3.5 text-sm font-bold transition-colors ${VERDICT_META[v].classes}`}
            >
              {VERDICT_META[v].label}
              <span className="mt-0.5 block text-[10px] font-medium opacity-60">key {VERDICT_META[v].key}</span>
            </button>
          ))}
        </div>
      ) : (
        <FadeIn>
          <div
            aria-live="polite"
            className={`mt-4 rounded-2xl border p-4 ${
              result!.quality === 'hit'
                ? 'border-emerald-500/40 bg-emerald-500/10'
                : result!.quality === 'partial'
                  ? 'border-amber-400/40 bg-amber-400/10'
                  : 'border-red-500/40 bg-red-500/10'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-bold text-ink-100">{result!.banner}</p>
              <p className="text-xs font-semibold text-train tabular-nums">+{result!.points} pts</p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-300">{item.explain}</p>
            <p className="mt-2 border-t border-white/10 pt-2 text-[13px] leading-relaxed text-ink-100">
              <span className="font-semibold text-train">Scam-ready move: </span>
              {item.action}
            </p>
            {item.families.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.families.map((f) => (
                  <span
                    key={f}
                    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                      result!.hitFamilies.includes(f) ? 'bg-emerald-500/20 text-emerald-300' : 'bg-ink-700 text-ink-300'
                    }`}
                  >
                    {FAMILY_BY_ID[f].icon} {FAMILY_BY_ID[f].short}
                  </span>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={next}
              className="mt-4 w-full rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
            >
              {idx + 1 >= round.length ? 'See the debrief' : 'Next read'} <span className="opacity-50">↵</span>
            </button>
          </div>
        </FadeIn>
      )}
    </div>
  )
}

function Debrief({
  score,
  total,
  count,
  bestStreak,
  onAgain,
  onExit,
}: {
  score: number
  total: number
  count: number
  bestStreak: number
  onAgain: () => void
  onExit: () => void
}) {
  const family = useRadar((s) => s.family)
  return (
    <div className="mx-auto w-full max-w-md px-4 pt-6 pb-10">
      <FadeIn>
        <p className="text-xs font-semibold tracking-[0.3em] text-train uppercase">Round debrief</p>
        <h2 className="font-display mt-2 text-3xl font-semibold text-ink-100">How sharp was your radar?</h2>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Round score', value: `${score}` },
            { label: 'Reads', value: `${count}` },
            { label: 'Best streak', value: `${bestStreak}×` },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-ink-700 bg-ink-800/70 p-3">
              <div className="font-display text-2xl font-semibold text-ink-100">{s.value}</div>
              <div className="mt-0.5 text-[10px] tracking-wide text-ink-400 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-ink-400">Lifetime radar score: <span className="font-semibold text-ink-300 tabular-nums">{total}</span></p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h3 className="mt-7 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">Red-flag mastery</h3>
        <div className="mt-3 space-y-2.5">
          {Object.entries(family).map(([id, rec]) => {
            const meta = FAMILY_BY_ID[id as keyof typeof FAMILY_BY_ID]
            const pct = rec.seen === 0 ? 0 : Math.round((rec.hit / rec.seen) * 100)
            return (
              <div key={id}>
                <div className="mb-1 flex items-baseline justify-between text-xs">
                  <span className="font-medium text-ink-300">
                    {meta.icon} {meta.short}
                  </span>
                  <span className="text-ink-400 tabular-nums">
                    {rec.seen === 0 ? 'unseen' : `${pct}% of ${rec.seen}`}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-train/70 to-train transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </FadeIn>

      <div className="mt-8 space-y-2">
        <button
          type="button"
          onClick={onAgain}
          className="w-full rounded-full bg-train px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
        >
          Another round
        </button>
        <button
          type="button"
          onClick={onExit}
          className="w-full rounded-full border border-ink-600 px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-ink-400"
        >
          Back to menu
        </button>
      </div>
    </div>
  )
}
