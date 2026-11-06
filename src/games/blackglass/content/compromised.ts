import type { CaseOS } from '../../../engine/os/types'
import type { AnthologyAnchor } from '../types'

/* =====================================================================
   ANCHOR VI (DRAFT — canon review pending; craft/maya/_meta/anchor-vi-brief.md)
   "THE COMPROMISED PHONE" / Spot — the inversion anchor. Fear: exposure.

   This module is flag-gated: it renders only behind ?draft=vi and is never
   in the live ANCHORS array. Every canon-bearing name/beat below is DRAFT
   or TBC (see brief §5). Guardrails: detection/recovery only — no tools,
   no tradecraft; the access event stays off-screen.

   PROSE VERSION: V2 (2026-11-08) — written through the doctrine's loop:
   V1 (the P5 skeleton) → recorded self-critique → V2 (brief §8). V2 changes:
   the systemic cause is a routine, not a villain; the fear lands on a person
   via phone 2 (Mama was awake at 3:47 and said nothing); the report is now
   performed from the run's own recorded flags, including what you missed.
   ===================================================================== */

/* DRAFT/TBC: framing A — the holder is second-person "you," unnamed. */

const OWN: CaseOS = {
  id: 'own-draft', // DRAFT: id TBC at canon review
  title: 'You (DRAFT)', // DRAFT/TBC: does the holder get a canon name? (brief §5.2)
  tagline: 'something’s off, and it’s your own phone',
  blurb:
    'DRAFT (V2) — You have held every phone this season like a detective. Tonight you bring your own. Money you never sent. Mail with a second reader. Messages in your voice at an hour you were asleep. The verb is SPOT. Lesson: the hardest device to audit is the one you already trust.',
  level: 'Anchor VI · DRAFT',
  minutes: '6–8 min',
  phone: {
    wallpaper: 'grid',
    time: '3:52',
    meridiem: 'AM',
    day: 'Thursday',
    battery: 34,
    lockNote: 'DRAFT — “change your passwords. mail FIRST.” — your own handwriting, two nights old, not done.',
    theme: 'own',
    stage: 'clean',
    stageSig: 'glass-flicker',
    ghostTiles: [
      // DRAFT: the disguised entry — renders exactly like a system tile; the
      // page it opens is the tell. Name subject to canon veto (brief §5.6).
      { id: 'own-ghost-tools', label: 'System Tools', icon: '⚙️', pageId: 'sys-tools' },
    ],
  },
  contacts: [
    { id: 'mama', name: 'Mama', number: '0917-553-0147', relation: 'DRAFT/TBC — canon names pending' },
    { id: 'renz', name: 'Kuya Renz', number: '0928-771-3345', relation: 'DRAFT/TBC' },
    { id: 'bea', name: 'Bea 💛', number: '0918-664-2093', relation: 'DRAFT/TBC' },
  ],
  threads: [
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
  ],
  opening: [
    { threadId: 'gc', msg: { from: 'you', text: 'Mama, paki-check ng lamesa. Naiwan ko yung reseta ni Papa sa drawer.', at: '3:47 AM' } },
    { threadId: 'gc', msg: { from: 'you', text: 'Yung 3k na padala, bukas ko na itutuloy. Agahan ko pa.', at: '3:47 AM' } },
    { threadId: 'gc', msg: { from: 'sys', kind: 'silence', receipt: true, text: 'Sent · 3:47 AM. Nobody was awake. Nobody will ever remember these.' } }, // P8: the never-arriving receipt
  ],
  photos: [],
  pages: [
    {
      // the ghost tile's about page — the disguise, examined
      id: 'sys-tools',
      url: 'device://system-tools/about',
      title: 'System Tools',
      kind: 'dashboard',
      badge: 'Device health · 4 services running',
      headline: 'System Tools keeps this device healthy',
      body: [
        'System Tools manages background maintenance, storage cleanup, and message backups so your device stays fast.',
        'Installed: 11 days ago · Device administrator: enabled · Uninstall: unavailable while administrator is enabled.',
        'Last maintenance window: 2:58 AM – 4:12 AM, nightly.',
      ],
      tells: [
        { label: 'You have never opened this app on purpose', detail: 'It says it was installed 11 days ago. You did not install anything 11 days ago. Device administrator means it cannot be removed from the screen you are holding.' },
        { label: '“Message backups”', detail: 'Backups to where? The page never says. Every other backup on this phone names its destination.' },
      ],
      evidence: 'ev-own-tools',
    },
    {
      // the mail forwarding rule — a rule you did not add
      id: 'mail-forward',
      url: 'mail.ownhub.ph/settings/forwarding',
      title: 'Mail · Forwarding and POP/IMAP',
      kind: 'dashboard',
      badge: 'Account settings',
      headline: 'Forwarding',
      body: [
        'Forward a copy of incoming mail to: records-keeper@vaultmail.services',
        'Added: 11 days ago · Keep a copy in Inbox: checked · Status: Active.',
        'You can remove this address any time. You have never seen it before tonight.',
      ],
      tells: [{ label: 'Every letter you receive has a second reader', detail: 'Forwarding copies mail as it arrives — resets, receipts, the family’s travel plans. Added 11 days ago: the same day System Tools appeared.' }],
      evidence: 'ev-own-mail',
    },
    {
      // detection & recovery literacy — depict, never enable (guardrails §6)
      id: 'spotcheck',
      url: 'consumer-voice.ph/guides/phone-checkup',
      title: 'How to tell if someone else is inside your phone',
      kind: 'news',
      headline: 'A plain-language checkup anyone can run',
      body: [
        'Most phone compromises start with brief physical access — a repaired phone, a borrowed charger weekend, a phone out of your hands for ten minutes. You do not need to know how they got in. You need to know what to look at.',
        'The signs: battery draining faster than it should; screen time you can’t account for (especially overnight); messages in your own voice that you don’t remember sending; a forwarding rule in your mail settings that you didn’t add; an app claiming device-administrator rights that you never installed.',
        'The first moves, in order: from a DIFFERENT device, change the passwords that matter (mail first — mail resets everything else). Remove any forwarding rule you didn’t add. Turn off device administrator for apps you don’t recognize, then uninstall. Tell your bank about transfers you didn’t make — small amounts first are often a test. And tell one person, out loud. The isolation is part of the harm; saying it ends the isolation first.',
      ],
      evidence: 'ev-own-guide',
    },
  ],
  screentime: [
    { app: 'Messages', mins: '412', note: 'mostly the family GC — normal' },
    { app: 'Browser', mins: '96' },
    { app: 'Photos', mins: '38' },
    { app: 'System services', mins: '1,904', note: 'active 2:58–4:12 AM, three nights this week' }, // the gap, as data
    { app: 'Screen time total', mins: '—', note: 'Sunday: 47 minutes unaccounted for between 2:58 and 3:45' },
  ],
  notes: [
    { title: 'sticky, two nights ago', body: 'change passwords. mail FIRST. (not done)' }, // the recovery beat
  ],
  calendar: [
    { day: 'Thu', time: '10:30 AM', title: 'Phone repair shop — screen replacement', place: 'DRAFT/TBC — one of the routine hand-offs (brief §5.3)' },
    { day: 'Sat', time: '6:00 PM', title: 'Family dinner', place: "Mama's" },
    { day: 'Sun', time: '9:00 PM', title: 'Call the bank about the transfers', place: 'moved twice already' },
  ],
  wallet: {
    balance: '₱9,214.60',
    rows: [
      { id: 'own-w1', day: 'Thu', label: 'Salary · 15th', amount: '+₱19,400.00', kind: 'in' },
      { id: 'own-w2', day: 'Sun', label: 'Transfer · 0915-•••-•••• · 3:47 AM', amount: '-₱1,200.00', note: 'you were asleep', meta: 'You were asleep at 3:47 AM. The phone was on the charger beside your bed — one hand’s reach away, face up, the way you always leave it. The transfer needed your thumbprint or your PIN. It used one of them.', evidence: 'ev-own-ledger' },
      { id: 'own-w3', day: 'Tue', label: 'Transfer · 0915-•••-•••• · 3:52 AM', amount: '-₱800.00', note: 'you were asleep', meta: '₱800 more, four nights later. Small amounts, evenly spaced — not greed; inventory. The guide has a name for the first small ones: a test of whether you look at the ledger at all. You had not, until tonight.', evidence: 'ev-own-ledger' },
      { id: 'own-w4', day: 'Wed', label: 'Groceries', amount: '-₱1,340.75' },
    ],
  },
  replies: [
    { id: 'own-r-tools', threadId: 'gc', label: 'Open System Tools — what is this app?', hideWhen: 'own_spotted_tools', set: { own_ask_tools: true } },
    { id: 'own-r-mail', threadId: 'gc', label: 'Check the mail rules', hideWhen: 'own_spotted_mail', set: { own_ask_mail: true } },
    { id: 'own-r-time', threadId: 'gc', label: 'Check the screen time', hideWhen: 'own_spotted_time', set: { own_ask_time: true } },
  ],
  moments: [
    {
      id: 'own-open', // DRAFT V2 prose
      label: 'Pick it up',
      openThread: 'gc',
      text: [
        'You have held every phone this season like a detective — Tita’s, Maya’s, Bea’s, strangers’. You know what a wrong app looks like. You know what a wrong sender looks like.',
        'Tonight the phone on the desk is yours. Battery dead by noon three days running. A tile you never installed. And in the family GC, two messages in your name from 3:47 AM — you have read them four times, and they are not things you remember typing.',
        'You unlock it the way you’d pick up something hot. Something’s off, and it is in here, in your photos, in your mail, in your voice. Find it. Please.',
      ],
    },
    {
      // the SPOT-loop mid-beat: the routine, not a villain (V2 — systemic cause)
      id: 'own-routine',
      label: 'Keep looking',
      text: [
        'DRAFT (V2) — Eleven days ago. You run it back the way you run back any ordinary day: the phone at the repair shop for a screen replacement, forty minutes on the counter while you bought merienda across the street. The charger you lent at the office. The weekend your cousin’s kid played games on it. Nothing about any of those moments was wrong. That is the part that sits in your chest — not a break-in you can be angry at. A routine.',
        'The guide was right about the feeling: you keep waiting to remember a mistake you could have caught. There isn’t one. There is only a door that was, for ten minutes, open.',
      ],
    },
    {
      // the mirror-moment epilogue — PERFORMED from the run's own flags (P7):
      // the report you file contains what you actually looked at; what you
      // skipped stays in it as a hole. Two variants, gated by own_assembled.
      id: 'own-report-full',
      label: 'Sign the report', // DRAFT
      text: [
        'DRAFT (V2) — The report writes itself because you wrote it while you were looking. Read it back, line by line, the way you read everyone else’s phone this season:',
        'A device-administrator app, installed 11 days ago, doing its work at the hours you were unconscious. A forwarding rule from the same day: every letter you have received since had a second reader. ₱2,000 gone in tested, even amounts. Two messages sent in your voice to the people who trust your voice most.',
        'There is a field at the bottom of the report: who else had physical access to this device in the last month. You type the truth, which starts with you — the repair shop counter, the lent charger, the cousin’s kid — and ends with a name you do not know. You sign it. You send it to the GC first, because the family has a right to know before anyone else does. Saying it out loud is the first thing the guide told you to do, and the only thing that worked immediately.',
      ],
    },
    {
      id: 'own-report-partial',
      label: 'Sign the report anyway', // DRAFT
      text: [
        'DRAFT (V2) — The report has holes, because a report is only as long as what you actually looked at.',
        'You confirmed the app. You confirmed the transfers. The rest — the mail rule you meant to check, the screen time you scrolled past — sits in the report as what it is: unchecked, unnamed, still reading you tonight. The phone does not grade you. It just keeps the log, the way it kept theirs.',
        'You sign it anyway, and send it to the GC, because the guide said tell one person out loud, and because the alternative — putting the phone back face-down, the way you found it — is exactly what the thing inside it is betting on.',
      ],
    },
  ],
  rules: [
    { id: 'own-open', when: { flag: 'os_unlocked' }, moment: 'own-open' },
    // the reply → surface wiring: the SPOT loop must lead somewhere real
    {
      id: 'own-ask-mail',
      when: { replySent: 'own-r-mail' },
      set: { own_asked_mail: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'DRAFT (V2) — Mail. The settings page you have never had a reason to open. Forwarding is usually four menus deep; tonight it is the only thing to read.' } },
        { threadId: 'gc', msg: { from: 'you', kind: 'link', pageId: 'mail-forward', at: '3:56 AM' } },
      ],
    },
    {
      id: 'own-ask-time',
      when: { replySent: 'own-r-time' },
      set: { own_asked_time: true },
      nudgeApp: 'settings',
      push: [{ threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'DRAFT (V2) — Settings. Screen time, last seven days. The numbers have a shape: everything you chose to do, and something else that chose its own hours.' } }],
    },
    // the SPOT loop — each surface found moves the chrome (P4 stages)
    { id: 'own-spot-tools', when: { inspected: 'sys-tools' }, set: { own_spotted_tools: true }, stage: 'uneasy', evidence: ['ev-own-tools'] },
    { id: 'own-spot-mail', when: { inspected: 'mail-forward' }, set: { own_spotted_mail: true }, stage: 'uneasy', evidence: ['ev-own-mail'] },
    { id: 'own-spot-time', when: { replySent: 'own-r-time' }, set: { own_spotted_time: true }, stage: 'uneasy', evidence: ['ev-own-time'] },
    // V2: after the second anomaly the routine beat lands (systemic, not villain)
    { id: 'own-routine-beat', when: { allFlags: ['own_spotted_tools', 'own_spotted_mail'] }, set: { own_routine: true }, moment: 'own-routine' },
    {
      // full assembly: the chrome stops pretending
      id: 'own-assembled',
      when: { allFlags: ['own_spotted_tools', 'own_spotted_mail', 'own_spotted_time'] },
      set: { own_assembled: true },
      stage: 'compromised',
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'DRAFT (V2) — Eleven days. Every thread of it starts the same day: the app, the rule, the first tested transfer. Not a hacker in a hoodie — a hand, a counter, ten minutes, and then a program that has been reading your life at 3 AM ever since, patiently, the way you read other people’s phones.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'silence', receipt: true, text: 'The 3:47 sends sit under this one. No one will ever answer them.' } },
      ],
    },
    {
      // the recovery beat — detection → first moves (guardrails: depict, never enable)
      id: 'own-guide',
      when: { flag: 'own_assembled' },
      set: { own_guided: true },
      push: [{ threadId: 'gc', msg: { from: 'sys', text: 'Consumer Voice · opened from Notes: “How to tell if someone else is inside your phone”' } }],
    },
    // the mirror epilogue, performed: the report reflects the run (P7)
    { id: 'own-coda-full', when: { allFlags: ['own_guided', 'own_assembled'] }, moment: 'own-report-full' },
    { id: 'own-coda-partial', when: { allFlags: ['own_guided'], notFlag: 'own_assembled' }, moment: 'own-report-partial' },
    { id: 'own-done-full', when: { flag: 'dismissed:own-report-full' }, set: { own_done: true } },
    { id: 'own-done-partial', when: { flag: 'dismissed:own-report-partial' }, set: { own_done: true } },
  ],
  evidenceLabels: {
    'ev-own-tools': 'DRAFT — Opened System Tools: installed 11 days ago, administrator rights',
    'ev-own-mail': 'DRAFT — Found the forwarding rule: every letter had a second reader',
    'ev-own-ledger': 'DRAFT — Read the 3 AM transfers: ₱2,000 you never sent',
    'ev-own-time': 'DRAFT — Read the screen time: 1,904 overnight minutes of “System services”',
    'ev-own-guide': 'DRAFT — The checkup guide: signs, and the first moves',
  },
  endFlag: 'own_done',
  outcomes: [
    { match: { own_assembled: true, own_guided: true }, title: 'DRAFT — The whole report, signed', text: 'DRAFT — Every anomaly found, every line named, said out loud to the family first. The phone is yours again — and the report stays honest about how easy the ten minutes were.', points: 45 },
    { match: { own_guided: true }, title: 'DRAFT — The report with holes, signed', text: 'DRAFT — You said it out loud before you finished looking. The guide calls that the right order: the telling matters more than the completeness.', points: 30 },
    { match: {}, title: 'DRAFT — Face-down again', text: 'DRAFT — Some of it you saw. The phone went back where it lives, screen down, still reading you.', points: 15 },
  ],
}

/* — PHONE 2 · MAMA — the receiving end of your exposure (DRAFT V2) —
   The season's Rashomon restored: the 3:47 sends as they ARRIVED. Mama was
   awake at 3:47 — mothers are — and said nothing, afraid of intruding.
   The sympathetic counter-direction (brief §8): her silence mirrors yours. */

const MAMA_OWN: CaseOS = {
  id: 'mama-draft', // DRAFT: id TBC at canon review
  title: 'Mama (DRAFT)',
  tagline: 'she was awake at 3:47',
  blurb:
    'DRAFT (V2) — The same Thursday from the other bedside table: two messages from her child at an hour no one texts, ₱3,000 spoken about like it was already agreed. She typed three replies and deleted all of them. Lesson: the second reader is not always a machine.',
  level: 'Anchor VI · DRAFT',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'lastsupper',
    time: '5:58',
    meridiem: 'AM',
    day: 'Thursday',
    battery: 88,
    lockNote: 'DRAFT — She has read the 3:47 messages eleven times. The backlight wakes Papa.',
    theme: 'tita', // DRAFT: reuse of the season's light, warm tita palette
    stage: 'clean',
  },
  contacts: [
    { id: 'you', name: 'Anak', number: 'DRAFT/TBC — the holder’s number', relation: 'DRAFT/TBC' },
    { id: 'papa', name: 'Papa', number: '0919-448-7702', relation: 'asleep, snoring lightly' },
    { id: 'renz', name: 'Kuya Renz', number: '0928-771-3345', relation: 'DRAFT/TBC' },
  ],
  threads: [
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
    { id: 'you', service: 'sms', name: 'Anak', hue: 45 },
  ],
  opening: [
    { threadId: 'gc', msg: { from: 'them', text: 'Mama, paki-check ng lamesa. Naiwan ko yung reseta ni Papa sa drawer.', at: '3:47 AM' } },
    { threadId: 'gc', msg: { from: 'them', text: 'Yung 3k na padala, bukas ko na itutuloy. Agahan ko pa.', at: '3:47 AM' } },
    { threadId: 'you', msg: { from: 'you', text: 'Anak? 3:47? Bakit ka gising?', at: '3:51 AM' } },
    { threadId: 'you', msg: { from: 'sys', kind: 'silence', receipt: false, text: 'Delivered. No reply came. She checked again at 4:30, and at 5:15.' } }, // P8: her sent line, no answer
  ],
  photos: [],
  pages: [],
  screentime: [{ app: 'Messages', mins: '29', note: 'one thread, re-read eleven times between 3:47 and 5:58' }],
  notes: [{ title: 'walis list, Friday', body: 'DRAFT — the ordinary list she writes when she cannot sleep: walis tingting, pamintas, load sa 7-11' }],
  calendar: [
    { day: 'Thu', time: '5:30 AM', title: 'Simbang gitna — coffee first', place: 'DRAFT — ambient' },
    { day: 'Sat', time: '6:00 PM', title: 'Family dinner', place: 'here' },
  ],
  wallet: {
    balance: '₱6,842.10',
    rows: [
      { id: 'mama-own-w1', day: 'Wed', label: 'Papa’s medicine refill', amount: '-₱812.00' },
      { id: 'mama-own-w2', day: 'Thu', label: 'Load · Anak’s spare phone', amount: '-₱100.00', note: 'every payday, since 2019', meta: 'DRAFT — She has been topping up the holder’s spare phone since 2019. The 3:47 messages came through the main one. She checked this ledger twice that night anyway — looking for what, she could not say.', evidence: 'ev-own-mama-ledger' },
    ],
  },
  replies: [
    { id: 'mo-r-ask', threadId: 'you', label: '“Anak, okay ka lang ba talaga?”', hideWhen: 'mo_asked', set: { mo_asked: true } },
    { id: 'mo-r-wait', threadId: 'you', label: 'Wait until morning — don’t hover', hideWhen: 'mo_asked', set: { mo_waited: true } },
  ],
  moments: [
    {
      id: 'mo-open', // DRAFT V2 prose
      label: 'Read what arrived',
      openThread: 'gc',
      text: [
        'DRAFT (V2) — 3:47 AM is a mother’s hour whether or not she sleeps through it. She was awake because Papa’s knee ached and the fan clicked on its third night of dying. The phone lit the ceiling. Two messages from her child.',
        'About a table. About ₱3,000, promised like a settled thing — “bukas ko na itutuloy” — as if they had talked about it before, and she could not find that conversation anywhere in her memory.',
        'She typed “Anak, bakit ka gising?” Then deleted it. Then typed “okay ka lang?” and deleted that too. At 3:58 she sent the DM — the smallest version of the question — and got nothing back, and did not sleep, and did not ask again.',
      ],
    },
    {
      id: 'mo-mirror', // DRAFT — the epilogue mirror (P7), built from the run's flags
      label: 'Put the phone down',
      text: [
        'DRAFT (V2) — Here is what she does not know, and what you do, because you were the hands this season: the messages that kept her awake were not her child’s. They were a program’s, wearing the voice she answers fastest. She deleted her own questions so she would not look like she was hovering — and the thing in the phone counted on exactly that. Exposure works on the family the same way it works on you: it makes everyone afraid to name the thing out loud.',
        'The confession from last night is in the GC now — the report, the forwarding rule, the transfers, the repair-shop counter. DRAFT/TBC: the holder’s words arrive here in full. She reads it standing up. Then she does the thing the guide asked of everyone: she answers, out loud, in the smallest plainest words she has.',
      ],
    },
  ],
  rules: [
    { id: 'mo-open', when: { flag: 'os_unlocked' }, moment: 'mo-open' },
    { id: 'mo-asked-r', when: { replySent: 'mo-r-ask' }, set: { mo_reached: true, mo_seen_confession: true }, push: [
      { threadId: 'you', msg: { from: 'sys', kind: 'narr', text: 'DRAFT (V2) — You asked. The typing bubble rose and fell twice on the other end, and then the confession came — not a summary, the whole report, pasted in, every line. It is worse than the 3:47 messages and it is also, somehow, a relief: she was not imagining the wrongness.' } },
    ] },
    { id: 'mo-waited-r', when: { replySent: 'mo-r-wait' }, set: { mo_waited: true, mo_seen_confession: true }, push: [
      { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'DRAFT (V2) — You waited. The confession landed in the GC at 9:02 like everyone else’s morning — the report, the rule, the transfers. You read it in the kitchen with wet hands. Your three deleted questions from 3:47 sit in drafts, obsolete and still true.' } },
    ] },
    { id: 'mo-coda', when: { flag: 'mo_seen_confession' }, moment: 'mo-mirror' },
    { id: 'mo-done', when: { flag: 'dismissed:mo-mirror' }, set: { mo_done: true } },
  ],
  evidenceLabels: {
    'ev-own-mama-ledger': 'DRAFT — Mama’s ledger: the load she has sent since 2019',
  },
  endFlag: 'mo_done',
  outcomes: [
    { match: { mo_reached: true }, title: 'DRAFT — She asked', text: 'DRAFT — One small question at 5:58 AM, and the confession had somewhere to land.', points: 30 },
    { match: {}, title: 'DRAFT — She waited', text: 'DRAFT — She gave the child the morning. The confession came anyway, in front of everyone.', points: 20 },
  ],
}

export const COMPROMISED: AnthologyAnchor = {
  id: 'compromised-draft', // DRAFT: id TBC at canon review
  title: 'THE COMPROMISED PHONE (DRAFT)',
  subtitle: 'Spot',
  blurb:
    'DRAFT (V2) — The season’s holder brings their own phone to the rack: “something’s off.” A forwarding rule you didn’t add. Transfers at 3:47 AM. Messages in your voice. And across town, the person those messages woke. The fear is exposure; the verb is SPOT.',
  question: 'What has your phone been doing while you slept — and who else was awake?',
  entry: 'own',
  order: ['own', 'mama'],
  phones: { own: OWN, mama: MAMA_OWN },
  timeline: {
    title: 'DRAFT — Eleven days, two bedside tables',
    intro: 'DRAFT — One routine hand-off, one program, and the two people it kept awake.',
    events: [
      { time: '−11d', who: 'own', label: 'The access (off-screen)', text: 'DRAFT/TBC — Deliberately not shown: a counter, ten minutes, a routine. The door was already closed when you noticed it had been open.' },
      { time: '−11d', who: 'own', label: 'System Tools appears', text: 'DRAFT — Installed with administrator rights; nightly maintenance windows at 2:58 AM.' },
      { time: '−11d', who: 'own', label: 'The forwarding rule', text: 'DRAFT — Every letter you receive gains a second reader.' },
      {
        time: 'Sun',
        who: 'own',
        label: '3:47 AM',
        text: 'DRAFT — ₱1,200 leaves the wallet; two messages go to the family GC in your voice.',
      },
      {
        time: 'Thu · 3:47',
        who: 'mama',
        label: 'The other bedside table',
        dynamic: {
          key: 'mo_reached',
          fallback: 'Mama typed three replies and deleted all of them. She did not want to hover. She was awake until 5:58.',
          map: {
            true: 'At 5:58 Mama sent the smallest version of the question — and got the whole confession back within the minute.',
            false: 'Mama decided not to hover. The confession reached her anyway, in front of the whole GC, at 9:02.',
          },
        },
        text: 'DRAFT — She was awake. She said nothing, and then wished she had.',
      },
      {
        time: 'Thu · night',
        who: 'own',
        label: 'What you spotted',
        dynamic: {
          key: 'own_assembled',
          fallback: 'You found some of it — the report went out with holes in it, honest about what you skipped.',
          map: {
            true: 'You found all of it: the app, the rule, the overnight minutes, the tested transfers. The report went out complete, signed with your own name first.',
            false: 'You found some of it — the report went out with holes in it, honest about what you skipped.',
          },
        },
        text: 'DRAFT — You handed your own phone over, and the report you filed is the season’s last artifact.',
      },
    ],
    close: [
      'DRAFT — The violation is intimacy: it read what you read, sent what you would have sent, and slept beside you.',
      'DRAFT — It also counted on the family’s politeness — on deleted replies, on not hovering. Saying it out loud broke that part.',
      'DRAFT — Detection is the recovery. You looked, you named it, you told someone. Boring, powerful, repeatable.',
    ],
  },
  reflection: {
    title: 'DRAFT — What you carry forward',
    cards: [
      {
        who: 'own',
        verb: 'SPOT',
        line: 'The hardest device to audit is the one you already trust.',
        body: 'DRAFT — Nothing about the phone looked wrong: the tile was native-colored, the rule sat in a settings page you never open, the sends wore your name. Exposure is not a break-in you hear; it is a second reader you never suspected. The literacy is boring and powerful: know what administrator rights are, read your forwarding rules, read your ledger, and say it out loud when the numbers don’t add up.',
      },
      {
        who: 'mama',
        verb: 'ANSWER',
        line: 'The second reader is not always a machine.',
        body: 'DRAFT — Mama read the 3:47 messages eleven times and deleted her own questions three times, because love in this family looks like not hovering. The program bet on that politeness. One plain question — “okay ka lang ba talaga?” — was the move it had no answer for.',
      },
    ],
    coda:
      'DRAFT — Every other anchor this season was someone else’s phone. This one was yours — and the last surface it shows you is your mother, awake at your own 3:47. The report ends by asking who else had physical access. The honest answer starts with a routine, and the repair starts with a sentence said out loud.',
  },
}
