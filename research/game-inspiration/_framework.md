# Framework for Analysing Interactive Fiction as Reference Material

This document governs the **isolated analysis phase** of the game-inspiration effort. Each work gets read on its own terms — no blackglass bias — so that the later synthesis is grounded in what the games are, not what we hope to borrow from them.

## Analytical stance

Three refusals:

1. **The corpus is not the game.** What we extracted is engine-shaped text. Pacing, sound, UI, performance, mood are invisible to us. Claims about *written craft* rest on the corpus. Claims about *play experience* borrow from craft memory (flagged) or stay silent.
2. **Quant and qual are the same question.** Every qualitative claim should have a measurable shadow. *"Compresses time"* → years per 1000 words. *"Branches hard"* → node-to-edge ratio.
3. **Isolation first.** Do not optimise readings toward blackglass's needs. A frame that leaks toward the synthesis will overfit the synthesis.

## The seven lenses (plus one)

Three prongs — material, craft, interactivity — then a closing meta-move.

### Provenance

- **`P1 Origins`** — Who, where, when, under what mandate. How many hands. Translation status. Visible production constraints in the artifact.
- **`P2 Artifact`** — The measurable shape: token count, scene / node count, choice count, vocabulary diversity (type-token ratio), average scene length, named-entity load.

### Literary craft

- **`L1 Voice`** — POV, tense, narrator type (authorial / diegetic / unreliable), register range, distance from protagonist.
- **`L2 Texture`** — Prose rhythm, diction, specificity vs. abstraction, sentence-length fingerprint, *what the writer refuses to say*.
- **`L3 Time`** — How scenes open and close, what's elided, the work's attitude toward duration.

### Interactivity

- **`I1 Choice`** — What a choice is *made of* (action / tone / framing / thought) and what it costs.
- **`I2 Consequence`** — What the system remembers, over what horizon (immediate / delayed / ending-gated), visible or hidden.

### Closing move

- **`F Frame & Payload`** — How the work positions itself to the reader (journal, report, transcript, oracle, pulp, game-as-game) and, stated or not, what transformation it hopes to cause in the reader.

## Output shape

Per game (`<game>/analysis.md`):

```
# <Game> — Analysis
> At a glance: 2-3 sentence orienting summary

## P1 — Origins            ~100 words
## P2 — Artifact           fact sheet table + ~80 words
## L1 — Voice              ~100 words
## L2 — Texture            ~120 words
## L3 — Time               ~100 words
## I1 — Choice             ~100 words
## I2 — Consequence        ~100 words
## F — Frame & Payload     ~120 words
## Coda                    1 paragraph — what the work knows about itself
```

Per game (`<game>/analysis.md`): also a **fact sheet** embedded in the P2 section — tokens, scenes, TTR, avg scene length, choice-per-scene, named-entity load, branching factor where recoverable.

Cross-game (`_matrix.md`): a single grid, rows are works × columns are lenses, each cell one pithy line. The matrix is the payoff — six works made legible at a glance.

## Honesty rules

- **Flag craft-memory claims** with `[craft-memory]` when a point draws on knowledge outside the extracted corpus.
- **Flag extraction artifacts** when noise in our extraction (UTF-16 truncation, strings dumps, typetree failures) could mislead — e.g. *"Grizzly Man reads choppy in our dump; not the game's fault."*
- **Refuse false comparability.** Tails Noir's strings-dump corpus is not directly comparable to Ticket to Europe's clean Yarn. Name the asymmetry.

## Writing stance

The voice is opinionated, craft-focused, comfortable making value claims. Not academic, not reverent. Reads interactive fiction the way a boxing coach watches footwork — with respect, impatience, and an eye for tells.
