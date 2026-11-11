/**
 * The home launcher's pure layout math — M8.2 THE IPHONE PASS.
 * Takes a case's ordered app list and the device grid (IOS_HOME_GRID) and
 * returns pages, cells and the dock. No React, no DOM: the same function
 * renders every phone's home and the unit tests exercise the edge cases.
 */
import { IOS_HOME_GRID } from './ios/metrics'
import type { AppId } from './types'

export interface LauncherApp {
  id: AppId
  badge?: number
}

export interface LauncherCell {
  id: AppId
  badge?: number
  row: number
  column: number
}

export interface LauncherPage {
  /** row-major cells of length columns × rows; null = empty slot */
  cells: (LauncherCell | null)[]
}

export interface LauncherLayout {
  /** grid pages (excluding the dock) */
  pages: LauncherPage[]
  dock: LauncherApp[]
}

export interface LauncherGrid {
  columns: number
  rows: number
  dock: number
}

/**
 * The home's ordered app list for a case — the single input the layout math
 * consumes. Every phone's home is data-driven from its case's threads (an
 * assistant thread promotes the assistant app) plus the live badges, so the
 * whole launcher stays testable against every case definition.
 */
export function homeAppsFor(
  threads: { service: string }[],
  badges: { notes?: number; messages?: number } = {},
): LauncherApp[] {
  return [
    { id: 'gallery' },
    { id: 'phone' },
    { id: 'contacts' },
    { id: 'notes', badge: badges.notes },
    { id: 'messages', badge: badges.messages },
    ...(threads.some((t) => t.service === 'assistant') ? [{ id: 'assistant' as LauncherApp['id'] }] : []),
    { id: 'browser' },
    { id: 'settings' },
  ]
}

const DEFAULT_GRID: LauncherGrid = {
  columns: IOS_HOME_GRID.columns,
  rows: IOS_HOME_GRID.rows,
  dock: IOS_HOME_GRID.dock,
}

/**
 * Lay out a case's apps: the leading apps fill the grid pages (row-major),
 * the trailing `grid.dock` apps dock. A list that fits the dock entirely
 * leaves the grid empty — the caller decides whether that's sensible.
 */
export function buildLauncherLayout(
  apps: LauncherApp[],
  grid: LauncherGrid = DEFAULT_GRID,
): LauncherLayout {
  const capacity = grid.columns * grid.rows
  const gridApps = apps.slice(0, Math.max(0, apps.length - grid.dock))
  const dock = apps.slice(Math.max(0, apps.length - grid.dock)).map(({ id, badge }) => ({ id, badge }))

  const pages: LauncherPage[] = []
  for (let start = 0; start < gridApps.length; start += capacity) {
    const slice = gridApps.slice(start, start + capacity)
    const cells: (LauncherCell | null)[] = Array.from({ length: capacity }, () => null)
    slice.forEach((app, index) => {
      cells[index] = {
        id: app.id,
        badge: app.badge,
        row: Math.floor(index / grid.columns),
        column: index % grid.columns,
      }
    })
    pages.push({ cells })
  }
  if (pages.length === 0) pages.push({ cells: Array.from({ length: capacity }, () => null) })

  return { pages, dock }
}

/** how many page dots the launcher shows (iOS hides dots for a single page) */
export function pageCount(layout: LauncherLayout): number {
  return layout.pages.length
}

export function showPageDots(layout: LauncherLayout): boolean {
  return pageCount(layout) > 1
}
