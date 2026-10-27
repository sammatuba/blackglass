import { describe, expect, it } from 'vitest'
import { KANGKONG } from './content/kangkong'
import { VOICECLONE } from './content/voiceclone'
import { DEEPFAKE } from './content/deepfake'
import { FIVEWEEKS } from './content/fiveweeks'

/** Never let a diegetic "Open X" button drop a player on an unrelated home
 * screen because an authored conversation ID was renamed. */
const ANCHORS = [KANGKONG, VOICECLONE, DEEPFAKE, FIVEWEEKS]

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
})
