# Flow naturalization — V1 → V2 record

*2026-11-07 · the prose surgery pass on `immersion-pass-2` (`os-imm:` commits) ·
companion to `docs/IMMERSION-FRAMEWORK.md` §1.2 (the V1 → self-critique → V2 loop)
and the reply-composer / inspection-gate mechanics.*

## What V1 did wrong (self-critique, recorded before the rewrite)

1. **It pre-delivered the interpretation.** `may-stop` (kk-maya) and `bea-won`
   (kk-bea) landed essay-length `narr`/`aside` bursts that enumerated the
   tells — the same tells the artifact surfaces already carry — at the exact
   moment of choice. Exploration of the actual artifacts was optional; the
   prose did the player's matching for them.
2. **It contradicted the player.** `bea-won`'s aside opened "You do not notice,
   because you are not looking for it" — but the rule is gated on
   `inspected: 'anita'`: the player *just* opened the clip and its six-tell
   examine layer. The prose told them they hadn't looked.
3. **The reply menu pre-interpreted the choice.** Chips with editorial labels
   ("Cross-check the Snopes tab you've had open six days") read as game UI,
   not as messages a person sends.

## What V2 does

- **The artifact carries the analysis; the prose carries the felt line.**
  `may-stop` keeps two short felt narrs (EXPOSED as a felt lever; the `.click`
  that stares back) and drops the essay; "care into authority" folded into the
  `KK_TELLS` "A doctor with no name" card where the player does the reading.
- **Complicity instead of enumeration.** `bea-won`'s aside now performs what
  the run actually did: watched twice, saw the tells, kept watching because
  being right feels like being warm. The six tells stay on the video page
  (unchanged); the beat stops repeating them and starts implicating.
- **Replies are drafts, not buttons.** The shared `ReplyComposer` types the
  chosen draft into a real composer (instant under reduced motion) and the
  player presses Send themselves. `sub` lines survive as quiet second-thought
  text on the draft cards.
- **Nothing hard-locks.** The one inspection gate (`bea-won`) gained a soft
  `nudgeApp: 'browser'` after 3 idle beats — the phone glows, the player
  decides.

## Rules observed

- Guardrails: no new concepts named in-fiction; the tells stay content-not-label;
  the aside keeps the guardrail's "player's own choices implicated" direction.
- Additive discipline: shipped rule ids, flags, endFlags and evidence ids are
  untouched — the ledger stays GREEN; one new nudge rule (`bea-clip-nudge`)
  sets no flags.
- The composer adds no story latency: it animates between pump beats, and
  reduced-motion collapses it to an instant fill.
