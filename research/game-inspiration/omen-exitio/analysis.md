# Omen Exitio: Plague — Analysis

> **At a glance:** A Lovecraftian CYOA in the clothes of a naval officer's diary. 1896. The player is Erik Lang, cartographer, summoned to Zanzibar under opaque orders; the story unfolds through his journal, with skill checks and branching choices folding into a steady, contained paranoia. Smaller in scope than it pretends — which turns out to be a formal virtue.

## P1 — Origins

Mixtvision (German publisher) / **Brigada Studios** (Italian developer, Rome), 2018. Unity 2020 IL2CPP — a later-engine build, judging by the typetree opacity. Ships EN / IT / RU / ZH. The key fact of provenance: **this is an adaptation of a printed Choose-Your-Own-Adventure gamebook** (Italian, 2016), which explains the terse journal structure, the stat-gated skill checks, and the contained scene count. The game is translating a tabletop idiom into real-time. [craft-memory, partially verifiable from the Bis-variant structure in `Titles_en.json`]. Small team, small scope. The production constraints are *honest*: this is a contained work, not an epic.

## P2 — Artifact

- **98 titled scenes** (`D1_1` through `P1_9d` in `Titles_en.json`); 6 are explicit `_Bis` branch variants
- **~11,300 tokens of readable narrative** (journal entries only — the branching CYOA scene prose lives in MonoBehaviours our IL2CPP extraction couldn't read, so claims about the *interactive* text are thinner)
- **TTR 0.19 / mean sentence length 14.1** — narrow deliberate register
- **Top entities:** *James, Lloyd, Zanzibar, London, Elyan, Fuego, Smith, British, Germans, Eric, Meyer, Thomas, Sa'id* — the dramatis personae are tight
- ~6 % of scene slots are `Bis`-variants — low-branching game with a handful of pivot moments

The artifact shape: **one voice, one journal, bifurcating selectively**. The Bis-variants are not plot pivots — they are the same scene *told differently* depending on how Erik behaved.

## L1 — Voice

First person, present-tense and occasional simple past. *Erik's diary.* Period-pastiche 1890s, but permeable: *"I'm getting sick of dancing,"* *"the king of fools himself"* — contractions, British-Army slang, a modern ear slipping through the period mask. The narrator is **unreliable by being editorial**: Erik judges everyone, revises his own judgments, and the game uses that revision as a core move. Distance from protagonist: zero.

## L2 — Texture

Short paragraphs, diary fragments, datelines as headers (`26 July 1896, Travelling`). Sentence mean around 14 tokens but with wide variance — Erik produces clipped observations (*"I can't stand this place."*) and long looping resentments (*"I hate it when they do this, how do they suppose I am to develop a strategy if their strategy is to keep me in the dark about all the important details?"*). Concrete sensory detail is **thin**: Zanzibar is *"claustrophobic,"* the market has *"stalls"*; world-building is gestural, not immersive. What Erik **refuses to write**: anything that makes him look foolish. When he fails, he blames conditions. This is deliberate — the gap between journal and reality is where Lovecraftian dread lives.

## L3 — Time

**Diary time.** Dated entries impose a pulse. Scenes are short; entries arrive *after* events. The elision is **between the entry and the event** — we read Erik's post-hoc reconstruction, never his in-moment experience. Formally excellent for the genre: it puts cognitive distance between reader and horror, which is exactly how real diaries work when the writer is frightened. Duration flexes — a day of uneventful travel compresses to one paragraph; a combat moment expands to four hundred words.

## I1 — Choice

Two textures. **Pre-commit:** skill-check choices (*use charm, use cartography*) gated by stats, presented before a scene plays. **Post-commit:** moral/register choices — cruel or kind, bold or cautious, credulous or skeptical. The `Bis`-variants suggest several scenes differ not by *plot outcome* but by **which version Erik writes of them**. A sophisticated move: the player isn't choosing what happens, they're choosing how it's narrated.

## I2 — Consequence

Stats (Body / Mind / Spirit / skill scores) and relationship tokens (with James, Lloyd, others). Visible via skill-threshold gates, invisible via later branch availability. The consequence horizon is medium — a chapter later, typically. Erik's reputation with Lloyd pivots in scene 2 and colors everything downstream. The game doesn't feel *heavy* with consequence the way Sir Brante does; it feels **mood-responsive** — the same plot, told in a different key.

## F — Frame & Payload

Frame: **the journal as unreliable document.** The work openly asks the reader to read *between* what Erik writes and what happened. Payload: *the frightened mind revises its own record.* That is the Lovecraft engine — cosmic horror depends on a narrator struggling to make sense of what should not cohere — and Omen Exitio places the frame exactly where the genre asks for it. Stated transformation: *learn to distrust the narrator you are.*

## Coda — What the work knows about itself

It knows it is a **document pretending to be a game**. It gets the diary-as-interface right: every choice is a re-writing, every stat is a self-image. Where it is thin: the world outside Erik (Zanzibar, the supernatural threat, the colonized peoples Erik condescends to) is rendered in period-colonial gestures without specificity. Partly a material constraint (adaptation of a print gamebook, small team, tabletop register), partly a voice-trap — Erik's entitled gaze literally cannot see past itself, so neither do we. Whether that is craft or limitation is the reader's call. I lean *craft* on the frame, with reservations about the optics.
