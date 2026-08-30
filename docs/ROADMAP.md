# Roadmap

Phases ship something usable each. Phases 1–3 are done; Phase 4 is the premium pass, executed iteratively.

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
3. **Port the BLACKGLASS anthology onto the engine** — the 4 anchors as glassOS stories (the anthology's UI-as-character idea maps directly onto OS theming); includes the deferred silent-witness 4th phone and unlock orders (`craft/maya/_meta/phone-anthology-architecture.md`).
4. **Literacy games refresh decision** — port LEARN titles onto the hub's design system or retire their separate visual language.
5. **Showpiece polish** — Three.js hub hero refinement; Kitbitz CC0 scene vignettes in case debriefs (`docs/ASSETS.md`).
6. **Diegetic images** — regenerate the 7 anthology artifacts + new case artifacts via `gen-images.mjs` once Gemini quota resets.

## Standing constraints (unchanged)

- Lighthouse budgets: initial JS ≤ 150KB gz, a11y ≥ 95; games lazy-loaded.
- Keyboard-playable, screen-reader supported, reduced-motion safe, offline after first visit.
- `world/guardrails.md`: depict deception, never enable it; fictional numbers/domains only.
- `cgAI_` localStorage prefix; no accounts, no tracking.
