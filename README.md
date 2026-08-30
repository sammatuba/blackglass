# Blackglass — Seeing Clearly in a World Shaped by AI

A suite of gamified, web-native learning experiences about AI safety, scam-readiness, and cyber-security — for the general public, culturally grounded in the Philippines, playable everywhere.

## Three Pillars, One Mission

Knowledge alone doesn't survive contact with a confident voice on the phone. Experience alone doesn't generalize. Concepts alone don't feel like anything. The pillars compound:

**PLAY — Story.** *BLACKGLASS*, the phone-anthology: Rashomon-structured interactive fiction where you live AI-powered deception from inside different family members' phones — and each phone is itself a different way of being fooled. Four anchors: clickbait in the family group chat, a voice-cloned distress call, a deepfake celebrity endorsement, and five weeks inside an algorithmic feed.

**TRAIN — Skills.** *Scam Radar*, the scam-readiness trainer: judge a live feed of messages (Scam / Legit / Verify first), then investigate narrative case files — inspect artifacts, gather clues, choose responses, live the consequences. Builds the reflexes: pause, verify through official channels, hang up, report, protect your family.

**LEARN — Concepts.** Gamified teaching tools for AI-literacy frameworks:

- **Human-in-the-Loop** (v1.3) — when should humans override AI decisions?
- **Bias Bounty** (v1.1) — find hidden unfairness in AI systems
- **Hallucination Hunt** — detect fabricated facts in AI output
- **Risk Assessment Protocol** (v1.1) — map, measure, manage AI risks (NIST RMF)

Framework alignment: UNESCO AI Competency Framework, OECD AI Principles, NIST AI RMF, EU AI Act, Council of Europe.

## Structure

```
research/    what we know (frameworks, pedagogy, analysis)
world/       what we imagine (creative guardrails, ethical boundaries)
craft/       what we write and design (scene dossiers, drafts, handoffs)
play/        legacy vanilla apps (the anthology, Maya's Story, 4 literacy games)
src/         the platform (hub, shared engine, new games)
docs/        vision, game inventory, asset sources
archive/     what came before
```

## Running

**Legacy apps** (`play/*`): open any `index.html` in a browser. Zero dependencies, works via `file://`.

**Platform** (`src/`):

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
```

The built site is a PWA (offline after first visit) and deploys to GitHub Pages via Actions. Legacy apps ship verbatim into `dist/legacy/` and are embedded from the hub.

## Docs

- [`docs/VISION.md`](docs/VISION.md) — the three-pillar vision and principles
- [`docs/GAMES.md`](docs/GAMES.md) — the full game inventory and idea backlog
- [`docs/ASSETS.md`](docs/ASSETS.md) — asset sources and rules (Kitbitz CC0 catalog, Gemini diegetic pipeline)
- [`CLAUDE.md`](CLAUDE.md) — working conventions for agents and collaborators
- [`world/guardrails.md`](world/guardrails.md) — ethical boundaries: depict deception, never enable it

## Tech

Platform: Vite + React + TypeScript + Tailwind v4, PWA, optional lazy-loaded Three.js. Legacy apps: vanilla HTML/CSS/JS, frozen. Shared state convention: `cgAI_` localStorage prefix. No accounts, no tracking — progress stays in your browser.
