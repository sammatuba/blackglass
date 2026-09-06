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

**Storyboard (6–8s, portrait 9:16):**

| time | what happens | tell it carries |
|---|---|---|
| 0:00–0:03 | She talks, calm and polished — ring-light evenness, hand gesture mid-sentence | the baseline that makes the rest land |
| ~0:04–0:06 | A syllable where the lips close a beat after the voice — once, subtly | "The lips lag" (`at: '0:05'`) |
| 0:06–end | She keeps talking; end on mouth slightly mid-phoneme so the poster frame reads as a paused frame | "A face that's almost a face" |

**Motion prompt (i2v, for whatever tool you use):**

```
Static camera, a woman in a light-blue blazer at a white desk talks calmly to
camera with small natural hand gestures, soft ring-light, bookshelf bokeh
behind her. Natural blink rate, subtle head movement, no camera motion, no
cuts. Photorealistic, slight video-compression softness, phone-video feel.
```

**Watch for:** mouth that fully closes at rest (AI-video tell), teeth drift, hand morphing. If the clip is *too* clean, regenerate — or keep it and rely on the tells layer naming what to look for. Do not add text overlays; the app adds the lower third.

## Generation paths (free)

1. **Sora in ChatGPT (Business plan)** — upload `assets/dr-anita-still.png` as the first frame, paste the motion prompt, ~6–8s portrait. Product use, no keys. Download → rename to `dr-anita-still.webm`/`.mp4` → `assets/` → sync.
2. **Kaggle T4 + Wan 2.2 (Apache-2.0)** — open a Kaggle notebook with GPU T4: `pip install diffusers transformers accelerate sentencepiece`, then load the Wan 2.2 **5B TI2V** image-to-video pipeline per its model card (enable model CPU offload + VAE tiling; 480p, 6–8s ≈ 15–30 min on the free T4). Verify the exact pipeline class on the [model card](https://huggingface.co/Wan-AI) — the diffusers API for Wan 2.2 moved more than once. Export webm (vp9) or mp4.
3. **Local on the Arc 140V** — experimental (no CUDA; IPEX/SYCL builds of ComfyUI). Only worth it if generating many clips.

**Size budget:** keep clips ≤ 3 MB. Videos are excluded from the PWA precache (`globIgnores` in `vite.config.ts`) — they cache on first play, like the hero chunk.

## Second clip (when the pilot proves out)

`tito-mike-deepfake` — the anchor mid-broadcast: metronomic blink on a 4-second cadence, the mouth lag on the word "government," the melted seal holding still too long. Same flow; tells live in `deepfake.ts`.

---

*Runtime support shipped 2026-09-06. Pilot not yet generated — needs a human with a ChatGPT or Kaggle login.*
