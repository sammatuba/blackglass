# Grizzly Man

LCB Game Studio / Chorus Worldwide, 2024. Part of the *Pixel Pulps* series by Nico Saraintaris & Fernando Martínez Ruppel (same team as *Mothmen 1966*, *Varney Lake*, *Bahnsen Knights*). 8-colour pixel-pulp visual novel with pulp-magazine framing and diegetic minigames.

Relevance: **framing device as narrator's credibility** — the pulp-magazine conceit makes the player accept unreliable narration as genre convention, which maps onto how AI-mediated content gets accepted via design cues. The minigames are also a way of making decisions feel earned rather than arbitrarily branching.

## Engine and assets

- Unity 2020.3.20f1, Mono build
- Uses **Naninovel** — a Unity visual-novel engine with its own `.nani` script format (Markdown-like, author-friendly)
- Narrative primarily in MonoBehaviours:
  - `Naninovel.Script` (~305) — one per scene, each has a `ScriptText` field with the full NaniScript source
  - `Naninovel.ManagedTextProvider` (~413) — key→value strings grouped by category (Credits, UI, Locales, Achievements, DefaultUI)
  - `Naninovel.PlayScript` (~33), various `Naninovel.UI.*` panels
- TextAssets (~32, per-language) carry the `ManagedTextProvider` payloads — `.Key: Value` lines with comments declaring source/target languages (source appears to be Spanish)

## Extraction

See [`extraction/README.md`](extraction/README.md). The extractor pulls every `Naninovel.Script` into an individual `.nani` file — these are the readable, writer-friendly script sources for each scene.

## Status

- [x] Engine identified (Unity + Naninovel VN engine)
- [x] Extraction script (`extract.py` + `resolve.py`)
- [x] Extraction run — all 305 `Naninovel.Script` scenes dumped (gitignored)
- [ ] Output reviewed, [essence](essence.md) drafted

### What the extraction produced

`Naninovel.Script` serializes its content into `List<ScriptLine>` with polymorphic line types (`CommentScriptLine`, `CommandScriptLine`, `GenericTextScriptLine`, …). UnityPy's TypeTree reader can't walk that list, so `resolve.py` harvests printable UTF-8 runs from the raw bytes instead.

- `scripts/*.nani` — **305 scene scripts** (Spanish source; English lives in the ManagedText files)
  - `MM_*.nani` (Mothmen 1966 chapters) and `BK_*.nani` (Bahnsen Knights chapters) — this Steam folder actually contains the *Pixel Pulps* bundle
  - NaniScript commands (`@print`, `@choice`, `@back`, `@char`) and dialogue prose come through cleanly
- `monobehaviours/Naninovel.ManagedTextProvider/` — **313 localized string tables** (credits, UI, etc.)
- `monobehaviours/Naninovel.PlayScript/` — **30 play-order references**

Good starting point: a large chapter like `scripts/MM_08.nani` (~1,000 lines).
