#!/usr/bin/env python3
"""Extract narrative text from Sir Brante's Unity bundles.

Sir Brante is Unity 2018.3 using the I2 Localization plugin. Narrative lives as:
  - TextAsset objects (CSV / JSON localization tables, some ignorable font data)
  - MonoBehaviour objects — serialized I2 LanguageSource + gameplay data classes

MonoBehaviour deserialization needs TypeTree info, which isn't embedded in Unity
standalone builds, so we reconstruct it from Managed/*.dll using UnityPy's
TypeTreeGenerator. Results go to output/ as plain files.
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import re
import sys
from pathlib import Path

import UnityPy
from UnityPy.helpers.TypeTreeGenerator import TypeTreeGenerator


I2_KEY_MARKERS = {"mTerms", "mLanguages", "mSource", "Languages_Touch", "TermType"}

# Class-name hints that suggest narrative / localization content.
NARRATIVE_CLASS_HINTS = (
    "language", "localiz", "term", "i18n",
    "text", "dialog", "dialogue", "speech", "line",
    "scene", "chapter", "act", "episode", "interlude",
    "story", "narrative", "quest", "event",
    "character", "person",
    "choice", "option", "branch",
)


def safe_name(name: str | None, fallback: str) -> str:
    base = (name or fallback).strip()
    base = re.sub(r"[^A-Za-z0-9_.-]", "_", base).strip("_.")
    return (base or fallback)[:120]


def looks_like_text(data: bytes) -> bool:
    if not data:
        return False
    try:
        s = data.decode("utf-8")
    except UnicodeDecodeError:
        return False
    if len(s) < 8:
        return False
    printable = sum(1 for c in s if c.isprintable() or c in "\n\r\t")
    return printable / len(s) > 0.92


def guess_ext(sample: str) -> str:
    head = sample.lstrip()[:1]
    if head in "{[":
        return ".json"
    if "," in sample[:2000] and "\n" in sample[:2000]:
        return ".csv"
    return ".txt"


def has_i2_shape(tree) -> bool:
    stack = [tree]
    while stack:
        node = stack.pop()
        if isinstance(node, dict):
            for k, v in node.items():
                if k in I2_KEY_MARKERS:
                    return True
                stack.append(v)
        elif isinstance(node, list):
            stack.extend(node)
    return False


def looks_narrative(class_name: str) -> bool:
    lc = class_name.lower()
    return any(h in lc for h in NARRATIVE_CLASS_HINTS)


def mono_script_info(obj):
    """Return (assembly, namespace, class_name) for a MonoBehaviour, or None."""
    try:
        mb = obj.parse_monobehaviour_head()
        script = mb.m_Script.deref_parse_as_object()
        return (script.m_AssemblyName, script.m_Namespace, script.m_ClassName)
    except Exception:
        return None


I2_META_COLS = {"Key", "Type", "Desc", "Description", "Plural", "Category"}


def filter_i2_csv(script: bytes, keep_lang: str) -> bytes:
    """If `script` looks like an I2 Localization CSV with a `keep_lang` column,
    return a copy with all other language columns dropped. Otherwise return
    `script` unchanged."""
    try:
        script.decode("utf-8")
    except UnicodeDecodeError:
        return script
    # TextIOWrapper with newline="" handles CRLF and embedded-newline quoted
    # fields correctly (plain StringIO does not).
    reader = csv.reader(io.TextIOWrapper(io.BytesIO(script), encoding="utf-8", newline=""))
    try:
        header = next(reader)
    except (StopIteration, csv.Error):
        return script
    if "Key" not in header or keep_lang not in header:
        return script
    keep_idx = [i for i, col in enumerate(header) if col in I2_META_COLS or col == keep_lang]
    if len(keep_idx) == len(header):
        return script
    buf = io.StringIO()
    writer = csv.writer(buf, lineterminator="\n")
    writer.writerow([header[i] for i in keep_idx])
    try:
        for row in reader:
            writer.writerow([row[i] if i < len(row) else "" for i in keep_idx])
    except csv.Error:
        # Malformed row — bail out and keep the original file rather than
        # silently produce a truncated one.
        return script
    return buf.getvalue().encode("utf-8")


def iter_asset_files(data_dir: Path):
    patterns = ("*.assets", "*.bundle", "*.unity3d")
    seen = set()
    for pat in patterns:
        for p in data_dir.rglob(pat):
            if p in seen:
                continue
            seen.add(p)
            yield p


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--game-dir", required=True,
                    help="Game install root (the folder containing *_Data/)")
    ap.add_argument("--out", default="./output", help="Output directory")
    ap.add_argument("--unity-version", default="2018.3.0f2")
    ap.add_argument("--max-bytes", type=int, default=20_000_000,
                    help="Skip TextAssets larger than this (default 20MB)")
    ap.add_argument("--dump-all-mono", action="store_true",
                    help="Dump every readable MonoBehaviour (noisy, for exploration)")
    ap.add_argument("--keep-lang", default=None,
                    help="If set (e.g. 'English'), drop other language columns "
                         "from any I2 Localization CSV before writing")
    args = ap.parse_args()

    game_dir = Path(args.game_dir).resolve()
    data_dirs = [p for p in game_dir.glob("*_Data") if p.is_dir()]
    if not data_dirs:
        sys.exit(f"No *_Data directory under {game_dir}")
    data_dir = data_dirs[0]

    print(f"[+] loading TypeTreeGenerator from {game_dir}")
    generator = TypeTreeGenerator(args.unity_version)
    generator.load_local_game(str(game_dir))

    out = Path(args.out).resolve()
    text_out = out / "text-assets"
    loc_out = out / "localization"
    mono_out = out / "monobehaviours"
    text_out.mkdir(parents=True, exist_ok=True)
    loc_out.mkdir(parents=True, exist_ok=True)
    mono_out.mkdir(parents=True, exist_ok=True)

    counts = {
        "files_opened": 0, "files_skipped": 0,
        "text_assets": 0, "text_skipped_binary": 0, "text_skipped_large": 0,
        "mono_total": 0, "mono_saved_narrative": 0, "mono_saved_i2": 0,
        "mono_saved_all": 0, "mono_read_errors": 0, "mono_no_script": 0,
    }
    class_hits: dict[str, int] = {}
    largest: list[tuple[int, str]] = []

    asset_files = sorted(iter_asset_files(data_dir))
    print(f"[+] scanning {len(asset_files)} asset files under {data_dir}")

    for idx, apath in enumerate(asset_files, 1):
        if idx % 25 == 0 or idx == len(asset_files):
            print(f"    ... {idx}/{len(asset_files)} | "
                  f"text={counts['text_assets']} "
                  f"narr={counts['mono_saved_narrative']} "
                  f"i2={counts['mono_saved_i2']} "
                  f"err={counts['mono_read_errors']}")
        try:
            env = UnityPy.load(str(apath))
            env.typetree_generator = generator
        except Exception:
            counts["files_skipped"] += 1
            continue
        counts["files_opened"] += 1

        for obj in env.objects:
            tname = obj.type.name
            if tname == "TextAsset":
                try:
                    data = obj.read()
                except Exception:
                    counts["text_skipped_binary"] += 1
                    continue
                script = getattr(data, "m_Script", None) or getattr(data, "script", None) or b""
                if isinstance(script, str):
                    script = script.encode("utf-8", errors="replace")
                if not script:
                    continue
                if len(script) > args.max_bytes:
                    counts["text_skipped_large"] += 1
                    continue
                if not looks_like_text(script):
                    counts["text_skipped_binary"] += 1
                    continue
                name = safe_name(getattr(data, "m_Name", None) or getattr(data, "name", None),
                                 f"pathid_{obj.path_id}")
                if args.keep_lang:
                    script = filter_i2_csv(script, args.keep_lang)
                sample = script.decode("utf-8", errors="replace")
                ext = guess_ext(sample)
                fname = f"{apath.stem}__{name}{ext}"
                (text_out / fname).write_bytes(script)
                counts["text_assets"] += 1
                largest.append((len(script), f"text-assets/{fname}"))

            elif tname == "MonoBehaviour":
                counts["mono_total"] += 1
                info = mono_script_info(obj)
                if info is None:
                    counts["mono_no_script"] += 1
                    continue
                _assembly, namespace, class_name = info
                full = f"{namespace}.{class_name}" if namespace else class_name
                narrative = looks_narrative(class_name) or looks_narrative(namespace or "")

                if not (narrative or args.dump_all_mono):
                    # Cheap skip: don't deserialize unrelated classes.
                    # Still try I2 via class name alone:
                    if not any(k in class_name.lower() for k in ("language", "i2", "localiz", "term")):
                        continue
                try:
                    tree = obj.read_typetree()
                except Exception:
                    counts["mono_read_errors"] += 1
                    continue

                is_i2 = has_i2_shape(tree)
                if not (narrative or is_i2 or args.dump_all_mono):
                    continue

                name = safe_name(
                    tree.get("m_Name") if isinstance(tree, dict) else None,
                    f"pathid_{obj.path_id}"
                )
                class_hits[full] = class_hits.get(full, 0) + 1

                if is_i2:
                    target = loc_out
                    counts["mono_saved_i2"] += 1
                elif narrative:
                    target = mono_out / full
                    target.mkdir(parents=True, exist_ok=True)
                    counts["mono_saved_narrative"] += 1
                else:
                    target = mono_out / full
                    target.mkdir(parents=True, exist_ok=True)
                    counts["mono_saved_all"] += 1

                fname = f"{apath.stem}__{name}__{obj.path_id}.json"
                payload = json.dumps(tree, indent=2, ensure_ascii=False, default=str)
                (target / fname).write_text(payload, encoding="utf-8")
                largest.append((len(payload), f"{target.relative_to(out)}/{fname}"))

    largest.sort(reverse=True)
    summary_path = out / "summary.txt"
    with summary_path.open("w", encoding="utf-8") as f:
        f.write(f"Game dir:  {game_dir}\n")
        f.write(f"Data dir:  {data_dir}\n")
        f.write(f"Unity:     {args.unity_version}\n\n")
        for k, v in counts.items():
            f.write(f"{k:<28} {v}\n")
        f.write("\nClass hits (saved):\n")
        for cls, n in sorted(class_hits.items(), key=lambda kv: -kv[1])[:60]:
            f.write(f"  {n:>5}  {cls}\n")
        f.write("\nLargest outputs:\n")
        for size, name in largest[:50]:
            f.write(f"  {size:>12,}  {name}\n")

    print(f"\n[+] done -> {out}")
    print(f"    summary: {summary_path}")
    print(json.dumps(counts, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        print("\ninterrupted", file=sys.stderr)
        sys.exit(130)
