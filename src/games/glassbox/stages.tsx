import { memo, type CSSProperties } from 'react'
import { PRESETS, computeScam, type ScamInputs, type ScamResult } from './model'
import { formatCount, formatNumber, formatPercent, formatPeso } from './format'

/* The four pinned stages. Each is the same paper sheet seen from a
   different distance: the default ledger, the sample, the live machine,
   and the defense. All numbers are text; the 1,000-dot grid is the only
   decorative field, and its legend carries the meaning. */

const DOT_COUNT = 1000
const DOT_COLUMNS = 40

const STORY_INPUTS = PRESETS.ai
const STORY_RESULT = computeScam(STORY_INPUTS)

export function profitLabel(profit: number): string {
  return profit < 0 ? `−${formatPeso(Math.abs(profit))}` : formatPeso(profit)
}

export function formatBreakEven(share: number | null): string {
  if (share === null) return 'above 100%'
  if (share <= 0) return 'already dead'
  return formatPercent(share, 1)
}

function LedgerRow({ label, value, lit }: { label: string; value: string; lit: boolean }) {
  return (
    <div className={`ledger-row${lit ? ' is-lit' : ''}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function StageHead({ label, stamp, stampOk }: { label: string; stamp: string; stampOk?: boolean }) {
  return (
    <div className="stage-head">
      <p>{label}</p>
      <span className={`paper-stamp${stampOk ? ' paper-stamp-ok' : ''}`}>{stamp}</span>
    </div>
  )
}

export const DotField = memo(function DotField({
  reach,
  replyRate,
  effectivePaymentRate,
  reveal,
}: {
  reach: number
  replyRate: number
  effectivePaymentRate: number
  reveal: number
}) {
  const sample = Math.min(Math.round(reach), DOT_COUNT)
  const peoplePerDot = sample > 0 ? reach / sample : 0
  const replyDots = Math.min(sample, Math.round(sample * replyRate))
  const paidDots = Math.min(replyDots, Math.round(sample * replyRate * effectivePaymentRate))

  let litOrder = 0
  const cells = Array.from({ length: DOT_COUNT }, (_, index) => {
    if (index >= sample) return { kind: 'empty', order: 0 }
    if (index < paidDots) return { kind: 'paid', order: litOrder++ }
    if (index < replyDots) return { kind: 'replied', order: litOrder++ }
    return { kind: 'reached', order: 0 }
  })

  const paidCopy =
    paidDots === 0
      ? 'No green square in this sample. At this rate the line has to spread one yes across more attempts.'
      : paidDots === 1
        ? 'One green square. That is the business.'
        : `${paidDots} green squares. That is the business.`

  return (
    <figure className="dot-field" data-reveal={Math.min(2, Math.max(0, reveal))}>
      <div
        className="dot-grid"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${DOT_COLUMNS}, minmax(0, 1fr))` }}
      >
        {cells.map((cell, index) => (
          <span
            key={index}
            className={`dot dot-${cell.kind}`}
            style={
              cell.kind === 'paid' || cell.kind === 'replied'
                ? ({ '--dot-order': cell.order } as CSSProperties)
                : undefined
            }
          />
        ))}
      </div>
      <figcaption className="dot-caption">
        <span className="dot-key">
          <span className="dot-swatch dot-swatch-replied" aria-hidden="true" /> replied
        </span>
        <span className="dot-key">
          <span className="dot-swatch dot-swatch-paid" aria-hidden="true" /> paid
        </span>
        <span>
          {formatNumber(sample)} of {formatNumber(reach)} drawn · each dot = {formatCount(peoplePerDot)}{' '}
          {peoplePerDot === 1 ? 'person' : 'people'}
        </span>
      </figcaption>
      <p className="dot-note">{paidCopy}</p>
    </figure>
  )
})

export function LedgerStage({ active }: { active: number }) {
  return (
    <div className="paper-ledger stage-ledger" data-od-id="glassbox-ledger-stage">
      <StageHead label="A day at the syndicate" stamp="Illustrative ledger" />
      <div className={`stage-profit${active >= 3 ? ' is-lit' : ''}`}>
        <p className="stage-profit-label">Expected profit / day</p>
        <p className="stage-profit-value" data-od-id="glassbox-ledger-profit">
          {profitLabel(STORY_RESULT.profit)}
        </p>
      </div>
      <dl className="ledger-rows">
        <LedgerRow label="Reached" value={formatNumber(STORY_INPUTS.reach)} lit={active >= 0} />
        <LedgerRow label="Cost to try" value={formatPeso(STORY_RESULT.cost)} lit={active >= 0} />
        <LedgerRow label="Replied" value={formatCount(STORY_RESULT.replies)} lit={active >= 1} />
        <LedgerRow label="Paid" value={formatCount(STORY_RESULT.payments)} lit={active >= 2} />
        <LedgerRow label="Gross" value={formatPeso(STORY_RESULT.gross)} lit={active >= 2} />
      </dl>
      <p className={`stage-line${active >= 3 ? ' is-lit' : ''}`}>
        1 in {formatNumber(STORY_RESULT.messagesPerPayment)} messages finds someone who pays.
      </p>
    </div>
  )
}

export function SampleStage({ active }: { active: number }) {
  const status = [
    '1,000 people reached.',
    '10 of them replied.',
    '1 of them paid.',
    'A thousand nos buy one yes.',
  ][Math.min(3, Math.max(0, active))]

  return (
    <div className="paper-ledger stage-sample" data-od-id="glassbox-sample-stage">
      <StageHead label="The sample" stamp="to scale" />
      <p className="stage-status">{status}</p>
      <DotField
        reach={STORY_INPUTS.reach}
        replyRate={STORY_INPUTS.replyRate}
        effectivePaymentRate={STORY_RESULT.effectivePaymentRate}
        reveal={Math.min(2, active)}
      />
    </div>
  )
}

export function MachineStage({
  active,
  inputs,
  result,
  preset,
}: {
  active: number
  inputs: ScamInputs
  result: ScamResult
  preset: 'ai' | 'human' | 'custom'
}) {
  const presetStamp = preset === 'ai' ? 'AI line' : preset === 'human' ? 'Human crew' : 'Custom line'
  const negative = result.profit < 0

  return (
    <div className="paper-ledger stage-machine" data-od-id="glassbox-machine-stage">
      <StageHead label="A day at the syndicate" stamp={presetStamp} />
      <div className="stage-profit is-lit">
        <p className="stage-profit-label">Expected profit / day</p>
        <p className={`stage-profit-value${negative ? ' is-negative' : ''}`} data-od-id="glassbox-profit">
          {profitLabel(result.profit)}
        </p>
      </div>
      <dl className="ledger-rows">
        <LedgerRow label="Reached" value={formatNumber(inputs.reach)} lit={active === 0} />
        <LedgerRow label="Cost to try" value={formatPeso(result.cost)} lit={active === 1} />
        <LedgerRow label="Replied" value={formatCount(result.replies)} lit={active === 2} />
        <LedgerRow label="Paid" value={formatCount(result.payments)} lit={active === 3} />
      </dl>
      <p className="stage-line">
        1 in {formatNumber(result.messagesPerPayment)} messages · break-even at{' '}
        {formatBreakEven(result.breakEvenVerifyShare)}
      </p>
    </div>
  )
}

export function DefenseStage({
  result,
  verifyPct,
  breakEven,
  defenseCopy,
  onVerify,
  onTest,
}: {
  result: ScamResult
  verifyPct: number
  breakEven: number | null
  defenseCopy: string
  onVerify: (value: number) => void
  onTest: () => void
}) {
  const negative = result.profit < 0

  return (
    <div className="paper-ledger stage-defense" data-od-id="glassbox-defense">
      <StageHead label="The defense" stamp="The last mile" stampOk />
      <div className="stage-profit is-lit">
        <p className="stage-profit-label">Profit / day</p>
        <p className={`stage-profit-value${negative ? ' is-negative' : ''}`} data-od-id="glassbox-profit-defense">
          {profitLabel(result.profit)}
        </p>
      </div>
      <div className="defense-stats">
        <div>
          <span>Paid / day</span>
          <strong>{formatCount(result.payments)}</strong>
        </div>
        <div>
          <span>Break-even at</span>
          <strong data-od-id="glassbox-break-even">{formatBreakEven(breakEven)}</strong>
        </div>
      </div>
      <div className="defense-lever">
        <div className="lever-labels">
          <label htmlFor="verify-share">People who hang up and call back</label>
          <output htmlFor="verify-share">{verifyPct}%</output>
        </div>
        <div className="lever-track">
          {breakEven !== null && breakEven > 0 && breakEven <= 1 && (
            <span className="lever-break-even" style={{ left: `${breakEven * 100}%` }} aria-hidden="true" />
          )}
          <input
            id="verify-share"
            type="range"
            min={0}
            max={100}
            step={1}
            value={verifyPct}
            onChange={(event) => onVerify(Number(event.target.value) / 100)}
            aria-valuetext={`${verifyPct}%`}
            aria-describedby="verify-hint"
            style={{ '--range-fill': `${verifyPct}%` } as CSSProperties}
          />
        </div>
        <p id="verify-hint" className="lever-hint">
          Of the people who verify, 99 in 100 do not pay. The red line is the break-even.
        </p>
      </div>
      <button type="button" className="lever-test" onClick={onTest}>
        Test 100% adoption
      </button>
      <p className="defense-copy">{defenseCopy}</p>
    </div>
  )
}
