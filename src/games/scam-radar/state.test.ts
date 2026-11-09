import { beforeEach, describe, expect, it } from 'vitest'
import { useRadar } from './state'

/* the case record: every worked run keeps its best; lifetime points are
   awarded exactly once — replays never farm the score, and a 0-point
   completion still counts as worked */
describe('completeCase', () => {
  beforeEach(() => {
    useRadar.setState({ totalScore: 0, cases: {} })
  })

  it('records the first completion and awards its points', () => {
    useRadar.getState().completeCase('voice', 45)
    expect(useRadar.getState().cases.voice).toBe(45)
    expect(useRadar.getState().totalScore).toBe(45)
  })

  it('a better replay updates the record without re-awarding points', () => {
    useRadar.getState().completeCase('voice', 45)
    useRadar.getState().completeCase('voice', 58)
    expect(useRadar.getState().cases.voice).toBe(58)
    expect(useRadar.getState().totalScore).toBe(45)
  })

  it('a worse replay keeps the best', () => {
    useRadar.getState().completeCase('voice', 58)
    useRadar.getState().completeCase('voice', 12)
    expect(useRadar.getState().cases.voice).toBe(58)
    expect(useRadar.getState().totalScore).toBe(58)
  })

  it('a 0-point completion is still worked, and legacy boolean saves upgrade', () => {
    useRadar.getState().completeCase('on-hold', 0)
    expect(useRadar.getState().cases['on-hold']).toBe(0)
    expect(useRadar.getState().totalScore).toBe(0)

    useRadar.setState({ cases: { voice: true as boolean | number } })
    useRadar.getState().completeCase('voice', 47)
    expect(useRadar.getState().cases.voice).toBe(47)
    // a legacy `true` save already earned its points under the old store —
    // the upgrade fixes the record, it never re-awards
    expect(useRadar.getState().totalScore).toBe(0)
  })
})
