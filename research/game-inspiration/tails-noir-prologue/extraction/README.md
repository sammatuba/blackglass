# Tails Noir Prologue — extraction

Best-effort harvest of readable text from the UE4 pak.

## Prereqs

None — pure Python 3. Requires enough RAM to hold the pak (≈440 MB).

## Run

```bash
python3 extract.py \
  --pak "/mnt/e/Program Files (x86)/Steam/steamapps/common/Backbone Prologue/Detective/Content/Paks/Detective-WindowsNoEditor.pak" \
  --out ./output \
  --ascii-only
```

`--ascii-only` drops strings containing non-ASCII bytes, which cuts most of the non-English localization. Drop the flag if you want all languages.

## Approach

The pak is UE4 v11 with Zlib-compressed file contents. Proper parsing (footer → index → per-file entry headers → block-level decompression) would require re-implementing Unreal's full pak reader; instead we take a shortcut:

1. Load the whole pak into memory.
2. Scan for Zlib stream starts (bytes `0x78 0x01/5E/9C/DA`).
3. At each candidate, try `zlib.decompress` incrementally. On success, we have a decompressed blob; on failure, discard and move on.
4. Harvest UTF-8 (`[\x20-\x7E\t\r\n]{16,}`) and UTF-16 LE (`(?:[\x20-\x7E]\x00){8,}`) runs from every blob.
5. Filter to "prose-shaped" lines (contain a space, ≥50% alphabetic density, not matching UE asset-path / identifier noise patterns).
6. Sort longest-first and emit.

## Output

- `output/strings_all.txt` — every unique string run (sorted alphabetically)
- `output/strings_prose.txt` — filtered, sorted longest-first
- `output/summary.txt` — counts

The narrative IS in `strings_prose.txt`, interleaved with UE4 engine docs, plugin manifests, font-license text, and Adobe metadata. See the parent [README](../README.md) for grep recipes that surface dialogue.

If we need proper scene-structured dialogue, the escalation path is FModel, UAssetGUI, or repak — not extending this script.

## Output is gitignored

Same convention as the other games.
