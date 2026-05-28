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
          { t: 'link', title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent', domain: 'healthtruthph.click' },
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
          { t: 'link', title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent', domain: 'kangkong, circled in red' },
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
          { t: 'link', title: 'EXPOSED: The Vegetable They Don’t Want You to Eat — Filipino Doctors Are Staying Silent', domain: 'healthtruthph.click' },
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
          { t: 'msg', side: 'out', sender: 'You', time: '7:15 AM', text: '[side-by-side screenshots] same template. different vegetable. they’re running these in batches rn, probably A/B testing which produce Filipinos are most worried about. seen a malunggay one too' },
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
          { t: 'video', creator: 'Dr. Anita V.', sub: 'Health Communication Specialist', caption: 'How that “EXPOSED vegetable” link actually works 🧵', views: '340.2K', tag: 'DEBUNKED' },
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
        dynamic: 'maya_choice',
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

  return {
    version: 1,
    storeKey: 'cgAI_blackglass_phones_v1',
    anchor: ANCHOR,
    order: ['maya', 'tita', 'bea'],
    phones: { maya: MAYA, tita: TITA, bea: BEA },
    timeline: TIMELINE,
    reflection: REFLECTION,
  };
})();
