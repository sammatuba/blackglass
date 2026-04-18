#!/usr/bin/env python3
"""Extract text resources from Ticket to Europe's Godot PCK archive.

Format: Godot 3.x PCK v1.
  [GDPC][pack_ver u32][godot major/minor/patch u32][16 reserved u32][file_count u32]
  For each entry:
    [path_len u32][path bytes, padded to 4][offset u64][size u64][md5 16]
  Then file data at their offsets.

We extract every file whose extension suggests text (.tscn/.tres/.gd/.json/.csv
/.txt/.po/.cfg/.import/.remap), plus any extensionless file that decodes as
UTF-8 text. Binary resources (.scn/.res/.gdc/.png/.ogg/.wav/etc.) are skipped —
reading those would require Godot-specific decoders.
"""
from __future__ import annotations

import argparse
import json
import struct
import sys
from pathlib import Path


MAGIC = b"GDPC"
TEXT_EXTS = {
    ".tscn", ".tres", ".gd", ".gdshader", ".shader",
    ".json", ".csv", ".txt", ".xml", ".yaml", ".yml", ".md",
    ".po", ".pot", ".cfg", ".ini", ".import", ".remap",
    ".atlas", ".hjson",
}
SKIP_EXTS = {
    ".png", ".jpg", ".jpeg", ".webp", ".svg", ".bmp", ".tga",
    ".ogg", ".mp3", ".wav", ".opus",
    ".ttf", ".otf",
    ".scn", ".res", ".gdc",   # compiled binaries
    ".stex", ".stream",
    ".webm", ".theora",
    ".bin", ".dat", ".data",
}


def looks_like_text(data: bytes) -> bool:
    if not data:
        return False
    try:
        s = data.decode("utf-8")
    except UnicodeDecodeError:
        return False
    printable = sum(1 for c in s if c.isprintable() or c in "\n\r\t")
    return printable / len(s) > 0.92


def parse_pck(path: Path):
    with path.open("rb") as f:
        magic = f.read(4)
        if magic != MAGIC:
            raise SystemExit(f"Not a Godot PCK (magic {magic!r})")
        pack_version = struct.unpack("<I", f.read(4))[0]
        major, minor, patch = struct.unpack("<III", f.read(12))
        print(f"[+] Godot {major}.{minor}.{patch}, pack version {pack_version}")
        if pack_version != 1:
            print(f"[!] pack version {pack_version} untested; may need different layout")
        # 16 reserved uint32s
        f.read(16 * 4)
        (file_count,) = struct.unpack("<I", f.read(4))
        print(f"[+] {file_count:,} entries")

        entries = []
        for _ in range(file_count):
            (plen,) = struct.unpack("<I", f.read(4))
            raw_path = f.read(plen)
            path_str = raw_path.rstrip(b"\x00").decode("utf-8", "replace")
            # In Godot 3 PCK v1 the path length field includes the null
            # padding needed for 4-byte alignment, so no extra padding after.
            offset, size = struct.unpack("<QQ", f.read(16))
            md5 = f.read(16)
            entries.append((path_str, offset, size, md5))
        return entries


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--pck", required=True, help="Path to the .pck file")
    ap.add_argument("--out", default="./output", help="Output directory")
    ap.add_argument("--dump-all", action="store_true",
                    help="Dump every file regardless of extension heuristics")
    ap.add_argument("--keep-lang", default=None,
                    help="Two-letter lang code (e.g. 'en'). Drops files under "
                         "Data/Sequences/<other-lang>/ and *_<lang>.po pattern.")
    args = ap.parse_args()

    pck_path = Path(args.pck).resolve()
    out = Path(args.out).resolve()
    files_out = out / "files"
    files_out.mkdir(parents=True, exist_ok=True)

    entries = parse_pck(pck_path)
    print(f"[+] scanning {len(entries):,} entries for text")

    text_count = binary_skipped = lang_skipped = 0
    ext_hits: dict[str, int] = {}
    largest: list[tuple[int, str]] = []
    keep_lang = args.keep_lang.lower() if args.keep_lang else None

    import re as _re
    lang_re = _re.compile(r"/Sequences/([a-z]{2,3})/")

    with pck_path.open("rb") as f:
        for path_str, offset, size, _md5 in entries:
            if keep_lang:
                m = lang_re.search(path_str)
                if m and m.group(1) != keep_lang:
                    lang_skipped += 1
                    continue
            ext = ""
            if "." in path_str:
                ext = "." + path_str.rsplit(".", 1)[-1].lower()

            is_text_ext = ext in TEXT_EXTS
            is_skip_ext = ext in SKIP_EXTS
            if not args.dump_all:
                if is_skip_ext:
                    binary_skipped += 1
                    continue
                if not is_text_ext and ext:
                    # Unknown extension — peek at content to decide
                    pass

            f.seek(offset)
            data = f.read(size)
            if not args.dump_all and not is_text_ext and not looks_like_text(data):
                binary_skipped += 1
                continue

            # Strip Godot's res:// prefix
            clean = path_str
            for prefix in ("res://", "user://"):
                if clean.startswith(prefix):
                    clean = clean[len(prefix):]
                    break
            target = files_out / clean
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)

            text_count += 1
            ext_hits[ext or "(no-ext)"] = ext_hits.get(ext or "(no-ext)", 0) + 1
            largest.append((size, clean))

    largest.sort(reverse=True)
    summary = out / "summary.txt"
    with summary.open("w", encoding="utf-8") as f:
        f.write(f"PCK:            {pck_path}\n")
        f.write(f"Total entries:  {len(entries):,}\n")
        f.write(f"Text extracted: {text_count:,}\n")
        f.write(f"Binary skipped: {binary_skipped:,}\n")
        f.write(f"Lang skipped:   {lang_skipped:,}\n\n")
        f.write("Extension hits:\n")
        for ext, n in sorted(ext_hits.items(), key=lambda kv: -kv[1]):
            f.write(f"  {n:>6}  {ext}\n")
        f.write("\nLargest outputs:\n")
        for sz, p in largest[:40]:
            f.write(f"  {sz:>12,}  {p}\n")

    print(f"\n[+] done -> {out}")
    print(f"    {text_count:,} text files extracted, {binary_skipped:,} binary skipped")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
