import type { CaseOS } from '../../../engine/os/types'
import type { AnthologyAnchor } from '../types'

/* =====================================================================
   ANCHOR 4 — "FIVE WEEKS" / One Feed
   No scam, no lie. One phone, five weeks, a feed that pays Bea a
   little more each time she is a little less careful. Drift, not fork.
   ===================================================================== */

const BEA_5W: CaseOS = {
  id: '5w-bea',
  title: 'Bea',
  tagline: 'five weeks, one feed',
  blurb:
    'The expert, five weeks later. She can name every mechanism of capture while her own feed runs every one of them on her. Lesson: awareness is not immunity.',
  level: 'Anchor IV',
  minutes: '6–8 min',
  phone: {
    wallpaper: 'tweet',
    time: '9:14',
    meridiem: 'PM',
    day: 'Week 1',
    battery: 55,
    lockNote: '“epistemic cowardice is choosing civility over clarity” — found it in 2022, changed her life a little bit.',
    theme: 'bea',
  },
  contacts: [
    { id: 'janine', name: 'Janine', number: 'the council', relation: 'council' },
    { id: 'maya', name: 'Maya 💛', number: '0918-226-5590', relation: 'best friend' },
  ],
  threads: [
    { id: 'feed', service: 'threads', name: 'Threads · @beareyes.ph', hue: 202 },
    { id: 'council', service: 'messenger', name: 'the council', hue: 210, members: ['Janine', 'Ivo', 'Japs', 'Kat'] },
  ],
  opening: [{ threadId: 'feed', msg: { from: 'sys', text: 'WEEK 1 · Feb 10–16 · 1,247 followers' } }],
  photos: [],
  pages: [],
  notes: [
    { title: 'workshop deck — “Seeing Clearly”', body: 'slide 4: do not trust a source just because it confirms you · slide 12: if everyone you follow agrees with you, you’re not informed — you’re comfortable' },
  ],
  replies: [
    { id: 'w1-nuance', threadId: 'feed', label: 'Keep the caveats — nuance over performance', hideWhen: 'w1', set: { w1: 'nuance' } },
    { id: 'w1-sharp', threadId: 'feed', label: 'Cut the caveats — sharp is clarity', hideWhen: 'w1', set: { w1: 'sharp' } },
    { id: 'w2-kept', requires: 'w2_read', threadId: 'feed', label: 'Keep the howevers — being right is the job', hideWhen: 'w2', set: { w2: 'kept' } },
    { id: 'w2-cut', requires: 'w2_read', threadId: 'feed', label: 'Cut the hedges — punchy is clarity', hideWhen: 'w2', set: { w2: 'cut' } },
    { id: 'w3-satout', requires: 'w3_read', threadId: 'feed', label: 'Sit it out — he’s careful, not wrong', hideWhen: 'w3', set: { w3: 'satout' } },
    { id: 'w3-piled', requires: 'w3_read', threadId: 'feed', label: 'Quote-post the correction — clarity is the work', hideWhen: 'w3', set: { w3: 'piled' } },
    { id: 'w4-unmute', requires: 'w4_read', threadId: 'feed', label: 'Unmute a few — complication is part of the work', hideWhen: 'w4', set: { w4: 'unmuted' } },
    { id: 'w4-keep', requires: 'w4_read', threadId: 'feed', label: 'Leave them muted — clarity requires curation', hideWhen: 'w4', set: { w4: 'muted' } },
  ],
  moments: [
    {
      id: 'w1-open',
      label: 'Open the feed',
      text: [
        '9:14 PM, a Tuesday. Laptop glow to your left, council GC to your right — but you’re here, on the feed, scrolling the way you always do after a long document review. Muscle memory for something easier than thinking.',
        'You posted something this afternoon. Between meetings, the kind of thing you’d normally just think and let dissolve. You typed it instead:',
        '“‘I did my own research’ is not a synonym for media literacy. One is a process. The other is a vibes-based alibi.” — 34 likes · 6 reposts · 2 quote-posts.',
        'You refresh. 38 now. The dopamine is small and clean, like the first sip of something cold. You’re already drafting the next one in your head.',
        'The careful version is true. The sharp version is shareable.',
      ],
    },
  ],
  rules: [
    { id: 'w1-open', when: { flag: 'os_unlocked' }, moment: 'w1-open' },
    {
      id: 'w2-arrive',
      when: { flag: 'w1' },
      set: { w2_read: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', text: 'WEEK 2 · Feb 17–23 · 1,389 followers (+142)' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'Wednesday night. You’re writing a thread about deepfakes — careful, cited, meant to inform. Halfway in you notice the gap: the version in your head, and the version that would actually move.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You’ve been watching the numbers. Not obsessively. Just aware. Last week’s sharp post beat everything. This week’s careful infographic got 19 likes. The dunk on a bad take got 54.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'aside', text: 'Clarity lands harder than complication. This is not a compromise. This is just economics.' } },
      ],
    },
    {
      id: 'w2-kept-r',
      when: { replySent: 'w2-kept' },
      set: { w2_done: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'Seven posts, three caveats, two citations. Good work. The work. The council says “so thorough!” 23 likes. You tell yourself reach isn’t the metric that matters.' } },
      ],
    },
    {
      id: 'w2-cut-r',
      when: { replySent: 'w2-cut' },
      set: { w2_done: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You delete posts 5, 6, and 7. No “however.” Just the thing you believe, without the apology for believing it. 140 likes. Someone screenshots it: “why is this so hard to understand.” You don’t correct them. You repost.' } },
      ],
    },
    {
      id: 'w3-arrive',
      when: { flag: 'w2_done' },
      set: { w3_read: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', text: 'WEEK 3 · Feb 24 – Mar 2 · 1,688 followers (+299) · engagement +38%' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'Sunday. The council GC links a thread by a researcher you used to follow — about voice-cloning safeguards. It’s fine. Competent. A little hedged. A little soft.' } },
        { threadId: 'council', msg: { from: 'them', text: 'interesting but idk, feels like he’s bothsidesing a threat-model issue?', at: '2:02 PM' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'He isn’t wrong. But he isn’t sharp — he’s doing the sound-balanced-instead-of-clear move. You know it. You used to make it.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'aside', text: 'This is accountability, not cruelty. If you don’t name it, who will?' } },
      ],
    },
    {
      id: 'w3-satout-r',
      when: { replySent: 'w3-satout' },
      set: { w3_done: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You close the compose window. You heart Janine’s comment but add nothing. The thread scrolls past. Your follower count stays flat. You tell yourself this is fine.' } },
      ],
    },
    {
      id: 'w3-piled-r',
      when: { replySent: 'w3-piled' },
      set: { w3_done: true },
      push: [
        { threadId: 'feed', msg: { from: 'you', text: 'this is what epistemic cowardice looks like: pretending “balance” is the same as rigor. naming a threat is not extremism.', at: '2:14 PM' } },
        { threadId: 'feed', msg: { from: 'sys', text: '280 likes · the council: 🔥 “SAY IT” · +89 followers' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'The researcher doesn’t reply. You tell yourself he’ll be fine. This is what accountability looks like.' } },
      ],
    },
    {
      id: 'w4-arrive',
      when: { flag: 'w3_done' },
      set: { w4_read: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', text: 'WEEK 4 · Mar 3–9 · 2,104 followers (+416) · muted: 9' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'Thursday. A stranger replies to an old thread with a good-faith complication — a “well, actually, in some cultural contexts” that is true, and beside the point. You read it twice. Not wrong. Not helpful. You hover over their username. You click mute.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'aside', text: 'You’re not silencing them. They can still talk. You’re just making space for signal over noise.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You do it again the next day. And the day after. The ones who complicate without adding. Your feed is cleaner now. Sharper. Everyone visible seems to agree with you.' } },
      ],
    },
    {
      id: 'w4-unmute-r',
      when: { replySent: 'w4-unmute' },
      set: { w4_done: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You unmute three. One is annoying. One makes you rethink yesterday’s post. You tell yourself this is what intellectual honesty looks like: staying in the room with the complication.' } },
      ],
    },
    {
      id: 'w4-keep-r',
      when: { replySent: 'w4-keep' },
      set: { w4_done: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You close the list. They can still talk; you’re just not listening. This is not an echo chamber. This is curation. The signal is louder now.' } },
      ],
    },
    {
      id: 'w5-arrive',
      when: { flag: 'w4_done' },
      set: { w5_done: true },
      push: [
        { threadId: 'feed', msg: { from: 'sys', text: 'WEEK 5 · Mar 10–16 · 2,547 followers (+443) · engagement +52% vs Week 1' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'Saturday, 2 PM. The Zoom green room. Seventy-three people registered. The deck on your screen reads: “Seeing Clearly: A Media Literacy Workshop.”' } },
        { threadId: 'feed', msg: { from: 'sys', text: 'Zoom · You’re live — 73 attendees' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You know the beats. Slide 4 is your favorite: “Do not trust a source just because it confirms you.” You believe this. You have always believed this. You open: “Media literacy isn’t just spotting lies. It’s staying curious even when you think you already know.” Seventy-three people nod. The chat fills with yes, thank you, this is so needed.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'aside', text: 'Your phone is face-down on the desk. Your last post has 140 likes. Your wallpaper still says epistemic cowardice is choosing civility over clarity. You spent five weeks cutting the hedges, muting the complications, mistaking the quiet for consensus, performing certainty because certainty performed — and you called all of it clarity. You called it the work.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'Slide 12: “If everyone you follow agrees with you, you’re not informed — you’re comfortable.” The chat says PREACH. Seventy-three people take notes.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'narr', text: 'You taught them to see clearly. You do not see yourself.' } },
        { threadId: 'feed', msg: { from: 'sys', kind: 'aside', text: 'The recognition is available. You do not have to take it.' } },
      ],
    },
  ],
  evidenceLabels: {},
  endFlag: 'w5_done',
}

export const FIVEWEEKS: AnthologyAnchor = {
  id: 'fiveweeks',
  title: 'FIVE WEEKS',
  subtitle: 'One Feed',
  blurb:
    'No scam this time. No lie. One phone, five weeks, and a feed that pays you a little more each time you’re a little less careful — until less careful feels like clarity.',
  question: 'Can you feel yourself changing?',
  entry: 'bea',
  order: ['bea'],
  phones: { bea: BEA_5W },
  timeline: {
    title: 'What five weeks did',
    intro: 'No single week was a lie. Here is the sum.',
    events: [
      {
        time: 'Wk 1',
        who: 'bea',
        label: 'The hit',
        text: 'A sharp post outperformed everything careful you’d written. The first small reward — and the first lesson the feed taught you about yourself.',
      },
      {
        time: 'Wk 2',
        who: 'bea',
        label: 'The trim',
        text: 'The hedges started coming off — not because nuance stopped being true, but because it stopped performing.',
      },
      {
        time: 'Wk 3',
        who: 'bea',
        label: 'The pile-on',
        text: 'A dogpile had the numbers, so you joined it. It felt like accountability. It paid like applause.',
      },
      {
        time: 'Wk 4',
        who: 'bea',
        label: 'The quiet',
        dynamic: {
          key: 'w4',
          fallback: 'You curated your feed until everyone left in it agreed with you, and called the quiet consensus.',
          map: {
            unmuted: 'You opened the muted list and let the complications back in — a small refusal. The feed noticed, and paid you a little less for it.',
            muted: 'You muted the ones who complicated things until everyone left was nodding, and mistook the silence for being right.',
          },
        },
        text: 'You curated the feed until it agreed with you.',
      },
      {
        time: 'Wk 5',
        who: 'bea',
        label: 'The webinar',
        text: 'You taught a room to distrust the sources that confirm them — and could not see that you’d spent five weeks trusting yours.',
      },
    ],
    close: [
      'No step was a lie. The sum is a stranger.',
      'The feed never argued with you. It paid you — a little — each time you were a little less careful.',
      'Until less careful felt like clarity, and clarity felt like you.',
    ],
  },
  reflection: {
    title: 'What you carry forward',
    cards: [
      {
        who: 'bea',
        verb: 'SCROLL',
        line: 'Awareness is not immunity.',
        body: 'She could name every mechanism of capture while being captured by it. The feed never lied — it rewarded her, a little, each time she chose the sharp version over the true one, until the sharp version felt like truth. Naming the trap is not the same as standing outside it.',
      },
    ],
    coda:
      'Drift has no moment you can point to — that is what makes it drift. The other stories happen TO people, in an afternoon. This one happens AS you, over weeks. The only proof is that the person at the end would not recognise the person at the start.',
  },
}
