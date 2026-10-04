# Overnight session report — eval chain, regeneration, deployment (2026-10-04 → 05)

**TL;DR for the review:** the live game at
**https://sammatuba.github.io/blackglass/** now carries the regenerated diegetic
artifacts (every planted tell verified present), a brand-new **Tell Exam** game, a
deduped/WebP asset pipeline (deploy weight 37 MB → 7 MB), and the full objective-eval
toolchain. Composite design score: **3.8 → 4.5**. One asset remains user-side (the
Tito Mike *clip* — see Handoff). Everything below was executed autonomously per the
aligned plan and is committed on `main` (0f02607 + 8ec1de7) and deployed.

---

## 1. What you can review live

- **The anthology** — every artifact the family is fooled by now visibly carries its
  tells: Tito Mike's garbled-rim government seal + jawline seam; the clickbait
  siblings' dissolving fine print; Dr. Anita's melted bookshelf spines + mismatched
  pearls; the accident photo's garbled plate, dissolving "SURRY MAREPEUTICH" signage,
  and rubbery dent.
- **Tell Exam** (new, TRAIN pillar) — tap where you think the tell is, reveal, scored
  against the manifest's coordinates. Best score stays on-device. This is the
  objective pedagogy measure (E6): it is now *possible* to measure whether the game
  teaches.
- **The legit-baseline clip** — a real public-domain VOA news broadcast (10 s) in the
  manifest, ready to be paired against the deepfake in a writing session.

## 2. The regeneration pass (E1 → agy → E1)

Method per the aligned plan: plant every tell **explicitly** (2026-class models render
flawlessly by default), verify visually before promoting, record provenance in the
manifest. Run through your authenticated `agy` CLI (Antigravity 1.2.16, Gemini image
subagent via Google AI Pro OAuth).

| Artifact | Tells planted | E1 before → after |
|---|---|---|
| tito-mike-deepfake | garbled-rim seal (at manifest coords x 0.8, y 0.2) + jaw seam | 0/1/1 → **2/2/1**¹ |
| kangkong-clickbait | dissolving fine print (coords updated) | 2/2/**0** → **2/2/2** |
| ampalaya / malunggay | matching fine print (batch sameness intact) | 2 → **2** each |
| dr-anita-still | melted spines + mismatched earrings | **1** → **2** |
| clone-accident-photo | garbled plate, dissolving signage, rubber fold (coords updated) | 1/1/1 → **2/2/2** |

¹ `mouth-phoneme` is temporal by design — it lands fully only in the clip.

**Before → after tally: 5× present / 6× weak / 2× absent → 12× present / 1× temporal /
0× absent.** Full tables: `docs/tell-survival-baseline.md` (re-audit section on top).
The Tell Exam's item data regenerates from the same manifest, so the exam plays against
the verified coordinates.

## 3. Platform work shipped in the same chain

- **Artifact pipeline** — one dist copy in `public/artifacts/` (WebP q80 canonical:
  51–234 KB vs 1.7–2.4 MB PNGs); legacy iframe retargets via a probe shim;
  `npm run assets:sync` emits `artifact-list.ts` / `exam-data.ts` / `voice-list.ts`.
  **dist/ 37 MB → 7.0 MB; PWA precache → 1.64 MB; budget gate green.**
- **Eval automation** — E3 axe-core inside os/radar/hub smokes (serious/critical clean),
  E5 `npm run assets:budget`, E7 `npm run shots:diff` (baseline re-recorded after the
  intentional asset drift), E2 transcript capture + first playthrough judgment
  (`docs/e2-playthrough-judgment.md`: voiceclone PASS on all four criteria).
- **Voice notes** — engine path live (`OSMessage.audio` → `voicenoteUrl`); Joy's note
  and the cloned-Renz wiring are in the content; synthesized pacing plays until files
  exist. Generator worksheet: `play/blackglass-phones/GENERATE-VOICE.md`.

## 4. Failures hit and fixed (for the record)

1. **agy OAuth expiry mid-session** (401) — paused, you re-authed, resumed.
2. **Orphaned `agy.exe` after a TaskStop silently blocked all new dispatches** —
   diagnosed via tasklist; killed; queue cleared. Lesson: check for orphans before
   retrying.
3. **`--print-timeout` breaks agy's argument parsing** (prints help) — dropped; shell
   timeouts bound instead.
4. **The legacy shim's relative path was one level short** (`../../artifacts/`) — and
   the local check false-positived through vite preview's SPA fallback (HEAD 200 on a
   404). Caught live; fixed to `../../../artifacts/` (the viewer iframe lives under
   `legacy/play/`), redeployed, verified on production.
5. **Deep links 404 on GitHub Pages** (no SPA fallback) — the exam smoke now falls in
   through the hub cards, mirroring the anthology smoke's existing pattern.

## 5. Handoff — what needs you (in priority order)

1. **The Tito Mike clip** — the still is regenerated and clip-ready, but agy has no
   video path (it declined plainly). Generate the 10 s i2v via your **Google AI app
   (Veo)** as you did for the Dr. Anita pilot: source =
   `play/blackglass-phones/assets/tito-mike-deepfake.png`, the endorsement line and
   tell requirements are in `GENERATE-VIA-AGY.md` §5, including the exact `at`-tells
   edit for `deepfake.ts` (do not add `at` before a clip exists — the tells layer
   renders timestamps unconditionally). Budget ≤5 MB; `scripts/transcode-clip.mjs`
   compresses if needed.
2. **Voice notes** — run `GENERATE-VOICE.md` (Kokoro + Chatterbox; ~30 min setup).
   The moment the mp3s land in `play/blackglass-phones/voice/` and you run
   `npm run assets:sync`, Joy's 22 s note and the cloned Renz play for real.
3. **Your review** of the deployed design pass + regenerated artifacts — especially
   whether the planted tells are findable-but-not-glaring to *your* eye (that
   judgment stays yours).
4. **M6 (THE ASSISTANT)** — deliberately not started: the brief's §8 has four open
   canon questions that are yours (assistant name, dosage-beat sensitivity, one
   vendor vs three, ordering vs a fifth cast anchor). Answer those and the writing
   sessions can start.

## 6. State

- **Deployed:** https://sammatuba.github.io/blackglass/ (gh-pages, live-verified:
  hub clean, Tell Exam playable, legacy mirror loads platform-copy WebP, zero console
  errors on the checked surfaces).
- **Committed:** `main` @ 8ec1de7 (two commits: the session + the live-deploy fix).
- **Tests/build/gates:** 27/27 unit tests, build clean, asset budget green,
  axe serious/critical clean, shot-diff baseline re-recorded.
- **Not verified live:** radar/os smokes (their deep links 404 on Pages; locally
  green — same hub-fallback pattern is available if you want them live-checked).
