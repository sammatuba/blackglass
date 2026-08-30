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
- **Where:** `play/blackglass-phones/gen-images.mjs` + `assets/manifest.json`. Run `node gen-images.mjs` (needs `GEMINI_API_KEY` in `.env`). Generated PNGs are committed; the runtime has CSS fallbacks so the game works without them.
- **Status:** quota-exhausted (HTTP 429) as of 2026-08-31 — re-run when quota resets. New Scam Radar case artifacts go in their own manifest (same schema) once the platform lands.

## 3. Typography & chrome

- Fonts are **self-hosted** via @fontsource packages (no Google Fonts CDN — PWA offline requirement).
- Iconography: inline SVG in-repo (stroke icons, currentColor) — no icon-font dependency.
- App icons/PWA art: generated locally by `scripts/make-icons.mjs` (zero-dep PNG writer).

## Rules

1. Every third-party asset ships with its license noted in an `ASSETS.md`-style manifest next to the files.
2. Kitbitz SVGs may be recolored/scaled freely (CC0) — keep the original catalog `assetId` in metadata for provenance.
3. Diegetic artifacts stay on the Gemini pipeline; scene/decor art stays on Kitbitz. Never swap them — the distinction *is* the pedagogy.
