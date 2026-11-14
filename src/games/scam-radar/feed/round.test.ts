import { describe, expect, it } from 'vitest'
import type { FamilyId } from '../families'
import { FEED_ITEMS } from './items'
import { buildRound, judge, readMax, signalFor, VERDICT_PAIRS } from './round'
import type { FamilyRecord } from '../state'

const ZERO_MASTERY = {} as Record<FamilyId, FamilyRecord>

describe('readMax / signalFor', () => {
  it('the honest maximum includes the streak bonus on both sides', () => {
    expect(readMax(0)).toBe(10)
    expect(readMax(5)).toBe(20)
    expect(readMax(9)).toBe(20) // streak bonus caps at 5
  })

  it('a perfect round signals 100 — bonus included', () => {
    // five straight hits with a growing streak: 10+12+14+16+18 = 70 of 70
    const pts = [0, 1, 2, 3, 4].reduce((n, s) => n + (10 + 2 * Math.min(s, 5)), 0)
    const max = [0, 1, 2, 3, 4].reduce((n, s) => n + readMax(s), 0)
    expect(pts).toBe(max)
    expect(signalFor(pts, max)).toBe(100)
  })

  it('a mixed round reads proportionally and never over 100', () => {
    expect(signalFor(35, 70)).toBe(50)
    expect(signalFor(200, 70)).toBe(100)
    expect(signalFor(0, 0)).toBe(0)
  })
})

describe('judge', () => {
  const scam = FEED_ITEMS.find((i) => i.id === 'psa-case')!

  it('exact verdict is a hit with the streak bonus', () => {
    const r = judge(scam, 'scam', 3)
    expect(r.quality).toBe('hit')
    expect(r.points).toBe(16)
  })

  it('scam-for-verify is the half read; legit-for-scam is a miss', () => {
    expect(judge(scam, 'verify', 0).quality).toBe('partial')
    expect(judge(scam, 'verify', 0).points).toBe(5)
    expect(judge(scam, 'legit', 0).quality).toBe('miss')
    expect(judge(scam, 'legit', 0).points).toBe(0)
  })
})

describe('buildRound', () => {
  it('keeps the desk mix: 5 scams, 3 legit, 2 verify when the pool allows', () => {
    const round = buildRound(
      { urgency: { seen: 0, hit: 0 }, authority: { seen: 0, hit: 0 }, payment: { seen: 0, hit: 0 }, toogood: { seen: 0, hit: 0 }, emotion: { seen: 0, hit: 0 }, channel: { seen: 0, hit: 0 } },
    )
    expect(round).toHaveLength(10)
    const count = (v: string) => round.filter((i) => i.verdict === v).length
    expect(count('scam')).toBe(5)
    expect(count('legit')).toBe(3)
    expect(count('verify')).toBe(2)
  })

  it('never opens the round with a verify — the warm-up invariant the old comment claimed', () => {
    for (let i = 0; i < 40; i++) {
      expect(buildRound(ZERO_MASTERY)[0].verdict).not.toBe('verify')
    }
  })

  it('ramps: no level-3 read appears before a level-1 read', () => {
    for (let i = 0; i < 40; i++) {
      const round = buildRound(ZERO_MASTERY)
      const firstL1 = round.findIndex((x) => x.level === 1)
      const firstL3 = round.findIndex((x) => x.level === 3)
      if (firstL1 !== -1 && firstL3 !== -1) expect(firstL1).toBeLessThan(firstL3)
    }
  })

  it('the first-shift warm-up: 3 gentle reads, no verify, scams from level 1', () => {
    for (let i = 0; i < 20; i++) {
      const round = buildRound(ZERO_MASTERY, 10, { warmup: true })
      expect(round).toHaveLength(3)
      expect(round.some((x) => x.verdict === 'verify')).toBe(false)
      expect(round.filter((x) => x.verdict === 'scam').every((x) => x.level === 1)).toBe(true)
      expect(round.filter((x) => x.verdict === 'legit').length).toBe(1)
    }
  })

  it('subsequent shifts keep the full 10-read quota (warmup only once)', () => {
    const round = buildRound(ZERO_MASTERY, 10, {})
    expect(round).toHaveLength(10)
    expect(round.filter((x) => x.verdict === 'verify').length).toBe(2)
  })
})

describe('judge — the taught habit must not be punished (2026-11-13)', () => {
  const legit = FEED_ITEMS.find((i) => i.verdict === 'legit')!

  it('verify-first on a genuinely legit message is over-caution, not a miss', () => {
    const r = judge(legit, 'verify', 0)
    expect(r.quality).toBe('partial')
    expect(r.points).toBe(5)
    expect(r.banner).toBe('Right instinct — half read')
  })

  it('calling a scam legit stays a full miss (and the pairs table stays honest)', () => {
    const scam = FEED_ITEMS.find((i) => i.verdict === 'scam')!
    expect(judge(scam, 'legit', 0).quality).toBe('miss')
    // pairs are [answer, correct verdict]: verify answered on legit = over-caution
    expect(VERDICT_PAIRS).toContainEqual(['verify', 'legit'])
    expect(VERDICT_PAIRS).not.toContainEqual(['legit', 'scam'])
  })
})
