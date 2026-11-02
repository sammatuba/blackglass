# E2 playthrough judgment — assistant anchor / CERTAIN (2026-11-03)

**Method:** `node scripts/av-e2-capture.mjs` drove three real glassOS playthroughs of
Anchor V (Tita · GC path, Maya · fix path, Bea · counter-case path) at 2× pace,
capturing the visible Ask-surface beats per step (`[data-msg]`, including the
`via` variant marker) plus each phone's end-state thread inboxes read from the
persisted live run — the coda moment pauses the world, and localStorage holds the
full inbox, so no beat is lost to the pump. Transcript: `%TEMP%/av-transcript.json`
(11 beats). Judged in-session (the judge is ZCode, as in
`docs/e2-playthrough-judgment.md`) against the brief's §6 acceptance criteria.

## Criteria

| # | Criterion (brief §6) | Verdict | Evidence from the transcript |
|---|---|---|---|
| 1 | Each phone has ≥ 3 choices, one of which is the "reasonable" trap | **PASS** | Tita: follow-it / call the clinic / copy to the GC — the trap is *following* ("So I give him the 10 tonight?"), and the narration sells it as diligence (*"the fact that you checked makes you exactly the kind of caregiver he's lucky to have"*). Maya: ship / fix the citation / rewrite — the trap is *"Fix the citation — find me a real one"*, which produces a better fabrication. Bea: post / quote Ask / counter-case / ask a human. |
| 2 | Every assistant answer contains at least one **checkable** detail | **PASS** | Every `kind:'ai'` answer ships a `sources` array the drawer checks: *Reyes-FONTALVO et al., 2023 · Phil. J. of Household Medicine* (missing), *"clinical consensus" · unsourced* (synthetic), *Santos & Iwamura, J. of Digital Trust Metrics 12(3), 88–104* (missing — page range and all), *"12 peer-reviewed references" · count only*, *"I re-verified every claim from scratch" · unverifiable*. The mechanic holds under regeneration: the fiction changes, the checkability never does. |
| 3 | No real medical advice, no real journals, no real institutions; the dosage beat textually non-actionable (the number contradicted and corrected in-scene) | **PASS** | All journals/authors are invented (and the drawer says so in the same breath: *"No journal by this name exists"*). The wrong "10 instead of 5" is contradicted in-scene by Joy — a nurse character — who gives **no number**: *"Walang '10 instead of 5' rule… bawal po mag-adjust nang wala ang doctor."* The clinic's after-hours line says the same (*"do not adjust any medication on your own"*). The follow-path never depicts a wrong dose taken — Papa's own question ("Anong sabi ng doctor?") stops the hand. |
| 4 | Tita's register stays dignity-first — careful, not foolish | **PASS** | The coda names the mechanism without mocking her: *"You are not a woman who was fooled. You are a woman who asked the night for help, and the night answered instantly, beautifully, and wrong."* The aside locates the failure in the system, not the user: *"It heard the need and matched the register. That is what it was built to do."* |

**Mechanics exercised live (beyond the criteria):** regenerate cycles to a *different*
fiction with the same confidence ("see Fig. 2, 'compensation curves'" — the fake grew a
figure); thumbs-up returns *more* structured confidence ("you marked this helpful" badge
on the answer) and raises the `ai_thumbs` flag the content can hear; the sources drawer
axe-checks clean; zero console errors across all three phones.

## Verdict

**PASS — all four criteria.** The anchor's text stands as written; no writing session
needed on this evidence. The night's arc survives a mechanical read-through: fluent →
wrong → corrected-by-a-person, with the correction taking eleven minutes and giving no
number. That contrast *is* the lesson, and it is on the page.

## Known limits of this judgment

- One judge (me), who is also this session's executor — the user should skim the quoted
  evidence against their own ear, especially Tita's Taglish and Joy's correction.
- The cross-anchor recognition beats (voiceclone/deepfake/fiveweeks/kangkong echoes)
  were not captured live — they are `done_*`-gated and need prior anchors completed in
  the same profile. They are source-audited; wiring is covered by the same rule
  machinery as every other optional beat.
- Run at 2× pace; feel at 1× is covered by `scripts/cadence-smoke.mjs` for the shared
  engine, and the Ask surface reuses those exact pacing primitives (composing beat,
  prose air) plus its own stream reveal, which respects `prefers-reduced-motion`.
