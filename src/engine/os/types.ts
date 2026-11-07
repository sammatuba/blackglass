/* glassOS — the found-phone runtime for Scam Radar case files.
   The phone is a navigable space (lock → home → apps), the way
   A Normal Lost Phone / Simulacra / Duskwood do it: you live inside
   the interface, and the evidence is things you open yourself. */

export type AppId =
  | 'messages'
  | 'assistant'
  | 'gallery'
  | 'phone'
  | 'browser'
  | 'contacts'
  | 'notes'
  | 'settings'
  | 'calendar'
  | 'wallet'
  | 'weather'
  | 'clock'

/** how far the device's chrome has drifted from trustworthy (P4 — the UI is
    the narrative). Moves with story state via rules; renders as data-stage. */
export type OSStage = 'clean' | 'uneasy' | 'compromised'

/** per-anchor signature distortion, applied only once the stage leaves clean.
    Original, subtle, reduced-motion safe (see index.css stage tiers). */
export type OSStageSig = 'feed-shimmer' | 'wave-stutter' | 'glass-flicker'

export type FlagValue = string | boolean | number

export interface OSContact {
  id: string
  name: string
  number: string
  relation?: string
  /** inspecting this contact counts as evidence (verification) */
  evidence?: string
  /** P2: threads/photos/pages that touch this contact — rendered as tappable lines */
  xrefs?: OSXref[]
}

export interface OSTell {
  label: string
  detail: string
  /** timestamp in the artifact where the tell shows (e.g. "0:06") — video artifacts */
  at?: string
}

/** data-horror cross-reference (P2): a pointer from one surface to another —
    a contact that names the threads that touch it, a photo that opens the
    page it came from. The player assembles the trail; nothing is labeled. */
export interface OSXref {
  label: string
  threadId?: string
  photoId?: string
  pageId?: string
  evidence?: string
}

/** authored capture metadata for a photo (P2 — the metadata panel).
    Fields are display strings; `pageId` opens the authored Browser page. */
export interface OSPhotoMeta {
  time?: string
  place?: string
  device?: string
  pageId?: string
}

/** a citation chip on an assistant answer — the tells of Anchor V live here */
export interface OSSource {
  id: string
  /** the citation as rendered, e.g. "Dela Cruz et al., 2024 · J. of Digital Trust Metrics" */
  ref: string
  /** what checking it reveals (the drawer body) */
  detail: string
  /** the shape of the failure — colors the chip */
  verdict: 'missing' | 'unrelated' | 'dead' | 'misread' | 'synthetic' | 'real'
  /** optional page opened in Browser when the chip is tapped (the 404 layer) */
  pageId?: string
  evidence?: string
}

/** regenerate / thumbs-up alternates for an assistant answer. Regenerating
    never fixes the citation; a thumbs-up comes back MORE confident. */
export interface OSAnswerVariants {
  regen?: { text: string; sources?: OSSource[] }[]
  thumbs?: { text: string; sources?: OSSource[] }
}

export interface OSPhoto {
  id: string
  title: string
  /** artifact reference or CSS-fallback presentation */
  kind: 'photo' | 'meme' | 'screenshot'
  /** subject emoji used for the faux-photo placeholder */
  emoji?: string
  /** diegetic artifact image (resolved by the game from its asset glob);
      falls back to the emoji placeholder when absent */
  src?: string
  /** P2: authored capture metadata — the panel under the photo */
  meta?: OSPhotoMeta
  /** normalized tells for the examine layer */
  tells?: OSTell[]
  /** artifacts from the same batch compare side by side; the note names the tell */
  series?: { id: string; note: string }
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
  /** diegetic artifact images (resolved by the game): video poster / page header */
  poster?: string
  /** diegetic artifact clip (resolved by the game): when set, the video page plays for real */
  video?: string
  image?: string
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

/** P1 ambient: the sky outside the phone's window. Authored display
    strings only — the engine never computes weather. */
export interface OSWeather {
  city: string
  now: string
  cond: string
  hi: string
  lo: string
  days?: { day: string; hi: string; lo: string }[]
}

export interface OSMessage {
  id: string
  from: 'them' | 'you' | 'sys'
  kind?: 'text' | 'voice' | 'photo' | 'link' | 'callcard' | 'narr' | 'aside' | 'ai' | 'silence'
  text?: string
  secs?: number
  /** real audio behind a voice note (resolved via voicenoteUrl) — when absent the bubble plays its synthesized pacing */
  audio?: string
  photoId?: string
  pageId?: string
  at?: string
  caption?: string
  /** forwarded by the player — the bubble carries a Forwarded mark */
  forwarded?: boolean
  /** kind:'silence' only — a delivered receipt that never becomes "read" */
  receipt?: boolean
  /** citation chips under a kind:'ai' answer */
  sources?: OSSource[]
  /** regenerate / thumbs-up alternates (kind:'ai') */
  variants?: OSAnswerVariants
}

export interface OSThread {
  id: string
  service: 'sms' | 'viber' | 'messenger' | 'tiktok' | 'threads' | 'gcash' | 'assistant'
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
  /** fire only once the story clock has reached this HH:MM (P3) — the
      9:41 push, the call at 8:12. The clock advances with beats, so a
      time condition is "after enough of the story has passed". */
  time?: string
    inspected?: string
  }
  /** the sender types in `typingIn` before the pushes land. Derived mode:
      when the rule has a human line of its own, the pump shows the indicator
      from that message's own length instead, so this is only for beats with
      no line (a call about to ring, a message that is only a photo). */
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
  /** move the device chrome to this stage when the rule fires (P4) */
  stage?: OSStage
  /** dwell trigger (P5): fire only after this many idle player beats
      (replies, inspections, forwards, ai actions) since the last rule
      fired. Unprompted by design — pair with `when: {}`. */
  dwell?: number
  /** jump the story clock to this HH:MM (P3) */
  advance?: string
  /** or move it forward by this many minutes */
  advanceMin?: number
  /** move the status-bar battery to this percent (display only — the
      compromised anchor's overnight drain lives here) */
  battery?: number
}

/** full-screen prose interstitial — the anthology's narration channel */
export interface OSMoment {
  id: string
  text: string[]
  /** continue-button label; defaults to "Continue" */
  label?: string
  /** the real conversation to open when the interstitial button names one.
      Optional so reflective/end moments still return to the current app. */
  openThread?: string
  /** P2: open an app surface instead — the button literally directs the
      cross-referencing tap ("Open the Wallet") */
  openApp?: AppId
}

export interface OSNote {
  title: string
  body: string
}

/* ---- ambient surfaces (framework P1 — the device is inhabited) ----
   Calendar and wallet carry a life, not a plot: authored data only. The
   wallet doubles as the accusatory ledger (framework §1.5) — its mundane
   rows are where the season's money trail lands. */

export interface OSCalEvent {
  day: string
  time?: string
  title: string
  place?: string
  /** only visible once this flag is set (plans that appear mid-story) */
  requires?: string
}

export interface OSWalletRow {
  id: string
  day: string
  label: string
  /** authored display string — the engine never does math on money */
  amount: string
  kind?: 'in' | 'out'
  note?: string
  /** only visible once this flag is set (a transaction that happens in-story) */
  requires?: string
  /** flag-value gates for rows that belong to one branch only */
  when?: Record<string, FlagValue>
  /** verdict-bearing detail revealed on tap (P2 — the ledger re-reads) */
  meta?: string
  evidence?: string
}

/** P6 (inversion anchor): a home-screen tile that looks native but is not.
    It renders exactly like a system app — the disguise is the point — and
    opens the authored Browser page that exposes it. Data only. */
export interface OSGhostTile {
  id: string
  label: string
  icon: string
  pageId: string
}

/** P6: authored per-app screen-time rows (Settings surface). The anomalies
    are the gaps and the notes — data the player reads, never labeled. */
export interface OSScreenRow {
  app: string
  mins: string
  note?: string
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
    /** starting chrome stage (defaults 'clean'); rules move it (P4) */
    stage?: OSStage
    /** per-anchor signature distortion, shown once the stage leaves clean */
    stageSig?: OSStageSig
    /** P6: native-looking tiles that are not what they claim (inversion anchor) */
    ghostTiles?: OSGhostTile[]
    /** P3: the phone keeps its own time — seeded from `time`/`meridiem`.
        Every player beat advances `perBeat` minutes (default 2), every
        fired rule `perRule` (default 3); rules may jump it with
        `advance`/`advanceMin`. The status bar, lock screen and Clock app
        render it live. */
    clock?: { perBeat?: number; perRule?: number }
  }

  contacts: OSContact[]
  threads: OSThread[]
  /** messages pushed when the case opens (before any player action) */
  opening: OSPush[]
  photos: OSPhoto[]
  pages: OSPage[]
  voicemails?: OSVoicemail[]
  recents?: {
    name: string
    number: string
    at: string
    missed?: boolean
    outgoing?: boolean
    /** dialable — tapping the row calls it back; outcomes are authored
        (transcript lines connect, or nothing connects at all) */
    dial?: { transcript?: string[] }
  }[]
  notes: OSNote[]
  replies: OSReply[]
  rules: OSRule[]
  /** full-screen prose interstitials, raised by rules (`moment`) */
  moments?: OSMoment[]
  /** flags seeded into the initial state (cross-phone unlocks, carried choices) */
  initialFlags?: Record<string, FlagValue>
  /** ambient: the week this phone's person lives in (P1) */
  calendar?: OSCalEvent[]
  /** ambient + accusatory ledger: money in and out, authored display strings (P1/P2) */
  wallet?: { balance?: string; rows: OSWalletRow[] }
  /** ambient: the sky outside (P1) — tile renders only when authored */
  weather?: OSWeather
  /** P6: screen-time by app, last 7 days (Settings surface; inversion anchor) */
  screentime?: OSScreenRow[]
  /** human labels for evidence ids — Notes app + debrief */
  evidenceLabels?: Record<string, string>
  /** when this flag is set (and the chain drains), the case is complete */
  endFlag: string
  /** the thread footer once the case is over — games with a debrief name it;
      games that don't, keep the device honest (defaults to "Case complete") */
  completeLine?: string
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
  /** assistant answer variants applied: msgId -> chosen regen index / thumbs state */
  ai: Record<string, { regen?: number; thumbs?: boolean }>
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
  /** device chrome stage (P4); old saves read as 'clean' through the UI */
  stage?: OSStage
  /** idle player beats since the last rule fired (P5 dwell); old saves read as 0 */
  idle?: number
  /** the story clock in minutes since midnight (P3); old saves read as the phone's start time */
  clockMin?: number
  /** live battery percent; old saves read the phone's authored value */
  battery?: number
  done: boolean
}
