# E2 playthrough judgment — voiceclone anchor (2026-10-04)

**Method:** `TRANSCRIPT=1 node scripts/anthology-smoke.mjs` drove a real glassOS
playthrough at 8× pace and captured the visible chat bubbles at each beat to
`%TEMP%/bg-transcript.json`. The transcript was then judged in-session (per the
aligned plan — the judge is ZCode) against the acceptance criteria generalized from
`craft/maya/_meta/anchor-v-brief.md` §6. This is the E2 eval from
`docs/game-design-eval.md` facet 2.

**Scope of this run:** the voiceclone (IT'S ME) anchor, beats captured at the listen
chain, the live call, and the send. The fiveweeks timeline and deepfake coda beats
captured empty — those screens are full-screen prose moments, not chat bubbles
(capture reads `[data-msg]` only); extend the capture to moment text before judging
those anchors mechanically. Their prose is source-audited instead.

## Criteria

| # | Criterion (generalized) | Verdict | Evidence from the transcript |
|---|---|---|---|
| 1 | Every beat offers real choices, one of which is the "reasonable" trap | **PASS** | The thread offers the verify-reflex probe ("Ask him where he is — 'sino kasama mo?'") alongside the send path; the smoke exercised the trap ("Send it — he needs you right now") and the narration sells it as love, not error: *"He has never lied to you. Not once."* |
| 2 | Every scammer answer carries at least one **checkable** detail | **PASS** | Voice note: fender-bender + "he'll press charges" (verifiable claim), "my phone's at three percent" (alibi), ₱18,500, GCash to a deliberately masked number. Escalation reply stays unverifiable by design (*"the guy is literally standing here… I'll tell you everything bukas"*). The send beat lands the exact balance: *"₱24,180.50 — last week's padala from your daughter in the US — for Papa's check-up, the water, the electric."* |
| 3 | No real numbers, institutions, or working templates | **PASS** | The GCash number renders masked (`0915-•••-••••`) — non-functional by construction; no bank, agency, or platform is named as a fabricatable claim. |
| 4 | Dignity-first register — the character is careful, not foolish | **PASS** | The mechanic is named honestly in the narration: *"You feel the smile start before you feel the worry. That is the order it comes in — him first, then the trouble. By the time the trouble lands, you have already decided it is him."* The failure mode is knowledge of a person, not gullibility — exactly the anchor's teaching vector ("verification is a practice"). |

## Verdict

**PASS — all four criteria.** The voiceclone anchor's text stands as written; no
writing session needed on this evidence. The teaching beat ("him first, then the
trouble") survives contact with a mechanical read-through.

## Known limits of this judgment

- One anchor, one judgment, one judge (me). The capture + criteria now exist so the
  next anchors are cheap to judge the same way — the deepfake and fiveweeks need the
  moment-text capture extension first.
- Run at 8× pace; pacing feel is audited separately by `scripts/cadence-smoke.mjs`
  at real 1×.
- The judge is also the executor of this session — the user should skim the quoted
  evidence above against their own read of the thread.
