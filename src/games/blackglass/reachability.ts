import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { CaseOS, FlagValue, OSRule } from '../../engine/os/types'
import type { AnthologyAnchor } from './types'
import { evidenceIds } from '../../engine/os/runtime'
import { ARTIFACT_FORMATS } from './artifact-list'
import { VOICE_FILES } from './voice-list'

/* P9 — reachability is the quality bar. A conservative walk over each CaseOS:
   every ending must have a flag path a player can actually drive; every
   authored reference (threads, photos, pages, moments, replies, evidence
   labels, artifact files on disk) must resolve. Pure analysis — the vitest
   gate runs it and writes docs/REACHABILITY-LEDGER.md. */

export interface LedgerIssue {
  phoneId: string
  kind: string
  detail: string
}

export interface EndingPath {
  match: Record<string, FlagValue>
  title: string
  /** setter chain per required flag — the replayed path evidence */
  path: string[]
  ok: boolean
}

export interface PhoneLedger {
  phoneId: string
  title: string
  endFlag: string
  endFlagPath: string
  endFlagOk: boolean
  endings: EndingPath[]
  refs: {
    threads: number
    photos: number
    pages: number
    moments: number
    replies: number
    evidence: number
    artifacts: number
    voicenotes: number
  }
  issues: LedgerIssue[]
}

export interface AnchorLedger {
  anchorId: string
  anchorTitle: string
  phones: PhoneLedger[]
}

interface Setters {
  /** flag -> the rule/reply ids that set it ('initialFlags' | 'rule:<id>' | 'reply:<id>') */
  flags: Map<string, string[]>
  /** rule id -> its `when` flag dependencies */
  ruleDeps: Map<string, string[]>
  /** reply id -> the flag it requires */
  replyReqs: Map<string, string[]>
}

function collectSetters(caseDef: CaseOS): Setters {
  const flags = new Map<string, string[]>()
  const ruleDeps = new Map<string, string[]>()
  const replyReqs = new Map<string, string[]>()

  const add = (flag: string, who: string) => {
    const list = flags.get(flag) ?? []
    list.push(who)
    flags.set(flag, list)
  }
  for (const [flag, value] of Object.entries(caseDef.initialFlags ?? {})) {
    if (value) add(flag, 'initialFlags')
  }
  for (const rule of caseDef.rules) {
    for (const flag of Object.keys(rule.set ?? {})) add(flag, `rule:${rule.id}`)
    // the engine sets `dismissed:<id>` when the player dismisses the moment a
    // rule raised — the flag is player-achievable iff that rule is drivable
    if (rule.moment) add(`dismissed:${rule.moment}`, `moment:${rule.id}`)
    const deps = new Set<string>()
    if (rule.when.flag) deps.add(rule.when.flag)
    for (const f of rule.when.allFlags ?? []) deps.add(f)
    ruleDeps.set(rule.id, [...deps])
  }
  // the Device sets this on unlock — always player-achievable
  add('os_unlocked', 'engine:unlock')
  // the anthology seeds done_<phoneId> when another phone has been lived
  // (Anthology.tsx) — cross-phone recognition gates, reachable by season order
  for (const rule of caseDef.rules) {
    const deps = [...(rule.when.allFlags ?? []), ...(rule.when.flag ? [rule.when.flag] : [])]
    for (const d of deps) if (d.startsWith('done_')) add(d, 'anthology:cross-phone')
  }
  for (const reply of caseDef.replies) if (reply.requires?.startsWith('done_')) add(reply.requires, 'anthology:cross-phone')
  for (const reply of caseDef.replies) {
    for (const flag of Object.keys(reply.set ?? {})) add(flag, `reply:${reply.id}`)
    replyReqs.set(reply.id, reply.requires ? [reply.requires] : [])
  }
  return { flags, ruleDeps, replyReqs }
}

/** fixed-point satisfiability: a rule/reply is drivable when every flag it
    needs is settable; dwell/call/inspection gates count as player-achievable
    (optimistic on purpose — this catches dangling names and genuinely
    unreachable setters, not soft gating) */
function satisfiableSetters(caseDef: CaseOS): Set<string> {
  const { flags, ruleDeps, replyReqs } = collectSetters(caseDef)
  const settable = new Set<string>()
  const drivableRules = new Set<string>()
  const sendableReplies = new Set<string>()
  const flagHasDrivableSetter = (flag: string) =>
    (flags.get(flag) ?? []).some((w) => {
      if (w === 'initialFlags' || w === 'engine:unlock' || w === 'anthology:cross-phone') return true
      if (w.startsWith('rule:')) return drivableRules.has(w.slice(5))
      if (w.startsWith('reply:')) return sendableReplies.has(w.slice(6))
      if (w.startsWith('moment:')) return drivableRules.has(w.slice(7))
      return false
    })

  let grew = true
  while (grew) {
    grew = false
    for (const [ruleId, deps] of ruleDeps) {
      if (!drivableRules.has(ruleId) && deps.every((d) => settable.has(d))) {
        drivableRules.add(ruleId)
        grew = true
      }
    }
    for (const [replyId, reqs] of replyReqs) {
      if (!sendableReplies.has(replyId) && reqs.every((r) => settable.has(r))) {
        sendableReplies.add(replyId)
        grew = true
      }
    }
    for (const flag of flags.keys()) {
      if (!settable.has(flag) && flagHasDrivableSetter(flag)) {
        settable.add(flag)
        grew = true
      }
    }
  }
  return settable
}

/** the setter chain for one flag — rules/replies with their own needs, cycle-guarded */
function flagPath(caseDef: CaseOS, flag: string, depth = 0): string {
  const { flags, ruleDeps, replyReqs } = collectSetters(caseDef)
  const setters = flags.get(flag) ?? []
  if (setters.includes('initialFlags')) return `${flag}←initial`
  if (setters.includes('engine:unlock')) return `${flag}←unlock`
  if (setters.includes('anthology:cross-phone')) return `${flag}←anthology(seed: another phone lived)`
  if (depth > 8) return `${flag}←…`
  for (const who of setters) {
    if (who.startsWith('moment:')) {
      // dismissed:<id> — achievable by dismissing the moment this rule raises
      const ruleId = who.slice(7)
      const deps = ruleDeps.get(ruleId) ?? []
      const depText = deps.map((d) => flagPath(caseDef, d, depth + 1)).join(' & ')
      return `${flag}←dismiss(${ruleId} raises it${depText ? `; needs ${depText}` : ''})`
    }
    if (who.startsWith('rule:')) {
      const ruleId = who.slice(5)
      const deps = ruleDeps.get(ruleId) ?? []
      const depText = deps.map((d) => flagPath(caseDef, d, depth + 1)).join(' & ')
      return `${flag}←${ruleId}${depText ? `(${depText})` : ''}`
    }
    if (who.startsWith('reply:')) {
      const replyId = who.slice(6)
      const reqs = replyReqs.get(replyId) ?? []
      const reqText = reqs.map((r) => flagPath(caseDef, r, depth + 1)).join(' & ')
      return `${flag}←reply:${replyId}${reqText ? `(${reqText})` : ''}`
    }
  }
  return `${flag}←NO SETTER`
}

/** does a URL produced by artifactUrl/voicenoteUrl actually exist on disk? */
function urlFileExists(url: string | undefined, publicDir: string): boolean {
  if (!url) return false
  const m = url.match(/\/(artifacts|voicenotes)\/([^/?#]+)$/)
  if (!m) return false
  return existsSync(join(publicDir, m[1], decodeURIComponent(m[2])))
}

export function auditPhone(caseDef: CaseOS, publicDir: string): PhoneLedger {
  const issues: LedgerIssue[] = []
  const issue = (kind: string, detail: string) => issues.push({ phoneId: caseDef.id, kind, detail })
  const threadIds = new Set(caseDef.threads.map((t) => t.id))
  const photoIds = new Set(caseDef.photos.map((p) => p.id))
  const pageIds = new Set(caseDef.pages.map((p) => p.id))
  const momentIds = new Set((caseDef.moments ?? []).map((m) => m.id))
  const replyIds = new Set(caseDef.replies.map((r) => r.id))

  const refs = { threads: 0, photos: 0, pages: 0, moments: 0, replies: 0, evidence: 0, artifacts: 0, voicenotes: 0 }

  /* rules: moments, pushes, replySent, voicenote files */
  for (const rule of caseDef.rules as OSRule[]) {
    if (rule.moment) {
      refs.moments += 1
      if (!momentIds.has(rule.moment)) issue('moment', `rule ${rule.id} raises missing moment "${rule.moment}"`)
    }
    if (rule.when.replySent && !replyIds.has(rule.when.replySent)) issue('reply', `rule ${rule.id} keys on missing reply "${rule.when.replySent}"`)
    for (const p of rule.push ?? []) {
      if (!threadIds.has(p.threadId)) issue('thread', `rule ${rule.id} pushes to missing thread "${p.threadId}"`)
      else refs.threads += 1
      if (p.msg.photoId) {
        if (!photoIds.has(p.msg.photoId)) issue('photo', `rule ${rule.id} attaches missing photo "${p.msg.photoId}"`)
        else refs.photos += 1
      }
      if (p.msg.pageId) {
        if (!pageIds.has(p.msg.pageId)) issue('page', `rule ${rule.id} links missing page "${p.msg.pageId}"`)
        else refs.pages += 1
      }
      if (p.msg.audio) {
        refs.voicenotes += 1
        if (!urlFileExists(p.msg.audio, publicDir)) issue('voicenote', `rule ${rule.id} plays missing audio file ${p.msg.audio}`)
      }
    }
  }
  for (const p of caseDef.opening) {
    if (p.msg.audio) {
      refs.voicenotes += 1
      if (!urlFileExists(p.msg.audio, publicDir)) issue('voicenote', `opening plays missing audio file ${p.msg.audio}`)
    }
  }

  /* moments: destinations */
  for (const m of caseDef.moments ?? []) {
    if (m.openThread && !threadIds.has(m.openThread)) issue('thread', `moment ${m.id} opens missing thread "${m.openThread}"`)
  }

  refs.replies = caseDef.replies.length

  /* artifact-backed media that claims to resolve must exist on disk */
  for (const pg of caseDef.pages) {
    for (const url of [pg.poster, pg.video, pg.image]) {
      if (url) {
        refs.artifacts += 1
        if (!urlFileExists(url, publicDir)) issue('artifact', `page ${pg.id} references missing file ${url}`)
      }
    }
  }
  for (const ph of caseDef.photos) {
    if (ph.src) {
      refs.artifacts += 1
      if (!urlFileExists(ph.src, publicDir)) issue('artifact', `photo ${ph.id} references missing file ${ph.src}`)
    }
  }

  /* synced-but-unused media: informational drift notes, not blockers */
  const pushMsgs = [...caseDef.opening, ...caseDef.rules.flatMap((r) => r.push ?? [])].map((p) => p.msg)
  for (const id of Object.keys(ARTIFACT_FORMATS)) {
    const used =
      caseDef.photos.some((p) => p.src?.includes(`/${id}.`)) ||
      caseDef.pages.some((p) => [p.poster, p.video, p.image].some((u) => u?.includes(`/${id}.`)))
    if (!used) issue('artifact', `artifact "${id}" is synced but unused by ${caseDef.id} (informational)`)
  }
  for (const file of VOICE_FILES) {
    const stem = file.replace(/\.[a-z0-9]+$/i, '')
    if (!pushMsgs.some((m) => m.audio?.includes(`/${stem}.`))) {
      issue('voicenote', `voicenote "${stem}" is synced but unused by ${caseDef.id} (informational)`)
    }
  }

  /* evidence labels: every collectible id renders human in Notes */
  for (const id of evidenceIds(caseDef)) {
    refs.evidence += 1
    if (!caseDef.evidenceLabels?.[id]) issue('evidence', `evidence "${id}" has no label in evidenceLabels`)
  }

  /* endings: the endFlag must be settable; every outcome needs a flag path */
  const settable = satisfiableSetters(caseDef)
  const endFlagOk = settable.has(caseDef.endFlag)
  if (!endFlagOk) issue('ending', `endFlag "${caseDef.endFlag}" has no drivable setter — the case can never complete`)

  const endings: EndingPath[] = (caseDef.outcomes ?? []).map((o) => {
    const required = Object.keys(o.match)
    const ok = required.every((f) => settable.has(f))
    const path = required.map((f) => flagPath(caseDef, f))
    if (!ok) issue('ending', `outcome "${o.title}" requires ${required.join(', ')} — no drivable setter path`)
    return { match: o.match, title: o.title, path, ok }
  })

  return {
    phoneId: caseDef.id,
    title: caseDef.title,
    endFlag: caseDef.endFlag,
    endFlagPath: flagPath(caseDef, caseDef.endFlag),
    endFlagOk,
    endings,
    refs,
    issues,
  }
}

export function auditAnchors(anchors: AnthologyAnchor[], publicDir: string): AnchorLedger[] {
  return anchors.map((anchor) => ({
    anchorId: anchor.id,
    anchorTitle: `${anchor.title} — ${anchor.subtitle}`,
    phones: anchor.order.map((id) => auditPhone(anchor.phones[id], publicDir)),
  }))
}

export function ledgerMarkdown(ledgers: AnchorLedger[], opts?: { draft?: boolean }): string {
  const lines: string[] = []
  const tag = opts?.draft ? ' (DRAFT)' : ''
  lines.push('# REACHABILITY LEDGER — glassOS season')
  lines.push('')
  lines.push(`*Generated by \`src/games/blackglass/reachability.ts\` — run \`npm run reachability\`. Do not edit by hand.${tag}*`)
  lines.push('')
  lines.push('Every ending must have a drivable flag path; every authored reference must resolve. Informational notes (synced-but-unused media) are listed per phone and are not blockers. Dwell, call and inspection gates count as player-achievable (the analysis is optimistic on purpose: it catches dangling names and unreachable setters, not soft gating).')
  lines.push('')

  let allOk = true
  for (const ledger of ledgers) {
    lines.push(`## ${ledger.anchorTitle}`)
    lines.push('')
    for (const phone of ledger.phones) {
      const blocking = phone.issues.filter((i) => !i.detail.includes('(informational)'))
      const ok = phone.endFlagOk && phone.endings.every((e) => e.ok) && blocking.length === 0
      allOk = allOk && ok
      lines.push(`### ${phone.phoneId} — ${phone.title} ${ok ? '✅' : '❌'}`)
      lines.push('')
      lines.push(`- endFlag \`${phone.endFlag}\`: ${phone.endFlagOk ? '✅ reachable' : '❌ UNREACHABLE'} — ${phone.endFlagPath}`)
      for (const e of phone.endings) {
        const match = Object.entries(e.match).map(([k, v]) => `${k}=${String(v)}`).join(', ') || '∅'
        lines.push(`- ending “${e.title}” ${e.ok ? '✅' : '❌'} — needs {${match}} — path: ${e.path.join(' · ') || '(fallback ending, needs no flags)'}`)
      }
      lines.push(`- refs: threads ${phone.refs.threads} · photos ${phone.refs.photos} · pages ${phone.refs.pages} · moments ${phone.refs.moments} · replies ${phone.refs.replies} · evidence ${phone.refs.evidence} · artifact files ${phone.refs.artifacts} · voicenotes ${phone.refs.voicenotes}`)
      for (const i of phone.issues) lines.push(`- ${i.detail.includes('(informational)') ? 'ℹ️' : '⚠️'} ${i.kind}: ${i.detail}`)
      lines.push('')
    }
  }
  lines.push('---')
  lines.push('')
  lines.push(`**Season status: ${allOk ? 'GREEN — every ending reachable, every reference resolves' : 'RED — see ❌ rows above'}${tag}.**`)
  lines.push('')
  return lines.join('\n')
}
