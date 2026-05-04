# Workflow

How the iterative creative process runs in this project. Read this once when you start; copy the prompts in the **Common moves** section as needed.

---

## Mental model

Four layers, four kinds of work:

| Layer | What it is | Where it lives |
|-------|------------|----------------|
| **Read** | The polished story you read end-to-end | `craft/maya/arc.md` |
| **Write** | Per-scene workshop, Ink polish, handoff note | `craft/maya/scenes/<NN>-<slug>/` |
| **Build** | Playable game (translates Ink into engine passages) | `play/blackglass/` |
| **Play** | What you actually open in a browser | `play/blackglass/index.html` |

Two AI sessions usually run in parallel:

- **Writing session** — a creative-focused model (e.g. Sonnet). Drafts prose, polishes Ink, maintains the reading layer, writes handoffs. Does not edit `story.js`.
- **Build session** — a code-focused model (e.g. Opus). Reads handoffs, edits `story.js`, validates build integrity, flips handoff status. Does not rewrite prose.

They communicate through files in `craft/maya/scenes/<NN>-<slug>/` — specifically `script.ink` and `handoff.md`.

---

## Common moves

### "I want to read the latest story"

Open `craft/maya/arc.md`. Twelve scenes, three acts, ~15K words.

If you want to know whether anything has been revised more recently than `arc.md` reflects, check the **drift watch** section at the bottom of `craft/maya/README.md`.

### "I want to revise scene X" — writing session

Paste this into the writing session, replacing `<NN>-<slug>` with the scene folder name (e.g. `03-feed`):

> Revise scene `<NN>-<slug>`. Workshop drafts live in `craft/maya/scenes/<NN>-<slug>/drafts.md`. Read the existing scene in `craft/maya/arc.md` and the design context in `craft/maya/_meta/`. When you're done:
>
> 1. Save the polished Ink to `craft/maya/scenes/<NN>-<slug>/script.ink`.
> 2. Update the corresponding section in `craft/maya/arc.md` so the reading layer stays current.
> 3. Write a build handoff at `craft/maya/scenes/<NN>-<slug>/handoff.md` using the template at `craft/maya/_handoff-template.md`.
> 4. Update the scene-status table in `craft/maya/README.md`.

Expected outputs:
- `script.ink` (canonical for this scene)
- `arc.md` section refreshed
- `handoff.md` listing changed stitches, new flags, branch logic, stubs
- README scene-status updated

### "Update the game with the latest writing" — build session

Paste this into the build session:

> Apply the handoff at `craft/maya/scenes/<NN>-<slug>/handoff.md` to `play/blackglass/story.js`. Read the handoff first; open `script.ink` only for prose. After editing, validate the build still loads (all passages reachable, no orphans, all paths reach `s2_intro` or end at a valid ending). Then flip the handoff's `status:` field to `applied` and update the scene-status table in `craft/maya/README.md`.

Expected outputs:
- `story.js` with the scene's new passages and flags
- `handoff.md` frontmatter `status: applied`
- README scene-status updated
- A short summary of what changed and what to verify in browser

### "What's the state of things?"

Open `craft/maya/README.md`. The scene-status table shows for each scene: drafts written, polished into Ink, handoff written, applied to game. The drift-watch section flags any scene whose Ink is ahead of `arc.md`.

### "I want to play the game"

Open `play/blackglass/index.html` in a browser. Use the topbar TOC button to jump to any scene; "See other endings" at the end of a playthrough lets you explore alternate routes without restarting.

---

## The handoff (the seam)

The handoff at `craft/maya/scenes/<NN>/handoff.md` is the single artifact that crosses session boundaries. Its template (`craft/maya/_handoff-template.md`) covers:

- **What changed** — stitches added, removed, restructured
- **New flags** — name, where set, where read (or "not yet wired")
- **New branch logic** — conditional reveals, awareness gates
- **Stubs / open work** — what's intentionally placeholder
- **Build notes** — UX-specific guidance prose alone won't communicate

For tiny edits (typo fixes, single-line tweaks), skip the handoff and direct the build session in chat.

**Why a note instead of auto-generated passages:** the engine's data shape is still evolving while the writing is the bet. Coupling the writing session to that shape now would slow both halves. The handoff is the contract between them.

---

## What's not in this loop

- **World/character work** — write to `craft/maya/_meta/`. Doesn't pass through the build.
- **Engine changes** — if a new branching pattern doesn't fit the current engine, the build session adjusts `play/blackglass/{app,story}.js` infrastructure first, then scenes apply against the new shape.
- **Literacy games** — separate work. Lives under `craft/literacy-games/` (designs) and `play/{bias-bounty-lite,human-in-the-loop,…}/` (playable). Same project, different pipeline.

---

## Quick reference

| You want to | Look at |
|---|---|
| Read the story | `craft/maya/arc.md` |
| See state of all 12 scenes | `craft/maya/README.md` |
| Revise a scene | `craft/maya/scenes/<NN>-<slug>/` |
| Tell the build session what to apply | `craft/maya/scenes/<NN>-<slug>/handoff.md` |
| Play the game | `play/blackglass/index.html` |
| Engine logic | `play/blackglass/app.js` |
| Game data | `play/blackglass/story.js` |
| Game styling | `play/blackglass/styles.css` |
| Cross-cutting writing notes | `craft/maya/_meta/` |
| Older versions of revised scenes | `archive/maya/` |
| AI orientation (personas, conventions) | `CLAUDE.md` |
