# Ticket to Europe — extraction

Pulls text resources out of the Godot PCK archive.

## Prereqs

None — pure Python 3, no external packages.

## Run

```bash
python3 extract.py \
  --pck "/mnt/e/Program Files (x86)/Steam/steamapps/common/Ticket to Europe/TTE.pck" \
  --out ./output \
  --keep-lang en
```

`--keep-lang en` drops `Data/Sequences/it/`, `Data/Sequences/pl/`, `Data/Sequences/zh/` (cuts ~8 MB of duplicated narrative in other languages).

## What it does

1. Parses the Godot 3 PCK v1 header (`GDPC` magic, file count, per-file path/offset/size/MD5).
2. For every entry:
   - Skips by extension if it's obviously binary (`.png`, `.ogg`, `.scn`, `.res`, `.gdc`, …).
   - Keeps text extensions directly (`.yarn`, `.tscn`, `.tres`, `.gd`, `.json`, `.csv`, `.txt`, `.po`, `.cfg`, `.import`, `.remap`).
   - For unknown extensions, sniffs the first bytes to decide.
3. Writes each kept file to `output/files/<original path>`, stripping the Godot `res://` prefix.
4. Writes `output/summary.txt` with extension histogram and largest files.

## What's in the output

- `output/files/Data/Sequences/en/*.yarn` — the actual narrative in **Yarn Spinner** format: node headers, branching prose, `[[Choice|Destination]]` links, inline conditions like `Tag(thief)==1`.
- `output/files/Scenes/`, `output/files/Styles/`, `output/files/UI Assets/` — Godot scene layouts and visual styles
- `output/files/Data/` — supporting data tables (TSV, JSON)

Binary `.scn`/`.res`/`.gdc` would need a Godot-specific decoder to recover — out of scope for inspiration work, since the `.yarn` files already carry the narrative payload.

## Output is gitignored

Same convention as the other games. Read, then distill into `../essence.md`.
