# Glassbox — the LEARN pillar with the lid off

*Direction recorded 2026-10-22. First piece: ONE IN A THOUSAND.*

**Status 2026-10-22:** shipped — `/glassbox/one-in-a-thousand` as a scrollytelling explorable:
pinned paper stages, four scroll-linked scenes, hub feature card; model tests, build, and smoke green.

## The decision

Blackglass keeps its three ways of knowing, and gives LEARN a real format:

- **PLAY — live it.** The phone anthology. Unchanged.
- **TRAIN — practice it.** Scam Radar and the Tell Exam. Unchanged.
- **LEARN — take it apart.** **Glassbox**: short, self-contained explorables where one
  mechanism of AI-era deception becomes a model the reader can turn.

The four legacy LEARN titles stay playable on a reference shelf below the Glassbox
feature. They are no longer the pillar's identity.

## Why this format

ncase's *The Evolution of Trust* works because the reader plays the model before it is
named: a match against a copycat, then the payoff matrix, then the tournament and the
noise slider until the counterintuitive result belongs to the reader. explorabl.es
codifies the genre: a toy for thought, not a game to win or a quiz to pass.

Blackglass already has felt experience (anthology) and deliberate practice (trainers).
It has no place to *discover* the mechanism. Glassbox fills that gap. It is also the
natural home for the systemic lessons the fiction can only dramatize: the economics of
scale, the drift of a feed, the half-life of a pixel-level tell.

## The format

Each Glassbox piece:

1. Starts with one concrete question, not a curriculum.
2. Shows a visible model — the formula and the assumptions are inspectable.
3. Gives three or four controls, not a dashboard.
4. Contains one designed reveal and one lever the reader can pull.
5. Discloses what the model does not say.
6. Points back into the fiction or the trainers.

Rules: 5–8 minutes; no score, no fail state, no accounts; local-only; mobile-first;
keyboard, screen-reader, and reduced-motion safe; no external assets unless the piece
is *about* them.

The register is deliberate: the fiction is dark glass; Glassbox is the paper workbench
where the glass is taken apart. The dark suite frames a warm ledger page — an
investigator's notebook, not another game card. Same tokens, different document.

## Piece 01 — One in a Thousand

**Question:** How does a scam that almost never works still pay for itself?

**Anchor:** Tita Merly's voice-clone evening (`IT'S ME / One Evening`; ₱18,500 sent at
8:21 PM). The reader has lived the call; the ledger shows the business behind it.

**Model (expected values, not a forecast):**

```
profit = reach × (reply rate × payment rate × average take − cost per message)
```

- Payment rate among replies is fixed at 10% in this model.
- Verification blocks 99 of 100 payments among the people who use it.
- Rates are round, illustrative figures chosen to make the arithmetic legible.

**Controls:** people reached per day, cost per message, reply rate, average take.
Two presets — **AI line** and **human crew** — establish the comparison.

**Outputs:** profit per day, replies, payments, messages per payment, the break-even
verification share. A 1,000-dot sample makes the denominator visible; amber dots
replied, one green square paid.

**The discovery:** the human crew's line goes red at roughly 14% verification
adoption. The AI line survives to roughly 98%. Cheap reach makes deception robust to
doubt. The defense is not a sharper individual eye; it is a slower last mile, adopted
as a norm. The model is honest about the uncomfortable part: partial adoption does not
change the volume business.

**Link back:** `/blackglass` (the second phone) and `/scam-radar` (practice the pause).

## The scrollytelling cut

The piece is delivered as **read + decision beats**, not a dashboard dropped into a page.
Four scenes — `#ledger`, `#sample`, `#machine`, `#defense` — pin a paper stage while
short steps scroll past it. The stage changes as the argument advances:

1. **Ledger** — the day's arithmetic assembles row by row.
2. **Sample** — 1,000 dots resolve into the denominator; two square markers pay.
3. **Machine** — the controls belong to the pinned sheet, so input and output stay in
   the same field of view while the reader tunes reach, cost, reply rate, and take.
4. **Defense** — the verification lever sits under the stage copy; drag it and the
   margin crosses the break-even marker.

Scroll is **emphasis, never disclosure**: every step is always in the DOM in reading
order, so keyboard, screen reader, search, and no-JS-style reading all get the full text.

### How it stays cheap

- **Top reading rail** — native CSS `animation-timeline: scroll(root block)` behind
  `@supports`; browsers without scroll timelines simply hide the rail.
- **Step reveals** — native `animation-timeline: view()` with `animation-range`, again
  progressive enhancement. No JavaScript runs per frame for reveal animation.
- **Active step** — one passive `scroll` listener coalesced into a single
  `requestAnimationFrame`. It reads four inner-content rects and calls `setState` only
  when the active step actually changes. No IntersectionObserver churn, no scroll
  library, no new dependency.
- **Reading line** — 48% of the viewport on desktop; 64% on mobile, where the pinned
  sheet owns the top 44dvh. Breaks at 900px, recalculated on resize.
- **Layout** — desktop is a two-column grid with a sticky left stage. Mobile stacks a
  sticky 44dvh sheet over 58svh steps. Below 520px height the stage stops being sticky
  and the steps take their natural height, so a landscape phone never traps the reader.
- **The sample** — 1,000 memoized spans, not canvas; only the eleven marked dots carry
  `--dot-order`. Reveal is opacity/transform only.
- **The lever** — Motion's spring is used for the one “Test 100% adoption” action; the
  slider itself is native and keyboard-readable.
- **Reduced motion** — rail, reveals, and step dimming are removed at the source; content
  renders fully visible and the lever jumps straight to its result.

The paper stage is deliberately art-directed, not templated: ruled sheet, red margin
rule, stamps, teal controls, and a red break-even marker. Meaning never depends on
color alone: paid dots are squares, and the break-even state is stated in text.

## Guardrails

- Aggregate economics only. No real channels, scripts, targets, tools, or working
  scam templates. The piece teaches defense.
- The human cost sits under the average take: the ledger names the payment as
  someone's ₱18,500, not a unit of revenue.
- The model explicitly omits reporting, takedowns, bank/payment friction, platform
  enforcement, repeat victims, and everything that would make the arithmetic more
  hopeful.
- Illustrative numbers are labeled in the UI and in the model disclosure.

## Material unknowns

- Whether a first-time reader should meet the ledger **before** the call (the hook is
  the mechanism) or **after** it (the hook is the person). We ship the after-the-call
  framing and can A/B it later.
- Real-world base rates for AI-era scam economics. This piece deliberately uses
  illustrative rates; a sourced version would need research and a different tone.
- Whether the next piece should be **The Feed Dial** (emergent recommender drift) or
  **Tell Decay** (what survives re-compression). Both are queued; neither is scheduled.
- Whether the Glassbox shelf eventually becomes its own top-level pillar. For now it
  is the LEARN identity, not a fourth pillar.

## What would change this decision

- If the user wants the existing anthology itself to become tinkerable (diegetic
  interludes), this parallel shelf is the wrong shape.
- If the audience turns out to be classroom/desktop rather than mobile general
  public, interaction density can rise.
- If sourced rates show the volume thesis is misleading, the piece must be rebuilt
  around the real mechanism rather than keep a satisfying number.

## Verification (observable checks)

1. `npm test` — model arithmetic: defaults (25 payments/day, 1 in 1,000, ₱450,000),
   the human preset (₱500, 1 in 2,000), verification at 100% (negative), the
   break-even jump, and the "even universal verification" edge case.
2. `npm run build` — the explorable is a lazy route chunk; no new dependencies.
3. `node scripts/glassbox-smoke.mjs` against `npm run preview` — direct route, hub
   fallback, preset change, defense reveal, slider to 100%, zero console errors, axe
   clean on serious/critical, no horizontal overflow. Scroll checks: every step in all
   four sections activates; every pinned stage fits its viewport; dot swatches resolve
   at the field and payment beats; the lever reports `−₱7,875` both by slider and by
   the “Test 100% adoption” animation. Also runs 320×568, 1440×900 desktop (sticky
   stage at y=72), and a reduced-motion load where reveals are fully visible and the
   rail is absent. On hosts without system Chrome, pass `CHROME_PATH` to a Chromium
   binary.
4. Copy check — illustrative numbers labeled; no operational detail; link to the
   voice-clone anchor and Scam Radar present.
5. Manual read on a phone — the ledger, the dot sample, the controls, and the defense
   are usable with one thumb; the dot sample is decorative and the counts are text;
   the pinned stage never eats more than the top 44dvh of a short phone.

**Executed 2026-10-22:** `npm test` 33/33 (6 Glassbox model tests); `npm run build`
(tsc clean; Glassbox route chunk, PWA precache 1.67 MiB); `scripts/glassbox-smoke.mjs`
exit 0 — default ₱450,000, human ₱500, AI restored, inactiveSteps [], stageClipping [],
dots 0/0 at field and 1/1 at payment, break-even 98.3%, deployed and tested defeat
−₱7,875; axe 0, zero console/page errors; 320×568 compact stage fits and all steps
activate; 1440×900 sticky stage and all steps activate; reduced-motion load has fully
visible reveals, no rail, and the lever at −₱7,875. Screenshots for hero, each scene,
close, 320px, and desktop reviewed. Open reference shelf 4 links / 0 overflow; hub
smoke re-run (canvas + axe clean).
