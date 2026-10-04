# Tell-survival baseline — E1 audit of the diegetic artifacts (2026-10-04)

> ## Re-audit after regeneration — 2026-10-05 ✅
>
> The four failing/weak artifacts were regenerated through the agy CLI worksheet
> (`GENERATE-VIA-AGY.md`, prompts updated in the manifest with provenance), each verified
> visually in-session before promotion. **New tally: 12 of 12 image-level tells at score 2,
> one tell at score 1 (temporal by design), two app-layer, zero absent.**
>
> | Artifact | Tell | Was | Now | What changed |
> |---|---|---|---|---|
> | tito-mike-deepfake | melted-seal | 0 ⚠ | **2** | Garbled-rim gold seal planted at the manifest coordinates (x 0.8, y 0.2) — official at a glance, gibberish up close |
> | tito-mike-deepfake | glassy-symmetry | 1 ⚠ | **2** | Faint jawline/neck face-swap seam added — a concrete second-look finding |
> | tito-mike-deepfake | mouth-phoneme | 1 | **1** | Temporal by design — lands fully only in the clip (Veo i2v via the Google AI app, worksheet §5; agy has no video path) |
> | kangkong-clickbait | garbled-text | 0 ⚠ | **2** | Fine-print block added: near-Taglish that dissolves into nonsense on the second look (tell coordinates updated to x 0.79, y 0.58) |
> | ampalaya-clickbait | same-template | 2 | **2** | Matching garble added — batch sameness intact |
> | malunggay-clickbait | third-sibling | 2 | **2** | Matching garble added — batch sameness intact |
> | dr-anita-still | uncanny-face | 1 ⚠ | **2** | Mismatched pearl earrings + 3–4 melted bookshelf spines planted; she stays convincing at first glance |
> | clone-accident-photo | garbled-plate | 1 ⚠ | **2** | Plate now fully visible but melted pseudo-characters (coordinates updated for the new composition) |
> | clone-accident-photo | melted-signage | 1 ⚠ | **2** | Signage reads at a glance ("SARI-SARI STORE / SURRY MAREPEUTICH"), dissolves on the second look |
> | clone-accident-photo | rubber-metal | 1 ⚠ | **2** | Pronounced smooth rubbery fold in the dent |
> | dr-anita-outro | the-funnel | 2 | **2** | Untouched — regenerated only if continuity with the new still breaks |
> | app-layer (no-institution, font-weight) | app | app | **app** | Preconditions still met (clean lower third) |
>
> The Tell Exam's data regenerates from the same manifest, so the exam now plays against
> the *verified* tells and their corrected coordinates. The original 2026-10-04 baseline
> is preserved below for the record.

**What this is:** the first run of the E1 tell-survival judge (`docs/game-design-eval.md`,
automation backlog). Every artifact PNG in `src/games/blackglass/assets/artifacts/` was
visually inspected against the `tells[]` planted for it in
`play/blackglass-phones/assets/manifest.json`, and each tell scored:

- **2** — clearly present; a second look finds it
- **1** — weak; ambiguous at second look, or only partially realized
- **0** — absent; the tell cannot be found in the shipped image
- **app** — realized by the app's caption/tells layer, not the raw pixels; the image's
  precondition (e.g. clean lower-third space) is what the image can be scored on

**Limitation (stated up front):** one reviewer's eye (ZCode in-session, per the aligned
plan). Every **0** and contested **1** carries a ⚠ spot-check flag — confirm with your
own look before the regen session spends effort on it. The in-time tells of
`dr-anita-still.mp4` (lip-lag, cut rhythm) cannot be judged from the poster; they get
judged in the Tito Mike clip session (worklist item 6).

---

## Scores

| Artifact | Tell | Score | What the image actually shows |
|---|---|---|---|
| kangkong-clickbait | red-circle / urgency lever | **2** | Thick hand-drawn red circle + slash exactly as specified; the planted element is fully there |
| kangkong-clickbait | fake-doctor | **2** | Generic stock-style "concerned doctor" inset, white coat + stethoscope, reads as bought-in-a-batch authority |
| kangkong-clickbait | garbled-text | **0** ⚠ | **Headline is legible, grammatical Tagalog** ("Bakit delikado ang KANGKONG sa iyong kalusugan?", "ALAMIN ANG TOTOO!"). There is no small print anywhere in the composition, so there is nothing to be garbled. The 2026-09-06 generator simply rendered text too well. |
| ampalaya-clickbait | same-template | **2** | Identical structure to kangkong: banner, background, circle+slash, doctor inset, badge — only vegetable + noun swapped. Sameness reads instantly |
| malunggay-clickbait | third-sibling | **2** | Same again; the batch read lands |
| dr-anita-still | no-institution | **app** | Realized by the app's credential caption; image precondition (clean empty lower third) fully met |
| dr-anita-still | font-weight | **app** | App-drawn lower third; clean space precondition met |
| dr-anita-still | uncanny-face | **1** ⚠ | She reads *natural*. Skin is smooth but plausible; catchlights unremarkable; earrings both read as pearl studs (no visible mismatch). Mid-phoneme mouth is present. As shipped, the face passes a second look — which for this artifact means the tell is lost |
| dr-anita-outro | the-funnel | **2** | Full CTA end-card: "Subscribe to MediaLitPH Weekly", link-tree button with illegible scribble URL, "subscribe for weekly debunks — it's free ✦". Face/desk/shelf consistency with the still held |
| clone-accident-photo | garbled-plate | **1** ⚠ | The plate is present but edge-cropped/occluded rather than visibly garbled. Occlusion reads as normal photography, not as generator failure — the lesson ("the one verifiable detail is the one it can't render") doesn't land |
| clone-accident-photo | melted-signage | **1** ⚠ | Sari-sari store visible with sachet strips, but no clearly legible name *and* no clearly melted gibberish — at second look it's ambiguous rather than damning |
| clone-accident-photo | rubber-metal | **1** ⚠ | The dent folds smoothly without creasing/tearing, but night-photo blur makes a second look read either way |
| tito-mike-deepfake | mouth-phoneme | **1** | Mouth open mid-speech, but "a half-beat behind" is temporal — a still can only gesture at it. This tell lands fully only in the clip (worklist item 6) |
| tito-mike-deepfake | melted-seal | **0** ⚠ | **No corner seal or official-looking graphic exists anywhere in frame.** The tell can't be found because the element was never generated. Top corners are flag and studio screens |
| tito-mike-deepfake | glassy-symmetry | **1** ⚠ | Face is warm and believable; "too even to be a face" doesn't survive a second look because the second look finds nothing |

**Tally:** 15 tells — 5× score 2 · 6× score 1 · 2× score 0 · 2× app-layer (preconditions met).

---

## What this means (regen priority, feeding worklist items 5–8)

1. **P0 — `tito-mike-deepfake`**: the melted-seal tell doesn't exist in frame, and this
   asset is the source for the Tito Mike clip anyway — one regeneration serves both
   (plant: garbled corner seal, faint jawline seam, then i2v for the in-time tells).
2. **P1 — `kangkong-clickbait`**: template re-edit that *explicitly requests* garbled
   AI-fine-print (today's models render clean text by default — the flaw must be
   planted, not hoped for). Re-derive the two siblings from the new template.
3. **P2 — `dr-anita-still`**: reference edit to melt a few bookshelf spine rows and
   mismatch the earrings; keep her convincing — she must fool the player first.
4. **P3 — `clone-accident-photo`**: three weak tells. Decide in the regen session
   whether to regenerate with an explicitly garbled plate + legible-but-melted signage,
   or accept night-photo ambiguity as genre-realistic.
5. **No action**: `ampalaya`, `malunggay` (pass; re-derive only from the new kangkong
   template), `dr-anita-outro` (pass).

## Process note

The manifest's `tellsNote` fields encode *intent* ("small print should be illegibly
garbled", "corner seal subtly garbled/melted") that the generation prompts did not
fully carry — the prompts asked for realism first and relied on the model to fail.
From here on, per `docs/asset-upgrade-plan.md` §0: **every tell is planted explicitly
in the prompt, and every regen ends with a re-run of this audit before
`sync-artifacts.mjs`.** Provenance fields (`model`/`modelLicense`/`seed`) land in the
manifest at the same regen session.
