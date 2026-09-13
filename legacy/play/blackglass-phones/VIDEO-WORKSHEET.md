# Generating the video artifacts (the register upgrade)

The stills are canonical and stay — they are the poster frames. When a **clip** with the artifact's id exists in `assets/` (`dr-anita-still.webm`, `tito-mike-deepfake.mp4`, …), the sync copies it and the game's video page **plays for real** (`artifactVideo` in `src/games/blackglass/artifacts.ts`); the still becomes the `<video>` poster. No clip → the current fake-player chrome, unchanged. Runtime side is already shipped.

```bash
# after a clip lands in play/blackglass-phones/assets/:
node scripts/sync-artifacts.mjs
npm run build
```

**Schema note:** tells on video artifacts gain `at` — a timestamp ("0:05") shown as a chip in the "Look again" layer (`OSTell.at`). After generating a clip, watch it, find the moments where the planted tells actually show, and add `at` to the tells in `src/games/blackglass/content/kangkong.ts` (Dr. Anita) / `deepfake.ts` (Tito Mike). *The tell in time is the payload — a seamless clip is a failed clip.*

---

## Pilot: `dr-anita-still` — one clip, image-to-video

Generate **from the existing still** (`assets/dr-anita-still.png`) — image-to-video keeps the fabricated person consistent for free.

**Storyboard (8s — Veo's native clip length — portrait 9:16):**

| time | what happens | tell it carries |
|---|---|---|
| 0:00–0:03 | She talks, calm and polished — ring-light evenness, hand gesture mid-sentence | the baseline that makes the rest land |
| ~0:05 | A syllable where the lips close a beat after the voice — once, subtly | "The lips lag" (`at: '0:05'`) |
| 0:06–0:08 | She keeps talking; end on mouth slightly mid-phoneme so the poster frame reads as a paused frame | "A face that's almost a face" |

**Motion prompt (i2v — paste alongside the uploaded still):**

```
Static camera, a woman in a light-blue blazer at a white desk talks calmly to
camera with small natural hand gestures, soft ring-light, bookshelf bokeh
behind her. She says, warmly: "Let's talk about the vegetable link in your
family group chat." Natural blink rate, subtle head movement, no camera
motion, no cuts, no text overlays. Photorealistic, slight video-compression
softness, phone-video feel.
```

Variant if the generated speech sync is too *good* (seamless lip-sync defeats the tell): drop the spoken line, keep room-tone ambience only — the app's caption prose carries the words, as it already does.

## Generation path 1 — the Gemini app (Google AI Pro, what you have)

Veo 3.1 is in the Gemini app for Pro subscribers; it does image-to-video with the uploaded image as the **first frame**, 8-second clips, **9:16 vertical**, 720p/1080p, downloadable.

1. In [gemini.google.com](https://gemini.google.com/) (or the app), start a prompt, attach `play/blackglass-phones/assets/dr-anita-still.png`, and pick the **Video** tool (Veo).
2. Paste the motion prompt above. Generate — 8s, portrait if offered (your still is 941×1672; Veo matches/supports 9:16).
3. **Watermark setting:** Gemini overlays a visible "AI" watermark by default. For register fidelity (the in-fiction artifact is a TikTok video, and real deepfakes don't watermark themselves), turn the visible watermark **off** in Gemini settings before downloading — the invisible **SynthID** watermark and C2PA provenance metadata stay embedded regardless. That's not a loss: it's a second, real tell the "Look again" layer can name ("check the provenance — this file still carries machine-readable proof it was generated").
4. Download → rename to `dr-anita-still.mp4` (or `.webm`) → drop into `play/blackglass-phones/assets/` → `node scripts/sync-artifacts.mjs` → build.
5. Watch the clip, find the moment the lips lag, add `at: '0:05'` (or wherever it lands) to the tells in `src/games/blackglass/content/kangkong.ts`, and confirm the SynthID note in the tells layer.

**Bonus, zero cost:** the Gemini app has a SynthID checker — screenshot the game's tells layer next to a real SynthID verification of the same clip for the debrief material.

## Generation paths 2 & 3 (alternatives, need setup)

2. **Kaggle T4 + Wan 2.2 (Apache-2.0)** — open a Kaggle notebook with GPU T4: `pip install diffusers transformers accelerate sentencepiece`, then load the Wan 2.2 **5B TI2V** image-to-video pipeline per its model card (enable model CPU offload + VAE tiling; 480p, 6–8s ≈ 15–30 min on the free T4). Verify the exact pipeline class on the [model card](https://huggingface.co/Wan-AI) — the diffusers API for Wan 2.2 moved more than once. Export webm (vp9) or mp4.
3. **Local on the Arc 140V** — experimental (no CUDA; IPEX/SYCL builds of ComfyUI). Only worth it if generating many clips.

**Size budget:** keep clips ≤ 3 MB. Videos are excluded from the PWA precache (`globIgnores` in `vite.config.ts`) — they cache on first play, like the hero chunk.

## Second clip (when the pilot proves out)

`tito-mike-deepfake` — the anchor mid-broadcast: metronomic blink on a 4-second cadence, the mouth lag on the word "government," the melted seal holding still too long. Same flow; tells live in `deepfake.ts`.

---

*Runtime support shipped 2026-09-06. Pilot generated 2026-09-06 and verified end-to-end 2026-09-11 (`node scripts/anita-video-shot.mjs`) — the clip is required, not optional: Bea's chain now holds on the player opening the Dr. Anita page. Next: Tito Mike, same flow.*
