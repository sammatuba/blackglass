import { afterEach, describe, expect, it, vi } from 'vitest'
import { bannerMs, continueMs, openingMs, paceSpeed, proseMs, scaled, setPaceSpeed, typingMs } from './pacing'

describe('human cadence', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('types a message for longer when it is longer, inside human bounds', () => {
    for (let i = 0; i < 40; i++) {
      expect(typingMs('ok')).toBeGreaterThanOrEqual(700)
      expect(typingMs('a'.repeat(300))).toBeLessThanOrEqual(3400)
    }
    expect(typingMs('a'.repeat(60))).toBeGreaterThan(typingMs('a'.repeat(5)))
  })

  it('moves a burst along without making it instant', () => {
    for (let i = 0; i < 40; i++) {
      expect(continueMs()).toBeGreaterThanOrEqual(380)
      expect(continueMs()).toBeLessThanOrEqual(980)
    }
  })

  it('gives prose reading air and openings a quick first buzz', () => {
    expect(openingMs('', true)).toBe(650)
    for (let i = 0; i < 40; i++) {
      expect(proseMs('x'.repeat(80))).toBeGreaterThanOrEqual(1000)
      expect(proseMs('x'.repeat(400))).toBeLessThanOrEqual(3100)
      expect(openingMs('a'.repeat(200), false)).toBeGreaterThanOrEqual(1500)
      expect(openingMs('a'.repeat(200), false)).toBeLessThanOrEqual(2500)
    }
  })

  it('keeps banners up long enough to read, bounded', () => {
    expect(bannerMs('')).toBeGreaterThanOrEqual(2800)
    expect(bannerMs('x'.repeat(500))).toBeLessThanOrEqual(6500)
  })

  it('scales by pace and never sleeps below a frame', () => {
    expect(scaled(2000, 2)).toBe(1000)
    expect(scaled(2000, 8)).toBe(250)
    expect(scaled(10, 1)).toBe(40)
  })

  it('defaults to normal pace and reads the stored multiplier', () => {
    expect(paceSpeed()).toBe(1)
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => (k === 'cgAI_glassos_pace' ? '1.5' : null),
      setItem: vi.fn(),
    } as unknown as Storage)
    expect(paceSpeed()).toBe(1.5)
    setPaceSpeed(0.75)
    expect(localStorage.setItem).toHaveBeenCalledWith('cgAI_glassos_pace', '0.75')
  })
})
