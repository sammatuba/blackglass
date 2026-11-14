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
| Primary live host | **https://blackglass.sammatuba.workers.dev/** — Cloudflare Worker, auto-builds on every push to `main` (CI runs `npm test && npm run build`) |
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

Plus: **the signal desk** (2026-11-09) — every phone is a scored case: authored
pressure meters (SPREAD/URGENCY/THE PITCH/THE DRIFT/CONFIDENCE), move-weighted
reflex scoring, live desk rails on wide desktops, POV toasts on mobile, a
verdict dossier with grade stamp and fanfare, and season bests + ranks on the
rack and hub (`score.ts`, `SignalDesk.tsx`, `Verdict.tsx`; the grade measures
what you saw and practiced, never what you saved). And since 2026-11-10 the
desk is **one across the suite** (`src/games/shared/grade.ts` + `desk.tsx`):
Feed Triage plays as a shift at the feed desk (live signal meter + grade, desk
sounds, a verdict-dossier debrief), the radar case debrief and Tell Exam
results carry the same grade stamp, the Hub shows YOUR SEASON across the
suite, and case cards stamp `✓ worked · signal N`. Tell Exam (E6 pedagogy
measure), Scam Radar drills, Glassbox 01–02 (transparency scrollytelling + feed
model), PWA offline, voice notes with recorded provenance
(`play/blackglass-phones/voice/PROVENANCE.md`).

And since 2026-11-10 (M6.7) the hub is **the operator's console** — the desk
itself, not a landing page: stations for the rack/feed desk/lens bench (one
line + record stamp + status LED each), the glassbox lab with its live paper
readouts, the season badge, and one archive drawer for the six legacy pieces
(no NEW/LEGACY badge guessing; keys 1–5 jump to a station, 6 toggles the
archive). Route loads show the console boot (`app/RouteBoot.tsx` +
`RouteBootGate` in App.tsx — Router v7's startTransition would otherwise keep
the stale page) instead of a bare black page, and chunks warm on hover/focus
plus one idle pass (`app/prefetch.ts`; `scripts/nav-perf.mjs` is the perf
gate, with isolated assertions). Season parsers are pure + tested
(`app/season.ts` — a zero-point case and a legacy save both read as worked).

**The only placeholder left in the game:** the Tito Mike deepfake *clip* (anchor 3's
video page plays the still + tells until it lands).

## 4. How to build, test, deploy (plain commands)

```bash
npm install                # once
npm run build              # tsc + vite build (base /blackglass/ unless CF_PAGES/WORKERS_CI set)
npm test                   # vitest (76 tests incl. scoring, round signal, store rework, season parsers, glassbox + navigation contract)
npm run assets:budget      # dist weight gate (~3.7 MB budget)
npm run assets:sync        # regenerate artifact/voice manifests from play/ + public/
npm run preview            # serve dist at localhost:4173 (Pages base)

# smokes (Playwright, need `npm run preview` running; SHOT_BASE=<host> targets live)
# on hosts without system Chrome: SMOKE_CHANNEL=chromium picks the bundled one
node scripts/anthology-smoke.mjs            # plays all 5 anchors end-to-end
node scripts/av-e2-capture.mjs              # Anchor V full capture + transcript (E2)
node scripts/case-os-smoke.mjs              # Case 01 on the OS engine
node scripts/{exam,radar,os,hub}-smoke.mjs  # Tell Exam / radar / Case 01 / console spot checks
node scripts/nav-perf.mjs                   # the route-boot + hover-prefetch perf gate (throttled)
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
3. **M8 — THE IPHONE PASS** (opened 2026-11-10, see `docs/GAME-PLAN.md` §6): the
   glassOS interface overhauled to iPhone 15 Pro / iOS 18 fidelity, borrowing
   patterns + metrics from **FoundPhone-Studio** (cloned to `/tmp/
   foundphone-studio` for reference — patterns only, never assets). Ladder
   M8.1 shell → M8.2 lock/launcher → M8.3 control center → M8.4 app reskins
   (a/b) → M8.5 library + re-gate; every milestone ends in a checkpoint
   (gates green → packet wrapup → commit point → compact and regroup).
4. **Optional Anchor VI+** — candidates in the architecture doc's axes (AI recruiter,
   election audio, romance scam); each needs a brief like Anchor V's and a writing
   session.
5. **Optional:** pair the legit-baseline clip into a deepfake content page; extend
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

## 7b. Operational learnings (live verification — read before running live smokes)

Captured 2026-11-11 during the M6.7/M8.1 deploy verification. Three failure
modes cost hours each; they are now fixed or documented so they are never
re-diagnosed from scratch:

1. **Chromium's async DNS stalls under WSL2 — the "invisible hang".**
   Symptom: `page.goto` never commits (20–45 s timeouts), *zero requests
   issued, zero failures logged*, run-to-run random on the same command, while
   `curl` on the same host answers in 100 ms. Retries inside the page cannot
   help because no request ever leaves the browser. Root cause proven with an
   A/B probe: Chromium's built-in async DNS resolver intermittently hangs on
   WSL2's NAT resolver; with `--disable-async-dns` (system getaddrinfo) every
   load went 43–1300 ms. Fix: `launchAuditBrowser()` in `scripts/lib/nav.mjs`
   (all ten gate smokes launch through it). Durable machine-level alternative:
   fix WSL2's resolver (mirrored networking or a real DNS server in
   `/etc/resolv.conf`) — user's call. Diagnostic signature to remember:
   **curl fast + browser no-commit + empty request log = resolver, not the site.**
2. **Never verify a deploy by comparing bundle hashes across build bases.**
   The Workers build uses vite base `/` and Pages/preview use `/blackglass/` —
   the same source produces different hashes, so "hash differs from local" was
   wrongly read as "old bundle still served" and cost a 40-minute false alarm.
   Verify by content markers (e.g. `grep 'os-safe-home'` for the 3.75rem
   island clearance in the served CSS) or by behavior smokes — the latter is
   the standard.
3. **Smokes must prove destinations, not responses, and prove mounts, not
   sleeps.** Two latent smoke defects surfaced only on live hosts (local SPA
   fallback masks them): `hub-smoke`/`os-smoke` assumed the hub/radar URL per
   host base (Workers' `/blackglass/scam-radar` is the anthology catch-all, not
   the radar), and `anthology-smoke`'s `gotoGame` "proved" it was in-game with a
   fixed 600 ms settle that can fire before React mounts on a slow live load —
   plus its fallback expected pre-M6.7 brochure card text. Also: **GitHub Pages
   has no SPA fallback for deep links** (no 404.html) — `/blackglass/blackglass`
   404s live, so the anthology can only be entered through the hub card there.
   Fixes now in `scripts/lib/nav.mjs`: `gotoHub(page, BASE)` proves the hub per
   host base; `gotoGame` waits for the app's own text (bounded waitFor) and
   enters via `[data-od-id="station-rack"]`; `os-smoke` proves the radar
   destination before skipping its fallback; `hub-smoke` gates on the hero
   heading before any soft assertion. The remaining `SHOT_BASE` semantics are
   per-script and documented in each script's header — hub/radar/exam/os take
   the ORIGIN; check before a live run. (Follow-up: `exam-smoke`/`radar-smoke`/
   `case-os-smoke` direct-link probes still assume a host base; they passed
   locally and on Pages but have the same latent conflation on the other base.)
4. **WSL2 GPU passthrough can flake mid-session — headless smokes must not
   depend on it.** Captured 2026-11-13 during the M9 verify. Symptom stack:
   every Playwright *strict* click on the hub timed out at "waiting for
   element to be … stable" while text reads, sync evaluates and axe all
   worked; in-page async loops (rAF sampling) hung; probe browsers reported
   "Target page, context or browser has been closed" mid-run; one
   `page.screenshot` hung "waiting for fonts" after fonts had loaded. A/B
   probes proved the compositor intermittently stops producing frames when
   the three.js hero renders — the GPU process wedges (GPU on) or the
   software-WebGL loop starves the page (GPU off; note `--disable-gpu` alone
   is NOT enough — Playwright's default `--enable-unsafe-swiftshader` keeps
   WebGL alive on CPU). Fixes, all in the audit layer (`scripts/lib/nav.mjs`,
   `scripts/hub-smoke.mjs`): the launcher now also passes
   `--force-prefers-reduced-motion` — the app's own capability gate
   (`GlassHero.capable()`) then never loads the hero chunk, which is the
   designed degrade path and stills every animation for the stability
   checks; `clickAudit()` scrolls and force-clicks (os-smoke's
   force-fallback pattern generalized); diagnostic screenshots are
   best-effort; hub-smoke accepts the degrade path unless `SMOKE_ANIMATION=1`
   opts back into the canvas assert on a healthy-GPU machine. Diagnostic
   signature: **text/CDP asserts healthy + strict clicks/screenshot hang =
   compositor, not the site.**

## 8. Session log (recent, newest first)

- **2026-11-13 (b)** — M9 THE SLOW BURN (strategy → deploy, commit `98f8d06`): the ratified
  program from `docs/design-assessment-2026-11-13.md`. M9.1 season spine (anchor `when`/`arrival`,
  the select rebuilt as "The season" with a soft frontier gate, scoreframe off in-fiction surfaces,
  boot card as entry ritual, `done_*` echo beats wired into voiceclone/deepfake/fiveweeks — 3 of 5
  anchors were sealed units); M9.2 slow burn (engine ambient channel with `os_engaged` gate,
  prose retuned to reading speed, settle ~2×, 0.5× pace, ambient life authored for kangkong/
  deepfake/fiveweeks); M9.3 handover (hub console voice, RouteBoot cache lecture gone, all four
  `world/guardrails.md` path leaks replaced). Deployed to both hosts; live-verified by content
  markers (season select, boot copy, echo flags, `ambientIndex`/`os_engaged` engine markers).
  Verify status: tsc clean, 86/86 tests, build green, budget green; full e2e smokes NOT
  completable this session — the WSL2 graphics stack died mid-session (§7b #4); re-run the suite
  on a recovered host. Next: M9.5 real-1× playtest watch; cadence profiles with M8.3; R5 canon
  reconciliation; R4 trainer debt.
- **2026-11-13 (a)** — strategy session: full-facets design assessment
  (`docs/design-assessment-2026-11-13.md`) — the writing passed its prior judgments; the gaps
  are architectural (menu-not-season, echo system unused in 3/5 anchors, no handover ritual)
  and staging-level (no act structure shipped, brisk constants, completionist pressure).
  User ratified the M9 program (soft gate · console hub · M9-before-M8.3 · anthology-first).

- **2026-11-12 (a)** — M8.2 THE IPHONE PASS · lock screen + home launcher (wrapup reached,
  NOT committed): the interrupted session's implementation was recovered and finished.
  New pure `engine/os/launcher.ts` (`homeAppsFor` app list + `buildLauncherLayout`
  grid/dock/pages over IOS_HOME_GRID) with unit tests; `ios/AppIcon.tsx` code-drawn
  squircle icons (8 glyphs, badge 9+ cap, `AppGlyph` reused by lock widgets);
  `Device.tsx` HomeScreen rebuilt data-driven (grid + dock + tablist page dots +
  safe-page clamp), LockScreen in iOS grammar (72pt cqw clock, date line, lock glyph,
  'Swipe up to open' kept) with a NEW data-honest widget row (battery always; missed
  calls / voicemails / Notes only when the case seeds them). Independent review
  (`./meos review`) returned REWORK with 3 findings — all fixed and re-verified: the
  missing widget row; M8.1's record archived verbatim to
  `docs/work/blackglass-iphone-shell.json` and launcher coverage demonstrated across
  all 16 CaseOS definitions (3 playable + 13 anthology phones,
  `games/scam-radar/cases/launcher-phones.test.ts`); the grid-badge test that asserted
  `undefined`. One probe finding fixed on top: the desk stage's FIXED 2.75rem screen
  corner clipped the cqw status clock at the ~295px floor (POV full-bleed unaffected) —
  the status row now centers on the island's axis (7.38cqw) with 4.07cqw sides,
  iOS-true and clip-free at every width (zoomed re-probe). Gates on the final tree:
  tsc clean, 85/85 tests, build green (45 precache), 3.7 MB budget, 8/8 smokes exit 0
  (SMOKE_CHANNEL=chromium; system Chrome absent here), visual probe desk+POV
  (icons 15.3cqw/22.5%, dock 4, dots hidden single-page, widgets both stages). Seven
  probe-*.mjs scratch files untracked at root — delete or exclude at commit.
  Work packet: docs/work/current.json (wrapup/complete, deployed=false). Next: commit
  on authorization → M8.3 shade + island control-center states.
- **2026-11-11 (b)** — DEPLOYED both hosts + live-verified (user-authorized):
  committed `d54544e` (M6.7 operator's console — 16 files incl. the two UI
  pieces an amend caught unstaged) and `ebdf1c1` (M8.1 iPhone shell), pushed
  `main` → Workers Builds published; `deploy.sh` refreshed gh-pages (served
  bundle confirmed by content marker). Live verification (SMOKE_CHANNEL=
  chromium): **Pages** hub + os + anthology exit 0; **Workers** hub + os +
  anthology exit 0 — console stations/season/archive asserted, the M8.1 shell
  exercised by the full 5-anchor playthrough on both hosts. Getting there
  root-caused three failure modes (see §7b — operational learnings): Chromium
  async-DNS stall under WSL2 (fixed: launchAuditBrowser), an invalid
  cross-base hash comparison (40-min false alarm, my error), and three latent
  smoke contracts that only live hosts expose (fixed: gotoHub + destination/
  mount proofs; follow-up noted for exam/radar/case-os). All 8 gates green on
  the final tree (76/76 tests, 8/8 smokes local, nav-perf exit 0 coldBoot
  30 ms). Work packet: deployed=true. Next: M8.2 lock screen + home launcher.
- **2026-11-11 (a)** — M8.1 THE IPHONE PASS · the device shell (checkpoint reached,
  NOT committed): track M8 opened on the user's FoundPhone-Studio pointer
  (cloned to /tmp/foundphone-studio — patterns + metrics only, never assets;
  ladder + material unknowns recorded in GAME-PLAN.md M8). The shell is now
  iPhone 15 Pro-true: `engine/os/ios/tokens.css` (dark-mode system palette,
  system-font clock, iOS ease; the screen is a size container and island/status
  metrics are in cqw against the 393 grid so the top band is proportionally
  correct at every width), `ios/metrics.ts` (IOS_DEVICE + IOS_HOME_GRID for
  M8.2), status bar in iOS grammar (code-drawn signal/wifi/battery SVGs, mute/
  power/bell kept with canon aria-labels; battery % numeral + meridiem retired
  from the row), DynamicIsland (bell-slash when muted, data-state API for M8.3;
  z above every overlay — hardware does not scroll under chrome — pointer-inert
  so the shade strip owns the pull-down), iPhone corner radii, aspect-true desk
  stage (393:852, min-h 640). Prior M6.7 packet archived at
  docs/work/blackglass-operator-console.json (still uncommitted, awaiting
  authorization). Gates on the final tree: tsc clean, 76/76 tests, build green,
  3.7 MB budget, 8/8 smokes exit 0 (anthology = the shell regression net),
  nav-perf exit 0 (coldBoot 30 ms), visual probe verified island+status on desk
  stage and POV 360 (/tmp/m81-probe.mjs). Next: commit on authorization → M8.2
  lock screen + home launcher.
- **2026-11-10 (d)** — wrapup recovery (Qoder): the zcode session stalled after
  the M6.7 review rework, and (c)'s gate claims predated two rework typos —
  App.tsx's history wrapper was a this-param arrow (TS2730/TS2683, build
  broken) and nav-perf.mjs had a stray `await heldRoute = null` (SyntaxError,
  gate unparseable). Both fixed; ALL gates re-run on the final tree: tsc +
  build clean, 76/76 tests, 3.7 MB budget, 8/8 smokes exit 0 zero console
  errors (hub axe clean, seeded season stamps asserted), nav-perf exit 0
  (hover prefetch proven with idle warm-up isolated, boot during the held
  fetch, cold boot 95 ms, throttled nav 0.6–2.6 s). Docs aligned to the code
  (`RouteBootGate`, key 6 toggles). Work packet finalized: wrapup/complete,
  review rework verified, deployed=false. Six unreferenced probe-*.mjs debug
  scratch files remain untracked — delete or exclude at commit. Tree NOT
  committed — awaiting user authorization.
- **2026-11-10 (c)** — the operator's console (M6.7): the hub rebuilt as the
  desk itself (stations with silhouette + LED + one line + record stamp, the
  glassbox lab kept with its live paper readouts, the season badge, one
  archive drawer for all six legacy pieces, keys 1–5 jump + 6 opens the
  archive, Tab reaches all) and the route boot (`app/RouteBoot.tsx` +
  `RouteBootGate` in App.tsx) replacing the bare black-page fallback — Router
  v7's startTransition retains the stale page, so the overlay covers it
  whenever the destination chunk isn't warm. Chunks warm on hover/focus + one
  idle pass (`app/prefetch.ts`), gated by the throttled `scripts/nav-perf.mjs`
  with isolated assertions (idle warm-up disabled via the `__BG_SKIP_IDLE_WARM__`
  seam → hover proven to fire the chunk request; warm click-through mounts the
  destination's own heading; cold programmatic click shows `.route-boot` at
  ~110ms and then the exam mounts; zero console errors). Season parsers pure +
  tested (`app/season.ts`: zero-point cases and legacy booleans read as
  worked). GameCard/PILLAR_META brochure chrome retired; exam smoke opens the
  archive drawer for the legacy-iframe check. Independent review VERDICT
  rework (5 findings) folded in, gates re-run: tsc clean, 76/76 tests, build +
  3.7 MB budget, hub smoke asserts the seeded stamps (159 · WATCHER / 184 pts
  / 73% best) + drawer, all smokes + nav-perf exit 0, axe clean. Tree NOT
  committed — awaiting user authorization.
- **2026-11-10 (b)** — one desk across the suite (M6.6): the anthology's grade
  language extracted to `src/games/shared/` (grade.ts pure / desk.tsx UI),
  Feed Triage rebuilt as a shift at the feed desk (live signal meter + grade,
  verdict-tone desk sounds, debrief as the verdict dossier), radar case debrief
  + Tell Exam results onto the same stamp, Hub YOUR SEASON strip (localStorage
  reads only — lazy boundaries hold), radar ⇄ anthology cross-links, unified
  `✓ worked · signal N` case stamps. Review rework folded in first (all 5
  findings: best-case records award-once, 0-point completions worked, case-file
  objective, exam/hub smokes assert the new surfaces). Gates: tsc clean,
  70/70 tests, build + 3.7 MB budget, all eight smokes exit 0, axe 0
  serious/critical. Committed `6de80db`, pushed `main` → Workers Builds
  published; `deploy.sh` refreshed gh-pages. Verified live: Workers hub strip +
  feed desk probe exit 0 zero console errors, full anthology smoke exit 0;
  Pages hub/radar/exam smokes exit 0 (radar needed one retry — busy system).
- **2026-11-10 (a)** — shipped the signal desk (M6.5) + the inhabited POV shell:
  committed `7d5ab3e`, pushed `main` → Workers Builds published, `deploy.sh`
  refreshed gh-pages. Verified live: anthology smoke exit 0 with zero console
  errors on the Workers host (full 5-anchor playthrough incl. the new verdict
  beats), Pages serving the new bundle. Review rework folded in beforehand:
  Ask citation sources count as clue points, touch-none swipe surfaces, AA
  ink-500 (5.1:1 rendered), toasts clear of the reply dock. Smoke repairs:
  base-aware `gotoGame` (Workers mounts the anthology at `/blackglass`),
  finale seeded for the 13-phone season, shade aligned with moment-to-thread,
  os-smoke self-healing thread re-entry (5× green). Both hosts answered 200 at
  close; `SHOT_BASE=<host> SMOKE_CHANNEL=chromium` runs smokes where system
  Chrome is absent.
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
