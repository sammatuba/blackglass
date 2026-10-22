import { describe, expect, it } from 'vitest'
import { PRESETS, computeScam, matchesPreset } from './model'

describe('computeScam', () => {
  it('lands the default AI line on one in a thousand', () => {
    const r = computeScam(PRESETS.ai)
    expect(r.replies).toBeCloseTo(250)
    expect(r.payments).toBeCloseTo(25)
    expect(r.gross).toBeCloseTo(462_500)
    expect(r.cost).toBeCloseTo(12_500)
    expect(r.profit).toBeCloseTo(450_000)
    expect(r.messagesPerPayment).toBeCloseTo(1_000)
    expect(r.breakEvenVerifyShare ?? 0).toBeCloseTo(0.9828, 4)
  })

  it('shows the human crew thin and brittle', () => {
    const r = computeScam(PRESETS.human)
    expect(r.payments).toBeCloseTo(0.2)
    expect(r.profit).toBeCloseTo(500)
    expect(r.messagesPerPayment).toBeCloseTo(2_000)
    expect(r.breakEvenVerifyShare ?? 0).toBeCloseTo(0.1365, 4)
  })

  it('kills the AI line at universal verification', () => {
    const r = computeScam({ ...PRESETS.ai, verifyShare: 1 })
    expect(r.payments).toBeCloseTo(0.25)
    expect(r.profit).toBeLessThan(0)
    expect(r.messagesPerPayment).toBeCloseTo(100_000)
  })

  it('moves the break-even when the machine gets cheaper', () => {
    const human = computeScam(PRESETS.human)
    const ai = computeScam(PRESETS.ai)
    expect(ai.breakEvenVerifyShare ?? 0).toBeGreaterThan(human.breakEvenVerifyShare ?? 0)
  })

  it('reports a line that is already dead or immune to verification', () => {
    const dead = computeScam({ ...PRESETS.ai, costPerMessage: 100 })
    expect(dead.profit).toBeLessThan(0)
    expect(dead.breakEvenVerifyShare).toBe(0)

    const immune = computeScam({ ...PRESETS.ai, costPerMessage: 0.01 })
    expect(immune.profit).toBeGreaterThan(0)
    expect(immune.breakEvenVerifyShare).toBeNull()
  })

  it('treats presets as the machine, not the defense lever', () => {
    expect(matchesPreset({ ...PRESETS.ai, verifyShare: 0.5 }, PRESETS.ai)).toBe(true)
    expect(matchesPreset({ ...PRESETS.ai, reach: 20_000 }, PRESETS.ai)).toBe(false)
  })
})
