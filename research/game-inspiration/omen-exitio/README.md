# Omen Exitio: Plague

Mixtvision / Brigada Studios, 2018. Lovecraftian CYOA set in 1890s British East Africa. The player is Erik Lang, a naval officer sent to Zanzibar; the story unfolds as his journal, with skill checks and branching choices that fold into the protagonist's mounting dread.

Relevance: journal-as-narrator framing; lore delivered as readable in-fiction documents (dossiers, notes) separate from the prose scenes; explicit skill economy (SKILLS, PINS, FEEDBACKS) that the writing has to earn. Comparison point for how to wrap a paranoia/deception story in a trustable-seeming document.

## Engine and assets

- Unity 2020.3.18f1, **IL2CPP build** (`GameAssembly.dll` + `il2cpp_data/Metadata/global-metadata.dat`, no `Managed/` folder)
- Narrative TextAssets are grouped by category and language, e.g. `ERIK_NOTES_en`, `NOTES_en`, `CHARACTERS_en`, `DOSSIER_GENERAL_en`, `Titles_en`, `ACHIEVEMENTS_en`
- Titles files are UTF-8 JSON (array of `{id, title}` objects)
- Most narrative files are **UTF-16 LE XML** (BOM `FF FE`) — `<NOTE ID="..." NAME="..." DESCRIPTION="..." />` style records
- Level scene data and story-flow logic live in ~7,500+ MonoBehaviours across `resources.assets` and `level2`; reading them needs IL2CPP typetree reconstruction

## Extraction

See [`extraction/README.md`](extraction/README.md). Same venv as Sir Brante: `~/.venvs/blackglass-extract` with `UnityPy` + `TypeTreeGeneratorAPI`.

## Status

- [x] Engine identified (Unity 2020 IL2CPP, UTF-16 XML text)
- [x] Extraction script (`extract.py`)
- [x] Extraction run — 30 English TextAssets, ~392 KB total (gitignored)
- [ ] Output reviewed, [essence](essence.md) drafted

### What the extraction produced

All English narrative TextAssets as `*.xml` / `*.json`:

- `ERIK_NOTES_en.xml` — **the main narrative**, Erik Lang's journal, ~58 KB of first-person prose across branching entries (IDs like `0`, `1a`, `1b` — suffixes mark choice branches)
- `NOTES_en.xml`, `CHARACTERS_en.xml`, `DOSSIER_*_en.xml` — in-fiction documents, people, lore
- `ITEMS_en.xml`, `SKILLS_en.xml`, `ACHIEVEMENTS_en.xml`, `PINS_en.xml`, `MAPS_en.xml`, `FEEDBACKS_en.xml` — mechanic / encyclopedic text
- `Titles_en.json` — scene titles keyed by scene ID (`D1_1` = "The Beginning of a Journey", `D1_3Bis` = branch variant)
- `UI-ELEMENTS_en.xml`, `OPTION-TOOLTIPS_en.xml`, `CONFIRM-MESSAGES_en.xml` — UI strings

### Known limitation: CYOA scene prose

`Titles_en.json` names ~hundreds of scenes (`D1_1`…`DN_N_Bis`), but the **body prose of each branching scene** lives in MonoBehaviour ScriptableObjects inside `resources.assets` / `level2`, not in TextAssets. IL2CPP typetree reconstruction via `TypeTreeGeneratorAPI.load_il2cpp()` loaded but failed to resolve any class (thousands of "Sequence contains no matching element" errors — a known limitation of the managed-runtime-free typetree path for some builds).

For inspiration purposes, `ERIK_NOTES_en.xml` is first-person prose substantial enough to draft [`essence.md`](essence.md) without the scene bodies. If we later need the full branching scene text, the escalation path is: run Il2CppDumper against `GameAssembly.dll` + `global-metadata.dat` to produce dummy `.dll` stubs, then feed those to `TypeTreeGenerator.load_local_game()` the same way Sir Brante works.
