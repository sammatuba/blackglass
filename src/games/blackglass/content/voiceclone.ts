import type { CaseOS } from '../../../engine/os/types'
import { artifactUrl } from '../artifacts'
import type { AnthologyAnchor } from '../types'

/* =====================================================================
   ANCHOR 2 — "IT'S ME" / One Evening
   A Tuesday night. Kuya Renz's voice — the family's own skeptic — is
   cloned and turned into a distress call. The same twenty-two minutes
   refract through Tita Merly (the voice is the proof), Maya
   (verification loses the race), and Bea (right, and absent).
   A fourth phone — the real Renz's — sits face-down in a badminton bag.
   ===================================================================== */

const VC_CONTACTS_TITA = [
  { id: 'renz', name: 'Kuya Renz', number: '0928-771-3345', relation: 'your nephew · since he was ten' },
  { id: 'mama', name: 'Mama', number: '0917-553-0147', relation: 'ate' },
  { id: 'maya', name: 'Maya', number: '0918-226-5590', relation: 'designer' },
  { id: 'papa', name: 'Papa', number: '0919-448-7702', relation: 'the living room · late news' },
]

/* — TITA MERLY · the voice is the proof — */

const TITA_VC: CaseOS = {
  id: 'vc-tita',
  title: 'Tita Merly',
  tagline: 'the voice is the proof',
  blurb:
    'Her nephew’s voice, in trouble. She has known that voice since he was ten, and she has never once had to doubt it. Lesson: a voice is no longer proof of identity.',
  level: 'Anchor II · lived first',
  minutes: '6–8 min',
  phone: {
    wallpaper: 'lastsupper',
    time: '8:02',
    meridiem: 'PM',
    day: 'Tuesday',
    battery: 43,
    lockNote: 'The Last Supper. Downloaded three years ago. Never changed.',
    theme: 'tita',
  },
  contacts: VC_CONTACTS_TITA,
  threads: [
    { id: 'renz', service: 'viber', name: 'Kuya Renz', hue: 200 },
    { id: 'gcash', service: 'gcash', name: 'Send Money', hue: 30 },
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
  ],
  opening: [
    { threadId: 'renz', msg: { from: 'them', kind: 'voice', secs: 34, at: '8:02 PM' } },
    { threadId: 'renz', msg: { from: 'them', text: 'Tita sorry, here’s the number. GCash lang po — 0915-•••-••••. Yung ₱18,500. I’ll send it back this week, swear.', at: '8:03 PM' } },
    { threadId: 'renz', msg: { from: 'them', text: 'Please po. Nag-aalala na ako dito. Eto yung damage, ayaw makinig nung tao.', at: '8:04 PM' } },
    { threadId: 'renz', msg: { from: 'them', kind: 'photo', photoId: 'vc-accident', caption: 'eto yung damage', at: '8:04 PM' } },
  ],
  photos: [
    { id: 'vc-accident', title: 'IMG from “Renz” · the damage', kind: 'photo', emoji: '🚗', src: artifactUrl('clone-accident-photo') },
  ],
  pages: [],
  notes: [
    { title: 'Kay Renz', body: 'boss na naman ang masama — dinadala niya nang tahimik. Pray for him.' },
  ],
  replies: [
    { id: 'vc-ask', threadId: 'renz', label: 'Ask him where he is — “sino kasama mo?”', hideWhen: 'vc_chosen', set: { tita_vc: 'asked' } },
    { id: 'vc-mama', threadId: 'renz', label: 'Call Mama — she should know', hideWhen: 'vc_chosen', set: { tita_vc: 'mama' } },
    { id: 'vc-nowait', threadId: 'renz', label: 'Open GCash now — before his phone dies', hideWhen: 'vc_chosen', set: { tita_vc: 'nowait' } },
    { id: 'vc-send', threadId: 'gcash', label: 'Send it — he needs you right now', hideWhen: 'vc_sent', set: { tita_sent: 'sent' } },
    { id: 'vc-trycall', threadId: 'gcash', label: 'Call Renz one more time first', hideWhen: 'vc_sent', set: { tita_sent: 'sent', tita_triedfirst: true } },
  ],
  moments: [
    {
      id: 'vc-tita-kitchen',
      label: 'Open Viber',
      text: [
        'The dishes are done. Papa is in the living room with the late news, the volume two notches too high. You haven’t sat down yet — your hands have been wiping the same counter twice because your mind is two suburbs away, with Renz, who texted this morning that his boss is being masama again. You have carried that quietly all day, the way you carry all of them.',
        'The phone chimes on the counter. Not the message sound — the rounder one. A voice message.',
        'Renz. He doesn’t send voice notes often — he’s a full-sentences boy, a periods boy. When he sends voice, it means he’s walking, or driving, or something he needs to say fast.',
      ],
    },
  ],
  rules: [
    { id: 'vt-open', when: { flag: 'os_unlocked' }, moment: 'vc-tita-kitchen' },
    {
      id: 'vt-listen',
      when: { flag: 'dismissed:vc-tita-kitchen' },
      set: { vc_read: true },
      push: [
        { threadId: 'renz', msg: { from: 'sys', kind: 'narr', text: 'You tap play before you decide to. You hold the phone close.' } },
        { threadId: 'renz', msg: { from: 'sys', kind: 'aside', text: '“Tita, hi, naku — sorry ha, I know it’s late, I just— okay so, I got into a fender-bender kanina, I’m fine, I’m fine, pero the other driver won’t let it go, sabi niya he’ll press charges kung hindi kami mag-settle tonight, and I don’t have it on me, my phone’s at three percent, I can’t even get to a charger — can you GCash me? Please? I’ll pay you back this week, promise. And Tita… wag muna kay Mama ha, ayoko siyang mag-alala, please lang po.”' } },
        { threadId: 'renz', msg: { from: 'sys', kind: 'narr', text: 'His voice. The way he says naku — the little laugh-sigh he does when something goes wrong. The breathing. The talking-fast he does when he’s stressed. You have known this boy since he was ten. You feel the smile start before you feel the worry. That is the order it comes in — him first, then the trouble. By the time the trouble lands, you have already decided it is him. It’s him.' } },
      ],
    },
    {
      id: 'vt-ask',
      when: { replySent: 'vc-ask' },
      set: { vc_chosen: true },
      push: [
        { threadId: 'renz', msg: { from: 'you', text: 'Renz anak where are you? Sino kasama mo? Are you safe?', at: '8:04 PM' } },
        { threadId: 'renz', msg: { from: 'them', text: 'I can’t explain right now Tita, the guy is literally standing here, I just need the money please, I’ll tell you everything bukas, my phone is about to die, please lang po', at: '8:05 PM' } },
      ],
    },
    { id: 'vt-ask-call', when: { replySent: 'vc-ask' }, incomingCall: { callId: 'vc1', from: 'Kuya Renz', number: '0915-•••-••••', sub: 'the clone · live', direction: 'in', transcript: ['“Tita, thank you for answering—”', '“Tita, please, the guy is here, just send it, please trust me—”'] } },
    {
      id: 'vt-mama',
      when: { replySent: 'vc-mama' },
      set: { vc_chosen: true },
      push: [
        { threadId: 'renz', msg: { from: 'sys', kind: 'narr', text: 'You press the phone icon next to Mama’s name. It rings twice. Then —' } },
      ],
    },
    { id: 'vt-mama-call', when: { replySent: 'vc-mama' }, incomingCall: { callId: 'vc2', from: 'Kuya Renz', number: '0915-•••-••••', sub: 'the clone · live', direction: 'in', transcript: ['“Tita — thank God — did you get my message?”', '“1% na po Tita, please, the number, ₱18,500, please trust me—”'] } },
    {
      id: 'vt-call-drops',
      when: { call: 'ended' },
      set: { vc_callended: true },
      push: [
        { threadId: 'renz', msg: { from: 'sys', kind: 'narr', text: 'He talks over every question — the battery, the guy, please trust me — and the line drops. The last thing you heard was please trust me.' } },
      ],
    },
    {
      id: 'vt-nowait',
      when: { replySent: 'vc-nowait' },
      set: { vc_chosen: true },
      push: [
        { threadId: 'renz', msg: { from: 'sys', kind: 'narr', text: 'You don’t wait. His phone is dying. The other driver is pressing charges. Your hands already know the way.' } },
      ],
    },
    {
      id: 'vt-gcash',
      when: { flag: 'vc_chosen' },
      set: { vc_gcash: true },
      push: [
        { threadId: 'gcash', msg: { from: 'sys', kind: 'aside', text: '₱24,180.50. Last week’s padala from your daughter in the US — for Papa’s check-up, the water, the electric. Renz said he’ll pay it back this week. He has never lied to you. Not once.' } },
        { threadId: 'gcash', msg: { from: 'sys', kind: 'narr', text: 'You think about his voice. The stress. Please trust me. You think about Mama — wag muna sabihin — and how helping quietly is a way of protecting her too.' } },
      ],
    },
    {
      id: 'vt-sent',
      when: { replySent: 'vc-send' },
      set: { vc_after: true },
      push: [
        { threadId: 'gcash', msg: { from: 'sys', text: 'GCash · Successfully sent ₱18,500.00 to 0915-•••-•••• · 8:21 PM' } },
        { threadId: 'renz', msg: { from: 'you', text: 'Sent na po, anak. Ingat ka. Call me when your phone is charged.', at: '8:21 PM' } },
        { threadId: 'renz', msg: { from: 'sys', kind: 'narr', text: 'Papa, from the living room: “Merly, sino kausap mo?” “Walang sino,” you call back. “Prayer group lang.”' } },
      ],
    },
    {
      id: 'vt-tried',
      when: { replySent: 'vc-trycall' },
      set: { vc_after: true },
      push: [
        { threadId: 'renz', msg: { from: 'sys', text: 'Calling Kuya Renz… ring… ring… ring…' } },
        { threadId: 'renz', msg: { from: 'sys', kind: 'aside', text: '“Hi, this is Renz, I can’t pick up right now, leave a message—” His phone is dead. Just like he said.' } },
        { threadId: 'gcash', msg: { from: 'sys', text: 'GCash · Successfully sent ₱18,500.00 to 0915-•••-•••• · 8:21 PM' } },
        { threadId: 'renz', msg: { from: 'you', text: 'Sent na po, anak. Call me when you can. Nag-aalala ako.', at: '8:21 PM' } },
      ],
    },
    {
      id: 'vt-gc1',
      when: { flag: 'vc_after' },
      set: { vc_gc: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Your message to Renz sits there. Sent. Read. No typing indicator comes. You check GCash again — Successfully sent. You check it a third time, the way you’d touch a stove to be sure it’s off.' } },
        { threadId: 'gc', msg: { from: 'them', text: 'has anyone talked to Kuya Renz today? he’s not answering my texts', at: '8:23 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Your chest tightens. You almost type: has anyone heard from Renz tonight. You don’t. He said wag sabihin kay Mama. You are keeping his secret because he asked you to. You are protecting him.' } },
      ],
    },
    {
      id: 'vt-gc2',
      when: { flag: 'vc_gc' },
      set: { vc_done: true },
      push: [
        { threadId: 'gc', msg: { from: 'them', text: '?? naglalaro lang ako ng badminton, anong nangyayari', at: '8:24 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The world stops. You read it again. Naglalaro lang ako ng badminton.' } },
        { threadId: 'gc', msg: { from: 'them', text: 'I’ve been here since 7, phone was in my bag. May kailangan ba kayo?', at: '8:24 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You scroll up. You play the voice note again. “Tita, hi — naku, sorry ha—” That was his voice. You open GCash. Successfully sent ₱18,500.00 to 0915-•••-••••. 8:21 PM. Your hands are shaking so hard you almost drop the phone.' } },
      ],
    },
  ],
  evidenceLabels: {
    'ev-vc-photo': 'Looked at “the damage” — proof shaped like the voice',
  },
  endFlag: 'vc_done',
}

/* — MAYA · verification loses the race — */

const MAYA_VC: CaseOS = {
  id: 'vc-maya',
  title: 'Maya',
  tagline: 'knows in three seconds; it changes nothing',
  blurb:
    'She wakes into the panic. Renz would never call Tita first — she knows on sight. Knowing buys her nothing: the scam moves faster than verification. Lesson: urgency is the weapon.',
  level: 'Anchor II',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'mtpulag',
    time: '8:11',
    meridiem: 'PM',
    day: 'Tuesday',
    battery: 22,
    lockNote: 'Mt. Pulag, 2023. Fog, grass, no people.',
    theme: 'maya',
  },
  contacts: [
    { id: 'renz', name: 'Kuya Renz', number: '0928-771-3345', relation: 'kuya' },
    { id: 'tita', name: 'Tita Merly', number: '0936-202-8814', relation: 'tita · QC' },
    { id: 'bea', name: 'Bea 💛', number: '0918-664-2093', relation: 'best friend' },
  ],
  threads: [
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
    { id: 'renz', service: 'messenger', name: 'Kuya Renz', hue: 200 },
    { id: 'bea', service: 'messenger', name: 'Bea 💛', hue: 45 },
  ],
  opening: [
    { threadId: 'gc', msg: { from: 'them', text: 'Si Renz daw. Aksidente. Kailangan daw niya ng pera ngayon ASAP', at: '8:05 PM' } },
    { threadId: 'gc', msg: { from: 'them', text: 'BAKIT HINDI KO ALAM TO', at: '8:08 PM' } },
    { threadId: 'gc', msg: { from: 'them', text: 'Sabi niya wag muna daw sabihin sayo, ayaw ka daw niyang paalalahanin. Pero Ate, alam mo naman ako, di ako pwedeng magtago sayo', at: '8:09 PM' } },
    { threadId: 'gc', msg: { from: 'them', text: '18,500 daw. May number siya for GCash. Ate, mag-send na ba ako? Natatakot ako baka makulong siya', at: '8:10 PM' } },
    { threadId: 'gc', msg: { from: 'them', text: 'MAYA GISING KA BA', at: '8:11 PM' } },
    { threadId: 'renz', msg: { from: 'you', text: 'kuya okay ka lang???', at: '8:07 PM' } },
    { threadId: 'renz', msg: { from: 'sys', text: 'Message not delivered' } },
  ],
  photos: [],
  pages: [],
  notes: [],
  replies: [
    { id: 'mv-text', threadId: 'gc', label: 'Text Renz again — “KUYA PLEASE REPLY”', hideWhen: 'mvc_1', set: { maya_vc: 'textagain' } },
    { id: 'mv-wait', threadId: 'gc', label: 'Type in the GC: “WAIT. This might not be real.”', hideWhen: 'mvc_1', set: { maya_vc: 'wait' } },
    { id: 'mv-bea', threadId: 'gc', label: 'Consult Bea — “is this a voice clone??”', hideWhen: 'mvc_1', set: { maya_vc: 'bea' } },
    { id: 'mv2-told', threadId: 'bea', label: 'Tell the GC: “This is a voice cloning scam.”', hideWhen: 'mvc_2', set: { maya_vc2: 'told' } },
    { id: 'mv2-wait10', threadId: 'bea', label: 'Ask for ten minutes to verify', hideWhen: 'mvc_2', set: { maya_vc2: 'wait10' } },
    { id: 'mv2-nothing', threadId: 'bea', label: 'Say nothing — you can’t prove it either way', hideWhen: 'mvc_2', set: { maya_vc2: 'nothing' } },
  ],
  moments: [
    {
      id: 'vc-maya-wake',
      label: 'Open the family GC',
      text: [
        'Your phone is face-down on the table where you left it after work — a small act of wanting to be done with screens. It did not work. The table is making a sound like bees trapped in glass.',
        'You flip it. Eighteen messages in nine minutes is not normal. Eighteen messages in nine minutes is someone dying, or someone about to ask for money, or Tita Merly believing it’s both.',
      ],
    },
    {
      id: 'vc-maya-end',
      label: 'Lock the phone',
      text: [
        'You lock your phone. You don’t put it down. You just hold it, the screen dark, the glass warm.',
        'You knew it was fake. You knew immediately. You’re media-aware, you’ve read the news, you’ve seen the warnings — and your knowledge was permission to watch, in good resolution, as the knowing failed to matter.',
        'The scam was not built to fool you. It was built to move faster than you could verify. And it did.',
      ],
    },
  ],
  rules: [
    { id: 'mv-open', when: { flag: 'os_unlocked' }, moment: 'vc-maya-wake' },
    {
      id: 'mv-read',
      when: { flag: 'dismissed:vc-maya-wake' },
      set: { mvc_read: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You read this the way you read a deck when the client has already decided and the deck is pretending to ask.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'Kuya Renz does not get into accidents. Kuya Renz is the one who types CHECK. THE. BALANCE. in all caps when Tita forwards something. Kuya Renz would never call Tita first. He’d call Mama. Or you.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'And yet — the voice note is right there, 0:34, already played, the waveform cached like evidence. Tita Merly heard his voice. You know her verification standard: a voice she loves.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You thumb to your DMs. The text you sent Renz at 8:07 — kuya okay ka lang??? — sits with no delivery receipt. Sent. Not delivered. The gap between what you know and what you can prove is nine minutes wide and getting wider.' } },
      ],
    },
    {
      id: 'mv-textagain',
      when: { replySent: 'mv-text' },
      set: { mvc_1: true },
      push: [
        { threadId: 'renz', msg: { from: 'you', text: 'KUYA PLEASE REPLY 😭', at: '8:12 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'It sits under the last one like a second witness to his silence. Sent. Not delivered. The GC keeps climbing.' } },
      ],
    },
    {
      id: 'mv-waittype',
      when: { replySent: 'mv-wait' },
      set: { mvc_1: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You type it. Your thumb hovers. What you’re about to do is tell a panicking mother her son might not be in danger. What she’ll hear is: you don’t care enough to be sure. You are offering doubt. She needs certainty. You have none. The sentence sits in the compose field, unfinished.' } },
      ],
    },
    {
      id: 'mv-consult',
      when: { replySent: 'mv-bea' },
      set: { mvc_1: true },
      push: [
        { threadId: 'bea', msg: { from: 'you', text: 'is this a voice clone?? it’s renz’s actual voice. tita played the note and swears it’s him', at: '8:16 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You’re doing what you always do — asking someone to tell you what you already know. Because being right alone is worse than being wrong together.' } },
      ],
    },
    {
      id: 'mv-bea-replies',
      when: { flag: 'mvc_1' },
      set: { mvc_bea: true },
      push: [
        { threadId: 'bea', msg: { from: 'them', text: 'ok listen. this is almost definitely a voice clone. if renz has ANY video online where he talks, they can clone it. i’m like 90%.', at: '8:17 PM' } },
        { threadId: 'bea', msg: { from: 'them', text: 'do NOT send money. tell tita DO NOT SEND.', at: '8:18 PM' } },
        { threadId: 'bea', msg: { from: 'sys', kind: 'narr', text: 'Bea is right. You know she’s right. She’s given a webinar on this. She’s the person you ask when you need to know if something is real.' } },
        { threadId: 'bea', msg: { from: 'sys', kind: 'aside', text: 'And still — what if the 10% is real. What if Renz is in a station right now and you told them to stop, and ₱18,500 was the difference, and you were the one who said wait. Knowledge is not speed. You know it’s fake and the knowing has bought you nothing.' } },
      ],
    },
    {
      id: 'mv2-toldgc',
      when: { replySent: 'mv2-told' },
      set: { mvc_2: true },
      push: [
        { threadId: 'gc', msg: { from: 'you', text: 'Guys this is a voice cloning scam. They clone voices from videos. This is not Kuya Renz. Please don’t send anything until he replies.', at: '8:19 PM' } },
        { threadId: 'gc', msg: { from: 'them', text: 'Maya how do you KNOW. And if he can’t reply?? If his phone is really dying??', at: '8:19 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You are right and it is not enough. You are right and they are not stopping.' } },
      ],
    },
    {
      id: 'mv2-wait10r',
      when: { replySent: 'mv2-wait10' },
      set: { mvc_2: true },
      push: [
        { threadId: 'gc', msg: { from: 'you', text: 'give me 10 minutes to verify please. don’t send anything yet', at: '8:19 PM' } },
        { threadId: 'gc', msg: { from: 'them', text: 'Anak what if we don’t have 10 minutes', at: '8:19 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Ten minutes is forever when someone you love is in danger and nothing when you’re trying to prove a negative. You are asking them to wait in a burning room because you think the fire might be fake.' } },
      ],
    },
    {
      id: 'mv2-nothingr',
      when: { replySent: 'mv2-nothing' },
      set: { mvc_2: true },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You lock the phone. Face-down. You won’t be the one who stopped them and you won’t be the one who helped. You’ll be the one who wasn’t sure. The table starts buzzing again immediately.' } },
      ],
    },
    {
      id: 'mv-truth',
      when: { flag: 'mvc_2' },
      set: { mvc_3: true },
      push: [
        { threadId: 'gc', msg: { from: 'them', text: '?? naglalaro lang ako ng badminton anong nangyayari', at: '8:24 PM' } },
        { threadId: 'gc', msg: { from: 'them', text: '14 MISSED CALLS??? MAYA??? MA???', at: '8:24 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The relief is physical. Then the dread.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'Tita Merly sent ₱18,500 to 0915-•••-•••• at 8:21 PM. Three minutes ago. “Renz anak, here na, please confirm okay ka na.” Mama thanked her. No one answered.' } },
        { threadId: 'gc', msg: { from: 'them', text: 'Tita. Anong number yan. I DIDN’T CALL YOU. I’VE BEEN AT BADMINTON SINCE 7.', at: '8:25 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The GC goes quiet. Mama starts typing, stops. Tita Peachy starts, stops. No one wants to be the first to say it.' } },
      ],
    },
    { id: 'mv-coda', when: { flag: 'mvc_3' }, moment: 'vc-maya-end' },
    { id: 'mv-done', when: { flag: 'dismissed:vc-maya-end' }, set: { mvc_done: true } },
  ],
  evidenceLabels: {},
  endFlag: 'mvc_done',
}

/* — BEA · right, and absent — */

const BEA_VC: CaseOS = {
  id: 'vc-bea',
  title: 'Bea',
  tagline: 'right in five seconds; present in none',
  blurb:
    'Maya consults her. She names the mechanism in five seconds flat — she has a slide about this. Lesson: being right is not the same as being there.',
  level: 'Anchor II',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'tweet',
    time: '8:16',
    meridiem: 'PM',
    day: 'Tuesday',
    battery: 71,
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
  ],
  opening: [
    { threadId: 'maya4ever', msg: { from: 'them', kind: 'voice', secs: 34, at: '8:16 PM', caption: '↳ forwarded · Kuya Renz' } },
    { threadId: 'maya4ever', msg: { from: 'them', text: 'is this a voice clone?? it’s renz’s actual voice', at: '8:16 PM' } },
  ],
  photos: [],
  pages: [],
  notes: [
    { title: 'Voice Cloning 101 · slide 12 (draft)', body: '“What to do if you receive a cloned call” — unfinished since the weekend.' },
  ],
  replies: [
    { id: 'bv-expert', threadId: 'maya4ever', label: 'Stay on the couch — you’ve given her the tools', hideWhen: 'bvc_chose', set: { bea_vc: 'expert' } },
    { id: 'bv-content', threadId: 'maya4ever', label: 'Finish Slide 12 while you wait', hideWhen: 'bvc_chose', set: { bea_vc: 'content' } },
    { id: 'bv-present', threadId: 'maya4ever', label: 'Call Maya — not to explain, just to be there', hideWhen: 'bvc_chose', set: { bea_vc: 'present' } },
  ],
  moments: [
    {
      id: 'vc-bea-couch',
      label: 'Open Maya',
      text: [
        'You’re on the couch. Laptop open, three tabs, a playlist you’re not really hearing. The council is mid-thread — Janine dropped a link, you’ve screenshotted it, you’re waiting for someone to confirm what you already suspect. This is Tuesday evening: low-urgency everything, pleasant and a little numb.',
        'A Canva tab has been open since the weekend: “Voice Cloning 101,” the webinar you gave four months ago. Slide 12 is still unfinished — “What to do if you receive a cloned call.”',
      ],
    },
    {
      id: 'vc-bea-end',
      label: 'Lock the phone',
      text: [
        'The council is lighting up — someone’s asking if you have a link to the webinar recording. Your laptop is still open. Slide 12 is almost done.',
        'You were in the right place. You said the right things. You explained the mechanism perfectly. You don’t know if it helped. You don’t know if being right is the same as being there.',
      ],
    },
  ],
  rules: [
    { id: 'bv-open', when: { flag: 'os_unlocked' }, moment: 'vc-bea-couch' },
    {
      id: 'bv-listen',
      when: { flag: 'dismissed:vc-bea-couch' },
      set: { bvc_read: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You sit up. Not because you don’t know the answer — you know it in under five seconds — but because Maya doesn’t ask you things like this unless it’s already moving. Maya doesn’t panic. If she’s asking, the family is already in it.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You press play. The second time through you stop listening to what he says and listen to how — the cadence, the breathing, the naku, the micro-pause before Tita.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'aside', text: 'It’s him. It’s not him. It’s both. You have a slide about this. Slide 7: voice triggers trust faster than text. Even people who know the person will hesitate. Do not trust voice alone.' } },
      ],
    },
    {
      id: 'bv-advise',
      when: { flag: 'bvc_read' },
      set: { bvc_advised: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'you', text: 'ok first: yes almost certainly a clone. do NOT send money, do NOT call that number.', at: '8:17 PM' } },
        { threadId: 'maya4ever', msg: { from: 'you', text: 'the clone was made from his videos. the live CALL is the evolution — they know people got wise to voice notes, so now it’s synchronous. it FEELS more real. it’s so smart and evil', at: '8:18 PM' } },
        { threadId: 'maya4ever', msg: { from: 'you', text: 'tell your tita: ask him something only the real renz would know. where did the family eat last christmas. the clone can’t improvise.', at: '8:18 PM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You feel it — the small clean warmth of being useful. Of being the person who can name the thing while it’s happening.' } },
        { threadId: 'council', msg: { from: 'you', text: 'live one. voice clone targeting a family i know. might need this for the next webinar 👀', at: '8:18 PM' } },
        { threadId: 'council', msg: { from: 'them', text: 'oh that’s clean. you recording the call if she picks up?', at: '8:18 PM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You open the Canva tab. Slide 12. You add a bullet: “Urgency is the weapon. Real emergencies survive a 60-second verification call.” It’s good. It’s correct. You consider moving it higher in the deck.' } },
      ],
    },
    {
      id: 'bv-real',
      when: { flag: 'bvc_advised' },
      set: { bvc_asked: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'them', text: 'she’s sending it. i don’t think we can stop her. she’s crying. i don’t know what to do', at: '8:20 PM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You stare at the message. You stare at your slide — the one that is correct, the bullet point that is true, the webinar seventy people called so informative. You don’t know what to do either.' } },
      ],
    },
    {
      id: 'bv-expert-r',
      when: { replySent: 'bv-expert' },
      set: { bvc_chose: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You tell yourself you’ve done what you can. The rest is up to them. You refresh the council. Someone has already made a threaded breakdown of voice-cloning vectors. You read it. You are still on the couch. You are still correct. The distance to two suburbs over is the same distance it always was.' } },
      ],
    },
    {
      id: 'bv-content-r',
      when: { replySent: 'bv-content' },
      set: { bvc_chose: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'This is what you’re good at — you take the thing that’s happening and turn it into a resource. You add a case study: “Real-world example: voice clone, multi-contact escalation.” The deck is better now. Clearer. More specific. You do not notice that you have also turned a family’s terror into a bullet point.' } },
      ],
    },
    {
      id: 'bv-present-r',
      when: { replySent: 'bv-present' },
      set: { bvc_chose: true },
      push: [
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You don’t have a better slide. You don’t have a forensic insight that changes the outcome. You just call her. “I’m here. What do you need.” You stop narrating the mechanism. You stop screenshotting for the council.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'You are not an expert right now. You are a voice on the line, breathing with your best friend while her family falls apart. It is the first thing you’ve done tonight that feels like enough.' } },
      ],
    },
    { id: 'bv-coda', when: { flag: 'bvc_chose' }, moment: 'vc-bea-end' },
    { id: 'bv-done', when: { flag: 'dismissed:vc-bea-end' }, set: { bvc_done: true } },
  ],
  evidenceLabels: {},
  endFlag: 'bvc_done',
}

export const VOICECLONE: AnthologyAnchor = {
  id: 'voiceclone',
  title: 'IT’S ME',
  subtitle: 'One Evening',
  blurb:
    'A Tuesday night. A voice you’ve known for thirty years says it’s in trouble and needs money now. Three phones. The same twenty-two minutes.',
  question: 'How do you verify a voice?',
  entry: 'tita',
  order: ['tita', 'maya', 'bea'],
  phones: { tita: TITA_VC, maya: MAYA_VC, bea: BEA_VC },
  timeline: {
    title: 'The evening, all at once',
    intro: 'Twenty-two minutes, across three phones — and a fourth that no one could reach.',
    events: [
      {
        time: '8:02',
        who: 'tita',
        label: 'Viber · “Renz” → Tita Merly',
        text: 'A voice note, 0:34, in his voice. There was no doubt to overcome — a voice she’s known for thirty years could only ever come from him.',
      },
      {
        time: '8:05',
        who: 'tita',
        label: 'Tita Merly → the family GC',
        text: 'She raises the alarm — but keeps his secret, “wag muna kay Mama,” which quietly isolates the one verification that would have worked: asking him, to his face.',
      },
      { time: '8:09', who: 'maya', label: 'Mama panics', text: '“BAKIT HINDI KO ALAM TO.” The GC accelerates. Fear compounds fear; every minute makes the next decision faster and worse.' },
      {
        time: '8:11',
        who: 'maya',
        label: 'Maya wakes to 18 messages',
        text: 'She knows on sight — Renz would never call Tita first; Renz is the one who says CHECK THE BALANCE. She texts the real Renz. Not delivered.',
      },
      {
        time: '8:14',
        who: 'tita',
        label: 'A live call, “his” voice',
        text: 'The clone calls. Synchronous contact feels more real than a voice note — and it talks over every question that isn’t in the script.',
      },
      {
        time: '8:16',
        who: 'bea',
        label: 'Maya consults Bea',
        text: 'Bea is right in five seconds. She has a slide about this. “Almost certainly a clone. Do not send.”',
      },
      {
        time: '8:18',
        who: 'bea',
        label: 'Bea → the council',
        text: 'She screenshots it for the group, opens the webinar deck, narrates the mechanism with clean expert satisfaction. Right, and not in the room.',
      },
      {
        time: '8:20',
        who: 'bea',
        label: 'Bea, when it turns real',
        dynamic: {
          key: 'bea_vc',
          fallback: '“She’s sending it” — and being right about the mechanism turns out not to be the same as being able to help.',
          map: {
            expert: 'She stays on the couch. She has given Maya the tools. The distance to two suburbs over is the same distance it always was.',
            content: 'She finishes the slide. The deck is better, clearer, more specific — and a family’s terror is now a bullet point in it.',
            present: 'She stops explaining and calls Maya — “I’m here, what do you need.” The first useful thing she does all night is not expertise.',
          },
        },
        text: '“She’s sending it.”',
      },
      {
        time: '8:21',
        who: 'tita',
        label: '₱18,500 sent',
        text: 'To 0915-•••-••••. Papa’s check-up money. “Renz anak, here na, please confirm okay ka na.” No one confirms.',
      },
      {
        time: '8:24',
        who: 'maya',
        label: 'The real Renz surfaces',
        text: '“naglalaro lang ako ng badminton… 14 MISSED CALLS???” The truth arrives three minutes after the money leaves.',
      },
    ],
    close: [
      'A scam built from his own voice — the family’s skeptic, the one who said check the balance, turned into the thing that couldn’t be checked.',
      'Tita heard him. Maya knew. Bea was right. None of it was fast enough.',
      'The advice that kept us safe — call them to be sure — assumed a voice could only come from a person.',
    ],
  },
  silentWitness: {
    time: '8:00–8:25 PM',
    who: 'Kuya Renz',
    label: 'The phone no one could reach',
    lines: [
      'Face-down in a badminton bag since 7 PM. Twelve metres from a man mid-rally who has no idea.',
      '14 missed calls. 22 messages. A voice that has been telling his family, in his own voice, that he is in trouble.',
      'The truth was on a screen the whole time. It was just on the wrong screen.',
    ],
  },
  reflection: {
    title: 'What you carry forward',
    cards: [
      {
        who: 'tita',
        verb: 'FORWARD',
        line: 'A voice is not a person anymore.',
        body: 'The last proof most of us still trust — “I know his voice” — is now manufacturable from a few seconds of uploaded audio. Her love and her credulity were the same reflex; this time the scam wore his throat.',
      },
      {
        who: 'maya',
        verb: 'DECIDE',
        line: 'Urgency is the weapon.',
        body: 'She was right immediately and it bought her nothing. The scam isn’t built to fool the alert — it’s built to move faster than anyone can verify. Awareness is not speed.',
      },
      {
        who: 'bea',
        verb: 'CONSULT',
        line: 'Being right is not being there.',
        body: 'She had the slide, the mechanism, the certainty. Performed as expertise instead of lived as care, media literacy became a way to leave the room while staying in the chat.',
      },
    ],
    coda:
      'We were taught to trust a voice because a voice could only come from someone we love. That is no longer true. The colder new rule: when an emergency punishes you for pausing, the pause is the point.',
  },
}
