# ACT 2: "THE TIGHTENING" — SCENE BLUEPRINTS
## Scenes 3-8: Maya Santos, Target Persona

**Act Overview:**
- **Central Question:** "When multiple manipulations converge, how do you tell signal from noise?"
- **Emotional Arc:** Unease → Confusion → Denial → Dread
- **Timeline:** Monday 8:47 AM through Thursday 3:47 PM (crisis week)
- **Stakes:** Medium (relationships strained, real money at risk, reputation threatened)

---

## Scene 3: "The Feed Knows You"

**Act:** 2  
**Timestamp:** Monday, 8:47 AM (jeepney commute to client meeting)  
**Location:** Inside jeepney, Commonwealth Avenue traffic  
**Phone State:** Social media feed open, notifications accumulating, battery 67%, mobile data  
**Emotional Baseline:** Monday morning tiredness, freelancer anxiety about the client meeting, residual unease from weekend (Act 1 events)  
**Emotional Target:** Creeping realization that her feed is "too relevant" — discomfort she can't quite name  

**Primary AI Concept:** Proxy variable targeting  
**Secondary Concept(s):** Data privacy & inference, feedback loops (initialization)  

### Character Knowledge IN:
**Maya knows:**
- She has a client meeting at 10 AM in BGC (the KAIZEN project)
- Her feed has been showing a lot of "side hustle" and finance content lately
- Tita Merly's health link from Act 1 is still sitting in the family GC
- Her GCash balance is tight (whether she lost money to the scam or not, freelancer life is precarious)

**Maya believes:**
- Social media algorithms are "kinda creepy" but mostly harmless
- Targeted ads are normal — everyone gets them
- The feed shows popular content, not manipulated content
- Her phone activity is private unless she explicitly shares it

**Relationship states:**
- Family GC: Active, Tita Merly still sharing things daily
- Work GC (Pixel Punks): Neutral, awaiting her meeting results
- Barkada GC: Casual, Rico still sending memes
- Client relationship: Professional anxiety — needs this project

### Required Story Beats:

1. **The Commute Opens:** Maya on jeepney, opens social media to kill time before meeting. First three posts are eerily relevant: debt consolidation ad, graphic designer "success story," BGC coworking space promo. She notices but dismisses as coincidence.

2. **The Pattern Intensifies:** Next scroll: freelancer tax tips, GCash loan offer ("Pre-approved for ₱15,000!"), post about client who didn't pay designer. Every single item targets her exact situation. The targeting is so precise it crosses from helpful to unsettling.

3. **The Choice Moment:** A sponsored post appears: "Freelancers in QC — Earn stable ₱40K/month. Government-registered program. Limited slots. Apply now." It has an official-looking logo. The comments are full of testimonials. The link asks for: name, address, skills, current income, GCash number.

4. **Consequence Beat:** If Maya clicks and fills the form, she voluntarily hands over proxy data that will be used to refine targeting. If she screenshot-and-searches, she finds it's a data harvesting operation (but the damage of exposure is done — the algorithm now knows she's interested). If she scrolls past, the ad will return, increasingly urgent.

5. **Scene Exit:** Maya arrives at BGC, puts phone away. The feed has successfully mapped her vulnerabilities. She feels vaguely watched but can't articulate why. The meeting is in 15 minutes.

### The Key Choice:

**Option A:** Fill out the "government program" application — it looks legitimate, and ₱40K stable income would change everything  
- **Immediate consequence:** Form submitted. Confirmation page says "We'll contact you within 48 hours." Feels hopeful.
- **Delayed consequence:** Her phone number and income data are now in a targeting database. Scene 5's voice scam will use this data. Scene 8's invoice scam will reference her "application."
- **What it reveals about Maya:** She's financially stressed enough to take risks. Hope overrides caution.

**Option B:** Screenshot the ad and reverse-image-search the logo — it takes 3 minutes she doesn't have before the meeting  
- **Immediate consequence:** Search shows the logo is stolen from a real government agency. The program doesn't exist. She deletes the screenshot, heart pounding. She's now late to the meeting (arrives flustered).
- **Delayed consequence:** The act of searching flags her as "verification-prone" — future scams will be more sophisticated. But she avoided giving away data.
- **What it reveals about Maya:** She's learning to verify, but it costs her (social/professional cost of being late, being "paranoid").

**Both Choices Must Hurt Because:**  
Option A offers real hope (stable income would solve her biggest stressor) but requires trusting a system that's already shown cracks. Option B protects her data but makes her late to a crucial meeting, damages her professional reputation, and leaves her wondering if she's becoming paranoid. The financially smart choice (verify) has an immediate professional cost. The quick choice (trust and apply) feels rational in the moment but opens a door she can't close.

### Character Knowledge OUT:
**Maya now knows:**
- Her feed is showing her very specific content (whether she understands why or not)
- That "government program" is either real or fake (depending on choice)
- Verification takes time she often doesn't have

**Maya now believes:**
- (If Option A) Maybe her luck is turning / maybe she should be more careful with online forms
- (If Option B) She needs to be more suspicious / but being suspicious has costs

**Relationship states changed:**
- Client meeting: Started flustered (if Option B) or confident (if Option A)
- Self-perception: Either "I'm being smart about opportunities" or "I'm becoming paranoid"

### Flags Set:
- `feed_targeting_noticed` = true
- `freelance_gov_program_applied` = true/false
- `verification_cost_experienced` = true (if Option B)
- `proxy_data_volunteered` = true (if Option A)
- `late_to_client_meeting` = true/false

### Callback Opportunities:
**From Act 1:**
- The GCash scam number (if she fell for it) — same operation harvesting data
- Tita Merly's health link — same pattern of official-looking but fake
- The "side hustle" influencer post — same targeting mechanism

**Sets up:**
- Scene 5: Voice scam will use data from this form (if filled)
- Scene 6: Viral political post will appear because algorithm learned her engagement patterns
- Scene 8: Invoice scam will reference "your recent application" (if filled)

### Cultural Authenticity Touchpoints:
- Jeepney commute as work time (phone is the office)
- BGC as aspirational geography (crossing from QC to BGC is crossing class lines)
- Government-registered programs as trust signals (history of government aid programs)
- ₱40K as life-changing money (specificity of what that means for a QC freelancer)
- The calculus of being late to a meeting (professionalism vs. paranoia)

### Phone UI Details:
**What the player sees:**
- Social media feed (TikTok/Facebook hybrid aesthetic)
- Sponsored post with official-looking logo (PH government seal variant)
- Form fields: Full Name, Address, Skill Set, Monthly Income, GCash Number
- Comments section with testimonials (mix of real-seeming and bot-generated)
- Reverse image search results (if Option B)

**Audio cues:**
- Jeepney engine rumble (ambient)
- Message notification sound (intermittent)
- "You have arrived at your destination" (maps app, end of scene)

**Visual tells:**
- Post is "Sponsored" (small gray text)
- Logo is slightly pixelated (if examined closely)
- URL is long and suspicious (bitly link to Google Form)
- Comments are recent but profiles look generic
- Battery indicator dropping (time pressure)

### Guardrails Check:
- [x] **Complicity before clarity:** Player fills form / searches BEFORE understanding it's part of a coordinated operation
- [x] **Phone feels real:** Social media feed, sponsored posts, form-filling are all standard phone interactions
- [x] **No villains:** The operation is faceless. Maya's choices are understandable either way.
- [x] **Concept never named:** "Proxy variable targeting" never appears. Player just experiences eerily relevant ads.
- [x] **Both choices hurt:** Apply = hope but risk. Verify = safety but professional cost.

---

## Scene 4: "Family GC Pressure Cooker"

**Act:** 2  
**Timestamp:** Monday, 7:34 PM (home, after long work day)  
**Location:** Maya's room, lying on bed, family dinner finished  
**Phone State:** Family GC exploding with 47 unread messages, battery 34%, notifications on  
**Emotional Baseline:** Exhausted from client meeting (which went okay but not great), mentally drained, just wants to scroll and decompress  
**Emotional Target:** Trapped between family loyalty and truth, the sick feeling of watching misinformation spread through people you love  

**Primary AI Concept:** Collective sensemaking (group consensus replacing evidence)  
**Secondary Concept(s):** Emotional manipulation, source verification barriers  

### Character Knowledge IN:
**Maya knows:**
- The family GC is active (it's always active)
- Tita Merly shares health/political content regularly
- Papa has high blood pressure (Tita's "health cures" are aimed at him)
- An election is coming (local, for city council — Quezon City)
- She's been noticing weird patterns online (from Scene 3)

**Maya believes:**
- Family is family — you don't publicly contradict elders
- Tita Merly means well, even when she shares questionable things
- The GC is for connection, not conflict
- If she rocks the boat, she'll be labeled as "the difficult one"

**Relationship states:**
- Family GC: Warm but high-obligation (expected to engage)
- Tita Merly: Loving but exhausting (the "sharer")
- Mama: Supportive but conflict-averse (won't back Maya up publicly)
- Cousin Jep: Ally in skepticism but also conflict-averse

### Required Story Beats:

1. **The Explosion:** Maya opens GC to 47 messages. It's chaos. Tita Merly has shared a video claiming local councilor candidate Ramirez "was caught on camera accepting bribe from Chinese developers." The video looks news-quality. Everyone is reacting with rage emojis. Lolo sent "😡😡😡". Mama said "Grabe naman." Tita Ching is calling for a boycott.

2. **The Momentum Build:** The GC is doing collective sensemaking in real-time. No one has verified, but everyone agrees. Tita Merly adds: "My friend from church works in city hall, she confirmed it." Cousin from province chimes in: "I saw this on Facebook too, maraming nag-share." The consensus is forming: Ramirez is corrupt. The group is becoming certain together.

3. **The Choice Moment:** Maya pauses the video. Something is off — the "news logo" looks wrong, the audio doesn't sync perfectly with the lip movements. She's seen deepfakes in Act 1 (Rico's video). But the GC is on fire. 47 messages of agreement. To question it now is to question everyone.

4. **Consequence Beat:** If Maya stays silent, the consensus solidifies — the GC will forward the video to other GCs (Tita Merly announces "I'm sharing this to my church group and barangay GC"). If Maya gently questions it, the GC turns on her — "Ikaw talaga Maya, always doubting" / "Are you defending corrupt politicians?" If she shares a fact-check link, she's labeled "elitist" or "bayaran."

5. **Scene Exit:** The GC moves on to other topics (someone asks about borrowing the karaoke machine). The video is already out in the wild, shared to 5+ other GCs. Maya lies in bed, staring at the ceiling, feeling the weight of having either failed to stop a lie or damaged her family relationships trying.

### The Key Choice:

**Option A:** Stay silent, react with a neutral emoji (👍 or "Noted"), let it pass to preserve peace  
- **Immediate consequence:** The GC interprets silence as agreement. Tita Merly shares to 5 more groups. Mama thanks everyone for being "informed." The lie spreads unopposed.
- **Delayed consequence:** The deepfake video contributes to Ramirez losing the election (shows up in Scene 6's news). Maya will see the consequences of her silence. The operation (Reese, in Operator arc) notes that the Santos family GC is a reliable vector.
- **What it reveals about Maya:** She values family harmony over truth. Or she's learned that fighting misinformation in the GC is futile.

**Option B:** Type: "Wait, let me check this muna. The video looks edited?" (gentle, question-marked, non-accusatory)  
- **Immediate consequence:** Immediate pushback. Tita Merly: "Edited? Hindi yan edited, news yan!" Tita Ching: "Maya naman, bakit ba lagi kang nega." Cousin Jep privately DMs: "I think you're right but I'm not gonna say it in the GC lol." Mama stays silent (doesn't defend Maya).
- **Delayed consequence:** Maya is now marked as "the skeptic" in the family. Future shares will include preemptive strikes: "I know Maya will say this is fake but..." The family bond is strained. But the video's spread is slightly slowed (some members pause).
- **What it reveals about Maya:** She's willing to take social damage to slow misinformation. But she's alone in it.

### Both Choices Must Hurt Because:
Silence feels like complicity — Maya knows it's fake (or suspects strongly), and her silence helps it spread to hundreds more people through the GC network. But speaking up makes her the family problem, damages relationships she cherishes, and doesn't actually stop the video (Tita Merly shares it anyway, just with "even though Maya doubted it"). The truth costs her family warmth. The lie costs her integrity. There's no win.

### Character Knowledge OUT:
**Maya now knows:**
- The family GC can collectively convince itself of anything through consensus
- Questioning a viral claim in the GC has high social cost
- Even obvious fakes spread if they confirm what people want to believe
- She can't count on family to back her up, even when she's right

**Maya now believes:**
- (If Option A) It's not worth fighting misinformation in the family / she's powerless
- (If Option B) She has to be "that person" who questions things / she's isolated

**Relationship states changed:**
- Family GC: Either complicit (silent) or strained (questioned)
- Tita Merly: Either still warm or cooling ("Maya is so suspicious lately")
- Cousin Jep: Private ally, public coward (DMs support but won't go public)
- Mama: Quietly disappointed (in Maya for causing tension, or in the family for attacking Maya)

### Flags Set:
- `family_gc_deepfake_shared` = true
- `maya_questioned_family_gc` = true/false
- `family_gc_tension_level` = low/medium/high
- `jep_private_ally` = true (if Option B)
- `collective_sensemaking_experienced` = true

### Callback Opportunities:
**From Act 1:**
- Tita Merly's health link sharing pattern (same person, same behavior)
- Maya's earlier choice to heart-react or question (establishes pattern)

**Sets up:**
- Scene 6: The video goes viral citywide, Maya sees it referenced everywhere
- Scene 7: Family GC references "that Ramirez video we talked about" as settled fact
- Act 3: The election results / consequences of the smear campaign become real

### Cultural Authenticity Touchpoints:
- **Utang na loob:** Maya owes respect to elders (Tita Merly), making questioning her doubly difficult
- **Hiya:** Public contradiction brings shame to both parties
- **Pakikisama:** Going along to get along is the expected behavior
- **Family GC dynamics:** The mix of important (health) and mundane (karaoke rental) and explosive (politics)
- **Barangay/church networks:** GCs aren't isolated — they're interconnected, so one lie spreads to dozens of groups
- **"Bayaran" accusation:** Common Filipino political discourse — if you defend a politician, you must be paid by them

### Phone UI Details:
**What the player sees:**
- Family GC interface: 47 messages, rapid-fire, mix of text and emoji reactions
- Video player (embedded): news-style chyron, "COUNCILOR RAMIREZ BRIBERY SCANDAL" header
- Participants: Tita Merly, Mama, Lolo, Tita Ching, Cousin Jep, Ate from Canada, others
- Message timestamps showing the cascade (5-10 messages per minute at peak)
- Typing indicators (multiple people typing at once)

**Audio cues:**
- Rapid-fire notification sounds (overwhelming)
- Video audio: news-style voiceover, "leaked footage"
- Silence after Maya's questioning message (if Option B)

**Visual tells:**
- Video quality is too good (professional lighting for a "leaked" video)
- Lip-sync is slightly off (if examined closely)
- "News logo" is generic, not a real station
- No timestamp on video, no reporter name
- Comments are emotional, not analytical

### Guardrails Check:
- [x] **Complicity before clarity:** Player reacts to GC before understanding the video is AI-generated
- [x] **Phone feels real:** GC conversation, video forwarding, emoji reactions are all authentic
- [x] **No villains:** Tita Merly genuinely believes she's sharing important info. The GC is trying to be informed citizens.
- [x] **Concept never named:** "Collective sensemaking" never appears — player just experiences group consensus formation
- [x] **Both choices hurt:** Silence = complicity. Speaking = isolation. Both have real costs.

---

## Scene 5: "The Voice That Sounds Right"

**Act:** 2  
**Timestamp:** Tuesday, 2:18 PM (working from home, deep in design work)  
**Location:** Maya's room, laptop open, headphones on, in flow state  
**Phone State:** Silent mode, face-down on desk, call incoming (breaks through silent mode)  
**Emotional Baseline:** Focused, slightly stressed (client revisions due tomorrow), still processing family GC tension from yesterday  
**Emotional Target:** Violated — her focus shattered, her trust in voice as identity broken  

**Primary AI Concept:** Synthetic media detection (voice cloning)  
**Secondary Concept(s):** Automation bias (trusting familiar voices)  

### Character Knowledge IN:
**Maya knows:**
- She's on deadline (client revisions for KAIZEN due Wednesday morning)
- Her flow state is precious (hard to regain once broken)
- Unknown calls are usually spam, but sometimes they're clients
- She filled out that "government program" form yesterday (if Scene 3 Option A)

**Maya believes:**
- She can recognize people's voices (especially people she knows)
- Voice calls are harder to fake than text
- If someone calls (vs. texts), it's more serious/legitimate
- Government agencies call to follow up on applications

**Relationship states:**
- Client (KAIZEN): Neutral, awaiting her revisions
- Family: Still processing GC tension
- Work mode: Deep focus, protective of her time

### Required Story Beats:

1. **The Interruption:** Maya is in flow. The phone rings, cutting through silent mode (system calls override silent). Unknown number, but local area code. She debates ignoring it — could be a client referral, could be spam. She answers.

2. **The Familiar Voice:** "Hi Maya? This is Jess. Jess Reyes from KAIZEN." The voice is PERFECT. It's Jess's cadence, Jess's verbal tics ("So, like..."), Jess's warmth. But Jess would message first, not call. "Sorry to call directly, but I need to rush-process a deposit to secure the final payment. Can you confirm your GCash number real quick?"

3. **The Choice Moment:** The voice is SO convincing. But the request is weird — payment details should go through email/contract. Maya's phone shows it's an unknown number, not Jess's saved contact. But the voice is Jess. How could it not be Jess?

4. **Consequence Beat:** If Maya gives the GCash number, the "caller" says "Perfect! You'll see the deposit in 10 minutes." (It never comes. In 10 minutes, she gets a GCash OTP request — someone is trying to access her account using the number she confirmed.) If Maya hesitates and says "Can you email me instead?", the voice gets slightly flustered, then the call drops. She texts the REAL Jess, who replies: "I didn't call you??"

5. **Scene Exit:** Maya sits in silence, staring at her phone. That voice was Jess. She would swear it was Jess. But it wasn't. If voices can be faked this perfectly, what can't be faked? Flow state is destroyed. She closes her laptop. She can't focus anymore.

### The Key Choice:

**Option A:** Give the GCash number — it's Jess's voice, and she did fill out that government form (if Scene 3 Option A), so people asking for her GCash isn't unusual  
- **Immediate consequence:** "Jess" confirms the number. Call ends. 10 minutes later: GCash OTP request. "Enter this code to verify your identity: 482947." Maya didn't request this. If she enters it (thinking it's related to the "deposit"), her account is compromised. If she doesn't, she gets 3 more OTP requests over the next hour (attacker is locked out but trying).
- **Delayed consequence:** Sets up Scene 8's invoice scam (they now have confirmed GCash number + her voice response patterns). Her account is flagged as "responsive to voice calls."
- **What it reveals about Maya:** She trusts her senses (voice = identity) over context (why would Jess call?). She's still operating in a pre-AI world.

**Option B:** Hesitate and say "Wait, can you email me the details instead? I want to have it in writing."  
- **Immediate consequence:** Brief pause. "Oh... sure, yeah, I'll email you." Awkward. The call drops. Maya immediately texts REAL Jess: "Did you just call me?" Jess: "No? I'm in a meeting. Why?" Maya explains. Jess: "That's so creepy wtf."
- **Delayed consequence:** Maya avoided the scam BUT now she's paranoid about voice calls. Scene 7 includes a REAL call from her client that she ignores because she doesn't trust voice anymore. Professional consequence.
- **What it reveals about Maya:** She's learning to verify even when it feels rude/weird. But verification has social costs (the awkwardness, the paranoia it breeds).

### Both Choices Must Hurt Because:
The voice is PERFECT. Saying no feels insane — it's clearly Jess, why would you ask Jess to email you instead of just answering her question? You'd look paranoid or difficult. But saying yes means handing over account access to a stranger who sounds like your colleague. The "safe" choice (verify via email) makes you seem uncooperative and damages the professional relationship's warmth. The "normal" choice (answer the question) opens your account to attack.

### Character Knowledge OUT:
**Maya now knows:**
- Voices can be cloned convincingly enough to fool her
- She can't trust her ears the way she used to
- Someone has Jess's voice (recorded from where?)
- They targeted her specifically (knew her name, knew Jess's name, knew they work together)

**Maya now believes:**
- (If Option A) She needs to be more careful with OTP codes / voices can't be trusted
- (If Option B) She can't trust phone calls anymore / she has to verify everything (exhausting)

**Relationship states changed:**
- Jess (real): Either unaware (if Option A and Maya doesn't tell her) or creeped out (if Option B)
- Self-perception: "I can be tricked" / "I'm becoming paranoid about everything"

### Flags Set:
- `voice_scam_experienced` = true
- `gcash_number_confirmed` = true/false
- `voice_trust_broken` = true
- `jess_informed` = true/false
- `otp_attack_attempted` = true (if Option A)

### Callback Opportunities:
**From Act 1:**
- Rico's deepfake video (visual deepfake → audio deepfake progression)
- GCash scam attempts (same operation, different vector)

**From Act 2:**
- Scene 3's form (if filled, that's where they got her detailed info)

**Sets up:**
- Scene 7: Real client call that Maya ignores due to voice paranoia
- Scene 8: Operation has her confirmed contact info and response patterns

### Cultural Authenticity Touchpoints:
- Calling someone by first name (Jess) is professional-familiar in Filipino freelance culture
- "Rush-process" urgency is common in client relationships (everything is urgent)
- GCash as payment rail (not bank account — GCash is THE payment method)
- The politeness of "Can you confirm real quick?" (soft language masking the ask)
- Flow state as sacred for freelancers (interruption = lost income)

### Phone UI Details:
**What the player sees:**
- Incoming call screen: "Unknown" with local area code (+63 917...)
- During call: Timer running, "Unknown" displayed (not "Jess Reyes")
- If Option B: Messages app, text thread to REAL Jess
- If Option A: 10 minutes later, GCash notification "Enter OTP code to verify..."

**Audio cues:**
- Phone ringing (breaks through silent mode with system-level urgency)
- Voice: Perfect match to Jess (warm, slightly rushed, uses "like" as filler)
- Background noise: Subtle office sounds (keyboard, distant voices — adds authenticity)
- Awkward silence before call drops (if Option B)

**Visual tells:**
- Caller ID says "Unknown" not "Jess Reyes" (but easy to miss when voice sounds right)
- Jess's actual contact has a photo and saved name
- The request is via voice, not text/email (unusual for payment details)

### Guardrails Check:
- [x] **Complicity before clarity:** Player responds to "Jess" before realizing it's synthetic
- [x] **Phone feels real:** Incoming call, voice conversation, text message follow-up are all standard
- [x] **No villains:** The voice cloner is faceless. Maya's choices are understandable.
- [x] **Concept never named:** "Voice cloning" / "synthetic media" never mentioned — just experienced
- [x] **Both choices hurt:** Give info = account risk. Verify = awkwardness + paranoia. Both have costs.

---

## Scene 6: "The Viral Truth"

**Act:** 2  
**Timestamp:** Wednesday, 8:52 PM (before bed, winding down)  
**Location:** Maya's room, in pajamas, scrolling before sleep  
**Phone State:** Social media open, battery 23%, low power mode, lying in bed  
**Emotional Baseline:** Drained from the week, seeking comfort in mindless scrolling, avoiding heavy thoughts  
**Emotional Target:** Horrified recognition — the thing she saw in the family GC is now everywhere, and it's tearing her city apart  

**Primary AI Concept:** Algorithmic amplification  
**Secondary Concept(s):** Emotional manipulation triggers, feedback loops  

### Character Knowledge IN:
**Maya knows:**
- The Ramirez deepfake video from the family GC (Scene 4) — she either stayed silent or questioned it
- Election day is approaching (next month)
- Her feed has been weird lately (Scene 3's hyper-targeting)
- She's exhausted from work and scam attempts

**Maya believes:**
- Social media is a distraction, not a danger (scrolling is her wind-down routine)
- Viral content is viral because it's true or important
- The election is local politics — not her main concern
- Her small choices (like staying silent in the GC) don't have big consequences

**Relationship states:**
- Family GC: Either tense (if she questioned) or complicit (if silent)
- Social media: Habitual, numbing, comfort behavior
- Political awareness: Low engagement (she doesn't see herself as political)

### Required Story Beats:

1. **The Scroll Begins:** Maya opens social media for her pre-sleep scroll. Immediately: the Ramirez video is in her feed. Not from Tita Merly. From a "news" page with 45K followers. It has 127K views. 8.2K shares. The comments are a warzone.

2. **The Cascade:** She scrolls. Three posts down: a political influencer reacting to the Ramirez video. Five posts down: a meme mocking Ramirez. Seven posts down: a "citizen journalist" at a protest outside Ramirez's office. The video from the family GC has metastasized. It's THE story now.

3. **The Choice Moment:** A post appears: "FACT-CHECK: The Ramirez 'bribery video' analyzed by tech experts." The fact-check has 2.3K views. The original video has 127K. The fact-check is from a small media literacy org Maya vaguely recognizes. If she clicks, she'll see frame-by-frame proof it's a deepfake. If she shares it, she'll be called "bayaran" in the comments.

4. **Consequence Beat:** If Maya shares the fact-check, the algorithm buries it (low engagement, no emotional charge). She gets 3 hostile replies within minutes ("How much did Ramirez pay you?" / "You're part of the problem"). If she doesn't share, the fact-check disappears — the algorithm favors the viral lie. She sees the real-world damage: posts about the protest, people calling for Ramirez's resignation, her barangay GC discussing it.

5. **Scene Exit:** Maya closes the app. Lies in the dark. The video she saw in the family GC two days ago has now reshaped her city's political reality. Whether she shares the fact-check or not, the lie is winning. She can't sleep. She opens the app again. The video is still there. It will always be there.

### The Key Choice:

**Option A:** Share the fact-check to her feed with caption: "Please read this before sharing that Ramirez video 🙏"  
- **Immediate consequence:** Posted. Within 5 minutes: 3 angry comments, 1 supportive DM from a friend, 0 shares. The post gets 47 views (vs. the original video's 127K). She's called "bayaran" and "elitista." A stranger sends her a DM: "Ikaw ang problema sa Pilipinas."
- **Delayed consequence:** She's now marked by the algorithm as "low engagement / controversial." Her future posts will be deprioritized. But she's on record. In Act 3, someone will remember she tried to stop it.
- **What it reveals about Maya:** She'll take the social hit to slow the lie. But she's learning that truth doesn't spread like lies do.

**Option B:** Don't share publicly, but DM the fact-check to the family GC with "Just saw this, thought you'd want to see"  
- **Immediate consequence:** Sent to family GC. Tita Merly replies: "Naku, yang fact-checkers bayad yan ng kalaban." Cousin Jep: "Thanks Maya." Mama: heart react only. The GC doesn't change its mind. The video continues spreading through the family network.
- **Delayed consequence:** Maya tried, but privately. The lie continues. In Scene 7, she'll see news that Ramirez is losing endorsements. Her private action had no impact.
- **What it reveals about Maya:** She's trying to thread the needle — warn her family without public exposure. But private fact-checking has zero viral force.

**(Hidden Option C, if player tries):** Scroll past and do nothing  
- **Immediate consequence:** The feed continues. More Ramirez posts. An ad for a "Christian voters guide" that lists Ramirez as "morally compromised." A livestream of the protest. The lie is the reality now.
- **Delayed consequence:** In Scene 8 and Act 3, the election results show Ramirez lost. The deepfake worked. Maya's inaction was complicity.
- **What it reveals about Maya:** She's learned helplessness. The lie is too big to fight.

### Both Choices Must Hurt Because:
Sharing the fact-check publicly invites harassment, gets buried by the algorithm, and accomplishes almost nothing — but it's the "right" thing to do and costs her socially. Sharing it privately to the family GC is safer but equally futile — they don't trust fact-checkers, and her DM changes nothing. Doing nothing feels like complicity but is the only choice that doesn't actively harm her. The lie spreads either way. The only variable is how much Maya damages herself trying to stop it.

### Character Knowledge OUT:
**Maya now knows:**
- The family GC video went viral and is reshaping the election
- Fact-checks get a fraction of the reach that lies do
- The algorithm amplifies emotional content over factual content
- Her small choice in Scene 4 (stay silent or question) was part of a massive wave

**Maya now believes:**
- (If Option A) She has to speak up even when it's futile / truth-telling has high costs
- (If Option B) She can only control her small circle / public fights are unwinnable
- (If Option C) She's powerless against viral lies / there's no point fighting

**Relationship states changed:**
- Social media: From numbing comfort to hostile environment
- Family GC: Reinforced as echo chamber (if Option B)
- Self-perception: Either "I tried and failed" or "I stayed silent and regret it"

### Flags Set:
- `ramirez_deepfake_viral` = true
- `fact_check_shared_public` = true/false
- `fact_check_shared_family` = true/false
- `social_media_harassment_experienced` = true (if Option A)
- `algorithmic_amplification_witnessed` = true

### Callback Opportunities:
**From Act 2:**
- Scene 4's family GC video (now viral)
- Scene 3's feed targeting (same algorithm, scaled up)

**Sets up:**
- Scene 7: News of Ramirez losing endorsements/election
- Scene 8: Maya's worldview shift — she now understands coordination
- Act 3: Election results, consequences of deepfake, Maya's role in truth-telling

### Cultural Authenticity Touchpoints:
- **"Bayaran" accusation:** Anyone defending a politician must be paid (endemic in PH political discourse)
- **"Elitista" dismissal:** Fact-checkers = out-of-touch elites (anti-intellectualism)
- **Barangay GC spillover:** The lie spreads through interconnected GCs (church, barangay, alumni)
- **Protest culture:** Quick mobilization around viral issues (real civic engagement weaponized)
- **"Ikaw ang problema":** The scapegoating of truth-tellers (collective certainty > individual doubt)

### Phone UI Details:
**What the player sees:**
- Social media feed: Ramirez video appears 5 times in different forms (original, reaction, meme, news post, protest stream)
- Engagement metrics: View counts, share counts, comment counts (showing virality)
- Fact-check post: Small media org, low engagement, calm tone
- Comments section: Hostile, emotional, certainty-laden
- DM interface (if Option B): Family GC thread, reactions to her message

**Audio cues:**
- Ambient silence (late night, everyone asleep)
- Notification pings (if Option A, angry comments arriving)
- Protest chants in livestream video (if scrolled to)

**Visual tells:**
- Fact-check has detailed analysis (timestamps, frame comparisons) but is boring
- Original video has high-emotion thumbnail (Ramirez's "shocked" face)
- Algorithm prioritizes emotion: video views >> fact-check views
- Comments on fact-check are hostile; comments on video are certain

### Guardrails Check:
- [x] **Complicity before clarity:** Player sees the video's spread before understanding how amplification works
- [x] **Phone feels real:** Social media feed, commenting, DMing, metrics are all authentic
- [x] **No villains:** The commenters genuinely believe they're fighting corruption. The algorithm has no agenda.
- [x] **Concept never named:** "Algorithmic amplification" never appears — just experienced through view counts
- [x] **Both choices hurt:** Public sharing = harassment + futility. Private sharing = futility. Silence = complicity.

---

## Scene 7: "The Algorithm Knows"

**Act:** 2  
**Timestamp:** Thursday, 6:23 AM (waking up, still in bed)  
**Location:** Maya's room, morning light, phone on bedside table  
**Phone State:** Lock screen full of notifications, battery 12% (forgot to charge), notification LED blinking  
**Emotional Baseline:** Groggy, anxious (slept poorly after Scene 6), pre-coffee brain fog  
**Emotional Target:** Creeping dread — her phone knows her too well, and it's using that knowledge against her  

**Primary AI Concept:** Feedback loops (algorithmic reinforcement)  
**Secondary Concept(s):** Proxy targeting refinement  

### Character Knowledge IN:
**Maya knows:**
- Her feed has been disturbingly relevant (Scene 3)
- The Ramirez video went viral despite being fake (Scene 6)
- She's been targeted by scams that knew specific things about her (Scenes 2, 5)
- She has client work due today (KAIZEN final revisions)

**Maya believes:**
- Morning phone-checking is routine (habitual behavior)
- Notifications are random / based on what's popular
- The algorithm is neutral (it shows her what's "trending")
- She controls what she sees by choosing what to engage with

**Relationship states:**
- Phone: Habitual dependency, morning ritual
- Social media: Increasingly hostile/draining
- Work: Deadline pressure (revisions due by 3 PM)

### Required Story Beats:

1. **The Wake-Up:** Maya wakes to a phone screen full of red notification dots. Before she's fully conscious, her thumb is unlocking it. The lock screen shows: 3 news alerts (all Ramirez-related), 5 social media notifications (all political content), 2 "friend suggestions" (both political activist pages), 1 sponsored ad ("Stressed? This freelancer life hack will save you").

2. **The Pattern Revealed:** She opens social media. Her feed is NO LONGER GENERAL. Every single post: politics (Ramirez scandal), freelancer stress content, scam warnings, financial anxiety. Zero light content. Zero friend updates. The algorithm has learned what she engages with (stress, politics, scams) and is feeding her ONLY that. It's created a feedback loop — she's trapped in anxiety content because she engaged with anxiety content.

3. **The Choice Moment:** A post appears: "Free webinar for freelancers: How to manage election-season client uncertainty." It's perfectly targeted — her stress (freelancer) + her current context (election chaos) + actionable solution (webinar). The registration asks for email, phone, industry, monthly income. She's seen this pattern before (Scene 3). But this one feels helpful. Is this legitimate self-care or another data harvest?

4. **Consequence Beat:** If she registers, she gets added to a funnel that will eventually upsell her on a ₱12K "business coaching program" (Scene 8's invoice will reference this "purchase"). If she deliberately seeks out non-political content (searches for cat videos, recipe reels), the algorithm resists — it takes multiple searches before her feed rebalances, and even then, political content bleeds through. If she puts the phone down and ignores it, the notifications keep coming, escalating in urgency.

5. **Scene Exit:** Maya realizes her phone is no longer showing her the world — it's showing her a funhouse mirror of her anxieties. Every engagement she made (clicking the scam, sharing the fact-check, filling that form) taught the algorithm to show her more of what hurts. She's in a cage made of her own behavior. The phone battery dies. The silence is briefly peaceful.

### The Key Choice:

**Option A:** Register for the webinar — it's targeted, but it also seems genuinely useful, and she needs help managing stress  
- **Immediate consequence:** Confirmation email. "We'll send you the link tomorrow! In the meantime, check out our free e-book: '10 Mindset Shifts for Freelance Success.'" The e-book upsells coaching. Her email is now in a marketing funnel.
- **Delayed consequence:** Scene 8's invoice scam will reference "your recent webinar registration and coaching program enrollment." The operation now has her email, phone, income level, and stress points. Perfect targeting data.
- **What it reveals about Maya:** She's caught between self-care and paranoia. She needs help, and the algorithm knows it. Her legitimate needs are being weaponized.

**Option B:** Recognize the pattern and force the algorithm to reset — deliberately search for neutral content (recipes, cat videos, travel reels) to "retrain" her feed  
- **Immediate consequence:** She searches "easy pasta recipes." The feed resists — first 3 results are still political (a post about food prices). She searches again. "Cat videos." Slowly, the feed shifts. It takes 10 minutes of active curation to see a cat. She's exhausted. Her morning is gone.
- **Delayed consequence:** Her feed rebalances slightly, but political content still leaks through (the algorithm learned strong engagement). She's now aware she's in a feedback loop, but breaking it requires constant vigilance. In Scene 8, she'll be less susceptible to targeting — but more exhausted.
- **What it reveals about Maya:** She's learning how the algorithm works and fighting back. But fighting requires energy she doesn't have. Resistance is exhausting.

### Both Choices Must Hurt Because:
The webinar might be legitimate — freelancers DO need stress management, and not every targeted ad is a scam. But engaging feeds the machine more data. Saying no means denying herself potential help and staying trapped in anxiety without tools. Resetting the algorithm is the "smart" move but requires treating her phone like a hostile entity, curating every interaction, never relaxing — which defeats the purpose of stress relief. Both choices trap her: engage and be exploited, or disengage and be isolated.

### Character Knowledge OUT:
**Maya now knows:**
- The algorithm learns from her behavior and reinforces it
- Her engagement creates a feedback loop (anxiety content → engagement → more anxiety content)
- Targeted content isn't random — it's based on her data trail from Scenes 3, 5, 6
- She's partially trapped herself by clicking, searching, engaging with scam/stress content

**Maya now believes:**
- (If Option A) She needs help even if it means more targeting / self-care is worth the risk
- (If Option B) She has to actively fight the algorithm / her phone is not neutral

**Relationship states changed:**
- Phone: From tool to adversary (or from neutral to suspicious)
- Algorithm: From invisible to visible enemy
- Self-perception: Either "I'm stuck in this" or "I can fight this but it's exhausting"

### Flags Set:
- `feedback_loop_recognized` = true
- `webinar_registered` = true/false
- `algorithm_reset_attempted` = true/false
- `morning_routine_disrupted` = true
- `proxy_refinement_data_provided` = true (if Option A)

### Callback Opportunities:
**From Act 2:**
- Scene 3: The form she filled (this is the payoff — algorithm learned her profile)
- Scene 6: Ramirez content dominates her feed (because she engaged with it)

**Sets up:**
- Scene 8: Invoice scam will use webinar data (if Option A)
- Scene 8: If Option B, Maya will be more skeptical and catch the scam faster
- Act 3: Maya's relationship with her phone is fundamentally changed

### Cultural Authenticity Touchpoints:
- Morning phone ritual (phone is alarm, news, social connection, work tool)
- Election season anxiety (real context in Philippine political cycles)
- Freelancer precarity (unstable income, constant hustle, need for "hacks")
- Webinar culture (online business coaching is huge in PH freelance communities)
- The expectation to be "always on" (clients message early, work has no boundaries)

### Phone UI Details:
**What the player sees:**
- Lock screen: Stacked notifications with subject lines visible
- News app: 3 alerts, all Ramirez-related headlines
- Social media: Feed is monothematic (politics + freelancer stress)
- Webinar registration form: Email, phone, job title, monthly income
- Search results (if Option B): Algorithm resisting neutral content at first

**Audio cues:**
- Notification sounds (multiple, overlapping, urgent)
- Battery low warning chime (adding to stress)
- Silence when phone dies (brief relief)

**Visual tells:**
- Red notification dots (overwhelming number)
- Feed is homogeneous (no variety — all targeted)
- Webinar post has testimonials (fake, but look real)
- Search results show algorithm's resistance (political content in recipe search)

### Guardrails Check:
- [x] **Complicity before clarity:** Player engages with feed before understanding feedback loops
- [x] **Phone feels real:** Morning wake-up routine, notification overload, algorithm curation are all authentic
- [x] **No villains:** The algorithm is optimization, not malice. Maya's choices taught it.
- [x] **Concept never named:** "Feedback loop" never appears — just experienced through feed homogeneity
- [x] **Both choices hurt:** Engage = more data for targeting. Reset = exhausting vigilance. Both trap her.

---

## Scene 8: "The Invoice That Isn't" — MIDPOINT CRISIS

**Act:** 2  
**Timestamp:** Thursday, 3:47 PM (afternoon, working)  
**Location:** Maya's room, laptop open, client revisions submitted, brief moment of relief  
**Phone State:** Email app, notification from "KAIZEN Official Billing", battery 56%  
**Emotional Baseline:** Relieved (just submitted work), guard slightly down, checking email for confirmation  
**Emotional Target:** Shattered — the moment everything converges, the floor drops out, and she realizes the scope  

**Primary AI Concept:** Data inference + synthetic media (email spoofing)  
**Secondary Concept(s):** Human-in-command moment (the choice that defines Act 3)  

### Character Knowledge IN:
**Maya knows:**
- She just submitted final KAIZEN revisions (expecting payment)
- She's been targeted all week (GCash scam, voice call, hyper-targeted feed)
- She filled out forms / registered for things (if Scene 3/7 Option A)
- Her GCash number is potentially compromised (Scene 5)

**Maya believes:**
- Email from clients is official (email = professional communication)
- Invoices/payment requests come via email (standard freelancer process)
- She's owed money for the KAIZEN project (legitimate expectation)
- After submitting work, the next step is payment confirmation

**Relationship states:**
- Client (KAIZEN/Jess): Professional, positive (work delivered)
- Financial state: Tight (waiting for this payment to cover bills)
- Emotional state: Momentarily relieved (work done), vulnerable (guard down)

### Required Story Beats:

1. **The Perfect Timing:** Maya clicks "Send" on her final revisions email. Exhales. Refreshes email to see if Jess replied yet. Instead: a new email, subject line "KAIZEN Project - Final Invoice & Payment Request." From: jess.reyes@kaizen-official.com (not jess@kaizen.ph — the domain is close). She doesn't notice. She's expecting this email.

2. **The Perfect Details:** The email is PERFECT. Kaizen logo. Her name. Project name. Dates. Deliverables listed correctly. Total: ₱18,500 (correct amount). "Attached: Invoice #4729 and revised payment form. Due to new accounting software, please fill out updated GCash details for direct deposit. Apologies for the hassle! — Jess." The attachment is a Google Form (like dozens of client forms Maya has filled before).

3. **The Choice Moment:** The form asks for: Full Name, GCash Number, GCash MPIN (for "verification"), Birthday, Valid ID upload. The MPIN request is THE red flag — but it's buried in professional language: "Our new system requires 2-factor authentication for compliance. Your MPIN will be encrypted and not stored." Maya is tired. She wants to be paid. The email looks real. But MPIN? That's her account password.

4. **The Convergence:** If Maya pauses and checks, she'll notice: (1) The email domain is wrong. (2) The real Jess would never ask for MPIN. (3) She can text Jess to verify. But checking means delaying payment. If she fills it out, she's handing her GCash account to the operation. This is the climax — every thread from Scenes 3-7 converges here.

5. **The Reveal:** If Maya fills it out, within 10 minutes her GCash account is drained (₱2,341 remaining balance + ₱18,500 she expected to receive = gone, because the attacker transfers money IN from a stolen account then transfers it OUT to cash out before it's flagged). If she verifies first (texts Jess), Jess replies: "I didn't send that. We don't use GCash forms. Report it!" Maya realizes: this was coordinated. The form from Scene 3. The voice call from Scene 5. The feed targeting from Scenes 6-7. They were ALL connected. This wasn't random bad luck. This was a campaign.

### The Key Choice:

**Option A:** Fill out the form — she's tired, she needs the money, the email looks legitimate, and MPIN for "compliance" sounds plausible  
- **Immediate consequence:** Form submitted. Confirmation page: "Payment processing, allow 24-48 hours." She feels relief. 10 minutes later: GCash notification. "You sent ₱18,500 to..." Wait. SHE didn't send. Account drained. Panic. She tries to login — locked out (they changed her MPIN). She calls GCash hotline — 45 minute wait. She starts crying.
- **Delayed consequence:** Financial devastation. No payment from client (it's coming to her real GCash, but her account is locked). Bills can't be paid. She has to borrow from family (shame). She has to file a police report (futility — "we'll investigate"). The operation got everything: her money, her data, her time, her dignity. Act 3 begins with her rebuilding from zero.
- **What it reveals about Maya:** She's human. She's tired. She wanted to believe it was over. The scam worked because it was PERFECTLY timed and PERFECTLY detailed. Her complicity was exhaustion, not stupidity.

**Option B:** Pause. Something feels off. Text Jess first: "Hi, just got an invoice email from kaizen-official.com, is that you?"  
- **Immediate consequence:** Texted. 2 minutes (feels like 20). Jess replies: "NO. That's not us. Don't click anything. Report it." Maya's hands shake. She looks at the email again. The domain. The MPIN request. It was all DESIGNED to fool her. She screenshots everything. Reports the email. Blocks the sender.
- **Delayed consequence:** She's safe. But she's shaken. She realizes this was coordinated — someone has been targeting her all week. The form, the calls, the feed, the timing. She opens her laptop. Googles "coordinated scam campaign philippines." Falls into a rabbit hole. Act 3 begins with her trying to UNDERSTAND the machine.
- **What it reveals about Maya:** She's learned. Verification is now instinct. But she's also terrified — if she hadn't paused, she'd be ruined. The margin for error is so thin. One click. That's all it takes.

### Both Choices Must Hurt Because:
Option A is financially devastating but COMPLETELY understandable — the email is perfect, the timing is perfect, she's exhausted, and she needs that money. She's not stupid; she's targeted by a sophisticated operation at her most vulnerable moment. Option B saves her money but shatters her sense of safety — she realizes how CLOSE she came, how much effort went into targeting HER specifically, and how many more attacks are coming. Winning means living in permanent suspicion. Losing means financial ruin. There's no comfort in either.

### Character Knowledge OUT:
**Maya now knows:**
- This wasn't random — it was coordinated (the form, the calls, the targeting)
- Someone spent DAYS building a profile of her to execute this scam
- Email domains can be spoofed, invoices can be faked, details can be scraped
- She was ONE CLICK away from ruin (or she clicked and is ruined)
- More attacks are coming ("How many more are coming?" — the question that powers Act 3)

**Maya now believes:**
- (If Option A) She can be destroyed by a single mistake / the system is designed to trap her
- (If Option B) She can NEVER relax / every email, call, message is suspect / trust is dead

**Relationship states changed:**
- Jess: Either doesn't know yet (Option A) or knows and is horrified (Option B)
- GCash: Either locked/drained (Option A) or safe but now source of anxiety
- Self-perception: Either "I was stupid" (no — she was targeted) or "I barely survived"
- Family: Will need to tell them (borrow money if Option A, explain paranoia if Option B)

### Flags Set:
- `invoice_scam_encountered` = true
- `gcash_account_drained` = true/false
- `coordinated_campaign_realized` = true
- `jess_verified_sender` = true/false
- `act2_climax_survived` = true/false
- `financial_devastation` = true (if Option A)
- `hypervigilance_activated` = true (if Option B)

### Callback Opportunities:
**From Act 2:**
- Scene 3: Form data used to personalize this invoice
- Scene 5: Voice call established GCash as payment method in her profile
- Scene 7: Webinar registration (if done) referenced in some versions of the email
- All scenes: The operation was mapping her vulnerabilities to execute THIS moment

**Sets up:**
- Act 3 Scene 9: Either financial recovery (Option A) or investigation (Option B)
- Act 3 Scene 10: Maya's choice to warn others or withdraw
- Act 3 ending: Her transformation from target to advocate/survivor

### Cultural Authenticity Touchpoints:
- Freelancer payment anxiety (cash flow is survival, every payment is crucial)
- GCash as THE payment rail (not PayPal, not bank transfer — GCash is how PH freelancers get paid)
- Google Forms for everything (legitimate businesses DO use them — plausible)
- "New accounting software" excuse (companies change systems constantly — plausible)
- MPIN request hidden in compliance language (exploits lack of financial literacy)
- Shame of being scammed (reporting to family, police is humiliating)
- Police report futility (everyone knows reporting to PNP cybercrime rarely results in recovery)

### Phone UI Details:
**What the player sees:**
- Email inbox: "KAIZEN Project - Final Invoice & Payment Request"
- Email sender: jess.reyes@kaizen-official.com (vs. real: jess@kaizen.ph)
- Email body: Professional formatting, Kaizen logo, correct project details
- Attached Google Form: Clean, professional, fields include MPIN request
- If Option B: Text message thread to Jess, her reply, relief/horror
- If Option A: GCash notifications of unauthorized transfers, account lock screen

**Audio cues:**
- Email notification chime (expected, welcome sound — invoice is good news)
- If Option A: Rapid GCash notification sounds (10 min later), then silence (locked out)
- If Option B: Text message sent/received sounds, Maya's sharp exhale

**Visual tells:**
- Email domain is CLOSE but wrong (kaizen-official.com vs kaizen.ph)
- MPIN request is buried mid-form (if reading carefully, it's THE red flag)
- Form has "encrypted and not stored" language (sounds secure, is a lie)
- Real Jess's text uses lowercase, casual tone (vs. email's formal tone)

### Guardrails Check:
- [x] **Complicity before clarity:** Player fills form (or nearly does) before realizing it's the convergence point
- [x] **Phone feels real:** Email, invoice, Google Form, GCash notifications are all standard
- [x] **No villains:** The operation is faceless. Maya's vulnerability is economic precarity, not stupidity.
- [x] **Concept never named:** "Data inference" / "synthetic media" never mentioned — just experienced
- [x] **Both choices hurt:** Option A = financial ruin. Option B = permanent hypervigilance. Both devastate.

**Special Midpoint Note:**
This scene MUST end with Maya asking herself (internal monologue or staring at phone):
> "How many more are coming?"

That question is the hinge. Act 1 was "this is weird." Act 2 was "this keeps happening." Act 3 is "this is systematic, and I have to decide what to do about it."

If Option A (scammed): She asks this from her bedroom floor, crying, GCash locked, wondering how she'll pay rent.

If Option B (survived): She asks this staring at the email, realizing she was targeted for DAYS, wondering what she missed and what's next.

Either way: The question is dread. The answer is Act 3.

---

# END OF ACT 2 SCENE BLUEPRINTS

**Transition to Act 3:**
- **If Option A (devastated):** Act 3 opens with Maya's recovery — borrowing money, filing reports, deciding whether to warn others or withdraw in shame
- **If Option B (hypervigilant):** Act 3 opens with Maya investigating — who's behind this, how widespread is it, can she stop them

**Emotional state entering Act 3:**
- **Devastated path:** Shame, rage, financial panic, desire for justice/revenge
- **Hypervigilant path:** Fear, obsession, isolation, desire to understand the machine

**Both paths converge on the same thematic question:**
"If the system is designed to manipulate us, what's my responsibility? Stay safe and silent, or speak up and risk more harm?"

Act 3 is Maya's choice to become an advocate, a withdrawn survivor, or something in between.

---

## Critical Files for Implementation

The following files are most critical for implementing Act 2 based on these blueprints:

- /home/sammatuba/projects/other/blackglass/craft/scripts/maya_act2_scene3_feed.ink
- /home/sammatuba/projects/other/blackglass/craft/scripts/maya_act2_scene4_family_gc.ink
- /home/sammatuba/projects/other/blackglass/craft/scripts/maya_act2_scene5_voice.ink
- /home/sammatuba/projects/other/blackglass/craft/scripts/maya_act2_scene6_viral.ink
- /home/sammatuba/projects/other/blackglass/craft/scripts/maya_act2_scene7_algorithm.ink
- /home/sammatuba/projects/other/blackglass/craft/scripts/maya_act2_scene8_invoice_MIDPOINT.ink
