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

  return {
    version: 2,
    storeKey: 'cgAI_blackglass_phones_v2',
    anchorOrder: ['kangkong', 'voiceclone'],
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
    },
  };
})();
