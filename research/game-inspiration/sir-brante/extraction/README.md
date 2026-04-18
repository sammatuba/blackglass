# Sir Brante — extraction

Pulls text out of the Unity asset bundles into plain files we can read.

## Prereqs

One-time: create a venv outside the repo with UnityPy and the typetree generator.

```bash
python3 -m venv ~/.venvs/blackglass-extract
~/.venvs/blackglass-extract/bin/pip install UnityPy TypeTreeGeneratorAPI
```

## Run

```bash
# 1. Pull raw text + narrative MonoBehaviours (English-only)
~/.venvs/blackglass-extract/bin/python extract.py \
  --game-dir "/mnt/e/Program Files (x86)/Steam/steamapps/common/The Life and Suffering of Sir Brante" \
  --out ./output \
  --keep-lang English

# 2. Join the localization CSV with Interlude structure into readable scripts
~/.venvs/blackglass-extract/bin/python resolve.py --output-dir ./output
```

On Windows or a different install, pass the path to the directory containing `*_Data/`.

## What extract.py does

1. Reconstructs Unity TypeTrees from `Managed/*.dll` via `TypeTreeGeneratorAPI` (Sir Brante ships no embedded typetrees, so MonoBehaviour deserialization needs this).
2. Walks every `*.assets` / `*.bundle` under `*_Data/`.
3. Dumps every readable `TextAsset` to `output/text-assets/` — this captures `Localization.csv` (the I2 Localization source). With `--keep-lang English`, other language columns are stripped on save (~7.2 MB → ~2.8 MB).
4. Deserializes MonoBehaviours whose C# class name hints at narrative (`Interlude`, `Character`, `GameEvent`, `TextController`, `Dialogue`, `Scene`, etc.) and saves them under `output/monobehaviours/<FullClassName>/`.
5. Writes `output/summary.txt` with counts, class histogram, and largest outputs.

## What resolve.py does

Joins the extracted structure back into readable form:
- `output/scripts/interlude__*.txt` — one file per Interlude, speech keys resolved to English
- `output/scripts/00_all_lines_english.txt` — every localization key + line, sorted, for full-text search

## What's in the narrative

- `Localization.csv` is a flat key/translation table. Keys look like `01.01.01_Button_1` — `act.chapter.scene_role`.
- `Interlude`, `GameEvent`, `Character` MonoBehaviours hold the **structure**: which speech keys fire in what order, who speaks, what choices branch.
- The whole game is key-based; to read prose start from `scripts/00_all_lines_english.txt` or a specific `interlude__*.txt`.

## Output is gitignored

`output/` is excluded by the root `.gitignore`. Raw game text is working material — read it, then distill findings into `../essence.md`. Don't commit the dumps.
