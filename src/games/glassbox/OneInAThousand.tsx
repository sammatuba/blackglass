import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { animate, useReducedMotion } from 'motion/react'
import { PRESETS, computeScam, matchesPreset, type ScamInputs } from './model'
import { formatNumber, formatPercent, formatPeso } from './format'
import { ScrollProgress, ScrollySection } from './scrolly'
import {
  DefenseStage,
  LedgerStage,
  MachineStage,
  SampleStage,
  formatBreakEven,
  profitLabel,
} from './stages'

/* GLASSBOX 01 — the scam economy, with the lid off.

   The page is a scroll-driven paper dossier: a pinned ledger beside the
   narrative, then a 1,000-dot sample, a live workbench, and the defense
   lever. The model, the guardrails, and the tests are unchanged. The
   scroll is emphasis, not disclosure — every step is readable in order. */

interface RangeControlProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  hint?: string
  onChange: (value: number) => void
}

function RangeControl({ id, label, value, min, max, step, display, hint, onChange }: RangeControlProps) {
  const fill = max > min ? ((value - min) / (max - min)) * 100 : 0

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-[var(--paper-ink)]">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-lg font-semibold tabular-nums text-[var(--paper-ink)]">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={display}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-2 h-11 w-full cursor-pointer"
        style={{ '--range-fill': `${fill}%` } as CSSProperties}
      />
      {hint && (
        <p id={`${id}-hint`} className="text-[11px] leading-relaxed text-[var(--paper-dim)]">
          {hint}
        </p>
      )}
    </div>
  )
}

function PresetButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold transition-colors ${
        active
          ? 'border-[var(--paper-ink)] bg-[var(--paper-ink)] text-[var(--paper-bg)]'
          : 'border-[var(--paper-line)] text-[var(--paper-ink)] hover:bg-black/5'
      }`}
    >
      {children}
    </button>
  )
}

function SceneHead({
  index,
  kicker,
  title,
  id,
  children,
}: {
  index: string
  kicker: string
  title: string
  id: string
  children?: ReactNode
}) {
  return (
    <header className="scene-head">
      <p className="scene-kicker">
        <span>{index}</span> · {kicker}
      </p>
      <h2 id={id} className="scene-title">
        {title}
      </h2>
      {children && <p className="scene-intro">{children}</p>}
    </header>
  )
}

const WAVE_BARS = [10, 18, 26, 14, 30, 22, 34, 16, 24, 12, 28, 20, 32, 14, 22, 10, 26, 18, 30, 12, 20, 16, 24, 10]

function CallSlip() {
  return (
    <div className="paper-slip hero-slip">
      <div className="call-head">
        <p>Case file · one evening</p>
        <span className="paper-stamp paper-stamp-ok">one yes</span>
      </div>
      <div className="voice-row">
        <div className="waveform" aria-hidden="true">
          {WAVE_BARS.map((height, index) => (
            <span key={index} className="wave-bar" style={{ height: `${height}px` }} />
          ))}
        </div>
        <span className="voice-time">0:34 voice note</span>
      </div>
      <p className="call-quote">“Tita, please. Trust me.”</p>
      <dl className="call-meta">
        <div>
          <dt>Sent</dt>
          <dd>₱18,500 · 8:21 PM</dd>
        </div>
        <div>
          <dt>The proof</dt>
          <dd>a voice she had known since he was ten</dd>
        </div>
      </dl>
      <p className="call-note">One yes. How many tries?</p>
    </div>
  )
}

export default function OneInAThousand() {
  const [inputs, setInputs] = useState<ScamInputs>(() => ({ ...PRESETS.ai }))
  const reduced = useReducedMotion()
  const testAnimation = useRef<{ stop: () => void } | null>(null)

  const result = computeScam(inputs)
  const fullVerify = computeScam({ ...inputs, verifyShare: 1 })
  const verifyPct = Math.round(inputs.verifyShare * 100)
  const breakEven = result.breakEvenVerifyShare
  const breakEvenText = formatBreakEven(breakEven)
  const fullVerifyProfit = profitLabel(fullVerify.profit)

  const preset: 'ai' | 'human' | 'custom' = matchesPreset(inputs, PRESETS.ai)
    ? 'ai'
    : matchesPreset(inputs, PRESETS.human)
      ? 'human'
      : 'custom'

  const aiActive = preset === 'ai'
  const humanActive = preset === 'human'

  const defenseCopy =
    result.profit <= 0
      ? 'The line goes dead. Not because everyone got smarter — because the last mile got slower.'
      : verifyPct === 100
        ? 'Even universal verification leaves a margin. At this cost per attempt, the defense cannot bite: the machine has to get more expensive, not just the people more careful.'
        : `At ${verifyPct}% adoption the line still runs. The margin is wide enough to absorb a lot of doubt. That is the uncomfortable part: individual caution is a rounding error at this volume.`

  useEffect(() => {
    document.title = 'One in a Thousand · Glassbox · BLACKGLASS'
  }, [])

  useEffect(() => () => testAnimation.current?.stop(), [])

  const update = (patch: Partial<ScamInputs>) => setInputs((current) => ({ ...current, ...patch }))

  const applyPreset = (next: ScamInputs) =>
    setInputs((current) => ({ ...next, verifyShare: current.verifyShare }))

  const setVerify = (value: number) => {
    testAnimation.current?.stop()
    testAnimation.current = null
    update({ verifyShare: value })
  }

  const testVerification = () => {
    testAnimation.current?.stop()
    if (reduced) {
      update({ verifyShare: 1 })
      return
    }
    testAnimation.current = animate(inputs.verifyShare, 1, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
      onUpdate: (value) => update({ verifyShare: Math.round(value * 100) / 100 }),
    })
  }

  const openLedger = () => {
    document.getElementById('ledger')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="desk-scene min-h-dvh">
      <ScrollProgress />
      <main className="relative z-10">
        <header className="hero-shell" data-od-id="glassbox-hero">
          <div className="hero-top">
            <Link to="/" className="text-sm text-ink-400 transition-colors hover:text-ink-100">
              ‹ Hub
            </Link>
            <p className="text-2xs font-semibold uppercase tracking-[0.25em] text-ink-400">Glassbox · LEARN</p>
          </div>

          <div className="hero-grid">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-learn">
                Glassbox 01 · take it apart
              </p>
              <h1 className="hero-title mt-4">One in a thousand</h1>
              <p className="hero-deck">A scam that almost never works — and still pays for itself.</p>
              <p className="hero-copy">
                Twenty-two minutes on the phone. A voice that sounded like a nephew. A transfer of ₱18,500.
                The easy question is why she believed it. The useful question is why the call was worth making
                at all.
              </p>
              <p className="hero-copy">
                This is the ledger behind the call. The syndicate does not need you to be gullible. It needs
                the math to work.
              </p>
              <ul className="hero-chips">
                <li>5 minutes</li>
                <li>No score</li>
                <li>Illustrative model</li>
              </ul>
            </div>
            <CallSlip />
          </div>

          <div className="hero-scroll">
            <button type="button" onClick={openLedger}>
              Scroll to open the ledger <span aria-hidden="true">↓</span>
            </button>
          </div>
        </header>

        <ScrollySection
          id="ledger"
          labelledBy="ledger-title"
          header={
            <SceneHead
              index="01"
              kicker="The ledger"
              title="A day at the syndicate."
              id="ledger-title"
            >
              The call was not a lucky guess. It was a volume business. This is the default AI line, before any
              defense.
            </SceneHead>
          }
          stage={(active) => <LedgerStage active={active} />}
          steps={[
            <div key="reach">
              <h3 className="step-title">Reach</h3>
              <p className="step-copy">
                Twenty-five thousand messages a day. A human crew would need a call center; a script needs a
                budget.
              </p>
            </div>,
            <div key="reply">
              <h3 className="step-title">Reply</h3>
              <p className="step-copy">
                One in a hundred answers. Two hundred and fifty conversations — enough to staff a small office.
              </p>
            </div>,
            <div key="pay">
              <h3 className="step-title">Pay</h3>
              <p className="step-copy">
                One in ten of those pays. Twenty-five people at ₱18,500 each: ₱462,500.
              </p>
            </div>,
            <div key="profit">
              <h3 className="step-title">Profit</h3>
              <p className="step-copy">
                Subtract ₱12,500 for the attempts. ₱450,000 a day, before anyone has to be clever.
              </p>
              <p className="step-aside">The call was worth making before it reached Merly.</p>
            </div>,
          ]}
        />

        <ScrollySection
          id="sample"
          labelledBy="sample-title"
          header={
            <SceneHead
              index="02"
              kicker="The sample"
              title="A thousand messages, to scale."
              id="sample-title"
            >
              At the default line, this is what the day looks like when you shrink it until it fits on a page.
            </SceneHead>
          }
          stage={(active) => <SampleStage active={active} />}
          steps={[
            <div key="field">
              <h3 className="step-title">The field</h3>
              <p className="step-copy">
                A thousand messages, drawn to scale. Each dot is a person reached. Nothing about the sample
                looks like a crime.
              </p>
            </div>,
            <div key="replies">
              <h3 className="step-title">The replies</h3>
              <p className="step-copy">
                Ten replied. Each amber dot is a conversation the syndicate did not have to start.
              </p>
            </div>,
            <div key="payment">
              <h3 className="step-title">The payment</h3>
              <p className="step-copy">
                One paid. The whole sample cost ₱500 to send. The one green square is worth ₱18,500.
              </p>
            </div>,
            <div key="ratio">
              <h3 className="step-title">The ratio</h3>
              <p className="step-copy">
                A thousand nos buy one yes. The unit of a scam is not a victim; it is the attempt.
              </p>
            </div>,
          ]}
        />

        <section className="interlude" aria-labelledby="interlude-title">
          <div className="interlude-dots" aria-hidden="true">
            <span className="interlude-paid" />
          </div>
          <div className="interlude-inner scroll-reveal">
            <p className="scene-kicker">The part nobody sees</p>
            <h2 id="interlude-title" className="interlude-title">
              You are not the target. You are the denominator.
            </h2>
            <p className="interlude-copy">
              At 25 million messages, the same one-in-a-thousand rate finds 25,000 payers. The AI did not make
              people more trusting. It made trying cheap enough to do at a scale where almost everyone can say
              no and the line still runs.
            </p>
            <p className="interlude-copy interlude-copy-short">
              That is the shift: not smarter lies, cheaper attempts.
            </p>
          </div>
        </section>

        <ScrollySection
          id="machine"
          labelledBy="machine-title"
          header={
            <SceneHead index="03" kicker="The machine" title="Tune the machine." id="machine-title">
              The ledger is not fate. Move the inputs and watch the day change. The presets are two ways to run
              the same con.
            </SceneHead>
          }
          stage={(active) => <MachineStage active={active} inputs={inputs} result={result} preset={preset} />}
          steps={[
            <div key="reach-control">
              <h3 className="step-title">Reach</h3>
              <p className="step-copy">
                How many people the line touches in a day. At scale, almost everyone can refuse.
              </p>
              <div className="paper-slip control-card">
                <RangeControl
                  id="reach"
                  label="People reached per day"
                  value={inputs.reach}
                  min={100}
                  max={100_000}
                  step={100}
                  display={formatNumber(inputs.reach)}
                  hint="An average day, not a forecast."
                  onChange={(value) => update({ reach: value })}
                />
              </div>
            </div>,
            <div key="cost-control">
              <h3 className="step-title">Cost per attempt</h3>
              <p className="step-copy">
                A message, a call, a minute of a human's time. This is the number AI actually changed.
              </p>
              <div className="paper-slip control-card">
                <RangeControl
                  id="cost"
                  label="Cost per attempt"
                  value={inputs.costPerMessage}
                  min={0.05}
                  max={10}
                  step={0.05}
                  display={formatPeso(inputs.costPerMessage, 2)}
                  hint="A message, a call attempt, a minute of a human's time."
                  onChange={(value) => update({ costPerMessage: Math.round(value * 100) / 100 })}
                />
              </div>
            </div>,
            <div key="reply-control">
              <h3 className="step-title">Reply rate</h3>
              <p className="step-copy">
                The share who answer. It can be tiny and still work — that is the whole point.
              </p>
              <div className="paper-slip control-card">
                <RangeControl
                  id="reply"
                  label="Reply rate"
                  value={inputs.replyRate}
                  min={0.001}
                  max={0.05}
                  step={0.001}
                  display={formatPercent(inputs.replyRate, 1)}
                  hint="Share of people who answer."
                  onChange={(value) => update({ replyRate: Math.round(value * 1000) / 1000 })}
                />
              </div>
            </div>,
            <div key="take-control">
              <h3 className="step-title">Average payment</h3>
              <p className="step-copy">
                What one yes is worth. In this story it is ₱18,500 of check-up money.
              </p>
              <div className="paper-slip control-card">
                <RangeControl
                  id="take"
                  label="Average payment"
                  value={inputs.averageTake}
                  min={1000}
                  max={50_000}
                  step={500}
                  display={formatPeso(inputs.averageTake)}
                  hint="What one payment is worth to the syndicate."
                  onChange={(value) => update({ averageTake: value })}
                />
              </div>
              <div className="paper-slip preset-card" data-od-id="glassbox-controls">
                <p className="preset-label">Two ways to run the same con</p>
                <div role="group" aria-label="Machine presets" className="preset-buttons">
                  <PresetButton active={aiActive} onClick={() => applyPreset(PRESETS.ai)}>
                    AI line
                  </PresetButton>
                  <PresetButton active={humanActive} onClick={() => applyPreset(PRESETS.human)}>
                    Human crew
                  </PresetButton>
                </div>
                <p className="preset-note">
                  Switch to the human crew. Watch what the same con costs when a person has to make each call.
                </p>
              </div>
              <p className="step-aside">
                The payment rate among replies is fixed at 10% in this model. The defense comes later.
              </p>
            </div>,
          ]}
        />

        <ScrollySection
          id="defense"
          labelledBy="defense-title"
          header={
            <SceneHead
              index="04"
              kicker="The defense"
              title="The last mile is the defense."
              id="defense-title"
            >
              The syndicate cannot make you trust less. It can only make paying cheaper than checking. Pull
              the lever that changes the price.
            </SceneHead>
          }
          stage={() => (
            <DefenseStage
              result={result}
              verifyPct={verifyPct}
              breakEven={breakEven}
              defenseCopy={defenseCopy}
              onVerify={setVerify}
              onTest={testVerification}
            />
          )}
          steps={[
            <div key="pause">
              <h3 className="step-title">The pause</h3>
              <p className="step-copy">
                Hang up. Call back on a saved number. The clone cannot answer the number you already know.
              </p>
            </div>,
            <div key="odds">
              <h3 className="step-title">The odds</h3>
              <p className="step-copy">
                Of the people who verify, 99 in 100 do not pay. Set adoption to 0%, then drag the lever in the
                ledger. The red line is the break-even.
              </p>
            </div>,
            <div key="collapse">
              <h3 className="step-title">The collapse</h3>
              <p className="step-copy">
                At this line, break-even is {breakEvenText}. At 100% adoption, profit is {fullVerifyProfit} per
                day.
              </p>
              <p className="step-aside">Drag the lever to 100% and watch the margin turn.</p>
            </div>,
            <div key="limit">
              <h3 className="step-title">The limit</h3>
              <p className="step-copy">
                A callback rule protects the people who trust you. It does not, by itself, protect the{' '}
                {formatNumber(inputs.reach)} strangers in this ledger. Both are true.
              </p>
              <p className="step-aside">The defense is a norm, not a sharper individual eye.</p>
            </div>,
          ]}
        />

        <section className="close-shell" aria-labelledby="close-title" data-od-id="glassbox-debrief">
          <div className="scroll-reveal">
            <p className="scene-kicker">What the ledger says</p>
            <h2 id="close-title" className="scene-title">
              The unit of a scam is not a victim. It is a thousand attempts.
            </h2>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <li className="scroll-reveal rounded-card border border-ink-700 bg-ink-800/60 p-4">
              <p className="text-sm font-semibold text-ink-200">
                The call was worth making before it reached Merly.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                AI changes the cost and reach of deception, not human nature. It made trying cheap enough to
                repeat.
              </p>
            </li>
            <li className="scroll-reveal rounded-card border border-ink-700 bg-ink-800/60 p-4">
              <p className="text-sm font-semibold text-ink-200">A thousand nos buy one yes.</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                At 0.1%, the syndicate can afford to be wrong about almost everyone. The unit of a scam is the
                attempt.
              </p>
            </li>
            <li className="scroll-reveal rounded-card border border-ink-700 bg-ink-800/60 p-4">
              <p className="text-sm font-semibold text-ink-200">
                Individual verification protects you. Population-level friction protects everyone.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                A callback rule is a personal defense. A norm is a population defense.
              </p>
            </li>
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              to="/blackglass"
              className="scroll-reveal group rounded-card border border-ink-700 bg-ink-800/60 p-4 transition-colors hover:border-play/60"
            >
              <p className="text-sm font-semibold text-ink-100">Hear the call from Merly&apos;s phone →</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                Open the anthology and pick IT&apos;S ME / One Evening. The ledger is the part she never sees.
              </p>
            </Link>
            <Link
              to="/scam-radar"
              className="scroll-reveal group rounded-card border border-ink-700 bg-ink-800/60 p-4 transition-colors hover:border-train/60"
            >
              <p className="text-sm font-semibold text-ink-100">Train the pause →</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-400">
                Scam Radar&apos;s case files put you inside the call before the money moves.
              </p>
            </Link>
          </div>

          <details className="mt-8 rounded-card border border-ink-700 bg-ink-800/60 p-5">
            <summary className="cursor-pointer text-sm font-semibold text-ink-200">Show the model</summary>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-400">
              <p className="font-mono text-[12px] leading-relaxed break-words text-ink-300">
                profit = reach × (reply rate × payment rate × average payment − cost per attempt)
              </p>
              <p>
                Payment rate among replies is fixed at 10%. Verification blocks 99 of 100 payments among the
                people who use it.
              </p>
              <p>
                The rates are round, illustrative figures chosen to make the arithmetic legible — not estimates
                of any real operation.
              </p>
              <p>
                The average payment is not abstract: in this story it is ₱18,500 of check-up money. The ledger
                counts it; the fiction names who paid it.
              </p>
              <p>
                Not modeled: reporting, takedowns, bank and payment friction, platform enforcement, repeat
                victims, or the human cost behind the average payment.
              </p>
              <p>No real targets, channels, scripts, or tools. This is a defense model.</p>
            </div>
          </details>

          <footer className="mt-10 border-t border-ink-800 pt-5 text-2xs leading-relaxed text-ink-400">
            <p>Glassbox is a model, not a forecast. No real targets, channels, scripts, or tools.</p>
            <p className="mt-1">
              <span className="text-ink-300">BLACKGLASS</span> · Glassbox 01 · take it apart
            </p>
          </footer>
        </section>
      </main>
    </div>
  )
}
