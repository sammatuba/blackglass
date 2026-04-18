#!/usr/bin/env python3
"""Join Sir Brante's Localization CSV with Interlude/GameEvent structures into
readable script files — one file per Interlude, lines resolved to English.

Run after extract.py. Reads from the extraction output/, writes scripts/.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from pathlib import Path


def load_localization(csv_path: Path, lang: str) -> dict[str, str]:
    """Return {key: translated_line} from the I2 CSV."""
    table: dict[str, str] = {}
    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        if lang not in (reader.fieldnames or []):
            sys.exit(f"Column {lang!r} not in CSV. Have: {reader.fieldnames}")
        for row in reader:
            key = (row.get("Key") or "").strip()
            text = (row.get(lang) or "").strip()
            if key and text:
                table[key] = text
    return table


def lookup(table: dict[str, str], key: str) -> str:
    if not key:
        return ""
    if key in table:
        return table[key]
    # I2 tolerates slashes vs dots in categories; try a naive fallback.
    alt = key.replace("/", "_").replace(".", "_")
    return table.get(alt, f"«MISSING: {key}»")


def safe_filename(s: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]", "_", s).strip("_.")[:140] or "unnamed"


def resolve_interlude(data: dict, table: dict[str, str]) -> list[str]:
    lines: list[str] = []
    name = data.get("m_Name", "Interlude")
    title_key = data.get("TitleKey", "")
    lines.append(f"=== {name} ===")
    if title_key:
        lines.append(f"[Title] {lookup(table, title_key)}")
    lines.append("")
    blocks = data.get("TextBlocks") or []
    for i, block in enumerate(blocks, 1):
        lines.append(f"--- Block {i} ---")
        speech_key = block.get("SpeechByKey", "")
        if speech_key:
            lines.append(lookup(table, speech_key))
        # Choices / answers, if present
        for k in ("AnswerKey1", "AnswerKey2", "AnswerKey3", "AnswerKey4"):
            v = block.get(k)
            if v:
                lines.append(f"  [{k}] {lookup(table, v)}")
        lines.append("")
    return lines


def resolve_any(data: dict, table: dict[str, str]) -> list[str]:
    """Fallback: walk any structure and print every *Key field resolved."""
    lines: list[str] = []
    stack = [(data, "")]
    while stack:
        node, path = stack.pop()
        if isinstance(node, dict):
            for k, v in node.items():
                new_path = f"{path}.{k}" if path else k
                if isinstance(v, str) and k.endswith("Key") and v:
                    resolved = lookup(table, v)
                    if not resolved.startswith("«MISSING"):
                        lines.append(f"[{new_path}={v}] {resolved}")
                else:
                    stack.append((v, new_path))
        elif isinstance(node, list):
            for i, item in enumerate(node):
                stack.append((item, f"{path}[{i}]"))
    return lines


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--output-dir", default="./output",
                    help="Extraction output/ produced by extract.py")
    ap.add_argument("--lang", default="English",
                    help="Column name in the Localization CSV")
    ap.add_argument("--csv-name", default="resources__Localization.csv",
                    help="Localization CSV filename under text-assets/")
    args = ap.parse_args()

    out = Path(args.output_dir).resolve()
    csv_path = out / "text-assets" / args.csv_name
    mono_dir = out / "monobehaviours"
    scripts_dir = out / "scripts"
    scripts_dir.mkdir(exist_ok=True)

    if not csv_path.exists():
        sys.exit(f"Missing {csv_path}. Run extract.py first.")
    if not mono_dir.exists():
        sys.exit(f"Missing {mono_dir}. Run extract.py first.")

    print(f"[+] loading {csv_path.name}")
    table = load_localization(csv_path, args.lang)
    print(f"    {len(table):,} keys in {args.lang}")

    interlude_dir = mono_dir / "_Scripts.AMVCC.Models.Static.Interlude"
    resolved = 0
    if interlude_dir.exists():
        for jf in sorted(interlude_dir.glob("*.json")):
            data = json.loads(jf.read_text(encoding="utf-8"))
            lines = resolve_interlude(data, table)
            name = safe_filename(data.get("m_Name") or jf.stem)
            (scripts_dir / f"interlude__{name}.txt").write_text(
                "\n".join(lines), encoding="utf-8"
            )
            resolved += 1
    print(f"[+] wrote {resolved} interlude scripts -> {scripts_dir}")

    # Plus a sorted dump of the whole CSV as plain text for browsing.
    plain = scripts_dir / f"00_all_lines_{args.lang.lower()}.txt"
    with plain.open("w", encoding="utf-8") as f:
        for key in sorted(table):
            f.write(f"{key}\n    {table[key]}\n\n")
    print(f"[+] wrote flat line dump -> {plain.name}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
