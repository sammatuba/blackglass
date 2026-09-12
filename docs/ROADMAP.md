# Roadmap

Phases ship something usable each. Phases 1–4 are done; Phase 5 is the full-game push, executed iteratively. Outcomes, targets, and the placeholder register live in `docs/GAME-PLAN.md`.

## Phase 1 — Foundation ✅
Docs + inventory (`docs/GAMES.md`, `VISION.md`, `ASSETS.md`), platform scaffold, hub shell, legacy embedding, PWA, CI workflow, deploy pipeline.

## Phase 2 — Engine + Feed Triage ✅
Generalized phone/beat engine (`src/engine/`), Scam Radar Feed Triage (31 items, 6 red-flag families, mastery persistence).

## Phase 3 — Case Files ✅
Three narrative cases on the linear engine with choice-gated flows and outcome-scored debriefs.

## Phase 4 — glassOS & the premium pass (current)

**The bar:** found-phone genre — *A Normal Lost Phone*, *Simulacra*, *Duskwood*. The phone is not a website with chat bubbles; it is a navigable device you hold: you unlock it, tap apps, watch messages arrive with typing indicators, answer calls, and open the evidence yourself.

Ordered workstreams (each ships on its own):

1. **glassOS runtime** — the found-phone layer in `src/engine/os/`:
   - Device shell: lock screen (unlock gesture), home screen with tappable apps, status bar, gesture bar, notification banners, quick settings (brightness that really dims, sound toggle).
   - Messages app: threads, date dividers, typing indicators, suggested replies you tap to send (Duskwood's core loop), compose animation, "not in your contacts" headers.
   - Apps as evidence surfaces: Gallery (photos arrive as the case progresses, full-screen viewer with tells), Phone (recents, voicemail transcripts, incoming-call overlay with accept/decline), Browser (fake sketchy pages you can actually open and inspect — phishing checkout, scam dashboard, SEC advisory), Contacts (verification gameplay: is the texter's number the saved one?), Notes (auto-collected evidence + checklist), Settings.
   - Sound: WebAudio-synthesized SFX (message pop, send, unlock, ringtone) with persistent mute; no audio assets needed.
2. **Port the three cases onto glassOS** — re-authored as thread/photo/page/call content with decoys and verification beats; debrief gains an investigation score (clues found).
3. **Port the BLACKGLASS anthology onto the engine** — the 4 anchors as glassOS stories (the anthology's UI-as-character idea maps directly onto OS theming); includes the deferred silent-witness 4th phone and unlock orders (`craft/maya/_meta/phone-anthology-architecture.md`). **All four anchors ship on glassOS** (`src/games/blackglass/`): kangkong (three themed phones, sequenced recognition), voiceclone (the live clone call, GCash send, the silent-witness phone on the timeline), deepfake (the liar's dividend), fiveweeks (Bea's drift, dynamic epilogue). Anchor select + per-phone choices carried into each timeline.
4. **Literacy games refresh decision** ✅ — decided: keep the four LEARN titles playable as legacy, retire their separate visual language at the hub level (Learn pillar is now a compact "reference shelf" with an aspirational-port note). Full platform ports remain aspirational, not scheduled.
5. **Showpiece polish** ✅ — Kitbitz CC0 scene vignettes shipped in all three case debriefs (`src/games/scam-radar/cases/Vignette.tsx`, provenance in `src/assets/kitbitz/MANIFEST.json`); hero perf groundwork done: the Three.js hero chunk is excluded from the PWA precache (capability-gated load, degrades to the CSS gradient — first-visit cache 2,417 KB → 1,554 KB), hub smoke added (`scripts/hub-smoke.mjs`). Remaining hero work (TSL/RenderPipeline refinement) is optional and unscheduled.
6. **Diegetic artifacts** ✅ — all 7 anthology artifacts generated 2026-09-06 via the ChatGPT worksheet (`play/blackglass-phones/GENERATE-VIA-CHATGPT.md`), tells verified, synced into the platform (`src/games/blackglass/assets/artifacts/`). The seam stays keyless and offline; the AI-video register pilot (`dr-anita-still.mp4`) shipped and is verified end-to-end by `scripts/anita-video-shot.mjs`; open-model upgrades and the Tito Mike clip remain optional (`research/ai-visual-workflows-2026.md`).

## Phase 5 — Full game (current)

The complete path: hub → four anchors (10 phones) → **THE CONVERGENCE**. Outcomes and targets in `docs/GAME-PLAN.md`.

1. **Continuity** ✅ — live glassOS runs persist per phone; the rack offers Continue; exiting flushes state (`scripts/resume-smoke.mjs`).
2. **Case board** ✅ — evidence/inspected stored with each lived run; clues surface on the rack, anchor select, and finale signal report.
3. **THE CONVERGENCE** ✅ — global finale unlocked by living all 10 phones; the season assembled from recorded choices, with the through-line and discovery totals (`scripts/finale-smoke.mjs`).
4. **Presentation polish** ✅ — screen transitions, the glassOS notification center, human chat cadence, the deeper stage (time-of-day desk light + tilt-driven glass sheen), and the pace-aware anchor cold open shipped (M4 complete).
5. **Interaction depth** ✅ — gallery zoom, voice-note play/pause, Notes search, link forward/share, and side-by-side artifact compare (the healthtruthph batch in Bea's gallery) shipped; “recovered messages” reserves for a future anchor (M5).
6. **Content breadth** ◐ — Anchor V brief ready: **THE ASSISTANT** (verb ASK) in `craft/maya/_meta/anchor-v-brief.md`; needs a writing session (M6).
7. **External assets** — Tito Mike clip, voice audio, new diegetic stills, localization. Placeholder register in `docs/GAME-PLAN.md` §7 (M7).

## Standing constraints (unchanged)

- Lighthouse budgets: initial JS ≤ 150KB gz, a11y ≥ 95; games lazy-loaded.
- Keyboard-playable, screen-reader supported, reduced-motion safe, offline after first visit.
- `world/guardrails.md`: depict deception, never enable it; fictional numbers/domains only.
- `cgAI_` localStorage prefix; no accounts, no tracking.
