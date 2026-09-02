import type { CaseOS } from '../../engine/os/types'

/* The phone-anthology Rashomon: one anchor moment, several phones.
   Each phone is a full glassOS case; the anchor carries the entry
   phone, the unlock order (load-bearing — sequenced recognition),
   and the shared epilogue surfaces. */

export interface TimelineEvent {
  time: string
  who: string
  label: string
  text: string
  /** text keyed on a decision flag recorded in a phone run */
  dynamic?: { key: string; fallback: string; map: Record<string, string> }
}

export interface ReflectionCard {
  who: string
  verb: string
  line: string
  body: string
}

export interface AnthologyAnchor {
  id: string
  title: string
  subtitle: string
  blurb: string
  question: string
  /** the phone you must live first — order is the lesson */
  entry: string
  /** unlock order; the rest wake once the entry phone is lived */
  order: string[]
  phones: Record<string, CaseOS>
  timeline: { title: string; intro: string; events: TimelineEvent[]; close: string[] }
  reflection: { title: string; cards: ReflectionCard[]; coda: string }
}
