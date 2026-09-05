import type { CaseOS, OSPage, OSTell } from '../../../engine/os/types'
import { artifactUrl } from '../artifacts'
import type { AnthologyAnchor } from '../types'

/* =====================================================================
   ANCHOR 1 — "THREE PHONES / One Morning"
   A Saturday. A link about a vegetable. Three people who love their
   families, doing the reasonable thing — from inside three different
   phones. Ported from the vanilla first-playable (story.js v3), which
   carries the three verbatim proof-of-form drafts.
   ===================================================================== */

/* ------------------------------------------------------------------
   Shared pages — the same link, refracted per phone
------------------------------------------------------------------ */

const KK_TELLS: OSTell[] = [
  { label: 'EXPOSED is a lever', detail: 'Not a word — a mechanism. It grabs the reader by the collar and turns their head: look here, not there, something was hidden from you.' },
  { label: '.click, not .com', detail: 'The domain is healthtruthph.click. You register it the way you register a word misspelled in a client’s deck — automatically, without having decided to look.' },
  { label: 'A doctor with no name', detail: '“Filipino doctors are staying silent” — a silence that, by virtue of being in the headline, is already broken. No institution, no person, nothing to check.' },
]

const kkPage = (): OSPage => ({
  id: 'kangkong',
  url: 'healthtruthph.click/kangkong',
  image: artifactUrl('kangkong-clickbait'),
  title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent',
  kind: 'news',
  badge: 'Health · Sponsored',
  headline: 'They profit while you eat it every morning',
  body: [
    'For years, the truth about one common vegetable has been kept from the Filipino table. Doctors know it. Hospitals know it. Nobody says it.',
    'Why? Follow the money. Every hospital pharmacy shelf is stocked because of what this vegetable does to you.',
    'Share this before it gets taken down. They do not want you to read it.',
  ],
  tells: KK_TELLS,
  evidence: 'ev-kk-page',
})

const ampalayaPage = (): OSPage => ({
  id: 'ampalaya',
  url: 'healthtruthph.click/ampalaya',
  image: artifactUrl('ampalaya-clickbait'),
  title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent',
  kind: 'news',
  badge: 'Health · Sponsored',
  headline: 'Same template. Different vegetable.',
  body: [
    'The ampalaya version of the same batch. Identical headline structure, identical .click domain family, identical “doctors are hiding it” close.',
    'They are running these in batches — A/B testing which produce Filipinos worry about most.',
  ],
  evidence: 'ev-ampalaya',
})

const anitaPage = (): OSPage => ({
  id: 'anita',
  url: 'tiktok.com/@dr.anitav/video/7481',
  title: 'How that “EXPOSED vegetable” link actually works 🧵',
  kind: 'video',
  creator: 'Dr. Anita V.',
  creatorSub: 'Health Communication Specialist',
  views: '340.2K',
  tag: 'DEBUNKED',
  poster: artifactUrl('dr-anita-still'),
  body: [
    '“Let’s talk about the vegetable link in your family GC. The .click domain. The EXPOSED headline. The doctors who are ‘staying silent.’ Here is exactly how this template works — and why it is in your thread today.”',
    '“Health misinformation travels fastest through family groups, because it arrives pre-vouched — it comes wrapped in a person you trust.”',
    '“And if you’ve gotten one of these links: you are not foolish. You were targeted by professionals. Subscribe to MediaLitPH Weekly — link below — and I’ll keep debunking these for you, every week, free.”',
  ],
  tells: [
    { label: 'The lips lag', detail: 'Forty milliseconds behind the voice in the bridge section — the render can’t quite keep up with the audio it was built to match.' },
    { label: 'A “Dr.” with no institution', detail: 'No hospital, no university, no license number. Just a specialty, which is not a thing you can check.' },
    { label: 'The lower-third is off', detail: 'The DEBUNKED graphic’s font weight is slightly inconsistent with the rest of the package — as though it was added in post-production.' },
    { label: 'The last ten seconds', detail: 'A gentle pivot to a newsletter — MediaLitPH Weekly, a Linktree, “subscribe for weekly debunks, it’s free.” The debunk is the funnel.' },
  ],
  evidence: 'ev-anita',
})

/* ==================================================================
   MAYA — DECIDE
   Dark mode. Six icons. The “no” folder. Mt. Pulag, which wants
   nothing from her. She is the only one who experiences the morning
   as choice. Failure mode: knowing-but-not-stopping.
   ================================================================== */

const MAYA: CaseOS = {
  id: 'kk-maya',
  title: 'Maya',
  tagline: 'knowing is not stopping',
  blurb:
    'Freelance designer, Manila, late 20s. Knows exactly what the link is — she has built versions of it. Taps it anyway. Lesson: awareness is not resistance.',
  level: 'Anchor I · lived first',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'mtpulag',
    time: '6:47',
    meridiem: 'AM',
    day: 'Saturday',
    battery: 81,
    lockNote: 'Mt. Pulag, 2023. Fog, grass, no people.',
    theme: 'maya',
  },
  contacts: [
    { id: 'mama', name: 'Mama', number: '0917-553-0147', relation: 'mother' },
    { id: 'papa', name: 'Papa', number: '0919-448-7702', relation: 'father · hypertension' },
    { id: 'renz', name: 'Kuya Renz', number: '0928-771-3345', relation: 'brother' },
    { id: 'merly', name: 'Tita Merly', number: '0936-202-8814', relation: 'tita · QC' },
    { id: 'peachy', name: 'Tita Peachy', number: '0908-115-6629', relation: 'tita · HK' },
    { id: 'bea', name: 'Bea 💛', number: '0918-664-2093', relation: 'best friend since high school' },
  ],
  threads: [
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
    { id: 'bea', service: 'messenger', name: 'Bea 💛', hue: 45 },
    { id: 'jigs', service: 'sms', name: 'PixelPush Projects', number: '+639052214478', hue: 200 },
  ],
  opening: [
    { threadId: 'gc', msg: { from: 'them', text: 'Blessed Saturday po sa lahat!! 🌅🙏 Claim this blessing — type AMEN!', at: '6:01 AM' } },
    { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'The same sunrise GIF. She has sent variations for 347 mornings. Mama always answers. Papa never does. You are somewhere in between.' } },
    { threadId: 'gc', msg: { from: 'them', text: 'Pasabuy nga pala sa SM — yung Tide liquid na malaki, sale daw today 🧺', at: '6:09 AM' } },
    { threadId: 'gc', msg: { from: 'them', text: 'Mga pamangkin ha, look at this. Very important for your health. My officemate sent this — doctor daw ang source 👨‍⚕️', at: '6:19 AM' } },
    { threadId: 'gc', msg: { from: 'them', kind: 'link', pageId: 'kangkong', at: '6:19 AM' } },
    { threadId: 'bea', msg: { from: 'them', text: 'ok weird question before you fully wake: are we still on for tonight', at: '6:12 AM' } },
    { threadId: 'bea', msg: { from: 'them', text: 'no rush. good morning ☀️', at: '6:12 AM' } },
    { threadId: 'jigs', msg: { from: 'them', text: 'Morning! Small note: client wants thumbnail v2 “louder.” Their word.', at: '6:31 AM' } },
  ],
  photos: [],
  pages: [kkPage()],
  notes: [
    { title: 'Saturday list', body: 'kettle · PixelPush v2 · Mama: load · Bea tonight?' },
  ],
  replies: [
    { id: 'm-tap', threadId: 'gc', label: 'Tap the link — maybe you’re wrong', set: { maya_choice: 'tapped' } },
    { id: 'm-ask', threadId: 'gc', label: '“Tita, san niyo po nakuha yung link? 😊”', set: { maya_choice: 'asked' } },
    { id: 'm-heart', threadId: 'gc', label: '❤️ and scroll past', set: { maya_choice: 'hearted' } },
    { id: 'm-file', threadId: 'gc', label: 'Screenshot it, send to Kuya Renz later', set: { maya_choice: 'filed' } },
  ],
  moments: [
    {
      id: 'maya-wake',
      label: 'Open the family GC',
      text: [
        'Your hand finds it before your eyes do.',
        'This is not a thing you do. This is a thing that happens — wrist rotating, fingers crossing the sheet, thumb arriving at glass like it has been called home. You are still inside the blurred edge of a dream about nothing. The muscle is already deciding.',
        'Fourteen, all told. You feel them as a weight, not a number. Saturday. You had a thought, before sleep, that Saturday would be different. The thought is already gone.',
        'She turned off message previews eight months ago. She told herself it was a privacy thing. It was a wanting-to-choose thing. She wanted the notification to be an invitation, not an ambush. It did not work.',
        'Six icons. Not because she deleted everything — because she keeps deleting things and not replacing them. There is a folder called later. There is a folder called no. The no folder is not a joke. She has genuinely tried to make herself harder to reach by her own inbox.',
      ],
    },
    {
      id: 'maya-end',
      label: 'Lock the phone',
      text: [
        'You lock the phone. The kettle is somewhere near boiling.',
        'You knew what the link was the whole time. Knowing did not stop the link. Knowing only let you watch yourself, in good resolution, not stopping it either.',
        'You wanted, this morning, to be a little better than you were yesterday. You are so tired of wanting that — and tired, too, of how the wanting never quite becomes the doing.',
      ],
    },
  ],
  rules: [
    { id: 'may-wake', when: { flag: 'os_unlocked' }, moment: 'maya-wake' },
    {
      id: 'may-stop',
      when: { flag: 'dismissed:maya-wake' },
      set: { maya_seen: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You stop. Not at the article. You stop at the word EXPOSED, because you have designed enough thumbnails to know what EXPOSED is doing. It is not a word. It is a lever. The visual equivalent of grabbing someone by the collar and turning their head: look here, not there, something was hidden from you.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The domain is healthtruthph.click. Not .com. Not .ph. You register this the way you register a word misspelled in a client’s deck — automatically, professionally, without having decided to look.' } },
        { threadId: 'gc', msg: { from: 'them', text: 'Salamat po Ate 🙏 Share ko rin sa bible study group. Lalo na para kay Papa, may altapresyon pa naman sya', at: '6:21 AM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The link has Mama’s name on it now.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'Tita Merly sent it because she loves her family. Her officemate sent it because that officemate loves her. The source is described as a doctor not because anyone verified this but because doctor is the word that turns care into authority — and authority into permission to stop asking questions.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Mama has already thanked it and already assigned it a destination: Papa, who has high blood pressure, who eats kangkong almost every morning in his sinigang, who will read whatever Mama puts in front of him because he trusts her the way you trust Mama, which is completely and without thinking about it.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The link has been in this family for nine minutes and it has already moved two stops along a chain that ends at your father’s breakfast. You know what the link is. You have built versions of this template, for clients who wanted urgency without facts.' } },
      ],
    },
    {
      id: 'may-tap',
      when: { replySent: 'm-tap' },
      set: { maya_decided: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You know what you know. You tap it anyway, because “probably misinformation” is not the same as “definitely misinformation,” and you would rather be certain than right.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Right just leaves you alone with yourself.' } },
      ],
    },
    {
      id: 'may-ask',
      when: { replySent: 'm-ask' },
      set: { maya_decided: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The emoji is doing everything. Without it, you are questioning an elder in front of the whole family. With it, you are being curious — curious is permitted. You are asking a question. You are not saying she is wrong.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You are not saying she is wrong.' } },
      ],
    },
    {
      id: 'may-heart',
      when: { replySent: 'm-heart' },
      set: { maya_decided: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', text: 'You reacted ❤️ to Tita Merly’s message.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You put your name on it. The heart is not neutral. The heart is endorsement. Every person who opens this GC later today will see your ❤️ and weigh it as evidence that someone checked. No one checks before they heart-react.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'That’s why it matters that you heart-react.' } },
      ],
    },
    {
      id: 'may-file',
      when: { replySent: 'm-file' },
      set: { maya_decided: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', text: 'Screenshot saved. Drafted to Kuya Renz: “legit?”' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'What you have done is made this problem a message you sent but didn’t have to send yet.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'This is not a solution. This is a form of filing.' } },
      ],
    },
    { id: 'may-coda', when: { flag: 'maya_decided' }, moment: 'maya-end' },
    { id: 'may-done', when: { flag: 'dismissed:maya-end' }, set: { maya_done: true } },
  ],
  evidenceLabels: {
    'ev-kk-page': 'Opened healthtruthph.click — the template you have built before',
  },
  endFlag: 'maya_done',
}

/* ==================================================================
   TITA MERLY — FORWARD
   Light mode, max font. The Last Supper, never changed. Care
   expressed as distribution. There is no "delete" in her moral
   vocabulary — only how much you confirm before you pass it along.
   Recognition (needs Maya lived): Maya's question lands.
   ================================================================== */

const TITA: CaseOS = {
  id: 'kk-tita',
  title: 'Tita Merly',
  tagline: 'the verification is a person who loves her',
  blurb:
    'QC, ~60. Papa has hypertension. She verifies — by her own honest standards. The verification is a person who loves her. Lesson: a trust network is also an attack surface.',
  level: 'Anchor I',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'lastsupper',
    time: '5:43',
    meridiem: 'AM',
    day: 'Saturday',
    battery: 64,
    lockNote: 'The Last Supper. Downloaded three years ago. Never changed.',
    theme: 'tita',
  },
  contacts: [
    { id: 'joy', name: 'Joy A.', number: '0921-887-4410', relation: 'hospital canteen days · since forever' },
    { id: 'mama', name: 'Mama', number: '0917-553-0147', relation: 'inipit' },
    { id: 'papa', name: 'Papa', number: '0919-448-7702', relation: 'hypertension · quarter past six' },
    { id: 'peachy', name: 'Tita Peachy', number: '0908-115-6629', relation: 'sister · HK' },
    { id: 'maya', name: 'Maya', number: '0918-226-5590', relation: 'designer · ibig sabihin, matalino' },
  ],
  threads: [
    { id: 'joy', service: 'viber', name: 'Joy A.', hue: 20 },
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
  ],
  opening: [
    { threadId: 'joy', msg: { from: 'them', text: 'Tita, basahin mo po to. May pinsan ako sa Cebu, nag-share. Mga doctor daw nag-tatago.', at: '5:41 AM' } },
    { threadId: 'joy', msg: { from: 'them', kind: 'link', pageId: 'kangkong', at: '5:41 AM' } },
  ],
  photos: [],
  pages: [kkPage()],
  notes: [
    { title: 'Sa palengke', body: 'kangkong ₱20 · tuyo · Papa’s med ayaw kalimutan' },
  ],
  replies: [
    { hideWhen: 'tita_confirmed', id: 't-open', threadId: 'joy', label: 'Open the link — kung totoo ito, dapat malaman ng lahat', set: { tita_choice: 'opened' } },
    { hideWhen: 'tita_confirmed', id: 't-fwd', threadId: 'joy', label: 'Forward to the Family GC first — they should know right away', set: { tita_choice: 'forward' } },
    { hideWhen: 'tita_confirmed', id: 't-voice', threadId: 'joy', label: 'Send Joy a voice note — ask her more about the cousin', set: { tita_choice: 'voicenote' } },
  ],
  moments: [
    {
      id: 'tita-kitchen',
      label: 'Pick up the phone',
      text: [
        'The oil is already talking.',
        'Not loud yet — just the small steady spit of fat hitting the pan, that sound that means the morning has already decided to begin without waiting for you. You laid the tuyo in at five-thirty, low flame, patience, don’t crowd the fish, the way Mama taught you. The window above the sink is the color of a bruise turning yellow. Not dawn yet. The in-between.',
        'Papa is still asleep. You can hear the ceiling fan from the bedroom — the faint wobble it’s had for three years that you keep meaning to ask your son about. The wobble means Papa is in there. Alive and breathing and in there.',
      ],
    },
    {
      id: 'tita-kitchen2',
      label: 'Later that morning',
      text: [
        'The tuyo is done. You transfer it to the plate — the chipped one with blue flowers, the one Papa likes — and set it on the table with the rice you kept warm since five. A glass of water beside it. You fold a paper towel for his hands.',
        'You will wake him in ten minutes. You always wake him at quarter past six.',
        'Your phone is face-down on the counter. You don’t look at it.',
      ],
    },
  ],
  rules: [
    { id: 'tit-open', when: { flag: 'os_unlocked' }, moment: 'tita-kitchen' },
    {
      id: 'tit-read',
      when: { flag: 'dismissed:tita-kitchen' },
      typingIn: 'joy',
      set: { tita_read: true },
      push: [
        { threadId: 'joy', msg: { from: 'sys', kind: 'narr', text: 'Joy. You smile before you even open it. Joy sends things at hours that would surprise other people, but you’ve known her since the hospital canteen days and Joy has never changed. Early bird talaga.' } },
        { threadId: 'joy', msg: { from: 'sys', kind: 'narr', text: 'You read the headline twice. Mga doctor nag-tatago. Doctors hiding something.' } },
        { threadId: 'joy', msg: { from: 'sys', kind: 'narr', text: 'Your thumb hovers over the preview image — the kangkong circled in red like a problem, like something labeled wrong. You think of the kangkong you bought at the palengke on Thursday. You think of Papa’s blood pressure, the morning medication he takes with warm water, the chart the doctor drew for him about sodium. You think: kung totoo ito. If this is true.' } },
        { threadId: 'joy', msg: { from: 'them', text: 'Yung pinsan ko, nars siya before. Dati sa Cebu Doctors. Sabi niya meron daw talagang mga ganito na tinatago ng mga ospital. Para sa supplement nila kasi eh.', at: '5:42 AM' } },
        { threadId: 'joy', msg: { from: 'sys', kind: 'aside', text: 'There it is — the part that makes the thing real. Joy’s cousin was a nurse. Cebu Doctors. That is not nothing. You have never been there but you have heard of it, it sounds like a place where nurses know things.' } },
        { threadId: 'joy', msg: { from: 'sys', kind: 'narr', text: 'And if a nurse is sharing this through Joy — who worked at the hospital six years before the barangay health center, who brought you mango float when your knee was swollen, who is not the type to share things without reason — then this is not nothing.' } },
      ],
    },
    {
      id: 'tit-opened',
      when: { replySent: 't-open' },
      set: { tita_confirmed: true },
      push: [
        { threadId: 'joy', msg: { from: 'sys', kind: 'narr', text: 'The page is slow to load on the kitchen wifi. Worried doctors in white coats. Red text. You do not read all of it. You read enough to feel the weight of it settle where your worry already lives.' } },
      ],
    },
    {
      id: 'tit-fwd',
      when: { replySent: 't-fwd' },
      set: { tita_confirmed: true },
      push: [
        { threadId: 'joy', msg: { from: 'sys', kind: 'narr', text: 'Right away. Before the day gets loud, before everyone is busy. The people you love should have this in their hands when they wake.' } },
      ],
    },
    {
      id: 'tit-voice',
      when: { replySent: 't-voice' },
      set: { tita_confirmed: true },
      push: [
        { threadId: 'joy', msg: { from: 'you', kind: 'voice', secs: 14, at: '5:48 AM' } },
        { threadId: 'joy', msg: { from: 'them', kind: 'voice', secs: 22, at: '5:51 AM', caption: 'Sigurado yan Tita, hindi naman magsisinungaling si pinsan ko. Nars siya, alam niya ang sinasabi niya.' } },
        { threadId: 'joy', msg: { from: 'sys', kind: 'narr', text: 'Twenty-two seconds. Joy’s voice, warm and certain — the cousin, the years, the hospital. You ask, and Joy confirms, and confirmation from Joy is the only kind of proof your morning has ever needed.' } },
      ],
    },
    {
      id: 'tit-compose',
      when: { flag: 'tita_confirmed' },
      set: { tita_composing: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You press and hold the link until the option appears. Forward. Share. Copy link. You copy it. You go back to Messenger, back to the family GC.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You type around the link. You want it to have a frame — a link alone looks cold, looks like you just threw something at them. You want them to know you are thinking of them. You are always thinking of them.' } },
      ],
    },
    {
      id: 'tit-send',
      when: { flag: 'tita_composing' },
      set: { tita_forwarded: true },
      push: [
        { threadId: 'gc', msg: { from: 'you', text: 'Mga pamangkin, look at this ha. Very important for your health.', at: '6:01 AM' } },
        { threadId: 'gc', msg: { from: 'you', kind: 'link', pageId: 'kangkong', at: '6:01 AM' } },
        { threadId: 'gc', msg: { from: 'you', text: 'My officemate sent this, nurse yung pinsan niya before. Concern lang niya sa ating kalusugan.', at: '6:02 AM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You want to say something about Papa — about how this matters because of Papa — but you don’t want to alarm them on a Saturday, and you don’t want Papa to see it and think you are worried, because you are always worried, quietly, and he knows it. Saturday should not feel heavy. So you add instead:' } },
        { threadId: 'gc', msg: { from: 'you', text: 'Lalo na kayo na may matanda sa bahay. Share niyo na rin sa iba para aware lahat 💕🙏', at: '6:03 AM' } },
        { threadId: 'gc', msg: { from: 'sys', text: 'Sent · 6:03 AM' } },
      ],
    },
    { id: 'tit-coda', when: { flag: 'tita_forwarded' }, moment: 'tita-kitchen2' },
    {
      id: 'tit-recog',
      when: { allFlags: ['dismissed:tita-kitchen2', 'done_maya'], notFlag: 'tita_done' },
      set: { tita_recog: true },
      push: [
        { threadId: 'gc', msg: { from: 'them', text: 'Tita, san niyo po nakuha yung link? 😊', at: '7:14 AM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The emoji sits at the end like a small soft thing.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You read it twice. San niyo po nakuha. Where did you get it. Not “is this true” — not “Tita I checked and…” — just: where. The emoji makes it gentle. It makes it a question, not a doubt. But underneath the gentleness you feel the shape of what is not being said.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Your chest does a small thing. Not anger. Not shame. Somewhere between the two, a tightness you do not have a name for.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Maya is the one who designs things, who knows how the internet works in a way you do not fully understand but trust because she is family, because she is bright, because when you ask her how to forward something she shows you without making you feel small. You love her the way you love all of them — completely, automatically, the way breathing does not ask permission.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'But you are also tired. The link is still in the thread, two hearts deep, Mama’s name attached. The emoji is doing something you cannot quite name.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'An hour ago you were inside Maya’s phone, watching this same link move. From there, the emoji read as curiosity — soft, permitted. From here, it’s a question she has to read twice.' } },
      ],
    },
    { id: 'tit-done-recog', when: { flag: 'tita_recog' }, set: { tita_done: true } },
    { id: 'tit-done-plain', when: { allFlags: ['dismissed:tita-kitchen2'], notFlag: 'done_maya' }, set: { tita_done: true } },
  ],
  evidenceLabels: {
    'ev-kk-page': 'Opened the link Tita forwarded — worried doctors, red text',
  },
  endFlag: 'tita_done',
}

/* ==================================================================
   BEA — CONSULT
   White, chronically online, the council. She is right about the
   kangkong link. She is also, right now, inside a different
   operation entirely. Recognition (needs Maya lived): the afterglow
   meets what her share set in motion.
   ================================================================== */

const BEA: CaseOS = {
  id: 'kk-bea',
  title: 'Bea',
  tagline: 'correct about the scam, fooled by the thing that agrees',
  blurb:
    'Digital comms at a platform-accountability NGO. Has given the webinar. She nails the link in two minutes — and shares the AI debunker that flatters her. Lesson: media literacy can become its own automation bias.',
  level: 'Anchor I',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'tweet',
    time: '7:14',
    meridiem: 'AM',
    day: 'Saturday',
    battery: 38,
    lockNote: '“epistemic cowardice is choosing civility over clarity” — found it in 2022, changed her life a little bit.',
    theme: 'bea',
  },
  contacts: [
    { id: 'maya', name: 'Maya 💛', number: '0918-226-5590', relation: 'best friend since high school' },
    { id: 'camille', name: 'Camille', number: '0906-774-1183', relation: 'girls (work)' },
    { id: 'maricel', name: '@maricel_teaches', number: 'threads · teacher', relation: 'reposted you' },
  ],
  threads: [
    { id: 'maya4ever', service: 'messenger', name: 'maya 4ever 💛', hue: 45 },
    { id: 'girlswork', service: 'messenger', name: 'girls (work)', hue: 320, members: ['Camille', 'Priya', 'Nads'] },
    { id: 'foryou', service: 'tiktok', name: 'For You', hue: 190 },
    { id: 'council', service: 'messenger', name: 'the council', hue: 210, members: ['Ivo', 'Japs', 'Kat', 'Rio'] },
    { id: 'threadspost', service: 'threads', name: 'Threads · @beareyes.ph', hue: 202 },
  ],
  opening: [
    { threadId: 'maya4ever', msg: { from: 'them', kind: 'photo', photoId: 'kk-shot', caption: 'is this real or no my tita keeps sending these', at: '7:12 AM' } },
    { threadId: 'girlswork', msg: { from: 'them', text: 'guys is this true?? yung ampalaya?? 😭', at: '7:09 AM' } },
    { threadId: 'girlswork', msg: { from: 'them', kind: 'link', pageId: 'ampalaya', at: '7:09 AM' } },
    { threadId: 'foryou', msg: { from: 'sys', text: '💛 @factcheckph liked your comment · 7:07 AM' } },
  ],
  photos: [
    {
      id: 'kk-shot',
      title: 'Screenshot · kangkong link preview',
      kind: 'screenshot',
      emoji: '📱',
      src: artifactUrl('kangkong-clickbait'),
      evidence: 'ev-kk-shot',
    },
  ],
  pages: [ampalayaPage(), anitaPage()],
  notes: [
    { title: 'work deck (draft)', body: '“the fill-in-the-blank scare template” — slide 4: EXPOSED + they don’t want you to + [profession] silent' },
  ],
  replies: [
    { hideWhen: 'bea_consulted', id: 'b-tiktok', threadId: 'maya4ever', label: 'Open TikTok — see what’s already circulating', set: { bea_choice: 'tiktok' } },
    { hideWhen: 'bea_consulted', id: 'b-snopes', threadId: 'maya4ever', label: 'Cross-check the Snopes tab you’ve had open six days', set: { bea_choice: 'snopes' } },
    { hideWhen: 'bea_consulted', id: 'b-council', threadId: 'maya4ever', label: 'Screenshot it to the council — let them weigh in', set: { bea_choice: 'council' } },
  ],
  moments: [
    {
      id: 'bea-awake',
      label: 'Open Maya first',
      text: [
        'You’ve been awake since six. Insomnia, the usual cocktail — cortisol and scrolling, neither one helping the other. A full loop through TikTok, three Reddit threads, the wordle, twenty minutes of a documentary you’ve seen before. Your back hurts. You did not get up to stretch. You are horizontal and in a rich information environment and this is fine.',
        'Your phone registers seven new notifications in the last four minutes. You count them the way other people count sheep.',
      ],
    },
    {
      id: 'bea-afterglow',
      label: 'Don’t put it down yet',
      text: [
        'You lock the phone. You feel, without calling it anything, the comfortable weight of having been useful. Of having done the thing correctly. Of being the person your friends call when they get the bad link.',
        'The video had 340,000 views by 7 AM on a Saturday. You have added yours to the total.',
      ],
    },
  ],
  rules: [
    { id: 'bea-wake', when: { flag: 'os_unlocked' }, moment: 'bea-awake' },
    {
      id: 'bea-openmaya',
      when: { flag: 'dismissed:bea-awake' },
      set: { bea_seen: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You open Maya first because you always open Maya first. You look at it for approximately four seconds.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'aside', text: 'The headline is formatted the way they all are — “EXPOSED” doing load-bearing work, the passive voice on “they don’t want you to,” the vague conspiratorial “they.” The URL ends in .click, which is what scammers use when .com was taken. “Filipino Doctors Are Staying Silent” is a sentence about a silence that, by virtue of being in the headline, is already broken. You’ve made a Canva slide about this template.' } },
      ],
    },
    {
      id: 'bea-fast',
      when: { flag: 'dismissed:bea-awake' },
      set: { bea_fast: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'you', text: 'ok so immediately: look at that URL. .click domains are almost always a tell. healthtruthph.CLICK.', at: '7:14 AM' } },
        { threadId: 'maya4ever', msg: { from: 'you', text: 'also that headline structure — “EXPOSED” + “they don’t want you to know” + a specific professional group staying quiet about something — it’s a template. literally a fill-in-the-blank.', at: '7:14 AM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You open the work GC next. Camille has forwarded a link with: “guys is this true?? yung ampalaya??” Different vegetable. Same template. Same .click domain family.' } },
        { threadId: 'maya4ever', msg: { from: 'you', text: 'same template. different vegetable. they’re running these in batches rn, probably A/B testing which produce Filipinos are most worried about. seen a malunggay one too', at: '7:15 AM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You’ve sent four messages in under two minutes. This is what you’re for. You feel the small clean satisfaction of competence.' } },
      ],
    },
    {
      id: 'bea-tiktok',
      when: { replySent: 'b-tiktok' },
      set: { bea_consulted: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'Muscle memory. The thumb moves before the decision does.' } },
      ],
    },
    {
      id: 'bea-snopes',
      when: { replySent: 'b-snopes' },
      set: { bea_consulted: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You flick to it. You don’t read it. You feel better for having it open, the way a seatbelt feels like driving carefully. Then your thumb finds TikTok anyway.' } },
      ],
    },
    {
      id: 'bea-council',
      when: { replySent: 'b-council' },
      set: { bea_consulted: true },
      push: [
        { threadId: 'council', msg: { from: 'you', text: 'vegetable misinfo batch, see thread 👆', at: '7:16 AM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'The council is for exactly this. Four people who are right about things, confirming to each other that they are right about things. Then, while you wait for them, your thumb finds TikTok.' } },
      ],
    },
    {
      id: 'bea-trap',
      when: { flag: 'bea_consulted' },
      set: { bea_watching: true },
      push: [
        { threadId: 'foryou', msg: { from: 'sys', kind: 'narr', text: 'The feed updates before you’re even conscious of opening the app. The third video is not the usual rotation. #factcheck #medialiteracy #kangkong. A woman in a blazer at a desk, DEBUNKED in red across the bottom. You stop scrolling.' } },
        { threadId: 'foryou', msg: { from: 'them', kind: 'link', pageId: 'anita', at: '7:16 AM' } },
      ],
    },
    {
      id: 'bea-won',
      when: { flag: 'bea_watching' },
      set: { bea_convinced: true },
      push: [
        { threadId: 'foryou', msg: { from: 'sys', kind: 'narr', text: 'She’s saying everything you just said to Maya. The .click domains. The fill-in-the-blank template. The supplement funnel. And then some things you hadn’t included — how health misinformation travels faster through family groups because it arrives pre-vouched, how “Filipino doctors staying silent” is built to weaponize national distrust of institutions.' } },
        { threadId: 'foryou', msg: { from: 'sys', kind: 'narr', text: 'It’s clean. It’s accurate. It’s exactly right.' } },
        { threadId: 'foryou', msg: { from: 'sys', kind: 'aside', text: 'You do not notice, because you are not looking for it, that her lips are forty milliseconds behind her voice in the bridge. That the “Dr.” has no institution attached — just a specialty. That the lower-third font weight is slightly off, as if added in post. That the last ten seconds pivot, gently, to a newsletter — MediaLitPH Weekly — a Linktree, “subscribe for weekly debunks, it’s free.”' } },
        { threadId: 'foryou', msg: { from: 'sys', kind: 'narr', text: 'What you notice is that she is right about everything. She is packaging it better than you could in ninety seconds. You feel the particular warmth of being understood before you spoke.' } },
      ],
    },
    {
      id: 'bea-post',
      when: { flag: 'bea_convinced' },
      set: { bea_posted: true },
      push: [
        { threadId: 'threadspost', msg: { from: 'you', text: 'this is the cleanest explainer i’ve seen on the vegetable misinformation batch going around rn. bookmarking for the work deck. if you’ve gotten an “EXPOSED: the vegetable your doctors won’t talk about” link in your family GC this week, this is why and how. 🧵', at: '7:18 AM' } },
        { threadId: 'threadspost', msg: { from: 'sys', text: 'attached: TikTok — Dr. Anita V. · 340.2K views' } },
        { threadId: 'threadspost', msg: { from: 'sys', kind: 'narr', text: 'Then you paste the same link into maya 4ever.' } },
      ],
    },
    {
      id: 'bea-share',
      when: { flag: 'bea_posted' },
      set: { bea_shared: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'you', text: 'ok also someone made a great explainer on exactly this batch — send to your tita maybe', at: '7:18 AM' } },
        { threadId: 'maya4ever', msg: { from: 'them', text: 'oh this is good actually. you’re so fast at this how', at: '7:19 AM' } },
        { threadId: 'maya4ever', msg: { from: 'you', text: 'it’s literally my job babe. also TikTok just handed it to me lmao', at: '7:19 AM' } },
      ],
    },
    { id: 'bea-coda', when: { flag: 'bea_shared' }, moment: 'bea-afterglow' },
    {
      id: 'bea-recog',
      when: { allFlags: ['dismissed:bea-afterglow', 'done_maya'], notFlag: 'bea_done' },
      set: { bea_recog: true },
      push: [
        { threadId: 'threadspost', msg: { from: 'sys', text: '🧵 your post: 14 likes · 3 reposts · 1 reply' } },
        { threadId: 'threadspost', msg: { from: 'them', text: 'thank you for this!! sharing with my class GC, parents need to see 🙏', at: '7:21 AM' } },
        { threadId: 'threadspost', msg: { from: 'sys', kind: 'aside', text: 'Maricel teaches grade school. Her parents’ GC is sixty people, maybe more. Your thing is in that GC now, attributed to you, working. @tito_rick — retired journalist, 4,800 followers — reposts it with no comment, which from him is the good kind.' } },
      ],
    },
    {
      id: 'bea-recog2',
      when: { flag: 'bea_recog' },
      set: { bea_done: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'them', text: 'ok i sent it to the fam GC we’ll see lol', at: '7:23 AM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You smile, just past the screen. You feel warm. You feel correct. You feel like the kind of person who can be DMed at 7 AM with “is this real” and answer in two minutes with receipts. This is what you are for.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'This is fine.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'aside', text: 'That was you, on the other phone — Maya — forwarding Dr. Anita into the Santos family GC, because you told her to. The same family where the kangkong link started. The scam and the debunk, both AI-shaped, now traveling the same loving hands.' } },
      ],
    },
    {
      id: 'bea-done-plain',
      when: { allFlags: ['dismissed:bea-afterglow'], notFlag: 'done_maya' },
      set: { bea_done: true },
    },
  ],
  evidenceLabels: {
    'ev-kk-shot': 'Looked at Maya’s screenshot for four seconds',
    'ev-ampalaya': 'Confirmed the ampalaya batch — same template',
    'ev-anita': 'Opened Dr. Anita V. — the debunk that agrees with you',
  },
  endFlag: 'bea_done',
}

/* ==================================================================
   THE MORNING, ALL AT ONCE — timeline epilogue
   ================================================================== */

const TIMELINE = {
  title: 'The morning, all at once',
  intro:
    'You have been in three phones. Here is the one timeline none of them could see — because no one was holding all three.',
  events: [
    {
      time: '5:41',
      who: 'tita',
      label: 'Viber · Joy → Tita Merly',
      text: 'A cousin in Cebu. A nurse, before. “Mga doctor daw nag-tatago.” The link arrives wrapped in a person Tita trusts.',
    },
    {
      time: '6:01',
      who: 'tita',
      label: 'Tita Merly → Santos Family GC',
      text: '“Concern lang niya sa ating kalusugan… Lalo na kayo na may matanda sa bahay.” She forwards it the way she sends a blessed-morning GIF: as a gift.',
    },
    {
      time: '6:21',
      who: 'maya',
      label: 'Mama → the GC',
      text: '“Salamat po Ate 🙏 Share ko rin sa bible study group. Lalo na para kay Papa, may altapresyon.” The link now points at Papa’s breakfast.',
    },
    {
      time: '6:47',
      who: 'maya',
      label: 'Maya wakes',
      dynamic: {
        key: 'maya_choice',
        fallback: 'She knows the template on sight — she has built it. Knowing is not the same as stopping.',
        map: {
          tapped: 'She taps the link anyway — “probably” misinformation is not “definitely,” and she would rather be certain than right.',
          asked: 'She asks Tita where it came from, softened with an emoji so it reads as curiosity, not doubt — and gets a vouching chain back.',
          hearted: 'She reacts ❤️ and scrolls past, adding her own name to the link — knowing, in the moment she taps it, exactly what the heart does downstream.',
          filed: 'She screenshots it for Kuya Renz, turning the problem into a message she sent but didn’t have to send yet.',
        },
      },
      text: 'She knows the template on sight — she has built it. Knowing is not the same as stopping.',
    },
    {
      time: '7:09',
      who: 'bea',
      label: 'Camille → work GC',
      text: 'The ampalaya version. Same template, different vegetable. The batch is A/B testing which produce Filipinos fear most.',
    },
    {
      time: '7:14',
      who: 'bea',
      label: 'Bea, correct in two minutes',
      text: 'She nails it — the .click tell, the fill-in-the-blank headline. She is completely right about the link. That is the part that disarms her.',
    },
    {
      time: '7:16',
      who: 'bea',
      label: 'TikTok hands her Dr. Anita V.',
      text: 'An AI-generated “debunker” that agrees with her precisely. Lips 40ms late. No institution. A Linktree at the end. She does not check, because it is saying what she already knows.',
    },
    {
      time: '7:18',
      who: 'bea',
      label: 'Bea → 1,400 followers + Maya',
      text: 'She launders the AI video through her reputation. “send to your tita maybe.” Maricel forwards it to sixty parents. Tito Rick reposts.',
    },
    {
      time: '7:23',
      who: 'maya',
      label: 'Maya → the Santos Family GC',
      text: 'Trying to counter the scam, Maya forwards the AI debunker into the same GC the kangkong link started in. “we’ll see lol.”',
    },
    {
      time: 'later',
      who: 'tita',
      label: 'Tita Merly, confirmed',
      text: 'The debunk video reaches Tita as proof that doctors are talking about kangkong. The thing meant to stop the scam feeds its premise. The loop closes, warm and certain.',
    },
  ],
  close: [
    'Three phones. One Saturday. A scam and its antidote, both written by machines, both carried by people doing the loving, reasonable thing.',
    'Maya knew and did not stop. Tita confirmed — with a person who loves her. Bea was right, and being right was the door.',
    'Nobody was the villain in their own phone.',
  ],
}

/* ==================================================================
   REFLECTION — the lesson, named softly, only after you’ve lived it
   ================================================================== */

const REFLECTION = {
  title: 'What you carry forward',
  cards: [
    {
      who: 'maya',
      verb: 'DECIDE',
      line: 'Awareness is not resistance.',
      body: 'Maya identified the manipulation instantly. It changed nothing. Knowing a thing is a scam and stopping a scam are two different muscles — and the second one is the one that matters.',
    },
    {
      who: 'tita',
      verb: 'FORWARD',
      line: 'A trust network is also an attack surface.',
      body: 'Tita verified by her own honest standards: a person she loves vouched for it. The scam was built to look exactly like a gift someone who loves you would send. Her care and her credulity were the same reflex.',
    },
    {
      who: 'bea',
      verb: 'CONSULT',
      line: 'Media literacy can become its own automation bias.',
      body: 'Bea was right about the link — and that correctness was the opening. A source that agrees with you precisely short-circuits the scrutiny you’d apply to one that didn’t. The form was right, so the question of where it came from never arose.',
    },
  ],
  coda:
    'You cannot see clearly from one position. Not because any one of them was foolish — but because each of them could only see their own screen.',
}

export const KANGKONG: AnthologyAnchor = {
  id: 'kangkong',
  title: 'THREE PHONES',
  subtitle: 'One Morning',
  blurb:
    'A Saturday. A link about a vegetable. Three people who love their families, doing the reasonable thing — from inside three different phones.',
  question: 'Who is the villain in their own phone?',
  entry: 'maya',
  order: ['maya', 'tita', 'bea'],
  phones: { maya: MAYA, tita: TITA, bea: BEA },
  timeline: TIMELINE,
  reflection: REFLECTION,
}
