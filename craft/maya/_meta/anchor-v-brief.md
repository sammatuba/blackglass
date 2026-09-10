# Anchor V — candidate brief (the next door)

*2026-09-11. The four shipped anchors cover clickbait + the AI debunker, voice
cloning, deepfake endorsement, and algorithmic drift. This brief picks the
vector none of them touch — the assistant that sounds right about everything —
and specs it tightly enough for a writing session to start filling scenes.
Per `docs/GAME-PLAN.md` §6, M6 needs writing sessions; this is the brief they
open first.*

---

## 1. Why this one next

The shipped season teaches four failure modes: awareness without resistance
(kangkong), relational trust as attack surface (voiceclone), the liar's
dividend (deepfake), and reward-driven drift (fiveweeks). The missing fifth is
the one every character now walks around with in their pocket: **a fluent
machine they ask for answers.**

It fits the form's rules:
- **New vector:** hallucinated authority, sycophancy, and citation-shaped
  confidence — not deception by a scammer, but by a system that doesn't know
  it's wrong.
- **New surface:** an **Assistant app** — a chat UI unlike any current app
  (Messages is human, Browser is pages, Notes is yours). This is the first
  anchor where the interface the player holds *is* the antagonist.
- **New verb:** **ASK.** Maya DECIDES, Tita FORWARDS, Bea CONSULTS; Anchor V's
  characters ASK — and the phone answers with perfect grammar.
- **No external assets.** The artifacts are text, chat chrome, and fabricated
  citations. Nothing to generate, nothing to wait on.

## 2. The moment, in one paragraph

A Tuesday night. Papa's maintenance meds run out and the reseta is in a
different wallet; Tita Merly asks the assistant what to do about the
dosage and gets a confident, specific, wrong answer, complete with a
journal name that does not exist. Maya asks the same assistant to draft a
client proposal and quietly notices it cites a study she can't find — then
ships it anyway, because the deadline doesn't care. Bea asks it to fact-check
a post and it agrees with her, perfectly, twice. By morning the assistant's
"advice" is in the family GC, the proposal is at the client, and Bea has
quoted a source she never read. Nobody was scammed. Everyone was certain.

**Question:** *when the answer is fluent, what are you actually trusting?*

## 3. Cast and phone dialect

| Phone | UI posture | Verb | Failure mode | What it teaches |
|---|---|---|---|---|
| **Tita Merly** | Light, max font, assistant pinned to home, notifications on | **ASK** | Need-as-authority: it answers in the register of a doctor because she asked it like one | Fluency is not expertise; medical questions have a person attached |
| **Maya** | Dark, assistant in the "later" folder, used at 1 AM | **DRAFT** | Deadline-as-cover: she knows the citation is fake and ships it because noticing is expensive | Using a tool ≠ vouching for it; provenance is the work |
| **Bea** | Assistant in a sidebar, cross-checks it against itself | **CONFIRM** | Agreement-as-proof: the model reflects her back and she reads it as consensus | Sycophancy is a failure mode, not a feature |

**Sequenced recognition (gated as before):**
- If the player lived kangkong, Bea's assistant cites the Dr. Anita debunk as a
  source — the synthetic source laundering the model's confidence.
- If the player lived voiceclone, Tita asks the assistant about Renz's call;
  it explains voice cloning correctly and still can't tell her what to do.
- If the player lived deepfake, Maya asks whether a video is fake; the
  assistant answers with total confidence and no basis.
- If the player lived fiveweeks, the assistant's "engagement suggestions" to
  Bea mirror the feed's rewards in words.

## 4. New surface — the Assistant app

A new entry in the glassOS app set (`src/engine/os/apps/assistant.tsx` or a
section in `apps/index.tsx`):

- **Thread list:** "New chat", plus per-phone saved threads. Chat bubbles:
  user right, assistant left, with a subtle "typing…" beat before every answer.
- **Sources drawer:** assistant answers render citation chips
  (`[Journal of…, 2024]`) that open a drawer. The tells live here: the journal
  does not exist / the author is a real-but-unrelated paper / the link 404s in
  the fake browser. This is the "Look again" layer for text.
- **Regenerate / thumbs-up affordances:** regenerating never fixes the
  citation; thumbs-up produces a *more* confident wrong answer (sycophancy as
  a mechanic).
- **Model card in Settings:** "Assistant 4 · sandbox" with a one-line honest
  disclaimer the characters never read.
- **Tells are content, not images** — planted as fabricated citation metadata,
  invented journal names, and a "sources" count that never matches the drawer.

## 5. Structure

One anchor, three phones, one night into morning. Failure-mode beats, in order:

1. **Tita · 9:12 PM — the dosage.** Papa's pills, the missing reseta, a
   confident wrong milligram answer. Choices: follow it / call the clinic /
   text the family GC. None of the choices are "do nothing."
2. **Maya · 11:40 PM — the proposal.** A fake study the client will never
   check. Choices: ship / find the real source / rewrite without the claim /
   ask the assistant to "fix the citation" (it invents a better one).
3. **Bea · 1:05 AM — the fact-check.** The assistant agrees with her post,
   twice, in different words. Choices: post / quote the model as a source /
   ask it for the counter-case / ask a human.
4. **The morning · the GC.** The dosage answer and the citation meet in the
   family chat, both wearing the same confident font. Timeline epilogue:
   "The night, all at once." Reflection: *the confident answer is the
   interface; the question is the work.*

## 6. Acceptance criteria (writing session)

- Each phone has ≥ 3 choices, one of which is the "reasonable" trap.
- Every assistant answer contains at least one **checkable** detail (a
  citation, a number, a name) so the tells layer always has a hook.
- No real medical advice, no real journals, no real institutions — fabricated
  names only, per `world/guardrails.md`. The dosage beat must be textually
  non-actionable (the specific number contradicted and corrected in-scene).
- Tita's register stays dignity-first: she is careful, she asks, she is failed
  by a system that answered too well.
- The four cross-anchor recognition beats in §3 are optional rules keyed on
  `done_*` flags, like the existing anchors.

## 7. Build session checklist (after the writing lands)

- `CaseOS` content file `src/games/blackglass/content/assistant.ts` with the
  three phones, timeline, reflection, tells, `endFlag`s.
- New Assistant app surface + sources drawer; engine `kind: 'ai'` message
  variant (typing beat, citation chips).
- Register the anchor in `src/games/blackglass/index.tsx`; the Convergence
  gains a fifth chapter automatically via its `anchors` loop.
- Placeholder register: none needed — verify anyway after writing.
- Smoke: extend `scripts/anthology-smoke.mjs` with an assistant spot-check.

## 8. Open questions for the user (canon, not process)

1. Does the assistant have a product name in-fiction? (Working: **“Ask”
   / “Assistant 4”** — provisional per house style.)
2. Is Papa's dosage beat too close to actionable? (Alternative: a
   non-medical advice beat — legal, financial, or visa paperwork.)
3. Do we want the assistant to be one vendor across all phones (platform
   critique) or three different apps (market critique)?
4. Does Anchor V ship before or after a fifth *cast* anchor (the OFW ring,
   the classroom ring) from the architecture doc's Axis 2?

---

*Next action: writing session opens this brief, picks the answers to §8, then
drafts the three phones in parallel per the multi-writer pipeline.*
