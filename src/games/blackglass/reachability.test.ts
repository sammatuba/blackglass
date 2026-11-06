import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { KANGKONG } from './content/kangkong'
import { VOICECLONE } from './content/voiceclone'
import { DEEPFAKE } from './content/deepfake'
import { FIVEWEEKS } from './content/fiveweeks'
import { ASSISTANT } from './content/assistant'
import { COMPROMISED } from './content/compromised'
import { auditAnchors, auditPhone, ledgerMarkdown } from './reachability'

/* P9 — reachability is the quality bar. The walk runs on every `npm test`;
   it asserts the season is green and regenerates docs/REACHABILITY-LEDGER.md
   (committed) so the path evidence is reviewable. */

const ANCHORS = [KANGKONG, VOICECLONE, DEEPFAKE, FIVEWEEKS, ASSISTANT]
const PUBLIC = join(process.cwd(), 'public')

describe('reachability ledger (P9)', () => {
  const ledgers = auditAnchors(ANCHORS, PUBLIC)

  it('every phone completes: the endFlag has a drivable setter path', () => {
    for (const ledger of ledgers) {
      for (const phone of ledger.phones) {
        expect(phone.endFlagOk, `${ledger.anchorId}/${phone.phoneId}: endFlag ${phone.endFlag} — ${phone.endFlagPath}`).toBe(true)
      }
    }
  })

  it('every authored outcome has a flag path (no unreachable endings)', () => {
    for (const ledger of ledgers) {
      for (const phone of ledger.phones) {
        for (const ending of phone.endings) {
          expect(ending.ok, `${ledger.anchorId}/${phone.phoneId} outcome "${ending.title}": ${ending.path.join(' · ')}`).toBe(true)
        }
      }
    }
  })

  it('no dangling references and no unlabeled evidence (blocking issues empty)', () => {
    const problems: string[] = []
    for (const ledger of ledgers) {
      for (const phone of ledger.phones) {
        for (const i of phone.issues) {
          if (!i.detail.includes('(informational)')) problems.push(`${ledger.anchorId}/${i.phoneId} [${i.kind}] ${i.detail}`)
        }
      }
    }
    expect(problems, problems.join('\n')).toEqual([])
  })

  it('every artifact/voicenote file a phone references exists on disk', () => {
    // covered by the audit above (artifact/voicenote issues); asserted again
    // explicitly so the failure message names the file
    const missing: string[] = []
    for (const ledger of ledgers) {
      for (const phone of ledger.phones) {
        for (const i of phone.issues) {
          if (i.kind === 'artifact' || i.kind === 'voicenote') {
            if (!i.detail.includes('(informational)')) missing.push(`${ledger.anchorId}/${i.phoneId}: ${i.detail}`)
          }
        }
      }
    }
    expect(missing, missing.join('\n')).toEqual([])
  })

  it('writes the committed ledger document', () => {
    const md = ledgerMarkdown(ledgers)
    const out = join(process.cwd(), 'docs', 'REACHABILITY-LEDGER.md')
    writeFileSync(out, md)
    expect(existsSync(out)).toBe(true)
    expect(md).toContain('Season status: GREEN')
  })

  it('the DRAFT anchor (flag-gated) obeys the same reachability bar', () => {
    // audited per phone (not written into the season ledger — the draft is
    // not part of the live season until canon-approved)
    for (const phoneId of COMPROMISED.order) {
      const ledger = auditPhone(COMPROMISED.phones[phoneId], PUBLIC)
      const blocking = ledger.issues.filter((i) => !i.detail.includes('(informational)'))
      expect(ledger.endFlagOk, `${phoneId}: endFlag ${ledger.endFlag} — ${ledger.endFlagPath}`).toBe(true)
      for (const e of ledger.endings) {
        expect(e.ok, `${phoneId} outcome "${e.title}": ${e.path.join(' · ')}`).toBe(true)
      }
      expect(blocking, blocking.map((i) => `[${i.kind}] ${i.detail}`).join('\n')).toEqual([])
    }
  })
})
