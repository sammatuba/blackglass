# Tails Noir Prologue — Analysis

> **At a glance:** An anthro-noir prologue in dieselpunk Vancouver, where a raccoon PI runs a missing-person case. What the *corpus* tells us about this work is limited — the UE4 pak is noisy — but craft-memory fills the gaps: a carefully art-directed, atmosphere-heavy interrogation vignette whose dialogue is short-beat and mood-loaded, and which knows precisely how long it can sustain its own technique.

## P1 — Origins

**EggNut** — Ukrainian-Canadian studio based in Vancouver. *Backbone Prologue* released 2018 as a free teaser for *Backbone* (2021, later rebranded *Tails Noir*). Unreal Engine 4 (pak v11, Zlib-compressed), full production pipeline. The prologue is polished, short (~1 hour), and atmospherically committed. Five-plus localizations present in the corpus (EN / DE / FR / ES / PT). [craft-memory]: the prologue was a sensation on release — gorgeous pixel art at 4K resolution, strong mood, confident tone — while the full game that followed in 2021 had a **famously uneven second half**. The prologue's self-contained form is its highest craft achievement, and is the artifact worth studying.

## P2 — Artifact

*With the caveat that our extraction is a post-decompression strings dump, not a scene-structured read. Metrics below reflect string runs, not scenes.*

- **27,010 zlib blobs** decompressed from the 438 MB pak
- **357,042 unique strings**, **188,490 prose-shaped lines** after filtering noise
- **Unusable for scene counts** — the strings dump loses all narrative topology
- Mean string-line length 17 tokens (short beats, but this is *lines*, not *scenes*)
- **Top entities** (after filtering engine noise and German-pronoun leakage): *Clarissa, Howard, Bloodworth, Minister, Leslie, Gina, Bajwa* — plus the species-politics vocabulary *Grands Singes* (Apes)
- Visible lexical fingerprints: hardboiled PI notebook syntax (*"!!! MENTIONED PROJECT ARTIFACT to Baby Gina. That's twice now. Must be working on this with minister."*), conspiracy-monologue fragments, species slurs, domestic dialogue across four languages

Honest shape: **we can see the writing is short-beat and character-heavy, but we cannot measure scene topology from this corpus.** All structural claims below rely heavily on craft-memory.

## L1 — Voice

From the extractable fragments: **classic hardboiled PI register**, first person, a past / present hybrid. Notebook-style abbreviated syntax: *"Secretive, enters through the back alley, only ever requests Leslie. Boss is a direct liaison. No one else allowed to speak to him."* Dialogue is quote-tagged; Howard's voice tends skeptical-dry: *"Yeah, I don't buy it."* A second register surfaces: scientific-research notes (*"Look into extant data on psychological trauma — link to neuropathy? Correlation? Thesis: psychosomatic impact on Artifact."*) suggesting **split-perspective sections** — likely diegetic documents the player finds. [craft-memory corroborates: the prologue alternates Howard's POV with fragments of external text.]

## L2 — Texture

Noir vernacular compressed to beats. *"Granville's filling up with them, and the force don't bat an eyelid."* *"Damn hawkers don't help any."* Subject-dropping, regional idiom, clipped. Dialogue often ends on a **tell** — a small physical detail or understatement that lands harder than exposition. German and French translations preserve this clipped register (*"Les Grands Singes sont les pires criminels de la ville, et ils tirent les ficelles"*), which suggests the **English original was authored with translation-friendly brevity in mind**. What the prose **refuses**: flowery description, interior monologue of more than a few lines, any feeling that does not fit inside the genre frame. The art direction does the mood work the prose declines to attempt.

## L3 — Time

Cannot be measured from the strings dump. [Craft-memory]: the prologue is **real-time investigation**, scene by scene, Howard moving through locations, speaking to characters, taking notes, returning to base. Hours pass, not days. Ellipsis between scenes is a transit beat. The prologue's compact runtime is matched by a compact story timeframe.

## I1 — Choice

Cannot be cleanly inventoried from the strings dump. [Craft-memory]: choices are **dialogue selects during interrogation** — how to press, when to bluff, which piece of evidence to reveal, whether to read the room or push through. The interactivity is dialogue-shaped, not action-shaped. The prologue's mechanic is close to a **single-scene conversation puzzle** repeated several times, each with different stakes.

## I2 — Consequence

Can see notebook entries that imply **persistent state**: *"!!! MENTIONED PROJECT ARTIFACT to Baby Gina. That's twice now. Must be working on this with minister."* The structure is an **accumulating-clue model**: the PI's notebook is the player's memory aid, and clue-connections unlock new options downstream. Horizon appears medium; the ending-shape of the prologue itself is **prologue-closed** — the immediate case resolves while setting up the full game's larger questions.

## F — Frame & Payload

Frame: **classic hardboiled case-file**, with **species politics overlaying the archetypes**. *Grands Singes* are the Apes who *tirent les ficelles* — they occupy the noir-syndicate role; Howard is a raccoon operating through networks that are overtly species-stratified. Payload: *genre archetypes remain load-bearing when you put different bodies inside them.* The work trusts the frame *seriously*, not as pastiche — it is noir first and anthropomorphic-species-politics second, which is why the species angle actually registers rather than reading as gimmick. What it wants the reader to feel: the familiar pleasure of the genre, and then the small jolt of noticing the species-politics sitting inside it.

## Coda — What the work knows about itself

The prologue knows that **atmosphere is a mechanic**. Art direction carries a huge share of the work; the writing intentionally stays clipped and mood-loaded so it can sit inside the visuals without fighting them. The known weakness — and the reason the 2021 full release had mixed reception — is that this model is **hard to scale past an hour**. The prologue is the right length for the technique; the full game had to invent additional mechanics to carry the same intensity for 8–10 hours, and some of those inventions don't land. For our purposes **the prologue, not the full game, is the reference object**. The extraction here is also the noisiest of the six; claims about craft in this analysis rest more on craft-memory than on corpus evidence — flagged.
