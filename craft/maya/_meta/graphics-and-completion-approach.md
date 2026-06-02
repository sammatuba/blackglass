# Graphics & Completion Approach — BLACKGLASS phone-anthology

**Status:** decided 2026-06-02. Phase 1 pipeline being built.
**Scope of this doc:** how the phone-anthology goes from "strong CSS-only vertical slice" to a finished game with real generated imagery, *without* breaking the zero-dependency / offline / `file://` constraints.
**Read first:** `phone-anthology-architecture.md` (the form), `../README.md` (scene status). Build target: `play/blackglass-phones/`.

---

## The three decisions (confirmed with the creative lead)

1. **Image register — DIEGETIC-ONLY.** We generate *only the artifacts the characters are fooled by* — the things on the glass that the deception is made of. The phone UI itself (wallpapers, app icons, device chrome, home screens) stays spare CSS. **Principle: images for what they SEE, restraint for what they FEEL.** Rejected: photoreal wallpapers/texture (would over-specify literary beats like "Mt. Pulag wants nothing from her") and full visual treatment (tips the literary register into an app/marketing look).

2. **Scope of "fully" — BOTH PHASES, SEQUENCED.**
   - **Phase 1 (now):** finish *this* morning (the kangkong anchor) to genuinely shippable — real diegetic artifacts + the tells-reveal mechanic + sound + accessibility + motion polish. Depth before breadth.
   - **Phase 2 (next):** complete the anthology — the already-designed voice-clone 4th phone, Bea's 5-week algorithmic-acclimation arc, and one additional anchor moment. The engine already supports these.

3. **Generation seam — SCRIPT + USER'S KEY.** Generation is *authoring-time*, not runtime. A prompt manifest lives in git; a zero-dep Node script (`gen-images.mjs`) calls the Gemini image API with the user's `GEMINI_API_KEY` and writes static files into `assets/`. The shipped game only ever references those static files. **Nothing is fetched at runtime; the game is fully playable with zero images** (every artifact has a CSS fallback). Images are pure, removable enhancement.

---

## The load-bearing idea: weaponize the images as the lesson

The artifacts these characters are deceived by — the clickbait thumbnail, the deepfake "Dr. Anita V." debunk, the voice-clone — *are AI-generated artifacts inside the fiction.* Generating them with Gemini is therefore authentic, not ironic: the player sees a real synthetic image and feels its pull.

Then go one step further. The prose already names the **tells nobody notices** (Bea's draft: "lips forty milliseconds behind her voice," "the 'Dr.' has no institution attached — just a specialty," "the lower-third font weight is slightly off, as if added in post," "the last ten seconds pivot, gently, to a newsletter"). So we generate each artifact **realistic-but-deliberately-flawed**, plant those exact tells, and let a **tells-reveal layer** (in the reflection / re-read) expose the seams the characters missed.

The AI-generated image stops being decoration and becomes the **teaching surface**. That single move is the whole mission ("see clearly in a world shaped by AI") compressed into one interaction — and it is only possible *because* we used AI to make the artifact. **This is the thing to protect above all.** Generate convincing-but-flawed; never generate seamless. The tell is the payload.

---

## Phase 1 — the diegetic artifacts the kangkong morning needs

Enumerated from `story.js`. Each is something a character is shown and (mis)reads.

| id | what it is | seen by | the planted tell(s) |
|---|---|---|---|
| `kangkong-clickbait` | The hero artifact: clickbait link preview. Kangkong circled in red, dark-green field, "EXPOSED…" headline, `healthtruthph.click`. | Maya (GC), Tita (Viber + her forward), Bea (Maya's screenshot) | `.click` TLD; AI-generated "concerned doctor" stock face; red-circle urgency lever; mismatched shadow on the circle; a hairline of garbled sub-text |
| `ampalaya-clickbait` | Sibling template, different vegetable — proves the batch / A-B test. | Bea (Camille's forward; the side-by-side) | identical layout to kangkong, swapped vegetable + headline noun — sameness *is* the tell |
| `malunggay-clickbait` | Third sibling (Bea: "seen a malunggay one too"). Optional; strengthens the side-by-side. | Bea (referenced) | same as above |
| `dr-anita-still` | The deepfake debunk video still. Woman in blazer at a desk, books behind, "DEBUNKED" in red, lower-third "Dr. Anita V. \| Health Communication Specialist." | Bea (TikTok) | no institution on the "Dr."; lower-third font-weight inconsistent; subtly uncanny face (too-smooth skin, off earring/asymmetry, unreadable book spines); mouth slightly mid-phoneme |
| `dr-anita-outro` | The last-ten-seconds pivot still: newsletter CTA "MediaLitPH Weekly," a Linktree URL, "subscribe for weekly debunks, it's free." | Bea (does not register it) | the revenue model — the debunk is a funnel |

Voice notes (Joy, 22s) stay as the CSS waveform for Phase 1. Real synthesized audio is a Phase-2 stretch (different modality; the *length* already carries information).

---

## The pipeline (how it fits the constraints)

```
craft/  ── prompts authored here-ish ──►  assets/manifest.json   (in git)
                                              │
                            node gen-images.mjs   (GEMINI_API_KEY)   ← authoring-time
                                              │
                                     assets/*.webp|png             (generated, git-ignored or committed)
                                              │
play/blackglass-phones/app.js  ──►  <img src=assets/...  onerror→CSS fallback>   ← runtime, offline
```

- **`assets/manifest.json`** — one entry per artifact: `prompt`, `size`/`aspect`, `tells[]` (label + normalized region for the reveal), `fallback` (existing CSS class), output `file`.
- **`gen-images.mjs`** — zero npm deps (Node ≥18 `fetch`). Reads manifest, calls Gemini, base64-decodes inline image data, writes files. Skips existing unless `--force`. Supports `gemini-2.5-flash-image` (Nano Banana — best for *consistent-subject edits*, which Dr. Anita's two stills need) and Imagen via env override.
- **Renderers** — `renderLink` / `renderVideo` gain an optional artifact image. `<img onerror>` swaps back to today's CSS if the file is missing. So: no key, no images → the game looks exactly as it does now. Run the script → artifacts appear. **Graceful degradation is the contract.**
- **Tells-reveal** — a reflection-layer "examine what fooled them" view re-shows each artifact with tappable callouts positioned from the manifest's `tells[]`. Works (as labeled callouts over the CSS fallback) even before any image exists.

### Subject consistency note
Dr. Anita's `still` and `outro` must be the same fabricated person. Nano Banana supports passing a prior output as an input image part for edit-consistency — the script generates `dr-anita-still` first, then conditions `dr-anita-outro` on it. Keep the seed/source coupling in the manifest.

---

## What ships vs. what's deferred

**Phase 1 ships:** the pipeline (manifest + script + img-aware renderers + fallback), the five diegetic artifacts (once the user runs the script), the tells-reveal mechanic, then sound + a11y + motion polish on the kangkong morning.

**Phase 2 (next milestone):** voice-clone 4th phone; Bea's 5-week arc; +1 anchor moment; their diegetic artifacts authored into the same manifest.

**Held:** photoreal wallpapers/texture; character portraits; marketing key art. Revisit only if the diegetic-only cut proves too sparse in playtest.

---

*Last edited: 2026-06-02.*
