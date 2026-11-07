import { describe, expect, it } from 'vitest'
import { KANGKONG } from './content/kangkong'
import { VOICECLONE } from './content/voiceclone'
import { DEEPFAKE } from './content/deepfake'
import { FIVEWEEKS } from './content/fiveweeks'
import { ASSISTANT } from './content/assistant'
import { COMPROMISED } from './content/compromised'

/** Never let a diegetic "Open X" button drop a player on an unrelated home
 * screen because an authored conversation ID was renamed. */
const ANCHORS = [KANGKONG, VOICECLONE, DEEPFAKE, FIVEWEEKS, ASSISTANT]

describe('anthology phone navigation', () => {
  it('all opening moment destinations belong to their phone', () => {
    let destinations = 0
    for (const anchor of ANCHORS) {
      for (const phone of Object.values(anchor.phones)) {
        for (const moment of phone.moments ?? []) {
          if (!moment.openThread) continue
          destinations += 1
          expect(
            phone.threads.some((thread) => thread.id === moment.openThread),
            `${anchor.id} / ${phone.id} / ${moment.id} targets missing ${moment.openThread}`,
          ).toBe(true)
        }
      }
    }
    expect(destinations).toBeGreaterThanOrEqual(9)
  })

  it('each anchor entry has an existing first phone and an opening destination', () => {
    for (const anchor of ANCHORS) {
      const entry = anchor.phones[anchor.entry]
      expect(entry, `${anchor.id} has no entry phone`).toBeDefined()
      expect(
        entry.moments?.some((moment) => moment.openThread),
        `${anchor.id} entry should hand off to a real conversation`,
      ).toBe(true)
    }
  })

  it('every shipped phone is inhabited: calendar + wallet ambient data (P1)', () => {
    for (const anchor of ANCHORS) {
      for (const phone of Object.values(anchor.phones)) {
        expect(phone.calendar?.length, `${anchor.id}/${phone.id} has no calendar events`).toBeGreaterThan(0)
        expect(phone.wallet?.rows.length, `${anchor.id}/${phone.id} has no wallet rows`).toBeGreaterThan(0)
        const rowIds = (phone.wallet?.rows ?? []).map((r) => r.id)
        expect(new Set(rowIds).size, `${anchor.id}/${phone.id} has duplicate wallet row ids`).toBe(rowIds.length)
        for (const row of phone.wallet?.rows ?? []) {
          expect(row.amount.length, `${anchor.id}/${phone.id}/${row.id} amount must be authored text`).toBeGreaterThan(0)
          expect(row.amount, `${anchor.id}/${phone.id}/${row.id} amounts are display strings`).toMatch(/^[+\-₱p]|pending/i)
        }
      }
    }
  })

  it('every shipped phone is inhabited: weather + call log (P1, the Phone app is never empty)', () => {
    for (const anchor of ANCHORS) {
      for (const phone of Object.values(anchor.phones)) {
        expect(phone.weather, `${anchor.id}/${phone.id} has no weather`).toBeDefined()
        expect(phone.weather?.now.length, `${anchor.id}/${phone.id} weather is empty`).toBeGreaterThan(0)
        expect(phone.recents?.length, `${anchor.id}/${phone.id} has no call log`).toBeGreaterThan(0)
        for (const r of phone.recents ?? []) {
          expect(r.number, `${anchor.id}/${phone.id} recent ${r.name} has no number`).toBeTruthy()
          // a dialable row either connects with authored dialogue or rings
          // out — it never carries evidence flags or plot state
          expect(r.dial && r.dial.transcript ? r.dial.transcript.length : 0, `${anchor.id}/${phone.id} dial transcript is empty`).toBeLessThan(6)
        }
      }
    }
  })
})

describe('anchor VI draft navigation (P6 — gated behind ?draft=vi)', () => {
  it('the draft anchor obeys the same navigation contract', () => {
    for (const phone of Object.values(COMPROMISED.phones)) {
      for (const moment of phone.moments ?? []) {
        if (!moment.openThread) continue
        expect(
          phone.threads.some((thread) => thread.id === moment.openThread),
          `${COMPROMISED.id}/${phone.id}/${moment.id} targets missing ${moment.openThread}`,
        ).toBe(true)
      }
    }
    const entry = COMPROMISED.phones[COMPROMISED.entry]
    expect(entry, 'draft anchor has no entry phone').toBeDefined()
    expect(entry.moments?.some((m) => m.openThread), 'draft entry should hand off to a conversation').toBe(true)
  })

  it('the draft anchor is inhabited like the season (both phones)', () => {
    expect(COMPROMISED.order).toEqual(['own', 'mama'])
    for (const phone of Object.values(COMPROMISED.phones)) {
      expect(phone.calendar?.length, `${phone.id} has no calendar`).toBeGreaterThan(0)
      expect(phone.wallet?.rows.length, `${phone.id} has no wallet rows`).toBeGreaterThan(0)
      expect(phone.weather, `${phone.id} has no weather`).toBeDefined()
      expect(phone.recents?.length, `${phone.id} has no call log`).toBeGreaterThan(0)
    }
  })

  it('the mirror epilogue is performed from the run (P7): report variants + dynamic timeline', () => {
    const own = COMPROMISED.phones.own
    // two report variants keyed on the run's recorded flags
    expect(own.moments?.some((m) => m.id === 'own-report-full')).toBe(true)
    expect(own.moments?.some((m) => m.id === 'own-report-partial')).toBe(true)
    expect(own.rules.some((r) => r.id === 'own-coda-full' && r.when.allFlags?.includes('own_assembled'))).toBe(true)
    expect(own.rules.some((r) => r.id === 'own-coda-partial' && r.when.notFlag === 'own_assembled')).toBe(true)
    // the season's epilogue channel reads the recorded runs
    const dynamicKeys = COMPROMISED.timeline.events.flatMap((e) => (e.dynamic ? [e.dynamic.key] : []))
    expect(dynamicKeys).toContain('own_assembled')
    expect(dynamicKeys).toContain('mo_reached')
    // mama's silence is a beat too
    expect(COMPROMISED.phones.mama.opening.some((m) => m.msg.kind === 'silence')).toBe(true)
  })
})
