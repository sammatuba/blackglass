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
- Content ends at four anchors; the season is thin for "full game" shelf life. → M6 (needs writing sessions)
- Generated media is one clip + seven stills. → M7 (external; placeholders now)

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

### M4 — Presentation polish ◐ two slices shipped 2026-09-11
Shipped: anthology screen transitions (`.animate-screen`, reduced-motion safe);
glassOS notification center — tappable banners that open their thread, a
status-bar bell with unread count, and a shade with banner history + Clear
(`scripts/shade-smoke.mjs`). **Human cadence** rewired the rule pump: typing is
derived per message from its own length, bursts show one indicator and land
seconds apart, prose beats wait like reading, and one serialized pump keeps
storylines from interleaving; players choose Relaxed / Normal / Brisk in
Settings → Chat pace (`src/engine/os/pacing.ts`, audited at 1× by
`scripts/cadence-smoke.mjs`; smokes run at 8× via `cgAI_glassos_pace`).
Remaining: deeper stage (reflections, time-of-day per anchor), anthology boot
sequence.

### M5 — Interaction depth ◐ two slices shipped 2026-09-11
Shipped: voice-note play/pause (waveform + length chrome); artifact zoom in the
gallery viewer (1×/2× on the planted tells); Notes search over evidence + notes
with match count, empty state, and clear — all audited by
`scripts/artifact-smoke.mjs`. Remaining: a real forward/share flow for link
messages; side-by-side artifact compare (ampalaya/kangkong); "recovered
messages" forensic mode for a future anchor.

### M6 — Content breadth ◐ brief ready 2026-09-11
`craft/maya/_meta/anchor-v-brief.md` specs the recommended Anchor V — **THE
ASSISTANT** (verb ASK): hallucinated authority, sycophancy, citation-shaped
confidence, with a new AI-chat app surface and no external assets. Alternatives
from the architecture doc's axes (AI recruiter, election audio, romance scam)
remain candidates for Anchor VI+. Each new anchor must ship a new lesson, a new
verb, and a new UI posture.

### M7 — External assets (placeholders in place)
See register. None block play.

## 7. Placeholder register

| Asset / capability | Used by | Placeholder shipping now | External step |
|---|---|---|---|
| Tito Mike deepfake clip | GUARANTEED video page | still poster + fake-player chrome; tells carry `at` when clip lands | same Veo i2v flow as Dr. Anita |
| Voice audio (voice notes, cloned Renz) | IT'S ME, family chats | text + duration + waveform-style chrome; no sound | TTS or recorded VO; keep text fallback |
| Additional diegetic stills | future pages/evidence | emoji/CSS fallbacks via `artifactUrl`/`artifactVideo` | ChatGPT worksheet + sync script |
| Convergence key art | finale | CSS/type only (no image needed) | optional generated poster |
| Localization (EN/Tagalog mix) | all anchors | as written; code-switch is intentional | professional pass, i18n scaffold |
| Hero/GlassHero polish | hub | capability-gated lazy chunk + gradient fallback | optional TSL refinement |

## 8. Verification (no analytics by design)

- **Unit:** pure progress/finale logic in `progress.test.ts`; engine rule tests stay green.
- **Smoke:** `scripts/anita-video-shot.mjs` (artifact + anchor flow), `scripts/resume-smoke.mjs` (continuity), `scripts/finale-smoke.mjs` (seeded convergence), existing anthology smoke; `npm run build` + Lighthouse budgets.
- **Playtest signal:** qualitative — where do players stop, what do they re-open, what do they quote back. No instrumentation; feedback is conversation.

---

*Milestones M1–M3 were built and verified in the session that wrote this
document. M4–M7 are the standing backlog; M6 needs writing sessions, M7 needs
assets (placeholder register §7).*
