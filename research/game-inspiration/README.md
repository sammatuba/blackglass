# Game Inspiration

Distilled notes on interactive fiction and choose-your-own-adventure games that inform our own narrative design. Reference material — not the work itself.

## Why this lives in `research/`

Game inspiration is scholarly groundwork: analyzing existing narrative mechanics, branching structures, and UI patterns. It feeds into `craft/` decisions the same way framework analyses do. Per CLAUDE.md, this is *input foundation*, not a new production layer.

## Structure

Each game gets its own folder:

```
<game-slug>/
├── README.md       Game metadata, extraction approach, status
├── essence.md      Distilled insights — the durable output
└── extraction/     Raw text pulled from the game files
    ├── extract.*       How we got the text out
    └── output/         Raw dumps (gitignored — often copyrighted)
```

**What ships to git:** the extraction method, our notes, our distillation.
**What doesn't:** raw copyrighted text dumps (gitignored by default).

## Workflow per game

1. **Find the text.** Identify the engine and where narrative lives (loose files, Unity bundles, Ren'Py archives, Twine HTML, etc.). Each game is different.
2. **Extract only what we need.** Text and story — no images, audio, or binaries.
3. **Read, don't scrape.** The extracted dump is working material. The goal is `essence.md`: what is this game doing that's worth learning from?
4. **Distill in isolation.** One game at a time. Cross-game synthesis happens later, when we have a few to compare.

## What to capture in `essence.md`

Not a review. Not a summary of the plot. The questions we're actually asking:

- **Structure** — How are choices organized? Branching, hubs, stats-gated, time-gated?
- **Pacing** — How long between choices? What does a scene look like?
- **Voice and POV** — First, second, third? Named protagonist or silent? Rashomon? Diegetic framing?
- **Choice texture** — Are choices actions, internal thoughts, dialogue? What do they cost?
- **Consequence** — Delayed, immediate, visible, hidden? How does the game remember?
- **Teaching vs. storytelling** — If the game is making a point, how is the point embedded in the mechanic vs. the prose?
- **What we'd steal** — One or two concrete mechanics or techniques worth adapting.

## Analysis outputs

Each game folder contains a per-game `analysis.md` (Phase 2, isolated reading by the seven-lens framework) alongside the extraction artifacts. Cross-cutting documents:

- **[`_works.md`](_works.md)** — self-sufficient material + content + narrative summary of each of the six games. Start here if you want to know *what the games are* before engaging craft claims about them.
- **[`_framework.md`](_framework.md)** — the seven-lens analytical stance (Phase 1).
- **[`_matrix.md`](_matrix.md)** — at-a-glance comparative grid across all six works + cross-readings.
- **[`_synthesis.md`](_synthesis.md)** — Phase 3 re-reading through the work's specific needs.
- **[`_metrics/out/facts.md`](_metrics/out/facts.md)** — corpus statistics (tokens, scenes, TTR, choice density, named entities).
- **[`../../craft/design/guidelines.md`](../../craft/design/guidelines.md)** — the living craft guidelines distilled from the synthesis.

## Games covered

- [The Life and Suffering of Sir Brante](sir-brante/) — Unity Mono, I2 Localization bundles
- [Omen Exitio: Plague](omen-exitio/) — Unity IL2CPP, UTF-16 XML text assets
- [Grotto](grotto/) — Unity Mono, custom `ScriptableEvent` / `ScriptableVisit` narrative
- [Grizzly Man](grizzly-man/) — Unity Mono, Naninovel VN scripts
- [Ticket to Europe](ticket-to-europe/) — Godot 3.2.3, PCK archive
- [Tails Noir Prologue](tails-noir-prologue/) — Unreal Engine 4, PAK archive (formerly *Backbone Prologue*)
