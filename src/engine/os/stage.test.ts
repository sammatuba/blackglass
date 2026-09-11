import { describe, expect, it } from 'vitest'
import { timeMood } from './Stage'

describe('stage mood', () => {
  it('reads the case clock in 12-hour time', () => {
    expect(timeMood('12:00', 'AM')).toBe('night')
    expect(timeMood('4:59', 'AM')).toBe('night')
    expect(timeMood('5:00', 'AM')).toBe('dawn')
    expect(timeMood('6:47', 'AM')).toBe('dawn') // kangkong, Maya
    expect(timeMood('7:59', 'AM')).toBe('dawn')
    expect(timeMood('8:00', 'AM')).toBe('day')
    expect(timeMood('12:30', 'PM')).toBe('day')
    expect(timeMood('4:59', 'PM')).toBe('day')
    expect(timeMood('5:00', 'PM')).toBe('dusk')
    expect(timeMood('7:59', 'PM')).toBe('dusk')
    expect(timeMood('8:02', 'PM')).toBe('night') // voiceclone, Tita
    expect(timeMood('11:59', 'PM')).toBe('night')
  })

  it('falls back to the night desk on malformed times', () => {
    expect(timeMood('', '')).toBe('night')
  })
})
