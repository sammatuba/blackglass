import { describe, expect, it } from 'vitest'
import { buildLauncherLayout, showPageDots } from './launcher'
import type { LauncherApp } from './launcher'

const app = (id: string): LauncherApp => ({ id: id as LauncherApp['id'] })

describe('buildLauncherLayout', () => {
  it('fills page one row-major and docks the trailing four', () => {
    const apps = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(app)
    const { pages, dock } = buildLauncherLayout(apps, { columns: 4, rows: 6, dock: 4 })
    // 4 grid apps on page one, 4 docked
    expect(dock.map((a) => a.id)).toEqual(['e', 'f', 'g', 'h'])
    const filled = pages[0].cells.filter(Boolean)
    expect(filled.map((c) => c!.id)).toEqual(['a', 'b', 'c', 'd'])
    // row-major placement: row 0 holds the first four
    expect(filled.map((c) => c!.row)).toEqual([0, 0, 0, 0])
    expect(filled.map((c) => c!.column)).toEqual([0, 1, 2, 3])
  })

  it('overflows to a second page past the grid capacity', () => {
    const apps = Array.from({ length: 28 }, (_, i) => app(`app-${i}`))
    const full = buildLauncherLayout(apps, { columns: 4, rows: 6, dock: 4 })
    // 24 grid apps fill page one exactly; nothing spills
    expect(full.pages).toHaveLength(1)
    const oneMore = buildLauncherLayout([...apps, app('app-28')], { columns: 4, rows: 6, dock: 4 })
    expect(oneMore.pages).toHaveLength(2)
    const pageTwo = oneMore.pages[1].cells.filter(Boolean)
    expect(pageTwo).toHaveLength(1)
    expect(pageTwo[0]!.row).toBe(0)
    expect(pageTwo[0]!.id).toBe('app-24')
  })

  it('keeps badges through the layout', () => {
    // a badged grid app keeps its badge on its cell…
    const apps: LauncherApp[] = [
      { id: 'notes', badge: 2 },
      ...['a', 'b', 'c'].map(app),
      { id: 'messages', badge: 3 },
      ...['f', 'g', 'h'].map(app),
    ]
    const { dock, pages } = buildLauncherLayout(apps, { columns: 4, rows: 6, dock: 4 })
    expect(dock[0]).toEqual({ id: 'messages', badge: 3 })
    const gridBadge = pages[0].cells.filter(Boolean).find((c) => c!.badge != null)
    expect(gridBadge).toEqual({ id: 'notes', badge: 2, row: 0, column: 0 })
  })

  it('never returns an empty page list even for a dock-only phone', () => {
    const { pages } = buildLauncherLayout(['a', 'b', 'c', 'd'].map(app), { columns: 4, rows: 6, dock: 4 })
    expect(pages).toHaveLength(1)
    expect(pages[0].cells.every((c) => c === null)).toBe(true)
    expect(showPageDots(buildLauncherLayout(['a', 'b', 'c', 'd'].map(app)))).toBe(false)
  })

  it('treats a short list against the default grid without special cases', () => {
    const { pages, dock } = buildLauncherLayout(['a', 'b'].map(app))
    expect(dock).toHaveLength(2) // dock takes what it is given, up to grid.dock
    expect(pages[0].cells.filter(Boolean)).toHaveLength(0)
  })
})
