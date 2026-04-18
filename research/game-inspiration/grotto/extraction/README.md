# Grotto — extraction

Pulls narrative `ScriptableObject` MonoBehaviours out of the Unity Mono build.

## Prereqs

Same venv as the other Unity games.

```bash
python3 -m venv ~/.venvs/blackglass-extract
~/.venvs/blackglass-extract/bin/pip install UnityPy TypeTreeGeneratorAPI
```

## Run

```bash
# 1. Pull TextAssets + read-what-you-can MonoBehaviours
~/.venvs/blackglass-extract/bin/python extract.py \
  --game-dir "/mnt/e/Program Files (x86)/Steam/steamapps/common/Grotto" \
  --out ./output

# 2. Strings-based pass for narrative ScriptableObjects (ScriptableVisit etc.)
#    whose List<T> fields aren't readable via TypeTree
~/.venvs/blackglass-extract/bin/python resolve.py \
  --game-dir "/mnt/e/Program Files (x86)/Steam/steamapps/common/Grotto" \
  --output-dir ./output
```

## What it does

Same shape as the Sir Brante extractor:

1. Reconstructs Unity TypeTrees from `Managed/*.dll` via `TypeTreeGeneratorAPI`.
2. Walks every `*.assets` under `Grotto_Data/`.
3. Dumps `TextAsset` objects to `output/text-assets/` — in this build those are Spine animation JSON, not narrative; kept for completeness but skip when reading.
4. Dumps narrative-hinted MonoBehaviours to `output/monobehaviours/<ClassName>/` — `ScriptableEvent`, `ScriptableVisit`, `NarratorEvent`, `ChoiceDetector`, `StarText`, `ConstellationDescription`, `ScriptableStarCombo`, `ScriptableSegment`, and anything else matching the class-name hints.
5. Writes `output/summary.txt` with counts and a class histogram.

## Why `resolve.py`

Grotto's `ScriptableEvent` / `ScriptableVisit` / `ScriptableStarCombo` / `ConstellationDescription` / `NarratorEvent` / `ScriptableSegment` serialize their payloads into `List<T>` fields whose element types are polymorphic. UnityPy's TypeTree reader returns empty lists for them — so `extract.py` captures the headers but loses the bodies. `resolve.py` re-scans the raw bytes of every object of those classes and dumps printable UTF-8 runs as per-file `.txt` under `output/scripts/<ClassName>/`. Noisier than a proper parse (scene IDs and tags mixed in with prose) but every dialogue line is there.

## Output is gitignored

Same convention as the other games. Read, then distill into `../essence.md`.
