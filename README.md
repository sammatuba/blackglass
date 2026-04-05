# AI Literacy & Safety

Teaching people to see clearly in a world shaped by AI.

## Two Projects, One Mission

**Interactive Fiction** (primary) — A narrative game about navigating AI-powered deception, set in the Philippines. Players inhabit a simulated phone and experience disinformation, scams, and manipulation the way real people do: through notifications, group chats, and social media. Built with the Ink narrative engine. Currently in development (Maya persona, Act 1).

**Teaching Tools** (supplementary) — Standalone, gamified tools for AI literacy and safety concepts. Card-based mechanics make abstract ideas tangible. Independent from the fiction — a companion reader, not an interruption.

## Structure

```
research/    what we know (frameworks, pedagogy, analysis)
world/       what we imagine (creative guardrails, ethical boundaries)
craft/       what we write and design (scripts, drafts, game design, evaluation)
play/        what people touch (4 playable teaching tools + shared design system)
archive/     what came before (historical docs, superseded designs)
```

## Teaching Tools

Open any game's `index.html` in a browser. No dependencies, no build step.

- **Human-in-the-Loop** (v1.3) — When should humans override AI decisions?
- **Bias Bounty Lite** (v1.1) — Find hidden unfairness in AI systems
- **Hallucination Hunt** — Detect fabricated facts in AI output
- **Risk Assessment Protocol** (v1.1) — Map, measure, manage AI risks (NIST RMF)

Framework alignment: UNESCO AI Competency Framework, OECD AI Principles, NIST AI RMF, EU AI Act, Council of Europe.

## Tech

Vanilla HTML/CSS/JS. Zero dependencies. Offline-first. Works via `file://`.
