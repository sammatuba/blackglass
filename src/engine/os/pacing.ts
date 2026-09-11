/* Human cadence for glassOS. Delays are derived from message length so the
   phone feels like a person on the other end: they type at a plausible
   speed, follow a line with another within seconds, and prose beats wait
   like someone reading. All functions return milliseconds at 1× pace; the
   Device pump divides by the player's speed setting.

   `cgAI_glassos_pace` stores the multiplier: 0.75 relaxed, 1 normal,
   1.5 brisk; smoke tests use 8. Read per delay, so a setting change lands
   on the next message. */

const KEY = 'cgAI_glassos_pace'

export function paceSpeed(): number {
  try {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(KEY)
    const n = raw === null ? 1 : Number(raw)
    return Number.isFinite(n) && n > 0 ? n : 1
  } catch {
    return 1
  }
}

export function setPaceSpeed(speed: number): void {
  try {
    localStorage.setItem(KEY, String(speed))
  } catch {
    /* private mode */
  }
}

/** apply the pace multiplier; never sleep less than a frame */
export function scaled(ms: number, speed = paceSpeed()): number {
  return Math.max(40, Math.round(ms / speed))
}

const jitter = (v: number, spread: number) => v * (1 - spread + Math.random() * spread * 2)
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** how long the other side types before a message of this length lands */
export function typingMs(text: string): number {
  return Math.round(jitter(clamp(780 + text.length * 34, 900, 2900), 0.15))
}

/** the next line in the same burst — the sender is still mid-thought */
export function continueMs(): number {
  return Math.round(420 + Math.random() * 520)
}

/** authorial prose (narr/aside): no typing indicator, just reading air */
export function proseMs(text: string): number {
  return Math.round(jitter(clamp(950 + text.length * 16, 1050, 2600), 0.15))
}

/** the pause between rules — the world breathes before the next beat */
export function settleMs(): number {
  return Math.round(500 + Math.random() * 400)
}

/** lock-screen previews: the first buzz is quick, then human */
export function openingMs(text: string, first: boolean): number {
  if (first) return 650
  return Math.round(jitter(clamp(700 + text.length * 14, 800, 2000), 0.2))
}

/** banners stay long enough to actually read the message */
export function bannerMs(text: string): number {
  return Math.round(clamp(2600 + text.length * 40, 2800, 6500))
}
