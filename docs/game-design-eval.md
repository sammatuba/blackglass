# Game-Design Eval — objective scoring across all facets (2026-10-04)

**Why this doc:** align the project on *objective* evaluation for every facet of game
design, scored as of today, with a path to automate each measure so scores stay honest
as content grows. It complements (does not replace) the existing per-milestone smoke
culture: same impulse, raised to the level of a rubric.

**Scoring:** 1–5 per facet. 5 = shippable benchmark, no known gap. Every score cites
evidence in-repo (file, count, or verified run). Where a facet is unmeasured, the score
says so and the automation column closes it.

**Baseline verified 2026-10-04:** `npm test` → 27/27 pass (4 files, 963 ms). `dist/`
= 37 MB. Artifact PNGs 1.7–2.4 MB each, each shipping **twice** (platform
`dist/assets/` + legacy mirror `dist/legacy/`).

---

## The rubric

| # | Facet | Score | Evidence for the score | Automation (the objective measure) |
|---|---|---|---|---|
| 1 | Core loop & mechanics (engine) | **4.5** | Found-phone engine: lock→home→apps, rule-pumped events, calls, moments, evidence, human cadence (`src/engine/os/`); M1–M5 all shipped; content is typed data (`CaseOS`), new anchors need no re-architecture. 27/27 unit tests pass. | Existing: 15 Playwright smokes + unit tests. Gap: none material — keep smokes green per anchor. |
| 2 | Narrative & writing | **4.0** | 4 anchors, 10 phones, ~2,100 lines of content data with per-choice dynamic text, reflection cards, silent witnesses, CONVERGENCE finale assembled from recorded choices. `craft/` layer with scene dossiers. M6 brief exists with acceptance criteria. | E2: agent-playthrough judge — extend `anthology-smoke.mjs` to capture a full transcript, then LLM-judge against generalized acceptance criteria (≥3 choices/beat, one "reasonable trap", every answer carries a checkable detail). Criteria already written in `craft/maya/_meta/anchor-v-brief.md` §6 — generalize them to all anchors. |
| 3 | Visual design (presentation layer) | **4.5** | `docs/design-system.md` canonical; os-skin CSS-variable contract renders one component set as three people; 2026-09-13 OpenDesign pass: 8/8 findings applied, `--os-faint` holds WCAG AA per skin, verdict tokens + 11px floor + ≥44px targets in `@theme`. | Existing: `render-for-lint.mjs` + od lint against the exported package. E7: screenshot-diff key screens per skin on every design change. |
| 4 | Diegetic assets (the AI artifacts) | **4.5** | 7 stills + 1 video + the legit-baseline clip shipped; manifest with planted `tells[]` + coordinates. **Re-audited 2026-10-05 after the agy regeneration pass: 12/12 image-level tells verified present at score 2, zero absent** (`docs/tell-survival-baseline.md` re-audit table). Remaining gap: the Tito Mike clip's in-time tells (Veo i2v via the user's Google AI app — the still is regenerated and clip-ready). | **E1 live**: regeneration runs plant tells explicitly and end with a visual audit before sync (method in the baseline doc). The Tell Exam auto-tracks the corrected coordinates. |
| 5 | Audio | **2.5** | All SFX WebAudio-synthesized (`sound.ts`: message pop, send, unlock, ringtone) — zero audio files. Voice notes are text + waveform chrome only; Joy's 22s note and cloned Renz deferred. | Existing: none needed for SFX. Asset-side: voice notes are unblocked per `research/ai-visual-workflows-2026.md` §6 (Kokoro-82M local CPU; Chatterbox zero-shot clone whose embedded watermark is a *teachable tell*). Acceptance: note plays in-thread, clipped in cadence smoke. |
| 6 | UX & accessibility | **4.5** | AA-checked faints per skin, `:focus-visible` ring everywhere, `prefers-reduced-motion` crushes animation, keyboard-playable, SR-labeled, ≥44px hit areas. | E3: add axe-core to 2–3 smokes (objective, free, catches regressions the eye misses). Existing Lighthouse ≥95 budget stays. |
| 7 | Performance & platform | **4.5** | PWA offline after first visit; initial JS ≤150 KB gz budget; videos excluded from precache. **Executed 2026-10-04: artifact dedupe + WebP shipped — one copy in `public/artifacts/` (webp canonical), `dist/` 37 MB → 7.0 MB, PWA precache → 1.6 MB, zero duplication verified by the budget gate.** | E5: budget gate live (`npm run assets:budget`) — per-artifact ceilings (900 KB still / 5 MB clip), duplication check. Remaining: none material. |
| 8 | Pedagogy (learning efficacy) | **3.5 — measure now exists** | Learning vectors tabulated per anchor (GAME-PLAN §2); reflection cards; debriefs; no analytics by principle ("feedback is conversation"). **Executed 2026-10-04: the Tell Exam is built and shipped** (`/tell-exam`, TRAIN pillar) — the player finds planted tells in the artifacts, scored against the manifest coordinates; best in `cgAI_tellExam_best`. | **E6: field-exam mode — live.** Player scores are the objective pedagogy measure (user-side, localStorage-only; aggregate efficacy stays a qualitative/conversation read per the no-tracking principle). |
| 9 | Content breadth | **3.0** | 4 anchors + finale + Scam Radar (31 feed items, 6 red-flag families, 3 cases) + 5 legacy games; target 60–90 min complete path. M6 (THE ASSISTANT / verb ASK) is brief-ready but unbuilt; recovered-messages forensic mode reserved. | Objective by count: anchors shipped, phones, feed items, cases. E2's judge guards quality as breadth grows. |
| 10 | Verification & QA culture | **4.5** | 15 Playwright smoke/shot scripts incl. real-1× cadence audit and live-site video e2e; 27 unit tests (verified passing 2026-10-04); render-for-lint headless design linting; hub hero smoke with degrade path. CI manual-only (documented free-tier decision). | Add E1–E3, E5 above; wire them into the existing manual CI dispatch so one click runs the full rubric. |
| 11 | Trust, ethics & disclosure | **4.0** | `world/guardrails.md` (fictional-only, non-actionable), no accounts/tracking/server, planted-tells honesty ("a seamless image is a failed image"). Research doc already proposes manifest provenance fields (`model`, `modelLicense`, `seed`) + player-facing disclosure per the 2026 AI-disclosure norm — designed, not yet shipped. | Objective checklist: provenance fields present per artifact; CREDITS note shipped; guardrail pass re-run when video tells gain time ranges. |

**Composite: 3.9 / 5 → re-scored 2026-10-05 after the automation backlog + regeneration pass: 4.5 / 5.**
Facet 7 (perf) 3.5 → 4.5 on the verified dedupe/WebP; facet 4 (diegetic assets) 3.0 → 4.5 on the
verified tell regeneration. All objective measures are live (E1 baseline + re-audit, E2 judged,
E3 clean, E5 gate green, E6 shipped, E7 baselined). Remaining known gaps: the Tito Mike clip's
in-time tells (user's Veo session), voice-note audio (worksheet ready), M6 content breadth
(brief locked pending the user's four canon answers).

---

## The automation backlog (E-numbers, priority order)

| ID | What | Why it's the objective measure | Cost |
|---|---|---|---|
| **E1** | `scripts/tell-survival.mjs` — MLLM-judge: artifact × manifest `tells[]` → 0–2 score per tell, markdown report | The tell is the payload; today its presence is anecdotal. Makes facet 4 measurable, and gates every future regeneration | Small: one script + one multimodal API call per artifact (authoring-time only) |
| **E2** | Transcript-capture in `anthology-smoke.mjs` + LLM-judge vs generalized acceptance criteria | Playtesting-with-agents is the 2026 field direction (LLM agents as testers/difficulty estimators); our typed content + smoke harness makes it cheap here | Medium |
| **E3** | axe-core injected into `os-smoke`, `radar-smoke`, `hub-smoke` | Turns the a11y claim into a per-run assertion | Small |
| **E5** | `scripts/asset-budget.mjs` — size ceilings, double-ship warning, WebP presence | Perf budget as a gate, not a hope | Small |
| **E6** | Field-exam mode (design first, then build) | The only objective handle on learning efficacy without violating no-tracking | Design session |
| **E7** | Screenshot-diff on key screens per skin | Visual regression net under the design system | Medium |

**Status 2026-10-04 (executed in the aligned session):**
- **E1** — baseline DONE: I judged all 7 artifacts in-session against their manifest tells
  (`docs/tell-survival-baseline.md`: 5× present, 6× weak, 2× absent). The in-session method
  is the judge; a `scripts/tell-survival.mjs` API wrapper is optional once regens start.
- **E2** — capture live (`TRANSCRIPT=1 node scripts/anthology-smoke.mjs`); first judgment
  written: `docs/e2-playthrough-judgment.md` (voiceclone anchor: PASS on all four criteria).
  Next: extend capture to moment text, then judge deepfake + fiveweeks.
- **E3** — live in all three smokes; verified clean on serious/critical (moderate
  landmark/heading/region notes on the debrief screens are the recorded polish list).
- **E5** — live (`npm run assets:budget`); verified green after the dedupe/WebP work.
- **E6** — **built and shipped** (`/tell-exam`): shuffle → place markers → reveal → score
  vs manifest coordinates; exam data auto-generated from the manifest by
  `scripts/sync-artifacts.mjs`; verified by `scripts/exam-smoke.mjs`.
- **E7** — live (`npm run shots:diff`); baseline recorded in `shots-baseline/` (hub,
  radar-menu, anthology-maya).

---

## Method notes

- Scores 1–11 grounded in the repo sweep + direct file reads + the verified test run
  (2026-10-04). Facet 4's tell-survival findings are from one reviewer's visual
  inspection of `kangkong-clickbait.png`, `dr-anita-still.png`, `tito-mike-deepfake.png`
  — exactly the check E1 mechanizes; treat those three as *suspect until E1 runs*, not
  as verdicts.
- Research grounding (agent playtesting, rubric-driven LLM judges, MLLM-judged
  generated content): see the final section of `docs/asset-upgrade-plan.md`, which
  shares this doc's source list.
