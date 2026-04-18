# Omen Exitio — extraction

Pulls narrative TextAssets (and narrative-adjacent MonoBehaviours) out of the Unity IL2CPP build.

## Prereqs

Same venv as Sir Brante — shared across all Unity games in this folder.

```bash
python3 -m venv ~/.venvs/blackglass-extract
~/.venvs/blackglass-extract/bin/pip install UnityPy TypeTreeGeneratorAPI
```

## Run

```bash
~/.venvs/blackglass-extract/bin/python extract.py \
  --game-dir "/mnt/e/Program Files (x86)/Steam/steamapps/common/Omen Exitio Plague" \
  --out ./output \
  --keep-lang en
```

## What it does

1. **TextAssets** — pulls every text-y asset, auto-decoding UTF-16 LE / UTF-16 BE / UTF-8 (BOM-aware). Detects XML / JSON / CSV from the first non-whitespace char and names the file accordingly.
2. **Language filter** — `--keep-lang en` drops files whose name ends in `_it`, `_ru`, `_zh`, etc. Files without a language suffix (e.g. `_Titles`) are always kept.
3. **MonoBehaviours** — if `GameAssembly.dll` and `global-metadata.dat` are present, reconstructs IL2CPP typetrees and dumps narrative-hinted MonoBehaviours (`*Dialogue*`, `*Scene*`, `*Note*`, `*Skill*`, `*Title*` etc.) to `output/monobehaviours/<FullClassName>/`. Pass `--no-il2cpp` to skip.
4. Writes `output/summary.txt` with counts, class histogram, and largest outputs.

## Expected output shape

- `output/text-assets/ERIK_NOTES_en.xml` — Erik Lang's journal entries
- `output/text-assets/NOTES_en.xml`, `CHARACTERS_en.xml`, `DOSSIER_GENERAL_en.xml`, `ACHIEVEMENTS_en.xml`, `ITEMS_en.xml`, `UI-ELEMENTS_en.xml`, `SKILLS_en.xml`, …
- `output/text-assets/Titles_en.json` — per-scene titles (`D1_1` → "The Beginning of a Journey" etc.)
- `output/monobehaviours/...` — if IL2CPP typetrees load successfully

The XML files are UTF-16 on disk in the game; we decode them to UTF-8 on save.

## Output is gitignored

Same convention as Sir Brante. Read the dump, distill into `../essence.md`, don't commit the raw text.
