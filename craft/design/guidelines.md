# Craft Guidelines — the Work

> **A living record.** Each guideline names a rule, the *why* behind it, *how* to apply, and the reference work(s) that taught it. Override when craft demands. If you override more than twice, the guideline needs editing, not dodging.
>
> **First seeded:** 2026-04-19, Phase 3 of the game-inspiration cross-reading — eleven rules distilled from six reference works. Evidence lives in [`../../research/game-inspiration/_synthesis.md`](../../research/game-inspiration/_synthesis.md).
>
> Sits alongside [`world/guardrails.md`](../../world/guardrails.md) (ethics of depicting deception) and other docs under `craft/design/` (specific mechanics).

## Orientation

These guidelines govern **the work** — the interactive narrative centered on Maya, set in the Philippines, concerning AI-mediated deception — and, where marked, the supplementary literacy tools. Scope is explicit per rule.

**How to use.** Read before writing. When a guideline says one thing and the scene wants another, the scene wins — *with a note* in this document explaining the override. That note is how the guidelines earn their evolution.

**Priority order when guidelines conflict.** Frame (§1) and mechanical unity (§6) are structural; they bind the others. Everything else is craft-level and pairwise negotiable.

---

## 1. Frame first

**Rule.** Before voice, before mechanic, before scene — decide what Maya's *act of writing* is. Journal? Group-chat log? Police statement? Podcast transcript? Voice-note dump? Document leaked to a reporter?

**Why.** The frame dictates everything downstream — time-shape, trust model, register, which kinds of choice feel legal. "Cinematic scene" is the porous default CYOA fallback that quietly undoes every other rule in this document.

**How to apply.** Pick one; commit; let it constrain. If Maya keeps a journal, scenes have dates. If she's dictating voice notes, sentences run. If this is a chat log, other voices interrupt on a different rhythm. The frame's constraints *are* the craft.

**Scope.** Both. Teaching tools should also commit to a diegetic frame where possible (lab notebook, archive, game-show, case-file).

**Provenance.** All six reference works commit to clear frames: Sir Brante (hagiography), Omen Exitio (diary), Grotto (oracle chamber), Grizzly Man (pulp magazine), Ticket to Europe (diasporic travelogue), Tails Noir (case-file + dossier). Frame-commitment is the most consistent craft move in the set.

---

## 2. Choice is voice, not topology

**Rule.** Most choices shape **which Maya is narrating** — not what happens next. The plot may be largely fixed; the branching lives in Maya's self-presentation.

**Why.** Contemporary interactive-fiction craft has moved away from combinatorial branching trees. Choices are tonal / ontological consent, not topological forks. For AI-deception specifically, the deception happens in *how the narrator tells herself about what happened* — making the branching continuous with the theme rather than cosmetic to it.

**How to apply.** Default choice shapes: *"What a relief"* vs. *"I feel anxious"*. *"I reread the message three times"* vs. *"I reply before I'm sure"*. *"I tell Lola"* vs. *"I keep it to myself."* Avoid plot-fork choices ("save Alex vs. save Ben") except at rare, load-bearing pivots.

**Scope.** Fiction primary.

**Provenance.** Omen Exitio (canonical — the `Bis`-variant scenes are *the same event narrated differently*). Ticket to Europe (high-density emotional-framing). Sir Brante (Lot-expressing choices).

---

## 3. Consequence is drift, not fork

**Rule.** State accumulates through small, quiet tags. Avoid stats that declare their meaning (`Gullibility: 7` — no).

**Why.** AI-entrainment is drift, not decision. A binary "you fell for it / you didn't" betrays the real psychology. The work's consequence model should match the theme's psychological model.

**How to apply.** Tags like `rereads_without_questioning`, `defers_to_model_on_finance`, `tolerates_plausible_lies`. Gate future options subtly. Aim for the reader to realise — twenty scenes in — that they've become someone scene-one-Maya wouldn't have recognised. Without a stat ever spelling it out.

**Scope.** Fiction.

**Provenance.** Ticket to Europe (`TagAdd(liar)` as drift tag, not villain tag). Sir Brante (long-horizon accumulation — *character is destiny written slowly*).

---

## 4. Design the ellipsis grammar

**Rule.** Decide what's a scene and what's skipped **before** writing the scenes. Skipped moments carry weight only when rendered moments earn them.

**Why.** AI-deception unfolds over weeks. Offstage time is where the slow entrainment happens. If we render it all we over-script; if we don't plan ellipsis we lose temporal shape.

**How to apply.** Pick an elision pattern and teach the reader to read it. Chapter headers with dates. Phone-log gaps between scenes. "The next time we talked, it was three weeks later." Whatever the device is, commit early and let the reader learn the rhythm.

**Scope.** Fiction.

**Provenance.** Sir Brante (30 years compressed through 47 interlude-bridges — the densest time-grammar in the set). Omen Exitio (diary-time: elision between the event and the entry writing about it).

---

## 5. Maya's refusal fingerprint

**Rule.** Decide what Maya *will not write.* Her refusal is where her voice lives.

**Why.** Every strong reference work has a visible refusal. Erik never writes himself weak. Sir Brante's narrator refuses contractions. Grotto refuses description. Tails Noir refuses interior monologue longer than a few lines. The refusal is clearer craft evidence than what gets included.

**How to apply.** Candidate refusals for Maya — pick one or two and enforce:

- Never names the person she's protecting.
- Never uses the word *manipulated* even when manipulated.
- Never admits doubt in the moment; only in retrospect.
- Never quotes an AI response in full — only paraphrases or fragments.
- Never writes what the weather was like.

The refusal becomes a voice-tell over time. Readers will notice and find it haunting.

**Scope.** Fiction.

**Provenance.** Omen Exitio (Erik's editorial refusals — he never admits being wrong in the same entry where it happens). Sir Brante (register refusals — no colloquialisms). Grizzly Man (brevity as refusal of description).

---

## 6. Mechanic = prose = frame = one thought

**Rule.** The work's mechanic, its prose style, and its framing device should be three faces of the same idea. When all three align on the theme, teaching becomes invisible — because it's *enacted* rather than *stated*.

**Why.** "Don't make it preachy" is the wrong diagnosis. The cure is **structural unity**. If the theme is *unclear seeing under AI mediation*, the mechanic should produce unclear seeing in the reader's hands, the prose should be a voice that can be misled, and the frame should be a document written by someone who has been misled.

**How to apply.** For our work specifically: consider mechanics where what Maya reads on her screen is *slightly different* from what the player reads. Where her summary of a message drifts from its text. Where the interface itself quietly edits content between rereads. These are not gags — they are the game teaching the player to mistrust the page.

**Scope.** Both. Teaching tools should also aim for mechanical unity — what the player *does* should be the concept, not a wrapper around it.

**Provenance.** Grotto (the canonical thesis game — mechanic, prose, and frame are three faces of one argument about interpretation). Ticket to Europe (civic lesson lands via mechanic: the player *chooses* Erik's small evasions, which *is* the lesson).

---

## 7. Believe the genre

**Rule.** Whatever genre we commit to — confessional, noir, social-horror, documentary, true-crime — play it straight. No wink.

**Why.** Pastiche without reverence reads as self-protection. The reader feels the writer hedging and withdraws emotional investment. Genre conventions are load-bearing only when the author trusts them.

**How to apply.** Once the genre is decided, honor its conventions without irony. If we choose first-person confessional, let Maya confess fully — including to us the reader as a specific narratee. If social-horror, allow the reveal to land. If documentary, commit to the pose of objective assembly. Do not undercut with archness.

**Scope.** Fiction primary. Teaching tools should also commit to their chosen framing (lab, archive, game-show, courtroom) without winking.

**Provenance.** Grizzly Man / Pixel Pulps (pulp believed seriously — the genre carries real dread because it is trusted). Tails Noir (noir played straight even under species-politics overlay — the overlay works because the base genre isn't parodied).

---

## 8. Trust the reader to complete the world

**Rule.** Render the moments that matter; gesture at the rest. Negative space is craft, not laziness.

**Why.** The reader's imagination is always better at furnishing background than prose. Over-rendering the incidental flattens the rendered. Under-rendering the central betrays the scene. The allocation is the craft.

**How to apply.** Concrete sensory detail in key beats — what object is on the table, what the phone's vibration pattern is, whether Maya's hair is wet. Gestural everywhere else. Refuse travelogue voice and the *setting-the-scene first paragraph.*

**Scope.** Both.

**Provenance.** All six works operate in negative space at varying discipline. Ticket to Europe is the tightest. Omen Exitio is the cautionary example — Zanzibar is under-rendered in a way that reads as *unconcern* rather than *trust*.

---

## 9. Cultural texture is specific, contested, present

**Rule.** The Philippines is not a stage backdrop. Specifics — neighborhoods, vocabulary, family structures, class tensions, religious texture, meal rhythms, commute shapes — must operate at the scene level.

**Why.** An AI-deception story set in the Philippines that renders the Philippines generically is doing something ethically and aesthetically wrong — it makes the cultural context a *flavor* for an otherwise-universal tale. The cultural specifics should constrain the plot, not decorate it. Generic tropes invite Western reader-defaults and push the setting into stereotype.

**How to apply.** A Maya scene unfolds in a specific barangay at a specific hour. Specific Tagalog or Taglish phrases alongside English. Specific intra-family dynamics (the way eldest daughters carry, the way boomers forward chain messages, the way a tita's living room smells during brownout). Location is a *pressure* on the scene, not a caption.

**Scope.** Fiction primary. Teaching tools may operate at lighter cultural specificity but should avoid globalist defaults.

**Provenance.** Omen Exitio (warning — Zanzibar-as-atmospheric-backdrop is what not to do). Ticket to Europe (positive example — Polish diasporic specificity made the voice work rather than feeling like a costume).

---

## 10. First playable is one-hour scope

**Rule.** Aim for 60–90 minutes single-sitting. ~200 narrative nodes, ~15k words, 3–5 major pivots. Earn scale before claiming it.

**Why.** Short atmosphere-heavy work is where the technique proves itself. If the shape works at one hour it can grow; if it doesn't, scaling won't save it.

**How to apply.** Design the first playable as a complete, self-contained arc. Maya's first encounter with the deception, one escalation, one pivot, one consequence. Full vertical slice of voice + mechanic + frame. Resist story-expansion before the shape is validated.

**Scope.** Fiction, first milestone.

**Provenance.** Tails Noir Prologue (best single-sitting craft in the set — the prologue is superior to the full-length game that followed). Grotto (thesis-complete in one sitting). Ticket to Europe (warning — 6,216 nodes is past milestone-scale; the shape is earned, not claimed).

---

## 11. Let art direction do work the prose declines to

**Rule.** When visuals are rich, the prose can be clipped. When visuals are sparse, prose carries more. Coordinate the registers so they don't compete.

**Why.** Reading effort is a budget. If the screen is already doing mood work, prose that *also* does mood work competes with it; prose that stays spare and lets visuals lead reads confident. If visuals are absent, prose must render what the screen cannot.

**How to apply.** Clipped sentences in visually-rich scenes. Longer, more imagistic prose in text-only scenes. Avoid double-rendering the same mood. Decide early how much visual design the work will carry; let that decision calibrate the prose.

**Scope.** Fiction, pending art direction decisions; teaching tools where visual design exists.

**Provenance.** Grizzly Man / Pixel Pulps (pixel art carries mood; prose stays at 4.9-token sentences). Tails Noir (atmosphere-as-mechanic; prose clipped to sit inside the visuals).

---

## How this document changes

New guidelines come from: future reference-work cross-readings; playtesting the first milestone; collaboration feedback; and cases where an existing rule fails repeatedly — the override becomes the new rule.

**Revisions are expected.** Note each override inline (even a single line — "§5 overridden for scene 08, Maya breaks the no-weather rule because…"). When an override accumulates, rewrite the rule.

**Deletions.** When a rule is overridden more than twice in practice, it either needs rewording or it was wrong; either way, revise. Do not quietly retire a guideline; document why.

**Priority order when conflicts arise.** §1 (frame) > §6 (mechanic-prose-frame unity) > everything else. Frame decisions bind downstream. Unity checks whether the frame, mechanic, and prose are actually saying the same thing.
