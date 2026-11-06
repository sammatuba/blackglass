# BLACKGLASS — Overnight Immersion Build (intent + runbook)

*2026-11-07 · work id `immersion-pass-2` · status: READY, not started.*
*Framework reference: `docs/IMMERSION-FRAMEWORK.md` (P1–P10). This document is
the MEOS intent for an autonomous overnight run. It is written to be executed
without conversation context.*

## Decision record (user, 2026-11-07)

| Decision | Value |
|---|---|
| Scope | **Full** — immersion mechanics across the season + Anchor VI drafted as content-for-review |
| Git policy | Work on branch `immersion-pass-2`; **commit + push the branch only**. Never merge to main, never deploy |
| Launch | Manual — the user starts the run before bed |
| Review | Everything lands for morning review; draft anchor stays behind a flag until canon-approved |

## Outcome — what exists by morning

1. **Staged theming** (P4): phone chrome moves through `clean → uneasy →
   compromised` stages driven by story state, with per-anchor signature
   distortion at discovery moments.
2. **Silence beats** (P8) and **dwell pushes** (P5): new pacing/rule primitives
   used by at least one phone per shipped anchor.
3. **Ambient surfaces** (P1): Calendar + Wallet apps, original iconography,
   authored per-phone data for all 13 shipped phones (the wallet ledger doubles
   as the accusatory money trail, P2).
4. **Data-horror cross-references** (P2): gallery metadata panel, contact
   cross-reference lines, ledger rows that re-read as the scam progresses.
5. **Reachability ledger** (P9): generated per-anchor evidence that every
   ending is reachable and every reference resolves.
6. **Anchor VI draft** (P6/P7 — "the compromised phone", fear: exposure,
   verb: SPOT): brief + inversion engine + 2 phones of prose marked DRAFT +
   mirror-moment epilogue, reachable behind a draft flag, **not** wired into
   the live season.
7. **Morning report** + updated HANDOFF/GAME-PLAN + MEOS wrapup packet.
8. All gates green, branch pushed.

## Non-negotiable constraints

- **Branch isolation.** Only `immersion-pass-2`. No merges to `main`, no PRs,
  no force-push, no deploy, no external services. Push the branch at the end.
- **Depict, never enable** (`world/guardrails.md`). The compromised-phone
  anchor shows detection and recovery only: no functional stalkerware or
  remote-access guidance, no real tools/platforms/scammer tradecraft, no
  reproducible scam scripts. The scammer's-side beat never includes
  actionable technique.
- **Additive edits to shipped anchors.** Existing prose in
  `src/games/blackglass/content/*.ts` is never rewritten; new moments, ambient
  data, theming hooks and cross-reference fields are additive. Canon decisions
  in `craft/maya/_meta/anchor-v-brief.md` §8 are untouched.
- **Draft labeling.** Every new canon-bearing fact, name and beat in Anchor VI
  is marked DRAFT / TBC in-code and in the brief. Uncertain canon →
  conservative placeholder + a question in the report.
- **Local-first.** `cgAI_` storage only; new state is additive; old
  `cgAI_blackglass_v2` saves must degrade to zeros, never error.
- **A11y.** Every new surface keyboard-playable, SR-labeled, 44px controls,
  11px text floor; all new visual effects have reduced-motion paths; axe
  serious+critical stays 0.
- **Budget & deps.** No new npm dependencies; no new binary assets (icons are
  CSS/SVG/type); dist weight ≤ current × 1.02; initial JS unchanged.
- **Honest verification.** Never claim a gate passed without running it; the
  report quotes verbatim outputs. Unverified device behavior is labeled as
  such.

## Autonomy & failure rules

- **Per-phase gate fails twice** → commit the state as `[wip] <phase>`,
  record the failure in the report, move to the next phase. Do not spiral.
- **Hard stop.** If local time reaches 07:00 before the content phase (P5/P6)
  finishes, skip to P7 with whatever landed.
- **Red baseline.** If P0's gates fail on `main`, abort — write a report and
  change nothing.
- **Never attempt** anything requiring credentials/auth (deploys, accounts).
- The run is the *implementer*: direction, standards and canon vetoes belong
  to the user. When in doubt, ship the conservative version and ask in the
  report.

## Phases

Each phase: build → gate → single commit. Keep commits scoped; never mix
phases.

### P0 — Boot & baseline (~15 min)
- Start MEOS (`bash ./meos start`), confirm clean tree on `main`.
- `git checkout -b immersion-pass-2`.
- Replace `docs/work/current.json` with this intent's packet (work id
  `immersion-pass-2`, phase `implement`; the feed-dial record is preserved in
  git history at `main`).
- Create `docs/OVERNIGHT-REPORT-2026-11-08.md` with baseline gate results:
  `npm test`, `npm run build`, `npm run assets:budget`.
- **Gate:** baseline green on all three. Red → abort with report.

### P1 — Engine primitives (P4, P8, P5)
- `phone.stage: 'clean' | 'uneasy' | 'compromised'` on `CaseOS`
  (`src/engine/os/types.ts`), applied as `data-stage` on the device root in
  `Device.tsx`; stage tiers + per-anchor signature effect classes in
  `src/index.css` (feed shimmer, waveform stutter, glass flicker — original,
  subtle, reduced-motion safe).
- `pacing.ts`: `silence` beat — no typing indicator, read-length wait,
  optional never-arriving receipt.
- `runtime.ts`: dwell trigger on `OSRule` (unprompted push after N idle
  beats, fires once).
- Retrofit: ≥1 silence beat and ≥1 dwell push per shipped anchor (additive
  moments only).
- **Gate:** new unit tests (stage transitions, silence timing at 1×/8×, dwell
  once-only) + `npm test` + `npm run build`; existing smokes unaffected.
- Commit: `immersion: staged theming, silence beats, dwell pushes (P4/P8/P5)`

### P2 — Ambient surfaces (P1)
- New `AppId`s `calendar` and `wallet`; original CSS/SVG icons in
  `apps/shared.tsx` APP_META; two surfaces in `apps/index.tsx` rendering
  authored data only (no plot logic), with plausible per-phone empty states.
- Authored ambient data for all 13 shipped phones: family week events,
  load/grocery/allowance transactions whose mundane rows carry the season's
  tells (the accusatory ledger, framework §1.5).
- Extend the navigation contract test to cover any new `openThread` targets.
- **Gate:** `npm test` + build + `assets:budget` (text-only weight).
- Commit: `immersion: calendar + wallet ambient surfaces, per-phone data (P1)`

### P3 — Data-horror cross-references (P2)
- Gallery viewer metadata panel: authored time/location/device fields per
  photo; a location chip opens the authored Browser page when present.
- Contacts cross-reference line: threads/photos that touch a contact.
- Wallet rows accept verdict-bearing `meta`; ≥1 moment per anchor (additive)
  directs the player to a cross-referencing tap.
- **Gate:** `npm test` + affected smokes (`artifact`, `shade`, `anthology`)
  with axe clean.
- Commit: `immersion: gallery metadata, contact xrefs, ledger meta (P2)`

### P4 — Reachability ledger (P9)
- `scripts/reachability.mjs` (+ package.json script): walks every anchor's
  `CaseOS` — every ending/outcome has a flag path; every `openThread` target,
  artifact, voicenote and page reference resolves; no dangling ids.
- Emits `docs/REACHABILITY-LEDGER.md` (generated; committed).
- **Gate:** ledger green for all anchors; wired into `npm test`.
- Commit: `immersion: reachability ledger + generated doc (P9)`

### P5 — Anchor VI brief + inversion engine (P6 mechanics)
- `craft/maya/_meta/anchor-vi-brief.md`: P10 answers (fear: **exposure**;
  verb: **SPOT**; posture: clean device that corrupts as anomalies are found;
  data surfaces: wallet ledger, screen-time, mail rules, installed-apps
  list). Two framings — A (recommended): the season's holder hands over
  *their own* phone because "something's off"; B: a new cast member's phone.
  Guardrail note: detection/recovery only.
- Engine: anomaly surfaces (screen-time gaps, a mail forwarding rule, messages
  the owner didn't send, a disguised native-looking "System Tools" entry) +
  P1 stages driving the infection progression. Original everything.
- Module lives at `src/games/blackglass/content/compromised.ts` + a draft
  registration **behind `?draft=vi`** — not in the live ANCHORS array, card
  hidden.
- **Gate:** unit tests + a flag-gated smoke with axe clean.
- Commit: `anchor-vi(draft): brief + inversion engine, flag-gated (P6)`

### P6 — Anchor VI prose draft (P6/P7 content)
- 2 phones (3rd = stretch) of full `CaseOS` prose, EN/Taglish matching the
  season, marked DRAFT; closing mirror-moment epilogue (P7) built from the
  run's own recorded decision flags.
- **Run the doctrine's loop literally:** write V1, then a recorded
  self-critique pass against the framework bar (predictable? emotional payoff?
  mirror moment? one fear?), then V2. Keep both passes summarized in the
  brief's appendix.
- **Gate:** navigation contract extended, unit tests, flag-gated smoke, axe,
  budget. Time-boxed by the 07:00 hard stop.
- Commit: `anchor-vi(draft): phones + mirror epilogue (DRAFT for canon review)`

### P7 — Finalize & report
- Full gates: `npm test`, `npm run build`, `npm run assets:budget`, smokes
  runnable with `npm run preview` (anthology, os, case-os, radar, exam,
  glassbox, feed-dial, cadence, draft-vi).
- Update `docs/HANDOFF.md` (overnight outcome section), `docs/GAME-PLAN.md`
  (M8 immersion entry), finish the MEOS packet (phase `wrapup`, verification
  evidence, next action = user review + merge decision).
- Complete the morning report; `git push -u origin immersion-pass-2`.

## Morning report spec (`docs/OVERNIGHT-REPORT-2026-11-08.md`)

1. Per-phase table: landed / wip / aborted + why (one line each).
2. Gate evidence verbatim: test counts, build output summary, budget number,
   axe totals per smoke.
3. Draft content inventory: what Anchor VI contains, the two framings, the
   V1→V2 critique record, every canon question for the user.
4. Risks & known gaps (unverified behavior, `[wip]` states).
5. Exact commands for the user: review URL (`?draft=vi`), merge command when
   approved (`git checkout main && git merge --no-ff immersion-pass-2 && git
   push`), and what CF will auto-deploy.

## Kickoff (the user, before bed)

Paste into a fresh ZCode session in `C:\projects\blackglass`:

> Read `docs/OVERNIGHT-BUILD-2026-11-07.md` and execute it as an autonomous
> overnight build. Run `bash ./meos start` first. Follow every constraint,
> phase gate and stop rule exactly. Work on the branch it names, commit per
> phase, push the branch when done, and finish with the morning report.
> Never merge to main and never deploy.
