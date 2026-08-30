import type { CaseOS } from '../../../engine/os/types'

/* CASE 02 — GUARANTEED · glassOS edition
   The most trusted face on Philippine news is selling a future. */

export const GUARANTEED_OS: CaseOS = {
  id: 'guaranteed',
  title: 'Guaranteed',
  tagline: 'Deepfake celebrity investment',
  blurb:
    'Lunchtime. A page wearing Tito Mike Velasco’s face is “investing his own retirement” — 30% monthly, government-guaranteed. Two minutes in the SEC database would have been enough. Open the phone. Check. Decide.',
  level: 'Case 02',
  minutes: '5–7 min',
  families: ['authority', 'toogood', 'urgency', 'payment', 'channel'],
  phone: {
    wallpaper: 'wall-dawn',
    time: '12:21',
    meridiem: 'PM',
    day: 'Wednesday lunchtime',
    battery: 61,
    lockNote: 'Wallpaper: your own photo of Manila Bay, 2023.',
  },

  contacts: [
    { id: 'maya', name: 'Maya Santos', number: '+63 908 555 0291', relation: 'Pamangkin — the skeptic' },
    { id: 'bea', name: 'Bea Santos', number: '+63 926 555 0344', relation: 'Pamangkin — the researcher' },
    { id: 'nena', name: 'Tita Nena', number: '+63 917 555 0268', relation: 'Cousin of your officemate' },
  ],

  threads: [
    { id: 'vip', service: 'messenger', name: 'AngatPinas VIP Desk', number: 'new account · no profile photo', hue: 280 },
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', members: ['Maya', 'Bea', 'Tita Baby', 'Kuya Rino'], hue: 30 },
  ],

  opening: [
    { threadId: 'gc', msg: { text: 'GUIYS. Tito Mike Velasco posted?? “30% monthly government-guaranteed” — totoo kaya?! — Tita Baby', at: '12:04 PM' } },
    { threadId: 'gc', msg: { text: 'Tita that page is 3 MONTHS old lang. 1.2M followers?? Bought yan. — Maya', at: '12:07 PM' } },
    { threadId: 'gc', msg: { text: 'Eh baka naman bagong page lang niya… may video pa eh, nagsasalita siya! — Tita Baby', at: '12:09 PM' } },
    { threadId: 'vip', msg: { text: 'Good afternoon Ma’am! I’m Maureen, your assigned account manager for ANGATPINAS INVEST 💎', at: '12:15 PM' } },
    { threadId: 'vip', msg: { text: 'You were referred by a pioneer member. PIONEER slots close this FRIDAY: ₱50,000 start → 30% MONTHLY, government-guaranteed, withdrawal anytime. Tito Mike himself invested his retirement. Should I reserve your slot?', at: '12:16 PM' } },
  ],

  photos: [
    {
      id: 'deepfake-still',
      title: 'IMG from VIP Desk · “Tito Mike” announcement',
      kind: 'screenshot',
      requires: 'still-sent',
      evidence: 'ev-still',
      tells: [
        { label: 'The chin lags', detail: 'Frames where the jaw finishes a syllable the mouth already abandoned — the render can’t keep up with the audio it stole.' },
        { label: 'Blink economics', detail: 'Real people blink on a rhythm. Deepfakes blink too little, then twice in a row. Watch the eyes, not the mouth.' },
        { label: 'The watermark that isn’t', detail: 'A real broadcaster’s graphic, slightly wrong: kerning off, logo soft. Face stolen, branding approximated.' },
      ],
    },
  ],

  pages: [
    {
      id: 'angatdash',
      url: 'angatpinas-invest.vip/login',
      title: 'AngatPinas Investor Dashboard',
      kind: 'dashboard',
      badge: 'Pioneer access · encrypted',
      headline: 'Welcome, Pioneer #0417',
      body: ['Your investment is compounding at 30% monthly.', 'Next withdrawal unlock: after one-time liquidity clearance of ₱8,000.'],
      amount: '₱52,014.00',
      fields: ['Start: ₱50,000.00 · Growth (display only): +₱2,014', 'Withdrawals: “anytime” (see clearance note)', 'License: “SEC registered” (unverified claim)'],
      evidence: 'ev-dash',
      tells: [
        { label: 'The growth is markup', detail: 'Your “balance” is a number in a web page. Nothing was invested anywhere. Only one thing ever moved: your deposit, toward them.' },
        { label: '“Withdrawal anytime” with a lock on it', detail: 'The release fee arrives only after you pay in. That’s the Ponzi two-step — the door opens inward.' },
      ],
    },
    {
      id: 'sec',
      url: 'sec.gov.ph/advisories/memorandum-8-2026',
      title: 'SEC Memorandum No. 8, s. 2026',
      kind: 'gov',
      badge: 'Official government service',
      headline: 'ADVISORY — Unregistered Investment Solicitation',
      body: [
        'ANGATPINAS INVEST is NOT REGISTERED with the Commission as a corporation or partnership.',
        'The entity has no license to solicit investments from the public. The public is advised to stop investing and report solicitations.',
        'Related: a verified statement from news anchor M. Velasco: “Hindi po ako iyon.”',
      ],
      evidence: 'ev-sec',
    },
  ],

  notes: [
    {
      title: 'What 30% monthly actually means',
      body: '₱50,000 at 30% monthly compounds to ₱2.6M in a year. No registered instrument on earth pays that. If it existed, banks would borrow from it, not offer it to you in a DM.',
    },
    {
      title: 'The liar’s dividend',
      body: 'When fake videos are common, even TRUE evidence gets doubted. The real Tito Mike now has to prove he isn’t fake. Deniability is the scammer’s second harvest.',
    },
  ],

  evidenceLabels: {
    'ev-page-age': 'Checked the page: 3 months old with 1.2M bought followers',
    'ev-still': 'Inspected the “announcement” still — chin lag, blink tells, wrong kerning',
    'ev-sec': 'Looked the company up at the SEC — NOT REGISTERED, and the real anchor denied it',
    'ev-dash': 'Opened the “investor dashboard” — growth is markup, withdrawals locked behind a fee',
    'ev-family': 'Put the link where many eyes could see it',
  },

  replies: [
    { id: 'r-join', threadId: 'vip', label: 'Reserve the slot — it’s Tito Mike', sub: 'Thirty years of trust, right there', set: { d1: 'join' } },
    { id: 'r-sec', threadId: 'vip', label: 'Check the company at the SEC first', sub: 'They said “registered po” — so verify it', set: { d1: 'sec' } },
    { id: 'r-family', threadId: 'gc', label: 'Forward it to the family GC', sub: 'Many eyes, fewer regrets', set: { d1: 'family' } },
    { id: 'r-pay', threadId: 'vip', requires: 'reserved', label: 'Send the ₱50,000 — reserve my pioneer slot', set: { d2: 'pay' } },
    { id: 'r-still', threadId: 'vip', requires: 'reserved', label: 'Send me the video first', sub: 'You want to see the face before the money', set: { d2: 'still' } },
  ],

  rules: [
    {
      id: 'sec-check',
      when: { replySent: 'r-sec' },
      typingIn: 'vip',
      push: [
        { threadId: 'vip', msg: { text: 'Ma’am walang ganun!! We are SEC REGISTERED po, certificate nasa group files 🙏 It’s just 3 minutes to reserve, slots po talaga…', at: '12:22 PM' } },
        { threadId: 'vip', msg: { from: 'sys', text: 'You open the SEC advisory database yourself. 3 minutes.' } },
        { threadId: 'vip', msg: { from: 'sys', kind: 'link', pageId: 'sec', caption: 'SEC Memorandum No. 8, s. 2026 — your lookup' } },
      ],
      set: { secAvailable: true },
      evidence: ['ev-page-age'],
    },
    {
      id: 'sec-result',
      when: { inspected: 'sec' },
      push: [
        { threadId: 'vip', msg: { from: 'sys', text: 'SEC: NOT REGISTERED. And the real Tito Mike, on the verified page: “Hindi po ako iyon.”' } },
        { threadId: 'gc', msg: { text: 'AYUN NA. Sabi ko na eh!! Report niyo na yan — Bea', at: '12:34 PM' } },
      ],
      set: { 'case-over': true },
      evidence: ['ev-page-age'],
    },
    {
      id: 'family-path',
      when: { replySent: 'r-family' },
      typingIn: 'gc',
      push: [
        { threadId: 'gc', msg: { text: 'Deepfake po yan Tita — tingnan niyo yung page age vs followers. Check niyo rin sa SEC! — Bea', at: '12:24 PM' } },
        { threadId: 'gc', msg: { text: 'Ako nag-eencode sa bank, walang “government-guaranteed 30%” kahit saan. WALANG GANUN. — Kuya Rino', at: '12:25 PM' } },
      ],
      set: { familyWarned: true },
      evidence: ['ev-page-age'],
    },
    {
      id: 'family-close',
      when: { flag: 'familyWarned' },
      push: [
        { threadId: 'vip', msg: { text: 'Ma’am?? Slot reservation po... last call po ng Friday 🙏', at: '12:31 PM' } },
        { threadId: 'gc', msg: { from: 'sys', text: 'You block the VIP Desk. The family GC you almost ignored was the research department you already had. — end of case —' } },
      ],
      set: { 'case-over': true },
    },
    {
      id: 'join-reserved',
      when: { replySent: 'r-join' },
      typingIn: 'vip',
      push: [
        { threadId: 'vip', msg: { text: 'SLOT RESERVED po ✅ Welcome, Pioneer #0417! Dashboard login below. First payout posts in 48 hrs 💎', at: '12:23 PM' } },
        { threadId: 'vip', msg: { kind: 'link', pageId: 'angatdash', caption: 'your dashboard', at: '12:23 PM' } },
      ],
      set: { reserved: true },
    },
    {
      id: 'still-send',
      when: { replySent: 'r-still' },
      typingIn: 'vip',
      push: [{ threadId: 'vip', msg: { kind: 'photo', photoId: 'deepfake-still', caption: 'proof po — Tito Mike himself 🙏', at: '12:26 PM' } }],
      set: { 'still-sent': true },
    },
    {
      id: 'pay-join',
      when: { replySent: 'r-pay' },
      typingIn: 'vip',
      push: [
        { threadId: 'vip', msg: { from: 'sys', text: '₱50,000.00 sent to “AngatPinas — Maureen” · Balance ₱11,112.45' } },
        { threadId: 'vip', msg: { text: 'Received po ✅ Your balance is already growing! Check the dashboard 💎', at: '12:28 PM' } },
      ],
      set: { paid: true },
    },
    {
      id: 'pay-nodash-close',
      when: { flag: 'paid' },
      push: [{ threadId: 'vip', msg: { from: 'sys', text: 'Two days later: “liquidity clearance ₱8,000” before any withdrawal. The balance page never blinks. — end of case —' } }],
      set: { 'case-over': true },
    },
    {
      id: 'still-close',
      when: { inspected: 'deepfake-still' },
      push: [{ threadId: 'vip', msg: { from: 'sys', text: 'You watched the eyes instead of the mouth. The face never stood a chance against the paperwork it didn’t have. (SEC check takes 3 minutes — it’s in your Browser history.) — end of case —' } }],
      set: { 'case-over': true },
    },
    {
      id: 'gc-irony-late',
      when: { flag: 'paid' },
      push: [{ threadId: 'gc', msg: { text: 'Tita?? AngatPinas?? May SEC advisory na po yan, 2 weeks pa lang Kami nag-report na — Bea', at: '12:41 PM' } }],
    },
  ],

  endFlag: 'case-over',

  checklist: [
    'Check the SEC advisory database before any investment — 3 minutes',
    'Page age vs. follower count: trust that grows in 3 months is bought',
    'No guaranteed returns exist. None. Ever.',
    'When faces can be faked, paperwork is the only witness that matters',
  ],

  tells: [
    { label: '“Government-guaranteed”', detail: 'No legitimate investment says this. Deposits are insured up to limits; returns are never guaranteed at all.' },
    { label: 'The face vs. the page', detail: 'The face is thirty years old; the page is three months old. When trust and platform disagree, believe the paperwork.' },
    { label: 'Payout comments, brand-new accounts', detail: 'A Ponzi pays early members with later members’ money, then posts the receipts as marketing.' },
  ],

  outcomes: [
    {
      match: { d1: 'sec' },
      title: 'Went to the register',
      text: 'Three minutes in the SEC database beat a synthetic video, a million bought followers, and a comment section on payroll. “Registered po kami” — so you checked. That sentence dies in daylight.',
      points: 50,
    },
    {
      match: { d1: 'family' },
      title: 'Many eyes, fewer regrets',
      text: 'You put the link where it could be examined by people who love you and owe you nothing. The family GC is the research department you already had — and it was right, again.',
      points: 45,
    },
    {
      match: { d2: 'still', d1: 'join' },
      title: 'You watched the eyes',
      text: 'You demanded to see before you paid — and the render gave itself away to anyone who watched the blinks. The scam died at the frame it stole. Verify the paperwork next and it dies even sooner.',
      points: 35,
    },
    {
      match: { d1: 'join' },
      title: 'Thirty years of trust, borrowed',
      text: 'That’s what the deepfake was: a withdrawal from credibility a real man spent thirty years depositing. The dashboard will show your ₱50,000 “growing” until withdrawals need one more fee. The fee is forever. The growth is markup.',
      points: 5,
    },
  ],
}
