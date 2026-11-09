# BLACKGLASS — Fresh Repository Evaluation (2026-11-08)

Tree evaluated: `main` @ `84565d0` (synced from the Windows line) **plus the seven
uncommitted files of the `glassos-inhabited-pov` pass**, re-applied and conflict-resolved
during this session's repo sync. Branch `immersion-pass-2` @ `0269cb2` imported and
pushed, deliberately **not merged** (pending user review per its work packet).

Method: executable gates re-run on the synced tree in WSL; red smokes cross-checked
against a clean `84565d0` detached worktree to separate pre-existing staleness from
sync/POV regressions; independent whole-repo audit (docs, guardrails, code, tests,
CI/deploy, a11y, hygiene); live-host probes. Windows repo decommissioned after
proof of containment (record in §4).

---

## 1. Gate evidence (run 2026-11-08, WSL)

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm test` | 45/45 across 7 files |
| `npm run build` | clean; PWA precache 44 entries (1777.65 KiB) |
| `npm run assets:budget` | 9 artifacts within ceilings, Σ 3.7 MB, no dist duplication |
| axe (os home, os debrief) | 0 serious/critical; minor landmarks/region only |
| E7 `shot-diff compare` | **red**: hub 1.71%, radar-menu 2.05%, anthology-maya 1.93% (cap 0.5%) — baseline recorded 2026-10-05 (`0f02607`), predates the design pass, Glassbox 02, Anchor V and POV; drift is shipped change, not regression |

Smoke matrix (local preview, 8× pace unless noted):

| Smoke | Result | Note |
|---|---|---|
| os | ✅ | one 8×-pace timeout on first run, green on retry (flaky, see E6) |
| anthology | ✅ | all five anchors end-to-end |
| case-os, radar, exam, glassbox, feed-dial, hub | ✅ | |
| resume | ✅ | POV's own smoke; adapted this session to the moment-to-thread contract (the Oct-28 flow opens the GC thread directly from the moment button; the smoke's intermediate home visits no longer exist). Exercises power lock, rack resume, wake-locked, swipe unlock, shade pull, single narration |
| compare, finale | ❌ | **pre-existing**: identical failures on clean `84565d0` worktree (stale moment-flow expectations) |
| artifact, shade, cadence | ❌ | documented stale on main since `845dd57`; repaired **only on `immersion-pass-2`**, which is unmerged |

Live hosts: **primary `https://blackglass.sammatuba.workers.dev/` is alive and
verified** — deep links work (Workers SPA fallback), the rack renders all five
anchors, and the full anthology smoke passes end-to-end with zero console errors
(exit 0, run via a base-adjusted scratch copy, see E8). Pages
`https://sammatuba.github.io/blackglass/` answers 200; hub renders clean and a live
playthrough reached all five anchors (screenshots `/tmp/bg-1-vc-rack.png` …
`/tmp/bg-21-av-coda.png`) but that run was interrupted before the final verdict.
The subdomain cited in `docs/HANDOFF.md:23` and
`docs/PHONE-IMMERSION-PASS-2026-10-28.md:8,62` —
`blackglass.jansammat26.workers.dev` — is **NXDOMAIN from authoritative DNS
(1.1.1.1)**: a dead old URL, not a dead host (I1).

---

## 2. Findings

No Critical findings. The code layer is healthy; the material risk is canon,
documentation and deploy-story drift.

### Important

- **I1 — Docs cite a dead subdomain and misdescribe the CI/deploy split.** The real
  primary is `https://blackglass.sammatuba.workers.dev/` (user-confirmed, verified
  live and green); `docs/HANDOFF.md:23` and
  `docs/PHONE-IMMERSION-PASS-2026-10-28.md:8,62` still point at
  `blackglass.jansammat26.workers.dev` (NXDOMAIN). HANDOFF's "auto-builds on every
  push to main (CI runs npm test && build)" conflates two things: GitHub Actions
  `ci.yml` is `workflow_dispatch`-only test CI, while the Worker deploy is consistent
  with a Cloudflare Workers Builds git integration (`wrangler.jsonc` assets + SPA
  fallback) — not verifiable from the repo alone. HANDOFF URL corrected this
  session; the historical pass doc left as-record.
- **I2 — Guardrail canon drift.** `world/guardrails.md` is still the Mar-2026
  "DISINFO" charter whose Scam Authenticity Test *mandates* real channels
  (GCash/SMS/Viber/Messenger, `:325`), while `VISION.md:24`, `ROADMAP.md:56`,
  `GAMES.md:58`, `README.md:56` and HANDOFF attribute "depict never enable /
  everything fictional" to that same file. Content follows the old charter
  (`voiceclone.ts:48` GCash, `kangkong.ts:57` tiktok.com handle, `deepfake.ts:48`
  SEC.gov.ph) while `Hub.tsx:142` tells players "fictional brands". No working
  scam template is enabled and the dosage beat contradicts itself in-scene, so
  this is a canon-consistency decision, not a safety hole — but it is user-canon.
- **I3 — Stale smoke net on main.** compare + finale verified red on clean main;
  artifact + shade + cadence red on main and green only on the unmerged
  immersion branch. The regression net currently misses the moment-flow
  contract on main.
- **I4 — Stale E7 baseline.** `shots-baseline/` (2026-10-05) makes the gate red on
  legitimate shipped drift; re-record once POV is approved and merged.
- **I5 — Docs lag the shipped game.** "four anchors / ten phones" persists in
  `README.md:9`, `docs/GAMES.md:11`, `docs/ROADMAP.md:33`, `docs/GAME-PLAN.md:55,74,101`
  against five anchors / 13 phones shipped; `HANDOFF.md:22` cites `1212814`.
  The uncommitted POV work packet's verification section describes the Oct-22
  tree (41 tests, voice deferred) and contradicts shipped main (45 tests, voice
  notes live) — refresh it at POV review.
- **I6 — 11px text floor breached.** 43 `text-[10px]` instances across six files
  (incl. `Device.tsx`, `apps/index.tsx`, tell-exam, scam-radar) against the floor
  stated in `docs/design-system.md:35` and the work packet.
- **I7 — UI layer untested.** 45 cases cover pure logic and the navigation
  contract (all five anchors); no tests for `Device.tsx`, `apps/index.tsx`,
  scam-radar games, tell-exam, `registry.ts`, `Hub.tsx`. Smokes are the only net.
- **I8 — Tracked media duplicates.** ~22.4 MB of binaries with byte-identical
  copies: `dr-anita-still.mp4` (public + play, 2.29 MB each), `legit-baseline.webm`
  and `joy-note.mp3` (×2 each), play PNGs (~2.4 MB ×3) vs public WebP (~227 KB).
  Runtime dedupe exists (`vite.config.ts:22`); the repo still carries both.

### Enhancement

- **E1** Monoliths: `src/engine/os/apps/index.tsx` 1786 lines, `Device.tsx` 1267.
- **E2** `lighthouserc.json` has no `collect.url` and no JS-size budget — the
  "initial JS ≤ 150 KB gz" claim (HANDOFF:110) is unenforced.
- **E3** `wrangler.jsonc:2` `$schema` points at undeclared `node_modules/wrangler`.
- **E4** Non-null-assertion clusters: `FeedGame.tsx:169-191`, `apps/index.tsx:944`.
- **E5** `archive/` holds 21 stale legacy docs; `shots-baseline/` tracked (see I4).
- **E6** os-smoke flaked once at 8× pace (banner/rule-pump race); consider
  pace-aware waits instead of force-click fallbacks.
- **E7** Six smoke header comments (`compare`, `resume`, `shade`, `cadence`,
  `artifact`, `finale`) show `SHOT_BASE=https://sammatuba.github.io/blackglass`,
  but the scripts append `/blackglass/` themselves — the host root is correct.
  Fixed in `resume-smoke` this session; the rest ride with the I3 repair.
- **E8** Smoke entry URLs assume the Pages base (`/blackglass/`): the deep link
  `${BASE}/blackglass/blackglass` is right on Pages but on Workers (base `/`, SPA
  fallback 200s every path) it loads an unmatched route and the hub fallback never
  triggers. A base-adjusted scratch copy (`/blackglass` deep link, `/` hub) passes
  the full suite on the primary. Make `gotoGame` base-aware (probe a rack marker,
  fall in through the hub otherwise) and raise live-host waits; rides with I3.

Otherwise clean: no `console.log`, `any`, `@ts-ignore` or TODO/FIXME in `src/`;
aria-labels present; verdict chips carry text, not color alone; base paths
consistent between vite config, deploy.sh and CI.

---

## 3. Verdict

Functionally sound and honestly gated at the logic layer: the synced tree builds
clean, passes 45/45 tests and the budget gate, and plays all five anchors plus the
POV shell end-to-end with zero console errors and axe-clean serious/critical.
The repository's real debt is documentary and canonical — a primary host advertised
under a dead subdomain, a guardrail file that no longer states the
rule everyone cites, a regression net with six stale smokes and a month-old
visual baseline, and docs describing a four-anchor game. Highest-value next
fixes, in order: reconcile the guardrail canon and the "fictional brands" claim
(I2), correct the cited host URL and CI/deploy description (I1), merge or port the
immersion branch's smoke repairs (I3), re-record the E7 baseline after POV
approval (I4), then the doc/count refresh (I5).

## 4. Sync & decommission record (this session)

- WSL `main` fast-forwarded `7551ff3 → 84565d0` (32 commits; all Windows main-line
  work was already on GitHub).
- `immersion-pass-2` imported from the Windows disk **including its four unpushed
  os-imm commits** (`b162a76..0269cb2`) and pushed to GitHub (`07e8137..0269cb2`).
- POV pass carried uncommitted: stash → fast-forward → pop; `Device.tsx` conflicts
  resolved keeping upstream navigation (`goBack`, dialog guard, return-to stack)
  plus POV power/lock/safe-area behavior; honest conditional exit copy retained;
  `resume-smoke` adapted to the moment-to-thread contract and re-verified green.
- Windows working tree proven CRLF-only (`diff --ignore-cr-at-eol` empty), no
  stashes, ignored files limited to env/build dirs and a handoff JSON duplicating
  imported commit content. `C:\projects\blackglass` deleted after containment
  proof. Residue: three locked win32 `.node` bindings under `node_modules`
  (rolldown, tailwind-oxide, lightningcss) held by running Windows node processes;
  remove after closing those tools or a reboot.
- WSL had no Linux Node; installed v22.23.4 via nvm (Linux `node_modules` and
  Playwright browsers were already present). Smokes ran through an out-of-repo
  loader shim mapping `channel:'chrome'` to the cached Chrome for Testing build.

## 5. Pending user decisions

1. POV phone review → commit the pass (packet constraint), then re-record E7 baseline.
2. `immersion-pass-2` morning review: six Anchor VI canon questions
   (`craft/maya/_meta/anchor-vi-brief.md` §5), play `?draft=vi`, merge or hold.
3. Guardrail canon reconciliation (I2); host-URL and CI/deploy description fixes
   (I1 — HANDOFF URL corrected this session, rest pending).
4. Tito Mike clip remains the last content placeholder (user-side).