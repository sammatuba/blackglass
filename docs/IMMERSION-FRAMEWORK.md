# BLACKGLASS — Immersion Framework

*2026-11-07. Extracted from four external sources and mapped onto glassOS so the
season can be rebuilt around it. Standing reference — the game-design companion
to `docs/GAME-PLAN.md` and `docs/design-system.md`. Feeds the immersion build
plan (`docs/OVERNIGHT-BUILD-2026-11-07.md`).*

---

## 0. Sources

| Source | What it is | What we took |
|---|---|---|
| [FoundPhone-Studio (捡手机)](https://github.com/keoyyo85/foundphone-studio) — MIT | An open found-phone story framework: 49-app phone runtime, JSON story schema, event-graph engine, validator + path tests | Engine patterns (§2): event graph, virtual clock, tests-as-reachability, revision saves, ambient completeness |
| [I Don't Write Code, But I'm Making Three Games](https://blog.ax0x.ai/ai-game-producer-1) — Xingfan Xia | Producer-not-developer doctrine; the V1 → self-critique → V2 writing loop; the "mirror moment"; ClassOS lessons (silence, accusatory documents) | Production method (§1.1–1.2, §1.4–1.5) |
| [The Last 72 Hours on a Dead Person's Phone](https://blog.ax0x.ai/ai-game-producer-2) | *Dead Signal*: open systems, time as the core mechanic, horror through data, title-meaning visual theme | Data-horror and time mechanics (§1.3, §1.6; P2, P3) |
| [At 3:47 AM, Someone Was Using Your Phone](https://blog.ax0x.ai/ai-game-producer-3) | *Shadow Access*: the inversion (your own phone), anomaly hunting, UI infection as narrative | The compromised-device anchor and state-driven theming (§1.7; P4, P6) |

Use constraint: we take **principles and mechanics only**. No characters,
dialogue, artwork, brand apps or specific scenes from any source.
FoundPhone-Studio's own `BRAND_NOTICE.txt` is the reminder of why (its 49 apps
are recognizable real services; glassOS is deliberately original).

---

## 1. The doctrine (from the ax0x "AI Game Producer" series)

### 1.1 Producer, not developer
The human provides **direction, standards, and judgment calls**; the AI does the
building. The author's job is to define the fear, the structure and the bar —
then evaluate drafts against it. For us: overnight builds are commissioned the
same way. Canon decisions, guardrails (`world/guardrails.md`) and the verdict
rubrics stay human; drafting, wiring and testing are delegated.

### 1.2 The V1 → self-critique → V2 loop
A first AI draft is *competent but predictable* — the author "sensed something
was off without naming it." The method: have the drafter critique its own V1
against the bar (in the source's case: "no emotional payoff, no mirror
moment"), then synthesize V2 from **three directions at once** (systemic cause
rather than a single villain; one sympathetic counter-direction; the player's
own choices implicated). Never ship V1.

### 1.3 One game, one fear, one structure, one visual language
Each work = one distinct fear, expressed by one distinct structure and one
distinct visual language. The series' trio:

| Work | The fear | Structure | Visual language |
|---|---|---|---|
| *Inside Job* | Moral compromise — the truth implicates you | Closed system (five suspects, bounded evidence) | Corporate desktop |
| *Dead Signal* | Patterns in data — someone trusted by everyone | Open system (data points outward to the world) | Deep black + cold blue; glitch = signal interference = the title |
| *Shadow Access* | Exposure — someone has seen everything | Inversion (investigate *your own* phone) | Clean iOS white slowly "infected" with dark green; crashes and flickers |

**blackglass mapping.** The season already runs one-fear-per-phone as
convention ("new story = new failure mode + new verb + new UI posture",
GAME-PLAN §6). The two fears the season does *not* yet cover are **exposure**
(your own device turned against you — stalkerware / remote-access / "your own
phone" inversion) and **complicity** (a mirror-moment ending where the player
realizes they were the vector). Both are open anchor slots (HANDOFF lists AI
recruiter / election audio / romance scam as Anchor VI candidates; a
compromised-phone anchor is a stronger fit to this framework).

### 1.4 Mirror moments
Endings where the player is implicated: in *Inside Job*, the final act is the
player **writing the incident report that implicates their own character's
security decisions**. The reveal is systemic carelessness, not a villain.
**blackglass mapping:** THE CONVERGENCE already says "every defense became the
next attack surface" — that is the season-level thesis but not yet a
*player-implicating act*. The finale (or each anchor epilogue) should end on an
action the player performs that turns the lens on themselves (e.g. filing the
season's "what I forwarded" report assembled from their own recorded choices).

### 1.5 Silence and the accusatory document
From the ClassOS lesson in post 1: (a) **deliberate silence at emotional
moments** — no typing indicator, no reply, just elapsed time; the absence is the
beat. (b) A **bureaucratic UI document that quietly turns accusatory** — a
report the system keeps "helpfully" updating until it reads as an indictment.
**blackglass mapping:** `src/engine/os/pacing.ts` derives typing from message
length — add a `silence` beat type (no indicator, read-length wait, optionally
a delivered-receipt that never comes). Accusatory-document mechanic maps to a
wallet/bank or "FamilyGC log" surface whose mundane transaction rows re-read as
the scam progresses (see P2).

### 1.6 Open vs closed systems
*Inside Job* is closed (everything inside one network); *Dead Signal* is open —
the phone's data points **outward**: a photo's geolocation leads to a warehouse,
a frequently-called number belongs to the first victim, the evidence "reaches
into reality." **blackglass mapping:** the phones are currently closed (evidence
lives in-app). Cross-reference wiring — gallery location tags that open map
pages, call-log entries that open contacts, browser pages that corroborate a
thread — turns each phone into an open system without leaving the device.

### 1.7 The game reaches back
Dead Signal's late-game turn: *the phone starts receiving new messages* — the
investigation acquires a meta-stake (does the sender know you have it?). And
Shadow Access's core beat: evidence that someone was **physically close**
(3:47 AM, inside your home). **blackglass mapping:** at least one phone should
push new content the player didn't solicit after long inactivity, and the
season's final phone should address the player's own recorded behavior (the
scammer's view of *them*).

### 1.8 Horror through data, not visuals
The fear engine is pattern recognition over mundane records: a geotag matching
another victim's last-known position; a 47-minute call to a number whose owner
died three weeks ago — *someone is answering a dead person's phone*; one name in
all three victims' contact lists. No jump scares. **blackglass mapping:** our
tells are already content-not-images; the upgrade is making the player *do the
matching* (P2) instead of reading a labeled tell.

---

## 2. The engine patterns (from FoundPhone-Studio)

### 2.1 Story as data, phone as runtime
Story JSON is fully separated from UI; the compiler validates it into an
immutable `Work`; a `Runtime` holds player state; nothing executes except the
engine (no scripts, no HTML). We already hold this principle (content as typed
`CaseOS` literals, pure `runtime.ts`). Worth keeping as a hard boundary: the
overnight build adds *data and mechanics*, not bespoke per-phone React.

### 2.2 The event graph and scoped condition keys
Events dispatched by the UI: `start`, `openApp`, `read`, `password`, `choose`,
`variable`, `time` (HH:MM), `callAnswered/Declined/Ended`. Conditions are typed
values with operators (`eq/neq/gt/lt/includes`) over scoped keys:

| Scope | Meaning | glassOS analogue |
|---|---|---|
| `visited:app` | app opened | inspected flags |
| `read:item` | item/conversation read | `readMessage` / inspected |
| `clue:x` | evidence found | evidence ids |
| `unlocked:x` | hidden content revealed | reveal flags |
| `completed:node` | story node done | decision flags |
| `ui:app:prop` | UI state | `phone.state` |

Actions: `variable, unlock, hide, notification, message, time, ending, choice,
clue, call`. Calls get a full overlay with answer/decline/end and can reference
authored audio. We have the same vocabulary in `OSRule` — the gap is not
expressiveness, it's *where content lives* (see P1: we under-fill the phone).

### 2.3 The virtual clock
`delayMs` nodes schedule work on an in-fiction clock; pending jobs persist in
saves; the clock **pauses while the phone is closed**; execution is bounded
against zero-delay cycles; `time` events fire at clock boundaries. **blackglass
mapping:** our rule pump is event-driven but wall-clock-loose; a story clock
per phone (the phone's own `date`/`time` advancing with beats) would let
content schedule itself ("the 9:41 push", "the call at 8:12 PM") and make
timeline reconstruction possible (P3).

### 2.4 Tests are reachability evidence
Every ending must have at least one authored, engine-replayed test path —
covering passwords, hidden content, calls and cross-app events; dangling
references, self-loops and unreachable nodes fail validation. The validator is
the author's quality bar, not an afterthought. **blackglass mapping:** we have
45 unit tests + per-anchor Playwright smokes, but no per-ending path evidence.
A generated "reachability ledger" per phone (every ending ↔ the flags path that
reaches it, replayed by a smoke) is engine parity worth having before content
grows.

### 2.5 Saves vs revision
Player saves are keyed by work ID and record the content `revision`; a bumped
revision starts fresh progress *with a message*. **blackglass mapping:**
`cgAI_blackglass_v2` already degrades gracefully, but content changes that
invalidate old runs should announce themselves in-fiction ("This phone's data
was restored from a newer backup") rather than silently zeroing.

### 2.6 Ambient completeness
FoundPhone ships **49 apps**, an App Store that installs them, folders/dock,
long-press home customization, control center, weather/wallet/health surfaces —
most carrying *no plot*. The completeness is the illusion: an inhabited phone
has apps that exist for the person, not the player. **blackglass mapping:** the
strongest single UI/UX lever we have (P1). Eight functional apps on an otherwise
empty grid reads as "game menu", not "someone's phone".

---

## 3. The framework — ten principles for blackglass

**P1 — The device is inhabited.** Every phone gets ambient, non-plot surfaces
with diegetic character data: calendar of the family's week, weather in the
phone's city, clock/alarm, wallet transactions, app-store "installed recently"
noise, folders, a dock. Empty grid cells become *tells* where intended (a
missing banking app the victim should have had). Filed under: visual UX.

**P2 — Data is the horror.** Taps do cross-referencing work: photo metadata
panel (time / location / device), a location tag that opens a map page, a
contact row that shows every thread that touched them, a wallet ledger whose
ordinary rows re-read as an indictment. The tell becomes something the player
*assembles*, not a label they read. Filed under: game design + pedagogy (scam
choreography is a money-and-time trail).

**P3 — Time is a mechanic, not a label.** Each phone owns a story clock; beats
are scheduled on it; per-surface views (call log, photo roll, ledger, pushes)
show the same events under different sorts; some epilogue or beat asks the
player to place events in order — rebuilding the scam's choreography is the
puzzle. Files under: game design (adapts *Dead Signal*'s 72-hour loop to e.g.
"one evening, hour by hour").

**P4 — The UI is the narrative.** Theme classes (`.theme-<name>`) become
*stages*: a phone's chrome shifts with story flags (clean → uneasy →
compromised), with per-anchor signature distortion at discovery moments (the
feed anchor shimmers, the clone anchor's waveform stutters, the compromised
anchor's chrome greens and flickers). Reduced-motion and a11y paths mandatory.
No exposition text explains it. Filed under: visual UX.

**P5 — The game reaches back.** Unprompted pushes after dwell time; a final
surface that speaks from the scammer's side using the player's own recorded
choices; notification-center history that matters on re-read. Filed under:
game design.

**P6 — The inversion anchor.** One new anchor where the player scans *their
own* (in-fiction) phone for anomalies — screen-time gaps, a forwarding rule,
messages they didn't send, a disguised "System Tools" app — fear of exposure,
verb something like **SPOT**/**AUDIT**, UI posture P4-compromised. Strongest
uncovered fear; strongest scam pedagogy (stalkerware/remote-access literacy).
Filed under: new content (draft for user review).

**P7 — Mirror moments.** Endings where the player performs the self-implicating
act (filing the report, reviewing what they forwarded, reading their own
decision log as the scammer's playbook). Convergence gets a player-implicating
final act built from recorded choices. Filed under: game design + pedagogy.

**P8 — Silence is a beat.** A pacing primitive: no typing indicator, long wait,
maybe a read receipt that never comes — for grief, dread, or the moment the
other side realizes they've been caught. Filed under: pacing.

**P9 — Reachability is the quality bar.** Every ending has a replayed path;
validators reject dangling references and unreachable content; content
revisions announce themselves to old saves. Filed under: engineering parity.

**P10 — One fear, one verb, one posture per phone** (existing convention,
reaffirmed and extended by P1–P8). The framework is a *lens* for each new phone:
which fear, which verb, which posture, which data surface, which silence.

---

## 4. What we deliberately do NOT take

- **Real-world brand apps** (FoundPhone's WeChat/Instagram/... skin set) —
  blackglass is original-by-design; recognizable brands add legal/tonal risk and
  age poorly.
- **Runtime model calls** — both sources keep play offline and deterministic;
  so do we ("works offline, no AI at runtime" is a trust feature).
- **Data-URL media embedding** — FoundPhone inlines media in JSON; we use
  manifest-resolved artifacts + a 3.7 MB budget; keep ours.
- **Passcode puzzles as friction** — only where diegetic (a phone you *should*
  be able to unlock; a passcode the owner left hints for is characterization).
- **Any character, scene, artwork or specific twist** from the sources. The
  three-fears table and mechanics are the inheritance; the stories stay ours
  (Filipino family, one season, `world/guardrails.md`).

---

## 5. How this file is used

- `docs/OVERNIGHT-BUILD-2026-11-07.md` turns P1–P9 into gated, overnight-sized
  work packages.
- Each future anchor brief (`craft/maya/_meta/anchor-*-brief.md`) opens by
  answering P10 for its phones: fear, verb, posture, data surface, silence.
- GAME-PLAN §6 convention now reads: *new story = new failure mode + new verb +
  new UI posture + new data surface to distrust.*
