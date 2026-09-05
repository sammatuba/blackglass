/* glassOS — the found-phone runtime for Scam Radar case files.
   The phone is a navigable space (lock → home → apps), the way
   A Normal Lost Phone / Simulacra / Duskwood do it: you live inside
   the interface, and the evidence is things you open yourself. */

export type AppId =
  | 'messages'
  | 'gallery'
  | 'phone'
  | 'browser'
  | 'contacts'
  | 'notes'
  | 'settings'

export type FlagValue = string | boolean | number

export interface OSContact {
  id: string
  name: string
  number: string
  relation?: string
  /** inspecting this contact counts as evidence (verification) */
  evidence?: string
}

export interface OSTell {
  label: string
  detail: string
}

export interface OSPhoto {
  id: string
  title: string
  /** artifact reference or CSS-fallback presentation */
  kind: 'photo' | 'meme' | 'screenshot'
  /** subject emoji used for the faux-photo placeholder */
  emoji?: string
  /** normalized tells for the examine layer */
  tells?: OSTell[]
  evidence?: string
  /** only visible in the gallery after this flag is set */
  requires?: string
}

export interface OSPage {
  id: string
  url: string
  title: string
  kind: 'checkout' | 'news' | 'dashboard' | 'gov' | 'bank' | 'video' | 'social'
  /** the sketchy page's own content model, rendered by Browser app */
  headline?: string
  body?: string[]
  amount?: string
  payee?: string
  badge?: string
  fields?: string[]
  /** video pages (kind: 'video') */
  creator?: string
  creatorSub?: string
  views?: string
  tag?: string
  tells?: OSTell[]
  evidence?: string
}

export interface OSVoicemail {
  id: string
  from: string
  number: string
  at: string
  secs: number
  transcript: string[]
  evidence?: string
}

export interface OSMessage {
  id: string
  from: 'them' | 'you' | 'sys'
  kind?: 'text' | 'voice' | 'photo' | 'link' | 'callcard' | 'narr' | 'aside'
  text?: string
  secs?: number
  photoId?: string
  pageId?: string
  at?: string
  caption?: string
}

export interface OSThread {
  id: string
  service: 'sms' | 'viber' | 'messenger' | 'tiktok' | 'threads' | 'gcash'
  name: string
  number?: string
  /** true = shows as a saved contact in the thread header */
  saved?: boolean
  hue: number
  /** group chat member list */
  members?: string[]
}

export interface OSReply {
  id: string
  threadId: string
  /** only offered after this flag is set */
  requires?: string
  /** no longer offered once this flag is set (siblings after a choice) */
  hideWhen?: string
  label: string
  sub?: string
  /** decision markers recorded on send */
  set: Record<string, FlagValue>
  note?: string
}

export interface OSPush {
  threadId: string
  msg: Omit<OSMessage, 'id' | 'from'> & { from?: OSMessage['from'] }
}

export interface OSRule {
  id: string
  /** all listed conditions must hold */
  when: {
    flag?: string
    /** all of these flags must be set (cross-phone gates use this) */
    allFlags?: string[]
    /** inverse condition — the flag must NOT be set */
    notFlag?: string
    replySent?: string
    call?: 'accepted' | 'declined' | 'ended'
    /** require the ended call to have been declined (or not) */
    callDeclined?: boolean
    inspected?: string
  }
  /** sender "typing…" for ~1.4s before the pushes land */
  typingIn?: string
  push?: OSPush[]
  set?: Record<string, FlagValue>
  /** evidence ids to auto-collect */
  evidence?: string[]
  /** open the Phone overlay with a call; accept connects, decline ends */
  incomingCall?: {
    callId: string
    from: string
    number: string
    sub?: string
    direction: 'in' | 'out'
    /** subtitle lines shown while the call is live */
    transcript?: string[]
  }
  /** hang up the active call (the scammer drops the line) */
  endCall?: boolean
  /** bounce the player to an app (e.g. a call pulls you there) */
  nudgeApp?: AppId
  /** raise a full-screen prose interstitial inside the phone; the rule
      pump pauses until it is dismissed */
  moment?: string
}

/** full-screen prose interstitial — the anthology's narration channel */
export interface OSMoment {
  id: string
  text: string[]
  /** continue-button label; defaults to "Continue" */
  label?: string
}

export interface OSNote {
  title: string
  body: string
}

export interface CaseOS {
  id: string
  title: string
  tagline: string
  blurb: string
  level: string
  minutes?: string
  families?: string[]
  phone: {
    wallpaper: string
    time: string
    meridiem: string
    day: string
    battery: number
    lockNote?: string
    /** UI-as-character skin: keys a `.theme-<name>` palette (engine CSS) */
    theme?: string
  }
  contacts: OSContact[]
  threads: OSThread[]
  /** messages pushed when the case opens (before any player action) */
  opening: OSPush[]
  photos: OSPhoto[]
  pages: OSPage[]
  voicemails?: OSVoicemail[]
  recents?: { name: string; number: string; at: string; missed?: boolean; outgoing?: boolean }[]
  notes: OSNote[]
  replies: OSReply[]
  rules: OSRule[]
  /** full-screen prose interstitials, raised by rules (`moment`) */
  moments?: OSMoment[]
  /** flags seeded into the initial state (cross-phone unlocks, carried choices) */
  initialFlags?: Record<string, FlagValue>
  /** human labels for evidence ids — Notes app + debrief */
  evidenceLabels?: Record<string, string>
  /** when this flag is set (and the chain drains), the case is complete */
  endFlag: string
  /** initial evidence entries in Notes */
  openingEvidence?: string[]
  checklist?: string[]
  tells?: OSTell[]
  outcomes?: {
    match: Record<string, FlagValue>
    title: string
    text: string
    points: number
  }[]
}

/* ---------------- runtime state ---------------- */

export interface OSState {
  /** delivered messages per thread, in arrival order */
  inbox: Record<string, OSMessage[]>
  flags: Record<string, FlagValue>
  /** rule ids already fired */
  applied: string[]
  sentReplies: string[]
  inspected: string[]
  evidence: string[]
  call: null | {
    callId: string
    from: string
    number: string
    sub?: string
    direction: 'in' | 'out'
    transcript?: string[]
    phase: 'incoming' | 'live' | 'ended'
    declined?: boolean
  }
  /** active prose interstitial id (pauses the rule pump) */
  moment: string | null
  done: boolean
}
