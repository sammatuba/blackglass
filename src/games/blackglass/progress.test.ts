import { describe, expect, it } from 'vitest'
import type { CaseOS } from '../../engine/os/types'
import type { AnthologyAnchor } from './types'
import { anchorProgress, type AnchorProgress } from './state'
import {
  allPhonesLived,
  allRuns,
  anchorStats,
  choiceText,
  findChoice,
  globalStats,
  livePhones,
} from './progress'

const phone = (...evidence: string[]) =>
  ({
    photos: evidence.map((e, i) => ({ id: `p${i}`, title: `photo ${i}`, kind: 'meme' as const, evidence: e })),
    pages: [],
    contacts: [],
    rules: [],
  }) as unknown as CaseOS

const anchor = {
  id: 'test',
  title: 'TEST',
  subtitle: 'One Test',
  blurb: 'b',
  question: 'q',
  entry: 'a',
  order: ['a', 'b'],
  phones: { a: phone('ev-a1', 'ev-a2'), b: phone('ev-b1') },
  timeline: { title: 't', intro: 'i', events: [], close: [] },
  reflection: { title: 'r', cards: [], coda: 'c' },
} as unknown as AnthologyAnchor

const progress = (over: Partial<AnchorProgress> = {}): AnchorProgress => ({
  completed: {},
  runs: {},
  evidence: {},
  inspected: {},
  live: {},
  ...over,
})

describe('findChoice / allRuns', () => {
  it('finds a recorded choice in any run', () => {
    const runs = { maya: { maya_choice: 'hearted' }, tita: {} }
    expect(findChoice(runs, 'maya_choice')).toBe('hearted')
    expect(findChoice(runs, 'missing')).toBeUndefined()
  })

  it('merges all anchors with unique run keys', () => {
    const merged = allRuns({
      kangkong: progress({ runs: { maya: { maya_choice: 'asked' } } }),
      fiveweeks: progress({ runs: { bea: { w1: 'sharp' } } }),
    })
    expect(Object.keys(merged)).toEqual(['kangkong:maya', 'fiveweeks:bea'])
    expect(findChoice(merged, 'w1')).toBe('sharp')
  })

  it('normalizes persisted shapes that predate the discovery fields', () => {
    const old = { completed: { a: true }, runs: { a: { x: 1 } } } as unknown as AnchorProgress
    const p = anchorProgress(old)
    expect(p.evidence).toEqual({})
    expect(p.live).toEqual({})
    expect(p.completed.a).toBe(true)
  })
})

describe('choiceText', () => {
  it('falls back when the choice was never recorded', () => {
    expect(choiceText({ dynamic: { key: 'k', fallback: 'fb', map: { x: 'mapped' } } }, {})).toBe('fb')
  })

  it('resolves the recorded choice', () => {
    const runs = { a: { k: 'x' } }
    expect(choiceText({ dynamic: { key: 'k', fallback: 'fb', map: { x: 'mapped' } } }, runs)).toBe('mapped')
  })

  it('falls back for an unmapped value', () => {
    const runs = { a: { k: 'z' } }
    expect(choiceText({ dynamic: { key: 'k', fallback: 'fb', map: { x: 'mapped' } } }, runs)).toBe('fb')
  })
})

describe('anchorStats / globalStats / allPhonesLived', () => {
  it('counts phones, lived runs, and clues found vs total', () => {
    const p = progress({ completed: { a: true }, evidence: { a: ['ev-a1', 'ev-a2'] } })
    expect(anchorStats(anchor, p)).toEqual({ phones: 2, lived: 1, clues: 2, cluesTotal: 3 })
  })

  it('reads as zeros before anything is played', () => {
    expect(anchorStats(anchor, undefined)).toEqual({ phones: 2, lived: 0, clues: 0, cluesTotal: 3 })
  })

  it('sums across anchors and only unlocks when every phone is lived', () => {
    const other = { ...anchor, id: 'other', order: ['c'], phones: { c: phone('ev-c1') } } as unknown as AnthologyAnchor
    const partial = { test: progress({ completed: { a: true, b: true } }), other: progress() }
    expect(globalStats([anchor, other], partial)).toEqual({ phones: 3, lived: 2, clues: 0, cluesTotal: 4 })
    expect(allPhonesLived([anchor, other], partial)).toBe(false)
    const full = { test: progress({ completed: { a: true, b: true } }), other: progress({ completed: { c: true } }) }
    expect(allPhonesLived([anchor, other], full)).toBe(true)
  })
})

describe('livePhones', () => {
  it('lists picked-up phones that are not yet lived', () => {
    const live = { a: {} } as unknown as AnchorProgress['live']
    const p = progress({ live, completed: { b: true } })
    expect(livePhones(anchor, p)).toEqual(['a'])
  })

  it('drops a live slot once the phone is lived', () => {
    const live = { a: {} } as unknown as AnchorProgress['live']
    const p = progress({ live, completed: { a: true } })
    expect(livePhones(anchor, p)).toEqual([])
  })
})
