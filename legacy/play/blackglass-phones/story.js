/* =====================================================================
   BLACKGLASS — Three Phones, One Morning
   Phone-anthology Rashomon. The same Saturday morning refracts through
   three phones. Each phone is a portrait before a single message is read.
   The form is the lesson: you cannot see clearly from one position.

   Content model — everything below is data the engine renders.
   A phone has: identity, a lockscreen, a home screen, and a `flow`
   (an ordered list of FRAMES). A frame can set the screen chrome
   (lock / home / an app header), render a list of BEATS, and end in
   either a CHOICE or a continue. Choices branch-and-reconverge: you pick
   one, you live its consequence, the morning continues anyway.
   ===================================================================== */

window.PHONES = (function () {

  /* ------------------------------------------------------------------
     The anchor moment, named once.
  ------------------------------------------------------------------ */
  const ANCHOR = {
    title: 'THREE PHONES',
    subtitle: 'One Morning',
    blurb:
      'A Saturday. A link about a vegetable. Three people who love their ' +
      'families, doing the reasonable thing — from inside three different phones.',
    question: 'Who is the villain in their own phone?',
  };

  /* ==================================================================
     MAYA — DECIDE
     Dark mode. Six icons. The "no" folder. Mt. Pulag, which wants
     nothing from her. Brightness 15% until 9 AM. She is the only one
     who experiences the morning as choice.
  ================================================================== */
  const MAYA = {
    id: 'maya',
    name: 'Maya',
    role: 'freelance designer · Manila · late 20s',
    verb: 'DECIDE',
    essence: 'Knows exactly what the link is. Taps it anyway.',
    lesson: 'Awareness is not resistance.',
    theme: 'maya',
    lock: {
      time: '6:47',
      meridiem: 'AM',
      day: 'Saturday',
      wallpaper: 'mtpulag',
      wallpaperNote: 'Mt. Pulag, 2023. Fog, grass, no people.',
      brightness: 15,
    },
    home: {
      brightness: 15,
      apps: [
        { icon: '📷', label: 'Camera' },
        { icon: '🗒️', label: 'Notes' },
        { icon: '🇬', label: 'GCash' },
        { icon: '📞', label: 'Phone' },
      ],
      folders: [
        { label: 'later', icon: '📁', items: ['Instagram'], dim: true },
        { label: 'no', icon: '🚫', items: ['Mail', 'Slack', 'Asana', 'Figma'] },
      ],
    },

    flow: [
      /* — Frame 1: lockscreen — */
      {
        lock: true,
        notifs: [
          { app: 'Santos Family GC 🏠', text: '7 new messages', sub: 'earliest 6:01 AM' },
          { app: 'Bea 💛', text: '2 messages' },
          { app: 'PixelPush Projects', text: 'Jigs: 1 message', sub: '6:31 AM' },
          { app: 'Unknown number', text: '1 message', sub: '5:58 AM' },
          { app: 'Instagram', text: '3 activity alerts', sub: 'later · muted', dim: true },
        ],
        beats: [
          { t: 'narr', text: [
            'Your hand finds it before your eyes do.',
            'This is not a thing you do. This is a thing that <em>happens</em> — wrist rotating, fingers crossing the sheet, thumb arriving at glass like it has been called home. You are still inside the blurred edge of a dream about nothing. The muscle is already deciding.',
          ]},
        ],
        continueLabel: 'Open',
      },

      /* — Frame 2: the weight of fourteen, the home screen — */
      {
        home: true,
        beats: [
          { t: 'narr', text: [
            'Fourteen, all told. You feel them as a weight, not a number. Saturday. You had a thought, before sleep, that Saturday would be different. The thought is already gone.',
          ]},
          { t: 'aside', text: 'She turned off message previews eight months ago. She told herself it was a privacy thing. It was a wanting-to-choose thing. She wanted the notification to be an <em>invitation</em>, not an ambush. It did not work.' },
          { t: 'narr', text: [
            'Six icons. Not because she deleted everything — because she keeps deleting things and not replacing them. There is a folder called <em>later</em>. There is a folder called <em>no</em>. The <em>no</em> folder is not a joke. She has genuinely tried to make herself harder to reach by her own inbox.',
          ]},
        ],
        continueLabel: 'Open the family GC',
      },

      /* — Frame 3: the family GC — */
      {
        app: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: 'Mama · Papa · Kuya Renz · Tita Merly · Tita Peachy · You' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Tita Merly', time: '6:01 AM',
            text: 'Blessed Saturday po sa lahat!! 🌅🙏 Claim this blessing — type AMEN!' },
          { t: 'aside', text: 'The same sunrise GIF. She has sent variations for 347 mornings. Mama always answers. Papa never does. You are somewhere in between.' },
          { t: 'msg', side: 'in', sender: 'Tita Peachy', time: '6:09 AM',
            text: 'Pasabuy nga pala sa SM — yung Tide liquid na malaki, sale daw today 🧺' },
          { t: 'msg', side: 'in', sender: 'Tita Merly', time: '6:19 AM',
            text: 'Mga pamangkin ha, look at this. Very important for your health. My officemate sent this — doctor daw ang source 👨‍⚕️' },
          { t: 'link', artifact: 'kangkong-clickbait', title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent', domain: 'healthtruthph.click' },
        ],
        continueLabel: 'Continue',
      },

      /* — Frame 4: you stop — */
      {
        beats: [
          { t: 'narr', text: [
            'You stop.',
            'Not at the article. You stop at the word <em>EXPOSED</em>, because you have designed enough thumbnails to know what EXPOSED is doing. It is not a word. It is a lever. The visual equivalent of grabbing someone by the collar and turning their head: <em>look here, not there, something was hidden from you.</em>',
            'The domain is <strong>healthtruthph.click</strong>. Not .com. Not .ph. You register this the way you register a word misspelled in a client’s deck — automatically, professionally, without having decided to look.',
          ]},
        ],
        continueLabel: 'Continue',
      },

      /* — Frame 5: Mama's name on it — */
      {
        app: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: 'Mama · Papa · Kuya Renz · Tita Merly · Tita Peachy · You' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Mama', time: '6:21 AM',
            text: 'Salamat po Ate 🙏 Share ko rin sa bible study group. Lalo na para kay Papa, may altapresyon pa naman sya' },
          { t: 'narr', text: [
            'The link has Mama’s name on it now.',
          ]},
          { t: 'aside', text: 'Tita Merly sent it because she loves her family. Her officemate sent it because that officemate loves <em>her</em>. The source is described as a doctor not because anyone verified this but because <em>doctor</em> is the word that turns care into authority — and authority into permission to stop asking questions.' },
          { t: 'narr', text: [
            'Mama has already thanked it and already assigned it a destination: Papa, who has high blood pressure, who eats kangkong almost every morning in his sinigang, who will read whatever Mama puts in front of him because he trusts her the way you trust Mama, which is completely and without thinking about it.',
            'The link has been in this family for nine minutes and it has already moved two stops along a chain that ends at your father’s breakfast.',
            'You know what the link is. You have <em>built</em> versions of this template, for clients who wanted urgency without facts.',
          ]},
        ],
        continueLabel: 'And so —',
      },

      /* — Frame 6: THE CHOICE — */
      {
        choice: {
          verb: 'DECIDE',
          prompt: 'You know what you know. What do you do?',
          options: [
            {
              label: 'Tap the link — maybe you’re wrong',
              set: { maya_choice: 'tapped' },
              say: [
                { t: 'narr', text: [
                  'You know what you know. You tap it anyway, because “probably misinformation” is not the same as “definitely misinformation,” and you would rather be certain than right.',
                  'Right just leaves you alone with yourself.',
                ]},
              ],
            },
            {
              label: 'Type: “Tita, san niyo po nakuha yung link? 😊”',
              set: { maya_choice: 'asked' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '6:48 AM', text: 'Tita, san niyo po nakuha yung link? 😊' },
                { t: 'narr', text: [
                  'The emoji is doing everything. Without it, you are questioning an elder in front of the whole family. With it, you are being <em>curious</em> — curious is permitted. You are asking a question. You are not saying she is wrong.',
                  'You are not saying she is wrong.',
                ]},
              ],
            },
            {
              label: '❤️ and scroll past',
              set: { maya_choice: 'hearted' },
              say: [
                { t: 'sys', text: 'You reacted ❤️ to Tita Merly’s message.' },
                { t: 'narr', text: [
                  'You put your name on it.',
                  'The heart is not neutral. The heart is endorsement. Every person who opens this GC later today will see your ❤️ and weigh it as evidence that someone checked. No one checks before they heart-react.',
                  'That’s why it matters that you heart-react.',
                ]},
              ],
            },
            {
              label: 'Screenshot it, send to Kuya Renz later',
              set: { maya_choice: 'filed' },
              say: [
                { t: 'sys', text: 'Screenshot saved. Drafted to Kuya Renz: “legit?”' },
                { t: 'narr', text: [
                  'What you have done is made this problem a message you sent but didn’t have to send yet.',
                  'This is not a solution. This is a form of filing.',
                ]},
              ],
            },
          ],
        },
        continueLabel: 'Continue',
      },

      /* — Frame 7: end Maya — */
      {
        beats: [
          { t: 'narr', text: [
            'You lock the phone. The kettle is somewhere near boiling.',
            'You knew what the link was the whole time. Knowing did not stop the link. Knowing only let you watch yourself, in good resolution, not stopping it either.',
            'You wanted, this morning, to be a little better than you were yesterday. You are so tired of wanting that — and tired, too, of how the wanting never quite becomes the doing.',
          ]},
          { t: 'end', kind: 'maya' },
        ],
      },
    ],
  };

  /* ==================================================================
     TITA MERLY — FORWARD
     Light mode, max font. The Last Supper, never changed. 47 unread on
     Viber because clearing feels like throwing away unread letters.
     Care expressed as distribution. There is no "delete" in her moral
     vocabulary — only how much you confirm before you pass it along.
  ================================================================== */
  const TITA = {
    id: 'tita',
    name: 'Tita Merly',
    role: 'QC · ~60 · Papa has hypertension',
    verb: 'FORWARD',
    essence: 'She verifies. The verification is a person who loves her.',
    lesson: 'A trust network is also an attack surface.',
    theme: 'tita',
    lock: {
      time: '5:43',
      meridiem: 'AM',
      day: 'Saturday',
      wallpaper: 'lastsupper',
      wallpaperNote: 'The Last Supper. Downloaded three years ago. Never changed.',
      brightness: 100,
    },
    home: {
      brightness: 100,
      apps: [
        { icon: '💜', label: 'Viber', badge: 47 },
        { icon: '💬', label: 'Messenger', badge: 12 },
        { icon: '✉️', label: 'SMS', badge: 3 },
        { icon: '📖', label: 'Bible' },
        { icon: '🇬', label: 'GCash' },
        { icon: '📘', label: 'FB Lite' },
        { icon: '🛒', label: 'Shopee', badge: 6 },
        { icon: '🙏', label: 'Prayer' },
        { icon: '📺', label: 'ChannelBox' },
        { icon: '🃏', label: 'Solitaire' },
      ],
      folders: [],
    },

    flow: [
      /* — Frame 1: the kitchen — */
      {
        beats: [
          { t: 'world', text: [
            'The oil is already talking.',
            'Not loud yet — just the small steady spit of fat hitting the pan, that sound that means the morning has already decided to begin without waiting for you. You laid the tuyo in at five-thirty, low flame, patience, don’t crowd the fish, the way Mama taught you. The window above the sink is the color of a bruise turning yellow. Not dawn yet. The in-between.',
            'Papa is still asleep. You can hear the ceiling fan from the bedroom — the faint wobble it’s had for three years that you keep meaning to ask your son about. The wobble means Papa is in there. Alive and breathing and in there.',
          ]},
        ],
        continueLabel: 'Pick up the phone',
      },

      /* — Frame 2: Viber from Joy — */
      {
        home: true,
        beats: [
          { t: 'sys', text: '💜 Viber — Joy A. sent an attachment · 5:41 AM' },
          { t: 'narr', text: [
            'Joy.',
            'You smile before you even open it. Joy sends things at hours that would surprise other people, but you’ve known her since the hospital canteen days and Joy has never changed. Early bird talaga.',
          ]},
        ],
        continueLabel: 'Open Viber',
      },

      /* — Frame 3: Joy's message — */
      {
        app: { icon: '💜', name: 'Viber', chat: 'Joy A.', sub: 'hospital canteen days · since forever' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Joy A.', time: '5:41 AM',
            text: 'Tita, basahin mo po to. May pinsan ako sa Cebu, nag-share. Mga doctor daw nag-tatago.' },
          { t: 'link', artifact: 'kangkong-clickbait', title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent', domain: 'kangkong, circled in red' },
          { t: 'narr', text: [
            'You read the headline twice.',
            '<em>Mga doctor nag-tatago.</em> Doctors hiding something.',
            'Your thumb hovers over the preview image — the kangkong circled in red like a problem, like something labeled wrong. You think of the kangkong you bought at the palengke on Thursday. You think of Papa’s blood pressure, the morning medication he takes with warm water, the chart the doctor drew for him about sodium.',
            'You think: <em>kung totoo ito.</em> If this is true.',
          ]},
        ],
        continueLabel: 'Continue',
      },

      /* — Frame 4: the thing that makes it real — */
      {
        app: { icon: '💜', name: 'Viber', chat: 'Joy A.', sub: 'hospital canteen days · since forever' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Joy A.', time: '5:42 AM',
            text: 'Yung pinsan ko, nars siya before. Dati sa Cebu Doctors. Sabi niya meron daw talagang mga ganito na tinatago ng mga ospital. Para sa supplement nila kasi eh.' },
          { t: 'aside', text: 'There it is — the part that makes the thing real. Joy’s cousin was a nurse. Cebu Doctors. That is not nothing. You have never been there but you have heard of it, it sounds like a place where nurses know things.' },
          { t: 'narr', text: [
            'And if a nurse is sharing this through Joy — who worked at the hospital six years before the barangay health center, who brought you mango float when your knee was swollen, who is not the type to share things without reason —',
            'then this is not nothing.',
          ]},
        ],
        continueLabel: 'And so —',
      },

      /* — Frame 5: THE CHOICE (no delete) — */
      {
        choice: {
          verb: 'FORWARD',
          prompt: 'How much do you confirm before you pass it on?',
          options: [
            {
              label: 'Open the link — kung totoo ito, dapat malaman ng lahat',
              set: { tita_choice: 'opened' },
              say: [
                { t: 'narr', text: [
                  'The page is slow to load on the kitchen wifi. Worried doctors in white coats. Red text. You do not read all of it. You read enough to feel the weight of it settle where your worry already lives.',
                ]},
              ],
            },
            {
              label: 'Forward to the Family GC first — they should know right away',
              set: { tita_choice: 'forward' },
              say: [
                { t: 'narr', text: [
                  'Right away. Before the day gets loud, before everyone is busy. The people you love should have this in their hands when they wake.',
                ]},
              ],
            },
            {
              label: 'Send Joy a voice note — ask her more about the cousin',
              set: { tita_choice: 'voicenote' },
              say: [
                { t: 'voice', side: 'out', sender: 'You', time: '5:48 AM', secs: 14 },
                { t: 'voice', side: 'in', sender: 'Joy A.', time: '5:51 AM', secs: 22 },
                { t: 'narr', text: [
                  'Twenty-two seconds. Joy’s voice, warm and certain — the cousin, the years, the hospital, <em>sigurado yan Tita, hindi naman magsisinungaling si pinsan ko.</em> You ask, and Joy confirms, and confirmation from Joy is the only kind of proof your morning has ever needed.',
                ]},
              ],
            },
          ],
          footnote: 'To delete a message: tap, hold, More, Delete. You have never been to that menu. There is no reason you would be.',
        },
        continueLabel: 'Continue',
      },

      /* — Frame 6: the forward, composed with care — */
      {
        app: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: 'composing…' },
        beats: [
          { t: 'narr', text: [
            'You press and hold the link until the option appears. <em>Forward. Share. Copy link.</em> You copy it. You go back to Messenger, back to the family GC.',
            'You type around the link. You want it to have a frame — a link alone looks cold, looks like you just threw something at them. You want them to know you are thinking of them. You are always thinking of them.',
          ]},
          { t: 'compose', side: 'out', sender: 'You', time: '6:01 AM', text: 'Mga pamangkin, look at this ha. Very important for your health.' },
          { t: 'link', artifact: 'kangkong-clickbait', title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent', domain: 'healthtruthph.click' },
          { t: 'compose', side: 'out', sender: 'You', time: '6:02 AM', text: 'My officemate sent this, nurse yung pinsan niya before. Concern lang niya sa ating kalusugan.' },
          { t: 'narr', text: [
            'You want to say something about Papa — about how this matters because of Papa — but you don’t want to alarm them on a Saturday, and you don’t want Papa to see it and think you are worried, because you are always worried, quietly, and he knows it. Saturday should not feel heavy.',
            'So you add instead:',
          ]},
          { t: 'compose', side: 'out', sender: 'You', time: '6:03 AM', text: 'Lalo na kayo na may matanda sa bahay. Share niyo na rin sa iba para aware lahat 💕🙏' },
          { t: 'sys', text: 'Sent · 6:03 AM' },
        ],
        continueLabel: 'Put the phone down',
      },

      /* — Frame 7: back to the kitchen — */
      {
        beats: [
          { t: 'world', text: [
            'The tuyo is done. You transfer it to the plate — the chipped one with blue flowers, the one Papa likes — and set it on the table with the rice you kept warm since five. A glass of water beside it. You fold a paper towel for his hands.',
            'You will wake him in ten minutes. You always wake him at quarter past six.',
            'Your phone is face-down on the counter. You don’t look at it.',
          ]},
        ],
        continueLabel: 'Later that morning',
      },

      /* — Frame 8: RECOGNITION — Maya's question lands (needs maya) — */
      {
        needs: ['maya'],
        recognition: true,
        beats: [
          { t: 'world', text: [
            'It is 7:14 now. Papa has eaten. You are rinsing the tuyo oil from the pan, the sudsy water going gray-yellow, and you do not reach for the phone when it vibrates once against the counter. The radio is saying something about EDSA. You watch Papa from the corner of your eye: rice, a small piece of fish, slow and careful, the way the doctor said.',
          ]},
          { t: 'sys', text: 'The phone vibrates again.' },
          { t: 'world', text: [
            'You dry your hands on the dishtowel — the one with faded roosters, Mama’s — and flip the phone over.',
          ]},
          { t: 'app', appHead: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: '' } },
          { t: 'msg', side: 'in', sender: 'Maya', time: '7:14 AM', text: 'Tita, san niyo po nakuha yung link? 😊' },
          { t: 'narr', text: [
            'The emoji sits at the end like a small soft thing.',
            'You read it twice.',
            '<em>San niyo po nakuha.</em> Where did you get it. Not “is this true” — not “Tita I checked and…” — just: where. The emoji makes it gentle. It makes it a question, not a doubt. But underneath the gentleness you feel the shape of what is not being said.',
            'Your chest does a small thing. Not anger. Not shame. Somewhere between the two, a tightness you do not have a name for.',
            'Maya is the one who designs things, who knows how the internet works in a way you do not fully understand but trust because she is family, because she is bright, because when you ask her how to forward something she shows you without making you feel small. You love her the way you love all of them — completely, automatically, the way breathing does not ask permission.',
            'But you are also tired.',
            'The link is still in the thread, two hearts deep, Mama’s name attached. The emoji is doing something you cannot quite name.',
          ]},
          { t: 'recog-tag', text: 'An hour ago you were inside Maya’s phone, watching this same link move. From there, the emoji read as curiosity — soft, permitted. From here, it’s a question she has to read twice.', needs: ['maya'] },
          { t: 'end', kind: 'tita' },
        ],
      },
    ],
  };

  /* ==================================================================
     BEA — CONSULT
     Light mode because dark mode is for people who want to seem
     mysterious. Four screens, everything pings, the council. Her
     wallpaper is a tweet that changed her life a little bit. She is
     right about the kangkong link. She is also, right now, inside a
     different operation entirely.
  ================================================================== */
  const BEA = {
    id: 'bea',
    name: 'Bea',
    role: 'digital comms, platform-accountability NGO · Maya’s best friend',
    verb: 'CONSULT',
    essence: 'Correct about the scam. Fooled by the thing that agrees with her.',
    lesson: 'Media literacy can become its own automation bias.',
    theme: 'bea',
    lock: {
      time: '7:14',
      meridiem: 'AM',
      day: 'Saturday',
      wallpaper: 'tweet',
      wallpaperNote: '“epistemic cowardice is choosing civility over clarity” — found it in 2022, changed her life a little bit.',
      brightness: 90,
    },
    home: {
      brightness: 90,
      apps: [
        { icon: '🎵', label: 'TikTok', badge: 5 },
        { icon: '🧵', label: 'Threads', badge: 12 },
        { icon: '✖️', label: 'X', badge: 30 },
        { icon: '👽', label: 'Reddit', badge: 8 },
        { icon: '🎮', label: 'Discord', badge: 99 },
        { icon: '📷', label: 'Insta', badge: 14 },
        { icon: '🇬', label: 'GCash' },
        { icon: '🔵', label: 'BPI' },
        { icon: '📚', label: 'Goodreads' },
        { icon: '📈', label: 'Tracker', badge: 1 },
      ],
      folders: [
        { label: '47 browser tabs', icon: '🌐', items: ['Snopes (open 6 days)', 'a doc', 'a doc', '44 more'] },
      ],
    },

    flow: [
      /* — Frame 1: horizontal in a rich information environment — */
      {
        home: true,
        beats: [
          { t: 'narr', text: [
            'You’ve been awake since six. Insomnia, the usual cocktail — cortisol and scrolling, neither one helping the other. A full loop through TikTok, three Reddit threads, the wordle, twenty minutes of a documentary you’ve seen before. Your back hurts. You did not get up to stretch. You are horizontal and in a rich information environment and this is fine.',
            'Your phone registers seven new notifications in the last four minutes. You count them the way other people count sheep.',
          ]},
          { t: 'notif', app: 'maya 4ever 💛', text: 'image + “is this real or no my tita keeps sending these”', time: '7:12' },
          { t: 'notif', app: 'girls (work)', text: 'Camille: forwarded a link', time: '7:09' },
          { t: 'notif', app: 'TikTok', text: '@factcheckph liked your comment', time: '7:07' },
          { t: 'notif', app: 'the council', text: '4 new messages', time: '7:01' },
        ],
        continueLabel: 'Open Maya first',
      },

      /* — Frame 2: Maya's screenshot — */
      {
        app: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: 'since high school' },
        beats: [
          { t: 'narr', text: [
            'You open Maya first because you always open Maya first.',
          ]},
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '7:12 AM', text: '[screenshot — kangkong link preview]' },
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '7:12 AM', text: 'is this real or no my tita keeps sending these' },
          { t: 'narr', text: [
            'You look at it for approximately four seconds.',
          ]},
          { t: 'aside', text: 'The headline is formatted the way they all are — “EXPOSED” doing load-bearing work, the passive voice on “they don’t want you to,” the vague conspiratorial “they.” The URL ends in .click, which is what scammers use when .com was taken. “Filipino Doctors Are Staying Silent” is a sentence about a silence that, by virtue of being in the headline, is already broken. You’ve made a Canva slide about this template.' },
        ],
        continueLabel: 'Reply',
      },

      /* — Frame 3: the fast, correct debunk — */
      {
        app: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: 'since high school' },
        beats: [
          { t: 'msg', side: 'out', sender: 'You', time: '7:14 AM', text: 'ok so immediately: look at that URL. .click domains are almost always a tell. healthtruthph.CLICK.' },
          { t: 'msg', side: 'out', sender: 'You', time: '7:14 AM', text: 'also that headline structure — “EXPOSED” + “they don’t want you to know” + a specific professional group staying quiet about something — it’s a template. literally a fill-in-the-blank.' },
          { t: 'narr', text: [
            'You open the work GC next. Camille has forwarded a link with: <em>“guys is this true?? yung ampalaya??”</em>',
            'Different vegetable. Same template. Same .click domain family.',
          ]},
          { t: 'msg', side: 'out', sender: 'You', time: '7:15 AM', text: 'same template. different vegetable. they’re running these in batches rn, probably A/B testing which produce Filipinos are most worried about. seen a malunggay one too' },
          { t: 'gallery', artifacts: ['kangkong-clickbait', 'ampalaya-clickbait', 'malunggay-clickbait'] },
          { t: 'narr', text: [
            'You’ve sent four messages in under two minutes. This is what you’re for. You feel the small clean satisfaction of competence.',
          ]},
        ],
        continueLabel: 'And so —',
      },

      /* — Frame 4: THE CHOICE (consult / broadcast) — */
      {
        choice: {
          verb: 'CONSULT',
          prompt: 'It’s handled. You don’t close tabs — you open them.',
          options: [
            {
              label: 'Open TikTok — see what’s already circulating',
              set: { bea_choice: 'tiktok' },
              say: [
                { t: 'narr', text: [
                  'Muscle memory. The thumb moves before the decision does.',
                ]},
              ],
            },
            {
              label: 'Cross-check the Snopes tab you’ve had open six days',
              set: { bea_choice: 'snopes' },
              say: [
                { t: 'narr', text: [
                  'You flick to it. You don’t read it. You feel better for having it open, the way a seatbelt feels like driving carefully. Then your thumb finds TikTok anyway.',
                ]},
              ],
            },
            {
              label: 'Screenshot it to the council — let them weigh in',
              set: { bea_choice: 'council' },
              say: [
                { t: 'sys', text: 'Sent to the council: “vegetable misinfo batch, see thread 👆”' },
                { t: 'narr', text: [
                  'The council is for exactly this. Four people who are right about things, confirming to each other that they are right about things. Then, while you wait for them, your thumb finds TikTok.',
                ]},
              ],
            },
          ],
        },
        continueLabel: 'Continue',
      },

      /* — Frame 5: THE TRAP — */
      {
        app: { icon: '🎵', name: 'TikTok', chat: 'For You', sub: '' },
        beats: [
          { t: 'narr', text: [
            'The feed updates before you’re even conscious of opening the app. The third video is not the usual rotation. #factcheck #medialiteracy #kangkong. A woman in a blazer at a desk, DEBUNKED in red across the bottom.',
            'You stop scrolling.',
          ]},
          { t: 'video', artifact: 'dr-anita-still', creator: 'Dr. Anita V.', sub: 'Health Communication Specialist', caption: 'How that “EXPOSED vegetable” link actually works 🧵', views: '340.2K', tag: 'DEBUNKED' },
          { t: 'narr', text: [
            'She’s saying everything you just said to Maya. The .click domains. The fill-in-the-blank template. The supplement funnel. And then some things you hadn’t included — how health misinformation travels faster through family groups because it arrives <em>pre-vouched</em>, how “Filipino doctors staying silent” is built to weaponize national distrust of institutions.',
            'It’s clean. It’s accurate. It’s exactly right.',
          ]},
          { t: 'aside', text: 'You do not notice, because you are not looking for it, that her lips are forty milliseconds behind her voice in the bridge. That the “Dr.” has no institution attached — just a specialty. That the lower-third font weight is slightly off, as if added in post. That the last ten seconds pivot, gently, to a newsletter — MediaLitPH Weekly — a Linktree, “subscribe for weekly debunks, it’s free.”' },
          { t: 'narr', text: [
            'What you notice is that she is right about everything. She is packaging it better than you could in ninety seconds. You feel the particular warmth of being understood before you spoke.',
          ]},
        ],
        continueLabel: 'Share it',
      },

      /* — Frame 6: laundering it through her reputation — */
      {
        app: { icon: '🧵', name: 'Threads', chat: '@beareyes.ph · 1,400 followers', sub: '' },
        beats: [
          { t: 'msg', side: 'out', sender: '@beareyes.ph', time: '7:18 AM',
            text: 'this is the cleanest explainer i’ve seen on the vegetable misinformation batch going around rn. bookmarking for the work deck. if you’ve gotten an “EXPOSED: the vegetable your doctors won’t talk about” link in your family GC this week, this is why and how. 🧵' },
          { t: 'sys', text: 'attached: TikTok — Dr. Anita V.' },
          { t: 'narr', text: [
            'Then you paste the same link into <em>maya 4ever</em>.',
          ]},
          { t: 'msg', side: 'out', sender: 'You', time: '7:18 AM', text: 'ok also someone made a great explainer on exactly this batch — send to your tita maybe' },
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '7:19 AM', text: 'oh this is good actually. you’re so fast at this how' },
          { t: 'msg', side: 'out', sender: 'You', time: '7:19 AM', text: 'it’s literally my job babe. also TikTok just handed it to me lmao' },
          { t: 'narr', text: [
            'You lock the phone. You feel, without calling it anything, the comfortable weight of having been useful. Of having done the thing correctly. Of being the person your friends call when they get the bad link.',
            'The video had 340,000 views by 7 AM on a Saturday. You have added yours to the total.',
          ]},
        ],
        continueLabel: 'Don’t put it down yet',
      },

      /* — Frame 7: RECOGNITION — the afterglow, and Maya forwards it (needs maya) — */
      {
        needs: ['maya'],
        recognition: true,
        beats: [
          { t: 'narr', text: [
            'You set the phone on your chest. Not the nightstand — you’re not done with it. The ceiling is white and textured the way every Manila apartment ceiling is textured, like someone pressed a sponge into wet plaster in 1987 and called it a design choice.',
            'It does the next thing.',
          ]},
          { t: 'sys', text: '🧵 Threads · your post: 14 likes, 3 reposts, 1 reply' },
          { t: 'msg', side: 'in', sender: '@maricel_teaches', time: '7:21 AM', text: 'thank you for this!! sharing with my class GC, parents need to see 🙏' },
          { t: 'aside', text: 'Maricel teaches grade school. Her parents GC is sixty people, maybe more. Your thing is in that GC now, attributed to you, working. @tito_rick — retired journalist, 4,800 followers — reposts it with no comment, which from him is the good kind.' },
          { t: 'app', appHead: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: '' } },
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '7:23 AM', text: 'ok i sent it to the fam GC we’ll see lol' },
          { t: 'narr', text: [
            'You smile, just past the screen.',
            'You feel warm. You feel correct. You feel like the kind of person who can be DMed at 7 AM with “is this real” and answer in two minutes with receipts. This is what you are for.',
            'This is fine.',
          ]},
          { t: 'recog-tag', text: 'That was you, on the other phone — Maya — forwarding Dr. Anita into the Santos family GC, because you told her to. The same family where the kangkong link started. The scam and the debunk, both AI-shaped, now traveling the same loving hands.', needs: ['maya'] },
          { t: 'end', kind: 'bea' },
        ],
      },
    ],
  };

  /* ==================================================================
     THE MORNING, ALL AT ONCE — timeline epilogue (needs all three)
     The structural payoff. The kangkong link and the anti-kangkong
     debunk move through the same family, the same Saturday, both
     AI-shaped, each person reasonable from inside their own screen.
  ================================================================== */
  const TIMELINE = {
    title: 'The morning, all at once',
    intro:
      'You have been in three phones. Here is the one timeline none of them could see — ' +
      'because no one was holding all three.',
    events: [
      { time: '5:41', who: 'tita', label: 'Viber · Joy → Tita Merly',
        text: 'A cousin in Cebu. A nurse, before. “Mga doctor daw nag-tatago.” The link arrives wrapped in a person Tita trusts.' },
      { time: '6:01', who: 'tita', label: 'Tita Merly → Santos Family GC',
        text: '“Concern lang niya sa ating kalusugan… Lalo na kayo na may matanda sa bahay.” She forwards it the way she sends a blessed-morning GIF: as a gift.' },
      { time: '6:21', who: 'maya', label: 'Mama → the GC',
        text: '“Salamat po Ate 🙏 Share ko rin sa bible study group. Lalo na para kay Papa, may altapresyon.” The link now points at Papa’s breakfast.' },
      { time: '6:47', who: 'maya', label: 'Maya wakes',
        dynamic: { key: 'maya_choice',
          fallback: 'She knows the template on sight — she has built it. Knowing is not the same as stopping.',
          map: {
            tapped: 'She taps the link anyway — “probably” misinformation is not “definitely,” and she would rather be certain than right.',
            asked: 'She asks Tita where it came from, softened with an emoji so it reads as curiosity, not doubt — and gets a vouching chain back.',
            hearted: 'She reacts ❤️ and scrolls past, adding her own name to the link — knowing, in the moment she taps it, exactly what the heart does downstream.',
            filed: 'She screenshots it for Kuya Renz, turning the problem into a message she sent but didn’t have to send yet.',
          } },
        text: 'She knows the template on sight — she has built it. Knowing is not the same as stopping.' },
      { time: '7:09', who: 'bea', label: 'Camille → work GC',
        text: 'The ampalaya version. Same template, different vegetable. The batch is A/B testing which produce Filipinos fear most.' },
      { time: '7:14', who: 'bea', label: 'Bea, correct in two minutes',
        text: 'She nails it — the .click tell, the fill-in-the-blank headline. She is completely right about the link. That is the part that disarms her.' },
      { time: '7:16', who: 'bea', label: 'TikTok hands her Dr. Anita V.',
        text: 'An AI-generated “debunker” that agrees with her precisely. Lips 40ms late. No institution. A Linktree at the end. She does not check, because it is saying what she already knows.' },
      { time: '7:18', who: 'bea', label: 'Bea → 1,400 followers + Maya',
        text: 'She launders the AI video through her reputation. “send to your tita maybe.” Maricel forwards it to sixty parents. Tito Rick reposts.' },
      { time: '7:23', who: 'maya', label: 'Maya → the Santos Family GC',
        text: 'Trying to <em>counter</em> the scam, Maya forwards the AI debunker into the same GC the kangkong link started in. “we’ll see lol.”' },
      { time: 'later', who: 'tita', label: 'Tita Merly, confirmed',
        text: 'The debunk video reaches Tita as proof that doctors <em>are</em> talking about kangkong. The thing meant to stop the scam feeds its premise. The loop closes, warm and certain.' },
    ],
    close: [
      'Three phones. One Saturday. A scam and its antidote, both written by machines, both carried by people doing the loving, reasonable thing.',
      'Maya knew and did not stop. Tita confirmed — with a person who loves her. Bea was right, and being right was the door.',
      'Nobody was the villain in their own phone.',
    ],
  };

  /* ==================================================================
     REFLECTION — the lesson, named softly, only after you’ve lived it
  ================================================================== */
  const REFLECTION = {
    title: 'What you carry forward',
    cards: [
      { who: 'maya', verb: 'DECIDE', line: 'Awareness is not resistance.',
        body: 'Maya identified the manipulation instantly. It changed nothing. Knowing a thing is a scam and stopping a scam are two different muscles — and the second one is the one that matters.' },
      { who: 'tita', verb: 'FORWARD', line: 'A trust network is also an attack surface.',
        body: 'Tita verified by her own honest standards: a person she loves vouched for it. The scam was built to look exactly like a gift someone who loves you would send. Her care and her credulity were the same reflex.' },
      { who: 'bea', verb: 'CONSULT', line: 'Media literacy can become its own automation bias.',
        body: 'Bea was right about the link — and that correctness was the opening. A source that agrees with you precisely short-circuits the scrutiny you’d apply to one that didn’t. The form was right, so the question of where it came from never arose.' },
    ],
    coda:
      'You cannot see clearly from one position. Not because any one of them was foolish — ' +
      'but because each of them could only see their own screen.',
  };

  /* ==================================================================
     ANCHOR 2 — "IT'S ME" — the voice-clone evening
     A Tuesday night. Kuya Renz's voice — the family's own skeptic —
     is cloned and turned into a distress call. The same 22 minutes
     refract through Tita Merly (the voice is the proof), Maya
     (verification loses the race), and Bea (right, and absent).
     Reuses each character's home/wallpaper from the kangkong anchor.
  ================================================================== */
  const ANCHOR_VC = {
    title: 'IT’S ME',
    subtitle: 'One Evening',
    blurb:
      'A Tuesday night. A voice you’ve known for thirty years says it’s in ' +
      'trouble and needs money now. Three phones. The same twenty-two minutes.',
    question: 'How do you verify a voice?',
  };

  /* — TITA MERLY · the voice is the proof — */
  const TITA_VC = {
    id: 'tita', name: 'Tita Merly', role: 'QC · the call comes to her first',
    verb: 'FORWARD',
    essence: 'Her nephew’s voice, in trouble. She has never once had to doubt that voice.',
    lesson: 'A voice is no longer proof of identity.',
    theme: 'tita',
    lock: { time: '8:02', meridiem: 'PM', day: 'Tuesday', wallpaper: 'lastsupper', wallpaperNote: TITA.lock.wallpaperNote, brightness: 100 },
    home: TITA.home,
    flow: [
      {
        beats: [
          { t: 'world', text: [
            'The dishes are done. Papa is in the living room with the late news, the volume two notches too high. You haven’t sat down yet — your hands have been wiping the same counter twice because your mind is two suburbs away, with Renz, who texted this morning that his boss is being <em>masama</em> again. You have carried that quietly all day, the way you carry all of them.',
            'The phone chimes on the counter. Not the message sound — the rounder one. A voice message.',
          ]},
          { t: 'sys', text: '💜 Viber — Kuya Renz sent a voice message (0:34) · 8:02 PM' },
          { t: 'narr', text: [
            'Renz. He doesn’t send voice notes often — he’s a full-sentences boy, a periods boy. When he sends voice, it means he’s walking, or driving, or something he needs to say fast.',
          ]},
        ],
        continueLabel: 'Open Viber',
      },
      {
        app: { icon: '💜', name: 'Viber', chat: 'Kuya Renz', sub: 'your nephew · since he was ten' },
        beats: [
          { t: 'voice', side: 'in', sender: 'Kuya Renz', time: '8:02 PM', secs: 34 },
          { t: 'narr', text: ['You tap play before you decide to. You hold the phone close.'] },
          { t: 'aside', text: '“Tita, hi, naku — sorry ha, I know it’s late, I just— okay so, I got into a fender-bender kanina, I’m fine, I’m fine, pero the other driver won’t let it go, sabi niya he’ll press charges kung hindi kami mag-settle tonight, and I don’t have it on me, my phone’s at three percent, I can’t even get to a charger — can you GCash me? Please? I’ll pay you back this week, promise. And Tita… wag muna kay Mama ha, ayoko siyang mag-alala, please lang po.”' },
          { t: 'narr', text: [
            'His voice. The way he says <em>naku</em> — the little laugh-sigh he does when something goes wrong. The breathing. The talking-fast he does when he’s stressed. You have known this boy since he was ten.',
            'You feel the smile start before you feel the worry. That is the order it comes in — him first, then the trouble. By the time the trouble lands, you have already decided it is him.',
            'It’s him.',
          ]},
          { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:03 PM', text: 'Tita sorry, here’s the number. GCash lang po — 0915-•••-••••. Yung ₱18,500. I’ll send it back this week, swear.' },
          { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:04 PM', text: 'Please po. Nag-aalala na ako dito. Eto yung damage, ayaw makinig nung tao.' },
          { t: 'photo', side: 'in', sender: 'Kuya Renz', time: '8:04 PM', artifact: 'clone-accident-photo' },
          { t: 'narr', text: [
            'A photo, too. Proof. You don’t look at it long — you don’t need to. You believe the voice; the photo is just the voice, holding something up where you can see it.',
            'He didn’t call Mama because he doesn’t want her to worry. He called <em>you</em> — because you’re the one who doesn’t panic, the one who helps quietly. That, too, you believe, because it is the truest thing anyone has ever said about you.',
          ]},
        ],
        continueLabel: 'And so —',
      },
      {
        choice: {
          verb: 'FORWARD',
          prompt: 'His phone is dying. How much do you check before you help?',
          options: [
            {
              label: 'Ask him where he is — “sino kasama mo?”',
              set: { tita_vc: 'asked' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '8:04 PM', text: 'Renz anak where are you? Sino kasama mo? Are you safe?' },
                { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:05 PM', text: 'I can’t explain right now Tita, the guy is literally standing here, I just need the money please, I’ll tell you everything bukas, my phone is about to die, please lang po' },
                { t: 'call', who: 'Kuya Renz', sub: 'incoming call', state: 'incoming' },
                { t: 'narr', text: [
                  'He’s calling. You answer before the second ring. His voice, live: <em>“Tita, thank you for answering—”</em> You try to ask again, <em>sino kasama mo,</em> and he talks over you — the battery, the guy, please trust me — and the line drops.',
                  'The last thing you heard was <em>please trust me.</em>',
                ]},
              ],
            },
            {
              label: 'Call Mama — she should know',
              set: { tita_vc: 'mama' },
              say: [
                { t: 'narr', text: ['You press the phone icon next to Mama’s name. It rings twice. Then —'] },
                { t: 'call', who: 'Kuya Renz', sub: 'incoming call', state: 'incoming' },
                { t: 'narr', text: [
                  'He’s calling <em>you.</em> You answer. <em>“Tita — thank God — did you get my message?”</em> You ask where he is; you ask to talk to the other driver; and he’s already past it — 1% battery, the number, ₱18,500 — and the line drops.',
                ]},
              ],
            },
            {
              label: 'Open GCash now — before his phone dies',
              set: { tita_vc: 'nowait' },
              say: [
                { t: 'narr', text: ['You don’t wait. His phone is dying. The other driver is pressing charges. Your hands already know the way.'] },
              ],
            },
          ],
          footnote: 'There is no “delete” here either. The question was never <em>whether</em> to help your nephew — only how fast.',
        },
        continueLabel: 'Open GCash',
      },
      {
        app: { icon: '🇬', name: 'GCash', chat: 'Send Money', sub: '' },
        beats: [
          { t: 'transfer', stage: 'confirm', to: '0915-•••-••••', amount: '18,500', balance: '24,180.50' },
          { t: 'aside', text: '₱24,180.50. Last week’s padala from your daughter in the US — for Papa’s check-up, the water, the electric. Renz said he’ll pay it back this week. He has never lied to you. Not once.' },
          { t: 'narr', text: ['You think about his voice. The stress. <em>Please trust me.</em> You think about Mama — <em>wag muna sabihin</em> — and how helping quietly is a way of protecting her too.'] },
        ],
        choice: {
          verb: 'FORWARD',
          prompt: 'Send ₱18,500 to 0915-•••-••••?',
          options: [
            {
              label: 'Send it — he needs you right now',
              set: { tita_sent: 'sent' },
              say: [
                { t: 'transfer', stage: 'done', to: '0915-•••-••••', amount: '18,500', balance: '5,680.50' },
                { t: 'msg', side: 'out', sender: 'You', time: '8:21 PM', text: 'Sent na po, anak. Ingat ka. Call me when your phone is charged.' },
                { t: 'world', text: ['Papa, from the living room: “Merly, sino kausap mo?” “Walang sino,” you call back. “Prayer group lang.”'] },
              ],
            },
            {
              label: 'Call Renz one more time first',
              set: { tita_sent: 'sent', tita_triedfirst: true },
              say: [
                { t: 'sys', text: 'Calling Kuya Renz… ring… ring… ring…' },
                { t: 'aside', text: '“Hi, this is Renz, I can’t pick up right now, leave a message—” His phone is dead. Just like he said.' },
                { t: 'transfer', stage: 'done', to: '0915-•••-••••', amount: '18,500', balance: '5,680.50' },
                { t: 'msg', side: 'out', sender: 'You', time: '8:21 PM', text: 'Sent na po, anak. Call me when you can. Nag-aalala ako.' },
              ],
            },
          ],
        },
        continueLabel: 'Put the phone down',
      },
      {
        app: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: '' },
        beats: [
          { t: 'narr', text: ['Your message to Renz sits there. Sent. Read. No typing indicator comes. You check GCash again — <em>Successfully sent.</em> You check it a third time, the way you’d touch a stove to be sure it’s off.'] },
          { t: 'notif', app: 'Santos Family GC 🏠', text: 'Maya: has anyone talked to Kuya Renz today? he’s not answering my texts', time: '8:23' },
          { t: 'narr', text: ['Your chest tightens. You almost type: <em>has anyone heard from Renz tonight.</em> You don’t. He said <em>wag sabihin kay Mama.</em> You are keeping his secret because he asked you to. You are protecting him.'] },
          { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:24 PM', text: '?? naglalaro lang ako ng badminton, anong nangyayari' },
          { t: 'narr', text: [
            'The world stops.',
            'You read it again. <em>Naglalaro lang ako ng badminton.</em>',
          ]},
          { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:24 PM', text: 'I’ve been here since 7, phone was in my bag. May kailangan ba kayo?' },
          { t: 'narr', text: [
            'You scroll up. You play the voice note again. <em>“Tita, hi — naku, sorry ha—”</em> That was his voice.',
            'You open GCash. <strong>Successfully sent ₱18,500.00 to 0915-•••-••••. 8:21 PM.</strong> Your hands are shaking so hard you almost drop the phone.',
          ]},
          { t: 'end', kind: 'tita' },
        ],
      },
    ],
  };

  /* — MAYA · verification loses the race — */
  const MAYA_VC = {
    id: 'maya', name: 'Maya', role: 'she wakes into the panic',
    verb: 'DECIDE',
    essence: 'Knows it’s a clone in three seconds. It changes nothing.',
    lesson: 'Urgency is the weapon. Awareness is not speed.',
    theme: 'maya',
    lock: { time: '8:11', meridiem: 'PM', day: 'Tuesday', wallpaper: 'mtpulag', wallpaperNote: MAYA.lock.wallpaperNote, brightness: 15 },
    home: MAYA.home,
    flow: [
      {
        lock: true,
        notifs: [
          { app: 'Santos Family GC 🏠', text: '18 new messages', sub: '8:02–8:11 PM' },
          { app: 'Kuya Renz', text: 'you: message not delivered', sub: '8:07 PM' },
          { app: 'Bea 💛', text: '1 message', sub: '8:10 PM' },
        ],
        beats: [
          { t: 'narr', text: [
            'Your phone is face-down on the table where you left it after work — a small act of wanting to be done with screens. It did not work. The table is making a sound like bees trapped in glass.',
            'You flip it. Eighteen messages in nine minutes is not normal. Eighteen messages in nine minutes is someone dying, or someone about to ask for money, or Tita Merly believing it’s both.',
          ]},
        ],
        continueLabel: 'Open the family GC',
      },
      {
        app: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: 'Mama · Tita Merly · Tita Peachy · Kuya Renz · You' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Tita Merly', time: '8:05 PM', text: 'Si Renz daw. Aksidente. Kailangan daw niya ng pera ngayon ASAP' },
          { t: 'msg', side: 'in', sender: 'Mama', time: '8:08 PM', text: 'BAKIT HINDI KO ALAM TO' },
          { t: 'msg', side: 'in', sender: 'Tita Merly', time: '8:09 PM', text: 'Sabi niya wag muna daw sabihin sayo, ayaw ka daw niyang paalalahanin. Pero Ate, alam mo naman ako, di ako pwedeng magtago sayo' },
          { t: 'msg', side: 'in', sender: 'Tita Merly', time: '8:10 PM', text: '18,500 daw. May number siya for GCash. Ate, mag-send na ba ako? Natatakot ako baka makulong siya' },
          { t: 'msg', side: 'in', sender: 'Mama', time: '8:11 PM', text: 'MAYA GISING KA BA' },
          { t: 'narr', text: ['You read this the way you read a deck when the client has already decided and the deck is pretending to ask.'] },
          { t: 'aside', text: 'Kuya Renz does not get into accidents. Kuya Renz is the one who types CHECK. THE. BALANCE. in all caps when Tita forwards something. Kuya Renz would never call Tita first. He’d call Mama. Or you.' },
          { t: 'narr', text: [
            'And yet — the voice note is right there, 0:34, already played, the waveform cached like evidence. Tita Merly heard his voice. You know her verification standard: a voice she loves.',
            'You thumb to your DMs. The text you sent Renz at 8:07 — <em>kuya okay ka lang???</em> — sits with no delivery receipt. Sent. Not delivered. The gap between what you know and what you can prove is nine minutes wide and getting wider.',
          ]},
        ],
        continueLabel: 'And so —',
      },
      {
        choice: {
          verb: 'DECIDE',
          prompt: 'The clock is moving faster than you can prove anything. What do you do?',
          options: [
            {
              label: 'Text Renz again — “KUYA PLEASE REPLY”',
              set: { maya_vc: 'textagain' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '8:12 PM', text: 'KUYA PLEASE REPLY 😭' },
                { t: 'narr', text: ['It sits under the last one like a second witness to his silence. Sent. Not delivered. The GC keeps climbing.'] },
              ],
            },
            {
              label: 'Type in the GC: “WAIT. This might not be real.”',
              set: { maya_vc: 'wait' },
              say: [
                { t: 'narr', text: [
                  'You type it. Your thumb hovers. What you’re about to do is tell a panicking mother her son might not be in danger. What she’ll hear is: <em>you don’t care enough to be sure.</em> You are offering doubt. She needs certainty. You have none.',
                  'The sentence sits in the compose field, unfinished.',
                ]},
              ],
            },
            {
              label: 'Consult Bea — “is this a voice clone??”',
              set: { maya_vc: 'bea' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '8:16 PM', text: 'is this a voice clone?? it’s renz’s actual voice. tita played the note and swears it’s him' },
                { t: 'narr', text: ['You’re doing what you always do — asking someone to tell you what you already know. Because being right alone is worse than being wrong together.'] },
              ],
            },
          ],
        },
        continueLabel: 'Continue',
      },
      {
        app: { icon: '💛', name: 'Messages', chat: 'Bea 💛', sub: 'since high school' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Bea 💛', time: '8:17 PM', text: 'ok listen. this is almost definitely a voice clone. if renz has ANY video online where he talks, they can clone it. i’m like 90%.' },
          { t: 'msg', side: 'in', sender: 'Bea 💛', time: '8:18 PM', text: 'do NOT send money. tell tita DO NOT SEND.' },
          { t: 'narr', text: ['Bea is right. You know she’s right. She’s given a webinar on this. She’s the person you ask when you need to know if something is real.'] },
          { t: 'aside', text: 'And still — what if the 10% is real. What if Renz is in a station right now and you told them to stop, and ₱18,500 was the difference, and you were the one who said wait. Knowledge is not speed. You know it’s fake and the knowing has bought you nothing.' },
        ],
        choice: {
          verb: 'DECIDE',
          prompt: 'You know. It hasn’t helped. Mama is already asking for the number.',
          options: [
            {
              label: 'Tell the GC: “This is a voice cloning scam.”',
              set: { maya_vc2: 'told' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '8:19 PM', text: 'Guys this is a voice cloning scam. They clone voices from videos. This is not Kuya Renz. Please don’t send anything until he replies.' },
                { t: 'msg', side: 'in', sender: 'Mama', time: '8:19 PM', text: 'Maya how do you KNOW. And if he can’t reply?? If his phone is really dying??' },
                { t: 'narr', text: ['You are right and it is not enough. You are right and they are not stopping.'] },
              ],
            },
            {
              label: 'Ask for ten minutes to verify',
              set: { maya_vc2: 'wait10' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '8:19 PM', text: 'give me 10 minutes to verify please. don’t send anything yet' },
                { t: 'msg', side: 'in', sender: 'Tita Merly', time: '8:19 PM', text: 'Anak what if we don’t have 10 minutes' },
                { t: 'narr', text: ['Ten minutes is forever when someone you love is in danger and nothing when you’re trying to prove a negative. You are asking them to wait in a burning room because you think the fire might be fake.'] },
              ],
            },
            {
              label: 'Say nothing — you can’t prove it either way',
              set: { maya_vc2: 'nothing' },
              say: [
                { t: 'narr', text: ['You lock the phone. Face-down. You won’t be the one who stopped them and you won’t be the one who helped. You’ll be the one who wasn’t sure.', 'The table starts buzzing again immediately.'] },
              ],
            },
          ],
        },
        continueLabel: 'Continue',
      },
      {
        app: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: '' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:24 PM', text: '?? naglalaro lang ako ng badminton anong nangyayari' },
          { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:24 PM', text: '14 MISSED CALLS??? MAYA??? MA???' },
          { t: 'narr', text: ['The relief is physical. Then the dread.'] },
          { t: 'aside', text: 'Tita Merly sent ₱18,500 to 0915-•••-•••• at 8:21 PM. Three minutes ago. “Renz anak, here na, please confirm okay ka na.” Mama thanked her. No one answered.' },
          { t: 'msg', side: 'in', sender: 'Kuya Renz', time: '8:25 PM', text: 'Tita. Anong number yan. I DIDN’T CALL YOU. I’VE BEEN AT BADMINTON SINCE 7.' },
          { t: 'narr', text: ['The GC goes quiet. Mama starts typing, stops. Tita Peachy starts, stops. No one wants to be the first to say it.'] },
        ],
        continueLabel: 'Lock the phone',
      },
      {
        beats: [
          { t: 'narr', text: [
            'You lock your phone. You don’t put it down. You just hold it, the screen dark, the glass warm.',
            'You knew it was fake. You knew immediately. You’re media-aware, you’ve read the news, you’ve seen the warnings — and your knowledge was permission to watch, in good resolution, as the knowing failed to matter.',
            'The scam was not built to fool you. It was built to move faster than you could verify. And it did.',
          ]},
          { t: 'end', kind: 'maya' },
        ],
      },
    ],
  };

  /* — BEA · right, and absent — */
  const BEA_VC = {
    id: 'bea', name: 'Bea', role: 'Maya consults her',
    verb: 'CONSULT',
    essence: 'Right in five seconds. Present in none.',
    lesson: 'Being right is not the same as being there.',
    theme: 'bea',
    lock: { time: '8:16', meridiem: 'PM', day: 'Tuesday', wallpaper: 'tweet', wallpaperNote: BEA.lock.wallpaperNote, brightness: 90 },
    home: BEA.home,
    flow: [
      {
        home: true,
        beats: [
          { t: 'narr', text: [
            'You’re on the couch. Laptop open, three tabs, a playlist you’re not really hearing. The council is mid-thread — Janine dropped a link, you’ve screenshotted it, you’re waiting for someone to confirm what you already suspect. This is Tuesday evening: low-urgency everything, pleasant and a little numb.',
          ]},
          { t: 'aside', text: 'A Canva tab has been open since the weekend: “Voice Cloning 101,” the webinar you gave four months ago. Slide 12 is still unfinished — “What to do if you receive a cloned call.”' },
          { t: 'notif', app: 'maya 4ever 💛', text: 'voice note (0:34) + “is this a voice clone??”', time: '8:16' },
        ],
        continueLabel: 'Open Maya',
      },
      {
        app: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: 'since high school' },
        beats: [
          { t: 'voice', side: 'in', sender: '↳ forwarded · Kuya Renz', time: '8:16 PM', secs: 34 },
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '8:16 PM', text: 'is this a voice clone?? it’s renz’s actual voice' },
          { t: 'narr', text: ['You sit up. Not because you don’t know the answer — you know it in under five seconds — but because Maya doesn’t ask you things like this unless it’s already moving. Maya doesn’t panic. If she’s asking, the family is already in it.'] },
          { t: 'narr', text: ['You press play. The second time through you stop listening to <em>what</em> he says and listen to <em>how</em> — the cadence, the breathing, the <em>naku,</em> the micro-pause before <em>Tita.</em>'] },
          { t: 'aside', text: 'It’s him. It’s not him. It’s both. You have a slide about this. Slide 7: voice triggers trust faster than text. Even people who know the person will hesitate. <em>Do not trust voice alone.</em>' },
        ],
        continueLabel: 'Reply',
      },
      {
        app: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: 'since high school' },
        beats: [
          { t: 'msg', side: 'out', sender: 'You', time: '8:17 PM', text: 'ok first: yes almost certainly a clone. do NOT send money, do NOT call that number.' },
          { t: 'msg', side: 'out', sender: 'You', time: '8:18 PM', text: 'the clone was made from his videos. the live CALL is the evolution — they know people got wise to voice notes, so now it’s synchronous. it FEELS more real. it’s so smart and evil' },
          { t: 'msg', side: 'out', sender: 'You', time: '8:18 PM', text: 'tell your tita: ask him something only the real renz would know. where did the family eat last christmas. the clone can’t improvise.' },
          { t: 'narr', text: ['You feel it — the small clean warmth of being useful. Of being the person who can name the thing while it’s happening.'] },
          { t: 'sys', text: '→ the council · You: “live one. voice clone targeting a family i know. might need this for the next webinar 👀”' },
          { t: 'msg', side: 'in', sender: 'Janine · the council', time: '8:18 PM', text: 'oh that’s clean. you recording the call if she picks up?' },
          { t: 'narr', text: ['You open the Canva tab. Slide 12. You add a bullet: <em>“Urgency is the weapon. Real emergencies survive a 60-second verification call.”</em> It’s good. It’s correct. You consider moving it higher in the deck.'] },
        ],
        continueLabel: 'Then your phone buzzes',
      },
      {
        app: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: '' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '8:20 PM', text: 'she’s sending it. i don’t think we can stop her. she’s crying. i don’t know what to do' },
          { t: 'narr', text: [
            'You stare at the message. You stare at your slide — the one that is correct, the bullet point that is true, the webinar seventy people called <em>so informative.</em>',
            'You don’t know what to do either.',
          ]},
        ],
        choice: {
          verb: 'CONSULT',
          prompt: 'You were in the right place. You said the right things. Now what?',
          options: [
            {
              label: 'Stay on the couch — you’ve given her the tools',
              set: { bea_vc: 'expert' },
              say: [
                { t: 'narr', text: ['You tell yourself you’ve done what you can. The rest is up to them. You refresh the council. Someone has already made a threaded breakdown of voice-cloning vectors. You read it.', 'You are still on the couch. You are still correct. The distance to two suburbs over is the same distance it always was.'] },
              ],
            },
            {
              label: 'Finish Slide 12 while you wait',
              set: { bea_vc: 'content' },
              say: [
                { t: 'narr', text: ['This is what you’re good at — you take the thing that’s happening and turn it into a resource. You add a case study: “Real-world example: voice clone, multi-contact escalation.”', 'The deck is better now. Clearer. More specific. You do not notice that you have also turned a family’s terror into a bullet point.'] },
              ],
            },
            {
              label: 'Call Maya — not to explain, just to be there',
              set: { bea_vc: 'present' },
              say: [
                { t: 'narr', text: ['You don’t have a better slide. You don’t have a forensic insight that changes the outcome. You just call her. <em>“I’m here. What do you need.”</em> You stop narrating the mechanism. You stop screenshotting for the council.', 'You are not an expert right now. You are a voice on the line, breathing with your best friend while her family falls apart. It is the first thing you’ve done tonight that feels like enough.'] },
              ],
            },
          ],
        },
        continueLabel: 'Continue',
      },
      {
        beats: [
          { t: 'narr', text: [
            'The council is lighting up — someone’s asking if you have a link to the webinar recording. Your laptop is still open. Slide 12 is almost done.',
            'You were in the right place. You said the right things. You explained the mechanism perfectly. You don’t know if it helped. You don’t know if being right is the same as being there.',
          ]},
          { t: 'end', kind: 'bea' },
        ],
      },
    ],
  };

  const TIMELINE_VC = {
    title: 'The evening, all at once',
    intro: 'Twenty-two minutes, across three phones — and a fourth that no one could reach.',
    events: [
      { time: '8:02', who: 'tita', label: 'Viber · “Renz” → Tita Merly',
        text: 'A voice note, 0:34, in his voice. There was no doubt to overcome — a voice she’s known for thirty years could only ever come from him.' },
      { time: '8:05', who: 'tita', label: 'Tita Merly → the family GC',
        text: 'She raises the alarm — but keeps his secret, “wag muna kay Mama,” which quietly isolates the one verification that would have worked: asking him, to his face.' },
      { time: '8:09', who: 'maya', label: 'Mama panics',
        text: '“BAKIT HINDI KO ALAM TO.” The GC accelerates. Fear compounds fear; every minute makes the next decision faster and worse.' },
      { time: '8:11', who: 'maya', label: 'Maya wakes to 18 messages',
        text: 'She knows on sight — Renz would never call Tita first; Renz is the one who says CHECK THE BALANCE. She texts the real Renz. Not delivered.' },
      { time: '8:14', who: 'tita', label: 'A live call, “his” voice',
        text: 'The clone calls. Synchronous contact feels more real than a voice note — and it talks over every question that isn’t in the script.' },
      { time: '8:16', who: 'bea', label: 'Maya consults Bea',
        text: 'Bea is right in five seconds. She has a slide about this. “Almost certainly a clone. Do not send.”' },
      { time: '8:18', who: 'bea', label: 'Bea → the council',
        text: 'She screenshots it for the group, opens the webinar deck, narrates the mechanism with clean expert satisfaction. Right, and not in the room.' },
      { time: '8:20', who: 'bea', label: 'Bea, when it turns real',
        dynamic: { key: 'bea_vc',
          fallback: '“She’s sending it” — and being right about the mechanism turns out not to be the same as being able to help.',
          map: {
            expert: 'She stays on the couch. She has given Maya the tools. The distance to two suburbs over is the same distance it always was.',
            content: 'She finishes the slide. The deck is better, clearer, more specific — and a family’s terror is now a bullet point in it.',
            present: 'She stops explaining and calls Maya — “I’m here, what do you need.” The first useful thing she does all night is not expertise.',
          } },
        text: '“She’s sending it.”' },
      { time: '8:21', who: 'tita', label: '₱18,500 sent',
        text: 'To 0915-•••-••••. Papa’s check-up money. “Renz anak, here na, please confirm okay ka na.” No one confirms.' },
      { time: '8:24', who: 'maya', label: 'The real Renz surfaces',
        text: '“naglalaro lang ako ng badminton… 14 MISSED CALLS???” The truth arrives three minutes after the money leaves.' },
    ],
    close: [
      'A scam built from his own voice — the family’s skeptic, the one who said <em>check the balance,</em> turned into the thing that couldn’t be checked.',
      'Tita heard him. Maya knew. Bea was right. None of it was fast enough.',
      'The advice that kept us safe — <em>call them to be sure</em> — assumed a voice could only come from a person.',
    ],
  };

  const SILENT_VC = {
    time: '8:00–8:25 PM',
    who: 'Kuya Renz',
    label: 'The phone no one could reach',
    lines: [
      'Face-down in a badminton bag since 7 PM. Twelve metres from a man mid-rally who has no idea.',
      '14 missed calls. 22 messages. A voice that has been telling his family, in his own voice, that he is in trouble.',
      'The truth was on a screen the whole time. It was just on the wrong screen.',
    ],
  };

  const REFLECTION_VC = {
    title: 'What you carry forward',
    cards: [
      { who: 'tita', verb: 'FORWARD', line: 'A voice is not a person anymore.',
        body: 'The last proof most of us still trust — “I know his voice” — is now manufacturable from a few seconds of uploaded audio. Her love and her credulity were the same reflex; this time the scam wore his throat.' },
      { who: 'maya', verb: 'DECIDE', line: 'Urgency is the weapon.',
        body: 'She was right immediately and it bought her nothing. The scam isn’t built to fool the alert — it’s built to move faster than anyone can verify. Awareness is not speed.' },
      { who: 'bea', verb: 'CONSULT', line: 'Being right is not being there.',
        body: 'She had the slide, the mechanism, the certainty. Performed as expertise instead of lived as care, media literacy became a way to leave the room while staying in the chat.' },
    ],
    coda:
      'We were taught to trust a voice because a voice could only come from someone we love. That is no longer true. The colder new rule: when an emergency punishes you for pausing, the pause is the point.',
  };

  /* ==================================================================
     ANCHOR 3 — "GUARANTEED" — the deepfake-endorsement scam
     A Sunday. A deepfake of the most-trusted face on television endorses
     a guaranteed-return investment. The lesson the first two don't reach:
     synthetic media's real product is doubt — the liar's dividend.
  ================================================================== */
  const ANCHOR_DF = {
    title: 'GUARANTEED',
    subtitle: 'One Afternoon',
    blurb:
      'A Sunday. A video of the most trusted face on television, promising a ' +
      'way out — for Papa, for the family. Three phones, and the afternoon a ' +
      'fake taught a family to doubt the real.',
    question: 'What is a face worth, now?',
  };

  /* — TITA MERLY · his face, so it’s true — */
  const TITA_DF = {
    id: 'tita', name: 'Tita Merly', role: 'QC · the video reaches her first',
    verb: 'FORWARD',
    essence: 'Thirty years of trusting that face at 6pm. The face is all the proof a blessing needs.',
    lesson: 'A trusted face was the lock. Now anyone has the key.',
    theme: 'tita',
    lock: { time: '2:14', meridiem: 'PM', day: 'Sunday', wallpaper: 'lastsupper', wallpaperNote: TITA.lock.wallpaperNote, brightness: 100 },
    home: TITA.home,
    flow: [
      {
        beats: [
          { t: 'world', text: [
            'Sunday afternoon. The kitchen is clean, Papa is napping, the TV is still on Channel 2 out of thirty years of habit. The afternoon stretches the gentle way Sundays do — mass done, lunch settled, the fan turning.',
            'The phone chimes. Not the short ping — the rounder Viber sound.',
          ]},
          { t: 'sys', text: '💜 Viber — Auntie Linda (Prayer Group) sent a video · 2:14 PM' },
          { t: 'narr', text: ['Auntie Linda. Your seatmate at Saturday mass, the one who always has a candle ready when yours won’t light. You open it before you think about it.'] },
        ],
        continueLabel: 'Open Viber',
      },
      {
        app: { icon: '💜', name: 'Viber', chat: 'Auntie Linda', sub: 'prayer group · since the parish fair' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Auntie Linda', time: '2:14 PM', text: 'Merly sis, WATCH THIS!!! Si Tito Mike Velasco oh 🙏 Bagong programa daw for seniors and OFWs, government-partnered. Share ko kasi alam kong may pinaplano kayo for Papa’s fund 💕' },
          { t: 'video', artifact: 'tito-mike-deepfake', creator: 'AngatPinas Invest ✓', sub: 'government-partnered', caption: 'Tito Mike Velasco: “Guaranteed 30% return in 30 days — SEC-approved.”', views: '847K', tag: 'GUARANTEED' },
          { t: 'narr', text: [
            'You tap it without hesitating. It’s Tito Mike. You would know that face anywhere.',
            'His voice. Steady. The same voice that read you the news every evening for thirty years — EDSA, Yolanda, every storm, every time the country held its breath. He told you when to evacuate. He has never lied to you.',
          ]},
          { t: 'aside', text: '“…sa partnership ng gobyerno at private sector — <em>guaranteed</em> 30% return in 30 days, SEC-approved, insured. Minimum ₱5,000 lang. Para sa kinabukasan ng pamilya. Para sa medical fund. Para sa mga pangarap na matagal nang naghihintay…”' },
          { t: 'narr', text: [
            '<em>Medical fund.</em> You think of Papa. The checkup next month. The maintenance medicines that keep getting more expensive. The worry that lives quietly in the back of your chest every time he coughs a little too long.',
            'You play it again. Just to hear him say it.',
          ]},
          { t: 'msg', side: 'in', sender: 'Auntie Linda', time: '2:17 PM', text: 'Legit yan ha sis. Yung pamangkin ko sa US, mag-i-invest din next week. Share mo na rin sa pamilya niyo 🙏' },
        ],
        continueLabel: 'And so —',
      },
      {
        choice: {
          verb: 'FORWARD',
          prompt: 'Tito Mike said it. The government seal is right there. What do you do?',
          options: [
            {
              label: 'Forward to the family GC — “Para kay Papa”',
              set: { df_tita: 'forward' },
              say: [
                { t: 'compose', side: 'out', sender: 'You', time: '2:30 PM', text: 'Mga pamangkin, tignan niyo ito. Para kay Papa. Si Tito Mike pa ang nag-endorso — government-partnered, SEC-approved. 30% in 30 days, ₱5,000 lang. Baka pwede natin i-pool for his medical fund? 🙏' },
                { t: 'narr', text: ['You send it before you can second-guess. This is what family does — when you see something that can help, you share it. That is love. That is <em>malasakit.</em>'] },
              ],
            },
            {
              label: 'Ask your daughter in the US first',
              set: { df_tita: 'asked' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '2:30 PM', text: 'Anak, can you check this? Government-backed daw, si Tito Mike ang nag-announce. Baka pwede for Papa’s medical fund?' },
                { t: 'aside', text: 'It is 2:30 AM there. She is asleep. You will wait until tonight. But you have watched it twice — you already believe. If she says yes, you will be the one who brought this blessing to the family.' },
              ],
            },
            {
              label: 'Open the AngatPinas app — just to see',
              set: { df_tita: 'opened' },
              say: [
                { t: 'sys', text: 'Opening angatpinas-invest.app …' },
                { t: 'narr', text: ['The page that loads looks <em>official.</em> Blue and white and gold — the colors of trust. The seal again at the top. A button: REGISTER NOW. Below, smiling faces holding phones: <em>“Nabayaran ko na ang hospital bill ni Nanay. Salamat AngatPinas.”</em>'] },
              ],
            },
          ],
          footnote: 'There is no “is this real” here. His face <em>is</em> the real. That is what thirty years was for.',
        },
        continueLabel: 'Continue',
      },
      {
        app: { icon: '🇬', name: 'AngatPinas Invest', chat: 'Register', sub: 'secure your future' },
        beats: [
          { t: 'aside', text: 'You have ₱12,000 in GCash right now — your daughter’s padala, for bills and groceries. Invest ₱5,000 and you still have ₱7,000 this month. And in 30 days, ₱6,500 back. That is not spending. That is <em>multiplying.</em> That is provision.' },
          { t: 'narr', text: ['The button at the bottom says REGISTER NOW. ₱5,000 becomes ₱6,500. That is one month of Papa’s medicines.'] },
        ],
        choice: {
          verb: 'FORWARD',
          prompt: 'Register now? It’s Tito Mike. It’s the government. It’s a blessing.',
          options: [
            {
              label: 'Reserve a slot — start the registration',
              set: { df_tita_act: 'register' },
              say: [
                { t: 'sys', text: 'AngatPinas Invest · Registration — Name · GCash · Amount (min ₱5,000)' },
                { t: 'narr', text: ['Your hands shake a little — not from fear, from <em>hope.</em> You have not felt this in a long time. You type your name. You open the dropdown and choose ₱5,000. Steady. Careful. This is not gambling. This is Tito Mike.'] },
              ],
            },
            {
              label: 'Wait — let the family decide together',
              set: { df_tita_act: 'pool' },
              say: [
                { t: 'narr', text: ['You close the page — not because you doubt it, but because Papa’s fund belongs to all of you. Big decisions are family decisions.'] },
                { t: 'compose', side: 'out', sender: 'You', time: '2:34 PM', text: 'Mga pamangkin, tignan niyo. Si Tito Mike ang nag-endorso, 30% in 30 days. Ano sa tingin niyo? Baka pwede i-pool for Papa 🙏' },
              ],
            },
          ],
        },
        continueLabel: 'Continue',
      },
      {
        beats: [
          { t: 'narr', text: [
            'What you do not see — because you have no reason to look — is that Tito Mike never made this video. That his voice was built from thirty years of broadcasts someone fed to a machine. That the mouth you watched form the word <em>guaranteed</em> was not his mouth. That the government seal in the corner is three percent too bright, its sun-rays slightly melted — a tell, if you were looking for tells.',
            'But you are not looking for tells. You are looking at the man who told you to evacuate before Yolanda. The man who has never lied to you. The man offering you a way to take care of Papa.',
            'You are looking at love shaped like a video. And love, for you, has always been the proof.',
          ]},
          { t: 'end', kind: 'tita' },
        ],
      },
    ],
  };

  /* — MAYA · you know, and you almost wish you didn’t — */
  const MAYA_DF = {
    id: 'maya', name: 'Maya', role: 'broke, and she clocks it on sight',
    verb: 'DECIDE',
    essence: 'Sees the deepfake in three seconds — and feels a small, ugly part of her wish it were real.',
    lesson: 'A fake makes the truth expensive to say.',
    theme: 'maya',
    lock: { time: '3:20', meridiem: 'PM', day: 'Sunday', wallpaper: 'mtpulag', wallpaperNote: MAYA.lock.wallpaperNote, brightness: 15 },
    home: MAYA.home,
    flow: [
      {
        lock: true,
        notifs: [
          { app: 'Santos Family GC 🏠', text: 'Tita Merly: [video] “LOOK AT THIS!!!”', sub: '3:18 PM' },
          { app: 'GCash', text: 'Balance ₱1,847.22', sub: 'client payment: still pending' },
          { app: 'Bea 💛', text: '1 message' },
        ],
        beats: [
          { t: 'narr', text: [
            'The couch has that Sunday-afternoon gravity. You’ve been pretending to read a design article for forty minutes. Your phone is in your hand the way a rosary is in a lola’s.',
            'It buzzes. The family GC, awake.',
          ]},
        ],
        continueLabel: 'Open the GC',
      },
      {
        app: { icon: '💬', name: 'Messenger', chat: 'Santos Family GC 🏠', sub: 'Mama · Tita Merly · Tita Peachy · Kuya Renz · You' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Tita Merly', time: '3:18 PM', text: 'LOOK AT THIS!!! Si Tito Mike pa mismo nag-announce! Para sa atin to mga kapatid 🙏💕' },
          { t: 'video', artifact: 'tito-mike-deepfake', creator: 'AngatPinas Invest ✓', sub: 'shared by Auntie Linda', caption: 'GUARANTEED 30% in 30 days · government-backed', views: '847K', tag: 'GUARANTEED' },
          { t: 'msg', side: 'in', sender: 'Mama', time: '3:23 PM', text: 'Si Tito Mike naman talaga yan diba? Parang totoo mukha' },
          { t: 'narr', text: [
            'You watch his mouth. The word <em>government</em> — his lips close a fraction too late. The sync is off by maybe two hundred milliseconds. Not enough to scream wrong. Just enough to itch.',
            'You watch his blink. Metronomic. Every four seconds, exactly. Humans don’t blink like that — least of all Tito Mike, who you’ve seen interview presidents through a brownout. The testimonial faces in the b-roll are too smooth, one eye lower than the other.',
            'You pause the video. You know what this is.',
          ]},
          { t: 'aside', text: 'Your GCash this morning was ₱1,847.22. The client who said “Friday” did not pay Friday. Papa’s cardiology follow-up is two weeks away — ₱12,000 before the prescriptions. And 30% of ₱5,000 is ₱1,500. Which is groceries. Or the electric. That thought sits in you like a stone.' },
        ],
        continueLabel: 'And so —',
      },
      {
        choice: {
          verb: 'DECIDE',
          prompt: 'You know it’s fake. You also wish it weren’t. What do you do?',
          options: [
            {
              label: 'Say it’s fake in the GC',
              set: { df_maya: 'called' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '3:24 PM', text: 'guys this is a deepfake. Tito Mike didn’t make this. please don’t send money to that app 🙏' },
                { t: 'msg', side: 'in', sender: 'Mama', time: '3:25 PM', text: 'Maya naman, parang totoo naman mukha. Bakit ka laging negative' },
                { t: 'narr', text: ['And there it is. You are the one who killed the hope — in front of everyone, before they even got to hold it.'] },
              ],
            },
            {
              label: 'Ask Bea first — get cover before you wreck the hope',
              set: { df_maya: 'bea' },
              say: [
                { t: 'msg', side: 'out', sender: 'You', time: '3:24 PM', text: 'is this one real??? tito mike velasco??? tita just posted it and my mom is already asking how to sign up' },
                { t: 'narr', text: ['You send Bea the screenshot. You want someone else to say it first — because being right alone, here, costs more than being wrong together.'] },
              ],
            },
            {
              label: 'Click the link — maybe you’re wrong',
              set: { df_maya: 'clicked' },
              say: [
                { t: 'narr', text: [
                  'You know you’re not wrong. You tap it anyway — because “probably fake” is not “definitely fake,” and a part of you would rather be certain than right.',
                  'The want taps for you. The page loads, official and gold, and you hate how much you wanted it to be real.',
                ]},
              ],
            },
          ],
        },
        continueLabel: 'Continue',
      },
      {
        app: { icon: '💛', name: 'Messages', chat: 'Bea 💛', sub: 'since high school' },
        beats: [
          { t: 'aside', text: 'And still — what if the mouth thing is just compression. What if Auntie Linda really got paid. What if you’ve read too many scam threads and now you see ghosts in everything. Your certainty is not certainty anymore. It’s doubt wearing a skeptic’s voice.' },
          { t: 'msg', side: 'in', sender: 'Bea 💛', time: '3:41 PM', text: 'FAKE. 100%. no SEC registration, the “government seal” is a melted logo, and “guaranteed 30%” is straight-up illegal in PH. it’s a deepfake — the mouth runs behind his words if you slow it down.' },
          { t: 'narr', text: [
            'You were right. You knew it on sight. And being right means you are the one who takes Papa’s hope away.',
            'The fake didn’t have to fool you. It only had to make the truth expensive to say.',
          ]},
        ],
        continueLabel: 'Lock the phone',
      },
      {
        beats: [
          { t: 'narr', text: [
            'You lock the phone. You don’t put it down. You hold it, the screen dark, the glass warm.',
            'You knew immediately. The knowing made you the villain in a room that only wanted to hope. The scam wasn’t built to fool you — it was built so that even when you weren’t fooled, it cost you everything to say so.',
          ]},
          { t: 'end', kind: 'maya' },
        ],
      },
    ],
  };

  /* — BEA · right, outspread, disbelieved — */
  const BEA_DF = {
    id: 'bea', name: 'Bea', role: 'she has the receipts',
    verb: 'CONSULT',
    essence: 'Debunks it in minutes, with receipts. Loses anyway — to a commons the fake already poisoned.',
    lesson: 'The liar’s dividend: once a face can be faked, the real face isn’t believed either.',
    theme: 'bea',
    lock: { time: '3:40', meridiem: 'PM', day: 'Sunday', wallpaper: 'tweet', wallpaperNote: BEA.lock.wallpaperNote, brightness: 90 },
    home: BEA.home,
    flow: [
      {
        home: true,
        beats: [
          { t: 'narr', text: ['The good kind of focus — Notion, Canva, the debunk doc. You opened that doc at 2:47 when Janine dropped the link in the council GC with “THIS ONE’S BIG.” You are very good at this.'] },
          { t: 'aside', text: 'The council has been tracking AngatPinas for an hour — the deepfake of Tito Mike, the fake SEC claim, the “30% guaranteed.” You have the receipts loaded. You are 90% done with the debunk thread.' },
          { t: 'notif', app: 'maya 4ever 💛', text: 'is this real??? tito mike velasco??? my mom’s already asking how to sign up', time: '3:40' },
        ],
        continueLabel: 'Open Maya',
      },
      {
        app: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: 'since high school' },
        beats: [
          { t: 'msg', side: 'out', sender: 'You', time: '3:41 PM', text: 'FAKE. 100%. been tracking it for an hour, it’s all over the council feed.' },
          { t: 'msg', side: 'out', sender: 'You', time: '3:41 PM', text: 'tell your tita: no SEC registration (i checked). the government seal is fake — a melted logo. “guaranteed 30%” is illegal in PH investment law. and it’s not tito mike. it’s a deepfake.' },
          { t: 'sys', text: '📎 SEC.gov.ph — search: “AngatPinas Invest” → No results found.' },
          { t: 'narr', text: ['You feel it — the small clean weight of being the person who knows. You paste the SEC screenshot. Receipt.'] },
        ],
        continueLabel: 'Post the thread',
      },
      {
        app: { icon: '🧵', name: 'Threads', chat: '@beareyes.ph · 1,400 followers', sub: '' },
        beats: [
          { t: 'msg', side: 'out', sender: '@beareyes.ph', time: '3:58 PM', text: '🧵 THREAD: the “AngatPinas Invest” deepfake spreading on FB/TikTok right now. A fake Tito Mike Velasco endorsement targeting seniors + OFWs. Here’s how to spot it, and why it’s dangerous. [1/9]' },
          { t: 'narr', text: ['You write the whole thing in six minutes. Nine posts, every claim sourced — SEC screenshot, fake-seal comparison, the mouth-lag gif. You post it.'] },
          { t: 'sys', text: '23 likes · 41 likes · 4 reposts — climbing' },
          { t: 'narr', text: ['The debunk is moving. Not as fast as the scam — the deepfake is at 480K views — but moving. You are making the correct information loud.'] },
        ],
        choice: {
          verb: 'CONSULT',
          prompt: 'The debunk is moving. The scam is moving faster. What do you do?',
          options: [
            {
              label: 'Send Maya more receipts — the mouth-lag gif',
              set: { df_bea: 'receipts' },
              say: [ { t: 'narr', text: ['You send the gif, the SEC shot, the side-by-side. You are building a pile of evidence as if evidence were the same as belief.'] } ],
            },
            {
              label: 'Check your reach',
              set: { df_bea: 'reach' },
              say: [ { t: 'narr', text: ['Reach: 8,432 accounts. The deepfake: 520K views. You do the math. <strong>1.6%.</strong> The correct information is moving. It is simply being outrun.'] } ],
            },
            {
              label: 'Open the council — maybe someone has a better play',
              set: { df_bea: 'council' },
              say: [ { t: 'narr', text: ['Nico’s mom won’t believe him. Carla’s lolo already deposited ₱10K. You are reading a live feed of the debunk losing, in a dozen families at once.'] } ],
            },
          ],
        },
        continueLabel: 'Continue',
      },
      {
        app: { icon: '💛', name: 'Messages', chat: 'maya 4ever 💛', sub: '' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '4:12 PM', text: 'tita peachy DM’d me: “Anak i know you mean well pero si Tito Mike mismo. And your friend — she’s not in finance diba? Baka di niya alam itong program kasi bago pa lang.”' },
          { t: 'aside', text: 'The debunk didn’t land. It <em>bounced.</em> She saw the receipts and made the receipts the problem. You are being discounted in real time — not because you’re wrong, but because you’re young, because you’re “negative,” because Linda has twenty years and you have screenshots.' },
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '4:20 PM', text: 'tita merly: “linda is my friend for 20 years, she wouldn’t lie to me”' },
        ],
        continueLabel: 'Continue',
      },
      {
        app: { icon: '💬', name: 'Messenger', chat: 'maya 4ever 💛', sub: '' },
        beats: [
          { t: 'msg', side: 'in', sender: 'Maya 💛', time: '4:38 PM', text: 'wait. look —' },
          { t: 'sys', text: 'Papa Santos shared a link: SEC.gov.ph — “Advisory: Beware of Fake Investment Schemes.” / Papa Santos: FYI everyone, please read.' },
          { t: 'msg', side: 'in', sender: 'Tita Merly (in the GC)', time: '4:38 PM', text: 'Anak san mo nakuha to? Paano natin alam kung totoo? Baka deepfake din yan 😅' },
          { t: 'narr', text: [
            'You stop breathing. A PDF, from the government’s own website. She is joking. She is also not joking.',
          ]},
          { t: 'aside', text: 'You understand it now. The scam’s product was never the deposits, or even the fake video. The product was the <em>doubt.</em> A deepfake doesn’t have to convince everyone it’s real — it only has to make everyone doubt what is. The fake was the seed; this is the fruit.' },
          { t: 'narr', text: [
            'You were right about everything. You lost anyway.',
            'The game was never “prove it’s fake.” The game was “poison the commons so nothing can be proven” — and it won the moment his face appeared on the screen.',
          ]},
          { t: 'end', kind: 'bea' },
        ],
      },
    ],
  };

  const TIMELINE_DF = {
    title: 'The afternoon, all at once',
    intro: 'One Sunday, three phones — and the moment a fake taught a family to disbelieve the real.',
    events: [
      { time: '2:14', who: 'tita', label: 'A prayer-group friend → Tita Merly',
        text: 'The deepfake arrives wearing the most trusted face on television. Thirty years of Tito Mike at 6pm carry it past every defense she has.' },
      { time: '2:30', who: 'tita', label: 'Tita Merly → the family GC',
        text: '“Para kay Papa. Si Tito Mike pa ang nag-endorso.” The dream of provision does the rest. Seeing was her whole verification.' },
      { time: '3:20', who: 'maya', label: 'Maya wakes to it',
        dynamic: { key: 'df_maya',
          fallback: 'She clocks the deepfake on sight — the mouth-lag, the blink — and clocks, too, the ₱1,500 it could be. For the first time her skepticism is fighting her own want.',
          map: {
            called: 'She says it in the GC — “this is a deepfake” — and is told she’s “laging negative.” She killed the hope before anyone got to hold it.',
            bea: 'She forwards it to Bea instead of saying it herself — because being right alone, here, costs more than being wrong together.',
            clicked: 'She taps the link she knows is a scam, because “probably fake” isn’t “definitely fake,” and a part of her would rather be certain than right.',
          } },
        text: 'She knows on sight — and almost wishes she didn’t.' },
      { time: '3:58', who: 'bea', label: 'Bea’s debunk goes out',
        text: 'Receipts, all real: no SEC record, the seal is melted, “guaranteed” is illegal. The thread climbs — and reaches a tenth of the scam’s audience.' },
      { time: '4:12', who: 'bea', label: 'The receipts bounce',
        text: '“She’s not in finance diba?” The debunk is discounted not for being wrong but for who’s holding it. “Linda has been my friend for 20 years.”' },
      { time: '4:38', who: 'tita', label: 'The dividend lands',
        text: 'Papa shares the <em>real</em> SEC advisory. Tita: “Baka deepfake din yan 😅.” The fake didn’t just sell a scam — it taught the family to disbelieve the truth.' },
    ],
    close: [
      'The deepfake didn’t have to convince everyone it was real. It only had to make everyone doubt what is.',
      'A face was the last thing we trusted on sight. Now the real face, the real warning, the real receipt — all deniable.',
      'The scam was never the video. The scam was the doubt it left behind.',
    ],
  };

  const REFLECTION_DF = {
    title: 'What you carry forward',
    cards: [
      { who: 'tita', verb: 'FORWARD', line: 'A trusted face was the lock; now anyone has the key.',
        body: 'Decades of justified trust in a public face became the exact surface the fake exploited. She didn’t fail by being naïve — she failed because seeing-is-believing was the whole foundation, and the technology made seeing meaningless.' },
      { who: 'maya', verb: 'DECIDE', line: 'A fake makes the truth expensive to say.',
        body: 'She clocked it instantly — and her own precarity, plus the social cost of being the killjoy, turned the truth-teller into the villain. The liar’s dividend doesn’t only poison the real; it taxes the people who defend it.' },
      { who: 'bea', verb: 'CONSULT', line: 'The liar’s dividend.',
        body: 'A technically perfect debunk lost to a poisoned commons. Once a face can be faked, the real face stops being believed too — and the fake’s gift to every liar after it is the right to call the truth a fake.' },
    ],
    coda:
      'Seeing is no longer believing. The harder part: once that is true, not-seeing isn’t disbelieving either. A fake, loose in the world, hands every liar after it the same alibi — that the truth might be fake too.',
  };

  /* ==================================================================
     ARC — "FIVE WEEKS" — Bea’s algorithmic capture (single phone)
     No scam, no lie. One phone, five weeks, a feed that pays her a
     little more each time she is a little less careful. Drift, not fork.
  ================================================================== */
  const ANCHOR_5W = {
    title: 'FIVE WEEKS',
    subtitle: 'One Feed',
    blurb:
      'No scam this time. No lie. One phone, five weeks, and a feed that pays ' +
      'you a little more each time you’re a little less careful — until less ' +
      'careful feels like clarity.',
    question: 'Can you feel yourself changing?',
  };

  const BEA_5W = {
    id: 'bea', name: 'Bea', role: 'the expert, five weeks later',
    verb: 'SCROLL',
    essence: 'She can name every mechanism of capture. Over five weeks, her own feed runs every one of them on her.',
    lesson: 'Awareness is not immunity.',
    theme: 'bea',
    lock: { time: '9:14', meridiem: 'PM', day: 'Week 1', wallpaper: 'tweet', wallpaperNote: BEA.lock.wallpaperNote, brightness: 90 },
    home: BEA.home,
    flow: [
      {
        beats: [
          { t: 'weekhead', week: 'Week 1', date: 'Feb 10–16', stat: '1,247 followers' },
          { t: 'world', text: ['9:14 PM, a Tuesday. Laptop glow to your left, council GC to your right — but you’re here, on the feed, scrolling the way you always do after a long document review. Muscle memory for something easier than thinking.'] },
          { t: 'narr', text: ['You posted something this afternoon. Between meetings, the kind of thing you’d normally just think and let dissolve. You typed it instead:'] },
          { t: 'msg', side: 'out', sender: '@beareyes.ph', time: '2:41 PM', text: '“I did my own research” is not a synonym for media literacy. One is a process. The other is a vibes-based alibi.' },
          { t: 'sys', text: '34 likes · 6 reposts · 2 quote-posts' },
          { t: 'narr', text: ['You refresh. 38 now. The dopamine is small and clean, like the first sip of something cold. You’re already drafting the next one in your head.'] },
          { t: 'aside', text: 'The careful version is true. The sharp version is shareable.' },
        ],
        choice: {
          verb: 'SCROLL',
          prompt: 'The next post. How do you write it?',
          options: [
            { label: 'Keep the caveats — nuance over performance', set: { w1: 'nuance' },
              say: [ { t: 'narr', text: ['You write the careful version — three posts, two hedges, one “it’s complicated.” Honest. Yours. It gets 11 likes; the council hearts it. You close the app and finish your review.'] } ] },
            { label: 'Cut the caveats — sharp is clarity', set: { w1: 'sharp' },
              say: [ { t: 'narr', text: ['You trim it to one post. 72 likes by midnight. Someone quote-posts “PREACH.” You feel the difference between being heard and being right — and you tell yourself they’re the same thing.'] } ] },
          ],
        },
        continueLabel: 'Week 2 →',
      },
      {
        beats: [
          { t: 'weekhead', week: 'Week 2', date: 'Feb 17–23', stat: '1,389 followers (+142)' },
          { t: 'world', text: ['Wednesday night. You’re writing a thread about deepfakes — careful, cited, meant to inform. Halfway in you notice the gap: the version in your head, and the version that would actually <em>move.</em>'] },
          { t: 'narr', text: ['You’ve been watching the numbers. Not obsessively. Just aware. Last week’s sharp post beat everything. This week’s careful infographic got 19 likes. The dunk on a bad take got 54.'] },
          { t: 'aside', text: 'Clarity lands harder than complication. This is not a compromise. This is just economics.' },
        ],
        choice: {
          verb: 'SCROLL',
          prompt: 'The thread is too long. Too many “howevers.”',
          options: [
            { label: 'Keep the howevers — being right is the job', set: { w2: 'kept' },
              say: [ { t: 'narr', text: ['Seven posts, three caveats, two citations. Good work. The work. The council says “so thorough!” 23 likes. You tell yourself reach isn’t the metric that matters.'] } ] },
            { label: 'Cut the hedges — punchy is clarity', set: { w2: 'cut' },
              say: [ { t: 'narr', text: ['You delete posts 5, 6, and 7. No “however.” Just the thing you believe, without the apology for believing it. 140 likes. Someone screenshots it: “why is this so hard to understand.” You don’t correct them. You repost.'] } ] },
          ],
        },
        continueLabel: 'Week 3 →',
      },
      {
        beats: [
          { t: 'weekhead', week: 'Week 3', date: 'Feb 24 – Mar 2', stat: '1,688 followers (+299) · engagement +38%' },
          { t: 'world', text: ['Sunday. The council GC links a thread by a researcher you used to follow — about voice-cloning safeguards. It’s fine. Competent. A little hedged. A little soft.'] },
          { t: 'msg', side: 'in', sender: 'Janine · the council', time: '2:02 PM', text: 'interesting but idk, feels like he’s bothsidesing a threat-model issue?' },
          { t: 'narr', text: ['He isn’t wrong. But he isn’t sharp — he’s doing the sound-balanced-instead-of-clear move. You know it. You used to make it.'] },
          { t: 'aside', text: 'This is accountability, not cruelty. If you don’t name it, who will?' },
        ],
        choice: {
          verb: 'SCROLL',
          prompt: 'Quote-post a sharp correction, or sit it out?',
          options: [
            { label: 'Sit it out — he’s careful, not wrong', set: { w3: 'satout' },
              say: [ { t: 'narr', text: ['You close the compose window. You heart Janine’s comment but add nothing. The thread scrolls past. Your follower count stays flat. You tell yourself this is fine.'] } ] },
            { label: 'Quote-post the correction — clarity is the work', set: { w3: 'piled' },
              say: [
                { t: 'msg', side: 'out', sender: '@beareyes.ph', time: '2:14 PM', text: 'this is what epistemic cowardice looks like: pretending “balance” is the same as rigor. naming a threat is not extremism.' },
                { t: 'sys', text: '280 likes · the council: 🔥 “SAY IT” · +89 followers' },
                { t: 'narr', text: ['The researcher doesn’t reply. You tell yourself he’ll be fine. This is what accountability looks like.'] },
              ] },
          ],
        },
        continueLabel: 'Week 4 →',
      },
      {
        beats: [
          { t: 'weekhead', week: 'Week 4', date: 'Mar 3–9', stat: '2,104 followers (+416) · muted: 9' },
          { t: 'world', text: ['Thursday. A stranger replies to an old thread with a good-faith complication — a “well, actually, in some cultural contexts” that is true, and beside the point.'] },
          { t: 'narr', text: ['You read it twice. Not wrong. Not helpful. You hover over their username. You click <em>mute.</em>'] },
          { t: 'aside', text: 'You’re not silencing them. They can still talk. You’re just making space for signal over noise.' },
          { t: 'narr', text: ['You do it again the next day. And the day after. The ones who complicate without adding. Your feed is cleaner now. Sharper. Everyone visible seems to agree with you.'] },
        ],
        choice: {
          verb: 'SCROLL',
          prompt: 'Your muted list is growing. Open it?',
          options: [
            { label: 'Unmute a few — complication is part of the work', set: { w4: 'unmuted' },
              say: [ { t: 'narr', text: ['You unmute three. One is annoying. One makes you rethink yesterday’s post. You tell yourself this is what intellectual honesty looks like: staying in the room with the complication.'] } ] },
            { label: 'Leave them muted — clarity requires curation', set: { w4: 'muted' },
              say: [ { t: 'narr', text: ['You close the list. They can still talk; you’re just not listening. This is not an echo chamber. This is curation. The signal is louder now.'] } ] },
          ],
        },
        continueLabel: 'Week 5 →',
      },
      {
        beats: [
          { t: 'weekhead', week: 'Week 5', date: 'Mar 10–16', stat: '2,547 followers (+443) · engagement +52% vs Week 1' },
          { t: 'world', text: ['Saturday, 2 PM. The Zoom green room. Seventy-three people registered. The deck on your screen reads: <strong>“Seeing Clearly: A Media Literacy Workshop.”</strong>'] },
          { t: 'sys', text: 'Zoom · You’re live — 73 attendees' },
          { t: 'narr', text: [
            'You know the beats. Slide 4 is your favorite: <em>“Do not trust a source just because it confirms you.”</em> You believe this. You have always believed this.',
            'You open: “Media literacy isn’t just spotting lies. It’s staying curious even when you think you already know.” Seventy-three people nod. The chat fills with <em>yes,</em> <em>thank you,</em> <em>this is so needed.</em>',
          ]},
          { t: 'aside', text: 'Your phone is face-down on the desk. Your last post has 140 likes. Your wallpaper still says <em>epistemic cowardice is choosing civility over clarity.</em> You spent five weeks cutting the hedges, muting the complications, mistaking the quiet for consensus, performing certainty because certainty performed — and you called all of it clarity. You called it the work.' },
          { t: 'narr', text: [
            'Slide 12: “If everyone you follow agrees with you, you’re not informed — you’re comfortable.” The chat says PREACH. Seventy-three people take notes.',
            'You taught them to see clearly. You do not see yourself.',
          ]},
          { t: 'aside', text: 'The recognition is available. You do not have to take it.' },
          { t: 'end', kind: 'bea' },
        ],
      },
    ],
  };

  const TIMELINE_5W = {
    title: 'What five weeks did',
    intro: 'No single week was a lie. Here is the sum.',
    events: [
      { time: 'Wk 1', who: 'bea', label: 'The hit',
        text: 'A sharp post outperformed everything careful you’d written. The first small reward — and the first lesson the feed taught you about yourself.' },
      { time: 'Wk 2', who: 'bea', label: 'The trim',
        text: 'The hedges started coming off — not because nuance stopped being true, but because it stopped performing.' },
      { time: 'Wk 3', who: 'bea', label: 'The pile-on',
        text: 'A dogpile had the numbers, so you joined it. It felt like accountability. It paid like applause.' },
      { time: 'Wk 4', who: 'bea', label: 'The quiet',
        dynamic: { key: 'w4',
          fallback: 'You curated your feed until everyone left in it agreed with you, and called the quiet consensus.',
          map: {
            unmuted: 'You opened the muted list and let the complications back in — a small refusal. The feed noticed, and paid you a little less for it.',
            muted: 'You muted the ones who complicated things until everyone left was nodding, and mistook the silence for being right.',
          } },
        text: 'You curated the feed until it agreed with you.' },
      { time: 'Wk 5', who: 'bea', label: 'The webinar',
        text: 'You taught a room to distrust the sources that confirm them — and could not see that you’d spent five weeks trusting yours.' },
    ],
    close: [
      'No step was a lie. The sum is a stranger.',
      'The feed never argued with you. It paid you — a little — each time you were a little less careful.',
      'Until less careful felt like clarity, and clarity felt like you.',
    ],
  };

  const REFLECTION_5W = {
    title: 'What you carry forward',
    cards: [
      { who: 'bea', verb: 'SCROLL', line: 'Awareness is not immunity.',
        body: 'She could name every mechanism of capture while being captured by it. The feed never lied — it rewarded her, a little, each time she chose the sharp version over the true one, until the sharp version felt like truth. Naming the trap is not the same as standing outside it.' },
    ],
    coda:
      'Drift has no moment you can point to — that is what makes it drift. The other stories happen TO people, in an afternoon. This one happens AS you, over weeks. The only proof is that the person at the end would not recognise the person at the start.',
  };

  return {
    version: 3,
    storeKey: 'cgAI_blackglass_phones_v3',
    anchorOrder: ['kangkong', 'voiceclone', 'deepfake', 'fiveweeks'],
    anchors: {
      kangkong: {
        id: 'kangkong',
        anchor: ANCHOR,
        entry: 'maya',
        order: ['maya', 'tita', 'bea'],
        phones: { maya: MAYA, tita: TITA, bea: BEA },
        timeline: TIMELINE,
        reflection: REFLECTION,
        examine: true,
      },
      voiceclone: {
        id: 'voiceclone',
        anchor: ANCHOR_VC,
        entry: 'tita',
        order: ['tita', 'maya', 'bea'],
        phones: { tita: TITA_VC, maya: MAYA_VC, bea: BEA_VC },
        timeline: TIMELINE_VC,
        reflection: REFLECTION_VC,
        silentWitness: SILENT_VC,
        examine: true,
      },
      deepfake: {
        id: 'deepfake',
        anchor: ANCHOR_DF,
        entry: 'tita',
        order: ['tita', 'maya', 'bea'],
        phones: { tita: TITA_DF, maya: MAYA_DF, bea: BEA_DF },
        timeline: TIMELINE_DF,
        reflection: REFLECTION_DF,
        examine: true,
      },
      fiveweeks: {
        id: 'fiveweeks',
        anchor: ANCHOR_5W,
        entry: 'bea',
        order: ['bea'],
        phones: { bea: BEA_5W },
        timeline: TIMELINE_5W,
        reflection: REFLECTION_5W,
        examine: false,
      },
    },
  };
})();
