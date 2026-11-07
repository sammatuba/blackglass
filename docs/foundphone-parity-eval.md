# glassOS vs FoundPhone-Studio — framework parity evaluation

*2026-11-07 · evaluated tree: `immersion-pass-2` @ `07e8137` · reference: [keoyyo85/foundphone-studio](https://github.com/keoyyo85/foundphone-studio) (MIT)*

FoundPhone-Studio (捡手机) is the engine-pattern source named in [`docs/IMMERSION-FRAMEWORK.md`](IMMERSION-FRAMEWORK.md) §0/§2 — this evaluation checks what the immersion pass actually landed against the framework itself, dimension by dimension. Verdicts: **parity** · **partial** · **divergence (deliberate)** · **gap**.

## 1. Scorecard

| # | Dimension | FoundPhone-Studio | glassOS (`immersion-pass-2`) | Verdict |
|---|---|---|---|---|
| 1 | Story/UI separation | JSON `story.json` → compiler → immutable `Work`; no scripts in data | Typed `CaseOS` literals in `content/*.ts` (7 files, ~4.6k lines) + pure `runtime.ts` + `Device.tsx` shell; content files carry zero React | **parity** (stronger typing, no non-dev surface) |
| 2 | Event graph vocabulary | `start/openApp/read/password/choose/variable/time/callAnswered/Declined/Ended`; conditions over `visited:/read:/clue:/unlocked:/completed:/ui:` | `OSRule.when`: `flag/allFlags/notFlag/replySent/call/callDeclined/inspected/dwell`; actions: `push/set/evidence/incomingCall/endCall/nudgeApp/moment/stage` | **parity + 1** (see §3) |
| 3 | Calls | Full overlay, answer/decline/end, authored audio | `incomingCall` overlay with transcript, direction, decline state; `endCall` rule action; voicenotes with real audio (`audio` field) | **parity** |
| 4 | Reachability as quality bar | Validator: every ending needs ≥1 engine path; dangling refs/passwords/untested endings fail; `tests` field replays steps | `npm run reachability` (P9): fixed-point satisfiability per phone — every endFlag + outcome has a flag chain, every ref resolves, artifact/voice files exist on disk; wired into `npm test`; committed ledger; season GREEN | **parity (static) / partial (replay)** |
| 5 | Hidden content & unlocks | `password` on items, `unlock` action, tests must supply passwords | `requires` gates on photos/calendar/wallet/replies + evidence labels; no password puzzles (deliberate, framework §4) | **parity on unlock mechanics; divergence on passwords (deliberate)** |
| 6 | Offline & deterministic | No runtime model calls; offline after first cache | PWA precache 44 entries; no runtime AI; deterministic pump | **parity** |
| 7 | Ambient completeness | 49 apps + App Store + folders/dock + control center + long-press customization | 10 real apps + dock + P6 ghost tiles; Calendar+Wallet on **all 13 phones** (contract-tested); no folders/control-center/store | **partial (deliberate)** |
| 8 | Virtual clock | `delayMs` on an in-fiction clock; pending jobs persist in saves; clock pauses when phone closed; `time` events at boundaries | Delivery delays are pacing-derived (`pacing.ts`); no in-fiction clock, no `time` condition, no persisted scheduled jobs | **gap** |
| 9 | Saves vs revision | Save keyed by work id records content `revision`; bump = fresh start **with an in-fiction message** | `cgAI_blackglass_v2` degrades gracefully (stage→clean, idle→0); no revision field, no announcement | **partial** |
| 10 | Authoring surface | `story.json` + NL→JSON pipeline + blank template + STORY_SCHEMA — aimed at non-coders | Anchor briefs (`craft/maya/_meta/`) + typed TS literals — aimed at AI coding tools | **divergence (deliberate for a solo project)** |
| 11 | Notification history | Notification center with history | Pushes land in threads; no notification shade | **gap (minor)** |

## 2. What the immersion pass closed

The framework doc itself flagged the gaps (§2.4 "no per-ending path evidence", §2.6 "eight functional apps on an otherwise empty grid") and the overnight build answered them:

- **P9 → landed.** `src/games/blackglass/reachability.ts` + committed `docs/REACHABILITY-LEDGER.md`; caught 2 real content gaps on first run (unlabeled evidence). This is the framework's core quality-bar idea, implemented.
- **P1 → landed.** Calendar + Wallet on every phone with per-character data; the wallet doubles as the accusatory ledger with `requires`-gated rows and tap-to-reveal verdict meta — FoundPhone's ambient-completeness thesis ("an inhabited phone has apps that exist for the person, not the player") adopted without its 49-app noise.
- **Cross-app events (§2.2) → landed and exceeded.** `moment.openApp`, xref lines on contacts, photo `meta.pageId`, `nudgeApp` — the framework's `visited:`/cross-app vocabulary is fully expressed.

## 3. Where glassOS is ahead of FoundPhone-Studio

- **`dwell` rules (P5)** — unprompted pushes after idle beats. FoundPhone's engine has no idle-seconds condition; "the game reaches back" comes from the ax0x series, not FoundPhone.
- **Staged theming (P4)** — `phone.stage` (clean→uneasy→compromised) moving chrome via rules, per-anchor signature distortions, reduced-motion paths. FoundPhone themes are static config.
- **The silence primitive (P8)** — `kind:'silence'` bubbles with a delivered receipt that never becomes read; band-clamped pacing. FoundPhone has delays but no silence-as-beat type.
- **Performed mirror epilogues (P7)** — Anchor VI's report is assembled from the run's own recorded flags (`own-report-full` vs `own-report-partial`). FoundPhone endings are nodes, not performed artifacts of player behavior.
- **Season-level state** — cross-phone flags (`allFlags`, `initialFlags`, `done_maya` seed, Convergence reading the season). FoundPhone stories are single-phone; the anthology carries choices across devices, which their schema has no concept of.

## 4. Gaps, ranked

1. **The virtual clock (framework principle 3 — the only P1–P9 principle with no landed or attempted phase).** FoundPhone schedules beats on an in-fiction clock (`delayMs` persists in saves, `time` events fire at clock boundaries, the clock pauses when the phone is closed). glassOS rules fire on a beat pump; content cannot say "the 9:41 push" or "the call at 8:12 PM", pending jobs don't persist, and timeline reconstruction (the scam-choreography puzzle our own P2/P3 pedagogy wants) is impossible without it. Highest-value next engine work.
2. **Replay-verified endings.** Our ledger proves paths *satisfiable* (conservative static walk, "optimistic on purpose"); FoundPhone's `tests` field *replays* steps in the engine. Cheap upgrade: drive `runtime.ts` through the ledger's setter chains in vitest — converts "satisfiable" into "drivable" with the code we already have.
3. **Revision-aware saves.** Our §2.5 proposal ("This phone's data was restored from a newer backup") is unbuilt; content changes that invalidate old runs silently default. Add a `revision` to `CaseOS` and an in-fiction announcement on mismatch.
4. **Notification shade/history** — minor; supports P5's "history that matters on re-read".
5. **Non-dev authoring surface** — irrelevant solo, but if glassOS content is ever opened to other writers, FoundPhone's story-JSON + validator pipeline is the pattern to copy.

## 5. Divergences affirmed

Re-checked against framework §4 and still correct: original app set (no brand skins — their `BRAND_NOTICE.txt` exists for a reason), no runtime model calls, manifest artifacts + 3.7 MB budget over JSON data-URL inlining, no passcode friction, no borrowed scenes/characters. The FoundPhone-Studio borrowing stays at the engine-pattern layer where the framework doc scoped it.

## 6. Bottom line

**Structural parity achieved; the remaining delta is one engine primitive (the story clock) and two hygiene items (replayed endings, revision saves).** The immersion pass bought the ambient-completeness and reachability pillars the framework demanded, and the season's dwell/stage/silence/mirror primitives are beyond FoundPhone's vocabulary. Natural next work package: virtual clock + replay harness in one pass — they share the same rule-pump surface.
