/* The generalized phone/beat engine — extracted from the BLACKGLASS
   anthology (play/blackglass-phones/app.js) and re-expressed as typed
   data + React components. The beat vocabulary matches the legacy
   story.js shape so anthology content ports with a light codemod. */

export type Side = 'in' | 'out'

export interface NarrBeat {
  t: 'narr'
  text: string | string[]
}
export interface AsideBeat {
  t: 'aside'
  text: string
}
export interface WorldBeat {
  t: 'world'
  text: string | string[]
}
export interface SysBeat {
  t: 'sys'
  text: string
}
export interface MsgBeat {
  t: 'msg'
  side?: Side
  sender?: string
  time?: string
  text: string
}
export interface ComposeBeat extends Omit<MsgBeat, 't'> {
  t: 'compose'
}
export interface LinkBeat {
  t: 'link'
  title: string
  domain: string
  /** artifact id — renders the diegetic banner image when present */
  artifact?: string
}
export interface VoiceBeat {
  t: 'voice'
  side?: Side
  sender?: string
  time?: string
  secs: number
}
export interface NotifBeat {
  t: 'notif'
  app: string
  text: string
  time?: string
}
export interface VideoBeat {
  t: 'video'
  creator: string
  sub?: string
  tag?: string
  views?: string
  caption?: string
  artifact?: string
}
export interface PhotoBeat {
  t: 'photo'
  side?: Side
  sender?: string
  time?: string
  caption?: string
  artifact?: string
}
export interface GalleryBeat {
  t: 'gallery'
  artifacts: string[]
}
export interface WeekheadBeat {
  t: 'weekhead'
  week: string
  date?: string
  stat?: string
}
export interface CallBeat {
  t: 'call'
  state: 'incoming' | 'outgoing'
  who: string
  sub?: string
}
export interface TransferBeat {
  t: 'transfer'
  amount: string
  to: string
  balance: string
  stage?: 'ready' | 'done'
  app?: string
}
export interface AppHeadBeat {
  t: 'app'
  appHead: AppHead
}
export interface RecogBeat {
  t: 'recog-tag'
  text: string
}
export interface EndBeat {
  t: 'end'
  kind?: string
}

export type Beat =
  | NarrBeat
  | AsideBeat
  | WorldBeat
  | SysBeat
  | MsgBeat
  | ComposeBeat
  | LinkBeat
  | VoiceBeat
  | NotifBeat
  | VideoBeat
  | PhotoBeat
  | GalleryBeat
  | WeekheadBeat
  | CallBeat
  | TransferBeat
  | AppHeadBeat
  | RecogBeat

/** values stored in state.choices via `set` */
export type ChoiceValue = string | boolean | number

export interface ChoiceOption {
  label: string
  sub?: string
  set?: Record<string, ChoiceValue>
  /** consequence beats revealed inline after choosing */
  say?: Beat[]
}

export interface Choice {
  verb: string
  prompt: string
  options: ChoiceOption[]
  footnote?: string
}

export interface AppHead {
  name: string
  chat?: string
  sub?: string
  icon?: string
}

export interface AppTile {
  icon: string
  label: string
  badge?: string
  dim?: boolean
}
export interface FolderTile {
  icon?: string
  label: string
  items?: string[]
  dim?: boolean
}
export interface Notif {
  app: string
  text: string
  sub?: string
  dim?: boolean
}

export interface Frame {
  /** render the lockscreen (uses phone.lock + frame.notifs) */
  lock?: boolean
  /** render the homescreen (uses phone.home) */
  home?: boolean
  app?: AppHead
  notifs?: Notif[]
  beats: (Beat | EndBeat)[]
  choice?: Choice
  continueLabel?: string
  needs?: string[]
  set?: Record<string, ChoiceValue>
}

export interface PhoneLock {
  time: string
  meridiem?: string
  day: string
  brightness: number
  wallpaper: string
  wallpaperNote?: string
}

export interface PhoneDef {
  id: string
  name: string
  /** one word — what this person does with information */
  verb: string
  essence: string
  lesson: string
  theme: string
  lock: PhoneLock
  home?: { apps: AppTile[]; folders?: FolderTile[] }
  flow: Frame[]
}

export interface TimelineEvent {
  time: string
  who: string
  label: string
  text: string
  dynamic?: { key: string; map: Record<string, string>; fallback?: string }
}

export interface ReflectionCard {
  who: string
  verb: string
  line: string
  body: string
}

export interface ArtifactTell {
  label: string
  detail: string
  /** normalized 0–1 position on the artifact */
  x: number
  y: number
}

export interface Artifact {
  id: string
  kind: 'link' | 'video' | 'photo'
  file?: string
  title?: string
  what?: string
  anchor?: string
  tells: ArtifactTell[]
}

/** A playable unit: one or more phones + epilogues (used by the
    anthology port; Scam Radar cases use one phone + a custom debrief). */
export interface StoryDef {
  id: string
  storeKey: string
  title: string
  subtitle?: string
  blurb?: string
  entry: string
  order: string[]
  phones: Record<string, PhoneDef>
  artifacts?: Artifact[]
}
