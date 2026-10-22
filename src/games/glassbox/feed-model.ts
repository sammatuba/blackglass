/* Glassbox 02 — the attention loop behind Bea's feed.

   Creators supply what the ranking pays for. The model is deliberately
   small: three genres, three weights, a cap, and thirty-five days of
   gradual adaptation. Illustrative rates, not a forecast. */

export const FEED_DAYS = 35
export const FEED_SLOTS = 60
export const CONTEXT_PAYMENT = 2.5

export const FEED_GENRES = ['outrage', 'novelty', 'grounding'] as const
export type FeedGenre = (typeof FEED_GENRES)[number]
export type FeedShares = Record<FeedGenre, number>

export const BASE_CLICK_RATE: FeedShares = {
  outrage: 0.22,
  novelty: 0.13,
  grounding: 0.06,
}

const INITIAL_SHARES: FeedShares = {
  outrage: 0.34,
  novelty: 0.33,
  grounding: 0.33,
}

const SENSITIVITY = 4
const ADAPTATION = 0.12

export interface FeedDialInputs {
  /** How hard the ranking boosts callouts and dunks. */
  outrageWeight: number
  /** How hard it boosts new and strange. */
  noveltyWeight: number
  /** How hard it boosts follow-up, verification, and context. */
  groundingWeight: number
  /** Share of conflict's boost the platform refuses to sell. 0–1. */
  cap: number
}

export const DEFAULT_DIAL: FeedDialInputs = {
  outrageWeight: 2,
  noveltyWeight: 1,
  groundingWeight: 0.4,
  cap: 0,
}

export interface FeedDay {
  day: number
  shares: FeedShares
  clicks: number
}

export interface FeedSummary {
  shares: FeedShares
  clicks: number
}

export interface FeedResult {
  days: FeedDay[]
  weekOne: FeedSummary
  weekFive: FeedSummary
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

function normalize(shares: FeedShares): FeedShares {
  const total = shares.outrage + shares.novelty + shares.grounding
  if (!(total > 0)) return { outrage: 1 / 3, novelty: 1 / 3, grounding: 1 / 3 }
  return {
    outrage: shares.outrage / total,
    novelty: shares.novelty / total,
    grounding: shares.grounding / total,
  }
}

/** Where creators would rather be if the weights held forever. */
function targetShares(inputs: FeedDialInputs): FeedShares {
  const cap = 1 - clamp01(inputs.cap)
  const payoff = {
    outrage: BASE_CLICK_RATE.outrage * Math.max(0, inputs.outrageWeight) * cap,
    novelty: BASE_CLICK_RATE.novelty * Math.max(0, inputs.noveltyWeight),
    grounding: BASE_CLICK_RATE.grounding * Math.max(0, inputs.groundingWeight),
  }
  const weight = {
    outrage: Math.exp(SENSITIVITY * payoff.outrage),
    novelty: Math.exp(SENSITIVITY * payoff.novelty),
    grounding: Math.exp(SENSITIVITY * payoff.grounding),
  }
  return normalize(weight)
}

function clickRate(shares: FeedShares): number {
  return (
    shares.outrage * BASE_CLICK_RATE.outrage +
    shares.novelty * BASE_CLICK_RATE.novelty +
    shares.grounding * BASE_CLICK_RATE.grounding
  )
}

function summarize(days: FeedDay[]): FeedSummary {
  const total = days.length
  const shares = days.reduce<FeedShares>(
    (sum, day) => ({
      outrage: sum.outrage + day.shares.outrage / total,
      novelty: sum.novelty + day.shares.novelty / total,
      grounding: sum.grounding + day.shares.grounding / total,
    }),
    { outrage: 0, novelty: 0, grounding: 0 },
  )
  const clicks = days.reduce((sum, day) => sum + day.clicks / total, 0)
  return { shares: normalize(shares), clicks }
}

export function simulateFeed(inputs: FeedDialInputs): FeedResult {
  const target = targetShares(inputs)
  let shares: FeedShares = { ...INITIAL_SHARES }
  const days: FeedDay[] = []

  for (let day = 1; day <= FEED_DAYS; day++) {
    days.push({ day, shares: { ...shares }, clicks: clickRate(shares) * FEED_SLOTS })
    shares = {
      outrage: shares.outrage + (target.outrage - shares.outrage) * ADAPTATION,
      novelty: shares.novelty + (target.novelty - shares.novelty) * ADAPTATION,
      grounding: shares.grounding + (target.grounding - shares.grounding) * ADAPTATION,
    }
  }

  return {
    days,
    weekOne: summarize(days.slice(0, 7)),
    weekFive: summarize(days.slice(-7)),
  }
}

/** The cap at which week-five conflict falls to half its uncapped share. */
export function capToHalveConflict(inputs: FeedDialInputs): number | null {
  const baseline = simulateFeed({ ...inputs, cap: 0 }).weekFive.shares.outrage
  if (baseline <= 0) return null
  for (let percent = 0; percent <= 100; percent++) {
    const share = simulateFeed({ ...inputs, cap: percent / 100 }).weekFive.shares.outrage
    if (share <= baseline / 2) return percent / 100
  }
  return null
}
