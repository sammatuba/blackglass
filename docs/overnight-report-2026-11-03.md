# Overnight session report — Anchor V "CERTAIN" shipped (2026-11-03)

**TL;DR for the review:** the directive was *finish to completion, make it
immersive*. The last open milestone (M6 — **THE ASSISTANT**) is now built, judged,
and deployed at **https://sammatuba.github.io/blackglass/** as the season's fifth
anchor: **CERTAIN · One Night**. Earlier the same night (see the prior session's
record) the voice notes went live. Everything is committed on `main` and deployed;
all gates green. Four canon decisions were made on your behalf — each is
one-content-edit reversible, listed in §3. The only remaining placeholder in the
whole game is the Tito Mike clip (§5).

---

## 1. What you can review live

- **CERTAIN (Anchor V)** — a Tuesday night on three phones. Tita asks the machine
  about Papa's meds and gets a confident, specific, wrong answer, complete with a
  journal that does not exist. Maya's client deck gets the same treatment at
  11:40. Bea asks it to fact-check her own thread at 1:05 and it agrees with her,
  perfectly, twice. By morning the dosage answer and the fake citation are in the
  family chat wearing the same font. Nobody was scammed. Everyone was certain.
- **The Ask app** — a new glassOS surface (the dock's violet star ✦): answers
  compose in streaming, citations render as chips, and the **sources drawer checks
  them** — red for fabricated, amber for misused, with the checking prose inline.
  **Regenerate never fixes the citation** (the fiction just changes); **thumbs-up
  buys you a more confident wrong answer** ("you marked this helpful"). One honest
  model card ships in Settings on every phone; nobody in the story reads it.
- **The corrections are human.** Joy — the cousin-nurse, eleven minutes at
  midnight — undoes the wrong number without giving one. Maya's only exit is the
  forty minutes of doing the work. Bea's is Maya reading the draft at 1:58 AM and
  disagreeing with one sentence. The machine never checks anything; that is the
  lesson and it is stated exactly once, in the coda.
- **Papa is the silent witness** — the phone that never asked, on the timeline.
- **The Convergence** gained its fifth chapter; the finale now spans the whole
  season including the night with no deceiver in it.

## 2. What shipped (the chain)

1. **Engine** — `kind:'ai'` message variant (streaming reveal, reduced-motion
   safe), `OSSource` citation chips + sources drawer, per-answer regen/thumbs
   variants in `OSState.ai` (pure runtime actions + tests), the Ask app
   (`AssistantApp`), dock/banner/shade routing for assistant threads, a dedicated
   answer chime, and the Settings model card. Assistant threads are hidden from
   Messages and ride the same rule pump, typing beats, banners, and resume as
   every other surface — zero engine forks.
2. **Content** — `content/assistant.ts`: three phones, ≥3 choices each with the
   reasonable trap, every answer carrying checkable details, the dosage beat
   textually non-actionable (wrong number contradicted in-scene, no real names),
   four optional cross-anchor recognition beats (`done_kangkong/voiceclone/
   deepfake/fiveweeks` — now seeded from global progress, a small Anthology
   upgrade), Papa's silent witness, the anchor timeline + reflection.
3. **Evals** — E2 playthrough capture + judgment (`docs/av-playthrough-judgment.md`:
   **PASS 4/4**), axe checks on the Ask surface + sources drawer (clean), the
   anthology smoke extended with a full Anchor V spot-check (all five anchors play
   through, zero console errors), 29/29 unit tests, budget green (3.7 MB), radar/os/
   exam smokes green. Shot-diff unaffected (the new anchor lives inside the game,
   below the baselined surfaces).

## 3. Canon decisions made for you (§8 of the brief — veto-friendly)

1. **The app is "Ask", the model "Ask 4"** — the verb is the anchor's verb; the
   version number is the platform critique.
2. **The dosage beat stays medical** (guardrails hold — see the judgment doc).
3. **One vendor on every phone** — the morning GC lands because the dosage answer
   and the fake citation wear the same confident font.
4. **Anchor V ships now;** the fifth *cast* anchor (OFW ring) stays aspirational.

Each is one content-level edit to reverse; nothing in the engine assumes them.

## 4. Failures hit and fixed (for the record)

1. **Moment/dock name collision** — the opening moment's continue button ("Open
   Ask") collided with the dock icon's accessible name; Playwright's `first()`
   deadlocked on the overlay. Moments renamed to diegetic actions ("Tap the
   star").
2. **Sources drawer's Done button** carries `aria-label="Close sources"`, which
   overrides its visible text for the a11y tree — smoke updated to match (the
   a11y behavior is correct; the test was wrong).
3. **Regen stream stall** — a regenerated answer longer than the base would
   freeze mid-reveal (the reveal interval only ran on mount). The reveal now
   re-runs per answer, so variants compose in fresh.
4. **Capture races the coda** — the end-of-phone moment pauses the world ~3 s
   after the last branch, beating any navigation. The E2 capture now reads the
   end-state thread inboxes from the persisted live run instead of racing the
   pump (and waits out the ~700 ms completion window before navigating — a race
   that silently ate the first phone's completion).

## 5. What needs you (in priority order)

1. **The Tito Mike clip** — the one remaining placeholder in the game (the
   GUARANTEED video page plays the still + tells until it lands). Veo i2v via
   your Google AI app: source `play/blackglass-phones/assets/tito-mike-deepfake.png`,
   line + tell requirements in `GENERATE-VIA-AGY.md` §5.
2. **Your review** — especially: the four canon decisions (§3), Tita's and Joy's
   Taglish by your ear, and whether the planted tells stay
   findable-but-not-glaring.
3. **Anchor VI+** (optional) — the architecture doc's remaining axes (AI
   recruiter, election audio, romance scam) are open; each needs a brief like
   this one had.

## 6. State

- **Deployed:** https://sammatuba.github.io/blackglass/ (gh-pages).
- **Committed:** `main` (this session: voice notes a2d10d4 + the Anchor V commit).
- **Tests/build/gates:** 29/29 unit tests, build clean, budget 3.7 MB, axe clean
  (radar/os/Ask surfaces), anthology smoke green across all five anchors, exam/
  case smokes green, shot-diff baselines intact.
- **The season is complete but for one file:** hub → five anchors (13 phones) →
  THE CONVERGENCE, every surface gate-green, offline after first visit.
