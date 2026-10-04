# Asset upgrade plan — 2026-10 wave (2026-10-04)

**Execution status (end of the aligned session, 2026-10-04):**
- **Done:** tell-survival baseline measured (`docs/tell-survival-baseline.md`) · WebP
  canonical + single-copy `public/artifacts/` (dist 37→7 MB, precache 1.6 MB,
  `npm run assets:sync` + `npm run assets:budget`) · manifest provenance note +
  regen rules in `docs/ASSETS.md` (+ CREDITS disclosure) · **legit-baseline contrast
  clip landed** (VOA public-domain news, 10 s/0.4 MB, `register: "real"` in the
  manifest; pairing it into a content page is the writing-session step) · voice-note
  engine path live (`OSMessage.audio` → `voicenoteUrl`) ·
  `play/blackglass-phones/GENERATE-VIA-AGY.md` + `GENERATE-VOICE.md` worksheets ready.
- **Awaiting the user (authoring-time, OAuth):** run GENERATE-VIA-AGY.md — P0 Tito
  Mike still (missing seal tell) → the Tito Mike clip (+ `at` tells in `deepfake.ts`,
  exact edit in the worksheet) → P1 kangkong garble + siblings → P2 dr-anita melt →
  optional P3 clone-accident. Then GENERATE-VOICE.md (Kokoro/Chatterbox).
- **Unchanged below:** the plan as aligned, kept for reference.

**Why:** the user asked to improve assets now that frontier models generate beautiful
visuals (Astra, Opus 5.5). This plan reads the 2026-10 model landscape against this
project's fixed register rules, then gives a per-asset action table. It extends, and
defers to, `research/ai-visual-workflows-2026.md` (the strata analysis and open-model
table there remain valid).

## 0. The register rules (unchanged — they are the pedagogy)

1. **Diegetic artifacts** (what characters are fooled by) stay on the AI-generation
   pipeline, **realistic-but-flawed**, tells planted and now *verified* (E1).
2. **Scene/decor art** stays CC0 (Kitbitz / Poly Haven / Kenney).
3. **Chrome, walls, icons** stay CSS/SVG/synthesized. "No raster backgrounds for walls"
   stands — CSS wallpapers are a design decision, not a limitation.
4. Never swap registers — the distinction *is* the lesson.

**The 2026-10 insight that shapes everything below:** frontier image models got
*good enough that flaws no longer happen for free*. The 2026-09-06 batch could rely on
the model garbling small print; today's models render clean Tagalog headlines and
plausible bookshelves by default. So the pipeline flips from *"hope the model fails"*
to **"plant every tell deliberately, then verify it survived"** — explicit prompt
language per tell, reference-edit/inpainting for physical seams, and E1
(`scripts/tell-survival.mjs`) as the gate. Beauty is welcome in the *presentation*
register; in the *diegetic* register, seamlessness is a failed artifact.

## 1. Model landscape, 2026-10 (what changed since the 2026-09 note)

| Model | What it is | Use it here for |
|---|---|---|
| **GPT-6 Astra** (OpenAI, 2026-09-03) | Frontier multimodal model; image generation among its capabilities; ~1.05M ctx; API `gpt-6-astra` | Strong candidate for the next diegetic batch via the existing chat-UI worksheet pattern (`GENERATE-VIA-CHATGPT.md` flow — same no-key authoring pattern, new model) |
| **Claude Opus 5.5** (Anthropic, 2026-09-22) | Flagship reasoning/coding/agent model; strong visual *reasoning* and computer use; motion-graphics output via Artifacts/Claude Design. **Not a raster image generator** — pair it with an image model, not instead of one | The E1/E2 judge brain (tell-survival scoring, transcript judging); writing sessions (M6); motion-graphics chrome if ever needed |
| **Nano Banana Pro** (Gemini image, 2025-11) | Native 4K; up to 4 reference images; best-in-class text accuracy and realism | Reference-edits of existing artifacts (same-face/same-template continuation), and *explicitly garbled* small print on request |
| **Nano Banana 2** | 2K, cheaper | Batch variants — the kangkong sibling swaps |
| **Grok Imagine 2** | Cinematic photorealism | Alternate look for the night-photo register (clone-accident) if regenerated |
| **GPT Image 2** | Near-perfect text rendering (emerging) | Watch list for text-heavy thumbnails |
| **Open path (per research note §6)** | Qwen-Image (text-in-image, Apache-2.0), Wan 2.2 (i2v), Kokoro-82M + Chatterbox (TTS/clone, Apache/MIT) | Free/local generation; Chatterbox watermark = a real, teachable tell |

Net: **Astra or Nano Banana Pro** for generation, **Opus 5.5** as judge/writer, the
**open path** as the free fallback — and the manifest gains provenance fields
(`model`, `modelLicense`, `seed`) either way.

## 2. Per-asset actions (existing artifacts)

Priority order; every regeneration ends with an E1 tell-survival run before
`sync-artifacts.mjs`.

| Asset | Finding (2026-10-04 inspection) | Action |
|---|---|---|
| `tito-mike-deepfake.png` | Corner "government seal" not visible in frame → melted-seal tell absent; face reads natural | Regenerate via reference edit (Nano Banana Pro from current PNG): add garbled corner seal + faint jawline seam. Then this is the **source for the Tito Mike clip** (§3) — the actual next milestone asset |
| `kangkong-clickbait.png` | Small print is legible, grammatical Tagalog → garbled-text tell absent; red-circle + stock-doctor tells present | Template re-edit asking *explicitly* for AI-garbled fine print and an offset drop shadow on the red circle (the "pasted-on" tell in the manifest's tellsNote, not visibly present) |
| `ampalaya` / `malunggay-clickbait.png` | Not inspected; re-derive from the kangkong template so sameness stays pixel-aligned | Re-run as template edits after kangkong lands; E1 checks `same-template` alignment |
| `dr-anita-still.png` | Uncanny-face tell weak (reads natural); bookshelf partially legible; clean lower third present | Reference edit: melt a few spine rows, mismatch the earrings. Keep her *convincing* — she must fool the player first; the tells are for the second look |
| `dr-anita-outro.png` | Not inspected | E1 check; regenerate only if the funnel CTA tell is weak |
| `clone-accident-photo.png` | Not inspected | E1 check on garbled-plate / melted-signage / rubber-metal |
| `dr-anita-still.mp4` | Working e2e (`anita-video-shot.mjs` vs live site) | Keep as the pilot. On regeneration, re-run i2v with lip-lag emphasized; keep ≤5 MB/clip |

## 3. New assets, in milestone order

1. **Tito Mike clip (the pending M-item).** Flow already proven by the Dr. Anita
   pilot: regenerate the still with its tells → Veo i2v (10s, 720p, 9:16, ≤5 MB) →
   `node scripts/sync-artifacts.mjs` → add `at` timestamps to `deepfake.ts` tells
   (`OSTell` at `'0:05'` etc.) → extend `anita-video-shot.mjs` pattern for the new
   e2e. Guiding rule stands: *the tell in time is the payload* — lip-sync drift,
   the mid-sentence freeze, a cut that lands wrong.
2. **Voice notes (unblocks two anchors' deferred beats).** Joy's 22s note via
   Kokoro-82M (local CPU); the voiceclone anchor's cloned Renz via Chatterbox
   (zero-shot, ~5s reference; embedded watermark is a genuine detection lesson).
   Engine already has the note chrome; this adds real audio behind it.
3. **The legit contrast pair (research note §6 idea — promote it).** One CC0/stock
   "real news clip" with CSS lower-thirds, paired against the deepfake. A genuine
   baseline makes the tells pop; pedagogically stronger than either alone.
4. **Field-exam items for E6.** Fresh artifacts generated with the same manifest
   discipline (never shown in-story) — the objective pedagogy exam. The pipeline
   makes new exam items a byproduct of the pipeline itself.
5. **Presentation register, where beauty is welcome:** optional convergence key art
   (GAME-PLAN §7 register), hub OG/share image. PWA icons already generated
   (`make-icons.mjs`); wallpapers stay CSS by decision. M6 THE ASSISTANT needs **no
   external assets** by design — don't add any.

## 4. Weight & performance (paired with eval facet 7)

- **WebP/AVIF variants** for the photographic artifacts: PNG→WebP q80 cuts ~70–85%
  (≈2.3 MB → ≈400–700 KB). Add variants to the glob order in `artifacts.ts`; keep
  the PNG as fallback.
- **Double-ship:** each artifact lands in `dist/assets/` *and*
  `dist/legacy/play/blackglass-phones/assets/`. Either accept it knowingly (legacy
  mirror is frozen) or have the legacy mirror load from the platform copy; decide in
  the M6 session. `asset-budget.mjs` (E5) makes the cost visible either way.

## 5. Provenance & disclosure (eval facet 11)

- Manifest schema: add `model`, `modelLicense`, `seed` per artifact (already
  proposed in research note §6.4).
- Ship a player-facing CREDITS/disclosure note ("the synthetic media in this game is
  synthetic; the tells are the lesson") — mirrors the 2026 disclosure norm and is
  itself a teachable moment.

---

*Grounding: repo sweep + direct inspection 2026-10-04; model landscape from web
research the same week (see final summary of the working session for links);
pipeline discipline from `play/blackglass-phones/manifest.json`,
`docs/ASSETS.md`, `research/ai-visual-workflows-2026.md`.*
