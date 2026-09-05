# AI Visual Workflows for Web Experiences — 2026 Landscape

**Why this note:** the diegetic-artifact plan (7 static PNGs via Gemini image API) was set in 2026-06 (`craft/maya/_meta/graphics-and-completion-approach.md`). The user asked whether the newer wave of AI-generated / AI-augmented interactive web experiences offers more sophisticated visual workflows. This note maps the landscape as of 2026-09 and reads it against our constraints. It does **not** change any decision yet.

**Read against these fixed constraints:** offline after first visit (PWA), initial JS ≤ 150 KB gz, slow phones, no server holding player data, and the diegetic-graphics discipline — synthetic-media artifacts carry planted `tells[]`; the tell is the payload (the teaching surface).

---

## TL;DR

1. The wave splits into three strata by *where inference happens*: **baked at build time** (AI video, text-to-3D, splat capture, AI textures), **at runtime via server APIs** (generative-UI platforms, world models — Websim, Project Genie, Runway Game Worlds), and **on-device** (WebGPU diffusion/LLMs — real but still too heavy for our audience's phones).
2. Offline apps like ours live entirely in the first stratum — and it had the biggest quality jump since our plan was written: **AI video generation matured into a practical asset pipeline** (Veo 3.1 / Kling 3.0: multi-shot, native audio, character consistency from reference images).
3. That matters specifically for us: our strongest artifacts are *video-native threats* — the Dr. Anita "debunk" is a TikTok, the voiceclone is a call. A short baked AI video with planted tells is a strictly deeper version of the current still-image plan, at the cost of a few MB per clip.
4. Three.js itself leveled up (WebGPU everywhere, TSL shaders, r183 RenderPipeline, **r186 native Gaussian splat renderer**) — this serves the *hub/showpiece* workstream, not the artifacts.
5. Runtime-generative experiences (the Websim/Genie wave) are the cultural reference point the user is seeing — but they are online, server-inferred, and mostly prompt-to-generic-game. Our concept is a different, better fit for the mission: the AI lives **inside the artifact**, not in the game loop. That is compatible with offline, and it is what our `tells[]` mechanic needs.

---

## 1. The three strata (by where inference runs)

| Stratum | What it looks like in 2026 | Offline? | For us |
|---|---|---|---|
| **A. Baked at build time** | AI video clips, text-to-3D GLBs, gaussian splats, AI skyboxes/PBR textures — generated once, shipped as static assets | ✅ Fully compatible | **Our lane.** Upgrade the artifact register (stills → video) and, aspirationally, environments |
| **B. Runtime server inference** | Websim-style prompt-to-playable sites; Project Genie; Runway Game Worlds; YouTube Playables Builder | ❌ Needs connectivity + API keys per player | Not viable for the core game. Possible future *optional online* TRAIN-pillar surface (see §5 open questions) |
| **C. On-device inference** | WebGPU/WASM diffusion (MLC web-stable-diffusion; WebNN + ONNX Runtime Web as the 2026 standardized path), SD-Turbo near-real-time | ⚠️ Technically offline, but multi-GB model downloads, desktop-GPU-class hardware | Excluded by the slow-phone constraint. Watch list only |

Trend evidence that stratum A/B work is where the energy is: immersive 3D web experiences took **61% of Awwwards Site-of-the-Day awards in Q1 2026, up from 23% in 2024** (common stack: Three.js + GSAP); 4,000+ AI-tagged games on Steam in 2025 with ~1-in-3 predicted to carry AI disclosures in 2026 (AI and Games).

---

## 2. Workflow findings

### 2.1 AI video as a baked asset pipeline — the big change since 2026-06
- **State:** Veo 3.1 (native audio, photorealism, 1–2 reference images for character consistency, up to 4K in some workflows), Kling 3.0 (15s clips, native audio sync, strong value). Multi-shot generation with locked character consistency is standard. Sora 2's position is in flux; Runway Gen-4.5, Seedance 2.0 fill the gap.
- **Offline-web feasibility:** **BAKE AT BUILD.** Short clips → webm/mp4, lazily loaded per game chunk. Cost is file size (hundreds of KB–few MB per clip), not runtime.
- **Why it's our headline option:** the artifacts we already manifest are video stills *of* videos (`dr-anita-still`, `dr-anita-outro`) and a 22s voice note. The prose names video-native tells — "lips forty milliseconds behind her voice," "the lower-third font weight is slightly off, as if added in post." A real 6–10s clip can carry those tells *in time* (lip lag, cut rhythm, the last-ten-seconds pivot) — things a still structurally cannot. The `tells[]` schema generalizes: `region` → `region` + `tRange`.
- **Same manifest discipline applies:** realistic-but-deliberately-flawed, never seamless. The deepfake-detection field itself (Fraunhofer's real-time video-call detector, the $25M Armani-style finance call) is validation that this is *the* threat register of 2026.

### 2.2 Text-to-3D → GLB
- **State:** mature. Tripo (best game-pipeline value: auto-rigging, fast GLB), Meshy 6 (best hosted all-rounder), Hunyuan3D 2.0 (open-source, high-res textured meshes), TRELLIS (open, benchmarked). GLB/glTF export is universal.
- **Feasibility:** **BAKE AT BUILD** for evidence objects — a rotatable "inspect" mode for physical evidence (the "model kit" the scammer ships, the pump device) is a natural examine-layer extension. Budget: single low-poly GLB ~0.5–2 MB. Not needed for the current 7 artifacts.

### 2.3 Gaussian splatting on the web
- **State:** three.js **r186 merged a native splat renderer** (WebGPU/TSL, GPU counting sort, PLY/SPZ/glTF loaders — no third-party lib). Ecosystem: Spark (modern R3F renderer), mkkellogg/GaussianSplats3D (classic), SuperSplat (editing). Capture via Postshot/Polycam/Luma; text-to-splat exists but quality lags.
- **Feasibility:** **BAKE AT BUILD**, but heavy: multi-MB files, mobile perf is *the* known bottleneck (high-DPI displays hurt worst). Our desk-at-night stage is deliberately spare CSS ("restraint for what they FEEL") — splats would contradict the graphics doc's register decision. Aspirational for a hub hero environment, not for the phone games.

### 2.4 World models / playable generated worlds
- **State:** Genie 3 (DeepMind, Aug 2025): text → explorable world, 24 fps @ 720p, consistency for minutes, ~1 min visual memory. **Project Genie is a limited research preview** (small cohort of academics/creators — *not* broadly public; some coverage overstates this). Oasis (Decart/Etched): real-time playable AI-generated open world, **playable in browser** at oasis.decart.ai; 500M open-weight version is research-grade.
- **Feasibility:** **RUNTIME API / NOT VIABLE** for an offline PWA. Streamed frame-by-frame generation needs their servers; no bake story. Study as references for "what generated worlds feel like," not as a pipeline.

### 2.5 Generative-UI platforms (the Websim wave)
- **State:** Websim 2.0 (prompt → playable web games, multiplayer, community publishing); Rosebud AI (describe → playable 2D/3D/voxel game in browser); OpenGame (open-source agentic framework generating full browser 2D games from text); YouTube Playables Builder (Gemini 3); The Sandbox Studio (AI-native engine roadmap); Meshy Labs at GDC 2026 ("AI-native gameplay," $30M ARR); Runway Game Worlds (browser text-adventure/cinematic games). Academic framing worth adopting in docs: a game is "AI-native" only if runtime generative AI is *constitutive of the core loop* (arXiv 2607.00527).
- **Feasibility:** **RUNTIME API.** Also aesthetically generic — "prompt-to-prototype" output. Not our lane for shipping, but the *interaction grammar* is instructive: experiences where the content is visibly alive/mutable.

### 2.6 Three.js platform state (serves the hub/showpiece workstream)
- WebGPU supported across all major browsers in 2026; **TSL** (Three Shading Language) is the standard shader workflow, same code on WebGL + WebGPU.
- **r183 RenderPipeline** replaces EffectComposer (bloom/blur/AO as pipeline nodes).
- **r186 native Gaussian splats** (above).
- 2026 technique patterns from award sites: WebGPU/TSL shader craft, scroll-driven 3D scene sequencing, single-object "rendered with weight" hero scenes, per-product playable micro-scenes (Utsubo's 2026 roundup). R3F remains the component-driven pattern.
- **Implication:** the "Three.js hero refinement" item should be specced against this stack (TSL + RenderPipeline + scroll sequencing), and the 884 KB hero chunk is the thing to trim while we're there.

### 2.7 AI environments & textures
- Blockade Labs Skybox AI (360° text-to-skybox, 1.5M+ users, Unity SDK; UE5 HDRI-backdrop workflows); Sloyd and peers for seamless tileable PBR textures. **BAKE AT BUILD**, sizes modest (skybox equirect ~1–4 MB). Only relevant if/when we build 3D environments; no current surface needs it.

### 2.8 On-device inference (watch list, not a plan)
- MLC web-stable-diffusion (TVM + WebGPU, fully client-side); 2026 direction is **WebNN + ONNX Runtime Web** as the standardized path; SD-Turbo-class distilled models approach real-time on desktop GPUs.
- Model weights are GB-scale; phone NPUs are not uniformly exposed to the browser. Studio Atelico is the studio betting on on-device generative AI for games. **Verdict: excluded for now** by the slow-phone constraint; revisit if WebNN lands broadly on Android.

---

## 3. Reference projects worth studying

| Project | What to take from it |
|---|---|
| [Oasis](https://oasis.decart.ai/) (playable) / [project page](https://oasis-model.github.io/) | The feel of a world that visibly regenerates — exactly the *unease register* our fiction is about. Reference for atmosphere, not pipeline |
| [Project Genie](https://labs.google/projectgenie) (limited preview) / [DeepMind post](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) | Promptable world events (weather/objects changing mid-session) — a design vocabulary for "the phone is gaslighting you" moments |
| [Websim](https://websim.com/) | The generative-UI grammar: pages that are alive. Community meta-tools show players enjoy *dissecting* generated pages — adjacent to our tells mechanic |
| [Runway Game Worlds](https://www.engadget.com/ai/runway-now-has-its-sights-on-the-video-game-industry-with-its-new-generative-ai-platform-192350294.html) | Browser text-adventure/cinematic hybrid — nearest genre neighbor among the runtime platforms |
| [Utsubo: Best Three.js Websites 2026](https://www.utsubo.com/blog/best-threejs-websites-2026) + [What's New in Three.js 2026](https://www.utsubo.com/blog/threejs-2026-what-changed) | Technique checklist for the hero/showpiece workstream |
| [Awwwards Three.js collection](https://www.awwwards.com/websites/three-js/) | Ongoing bar-setting reference |
| [AI Native Games: Survey & Roadmap (arXiv 2607.00527)](https://arxiv.org/abs/2607.00527) | The "constitutive of the core loop" definition — useful vocabulary for positioning our *artifact-native* (not runtime-native) AI stance |
| [AI and Games: 10 Predictions for 2026](https://www.aiandgames.com/p/10-predictions-for-ai-in-games-for) | Industry context: AI disclosure norms — reinforces our planted-tells honesty |

---

## 4. What this means for blackglass

**The register decision from 2026-06 survives contact with the new landscape — and the landscape strengthens it.** The graphics doc's core move (generate *only* what the characters are fooled by; realistic-but-flawed; the tell is the payload) is precisely the "artifact-native" position: the AI is inside the fiction, not in the game loop. That is what keeps us offline, lean, and pedagogically honest. Nothing in the 2026 wave suggests we should put runtime generation into the core loop — those experiences are online-only and generically authored; ours are hand-crafted and specific.

**What the landscape does change — three concrete upgrades, in priority order:**

1. **Artifact register: stills → short AI video (the real rethink).** Re-author the video-native artifacts as 6–10s baked clips: `dr-anita-still` → the actual TikTok-style debunk clip (lip-lag tell in time; the last-ten-seconds pivot *is* the last ten seconds); voiceclone's "proof" footage; fiveweeks' surveillance snippets. Same manifest + tells discipline, extended with time ranges; CSS fallbacks still exist (poster frame = the current still plan — so the Gemini stills remain the fallback layer, nothing is wasted). Size cost: ~2–6 MB per clip, lazy-loaded. Needs: a video-capable generation tool (Veo/Kling class) instead of / in addition to the image key — an authoring-time account decision, same as the current `GEMINI_API_KEY` blocker.
2. **Examine-layer upgrade: 3D evidence inspection (optional, later).** Text-to-3D GLB for physical evidence objects with a rotate/inspect mode on the existing engine viewer pattern. Only when a case actually calls for a physical object.
3. **Showpiece workstream specced against the 2026 stack.** Three.js hero: TSL + RenderPipeline + scroll sequencing, and shrink the 884 KB chunk. Splats stay aspirational and register-breaking for the phone games; do not import them there.

**Explicitly rejected by the constraints:** runtime generative-UI / world-model content in core play (offline + cost + guardrails), on-device diffusion (hardware reality of the audience), photoreal splat environments for the phone surface (register decision: "restraint for what they FEEL").

---

## 5. Open questions for the decision

1. **Video tooling account:** do we get a Veo (Gemini) or Kling authoring-time capability, and does the existing `.env`/manifest/seam pattern extend to it cleanly? (Same shape as the current dead-key blocker.)
2. **Scope:** do we swap *all* video-native artifacts to clip, or pilot with one (Dr. Anita) and playtest the difference? Recommend the pilot.
3. **Budgets:** confirm per-clip size ceiling so the PWA precache stays sane (e.g., ≤ 5 MB/clip, videos excluded from precache, cached on first play).
4. **Guardrails:** does a moving deepfake clip with planted tells change anything in `world/guardrails.md`? (Arguably it *is* the guardrail — the tell is visible on re-read — but worth an explicit pass.)
5. **Optional online TRAIN-pillar idea (parked):** a runtime "generate-a-scam-page, mark the tells" trainer (Websim-adjacent, clearly labeled online-only) would weaponize generative-UI for pedagogy — but it collides with "never produce working scam templates" and needs its own guardrail design. Not scheduled; noted for a future decision.

---

## 6. Free & open-source paths (follow-up, 2026-09-06)

**Machine context:** the workstation is WSL2, no NVIDIA GPU; Windows host GPU is **Intel Arc 140V (16 GB shared)**; 19 GB RAM / 8 cores. So local *image + audio* generation is realistic, local *video* is attemptable-but-fiddly, local *3D-gen* is out (CUDA-centric). Free cloud GPUs (Kaggle T4 16 GB, ~30 h/week) cover video/3D.

### Open models by workflow

| Workflow | Open pick | License | Where it runs for us | Notes for our use |
|---|---|---|---|---|
| Images | **Qwen-Image** (20B) | Apache 2.0 | Arc 140V (quantized, ComfyUI/OpenVINO) or Kaggle T4 | Best-in-class **text-in-image** — exactly what clickbait headlines, lower-thirds, `healthtruthph.click` need |
| Images (fast) | **FLUX.1 [schnell]** / Z-Image-Turbo | Apache 2.0 | Arc 140V, 1–4 steps | ⚠️ avoid FLUX.1 [dev] — non-commercial |
| Video | **Wan 2.2** (5B TI2V) | Apache 2.0 | Kaggle T4 (6–8 GB VRAM); WanGP runs it in 6 GB | 720p image-to-video; the Dr. Anita pilot |
| Video (alt) | **LTX-2** | Apache 2.0 (≥$10M revenue carve-out — n/a for us) | Kaggle T4 (fp8) | Native **audio+video sync**, fast; weaker on faces |
| TTS (plain) | **Kokoro-82M** | Apache 2.0 | **Local CPU** — trivial | Joy's 22s voice note (deferred Phase-2 stretch) |
| TTS (clone) | **Chatterbox** 0.5B | MIT | Local CPU/RAM, zero-shot clone from ~5 s reference | The voiceclone anchor's artifacts; embeds a **watermark by default — a real, teachable tell** |
| ⚠️ F5-TTS | — | **CC-BY-NC** (weights) | — | Avoid: non-commercial via Emilia dataset |
| Text-to-3D | **TRELLIS.2** (4B) | **MIT** (weights + code + training) | Kaggle T4 (tight; ~12 GB min) / official hosted demo | Evidence-object inspect mode, if ever needed. Hunyuan3D = community license w/ territorial clauses — prefer TRELLIS |
| Splats (viewer) | three.js r186 native / Spark / SuperSplat editor | MIT | Browser (lazy chunk) | Capture needs hardware; view path is fully open |

### CC0 / free asset libraries (scene & decor register only)

- [Poly Haven](https://polyhaven.com/) — CC0 HDRIs, textures, models (16k HDRI)
- [Kenney](https://kenney.nl/) — CC0 2D/3D kits, UI, audio
- [Quaternius](https://quaternius.com/) — CC0 low-poly themed packs (furniture/city overlap Kitbitz's slots, 3D instead of SVG)
- [Poly Pizza](https://poly.pizza/) — 10.6k CC0 GLB models, searchable
- [ambientCG](https://ambientcg.com/) — CC0 PBR materials
- [Freesound](https://freesound.org/) (CC0 filter) — SFX if synthesized WebAudio ever needs a real bed
- [awesome-cc0](https://github.com/madjin/awesome-cc0) — the aggregator list
- Kitbitz MCP catalog (already adopted) stays the scene/decor source; CC0 3D complements it where a scene needs depth.

**Register rule survives unchanged:** CC0 assets = what the world looks like (scene/decor). Generated-with-tells = what they were fooled by (diegetic). A deliberate future extension: pair a CC0/stock "legit news clip" (CSS lower-thirds over real footage) against the AI-generated deepfake — a genuine baseline makes the tells pop. That contrast pair is pedagogically stronger than either alone.

### Consequences for the plan

1. **The dead `GEMINI_API_KEY` stops being a blocker at all.** The 7 artifacts can be generated locally with Apache-licensed models (Qwen-Image for text-heavy thumbnails, schnell for variants) — free, offline, and we control the tells harder (seed, img2img, inpainting) than via a hosted API.
2. **The video pilot becomes free too:** Wan 2.2 (Apache) on Kaggle's free T4, with LTX-2 as the audio-synced alternative. No vendor account needed beyond a Kaggle login.
3. **Audio un-defers itself:** Kokoro/Chatterbox run on this machine's CPU today. Joy's voice note and the voiceclone artifacts move from "Phase-2 stretch" to "available now," and Chatterbox's embedded watermark is a genuine detection lesson.
4. **Manifest schema gains provenance fields:** `model`, `modelLicense`, `seed` — provenance is part of the pedagogy (the game's own credits can disclose its synthetic media, mirroring the 2026 disclosure norm).
5. **`docs/ASSETS.md` rule 3 needs a wording amendment** when adopted: "Diegetic artifacts stay on the Gemini pipeline" → "stay on the open-generation pipeline (local Apache/MIT models; hosted APIs permitted but not required)."

### License hygiene (the watch-outs)

- FLUX.1 [dev] and F5-TTS checkpoints are **non-commercial** — excluded even though the project is free.
- Hunyuan family uses **community licenses** with revenue/territorial clauses — usable for us in practice, but TRELLIS (MIT) / Wan (Apache) / Kokoro-Chatterbox (Apache/MIT) are strictly cleaner; prefer them.
- Record model + license per artifact in the manifest; ship a `CREDITS` note alongside `docs/ASSETS.md` rules.

---

*Researched 2026-09-06. Sources verified by direct fetch where load-bearing (Genie 3 limitations, DeepMind blog; else from search-result pages). Key sources: [DeepMind Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/), [Oasis](https://oasis.decart.ai/), [Websim](https://websim.com/), [Runway Game Worlds coverage](https://www.engadget.com/ai/runway-now-has-its-sights-on-the-video-game-industry-with-its-new-generative-ai-platform-192350294.html), [Three.js r186 splats](https://radiancefields.com/three.js-merges-a-native-gaussian-splat-renderer-for-webgpu-in-r186), [Ben Houston: splats in three.js](https://ben3d.ca/blog/gaussian-splatting-for-threejs), [Utsubo 2026 roundups](https://www.utsubo.com/blog/best-threejs-websites-2026), [three.js post-processing 2026](https://threejsroadmap.com/blog/the-complete-guide-to-threejs-post-processing-in-2026), [MLC web-stable-diffusion](https://github.com/mlc-ai/web-stable-diffusion), [WebNN + ONNX diffusion](https://scribbler.live/2026/04/02/Stable-Diffusion-in-the-Browser-with-WebNN-ONNX.html), [Blockade Labs](https://www.blockadelabs.com/post/how-to-make-a-skybox-with-ai-complete-guide-2026), [2026 3D generator guide](https://app.cinevva.com/guides/ai-3d-model-generators), [Awwwards immersive trend](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/), [AI and Games 2026 predictions](https://www.aiandgames.com/p/10-predictions-for-ai-in-games-for), [AI-native games survey](https://arxiv.org/abs/2607.00527).*
