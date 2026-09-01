import type { CaseOS } from '../../../engine/os/types'

/* CASE 03 — ON HOLD · glassOS edition
   A package you never ordered, a fee you never agreed to. */

export const PARCEL_OS: CaseOS = {
  id: 'on-hold',
  title: 'On Hold',
  tagline: 'Courier / customs text scam',
  blurb:
    'Saturday morning. Your parcel is being held, the fee is small, and the deadline is today. You didn’t order anything from abroad — the message is betting you’ll forget that. Open the phone. Track it yourself. Decide.',
  level: 'Case 03',
  minutes: '4–6 min',
  families: ['payment', 'urgency', 'channel'],
  phone: {
    wallpaper: 'grid',
    time: '10:08',
    meridiem: 'AM',
    day: 'Saturday morning',
    battery: 88,
  },

  contacts: [
    { id: 'shop', name: 'Luna Home Goods', number: '+63 906 555 0771', relation: 'The online shop you ordered from', evidence: 'ev-shop' },
    { id: 'conspare', name: 'Condo Residents GC Admin', number: '+63 917 555 0902', relation: 'Building group' },
  ],

  threads: [
    { id: 'sms', service: 'sms', name: 'PHLPost-Express', number: '+63 977 000 0000', hue: 15 },
    { id: 'condo', service: 'viber', name: 'Condo Residents 🏢', members: ['Admin', 'Unit 1204', 'Unit 702', 'you'], hue: 200 },
  ],

  opening: [
    { threadId: 'sms', msg: { text: 'NOTICE: Your parcel (REF PHX-88172) from OVERSEAS is ON HOLD at the Central Mail Exchange. Unpaid customs VAT: ₱312.00. Settle within 24 HOURS or item will be returned to sender and FORFEITED.', at: '10:07 AM' } },
    { threadId: 'sms', msg: { kind: 'link', pageId: 'checkout', caption: 'settle now', at: '10:07 AM' } },
    { threadId: 'sms', msg: { text: 'Reply YES and our agent will process your payment over the phone. Have your card ready.', at: '10:07 AM' } },
    { threadId: 'condo', msg: { text: ' Reminder: water interruption tomorrow 9AM-4PM — Admin', at: '8:55 AM' } },
  ],

  photos: [],

  pages: [
    {
      id: 'checkout',
      url: 'phlpost-clearance.info/pay/PHX-88172',
      title: 'Settle Customs VAT — PHX-88172',
      kind: 'checkout',
      badge: 'Secure clearance payment',
      headline: 'Your parcel is being held — act within 24 hours',
      body: ['Settle the outstanding VAT to release your parcel for delivery. Unclaimed parcels are forfeited after the deadline.'],
      amount: '₱312.00',
      payee: 'PHLPost Clearance Dept. (personal e-wallet)',
      fields: ['Recipient name: —', 'Tracking origin: —', 'Declared contents: —'],
      evidence: 'ev-checkout',
      tells: [
        { label: 'The domain wears a costume', detail: 'phlpost-clearance.info — the real post office collects duties on its own .gov.ph domain, through channels you already use.' },
        { label: 'A checkout that greets no one', detail: 'No recipient name, no origin, no contents. Real couriers know what they’re carrying.' },
        { label: 'The countdown', detail: '“24 hours or forfeited.” Urgency isn’t information; it’s the sound of a door closing before you think.' },
      ],
    },
  ],

  voicemails: [
    {
      id: 'vm-courier',
      from: 'Unknown caller',
      number: '+63 977 000 0000',
      at: '9:58 AM',
      secs: 11,
      transcript: [
        '“Good morning Ma’am, PHLPost customs department. Your parcel PHX-88172 needs VAT settlement before noon, otherwise po it will be returned to sender.”',
        'The same script, warm and patient. Note what it never says: your name, the sender, or what’s inside.',
      ],
      evidence: 'ev-vm',
    },
  ],

  recents: [
    { name: 'Unknown (+63 977 000 0000)', number: 'PHLPost-Express?', at: '9:58 AM', missed: true },
    { name: 'Luna Home Goods', number: '+63 906 555 0771', at: 'Fri 4:12 PM', outgoing: true },
  ],

  notes: [
    {
      title: 'Your actual order',
      body: 'Luna Home Goods · candle + throw pillow · ₱1,240 · REF 55012 · out for delivery, ₱0 due. You ordered nothing from abroad this year.',
    },
    {
      title: 'How real customs duty works',
      body: 'The courier collects duties in their app against a tracking number, or at the door with an official receipt. Never by text link. Never by card details over the phone.',
    },
  ],

  evidenceLabels: {
    'ev-shop': 'Checked the shop’s real order — REF 55012, out for delivery, ₱0 due',
    'ev-checkout': 'Opened the “clearance” page — blank fields, personal e-wallet',
    'ev-checkout-pay': 'Test-tapped Pay on the fake checkout (sandbox — nothing was charged)',
    'ev-vm': 'Listened to the voicemail — a script with no name, no sender, no contents',
  },

  replies: [
    { id: 'r-pay', threadId: 'sms', label: 'Pay the ₱312 — small price vs. forfeiting it', set: { d1: 'pay' } },
    { id: 'r-track', threadId: 'sms', label: 'Open the shop’s app and track it yourself', sub: 'The real tracking number is in your order email', set: { d1: 'track' } },
    { id: 'r-yes', threadId: 'sms', label: 'Reply “YES” — hear the agent out first', sub: 'No harm in a phone call… right?', set: { d1: 'engage' } },
    { id: 'r-card', threadId: 'sms', requires: 'agent-live', label: 'Read out the card details — just end this', set: { d2: 'card' } },
    { id: 'r-stop', threadId: 'sms', requires: 'agent-live', label: 'Hang up · block · report', sub: 'The parcel was never real; the debit doesn’t have to be', set: { d2: 'stop' } },
  ],

  rules: [
    {
      id: 'track-truth',
      when: { replySent: 'r-track' },
      push: [
        { threadId: 'sms', msg: { from: 'sys', text: 'Shop app → Orders → REF 55012: out for delivery, ₱0 due. Search for PHX-88172: not found.' } },
        { threadId: 'condo', msg: { text: 'Heads up neighbors — may text scam ulit, “PHLPost customs” raw. Walang ganung ref sa totoong tracking. — Admin', at: '10:20 AM' } },
      ],
      set: { tracked: true, 'case-over': true },
      evidence: [],
    },
    {
      id: 'engage-agent',
      when: { replySent: 'r-yes' },
      typingIn: 'sms',
      push: [
        { threadId: 'sms', msg: { from: 'sys', text: 'An “agent” calls. A call center you can hear smiling.' } },
        { threadId: 'sms', msg: { text: '“Ma’am good news, I can waive the VAT po… but system shows an INSURANCE hold: ₱850, refundable naman. Card details lang po to release both holds.”', at: '10:14 AM' } },
      ],
      set: { 'agent-live': true },
    },
    {
      id: 'pay-first',
      when: { replySent: 'r-pay' },
      push: [
        { threadId: 'sms', msg: { from: 'sys', text: '₱312.00 paid via the link. Receipt: none. The parcel: none.' } },
        { threadId: 'sms', msg: { text: 'Payment received po! However system shows further CLEARANCE FEE ₱850. Kindly settle to continue processing 🙏', at: '10:16 AM' } },
      ],
      set: { 'fee-two': true },
    },
    {
      id: 'pay-fee-three',
      when: { flag: 'fee-two' },
      typingIn: 'sms',
      push: [{ threadId: 'sms', msg: { text: 'Ma’am, additional po ng CUSTOMS OFFICER signature ₱1,200 last step na po!!', at: '10:22 AM' } }],
      set: { 'fee-three': true },
    },
    {
      id: 'pay-close',
      when: { flag: 'fee-three' },
      push: [{ threadId: 'sms', msg: { from: 'sys', text: 'The ₱312 bought you a subscription. VAT became insurance became a signature. The parcel was never photographed, never weighed, never real. — end of case —' } }],
      set: { 'case-over': true },
    },
    {
      id: 'card-given',
      when: { replySent: 'r-card' },
      push: [
        { threadId: 'sms', msg: { from: 'sys', text: 'You read the card details aloud. The line stays warm for four seconds after you finish.' } },
        { threadId: 'condo', msg: { text: '⚠️ BPI text scam circulating — if you read card details to a caller, CALL THE BANK HOTLINE NOW and freeze. — Admin', at: '10:31 AM' } },
        { threadId: 'sms', msg: { from: 'sys', text: 'Three OTP requests light up your phone. The weekend becomes a fraud report. — end of case —' } },
      ],
      set: { 'case-over': true },
    },
    {
      id: 'stop-walk',
      when: { replySent: 'r-stop' },
      push: [
        { threadId: 'sms', msg: { from: 'sys', text: 'Blocked. Number reported to your telco. Screenshot posted to the residents’ GC.' } },
        { threadId: 'condo', msg: { text: 'AKALA KO AKO LANG!!! Same ref number dito sa Unit 702, kanina lang!! — Unit 702', at: '10:26 AM' } },
        { threadId: 'sms', msg: { from: 'sys', text: 'Four households saved by thirty seconds of annoyance. — end of case —' } },
      ],
      set: { 'case-over': true },
    },
  ],

  endFlag: 'case-over',

  checklist: [
    'Track through the shop/courier app — never the link',
    'No tracking number? No parcel. Ignore.',
    'Card details never go to inbound callers',
    'Report the number: your report is the neighbor’s warning',
  ],

  tells: [
    { label: 'You didn’t order it from abroad', detail: 'The whole scam fits inside one fact you already know but weren’t asked.' },
    { label: 'Fee-first logistics', detail: 'Real couriers collect duties in their app against a tracking number. They never collect by text link.' },
    { label: 'Fees that grow', detail: 'VAT → insurance → clearance. Legitimate holds don’t stack; scripts do.' },
  ],

  outcomes: [
    {
      match: { d1: 'track' },
      title: 'Tracked it yourself',
      text: 'Thirty seconds in the app you already had. The fake reference evaporated, your real order was out for delivery, and the only thing that had been on hold was your Saturday coffee.',
      points: 50,
    },
    {
      match: { d2: 'stop', d1: 'engage' },
      title: 'Walked away mid-script',
      text: 'You heard the fee grow in real time — VAT to insurance in one phone call — and hung up anyway. That’s the muscle: scripts only work on people who stay on the line.',
      points: 45,
    },
    {
      match: { d1: 'pay' },
      title: 'The ₱312 subscription',
      text: 'A small fee for a parcel that never existed — and now the script knows you pay. VAT became insurance became a signature. The parcel will be one fee away from delivery forever.',
      points: 5,
    },
    {
      match: { d2: 'card', d1: 'engage' },
      title: 'Card details on a phone call',
      text: 'The most expensive sentence in this case is “have your card ready.” Call the bank, freeze the card, file the fraud report — in here it’s practice; out there it’s the whole weekend.',
      points: 0,
    },
  ],
}
