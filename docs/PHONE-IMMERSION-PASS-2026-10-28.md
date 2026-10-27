# BLACKGLASS — Phone Immersion Pass (2026-10-28)

**Intent:** make the flagship phone anthology feel like an inhabited, discoverable device before broadening the plot. Improve the existing glassOS, not the frozen legacy iframe. Keep every existing story branch and local save intact.

## References reviewed

- [External vignette: blackglass.pages.dev](https://blackglass.pages.dev/) — a **different** Blackglass, atmospheric, linear, full-screen interrogation room. Browser Use audited desktop (1440×900) and mobile (390×844). Worth learning from: tactile first action, staged reveals, user-initiated audio, environmental atmosphere, deliberate pacing. **Do not copy** its artwork, writing, brands or specific scene. Its mobile dialogue offscreen and ambiguous endpoint are anti-patterns.
- [Live flagship anthology](https://blackglass.jansammat26.workers.dev/blackglass) and [hub](https://blackglass.jansammat26.workers.dev/) — Browser Use review *before implementation* identified a hub CTA sending players to the legacy experience, opening moments returning to home instead of their named conversation, clipped mobile header, a light-theme alert with poor contrast, and weak app return navigation. No runtime errors observed at baseline.
- *Another Lost Phone: Laura's Story* / found-phone mystery genre — reference **mechanical principles only**: app-borne character clues, discovery through ordinary device functions, recontextualization of private records, not puzzles that feel like a school quiz. Do not reproduce characters, dialogue, assets or story beats.

## Shipped in this pass (GitHub main; Cloudflare Workers auto-builds)

1. **Way in:** hub Play CTA now opens the flagship `/blackglass` route instead of `/legacy/blackglass-phones/`; cinematic anchor cold open presents a visible "Pick up the phone" control.
2. **Way through:** nine authored opening moments carry `openThread` and their buttons actually open the intended chat across all four anchors; no premature story flags.
3. **Way back:** Messages has an in-app conversations back control and search over **delivered** messages only, with hit-to-thread navigation and emphasis. Cross-app links and images return to their originating conversation via the OS header.
4. **Inspectable media:** photo bubbles now open their actual Gallery artifact (zoom/compare/tell layer) rather than merely recording evidence; fullscreen gallery handles light-themed phones with a legible dark viewer.
5. **Diegesis and legibility:** Notes no longer displays `caseDef.blurb` or the educational lesson inside the fictional phone; saved details are presented as on-device data. Outside-the-phone clue tutorial removed. Notification banners inherit each phone's actual theme; mobile header wraps instead of hiding plot context. Exit copy accurately reflects local save/resume for anthology runs.

The base game remains ten phones, four anchors, Rashomon sequencing, recorded decisions, resumable local-only runs, case evidence, artifact analysis, and Convergence.

## Next high-leverage work (not represented as complete)

### P0 — Test the complete Maya opening as a golden path

Run desktop/mobile (390×844, 360×740, 1440×900) on the **post-change build**, with real 1× pacing:

1. Hub Play -> flagship; first anchor -> visible tactile start -> unlock.
2. Dismiss Maya wake moment -> Santos Family GC opens **directly**; verify story rule timing/choices.
3. Open the vegetable link -> inspect in Browser -> Back returns to GC with the same decision options.
4. Check Message search for an *already delivered* link; ensure undelivered future texts never leak.
5. Enter Bea's phone after completing Maya, open photo message -> Gallery shows full asset and adds evidence only after opening; Back returns to original chat.
6. Pause mid-phone, close, resume; check flags, inbox, evidence, timestamps. Check completed-run and Convergence gates remain unchanged.
7. Repeat at keyboard-only/reduced-motion, muted audio, and narrow viewport. Verify touch targets, focus, contrast and performance budget.

All tests should be explicit. Browser Use baseline was performed **before** these fixes; do not call it post-change QA until it is actually repeated.

### P1 — Make choices require investigative context

Preserve the principle **complicity before clarity** from `world/guardrails.md`. For one phone per anchor, write a short story beat in which an existing detail in Contacts, Notes, Browser or Gallery affects what a reasonable player chooses. Do not add an obvious correct-answer button, lock the story behind trivia, or introduce real-world functional scam templates. Prefer personal stakes and contradictory details, not additional gamified scores.

### P1 — Finish phone-native affordances

- Make saved Notes details link back to their original artifact, where possible, without exposing future story content.
- Audit the viewer's Gallery, Browser, Contacts and Phone transitions: a meaningful back button should not erase the chat context.
- Audit accessibility of all overlays and Escape behavior; ensure overlays never trap focus irrecoverably.
- Restore scroll position appropriately when returning to a long thread after inspecting an artifact.
- Correct any `case`, `evidence` or `level` labels leaking into the fictional OS; educational terms belong after play.

### P2 — Atmospheric layer, original only

Use character-specific notification cadence, screen lighting, quiet ambience with opt-in audio, and short staged openings to signal time, urgency and intimacy. Ensure mute, reduced-motion and low-end-phone paths. Original sound/visuals; no copies of the reference vignette. Keep PWA precache and first-load budgets.

### P2 — Narrative breadth

An additional anchor (`THE ASSISTANT`) has a brief in `craft/maya/_meta/anchor-v-brief.md`; do not invent its canon details or extend the story until the open writing questions are resolved. Full game depth is measured by decisions with lasting recontextualization, not added filler scenes.

## Evidence and safety

- Verification available: Cloudflare Workers deployment/build results per GitHub commit; independent **pre-change** Browser Use audits of both public reference and existing anthology; existing automated unit/smoke scripts in `scripts/`.
- Do not claim that post-change end-to-end playtests or screenshots have been completed without actually running them.
- Respect `world/guardrails.md`, `docs/design-system.md`, local-first `cgAI_` persistence, original media, and accessibility.
- Legacy `play/` experiences remain unchanged. Current live target is [Blackglass Workers](https://blackglass.jansammat26.workers.dev/) connected to GitHub `main`.

**Next concrete action:** perform the P0 golden-path run and fix any flow or visual issue it exposes, then review P1 investigative mechanics with story craft before expanding content.
