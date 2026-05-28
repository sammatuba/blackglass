# Phone-Anthology Rashomon — Architectural Pivot

**Status:** committed (architecture); proof-of-form complete (kangkong moment); ideation expansion paused mid-flow on 2026-05-06. **First-playable vertical slice BUILT 2026-05-28 → `play/blackglass-phones/`.**
**Supersedes:** the assumption that the first-playable is single-POV Maya Ink. Existing scene work (`scenes/01-opening/script.ink`, `arc.md`) is now one of three perspectives, not the whole.
**Read first:** `craft/maya/README.md`, `craft/maya/_meta/character-baseline.md`, `craft/maya/_meta/craft-guidelines.md`, `craft/maya/_meta/ink-design-foundation.md`.

---

## Build status — `play/blackglass-phones/` (2026-05-28)

The phone-anthology first-playable was built as a self-contained vanilla HTML/CSS/JS experience (no deps, offline/`file://` safe, `cgAI_`-prefixed localStorage). The original single-POV reader still lives intact at `play/blackglass/`; the landing page features both.

**What shipped (the "Medium→Wide" cut of the kangkong morning):**
- A **phone rack** entry screen. Maya is the forced entry point; Tita Merly and Bea unlock once Maya's morning is lived (the "sequenced recognition" insight from the overnight tests — order is load-bearing).
- **Three playable phones, UI-as-character realized at the structural level** (not cosmetic skinning): Maya = dark / minimal / dim 15% / Mt. Pulag / serif / verb **DECIDE** (4 weighted choices incl. the heart-react fulcrum); Tita = light / max-font / Last Supper / uncleared badges / serif / verb **FORWARD** (choices converge — *no* delete/ignore option, with the buried-delete footnote making the UI's refusal of doubt explicit); Bea = light / busy / tweet-wallpaper / sans / verb **CONSULT** (choices outsource judgment, the AI "Dr. Anita V." TikTok debunker is the trap).
- **Sequenced-recognition beats** fire inside Tita's and Bea's flows (gated on having played Maya): Tita "reads it twice"; Bea's afterglow + Maya forwarding the AI debunker into the family GC.
- **"The morning, all at once"** timeline epilogue (unlocks after all three) — overlays the whole 5:41→later chain so the player sees the scam *and* the AI debunk travel the same family through the same loving hands. Maya's 6:47 entry is dynamic to the player's choice.
- **"What you carry forward"** reflection — the three failure modes named softly, then the coda.

**Faithful to:** the three verbatim kangkong drafts (§5) and the two recognition beats from `phone-anthology-tests-2026-05-06.md` (Tests 1 & 2).

**Deferred (engine supports them; content not yet written):** the voice-cloning vector + "silent witness" fourth phone (Test 3 / Q2); Bea's five-week algorithmic-acclimation arc (Test 4 / engine #2); non-Maya-starting unlock pairs (Q5). The branch-and-reconverge frame model in `app.js` can carry these without rework.

---

## 1. The pivot in one paragraph

The first-playable IF is being rebuilt as a **Rashomon-structured phone-interface anthology**. Each playable character has their own phone, their own UI personality, their own failure mode of perception. The same events refract through different inboxes. The player starts with Maya and unlocks other characters in any order thereafter. The form *is* the lesson: you cannot see clearly from one position.

This pivot resolves a tension that had been latent since the project began — the original Rashomon ambition ("multiple perspectives on the same events") had no mechanical carrier in single-POV Ink. Phone-as-interface gives each character their own diegetic surface. UI-as-character makes the perspective shift structural, not cosmetic. The mission ("teach people to see clearly in a world shaped by AI") becomes the architecture.

---

## 2. Why this shape (the thesis)

Three claims hold up the form:

**Claim 1: Phone interfaces are the native medium of contemporary AI deception.** Every app affordance — autocomplete, "verified" badges, AI-generated photos, friend suggestions, smart-reply, voice clones, recommended content, debunk videos — is a vector. The phone is not a frame for the lesson; the phone *is* the lesson. The medium is the message.

**Claim 2: Filipino phone life is a uniquely rich worldbuilding canvas.** Messenger-as-internet, GCash threads, Viber family chats, Shopee notifications, OFW remittance pings, load credits, FB Lite, family GCs as gravitational fields. Every app reveals class, region, economic position, generational politics — without a single line of exposition. Lost Phone never had this canvas.

**Claim 3: Rashomon delivered through UI is more honest than Rashomon delivered through prose.** Three Ink scripts in three folders is multi-perspective writing. A phone per character is multi-perspective *form*. The reader doesn't have to be told "this character sees it differently"; they live it via different home screens, different verbs, different organizational logics. The lesson — "nobody is the villain in their own phone" — is not stated, it is unavoidable.

---

## 3. The cast

Three phones, three failure modes, three non-overlapping AI-deception lessons:

| Character | UI personality | Verb | Failure mode | What it teaches |
|---|---|---|---|---|
| **Maya** | Dark mode, minimal home (~6 apps), folders by mood ("morning," "later," "no"), Mt. Pulag wallpaper, brightness 15% pre-9AM | **DECIDE** | Knowing-but-not-stopping. Performed skepticism that produces the same outcome as no skepticism. | Awareness ≠ resistance |
| **Tita Merly** | Light mode, max font, three messaging apps (Viber preferred, Messenger because Mama insisted, SMS for promos), Last Supper wallpaper, badges never cleared | **FORWARD** | Love-as-proof. Relational verification chains close the loop because her standards are relational, not evidentiary. | Trust networks are the attack surface |
| **Bea** | Light mode, chronically online, 4-screen scroll, every app pings, "epistemic cowardice" tweet wallpaper, 47 browser tabs across 3 windows | **CONSULT** | Confirmation-as-closure. AI debunk video traps her by *agreeing* with her precisely. | Media literacy can become its own automation bias |

The trio teaches three distinct AI-deception failure modes *without* requiring a "deceiver POV." The villain is structural, not personal. (Whether to add a fourth phone — the deceiver, the platform, an AI agent itself — is deferred until the trio ships.)

### Character notes

**Maya.** Late 20s, freelance designer, Manila, lives semi-independently. The family GC is gravitational. Reflective, slightly burned out, wants to be a better person and is tired of trying. She is the only one of the three who experiences the morning *as choice*.

**Tita Merly.** ~60, OFW-adjacent (sister Tita Peachy worked in HK; Tita Merly stayed). Devoutly Catholic. Lives in QC with Papa, who has hypertension. Children grown — one in the US, one in Manila. Her phone is a receiving-and-passing-along device. Care expressed as distribution.

**Bea.** Late 20s, works in digital communications at an NGO focused on platform accountability. Manila. Maya's best friend since high school. Has given a webinar on media literacy. Has a Canva template for debunking posts she is quietly proud of. Thinks of herself as someone who builds consensus around correct conclusions. **Critical:** she is not Maya's foil — she is her own person with her own form of being-fooled.

---

## 4. UI as character (the design commitment)

Each phone is a portrait *before* a single message is read. Differences must change *what the player can do* — cosmetic skinning is the trap that kills this form.

The verb-per-character is the spine:

- **Maya's phone gives her CHOICE.** Choices are explicit, weighty, presented with consequence. She experiences her phone as a series of small moral decisions she's tired of making.
- **Tita's phone gives her FORWARD.** The "delete" verb is three taps deep, in a place she's never visited. The UI itself does not permit doubt easily. Her "skepticism" branches still arrive at the forward — because not-passing-along is not in her moral vocabulary.
- **Bea's phone gives her CONSULT.** Her reflex is to outsource judgment outward — Snopes tab, ask sister (med student), quote-tweet, screenshot to "the council." Her phone is a research instrument.

Other UI dialects to commit per phone:
- **Default brightness** (Maya 15% pre-coffee; Tita max; Bea adaptive)
- **Notification posture** (Maya turned off message previews; Tita never clears badges; Bea pings everywhere)
- **Wallpaper as character revelation** (Maya: Mt. Pulag because it wants nothing from her; Tita: Last Supper, never changed; Bea: a tweet about epistemic cowardice that "changed her life a little bit")
- **Folder logic** (Maya by mood; Tita maximalist no folders; Bea by app type with named GC subdivisions)
- **POV pronoun register** (Maya pure second-person; Tita third-person-adjacent with second-person interior; Bea second-person but online-fluent)

---

## 5. Proof-of-form: the kangkong moment, three phones

**The anchor moment:** A clickbait health link ("EXPOSED: The Vegetable They Don't Want You to Eat — Filipino Doctors Are Staying Silent" — domain `healthtruthph.click`) propagates through a Saturday morning. The kangkong link arrives in the Santos Family GC at 6:03 AM, sandwiched between Tita Merly's blessed-morning GIF and Tita Peachy's Tide pasabuy. Mama endorses it within minutes ("Salamat po Ate 🙏 Share ko rin sa bible study group"). The link has Mama's name on it before Maya wakes.

Three writer agents (Sonnet, default model — *not* the 4.5 pin we're moving to) drafted this moment in parallel, one per phone. Drafts preserved verbatim below as proof the architecture works.

### 5a. Maya's draft (6:47 AM)

**Phone interior:** Six icons. Not because she deleted everything — because she keeps deleting things and not replacing them. Camera, Notes, GCash, Instagram (in a folder called "later"), the phone app (never used for calls), and a folder called "no" containing her email client and every app her clients asked her to download for a project. The "morning" folder was a brief experiment. It became another thing she had to manage. She deleted it. Wallpaper: a photograph she took at Mt. Pulag, 2023. Grass, fog, the suggestion of a ridge. No people. She chose it because it wants nothing from her. She has not changed it in two years. Dark mode. Always dark mode — the setting, yes, but also the disposition. Screen brightness at 15% until 9 AM. She finds high brightness before coffee aggressive.

What the phone reveals: she is organized around avoidance, not utility. The "no" folder is not a joke. She has genuinely tried to make herself harder to reach by her own inbox.

**Scene (excerpted):**

```
=== lockscreen ===
# UI: lockscreen, dark mode, wallpaper: Mt. Pulag fog and grass
# TIMESTAMP: 6:47 AM — Saturday
# BRIGHTNESS: 15%

Your hand finds it before your eyes do.

This is not a thing you do. This is a thing that happens — wrist rotating, fingers
crossing the sheet, thumb arriving at glass like it has been called home. You are
still inside the blurred edge of a dream about nothing. It doesn't matter. The
muscle is already deciding.

The screen opens: 14 notifications.

You feel the fourteen as a weight, not a number. Saturday. You had a thought,
before sleep, that Saturday would be different. The thought is already gone.

[She turned off message previews eight months ago. She told herself it was a
privacy thing. It was a wanting-to-choose thing. She wanted the notification to
be an *invitation*, not an ambush. It did not work.]

# NOTIF: Santos Family GC 🏠 — 7 new messages (earliest: 6:01 AM)
# NOTIF: Bea 💛 — 2 messages
# NOTIF: PixelPush Projects — Jigs: 1 message (6:31 AM)
# NOTIF: Unknown number — 1 message (5:58 AM)
# NOTIF: Instagram — 3 activity alerts (foldered under "later", grayed out)
```

**The kangkong moment:**

```
# SENDER: Tita Merly
# TIMESTAMP: 6:19 AM
Mga pamangkin ha, look at this. Very important for your health. My officemate
sent this — doctor daw ang source 👨‍⚕️

# TYPE: link_preview
# LINK_TITLE: "EXPOSED: The Vegetable They Don't Want You to Eat — Filipino
              Doctors Are Staying Silent"
# LINK_DOMAIN: healthtruthph.click

You stop.

Not at the article. You stop at the word EXPOSED, because you have designed
enough thumbnails to know what EXPOSED is doing. It is not a word. It is a
lever. The visual equivalent of grabbing someone by the collar and turning
their head: look here, not there, something was hidden from you.

The domain is healthtruthph.click. Not .com. Not .ph. You register this the
way you register a word misspelled in a client's deck — automatically,
professionally, without having decided to look.

# SENDER: Mama
# TIMESTAMP: 6:21 AM
Salamat po Ate 🙏 Share ko rin sa bible study group. Lalo na para kay Papa,
may altapresyon pa naman sya

The link has Mama's name on it now.

[Tita Merly sent it because she loves her family. Her officemate sent it because
that officemate loves her. The source is described as a doctor not because
anyone verified this but because *doctor* is the word that turns care into
authority — and authority into permission to stop asking questions. Mama has
already thanked it and already assigned it a destination: Papa, who has high
blood pressure, who eats kangkong almost every morning in his sinigang, who
will read whatever Mama puts in front of him because he trusts her the way
Maya trusts Mama, which is completely and without thinking about it.]

The link has been in this family for nine minutes and it has already moved two
stops along a chain that ends at your father's breakfast.

You know what the link is. You have seen this template. You have BUILT versions
of this template for clients who wanted urgency without facts.

+ [Tap the link — maybe you're wrong]
    You know what you know. You tap it anyway, because "probably misinformation"
    is not the same as "definitely misinformation," and you would rather be
    certain than right. Right just leaves you alone with yourself.

+ [Type: "Tita, san niyo po nakuha yung link? 😊"]
    The emoji is doing everything. Without it, you are questioning an elder in
    front of the whole family. With it, you are being curious — curious is
    permitted. You are asking a question. You are not saying she is wrong.
    You are not saying she is wrong.

+ [❤️ and scroll past]
    You put your name on it.
    The heart is not neutral. The heart is endorsement. Every person who opens
    this GC later today will see your ❤️ and will weigh it as evidence that
    someone checked. No one checks before they heart-react. That's why it
    matters that you heart-react.

+ [Screenshot it, send to Kuya Renz later]
    What you have done is made this problem a message you sent but didn't have
    to send yet. This is not a solution. This is a form of filing.
```

**Editorial note from Maya's writer:** Maya's specific failure mode is not credulity — it's the paralysis of *knowing-but-not-stopping*. She identifies the manipulative structure of the link almost immediately (she's a designer; she knows how urgency thumbnails are made), and this knowledge becomes its own trap: she keeps checking to confirm what she already knows rather than acting on what she knows. Her intelligence becomes a way of watching herself fail in slow motion. The heart-react choice is the sharpest expression of this — she is the only one of the three who would understand, in the moment she taps it, exactly what her ❤️ is doing to everyone downstream.

---

### 5b. Tita Merly's draft (5:43 AM)

**Phone interior:** Light mode. Maximum font size. Wallpaper is the Last Supper, downloaded from Viber three years ago, never changed because changing it would feel like removing it from a shelf. Top row: Viber (unread badge: 47, never cleared), Messenger (badge: 12), SMS (badge: 3, all promos). Three communication apps as hierarchy of trust — Viber first ("secure naman daw"), Messenger because Mama insisted, SMS last for strangers. Second row: Bible app, GCash, FB Lite, ShopeeApp. Third/fourth: prayer app, ChannelBox (her son installed for K-dramas; she's watched two episodes), three solitaire games at various stages of abandonment. Badges everywhere — she doesn't clear them; clearing feels like throwing away unread letters.

What the home screen reveals: she is connected to many things and curates none. The phone is a receiving device. The "delete" function lives three taps deep. The phone's primary gesture is arrival.

**Scene (excerpted):**

```
=== merly_kitchen ===
# PHONE: TITA MERLY
# UI: home_screen_light_mode, font_size_max
# TIMESTAMP: 5:43 AM — Saturday
# SOUND: tuyo_frying, low

The oil is already talking.

Not loud yet — just the small steady spit of fat hitting the pan, that sound
that means the morning has already decided to begin without waiting for you.
You laid the tuyo in at five-thirty, straight from the package, the way Mama
taught you: low flame, patience, don't crowd the fish. The window above the
sink is the color of a bruise turning yellow. Not dawn yet. The in-between.

Papa is still asleep. You can hear the ceiling fan from the bedroom — the
faint wobble it's had for three years that you keep meaning to ask your son
about. The wobble means Papa is in there. Alive and breathing and in there.

You pick up your phone from the counter.

# SOUND: viber_notification_chime
# NOTIF: Viber — Joy A.: sent an attachment (5:41 AM)

Joy.

You smile before you even open it. Joy is like that — she sends things at hours
that would surprise other people, but you've known her since the hospital
canteen days and Joy has never changed. Early bird talaga.

# SENDER: Joy A.   [5:41 AM]
Tita, basahin mo po to. May pinsan ako sa Cebu, nag-share. Mga doctor daw
nag-tatago.

[link preview: EXPOSED: The Vegetable They Don't Want You to Eat — kangkong
in a red circle on a dark green background]

You read the headline twice.

Mga doctor nag-tatago. Doctors hiding something.

Your thumb hovers over the preview image — the kangkong circled in red like a
problem, like something labeled wrong. You think of the kangkong you bought at
the palengke on Thursday. You think of Papa's blood pressure, the morning
medication he takes with warm water, the chart the doctor drew for him about
sodium. You think: kung totoo ito.

If this is true.

# SENDER: Joy A.   [5:42 AM]
Yung pinsan ko, nars siya before. Dati sa Cebu Doctors. Sabi niya meron daw
talagang mga ganito na tinatago ng mga ospital. Para sa supplement nila kasi eh.

There it is — the part that makes the thing real. Joy's cousin was a nurse.
Cebu Doctors. That is not nothing. You have never been to Cebu Doctors but
you know it is a real hospital, you have heard of it, it sounds like a place
where nurses know things. And if a nurse is sharing this through Joy, who
worked at the hospital for six years before the barangay health center, who
brought you Mango float when your knee was swollen, who is not the type to
share things without reason —

Then this is not nothing.
```

**The choice architecture (critical):**

```
+ [Open the link — kung totoo ito, dapat malaman ng lahat]
+ [Forward to Family GC first — they should know right away]
+ [Send Joy a voice note — ask her more about the cousin]

// NOTE: There is no "delete the message from Joy" option. There is no
// "decide not to forward." The choice texture in Tita Merly's scene is:
// HOW MUCH do you confirm before you forward? Not WHETHER. The "whether"
// is not a real option in her moral vocabulary — receiving something
// important and not passing it to the people you love is not a thing she
// has a name for. The closest she gets to skepticism is asking Joy for
// more detail. And Joy confirms. That's the shape of her scene: the
// options are all in service of the same ending.
```

**The forward (6:01-6:03 AM):**

```
=== merly_composes_kangkong ===

You go back to Viber. You find Joy's message. You press and hold the link
preview until the option appears: Forward. Share. Copy link. You have done
this before — it is not hard once you know where to press.

You copy the link. You go back to Messenger. You go back to the family GC.

You type around the link. You want it to have a frame — a link alone looks
cold, looks like you just threw something at them. You want them to know you
are thinking of them. You are always thinking of them.

# COMPOSE: [Tita Merly]
Mga pamangkin, look at this ha. Very important for your health. [paste]

You look at it. Then you add:

My officemate sent this, nurse yung pinsan niya before. Concern lang niya sa
ating kalusugan.

You look at it again. You want to say something about Papa — about how this
matters because of Papa — but you don't want to alarm them on a Saturday
morning, and you don't want Papa to see the message and think you are worried,
because you are always worried, quietly, and he knows it, and you don't want
to make the GC feel heavy. Saturday should not feel heavy.

So you add instead:

Lalo na kayo na may matanda sa bahay. Share niyo na rin sa iba para aware
lahat 💕🙏

# SENT: 6:03 AM

You put the phone down.

The tuyo is done. You transfer it to the plate — the chipped one with blue
flowers, the one Papa likes — and you set it on the table with the rice you
kept warm since five. You put a glass of water next to it. You fold a paper
towel for his hands.

You will wake him in ten minutes. You always wake him at quarter past six.

Your phone is face-down on the counter. You don't look at it.
```

**Editorial note from Tita Merly's writer:** Tita Merly's failure mode is not gullibility in the clinical sense — it is the weaponization of her virtues. She verifies: she asks Joy, she waits for a reason, she gets one (the nurse, ten years, Cebu Doctors). The verification loop closes correctly by her own standards, because her standards are relational, not evidentiary. A trusted person confirmed it through a trusted person. Her love and her credulity are the same reflex. She forwards the kangkong link for the same reason she sends the blessed morning GIF — both are gifts, both say: *I was thinking of you, I wanted you to have this.* The phone does not distinguish between the two. Her heart does not distinguish between the two. And the scam knows this; it built itself to look exactly like a gift that someone who loves you would send. The player's discomfort should not be "how could she not see it" but "I recognize that gesture — I have received it, or given it, and I did not stop to check either."

---

### 5c. Bea's draft (7:14-7:28 AM)

**Phone interior:** Light mode because dark mode is for people who want to seem mysterious. Home screen page 1: TikTok, Threads, X, Reddit, Discord — out in the open because she is not ashamed of how she spends her time. Page 2: Snapchat, BeReal (last opened 47 days ago, badge she keeps meaning to clear), three banking apps (BPI, GCash, Maya — "redundancy is a form of financial sovereignty"). Page 3: Goodreads + Storygraph (she inputs to both; they give different vibes), two journaling apps unused, habit tracker on a 4-day streak she's nursing like a plant, meditation app used twice in January. Page 4: three period-tracking apps because "data sovereignty" — Maya once said "babe that's not what data sovereignty means," Bea said "I know but it's the right energy." Browser: 47 tabs across 3 windows, including a Snopes page open six days. Group chats pinned: *girls (real)*, *girls (work)*, *the council*, *maya 4ever*. Wallpaper: a screenshot of a tweet that says "epistemic cowardice is choosing civility over clarity" because she found it in 2022 and it changed her life a little bit. She works in digital communications at an NGO focused on platform accountability. She has given a webinar about media literacy.

**The scene — three vectors converge:**

```
=== bea_morning ===
# UI: phone_home_screen
# TIMESTAMP: 7:14 AM — Saturday

You've been awake since six. Insomnia, the usual cocktail — cortisol and
scrolling, neither one helping the other. You've already done a full loop
through TikTok, three Reddit threads, the wordle, twenty minutes of a
documentary you've seen before. Your back hurts. You did not get up to
stretch. You are horizontal and in a rich information environment and this
is fine.

Your phone registers seven new notifications in the last four minutes. You
count them the way other people count sheep.

# NOTIF: maya 4ever 💛 — image + "is this real or no my tita keeps sending these"
# NOTIF: girls (work) — Camille: forwarded link (7:09 AM)
# NOTIF: TikTok — "@factcheckph liked your comment" (7:07 AM)
# NOTIF: the council — 4 new messages (7:01 AM)

You open Maya first because you always open Maya first.

# SENDER: Maya 💛   [7:12 AM]
[screenshot — kangkong link preview]
is this real or no my tita keeps sending these

You look at it for approximately four seconds.

[The headline is formatted in the way they all are — "EXPOSED" doing
load-bearing work, the passive voice on "they don't want you to," the vague
conspiratorial "they." The URL ends in .click which is what scammers use when
.com was taken. "Filipino Doctors Are Staying Silent" is a sentence about a
silence that, by virtue of being in the headline, is already broken.

You've seen this template. You've made a Canva slide about this template.]

# SENDER: You   [7:14 AM]
ok so immediately: look at that URL. .click domains are almost always a tell.
healthtruthph.CLICK.

# SENDER: You   [7:14 AM]
also that headline structure — "EXPOSED" + "they don't want you to know" +
specific professional group staying quiet about something — it's a template.
literally a fill-in-the-blank.

You open the work GC next. Camille has forwarded a link with: "guys is this
true?? yung ampalaya??"

Different vegetable. Same template. Same .click domain family.

# SENDER: You   [7:15 AM]
[image: side-by-side screenshots — kangkong version, ampalaya version]
same template. different vegetable. they're running these in batches rn,
probably A/B testing which produce Filipinos are most worried about. I've
seen a malunggay one too

You've sent four messages in under two minutes. This is what you're for. You
feel the small clean satisfaction of competence.
```

**The trap (7:17 AM):**

```
=== bea_tiktok_debunk ===

You switch to TikTok — muscle memory, thumb movement, the feed updating
before you're even conscious of opening the app.

The third video in your feed is not the usual content rotation. It's tagged
#factcheck #medialiteracy #kangkong and the thumbnail shows a woman in a
blazer at a desk with the word DEBUNKED in red across the bottom. You stop
scrolling.

The video opens on a woman — late thirties, professional backdrop, neutral
Tagalog-English code-switch that signals educated Manila. The package reads
medical authority: a white desk, books visible behind her, a subtle graphic
at the bottom reading Dr. Anita V. | Health Communication Specialist.

She's saying everything you just said to Maya. .click domains.
Fill-in-the-blank templates. The supplement funnel. She adds some things you
hadn't included — how health misinformation travels faster through family
groups because it arrives pre-vouched, how the "Filipino doctors staying
silent" framing is designed to weaponize national distrust of institutions.

It's clean. It's accurate. It's exactly right.

[You do not notice, because you are not looking for it, that her lips are 40
milliseconds behind her voice in the bridge section. You do not notice that
the "Dr." has no institution attached, just a specialty. You do not notice
that the graphic's font weight is slightly inconsistent with the rest of the
package, as though it was added in post-production. You do not notice the
last ten seconds: a gentle pivot toward a newsletter — MediaLitPH Weekly —
with a Linktree URL and a CTA that says "subscribe for weekly debunks, it's
free."]

What you notice is that she is right about everything.

She's saying what you know. She's packaging it better than you could in a
90-second video. You feel the particular warmth of being understood before
you spoke.

You quote-tweet it — or, because this is TikTok, you open the share menu and
copy the link and paste it into Threads where you have 1,400 followers who
care about this kind of thing:

@beareyes.ph   [7:18 AM]
this is the cleanest explainer i've seen on the vegetable misinformation
batch that's going around right now. bookmarking for the work deck. if
you've gotten a "EXPOSED: the vegetable your doctors won't talk about" link
in your family GC this week, this is why and how.
[TikTok embed — Dr. Anita V.]
#medialiteracy #factcheck

Then you paste the same link into maya 4ever.

# SENDER: You   [7:18 AM]
ok also someone made a great explainer on exactly this batch — send to your
tita maybe

# SENDER: Maya 💛   [7:19 AM]
oh this is good actually. you're so fast at this how

# SENDER: You   [7:19 AM]
it's literally my job babe. also TikTok just handed it to me lmao

You lock the phone. You feel, without calling it anything, the comfortable
weight of having been useful. Of having done the thing correctly. Of being
the person your friends call when they get the bad link.

The video had 340,000 views by 7 AM on a Saturday. You have added yours to
the total.
```

**Editorial note from Bea's writer:** Bea's failure is not credulity — she is, on the kangkong link itself, completely correct. Her failure is the more dangerous one: **she outsources her epistemic closure to a source that confirms what she already knows, and that confirmation short-circuits any scrutiny she might otherwise apply.** The AI-generated debunk video isn't fooling her by contradicting her; it's fooling her by agreeing with her so precisely that doubt never gets a purchase. The form is correct, the conclusion is correct, and so the question of provenance never arises. She does not Snopes the debunker. She does not check the "Dr." She does not read the last ten seconds as a revenue model. She does the thing she always does — she shares with attribution, she signals her own media literacy by sharing, and in doing so she launders the video through her reputation to 1,400 followers who trust her because she is the kind of person who catches these things.

The cruelest detail: she is not wrong about the kangkong link. She just doesn't know she is also, right now, inside a different operation entirely.

---

## 6. What the drafts proved

Three writers, no coordination, three non-overlapping failure modes. The architecture earned itself.

**Failure-mode mapping holds:**

- Maya: knowing-but-not-stopping (performed skepticism that lands at the same outcome as no skepticism)
- Tita: love-as-proof (relational verification chains close the loop because her standards are relational, not evidentiary)
- Bea: confirmation-as-closure (the apparently-sophisticated trapped by media that agrees with them)

**These don't overlap.** The Rashomon thesis is intact: each character is reasonable from inside their own choices, *and* each is fooled in a different shape. The form delivers the lesson without ever needing a deceiver POV.

**The form does pedagogical work:**
- Tita's choice architecture has no real "ignore" option. Her verbs all converge on FORWARD. UI-as-character at the structural level, not cosmetic.
- Bea's competence is *load-bearing* for her failure. Remove it and the irony collapses. The pedagogy is "media literacy can be its own automation bias" — and she has to genuinely have media literacy for that to land.
- Maya's draft has the heart-react as the moral fulcrum. She is the only character who would understand, in the moment she taps it, what her ❤️ is doing downstream.

**Different POV pronouns per phone is not a bug.** Maya = pure second-person, Tita = third-person-adjacent with second-person interior, Bea = second-person but online-fluent with em-dash interruptions. The writers found different pronouns for different inner lives without being told to. That's the form working.

**"Nobody is the villain in their own phone" is durable.** Tita's draft especially earns it — written with dignity but without softening her culpability. The Producer needs to protect this writing principle going forward.

---

## 7. Standout craft moves to canonize

Worth porting to `craft-guidelines.md` regardless of where the project goes:

1. **Mt. Pulag wallpaper "wants nothing from her."** Single-image character work. Wallpaper as character revelation should be a deliberate pass for every phone.
2. **The "no" folder.** Maya has organized her phone around avoidance, not utility. Folder names as character.
3. **Tita's "kitchen and phone are continuous."** The tuyo, the chipped plate with blue flowers, the paper towel for Papa's hands. The phone is not opposed to her care work — it is woven into it. Don't write any phone scene as if the phone is the only thing happening.
4. **Joy's voice note is 22 seconds long, specific, felt, heard.** Audio feels more real than text. Future scenes should render voice notes with play buttons and waveforms — and the *length* of a voice note is information.
5. **Tita protects Papa even as she (unwittingly) targets him.** The withholding is her dignity. She doesn't put hypertension in the GC message because she doesn't want to alarm them. The reader sees what she does not.
6. **"You are not saying she is wrong. You are not saying she is wrong."** Repeated lines as interior tension. The emoji softening the question is doing the moral work.
7. **Bea's "the council."** Group chats with named subdivisions are character. Every chronically online person has these.
8. **The 47 unread Viber badge.** Tita doesn't clear notifications because clearing feels like throwing away unread letters. The reader learns this without it being said.
9. **Bea's wallpaper is a tweet.** Self-image as wallpaper. She found it in 2022 and it "changed her life a little bit" — that hedge is the entire character.
10. **The 340,000 views.** Bea adds her view to the total. The deception is operating at scale; her individual addition is felt as small but is structurally significant.

---

## 8. Where we paused (the pivot to broader ideation)

After the proof-of-form landed, the user redirected:

> "note that we dont have to be fixated on a topic just yet but instead i want to have ideas we can expound on based on our new mechanic"

The kangkong scene is *one* anchor moment. The mechanic enables many more. The next session should not deepen kangkong — it should open the aperture to what the form can carry.

### Four ideation axes proposed (not yet dispatched)

The Consultant proposed parallel ideation agents on these axes. **None have run yet.** Decide whether to launch as proposed, reshape, or brainstorm with the user further before parallelizing.

**Axis 1 — Other anchor moments.** What besides clickbait health links holds three phones together? Candidates: a deepfaked voicemail from a "kidnapped" relative; a viral video of someone the family knows; an AI-generated job offer with a real-looking PH company; a romance-scam profile crossed with a real OFW's photo; a manufactured screenshot of a politician saying something inflammatory; a "leaked" audio that's actually voice-cloned. Each anchor teaches a different AI-deception vector. **Goal:** 6-8 alternative anchor scenarios with one-paragraph pitches, each tied to a specific AI-deception vector.

**Axis 2 — Other cast configurations.** Beyond Maya/Tita/Bea, what casts unlock different lessons? Candidates: an OFW family ring (worker abroad, partner home, child raised by Lola); an electoral ring (a voter, a campaigner, a barangay captain, a paid commenter); a classroom ring (teacher, student using ChatGPT, parent in the GC); a deceiver/deceived ring (scam operator, mark, bystander). **Goal:** 4 alternative trios/quartets, each with a thesis about what *that ring* teaches that Maya/Tita/Bea doesn't.

**Axis 3 — Structural conceits.** Mechanics only the phone-anthology form enables. Candidates: cross-phone messaging where you see *both* sides; deleted-messages-recovered as forensic mechanic; time-jump phones (same person, five years apart); a phone you're locked out of and have to gain access to via clues in another phone; an AI assistant inside one of the phones that *is* the antagonist whispering choices; a timeline-overlay tool showing the same moment across all unlocked phones simultaneously; a redaction mechanic where re-reading earlier phones after unlocking later ones reveals previously-invisible context. **Goal:** 5-6 mechanic ideas, each with a one-line "the player feels X."

**Axis 4 — AI-deception domains.** What vectors should the form teach? Candidates: voice-cloning a parent in distress; deepfake romance via Tinder/Bumble; AI-recruiter discrimination; ChatGPT trusted for legal/medical advice; algorithmic radicalization (slow, not viral); GenAI journalism with hallucinated quotes; LLM-written reviews fooling Lazada/Shopee shoppers; synthetic media in election season. **Goal:** map 8-10 deception vectors to whether/how the phone-anthology form can carry them.

### Open meta-questions for the user

- Should ideation happen now, or do they want to brainstorm with the Consultant first to sharpen the cut?
- Should the four axes be parallelized, or done sequentially with each informing the next?
- Is there a fifth axis being missed? (The Consultant's hunch: maybe **pedagogical structure** — at what cadence does the form deliver its "lesson," and does that need to be diegetic vs. an explicit reflection beat?)

---

## 9. Session-resume instructions for the fresh session

You are picking up a creative-direction session that paused mid-flow. The user wants the project's primary work (the IF) reframed under the **phone-anthology Rashomon** architecture documented above.

**Setup before any agent dispatch:**

1. The model-pinned writer subagent is already configured at `.claude/agents/blackglass-writer.md` — model: `claude-sonnet-4-5-20250929`. Use `subagent_type: "blackglass-writer"` (NO `model` override) for all writer agent calls in this project.
2. Verify the subagent loads correctly before parallelizing.

**Re-read for context:**
- This file (architecture + drafts + handoff) — `craft/maya/_meta/phone-anthology-architecture.md`
- `CLAUDE.md` — personas, navigation
- `craft/maya/_meta/character-baseline.md` and `craft/maya/_meta/craft-guidelines.md`
- The existing Ink scene at `craft/maya/scenes/01-opening/script.ink` — Maya's POV of the kangkong moment, now one of three perspectives

**Decisions in flight (ask the user before proceeding):**

1. **Ideation room shape.** Did they want the four-axis parallel dispatch, or one axis at a time, or a different cut entirely? My read of their last message: they want *breadth, not depth* — generative seeds across the mechanic, not more polish on kangkong.
2. **Scene-directory restructure.** The current `scenes/01-opening/` structure is per-Maya-scene. The pivot implies a per-anchor-moment structure (e.g., `scenes/01-kangkong/maya/`, `scenes/01-kangkong/tita/`, `scenes/01-kangkong/bea/`) OR a per-character structure (`craft/maya/scenes/`, `craft/tita-merly/scenes/`, `craft/bea/scenes/`). Don't restructure unilaterally — surface as a decision.
3. **Fourth phone deferred.** The trio teaches without needing a deceiver POV. Don't add a fourth (deceiver, platform, AI agent) without explicit user direction.
4. **Drafts above are *one* version.** The user explicitly said "we're not necessarily limited by the existing material." The kangkong-trio drafts are proof-of-form, not canon. Treat them as material to react to and expand on, not text to polish.

**What NOT to do:**
- Don't drill deeper into the kangkong scene — the user is past it.
- Don't spawn an editor pass on the existing trio drafts — the user pivoted away from convergent refinement.
- Don't promote any of these drafts to `script.ink` — the architecture is still in design, not build.
- Don't write code or touch `play/blackglass/` — this is craft work, not build work.

**What TO do:**
- Confirm setup (subagent loads, you've read the context).
- Re-engage the user on the ideation-room shape.
- When dispatched, send agents on the agreed axes — each in parallel where possible — and synthesize the seeds for user reaction.
- Hold all three Consultant lenses (Philosopher / Producer / Pedagogue) on every proposal. Name tensions, don't collapse them.

---

*End of handoff. Last edited: 2026-05-06.*
