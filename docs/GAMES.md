# Game Inventory — Blackglass Suite

Status: `shipped` (playable, maintained) · `legacy` (playable, frozen) · `port-planned` (legacy, slated for the new engine) · `building` (in active development) · `idea` (concept only).

The canonical machine-readable registry lives at `src/app/registry.ts` — update both this file and the registry when a game's status changes.

## Shipped & building

| Game | Pillar | Path | What it trains | Tech | Status |
|---|---|---|---|---|---|
| **BLACKGLASS — Four Ways to Be Fooled** (phone-anthology) | PLAY | `play/blackglass-phones/` | Felt experience of AI deception: clickbait, voice cloning, deepfake endorsement, algorithmic capture. Rashomon structure — each phone is a different way of being fooled. | Vanilla JS, data-driven beat engine, Gemini diegetic-artifact pipeline | `legacy` → `port-planned` (flagship, 4 anchors) |
| **BLACKGLASS — Maya's Story** | PLAY | `play/blackglass/` | Single-POV interactive fiction: one scam-heavy day, 12 scenes / 3 acts (~15K words). Superseded by the anthology but kept as the long-form read. | Vanilla JS, mini-Ink engine | `legacy` |
| **Scam Radar** | TRAIN | `src/games/scam-radar/` | Scam-readiness skills: judge the feed (Scam / Legit / Verify first — 31 items, 6 red-flag families), then work 3 narrative case files (voice-clone, deepfake investment, courier scam) with artifact inspection, response choices, and consequence debriefs. | Platform (React + Vite + TS), shared phone/beat engine | `shipped` |
| **Human-in-the-Loop** (v1.3) | LEARN | `play/human-in-the-loop/` | Automation bias, trust calibration: accept or override AI recommendations; classroom mode. | Vanilla JS + scenarios.json | `legacy` |
| **Bias Bounty** (v1.1) | LEARN | `play/bias-bounty-lite/` | Matching AI harms to bias patterns: biased data, flawed metrics, proxy discrimination. | Vanilla JS | `legacy` |
| **Hallucination Hunt** | LEARN | `play/hallucination-hunt/` | Verification skills: fact-check AI claims with tool cards; stamp VERIFIED / HALLUCINATED / UNVERIFIABLE. | Vanilla JS + claims_data.js | `legacy` |
| **Risk Assessment Protocol** (v1.1) | LEARN | `play/risk-assessment-protocol/` | Governing AI risk: NIST AI RMF (MAP/MEASURE/MANAGE/GOVERN), EU AI Act tiers. | Vanilla JS | `legacy` |

## Shared infrastructure

- `play/shared/card-base.css` + `game-utils.js` — the literacy games' card design system (used by the four LEARN games only).
- `play/blackglass-phones/gen-images.mjs` + `assets/manifest.json` — authoring-time pipeline that generates *diegetic* artifacts (the AI images characters are fooled by) via Gemini, each with planted `tells[]` that power the "Look again" examine layer. Runtime is fully offline with CSS fallbacks; commit the generated PNGs.
- `src/engine/` (new) — the generalized phone/beat engine extracted from the anthology; Scam Radar's Case Files run on it, and the anthology ports onto it in Phase 4.

## Idea backlog (from `research/card-game-brainstorming.md`)

Evaluated but unbuilt concepts, kept visible as roadmap seeds:

- **TRAINING DAY** — deck-builder about preparing people (not systems) for AI encounters.
- **THE BLACK BOX** — simulation of a model's inner life; peek inside without illusions.
- **DEEPFAKE DETECTIVE** — social deduction: who at the table is synthetic?
- **DECISION BOUNDARY** — tile-laying where every placement encodes a policy choice.
- **ACCOUNTABILITY CHAIN** — trace a harm backwards through its human decisions.
- **ALGORITHMIC SOCIETY** — society-scale simulation of recommender feedback loops.
- **THE OVERSIGHT COMMITTEE** — negotiation game about auditing under uncertainty.
- **AI LITERACY QUEST** — narrative campaign stitching all the literacy skills together.
- **PROMPT WARS** — adversarial prompt-crafting duel.
- **SYNTHETIC TRUST** — relationship-building game where one participant may be AI.

Mechanic innovations worth carrying into any port: probabilistic dice+cards, transparent overlay cards, journal-legacy, ARG real-world integration.

## Curation rules

- One pillar per game; games state their pillar on the hub card.
- `legacy` apps ship verbatim from `play/` into `dist/legacy/` at build time and are embedded via iframe — no edits except copy fixes; port or retire, don't drift.
- Every new game runs on the shared engine unless it has a reason not to; the reason goes in its design doc.
- Content obeys `world/guardrails.md`: depict deception, never produce working scam templates, fictional brands/numbers only.
