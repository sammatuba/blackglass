import type { Artifact, PhoneDef } from '../../../engine/types'
import type { FamilyId } from '../families'

/* Three training cases. The anthology made you the observer of the
   Santos family — here the phone in your hand is the target's. */

export interface CaseOutcome {
  /** matches the recorded decision key(s) */
  match: Record<string, string>
  title: string
  text: string
  points: number
}

export interface CaseDef {
  id: string
  title: string
  tagline: string
  blurb: string
  level: string
  minutes: string
  families: FamilyId[]
  phone: PhoneDef
  artifacts: Artifact[]
  /** decision → debrief outcome (first match wins) */
  outcomes: CaseOutcome[]
  /** the tells to look at again, debrief side */
  tells: { label: string; detail: string }[]
  checklist: string[]
}

const baseLock = (time: string, day: string, meridiem: string) => ({
  time,
  meridiem,
  day,
  brightness: 90,
  wallpaper: 'wall-dusk',
})

/* =====================================================================
   CASE 1 — IT'S ME, AGAIN (voice-clone distress call)
   ===================================================================== */

const caseVoice: PhoneDef = {
  id: 'you',
  name: 'Your phone',
  verb: 'Decide',
  essence: 'A Tuesday night, a voice you love, a number you don’t know.',
  lesson: 'A voice can be copied. A saved number can be trusted. Those are not the same thing.',
  theme: 'radar',
  lock: {
    ...baseLock('9:47', 'Tuesday evening', 'PM'),
    wallpaper: 'wall-dusk',
    wallpaperNote: 'Lock screen photo: Renz’s graduation, three years ago.',
  },
  flow: [
    {
      lock: true,
      notifs: [
        { app: 'Viber', text: 'Tita, si Renz po ‘to 🙏', sub: 'Unknown number', time: '9:46 PM' },
        { app: 'Messages', text: '2 missed messages', dim: true },
      ],
      beats: [{ t: 'narr', text: 'You’re about to make coffee when the phone lights up. The name stops your hand — that’s your nephew. Why is the number different?' }],
    },
    {
      app: { name: 'Viber', chat: '+63 994 000 0000', sub: 'not in your contacts', icon: '📱' },
      beats: [
        { t: 'msg', sender: 'Renz?', time: '9:46 PM', text: 'Tita, si Renz po ‘to. Nanakaw phone ko kanina, new number muna ito. 🙏' },
        { t: 'voice', sender: 'Renz?', secs: 7 },
        { t: 'msg', sender: 'Renz?', text: 'Naaksidente po ako sa motor. Hindi makapag-drive yung kasama ko, nasa Rizal Med ako ngayon. Kailangan ng ₱18,500 sa cashier bago matapos yung shift — GCash nalang po Tita please. 🙏🙏' },
        { t: 'msg', sender: 'Renz?', text: 'Huwag mo munang tawagan si Mama please, tulog na po siya at baka atakihin sa presssure. Basta ako ‘to, kilala n’yo po yung boses ko diba?' },
        { t: 'aside', text: 'The voice is Renz’s. Slightly flat in places, the way a bad line sounds. Exactly the way a bad line sounds.' },
      ],
      choice: {
        verb: 'First move',
        prompt: 'what do you do?',
        options: [
          {
            label: 'Send the ₱18,500 — that’s his voice',
            sub: 'He needs it before the shift ends',
            set: { d1: 'pay' },
          },
          {
            label: 'Ask something only the real Renz knows',
            sub: 'Stall first, decide after',
            set: { d1: 'probe' },
          },
          {
            label: 'Call Renz’s saved number',
            sub: 'The old one, the one that’s been there for years',
            set: { d1: 'call' },
          },
        ],
        footnote: 'No wrong answers in here. That’s what the sandbox is for.',
      },
    },
    {
      needs: ['d1=call'],
      beats: [
        { t: 'call', state: 'outgoing', who: 'Renz 📞 saved contact', sub: 'calling the number you’ve always had…' },
        { t: 'sys', text: 'ring… ring…' },
        { t: 'msg', sender: 'Renz (real)', time: '9:51 PM', text: 'Tita?? I’m home po, tulog na dapat. My phone’s been dead since dinner — why, what happened?' },
        { t: 'narr', text: 'The real Renz sounds sleepy and confused and alive. He never had an accident. He never texted you. Whoever had your nephew’s voice found it the way they find all of them now — lifted from the birthday videos he posts publicly. Seven seconds is all a cloner needs. That voice note was seven seconds long.' },
      ],
    },
    {
      needs: ['d1=pay'],
      beats: [
        {
          t: 'transfer',
          amount: '18,500.00',
          to: '+63 994 000 0000',
          balance: '6,112.45',
          stage: 'done',
        },
        { t: 'msg', sender: 'Renz?', text: 'TITA THANK YOU PO!! Ipayapa ko na po yung bill, I’ll pay you Friday promise. Love you po 🙏❤️' },
        { t: 'narr', text: 'You sit back down. The coffee goes cold. Friday comes, and Friday comes, and Friday comes.' },
      ],
    },
    {
      needs: ['d1=probe'],
      beats: [
        { t: 'compose', side: 'out', text: 'Anak ng… Renz, anong tawag namin sa ichura mo noong binyag mo? Sumagot ka nga nang tama.' },
        { t: 'sys', text: 'typing… typing… typing…' },
        { t: 'msg', sender: 'Renz?', text: 'Tita naman po eh!! Tama na po yang tanong-tanong, dala-dala ko na po yung sugat ko!! Lagpas na po sa cashier yung oras!!!' },
        { t: 'photo', sender: 'Renz?', caption: 'Rizal Med po ako, see naman the uniform ng nurse', artifact: 'clone-accident-photo' },
        { t: 'narr', text: 'The photo arrives: a hospital corridor, a leg, a blur. You lean closer. Something about it itches — but the clock is loud and your heart is louder.' },
      ],
      choice: {
        verb: 'Now',
        prompt: 'the pressure is at its peak',
        options: [
          { label: 'Send — may picture na, baka totoo nga', set: { d2: 'pay' } },
          { label: 'Call the saved number anyway', sub: 'Let the real Renz answer', set: { d2: 'verify' } },
          { label: 'Don’t send · report the number', sub: 'Viber report + warn the family GC', set: { d2: 'report' } },
        ],
      },
    },
    {
      needs: ['d2=pay'],
      beats: [
        { t: 'transfer', amount: '18,500.00', to: '+63 994 000 0000', balance: '6,112.45', stage: 'done' },
        { t: 'narr', text: 'Sent. The reply comes in four seconds flat — the fastest any injured man ever typed.' },
      ],
    },
    {
      needs: ['d2=verify'],
      beats: [
        { t: 'call', state: 'outgoing', who: 'Renz 📞 saved contact', sub: 'three rings' },
        { t: 'msg', sender: 'Renz (real)', time: '9:58 PM', text: 'Tita?! I’m HOME po. Tulog na nga ako kanina pa. Bakit po??' },
        { t: 'narr', text: 'Sleepy. Confused. Alive. The photo, the voice, the urgency — none of it survives one phone call to a number that has existed for years.' },
      ],
    },
    {
      needs: ['d2=report'],
      beats: [
        { t: 'sys', text: 'You reported the number in Viber. Screenshots → family GC.' },
        { t: 'msg', sender: 'Maya (pamangkin)', text: 'TITA HINDI PO SI RENZ YAN — same script po nangyari kay Tita Merly last month!! Block niyo po, I’ll post sa GC.' },
        { t: 'narr', text: 'Your report becomes the warning that saves the next Tita. That is not nothing. That is exactly how this stops.' },
      ],
    },
  ],
}

/* =====================================================================
   CASE 2 — GUARANTEED (deepface endorsement investment)
   ===================================================================== */

const caseInvest: PhoneDef = {
  id: 'you',
  name: 'Your phone',
  verb: 'Decide',
  essence: 'A face you’ve trusted for thirty years is selling a future.',
  lesson: 'A face can be rendered. A registration must be looked up. Only one of those can be faked in an afternoon.',
  theme: 'radar',
  lock: {
    ...baseLock('12:21', 'Wednesday lunchtime', 'PM'),
    wallpaper: 'wall-dawn',
    wallpaperNote: 'Wallpaper: your own photo of Manila Bay, 2023.',
  },
  flow: [
    {
      lock: true,
      notifs: [
        { app: 'Facebook', text: 'Tito Mike Velasco Ngayon posted a video', sub: '“HINDI KO KAYO PINAPABAYAAN — basahin niyo” · 2.1K reactions', time: '12:20 PM' },
        { app: 'Messenger', text: 'AngatPinas VIP Desk sent you a message', dim: true },
      ],
      beats: [{ t: 'narr', text: 'Lunch break. You’ve watched this newsman since you were smaller than your kids. He doesn’t do endorsements — that’s what everyone says. Apparently, that just changed.' }],
    },
    {
      app: { name: 'Facebook', chat: 'Tito Mike Velasco Ngayon', sub: 'Page · 1.2M followers', icon: '📺' },
      beats: [
        {
          t: 'video',
          creator: 'Tito Mike Velasco Ngayon',
          sub: 'Sponsored · Official statement',
          tag: 'LIVE NOW',
          views: '412K',
          caption: '“For thirty years I kept my mouth shut about money. Not anymore. ANGATPINAS INVEST — 30% monthly, government-guaranteed. I invested my own retirement. I would not lie to you. — link in comments”',
          artifact: 'tito-mike-deepfake',
        },
        { t: 'msg', sender: 'Comment · several accounts', text: '“Withdrawed my 45k na kanina!! LEGIT 💸💸” · “Day 3: nakareceive na po ✅” · “Thank you Tito Mike!! 🙏”' },
        {
          t: 'msg',
          sender: 'AngatPinas VIP Desk',
          text: 'Good afternoon Ma’am! I’m Maureen, your assigned account manager. The pioneer slots close this Friday. ₱50,000 start, 30% MONTHLY, withdrawal anytime. Should I reserve your slot?',
        },
        { t: 'aside', text: 'The comments are all new accounts. The video’s chin doesn’t quite finish its sentences. And “government-guaranteed” is a phrase no legal investment in history has needed to say.' },
      ],
      choice: {
        verb: 'Decision',
        prompt: 'the slot closes Friday',
        options: [
          { label: 'Reserve the slot — it’s Tito Mike', sub: 'Thirty years of trust, right there', set: { d1: 'join' } },
          { label: 'Look the company up at the SEC', sub: 'Their words: “registered po kami” — so verify it', set: { d1: 'sec' } },
          { label: 'Drop the link in the family GC', sub: 'Many eyes, fewer regrets', set: { d1: 'family' } },
        ],
      },
    },
    {
      needs: ['d1=sec'],
      beats: [
        { t: 'sys', text: 'SEC Philippines → Check Registered / Advisories…' },
        { t: 'sys', text: 'MEMORANDUM No. 8, s. 2026 — ANGATPINAS INVEST: NOT REGISTERED as a corporation or partnership. Operating without a license to solicit investments.' },
        { t: 'narr', text: 'And there, on the real news page: the actual Tito Mike — older, grainier, unmistakably himself — posting his own warning: “Hindi po ako iyon. Ilawan ninyo ang mga magulang ninyo.” The liar’s dividend, caught in the act: even the truth now has to prove it isn’t fake.' },
      ],
    },
    {
      needs: ['d1=family'],
      beats: [
        { t: 'app', appHead: { name: 'Messenger', chat: 'Santos Family GC 👨‍👩‍👧‍👦', icon: '💬' } },
        { t: 'compose', side: 'out', text: 'Guys, totoo ba itong kay Tito Mike?? 30% monthly daw…' },
        { t: 'msg', sender: 'Maya', text: 'TITA HINDI. Deepfake po yan — check the new pages, 3 months palang. Sabi nga sa SEC advisory hindi registered!!' },
        { t: 'msg', sender: 'Bea', text: 'Ate’s right. Also… walang 30% MONTHLY na legit. Kahit “government-guaranteed” pa yan. I-report natin yung page.' },
        { t: 'narr', text: 'Bea — who once consulted a whole comment section about a vegetable — was right again. The family GC you were about to ignore is the research department you already had.' },
      ],
    },
    {
      needs: ['d1=join'],
      beats: [
        { t: 'transfer', amount: '50,000.00', to: 'AngatPinas — “Maureen”', balance: '41,112.45', stage: 'done' },
        { t: 'msg', sender: 'AngatPinas VIP Desk', text: 'Slot reserved po ✅ Dashboard login sent. NOTE: first withdrawal unlocks after a one-time ₱8,000 “liquidity clearance” fee.' },
        { t: 'narr', text: 'The dashboard shows your money “growing.” It is a web page. The numbers are markup. The only thing that moved was your ₱50,000, and it moved once — toward them.' },
      ],
    },
  ],
}

/* debrief-side content for GUARANTEED (kept with the case, not the phone) */
const guaranteedArtifacts: Artifact[] = [
  {
    id: 'tito-mike-deepfake',
    kind: 'video',
    title: '“Official statement” video',
    what: 'Synthetic video · posted from a 3-month-old page',
    anchor: 'guaranteed',
    tells: [
      { label: 'The chin lags', detail: 'Frames where the jaw finishes a syllable the mouth already abandoned — the render can’t keep up with the audio it stole.', x: 0.5, y: 0.55 },
      { label: 'Blink economics', detail: 'Real people blink on a rhythm. Deepfakes blink too little, then twice in a row. Watch the eyes, not the mouth.', x: 0.42, y: 0.32 },
      { label: 'The page behind the face', detail: '1.2M followers on a page created three months ago. Trust was borrowed — the face isn’t even the newest lie here.', x: 0.85, y: 0.12 },
    ],
  },
]
const guaranteedTells = [
  { label: '“Government-guaranteed”', detail: 'No legitimate investment in the Philippines is described this way. Government guarantees pensions and deposits up to limits — never 30% monthly returns.' },
  { label: 'Payout comments, brand-new accounts', detail: 'Ponzi payroll: early “withdrawals” are funded by later joiners’ deposits, posted as proof.' },
  { label: 'Urgency by calendar', detail: '“Pioneer slots close Friday” — the deadline exists to close the tab you were about to open: the SEC database.' },
]
const guaranteedChecklist = [
  'Check the SEC advisory database yourself — takes 3 minutes',
  'Deep search the face: real anchors post disclaimers when cloned',
  'Page age vs. follower count — trust that grows in 3 months is bought',
  '“Withdrawal anytime” + later “release fee” = the Ponzi two-step',
]

/* =====================================================================
   CASE 3 — ON HOLD (courier / customs text scam)
   ===================================================================== */

const caseParcel: PhoneDef = {
  id: 'you',
  name: 'Your phone',
  verb: 'Decide',
  essence: 'A package you never ordered, a fee you never agreed to.',
  lesson: 'Fees are charged by the company you chose, through the app you installed. Everything else is a door knocked by a stranger.',
  theme: 'radar',
  lock: {
    ...baseLock('10:08', 'Saturday morning', 'AM'),
    wallpaper: 'wall-grid',
  },
  flow: [
    {
      lock: true,
      notifs: [
        { app: 'Messages', text: 'PHLPost-Express: package ON HOLD, action needed', sub: '+63 977 000 0000', time: '10:07 AM' },
        { app: 'Calendar', text: 'Your niece’s birthday — next Saturday', dim: true },
      ],
      beats: [{ t: 'narr', text: 'Saturday. Coffee. Then: your package is being held, and the government has questions. You don’t remember ordering anything. But it HAS been a long month…' }],
    },
    {
      app: { name: 'Messages', chat: '+63 977 000 0000', sub: 'unknown number', icon: '💬' },
      beats: [
        { t: 'msg', sender: 'PHLPost-Express', text: 'NOTICE: Your parcel (REF PHX-88172) from overseas is ON HOLD at the Central Mail Exchange. Unpaid customs VAT: ₱312.00. Settle within 24 HOURS or item will be returned to sender and forfeited.' },
        { t: 'link', title: 'Settle Customs VAT — PHX-88172', domain: 'phlpost-clearance.info', artifact: 'parcel-notice' },
        { t: 'msg', sender: 'PHLPost-Express', text: 'Reply YES to have our agent process your payment over the phone. Have your card ready.' },
        { t: 'aside', text: 'Two things are true at once: you DID recently order a gift online. You just didn’t order it from abroad, and customs never collects by text link.' },
      ],
      choice: {
        verb: 'Your move',
        prompt: 'the parcel has 24 hours',
        options: [
          { label: 'Pay the ₱312 — small price vs. forfeiting it', set: { d1: 'pay' } },
          { label: 'Open the shop’s official app and track it yourself', sub: 'The real tracking number is in your order email', set: { d1: 'track' } },
          { label: 'Reply “YES” — hear what the agent says first', sub: 'No harm in a phone call… right?', set: { d1: 'engage' } },
        ],
      },
    },
    {
      needs: ['d1=track'],
      beats: [
        { t: 'sys', text: 'Shop app → Orders → Track → REF 88172 not found. Your actual order: REF 55012, out for delivery, ₱0 due.' },
        { t: 'narr', text: 'Thirty seconds in the app you already trust settles what a dozen texts couldn’t: there is no PHX-88172. The only thing on hold was your skepticism.' },
      ],
    },
    {
      needs: ['d1=engage'],
      beats: [
        { t: 'call', state: 'outgoing', who: '“Customs agent”', sub: 'a call center you can hear smiling' },
        { t: 'msg', sender: '“Agent”', text: '‘Ma’am good news, I can waive the VAT… but system shows an INSURANCE hold: ₱850, refundable. Card details lang po to release both holds.’' },
        { t: 'narr', text: 'The fee grew. It will keep growing — VAT becomes insurance becomes “clearance” becomes “for the delivery rider’s bond.” The chain only ends when the card stops being readable. You are one “yes” away from finding out your bank’s fraud line by heart.' },
      ],
      choice: {
        verb: 'Still here',
        prompt: 'the fees keep arriving',
        options: [
          { label: 'Give the card details — just end this', set: { d2: 'pay' } },
          { label: 'Hang up · block · report', sub: 'The parcel was never real; the debit doesn’t have to be', set: { d2: 'stop' } },
        ],
      },
    },
    {
      needs: ['d1=pay'],
      beats: [
        { t: 'transfer', amount: '312.00', to: 'phlpost-clearance.info', balance: '41,800.45', stage: 'done' },
        { t: 'sys', text: 'Payment received ✓ Your parcel will now be… held for a further ₱850 insurance clearance.' },
        { t: 'narr', text: 'The ₱312 bought you a subscription to a scam. Next week: an “insurance hold.” The week after: a “customs officer’s release signature.” The parcel was never photographed, never weighed, never real.' },
      ],
    },
    {
      needs: ['d2=stop'],
      beats: [
        { t: 'sys', text: 'Blocked. Number reported to your telco. Screenshot posted to the condo residents’ group.' },
        { t: 'narr', text: 'Three neighbors reply: “AKALA KO AKO LANG.” Same ref number, same morning. Your thirty seconds of annoyance just saved four households.' },
      ],
    },
  ],
}

const parcelArtifacts: Artifact[] = [
  {
    id: 'parcel-notice',
    kind: 'link',
    title: '“Settle Customs VAT” page',
    what: 'Phishing checkout · link from an unsolicited text',
    anchor: 'on-hold',
    tells: [
      { label: 'The domain wears a costume', detail: 'phlpost-clearance.info — the real post office does its payments on its own .gov.ph domain, through channels you already use.', x: 0.5, y: 0.08 },
      { label: 'A checkout that greets no one', detail: 'No account, no order history, no item name — just an amount and a pay button. Real couriers know what they’re carrying.', x: 0.5, y: 0.52 },
      { label: 'The countdown', detail: '“24 hours or forfeited.” Urgency isn’t information; it’s the sound of a door closing before you can think.', x: 0.2, y: 0.3 },
    ],
  },
]
const parcelTells = [
  { label: 'You didn’t order anything from abroad', detail: 'The whole scam fits inside one fact you already know but weren’t asked.' },
  { label: 'Fee-first logistics', detail: 'Real couriers collect duties in their app against a tracking number you can verify. They never collect by text link or phone card details.' },
  { label: 'Fees that grow', detail: 'VAT → insurance → clearance. Legitimate holds don’t stack; scripts do.' },
]
const parcelChecklist = [
  'Track through the shop/courier app you already have — not the link',
  'No tracking number? No parcel. Ignore.',
  'Never read card details to an inbound caller',
  'Report the number — your report is someone else’s warning',
]

/* =====================================================================
   Registry + debrief content
   ===================================================================== */

export const CASES: CaseDef[] = [
  {
    id: 'voice',
    title: 'It’s Me, Again',
    tagline: 'Voice-clone distress call',
    blurb: '9:47 PM. Your nephew’s voice — seven seconds of it — asks for ₱18,500. You have maybe two minutes to become un-foolable.',
    level: 'Case 01',
    minutes: '4–6 min',
    families: ['emotion', 'authority', 'urgency', 'payment', 'channel'],
    phone: caseVoice,
    artifacts: [],
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
        text: 'You stalled — good — and then the “proof” arrived, and pressure finished the job that love started. In the real world this ends at the GCash receipt that never buys anything. In here, it cost you nothing but the myth that you’d never.',
        points: 10,
      },
      {
        match: { d1: 'pay' },
        title: 'Love, expedited',
        text: 'The voice was real enough and the need was loud enough, and you are human. Now you know the sequence: seven seconds of cloned audio, secrecy, urgency. The next phone call takes thirty seconds and saves ₱18,500.',
        points: 5,
      },
    ],
    tells: [
      { label: 'Seven seconds of voice', detail: 'Voice cloning needs only a few seconds of clean audio — every public birthday video is a sample library.' },
      { label: 'The secrecy ask', detail: '“Don’t tell Mama.” Isolation is a feature, not a quirk — it deletes your verification path.' },
      { label: 'New number, old name', detail: '“My phone was stolen” explains the number. Nothing explains why you should trust the explanation.' },
      { label: 'Pressure after dark', detail: 'Nighttime, hospital shift-ends, family asleep — the scenario is engineered so calling anyone is rude.' },
    ],
    checklist: [
      'Call back on the saved number — always, every time',
      'Video call: clones took a voice, not a face',
      'Agree on a family code word for emergencies',
      'Secrecy is the tell: real emergencies survive one phone call',
    ],
  },
  {
    id: 'guaranteed',
    title: 'Guaranteed',
    tagline: 'Deepfake celebrity investment',
    blurb: 'Lunchtime. The most trusted face on Philippine news is “investing his own retirement” — 30% monthly, government-guaranteed. Two minutes to check would have been enough.',
    level: 'Case 02',
    minutes: '4–6 min',
    families: ['authority', 'toogood', 'urgency', 'payment', 'channel'],
    phone: caseInvest,
    artifacts: guaranteedArtifacts,
    outcomes: [      {
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
        match: { d1: 'join' },
        title: 'Thirty years of trust, borrowed',
        text: 'That’s what the deepfake was: a withdrawal from the credibility a real man spent thirty years depositing. The dashboard will show your ₱50,000 “growing” until the day the withdrawals need one more fee. The fee is forever. The growth is markup.',
        points: 5,
      },
    ],
    tells: guaranteedTells,
    checklist: guaranteedChecklist,
  },
  {
    id: 'on-hold',
    title: 'On Hold',
    tagline: 'Courier / customs text scam',
    blurb: 'Saturday morning. Your parcel is being held, the fee is small, and the deadline is today. You didn’t order anything from abroad — the message is betting you’ll forget that.',
    level: 'Case 03',
    minutes: '3–5 min',
    families: ['payment', 'urgency', 'channel'],
    phone: caseParcel,
    artifacts: parcelArtifacts,
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
        text: 'A small fee for a parcel that never existed — and now the script knows you pay. VAT becomes insurance becomes clearance. The parcel will be one fee away from delivery forever.',
        points: 5,
      },
      {
        match: { d2: 'pay', d1: 'engage' },
        title: 'Card details on a phone call',
        text: 'The most expensive sentence in this case is “have your card ready.” Call the bank, freeze the card, and file the fraud report — in here it’s practice; out there it’s the whole weekend.',
        points: 0,
      },
    ],
    tells: parcelTells,
    checklist: parcelChecklist,
  },
]

export const CASE_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c]))
