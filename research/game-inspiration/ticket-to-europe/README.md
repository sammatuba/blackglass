# Ticket to Europe

Polish Migration Museum / Nerd Cave Studio, 2021. Slow, choice-driven narrative about European migration — follow a single character across borders, weighing documents, money, and risk against the desire to reach somewhere survivable. Built as educational outreach, but takes itself seriously as fiction.

Relevance: **systemic consequence in a civic-ed context** — the player's "decisions" are about survival under bureaucracy and hostile systems, which is exactly the kind of designed-unfairness blackglass will need to render when depicting AI-amplified deception. Also: a museum-funded game proves the "teaching + narrative" compound can ship and land.

## Engine and assets

- **Godot 3.2.3**, single `TTE.pck` archive (~830 MB)
- PCK magic `GDPC`, pack format version 1
- Godot ships resources in text or binary form depending on build:
  - **Text resources** (`.tres`, `.tscn`, `.gd`, `.json`, `.txt`, `.csv`, `.po`) — readable directly
  - **Binary resources** (`.res`, `.scn`, `.gdc`) — compiled; need Godot-specific decoders for full recovery
- Text likely to include: `.po` / `.csv` translation files, `.json` dialogue tables, raw `.txt` scripts

## Extraction

See [`extraction/README.md`](extraction/README.md). Uses a small pure-Python PCK reader (no external tool).

## Status

- [x] Engine identified (Godot 3.2.3, PCK v1)
- [x] Extraction script (`extract.py`, pure-Python PCK reader)
- [x] Extraction run — 830 text files, 15 MB (gitignored)
- [ ] Output reviewed, [essence](essence.md) drafted

### What the extraction produced

Ticket to Europe ships its narrative as **Yarn Spinner** scripts — really good news, because Yarn is a clean, author-friendly DSL with explicit node structure and visible choice syntax. Perfect reference material.

- **101 English `.yarn` files** under `files/Data/Sequences/en/` — one per scene, e.g. `1304_IzaakHome.yarn`, `2601_InterviewWahid.yarn`, `3203_StartWriting.yarn`. Numeric prefix = chapter/scene order.
- 58 `.tscn` and 80 `.tres` — Godot scene and resource files (room layouts, styles, fonts)
- 68 `.remap`, 520 `.import` — build metadata (mostly skippable)
- Binary resources (`.scn`, `.res`, `.gdc`, images, audio) — skipped; would need Godot-specific decoders

Yarn syntax example from the output:
```
title: 1304_Watched
---
Someone's staring at me.
I recognize the waiter who served me at the table yesterday...

[[I'm going over there to pay my debt.|1304_PayBill]]
[[I head straight to Isaac's.|1304_GoToIzaak]]
===
```

Good starting points: `files/Data/Sequences/en/1301_*.yarn` (the Izaak arc) or any of the `*Interview*.yarn` files (interrogation-shaped scenes).
