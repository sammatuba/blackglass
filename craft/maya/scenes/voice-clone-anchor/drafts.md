# Anchor 2 — "It's Me" — workshop drafts + editorial

**Status:** three-phone proof-of-form drafted 2026-06-02 (parallel `blackglass-writer` agents). Not yet polished, not yet built. Reading layer for the user to react to.
**Brief:** [`design-brief.md`](design-brief.md). **Vector:** voice-cloning a relative in distress (Kuya Renz, the family skeptic).

---

## Editorial synthesis (the Consultant)

**The architecture earned itself again.** Three writers, one brief, three non-overlapping failure modes — exactly as the kangkong trio did, but on a new vector and at higher emotional stakes. The Rashomon thesis holds: each character is reasonable from inside their own phone, and each fails in a different shape.

**Failure-mode mapping (distinct from kangkong):**
- **Tita Merly — *the voice is the proof.*** The biometric escalation of love-as-proof. For sixty years a beloved voice could only come from the beloved person, so there is no doubt to *overcome* — the doubt was never possible. She sends ₱18,500 from her US daughter's remittance (meant for Papa's check-up). The "wag sabihin kay Mama" secrecy beat is the masterstroke: the scam makes her *isolate the one verification that would have worked.*
- **Maya — *verification loses the race.*** She knows on sight (Renz would never call Tita first; Renz is the "CHECK. THE. BALANCE." guy). The knowledge is useless. Texts the real Renz — undelivered. "Wait, it might be fake" lands on a panicking mother as "I don't care if your brother is in jail." The responsible move costs time the scam stole in advance.
- **Bea — *right, and absent.*** She is *correct in five seconds* — webinar, slide 7, the whole thing. Her failure is converting a live family terror into competence and content: screenshotting for the council, half-drafting the next webinar slide, while a woman two suburbs over is shaking. Her third choice ("call Maya — not to explain, just to be there") is the only redemptive path on any of the three phones, and it should stay a *choice*, not a given.

**Standout moves to keep:**
1. **Tita's ₱18,500 is her daughter's remittance for Papa's check-up.** The money has a face. Don't abstract it.
2. **The clone weaponizes the family's own skeptic.** Renz says "CHECK. THE. BALANCE." — and his is the most-recorded, most-clonable voice. The brake becomes the accelerant. This is the whole anchor in one irony.
3. **The live call after the voice note.** "Multi-contact escalation" — synchronous contact feels more real than async. Bea even names it as the evolution. Render the incoming-call screen as a real beat.
4. **"Wag muna sabihin kay Mama."** The secrecy instruction that isolates verification — pure scam architecture wearing the costume of a son's consideration.
5. **The voice "talks over" every real question.** Tita asks "sino kasama mo?"; the clone never answers anything off-script. A findable tell, and unbearable in the moment.
6. **Renz surfaces three minutes too late.** "naglalaro lang ako ng badminton... 14 MISSED CALLS???" The truth arrives, on a screen, just after the money leaves.

**Continuity to reconcile in polish (drafts diverge slightly — expected):**
- **Timeline:** Tita's draft resolves at ~8:18; Maya's at ~8:24 with the send at 8:21. **Adopt the Maya/Bea timeline** (send 8:21, Renz surfaces 8:24) as canon — it gives the consult-and-fail beats room to breathe. Retime Tita's realization to land *after* the send.
- **Mama's name:** Tita's draft calls her "Ate Lydia." Confirm against baseline before locking (kangkong uses "Mama"). Keep "Mama" in-GC; "Lydia/Ate Lydia" only where an elder addresses her by name.
- **Whose money / whose remittance:** lock that the ₱18,500 is Tita's, from her daughter abroad. Maya doesn't send (she's frozen in verification); Tita is the one who sends.

---

## Proposed epilogue — "The evening, all at once"

Mirrors the kangkong timeline epilogue. The same 22 minutes, refracted, so the player sees the scam outrun three reasonable people.

| time | who | beat |
|---|---|---|
| 8:02 | tita | Viber voice note, Renz's cloned voice (0:34). *It's his voice. There was never a doubt to overcome.* |
| 8:05 | tita | She raises it — but keeps "wag kay Mama," isolating the one call that would've worked. |
| 8:09 | maya | Mama panics; the GC accelerates. Urgency compounds itself. |
| 8:11 | maya | Maya wakes to 18 messages. Knows on sight. Texts the real Renz — undelivered. |
| 8:14 | tita | A *live call*, the cloned voice, the GCash number. Synchronous feels true. |
| 8:16 | bea | Maya consults Bea. 90% a clone, in five seconds. |
| 8:18 | bea | Bea screenshots for the council, opens the webinar slide. Right, and not in the room. |
| 8:20 | maya | "Wait — it might be fake" lands on a panicking mother as "I don't care." |
| 8:21 | tita | Tita sends ₱18,500 (Papa's check-up money) to `0915-•••-••••`. |
| 8:24 | maya | The real Renz: *"naglalaro lang ako ng badminton... 14 MISSED CALLS???"* Three minutes too late. |
| *(opt.)* | — | **Silent witness:** Renz's phone, face-down in his badminton bag since 7 PM — the proof, on a screen no one could reach. |

**Close:**
- A scam built from his own voice — the family's skeptic, the one who said *check the balance,* turned into the thing that couldn't be checked.
- Tita heard him. Maya knew. Bea was right. None of it was fast enough.
- The advice that kept us safe — *call them to be sure* — assumed a voice could only come from a person.

---

## Proposed reflection — "What you carry forward"

- **Tita Merly · A voice is not a person anymore.** The last biometric proof most of us still trust — *I know his voice* — is now manufacturable from a few seconds of uploaded audio. Her love and her credulity were, again, the same reflex; this time the scam wore his throat.
- **Maya · Urgency is the weapon.** She was right immediately and it bought her nothing. The scam isn't built to fool the alert — it's built to move faster than anyone can verify. Awareness is not speed.
- **Bea · Being right is not being present.** She had the slide, the mechanism, the certainty. Performed as expertise instead of lived as care, media literacy became a way to leave the room while staying in the chat.
- **Coda.** We were taught to trust a voice because a voice could only come from someone we love. That is no longer true. The colder new rule: when an emergency punishes you for pausing, *the pause is the point.*

---

## Open structural decisions (user's call — do not assume)

1. **Silent-witness device (recommend: yes, epilogue-only).** Renz's face-down phone as a non-playable timeline reveal — *not* a fourth playable phone (the architecture doc reserves that for explicit direction). Highest-impact, lowest-cost way to land "the truth existed the whole time."
2. **Build now as Anchor 2 (recommend: yes, after one polish pass).** Requires a modest engine refactor: promote "anchor" to a selectable top-level concept (rack → choose anchor → its three phones → its timeline/reflection). `story.js` becomes `{anchors: {kangkong, voiceclone}}`.
3. **Graphics for this anchor (deferred with the rest).** Diegetic artifacts when billing's sorted: the voice-note waveform (real audio is the dream), the incoming-call screen, the GCash transfer confirmation. All map cleanly onto the existing manifest pipeline.

---

## The three drafts (verbatim workshop output)

### A. Tita Merly — FORWARD — "the voice is the proof"

**Phone interior (Tuesday, ~8:02 PM):** Kitchen clean, she hasn't sat down. Papa in the living room with the news. Phone on the counter by a damp dishrag and her reading glasses. Light mode, Viber badge 23 (uncleared from the morning prayer chain), Last Supper wallpaper. She's been carrying a worry about Renz since his morning text about his *masama* boss. The chime — the rounder voice-note sound — and his name. She smiles before she opens it.

> **Voice note (0:34), Renz's cloned voice:** *"Tita, hi — naku, sorry ha, I know this is out of nowhere... I got into a fender-bender kanina, like, nothing serious, I'm fine, pero the other driver is making it a whole thing... ₱18,500... if I don't pay tonight he said he's taking it to the barangay... my phone is dying, I'm at like 3%... Can you GCash me?... Wag muna sabihin kay Mama, please, ayoko silang mag-alala..."*

Key beats: she plays it three times — *the way he says naku, the laugh-sigh, the breathing.* "It's him." → the GCash number `0915-•••-••••` arrives by text. Choices (**all converge**): *Call Mama* (interrupted by an incoming call from "Renz" — synchronous, the clone talks over "sino kasama mo?") · *Ask where he is* (the clone deflects, then calls) · *Open GCash now*. The GCash balance is **₱24,180.50 — her daughter's US remittance for Papa's check-up and the bills.** She sends; balance blinks to ₱5,680.50. She covers for him to Papa ("prayer group lang"). Then the GC: Maya asking if anyone's heard from Renz → Renz: *"naglalaro lang ako ng badminton, anong nangyayari."* The realization. "Sit down."

*Editorial (writer):* Her failure is the biometric escalation of love-as-proof — the voice *is* Renz, not evidence of him. FORWARD mobilizes instantly; the "wag kay Mama" secrecy isolates verification and closes the loop. Teaches: a voice is no longer proof of identity, and the scam weaponizes the very instinct that makes her a good tita.

*(Full beat-level draft preserved in agent transcript; promote to `script.ink` at polish.)*

### B. Maya — DECIDE — "verification loses the race"

**Phone interior (Tuesday, 8:11 PM):** Dark mode, six icons, the "no" folder now 14 apps deep, brightness still 15% (the habit is 9 AM, not evening — she spends nights in a phone that feels like it's apologizing). Hasn't opened Messenger in four hours; lets the badge climb because fifteen messages blur into "the family wanted something" instead of fifteen obligations. A bad system. It works.

Key beats: face-down phone "making a sound like bees trapped in glass" → **18 messages in 9 minutes** → the GC explosion (Tita's voice note cached as evidence; Mama "BAKIT HINDI KO ALAM TO"; "18,500 daw"; "MAYA GISING KA BA"). Maya reads it *like a deck where the client has already decided.* "Kuya Renz does not get into accidents. Kuya Renz is the person who says CHECK. THE. BALANCE." Her text to Renz: **sent, not delivered.** Choices under a clock: *Text Renz again* (sits under the last, undelivered) · *Consult Bea* ("asking someone else to tell you what you already know") · *"WAIT. Everyone wait. This might not be real."* (the compose field she can't finish — "what you are offering is doubt; what she needs is certainty; you have none") · *Call the number* (you'd reach the clone). Bea confirms 90%. The cruelty: *what if the 10% is real.* Renz surfaces 8:24 — *"14 MISSED CALLS??? MAYA??? MA???"* — three minutes after Tita sent at 8:21. "You were right the whole time. You are still the person who watched someone you love send ₱18,500 to a number that will never reply."

*Editorial (writer):* Knowing-but-not-outrunning — correct knowledge made useless by a crisis engineered to move faster than verification. Teaches: awareness ≠ resistance when the deception is built for speed; manufactured urgency defeats even correct suspicion.

*(Full beat-level draft preserved in agent transcript.)*

### C. Bea — CONSULT — "right, and absent"

**Phone interior (Tuesday, ~8:16 PM):** Home 90 minutes, dinner at the counter against the coffee canister, laptop on the couch with tomorrow's-meeting tabs. The council mid-thread (waiting on Janine's forensic eye). A Canva tab open: **"Voice Cloning 101,"** a webinar she gave four months ago, slides 12 unfinished. Pleasant dead space — until Maya's text punches through.

Key beats: *"is this a voice clone?? it's renz's actual voice."* She knows in five seconds — *she has a slide about this (slide 7: voice triggers trust faster than text).* "It's him. It's not him. It's both." She narrates the mechanism to Maya (cloned from his videos; the live call is "the evolution — multi-contact, the call is the closer"); **screenshots for the council** ("live one... WATCH THIS SPACE might need this for the next webinar"); Janine: "you recording the call?" The clean small warmth of being useful. She tells Maya the right thing (ask a question only the real Renz knows). Then: *"she's sending it. she's crying. i don't know what to do"* — and Bea doesn't either. The final **choice** is the moral fulcrum: *Stay on the couch (expert mode)* · *Open Canva and finish slide 12 (convert terror to content — "you do not notice you have also turned a family's terror into a bullet point")* · ***Call Maya — not to explain, just to be there*** ("you stop being the person who explains and start being the person who sits in it with her... the first thing tonight that feels like enough").

*Editorial (writer):* Not ignorance — she's exactly right. Her failure is converting live terror into competence and content; confirmation-as-closure becomes *emotional* absence. Teaches: media literacy performed as expertise rather than lived as care becomes its own form of absence — being right about how deception works is not being present for the person being deceived.

*(Full beat-level draft preserved in agent transcript.)*
