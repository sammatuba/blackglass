# Game Inventory — Blackglass Suite

Status: `shipped` (playable, maintained) · `legacy` (playable, frozen) · `port-planned` (legacy, slated for the new engine) · `building` (in active development) · `idea` (concept only).

The canonical machine-readable registry for game cards lives at `src/app/registry.ts`; Glassbox explorables are catalogued in `src/games/glassbox/catalog.ts`. Update both this file and the matching registry when a game's status changes.

## Shipped & building

| Game | Pillar | Path | What it trains | Tech | Status |
|---|---|---|---|---|---|
| **BLACKGLASS — the phone anthology** | PLAY | `src/games/blackglass/` | The full-game flagship: the four vectors on glassOS — clickbait, voice cloning, deepfake endorsement, algorithmic capture — 10 phones with continuity, a discovery record, and THE CONVERGENCE finale. Rashomon structure: each phone is a different way of being fooled. | Platform (React + Vite + TS) on the shared engine; diegetic-artifact pipeline; Veo video pilot | `shipped` |
| **BLACKGLASS — Four Ways to Be Fooled** (legacy vanilla cut) | PLAY | `play/blackglass-phones/` | The original first-playable — same four vectors, vanilla beat engine, kept playable as the reference cut. | Vanilla JS, data-driven beat engine, Gemini diegetic-artifact pipeline | `legacy` |
| **BLACKGLASS — Maya's Story** | PLAY | `play/blackglass/` | Single-POV interactive fiction: one scam-heavy day, 12 scenes / 3 acts (~15K words). Superseded by the anthology but kept as the long-form read. | Vanilla JS, mini-Ink engine | `legacy` |
| **Scam Radar** | TRAIN | `src/games/scam-radar/` | Scam-readiness skills: judge the feed (Scam / Legit / Verify first — 31 items, 6 red-flag families), then work 3 narrative case files (voice-clone, deepfake investment, courier scam) with artifact inspection, response choices, and consequence debriefs. | Platform (React + Vite + TS), shared phone/beat engine | `shipped` |
| **Tell Exam** | TRAIN | `src/games/tell-exam/` | The objective pedagogy measure (E6, `docs/game-design-eval.md`): the anthology's synthetic artifacts one at a time — tap where the planted tell is, reveal, scored against the manifest's tell coordinates; best local-only. Exam data auto-generated from the artifact manifest. | Platform (React + Vite + TS); exam-data from `scripts/sync-artifacts.mjs` | `shipped` |
| **One in a Thousand** (Glassbox 01) | LEARN — Glassbox | `src/games/glassbox/` | The scam economy as a tinkerable ledger, told as a four-scene scroll narrative with pinned paper stages: reach, cost per attempt, reply rate, average payment, then the verification lever. Discovers why AI-scale deception works even when most people refuse, and computes break-even adoption (~98% for the AI line vs ~14% for a human crew). Anchored to the voice-clone call. | Platform (React + Vite + TS); paper register; native scroll-driven CSS; passive scroll + rAF; pure model + unit tests | `shipped` |
| **Human-in-the-Loop** (v1.3) | LEARN — shelf | `play/human-in-the-loop/` | Automation bias, trust calibration: accept or override AI recommendations; classroom mode. | Vanilla JS + scenarios.json | `legacy` |
| **Bias Bounty** (v1.1) | LEARN — shelf | `play/bias-bounty-lite/` | Matching AI harms to bias patterns: biased data, flawed metrics, proxy discrimination. | Vanilla JS | `legacy` |
| **Hallucination Hunt** | LEARN — shelf | `play/hallucination-hunt/` | Verification skills: fact-check AI claims with tool cards; stamp VERIFIED / HALLUCINATED / UNVERIFIABLE. | Vanilla JS + claims_data.js | `legacy` |
| **Risk Assessment Protocol** (v1.1) | LEARN — shelf | `play/risk-assessment-protocol/` | Governing AI risk: NIST AI RMF (MAP/MEASURE/MANAGE/GOVERN), EU AI Act tiers. | Vanilla JS | `legacy` |

## Glassbox (LEARN pillar)

Short, self-contained explorables where the reader takes a mechanism from the fiction apart. One visible model, 3–4 controls, a designed reveal, and a lever that changes the reader's model of the problem — no score, no fail state. Format rules, guardrails, and the first piece's design record live in [`docs/GLASSBOX.md`](GLASSBOX.md).

- **01 · One in a Thousand** — the scam economy behind the voice-clone call, delivered as scrollytelling: four pinned paper stages (ledger, sample, machine, defense) advance with the reader's scroll and stay live under their thumb. The reader runs a day at the syndicate, then discovers the last mile: verification adoption, not individual skepticism, is what changes the business. Verified by `scripts/glassbox-smoke.mjs` and `src/games/glassbox/model.test.ts`.

## Shared infrastructure

- `play/shared/card-base.css` + `game-utils.js` — the literacy games' card design system (used by the four legacy LEARN games only).
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
