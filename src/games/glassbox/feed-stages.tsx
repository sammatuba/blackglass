import type { CSSProperties } from 'react'
import { StageHead } from './stages'
import { formatCount, formatPercent } from './format'
import {
  CONTEXT_PAYMENT,
  DEFAULT_DIAL,
  type FeedDialInputs,
  type FeedGenre,
  type FeedResult,
  type FeedShares,
} from './feed-model'

/* The four pinned sheets for Glassbox 02: the lineup Bea sees, the
   weights that shape it, the five-week sum, and the cap that changes
   what the ranking is paid for. */

const LINEUP: {
  handle: string
  meta: string
  body: string
  likes: number
  kind: FeedGenre
}[] = [
  {
    handle: 'reporter.local',
    meta: 'follow-up · 7 sources',
    body: 'The viral number, followed to its source. It does not say what the post says.',
    likes: 6,
    kind: 'grounding',
  },
  {
    handle: 'the.council',
    meta: 'quote-post',
    body: 'this is what epistemic cowardice looks like.',
    likes: 1_200,
    kind: 'outrage',
  },
  {
    handle: 'beareyes.ph',
    meta: 'thread · 11 min read',
    body: 'The caveats the screenshot left out, with the parts I got wrong.',
    likes: 23,
    kind: 'grounding',
  },
  {
    handle: 'hypewire',
    meta: 'video · 0:18',
    body: '“It learned to lie.” The demo everyone is sharing.',
    likes: 480,
    kind: 'novelty',
  },
]

const WEIGHT_ROWS: {
  genre: FeedGenre
  id: string
  label: string
  value: (inputs: FeedDialInputs) => number
  hint: string
}[] = [
  {
    genre: 'outrage',
    id: 'conflict-boost',
    label: 'Conflict boost',
    value: (inputs) => inputs.outrageWeight,
    hint: 'How hard the ranking pushes callouts and dunks.',
  },
  {
    genre: 'novelty',
    id: 'novelty-boost',
    label: 'Novelty boost',
    value: (inputs) => inputs.noveltyWeight,
    hint: 'How hard it pushes new, strange, and now.',
  },
  {
    genre: 'grounding',
    id: 'context-boost',
    label: 'Context boost',
    value: (inputs) => inputs.groundingWeight,
    hint: 'How hard it pushes follow-up, verification, and the boring middle.',
  },
]

const GENRE_LABEL: Record<FeedGenre, string> = {
  outrage: 'conflict',
  novelty: 'new',
  grounding: 'context',
}

function FeedMix({
  shares,
  conflictId,
  mode = 'week five',
}: {
  shares: FeedShares
  conflictId: string
  mode?: string
}) {
  return (
    <div className="feed-mix">
      <div className="feed-mix-bar" aria-hidden="true">
        {(['outrage', 'novelty', 'grounding'] as FeedGenre[]).map((genre) => (
          <span
            key={genre}
            className={`feed-mix-seg seg-${genre}`}
            style={{ width: `${shares[genre] * 100}%` }}
          />
        ))}
      </div>
      <p className="feed-mix-legend">
        {(['outrage', 'novelty', 'grounding'] as FeedGenre[]).map((genre) => (
          <span key={genre} data-od-id={genre === 'outrage' ? conflictId : undefined}>
            <i className={`feed-swatch seg-${genre}`} aria-hidden="true" />
            {GENRE_LABEL[genre]} {formatPercent(shares[genre], 0)}
          </span>
        ))}
        <span className="feed-mix-mode">{mode}</span>
      </p>
    </div>
  )
}

function FeedRange({
  id,
  label,
  value,
  display,
  hint,
  onChange,
}: {
  id: string
  label: string
  value: number
  display: string
  hint: string
  onChange: (value: number) => void
}) {
  const fill = (value / 3) * 100
  return (
    <div className="feed-control">
      <div className="lever-labels">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{display}</output>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={3}
        step={0.1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={display}
        aria-describedby={`${id}-hint`}
        style={{ '--range-fill': `${fill}%` } as CSSProperties}
      />
      <p id={`${id}-hint`} className="feed-control-hint">
        {hint}
      </p>
    </div>
  )
}

export function FeedLineStage({ active }: { active: number }) {
  const lit =
    active === 0 || active === 3
      ? () => true
      : active === 1
        ? (kind: FeedGenre) => kind === 'grounding'
        : (kind: FeedGenre) => kind === 'outrage'

  const foot = [
    'Nothing here is false. The lineup is the argument.',
    'The careful posts: 6 likes and 23 likes. They inform; they do not move.',
    'The sharp post: 1,200 likes. It moves, and it makes the next slot.',
    'Clicks → supply → feed. The loop does not need a lie.',
  ][Math.min(3, Math.max(0, active))]

  return (
    <div className="paper-ledger feed-stage feed-lineup" data-od-id="feed-lineup">
      <StageHead label="Bea’s feed · week 1" stamp="A lineup" />
      <div className="feed-posts">
        {LINEUP.map((post) => (
          <article
            key={post.handle}
            className={`feed-post is-${post.kind}${lit(post.kind) ? ' is-lit' : ''}`}
          >
            <div className="feed-post-meta">
              <span>
                @{post.handle} · {post.meta}
              </span>
              <span>
                {formatCount(post.likes)} likes · {GENRE_LABEL[post.kind]}
              </span>
            </div>
            <p className="feed-post-body">{post.body}</p>
          </article>
        ))}
      </div>
      <p className="feed-foot">{foot}</p>
    </div>
  )
}

export function DialStage({
  active,
  inputs,
  result,
  onChange,
}: {
  active: number
  inputs: FeedDialInputs
  result: FeedResult
  onChange: (patch: Partial<FeedDialInputs>) => void
}) {
  const row = WEIGHT_ROWS[Math.min(2, Math.max(0, active))]
  const week = result.weekFive

  return (
    <div className="paper-ledger feed-stage feed-dial" data-od-id="feed-dial">
      <StageHead label="The dial" stamp="week five projection" />
      <FeedMix shares={week.shares} conflictId="feed-projection-conflict" />
      {active < 3 ? (
        <FeedRange
          id={row.id}
          label={row.label}
          value={row.value(inputs)}
          display={`${row.value(inputs).toFixed(1)}×`}
          hint={row.hint}
          onChange={(value) => {
            const key =
              row.genre === 'outrage'
                ? 'outrageWeight'
                : row.genre === 'novelty'
                  ? 'noveltyWeight'
                  : 'groundingWeight'
            onChange({ [key]: value })
          }}
        />
      ) : (
        <div className="feed-dial-summary">
          <p>
            Conflict {formatPercent(week.shares.outrage, 0)} · new{' '}
            {formatPercent(week.shares.novelty, 0)} · context{' '}
            {formatPercent(week.shares.grounding, 0)}
          </p>
          <p>{formatCount(week.clicks)} clicks per day</p>
        </div>
      )}
      <p className="feed-stage-note" aria-live="polite">
        {active < 3
          ? `If these weights run for five weeks, conflict is ${formatPercent(week.shares.outrage, 0)} of the feed.`
          : `The same weights, five weeks later: ${formatPercent(week.shares.outrage, 0)} conflict, ${formatPercent(week.shares.grounding, 0)} context, ${formatCount(week.clicks)} clicks a day.`}
      </p>
    </div>
  )
}

export function WeeksStage({ active, result }: { active: number; result: FeedResult }) {
  const focusWeek = [0, 1, 3, 4][Math.min(3, Math.max(0, active))]
  const days = result.days.slice(focusWeek * 7, focusWeek * 7 + 7)
  const week = {
    outrage: days.reduce((sum, day) => sum + day.shares.outrage / 7, 0),
    novelty: days.reduce((sum, day) => sum + day.shares.novelty / 7, 0),
    grounding: days.reduce((sum, day) => sum + day.shares.grounding / 7, 0),
    clicks: days.reduce((sum, day) => sum + day.clicks / 7, 0),
  }

  return (
    <div className="paper-ledger feed-stage feed-weeks" data-od-id="feed-weeks">
      <StageHead label="Thirty-five days" stamp="the drift" />
      <div className="feed-chart" aria-hidden="true">
        {result.days.map((day) => (
          <div
            key={day.day}
            className={`feed-chart-day${Math.floor((day.day - 1) / 7) === focusWeek ? ' is-focused' : ''}`}
          >
            <span className="seg-outrage" style={{ height: `${day.shares.outrage * 100}%` }} />
            <span className="seg-novelty" style={{ height: `${day.shares.novelty * 100}%` }} />
            <span className="seg-grounding" style={{ height: `${day.shares.grounding * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="feed-chart-weeks" aria-hidden="true">
        {['W1', 'W2', 'W3', 'W4', 'W5'].map((label, index) => (
          <span key={label} className={index === focusWeek ? 'is-focused' : undefined}>
            {label}
          </span>
        ))}
      </div>
      <p className="feed-chart-legend">
        <span>
          <i className="feed-swatch seg-outrage" aria-hidden="true" /> conflict
        </span>
        <span>
          <i className="feed-swatch seg-novelty" aria-hidden="true" /> new
        </span>
        <span>
          <i className="feed-swatch seg-grounding" aria-hidden="true" /> context
        </span>
      </p>
      <p className="feed-week-line" aria-live="polite">
        <strong>Week {focusWeek + 1}</strong> · {formatPercent(week.outrage, 0)} conflict ·{' '}
        {formatPercent(week.grounding, 0)} context · {formatCount(week.clicks)} clicks/day
      </p>
      <p className="feed-stage-note">
        Week 1 starts mixed. The same incentives end at {formatPercent(result.weekFive.shares.outrage, 0)}{' '}
        conflict.
      </p>
      <p className="sr-only">
        Chart: conflict rises from {formatPercent(result.weekOne.shares.outrage, 0)} in week one to{' '}
        {formatPercent(result.weekFive.shares.outrage, 0)} in week five. Context falls from{' '}
        {formatPercent(result.weekOne.shares.grounding, 0)} to{' '}
        {formatPercent(result.weekFive.shares.grounding, 0)}.
      </p>
    </div>
  )
}

export function CapStage({
  inputs,
  result,
  capHalf,
  onChange,
}: {
  inputs: FeedDialInputs
  result: FeedResult
  capHalf: number | null
  onChange: (patch: Partial<FeedDialInputs>) => void
}) {
  const paid = inputs.groundingWeight >= CONTEXT_PAYMENT
  const capPct = Math.round(inputs.cap * 100)
  const week = result.weekFive
  const contextLeads = week.shares.grounding > week.shares.outrage

  const copy =
    capPct === 0
      ? `No cap yet. Conflict is ${formatPercent(week.shares.outrage, 0)} of week five. Cap its reach and watch what fills the room.`
      : !paid && week.shares.grounding < week.shares.novelty
        ? 'Conflict falls, but novelty takes the room. Capping makes space; it does not pay for context.'
        : paid && !contextLeads
          ? week.shares.novelty > week.shares.grounding
            ? 'Context is rising, but novelty still takes the room. Cap further, or pay context more.'
            : 'Context is rising, but conflict still leads the week. Cap further, or pay context more.'
          : contextLeads
            ? 'Context leads. Clicks fall with it — a better feed for Bea, a worse scoreboard for the feed.'
            : 'The mix is moving. Keep both hands on the dial.'

  return (
    <div className="paper-ledger feed-stage feed-cap" data-od-id="feed-cap">
      <StageHead label="The cap" stamp="the defense" stampOk />
      <div className="feed-cap-stats">
        <div>
          <span>Conflict · wk 5</span>
          <strong data-od-id="feed-cap-conflict">{formatPercent(week.shares.outrage, 0)}</strong>
        </div>
        <div>
          <span>Context · wk 5</span>
          <strong data-od-id="feed-cap-context">{formatPercent(week.shares.grounding, 0)}</strong>
        </div>
        <div>
          <span>Clicks / day</span>
          <strong data-od-id="feed-cap-clicks">{formatCount(week.clicks)}</strong>
        </div>
      </div>
      <div className="defense-lever feed-cap-lever">
        <div className="lever-labels">
          <label htmlFor="conflict-cap">Cap conflict reach</label>
          <output htmlFor="conflict-cap">{capPct}%</output>
        </div>
        <div className="lever-track">
          {capHalf !== null && capHalf > 0 && capHalf <= 1 && (
            <span
              className="lever-break-even feed-cap-marker"
              data-od-id="feed-cap-marker"
              style={{ left: `${capHalf * 100}%` }}
              aria-hidden="true"
            />
          )}
          <input
            id="conflict-cap"
            type="range"
            min={0}
            max={100}
            step={1}
            value={capPct}
            onChange={(event) => onChange({ cap: Number(event.target.value) / 100 })}
            aria-valuetext={`${capPct}%`}
            aria-describedby="cap-hint"
            style={{ '--range-fill': `${capPct}%` } as CSSProperties}
          />
        </div>
        <p id="cap-hint" className="lever-hint feed-cap-hint">
          {capHalf === null ? 'No cap in this range halves conflict.' : `The marker caps conflict at half its current share: ${Math.round(capHalf * 100)}%.`}
        </p>
      </div>
      <button
        type="button"
        className={`feed-context-toggle${paid ? ' is-on' : ''}`}
        aria-pressed={paid}
        onClick={() =>
          onChange({
            groundingWeight: paid ? DEFAULT_DIAL.groundingWeight : CONTEXT_PAYMENT,
          })
        }
      >
        Pay for context <span>2.5×</span>
      </button>
      <p className="feed-cap-copy">{copy}</p>
    </div>
  )
}
