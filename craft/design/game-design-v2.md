# DISINFO — Game Design Document v2

**Version:** 2.0 — Consolidated Design Bible
**Date:** March 27, 2026
**Status:** Pre-production

---

## 1. CONCEPT OVERVIEW

**DISINFO** is an interactive fiction game about AI-powered disinformation, scams, and phishing set in the Philippines. The player does not read a story. They live inside a simulated smartphone, and the story comes to them — through notifications, group chats, unknown SMS, suspicious emails, viral posts, and banking alerts — the same way real disinformation reaches real people.

The game teaches AI literacy and digital resilience not through lectures but through lived experience. The player realizes they've been manipulated before they realize they're being taught.

**Genre:** Interactive fiction / Phone simulation / Serious game
**Platform:** Web (mobile-first, playable on desktop)
**Engine:** Ink (narrative logic) + HTML/CSS/JS (phone UI rendering)
**Language:** English throughout. Cultural grounding is Filipino — settings, social dynamics, naming, scenarios — but written entirely in English. No Taglish unless a specific character naturally code-switches (and even then, sparingly and with context clues).
**Tone:** Playful but substantive. Familiar phone interactions that slowly reveal something isn't right.
**Target play time:** 45–90 minutes per persona; 3–5 hours total across all four.

### 1.1 Reference Games

| Game | What We Take From It |
|---|---|
| *Simulacra* | Found-phone horror; dread through familiar interfaces; the phone as unreliable narrator |
| *A Normal Lost Phone* | Narrative revealed through phone exploration; player-driven pacing; intimacy of reading someone's messages |
| *Bury Me My Love* | Emotional storytelling through a messaging app; real-time tension; choices that feel small but compound |
| *Sara Is Missing* | Phone mystery mechanics; the uncanny feeling of being inside someone else's device |
| *Harmony Square* | Disinformation inoculation through play; the player becomes the manipulator to understand the manipulation |
| *Bad News* | Fake news creation as inoculation; showing the machinery behind viral lies |

### 1.2 Design Pillars

1. **The phone is the world.** Every piece of narrative arrives through a UI the player already knows. No exposition dumps. No narrator voice. Just a phone that fills up with life — and with lies.
2. **Complicity before clarity.** The player should act before they understand. They forward a message, click a link, ignore a red flag. The lesson lands when they realize what they did, not when they're told what to do.
3. **Filipino texture, universal stakes.** The scenarios are rooted in Philippine social dynamics — the family group chat, the Tita who shares everything, the GCash scam, the election season disinfo — but the emotional stakes (trust, shame, fear, belonging) are universal.
4. **Subtlety is the pedagogy.** Every concept taught maps to a phone interaction the player performs. The game never says "this is a lesson about automation bias." The player just experiences it.

---

## 2. THE PHONE UI LAYER

The entire game takes place inside a simulated smartphone interface. The player sees a phone screen. They interact with it the way they interact with their own phone. The narrative engine (Ink) drives what appears; the web layer renders it as a convincing phone UI.

### 2.1 Home Screen & Navigation

The phone has a **home screen** with app icons. The player can tap into any app at any time, but the story is driven by **notifications** that pull them toward specific apps at specific moments. A red badge counter on an app icon signals unread content.

The phone also has a **lock screen** that shows notification previews, a **status bar** (time, signal, battery — all narratively manipulable), and a **notification shade** the player can pull down.

**Design note:** The battery percentage and signal strength are not decorative. They can be used narratively — battery draining during a tense moment, signal dropping when the player tries to call for help, Wi-Fi switching to data when a "free Wi-Fi" scam is in play.

### 2.2 Phone Apps

| App | Description | Narrative Function |
|---|---|---|
| **Messages** | SMS threads (multiple contacts) | Scam texts, "bank" OTP alerts, unknown number messages, personal conversations that provide context |
| **ChatApp** (Messenger/Viber analog) | Group chats and DMs | Family GC, barkada GC, work GC, DMs from strangers. The primary social channel. |
| **SocMed** (Facebook/TikTok analog) | Social media feed with posts, comments, shares | Viral disinformation, deepfake videos, AI-generated content, outrage bait, engagement traps |
| **Email** | Inbox with threads | Phishing attempts, "official" government/bank notices, job offers, newsletter-style disinfo |
| **NewsFlash** (news aggregator) | News app with headlines and articles | Real vs. fake news, manipulated headlines, AI-generated articles, the contrast between verified and unverified sources |
| **GCash** (mobile wallet analog) | Banking/payment notifications, transaction history | Financial scam targets, fake payment confirmations, "send money" urgency traps |
| **Browser** | Simple in-game web browser | The player can "google" things to verify claims. Some search results are legitimate; some are SEO-gamed disinformation. A key tool for the verification mechanic. |
| **Contacts** | Contact list with names and details | Shows who the player knows; unknown numbers can be checked here; blocking happens here |
| **Settings** | Privacy settings, blocked numbers, app permissions | The player can take protective action — blocking numbers, adjusting privacy, turning off location. These choices have narrative consequences. |
| **Camera/Gallery** | Photo gallery | Contains images that serve as evidence, context, or emotional grounding. Reverse image search mechanic for verification. |
| **Calendar** | Upcoming events, reminders | Creates time pressure ("Your bank appointment is tomorrow"), establishes routine, provides alibi or contradiction for claims |

### 2.3 Notification System

Notifications are the primary story delivery mechanism. They appear as:

- **Banner notifications** — slide in from the top, preview text visible, tap to open
- **Lock screen stack** — accumulate when the player hasn't checked the phone
- **Badge counters** — red numbers on app icons showing unread items
- **Sound/vibration cues** — different alert sounds for different apps (audio design TBD)

**Notification types and their narrative roles:**

| Type | Example | Narrative Purpose |
|---|---|---|
| Group chat message | "Tita Merly sent a photo in Family GC" | Social pressure, forwarded disinfo, family dynamics |
| SMS from unknown number | "+63 917 XXX XXXX: Congratulations! You've won..." | Classic scam entry point |
| SMS from "bank" | "BDO: Unusual activity detected on your account..." | Phishing, urgency manipulation |
| Email from official-looking sender | "PhilHealth: Action Required — Verify Your Account" | Institutional phishing |
| Social media notification | "Your post has 2,347 shares" | Virality feedback loop, amplification mechanics |
| News alert | "BREAKING: [Fabricated headline]" | Fake news, emotional manipulation |
| GCash notification | "You received ₱5,000 from Unknown" | Wrong-send scam setup |
| Calendar reminder | "Deadline: Submit documents by 5 PM" | Time pressure, decision forcing |

### 2.4 Interaction Patterns

The player interacts with the phone through a defined set of actions that map to real phone behavior:

**In chats/messages:**
- Choose a reply from 2–4 options (Ink choices rendered as chat bubbles the player might type)
- Long-press to react (heart, haha, angry, etc.)
- Forward a message to another chat
- Ignore / leave on read (choosing not to respond is always a valid choice)
- Report a message

**In social media feed:**
- Like / React
- Share / Repost
- Comment (choose from options)
- Report post
- Scroll past (ignore)
- Tap to read full article (or just react to the headline)

**In email:**
- Open / Ignore
- Click links (or don't)
- Reply (choose from options)
- Mark as spam
- Forward to someone

**In browser:**
- Search for terms (choose from suggested searches or type key phrases)
- Navigate search results (some legitimate, some gamed)
- Verify information against multiple sources

**General phone actions:**
- Block a number or contact
- Adjust privacy settings
- Screenshot (save evidence)
- Call a contact (limited — calls are mostly narrative cutscenes or voicemail)

### 2.5 Time & Pacing

The game simulates time passing on the phone. The clock in the status bar advances. Notifications arrive in clusters (morning, midday, evening, late night). The player can experience time compression — "3 hours later" — or real-time tension when messages arrive in rapid sequence during a crisis moment.

**Pacing levers:**
- Notification frequency (slow drip vs. overwhelming flood)
- Message typing indicators ("..." appearing before a message arrives)
- Read receipts (the other person saw your message — now what?)
- Delay between player choice and consequence (some results are instant; some arrive hours later)

---

## 3. THE STORY

### 3.1 Core Narrative

The player's phone gradually fills with a web of connected disinformation and scam attempts. What starts as isolated incidents — a weird text, a too-good-to-be-true post, a forwarded message from Tita — slowly reveals itself as a coordinated operation.

Across four playable personas, the player sees the same events from four different vantage points: the person being targeted, the person unknowingly spreading it, the person running it, and the person trying to stop it. Each persona's phone tells a different story, but the threads connect. An SMS the Target receives was crafted by the Operator. A viral post the Amplifier shares is being tracked by the Investigator. The web becomes visible only when you've seen all four phones.

### 3.2 The Four Personas

Each persona is a separate playthrough. The player picks a phone to unlock. Each phone has its own home screen wallpaper, app layout, message history, and personality. The player can play them in any order, but the recommended order is Target → Amplifier → Operator → Investigator.

---

#### PERSONA 1: THE TARGET — "Maya"

**Profile:** Maya Santos, 24, graphic designer working freelance from Quezon City. Lives with her parents and lola. Active on social media. Uses GCash for everything. Just started earning enough to save.

**Phone personality:** Colorful wallpaper, lots of group chats, social media notifications always on, GCash transaction history full of small amounts, email mostly promo newsletters.

**Her story:** Maya's phone starts buzzing with small, seemingly unrelated things. A text about a "GCash promo" she doesn't remember signing up for. A viral post about a new government cash aid program that her Tita forwarded in the family GC. An email from what looks like her freelancing platform asking her to "verify her account." A social media ad for an AI-powered investment app with testimonials from people who look like her friends.

Each thread seems harmless alone. Together, they're a net closing around her.

**Act 1 — Normal Day:** Maya checks her phone. Morning routine. Family GC is active (Tita sharing a "blessed morning" image and a link to a "health tip"). Work GC has a new project brief. A friend DMs her a funny video. An SMS from an unknown number says she has an unclaimed reward. She scrolls her feed — a news article about rising prices, a post from a local influencer promoting a "legit" side hustle, and a deepfake video of a celebrity endorsing a product.

**Act 2 — The Web:** The threads tighten. The "GCash promo" text asks for her MPIN. The "government cash aid" link in the family GC leads to a form requesting her full name, address, and ID number. The freelancing platform email contains a link that looks right but the URL is slightly off. The AI investment app starts DMing her directly. Meanwhile, a friend in the barkada GC shares a political post that "everyone is talking about" — it's outrage bait tied to an upcoming local election. Maya starts noticing inconsistencies. Or she doesn't — and falls deeper in.

**Act 3 — The Reveal:** Depending on Maya's choices, she either catches the scam in time (and helps her family avoid it too), loses money and personal data, or something in between. The family GC thread pays off — did she warn Tita or stay quiet? The political disinfo thread pays off — did she engage, share, or verify? The emotional climax is the moment Maya realizes how many of the things on her phone were designed to manipulate her.

**Key choices:**
- Click or ignore the GCash promo link
- Forward or fact-check Tita's health tip
- Enter credentials on the phishing site or verify the URL
- Engage with or scroll past the political outrage post
- Trust or investigate the AI investment DMs
- Warn the family GC or stay out of it

---

#### PERSONA 2: THE AMPLIFIER — "Kuya Jun"

**Profile:** Jun Reyes, 48, municipal government employee in a mid-sized city in the Visayas. Active in local community Facebook groups. Proud of being "informed." Shares 10–15 posts a day. Believes he's helping people stay updated.

**Phone personality:** Default wallpaper, Facebook as the most-used app, dozens of group chats (community, church, barangay, alumni), email mostly government circulars, news app set to "trending."

**His story:** Jun starts his day by sharing. A post about a local politician's alleged corruption — it has a photo and everything, must be real. A "health advisory" about a new virus variant — better safe than sorry, share it. A warning about a kidnapping gang in the area — forwarded message, must be urgent. A "breaking news" article about foreign workers stealing local jobs.

Jun isn't malicious. He believes he's performing a public service. He's the uncle who shares everything because he cares. The player, inhabiting Jun's phone, starts to feel the compulsion — the social validation, the engagement, the sense of being a civic-minded person.

**Act 1 — Normal Day:** Jun scrolls his feed. He shares three posts before breakfast. His community group chat is buzzing about a local issue. He's the go-to guy for "news." He forwards a warning about a new scam (ironically, the same scam targeting Maya). He feels good about it.

**Act 2 — The Web:** Someone in the community group asks Jun for his source on the corruption post. He checks — it's from a page he doesn't remember liking. The health advisory is contradicted by the DOH website. The kidnapping warning is a recycled hoax from 2019. The "breaking news" article is from a site that doesn't exist outside Facebook. One by one, the things Jun shared start falling apart. But his posts already have hundreds of shares.

**Act 3 — The Reveal:** Jun confronts the consequences. A neighbor acted on the kidnapping hoax and confronted an innocent delivery rider. The corruption post is being used in a political campaign to smear a candidate. The health advisory caused panic buying at the local pharmacy. Jun's phone shows him the reach — the shares, the comments, the chain of forwarding. He sees how far it all went. The emotional climax is shame, followed by the question: what does he do now?

**Key choices:**
- Share immediately or read the full article first
- When challenged, double down or admit uncertainty
- Delete posts when proven wrong or leave them up
- Forward the warning to the family GC or verify first
- Respond to call-outs with defensiveness or openness
- Start fact-checking his own posts or continue as before

---

#### PERSONA 3: THE OPERATOR — "Reese"

**Profile:** Reese Lim, 30, former digital marketing specialist, now running a "reputation management" operation from a rented condo in BGC. Smart, pragmatic, morally flexible. Tells herself it's just marketing.

**Phone personality:** Clean, minimal. Multiple accounts on every platform. Burner numbers in contacts. Encrypted messaging apps. A "work" phone with dashboards and tools.

**Her story:** The player sees the other side. Reese's phone is a command center. She manages multiple fake accounts, uses AI tools to generate content, coordinates a small team of paid amplifiers, and runs targeting campaigns based on demographic data. Her client for this operation is a political campaign that wants to discredit an opponent.

**Act 1 — Normal Day:** Reese checks her dashboards. An AI content generator produces 50 variations of a smear post. She reviews targeting data — which barangays, which age groups, which income brackets. She assigns her team their quotas. She tests which emotional hooks perform best: anger, fear, disgust, hope. She sends a "health advisory" into community groups as a test of her distribution network. Business as usual.

**Act 2 — The Web:** The operation scales. Reese deploys a deepfake video. She seeds a "grassroots" petition through fake accounts. She watches the engagement metrics climb. But things get complicated — a real journalist starts asking questions. One of her team members gets cold feet. Her client pushes for more aggressive tactics. And she starts seeing the human impact: a real person (Maya) fell for one of her scams. A community leader (Jun) amplified her content perfectly.

**Act 3 — The Reveal:** Reese faces a choice. The operation is working, but the consequences are real — real people hurt, real communities poisoned. Her client wants to escalate. The journalist is closing in. Her team member threatens to leak. Reese's phone becomes a pressure cooker of competing demands. The emotional climax is the moral reckoning: she built this machine, and now she has to decide whether to keep it running.

**Key choices:**
- Use aggressive AI content generation or keep it "subtle"
- Target vulnerable demographics or broader audiences
- Respond to the journalist's inquiry or ignore it
- Protect or expose the team member who wants out
- Escalate or pull back when consequences become visible
- Take the money and run or try to undo the damage

---

#### PERSONA 4: THE INVESTIGATOR — "Dos"

**Profile:** Dos Villanueva, 35, journalist and digital forensics researcher at a small independent media outfit in Manila. Runs a fact-checking column. Chronically underfunded, overworked, running on coffee and conviction.

**Phone personality:** Organized chaos. Dozens of open browser tabs. Source conversations in encrypted apps. Verification tools bookmarked. News alerts on maximum. Notes app full of half-formed theories. Camera roll full of screenshots.

**Their story:** Dos is tracking a disinformation network. Tips come in — a suspicious Facebook page, a coordinated posting pattern, a too-perfect viral video. They use their phone to pull threads: reverse image searches, metadata analysis, source triangulation, digital breadcrumbs.

**Act 1 — Normal Day:** A tip arrives: a local community group is being flooded with fake health advisories and political smear posts. Dos starts the trace. They screenshot posts, check page creation dates, look for patterns. The phone fills with evidence. A colleague shares a separate tip about a deepfake video. Are they connected?

**Act 2 — The Web:** The threads converge. The fake health advisory, the political smear campaign, and the deepfake video all trace back to the same network. Dos maps the operation — the fake accounts, the AI-generated content, the coordinated amplification. They identify the targeting patterns. They find Reese's operation, though they don't know her name yet. But the operation pushes back — Dos starts receiving threatening messages, their social media accounts get mass-reported, and a coordinated smear campaign targets their credibility.

**Act 3 — The Reveal:** Dos has enough evidence to publish. But the threats are real, the outlet is small, and the operation has powerful backers. The player decides how to proceed: publish everything, approach law enforcement, tip off a bigger outlet, or confront the operator directly. The emotional climax is the tension between truth and safety, between the story and the cost of telling it.

**Key choices:**
- Follow the most promising lead or investigate all threads
- Protect sources or push them for more information
- Publish early with incomplete evidence or wait for the full picture
- Respond to threats or go quiet
- Work alone or collaborate with other journalists
- Confront the operation directly or work through official channels

### 3.3 Three-Act Structure (Macro)

| | Act 1: Normal Day | Act 2: The Web | Act 3: The Reveal |
|---|---|---|---|
| **Feeling** | Familiar, routine, comfortable | Uneasy, connected, escalating | Urgent, consequential, emotional |
| **Phone state** | Normal notification flow | Increasing volume, overlapping threads | Cascading consequences, callbacks to earlier choices |
| **Player posture** | Casual browsing, easy choices | Active investigation/participation, harder choices | Moral reckoning, no easy answers |
| **Pacing** | Slow, naturalistic | Accelerating | Peak tension, then denouement |

### 3.4 Cross-Persona Connections

The four personas exist in the same timeframe and the same web of events. Connections the player will notice across playthroughs:

- The scam text Maya receives was crafted in Reese's content pipeline
- The viral post Jun shares was seeded by one of Reese's fake accounts
- The health advisory Jun forwards is the test payload Reese used to validate her distribution network
- The deepfake video in Maya's feed is the same one Dos is investigating
- The community group where Jun is most active is a target in Reese's demographic data
- The journalist Reese is worried about is Dos
- The "team member who wants out" on Reese's phone may have been one of Dos's sources
- Jun's forwarded scam warning ends up in Maya's family GC

These connections are not announced. The player discovers them through repeated details: the same phone number, the same post text, the same profile picture, the same timestamp. The game rewards attention.

---

## 4. CONCEPTS TAUGHT

Every AI literacy concept maps to a phone interaction the player performs or encounters. The game never names the concept during play. The concept label appears only in the post-scenario debrief.

### 4.1 Concept Map

| Concept | Phone Interaction | Persona(s) | Example |
|---|---|---|---|
| **AI Hallucination** | AI chatbot customer service confidently gives wrong info | Target | Maya asks an AI banking chatbot about a suspicious transaction. It confidently confirms the scam as legitimate, citing a nonexistent policy. |
| **Automation Bias** | Trusting a "verified" badge or "official" account | Target, Amplifier | Jun shares a post from an account with a blue checkmark. The account was verified before being sold and repurposed. Maya trusts an email because it has official logos. |
| **Training Data Bias** | Social media algorithm reinforcing existing beliefs | Amplifier, Target | Jun's feed shows him more outrage content because that's what he engages with. Maya's feed shows her more "side hustle" content after she clicked one ad. |
| **Proxy Variables** | Scam targeting based on location, age, phone model | Operator, Target | Reese's dashboard shows targeting filters: "Visayas, 40–60, Android, active in community groups." Jun matches perfectly. |
| **Confidence ≠ Accuracy** | Deepfake video that looks perfect but is fabricated | All four | A video of a public figure endorsing a product/policy looks flawless. It's entirely AI-generated. Each persona encounters it differently. |
| **Contextual Blindness** | Forwarded message stripped of original context | Amplifier, Target | A quote is forwarded without the article it came from. The quote means something different in context. Jun forwards it; Maya receives it. |
| **Appropriate Trust** | Learning when to trust, verify, or dismiss content | All four | The browser verification mechanic: the player can search for any claim and see what they find. Sometimes verification is easy; sometimes it's ambiguous. The lesson is developing judgment, not following a checklist. |
| **Human-in-Command** | The moment you stop scrolling and actually check | Target, Amplifier | The game always offers the choice to pause and verify. Taking that choice costs time (in-game) but prevents harm. Not taking it is always the easier path. |
| **Risk Tiers** | Different stakes for different disinfo types | All four | Entertainment gossip vs. health misinformation vs. election disinfo. The game demonstrates that the same sharing behavior has wildly different consequences depending on the content type. |

### 4.2 Post-Scenario Debrief

After each persona's story concludes, the game transitions from the phone UI to a clean debrief screen. This is the only time the game breaks the phone metaphor.

The debrief shows:
- A timeline of the player's key choices
- Which concepts were encountered (now named explicitly)
- What happened as a result of each choice (the chain of consequences)
- What the player could have done differently (without being preachy — framed as "other players chose...")
- A "phone health score" — a playful summary of how well the player protected themselves and others

The tone of the debrief is warm and non-judgmental. The point is reflection, not grading.

---

## 5. MULTI-AGENT WRITING PIPELINE

All game content is generated through a multi-agent writing pipeline. Five writer agents, each with a distinct voice, produce alternative versions of every narrative beat. The best versions are selected and refined.

### 5.1 The Five Writers

| Agent | Voice | Specialty | Phone Content Style |
|---|---|---|---|
| **The Minimalist** | Hemingway/Carver. Short, sharp, loaded silences. | The weight of what's unsaid. | SMS messages that are two words long but devastating. Chat silences that stretch. Notifications that say everything by saying almost nothing. |
| **The Storyteller** | Warm, social, community-rooted. | Filipino social dynamics, relationships, the texture of daily life. | Family GC messages that feel real — the mix of memes, prayers, pasabuy requests, and gossip. Character voice that sounds like someone you know. |
| **The Thriller Writer** | Taut, propulsive, every beat a hook. | Suspense, revelation, cliffhangers. | Notifications that make you tap immediately. Messages that cut off at the worst moment. The "..." typing indicator used as a weapon. |
| **The Empathist** | Interior, emotional, empathetic. | The felt experience of being scammed, of spreading lies, of chasing truth. | The anxiety spiral of checking your GCash balance after clicking a link. The sick feeling of realizing you shared something false. The loneliness of being the only one who cares about the truth. |
| **The Satirist** | Sharp, darkly funny, uncomfortably recognizable. | The absurdity of scam culture, disinfo ecology, online life. | Scam texts that are accidentally poetic. Social media comments that are funnier than they should be. The pitch-perfect tone of a forwarded chain message. |

### 5.2 Pipeline Process

```
SEED → DRAFT → CRITIQUE → REVISION → EDITOR SCORE → SELECTION
```

**Step 1 — Seed:** A narrative beat is defined: situation, persona, act, concept to teach, phone UI type, emotional target.

**Step 2 — Draft:** All five agents produce their version of the beat. Each writes in their voice, targeting the same narrative and pedagogical goals.

**Step 3 — Critique:** Each agent critiques all five drafts (including their own) against the scoring rubric. Critiques are specific and constructive.

**Step 4 — Revision:** Each agent revises their draft based on the strongest critiques. Agents can incorporate elements from other agents' versions.

**Step 5 — Editor Score:** A scoring agent evaluates all revised drafts against the rubric and produces a ranked list with justifications.

**Step 6 — Selection:** The top-scoring draft is selected. In some cases, the best elements from multiple drafts are combined by the editor agent into a hybrid version.

### 5.3 Scoring Rubric

| Criterion | Weight | What It Measures |
|---|---|---|
| **Subtlety** | 20% | Does the concept emerge from the interaction naturally, or does it feel like a lesson? |
| **Hook Power** | 15% | Does the player want to tap that notification, read that message, open that email? |
| **Voice** | 15% | Is the writing distinctive? Does it sound like a real person on a real phone? |
| **Cultural Resonance** | 15% | Does it feel Filipino without being a caricature? Would a Filipino player recognize this? |
| **Choice Design** | 15% | Are the choices meaningful, non-obvious, and reflective of real decision-making? |
| **Emotional Impact** | 10% | Does the player feel something — anxiety, curiosity, shame, relief, recognition? |
| **Concept Integration** | 10% | Is the AI literacy concept present, learnable, and organically woven in? |

---

## 6. TECHNICAL ARCHITECTURE

### 6.1 Engine: Ink + Web

**Ink** handles all narrative logic: branching, variables, state tracking, conditional content, and story flow. The web layer (HTML/CSS/JS) handles all rendering, turning Ink output into a convincing phone interface.

The relationship:
- Ink is the brain. It decides what happens, what the player sees, what choices are available, and what consequences follow.
- The web layer is the body. It renders Ink's output as chat bubbles, notification banners, social media cards, email threads, and browser search results.
- **ink.js** (the JavaScript Ink runtime) processes the story in the browser. Custom JavaScript reads Ink's output and tags, then renders the appropriate UI component.

### 6.2 Ink Tags → UI Mapping

Ink tags tell the web layer what to render. Every piece of content includes a tag that specifies its UI type:

```ink
# UI: sms
# SENDER: +63 917 555 1234
# SENDER_NAME: Unknown
This is your GCash verification code: 4829. Do NOT share this with anyone.
    + [Reply: "I didn't request this"]
        # UI: sms
        # SENDER: player
        I didn't request any verification code.
    + [Ignore the message]
        You lock your phone and set it down.
    + [Forward to family GC]
        # UI: groupchat
        # CHAT: family
        # SENDER: player
        Has anyone else been getting these? 👀
```

**Tag vocabulary:**

| Tag | Renders As |
|---|---|
| `# UI: sms` | SMS thread message |
| `# UI: groupchat` | Group chat message bubble |
| `# UI: dm` | Direct message in ChatApp |
| `# UI: email` | Email in inbox or email detail view |
| `# UI: notification` | Banner notification (top of screen) |
| `# UI: socialmedia` | Social media feed post (card format) |
| `# UI: newsalert` | News app push notification or article |
| `# UI: gcash` | GCash/banking app notification or transaction |
| `# UI: browser` | In-game browser search results or web page |
| `# UI: phone_call` | Incoming/outgoing call screen |
| `# UI: voicemail` | Voicemail playback screen |
| `# UI: system` | Phone system notification (low battery, storage, etc.) |
| `# UI: camera` | Camera roll / photo viewer |
| `# UI: calendar` | Calendar event or reminder |
| `# UI: settings` | Settings screen interaction |

**Metadata tags** provide rendering details:

| Tag | Purpose | Example |
|---|---|---|
| `# SENDER:` | Who sent the message | `# SENDER: Tita Merly` |
| `# SENDER_ID:` | Links to contact/avatar data | `# SENDER_ID: tita_merly` |
| `# CHAT:` | Which group chat | `# CHAT: family` |
| `# TIMESTAMP:` | In-game time | `# TIMESTAMP: 9:47 AM` |
| `# TYPING_DELAY:` | Simulated typing indicator (ms) | `# TYPING_DELAY: 3000` |
| `# READ_RECEIPT:` | Show read receipt | `# READ_RECEIPT: true` |
| `# AVATAR:` | Avatar image path | `# AVATAR: avatars/tita_merly.png` |
| `# MEDIA:` | Attached image/video | `# MEDIA: images/deepfake_video.mp4` |
| `# LINK:` | Clickable URL (in-game) | `# LINK: www.gcash-promo.ph.cc` |
| `# EMOTION:` | Emotional tone hint for UI styling | `# EMOTION: urgent` |

### 6.3 State & Variables

Ink tracks all player state. Key variable categories:

**Trust metrics** (per-source):
```ink
VAR trust_family_gc = 70
VAR trust_unknown_sms = 30
VAR trust_official_email = 60
VAR trust_social_media = 50
VAR trust_news_app = 65
```

**Action counters:**
```ink
VAR links_clicked = 0
VAR messages_forwarded = 0
VAR posts_shared = 0
VAR facts_verified = 0
VAR numbers_blocked = 0
VAR scams_fallen_for = 0
VAR warnings_given = 0
```

**Story flags:**
```ink
VAR gcash_scam_clicked = false
VAR tita_health_tip_forwarded = false
VAR deepfake_video_shared = false
VAR phishing_credentials_entered = false
VAR journalist_contacted = false
VAR operation_exposed = false
```

**Relationship scores:**
```ink
VAR rel_family = 50
VAR rel_barkada = 50
VAR rel_work = 50
VAR rel_tita_merly = 50
```

### 6.4 File Structure

```
disinfo/
│
├── story/
│   ├── main.ink                    # Entry point, persona selection, global state
│   ├── globals.ink                 # All global variables and constants
│   │
│   ├── personas/
│   │   ├── target/
│   │   │   ├── target_main.ink     # Maya's story entry
│   │   │   ├── target_act1.ink     # Normal Day
│   │   │   ├── target_act2.ink     # The Web
│   │   │   ├── target_act3.ink     # The Reveal
│   │   │   └── target_debrief.ink  # Post-story debrief
│   │   │
│   │   ├── amplifier/
│   │   │   ├── amplifier_main.ink
│   │   │   ├── amplifier_act1.ink
│   │   │   ├── amplifier_act2.ink
│   │   │   ├── amplifier_act3.ink
│   │   │   └── amplifier_debrief.ink
│   │   │
│   │   ├── operator/
│   │   │   ├── operator_main.ink
│   │   │   ├── operator_act1.ink
│   │   │   ├── operator_act2.ink
│   │   │   ├── operator_act3.ink
│   │   │   └── operator_debrief.ink
│   │   │
│   │   └── investigator/
│   │       ├── investigator_main.ink
│   │       ├── investigator_act1.ink
│   │       ├── investigator_act2.ink
│   │       ├── investigator_act3.ink
│   │       └── investigator_debrief.ink
│   │
│   ├── scenarios/                   # Reusable scenario modules
│   │   ├── gcash_scam.ink          # GCash wrong-send scam
│   │   ├── phishing_email.ink      # Institutional phishing
│   │   ├── deepfake_video.ink      # Deepfake encounter
│   │   ├── health_misinfo.ink      # Health misinformation chain
│   │   ├── election_disinfo.ink    # Political disinformation
│   │   ├── job_scam.ink            # Fake job offer
│   │   └── ai_chatbot.ink          # AI hallucination encounter
│   │
│   └── shared/
│       ├── contacts.ink            # Shared NPC definitions
│       ├── messages.ink            # Reusable message templates
│       ├── verification.ink        # Browser verification mechanics
│       └── consequences.ink        # Shared consequence logic
│
├── web/
│   ├── index.html                  # Main page, phone frame
│   │
│   ├── phone-ui.js                 # Core: reads Ink tags, dispatches to component renderers
│   ├── phone-ui.css                # Core: phone frame, status bar, home screen, global styles
│   ├── ink-bridge.js               # ink.js integration, story state management
│   │
│   ├── components/
│   │   ├── chat.js                 # Group chat / DM renderer (ChatApp)
│   │   ├── chat.css
│   │   ├── sms.js                  # SMS thread renderer
│   │   ├── sms.css
│   │   ├── email.js                # Email inbox and detail view renderer
│   │   ├── email.css
│   │   ├── feed.js                 # Social media feed renderer
│   │   ├── feed.css
│   │   ├── notification.js         # Notification banner/shade renderer
│   │   ├── notification.css
│   │   ├── browser.js              # In-game browser (search + results)
│   │   ├── browser.css
│   │   ├── gcash.js                # Banking/wallet app renderer
│   │   ├── gcash.css
│   │   ├── news.js                 # News app renderer
│   │   ├── news.css
│   │   ├── contacts.js             # Contacts app renderer
│   │   ├── settings.js             # Settings app renderer
│   │   ├── camera.js               # Gallery/photo viewer renderer
│   │   ├── calendar.js             # Calendar renderer
│   │   ├── homescreen.js           # Home screen with app grid
│   │   ├── lockscreen.js           # Lock screen with notifications
│   │   └── debrief.js              # Post-story debrief renderer
│   │
│   └── assets/
│       ├── avatars/                # Character profile images
│       ├── ui-elements/            # Phone UI chrome (status bar icons, app icons, etc.)
│       ├── media/                  # In-game images, video thumbnails
│       ├── sounds/                 # Notification sounds, typing sounds
│       └── wallpapers/             # Per-persona home screen wallpapers
│
├── tools/
│   ├── ink-compiler/               # Ink compilation scripts
│   ├── content-pipeline/           # Multi-agent writing pipeline scripts
│   └── testing/                    # Playtest automation, state validation
│
└── docs/
    ├── game-design-v2.md           # This document
    ├── style-guide.md              # Writing style guide for all agents
    ├── concept-glossary.md         # AI literacy concept definitions
    └── playtest-protocol.md        # How to run and record playtests
```

### 6.5 Rendering Flow

```
1. ink.js advances the story
2. phone-ui.js reads the output text + tags
3. Tags are parsed → UI type determined (e.g., # UI: groupchat)
4. Metadata tags extracted (SENDER, CHAT, TIMESTAMP, etc.)
5. Appropriate component renderer called (e.g., chat.js)
6. Component renders the content as a styled UI element
7. If Ink provides choices, they are rendered as interactive elements
   (reply options in chat, buttons in notifications, links in email)
8. Player interacts → choice sent back to ink.js
9. Loop continues
```

**Special rendering behaviors:**

- **Typing indicators:** When `# TYPING_DELAY:` is set, the component shows a "..." animation for the specified duration before revealing the message.
- **Notification stacking:** When multiple `# UI: notification` tags fire in sequence, they stack on the lock screen or notification shade.
- **Time jumps:** A `# TIME_SKIP:` tag triggers a transition animation (screen dims, clock spins, screen brightens at new time).
- **Phone state changes:** Tags like `# BATTERY: 15` or `# SIGNAL: weak` update the status bar.
- **App switching:** When the story moves from one app to another, a smooth transition mimics the real phone app-switching animation.

---

## 7. SCENARIO DESIGN TEMPLATES

Each scenario (a self-contained disinformation/scam encounter) follows a standard template to ensure consistency across writers and personas.

### 7.1 Scenario Template

```
SCENARIO: [Name]
PERSONA(S): [Which persona(s) encounter this]
ACT: [1, 2, or 3]
UI TYPE(S): [SMS, GroupChat, Email, SocialMedia, etc.]
CONCEPT(S) TAUGHT: [AI literacy concept(s)]
EMOTIONAL TARGET: [What the player should feel]

SETUP: [How the scenario enters the player's phone — what notification, what context]
ESCALATION: [How it gets more convincing/dangerous if the player engages]
RED FLAGS: [What clues exist for the attentive player]
EXIT POINTS: [Where the player can disengage or protect themselves]
CONSEQUENCES: [What happens based on the player's choices]
CROSS-PERSONA LINK: [How this scenario connects to other personas' stories]
```

### 7.2 Example: GCash Wrong-Send Scam

```
SCENARIO: GCash Wrong-Send
PERSONA(S): Target (primary), Operator (origin)
ACT: 1 (setup) → 2 (escalation)
UI TYPE(S): GCash notification, SMS, GroupChat
CONCEPT(S) TAUGHT: Appropriate Trust, Human-in-Command
EMOTIONAL TARGET: Urgency, guilt, then relief or regret

SETUP:
Maya receives a GCash notification: "You received ₱5,000 from [Unknown]."
Seconds later, an SMS from an unknown number: "Hi po, sorry, I sent money
to the wrong number. Please send it back, my family needs it for medicine.
Here is my number: 0917XXXXXXX."

ESCALATION:
If Maya engages, the sender becomes more emotional and urgent. They send a
screenshot of a "GCash transaction" (fabricated). They ask Maya to send the
money to a DIFFERENT number than the one that supposedly sent it. If Maya
hesitates, they invoke guilt: "Please po, it's for my child."

RED FLAGS:
- The received amount doesn't show in Maya's actual GCash balance (it was a
  fake notification triggered by the scammer exploiting a known GCash UI quirk)
- The sender asks to return money to a DIFFERENT number
- Urgency and emotional manipulation
- No way to verify the sender's identity

EXIT POINTS:
- Check GCash balance (shows no actual deposit)
- Ask the sender to resolve it through GCash support
- Block the number
- Ask in the family GC or barkada GC for advice
- Google "GCash wrong send scam"

CONSEQUENCES:
- If Maya sends money: loses ₱5,000, shame, financial stress
- If Maya verifies first: discovers the scam, can warn others
- If Maya asks the family GC: gets mixed advice (Tita says send it back
  immediately; cousin says it's a scam)
- Cross-persona: In Reese's phone, this scam is one of several "low-effort
  high-return" operations she runs on the side for extra income

CROSS-PERSONA LINK:
Reese's operator phone shows a spreadsheet tracking "wrong-send" targets,
success rates, and revenue. Maya's number is on the list.
```

---

## 8. CHARACTER BIBLE

### 8.1 Core Characters

**Maya Santos (The Target)**
- 24, freelance graphic designer, QC
- Lives with parents and lola
- Income: irregular, ₱15–25K/month
- Phone: Mid-range Android, cracked screen protector
- Social media: Instagram (personal), Facebook (family/community), TikTok (entertainment)
- Personality: Creative, cautious with money, close to family, slightly naive about digital threats, trusts official-looking things
- Achilles heel: Responds to authority and urgency

**Jun Reyes (The Amplifier)**
- 48, municipal government employee, Visayas city
- Married, two teenage kids
- Income: ₱25–30K/month, stable
- Phone: Budget Android, default settings, font size large
- Social media: Facebook (primary and near-only), community groups, alumni groups
- Personality: Civic-minded, proud of being informed, generous sharer, hates feeling embarrassed, defensive when challenged
- Achilles heel: Shares first, verifies never

**Reese Lim (The Operator)**
- 30, former digital marketer turned disinformation operator, BGC
- Single, estranged from family
- Income: ₱150K+/month (variable, cash-heavy)
- Phone: Latest iPhone, plus two burner Androids
- Social media: Multiple fake accounts across all platforms, personal accounts locked down
- Personality: Intelligent, strategic, compartmentalized ethics, tells herself it's "just marketing," increasingly uncomfortable with the human cost
- Achilles heel: Sees herself as a professional, not a criminal

**Dos Villanueva (The Investigator)**
- 35, journalist/digital forensics researcher, Manila
- Uses they/them pronouns
- Income: ₱20–28K/month, supplemented by freelance
- Phone: Mid-range Android, encrypted messaging apps, VPN always on
- Social media: Minimal personal presence, extensive monitoring of public pages/groups
- Personality: Tenacious, methodical, idealistic despite cynicism, chronically overworked, deeply empathetic beneath a professional shell
- Achilles heel: Takes on too much, trusts sources too quickly when desperate

### 8.2 Supporting Characters

**Tita Merly** — Maya's aunt, Jun's generation, the family GC's most active member. Shares blessed-morning images, health tips of dubious origin, and political opinions with conviction. Loving and well-meaning. A vector for misinformation who would be horrified to know it.

**Bogs** — Maya's friend in the barkada GC. Skeptical, tech-savvy, the one who says "that's fake" before anyone else. Sometimes right, sometimes just contrarian. A foil for the player's own verification instincts.

**Councilor Ramirez** — A local politician who is both the target of Reese's smear campaign and, in a separate thread, genuinely corrupt in small ways. The truth is complicated. A test of the player's ability to hold nuance.

**Kat** — Reese's team member who wants out. A younger operator who joined for the money but can't sleep anymore. A potential source for Dos. A mirror for Reese's own buried conscience.

**Editor Mike** — Dos's editor at the independent media outfit. Supportive but pragmatic. Pushes for the story but worries about legal threats and the outlet's survival. Represents institutional constraints on truth-telling.

---

## 9. DESIGN PRINCIPLES & CONSTRAINTS

### 9.1 What This Game Is

- A phone you can't put down
- A mirror that shows you how you already behave online
- A lesson that doesn't feel like one until it's over
- A Filipino story with universal resonance
- An argument that AI literacy is survival literacy

### 9.2 What This Game Is Not

- A quiz about misinformation (no right/wrong answers during play)
- A lecture with interactive elements
- A horror game (unsettling, not scary)
- A judgment machine (the debrief reflects, not grades)
- A simulation of real platforms (we evoke, not replicate)

### 9.3 Design Constraints

- **No real brands in UI:** We reference but don't replicate. "GCash" becomes the in-game wallet. "Messenger" becomes "ChatApp." Close enough to feel real, different enough for legal safety. (Names in this document are working references for design clarity.)
- **No real people:** All characters are fictional. Public figures referenced in scenarios are invented.
- **No real URLs:** All in-game links, websites, and domains are fictional.
- **Accessibility:** All text content must be screen-reader compatible. Color is never the only indicator. Touch targets meet minimum size requirements.
- **Mobile-first:** Designed for portrait orientation on mobile screens. Desktop version shows a phone frame centered on screen.
- **Offline-capable:** Once loaded, the game should run without an internet connection (all content bundled).
- **Save system:** Progress auto-saves per persona. Player can resume any persona from where they left off.

### 9.4 Content Sensitivity

The game deals with scams, manipulation, and disinformation — topics that are real and personal for many Filipino players. Guidelines:

- **Never mock victims.** The Target persona must be sympathetic. Falling for scams is human, not stupid.
- **Never glorify operators.** The Operator persona must show consequences and moral cost.
- **Respect real harm.** Real scam types and disinfo patterns are referenced. The game must not trivialize the damage they cause.
- **Provide real resources.** The debrief can link to actual fact-checking organizations, scam reporting hotlines, and digital literacy resources.
- **Content warnings:** A brief, non-spoilery content note at game start: "This game simulates scams, disinformation, and online manipulation. All scenarios are fictional but inspired by real tactics."

---

## 10. DEVELOPMENT ROADMAP

### Phase 1: Prototype (Single Scenario)
- Build the phone UI frame (home screen, status bar, notification system)
- Implement one complete scenario (GCash Wrong-Send) for the Target persona
- Prove the Ink → phone UI rendering pipeline works
- Validate the interaction patterns (reply, ignore, forward, verify)

### Phase 2: Single Persona (Target, Full Arc)
- Complete Maya's three-act story
- All phone apps functional
- Full notification system with timing and pacing
- Browser verification mechanic working
- Debrief screen implemented
- First playtest round

### Phase 3: All Four Personas
- Complete stories for Amplifier, Operator, Investigator
- Cross-persona connections implemented
- Persona selection screen
- Save system across personas
- Second playtest round

### Phase 4: Polish & Pipeline
- Multi-agent writing pipeline produces final content
- Audio design (notification sounds, ambient)
- Visual polish (avatars, UI elements, animations)
- Accessibility pass
- Content sensitivity review
- Final playtesting

### Phase 5: Release
- Web deployment (static hosting)
- Mobile responsiveness testing
- Analytics integration (anonymous play data for research)
- Post-launch content updates (new scenarios, new scam types)

---

## APPENDIX A: SCAM & DISINFO SCENARIO INDEX

A running list of Philippine-context scenarios to develop:

| Scenario | Type | Threat Level | Persona(s) |
|---|---|---|---|
| GCash wrong-send scam | Financial scam | High | Target, Operator |
| Fake government cash aid | Phishing | High | Target, Amplifier |
| Health supplement miracle cure | Health misinfo | Medium | Amplifier, Target |
| Election candidate smear | Political disinfo | High | All four |
| Fake job offer (data harvesting) | Phishing | Medium | Target, Operator |
| AI-generated celebrity endorsement | Deepfake | Medium | Target, Investigator |
| "Kidnapping gang in area" chain message | Fear-based misinfo | Medium | Amplifier |
| Fake bank security alert | Phishing | High | Target |
| Investment/crypto scam (AI testimonials) | Financial scam | High | Target, Operator |
| Natural disaster misinfo (wrong evacuation routes) | Crisis misinfo | Critical | All four |
| Fake charity after typhoon | Financial scam | High | Amplifier, Target |
| AI chatbot giving wrong medical advice | AI hallucination | Medium | Target |
| Doxxing threat from troll farm | Harassment | High | Investigator |
| Manipulated news screenshot | Visual misinfo | Medium | Amplifier |
| Romance scam via dating app | Social engineering | High | Target |

## APPENDIX B: GLOSSARY

**Barkada** — Friend group. The social circle outside family.
**Barangay** — The smallest administrative division in the Philippines; a neighborhood or village unit.
**BGC** — Bonifacio Global City, a business and lifestyle district in Metro Manila.
**GCash** — The dominant mobile wallet in the Philippines, used for payments, transfers, and bills.
**Kuya/Ate** — Older brother/older sister. Used as honorifics for older peers, not just siblings.
**Lola/Lolo** — Grandmother/Grandfather.
**Pasabuy** — Asking someone to buy something for you while they're out.
**Po/Opo** — Respectful particles in Filipino, used when speaking to elders or in formal situations.
**QC** — Quezon City, the largest city in Metro Manila by area.
**Tita/Tito** — Aunt/Uncle. Used broadly for older family friends as well as blood relatives.
**Viber** — A messaging app widely used in the Philippines, especially by older demographics.

---

*DISINFO v2.0 — The definitive game design bible. This document consolidates all creative pivots, technical decisions, and design principles into a single actionable reference. Every section is designed to be implementable: hand it to a writer, a developer, or a playtester and they know what to do.*
