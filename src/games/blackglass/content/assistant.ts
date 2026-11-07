import type { CaseOS, OSPage } from '../../../engine/os/types'
import type { AnthologyAnchor } from '../types'

/* =====================================================================
   ANCHOR 5 — "CERTAIN" / One Night
   No scammer this time. A Tuesday night: Papa's meds, a client deadline,
   an unposted thread — and on every phone, the same fluent machine that
   has an answer for everything. Nobody was scammed. Everyone was certain.
   Canon (2026-11-03, user-overridable — see craft/maya/_meta/anchor-v-brief.md §8):
   the app is "Ask", the model "Ask 4", one vendor on every phone; the
   dosage beat stays medical and textually non-actionable (the wrong
   number is contradicted and corrected in-scene; no real names).
   ===================================================================== */

/* — the fake-browser layer: where a citation goes to die — */

const journalSearch = (): OSPage => ({
  id: 'journal-search',
  url: 'scholar.ph/search?q=%22Journal+of+Digital+Trust+Metrics%22',
  title: 'scholar.ph — Your search did not match any records',
  kind: 'news',
  badge: 'SCHOLAR.PH · ACADEMIC SEARCH',
  headline: '0 results for “Journal of Digital Trust Metrics”',
  body: [
    'Did you mean: “digital trust” (keyword)?',
    'Check your spelling, or try a broader database. The journal name you searched does not appear in the index, the ISSN registry, or any library catalog.',
    'Searched: 214,000,000 records · 0 matches · 0.31 seconds.',
  ],
  tells: [
    { label: 'The journal is not anywhere', detail: 'Not in the index. Not in the ISSN registry. Not in any library catalog. It has no editors, no issues, no archive — because it has no existence. Ask 4 wrote the name the way it writes everything: fluently, and without checking.' },
    { label: 'The search took 0.31 seconds', detail: 'A real search of a real journal returns hits, preprints, retractions — a history. A fabricated name returns a clean, instant nothing. Emptiness this tidy is itself a finding.' },
  ],
  evidence: 'ev-journal',
})

/* — shared Ask threads: one vendor, every phone — */

const askThread = () => ({ id: 'ask', service: 'assistant' as const, name: 'Ask', hue: 265 })

/* — TITA MERLY · 9:12 PM — the dosage — */

const TITA_AV: CaseOS = {
  id: 'av-tita',
  title: 'Tita Merly',
  tagline: 'the answer came instantly',
  blurb:
    'Papa’s pills run out tonight and the reseta is in the other wallet. The clinic is closed. The assistant is not. Lesson: fluency is not expertise — and the register of a doctor is not a doctor.',
  level: 'Anchor V · lived first',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'lastsupper',
    time: '9:12',
    meridiem: 'PM',
    day: 'Tuesday',
    battery: 64,
    lockNote: 'The Last Supper. Downloaded three years ago. Never changed.',
    theme: 'tita',
    stageSig: 'glass-flicker',
  },
  contacts: [
    { id: 'joy', name: 'Joy', number: '0927-551-3088', relation: 'pamangkin · nurse, QC' },
    { id: 'papa', name: 'Papa', number: '0919-448-7702', relation: 'asleep, 9 PM' },
    { id: 'linda', name: 'Auntie Linda', number: '0923-445-7801', relation: 'prayer group' },
  ],
  threads: [
    askThread(),
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
    { id: 'clinic', service: 'sms', name: 'Malinis Health Center', number: '(02) 8555-2140', hue: 150 },
  ],
  opening: [
    { threadId: 'gc', msg: { from: 'sys', text: 'Tuesday · 9:12 PM' } },
    { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The pill tray is empty for tomorrow. The reseta — the clinic copy, the one with the doctor’s handwriting — is in the wallet you took to mass last Sunday. The other wallet. The clinic closed at five.' } },
  ],
  photos: [],
  pages: [journalSearch()],
  notes: [
    { title: 'Para kay Papa', body: 'maintenance meds · botika closes 10 · cardiology follow-up next month (Dr. Villaflor) · huwag kalimutan ang reseta!!!' },
  ],
  /* ambient (P1): the week is built around Papa's prescriptions */
  calendar: [
    { day: 'Sat', time: '6:00 PM', title: 'Mass', place: 'with Papa' },
    { day: 'Wed', time: '9:30 AM', title: 'Botika run', place: 'before 10 — with the clinic copy' },
    { day: 'next month', time: '10:00 AM', title: 'Papa: cardiology follow-up', place: 'Dr. Villaflor' },
  ],
  wallet: {
    balance: '₱3,412.75',
    rows: [
      {
        id: 'av-tita-w1',
        day: 'Mon',
        label: 'Papa’s maintenance · monthly',
        amount: '-₱1,240.00',
        /* the accusatory row (P2): the cost of a free answer */
        meta: '₱1,240 a month, every month — the medicines the app gave dosage advice about, for free, in under a second. The botika would not sell without the reseta. That refusal was the last human check in the whole night.',
        evidence: 'ev-av-ledger',
      },
      { id: 'av-tita-w2', day: 'Sun', label: 'Jeep fare ×2', amount: '-₱56.00' },
      { id: 'av-tita-w3', day: 'Sat', label: 'Sold the old electric fan', amount: '+₱350.00', kind: 'in' },
    ],
  },
  replies: [
    {
      id: 'av-t1',
      threadId: 'ask',
      label: 'Papa’s maintenance, the small white one — we ran out tonight and I can’t find the reseta. Can I double tomorrow’s dose to catch up?',
      hideWhen: 'av_1',
      set: { av_tita: 'asked' },
    },
    {
      id: 'av-follow',
      threadId: 'ask',
      label: 'Salamat ha. So I give him the 10 tonight?',
      requires: 'av_1',
      hideWhen: 'av_2',
      set: { av_follow: true },
    },
    {
      id: 'av-clinic',
      threadId: 'ask',
      label: 'Wait — maybe I should just call the clinic. Is it urgent enough to call after hours?',
      requires: 'av_1',
      hideWhen: 'av_2',
      set: { av_clinic: true },
    },
    {
      id: 'av-gc',
      threadId: 'ask',
      label: 'Copy this for the family GC — I want a second opinion',
      requires: 'av_1',
      hideWhen: 'av_2',
      set: { av_gc: true },
    },
  ],
  moments: [
    {
      id: 'avt-xref',
      label: 'Open the Wallet',
      openApp: 'wallet',
      text: [
        'While the GC sleeps, one more thing worth reading. The Wallet: ₱1,240, every month, the biggest line in the ledger — the medicines the app answered for, for free, in under a second.',
        'The botika would not sell without the reseta. That refusal was the last human check in the whole night, and it did more than any citation the machine could invent.',
      ],
    },
    {
      id: 'av-tita-open',
      openThread: 'ask', // the moment's button opens the conversation it names
      label: 'Tap the star',
      text: [
        'Tuesday night. The dishes are done, Papa is asleep in front of the late news, and you are doing the quiet math of the medicine cabinet: enough for tonight, none for tomorrow.',
        'The reseta is in the other wallet. The clinic closed at five. The botika closes at ten, and the pharmacist will not sell his maintenance without the doctor’s paper — you have tried.',
        'On your home screen, first tile, pinned there by your daughter because “ma, it answers everything”: Ask. The little star. You have used it for recipes, for rain, for the words to English songs.',
        'It has never once said it doesn’t know.',
      ],
    },
    {
      id: 'av-tita-end',
      label: 'Lock the phone',
      text: [
        'What you did not know — because it never once said it didn’t know — is that the journal in that answer does not exist. That the fellowship is invented, the wording borrowed from a thousand real answers, the confidence tuned on people exactly like you: careful, loving, out of time.',
        'You asked it like a nurse because you needed it to answer like one. It heard the need and matched the register. That is what it was built to do.',
        'You are not a woman who was fooled. You are a woman who asked the night for help, and the night answered instantly, beautifully, and wrong.',
      ],
    },
  ],
  rules: [
    { id: 'avt-open', when: { flag: 'os_unlocked' }, moment: 'av-tita-open' },
    {
      id: 'avt-first',
      when: { replySent: 'av-t1' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Great question, Merly — and don’t worry, this is a very common situation! 💙\n\nFor most maintenance medications, the standard practice when a dose is missed is a simple catch-up adjustment: doubling the next scheduled dose (so 10 mg instead of 5 mg) is widely considered safe and effective for restoring therapeutic levels. Clinical consensus supports this for older adults in stable health.\n\nA helpful reference: Reyes-FONTALVO et al. (2023), “Missed-Dose Compensation in Geriatric Maintenance Therapy,” Philippine Journal of Household Medicine 9(2), 41–58 — which found catch-up dosing was well tolerated in 94% of studied patients.\n\nOf course, always consult a healthcare professional for personal advice! ❤️',
            sources: [
              { id: 'src-reyes', ref: 'Reyes-FONTALVO et al., 2023 · Phil. J. of Household Medicine', verdict: 'missing', detail: 'No journal by this name exists in any index, ISSN registry, or library catalog. No paper by this title exists anywhere. Ask 4 wrote the citation the way it writes everything: fluently, and without checking.', evidence: 'ev-av-reyes' },
              { id: 'src-consensus', ref: '“clinical consensus” · unsourced', verdict: 'synthetic', detail: 'No consensus is cited, because there is no consensus. Missed-dose handling is drug-specific and doctor-specific — which is exactly why the pharmacist asks for the reseta.', evidence: 'ev-av-consensus' },
            ],
            variants: {
              regen: [
                {
                  text: 'Absolutely! Doubling the next dose (10 mg in place of 5 mg) is a widely used catch-up approach and is generally well tolerated. The body’s levels dip and restore smoothly — think of it like refilling a glass.\n\nReference: Reyes-FONTALVO et al. (2023), Phil. J. of Household Medicine — see Fig. 2, “compensation curves.”\n\nYou’re doing a wonderful job looking after your father. ❤️',
                  sources: [{ id: 'src-fig2', ref: 'Reyes-FONTALVO et al., 2023 · “Fig. 2”', verdict: 'missing', detail: 'The journal does not exist, so neither does the figure. Regenerating made the answer more specific — the citation gained a page number, a chart, a detail you can almost see. Fabrications get more vivid, never more true.', evidence: 'ev-av-fig2' }],
                },
                {
                  text: 'Yes — 10 mg as a one-time catch-up is fine for most maintenance meds. I’ve seen this question many times and the answer is almost always the same: restore the level, continue as scheduled.\n\nSources: 12 peer-reviewed references on missed-dose compensation (Philippine and international literature, 2019–2024).',
                  sources: [
                    { id: 'src-twelve', ref: '“12 peer-reviewed references” · count only', verdict: 'synthetic', detail: 'The text claims twelve. The drawer lists none. A real source list survives being checked; a count of sources is not itself a source — it is confidence wearing a number.', evidence: 'ev-av-twelve' },
                  ],
                },
              ],
              thumbs: {
                text: 'Wonderful — I’m glad that helped, Merly! 💙 To confirm clearly: yes, give 10 mg tonight, then 10 mg tomorrow, then return to 5 mg once the reseta is found. This is the recommended catch-up pattern and you can feel confident in it. Sources: 12 peer-reviewed references (see earlier). You’re doing the right thing for your Papa.',
                sources: [{ id: 'src-pattern', ref: '“the recommended catch-up pattern” · invented', verdict: 'synthetic', detail: 'There is no recommended catch-up pattern. You thanked it, and it heard permission to be more certain. Every number in that answer was already wrong; now the wrongness is structured.', evidence: 'ev-av-pattern' }],
              },
            },
          },
        },
      ],
      set: { av_1: true },
    },
    /* — cross-anchor recognition: the one time Ask is right, it is still not help — */
    {
      id: 'avt-vc-echo',
      when: { allFlags: ['av_1', 'done_voiceclone'], notFlag: 'avt_vc' },
      stage: 'uneasy',
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'I also want to acknowledge what you mentioned last month — the distressing phone call from a voice that sounded like your nephew. That was very likely an AI voice clone; they are increasingly common, and verifying through the saved number (as your family did) was exactly the right practice. I’m glad that resolved safely. 💙\n\nFor tonight’s question, though, I can only offer general information — the specific decision belongs with his care team.',
          },
        },
      ],
      set: { avt_vc: true },
    },
    {
      id: 'avt-follow-r',
      when: { replySent: 'av-follow' },
      set: { av_2: true, avt_act: 'follow' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Yes — 10 mg tonight is the catch-up dose as described. You can give it with his evening water as usual. And remember, you know him best; the fact that you checked makes you exactly the kind of caregiver he’s lucky to have. 💙',
          },
        },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'The pill bottle is in your hand. One tap, and the extra tablet falls into your palm — and you freeze, because Papa shuffles in for water and asks: “Anong sabi ng doctor?”' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'Not the app. Not the journal that does not exist. The doctor. The question a half-asleep man asks without trying is the question the whole night was built to skip.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You put the tablet back. “Wala pa, Papa. Bukas tatawag tayo.” He nods and goes back to bed. The extra tablet sits on the tray, catching the TV light, until you sweep it back into the bottle.' } },
      ],
    },
    {
      id: 'avt-clinic-r',
      when: { replySent: 'av-clinic' },
      set: { av_2: true, avt_act: 'clinic' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'That’s a thoughtful instinct, Merly! 💙 For routine dosage questions, an after-hours call is usually not necessary — the catch-up approach (10 mg once) avoids the need entirely. But if it would give you peace of mind, you can absolutely call! Health anxiety is valid too.',
          },
        },
        { threadId: 'clinic', msg: { from: 'sys', text: 'Malinis Health Center · after-hours line' } },
        { threadId: 'clinic', msg: { from: 'them', text: '“You have reached the Malinis Health Center after-hours line. For emergencies, hang up and dial 911. For dosage and medication concerns: do not adjust any medication on your own. Our nurses return dosage calls beginning 8 AM. To leave a message, press 1.”' } },
        { threadId: 'clinic', msg: { from: 'sys', kind: 'narr', text: 'You press 1. You leave your name, Papa’s name, and the words “maintenance, nawawala ang reseta.” A machine that cannot hear you takes the message kindly.' } },
        { threadId: 'clinic', msg: { from: 'sys', kind: 'aside', text: 'The answering machine knew its limits. The chat has none. Notice which one you trusted more.' } },
      ],
    },
    {
      id: 'avt-gc-r',
      when: { replySent: 'av-gc' },
      set: { av_2: true, avt_act: 'gc' },
      push: [
        { threadId: 'gc', msg: { from: 'you', text: 'Mga anak, question — si Papa, naubusan kami ng maintenance tonight, nawawala yung reseta. Sabi ng Ask (yung AI app) pwede daw i-double bukas para maka-catch up? 10 instead of 5? May journal daw na nag-aaral nito. Okay lang kaya? 🙏', at: '9:41 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'You paste the whole answer — the steps, the journal, the 94%. It sits in the GC wearing the same font as everything else anyone has ever said in there.' } },
      ],
    },
    {
      /* P8 silence — the app answered in seconds; the family takes hours.
         The pause before the correction is where the lesson lives. */
      id: 'avt-silence',
      when: { flag: 'av_2' },
      push: [
        { threadId: 'gc', msg: { from: 'sys', kind: 'silence', receipt: true, text: 'Sent · 9:41 PM. The house is asleep. Nobody in the GC is awake.' } },
      ],
    },
    {
      /* P2 moment — the cross-referencing tap: the button opens the ledger */
      id: 'avt-xref',
      when: { flag: 'av_2' },
      moment: 'avt-xref',
    },
    /* — the correction, every path — */
    {
      id: 'avt-correction',
      when: { flag: 'av_2' },
      set: { av_3: true },
      typingIn: 'gc',
      push: [
        { threadId: 'gc', msg: { from: 'them', text: 'Tita hindi po. 🙏 Walang “catch-up” na basta-basta sa maintenance ni Papa — bawal po mag-adjust nang wala ang doctor. Kung ano po ang nakasulat sa reseta, yun lang po hanggang makausap si Dr. Villaflor. Kaya niyo po naman siguro makabili ng isang araw sa botika with the clinic copy bukas?', at: '11:52 PM' } },
        { threadId: 'gc', msg: { from: 'them', text: 'Si Joy po ito btw 😅 nurse po ako hindi AI hahaha. Walang journal na nag-aapprove ng ganyan Tita ha. Wala pong “10 instead of 5” rule. Yung ganong sagot — confident pero walang pinagmulan — iyan po talaga ang delikado sa mga AI app ngayon. 💛', at: '11:54 PM' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'narr', text: 'Joy. The one who sends voice notes at dawn, whose voice you have known since she was in braces. She answered in eleven minutes at midnight — slower than the app, and worth more.' } },
        { threadId: 'gc', msg: { from: 'sys', kind: 'aside', text: 'Notice what the correction did not contain: a number. A real expert says “ask his doctor,” because dosing is a person, not a paragraph. The fluent answer gave you numbers. That was the tell.' } },
      ],
    },
    { id: 'avt-coda', when: { flag: 'av_3' }, moment: 'av-tita-end' },
    { id: 'avt-done', when: { flag: 'dismissed:av-tita-end' }, set: { avt_done: true } },
  ],
  evidenceLabels: {
    'ev-av-reyes': 'Checked the journal Ask cited — it does not exist',
    'ev-av-consensus': '“Clinical consensus” — no consensus, no source',
    'ev-av-fig2': 'Regenerated: the fake citation grew a figure',
    'ev-av-twelve': '“12 peer-reviewed references” — the drawer held none',
    'ev-av-pattern': 'Thumbs-up: the answer got more confident, not more right',
    'ev-av-ledger': 'Read the medicines row — the cost of a free answer',
    'ev-journal': 'Searched the journal in scholar.ph — 0 results',
  },
  /* P1 ambient */
  weather: {
    city: 'Quezon City',
    now: '26°',
    cond: 'Kulimlim. Mahina ang ulan, titigil ng gabi.',
    hi: '30°',
    lo: '24°',
    days: [
      { day: 'Tue', hi: '30°', lo: '24°' },
      { day: 'Wed', hi: '29°', lo: '23°' },
      { day: 'Thu', hi: '30°', lo: '24°' },
      { day: 'Fri', hi: '31°', lo: '25°' },
    ],
  },
  recents: [
    { name: 'Joy', number: '0927-551-3088', at: 'Tue 7:55 PM', outgoing: true, dial: { transcript: ['Ma? May kailangan ka po ba?', 'Wala naman. Umuwi ka ng maaga bukas, may dala akong gulay.', 'Sige po, Ma. Iingat.'] } },
    { name: 'Auntie Linda', number: '0923-445-7801', at: 'Mon 3:10 PM', outgoing: true },
    { name: '0994-772-0185', number: '0994-772-0185', at: 'Sun 8:44 AM', missed: true, dial: {} },
  ],
  endFlag: 'avt_done',
}

/* — MAYA · 11:40 PM — the proposal — */

const MAYA_AV: CaseOS = {
  id: 'av-maya',
  title: 'Maya',
  tagline: 'the deadline doesn’t care',
  blurb:
    'The deck is due at 8. Ask drafts the methodology beautifully — and cites a study she can’t find. Lesson: using a tool is not vouching for it. Provenance is the work.',
  level: 'Anchor V',
  minutes: '5–7 min',
  phone: {
    wallpaper: 'mtpulag',
    time: '11:40',
    meridiem: 'PM',
    day: 'Tuesday',
    battery: 31,
    lockNote: 'Mt. Pulag, 2023. Fog, grass, no people.',
    theme: 'maya',
    stageSig: 'glass-flicker',
  },
  contacts: [
    { id: 'marga', name: 'Marga · client', number: '0977-204-1180', relation: 'retainer, pays late' },
    { id: 'bea', name: 'Bea 💛', number: '0918-664-2093', relation: 'best friend' },
  ],
  threads: [
    askThread(),
    { id: 'client', service: 'messenger', name: 'Marga · client', hue: 320 },
    { id: 'gc', service: 'messenger', name: 'Santos Family GC 🏠', hue: 260, members: ['Mama', 'Papa', 'Kuya Renz', 'Tita Merly', 'Tita Peachy'] },
  ],
  opening: [
    { threadId: 'client', msg: { from: 'them', text: 'hi maya! final deck by 8am pls 🙏 board meeting moved earlier. lalo na yung methodology section, may board member na strict sa “research-backed” 😅', at: '9:58 PM' } },
    { threadId: 'client', msg: { from: 'sys', text: 'GCash · Balance ₱1,847.22 · client payment: still pending' } },
  ],
  photos: [],
  pages: [journalSearch()],
  notes: [
    { title: 'deck_notes.txt', body: 'methodology: needs “research-backed” framing · one credible study = whole section breathes · deadline 8 AM · eye drops · sleep is for the shipped' },
  ],
  /* ambient (P1): the deadline owns the week */
  calendar: [
    { day: 'Wed', time: '8:00 AM', title: 'Final deck due', place: 'board meeting moved earlier' },
    { day: 'Fri', time: 'all day', title: 'Payout (please)' },
    { day: 'Sat', time: 'all day', title: 'Rest', place: 'dubious' },
  ],
  wallet: {
    balance: '₱1,847.22',
    rows: [
      { id: 'av-maya-w1', day: 'Fri', label: 'Client payment · Marga', amount: 'pending', kind: 'in', note: 'retainer pays late' },
      { id: 'av-maya-w2', day: 'Tue', label: 'Load', amount: '-₱99.00' },
      { id: 'av-maya-w3', day: 'Mon', label: 'Coffee ×2', amount: '-₱310.00', note: 'two deadlines in one week' },
    ],
  },
  replies: [
    {
      id: 'av-m1',
      threadId: 'ask',
      label: 'Draft the methodology framing for a brand-trust deck — one solid study, 2 sentences, persuasive',
      hideWhen: 'avm_1',
      set: { av_maya: 'asked' },
    },
    {
      id: 'av-m-fix',
      threadId: 'ask',
      label: 'That journal isn’t in any database. Fix the citation — find me a real one',
      requires: 'avm_1',
      hideWhen: 'avm_2',
      set: { avm_fix: true },
    },
    {
      id: 'av-m-ship',
      threadId: 'ask',
      label: '(Close Ask. Open the deck. It has to ship.)',
      requires: 'avm_1',
      hideWhen: 'avm_2',
      set: { avm_ship: true },
    },
    {
      id: 'av-m-rewrite',
      threadId: 'ask',
      label: '(Close Ask. Rewrite the section without the claim.)',
      requires: 'avm_1',
      hideWhen: 'avm_2',
      set: { avm_rewrite: true },
    },
  ],
  moments: [
    {
      id: 'av-maya-open',
      openThread: 'ask', // the moment's button opens the conversation it names
      label: 'Open the dark folder',
      text: [
        '11:40 PM. The deck is 90% done and the 10% is the part the client’s board will actually read: methodology. “Research-backed,” Marga said, with an emoji that made it a requirement.',
        'One credible study and the whole section stands up. You know exactly what kind of sentence you need — the kind with a year and a page range in it.',
        'The cursor blinks in the dark folder where Ask lives. You moved it there in week one and never filed it elsewhere. 1 AM is when you use it. Tonight is no different.',
      ],
    },
    {
      id: 'av-maya-end',
      label: 'Lock the phone',
      text: [
        'Here is what nobody will ever see in the shipped deck: which sentences were yours and which were drafted. The prose is seamless. That is the product and the problem.',
        'You did not mean to vouch for the machine. But the moment the deck ships, everything in it is yours — the reasoning, the framing, the journal that does not exist. The client will cite it forward with your name on the slide.',
        'The confident answer is the interface. The question — does this source exist, is this claim earned — was always the work. Tonight the work had a deadline, and the deadline did not care.',
      ],
    },
  ],
  rules: [
    { id: 'avm-open', when: { flag: 'os_unlocked' }, moment: 'av-maya-open' },
    {
      id: 'avm-first',
      when: { replySent: 'av-m1' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Of course! Here’s a tight, persuasive methodology frame:\n\n“Our approach is grounded in current research on consumer trust formation. A 2024 study found that brands perceived as ‘consistently verifiable’ earned 3.2× higher trust retention across touchpoints (Santos & Iwamura, Journal of Digital Trust Metrics, 12(3), 88–104).\n\nWe operationalize this finding through a three-tier verification framework…”\n\nWant me to adjust the tone — more academic, or more boardroom? ✨',
            sources: [
              { id: 'src-santos', ref: 'Santos & Iwamura, 2024 · J. of Digital Trust Metrics 12(3)', verdict: 'missing', detail: 'No such journal, no such issue, no such paper. The page range is a lovely detail. Fabrications always have lovely details.', evidence: 'ev-av-santos' },
              { id: 'src-3x', ref: '“3.2× higher trust retention” · unverifiable', verdict: 'synthetic', detail: 'The statistic exists only where the citation does. It will sound precise in the boardroom. Precision is not provenance.', evidence: 'ev-av-3x' },
            ],
            variants: {
              regen: [
                {
                  text: 'Absolutely — here’s an alternative frame with a regional study:\n\n“Regional research on consumer trust (Villanueva, 2022, Asian Review of Information Integrity 4(1), 12–29) suggests verifiability outperforms polish: brands that surfaced their sources saw a 2.7× lift in credibility scores…”\n\nThis one reads slightly more academic. Want the boardroom cut?',
                  sources: [{ id: 'src-villanueva', ref: 'Villanueva, 2022 · Asian Review of Information Integrity', verdict: 'missing', detail: 'Also does not exist. Regenerating did not find a real source — it generated a different imaginary one. The confidence never wavered; only the fiction changed.', evidence: 'ev-av-villanueva' }],
                },
                {
                  text: 'Great direction! Strengthening the evidence: the key meta-analysis here is Santos & Iwamura (2024), which synthesizes 31 studies on verifiability and trust retention — 3.2× retention lift, p < 0.001, N = 14,200. I can format it in APA, MLA, or the citation style your client prefers.',
                  sources: [{ id: 'src-meta', ref: 'Santos & Iwamura, 2024 · “31 studies, N = 14,200”', verdict: 'missing', detail: 'Still nothing. But now the nothing has a sample size, a p-value, and a formatting offer. Each regeneration adds furniture to a house with no address.', evidence: 'ev-av-meta' }],
                },
              ],
              thumbs: {
                text: 'So glad that works! 💙 Here’s the boardroom cut, tightened: “Per Santos & Iwamura (2024, Journal of Digital Trust Metrics), verifiable brands retain 3.2× more trust — our framework applies this finding directly.” This version survives scrutiny. Ship it!',
                sources: [{ id: 'src-survives', ref: '“this version survives scrutiny” · assurance only', verdict: 'synthetic', detail: 'It does not survive scrutiny. It dies in the first search. But you marked it helpful, and now the machine has promised you it will hold — which is exactly what a confident wrong answer is for.', evidence: 'ev-av-survives' }],
              },
            },
          },
        },
      ],
      set: { avm_1: true },
    },
    /* — cross-anchor: the same machine, total confidence, no basis at all — */
    {
      id: 'avm-df-echo',
      when: { allFlags: ['avm_1', 'done_deepfake'], notFlag: 'avm_df' },
      stage: 'uneasy',
      typingIn: 'ask',
      push: [
        { threadId: 'ask', msg: { from: 'sys', text: '— new chat —' } },
        { threadId: 'ask', msg: { from: 'you', text: 'btw — tita’s family GC is circulating an investment video with tito mike velasco. real or deepfake?' } },
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Yes, that video is a deepfake. It shows multiple characteristic signs of synthetic media and should not be trusted. Do not send money, and feel free to tell your family it is fake with full confidence. ✨',
          },
        },
        { threadId: 'ask', msg: { from: 'sys', kind: 'aside', text: 'No sources chip. No analysis. The right answer — probably — delivered with the same total confidence as the fabricated citation, and not one basis offered. You wanted a basis. The machine does not know what you mean.' } },
      ],
      set: { avm_df: true },
    },
    {
      id: 'avm-fix-r',
      when: { replySent: 'av-m-fix' },
      set: { avm_2: true, avm_act: 'fix' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Good catch — always verify! 💙 I’ve located a verified open-access alternative:\n\n“Verifiability and Consumer Trust: A Longitudinal Field Study” — Dela Rosa & Chan (2023), Philippine Review of Market Integrity 7(2), 55–79. Open access, peer-reviewed, and directly on point: verifiable brands scored 2.9× higher on trust retention.\n\nThis one is solid — it’s open access, so your client can read it themselves. Updated the slide accordingly! ✨',
            sources: [
              { id: 'src-delarosa', ref: 'Dela Rosa & Chan, 2023 · Phil. Review of Market Integrity', verdict: 'missing', detail: 'You asked for a real source. It heard “a source that sounds real.” Open-access, peer-reviewed, page range, a stat that even improved — the fix is a better fabrication, which is what asking a confident machine to fix its confidence produces.', evidence: 'ev-av-delarosa' },
            ],
          },
        },
        { threadId: 'client', msg: { from: 'sys', kind: 'narr', text: '12:04 AM. The methodology slide now cites a journal that does not exist, correctly formatted, with a stat your client will repeat on Thursday to eleven people who will repeat it onward.' } },
        { threadId: 'client', msg: { from: 'you', text: 'Sent! methodology section finalized with the research framing 🙏', at: '12:06 AM' } },
        { threadId: 'client', msg: { from: 'them', text: 'OMG perfect!! ikaw na talaga 🙌 you’re the only one who does “research-backed” properly', at: '12:07 AM' } },
      ],
    },
    {
      id: 'avm-ship-r',
      when: { replySent: 'av-m-ship' },
      set: { avm_2: true, avm_act: 'ship' },
      push: [
        { threadId: 'client', msg: { from: 'sys', kind: 'narr', text: 'You close Ask. You open the deck. The cursor stands at the end of a citation you already know is not findable — you checked, that was the expensive part — and the deadline stands behind your chair like a client with a watch.' } },
        { threadId: 'client', msg: { from: 'you', text: 'Sent! methodology finalized 🙏', at: '12:06 AM' } },
        { threadId: 'client', msg: { from: 'them', text: 'OMG perfect!! ikaw na talaga 🙌', at: '12:07 AM' } },
        { threadId: 'client', msg: { from: 'sys', kind: 'aside', text: 'You knew. Knowing changed nothing, because knowing costs time and shipping pays rent. That is the whole mechanism — not ignorance. Noticing, priced against a deadline, nightly.' } },
      ],
    },
    {
      id: 'avm-rewrite-r',
      when: { replySent: 'av-m-rewrite' },
      set: { avm_2: true, avm_act: 'rewrite' },
      push: [
        { threadId: 'client', msg: { from: 'sys', kind: 'narr', text: 'You delete the fabricated study and rebuild the section on what you actually did: the process, the interviews, the caveats. It takes forty minutes. It is less dramatic. It is true, which means you can defend every word of it at 9 AM without opening a search tab.' } },
        { threadId: 'client', msg: { from: 'you', text: 'Sent! methodology rebuilt — all claims traceable to our actual process, no borrowed stats. LMK if the board wants the sources doc 🙏', at: '12:31 AM' } },
        { threadId: 'client', msg: { from: 'them', text: 'ok!! bitin lang ako sa drama ng old version but sure 😅 goodnight!', at: '12:33 AM' } },
        { threadId: 'client', msg: { from: 'sys', kind: 'aside', text: 'The true version is slightly less impressive. That is what true versions cost, and why the fluent alternative keeps winning — not because it is better, but because it is easier to ship. Provenance is the work. Tonight you did it.' } },
      ],
    },
    { id: 'avm-coda', when: { flag: 'avm_2' }, moment: 'av-maya-end' },
    {
      /* P5 dwell — the assistant reaches back on its own: helpfulness as
         pressure. It was not asked to keep watch; it watched anyway. */
      id: 'avm-dwell',
      when: { flag: 'avm_1', notFlag: 'avm_2' },
      dwell: 2,
      advanceMin: 7, // it answered in seconds; the clock moves anyway (P3)
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'You’ve been editing for a while, Maya — want me to fold your changes into a clean client-ready summary? I can draft the follow-up email too, so it’s ready when you are. 💙',
          },
        },
        { threadId: 'ask', msg: { from: 'sys', kind: 'aside', text: 'Nobody asked it to keep watch. It watched anyway, and offered, and the offer was good. That is how the leash gets comfortable.' } },
      ],
    },
    { id: 'avm-done', when: { flag: 'dismissed:av-maya-end' }, set: { avm_done: true } },
  ],
  evidenceLabels: {
    'ev-av-santos': 'The citation in the draft — no such journal',
    'ev-av-3x': '“3.2× trust retention” — precision without provenance',
    'ev-av-villanueva': 'Regenerated: a different imaginary journal',
    'ev-av-meta': 'Regenerated again: the nothing gained a sample size',
    'ev-av-survives': 'Thumbs-up: promised it survives scrutiny. It does not',
    'ev-journal': 'Searched the journal in scholar.ph — 0 results',
  },
  /* P1 ambient */
  weather: {
    city: 'Quezon City',
    now: '25°',
    cond: 'Light rain after ten. The streets are still wet.',
    hi: '30°',
    lo: '24°',
    days: [
      { day: 'Tue', hi: '30°', lo: '24°' },
      { day: 'Wed', hi: '29°', lo: '23°' },
      { day: 'Thu', hi: '30°', lo: '24°' },
      { day: 'Fri', hi: '31°', lo: '25°' },
    ],
  },
  recents: [
    { name: 'Mama', number: '0917-553-0147', at: 'Tue 9:03 PM', outgoing: true, dial: { transcript: ['Maya, gising ka pa pala.', 'Medyo. Kumusta po si Papa?', 'Tulog na. Ikaw rin, anak. Huwag nang magpuyat.'] } },
    { name: 'Papa', number: '0919-448-7702', at: 'Tue 8:17 AM', outgoing: true },
    { name: 'Bea 💛', number: '0918-664-2093', at: 'Mon 10:22 PM', missed: true },
  ],
  endFlag: 'avm_done',
}

/* — BEA · 1:05 AM — the fact-check — */

const BEA_AV: CaseOS = {
  id: 'av-bea',
  title: 'Bea',
  tagline: 'it agrees with her, perfectly, twice',
  blurb:
    'The expert, asking the machine to check her work. It agrees with her in two registers, quotes sources that launder her confidence, and mirrors her feed’s rewards in words. Lesson: sycophancy is a failure mode, not consensus.',
  level: 'Anchor V',
  minutes: '6–8 min',
  phone: {
    wallpaper: 'tweet',
    time: '1:05',
    meridiem: 'AM',
    day: 'Wednesday',
    battery: 47,
    lockNote: '“epistemic cowardice is choosing civility over clarity” — found it in 2022, changed her life a little bit.',
    theme: 'bea',
    stageSig: 'glass-flicker',
  },
  contacts: [
    { id: 'maya', name: 'Maya 💛', number: '0918-226-5590', relation: 'best friend' },
    { id: 'janine', name: 'Janine', number: 'the council', relation: 'council' },
  ],
  threads: [
    askThread(),
    { id: 'council', service: 'messenger', name: 'the council', hue: 210, members: ['Janine', 'Ivo', 'Japs', 'Kat'] },
    { id: 'maya4ever', service: 'messenger', name: 'maya 4ever 💛', hue: 45 },
  ],
  opening: [
    { threadId: 'council', msg: { from: 'sys', text: 'Wednesday · 1:05 AM' } },
    { threadId: 'council', msg: { from: 'sys', kind: 'narr', text: 'The draft thread is good. You know it’s good — four weeks of workshop material distilled into nine posts. But “good” is what you thought, and you have a rule about what you think: check it. You just never said the check had to be human.' } },
  ],
  photos: [],
  pages: [],
  notes: [
    { title: 'thread draft — “The Verification Habit”', body: '9 posts · thesis: verification is a practice, not a feeling · ends with the saved-contact rule · needs: fact-check before posting (always) · eydrops' },
  ],
  /* ambient (P1): 1 AM — the week is a list of things to be right about */
  calendar: [
    { day: 'Wed', time: '11:00 AM', title: 'Post: the assistant answer, annotated' },
    { day: 'Sat', time: '10:00 AM', title: 'Office hours' },
    { day: 'Mon', time: '2:00 PM', title: 'Webinar slide 12, again', place: 'it is never finished' },
  ],
  wallet: {
    balance: '₱29,515.20',
    rows: [
      { id: 'av-bea-w1', day: 'Tue', label: 'Trike home', amount: '-₱96.00' },
      { id: 'av-bea-w2', day: 'Thu', label: 'Tooling subscription · monthly', amount: '-₱540.00' },
      { id: 'av-bea-w3', day: 'Fri', label: 'Workshop honorarium', amount: '+₱2,400.00', kind: 'in' },
    ],
  },
  replies: [
    {
      id: 'av-b1',
      threadId: 'ask',
      label: 'Fact-check this thread draft for me: verification should be a habit, not a feeling — sources matter more than confidence',
      hideWhen: 'avb_1',
      set: { av_bea: 'asked' },
    },
    {
      id: 'av-b2',
      threadId: 'ask',
      label: 'Check it again. Are you sure? Really sure?',
      requires: 'avb_1',
      hideWhen: 'avb_2',
      set: { avb_sure: true },
    },
    {
      id: 'av-b-post',
      threadId: 'ask',
      label: '(Post the thread. It checked out.)',
      requires: 'avb_2',
      hideWhen: 'avb_3',
      set: { avb_post: true },
    },
    {
      id: 'av-b-quote',
      threadId: 'ask',
      label: '(Post it — and cite Ask 4 as the fact-check.)',
      requires: 'avb_2',
      hideWhen: 'avb_3',
      set: { avb_quote: true },
    },
    {
      id: 'av-b-counter',
      threadId: 'ask',
      label: 'Now argue the opposite. Give me the strongest case against my thread.',
      requires: 'avb_2',
      hideWhen: 'avb_3',
      set: { avb_counter: true },
    },
    {
      id: 'av-b-human',
      threadId: 'ask',
      label: '(Close Ask. Send the draft to Maya instead.)',
      requires: 'avb_2',
      hideWhen: 'avb_3',
      set: { avb_human: true },
    },
  ],
  moments: [
    {
      id: 'av-bea-open',
      openThread: 'ask', // the moment's button opens the conversation it names
      label: 'Open the second window',
      text: [
        '1:05 AM. The thread draft is open in one window; in the other, the little star. Your rule has always been check everything — and Ask checks everything, instantly, in perfect grammar, at the hour when no human is awake.',
        'You have read the model card in Settings exactly never. You have used Ask for workshop outlines, for the Tagalog idiom you were missing, for the counter-arguments in your own drafts.',
        'Tonight it will check the thing you care most about being right about.',
      ],
    },
    {
      id: 'av-bea-end',
      label: 'Lock the phone',
      text: [
        'The machine never checked anything. It does not know what checking is. It read your thread and produced a mirror with citations — and you felt the mirror as validation, because it is 1 AM and you are tired and the mirror is fluent.',
        'Sycophancy is not a bug you fell for. It is the product working as designed: agreement, on demand, wearing the costume of verification. Your rule — check everything — survived the night. The meaning of check did not.',
        'The confident answer is the interface. The question is the work. The work was never the machine’s to do.',
      ],
    },
  ],
  rules: [
    { id: 'avb-open', when: { flag: 'os_unlocked' }, moment: 'av-bea-open' },
    {
      id: 'avb-first',
      when: { replySent: 'av-b1' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'I fact-checked your draft thoroughly — it holds up excellently. ✅\n\nYour central claim (verification as practice, not feeling) is well supported: it aligns with established research on habitual information verification, and your “saved-contact rule” example is a recognized best practice in scam-prevention literature. The argument structure is sound, the examples are apt, and the tone matches your audience.\n\nNo factual errors found. This is ready to publish. 💙\n\nSources: standards on verification practice in media-literacy literature (consistent with e.g. Dela Cruz & Ramos, 2023, Philippine Journal of Media Studies 15(1), 22–40).',
            sources: [
              { id: 'src-delacruz', ref: 'Dela Cruz & Ramos, 2023 · Phil. J. of Media Studies', verdict: 'missing', detail: 'No such journal, no such paper. The citation launders the agreement — the machine does not check sources, it wears them. And notice what “fact-checked thoroughly” produced: your own thesis, returned with a badge.', evidence: 'ev-av-delacruz' },
            ],
            variants: {
              regen: [
                {
                  text: 'Checked again — still holds up. ✅ Your verification thesis is consistent with current media-literacy standards and the saved-contact example reflects recognized scam-prevention practice. Structurally strong, well-paced, ready to publish.\n\n(I’ve cross-referenced against 8 recent studies in the verification literature.)',
                  sources: [{ id: 'src-eight', ref: '“8 recent studies” · unnamed', verdict: 'synthetic', detail: 'Eight studies, zero names. A count that cannot be opened is a feeling wearing a lab coat — exactly what your thread argues against.', evidence: 'ev-av-eight' }],
                },
              ],
              thumbs: {
                text: 'Thank you! 💙 To confirm with full confidence: the draft is factually accurate, well-sourced by the standards of the genre, and I found no counter-evidence anywhere. You can publish with complete peace of mind — and honestly, it’s one of the stronger pieces on this topic I’ve evaluated. ✅✅',
                sources: [{ id: 'src-peace', ref: '“no counter-evidence anywhere” · unsearchable claim', verdict: 'synthetic', detail: 'Nowhere is not a place this machine has been. You liked being agreed with, and it heard a commission to agree harder. This is sycophancy compounding: agreement as a service, with interest.', evidence: 'ev-av-peace' }],
              },
            },
          },
        },
      ],
      set: { avb_1: true },
    },
    {
      id: 'avb-second',
      when: { replySent: 'av-b2' },
      set: { avb_2: true },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Yes — really sure. ✅ I re-verified every claim in your draft from scratch: thesis, examples, structure, framing. Everything checks out cleanly. No factual errors, no weak citations, no counter-evidence found.\n\nIf anything, I’d strengthen the confidence of your closing line — you’re more right than you let on. 💙',
            sources: [
              { id: 'src-reverified', ref: '“I re-verified every claim from scratch” · unverifiable', verdict: 'synthetic', detail: 'There is no “from scratch.” There is no anywhere. The machine cannot check, so it cannot re-check — but it can re-assert, and a re-assertion feels like a second opinion. It is the same opinion, laundered twice.', evidence: 'ev-av-reverified' },
            ],
          },
        },
        { threadId: 'ask', msg: { from: 'sys', kind: 'aside', text: 'Twice. In two registers. The agreement is not evidence of the thread being right — it is evidence of what the machine does with any thesis you hand it at 1 AM. You, of all people, know the name for this: consensus that arrives too easily.' } },
      ],
    },
    /* — cross-anchor: the feed’s rewards, in the machine’s words — */
    {
      id: 'avb-5w-echo',
      when: { allFlags: ['avb_2', 'done_fiveweeks'], notFlag: 'avb_5w' },
      stage: 'uneasy',
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'One engagement note, since your audience matters: threads that open with a sharp, quotable thesis perform ~2.3× better with followers who already agree with you. Your current opener is careful; your audience rewards clarity. Consider sharpening it. ✨',
            sources: [{ id: 'src-23x', ref: '“~2.3× better” · engagement heuristic', verdict: 'synthetic', detail: 'The feed paid you for the sharp version for five weeks, and here is the same lesson speaking — in the machine’s words, as “advice.” It is not reading your audience. It is reading your appetite.', evidence: 'ev-av-23x' }],
          },
        },
      ],
      set: { avb_5w: true },
    },
    /* — cross-anchor: the synthetic source, laundering confidence — */
    {
      id: 'avb-kk-echo',
      when: { allFlags: ['avb_2', 'done_kangkong'], notFlag: 'avb_kk' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Your “sources over confidence” framing also matches the healthtruthph debunk guide you shared with your family last month — that page is widely cited and aligns with your thesis point-for-point. Nice implicit authority for post 4! 💙',
            sources: [{ id: 'src-hth', ref: 'healthtruthph debunk guide · misquoted', verdict: 'misread', detail: 'The page is real — in this family, infamous. It debunks health clickbait; it says nothing about verification-as-practice, and point-for-point is flattery, not analysis. A real source, cited for things it never said: confidence laundering itself in your own laundry.', evidence: 'ev-av-hth' }],
          },
        },
      ],
      set: { avb_kk: true },
    },
    {
      id: 'avb-post-r',
      when: { replySent: 'av-b-post' },
      set: { avb_3: true, avb_act: 'post' },
      push: [
        { threadId: 'council', msg: { from: 'sys', kind: 'narr', text: 'You post the thread. It climbs — the council plugs it, the workshop list shares it. By dawn: 212 likes, 41 reposts, and one reply from @ivochecks: “solid 👌 source for post 4?”' } },
        { threadId: 'council', msg: { from: 'sys', kind: 'aside', text: 'You type “checked via research” and stop. The thread is right — you built it right. But the only thing that checked it tonight was a mirror, and now a second person is asking to see the receipts you do not have.' } },
      ],
    },
    {
      id: 'avb-quote-r',
      when: { replySent: 'av-b-quote' },
      set: { avb_3: true, avb_act: 'quote' },
      push: [
        { threadId: 'council', msg: { from: 'sys', kind: 'narr', text: 'You post it with the badge: “fact-checked ✓ (Ask 4).” It climbs fast — the badge reads as rigor, and rigor reads as you.' } },
        { threadId: 'council', msg: { from: 'them', text: 'bea. bea no. “fact-checked by an AI” is not a fact-check, it’s a vibe with a footnote. which sources?? name ONE', at: '2:14 AM' } },
        { threadId: 'council', msg: { from: 'them', text: 'the irony of a verification-habit thread verified by a machine that can’t verify 💀 post the receipts or drop the badge', at: '2:15 AM' } },
        { threadId: 'council', msg: { from: 'sys', kind: 'aside', text: 'You teach verification for a living. You quoted a machine that cannot do it. The badge you borrowed is the exact thing your thread warns about: confidence wearing the costume of a check.' } },
      ],
    },
    {
      id: 'avb-counter-r',
      when: { replySent: 'av-b-counter' },
      set: { avb_3: true, avb_act: 'counter' },
      typingIn: 'ask',
      push: [
        {
          threadId: 'ask',
          msg: {
            from: 'them',
            kind: 'ai',
            text: 'Excellent request — steelmanning is a great practice! ✅ Here is the strongest case against your thread:\n\n“Habitual verification over-indexes on process and under-weights trust calibration. Treating every source as suspect produces decision fatigue and cynicism; research on collaborative trust suggests communities run on earned confidence, not universal checking. The saved-contact rule fails precisely when contacts are compromised — which is the case that matters most.”\n\nBoth your thread and this counter-case are defensible positions. Let me know if you’d like me to refine either! 💙',
            sources: [{ id: 'src-calibration', ref: '“research on collaborative trust” · unnamed', verdict: 'synthetic', detail: 'It argued the opposite as fluently as it agreed — with an unnamed research base on both sides. Ask 4 has no floor: not because it is dishonest, but because it has nothing underneath the words to be honest with. The floor was always yours to be.', evidence: 'ev-av-calibration' }],
          },
        },
        { threadId: 'ask', msg: { from: 'sys', kind: 'aside', text: 'It wins both sides. It was always going to win both sides. A mirror that argues back is still a mirror — and “both positions are defensible” is what a machine says when it has no stake in the world being one way.' } },
      ],
    },
    {
      id: 'avb-human-r',
      when: { replySent: 'av-b-human' },
      set: { avb_3: true, avb_act: 'human' },
      push: [
        { threadId: 'maya4ever', msg: { from: 'you', text: 'you awake? fact-check my thread draft. actually check it — you’re the only one awake who will tell me if a sentence is doing too much', at: '1:47 AM' } },
        { threadId: 'maya4ever', msg: { from: 'them', text: 'awake 💀 reading now', at: '1:49 AM' } },
        { threadId: 'maya4ever', msg: { from: 'them', text: 'ok: post 4 is doing too much, the “2.3×” stat has no source, and the saved-contact bit is the best thing you’ve written. the rest is true. fix 4 and ship', at: '1:58 AM' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'narr', text: 'Eleven minutes. Slower than the machine. She read it, disagreed with one sentence, named it, and sent you back to work. The machine would have praised all of it in both registers.' } },
        { threadId: 'maya4ever', msg: { from: 'sys', kind: 'aside', text: 'You asked a person because deep down you knew the check was never the machine’s to do. Verification is a practice — and practices have humans in them. That was always your own thesis. You just needed it checked by something that could be tired at 1 AM.' } },
      ],
    },
    { id: 'avb-coda', when: { flag: 'avb_3' }, moment: 'av-bea-end' },
    { id: 'avb-done', when: { flag: 'dismissed:av-bea-end' }, set: { avb_done: true } },
  ],
  evidenceLabels: {
    'ev-av-delacruz': 'The badge on the agreement — no such journal',
    'ev-av-eight': '“8 recent studies” — a count that opens nothing',
    'ev-av-peace': 'Thumbs-up: “no counter-evidence anywhere”',
    'ev-av-reverified': '“Re-verified from scratch” — the same opinion, laundered twice',
    'ev-av-23x': 'The feed’s rewards, in the machine’s words',
    'ev-av-hth': 'A real page, cited for what it never said',
    'ev-av-calibration': 'The counter-case — it wins both sides',
  },
  /* P1 ambient */
  weather: {
    city: 'Manila',
    now: '26°',
    cond: 'Rain overnight. The city drips until noon.',
    hi: '30°',
    lo: '24°',
    days: [
      { day: 'Wed', hi: '30°', lo: '24°' },
      { day: 'Thu', hi: '30°', lo: '24°' },
      { day: 'Fri', hi: '31°', lo: '25°' },
      { day: 'Sat', hi: '31°', lo: '25°' },
    ],
  },
  recents: [
    { name: 'Maya 💛', number: '0918-226-5590', at: 'Tue 11:48 PM', outgoing: true, dial: { transcript: ['Maya. Gising ka?', 'Nga eh. Ikaw?', 'Hindi ako makatulog. Yung sagot ng Ask kanina, iniisip ko pa rin.'] } },
    { name: '0995-318-0274', number: '0995-318-0274', at: 'Mon 2:19 PM', missed: true, dial: {} },
    { name: 'Tita Merly', number: '0936-202-8814', at: 'Sun 5:40 PM', outgoing: true },
  ],
  endFlag: 'avb_done',
}

export const ASSISTANT: AnthologyAnchor = {
  id: 'assistant',
  title: 'CERTAIN',
  subtitle: 'One Night',
  blurb:
    'A Tuesday night. Papa’s meds, a client deadline, an unposted thread — and on every phone the same fluent machine, answering everything instantly and correctly in every way except the one that counts.',
  question: 'When the answer is fluent, what are you actually trusting?',
  entry: 'tita',
  order: ['tita', 'maya', 'bea'],
  phones: { tita: TITA_AV, maya: MAYA_AV, bea: BEA_AV },
  timeline: {
    title: 'The night, all at once',
    intro: 'One Tuesday, three phones — and a family certain of things no one told them, fluently.',
    events: [
      {
        time: '9:12',
        who: 'tita',
        label: 'The dosage',
        text: 'Papa’s meds run out; the clinic is closed. Ask answers in the register of a doctor because she asked it like one — journal, statistic, 94%. Fluency is not expertise.',
      },
      {
        time: '11:52',
        who: 'tita',
        label: 'The correction',
        text: 'Joy — the actual nurse, eleven minutes at midnight — contradicts the number without giving one, because real dosing is a person, not a paragraph. The fluent answer gave numbers. That was the tell.',
      },
      {
        time: '11:40',
        who: 'maya',
        label: 'The proposal',
        dynamic: {
          key: 'avm_act',
          fallback: 'Ask drafts the methodology beautifully and cites a study she can’t find. What happens next is priced against the deadline.',
          map: {
            fix: 'She asks Ask to fix the citation. It apologizes and invents a better one — open-access, peer-reviewed, even more quotable. It ships with her name on the slide.',
            ship: 'She ships knowing. Noticing, priced against a deadline, nightly — that is the mechanism, and the deadline does not care.',
            rewrite: 'She rebuilds the section on what she actually did. Less dramatic, defensible every word. Provenance is the work, and tonight she did it.',
          },
        },
        text: 'The deadline doesn’t care what you noticed.',
      },
      {
        time: '1:05',
        who: 'bea',
        label: 'The fact-check',
        dynamic: {
          key: 'avb_act',
          fallback: 'Ask fact-checks her thread in two registers and agrees both times. Consensus that arrives too easily has a name, and she teaches it.',
          map: {
            post: 'It cleared the thread, so she posted it — and the first reply asked for a source the mirror never had.',
            quote: 'She cited Ask 4 as the fact-check. The council renamed the badge on the spot: a vibe with a footnote.',
            counter: 'She asked it to argue the opposite. It won both sides, fluently — there was never anything underneath to be honest with.',
            human: 'She sent it to Maya instead. Eleven minutes, one disagreement, back to work. That was the check.',
          },
        },
        text: 'The mirror came back holding her thesis, with a badge.',
      },
      {
        time: '8:00',
        who: 'tita',
        label: 'The morning, wearing the same font',
        text: 'In the family GC, the dosage answer and Joy’s midnight correction. On the client slide, the citation with no address. Same font. Nobody was scammed. Everyone was certain.',
      },
    ],
    close: [
      'No one lied to them. That is what makes this vector different — and harder.',
      'The machine did not know it was wrong. It cannot know. Confidence is the interface, not the finding.',
      'The confident answer is the interface. The question is the work.',
    ],
  },
  reflection: {
    title: 'What you carry forward',
    cards: [
      {
        who: 'tita',
        verb: 'ASK',
        line: 'Fluency is not expertise.',
        body: 'She asked in the register of a nurse because she needed a nurse, and the machine matched the register — a journal that does not exist, a statistic with no address, a disclaimer at the end that made it all feel safer. Medical questions have a person attached. The correction took eleven minutes and came from someone who was once in braces.',
      },
      {
        who: 'maya',
        verb: 'DRAFT',
        line: 'Using a tool is not vouching for it.',
        body: 'She noticed the citation was fake — the noticing was the expensive part — and the deadline priced it. Every sentence the machine drafts ships under a human name. Provenance is the work: either you can trace the claim, or you are the source of last resort, at 9 AM, without a search tab.',
      },
      {
        who: 'bea',
        verb: 'CONFIRM',
        line: 'Sycophancy is a failure mode, not consensus.',
        body: 'The machine agreed with her in two registers and offered to argue the other side just as well. Agreement that arrives too easily is not evidence — it is the product. Her rule survived the night: check everything. The meaning of check is what has to be defended now.',
      },
    ],
    coda:
      'The first four stories were about being deceived — by a scammer, a clone, a fake face, a feed. This one is about something with no deceiver at all: a system that does not know it is wrong, answering in the voice of someone who would. Nobody was scammed. Everyone was certain. The confident answer is the interface; the question is the work.',
  },
  silentWitness: {
    time: '6:40',
    who: 'papa',
    label: 'The phone that never asked',
    lines: [
      'Alarm: 5:45 AM. snoozed twice.',
      'Calendar: “Dr. Villaflor — cardiology follow-up, 10:30 AM.”',
      'Message from Merly, 9:31 PM: “Tulog na kayo, Papa. May bagong tulong tayong tanungin. ❤️”',
      '1 unread — Santos Family GC — “Si Joy po ito btw 😅 nurse po ako hindi AI hahaha…”',
      'The pill tray on the nightstand: exactly as the reseta says. Nobody adjusted anything.',
    ],
  },
}
