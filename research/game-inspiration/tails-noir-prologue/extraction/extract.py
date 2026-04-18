#!/usr/bin/env python3
"""Extract readable text from Tails Noir Prologue's UE4 PAK archive.

The pak is UE4 version 11 with **Zlib-compressed file contents** and
bit-packed encoded entries. A full UE4 pak reader is a serious project, so
we take a targeted shortcut:

  1. Scan the pak bytes for Zlib stream starts (`0x78 0x01/9C/DA`).
  2. At each candidate offset, try `zlib.decompress` on progressively larger
     windows until it succeeds or obviously fails.
  3. For every blob we successfully decompress, harvest printable string
     runs (UTF-8 and UTF-16 LE).
  4. De-dupe, filter to natural-language-shaped lines, sort by length.

This surfaces dialogue prose, localization keys, scene/node titles, and
anything else that was stored as text inside a `.uasset`. The cost is some
false-positive decompressions (random data that happens to start with 0x78)
which we discard on failure — cheap.
"""
from __future__ import annotations

import argparse
import re
import struct
import sys
import zlib
from pathlib import Path


ASCII_RUN = re.compile(rb"[\x20-\x7E\t\r\n]{16,}")
UTF16_RUN = re.compile(
    rb"(?:[\x20-\x7E\t\r\n]\x00){8,}"
)
NOISE_RE = re.compile(
    r"^(?:"
    r"[A-Z_/]+|"
    r"[A-Za-z0-9_]+\.(?:uasset|umap|ubulk|uexp|uplugin|ini|cpp|h|py|lua|dll|pdb|pak|po)|"
    r"/(?:Game|Engine|Content|Script)/[^\s]*|"
    r"[A-Z][a-zA-Z0-9_]*(?:/[A-Z][a-zA-Z0-9_]*){2,}|"
    r"[a-zA-Z0-9_]+::[a-zA-Z0-9_]+|"
    r"0x[0-9A-Fa-f]+|"
    r"\{[A-F0-9-]+\}|"
    r")$"
)


def scan_zlib_starts(mv: memoryview) -> list[int]:
    """Offsets of plausible zlib-deflate headers."""
    starts = []
    pos = 0
    n = len(mv)
    while pos < n - 2:
        if mv[pos] == 0x78 and mv[pos + 1] in (0x01, 0x5E, 0x9C, 0xDA):
            starts.append(pos)
            pos += 1
        else:
            pos += 1
    return starts


def try_decompress(mv: memoryview, start: int, max_bytes: int = 8_000_000) -> bytes | None:
    d = zlib.decompressobj()
    out = bytearray()
    pos = start
    end = min(len(mv), start + max_bytes)
    try:
        while pos < end:
            chunk_end = min(pos + 65536, end)
            chunk = mv[pos:chunk_end].tobytes()
            out.extend(d.decompress(chunk))
            pos = chunk_end
            if d.eof:
                break
        if not d.eof or len(out) < 64:
            return None
        return bytes(out)
    except zlib.error:
        return None


def harvest_strings(blob: bytes) -> set[str]:
    runs: set[str] = set()
    for m in ASCII_RUN.finditer(blob):
        try:
            s = m.group(0).decode("utf-8").strip()
        except UnicodeDecodeError:
            continue
        if len(s) >= 12:
            runs.add(s)
    for m in UTF16_RUN.finditer(blob):
        try:
            s = m.group(0).decode("utf-16-le").strip()
        except UnicodeDecodeError:
            continue
        if len(s) >= 8:
            runs.add(s)
    return runs


def looks_natural(s: str) -> bool:
    if " " not in s:
        return False
    if NOISE_RE.match(s):
        return False
    alpha = sum(1 for c in s if c.isalpha())
    return alpha / len(s) >= 0.5


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--pak", required=True)
    ap.add_argument("--out", default="./output")
    ap.add_argument("--max-blobs", type=int, default=0,
                    help="Stop after decompressing N blobs (0=unbounded)")
    ap.add_argument("--ascii-only", action="store_true",
                    help="Drop strings with non-ASCII chars — cuts most "
                         "non-English localization strings")
    args = ap.parse_args()

    pak = Path(args.pak).resolve()
    out = Path(args.out).resolve()
    out.mkdir(parents=True, exist_ok=True)

    pak_bytes = pak.read_bytes()
    mv = memoryview(pak_bytes)
    print(f"[+] pak: {pak} ({len(pak_bytes):,} bytes in RAM)")

    starts = scan_zlib_starts(mv)
    print(f"[+] {len(starts):,} candidate zlib starts")

    all_strings: set[str] = set()
    decompressed = 0
    failed = 0
    skipped_overlap = 0
    # Track ranges we've already decoded to avoid re-trying starts inside them
    consumed_until = 0

    for i, s in enumerate(starts):
        if args.max_blobs and decompressed >= args.max_blobs:
            break
        if s < consumed_until:
            skipped_overlap += 1
            continue
        blob = try_decompress(mv, s)
        if blob is None:
            failed += 1
            continue
        # Roughly mark the range consumed (compressed size is unknown without
        # the entry header, so we conservatively skip ~len(blob)/10 bytes —
        # zlib typically hits 10:1 or better on Unreal data).
        consumed_until = s + max(len(blob) // 10, 1024)
        decompressed += 1
        all_strings.update(harvest_strings(blob))
        if decompressed % 200 == 0:
            print(f"    ... {decompressed:,} blobs, {failed:,} false starts, "
                  f"{len(all_strings):,} unique strings")

    print(f"[+] decompressed {decompressed:,} blobs "
          f"({failed:,} false starts, {skipped_overlap:,} overlap-skipped)")

    def keep(s: str) -> bool:
        if not looks_natural(s):
            return False
        if args.ascii_only and any(ord(c) > 127 for c in s):
            return False
        return True

    clean = sorted((s for s in all_strings if keep(s)),
                   key=lambda s: (-len(s), s))
    (out / "strings_all.txt").write_text("\n".join(sorted(all_strings)),
                                         encoding="utf-8")
    (out / "strings_prose.txt").write_text("\n".join(clean),
                                           encoding="utf-8")

    with (out / "summary.txt").open("w", encoding="utf-8") as f:
        f.write(f"PAK:               {pak}\n")
        f.write(f"Bytes:             {len(pak_bytes):,}\n")
        f.write(f"Zlib candidates:   {len(starts):,}\n")
        f.write(f"Decompressed:      {decompressed:,}\n")
        f.write(f"False starts:      {failed:,}\n")
        f.write(f"Overlap-skipped:   {skipped_overlap:,}\n")
        f.write(f"Unique strings:    {len(all_strings):,}\n")
        f.write(f"Prose-shaped:      {len(clean):,}\n")

    print(f"\n[+] done -> {out}")
    print(f"    all strings:  {len(all_strings):,}  strings_all.txt")
    print(f"    prose-shaped: {len(clean):,}  strings_prose.txt")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
