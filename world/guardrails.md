# DISINFO: Creative Guardrails & Principles

### The Creative Constitution

*This document is law. Every scene, every choice, every line of dialogue, every agent output gets measured against it. Read it before you write. Check it before you ship. If something conflicts with this document, this document wins.*

---

## 1. CORE THESIS

> **"You've already been manipulated today — this game shows you how."**

That's it. One sentence. Everything in the game ladders up to it.

**The litmus test:** Hold any scene, choice, mechanic, or line of dialogue against this sentence. Ask: *Does this help the player feel the reality of manipulation they already experience?* If the answer is no, or if the answer is "sort of, if you squint," cut it.

This thesis has three load-bearing words:

- **"Already"** — The manipulation isn't hypothetical. It happened this morning. The game doesn't warn about a future threat; it reveals a present one.
- **"You"** — Not "people." Not "society." *You.* The player. This is personal.
- **"How"** — Not "that." The game doesn't just prove manipulation exists. It reconstructs the machinery. The player should leave understanding the *mechanism*, not just the *fact*.

---

## 2. THE FIVE COMMANDMENTS

These are non-negotiable. They cannot be softened, deferred, or overridden by any creative decision. If a scene violates any commandment, the scene is wrong — not the commandment.

### I. Complicity Before Clarity

The player must **ACT** before they **UNDERSTAND**.

They forward the message. They click the link. They share the post. They dismiss the warning. The learning happens in the sickening moment of recognition — *I just did the thing* — not in a tutorial that told them what the thing was.

If the player sees the lesson coming, the design has failed.

**Test:** Remove the debrief entirely. Does the player still feel something? If yes, the scene works. If the scene only makes sense with an explanation afterward, it's a lecture with extra steps.

### II. The Phone Is Real

Every interaction must feel like something that actually happens on a real phone. Not a phone-shaped game. A *phone*.

If you can't imagine receiving this notification on your own device at 11:47 PM on a Tuesday, it doesn't belong. No game-y abstractions. No UI that breaks the phone metaphor. No floating narration. No progress bars. No "Level Complete."

The player should forget they're playing a game. The moment they remember, the spell breaks.

**Test:** Screenshot any screen from the game. Show it to someone without context. Do they think it's a real phone? If not, redesign.

### III. No Villains, No Heroes

Everyone in this story thinks they're doing the right thing.

- **Maya** trusts authority because trusting authority has kept her family safe for decades.
- **Jun** shares information because his community depends on him being the person who knows things.
- **Reese** is "just doing marketing" because the system rewards her for not asking deeper questions.
- **Dos** chases truth because someone has to, and sometimes the chase matters more than what you catch.

The *system* is the villain. The people are caught in it. Moral complexity is not optional — it is the entire point.

**Test:** Can you write a sincere two-paragraph defense of every character's worst decision? If not, the character is too flat.

### IV. Show the Consequence, Not the Concept

Never name an AI literacy concept during gameplay. Never. Not once. Not cleverly. Not through a "smart" character who "happens to mention it."

Show what happens when automation bias goes unchecked — the doctor trusts the AI triage and a patient waits too long. Show what proxy variable targeting looks like from the target's phone — Maya's feed fills with exactly the content designed for "women 45-60, government employee, Quezon City." Show the consequence. Let the player feel it. The concept label appears *only* in the post-game debrief, and even there, it arrives gently.

**Test:** Delete every concept label from the game. Does the experience still teach? If yes, you've integrated correctly.

### V. Both Choices Must Hurt

Every meaningful choice must present two genuinely reasonable options where neither is obviously "correct."

Real digital life doesn't have right answers. You can't always tell the scam from the real message. You can't always know if sharing helps or harms. The player should agonize. Three seconds of genuine hesitation, minimum.

If a playtester consistently picks the same option without pausing, one choice is too weak. Redesign.

**Test:** Run ten people through the choice. If more than 80% pick the same option, the choice is broken.

---

## 3. VOICE GUIDELINES

### Tone Spectrum

```
After School Special ←————————————●——→ Black Mirror
                                  ↑
                              WE ARE HERE
```

Closer to *Black Mirror*, but with warmth. Unsettling, not nihilistic. The game should make the player uncomfortable in the way a good conversation with a smart friend makes them uncomfortable — not attacked, but unable to unsee something.

The vibe: *"Oh shit, that's what that was."*

Not: *"The world is doomed and nothing matters."*
Not: *"And that's why we should all be more careful online!"*

### Prose Rules

| Element | Rule |
|---|---|
| **Narration** | Second person, present tense. "Your phone buzzes. You see the notification." |
| **Character messages** | Written in each character's authentic voice. No narration intrusion. |
| **Phone UI** | The phone doesn't editorialize. It displays. It notifies. It never comments. |
| **Transition text** | Minimal. Time skips are shown through timestamps, not described. |
| **Internal monologue** | None. The player IS the character. Their thoughts are the player's thoughts. |

### Dialogue Authenticity Test

Read every chat message aloud. *Would a real person send this?*

Not "would a character in a game send this" — would a *real person*, on their *real phone*, at *2 AM*, type these exact words?

Red flags that a message is fake:

- It's longer than three sentences (real texts are short)
- It contains no typos, abbreviations, or casual grammar
- It explains context the recipient would already know
- It sounds like it was written for an audience of readers, not a single recipient
- No one would actually send this to a group chat

### Humor Policy

Dark humor is welcome. Mandatory, even. The absurdity is part of the truth.

- Scam texts can be accidentally poetic ("Congratulations! You have been CHOSEN for a special blessing opportunity")
- Social media comments can be painfully recognizable ("Source?" "Do your own research" "This is why I don't trust—")
- GC conversations can be funny because family is funny

**But never punch down.** The humor is never at the expense of victims. The humor targets the *absurdity of the system*, not the people caught in it. If a joke only works because someone is poor, uneducated, or vulnerable, kill it.

### Cultural Voice

Filipino social dynamics are the **texture**, not the **decoration**.

- The family GC pressure is *real* — the expectation to respond, to send load, to forward the chain prayer, to not embarrass the family. This is structural to the story.
- The "po" and respect dynamics are *structural* — they shape why Maya doesn't question the fake government advisory, why Jun defers to older community leaders, why certain scams work in PH that wouldn't work elsewhere.
- **English is the primary language.** No forced Tagalog for flavor. When Tagalog appears, it appears because that's genuinely what the character would say in that moment — the way real Filipino English speakers code-switch, not the way a script consultant adds "local color."
- If a Tagalog word has no clean English equivalent and the character would naturally use it, use it. Don't italicize it like it's exotic. Don't footnote it. Trust context.

---

## 4. ANTI-PATTERNS

The "Never Do This" list. If you catch any of these in a draft, it's a rewrite — not an edit.

### 1. The Lecture Moment
Any scene where a character explains an AI concept to the player. If Dr. Maya Chen appears to say "This is called automation bias," delete the scene. If a news article in the game defines "proxy variables," rewrite it as a news article that *demonstrates* proxy variables through its own targeting. Characters don't know they're in a game about AI literacy. Neither should the player.

### 2. The Obviously Wrong Choice
Any choice where one option is clearly dumb. "Click the suspicious link / Don't click the suspicious link" is not a choice. It's a quiz question with a neon sign pointing to the answer. "Click the link because your lola sent it and she might actually need help / Ignore it but spend the next hour worrying you're being paranoid and selfish" — *that's* a choice.

### 3. The Cartoon Villain
Any moment where the Operator is evil for evil's sake. Reese is smart, pragmatic, and rationalizing. She's someone you might grab drinks with. She's not cackling in a dark room. She took this job because it pays well and the work is "just marketing." Her moral compromises happen the way real ones do — gradually, with justifications that sound reasonable at each step.

### 4. The Perfect Victim
Any moment where the Target is purely innocent and blameless. Maya makes mistakes because she's *human*, not because she's naive. She has expertise, judgment, and agency. She gets manipulated because the system is designed to exploit exactly the kind of responsible, authority-trusting person she is. Her vulnerability is her *strength* turned against her.

### 5. The Info Dump
Any message, post, email, or notification that exists to convey information *to the player* rather than to serve the character who sent it. Every piece of content on the phone must have a sender with a reason. If the only reason a GC message exists is so the player learns a plot point, that message is a lie and the player will feel it.

### 6. Breaking the Phone
Any UI element, narration, or interaction that couldn't exist on a real phone. No floating text. No narrator captions. No "Game Over" screens. No tutorial popups. No highlighted "important" messages. The phone is a phone. If the real iOS or Android wouldn't display it, neither does the game.

### 7. The Happy Ending
Any ending where everything works out perfectly. Even the "best" endings carry cost or ambiguity. Maya might avoid the scam but damage a family relationship by being "too suspicious." Jun might stop sharing disinfo but lose his role as the community's information hub. The best possible outcome is *bittersweet and honest*, not triumphant.

### 8. Poverty Porn
Any scenario that exists to make the player feel bad about someone's economic situation rather than to illuminate systemic manipulation. Maya's freelancer income is context, not spectacle. Jun's community's economic reality explains *why* certain scams work, not *how sad* it is. If a scene's primary emotion is pity, it's exploiting the character.

### 9. The Savior Arc
Any scenario where the player single-handedly stops the disinformation operation. Individual action matters — forwarding a fact-check, reporting a scam number, talking to a family member — but systems are bigger than individuals. The game ends with the operation continuing, because real operations continue. The victory is *awareness*, not destruction of the machine.

### 10. The Quiz in Disguise
Any moment that's clearly testing the player's knowledge rather than advancing the story. If a scene exists primarily so the player can "prove" they learned something, it's an assessment wearing a narrative costume. Reflection moments must feel like *character* moments — a quiet beat on the train home, a re-read of an old message — not checkpoints.

---

## 5. CONCEPT INTEGRATION RULES

The 9 AI literacy concepts are the invisible curriculum. The player should never see the syllabus.

### Integration Principles

1. **Each concept must be EXPERIENCED, not EXPLAINED.** The player encounters the concept through action and consequence. They never read or hear its name during gameplay.

2. **Each concept must be tied to a SPECIFIC PHONE INTERACTION.** Not abstract reasoning. A notification. A message. A scroll. A tap. Something the player *does* with the phone interface.

3. **Each concept must have CONSEQUENCES that the player SEES play out.** Not hypothetical consequences. Visible, felt consequences within the story — a relationship shifts, a situation escalates, an opportunity is lost.

4. **No concept should appear more than twice in a single persona's arc.** Repetition breeds recognition, and recognition breeds resistance to the lesson. Spread concepts across personas.

5. **The concept label appears ONLY in the post-game debrief.** And even there, it arrives as context, not curriculum.

6. **The success metric:** A playtester can describe what happened in the scene without using the concept's name. An observer can identify which concept was demonstrated. Both are correct.

### Concept Integration Reference Table

| # | Concept | Phone Experience | Player Action | Consequence Shown |
|---|---------|-----------------|---------------|-------------------|
| 1 | **Automation Bias** | AI-generated health advisory appears in official government app format | Player trusts and forwards the advisory without verifying source | Family member makes a medical decision based on the forwarded advisory; later revealed as AI-generated content pushed by the operation |
| 2 | **Proxy Variable Targeting** | Player notices their feed is *suspiciously* relevant — every ad, every post, every suggested group fits their exact situation | Player engages with targeted content because it feels personally relevant | Reveal (in another persona's arc) that the targeting profile was built from scraped data; the "personal" feeling was engineered |
| 3 | **Synthetic Media Detection** | A voice message from a "government official" arrives in a GC; a video "news clip" circulates on social media | Player shares or acts on the synthetic content | The content is referenced in a later persona's arc as a known synthetic; player sees it from the production side |
| 4 | **Algorithmic Amplification** | Jun shares a post; player watches engagement metrics climb in real-time as the algorithm picks it up | Player chooses to share content that the algorithm will boost | The content reaches people the player never intended; consequences ripple through the community |
| 5 | **Data Privacy & Inference** | Player fills out a seemingly innocent survey/quiz; later sees eerily specific content based on answers | Player voluntarily provides data through normal phone interactions | The operation uses that data to refine targeting; player sees their own data in the Operator's dashboard |
| 6 | **Feedback Loops** | Player notices they're seeing more of what they engaged with yesterday; the phone is learning | Player's earlier choices shape what content appears later in the arc | The information environment narrows visibly; characters in GCs start echoing the same talking points |
| 7 | **Emotional Manipulation Triggers** | Urgent, fear-based, or outrage-inducing content appears alongside calm, factual alternatives | Player gravitates toward emotionally charged content (because it feels more important) | Emotional content drives action; calm content gets ignored; the gap between reality and perception widens |
| 8 | **Source Verification Barriers** | A link leads to a site that *looks* official but has subtle tells; checking the source requires extra steps that break the flow | Player must choose between quick action and slow verification | Quick action leads to spreading disinfo; slow verification means missing the moment but getting it right (at social cost) |
| 9 | **Collective Sensemaking** | The family/community GC becomes the primary "fact-checking" mechanism; consensus replaces evidence | Player relies on group agreement rather than independent verification | The group collectively arrives at a wrong conclusion that feels right because everyone agrees |

---

## 6. CHOICE DESIGN TESTS

Every meaningful choice in the game must pass all four tests. If it fails any single test, redesign.

### Test 1: The Agonize Test
> *Would a real person hesitate for at least 3 seconds before choosing?*

If a playtester blows through the choice without pausing, one option is too weak or too obvious. The 3-second threshold is real — time it in playtesting. Genuine hesitation is the signal that both options have weight.

**How to fix a failing choice:** Make the "wrong" option's reasoning stronger. What legitimate, sympathetic, human reason would someone have for picking it?

### Test 2: The Replay Test
> *Would a player want to come back and see what the other option leads to?*

If the unchosen path doesn't nag at the player — *what would have happened if I'd shared it? What would have happened if I hadn't?* — the stakes aren't high enough. Curiosity about the road not taken is the engine of replayability and the foundation of the Rashomon structure.

**How to fix a failing choice:** Make the consequences of each path more divergent and more visible. The player should *see* what they gained but also sense what they lost.

### Test 3: The Reveal Test
> *Does this choice reveal something about the player's values or assumptions?*

Good choices are mirrors. "Do you trust institutions or individuals?" "Do you prioritize family harmony or factual accuracy?" "Do you act fast or verify first?" The player should learn something about *themselves*, not just about the game world.

**How to fix a failing choice:** Anchor each option in a different value system. Not "smart vs. dumb" but "loyalty vs. truth" or "safety vs. connection."

### Test 4: The No Trick Test
> *Is the consequence proportionate and fair? Could the player have reasonably anticipated the general direction of the outcome?*

No "gotcha" moments. The player should never feel *cheated* — only *surprised by the scale* of what their choice set in motion. If they shared a post, they should understand that sharing has reach. If the consequence is that their entire family believes a lie, that should feel like a natural escalation, not a punishment.

**How to fix a failing choice:** Ensure the consequence follows logically from the action, even if the magnitude is unexpected. The chain of cause and effect must be traceable.

---

## 7. RASHOMON RULES

The multi-POV structure is the game's deepest mechanic. It must be handled with precision.

### Core Principles

**Same events, different information, different emotional weight.** When Jun shares a health advisory in the Amplifier arc, it's an act of community care. When Maya receives that same advisory in the Target arc, it's the moment the trap closes. When Reese crafts the advisory in the Operator arc, it's Tuesday. When Dos traces the advisory in the Investigator arc, it's evidence.

**No persona has the "full truth."** Truth is assembled across playthroughs, and even then, gaps remain. The game resists the idea that total knowledge is achievable — because in the real information ecosystem, it isn't.

### Cross-Persona Echo Rules

- Echoes should be **DISCOVERABLE, not ANNOUNCED.** No character says "hey, remember that post?" No UI highlights the connection. The player notices — or doesn't. Both outcomes are valid.
- When a player recognizes a detail from another persona's phone, it should feel like a **revelation**, not a **callback**. The emotional hit comes from the player's own pattern recognition, not from the game pointing at it.
- Echoes should reward **attentive** players without **punishing** inattentive ones. A player who only plays one persona gets a complete story. A player who plays all four gets a richer, more disturbing one.

### Persona Independence Rule

Each persona's story must be **COMPLETE and SATISFYING on its own.**

- No persona is "the tutorial."
- No persona is "the bonus content."
- No persona's arc requires knowledge from another persona to make emotional sense.
- Every arc has its own beginning, middle, and end.
- Every arc has its own thematic question that resolves (or deliberately doesn't).

### Play Order

**Recommended order:** Target → Amplifier → Operator → Investigator

This order maximizes emotional impact: experience the manipulation, then see how it spread, then see how it was built, then try to unravel it.

**But:** All four personas unlock after completing any single arc. The recommended order is a suggestion, not a gate. Players who want to start as the Operator should be able to. Their experience will be different — and that's fine.

---

## 8. THE DEBRIEF CONTRACT

The debrief is sacred space. It's where the phone metaphor breaks — deliberately and with care.

### Rules

1. **The debrief is the ONLY time the phone metaphor breaks.** The interface shifts. The tone shifts. The player is no longer inside the phone — they're looking back at it. This transition must feel intentional and earned, not jarring.

2. **Tone: warm, reflective, non-judgmental.** This is "here's what happened," never "here's what you should have done." The debrief is a conversation, not a grade.

3. **Show the player's choices as a TIMELINE, not a SCORECARD.** No points. No letter grades. No "you got 7 out of 10 right." Instead: a chronological walkthrough of what the player did, what happened next, and what was happening behind the scenes that they couldn't see.

4. **Name concepts gently.** The framing is always:
   - ✅ *"What you experienced here is something researchers call automation bias — the tendency to trust information more when it comes from a system that feels authoritative."*
   - ❌ *"You demonstrated automation bias in this scene."*
   - ❌ *"Automation bias is defined as..."*

5. **Normalize through comparison.** Show aggregate player data: *"67% of players also forwarded that message."* *"Only 12% checked the source before sharing."* This serves two purposes: it reduces shame, and it demonstrates that manipulation works at scale — not because people are stupid, but because the system is well-designed.

6. **Offer real resources without being preachy.** Fact-checking sites. Scam reporting hotlines. Media literacy organizations. Present them as tools, not homework. The framing: *"If you want to dig deeper..."* — not *"You should..."*

7. **End with a question, not an answer.**
   - ✅ *"Now that you've seen how this works, what will you notice tomorrow?"*
   - ❌ *"Remember to always check your sources!"*

   The question should sit with the player. It should follow them to their real phone. It should make the next notification feel different.

---

## 9. CULTURAL AUTHENTICITY CHECKLIST

Run this checklist against every scene set in the Filipino context. A single "no" requires revision.

### The Family GC Test
- [ ] Does it contain a mix of memes, blessings, *pasabuy* requests, unsolicited health advice, chain prayers, and genuine expressions of love?
- [ ] Is there at least one member who sends Good Morning images with sparkles?
- [ ] Is there pressure to respond — and social cost for not responding?
- [ ] Do older family members forward things without reading them fully?
- [ ] Does the GC oscillate between mundane and high-stakes in the way real family GCs do?

### The Scam Authenticity Test
- [ ] Does the scam use channels real PH scams use? (GCash, SMS, Viber, Facebook Messenger — not primarily email)
- [ ] Does the scam's hook match real PH scam patterns? (Government advisory, emergency load request, job offer, contest win — not Nigerian prince)
- [ ] Does the scam exploit PH-specific social dynamics? (*Utang na loob*, respect for authority, family obligation, community trust)
- [ ] Would a CIDG cybercrime unit officer recognize this as plausible?

### The Social Dynamics Test
- [ ] Do characters reflect real Filipino social hierarchy? (Age-based respect, professional deference, family obligation)
- [ ] Is *utang na loob* (debt of gratitude) present as a structural force, not a vocabulary word?
- [ ] Does *hiya* (shame/social propriety) shape character decisions in ways that feel organic?
- [ ] Does *pakikisama* (social harmony/going along) create genuine tension with truth-telling?
- [ ] Do characters navigate these dynamics *naturally*, the way real Filipinos do — not as cultural exhibits?

### The Economic Reality Test
- [ ] Is freelancer income depicted realistically? (GCash payments, delayed invoices, multiple small gigs)
- [ ] Is the government employee salary context accurate? (Modest but stable, with social prestige)
- [ ] Does the economic context explain vulnerability without being the whole story?
- [ ] Are characters' economic decisions rational within their context — not "poor decisions" to outside observers?

### The Recognition Test
- [ ] Would a Filipino player recognize these people as *real*?
- [ ] Would they recognize the GC as *their* GC?
- [ ] Would they laugh at the right moments — not because the game is mocking them, but because it's *true*?
- [ ] Is the humor Filipino humor? (Self-deprecating, communal, pop-culture-referencing, rooted in shared experience)

---

## 10. THE DRIFT DETECTOR

Run this checklist at every major milestone: after each act draft, after each playtest, after each revision cycle. If any box stays unchecked for two consecutive reviews, escalate to a full creative audit.

### Core Alignment
- [ ] Does every scene serve the core thesis? ("You've already been manipulated today — this game shows you how.")
- [ ] Can you trace a direct line from each scene to the thesis in two steps or fewer?

### Commandment Compliance
- [ ] Has any writer or agent started explaining concepts during gameplay? (Commandment IV violation)
- [ ] Are choices still genuinely difficult, or has one path become obviously "correct"? (Commandment V violation)
- [ ] Does the phone still feel like a phone, or has game-UI crept in? (Commandment II violation)
- [ ] Are characters still morally complex, or have any become flat? (Commandment III violation)
- [ ] Is the player still acting before understanding, or are lessons telegraphed? (Commandment I violation)

### Tone Check
- [ ] Is the tone still unsettling-but-warm?
- [ ] Has it drifted toward preachy? (Common late-stage drift)
- [ ] Has it drifted toward nihilistic? (Common overreaction to preachy feedback)
- [ ] Has it drifted toward flippant? (Common overreaction to nihilistic feedback)

### Audience Check
- [ ] Would a non-gamer enjoy this?
- [ ] Would a gamer respect this?
- [ ] Would a Filipino player feel seen — not studied?
- [ ] Would an AI researcher find the concepts accurately represented?
- [ ] Would a teenager find this compelling, not condescending?

### Structural Integrity
- [ ] Is the Filipino texture structural or decorative?
- [ ] Does the debrief still feel like reflection, not grading?
- [ ] Are Rashomon echoes still discoverable, not announced?
- [ ] Is each persona's arc still complete on its own?

### The Final Question
- [ ] Is this still a game you'd recommend to a friend, or has it become homework?

If it's becoming homework, stop. Go back to the thesis. Remember why this exists. Then cut everything that forgot.

---

## APPENDIX: HOW TO USE THIS DOCUMENT

**If you are a writer (human or agent):**
Read this before every writing session. Check your draft against the Anti-Patterns list. Run your choices through the four Choice Design Tests. If in doubt, the Five Commandments are your tiebreaker.

**If you are an editor (human or agent):**
This is your rubric. Every piece of feedback should reference a specific section of this document. "This scene violates Anti-Pattern #1" is actionable. "This doesn't feel right" is not.

**If you are a designer:**
The Phone Is Real (Commandment II) is your north star. Every UI decision must pass the screenshot test.

**If you are running a playtest:**
The Choice Design Tests are your observation framework. Time hesitations. Note which choices are blow-throughs. Flag any moment where a playtester says "well, obviously" — that's a design failure.

**If this document and another document conflict:**
This document wins.

---

*Last updated: March 27, 2026*
*This is a living document. It should be updated when principles are refined — never when principles are abandoned.*
