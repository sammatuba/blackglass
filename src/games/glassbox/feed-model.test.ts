import { describe, expect, it } from 'vitest'
import {
  CONTEXT_PAYMENT,
  DEFAULT_DIAL,
  FEED_DAYS,
  capToHalveConflict,
  simulateFeed,
} from './feed-model'

describe('simulateFeed', () => {
  it('runs five weeks and starts on a mixed feed', () => {
    const result = simulateFeed(DEFAULT_DIAL)
    expect(result.days).toHaveLength(FEED_DAYS)
    expect(result.days[0].shares.outrage).toBeCloseTo(0.34, 4)
    expect(result.days[0].shares.grounding).toBeCloseTo(0.33, 4)
  })

  it('drifts toward conflict and away from context at the default dials', () => {
    const result = simulateFeed(DEFAULT_DIAL)
    expect(result.weekFive.shares.outrage).toBeGreaterThan(result.weekOne.shares.outrage)
    expect(result.weekFive.shares.grounding).toBeLessThan(result.weekOne.shares.grounding)
    expect(result.weekFive.clicks).toBeGreaterThan(result.weekOne.clicks)
  })

  it('keeps every day normalized and finite', () => {
    for (const day of simulateFeed(DEFAULT_DIAL).days) {
      const total = day.shares.outrage + day.shares.novelty + day.shares.grounding
      expect(total).toBeCloseTo(1, 6)
      expect(Number.isFinite(day.clicks)).toBe(true)
    }
  })

  it('lets novelty take the room when conflict is capped alone', () => {
    const capped = simulateFeed({ ...DEFAULT_DIAL, cap: 1 }).weekFive
    expect(capped.shares.outrage).toBeLessThan(0.3)
    expect(capped.shares.grounding).toBeLessThan(capped.shares.novelty)
  })

  it('makes context lead only when the cap and context payment work together', () => {
    const paid = simulateFeed({
      ...DEFAULT_DIAL,
      cap: 1,
      groundingWeight: CONTEXT_PAYMENT,
    }).weekFive
    const def = simulateFeed(DEFAULT_DIAL).weekFive
    expect(paid.shares.grounding).toBeGreaterThan(paid.shares.novelty)
    expect(paid.shares.grounding).toBeGreaterThan(paid.shares.outrage)
    expect(paid.shares.outrage).toBeLessThan(def.shares.outrage)
    expect(paid.clicks).toBeLessThan(def.clicks)
  })

  it('survives zeroed weights without inventing a genre', () => {
    const result = simulateFeed({
      ...DEFAULT_DIAL,
      outrageWeight: 0,
      noveltyWeight: 0,
      groundingWeight: 0,
    })
    expect(result.weekFive.shares.outrage).toBeCloseTo(1 / 3, 2)
    expect(result.weekFive.clicks).toBeGreaterThan(0)
  })
})

describe('capToHalveConflict', () => {
  it('finds a real cap for the default dials', () => {
    const cap = capToHalveConflict(DEFAULT_DIAL)
    expect(cap).not.toBeNull()
    expect(cap ?? 0).toBeGreaterThan(0.6)
    expect(cap ?? 0).toBeLessThanOrEqual(1)
  })

  it('moves later when context is paid for', () => {
    const plain = capToHalveConflict(DEFAULT_DIAL) ?? 0
    const paid = capToHalveConflict({ ...DEFAULT_DIAL, groundingWeight: CONTEXT_PAYMENT }) ?? 0
    expect(paid).toBeLessThanOrEqual(plain)
  })
})
