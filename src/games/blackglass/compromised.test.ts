import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { COMPROMISED } from './content/compromised'

/* P5/P6 — the draft anchor is gated, labeled, and structurally sound.
   These guards run in npm test so the draft can never silently leak into
   the live season or lose its DRAFT labeling. */

describe('anchor VI draft gating (P5)', () => {
  it('the live season never includes the draft anchor', () => {
    const src = readFileSync(join(process.cwd(), 'src/games/blackglass/index.tsx'), 'utf-8')
    const liveLine = src.match(/const ANCHORS = \[[^\]]*\]/)?.[0] ?? ''
    expect(liveLine).not.toContain('COMPROMISED')
    expect(src).toContain("?draft=vi")
    expect(src).toContain('get(\'draft\')')
  })

  it('the module carries DRAFT labeling everywhere canon will land', () => {
    const src = readFileSync(join(process.cwd(), 'src/games/blackglass/content/compromised.ts'), 'utf-8')
    const drafts = src.match(/DRAFT/g)?.length ?? 0
    expect(drafts, 'the draft anchor must be visibly marked DRAFT in code').toBeGreaterThan(20)
    expect(src).toContain('detection/recovery only')
    expect(src).toContain('TBC')
  })

  it('the inversion engine is wired: ghost tile, stages, screen-time, ledger, silence', () => {
    const phone = COMPROMISED.phones[COMPROMISED.entry]
    // the disguised tile opens a real page
    expect(phone.phone.ghostTiles).toHaveLength(1)
    const ghost = phone.phone.ghostTiles![0]
    expect(ghost.pageId, 'the ghost tile must open an authored page').toBeDefined()
    expect(phone.pages.some((p) => p.id === ghost.pageId)).toBe(true)
    // the P4 stages drive the infection: clean start, uneasy per anomaly, compromised on assembly
    expect(phone.phone.stage).toBe('clean')
    expect(phone.rules.filter((r) => r.stage === 'uneasy').length).toBeGreaterThanOrEqual(3)
    expect(phone.rules.some((r) => r.stage === 'compromised' && r.when.allFlags?.length === 3)).toBe(true)
    // anomaly surfaces: screen-time rows, ledger rows with meta, the forwarding page, ghost sends
    expect(phone.screentime?.some((s) => s.note?.includes('2:58'))).toBe(true)
    expect(phone.wallet?.rows.some((r) => r.meta && r.note === 'you were asleep')).toBe(true)
    expect(phone.pages.some((p) => p.id === 'mail-forward')).toBe(true)
    expect(phone.opening.some((m) => m.msg.from === 'you')).toBe(true) // messages you didn't send
    // the P8 silence beat rides the 3:47 sends
    expect(phone.opening.some((m) => m.msg.kind === 'silence' && m.msg.receipt)).toBe(true)
    // the mirror epilogue exists and completes the case
    expect(phone.moments?.some((m) => m.id === 'own-report')).toBe(true)
    expect(phone.endFlag).toBe('own_done')
    // the recovery page stays inside the guardrail: signs + first moves, no tools
    const guide = phone.pages.find((p) => p.id === 'spotcheck')!
    expect(guide.body?.some((b) => b.includes('from a DIFFERENT device'))).toBe(true)
  })
})
