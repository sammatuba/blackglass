# Comparative Matrix — Six Works

A single grid of the six interactive-fiction works analyzed in this set. Rows are the lenses from [`_framework.md`](_framework.md); columns are the works in extraction order. Each cell holds one compressed observation.

Full per-game notes live in `<game>/analysis.md`. Quantitative evidence lives in [`_metrics/out/facts.md`](_metrics/out/facts.md).

**Remember the asymmetry:** Tails Noir Prologue was extracted via post-decompression strings-dump; its topology numbers are not directly comparable to the others.

## The grid

| Lens | **Sir Brante** | **Omen Exitio** | **Grotto** | **Grizzly Man** (Pixel Pulps) | **Ticket to Europe** | **Tails Noir Prologue** |
|---|---|---|---|---|---|---|
| **P1 Origins** | RU, Sever / 101XP, 2021; Unity Mono, writer's-room, translated from Russian | IT, Brigada / Mixtvision, 2018; IL2CPP; adaptation of a print gamebook | ES, Brainwash Gang, 2021; Unity Mono; single-sitting fable | AR, LCB Studio (2-author), 2022–2024; Naninovel; ongoing pulp series | PL, Museum + Nerd Cave, 2022; Godot + Yarn; civic-ed mandate | UA/CA, EggNut, 2018; UE4; prologue as polish peak |
| **P2 Artifact** | 47 interludes frame 12 k CSV scenelets; 684 buttons | 98 titled scenes, 6 `Bis`-variants — low branching | 90 Visits × 14 endings; ~60 k prose, strings-harvested | 305 `.nani`, ~9.7 choices/scene, **sent-len 4.9** | **6,216 Yarn nodes**, 9,380 choices, 46-tok median | Unmeasurable topology; 188 k prose-runs |
| **L1 Voice** | 2P authorial, ceremonial; Brante is vessel | 1P diary, unreliable-editorial, period-permeable | 2P oracle + neo-pronouns + meta-narrator (3 stacked) | 2P Argentine *vos* + speaker-tagged pulp | 1P Polish-diaspora wry; voice as willing performer | Hardboiled PI notebook + diegetic-document fragments |
| **L2 Texture** | Long periodic sentences, duty-vocab; refuses warmth | Diary fragments, dateline beats; thin sensory | Fragment-primer, totem-nouns, repetition-as-drift | 4.9-tok sentences, pulp cut-on-beat; one image/scene | Plain surface, layered short-beat interiority | Clipped tells, subject-drop, translation-friendly brevity |
| **L3 Time** | Aggressively compressed: 30 years in 47 ellipsis bridges | Diary-time; elision between entry and event | Episodic by segment; misreadings bridge visits | Cut-on-action; each scene an issue of a serial | Real-time micro-pacing; chapter-level compression | Real-time investigation; hours not days |
| **I1 Choice** | Lot-expressing; stance over action | Pre-commit stat gates + post-commit narration | Noun-selection from star vocabulary | Tonal / interactional + minigame-anchored | Emotional-framing selects, voice-shaping | Dialogue-selects during interrogation |
| **I2 Consequence** | Long-horizon accumulation — character is destiny | Medium-horizon, mood-responsive | Hidden via next-visit misreading | Short-horizon noir-escalation | Drift via tags; asymmetries small | Accumulating-clue notebook; medium horizon |
| **F Frame** | Hagiography / chronicle; class politics | Journal as unreliable document (Lovecraft-by-distance) | Oracle chamber; interpretation as collaboration | Pulp magazine; belief-in-genre | Diasporic travelogue; migration as labour | Hardboiled case-file + species-politics overlay |
| **Core move** | Time-compression grammar | Choosing **which version the diary writes** | Noun-choice + downstream misreading | Dense-choice + minigame-anchored pulp frame | High-density emotional-framing + drift tags | Art-direction-as-mechanic + species overlay |

## Corpus fingerprints (from `_metrics/`)

| Metric | SB | OE | Grotto | GM | TTE | TN |
|---|---|---|---|---|---|---|
| Scenes | 47 | 9¹ | 261² | 71 | **6,216** | —³ |
| Tokens | 13.7 k | 11.3 k | 75.9 k | 82.5 k | **289.8 k** | 86.2 k |
| TTR | 0.18 | 0.19 | 0.05² | 0.12 | 0.07⁴ | 0.16 |
| Sent-len mean | 13.4 | 14.1 | 10.0 | **4.9** | 7.7 | 8.2 |
| Tokens / scene (μ) | 292 | 1,253¹ | 291 | 1,162 | **47** | 17³ |
| Choices / scene | 14.6 | 0.7¹ | 10.2 | 9.7 | 1.5 | —³ |

*Footnotes.* ¹ Omen Exitio: counting only readable journal entries; scene bodies unread. ² Grotto: strings-harvested with ~10–20 % noise; TTR noise-inflated downward. ³ Tails Noir: no scene segmentation possible from strings dump. ⁴ Ticket to Europe: TTR expected-low at 290 k token corpus (Heaps' law).

## Formal observations across the set

*Written with the set in view; no alignment to Blackglass yet.*

### 1. Frame is load-bearing, not decorative

Every one of the six declares a **clear diegetic frame** — hagiography, diary, oracle chamber, pulp magazine, travelogue, case-file — and the frame does real structural work. The frame:

- sets the register the prose must honour
- dictates the shape of time (diary-time, episodic-time, real-time)
- legitimises the form of choice the player gets (narration-selects in Omen, noun-picks in Grotto)
- tells the reader how to *trust* the narrator

When a game has a weak or default frame it tends to fall back on "cinematic scene" as a pseudo-frame, which is porous and tends to push everything toward film-reference defaults. None of the six do that. **Choosing and committing to a frame is the single highest-leverage craft move in the set.**

### 2. Choice is almost never plot, almost always self-presentation

Across the six, explicit plot-forking is rare. What choices actually do:

- **Sir Brante:** express Lot (who are you becoming)
- **Omen Exitio:** select which narrator voice writes the diary entry
- **Grotto:** name the situation
- **Grizzly Man:** set tone with the person in front of you
- **Ticket to Europe:** frame your own emotional reaction
- **Tails Noir:** pick how to press during an interrogation

The common shape: the **plot is usually approximately fixed**, and the choice is **who you are inside the plot**. Contemporary CYOA has largely abandoned the "combinatorial branching tree" fantasy and replaced it with **continuous tonal / ontological consent**. That is a big historical shift worth stating aloud. It reframes "choice" as a *voice mechanism*, not a *topology mechanism*.

### 3. Time compression is a specialist skill most games treat casually

Sir Brante's 30 years through 47 interludes is the extreme; Omen's diary-time and TTE's chapter-level skips are gentler versions. The pattern: **the games that succeed understand ellipsis as a craft tool, not a scheduling convenience**. Grizzly Man, which *doesn't* modulate compression — 4.9-token sentences hammering across 305 scenes at the same velocity — is the one that reads as fatiguing over long play. Time-compression grammar is underdiscussed in IF criticism and shows up here as the difference between *shape* and *grind*.

### 4. Solo / duo authorship shows in the sentence fingerprint

The tightest sentence rhythms (Grizzly Man at 4.9 tokens, TTE at 7.7, Tails Noir at 8.2) come from **small-team or solo-authored projects** where one writer's ear was audibly steering. The longer rhythms (Sir Brante 13.4, Omen 14.1) come from writer's-room or adaptation projects. This isn't a value judgment — Sir Brante's length serves its ceremony — but it's a predictor: if you want clipped prose, you need **authorial continuity**, not a writers' room.

### 5. The "refusal" fingerprint is where craft lives

Each strong work has a clear *what it refuses to say*:

- Sir Brante refuses colloquial warmth and contractions
- Omen Exitio refuses to let Erik look weak
- Grotto refuses decorative description and proper names for places
- Grizzly Man refuses scene-setting and slow pace
- Ticket to Europe refuses sentiment, lecture, exoticism
- Tails Noir refuses interior monologue longer than a few lines

The refusal is often a clearer signal of authorship than the inclusions. When writing criticism on work like this, **ask what the writer won't say** before asking what they wanted to say.

### 6. The Heaps'-law warning

Raw TTR (type-token ratio) is a corrupted comparator across differently-sized corpora — 6,216-node Ticket to Europe necessarily shows a lower TTR than 47-interlude Sir Brante because vocabulary saturation is a function of corpus size. A future deeper quant pass should use **MTLD** (measure of textual lexical diversity, size-invariant) or **moving-window TTR** to compare these honestly. For now: trust the *rank* of the TTR values more than the absolute values, and trust *top-named-entities* counts as a better eyeball test of vocabulary focus.

### 7. Single-sitting vs. sprawl is a genre split

Three of the six are **single-sitting compact works** (Grotto, Omen Exitio, Tails Noir Prologue). Three are **sprawl-scale** (Sir Brante, Grizzly Man bundle, Ticket to Europe). The compact set shows tighter formal unity (Grotto is the most unified of the six). The sprawl set has more narrative range at the cost of some formal slippage (Grizzly Man's rhythm-monotony; Ticket to Europe's scale-pressure). For reference purposes: **decide the game's length before you decide anything else about it**. The six here all knew which kind of game they were.

### 8. What the six have in common that matters

- They all **believe their frame is real**. None winks at the reader.
- They all **refuse something specific**, visibly.
- They all treat **choice as voice**, not as topology.
- They all compress **time** more than they admit.
- They all trust the reader to **fill in what's not rendered**.

That last one is the quiet thread. Each work is, in different proportions, a **negative-space-heavy** artifact that **makes the reader responsible for completing the world**. The best interactive-fiction craft lives in what is not written. This isn't a blackglass observation — it's a claim about the form itself — but it is the single observation most likely to survive into the synthesis phase when we turn the lens on our own project.

## What to look at, if you are about to write

- **Sir Brante** for ellipsis-grammar and ceremonial register
- **Omen Exitio** for unreliable-diary choice-as-narration
- **Grotto** for thesis-unity between mechanic and prose
- **Grizzly Man** for sentence fingerprint and genre-belief
- **Ticket to Europe** for voice-shaping choice and civic craft
- **Tails Noir Prologue** for how short atmosphere can carry a frame
