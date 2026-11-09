import { beforeEach, describe, expect, it } from 'vitest'
import type { CaseOS, OSState } from '../../engine/os/types'
import { KANGKONG } from './content/kangkong'
import { VOICECLONE } from './content/voiceclone'
import { DEEPFAKE } from './content/deepfake'
import { FIVEWEEKS } from './content/fiveweeks'
import { ASSISTANT } from './content/assistant'
import {
  CASE_GAMES,
  GRADE_NAME,
  caseGame,
  clueLabel,
  gradeFor,
  rankFor,
  scoreRun,
  tensionLevel,
  type CaseGame,
} from './score'
import { useBlackglass } from './state'
import { evidenceIds } from '../../engine/os/runtime'

const fixture = (over: Partial<CaseOS> = {}): CaseOS =>
  ({
    id: 'fixture',
    photos: [
      { id: 'p1', evidence: 'ev-one' },
      { id: 'p2', evidence: 'ev-two' },
    ],
    pages: [{ id: 'pg1', evidence: 'ev-three' }],
    contacts: [],
    replies: [
      { id: 'r1', threadId: 't', label: 'Verify it', set: {} },
      { id: 'r2', threadId: 't', label: 'Risk it', set: {} },
    ],
    rules: [],
    evidenceLabels: { 'ev-one': 'The screenshot' },
    ...over,
  }) as unknown as CaseOS

const game: CaseGame = {
  objective: 'o',
  stakes: 's',
  tensionName: 'PRESSURE',
  tension: [
    { flag: 'a', at: 0.25, label: 'first' },
    { flag: 'b', at: 0.6, label: 'second' },
    { flag: 'c', at: 1, label: 'last' },
  ],
  moveMax: 50,
  moves: {
    r1: { kind: 'verify', points: 50, note: 'checked' },
    r2: { kind: 'risk', points: 5, note: 'risky' },
  },
  outcomes: [{ match: { x: 'yes' }, text: 'matched outcome' }],
  outcomeFallback: 'fallback outcome',
}

const state = (over: Partial<OSState> = {}): OSState =>
  ({
    inbox: [],
    flags: {},
    applied: [],
    sentReplies: [],
    inspected: [],
    evidence: [],
    ai: {},
    call: null,
    moment: null,
    done: false,
    ...over,
  }) as unknown as OSState

describe('gradeFor', () => {
  it('stamps the four signal grades at their thresholds', () => {
    expect(gradeFor(100)).toBe('S')
    expect(gradeFor(85)).toBe('S')
    expect(gradeFor(84)).toBe('A')
    expect(gradeFor(70)).toBe('A')
    expect(gradeFor(69)).toBe('B')
    expect(gradeFor(50)).toBe('B')
    expect(gradeFor(49)).toBe('C')
    expect(gradeFor(0)).toBe('C')
    expect(GRADE_NAME.S).toBe('CRYSTAL')
    expect(GRADE_NAME.C).toBe('FOGGED')
  })
})

describe('clueLabel', () => {
  it('prefers the authored label and humanizes the rest', () => {
    expect(clueLabel(fixture(), 'ev-one')).toBe('The screenshot')
    expect(clueLabel(fixture(), 'ev-the-voice-note')).toBe('the voice note')
  })
})

describe('scoreRun', () => {
  it('splits the signal into clues seen and reflexes practiced', () => {
    const s = scoreRun(fixture(), game, state({ evidence: ['ev-one', 'ev-two'], sentReplies: ['r1'], flags: { x: 'yes' } }))
    expect(s.cluesFound).toBe(2)
    expect(s.cluesTotal).toBe(3)
    expect(s.cluePoints).toBe(33) // round(2/3 * 50)
    expect(s.reflexPoints).toBe(50)
    expect(s.reflexScaled).toBe(50)
    expect(s.total).toBe(83)
    expect(s.grade).toBe('A')
    expect(s.missed).toEqual(['three'])
    expect(s.outcome).toBe('matched outcome')
    expect(s.moves).toEqual([{ id: 'r1', label: 'Verify it', kind: 'verify', points: 50, note: 'checked' }])
  })

  it('reads as zero before anything is seen or sent', () => {
    const s = scoreRun(fixture(), game, state())
    expect(s.total).toBe(0)
    expect(s.grade).toBe('C')
    expect(s.cluesFound).toBe(0)
    expect(s.moves).toEqual([])
    expect(s.missed).toEqual(['The screenshot', 'two', 'three'])
    expect(s.outcome).toBe('fallback outcome')
  })

  it('lets reflexes carry the full signal when the case has no clues', () => {
    const clueless = fixture({ photos: [], pages: [] })
    const s = scoreRun(clueless, game, state({ sentReplies: ['r1'] }))
    expect(s.cluesTotal).toBe(0)
    expect(s.cluePoints).toBe(0)
    expect(s.reflexScaled).toBe(100)
    expect(s.total).toBe(100)
    expect(s.grade).toBe('S')
    expect(s.missed).toEqual([])
  })

  it('caps the signal at 100 and treats unweighted replies as neutral', () => {
    const s = scoreRun(fixture(), game, state({ evidence: ['ev-one', 'ev-two', 'ev-three'], sentReplies: ['r1', 'r2'] }))
    expect(s.reflexPoints).toBe(55)
    expect(s.total).toBe(100)
    expect(s.moves[1].kind).toBe('risk')
    const unweighted = scoreRun(fixture(), { ...game, moves: {} }, state({ sentReplies: ['r1'] }))
    expect(unweighted.moves[0]).toMatchObject({ kind: 'neutral', points: 0 })
  })

  it('counts checked citations as clues — sources and their alternates are collectible', () => {
    const src = (id: string) => ({ id, ref: 'A journal, 2023', verdict: 'missing' as const, detail: 'd', evidence: `ev-${id}` })
    const cased = fixture({
      photos: [],
      pages: [],
      opening: [{ threadId: 't', msg: { kind: 'text', text: 'x', sources: [src('s1')] } }],
      rules: [
        { id: 'ru1', when: {}, push: [{ threadId: 't', msg: { kind: 'ai', text: 'y', sources: [src('s2')] } }] },
        {
          id: 'ru2',
          when: {},
          push: [{ threadId: 't', msg: { kind: 'ai', text: 'z', variants: { regen: [{ text: 'r', sources: [src('s3')] }] } } }],
        },
      ],
    })
    const s = scoreRun(cased, game, state({ evidence: ['ev-s1', 'ev-s3'] }))
    expect(s.cluesTotal).toBe(3)
    expect(s.cluesFound).toBe(2)
    expect(s.cluePoints).toBe(33)
    expect(s.missed).toEqual(['s2'])
  })
})

describe('tensionLevel', () => {
  it('ratchets to the highest authored step that has landed', () => {
    expect(tensionLevel(game, {})).toEqual({ ratio: 0, label: 'quiet' })
    expect(tensionLevel(game, { a: true })).toEqual({ ratio: 0.25, label: 'first' })
    expect(tensionLevel(game, { a: true, c: true })).toEqual({ ratio: 1, label: 'last' })
    expect(tensionLevel(game, { b: 'sharp' })).toEqual({ ratio: 0.6, label: 'second' })
  })
})

describe('rankFor', () => {
  it('names the season by best-signal total, but only once a phone is lived', () => {
    expect(rankFor(0, 0)).toBe('NEW SIGNAL')
    expect(rankFor(900, 0)).toBe('NEW SIGNAL')
    expect(rankFor(10, 1)).toBe('WATCHER')
    expect(rankFor(299, 3)).toBe('WATCHER')
    expect(rankFor(300, 3)).toBe('PATTERN READER')
    expect(rankFor(600, 6)).toBe('SEER')
    expect(rankFor(900, 9)).toBe('CLEAR-EYED')
  })
})

describe('the authored case files', () => {
  const anchors = [KANGKONG, VOICECLONE, DEEPFAKE, FIVEWEEKS, ASSISTANT]

  it('covers every phone in the anthology', () => {
    for (const anchor of anchors) {
      for (const phone of Object.values(anchor.phones)) {
        expect(caseGame(phone.id), `${phone.id} has no case file`).toBeDefined()
      }
    }
    expect(Object.keys(CASE_GAMES)).toHaveLength(13)
  })

  it('weights every reply the player can send', () => {
    for (const anchor of anchors) {
      for (const phone of Object.values(anchor.phones)) {
        const g = caseGame(phone.id)!
        for (const reply of phone.replies) {
          expect(g.moves[reply.id], `${phone.id} / ${reply.id} unweighted`).toBeDefined()
          expect(g.moves[reply.id].points).toBeGreaterThanOrEqual(0)
        }
        expect(g.moveMax).toBeGreaterThan(0)
        expect(g.moveMax).toBeLessThanOrEqual(Object.values(g.moves).reduce((n, m) => n + m.points, 0))
        expect(g.objective.length).toBeGreaterThan(10)
        expect(g.stakes.length).toBeGreaterThan(10)
        expect(g.outcomes.length).toBeGreaterThan(0)
        expect(g.outcomeFallback.length).toBeGreaterThan(10)
      }
    }
  })

  it('keeps tension steps inside the meter and ending at full', () => {
    for (const g of Object.values(CASE_GAMES)) {
      expect(g.tension.length).toBeGreaterThan(1)
      for (const step of g.tension) {
        expect(step.at).toBeGreaterThan(0)
        expect(step.at).toBeLessThanOrEqual(1)
        expect(step.label.length).toBeGreaterThan(0)
      }
      expect(g.tension[g.tension.length - 1].at).toBe(1)
    }
  })

  it('collects every authored citation check — no source clue is lost to scoring', () => {
    const sweep = (
      m:
        | {
            sources?: { evidence?: string }[]
            variants?: { regen?: { sources?: { evidence?: string }[] }[]; thumbs?: { sources?: { evidence?: string }[] } }
          }
        | undefined,
      into: Set<string>,
    ) => {
      for (const s of m?.sources ?? []) if (s.evidence) into.add(s.evidence)
      for (const v of m?.variants?.regen ?? []) for (const s of v.sources ?? []) if (s.evidence) into.add(s.evidence)
      for (const s of m?.variants?.thumbs?.sources ?? []) if (s.evidence) into.add(s.evidence)
    }
    let sourceClues = 0
    for (const anchor of anchors) {
      for (const phone of Object.values(anchor.phones)) {
        const ids = new Set(evidenceIds(phone))
        const sourceIds = new Set<string>()
        for (const o of phone.opening) sweep(o.msg, sourceIds)
        for (const r of phone.rules) for (const p of r.push ?? []) sweep(p.msg, sourceIds)
        for (const id of sourceIds) {
          sourceClues++
          expect(ids.has(id), `${phone.id} loses source clue ${id}`).toBe(true)
        }
      }
    }
    expect(sourceClues).toBeGreaterThanOrEqual(18) // the Ask surface's authored citations
  })
})

describe('recordScore', () => {
  beforeEach(() => {
    useBlackglass.getState().reset()
  })

  it('keeps the best signal and counts every play', () => {
    const { recordScore } = useBlackglass.getState()
    recordScore('kangkong', 'maya', 40, 'C')
    recordScore('kangkong', 'maya', 80, 'A')
    recordScore('kangkong', 'maya', 60, 'B')
    expect(useBlackglass.getState().anchors.kangkong.scores.maya).toEqual({ best: 80, grade: 'A', plays: 3 })
  })

  it('stamps the grade of a new best', () => {
    const { recordScore } = useBlackglass.getState()
    recordScore('voiceclone', 'tita', 30, 'C')
    recordScore('voiceclone', 'tita', 90, 'S')
    expect(useBlackglass.getState().anchors.voiceclone.scores.tita).toEqual({ best: 90, grade: 'S', plays: 2 })
  })
})