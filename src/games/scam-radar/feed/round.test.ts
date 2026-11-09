import { describe, expect, it } from 'vitest'
import { FEED_ITEMS } from './items'
import { buildRound, judge, readMax, signalFor } from './round'

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
})
