# Ticket to Europe — Analysis

> **At a glance:** The most formally ambitious of the six — a migration drama in Yarn Spinner with 6,000+ nodes, museum funding, and a first-person Polish-diaspora voice that is unexpectedly, saving-gracefully funny. A civic-education game that does not pander.

## P1 — Origins

**Polish Migration Museum** in partnership with **Nerd Cave Studio**, released 2022. **Museum-funded** — a rare serious-games deliverable with real institutional backing. Godot 3.2.3; narrative engine is **Yarn Spinner**. The author credit is collective; the voice is nonetheless consistent enough that one or a very few writers was clearly steering. Four localizations shipped (EN / IT / PL / ZH) — English is likely a translation from Polish, but the translation is competent enough to read as *voiced English*, not as retranslated museum prose. [craft-memory on museum-game context]. The constraint that matters is **mandate**: tell the history and modern reality of European migration in a way that lands without being pedagogical. That mandate shapes every craft decision downstream — especially the decision to be *funny*.

## P2 — Artifact

- **6,216 Yarn nodes** across ~100 English `.yarn` files — **by far the most scenes of the six**
- **289,790 tokens**, **19,686 unique** (TTR 0.07 — expected-low for this scale)
- **Mean scene length 46 tokens** — tiny, choice-saturated micro-beats
- **9,380 `[[…]]` choice links** — ~1.5 choices per node; because nodes are short, **choice density per minute of reading is the highest in the set**
- **Top entities:** *Isaac, Kassim, Marko, Wahid, Erik, Anna, Mona, Helena, Europe, Italy, Greece, Africa, Egypt, Battuta* — diverse cast, **geography as character**
- Cleanest extraction in the set: Yarn's node / choice syntax survives intact

The shape: **graph-dense, choice-saturated, short-beat.** A *simulation of the experience of choosing*, not a story delivered with choices.

## L1 — Voice

First person, present tense, Polish diaspora. Wry, self-critical, prone to interior mock-philosophical asides: *"I don't happen to be in a Freudian mood today. I'll leave family therapy for another time. When I'm not in Egypt."* The protagonist has a name (Erik) but the voice feels authorial — confident, faintly formal, Eastern-European dry humour pinned against first-world embarrassments. Distance from protagonist is **chosen, not fixed**: Erik's self-awareness makes him a willing performer; the reader is given permission to be inside him or above him as the scene requires.

## L2 — Texture

Short sentences (mean 7.7 tokens), micro-scene construction. The surface is plain; **interiority is layered across short beats** — a reaction, a thought, a caveat, a choice. The writing *refuses* wall-of-text introspection; instead, psychology is delivered in clipped passes with choice inflection. Diction: conversational-literary, Polish sensibility audible in the rhythm. What it leans into: names, places, micro-procedural detail (*the phone in the ear, the voice that seems familiar*). What it avoids: sentiment, lecture, melodrama, travelogue-exoticism. Given the mandate it was written under, the absence of sentimentality is the achievement.

## L3 — Time

**Real-time micro-pacing.** Scenes are so small — 44 tokens median — that time barely passes per node. Hours pass between chapters, not between scenes. The graph structure means the reader is constantly choosing, which **slows subjective time** and makes mundane events (a phone call from mother in the hotel) feel like stakes. A civic-education trick: make ordinary logistics feel like drama, so that the player experiences migration as *labor* rather than *epic*. Larger elisions happen at chapter boundaries (Day 1 → Day 2, Chapter III → Alexandria). Within a chapter, *every moment is rendered*.

## I1 — Choice

Choices are **almost always emotional-framing selects**: *"What a relief"* vs. *"I feel anxious"*; *"I try to wake up"* vs. *"I answer in my sleep"*. These are not plot forks; they are **who-are-you-right-now selects**. Cost structure: often invisible, but the game accumulates tags (`TagAdd(liar)`, `Tag(drunk)`) that gate future options. This is a **voice-shaping agency model** — the player chooses which version of Erik narrates the next scene. Very high total choice count (9,380) makes the whole reading feel like **continuous consent to Erik's self-presentation**.

## I2 — Consequence

Tags and variables are the state. Visible to designers; invisible to players except via option-gating. Horizon is usually short (within chapter); a few tags have long legs (`TagAdd(liar)` carries). What makes the consequence model work *literarily* is **how small the asymmetries are**: the liar-tag isn't a villain tag, it's a *"Erik lied once, so future white lies cost him less."* The game's economy is **drift, not escalation** — and for a game about migration specifically, drift is the right economic model. Nobody becomes an immigrant in a single decision.

## F — Frame & Payload

Frame: **diasporic first-person travelogue**, positioned as uninflected reportage but actually shaped by Polish-diaspora humor and a civic-education mandate. Payload: *migration is a sequence of tiny, morally ambiguous logistics, not a single brave gesture.* The museum's civic argument rendered as game: *don't romanticize the migrant, don't condescend either; watch them do the dishes in a hotel in Egypt and notice what it costs.* What the work wants from the reader: to experience migration as **labour** rather than as **epic**.

## Coda — What the work knows about itself

Ticket to Europe knows **the medium is ideal for its message**. Museum education usually fails because it pretends to be neutral; a game that makes you choose *"I answer in my sleep"* makes you complicit in Erik's small evasions — and that complicity *is* the civic lesson, delivered without delivering a lesson. The craft risk of the approach is that **the graph itself becomes the feature**: at 6,216 nodes, some are inevitable and some are felt. The writing holds up surprisingly well at that scale, which is the mark of serious authorship. Of the six works in this set, this is the **cleanest, most disciplined execution of a serious-games mandate** — the rare case where the "educational" label understates rather than overstates the craft.
