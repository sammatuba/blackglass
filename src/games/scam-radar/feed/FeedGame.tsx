import { useCallback, useEffect, useRef, useState } from 'react'
import { FAMILY_BY_ID, VERDICT_META, type FamilyId, type Verdict } from '../families'
import { useRadar } from '../state'
import { buildRound, judge, readMax, signalFor } from './round'
import type { FeedItem } from './items'
import { DeskMeter, GradeStamp, gradeFor, GRADE_COLOR, useCountUp, GRADE_NAME } from '../../shared/desk'
import { gameSfx } from '../../../engine/os/sound'
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

/* the round's own flag ledger — which families you met, which you caught */
interface FlagTally {
  seen: number
  hit: number
}

export function FeedGame({ onExit }: { onExit: () => void }) {
  const rounds = useRadar((s) => s.rounds)
  const bestSignal = useRadar((s) => s.bestRoundSignal)
  const addResult = useRadar((s) => s.addResult)
  const [round, setRound] = useState<FeedItem[]>(() => buildRound(useRadar.getState().family))
  const [idx, setIdx] = useState(0)
  const [streak, setStreak] = useState(0)
  const [roundScore, setRoundScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [flags, setFlags] = useState<Record<string, FlagTally>>({})
  const [reads, setReads] = useState({ hit: 0, partial: 0, miss: 0 })
  const [answered, setAnswered] = useState<{ result: ReturnType<typeof judge>; streakAfter: number } | null>(null)
  const [phase, setPhase] = useState<Phase>('playing')
  const [newBest, setNewBest] = useState(false)
  const settled = useRef(false)

  const item = round[idx]
  const liveSignal = signalFor(roundScore, maxScore)
  const liveGrade = gradeFor(liveSignal)

  const answer = useCallback(
    (v: Verdict) => {
      if (answered || !item) return
      const result = judge(item, v, streak)
      const streakAfter = result.quality === 'hit' ? streak + 1 : 0
      setAnswered({ result, streakAfter })
      setStreak(streakAfter)
      setRoundScore((s) => s + result.points)
      setMaxScore((s) => s + readMax(streak))
      setReads((r) => ({ ...r, [result.quality]: r[result.quality] + 1 }))
      setFlags((f) => {
        const next = { ...f }
        for (const fam of item.families) {
          const rec = next[fam] ?? { seen: 0, hit: 0 }
          next[fam] = { seen: rec.seen + 1, hit: rec.hit + (result.hitFamilies.includes(fam) ? 1 : 0) }
        }
        return next
      })
      // every sound is tied to the visible ledger: the verdict tone
      if (result.quality === 'hit') {
        if (v === 'verify') gameSfx.verify()
        else if (v === 'scam') gameSfx.protect()
        else gameSfx.neutral()
      } else if (result.quality === 'partial') gameSfx.drift()
      else gameSfx.risk()
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
      // close the shift: one rounds tick, the best signal kept
      if (!settled.current) {
        settled.current = true
        const s = useRadar.getState()
        const signal = signalFor(roundScore, maxScore)
        useRadar.setState({ rounds: s.rounds + 1, bestRoundSignal: Math.max(s.bestRoundSignal, signal) })
        setNewBest(signal > s.bestRoundSignal)
      }
      setPhase('debrief')
    } else {
      gameSfx.tick()
      setIdx((i) => i + 1)
      setAnswered(null)
    }
  }, [answered, idx, round.length, roundScore, maxScore])

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
    return (
      <Debrief
        score={roundScore}
        signal={signalFor(roundScore, maxScore)}
        reads={reads}
        flags={flags}
        count={round.length}
        bestStreak={useRadar.getState().bestStreak}
        newBest={newBest}
        bestSignal={bestSignal}
        shift={rounds}
        onAgain={() => {
          settled.current = false
          setRound(buildRound(useRadar.getState().family))
          setIdx(0)
          setStreak(0)
          setRoundScore(0)
          setMaxScore(0)
          setFlags({})
          setReads({ hit: 0, partial: 0, miss: 0 })
          setAnswered(null)
          setNewBest(false)
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
      {/* the case file — a shift at the feed desk */}
      <div className="flex items-center justify-between gap-3 pt-4">
        <button type="button" onClick={onExit} className="text-sm text-ink-400 transition-colors hover:text-ink-100">
          ‹ Menu
        </button>
        <p className="text-[11px] font-bold tracking-[0.2em] text-train uppercase">Shift {rounds + 1}</p>
      </div>

      {/* the live desk — the signal you have made so far, graded as you go */}
      <div className="mt-3 rounded-2xl border border-ink-700 bg-ink-800/70 p-4">
        <p className="signal-rail-label">The feed desk</p>
        <p className="signal-rail-copy">
          Ten reads are waiting — texts, mail, DMs, calls. Call each one:{' '}
          <span className="font-semibold text-ink-100">scam, legit, or verify first.</span> Every
          read is a habit; the shift is how it trains.
        </p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="signal-total tabular-nums">{liveSignal}</span>
            <span className="signal-total-max">/100</span>
            <span
              className="signal-grade-chip"
              style={{ color: GRADE_COLOR[liveGrade], borderColor: `${GRADE_COLOR[liveGrade]}55`, background: `${GRADE_COLOR[liveGrade]}14` }}
            >
              {liveGrade}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-ink-300">
            <span className="tabular-nums text-ink-400">{roundScore} pts</span>
            <span className={streak >= 2 ? 'text-orange-400' : 'text-ink-400'} aria-label={streak >= 2 ? `streak ${streak}` : 'no streak'}>
              {streak >= 2 ? '🔥 ' : ''}
              {streak}×
            </span>
          </div>
        </div>
        <div className="mt-2.5">
          <DeskMeter ratio={liveSignal / 100} label="SIGNAL" step={`reads ${idx + (answered ? 1 : 0)}/${round.length}`} />
        </div>
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
                ? 'border-ok/40 bg-ok/10'
                : result!.quality === 'partial'
                  ? 'border-warn/40 bg-warn/10'
                  : 'border-danger/40 bg-danger/10'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-bold text-ink-100">{result!.banner}</p>
              <p className="text-xs font-semibold text-train tabular-nums">+{result!.points} pts</p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-300">{item.explain}</p>
            <p className="mt-2 border-t border-ink-700 pt-2 text-[13px] leading-relaxed text-ink-100">
              <span className="font-semibold text-train">Scam-ready move: </span>
              {item.action}
            </p>
            {item.families.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.families.map((f) => (
                  <span
                    key={f}
                    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                      result!.hitFamilies.includes(f) ? 'bg-ok/20 text-ok' : 'bg-ink-700 text-ink-300'
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
              {idx + 1 >= round.length ? 'Close the shift' : 'Next read'} <span className="opacity-50">↵</span>
            </button>
          </div>
        </FadeIn>
      )}
    </div>
  )
}

/* =====================================================================
   THE SHIFT DEBRIEF — the same verdict dossier the anthology closes on:
   the count-up, the grade stamp, the fanfare sized to the grade. The
   grade stamps the reads you made and the flags you caught — never the
   messages themselves.
   ===================================================================== */

function Debrief({
  score,
  signal,
  reads,
  flags,
  count,
  bestStreak,
  newBest,
  bestSignal,
  shift,
  onAgain,
  onExit,
}: {
  score: number
  signal: number
  reads: { hit: number; partial: number; miss: number }
  flags: Record<string, FlagTally>
  count: number
  bestStreak: number
  newBest: boolean
  bestSignal: number
  shift: number
  onAgain: () => void
  onExit: () => void
}) {
  const grade = gradeFor(signal)
  const { count: shown, stamped } = useCountUp(signal, grade)
  const family = useRadar((s) => s.family)
  const total = useRadar((s) => s.totalScore)

  const slipping = Object.entries(flags)
    .filter(([, rec]) => rec.seen > 0 && rec.hit / rec.seen < 0.6)
    .map(([id]) => FAMILY_BY_ID[id as FamilyId])
    .filter(Boolean)

  const taught =
    reads.miss === 0 && reads.partial === 0
      ? 'Every read clean. The pause is becoming a reflex — the queue noticed.'
      : reads.miss === 0
        ? 'Nothing fully slipped past. The half reads are where the next scam lives.'
        : 'The misses are the lesson: the flags were there, the pause came late.'

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-6 pb-10">
      <FadeIn>
        <p className="text-[11px] font-bold tracking-[0.25em] text-train uppercase">Shift {shift} closed · {count} reads</p>
        <h2 className="font-display mt-2 text-3xl font-semibold text-ink-100">How sharp was your radar?</h2>
      </FadeIn>

      {/* the dossier hero — same stamp language as the anthology verdict */}
      <FadeIn delay={0.08}>
        <div className="verdict-hero mt-5 rounded-2xl border border-ink-700 bg-ink-800/60 p-6">
          <div className="flex flex-wrap items-center gap-6">
            <GradeStamp grade={grade} stamped={stamped} />
            <div className="min-w-0">
              <p className="text-[11px] font-bold tracking-[0.25em] text-ink-400 uppercase">Round signal</p>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-semibold tabular-nums text-ink-100">{shown}</span>
                <span className="text-lg text-ink-500">/100</span>
              </p>
              {newBest && <p className="mt-1.5 text-[12px] font-bold tracking-wide text-play uppercase">✦ New best</p>}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-ink-700 bg-ink-900/60 px-3 py-3 text-center">
              <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">Clean</p>
              <p className="mt-1 text-[15px] font-bold tabular-nums text-ok">{reads.hit}</p>
            </div>
            <div className="rounded-xl border border-ink-700 bg-ink-900/60 px-3 py-3 text-center">
              <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">Half reads</p>
              <p className="mt-1 text-[15px] font-bold tabular-nums text-warn">{reads.partial}</p>
            </div>
            <div className="rounded-xl border border-ink-700 bg-ink-900/60 px-3 py-3 text-center">
              <p className="text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">Missed</p>
              <p className="mt-1 text-[15px] font-bold tabular-nums text-danger">{reads.miss}</p>
            </div>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-400">
            {grade === 'S'
              ? `A ${GRADE_NAME[grade]} shift. ${GRADE_NAME[grade]} is what the desk calls a reader who saw everything.`
              : 'The grade measures the reads you made and the flags you caught — never what the scammers did.'}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.12}>
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

      {slipping.length > 0 && (
        <FadeIn delay={0.16}>
          <div className="mt-6 rounded-xl border border-train/30 bg-train/8 px-4 py-3">
            <p className="text-[11px] font-bold tracking-[0.25em] text-train uppercase">Still slipping past · {slipping.length}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-300">
              {slipping.map((f) => `${f.icon} ${f.short}`).join(' · ')}
            </p>
            <p className="mt-1 text-[12px] text-ink-400">Another round feeds the weakest flags first.</p>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <div className="mt-6 rounded-2xl border border-ink-600 bg-ink-900/80 p-5">
          <p className="text-[11px] font-bold tracking-[0.25em] text-ink-400 uppercase">WHAT THE SHIFT TAUGHT</p>
          <p className="font-display mt-2 text-[15.5px] leading-relaxed text-ink-200">{taught}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-700 pt-3 text-[12px] text-ink-400">
            <span>
              Round score <span className="font-semibold text-ink-200 tabular-nums">{score}</span>
            </span>
            <span>
              Best streak <span className="font-semibold text-ink-200 tabular-nums">{bestStreak}×</span>
            </span>
            <span>
              Best signal <span className="font-semibold text-ink-200 tabular-nums">{bestSignal}</span>
            </span>
            <span>
              Lifetime <span className="font-semibold text-ink-200 tabular-nums">{total}</span>
            </span>
          </div>
        </div>
      </FadeIn>

      <div className="mt-8 space-y-2">
        <button
          type="button"
          onClick={onAgain}
          className="w-full rounded-full bg-train px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
        >
          Another shift
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
