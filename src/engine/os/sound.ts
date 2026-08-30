/* Synthesized UI sound for glassOS — WebAudio, zero assets.
   Gentle by design (low gains, short decays); mutable; the context
   resumes on first user gesture per autoplay policy. */

let ctx: AudioContext | null = null
let muted = (() => {
  try {
    return localStorage.getItem('cgAI_glassos_muted') === '1'
  } catch {
    return false
  }
 })()

function ac(): AudioContext | null {
  if (muted) return null
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function isMuted(): boolean {
  return muted
}

export function setMuted(m: boolean): void {
  muted = m
  try {
    localStorage.setItem('cgAI_glassos_muted', m ? '1' : '0')
  } catch {
    /* private mode */
  }
}

function tone(
  freq: number,
  dur: number,
  opts: { type?: OscillatorType; gain?: number; slideTo?: number; delay?: number } = {},
) {
  const a = ac()
  if (!a) return
  const t0 = a.currentTime + (opts.delay ?? 0)
  const osc = a.createOscillator()
  const g = a.createGain()
  osc.type = opts.type ?? 'sine'
  osc.frequency.setValueAtTime(freq, t0)
  if (opts.slideTo) osc.frequency.exponentialRampToValueAtTime(opts.slideTo, t0 + dur)
  const peak = opts.gain ?? 0.06
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g).connect(a.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

export const sfx = {
  unlock() {
    tone(520, 0.09, { type: 'triangle', gain: 0.05 })
    tone(780, 0.12, { type: 'triangle', gain: 0.04, delay: 0.06 })
  },
  open() {
    tone(660, 0.08, { type: 'sine', gain: 0.035 })
  },
  receive() {
    tone(880, 0.1, { type: 'triangle', gain: 0.055 })
    tone(1174, 0.14, { type: 'triangle', gain: 0.045, delay: 0.09 })
  },
  send() {
    tone(980, 0.07, { type: 'sine', gain: 0.04, slideTo: 620 })
  },
  typing() {
    tone(300 + Math.random() * 160, 0.025, { type: 'square', gain: 0.012 })
  },
  evidence() {
    tone(660, 0.09, { gain: 0.045 })
    tone(990, 0.16, { gain: 0.05, delay: 0.08 })
  },
  callIncoming() {
    // a soft two-note ring, repeated by the caller on a timer
    tone(784, 0.16, { type: 'sine', gain: 0.05 })
    tone(988, 0.2, { type: 'sine', gain: 0.05, delay: 0.18 })
  },
  callConnect() {
    tone(523, 0.08, { gain: 0.04 })
    tone(659, 0.1, { gain: 0.04, delay: 0.07 })
  },
  callEnd() {
    tone(494, 0.09, { gain: 0.035, slideTo: 330 })
  },
  banner() {
    tone(1244, 0.06, { type: 'sine', gain: 0.03 })
    tone(933, 0.09, { type: 'sine', gain: 0.026, delay: 0.05 })
  },
}

export function vibrate(pattern: number | number[]): void {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    /* unsupported */
  }
}
