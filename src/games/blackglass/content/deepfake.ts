import type { CaseOS, OSPage } from '../../../engine/os/types'
import type { AnthologyAnchor } from '../types'

/* =====================================================================
   ANCHOR 3 — "GUARANTEED" / One Afternoon
   A Sunday. A deepfake of the most-trusted face on television endorses
   a guaranteed-return investment. The lesson the first two don't reach:
   synthetic media's real product is doubt — the liar's dividend.
   ===================================================================== */

const mikeVideo = (): OSPage => ({
  id: 'mike-video',
  url: 'angatpinas-invest.app/announcement',
  title: 'Tito Mike Velasco: “Guaranteed 30% return in 30 days — SEC-approved.”',
  kind: 'video',
  creator: 'AngatPinas Invest ✓',
  creatorSub: 'government-partnered',
  views: '847K',
  tag: 'GUARANTEED',
  body: [
    '“…sa partnership ng gobyerno at private sector — guaranteed 30% return in 30 days, SEC-approved, insured. Minimum ₱5,000 lang.”',
    '“Para sa kinabukasan ng pamilya. Para sa medical fund. Para sa mga pangarap na matagal nang naghihintay…”',
  ],
  tells: [
    { label: 'The mouth lags', detail: 'On the word “government,” his lips close a fraction too late — the sync is off by maybe two hundred milliseconds. Not enough to scream wrong. Just enough to itch.' },
    { label: 'The blink is metronomic', detail: 'Every four seconds, exactly. Humans don’t blink like that — least of all a broadcaster who has interviewed presidents through a brownout.' },
    { label: 'The seal is melted', detail: 'The government seal in the corner is three percent too bright, its sun-rays slightly melted — a tell, if you were looking for tells.' },
    { label: 'The faces in the b-roll', detail: 'The testimonial faces are too smooth, one eye slightly lower than the other. Rendered, not filmed.' },
  ],
  evidence: 'ev-mike',
})

const angatPage = (): OSPage => ({
  id: 'angatpinas',
  url: 'angatpinas-invest.app/register',
  title: 'AngatPinas Invest — Secure Your Future',
  kind: 'news',
  badge: 'REGISTER NOW · government-partnered · min ₱5,000',
  headline: 'Guaranteed 30% in 30 days · SEC-approved · insured',
  body: [
    '“Nabayaran ko na ang hospital bill ni Nanay. Salamat AngatPinas.” — smiling faces holding phones.',
    'Slots are limited. Register with your name, GCash number, and amount. Minimum ₱5,000.',
  ],
  tells: [
    { label: 'No SEC record', detail: 'SEC.gov.ph search: “AngatPinas Invest” → No results found. The registration number on the footer belongs to a dissolved trading firm.' },
    { label: '“Guaranteed” is illegal', detail: 'Guaranteed returns are not legal for retail investments in the Philippines. Real offerings promise; they do not guarantee.' },
  ],
  evidence: 'ev-angat',
})

/* — TITA MERLY · his face, so it’s true — */

const TITA_DF: CaseOS = {
  id: 'df-tita',
  title: 'Tita Merly',
  tagline: 'his face, so it’s true',
  blurb:
    'Thirty years of trusting that face at 6pm. The face is all the proof a blessing needs. Lesson: a trusted face was the lock; now anyone has the key.',
  level: 'Anchor III · lived first',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'lastsupper',
    time: '2:14',
    meridiem: 'PM',
    day: 'Sunday',
    battery: 58,
    lockNote: 'The Last Supper. Downloaded three years ago. Never changed.',
    theme: 'tita',
  },
  contacts: [
    { id: 'linda', name: 'Auntie Linda', number: '0923-445-7801', relation: 'prayer group · since the parish fair' },
    { id: 'maya', name: 'Maya', number: '0918-226-5590', relation: 'designer' },
    { id: 'papa', name: 'Papa', number: '0919-448-7702', relation: 'napping' },
  ],
  threads: [
    { id: 'linda', service: 'viber', name: 'Auntie Linda', hue: 20 },
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
  ],
  opening: [
    { threadId: 'linda', msg: { from: 'them', text: 'Merly sis, WATCH THIS!!! Si Tito Mike Velasco oh 🙏 Bagong programa daw for seniors and OFWs, government-partnered. Share ko kasi alam kong may pinaplano kayo for Papa’s fund 💕', at: '2:14 PM' } },
    { threadId: 'linda', msg: { from: 'them', kind: 'link', pageId: 'mike-video', at: '2:14 PM' } },
  ],
  photos: [],
  pages: [mikeVideo(), angatPage()],
  notes: [
    { title: 'Para kay Papa', body: 'cardiology follow-up next month · maintenance meds mahal na naman' },
  ],
  replies: [
    { id: 'df-fwd', threadId: 'linda', label: 'Forward to the family GC — “Para kay Papa”', hideWhen: 'df_1', set: { df_tita: 'forward' } },
    { id: 'df-ask', threadId: 'linda', label: 'Ask your daughter in the US first', hideWhen: 'df_1', set: { df_tita: 'asked' } },
    { id: 'df-open', threadId: 'linda', label: 'Open the AngatPinas app — just to see', hideWhen: 'df_1', set: { df_tita: 'opened' } },
    { id: 'df-reg', threadId: 'linda', label: 'Reserve a slot — start the registration', hideWhen: 'df_act', set: { df_tita_act: 'register' } },
    { id: 'df-pool', threadId: 'linda', label: 'Wait — let the family decide together', hideWhen: 'df_act', set: { df_tita_act: 'pool' } },
  ],
  moments: [
    {
      id: 'df-tita-sunday',
      label: 'Open Viber',
      text: [
        'Sunday afternoon. The kitchen is clean, Papa is napping, the TV is still on Channel 2 out of thirty years of habit. The afternoon stretches the gentle way Sundays do — mass done, lunch settled, the fan turning.',
        'The phone chimes. Not the short ping — the rounder Viber sound.',
        'Auntie Linda. Your seatmate at Saturday mass, the one who always has a candle ready when yours won’t light. You open it before you think about it.',
      ],
    },
    {
      id: 'df-tita-end',
      label: 'Lock the phone',
      text: [
        'What you do not see — because you have no reason to look — is that Tito Mike never made this video. That his voice was built from thirty years of broadcasts someone fed to a machine. That the mouth you watched form the word guaranteed was not his mouth. That the government seal in the corner is three percent too bright, its sun-rays slightly melted — a tell, if you were looking for tells.',
        'But you are not looking for tells. You are looking at the man who told you to evacuate before Yolanda. The man who has never lied to you. The man offering you a way to take care of Papa.',
        'You are looking at love shaped like a video. And love, for you, has always been the proof.',
      ],
    },
  ],
  rules: [
    { id: 'dt-open', when: { flag: 'os_unlocked' }, moment: 'df-tita-sunday' },
    {
      id: 'dt-watch',
      when: { flag: 'dismissed:df-tita-sunday' },
      set: { df_read: true },
      push: [
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'You tap it without hesitating. It’s Tito Mike. You would know that face anywhere.' } },
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'His voice. Steady. The same voice that read you the news every evening for thirty years — EDSA, Yolanda, every storm, every time the country held its breath. He told you when to evacuate. He has never lied to you.' } },
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'Medical fund. You think of Papa. The checkup next month. The maintenance medicines that keep getting more expensive. The worry that lives quietly in the back of your chest every time he coughs a little too long. You play it again. Just to hear him say it.' } },
        { threadId: 'linda', msg: { from: 'them', text: 'Legit yan ha sis. Yung pamangkin ko sa US, mag-i-invest din next week. Share mo na rin sa pamilya niyo 🙏', at: '2:17 PM' } },
      ],
    },
    {
      id: 'dt-fwd',
      when: { replySent: 'df-fwd' },
      set: { df_1: true },
      push: [
        { threadId: 'gc', msg: { from: 'you', text: 'Mga pamangkin, tignan niyo ito. Para kay Papa. Si Tito Mike pa ang nag-endorso — government-partnered, SEC-approved. 30% in 30 days, ₱5,000 lang. Baka pwede natin i-pool for his medical fund? 🙏', at: '2:30 PM' } },
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'You send it before you can second-guess. This is what family does — when you see something that can help, you share it. That is love. That is malasakit.' } },
      ],
    },
    {
      id: 'dt-ask',
      when: { replySent: 'df-ask' },
      set: { df_1: true },
      push: [
        { threadId: 'linda', msg: { from: 'you', text: 'Anak, can you check this? Government-backed daw, si Tito Mike ang nag-announce. Baka pwede for Papa’s medical fund?', at: '2:30 PM' } },
        { threadId: 'linda', msg: { from: 'sys', kind: 'aside', text: 'It is 2:30 AM there. She is asleep. You will wait until tonight. But you have watched it twice — you already believe. If she says yes, you will be the one who brought this blessing to the family.' } },
      ],
    },
    {
      id: 'dt-openapp',
      when: { replySent: 'df-open' },
      set: { df_1: true },
      push: [
        { threadId: 'linda', msg: { from: 'sys', text: 'Opening angatpinas-invest.app …' } },
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'The page that loads looks official. Blue and white and gold — the colors of trust. The seal again at the top. A button: REGISTER NOW. Below, smiling faces holding phones: “Nabayaran ko na ang hospital bill ni Nanay. Salamat AngatPinas.”' } },
        { threadId: 'linda', msg: { from: 'you', kind: 'link', pageId: 'angatpinas', at: '2:31 PM' } },
      ],
    },
    {
      id: 'dt-register',
      when: { flag: 'df_1' },
      set: { df_register: true },
      push: [
        { threadId: 'linda', msg: { from: 'sys', kind: 'aside', text: 'You have ₱12,000 in GCash right now — your daughter’s padala, for bills and groceries. Invest ₱5,000 and you still have ₱7,000 this month. And in 30 days, ₱6,500 back. That is not spending. That is multiplying. That is provision.' } },
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'The button at the bottom says REGISTER NOW. ₱5,000 becomes ₱6,500. That is one month of Papa’s medicines.' } },
      ],
    },
    {
      id: 'dt-reg',
      when: { replySent: 'df-reg' },
      set: { df_act: true },
      push: [
        { threadId: 'linda', msg: { from: 'sys', text: 'AngatPinas Invest · Registration — Name · GCash · Amount (min ₱5,000)' } },
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'Your hands shake a little — not from fear, from hope. You have not felt this in a long time. You type your name. You open the dropdown and choose ₱5,000. Steady. Careful. This is not gambling. This is Tito Mike.' } },
      ],
    },
    {
      id: 'dt-pool',
      when: { replySent: 'df-pool' },
      set: { df_act: true },
      push: [
        { threadId: 'linda', msg: { from: 'sys', kind: 'narr', text: 'You close the page — not because you doubt it, but because Papa’s fund belongs to all of you. Big decisions are family decisions.' } },
        { threadId: 'gc', msg: { from: 'you', text: 'Mga pamangkin, tignan niyo. Si Tito Mike ang nag-endorso, 30% in 30 days. Ano sa tingin niyo? Baka pwede i-pool for Papa 🙏', at: '2:34 PM' } },
      ],
    },
    { id: 'dt-coda', when: { flag: 'df_act' }, moment: 'df-tita-end' },
    { id: 'dt-done', when: { flag: 'dismissed:df-tita-end' }, set: { dft_done: true } },
  ],
  evidenceLabels: {
    'ev-mike': 'Watched the video twice — the face was the proof',
    'ev-angat': 'Opened the registration page — the colors of trust',
  },
  endFlag: 'dft_done',
}

/* — MAYA · you know, and you almost wish you didn’t — */

const MAYA_DF: CaseOS = {
  id: 'df-maya',
  title: 'Maya',
  tagline: 'you know, and you almost wish you didn’t',
  blurb:
    'Broke, and she clocks the deepfake on sight — and feels a small, ugly part of her wish it were real. Lesson: a fake makes the truth expensive to say.',
  level: 'Anchor III',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'mtpulag',
    time: '3:20',
    meridiem: 'PM',
    day: 'Sunday',
    battery: 19,
    lockNote: 'Mt. Pulag, 2023. Fog, grass, no people.',
    theme: 'maya',
  },
  contacts: [
    { id: 'tita', name: 'Tita Merly', number: '0936-202-8814', relation: 'tita · QC' },
    { id: 'bea', name: 'Bea 💛', number: '0918-664-2093', relation: 'best friend' },
  ],
  threads: [
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
    { id: 'bea', service: 'messenger', name: 'Bea 💛', hue: 45 },
  ],
  opening: [
    { threadId: 'gc', msg: { from: 'them', text: 'LOOK AT THIS!!! Si Tito Mike pa mismo nag-announce! Para sa atin to mga kapatid 🙏💕', at: '3:18 PM' } },
    { threadId: 'gc', msg: { from: 'them', kind: 'link', pageId: 'mike-video', at: '3:18 PM' } },
    { threadId: 'gc', msg: { from: 'them', text: 'Si Tito Mike naman talaga yan diba? Parang totoo mukha', at: '3:23 PM' } },
    { threadId: 'bea', msg: { from: 'sys', text: 'GCash · Balance ₱1,847.22 · client payment: still pending' } },
  ],
  photos: [],
  pages: [mikeVideo()],
  notes: [],
  replies: [
    { id: 'dm-call', threadId: 'gc', label: 'Say it’s fake in the GC', hideWhen: 'df_2', set: { df_maya: 'called' } },
    { id: 'dm-bea', threadId: 'gc', label: 'Ask Bea first — get cover before you wreck the hope', hideWhen: 'df_2', set: { df_maya: 'bea' } },
    { id: 'dm-click', threadId: 'gc', label: 'Click the link — maybe you’re wrong', hideWhen: 'df_2', set: { df_maya: 'clicked' } },
  ],
  moments: [
    {
      id: 'df-maya-couch',
      label: 'Open the GC',
      text: [
        'The couch has that Sunday-afternoon gravity. You’ve been pretending to read a design article for forty minutes. Your phone is in your hand the way a rosary is in a lola’s.',
        'It buzzes. The family GC, awake.',
      ],
    },
    {
      id: 'df-maya-end',
      label: 'Lock the phone',
      text: [
        'You lock the phone. You don’t put it down. You hold it, the screen dark, the glass warm.',
        'You knew immediately. The knowing made you the villain in a room that only wanted to hope. The scam wasn’t built to fool you — it was built so that even when you weren’t fooled, it cost you everything to say so.',
      ],
    },
  ],
  rules: [
    { id: 'dm-open', when: { flag: 'os_unlocked' }, moment: 'df-maya-couch' },
    {
      id: 'dm-watch',
      when: { flag: 'dismissed:df-maya-couch' },
      set: { dfr_read: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You watch his mouth. The word government — his lips close a fraction too late. The sync is off by maybe two hundred milliseconds. Not enough to scream wrong. Just enough to itch.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You watch his blink. Metronomic. Every four seconds, exactly. Humans don’t blink like that — least of all Tito Mike, who you’ve seen interview presidents through a brownout. The testimonial faces in the b-roll are too smooth, one eye lower than the other. You pause the video. You know what this is.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'Your GCash this morning was ₱1,847.22. The client who said “Friday” did not pay Friday. Papa’s cardiology follow-up is two weeks away — ₱12,000 before the prescriptions. And 30% of ₱5,000 is ₱1,500. Which is groceries. Or the electric. That thought sits in you like a stone.' } },
      ],
    },
    {
      id: 'dm-called',
      when: { replySent: 'dm-call' },
      set: { df_2: true },
      push: [
        { threadId: 'gc', msg: { from: 'you', text: 'guys this is a deepfake. Tito Mike didn’t make this. please don’t send money to that app 🙏', at: '3:24 PM' } },
        { threadId: 'gc', msg: { from: 'them', text: 'Maya naman, parang totoo naman mukha. Bakit ka laging negative', at: '3:25 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'And there it is. You are the one who killed the hope — in front of everyone, before they even got to hold it.' } },
      ],
    },
    {
      id: 'dm-bea-r',
      when: { replySent: 'dm-bea' },
      set: { df_2: true },
      push: [
        { threadId: 'bea', msg: { from: 'you', text: 'is this one real??? tito mike velasco??? tita just posted it and my mom is already asking how to sign up', at: '3:24 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You send Bea the screenshot. You want someone else to say it first — because being right alone, here, costs more than being wrong together.' } },
      ],
    },
    {
      id: 'dm-clicked',
      when: { replySent: 'dm-click' },
      set: { df_2: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You know you’re not wrong. You tap it anyway — because “probably fake” is not “definitely fake,” and a part of you would rather be certain than right. The want taps for you. The page loads, official and gold, and you hate how much you wanted it to be real.' } },
        { threadId: 'gc', msg: { from: 'you', kind: 'link', pageId: 'mike-video', at: '3:26 PM' } },
      ],
    },
    {
      id: 'dm-bea-answers',
      when: { flag: 'df_2' },
      set: { df_3: true },
      push: [
        { threadId: 'bea', msg: { from: 'sys', kind: 'aside', text: 'And still — what if the mouth thing is just compression. What if Auntie Linda really got paid. What if you’ve read too many scam threads and now you see ghosts in everything. Your certainty is not certainty anymore. It’s doubt wearing a skeptic’s voice.' } },
        { threadId: 'bea', msg: { from: 'them', text: 'FAKE. 100%. no SEC registration, the “government seal” is a melted logo, and “guaranteed 30%” is straight-up illegal in PH. it’s a deepfake — the mouth runs behind his words if you slow it down.', at: '3:41 PM' } },
        { threadId: 'bea', msg: { from: 'sys', kind: 'narr', text: 'You were right. You knew it on sight. And being right means you are the one who takes Papa’s hope away. The fake didn’t have to fool you. It only had to make the truth expensive to say.' } },
      ],
    },
    { id: 'dm-coda', when: { flag: 'df_3' }, moment: 'df-maya-end' },
    { id: 'dm-done', when: { flag: 'dismissed:df-maya-end' }, set: { dfm_done: true } },
  ],
  evidenceLabels: {},
  endFlag: 'dfm_done',
}

/* — BEA · right, outspread, disbelieved — */

const BEA_DF: CaseOS = {
  id: 'df-bea',
  title: 'Bea',
  tagline: 'right, with receipts, disbelieved',
  blurb:
    'She debunks it in minutes, with receipts — and loses anyway, to a commons the fake already poisoned. Lesson: the liar’s dividend. Once a face can be faked, the real face isn’t believed either.',
  level: 'Anchor III',
  minutes: '6–8 min',
  phone: {
    wallpaper: 'tweet',
    time: '3:40',
    meridiem: 'PM',
    day: 'Sunday',
    battery: 66,
    lockNote: '“epistemic cowardice is choosing civility over clarity” — found it in 2022, changed her life a little bit.',
    theme: 'bea',
  },
  contacts: [
    { id: 'maya', name: 'Maya 💛', number: '0918-226-5590', relation: 'best friend since high school' },
    { id: 'janine', name: 'Janine', number: 'the council', relation: 'council' },
  ],
  threads: [
    { id: 'maya4ever', service: 'messenger', name: 'maya 4ever 💛', hue: 45 },
    { id: 'council', service: 'messenger', name: 'the council', hue: 210, members: ['Janine', 'Ivo', 'Japs', 'Kat'] },
    { id: 'threadspost', service: 'threads', name: 'Threads · @beareyes.ph', hue: 202 },
  ],
  opening: [
    { threadId: 'council', msg: { from: 'them', text: 'THIS ONE’S BIG.', at: '2:47 PM' } },
    { threadId: 'council', msg: { from: 'them', kind: 'link', pageId: 'mike-video', at: '2:47 PM' } },
    { threadId: 'council', msg: { from: 'sys', kind: 'aside', text: 'The council has been tracking AngatPinas for an hour — the deepfake of Tito Mike, the fake SEC claim, the “30% guaranteed.” You have the receipts loaded. You are 90% done with the debunk thread.' } },
  ],
  photos: [],
  pages: [mikeVideo(), angatPage()],
  notes: [
    { title: 'debunk doc (open since 2:47)', body: 'sec screenshot ✓ · melted-seal side-by-side ✓ · mouth-lag gif ⏳' },
  ],
  replies: [
    { id: 'bf-receipts', threadId: 'threadspost', label: 'Send Maya more receipts — the mouth-lag gif', hideWhen: 'bdf_1', set: { df_bea: 'receipts' } },
    { id: 'bf-reach', threadId: 'threadspost', label: 'Check your reach', hideWhen: 'bdf_1', set: { df_bea: 'reach' } },
    { id: 'bf-council', threadId: 'threadspost', label: 'Open the council — maybe someone has a better play', hideWhen: 'bdf_1', set: { df_bea: 'council' } },
  ],
  moments: [
    {
      id: 'df-bea-doc',
      label: 'Open Maya',
      text: [
        'The good kind of focus — Notion, Canva, the debunk doc. You opened that doc at 2:47 when Janine dropped the link in the council GC with “THIS ONE’S BIG.” You are very good at this.',
      ],
    },
  ],
  rules: [
    { id: 'db-open', when: { flag: 'os_unlocked' }, moment: 'df-bea-doc' },
    {
      id: 'db-answer',
      when: { flag: 'dismissed:df-bea-doc' },
      set: { bdf_read: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'you', text: 'FAKE. 100%. been tracking it for an hour, it’s all over the council feed.', at: '3:41 PM' } },
        { threadId: 'maya4ever', msg: { from: 'you', text: 'tell your tita: no SEC registration (i checked). the government seal is fake — a melted logo. “guaranteed 30%” is illegal in PH investment law. and it’s not tito mike. it’s a deepfake.', at: '3:41 PM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', text: '📎 SEC.gov.ph — search: “AngatPinas Invest” → No results found.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You feel it — the small clean weight of being the person who knows. You paste the SEC screenshot. Receipt.' } },
      ],
    },
    {
      id: 'db-thread',
      when: { flag: 'bdf_read' },
      set: { bdf_posted: true },
      push: [
        { threadId: 'threadspost', msg: { from: 'you', text: '🧵 THREAD: the “AngatPinas Invest” deepfake spreading on FB/TikTok right now. A fake Tito Mike Velasco endorsement targeting seniors + OFWs. Here’s how to spot it, and why it’s dangerous. [1/9]', at: '3:58 PM' } },
        { threadId: 'threadspost', msg: { from: 'sys', kind: 'narr', text: 'You write the whole thing in six minutes. Nine posts, every claim sourced — SEC screenshot, fake-seal comparison, the mouth-lag gif. You post it.' } },
        { threadId: 'threadspost', msg: { from: 'sys', text: '23 likes · 41 likes · 4 reposts — climbing' } },
        { threadId: 'threadspost', msg: { from: 'sys', kind: 'narr', text: 'The debunk is moving. Not as fast as the scam — the deepfake is at 480K views — but moving. You are making the correct information loud.' } },
      ],
    },
    {
      id: 'db-receipts',
      when: { replySent: 'bf-receipts' },
      set: { bdf_1: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You send the gif, the SEC shot, the side-by-side. You are building a pile of evidence as if evidence were the same as belief.' } },
      ],
    },
    {
      id: 'db-reach',
      when: { replySent: 'bf-reach' },
      set: { bdf_1: true },
      push: [
        { threadId: 'threadspost', msg: { from: 'sys', kind: 'narr', text: 'Reach: 8,432 accounts. The deepfake: 520K views. You do the math. 1.6%. The correct information is moving. It is simply being outrun.' } },
      ],
    },
    {
      id: 'db-council',
      when: { replySent: 'bf-council' },
      set: { bdf_1: true },
      push: [
        { threadId: 'council', msg: { from: 'sys', kind: 'narr', text: 'Nico’s mom won’t believe him. Carla’s lolo already deposited ₱10K. You are reading a live feed of the debunk losing, in a dozen families at once.' } },
      ],
    },
    {
      id: 'db-bounce',
      when: { flag: 'bdf_1' },
      set: { bdf_2: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'them', text: 'tita peachy DM’d me: “Anak i know you mean well pero si Tito Mike mismo. And your friend — she’s not in finance diba? Baka di niya alam itong program kasi bago pa lang.”', at: '4:12 PM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'aside', text: 'The debunk didn’t land. It bounced. She saw the receipts and made the receipts the problem. You are being discounted in real time — not because you’re wrong, but because you’re young, because you’re “negative,” because Linda has twenty years and you have screenshots.' } },
        { threadId: 'maya4ever', msg: { from: 'them', text: 'tita merly: “linda is my friend for 20 years, she wouldn’t lie to me”', at: '4:20 PM' } },
      ],
    },
    {
      id: 'db-dividend',
      when: { flag: 'bdf_2' },
      set: { bdf_3: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'them', text: 'wait. look —', at: '4:38 PM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', text: 'Papa Santos shared a link: SEC.gov.ph — “Advisory: Beware of Fake Investment Schemes.” / Papa Santos: FYI everyone, please read.' } },
        { threadId: 'maya4ever', msg: { from: 'them', text: 'Anak san mo nakuha to? Paano natin alam kung totoo? Baka deepfake din yan 😅', at: '4:38 PM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You stop breathing. A PDF, from the government’s own website. She is joking. She is also not joking.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'aside', text: 'You understand it now. The scam’s product was never the deposits, or even the fake video. The product was the doubt. A deepfake doesn’t have to convince everyone it’s real — it only has to make everyone doubt what is. The fake was the seed; this is the fruit.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You were right about everything. You lost anyway. The game was never “prove it’s fake.” The game was “poison the commons so nothing can be proven” — and it won the moment his face appeared on the screen.' } },
      ],
    },
  ],
  evidenceLabels: {
    'ev-mike': 'Tracked the deepfake from the start',
    'ev-angat': 'Checked the registration page against the SEC',
  },
  endFlag: 'bdf_3',
}

export const DEEPFAKE: AnthologyAnchor = {
  id: 'deepfake',
  title: 'GUARANTEED',
  subtitle: 'One Afternoon',
  blurb:
    'A Sunday. A video of the most trusted face on television, promising a way out — for Papa, for the family. Three phones, and the afternoon a fake taught a family to doubt the real.',
  question: 'What is a face worth, now?',
  entry: 'tita',
  order: ['tita', 'maya', 'bea'],
  phones: { tita: TITA_DF, maya: MAYA_DF, bea: BEA_DF },
  timeline: {
    title: 'The afternoon, all at once',
    intro: 'One Sunday, three phones — and the moment a fake taught a family to disbelieve the real.',
    events: [
      {
        time: '2:14',
        who: 'tita',
        label: 'A prayer-group friend → Tita Merly',
        text: 'The deepfake arrives wearing the most trusted face on television. Thirty years of Tito Mike at 6pm carry it past every defense she has.',
      },
      {
        time: '2:30',
        who: 'tita',
        label: 'Tita Merly → the family GC',
        text: '“Para kay Papa. Si Tito Mike pa ang nag-endorso.” The dream of provision does the rest. Seeing was her whole verification.',
      },
      {
        time: '3:20',
        who: 'maya',
        label: 'Maya wakes to it',
        dynamic: {
          key: 'df_maya',
          fallback: 'She clocks the deepfake on sight — the mouth-lag, the blink — and clocks, too, the ₱1,500 it could be. For the first time her skepticism is fighting her own want.',
          map: {
            called: 'She says it in the GC — “this is a deepfake” — and is told she’s “laging negative.” She killed the hope before anyone got to hold it.',
            bea: 'She forwards it to Bea instead of saying it herself — because being right alone, here, costs more than being wrong together.',
            clicked: 'She taps the link she knows is a scam, because “probably fake” isn’t “definitely fake,” and a part of her would rather be certain than right.',
          },
        },
        text: 'She knows on sight — and almost wishes she didn’t.',
      },
      {
        time: '3:58',
        who: 'bea',
        label: 'Bea’s debunk goes out',
        text: 'Receipts, all real: no SEC record, the seal is melted, “guaranteed” is illegal. The thread climbs — and reaches a tenth of the scam’s audience.',
      },
      {
        time: '4:12',
        who: 'bea',
        label: 'The receipts bounce',
        text: '“She’s not in finance diba?” The debunk is discounted not for being wrong but for who’s holding it. “Linda has been my friend for 20 years.”',
      },
      {
        time: '4:38',
        who: 'tita',
        label: 'The dividend lands',
        text: 'Papa shares the real SEC advisory. Tita: “Baka deepfake din yan 😅.” The fake didn’t just sell a scam — it taught the family to disbelieve the truth.',
      },
    ],
    close: [
      'The deepfake didn’t have to convince everyone it was real. It only had to make everyone doubt what is.',
      'A face was the last thing we trusted on sight. Now the real face, the real warning, the real receipt — all deniable.',
      'The scam was never the video. The scam was the doubt it left behind.',
    ],
  },
  reflection: {
    title: 'What you carry forward',
    cards: [
      {
        who: 'tita',
        verb: 'FORWARD',
        line: 'A trusted face was the lock; now anyone has the key.',
        body: 'Decades of justified trust in a public face became the exact surface the fake exploited. She didn’t fail by being naïve — she failed because seeing-is-believing was the whole foundation, and the technology made seeing meaningless.',
      },
      {
        who: 'maya',
        verb: 'DECIDE',
        line: 'A fake makes the truth expensive to say.',
        body: 'She clocked it instantly — and her own precarity, plus the social cost of being the killjoy, turned the truth-teller into the villain. The liar’s dividend doesn’t only poison the real; it taxes the people who defend it.',
      },
      {
        who: 'bea',
        verb: 'CONSULT',
        line: 'The liar’s dividend.',
        body: 'A technically perfect debunk lost to a poisoned commons. Once a face can be faked, the real face stops being believed too — and the fake’s gift to every liar after it is the right to call the truth a fake.',
      },
    ],
    coda:
      'Seeing is no longer believing. The harder part: once that is true, not-seeing isn’t disbelieving either. A fake, loose in the world, hands every liar after it the same alibi — that the truth might be fake too.',
  },
}
