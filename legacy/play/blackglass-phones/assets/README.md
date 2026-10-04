# Diegetic artifacts — generation pipeline

The images here are the things the characters are **fooled by** — the clickbait
previews and the AI "debunker" still. They're generated at authoring time and
referenced as static local files at runtime. The game is fully playable with
**zero** images (every artifact falls back to CSS); images are pure enhancement.

Design rationale: `craft/maya/_meta/graphics-and-completion-approach.md`.

## Generate the images

```bash
cd play/blackglass-phones
export GEMINI_API_KEY=...          # your Google AI / Gemini API key
node gen-images.mjs                 # generates any missing artifacts
```

That's it. Open `../index.html` and the artifacts now appear in the family GC,
on Bea's TikTok, and in the "Look again" examine view.

### Flags

| command | does |
|---|---|
| `node gen-images.mjs` | generate only the artifacts that don't exist yet |
| `node gen-images.mjs --force` | regenerate everything (overwrite) |
| `node gen-images.mjs --only=dr-anita-still,dr-anita-outro` | just these ids |
| `node gen-images.mjs --model=imagen-4.0-generate-001` | use Imagen instead of Nano Banana |
| `node gen-images.mjs --dry-run` | print the prompts, call nothing |
| `node gen-images.mjs --emit` | only rewrite `artifacts.js` from the manifest (no key needed) |

Zero npm dependencies — needs Node ≥ 18 for built-in `fetch`.

## How it fits together

```
manifest.json   ── source of truth: prompts, sizes, planted tells, fallbacks
   │
   ├─ gen-images.mjs  ──►  *.png         (the generated artifacts; commit them)
   │                  ──►  artifacts.js  (browser mirror: file + tells, no prompts)
   │
index.html loads artifacts.js → app.js renders <img onerror→CSS fallback>
```

- **`manifest.json`** — edit this to change a prompt, add an artifact, or move a
  tell. Re-run with `--emit` afterward so `artifacts.js` stays in sync.
- **`artifacts.js`** — auto-generated, do not hand-edit.
- **The default model** is `gemini-2.5-flash-image` ("Nano Banana"). It supports
  `editFrom` image-conditioning, which keeps Dr. Anita's face consistent between
  her main still and her outro. Imagen ignores `editFrom`.

## The tells are the point

Each artifact is generated **convincing but deliberately flawed** — the planted
tells (`manifest.json` → `tells[]`) are the pedagogical payload. After playing,
the **"Look again" / examine** screen re-shows each artifact with tappable
markers that surface the seam the character missed. Generate realistic; never
generate seamless.

## Committing

Once generated, **commit the PNGs** — the deployed (GitHub Pages) and offline
`file://` builds need them present. They are not fetched, only referenced.

## No functional harm

Every artifact is fictional and non-functional: no real people, no working URLs,
no real brands or phone numbers. The prompts enforce this. Keep it that way.
