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
  window.dispatchEvent(new CustomEvent('glassos-mute', { detail: m }))
}

/** subscribe to master-mute changes (status bar toggle ↔ Settings switch) */
export function onMuteChange(fn: (m: boolean) => void): () => void {
  const handler = (e: Event) => fn((e as CustomEvent<boolean>).detail)
  window.addEventListener('glassos-mute', handler)
  return () => window.removeEventListener('glassos-mute', handler)
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
  aiAnswer() {
    // the assistant's answer lands: two glassy ascending notes — helpful,
    // composed, a little too smooth. Distinct from a human message.
    tone(1046, 0.12, { type: 'sine', gain: 0.04 })
    tone(1318, 0.16, { type: 'sine', gain: 0.034, delay: 0.1 })
  },
}

/* THE SIGNAL DESK — game-layer feedback. Same gentle synth voice as the
   OS, tuned a fifth apart so the desk sounds like the case file, not the
   phone. Every cue is tied to something visible: a move landing, a clue
   found, the pressure ratchet, the grade stamp. */
export const gameSfx = {
  verify() {
    tone(587, 0.09, { type: 'triangle', gain: 0.05 })
    tone(880, 0.16, { type: 'triangle', gain: 0.045, delay: 0.07 })
  },
  protect() {
    tone(440, 0.1, { type: 'triangle', gain: 0.045 })
    tone(659, 0.14, { type: 'triangle', gain: 0.04, delay: 0.08 })
  },
  risk() {
    tone(220, 0.16, { type: 'sine', gain: 0.05, slideTo: 165 })
  },
  drift() {
    tone(330, 0.12, { type: 'sine', gain: 0.035, slideTo: 294 })
  },
  neutral() {
    tone(523, 0.07, { type: 'sine', gain: 0.03 })
  },
  clue() {
    tone(1174, 0.08, { type: 'triangle', gain: 0.04 })
    tone(1568, 0.14, { type: 'triangle', gain: 0.035, delay: 0.06 })
  },
  tension() {
    tone(196, 0.06, { type: 'square', gain: 0.02 })
    tone(147, 0.09, { type: 'square', gain: 0.016, delay: 0.05 })
  },
  stamp() {
    tone(165, 0.1, { type: 'triangle', gain: 0.07, slideTo: 110 })
    tone(82, 0.18, { type: 'sine', gain: 0.06, delay: 0.02 })
  },
  tick() {
    tone(1046 + Math.random() * 200, 0.02, { type: 'sine', gain: 0.014 })
  },
  /** the verdict fanfare — its arpeggio grows with the grade */
  fanfare(notes: number) {
    const scale = [523, 659, 784, 1046, 1318]
    for (let i = 0; i < Math.min(notes, scale.length); i++) {
      tone(scale[i], i === notes - 1 ? 0.26 : 0.11, { type: 'triangle', gain: 0.05, delay: i * 0.1 })
    }
  },
}

export function vibrate(pattern: number | number[]): void {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    /* unsupported */
  }
}
