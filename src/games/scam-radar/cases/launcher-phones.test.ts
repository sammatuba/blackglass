import { describe, expect, it } from 'vitest'
import { buildLauncherLayout, homeAppsFor, showPageDots } from '../../../engine/os/launcher'
import { IOS_HOME_GRID } from '../../../engine/os/ios/metrics'
import { VOICE_OS } from './os-voice'
import { GUARANTEED_OS } from './os-guaranteed'
import { PARCEL_OS } from './os-parcel'
import { ASSISTANT } from '../../blackglass/content/assistant'
import { FIVEWEEKS } from '../../blackglass/content/fiveweeks'
import { VOICECLONE } from '../../blackglass/content/voiceclone'
import { DEEPFAKE } from '../../blackglass/content/deepfake'
import { KANGKONG } from '../../blackglass/content/kangkong'

/* M8.2 review finding: launcher coverage across all phones. Every CaseOS
   definition — the three playable scam-radar cases plus the anthology's
   13 phones — must lay out validly through the same pure launcher math
   the HomeScreen renders with. */

const PLAYABLE = [VOICE_OS, GUARANTEED_OS, PARCEL_OS]
const ANCHORS = [ASSISTANT, FIVEWEEKS, VOICECLONE, DEEPFAKE, KANGKONG]
const PHONES = [...PLAYABLE, ...ANCHORS.flatMap((a) => Object.values(a.phones))]

describe('the launcher lays out every case phone', () => {
  it('covers all 16 CaseOS definitions (3 playable + 13 anthology)', () => {
    expect(PHONES).toHaveLength(16)
    for (const p of PHONES) {
      expect(p.threads).toBeTruthy()
      expect(p.phone.battery).toBeGreaterThan(0)
    }
  })

  it('places every app exactly once, dock trailing, cells capacity-true', () => {
    for (const p of PHONES) {
      const apps = homeAppsFor(p.threads)
      const layout = buildLauncherLayout(apps)
      const placed = [
        ...layout.dock.map((d) => d.id),
        ...layout.pages.flatMap((page) => page.cells.filter(Boolean).map((c) => c!.id)),
      ].sort()
      expect(placed, `${p.id}: every app placed exactly once`).toEqual(apps.map((a) => a.id).sort())
      expect(layout.dock.length, `${p.id}: dock within the rail`).toBeLessThanOrEqual(IOS_HOME_GRID.dock)
      for (const page of layout.pages) {
        expect(page.cells, `${p.id}: full capacity grid`).toHaveLength(IOS_HOME_GRID.columns * IOS_HOME_GRID.rows)
      }
    }
  })

  it('stays on one page for every real phone (dots hidden)', () => {
    for (const p of PHONES) {
      const layout = buildLauncherLayout(homeAppsFor(p.threads))
      expect(layout.pages, `${p.id}: single page`).toHaveLength(1)
      expect(showPageDots(layout), `${p.id}: dots hidden`).toBe(false)
    }
  })

  it('promotes the assistant app only when the case has an assistant thread', () => {
    const withAssistant = PHONES.filter((p) => p.threads.some((t) => t.service === 'assistant'))
    expect(withAssistant.length).toBeGreaterThan(0)
    expect(withAssistant.length).toBeLessThan(PHONES.length)
    for (const p of withAssistant) {
      expect(homeAppsFor(p.threads).map((a) => a.id)).toContain('assistant')
    }
    for (const p of PHONES.filter((x) => !withAssistant.includes(x))) {
      expect(homeAppsFor(p.threads).map((a) => a.id)).not.toContain('assistant')
    }
  })
})
