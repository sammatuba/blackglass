import { useEffect, useMemo, useState } from 'react'
import { GlassOS } from '../../../engine/os/Device'
import {
  EVIDENCE_BONUS_CAP,
  evidenceBonus,
  resolveOutcome,
} from '../../../engine/os/runtime'
import type { CaseOS, OSState } from '../../../engine/os/types'
import {
  loadStoryState,
  saveStoryState,
  clearStoryState,
  mergeSet,
  blankState,
  type StoryState,
} from '../../../engine/state'
import type { ChoiceValue } from '../../../engine/types'
import { PhoneStory } from '../../../engine/PhoneStory'
import { ArtifactProvider } from '../../../engine/components'
import type { CaseDef } from './cases'
import { CASES } from './cases'
import { useRadar } from '../state'
import { FAMILY_BY_ID } from '../families'
import { FadeIn } from '../../../ui/FadeIn'
import { VOICE_OS } from './os-voice'

/** a playable case: either a glassOS experience or a legacy linear flow */
export type PlayableCase =
  | { kind: 'os'; def: CaseOS }
  | { kind: 'linear'; def: CaseDef }

export const CASE_PLAYABLE: PlayableCase[] = [
  { kind: 'os', def: VOICE_OS },
  ...CASES.filter((c) => c.id !== 'voice').map((def) => ({ kind: 'linear' as const, def })),
]

/* =====================================================================
   glassOS case
   ===================================================================== */

export function CaseOSGame({ caseDef, onExit }: { caseDef: CaseOS; onExit: () => void }) {
  const casesDone = useRadar((s) => s.cases)
  const completeCase = useRadar((s) => s.completeCase)
  const [finalState, setFinalState] = useState<OSState | null>(null)
  const [runKey, setRunKey] = useState(0)

  const outcome = useMemo(
    () => (finalState ? resolveOutcome(caseDef, finalState.flags) : null),
    [caseDef, finalState],
  )
  const evidence = useMemo(
    () => (finalState ? evidenceBonus(caseDef, finalState) : null),
    [caseDef, finalState],
  )

  function finish(state: OSState) {
    const out = resolveOutcome(caseDef, state.flags)
    const ev = evidenceBonus(caseDef, state)
    const total = out.points + ev.bonus
    if (!casesDone[caseDef.id]) completeCase(caseDef.id, total)
    setFinalState(state)
  }

  if (finalState && outcome && evidence) {
    return (
      <OsDebrief
        caseDef={caseDef}
        state={finalState}
        outcome={outcome}
        evidence={evidence}
        onReplay={() => {
          setFinalState(null)
          setRunKey((k) => k + 1)
        }}
        onExit={onExit}
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-md px-2">
      <div className="flex items-center justify-between px-4 pt-3">
        <button type="button" onClick={onExit} className="text-sm text-ink-400 hover:text-ink-100">
          ‹ Cases
        </button>
        <span className="text-[11px] tracking-wide text-ink-400 uppercase">
          {caseDef.level} · {caseDef.tagline}
        </span>
      </div>
      <GlassOS
        key={runKey}
        caseDef={caseDef}
        onExit={() => {
          if (confirm('Put the phone down? The case resets when you return.')) onExit()
        }}
        onComplete={finish}
      />
    </div>
  )
}

function OsDebrief({
  caseDef,
  state,
  outcome,
  evidence,
  onReplay,
  onExit,
}: {
  caseDef: CaseOS
  state: OSState
  outcome: CaseOS['outcomes'][number]
  evidence: { found: number; total: number; bonus: number }
  onReplay: () => void
  onExit: () => void
}) {
  const total = useRadar((s) => s.totalScore)
  const points = outcome.points + evidence.bonus
  return (
    <div className="mx-auto w-full max-w-md px-4 pt-6 pb-12">
      <FadeIn>
        <p className="text-xs font-semibold tracking-[0.3em] text-train uppercase">
          Debrief · {caseDef.level}
        </p>
        <h2 className="font-display mt-2 text-3xl font-semibold text-ink-100">{caseDef.title}</h2>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            points >= 40
              ? 'border-emerald-500/35 bg-emerald-500/8'
              : points >= 20
                ? 'border-amber-400/35 bg-amber-400/8'
                : 'border-red-500/35 bg-red-500/8'
          }`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-bold text-ink-100">{outcome.title}</h3>
            <span className="shrink-0 text-sm font-bold text-train tabular-nums">
              +{outcome.points}
              {evidence.bonus > 0 ? ` +${evidence.bonus}🧩` : ''} pts
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-300">{outcome.text}</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <h3 className="mt-6 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
          Investigation · {evidence.found}/{evidence.total} clues
        </h3>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-learn/70 to-learn transition-all duration-700"
            style={{ width: `${Math.round((evidence.found / Math.max(1, evidence.total)) * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-400">
          {evidence.found === evidence.total
            ? `Everything inspected. That’s the ${EVIDENCE_BONUS_CAP}-point difference between reading a story and working a case.`
            : 'Some evidence went unexamined — photos, the saved contact, the page. Replay and open everything.'}
        </p>
        <ul className="mt-3 space-y-1.5">
          {state.evidence.map((id: string) => (
            <li key={id} className="flex gap-2 rounded-xl border border-white/8 bg-ink-800/60 px-3 py-2 text-[12.5px] leading-relaxed text-ink-300">
              <span className="text-emerald-300" aria-hidden="true">
                ✓
              </span>
              {caseDef.evidenceLabels[id] ?? id}
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.12}>
        <h3 className="mt-7 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
          What the scam had going for it
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {caseDef.families.map((f) => (
            <span key={f} className="rounded-md bg-ink-700/80 px-2 py-1 text-[11px] font-semibold text-ink-300">
              {FAMILY_BY_ID[f as keyof typeof FAMILY_BY_ID]?.icon} {FAMILY_BY_ID[f as keyof typeof FAMILY_BY_ID]?.label}
            </span>
          ))}
        </div>
        <ul className="mt-4 space-y-2.5">
          {caseDef.tells.map((t) => (
            <li key={t.label} className="rounded-xl border border-ink-700 bg-ink-800/60 p-3">
              <div className="text-[13px] font-bold text-ink-100">🔍 {t.label}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">{t.detail}</p>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.16}>
        <h3 className="mt-7 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
          Print this in your spine
        </h3>
        <ul className="mt-3 space-y-1.5">
          {caseDef.checklist.map((c) => (
            <li key={c} className="flex gap-2 text-[13px] leading-relaxed text-ink-300">
              <span className="text-train" aria-hidden="true">
                ✓
              </span>
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-ink-400">
          Lifetime radar score: <span className="font-semibold text-ink-300 tabular-nums">{total}</span>
        </p>
      </FadeIn>

      <div className="mt-8 space-y-2">
        <button
          type="button"
          onClick={onReplay}
          className="w-full rounded-full border border-ink-600 px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-ink-400"
        >
          Work it again — open everything this time
        </button>
        <button
          type="button"
          onClick={onExit}
          className="w-full rounded-full bg-train px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
        >
          Back to cases
        </button>
      </div>
    </div>
  )
}

/* =====================================================================
   legacy linear case runner (Cases 02–03 until they port to glassOS)
   ===================================================================== */

const caseKey = (id: string) => `scamradar_case_${id}`

export function CaseLinearGame({ caseDef, onExit }: { caseDef: CaseDef; onExit: () => void }) {
  const storeKey = caseKey(caseDef.id)
  const [state, setState] = useState<StoryState>(() => loadStoryState(storeKey))
  const [debrief, setDebrief] = useState<boolean>(
    () => !!loadStoryState(storeKey).completed[caseDef.phone.id],
  )
  const casesDone = useRadar((s) => s.cases)
  const completeCase = useRadar((s) => s.completeCase)

  useEffect(() => saveStoryState(storeKey, state), [storeKey, state])

  const outcome = useMemo(
    () =>
      caseDef.outcomes.find((o) =>
        Object.entries(o.match).every(([k, v]) => String(state.choices[k]) === v),
      ) ?? caseDef.outcomes[caseDef.outcomes.length - 1],
    [caseDef, state.choices],
  )

  function finish() {
    const finished = { ...state, completed: { ...state.completed, [caseDef.phone.id]: true } }
    setState(finished)
    saveStoryState(storeKey, finished)
    if (!casesDone[caseDef.id]) completeCase(caseDef.id, outcome.points)
    setDebrief(true)
  }

  function replay() {
    clearStoryState(storeKey)
    setState(blankState())
    setDebrief(false)
  }

  if (debrief) {
    return (
      <CaseDebrief
        caseDef={caseDef}
        outcome={outcome}
        onReplay={replay}
        onExit={onExit}
        replayable
      />
    )
  }

  return (
    <ArtifactProvider artifacts={caseDef.artifacts}>
      <div className="mx-auto w-full max-w-md px-2">
        <div className="flex items-center justify-between px-3 pt-3">
          <button type="button" onClick={onExit} className="text-sm text-ink-400 hover:text-ink-100">
            ‹ Cases
          </button>
          <span className="text-[11px] tracking-wide text-ink-400 uppercase">
            {caseDef.level} · {caseDef.tagline}
          </span>
        </div>
        <PhoneStory
          phone={caseDef.phone}
          state={state}
          onSet={(set: Record<string, ChoiceValue>) => setState((s) => mergeSet(s, set))}
          onComplete={finish}
          endLabel="Debrief"
        />
      </div>
    </ArtifactProvider>
  )
}

function CaseDebrief({
  caseDef,
  outcome,
  onReplay,
  onExit,
  replayable,
}: {
  caseDef: CaseDef
  outcome: CaseDef['outcomes'][number]
  onReplay: () => void
  onExit: () => void
  replayable?: boolean
}) {
  const total = useRadar((s) => s.totalScore)
  return (
    <div className="mx-auto w-full max-w-md px-4 pt-6 pb-12">
      <FadeIn>
        <p className="text-xs font-semibold tracking-[0.3em] text-train uppercase">
          Debrief · {caseDef.level}
        </p>
        <h2 className="font-display mt-2 text-3xl font-semibold text-ink-100">{caseDef.title}</h2>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            outcome.points >= 40
              ? 'border-emerald-500/35 bg-emerald-500/8'
              : outcome.points >= 20
                ? 'border-amber-400/35 bg-amber-400/8'
                : 'border-red-500/35 bg-red-500/8'
          }`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-bold text-ink-100">{outcome.title}</h3>
            <span className="shrink-0 text-sm font-bold text-train tabular-nums">+{outcome.points} pts</span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-300">{outcome.text}</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h3 className="mt-7 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
          What the scam had going for it
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {caseDef.families.map((f) => (
            <span
              key={f}
              className="rounded-md bg-ink-700/80 px-2 py-1 text-[11px] font-semibold text-ink-300"
            >
              {FAMILY_BY_ID[f].icon} {FAMILY_BY_ID[f].label}
            </span>
          ))}
        </div>
        <ul className="mt-4 space-y-2.5">
          {caseDef.tells.map((t) => (
            <li key={t.label} className="rounded-xl border border-ink-700 bg-ink-800/60 p-3">
              <div className="text-[13px] font-bold text-ink-100">🔍 {t.label}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-400">{t.detail}</p>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h3 className="mt-7 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase">
          Print this in your spine
        </h3>
        <ul className="mt-3 space-y-1.5">
          {caseDef.checklist.map((c) => (
            <li key={c} className="flex gap-2 text-[13px] leading-relaxed text-ink-300">
              <span className="text-train" aria-hidden="true">
                ✓
              </span>
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-ink-400">
          Lifetime radar score: <span className="font-semibold text-ink-300 tabular-nums">{total}</span>
        </p>
      </FadeIn>

      <div className="mt-8 space-y-2">
        {replayable && (
          <button
            type="button"
            onClick={onReplay}
            className="w-full rounded-full border border-ink-600 px-5 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-ink-400"
          >
            Replay this case
          </button>
        )}
        <button
          type="button"
          onClick={onExit}
          className="w-full rounded-full bg-train px-5 py-3 text-sm font-bold text-ink-950 transition-transform active:scale-[0.98]"
        >
          Back to cases
        </button>
      </div>
    </div>
  )
}
