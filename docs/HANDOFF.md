# HANDOFF — BLACKGLASS (2026-11-03)

Tool-agnostic handoff: everything a person — or any assistant, of any tooling —
needs to continue this project. No session-specific mechanics; just state,
commands, and decisions.

---

## 1. What this project is

**BLACKGLASS** — a gamified AI-scam-readiness learning suite. A phone-anthology
of interactive stories (the "glassOS" found-phone engine) plus drill games, teaching
people to detect AI-assisted deception: clickbait, voice cloning, deepfakes,
algorithmic drift, and hallucinated authority. Every depicted person, brand, number,
and journal is fictional; the standing guardrail is `world/guardrails.md` — depict
deception, never enable it.

## 2. Where it lives

| Thing | Where |
|---|---|
| Source repo | `github.com/sammatuba/blackglass`, branch `main` @ `1212814` (2026-11-03) |
| Primary live host | **https://blackglass.jansammat26.workers.dev/** — Cloudflare Worker, auto-builds on every push to `main` (CI runs `npm test && npm run build`) |
| Secondary live host | **https://sammatuba.github.io/blackglass/** — GitHub Pages, manual deploy only |
| Repo layout | `docs/` (plans, evals, reports) · `src/engine/os/` (glassOS runtime) · `src/games/blackglass/` (the anthology + content) · `src/games/scam-radar/` (drills) · `src/games/glassbox/` (data transparency scrollytelling) · `craft/` (writing canon) · `world/guardrails.md` · `play/` (legacy vanilla mirrors + asset worksheets) |

## 3. Current state (what ships today)

The **season is content-complete**: hub → five anchors (13 phones) → THE CONVERGENCE
(5 chapters).

1. **KANGKONG** — clickbait morning (3 phones, sequenced recognition).
2. **IT'S ME, AGAIN** — voice-clone evening (3 phones; live clone call, GCash send;
   real voice notes since 2026-11-03).
3. **GUARANTEED** — deepfake afternoon (3 phones; video page plays a still + tells
   until the real clip lands).
4. **FIVE WEEKS** — one feed, drift (1 phone, dynamic epilogue).
5. **CERTAIN** — the assistant, one night (3 phones; new "Ask" app surface; shipped
   2026-11-03; E2 judgment PASS 4/4 in `docs/av-playthrough-judgment.md`).

Plus: Tell Exam (E6 pedagogy measure), Scam Radar drills, Glassbox 01–02
(transparency scrollytelling + feed model), PWA offline, voice notes with recorded
provenance (`play/blackglass-phones/voice/PROVENANCE.md`).

**The only placeholder left in the game:** the Tito Mike deepfake *clip* (anchor 3's
video page plays the still + tells until it lands).

## 4. How to build, test, deploy (plain commands)

```bash
npm install                # once
npm run build              # tsc + vite build (base /blackglass/ unless CF_PAGES/WORKERS_CI set)
npm test                   # vitest (45 tests incl. glassbox + navigation contract)
npm run assets:budget      # dist weight gate (~3.7 MB budget)
npm run assets:sync        # regenerate artifact/voice manifests from play/ + public/
npm run preview            # serve dist at localhost:4173 (Pages base)

# smokes (Playwright, need `npm run preview` running; SHOT_BASE=<host> targets live)
node scripts/anthology-smoke.mjs            # plays all 5 anchors end-to-end
node scripts/av-e2-capture.mjs              # Anchor V full capture + transcript (E2)
node scripts/case-os-smoke.mjs              # Case 01 on the OS engine
node scripts/{exam,radar,os}-smoke.mjs      # Tell Exam / radar / Case 01 spot checks
node scripts/cadence-smoke.mjs              # chat pacing at real 1×

# deploys
git push origin main                        # → Cloudflare auto-build + publish (primary)
bash scripts/deploy.sh                      # → rebuild + force-push dist to gh-pages (secondary)
```

Notes: smokes run at 8× pace via localStorage; story moments with `openThread`
navigate straight into the named conversation; on the anthology rack, tap the phone
cards (the header "Pick up the phone" button is a separate control). CI on Cloudflare
builds from `main` — a push publishes in a few minutes.

## 5. Decisions on file (user-overridable canon)

M6's four open canon questions were decided 2026-11-03 to finish the milestone; each
is one content-level edit in `src/games/blackglass/content/assistant.ts`:

1. Assistant app is **"Ask"**, model **"Ask 4"**.
2. **Medical dosage beat kept** — wrong number contradicted in-scene; nothing
   actionable; invented names only (guardrails hold).
3. **One vendor** on every phone (the morning-GC reveal depends on it).
4. Anchor V shipped **before** any fifth cast anchor (OFW ring etc. stay
   aspirational).

Full reasoning: `craft/maya/_meta/anchor-v-brief.md` §8.

## 6. What's next (priority order)

1. **User review of the live game** — the canon decisions above, Tita/Joy Taglish by
   ear, planted tells still findable-but-not-glaring, and the new glassOS navigation
   from the 2026-10-28 phone-immersion pass (`docs/PHONE-IMMERSION-PASS-2026-10-28.md`).
2. **Tito Mike clip** (user-side, unblocks the last placeholder): 10 s i2v via Veo —
   source `play/blackglass-phones/assets/tito-mike-deepfake.png`; requirements,
   line, and exact `at:`-tell wiring in `play/blackglass-phones/GENERATE-VIA-AGY.md`
   §5. After it lands: `scripts/transcode-clip.mjs` if >5 MB → `npm run assets:sync`
   → add `at:` timestamps to the tells in `src/games/blackglass/content/deepfake.ts`
   (only once the clip exists — the tells layer renders `at` unconditionally) →
   extend `scripts/anita-video-shot.mjs` as `mike-video-shot.mjs`.
3. **Optional Anchor VI+** — candidates in the architecture doc's axes (AI recruiter,
   election audio, romance scam); each needs a brief like Anchor V's and a writing
   session.
4. **Optional:** pair the legit-baseline clip into a deepfake content page; extend
   E2 capture to moment text.

## 7. Conventions worth keeping

- Storage prefix `cgAI_`; no accounts, no tracking; offline after first visit.
- Lighthouse budgets: initial JS ≤ 150 KB gz; a11y ≥ 95; games lazy-loaded.
- Keyboard-playable, screen-reader supported, reduced-motion safe.
- New stories = new failure mode + new verb + new UI posture (see `docs/GAME-PLAN.md` §6).
- Evidence/tells are content, not images; every assistant answer carries a checkable detail.
- The navigation contract test (`src/games/blackglass/navigation.test.ts`) fails the
  build if a story moment promises a conversation that doesn't exist — extend it to
  every new anchor.

## 8. Session log (recent, newest first)

- **2026-11-03 (b)** — integrated the parallel `main` line (glassOS navigation, photo
  attachments, searchable history, Glassbox, Cloudflare deploys) with Anchor V:
  assistant-aware `openThread` routing, moments open Ask directly, smokes + navigation
  test extended. All gates green on the merged tree (45/45 tests; anthology, case-os,
  exam, radar, os smokes; Anchor V E2 capture 11 beats clean). Pushed `main`
  (`1212814`) → Cloudflare auto-build; gh-pages refreshed via `deploy.sh`. Both hosts
  answered 200 at close; the full live smoke against the final tree was interrupted by
  wrap-up — worth one `SHOT_BASE=<host> node scripts/anthology-smoke.mjs` pass on next
  contact. Report: `docs/overnight-report-2026-11-03.md`.
- **2026-11-03 (a)** — voice notes generated and deployed (Kokoro + Chatterbox, fully
  synthetic chain, watermark kept); radar/os smokes live-verified via hub fallback.
- **2026-10-04/05** — eval chain E1–E7, artifact dedupe + WebP pipeline, Tell Exam.
- **2026-09-13 → 10-28** — design system pass, phone-immersion pass, Glassbox 01–02,
  Cloudflare deploy path.
