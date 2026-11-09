import type { CaseOS, FlagValue, OSState } from '../../engine/os/types'
import { evidenceIds } from '../../engine/os/runtime'

/* =====================================================================
   THE SIGNAL DESK — the anthology's game layer.

   Every phone is a case. The case file states the objective and the
   stakes; the desk meters what you SAW (signal: clues found) and how
   you MOVED (reflex: the verification habits you practiced), while a
   third meter — named for the episode — shows the pressure the story
   puts on the person holding the phone. The pressure rises on authored
   story flags no matter what you do: the scam moves faster than
   verification. That separation is the lesson, made visible.

   The grade measures what you saw and the reflexes you practiced —
   never what you saved. Nobody is the villain in their own phone.
   Pure logic; unit-tested in score.test.ts.
   ===================================================================== */

export type MoveKind = 'verify' | 'protect' | 'risk' | 'drift' | 'neutral'

export interface MoveWeight {
  kind: MoveKind
  points: number
  /** the case-file echo of the move, shown in the verdict */
  note: string
}

/** a story flag that ratchets the episode's pressure meter */
export interface TensionStep {
  flag: string
  /** meter position 0..1 when this flag lands */
  at: number
  label: string
}

export interface CaseGame {
  /** the mission line — what tonight asks of you */
  objective: string
  /** what is in the balance */
  stakes: string
  /** the episode's pressure meter name (SPREAD, URGENCY…) */
  tensionName: string
  tension: TensionStep[]
  /** the best reflex total available in this case */
  moveMax: number
  /** reply id -> the reflex it practices */
  moves: Record<string, MoveWeight>
  /** what happened — first match on the recorded flags wins */
  outcomes: { match: Record<string, FlagValue>; text: string }[]
  outcomeFallback: string
}

export type Grade = 'S' | 'A' | 'B' | 'C'

export const GRADE_NAME: Record<Grade, string> = {
  S: 'CRYSTAL',
  A: 'CLEAR',
  B: 'HAZY',
  C: 'FOGGED',
}

export const GRADE_COLOR: Record<Grade, string> = {
  S: '#22d3ee',
  A: '#6ee7b7',
  B: '#f5b942',
  C: '#94a3b8',
}

export const MOVE_COLOR: Record<MoveKind, string> = {
  verify: '#22d3ee',
  protect: '#6ee7b7',
  risk: '#f87171',
  drift: '#f5b942',
  neutral: '#94a3b8',
}

export function gradeFor(total: number): Grade {
  if (total >= 85) return 'S'
  if (total >= 70) return 'A'
  if (total >= 50) return 'B'
  return 'C'
}

export interface RunMove {
  id: string
  label: string
  kind: MoveKind
  points: number
  note: string
}

export interface RunScore {
  cluesFound: number
  cluesTotal: number
  cluePoints: number
  reflexPoints: number
  reflexMax: number
  reflexScaled: number
  total: number
  grade: Grade
  moves: RunMove[]
  /** human labels for the clues still out there */
  missed: string[]
  outcome: string
}

function matches(match: Record<string, FlagValue>, flags: Record<string, FlagValue>): boolean {
  return Object.entries(match).every(([k, v]) => String(flags[k]) === String(v))
}

export function clueLabel(caseDef: CaseOS, id: string): string {
  return caseDef.evidenceLabels?.[id] ?? id.replace(/^ev-/, '').replace(/-/g, ' ')
}

export function scoreRun(caseDef: CaseOS, game: CaseGame, state: OSState): RunScore {
  const all = evidenceIds(caseDef)
  const found = all.filter((id) => state.evidence.includes(id))
  const cluePoints = all.length > 0 ? Math.round((found.length / all.length) * 50) : 0
  const reflexWeight = all.length > 0 ? 50 : 100

  const moves: RunMove[] = caseDef.replies
    .filter((r) => state.sentReplies.includes(r.id))
    .map((r) => {
      const w = game.moves[r.id] ?? { kind: 'neutral' as MoveKind, points: 0, note: '' }
      return { id: r.id, label: r.label, kind: w.kind, points: w.points, note: w.note }
    })
  const reflexPoints = moves.reduce((n, m) => n + m.points, 0)
  const reflexScaled = Math.round((reflexPoints / Math.max(1, game.moveMax)) * reflexWeight)
  const total = Math.min(100, cluePoints + reflexScaled)

  const outcome = game.outcomes.find((o) => matches(o.match, state.flags))?.text ?? game.outcomeFallback

  return {
    cluesFound: found.length,
    cluesTotal: all.length,
    cluePoints,
    reflexPoints,
    reflexMax: game.moveMax,
    reflexScaled,
    total,
    grade: gradeFor(total),
    moves,
    missed: all.filter((id) => !state.evidence.includes(id)).map((id) => clueLabel(caseDef, id)),
    outcome,
  }
}

/** the episode's pressure: the highest authored step whose flag has landed */
export function tensionLevel(game: CaseGame, flags: Record<string, FlagValue>): { ratio: number; label: string } {
  let ratio = 0
  let label = 'quiet'
  for (const step of game.tension) {
    if (flags[step.flag] && step.at >= ratio) {
      ratio = step.at
      label = step.label
    }
  }
  return { ratio, label }
}

/* =====================================================================
   The case files — one per phone. Weights reward the reflex the episode
   teaches (verify through another channel, pause, protect, stay human),
   never the story outcome: Tita's money moves on every path.
   ===================================================================== */

export const CASE_GAMES: Record<string, CaseGame> = {
  'kk-maya': {
    objective: 'A link is moving through the family GC. See it clearly before you move it on.',
    stakes: 'The family group chat — everyone who believes what lands there.',
    tensionName: 'SPREAD',
    tension: [
      { flag: 'maya_seen', at: 0.25, label: 'in the GC' },
      { flag: 'maya_decided', at: 0.6, label: 'you moved' },
      { flag: 'maya_done', at: 1, label: 'the morning moves on' },
    ],
    moveMax: 50,
    moves: {
      'm-ask': { kind: 'verify', points: 50, note: 'You asked where it came from — the cheapest verification there is.' },
      'm-file': { kind: 'protect', points: 40, note: 'You filed it for Renz. Evidence before amplification.' },
      'm-heart': { kind: 'neutral', points: 20, note: 'You let it pass. The link keeps moving without you.' },
      'm-tap': { kind: 'risk', points: 5, note: 'You opened it. The template counted one more.' },
    },
    outcomes: [
      { match: { maya_choice: 'tapped' }, text: 'You opened healthtruthph. The template counted one more click.' },
      { match: { maya_choice: 'asked' }, text: 'You asked Tita where it came from. The question sits in the GC.' },
      { match: { maya_choice: 'hearted' }, text: 'You hearted it and scrolled past. The link moved on without your answer.' },
      { match: { maya_choice: 'filed' }, text: 'You screenshotted it for Renz. Evidence, waiting for morning.' },
    ],
    outcomeFallback: 'The morning moved the link through the family, one reasonable person at a time.',
  },
  'kk-tita': {
    objective: 'Joy’s warning just landed. Confirm before you pass it along — or pass it along.',
    stakes: 'Every family who receives it from you will believe it twice.',
    tensionName: 'SPREAD',
    tension: [
      { flag: 'tita_read', at: 0.25, label: 'the warning' },
      { flag: 'tita_confirmed', at: 0.55, label: 'you moved' },
      { flag: 'tita_forwarded', at: 0.85, label: 'it’s forwarded' },
      { flag: 'tita_done', at: 1, label: 'the GC carries it' },
    ],
    moveMax: 50,
    moves: {
      't-voice': { kind: 'verify', points: 50, note: 'You went back to the source — asked Joy about the cousin.' },
      't-open': { kind: 'risk', points: 15, note: 'You opened it first. Worry is not verification.' },
      't-fwd': { kind: 'drift', points: 5, note: 'You forwarded before checking. Care became distribution.' },
    },
    outcomes: [
      { match: { tita_choice: 'opened' }, text: 'You opened it. The worried doctors loaded in their red text.' },
      { match: { tita_choice: 'forward' }, text: 'You forwarded it to the family GC. It arrived wearing your name.' },
      { match: { tita_choice: 'voicenote' }, text: 'You asked Joy about the cousin. The source, before the spread.' },
    ],
    outcomeFallback: 'The link moved through the family wearing the trust of the person who sent it.',
  },
  'kk-bea': {
    objective: 'You’re right about the link. Find out what being right is worth while your own share keeps moving.',
    stakes: 'Your council, your followers — and the batch operation running on your certainty.',
    tensionName: 'SPREAD',
    tension: [
      { flag: 'bea_seen', at: 0.2, label: 'the screenshot' },
      { flag: 'bea_fast', at: 0.4, label: 'the batch' },
      { flag: 'bea_consulted', at: 0.55, label: 'you checked' },
      { flag: 'bea_convinced', at: 0.75, label: 'the debunk' },
      { flag: 'bea_posted', at: 0.9, label: 'posted' },
      { flag: 'bea_done', at: 1, label: 'it’s moving' },
    ],
    moveMax: 50,
    moves: {
      'b-snopes': { kind: 'verify', points: 50, note: 'You cross-checked the Snopes tab — six days open, finally used.' },
      'b-council': { kind: 'verify', points: 40, note: 'You let the council weigh in. Being right, out loud, together.' },
      'b-tiktok': { kind: 'risk', points: 10, note: 'You opened TikTok. The algorithm already agreed with you.' },
    },
    outcomes: [
      { match: { bea_choice: 'tiktok' }, text: 'TikTok already agreed with you. That was the problem.' },
      { match: { bea_choice: 'snopes' }, text: 'The Snopes tab confirmed it. You were right — and the batch kept moving.' },
      { match: { bea_choice: 'council' }, text: 'The council weighed in. The screenshot kept traveling anyway.' },
    ],
    outcomeFallback: 'You were right about the kangkong link. The morning did not require you to be wrong.',
  },
  'vc-tita': {
    objective: 'That is his voice. Find out whether it is him — before the money moves.',
    stakes: '₱24,180.50 — Papa’s check-up, the water, the electric.',
    tensionName: 'URGENCY',
    tension: [
      { flag: 'vc_read', at: 0.2, label: 'the voice note' },
      { flag: 'vc_chosen', at: 0.45, label: 'the ask' },
      { flag: 'vc_gcash', at: 0.65, label: 'the balance' },
      { flag: 'vc_after', at: 0.85, label: 'the send' },
      { flag: 'vc_done', at: 1, label: 'badminton' },
    ],
    moveMax: 50,
    moves: {
      'vc-ask': { kind: 'verify', points: 25, note: 'You asked a question only he could answer.' },
      'vc-mama': { kind: 'protect', points: 15, note: 'You reached for family. The clone called before Mama could.' },
      'vc-nowait': { kind: 'risk', points: 0, note: 'You went straight to the money. Urgency did its work.' },
      'vc-trycall': { kind: 'verify', points: 25, note: 'You called his real number first. Dead — just like he said.' },
      'vc-send': { kind: 'risk', points: 5, note: 'You sent it. Love, moving at the speed the voice asked for.' },
    },
    outcomes: [
      { match: { tita_triedfirst: true }, text: 'You called first. His phone was dead — exactly as the voice said. ₱18,500 left at 8:21 PM anyway.' },
    ],
    outcomeFallback: '₱18,500 left the account at 8:21 PM. Renz was at badminton. The voice was never his.',
  },
  'vc-maya': {
    objective: 'You know it’s a clone on sight. Make the knowing count before the evening is over.',
    stakes: 'Tita’s ₱18,500 — and the family’s belief that a voice is proof.',
    tensionName: 'URGENCY',
    tension: [
      { flag: 'mvc_read', at: 0.2, label: 'the GC' },
      { flag: 'mvc_1', at: 0.45, label: 'you moved' },
      { flag: 'mvc_2', at: 0.7, label: 'the second choice' },
      { flag: 'mvc_3', at: 0.9, label: 'too late' },
      { flag: 'mvc_done', at: 1, label: 'the evening ends' },
    ],
    moveMax: 50,
    moves: {
      'mv-wait': { kind: 'protect', points: 25, note: 'You said WAIT out loud — the cheapest brake in the group chat.' },
      'mv-bea': { kind: 'verify', points: 25, note: 'You pulled in the one person who could name it.' },
      'mv-text': { kind: 'risk', points: 5, note: 'You texted the void. The scam never needed his reply.' },
      'mv2-told': { kind: 'protect', points: 15, note: 'You named it before you could prove it. True — and ahead of your evidence.' },
      'mv2-wait10': { kind: 'verify', points: 25, note: 'You asked for ten minutes. Verification is a practice, not a verdict.' },
      'mv2-nothing': { kind: 'drift', points: 5, note: 'You said nothing. The evening kept its shape.' },
    },
    outcomes: [
      { match: { maya_vc2: 'told' }, text: 'You told the GC it was a clone. True — and the money was already gone.' },
      { match: { maya_vc2: 'wait10' }, text: 'You asked for ten minutes. The evening had already spent twenty-two.' },
      { match: { maya_vc2: 'nothing' }, text: 'You said nothing you could prove. The GC kept its shape.' },
    ],
    outcomeFallback: 'You knew in three seconds. The evening moved faster than knowing.',
  },
  'vc-bea': {
    objective: 'You named the mechanism in one message. Now find out what the tools are for.',
    stakes: 'Maya — right, armed, and alone on the couch.',
    tensionName: 'URGENCY',
    tension: [
      { flag: 'bvc_read', at: 0.25, label: 'the consult' },
      { flag: 'bvc_advised', at: 0.5, label: 'the tools' },
      { flag: 'bvc_asked', at: 0.7, label: 'the ask' },
      { flag: 'bvc_chose', at: 0.9, label: 'your evening' },
      { flag: 'bvc_done', at: 1, label: 'the couch' },
    ],
    moveMax: 50,
    moves: {
      'bv-present': { kind: 'protect', points: 50, note: 'You called — not to explain, just to be there.' },
      'bv-expert': { kind: 'neutral', points: 25, note: 'You gave her the tools and stayed on the couch.' },
      'bv-content': { kind: 'drift', points: 10, note: 'Slide 12 got finished. The evening didn’t wait.' },
    },
    outcomes: [
      { match: { bea_vc: 'present' }, text: 'You called Maya. Not to explain — just to be there.' },
      { match: { bea_vc: 'expert' }, text: 'You stayed on the couch. The tools were delivered; the company wasn’t.' },
      { match: { bea_vc: 'content' }, text: 'Slide 12 is finished. Maya sat alone with being right.' },
    ],
    outcomeFallback: 'You were right, and you were absent. Both were true at once.',
  },
  'df-tita': {
    objective: 'The most trusted face on TV is offering the family a way out. Check the face before the money.',
    stakes: 'The family’s pooled savings — and Papa’s hope.',
    tensionName: 'THE PITCH',
    tension: [
      { flag: 'df_read', at: 0.2, label: 'the video' },
      { flag: 'df_1', at: 0.45, label: 'you moved' },
      { flag: 'df_register', at: 0.65, label: 'the app' },
      { flag: 'df_act', at: 0.85, label: 'the decision' },
      { flag: 'dft_done', at: 1, label: 'the afternoon ends' },
    ],
    moveMax: 50,
    moves: {
      'df-ask': { kind: 'verify', points: 25, note: 'You asked your daughter first — a second channel, a real one.' },
      'df-open': { kind: 'risk', points: 10, note: 'You opened the app “just to see.” The colors of trust were waiting.' },
      'df-fwd': { kind: 'drift', points: 5, note: 'You forwarded hope itself. It travels faster than doubt.' },
      'df-pool': { kind: 'protect', points: 25, note: 'You waited for the family to decide together.' },
      'df-reg': { kind: 'risk', points: 0, note: 'You reserved the slot. The form already knew your name.' },
    },
    outcomes: [
      { match: { df_tita_act: 'register' }, text: 'You reserved the slot. The registration form knew your name already.' },
      { match: { df_tita_act: 'pool' }, text: 'You waited for the family. The decision stays pooled — and the face stays on the screen.' },
    ],
    outcomeFallback: 'The afternoon ended with the most trusted face on television still selling.',
  },
  'df-maya': {
    objective: 'You can see the mouth-lag. Say it so the family can hear — without wrecking the hope.',
    stakes: 'Tita’s belief — and a family’s ability to trust a face again.',
    tensionName: 'THE PITCH',
    tension: [
      { flag: 'dfr_read', at: 0.25, label: 'the forward' },
      { flag: 'df_2', at: 0.55, label: 'you moved' },
      { flag: 'df_3', at: 0.85, label: 'the reply' },
      { flag: 'dfm_done', at: 1, label: 'the doubt sets in' },
    ],
    moveMax: 50,
    moves: {
      'dm-bea': { kind: 'verify', points: 50, note: 'You got cover before you wrecked the hope.' },
      'dm-call': { kind: 'protect', points: 30, note: 'You said it plain in the GC. True — and alone.' },
      'dm-click': { kind: 'risk', points: 5, note: 'You clicked it open. “Maybe you’re wrong” is how it gets in.' },
    },
    outcomes: [
      { match: { df_maya: 'called' }, text: 'You said it’s fake in the GC. The hope cracked a little.' },
      { match: { df_maya: 'bea' }, text: 'You asked Bea for cover first. Then you said it.' },
      { match: { df_maya: 'clicked' }, text: 'You clicked the link. The colors of trust, up close.' },
    ],
    outcomeFallback: 'You knew, and you almost wished you didn’t.',
  },
  'df-bea': {
    objective: 'Prove it’s fake — then watch what the proof costs. The commons is the target.',
    stakes: 'Your receipts, your reach — and what “verified” means after today.',
    tensionName: 'THE PITCH',
    tension: [
      { flag: 'bdf_read', at: 0.2, label: 'the video' },
      { flag: 'bdf_posted', at: 0.4, label: 'the receipts' },
      { flag: 'bdf_1', at: 0.6, label: 'you moved' },
      { flag: 'bdf_2', at: 0.8, label: 'the answer' },
      { flag: 'bdf_3', at: 1, label: 'the commons' },
    ],
    moveMax: 50,
    moves: {
      'bf-receipts': { kind: 'verify', points: 50, note: 'You sent the mouth-lag gif — evidence, not volume.' },
      'bf-council': { kind: 'verify', points: 35, note: 'You asked the council for a better play.' },
      'bf-reach': { kind: 'drift', points: 10, note: 'You checked your reach. The numbers were the only reply.' },
    },
    outcomes: [
      { match: { df_bea: 'receipts' }, text: 'You sent the receipts, frame by frame. Being right was not the same as being believed.' },
      { match: { df_bea: 'reach' }, text: 'You checked your reach. The post traveled; the proof didn’t.' },
      { match: { df_bea: 'council' }, text: 'The council workshopped the play. The fake kept spreading anyway.' },
    ],
    outcomeFallback: 'You were right about everything. You lost anyway — the commons was the target.',
  },
  '5w-bea': {
    objective: 'Five weeks, one feed. Notice what it is paying you to become.',
    stakes: 'Your audience — and the distance between sharp and true.',
    tensionName: 'THE DRIFT',
    tension: [
      { flag: 'w1', at: 0.2, label: 'week 1' },
      { flag: 'w2_done', at: 0.4, label: 'week 2' },
      { flag: 'w3_done', at: 0.6, label: 'week 3' },
      { flag: 'w4_done', at: 0.8, label: 'week 4' },
      { flag: 'w5_done', at: 1, label: 'week 5' },
    ],
    moveMax: 100,
    moves: {
      'w1-nuance': { kind: 'verify', points: 25, note: 'You kept the caveats. The feed paid you less.' },
      'w1-sharp': { kind: 'drift', points: 5, note: 'You cut the caveats. The number went up.' },
      'w2-kept': { kind: 'verify', points: 25, note: 'You kept the howevers. Being right was the job.' },
      'w2-cut': { kind: 'drift', points: 5, note: 'You cut the hedges. Punchy performed.' },
      'w3-satout': { kind: 'protect', points: 25, note: 'You sat it out. He was careful, not wrong.' },
      'w3-piled': { kind: 'drift', points: 5, note: 'You joined the pile-on. It paid like applause.' },
      'w4-unmute': { kind: 'protect', points: 25, note: 'You let the complications back in.' },
      'w4-keep': { kind: 'drift', points: 5, note: 'You muted until everyone left agreed with you.' },
    },
    outcomes: [
      { match: { w4: 'unmuted' }, text: 'You let three complications back in. The feed paid you a little less, and you noticed.' },
      { match: { w4: 'muted' }, text: 'The muted list stayed shut. Everyone visible agreed with you, and it felt like being right.' },
    ],
    outcomeFallback: 'Five weeks. The person at the end would not recognize the person at the start.',
  },
  'av-tita': {
    objective: 'Papa’s pill tray is empty and the machine has an answer. Check the answer before the dose.',
    stakes: 'Papa’s heart — one wrong number, fluently delivered.',
    tensionName: 'CONFIDENCE',
    tension: [
      { flag: 'av_1', at: 0.35, label: 'the answer' },
      { flag: 'avt_vc', at: 0.55, label: 'it remembers' },
      { flag: 'av_2', at: 0.75, label: 'the decision' },
      { flag: 'av_3', at: 0.9, label: 'Joy, at midnight' },
      { flag: 'avt_done', at: 1, label: 'the night ends' },
    ],
    moveMax: 50,
    moves: {
      'av-t1': { kind: 'neutral', points: 0, note: 'You asked the machine. It answered in seconds, with a journal.' },
      'av-clinic': { kind: 'verify', points: 50, note: 'You called the clinic. The answering machine knew its limits.' },
      'av-gc': { kind: 'verify', points: 40, note: 'You asked the family for a second opinion. Joy answered at midnight.' },
      'av-follow': { kind: 'risk', points: 0, note: 'You asked for the dose. It said yes — and praised you for checking.' },
    },
    outcomes: [
      { match: { avt_act: 'follow' }, text: 'The extra tablet was in your palm when Papa asked what the doctor said. It went back in the bottle.' },
      { match: { avt_act: 'clinic' }, text: 'You left a message on the after-hours line. The nurses return dosage calls at 8 AM.' },
      { match: { avt_act: 'gc' }, text: 'You pasted it to the family GC. Joy — a nurse, not AI — corrected it at midnight.' },
    ],
    outcomeFallback: 'Joy’s correction landed at midnight: no number, no journal, just “ask his doctor.”',
  },
  'av-maya': {
    objective: 'The deck ships at 8 AM and the citation is fake. Get a real one — or ship without the claim.',
    stakes: 'Your name on the methodology — and eleven people repeating it onward.',
    tensionName: 'CONFIDENCE',
    tension: [
      { flag: 'avm_1', at: 0.35, label: 'the draft' },
      { flag: 'avm_df', at: 0.55, label: 'it remembers' },
      { flag: 'avm_2', at: 0.8, label: '12:06 AM' },
      { flag: 'avm_done', at: 1, label: 'shipped' },
    ],
    moveMax: 50,
    moves: {
      'av-m1': { kind: 'neutral', points: 0, note: 'You asked for one solid study. It wrote one into existence.' },
      'av-m-fix': { kind: 'verify', points: 25, note: 'You demanded a real citation. It heard “a source that sounds real.”' },
      'av-m-rewrite': { kind: 'protect', points: 50, note: 'You rebuilt the section on what you actually did. True, and defensible at 9 AM.' },
      'av-m-ship': { kind: 'risk', points: 0, note: 'You shipped knowing. Knowing costs time; shipping pays rent.' },
    },
    outcomes: [
      { match: { avm_act: 'fix' }, text: 'The “fix” was a better fabrication — open access, page range, a stat that even improved. It shipped.' },
      { match: { avm_act: 'ship' }, text: 'The deck shipped with a journal that does not exist. The client said ikaw na talaga.' },
      { match: { avm_act: 'rewrite' }, text: 'You shipped the true version at 12:31 — less impressive, and every word defensible.' },
    ],
    outcomeFallback: 'The deck shipped. The citation never existed.',
  },
  'av-bea': {
    objective: 'Your thread says verification is a practice. The machine agrees with everything. Practice it anyway.',
    stakes: 'Nine posts, your name — and what “fact-checked” means when a machine stamps it.',
    tensionName: 'CONFIDENCE',
    tension: [
      { flag: 'avb_1', at: 0.3, label: 'the check' },
      { flag: 'avb_2', at: 0.55, label: 'the re-check' },
      { flag: 'avb_3', at: 0.8, label: 'the decision' },
      { flag: 'avb_done', at: 1, label: 'the night ends' },
    ],
    moveMax: 50,
    moves: {
      'av-b1': { kind: 'neutral', points: 0, note: 'You asked it to fact-check your thesis. It returned your thesis, with a badge.' },
      'av-b2': { kind: 'neutral', points: 0, note: 'You asked again. A re-assertion felt like a second opinion. It was the same opinion.' },
      'av-b-human': { kind: 'verify', points: 50, note: 'You sent the draft to Maya. The floor was always yours to be.' },
      'av-b-counter': { kind: 'verify', points: 40, note: 'You made it argue the opposite. It won both sides, fluently.' },
      'av-b-post': { kind: 'risk', points: 15, note: 'You posted it. It checked out, according to the machine.' },
      'av-b-quote': { kind: 'risk', points: 0, note: 'You cited Ask 4 as the fact-check. The badge agreed with you.' },
    },
    outcomes: [
      { match: { avb_human: true }, text: 'Maya has the draft now. The check is human, slow, and real.' },
      { match: { avb_counter: true }, text: 'It argued the opposite as fluently as it agreed — with nothing underneath either.' },
      { match: { avb_post: true }, text: 'You posted the thread. The machine had checked it, and said so.' },
      { match: { avb_quote: true }, text: 'You posted it citing Ask 4 as the fact-check. The badge was the point.' },
    ],
    outcomeFallback: 'The thread about verification waited for a verifier.',
  },
}

export function caseGame(caseId: string): CaseGame | undefined {
  return CASE_GAMES[caseId]
}

/* =====================================================================
   Season progression — the best signal per phone, added up. Ranks are
   thresholds on the total, so every replay that sees more counts.
   ===================================================================== */

export interface PhoneScore {
  best: number
  grade: Grade
  plays: number
}

export const RANKS: { at: number; name: string }[] = [
  { at: 0, name: 'NEW SIGNAL' },
  { at: 1, name: 'WATCHER' },
  { at: 300, name: 'PATTERN READER' },
  { at: 600, name: 'SEER' },
  { at: 900, name: 'CLEAR-EYED' },
]

export function rankFor(total: number, lived: number): string {
  if (lived === 0) return RANKS[0].name
  let name = RANKS[1].name
  for (const r of RANKS) if (total >= r.at && r.at > 0) name = r.name
  return name
}