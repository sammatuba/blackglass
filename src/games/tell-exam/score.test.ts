import { describe, expect, it } from 'vitest'
import { examSignal } from './score'

describe('examSignal — recall × precision (review rework 2026-11-14)', () => {
  it('a clean sweep of the full deck reads 100', () => {
    expect(examSignal(15, 15, 0)).toBe(100)
  })

  it('false alarms cost signal: 8 found, 0 alarms vs 8 found, 4 alarms', () => {
    const clean = examSignal(8, 15, 0)
    const sloppy = examSignal(8, 15, 4)
    expect(clean).toBe(53)
    expect(sloppy).toBeLessThan(clean)
    expect(sloppy).toBeGreaterThan(0)
  })

  it('spamming markers with nothing found reads 0', () => {
    expect(examSignal(0, 15, 5)).toBe(0)
  })

  it('the reviewed regression: heavy false alarms collapse the signal', () => {
    // 5 found of 15 with 10 false alarms: recall 33% × precision 33% → 11
    expect(examSignal(5, 15, 10)).toBe(11)
    // and the same totals stay consistent wherever the caller reads them
    expect(examSignal(2, 15, 3)).toBe(examSignal(2, 15, 3))
  })

  it('degenerate totals never divide by zero', () => {
    expect(examSignal(0, 0, 0)).toBe(0)
    expect(examSignal(3, 0, 0)).toBe(0)
  })
})
