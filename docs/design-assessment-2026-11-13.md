# BLACKGLASS — Design Assessment: immersion, coherence, pacing (2026-11-13)

**Brief:** "What I really want blackglass to be is an immersive phone game. Right now
we're able to capture it, but blackglass as it stands has a very incoherent and
disjointed story. The flow is also too fast — the player isn't being progressively
eased in." Full assessment across game design, storywriting/dialogue, and mechanics,
using the diegetic/non-diegetic/spatial/meta UI framework (Fagerholt & Lorentzon,
2009) as one lens.

**Method.** Direct read of all five anchor content files (`kangkong`, `voiceclone`,
`deepfake`, `fiveweeks`, `assistant`), `convergence.ts`, the anthology orchestrator
(`Anthology.tsx`), the pacing engine (`pacing.ts`), the hub path, and the prior
evaluations (`docs/game-design-eval.md`, `docs/evaluation-2026-11-08.md`, both E2
playthrough judgments, `docs/PHONE-IMMERSION-PASS-2026-10-28.md`); three parallel
structure audits (trainer mechanics, craft docs, platform shell). Every load-bearing
claim below cites a file. **Method limit:** pacing feel is judged from the constants
and code paths plus the recorded cadence audits, not a fresh moderated 1× playthrough —
watching 3–5 first-time players at real pace is part of the recommended program (§7 M9.5).

---

## 1. Executive verdict

**The writing is not the problem.** Line-level dialogue in this repo is genuinely
strong — voice-consistent, culturally dense, dignity-first. It has already passed
mechanical playthrough judgments against acceptance criteria
(`docs/e2-playthrough-judgment.md`, `docs/av-playthrough-judgment.md`: PASS on all
criteria). A rewrite would spend effort on the wrong layer.

**The disjointedness is architectural, and the speed is a staging decision that was
never made.** Five coherent short stories sit behind a menu that presents them as
five unrelated buttons with a score meter on top. The connective tissue the design
bible specifies (an act structure, sequenced recognition, frequency-as-characterization
pacing) was specified in `craft/` and never shipped: the echo system that lets one
phone react to another exists in the engine and is consumed by only 2 of 5 anchors;
the "Normal Day" act exists only in the unshipped Gen-1 arc; the pacing constants
deliver every story chain in 10–15 seconds of wall-clock. The player is eased into
nothing — not the form, not the family, not the season.

**The prior 4.5 composite (`docs/game-design-eval.md`) measured build health, not
player experience.** Scored honestly on the experience facets, the anthology is a
~2.7/5 immersive phone game wearing a 4.5/5 engine. The gap between those two numbers
is exactly the work this assessment scopes (§7).

---

## 2. What is already strong (do not touch)

These are assets the program below builds on, not fixes:

- **The phone shell is best-in-class diegetic UI.** Lock screen with data-honest
  widgets, banners, shade, typing indicators derived from message beats, human-cadence
  delays, call overlay with transcript, evidence loop, resumable live runs
  (`src/engine/os/Device.tsx`, `pacing.ts`, `runtime.ts`). The genre conceit — the
  interface IS the game — is executed, not claimed.
- **Voice consistency and characterization.** Scammers hold servile po-register under
  escalation (*"Tita naman po eh!! … Lagpas na po sa cashier yung oras!!!"* —
  `voiceclone.ts`, `os-voice.ts:118`); family members have stable signatures across
  anchors (Tita Baby recurs in `os-voice.ts:34` and `os-guaranteed.ts:32`); the family
  GC functions as a counter-voice, not set dressing (`os-guaranteed.ts:148`).
- **Cultural specificity that does work.** GCash flows, vouching chains, utang na
  loob as a choice engine, Noche Buena, padala arithmetic — the craft docs
  (`craft/maya/_meta/character-baseline.md` §5) treat these as pressure systems, and
  the shipped content honors that.
- **The teaching mechanic under the fiction.** The Ask app's citation-verdict drawer,
  regen-that-grows-detail, thumbs-that-raise-confidence (`assistant.ts:146–159`,
  `runtime.ts:144–172`) is a genuinely original antagonist design.
- **The Convergence throughline.** `convergence.ts:351–359` is the thesis of the
  whole season and it lands: "Every defense became the next surface… Nobody was
  scammed. Everyone was certain."

---

## 3. Diagnosis A — why it feels disjointed (five causes)

### A1. The anthology is a menu, not a season

All five anchors are open from the first tap; only the Convergence is gated
(`Anthology.tsx:289–321`, `progress.ts:68–74`). The player meets the game as five
equal cards plus a season-signal meter — while the fiction's own chronology (Saturday
morning → Tuesday evening → Sunday afternoon → five weeks → a later Tuesday) exists
only inside the Convergence intro (`convergence.ts:27`). Nothing on the way in says
*this is one family's season, lived in order*. The craft bible's own rule — "order is
load-bearing" (`craft/maya/_meta/phone-anthology-architecture.md`, build-status) — is
implemented *within* Anchor I (Maya gates Tita and Bea, `Anthology.tsx:587`) and
nowhere else.

### A2. The echo system exists but is barely used

The engine seeds every run with `done_<phoneId>` and `done_<anchorId>` flags so
content can react to what the player has already lived (`Anthology.tsx:693–709`).
Consumed by:

- **kangkong** — Tita and Bea each get one recognition beat keyed on `done_maya`
  (`kangkong.ts:362–374`, `578–596`). These are among the best beats in the game.
- **assistant** — three beats keyed on `done_voiceclone` / `done_deepfake` /
  `done_fiveweeks` (`assistant.ts:176, 396, 634`).
- **voiceclone, deepfake, fiveweeks** — **zero** `done_*` references. Three of five
  anchors are sealed units that neither echo nor react. Playing II → III → IV in
  order feels like three unrelated demos; the family you met on Saturday has never
  heard of the scam that emptied Tita's GCash on Tuesday.

This is the single most mechanical explanation for "incoherent and disjointed": the
Rashomon promise ("the same events refracted through different inboxes") is kept
inside one morning and abandoned across the season.

### A3. The frame hands you from a website to a person with no ritual

The player's first ~60 seconds are website voice: marketing hero ("An explorable
suite for the age of synthetic media" — `Hub.tsx:94–96`), SaaS copy ("no account,
and your season stays on this device" — `Hub.tsx:107–110`), hotkey instructions
(`Hub.tsx:123–125`), and a footer citing a repo file path (`Hub.tsx:206`). Then
suddenly the game asks them to *be* Tita Merly at 5:43 AM. The only frame-shift
afforded is a 3.4-second boot card that spends its five lines on roman numerals and
engine branding — "Anchor I", "The case", "glassOS 4.0 · signal acquired"
(`Anthology.tsx:147–162`) — instead of pulling the player into the person whose
phone they are about to hold. Jargon stack in the first minute: Anchor / case /
glassOS / signal / rack / verbs (DECIDE · FORWARD · CONSULT · SCROLL).

### A4. The pillars leak into the story's space

Tell Exam references story events a trainer-first player hasn't lived ("Maya knew
this on sight; she designs these" — `exam-data.ts:31`); Scam Radar's menu points at
the anthology ("Live them from the inside, then come back" — `scam-radar/index.tsx:186–201`)
but nothing checks; Glassbox quotes ₱18,500 and Tita Merly (`OneInAThousand.tsx:138–149`)
with no mechanical or narrative connection either way. From the player's seat this is
a website with five games, two of which quote a story they may not have played. The
suite's meta-labels (minutes, scores, "no score", "5–7 min") ride on every surface,
including inside the anchor cards.

### A5. Canon drift inside the fiction

- `world/guardrails.md` still mandates *real* channels (GCash/SMS/Viber, §325) while
  README/VISION/ROADMAP attribute a "fictional brands" rule to it, and `Hub.tsx:142`
  tells players "fictional brands" while content ships GCash/tiktok.com/SEC-shaped
  surfaces (`docs/evaluation-2026-11-08.md` I2 — flagged, unresolved).
- Maya's age/residence differs across generations (24 with lola in
  `game-design-v2.md` §8.1 vs late-20s semi-independent in the architecture doc §3) —
  never reconciled.
- The guardrails commandment "Internal monologue: None — the player IS the character"
  (`world/guardrails.md` §3) was quietly overridden by the Gen-2 narrator form
  (bracketed interiority asides, per-phone narrators) without the documented revision
  the project's own craft guidelines require when an override recurs
  (`craft-guidelines.md` header rule).
- Bea's voice is "load-bearing-but-loquacious" — she ran ~575 words on a 250–350
  brief and the prescribed editor pass is not recorded as done
  (`craft/maya/_meta/phone-anthology-tests-2026-05-06.md`).

None of these are line-level problems; all of them are the kind of drift that makes
a world feel unattended.

---

## 4. Diagnosis B — why it feels too fast (five causes)

### B1. The pacing constants deliver "brisk chat", not "slow burn"

At 1× (`pacing.ts:40–57`): typing 0.9–2.9s, same-burst follow-up 0.42–0.94s, prose
air 1.05–2.6s, settle 0.5–0.9s. A seven-message story chain — Maya's EXPOSED teach,
say — lands in ~12–15 seconds of wall-clock. A 60-word narration paragraph gets ~2.6s
of reading air; at ~200 wpm it needs ~18s. The engine *has* the human-cadence idea
and the craft docs specify frequency-as-characterization (Tita's 7-before-7AM bursts,
scammer rapid-fire — `character-baseline.md` §2) as a *pacing lever*
(`game-design-v2.md` §2.5: slow drip vs flood, typing indicators, delayed
consequences). What shipped is one uniform, snappy cadence for everything.

### B2. The crisis arrives inside the opening burst

Maya: unlock → interior moment → the teach chain fires → the four-way defining
choice is on screen — inside ~90 seconds of first unlock (`kangkong.ts:119–139`,
rules `164–218`: the choice set is static, the teach chain fires on dismissing the
first moment). The craft bible's Act 1 is named "Normal Day — slow/naturalistic"
(`game-design-v2.md` §3.3) and specifies beat grammar
(notification → observe → choice → consequence, 2s beats — `character-baseline.md` §6);
the shipped game has no normal-day act. Tita's kitchen scene (`kangkong.ts:277–294`:
tuyo, Papa's fan, quarter-past-six) is the model ease-in — and it is the exception.
Voiceclone's Tita gets one moment and then the voice note (`voiceclone.ts:46–77`).

### B3. There is no elapsed-time or ambient-life mechanism

Compression from hours to minutes is never *perceived* — there are no time-skip
beats, no ambient filler between story rules, no off-screen accumulation. The one
exception proves the design: fiveweeks marks time with week headers and follower
counts (`fiveweeks.ts:35, 72, 99, 129`), and it is the anchor where drift — the
slowest scam — is the subject. The engine could stage ambient beats between rules
(the pump already single-flights rules and queues re-runs, `Device.tsx:125–229`);
no anchor authors them beyond 2–3 texture messages in the opening burst.

### B4. Progression doesn't accumulate, so nothing can build

Each anchor opens on a fresh crisis with re-introduced characters; nothing is recalled
(A2), nothing unlocks (all five anchors open), nothing changes the world. The
intended macro-arc — Act 1 slow → Act 2 tightening → Act 3 reckoning
(`game-design-v2.md` §3.3, instantiated in the unshipped 12-scene Maya arc,
`craft/maya/arc.md`) — has no shipped counterpart. The Convergence gate is the only
progression event in the anthology, and it arrives after the story is over.

### B5. The meta-layer actively pushes the player through

Minutes estimates on every surface ("5–7 min" per phone, "~4 min" feed shifts), the
boot card's progress bar and auto-finish, the season-signal meter with rank gaps
("159 · WATCHER" stamps, "N to next rank" — `Anthology.tsx:226–244`, `season.ts:59–72`),
clue counters on cards — all optimize for completionist speed. VISION.md:12 promises
"No scores, no lessons on the wall. The form is the lesson" for PLAY; the shipped
anchor select leads with a score meter and rank (`Anthology.tsx:223–246`). A player
told the phone costs 5–7 minutes will spend exactly that and no more.

### The compounding effect

Fast constants (B1) + immediate crisis (B2) + no ambient time (B3) + no accumulation
(B4) + completionist pressure (B5) mean the player experiences five 5-minute
incidents, not one family's season. Ease-in is not currently *missing polish* — it is
missing *staging*, and the staging was fully specified in craft/ and never built.

---

## 5. The diegetic-UI audit (Fagerholt & Lorentzon lens)

The attached framework classifies every UI element on two axes — fiction (can
characters see it?) and geometry (is it in the world?) — and its central production
principle is the **narrative contract**: blackglass makes the strongest immersion
promise in games ("the phone is real", "you are the character", screenshot test —
`world/guardrails.md` §II, §III), so persistent player-only overlay on a diegetic
surface is a contract breach by the framework's own definition. The framework also
says (Principle 4) non-diegetic UI is a legitimate design tool when restrained and
*contextual* — the sanctioned space for it here already exists: the debrief
(the Debrief Contract, `world/guardrails.md` §8).

| Surface | Type | Verdict |
|---|---|---|
| glassOS: lock, status bar, island, Messages, GCash, Browser, Contacts, Notes, Phone, Settings, shade, banners, call overlay | **Diegetic** | The suite's core asset. Deepen, don't dilute. The dynamic island is currently a static notch awaiting the planned M8.3 data-states (`Device.tsx:879–895`). |
| sys narrator (`narr`/`aside` in threads) | **Meta** (fiction-implied, screen-expressed) | Mostly works — the phone carrying a narrator is an authored choice. Breaks when it addresses the sandbox: "Test-tapped Pay on the fake checkout (sandbox — nothing was charged)" (`os-parcel.ts:97`), "Four households saved… — end of case —" (`os-parcel.ts:168`). Inside the anthology it stays in-voice; inside the trainer cases it leaks the trainer's voice into the found-phone conceit (`types.ts:1–4`). |
| Season-signal meter, rank stamps, clue counters, "phones lived" pills, minutes labels, hotkey hints | **Non-diegetic, persistent** | Contract breach where it sits on in-fiction surfaces (anchor select, rack). Exactly the framework's "persistent, prominent non-diegetic elements displaying constant data" that it names the primary source of immersion disruption. Belongs in the debrief and the hub only. |
| Hub hero, RouteBoot, LegacyViewer, footer | **Non-diegetic, first-touch** | "Booting… The first visit warms the cache — later visits open instantly" (`RouteBoot.tsx:19–25`) — a loading screen explaining HTTP caching mid-journey. `world/guardrails.md` path shown to players ×4 (`Hub.tsx:206`, `Anthology.tsx:326, 663`, `scam-radar/index.tsx:217`). |
| Desk layer: PhoneStage mood lighting, SignalDesk rails, desk-glow pulse | **Meta** (character state as environment) | Good hybrid — keep. |
| Trainer debriefs, Tell Exam reveal, Glassbox close | **Non-diegetic, contextual** | Correct placement per the Debrief Contract. The fix is not to remove these but to stop the data from migrating *into* the fiction. |

**The one-line conclusion of the audit:** blackglass built a diegetic interface and
then smeared a scoreframe over its menu screens. The framework's fix is
reclassification, not deletion — every non-diegetic element gets a sanctioned home
(debrief, hub, archive), and in-fiction surfaces get cleaned.

---

## 6. Facet scores (player-experience rubric)

The repo's rubric style (`docs/game-design-eval.md`), applied to the facets that
rubric did not measure. Every score cites evidence above.

| # | Facet | Score | Basis |
|---|---|---|---|
| 1 | Core loop & mechanics (engine) | **4.5** | Unchanged from prior eval; verified strong. |
| 2 | Line-level writing & dialogue | **4.5** | §2; both E2 judgments PASS; canon drifts are §A5, not line faults. |
| 3 | Story architecture & season coherence | **2.5** | §A1, A2, A5 — strong skeleton (verbs, failure modes, convergence thesis), but 3/5 anchors sealed, menu-not-season, undocumented canon drift. |
| 4 | Pacing & ease-in | **2.0** | §B1–B5 — no act structure shipped; crisis in opening burst; no ambient time; completionist pressure. |
| 5 | Frame & diegesis discipline | **3.0** | §5 — best-in-class phone shell; website voice at every seam; scoreframe on in-fiction surfaces. |
| 6 | Trainer mechanics (Scam Radar, Tell Exam) | **3.0** | Solid loop and feedback, but: verify-on-legit scores a full miss while verify-first is the taught habit (`round.ts:51–54`); `level` tags displayed but ignored (`round.ts:31–41`); no first-run ramp; comment/behavior mismatch (`round.ts:39–40`); Tell Exam false alarms cost nothing (`tell-exam/index.tsx:329–345`); gold-standard case path forecloses its own evidence score (`os-voice.ts:113–131`). |
| 7 | Progression & persistence | **3.5** | Save/resume/live-run persistence excellent (`Device.tsx:88–94`, `state.ts:14–27`); progression itself has no teeth (nothing unlocks, nothing accumulates, only the convergence gate). |
| 8 | Onboarding & first-run | **2.0** | No tutorial, no coach beats, rules learned post-hoc, first visit identical UI to return visits; trainer cases render a false 🔒 (`scam-radar/index.tsx:24`). |

**Player-experience composite ≈ 2.7/5.** This is the honest number behind the gut
feeling "we can capture it, but it isn't there yet." The engine number (4.5) says the
platform can carry the experience; the experience numbers say the experience hasn't
been staged.

---

## 7. The recommended program — M9 "THE SLOW BURN"

Ordered by leverage. R1 and R2 are the core; the rest support.

**R1 — Make the anthology a season, not a menu.** *(fixes A1, A2; the single
highest-leverage change)*
1. Establish anchor order = fiction chronology. Soft-diegetic gate: the rack frames
   the next anchor as "the next phone to arrive" (a Tuesday arrives after Saturday);
   hard-lock only if soft fails user testing. The convergence gate already implies
   order — move the implication forward.
2. Wire `done_*` recognition into **every** anchor using the existing mechanism:
   Tita's Tuesday opens with Saturday still in her GC; Bea's five weeks reference the
   debunks she shared; Maya's phone recalls the voice-clone scare when the deepfake
   lands. Three to five echo beats per anchor; the flags already flow.
3. Add a season spine to the anchor select: chronological framing, one line of
   connective tissue per anchor ("Saturday, she forwards a link…"), the question line
   kept — and the score meter moved to the hub/debrief.

**R2 — Slow the burn.** *(fixes B1–B3)*
1. Engine: add an ambient channel — scheduled filler beats (family chatter, client
   messages, sari-sari forwards) that arrive *between* story rules with longer
   settles; add in-fiction time-skip beats ("6:31 — the kettle clicks off") so
   compression is perceived; per-phone cadence profiles (Tita bursts, scammer
   rapid-fire, Mama responsive) as data, per the baseline's §2.
2. Retune constants at 1×: proseMs scaled to actual reading speed (~6s per 60-word
   paragraph), longer settles between rules, a 0.5× "slow" pace option next to 0.75×.
3. Content: stage a normal-day act in every phone — N ambient beats and 1–2 app
   visits before the crisis rule arms (gate the crisis on lived-in signals, not on
   moment-dismiss). Anchor I's first phone additionally stages the scam-less warmup:
   the form taught by living it (a banner, a shade pull, a typing indicator, an
   ambient thread) before any deception exists on screen.

**R3 — One continuous handover from website to person.** *(fixes A3, A4; completes
the M6.7 "hub IS the desk" commitment)*
1. Commit the hub to the operator-console fiction: replace marketing kicker/hero
   copy with console voice; move disclaimers, hotkey help, and how-it-works chrome
   into an About/archive surface; footer stops citing repo paths.
2. Rewrite the boot card as the entry ritual — spend its five lines on the person,
   not the roman numeral: *Saturday, 6:47 AM. Someone's phone is about to light up.*
3. Strip non-diegetic data from in-fiction surfaces (anchor select, rack, lock chrome):
   meters, minutes, counters → hub and debrief only. RouteBoot cache copy → neutral.
4. One in-fiction disclaimer line replaces the four `world/guardrails.md` leaks.

**R4 — Trainer mechanics debt.** *(the §6 facet-6 list)*
Verify-on-legit half-credit; implement the level ramp the tags promise; a 3-read
warm-up shift before the 10-read quota; Tell Exam false-alarm cost; un-hide the
evidence bonus or make the gold path not foreclose it; fix or remove the false 🔒.

**R5 — Canon reconciliation.** *(fixes A5)*
Guardrails canon decision (real vs fictional channels) documented per the project's
own override rule; Maya's age/residence reconciled; the Gen-2 narrator override
written into guardrails; Bea's editor pass.

**Validation (M9.5):** a real-1×, unmoderated watch of 3–5 first-time players —
the evidence this assessment lacks — plus the existing cadence smoke extended to
assert ambient-beat density and reading-air minimums, so "slow burn" stays measured,
not vibes.

**Relationship to the existing roadmap:** M8.3 (island shade/control-center states)
remains valid engine work and composes with R2/R3 (the island is a diegetic surface
for exactly the ambient/time signals R2 needs). This assessment proposes M9.1–R1/R2
take priority over M8.3; the user ratifies the order.

---

## 8. Material unknowns / what would change this

1. **Hard vs soft anchor gating** — a design-values call (guardrails ethos favors
   agency; the game already hard-gates within Anchor I and the Convergence, so
   gating is precedented). Soft gate first is the recommendation; hard gate if
   players skip ahead and lose the thread anyway.
2. **How fully in-fiction the hub should become.** The recommendation (R3) commits
   to the operator-console frame already half-built (M6.7). If the user wants the
   hub to stay a plain portal for the *suite* (including legacy games), R3.1 scopes
   down to seam-cleaning only.
3. **Fresh 1× playtest data.** All pacing judgments here are expert/code-level; the
   M9.5 watch could re-rank R2 vs R1 (if real players' problem is confusion rather
   than speed, R3 rises).
4. **Whether "immersive phone game" means the whole suite or the anthology alone.**
   If suite-wide, R1/R2 engine work also re-skins the trainer cases (whose sys-voice
   already leaks); if anthology-only, trainer fixes stay at R4 scope.

---

## 9. Evidence index

Primary reads (this session): `kangkong.ts`, `voiceclone.ts`, `assistant.ts`,
`convergence.ts`, `fiveweeks.ts` (partial), `Anthology.tsx` (orchestrator + boot +
anchor select), `pacing.ts`, `index.tsx` (anchor registry), `docs/VISION.md`,
`docs/game-design-eval.md`, `docs/evaluation-2026-11-08.md`,
`docs/e2-playthrough-judgment.md`, `docs/av-playthrough-judgment.md`,
`docs/PHONE-IMMERSION-PASS-2026-10-28.md`. Structure audits (three parallel agents):
trainer mechanics (`scam-radar/*`, `tell-exam/*`, case files), craft docs
(`craft/maya/_meta/*`, anchor briefs, guardrails), platform shell (`Hub.tsx`,
`Device.tsx`, `runtime.ts`, apps, glassbox, season/progress). Prior recorded
critiques incorporated: `docs/evaluation-2026-11-08.md` (I2 canon drift),
`craft/maya/_meta/continuity-report.md`, `creative-process-retro.md`,
`phone-anthology-tests-2026-05-06.md`.
