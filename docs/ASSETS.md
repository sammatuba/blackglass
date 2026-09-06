# Asset Sources

Where visual assets come from, what each source is good for, and the rules for using them.

## 1. Kitbitz illustration catalog — scene & decor art

- **What:** 2,043 hand-drawn illustrations in 13 themed kits (interior, city, cyberpunk, space, medieval, nature, pirate, western, winter, halloween, dungeon, ruins, barbieland). Editable **SVG** with PNG fallbacks.
- **License:** CC0 1.0 (public domain) — no attribution required, safe to ship.
- **Access:** MCP server at `https://mcp.kitbitz.art` (Streamable HTTP, no auth, read-only). Tools: `search_illustrations`, `get_illustration`, `find_related_illustrations`, `curate_scene`, `prepare_asset_pack`. Catalog docs: https://kitbitz.art/docs/mcp
- **Download flow:** `search_illustrations` → pick `assetId` → `prepare_asset_pack` with the IDs → fetch each file's `sourceUrl` (e.g. `https://assets.kitbitz.art/kits/interior-kit/ArmchairBack-Textile-V-M-Pink700.svg` — note: no `@2x` suffix on SVG URLs). Store in `src/assets/kitbitz/` keeping the catalog `assetId` in the filename or an index file.
- **Best fits for us:**
  - `interior-kit` (281 assets): home furniture, lamps, plants, books, kitchen — family-home scene vignettes for Scam Radar case files (the sala, the bedroom desk).
  - `city-kit` (115): streets, storefronts, bus stops, signs — "outside world" backdrops (courier/customs case, bank-establishment moments).
  - `cyberpunk-kit` (157): tech panels, neon accents — decorative touches on the TRAIN pillar cards.
- **Not a fit:** modern device vocabulary (no phones, laptops, envelopes, chat bubbles) — the feed/case UI stays CSS-built; and diegetic scam artifacts (news thumbnails, deepfakes) must come from the Gemini pipeline so they read as *synthetic media*, not illustration.

## 2. Gemini image pipeline — diegetic artifacts (authoring-time only)

- **What:** the "convincing-but-flawed" AI images characters are fooled by (clickbait thumbnails, AI "proof" photos, deepfake stills), each with planted `tells[]` that the examine layer reveals.
- **Where:** `play/blackglass-phones/gen-images.mjs` + `assets/manifest.json`. Prompts can be run two keyless ways: through the ChatGPT UI from the worksheet (`play/blackglass-phones/GENERATE-VIA-CHATGPT.md` — how the 7 were made) or locally with open models (`research/ai-visual-workflows-2026.md` §6). After files land in `assets/`: `node gen-images.mjs --emit` then `node scripts/sync-artifacts.mjs`. The runtime keeps CSS fallbacks either way.
- **Status:** all 7 anthology artifacts generated 2026-09-06 via the ChatGPT worksheet, tells verified, committed. Next register upgrade when wanted: AI-video artifacts (research note §2.1).

## 3. Typography & chrome

- Fonts are **self-hosted** via @fontsource packages (no Google Fonts CDN — PWA offline requirement).
- Iconography: inline SVG in-repo (stroke icons, currentColor) — no icon-font dependency.
- App icons/PWA art: generated locally by `scripts/make-icons.mjs` (zero-dep PNG writer).

## Rules

1. Every third-party asset ships with its license noted in an `ASSETS.md`-style manifest next to the files.
2. Kitbitz SVGs may be recolored/scaled freely (CC0) — keep the original catalog `assetId` in metadata for provenance.
3. Diegetic artifacts stay on the AI-generation pipeline (hosted UI/API or open local models — the distinction in `research/ai-visual-workflows-2026.md` is about register, not vendor); scene/decor art stays on Kitbitz/CC0. Never swap them — the distinction *is* the pedagogy.
