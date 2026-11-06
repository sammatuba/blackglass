import type { CaseOS } from '../../../engine/os/types'
import type { AnthologyAnchor } from '../types'

/* =====================================================================
   ANCHOR VI (DRAFT — canon review pending; craft/maya/_meta/anchor-vi-brief.md)
   "THE COMPROMISED PHONE" / Spot — the inversion anchor. Fear: exposure.
   The season's holder hands over their OWN phone because "something's off."

   This module is flag-gated: it renders only behind ?draft=vi and is never
   in the live ANCHORS array. Every canon-bearing name/beat below is DRAFT
   or TBC (see brief §5). Guardrails: detection/recovery only — no tools,
   no tradecraft; the access event stays off-screen.
   ===================================================================== */

/* DRAFT/TBC: framing A — the holder is second-person "you," unnamed. */

const OWN: CaseOS = {
  id: 'own-draft', // DRAFT: id TBC at canon review
  title: 'You (DRAFT)', // DRAFT/TBC: does the holder get a canon name? (brief §5.2)
  tagline: 'something’s off, and it’s your own phone',
  blurb:
    'DRAFT — The holder of every phone this season brings their own. Something has been sending money you never sent, mailing mail you never saw, speaking in a family GC at 3:47 AM in your voice. The verb is SPOT. Lesson: the hardest device to audit is the one you already trust.',
  level: 'Anchor VI · DRAFT',
  minutes: '6–8 min',
  phone: {
    wallpaper: 'grid',
    time: '3:52',
    meridiem: 'AM',
    day: 'Thursday',
    battery: 34,
    lockNote: 'DRAFT — “change your passwords” sticky note, written two nights ago, not yet done.', // DRAFT
    theme: 'own', // DRAFT theme: clean, cool, stays innocent while stages corrupt
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
    { title: 'sticky, two nights ago', body: 'change passwords. mail FIRST. (not done)' }, // DRAFT: the recovery beat
  ],
  calendar: [
    { day: 'Thu', time: 'all day', title: 'Mama’scheck-up errand', place: 'DRAFT — ambient' },
    { day: 'Sat', time: '6:00 PM', title: 'Family dinner', place: "Mama's" },
    { day: 'Sun', time: '9:00 PM', title: 'Call the bank about the transfers', place: 'moved twice already' },
  ],
  wallet: {
    balance: '₱9,214.60',
    rows: [
      { id: 'own-w1', day: 'Thu', label: 'Salary · 15th', amount: '+₱19,400.00', kind: 'in' },
      { id: 'own-w2', day: 'Sun', label: 'Transfer · 0915-•••-•••• · 3:47 AM', amount: '-₱1,200.00', note: 'you were asleep', meta: 'You were asleep at 3:47 AM. The phone was on the charger beside your bed. The transfer needed your thumbprint or your PIN — it used one of them.', evidence: 'ev-own-ledger' },
      { id: 'own-w3', day: 'Tue', label: 'Transfer · 0915-•••-•••• · 3:52 AM', amount: '-₱800.00', note: 'you were asleep', meta: '₱800 more, four nights later. Small amounts. The guide calls the first ones “a test” — testing whether you look at the ledger at all.', evidence: 'ev-own-ledger' },
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
      id: 'own-open', // DRAFT prose — V1; the P6 loop revises
      label: 'Pick it up', // DRAFT
      openThread: 'gc',
      text: [
        'DRAFT — You have held every phone this season like a detective. Tonight you bring your own, because for three nights the battery has been dying by noon, and because the GC has messages from you that you have read four times, and they are not things you remember typing.',
        'You put your own phone on the desk, screen up, unlocked, the way you’d hand someone a sick animal. Something’s off. Find it. Please.',
      ],
    },
    {
      id: 'own-report', // DRAFT — the mirror-moment epilogue (P7); V1 prose, P6 revises
      label: 'File the report', // DRAFT
      text: [
        'DRAFT — The report writes itself, because you wrote it while you were looking: a forwarding rule added 11 days ago; an administrator app installed 11 days ago; transfers at 3:47 and 3:52, while you slept ten centimeters away; screen time at hours you were unconscious; messages in your name that you did not type.',
        'The guide said to tell one person, out loud. The report has a field for who else had physical access to this device in the last month. You fill it in. You write your own name first — not because you did anything, but because the field is honest, and the phone was yours.',
      ],
    },
  ],
  rules: [
    { id: 'own-open', when: { flag: 'os_unlocked' }, moment: 'own-open' },
    // the SPOT loop — each surface found moves the chrome (P4 stages)
    { id: 'own-spot-tools', when: { inspected: 'sys-tools' }, set: { own_spotted_tools: true }, stage: 'uneasy', evidence: ['ev-own-tools'] },
    { id: 'own-spot-mail', when: { inspected: 'mail-forward' }, set: { own_spotted_mail: true }, stage: 'uneasy', evidence: ['ev-own-mail'] },
    { id: 'own-spot-time', when: { replySent: 'own-r-time' }, set: { own_spotted_time: true }, stage: 'uneasy', evidence: ['ev-own-time'] },
    {
      // full assembly: the chrome stops pretending
      id: 'own-assembled',
      when: { allFlags: ['own_spotted_tools', 'own_spotted_mail', 'own_spotted_time'] },
      set: { own_assembled: true },
      stage: 'compromised',
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'DRAFT — Eleven days ago, all of it. The app, the rule, the transfers. Whatever let someone in happened once, in one hand, while the phone was out of yours — and it has been reading your life at 3 AM since.' } },
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
    { id: 'own-coda', when: { flag: 'own_guided' }, moment: 'own-report' },
    { id: 'own-done', when: { flag: 'dismissed:own-report' }, set: { own_done: true } },
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
    { match: { own_guided: true }, title: 'DRAFT — Spotted, and said it out loud', text: 'DRAFT — You found every anomaly and the phone is yours again. The report names the access honestly, starting with your own hands.', points: 45 },
    { match: {}, title: 'DRAFT — Locked it back', text: 'DRAFT — Some of it you saw. The phone went face-down again.', points: 15 },
  ],
}

export const COMPROMISED: AnthologyAnchor = {
  id: 'compromised-draft', // DRAFT: id TBC at canon review
  title: 'THE COMPROMISED PHONE (DRAFT)',
  subtitle: 'Spot',
  blurb:
    'DRAFT — The season’s holder brings their own phone to the rack: “something’s off.” A forwarding rule you didn’t add. Transfers at 3:47 AM. Messages in your voice. The fear is exposure; the verb is SPOT.',
  question: 'What has your phone been doing while you slept?',
  entry: 'own',
  order: ['own'],
  phones: { own: OWN },
  timeline: {
    title: 'DRAFT — Eleven days',
    intro: 'DRAFT — One hand, one moment of access, and the phone stopped being only yours.',
    events: [
      { time: '−11d', who: 'own', label: 'The access (off-screen)', text: 'DRAFT/TBC — Deliberately not shown. The door was already closed when you noticed it had been open.' },
      { time: '−11d', who: 'own', label: 'System Tools appears', text: 'DRAFT — Installed with administrator rights; nightly maintenance windows at 2:58 AM.' },
      { time: '−11d', who: 'own', label: 'The forwarding rule', text: 'DRAFT — Every letter you receive gains a second reader.' },
      { time: 'Sun', who: 'own', label: '3:47 AM', text: 'DRAFT — ₱1,200 leaves the wallet; two messages go to the family GC in your voice.' },
      { time: 'Thu', who: 'own', label: 'You notice', text: 'DRAFT — The battery, the GC, the tile you never installed. You hand your own phone over.' },
    ],
    close: [
      'DRAFT — The violation is intimacy: it read what you read, sent what you would have sent, and slept beside you.',
      'DRAFT — Detection is the recovery. You looked, you named it, you told someone.',
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
    ],
    coda:
      'DRAFT — Every other anchor this season was someone else’s phone. This one was yours. The report ends by asking who else had physical access — and the honest answer starts with you.',
  },
}
