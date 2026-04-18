# Tails Noir Prologue (formerly *Backbone Prologue*)

EggNut, 2018 (prologue) / 2021 (full *Tails Noir* née *Backbone*). Dieselpunk noir adventure in an alternate Vancouver where anthropomorphic animals run the city. The prologue is a self-contained ~1-hour detective vignette — raccoon private investigator interviewing suspects in a missing-person case.

Relevance: **interrogation-as-dialogue tree** — the PI has to decide how to press, when to bluff, what to believe. This is exactly the shape of "see clearly through unreliable interlocutors" that blackglass needs. Worth paying close attention to how the game signals *which* response is reading-the-room well vs. following a script.

## Engine and assets

- **Unreal Engine 4** (build signature in `Engine/` dir)
- Single pak: `Detective/Content/Paks/Detective-WindowsNoEditor.pak` (~438 MB)
- Standard UE4 pak container:
  - Footer magic `0x5A6F12E1` at end, giving index offset + size
  - Index lists every cooked asset with offset, size, compression, SHA1
  - Text tends to live in:
    - `.uasset` + `.uexp` pairs (cooked assets, including dialogue tables)
    - `.locres` localization binaries (Unreal's key→string format)
    - Loose `.csv` / `.json` / `.txt` if the devs shipped any

## Extraction

See [`extraction/README.md`](extraction/README.md). Uses a minimal pure-Python UE4 PAK reader (no external tool).

Deep `.uasset` parsing is out of scope for a first pass — we dump the files and harvest strings. If the prologue's dialogue lives in a `DialogueTable.uasset` or similar, a string-grep over the raw bytes often surfaces enough readable prose to work from.

## Status

- [x] Engine identified (UE4 pak v11, Zlib-compressed contents)
- [x] Extraction script (`extract.py`, pure-Python zlib-stream harvester)
- [x] Extraction run — ~200,000 prose-shaped strings (gitignored, 19 MB)
- [ ] Output reviewed, [essence](essence.md) drafted

### What the extraction produced — and what's noisy

Highest signal-to-noise of the six games so far. The pak is Zlib-compressed, and a full UE4 v11 pak reader is out of scope, so we scan for zlib stream starts, decompress everything that parses, and harvest string runs. That pulls in *all* the decompressable text — including UE4 engine docs, plugin manifests, Adobe XMP metadata from PNGs, K-Type font licenses, and even a copy of the US Declaration of Independence (a common font sample text that ended up in a font asset).

The **Backbone prologue dialogue is in there** — confirmed by spot-checks like `"All you need to know is that she's safe. You've been to the Minister's apartment. What did you find?"` — mixed with the noise.

Useful filters over `output/strings_prose.txt`:

```bash
# Likely dialogue: long, ends with sentence punctuation, contains char-name refs
grep -E '[.!?]$' output/strings_prose.txt \
  | grep -iE 'howard|renee|clarissa|minister|detective|briefs?' \
  | head -60

# Sentences with quoted dialogue (has " or ')
grep -E "[\"'][A-Z].*[.!?][\"']" output/strings_prose.txt | head -60

# Just the long lines (60+ chars)
awk 'length >= 60' output/strings_prose.txt | head -100
```

If we end up needing the full scene-structured dialogue for essence work, the escalation path is FModel / UAssetGUI / repak — proper UE4 pak tooling — rather than extending this harvester.
