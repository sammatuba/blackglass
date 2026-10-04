# Generating artifacts via the agy CLI (Google AI Pro OAuth) — 2026-10 regen pass

The 2026-10-04 tell-survival audit (`docs/tell-survival-baseline.md`) measured which
planted tells actually survived in the shipped artifacts. **Two tells are absent, six
are weak.** This worksheet regenerates the failing artifacts through the `agy` CLI
with your Google AI Pro account (Nano Banana Pro-class image generation), with every
tell **planted explicitly** — 2026-class models render clean text and natural faces by
default, so "convincing-but-flawed" is now something we *instruct*, not something we
hope for.

After the files exist:

```bash
node scripts/sync-artifacts.mjs     # webp → public/artifacts/ + exam-data + artifact-list
npm run assets:budget               # weight ceilings
```

…then re-run the tell audit (same method as the baseline) before committing.

---

## 0. Setup (once)

```bash
agy            # first run: complete the Google OAuth login in your browser
               # (captcha/verification is expected sometimes — that's yours to do)
```

`agy` is an agent CLI (`~/AppData/Local/agy/bin/agy`, v1.2.16). Find the image-capable
model id available to your account:

```bash
agy -p "List the image-generation model IDs you can use (e.g. Nano Banana Pro / gemini image preview). Reply with just the IDs."
```

Use that id as `--model` in every command below. Image prompts are also in
`assets/manifest.json` — **keep manifest and this worksheet in sync** (per the
ChatGPT worksheet's rule; same discipline, new tool).

Ground rules (unchanged): the tell is the payload — a seamless image is a failed
image · order matters: kangkong before siblings, still before outro · files land at
`play/blackglass-phones/assets/<name>` exactly as named · portrait = 9:16, landscape
= 4:3 (ask in the prompt; the runtime fits with CSS).

---

## 1. P0 — `tito-mike-deepfake.png` (portrait) · **both missing tells + the clip source**

```bash
agy -p "Using the attached image as the base, edit it: keep the exact same scene (fictional Filipino news anchor, dark suit, glossy desk, blue studio, Philippine flag) but ADD two deliberate flaws. (1) A small official-looking 'government seal' graphic in the lower-left corner of the frame — a circular gold seal with a sun motif, rendered subtly MELTED: the lettering around its rim is garbled pseudo-text that says nothing, the rays slightly run. (2) A faint blending seam along the jawline/neck, the barely visible edge where a face-swap would meet the neck. He stays mid-sentence, mouth slightly open, calm authority. Do not change anything else." --model <image-model-id> --add-dir ./
```

(attach `tito-mike-deepfake.png` as the reference — if your agy build takes file
attachments in the prompt, point it at `assets/tito-mike-deepfake.png`.)

Verify: seal IS present now (it wasn't — baseline score 0) and reads garbled up close ·
jaw seam visible only on a second look · face still warm and trustworthy (he must fool
the player first).

## 2. P1 — `kangkong-clickbait.png` (landscape) · **garbled small print**

```bash
agy -p "Same Filipino clickbait health thumbnail as the attached (EXPOSED banner, red circle + slash over kangkong, teal background, generic doctor inset, ALAMIN ANG TOTOO badge). EDIT ONLY the small print: add a block of small white sans-serif fine print under the headline (3–4 lines of disclaimer-style text) that is AI-GARBLED — letterforms that almost read but dissolve into nonsense on a second look, one word melting into the next. Also give the red hand-drawn circle a slightly offset, pasted-on drop shadow inconsistent with the other elements. Everything else stays identical." --model <id> --add-dir ./
```

Verify: small print dissolves on the second look · circle shadow reads "pasted" ·
headline stays legible (only the fine print garbles — that contrast IS the tell).

Then re-derive the siblings from the NEW template (attach the new kangkong):

```bash
agy -p "Using the attached image as the template: the SAME clickbait layout exactly, but the vegetable is now ampalaya (bitter melon). Same banner, background, circle, garbled fine-print block (same garbled text), same doctor inset. Obviously the same fill-in-the-blank factory." --model <id> --add-dir ./
# → save as assets/ampalaya-clickbait.png
```

…again for `malunggay-clickbait.png` (moringga leaves).

## 3. P2 — `dr-anita-still.png` (portrait) · **weak uncanny tell**

```bash
agy -p "Using the attached image as the base, keep the same woman, blazer, desk, shelf and lighting EXACTLY, but edit two details: (1) 3–4 book spines on the shelf behind her become melted/blank — titles that almost spell words but don't; (2) her two pearl stud earrings become subtly different from each other (one slightly larger, one catching light differently). She stays polished and convincing — this is a second-look tell, not an obvious one." --model <id> --add-dir ./
```

Then `dr-anita-outro.png` stays as-is (its funnel tell scored 2) unless the new still
changes her look enough to break continuity — if so, re-derive the outro from the new
still with the existing outro prompt (GENERATE-VIA-CHATGPT.md §5).

## 4. P3 — `clone-accident-photo.png` (landscape) · optional, decide after P0–P2

Baseline scored all three tells weak. If you regenerate:

```bash
agy -p "Same night-time Manila fender-bender photo as the attached. Edit three things: (1) the rear license plate becomes fully visible but GARBLED — characters that almost form a plate number but are melted nonsense; (2) the sari-sari store signage in the background becomes readable-at-a-glance but dissolves into warped pseudo-text when you look twice; (3) the bumper dent gains one crease that folds too smoothly, rubber-like, without tearing. Keep the panicked low-light snapshot feel." --model <id> --add-dir ./
```

---

## 5. The Tito Mike clip (the pending milestone asset)

Same flow as the proven Dr. Anita pilot (`dr-anita-still.mp4`, Veo i2v via Google AI
Pro), now from the **regenerated** still:

1. Image-to-video on the new `tito-mike-deepfake.png`: 10 s, 720p, 9:16, native audio
   if available (a calm Taglish endorsement read: "…guaranteed po, thirty percent in
   thirty days, SEC-approved…"). If `agy` exposes Veo, use it; otherwise the same
   Google AI app flow that produced the Dr. Anita pilot.
2. **The tell in time is the payload** — the clip must carry: lip-sync drifting a
   fraction behind the audio; a metronomic blink every ~4 s; the melted seal visible
   bottom-left throughout. If a take comes out seamless, that take failed —
   regenerate.
3. Save as `play/blackglass-phones/assets/tito-mike-deepfake.mp4` (≤5 MB).
4. `node scripts/sync-artifacts.mjs` — the list picks up `mp4`, the video page starts
   playing for real (poster = the webp still).

### Wire the `at` tells (the code change that lands with the clip)

The engine already supports timestamps on tells (`OSTell.at`). In
`src/games/blackglass/content/deepfake.ts`, the `mikeVideo()` page's tells become:

```ts
tells: [
  { label: 'The mouth lags', at: '0:03', detail: '…' },
  { label: 'The blink is metronomic', at: '0:04', detail: '…' },
  { label: 'The seal is melted', at: '0:06', detail: '…' },
  { label: 'The faces in the b-roll', at: '0:08', detail: '…' },
],
```

(adjust timestamps to the actual take). Only add `at` once the clip exists — the
tells layer renders timestamps unconditionally.

5. Extend the video e2e: copy `scripts/anita-video-shot.mjs` to
   `scripts/mike-video-shot.mjs`, point it at the deepfake anchor's video page and
   assert `<video src*=tito-mike-deepfake>` + poster. Run it against `npm run preview`
   and against the live site after deploy.

## 6. Record provenance

On each regenerated artifact entry in `assets/manifest.json`, add:

```json
"model": "<the agy model id>",
"seed": "<seed if the tool reports one, else 'n/a (chat/agy)'>",
"regenerated": "2026-10-XX"
```

The 2026-09-06 batch is covered by the manifest's top-level `provenance` note.

---

*Keep this worksheet alongside the manifest, same rule as the ChatGPT one: if prompts
change in `assets/manifest.json`, update both. Prompts and tells are canonical in
`assets/manifest.json`.*
