/**
 * iPhone 15 Pro logical display, portrait points — the shell grid the
 * iOS token layer (ios/tokens.css) renders from. M8.1 THE IPHONE PASS;
 * the launcher layout math (M8.2) composes on top of these.
 */
export const IOS_DEVICE = {
  /** screen width in portrait points */
  width: 393,
  /** screen height in portrait points */
  height: 852,
  /** top system inset (status band + island) */
  safeTop: 59,
  /** bottom system inset (home indicator) */
  safeBottom: 34,
  /** dynamic island */
  islandWidth: 124,
  islandHeight: 36,
} as const

/** home-screen grid the launcher derives from the device (M8.2) */
export const IOS_HOME_GRID = {
  /** icon columns per page */
  columns: 4,
  /** icon rows per page (excluding the dock) */
  rows: 6,
  /** docked apps */
  dock: 4,
} as const
