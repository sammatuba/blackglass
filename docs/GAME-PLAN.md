# Full-Game Plan — Outcomes & Targets

*2026-09-11. The working definition of "full-blown game" for BLACKGLASS, the gap
between here and there, and the milestone order. Build-first: everything that
needs no external asset gets built; everything that does gets a graceful
placeholder and an entry in the register (§7).*

---

## 1. The game in one paragraph

BLACKGLASS is a web-native narrative game about seeing clearly in a world shaped
by AI. You hold the phones of one Filipino family across one season of synthetic
deception — a Saturday-morning clickbait link, an evening voice-clone call, a
Sunday deepfake endorsement, and five quiet weeks of algorithmic drift. Each
phone has its own interface, its own verb, its own way of being fooled. The
player moves between perspectives the way a detective moves between witnesses:
you cannot see the season from one position, so you will hold all of them — and
at the end, assemble the one timeline none of them could.

**The form is the lesson.** Nobody is the villain in their own phone.

## 2. Outcomes — what "done" means

### Player outcomes (experience)
- **Immersion:** the phone is a device you hold, not a page you scroll — unlock, tap apps, watch messages arrive, answer calls, open evidence.
- **Perspective shift:** each phone changes *what the player can do*, not just the colors.
- **Agency with weight:** every choice is recorded and echoed back in that anchor's timeline and the finale.
- **Completion:** a first phone, a hook, four anchors, an earned finale. No dead ends.
- **Continuity:** closing the tab loses nothing; picking the phone back up resumes mid-conversation.

### Learning outcomes (pedagogy — invisible, then named)
| Anchor | Vector | The lesson the debrief names |
|---|---|---|
| THREE PHONES / One Morning | clickbait health misinfo + the AI "debunker" | Awareness is not resistance; media literacy can become its own automation bias |
| IT'S ME / One Evening | cloned-voice distress call | Verification is a practice, not a verdict; urgency is the weapon |
| GUARANTEED / One Afternoon | deepfake endorsement investment | Synthetic media poisons the evidentiary commons — it makes the real unbelievable too |
| FIVE WEEKS / One Feed | algorithmic capture | The feed never argues; it pays you, a little, each time you're a little less careful |
| THE CONVERGENCE | the season view | Every defense became the next attack surface |

### Product outcomes (as a game)
- A complete path from hub → first phone → all four anchors → finale, 60–90 minutes of play.
- Meta-progression visible at a glance: phones lived, clues found, anchors complete, finale unlocked.
- A finale assembled from *the player's own recorded choices*, not a fixed cutscene.
- Local-first trust preserved: `cgAI_` localStorage only, no accounts, no tracking.

## 3. Targets

| Target | Value | Status |
|---|---|---|
| Time to first meaningful play | < 60 s from hub, no signup | ✅ |
| Complete-path length | 60–90 min (existing content) + 5 min finale | ✅ with M3 |
| Continuity | resume mid-phone in one tap; no loss on close | M1 |
| Progression | every phone shows lived / in-progress / asleep; clues counted | M2 |
| Finale | unlocked by living all 10 phones; reflects recorded choices | M3 |
| Platform | mobile-first, desktop-scaled, keyboard-playable, SR-labeled, reduced-motion safe, offline after first visit | ✅ (maintain) |
| Performance | initial JS ≤ 150 KB gz; game chunk lazy; media out of precache | ✅ |
| A11y | Lighthouse ≥ 95; every interactive surface named | ✅ (maintain) |
| Placeholder tolerance | no broken UI where an external asset is pending | ✅ register §7 |
| Trust | no accounts, no tracking, no player data on a server | ✅ |

## 4. Experience pillars (unchanged, now load-bearing)

1. **The device is the medium** — glassOS shell, per-phone theme, sound, haptics, stage.
2. **UI as character** — verb per phone (DECIDE / FORWARD / CONSULT / SCROLL), notification posture, wallpaper, brightness.
3. **Rashomon by construction** — the same season refracted; sequenced recognition between phones.
4. **Invisible pedagogy** — the mechanic carries the lesson; the timeline and reflection name it.
5. **One engine, content as data** — new anchors are written, not re-architected.

## 5. Where it stands today (2026-09-11)

Shipped: hub + three pillars; glassOS runtime (lock, home, Messages, Gallery,
Phone, Browser, Contacts, Notes, Settings, calls, moments, SFX); four anchors on
glassOS (10 phones); per-anchor timeline epilogue + reflection; 7 diegetic
artifacts; the Dr. Anita video pilot verified end-to-end; Scam Radar feed +
cases; PWA; deploy pipeline.

The gap to "full game":
- ~~A run resets on exit — no continuity.~~ → **M1**
- ~~Progress is per-phone only — no discovery surface, no global picture.~~ → **M2**
- ~~The finale doesn't exist; the anthology ends four times.~~ → **M3**
- Presentation stops at functional in places (transitions, notification center, stage depth). → M4 (backlog)
- The verb set is mostly read/choose; interaction depth (examine, forward, search, voice-note playback) is thin. → M5 (backlog)
- ~~Content ends at four anchors; the season is thin for "full game" shelf life.~~ → **M6** (Anchor V shipped 2026-11-03)
- Generated media is one clip + seven stills. → M7 (external; placeholders now — the clip is the last placeholder)

## 6. Milestones

### M1 — Continuity ✅ shipped 2026-09-11
Persist the live glassOS state per phone; "Continue" on the rack; flush on exit
and on completion; completion clears the live slot. Acceptance: leave a phone
mid-thread, return, resume in the same thread state with no rule replay.

### M2 — The case board ✅ shipped 2026-09-11
Store evidence + inspected ids with each lived run. Anchor select and rack show
phones lived, clues found, anchor completion; the rack distinguishes
lived / in-progress / asleep. Acceptance: numbers reflect a played run; old
saved progress degrades to zeros, not errors.

### M3 — THE CONVERGENCE ✅ shipped 2026-09-11
A global finale, unlocked by living all 10 phones: the season assembled in
chronological order with the player's choices resolved inline; the through-line
(every defense became the next surface); a signal report (phones, clues); the
carry-forward close. A locked card on the anchor select shows progress toward
the unlock. Acceptance: unit tests for the resolver; smoke playthrough with
seeded progress renders dynamic text and totals.

### M4 — Presentation polish ✅ shipped 2026-09-11/12
Shipped: anthology screen transitions (`.animate-screen`, reduced-motion safe);
glassOS notification center — tappable banners that open their thread, a
status-bar bell with unread count, and a shade with banner history + Clear
(`scripts/shade-smoke.mjs`). **Human cadence** rewired the rule pump: typing is
derived per message from its own length, bursts show one indicator and land
seconds apart, prose beats wait like reading, and one serialized pump keeps
storylines from interleaving; players choose Relaxed / Normal / Brisk in
Settings → Chat pace (`src/engine/os/pacing.ts`, audited at 1× by
`scripts/cadence-smoke.mjs`; smokes run at 8× via `cgAI_glassos_pace`).
**Deeper stage** (2026-09-12): the desk light follows each case's clock — dawn
gold, cool day, rose dusk, warm lamp at night (`timeMood`, unit-tested) — and a
specular sheen slides across the glass with the pointer tilt, reduced-motion
safe. **The cold open** (2026-09-12): picking an anchor plays a pace-aware boot
card — BLACKGLASS, the anchor number and title, the subtitle big, the episode's
question, then the glassOS signal line with the entry phone's clock and phone
count. Tap anywhere, Enter/Space, or Escape begins now; otherwise it clears at
3.4s at 1× (a blink at 8×), and reduced motion reveals all lines at once
(audited by `scripts/cadence-smoke.mjs`).
**The inhabited shell** (2026-10-22): on phones the desk, bezel and browser
chrome drop away — the glass is the page (full-bleed `100dvh`, safe-area
insets). The status bar gains a diegetic power control; a returning run wakes
on the lock screen with "While you were away" instead of replaying the opening
beats. Gestures are layered over visible controls: swipe up to unlock, pull
down for the shade, swipe up to answer a call (the buttons remain). "Put the
phone down" exits from the lock screen; the conversation is where you left it
(`scripts/resume-smoke.mjs`, contract in `docs/design-system.md`).

### M5 — Interaction depth ✅ shipped 2026-09-11/12
Shipped: voice-note play/pause (waveform + length chrome); artifact zoom in the
gallery viewer (1×/2× on the planted tells); Notes search over evidence + notes
with match count, empty state, and clear (`scripts/artifact-smoke.mjs`); a
real forward/share flow on link messages — tap Forward, pick a thread, the copy
lands there marked “Forwarded” with a confirmation toast, or Copy link puts the
diegetic URL on the clipboard. Forwarding is pure expression: it sets no flags,
so authored branches stay intact (`forwardMessage` in runtime, unit-tested;
audited in `scripts/shade-smoke.mjs`). **Side-by-side artifact compare**
(2026-09-12): Bea's gallery now holds the healthtruthph batch — the kangkong
screenshot Maya sent, plus ampalaya and malunggay siblings under `bea_fast` —
and the photo viewer can pair any two artifacts. A shared `series` on the
photos names the tell (“The sameness is the tell”); either column opens full
size (`scripts/compare-smoke.mjs`). “Recovered messages” forensic mode is
reserved for a future anchor (M6).

### M6 — Content breadth ✅ shipped 2026-11-03
Anchor V — **THE ASSISTANT** ("CERTAIN", verb ASK) shipped on a new Ask surface
(`kind:'ai'` answers, citation chips, sources drawer, regen/thumbs sycophancy
mechanics). Three phones: the dosage (Tita), the proposal (Maya), the
fact-check (Bea). E2 judgment PASS 4/4 (`docs/av-playthrough-judgment.md`);
canon decisions in `craft/maya/_meta/anchor-v-brief.md` §8 (user-overridable).
Alternatives from the architecture doc's axes (AI recruiter, election audio,
romance scam) remain candidates for Anchor VI+. "Recovered messages" forensic
mode stays reserved for a future anchor.

### M6.5 — The signal desk ✅ built 2026-11-09
The game layer that makes the anthology play like a case-file season (modeled
on Beyond Megawatts: visible meters, grade stamps, best-score progression —
rebuilt for a story about verification, not resources). Every phone is now a
scored case:

- **The case file** (`score.ts` `CASE_GAMES`): objective + stakes stated at
  boot, and a pressure meter named for the episode (SPREAD, URGENCY, THE
  PITCH, THE DRIFT, CONFIDENCE) that ratchets on authored story flags — it
  rises no matter what you choose; the pressure was never yours to stop, only
  to see. That separation is the lesson, made visible.
- **The signal desk** (`SignalDesk.tsx`): wide desktop (≥1200px) gets two
  desk rails flanking the phone — objective, stakes, the live pressure meter,
  clues, reflex moves with kind/points. Below 1200px the POV shell forbids
  chrome, so the desk speaks in pointer-transparent toasts above the gesture
  bar (clue found / move landed / pressure ratchet), silent while a moment or
  call owns the screen.
- **The verdict** (`Verdict.tsx`): closing a phone lands on a case-closed
  dossier — count-up to the signal total, a grade stamp (S CRYSTAL / A CLEAR /
  B HAZY / C FOGGED) that slams in with a grade-sized fanfare, the move feed
  annotated with what each reflex was worth, the clues still out there, and
  WHAT HAPPENED kept deliberately separate from the grade (Tita's money moves
  on every path).
- **Season progression** (`state.ts` `recordScore`): best signal per phone
  persists (old saves read through defaults), the rack stamps `✓ lived ·
  signal N · grade`, and the anchor select shows the season total, rank
  (NEW SIGNAL → WATCHER → PATTERN READER → SEER → CLEAR-EYED) and the gap to
  the next rank — every replay that sees more counts.
- **Desk sound** (`sound.ts` `gameSfx`): the same gentle synth voice tuned a
  fifth apart so the desk sounds like the case file, not the phone; every cue
  tied to something visible; one master mute now lives in the status bar
  (synced with Settings through a mute-change broadcast).

Weights reward the reflex the episode teaches — verify through another
channel, pause, protect, stay human — never the story outcome. Pure logic is
unit-tested in `score.test.ts`; the anthology smoke now asserts the verdict
dossier and the rack's signal stamp.

### M6.6 — One desk across the suite ✅ built 2026-11-10
The signal desk's language pulled out of the anthology and made the suite's
shared interface (`src/games/shared/grade.ts` pure + `shared/desk.tsx` UI;
`score.ts` re-exports, so anthology imports hold):

- **Feed Triage is a shift at the desk** (`FeedGame.tsx`): a case-file header
  (THE FEED DESK · shift N), a live desk block — signal /100 with grade chip,
  the signal meter, reads count, pts + streak — graded as you go, and a desk
  sound on every verdict (scam→protect, verify→verify, legit→neutral,
  half-read→drift, miss→risk), each tied to the visible ledger. The debrief is
  the anthology's verdict dossier: count-up, grade stamp slam, fanfare sized to
  the grade, clean/half/missed tiles, red-flag mastery bars, a STILL SLIPPING
  PAST list (families under 60%), WHAT THE SHIFT TAUGHT. The round signal is
  honest: `readMax` counts the streak bonus in the denominator too
  (`round.test.ts`).
- **Radar case debrief joins the dossier**: case signal = (outcome + evidence)
  / `CASE_MAX` 60, the shared stamp + fanfare, verdict/clues tiles — the old
  corner chip is gone. Case cards stamp `✓ worked · signal N` (best points
  persisted as a number; old boolean saves still read as worked).
- **Tell Exam results carry the same hero**: exam signal with the shared stamp.
- **The Hub shows YOUR SEASON across the suite** (anthology total + rank, radar
  score + streak, exam best) — reading the persisted stores directly so the
  games stay lazy-loaded; silent for fresh visitors. The radar menu threads back
  to the anthology ("Where these flags live"), and the feed card shows the best
  shift signal.
- exam/hub smokes gained the `SMOKE_CHANNEL` override (Chrome-less hosts).

### M7 — External assets (placeholders in place)
See register. None block play.

## 7. Placeholder register

| Asset / capability | Used by | Placeholder shipping now | External step |
|---|---|---|---|
| Tito Mike deepfake clip | GUARANTEED video page | still poster + fake-player chrome; tells carry `at` when clip lands | same Veo i2v flow as Dr. Anita |
| Voice audio (voice notes, cloned Renz) | IT'S ME, family chats | ~~text + duration + waveform chrome~~ **real audio since 2026-11-03** (`public/voicenotes/`, Kokoro + Chatterbox, provenance in `play/blackglass-phones/voice/PROVENANCE.md`) | done |
| Additional diegetic stills | future pages/evidence | emoji/CSS fallbacks via `artifactUrl`/`artifactVideo` | ChatGPT worksheet + sync script |
| Convergence key art | finale | CSS/type only (no image needed) | optional generated poster |
| Localization (EN/Tagalog mix) | all anchors | as written; code-switch is intentional | professional pass, i18n scaffold |
| Hero/GlassHero polish | hub | capability-gated lazy chunk + gradient fallback | optional TSL refinement |

## 8. Verification (no analytics by design)

- **Unit:** pure progress/finale logic in `progress.test.ts`; the scoring layer in `score.test.ts`; engine rule tests stay green.
- **Smoke:** `scripts/anita-video-shot.mjs` (artifact + anchor flow), `scripts/resume-smoke.mjs` (continuity), `scripts/finale-smoke.mjs` (seeded convergence), `scripts/compare-smoke.mjs` (seeded batch compare), existing anthology smoke; `npm run build` + Lighthouse budgets.
- **Playtest signal:** qualitative — where do players stop, what do they re-open, what do they quote back. No instrumentation; feedback is conversation.

---

*Milestones M1–M3 were built and verified in the session that wrote this
document. M4–M7 are the standing backlog; M6 needs writing sessions, M7 needs
assets (placeholder register §7).*
