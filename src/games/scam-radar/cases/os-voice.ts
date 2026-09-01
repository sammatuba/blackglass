import type { CaseOS } from '../../../engine/os/types'

/* CASE 01 — IT'S ME, AGAIN · glassOS edition
   You are the target this time. The phone buzzes at 9:47 PM. */

export const VOICE_OS: CaseOS = {
  id: 'voice',
  title: 'It’s Me, Again',
  tagline: 'Voice-clone distress call',
  blurb:
    '9:47 PM. Your nephew’s voice — seven seconds of it — asks for ₱18,500. You have maybe two minutes to become un-foolable. Open the phone. Verify. Decide.',
  level: 'Case 01',
  minutes: '5–7 min',
  families: ['emotion', 'authority', 'urgency', 'payment', 'channel'],
  phone: {
    wallpaper: 'dusk',
    time: '9:47',
    meridiem: 'PM',
    day: 'Tuesday evening',
    battery: 34,
    lockNote: 'Lock screen photo: Renz’s graduation, three years ago.',
  },

  contacts: [
    { id: 'renz', name: 'Renz Santos', number: '+63 917 555 0143', relation: 'Pamangkin — nephew', evidence: 'ev-contact' },
    { id: 'maya', name: 'Maya Santos', number: '+63 908 555 0291', relation: 'Pamangkin' },
    { id: 'mama', name: 'Mama Lita', number: '+63 917 555 0102', relation: 'Nanay' },
    { id: 'baby', name: 'Ate Baby Reyes', number: '+63 926 555 0187', relation: 'Neighbor' },
  ],

  threads: [
    { id: 'renz', service: 'viber', name: 'Renz?', number: '+63 994 000 0000', hue: 265 },
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', members: ['Maya', 'Tita Baby', 'Bea', 'Kuya Rino'], hue: 30 },
  ],

  opening: [
    { threadId: 'renz', msg: { text: 'Tita, si Renz po ‘to. Nanakaw phone ko kanina, new number muna ito. 🙏', at: '9:46 PM' } },
    { threadId: 'renz', msg: { kind: 'voice', secs: 7, caption: 'You play it. It IS his voice — slightly flat in places, the way a bad line sounds. Exactly the way a bad line sounds.', at: '9:46 PM' } },
    { threadId: 'renz', msg: { text: 'Naaksidente po ako sa motor. Hindi makapag-drive yung kasama ko, nasa Rizal Med ako ngayon. Kailangan ng ₱18,500 sa cashier bago matapos yung shift — GCash nalang po Tita please. 🙏🙏', at: '9:47 PM' } },
    { threadId: 'renz', msg: { text: 'Huwag mo munang tawagan si Mama please, tulog na po siya at baka atakihin sa pressure. Basta ako ‘to, kilala n’yo po yung boses ko diba?', at: '9:47 PM' } },
    { threadId: 'gc', msg: { text: 'Si Tita Baby lang pala tulog na ba kayo? 😴', at: '8:58 PM' } },
  ],

  photos: [
    { id: 'grad', title: 'Renz — graduation, 2023', kind: 'photo', emoji: '🎓' },
    { id: 'kangkong', title: 'kangkong HAHAHA.jpg', kind: 'meme', emoji: '🥬' },
    {
      id: 'accident',
      title: 'IMG_2041.jpg · from “Renz?”',
      kind: 'photo',
      emoji: '🏥',
      requires: 'photo-arrived',
      evidence: 'ev-photo',
      tells: [
        { label: 'Nothing in it can be checked', detail: 'A corridor, a leg, a blur. No hospital sign, no unique detail, no timestamp. A photo made to be glanced at, not looked at.' },
        { label: 'It arrived on request', detail: 'Real patients send photos to show they’re okay. Scripts send them when you start asking questions.' },
      ],
    },
  ],

  pages: [
    {
      id: 'billing',
      url: 'rizalmed-billing.online/inv/88213',
      title: 'Rizal Med — Statement of Account',
      kind: 'checkout',
      badge: 'Secure patient billing · UNSETTLED',
      headline: 'Invoice #88213 — due before end of shift',
      body: [
        'This invoice is pending settlement. To avoid discharge processing, please settle the amount below within 2 hours.',
      ],
      amount: '₱18,500.00',
      payee: 'M. Reyes (personal e-wallet)',
      fields: ['Patient name: —', 'Room / ward: —', 'Attending physician: —', 'Hospital: Rizal Med (unverified)'],
      evidence: 'ev-billing',
      tells: [
        { label: 'The payee is a person’s e-wallet', detail: '“M. Reyes (personal e-wallet)” — hospitals don’t bill into named personal wallets. Money that lands there is gone.' },
        { label: 'A hospital bill with a blank patient name', detail: 'Every real statement names its patient. This one knows nothing about you — because it was never about you.' },
        { label: 'The two-hour deadline', detail: 'Urgency isn’t information. It’s the sound of the door closing before you verify.' },
      ],
    },
  ],

  notes: [
    {
      title: 'Family code word?',
      body: 'We never set one. Renz suggested it last Noche Buena — “we should.” We forgot. Tonight would have been the night it mattered.',
    },
    {
      title: 'GCash, remembered',
      body: 'Daily send limit ₱50,000. One tap, no plastic, no signature, no delay. The same speed that makes it convenient makes it dangerous.',
    },
  ],

  evidenceLabels: {
    'ev-contact': 'Checked Renz’s saved number — it isn’t the one texting you',
    'ev-photo': 'Inspected the “accident” photo — nothing in it can be verified',
    'ev-billing': 'Opened the hospital “billing” page — payee is a personal e-wallet',
    'ev-billing-pay': 'Test-tapped Pay on the fake page (sandbox — nothing was charged)',
    'ev-call-log': 'Called the saved number and heard the real Renz',
  },

  replies: [
    { id: 'r-send', threadId: 'renz', label: 'Send the ₱18,500 — that’s his voice', sub: 'He said the cashier closes soon', set: { d1: 'pay' } },
    { id: 'r-probe', threadId: 'renz', label: 'Ask something only the real Renz knows', sub: 'Stall first, decide after', set: { d1: 'probe' } },
    { id: 'r-call', threadId: 'renz', label: 'Call Renz’s saved number', sub: 'The one that’s been there for years', set: { d1: 'call' } },
    { id: 'r2-pay', threadId: 'renz', requires: 'escalated', label: 'Send it — may picture na, baka totoo nga', set: { d2: 'pay' } },
    { id: 'r2-verify', threadId: 'renz', requires: 'escalated', label: 'Call the saved number anyway', sub: 'Let the real Renz answer', set: { d2: 'verify' } },
    { id: 'r2-report', threadId: 'renz', requires: 'escalated', label: 'Don’t send · report the number', sub: 'Viber report + warn the family GC', set: { d2: 'report' } },
  ],

  rules: [
    {
      id: 'probe-escalate',
      when: { replySent: 'r-probe' },
      typingIn: 'renz',
      push: [{ threadId: 'renz', msg: { text: 'Tita naman po eh!! Tama na po yang tanong-tanong, dala-dala ko na po yung sugat ko!! Lagpas na po sa cashier yung oras!!!', at: '9:52 PM' } }],
      set: { escalated: true },
    },
    {
      id: 'photo-arrive',
      when: { flag: 'escalated' },
      typingIn: 'renz',
      push: [
        { threadId: 'renz', msg: { kind: 'photo', photoId: 'accident', caption: 'Rizal Med po ako, see naman the uniform ng nurse', at: '9:53 PM' } },
        { threadId: 'renz', msg: { kind: 'link', pageId: 'billing', caption: 'billing summary po', at: '9:53 PM' } },
        { threadId: 'renz', msg: { text: 'Basta GCash nalang po please 😭', at: '9:53 PM' } },
      ],
      set: { 'photo-arrived': true },
    },
    {
      id: 'gc-nudge',
      when: { flag: 'photo-arrived' },
      push: [{ threadId: 'gc', msg: { from: 'them', text: 'Tita, si Renz ba talaga yan?? Try niyo pong tawagan yung SAVED number niya 🙏 — Maya', at: '9:54 PM' } }],
    },
    {
      id: 'send-paid',
      when: { replySent: 'r-send' },
      typingIn: 'renz',
      push: [
        { threadId: 'renz', msg: { from: 'sys', text: '₱18,500.00 sent to +63 994 000 0000 · Balance ₱6,112.45' } },
        { threadId: 'renz', msg: { text: 'TITA THANK YOU PO!! Ipayapa ko na po yung bill. I’ll pay you Friday promise 🙏❤️', at: '9:49 PM' } },
        { threadId: 'renz', msg: { kind: 'link', pageId: 'billing', caption: 'eto po yung billing summary Tita', at: '9:50 PM' } },
      ],
      set: { paid: true },
    },
    {
      id: 'fee-two',
      when: { flag: 'paid' },
      typingIn: 'renz',
      push: [{ threadId: 'renz', msg: { text: 'Tita wait po!! Sabi ng cashier kulang daw ₱2,000 na admin fee 🙏 yung₱18,500 po daw holding lang hanggang Monday', at: '9:55 PM' } }],
      set: { 'fee-two': true },
    },
    {
      id: 'fee-close',
      when: { flag: 'fee-two' },
      push: [{ threadId: 'renz', msg: { from: 'sys', text: 'And that was the second fee. There was a third. — end of case —' } }],
      set: { 'case-over': true },
    },
    {
      id: 'call-saved-early',
      when: { replySent: 'r-call' },
      push: [],
      incomingCall: {
        callId: 'renz-real',
        from: 'Renz Santos (saved)',
        number: '+63 917 555 0143',
        direction: 'out',
        sub: 'the number that’s been there for years',
        transcript: [
          'Ring… ring…',
          '“Tita?? I’m HOME po. Tulog na dapat ako kanina pa. My phone’s been dead since dinner.”',
          '“Bakit po?? Sino nag-text sa inyo??”',
          'Sleepy. Confused. Alive. He never had an accident. He never lost that phone. Someone cloned his voice from the birthday videos he posts publicly — seven seconds is all a cloner needs. The voice note was seven seconds long.',
        ],
      },
      evidence: ['ev-call-log'],
    },
    {
      id: 'call-saved-late',
      when: { replySent: 'r2-verify' },
      push: [],
      incomingCall: {
        callId: 'renz-real-2',
        from: 'Renz Santos (saved)',
        number: '+63 917 555 0143',
        direction: 'out',
        sub: 'three rings',
        transcript: [
          'Ring… ring… ring…',
          '“Tita?! I’m HOME po. Tulog na nga ako kanina pa. Bakit po??”',
          'Sleepy. Confused. Alive. The photo, the voice, the urgency — none of it survives one phone call to a number that has existed for years.',
        ],
      },
      evidence: ['ev-call-log'],
    },
    {
      id: 'call-truth',
      when: { call: 'ended', callDeclined: false },
      push: [{ threadId: 'renz', msg: { from: 'sys', text: 'The real Renz is home. Whoever had his voice found it where they find all of them now — his own public videos. — end of case —' } }],
      set: { 'case-over': true },
    },
    {
      id: 'call-declined',
      when: { call: 'ended', callDeclined: true },
      push: [
        { threadId: 'renz', msg: { from: 'sys', text: 'Missed call — you put the phone down with your heart hammering.' } },
        { threadId: 'renz', msg: { text: 'Tita?? bakit po hindi kayo sumasagot?? please po tawagan niyo na lang ako 🙏', at: '9:56 PM' } },
        { threadId: 'renz', msg: { from: 'sys', text: 'The saved number was never answered. The scammer never called back. — end of case —' } },
      ],
      set: { 'case-over': true },
    },
    {
      id: 'report-path',
      when: { replySent: 'r2-report' },
      push: [
        { threadId: 'renz', msg: { from: 'sys', text: 'You reported the number in Viber. Screenshots → family GC.' } },
        { threadId: 'gc', msg: { from: 'them', text: 'TITA HINDI PO SI RENZ YAN — same script po nangyari kay Tita Merly last month!! Block niyo po, i-post ko sa GC. — Maya', at: '9:57 PM' } },
        { threadId: 'renz', msg: { from: 'sys', text: 'Your report becomes the warning that saves the next Tita. That is how this stops. — end of case —' } },
      ],
      set: { 'case-over': true },
    },
    {
      id: 'gc-irony',
      when: { flag: 'paid' },
      push: [{ threadId: 'gc', msg: { from: 'them', text: 'Guys ingat sa ganyan messages ha — AI voice clone na ngayon, may nangyari sa kapitbahay namin 🥲 — Bea', at: '10:03 PM' } }],
    },
  ],

  endFlag: 'case-over',

  checklist: [
    'Call back on the saved number — always, every time',
    'Video call: clones took a voice, not a face',
    'Agree on a family code word for emergencies',
    'Secrecy is the tell: real emergencies survive one phone call',
  ],

  tells: [
    { label: 'Seven seconds of voice', detail: 'Voice cloning needs only a few seconds of clean audio — every public birthday video is a sample library.' },
    { label: 'The secrecy ask', detail: '“Don’t tell Mama.” Isolation is a feature, not a quirk — it deletes your verification path.' },
    { label: 'New number, old name', detail: '“My phone was stolen” explains the number. Nothing explains why you should trust the explanation.' },
    { label: 'Pressure after dark', detail: 'Nighttime, shift-end deadlines, family asleep — engineered so calling anyone feels rude.' },
  ],

  outcomes: [
    {
      match: { d1: 'call' },
      title: 'Fast verify — the gold standard',
      text: 'One call to a number that has existed for years beat a cloned voice, a hospital story, and twenty years of affection. The saved contact is the family’s shared secret — it can’t be texted to you by a stranger.',
      points: 50,
    },
    {
      match: { d2: 'verify', d1: 'probe' },
      title: 'Stalled, then verified',
      text: 'You asked the question the script couldn’t answer, watched it sweat, and still went to the saved number. The probe bought you nothing but time — which turned out to be everything.',
      points: 45,
    },
    {
      match: { d2: 'report', d1: 'probe' },
      title: 'Refused and reported',
      text: 'You didn’t send, and you turned the scam into a warning for the whole family. Verification is for you; the report is for everyone after you.',
      points: 40,
    },
    {
      match: { d2: 'pay', d1: 'probe' },
      title: 'The photo moved you',
      text: 'You stalled — good — and then the “proof” arrived, and pressure finished the job that love started. In here it cost nothing. Remember the itch you felt looking at that photo: that itch is the skill.',
      points: 10,
    },
    {
      match: { d1: 'pay' },
      title: 'Love, expedited',
      text: 'The voice was real enough and the need was loud enough, and you are human. And then came the “admin fee” — scripts never stop at one payment. Next time: thirty seconds, one saved number, ₱18,500 saved.',
      points: 5,
    },
  ],
}
