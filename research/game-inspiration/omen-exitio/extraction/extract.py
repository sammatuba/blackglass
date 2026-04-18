#!/usr/bin/env python3
"""Extract narrative text from Omen Exitio: Plague's Unity bundles.

This is a Unity 2020.3 IL2CPP build, which means:
  - Narrative TextAssets are the primary payload. They ship as per-language
    files (_en, _it, _ru, _zh) of two shapes:
        * UTF-8 JSON  (e.g. Titles_en)
        * UTF-16 LE XML with BOM  (ERIK_NOTES_en, NOTES_en, CHARACTERS_en,
          DOSSIER_*_en, UI-ELEMENTS_en, ACHIEVEMENTS_en, ITEMS_en, …)
  - Scene/flow MonoBehaviours need IL2CPP typetree reconstruction. We attempt
    it via TypeTreeGeneratorAPI.load_il2cpp(); if the runtime doesn't ship
    IL2CPP support we just skip MonoBehaviours and keep the TextAssets.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import UnityPy
from UnityPy.helpers.TypeTreeGenerator import TypeTreeGenerator


LANG_SUFFIXES = ("_en", "_it", "_ru", "_zh", "_de", "_fr", "_es", "_jp", "_ja", "_ko")

NARRATIVE_CLASS_HINTS = (
    "text", "dialog", "dialogue", "speech", "line", "paragraph",
    "scene", "chapter", "act", "episode", "page", "node",
    "story", "narrative", "quest", "event", "choice", "option", "branch",
    "character", "note", "dossier", "skill", "item", "achievement", "title",
)


def safe_name(name: str | None, fallback: str) -> str:
    base = (name or fallback).strip()
    base = re.sub(r"[^A-Za-z0-9_.-]", "_", base).strip("_.")
    return (base or fallback)[:120]


def decode_text_asset(script) -> str | None:
    """Return cleanly decoded text for a Unity TextAsset, or None if binary.

    UnityPy 1.25 exposes `m_Script` as `str` pre-decoded with UTF-8 +
    surrogateescape — which round-trips losslessly back to the original bytes
    but is *not* valid UTF-8 when the payload was actually UTF-16. We round
    back to bytes first, then sniff BOM and decode properly.
    """
    if isinstance(script, str):
        try:
            script = script.encode("utf-8", "surrogateescape")
        except UnicodeEncodeError:
            return None
    if not isinstance(script, (bytes, bytearray)) or not script:
        return None
    if script[:2] == b"\xff\xfe":
        try:
            return script.decode("utf-16-le").lstrip("\ufeff")
        except UnicodeDecodeError:
            return None
    if script[:2] == b"\xfe\xff":
        try:
            return script.decode("utf-16-be").lstrip("\ufeff")
        except UnicodeDecodeError:
            return None
    try:
        s = script.decode("utf-8-sig")
    except UnicodeDecodeError:
        return None
    printable = sum(1 for c in s if c.isprintable() or c in "\n\r\t")
    return s if printable / max(1, len(s)) > 0.92 else None


def strip_lang(name: str) -> tuple[str, str | None]:
    """('ERIK_NOTES_en', 'en') / ('Titles_en', 'en') / ('_Titles', None)."""
    lower = name.lower()
    for suf in LANG_SUFFIXES:
        if lower.endswith(suf):
            return name[: -len(suf)], suf.lstrip("_")
    return name, None


def guess_ext(text: str) -> str:
    head = text.lstrip()[:1]
    if head in "{[":
        return ".json"
    if head == "<":
        return ".xml"
    if "," in text[:2000] and "\n" in text[:2000]:
        return ".csv"
    return ".txt"


def looks_narrative(class_name: str, namespace: str | None) -> bool:
    blob = f"{namespace or ''}.{class_name}".lower()
    return any(h in blob for h in NARRATIVE_CLASS_HINTS)


def mono_script_info(obj):
    try:
        mb = obj.parse_monobehaviour_head()
        script = mb.m_Script.deref_parse_as_object()
        return (script.m_AssemblyName, script.m_Namespace, script.m_ClassName)
    except Exception:
        return None


def load_il2cpp_generator(game_dir: Path, unity_version: str) -> TypeTreeGenerator | None:
    data_dirs = [p for p in game_dir.glob("*_Data") if p.is_dir()]
    if not data_dirs:
        return None
    data_dir = data_dirs[0]
    il2cpp = game_dir / "GameAssembly.dll"
    metadata = data_dir / "il2cpp_data" / "Metadata" / "global-metadata.dat"
    if not il2cpp.exists() or not metadata.exists():
        return None
    try:
        gen = TypeTreeGenerator(unity_version)
        gen.load_il2cpp(il2cpp.read_bytes(), metadata.read_bytes())
        return gen
    except Exception as e:
        print(f"[!] IL2CPP typetree load failed: {e}")
        return None


def iter_unity_files(data_dir: Path):
    """Unity container files: .assets, .bundle, plus extensionless ones like
    globalgamemanagers / level0 / level1."""
    skip_exts = {".resS", ".resource", ".json", ".info", ".config"}
    skip_names = {"app.info", "boot.config"}
    for p in sorted(data_dir.iterdir()):
        if not p.is_file():
            continue
        if p.name in skip_names:
            continue
        if p.suffix in skip_exts:
            continue
        # Skip paired .resS streams, keep main asset files
        if p.suffix in (".assets", ".bundle", ".unity3d"):
            yield p
            continue
        # Extensionless (level0, globalgamemanagers, …)
        if p.suffix == "":
            yield p


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--game-dir", required=True)
    ap.add_argument("--out", default="./output")
    ap.add_argument("--unity-version", default="2020.3.18f1")
    ap.add_argument("--keep-lang", default=None,
                    help="If set (e.g. 'en'), drop TextAssets whose name ends "
                         "in a different _<lang> suffix. Files without a "
                         "language suffix are always kept.")
    ap.add_argument("--max-bytes", type=int, default=20_000_000)
    ap.add_argument("--no-il2cpp", action="store_true",
                    help="Skip IL2CPP MonoBehaviour extraction")
    args = ap.parse_args()

    game_dir = Path(args.game_dir).resolve()
    data_dirs = [p for p in game_dir.glob("*_Data") if p.is_dir()]
    if not data_dirs:
        sys.exit(f"No *_Data directory under {game_dir}")
    data_dir = data_dirs[0]

    generator = None
    if not args.no_il2cpp:
        print(f"[+] loading IL2CPP typetree generator from {game_dir}")
        generator = load_il2cpp_generator(game_dir, args.unity_version)
        if generator is None:
            print("[!] continuing without MonoBehaviour typetrees")
        else:
            print("[+] IL2CPP typetrees loaded")

    out = Path(args.out).resolve()
    text_out = out / "text-assets"
    mono_out = out / "monobehaviours"
    text_out.mkdir(parents=True, exist_ok=True)
    mono_out.mkdir(parents=True, exist_ok=True)

    counts = {
        "files_opened": 0, "files_skipped": 0,
        "text_assets": 0, "text_skipped_binary": 0,
        "text_skipped_large": 0, "text_skipped_lang": 0,
        "mono_total": 0, "mono_saved": 0,
        "mono_read_errors": 0, "mono_no_script": 0,
    }
    class_hits: dict[str, int] = {}
    largest: list[tuple[int, str]] = []

    unity_files = list(iter_unity_files(data_dir))
    print(f"[+] scanning {len(unity_files)} files under {data_dir.name}/")

    for idx, apath in enumerate(unity_files, 1):
        try:
            env = UnityPy.load(str(apath))
            if generator is not None:
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
                name = getattr(data, "m_Name", "") or ""
                script = getattr(data, "m_Script", None) or getattr(data, "script", None)

                base, lang = strip_lang(name)
                if args.keep_lang and lang and lang != args.keep_lang.lower():
                    counts["text_skipped_lang"] += 1
                    continue

                text = decode_text_asset(script)
                if text is None:
                    counts["text_skipped_binary"] += 1
                    continue
                payload = text.encode("utf-8")
                if len(payload) > args.max_bytes:
                    counts["text_skipped_large"] += 1
                    continue

                fname = f"{safe_name(name, f'pathid_{obj.path_id}')}{guess_ext(text)}"
                (text_out / fname).write_bytes(payload)
                counts["text_assets"] += 1
                largest.append((len(payload), f"text-assets/{fname}"))

            elif tname == "MonoBehaviour" and generator is not None:
                counts["mono_total"] += 1
                info = mono_script_info(obj)
                if info is None:
                    counts["mono_no_script"] += 1
                    continue
                _assembly, namespace, class_name = info
                full = f"{namespace}.{class_name}" if namespace else class_name
                if not looks_narrative(class_name, namespace):
                    continue
                try:
                    tree = obj.read_typetree()
                except Exception:
                    counts["mono_read_errors"] += 1
                    continue
                name = safe_name(
                    tree.get("m_Name") if isinstance(tree, dict) else None,
                    f"pathid_{obj.path_id}",
                )
                sub = mono_out / safe_name(full, "class")
                sub.mkdir(parents=True, exist_ok=True)
                fname = f"{apath.stem or apath.name}__{name}__{obj.path_id}.json"
                payload = json.dumps(tree, indent=2, ensure_ascii=False, default=str)
                (sub / fname).write_text(payload, encoding="utf-8")
                counts["mono_saved"] += 1
                class_hits[full] = class_hits.get(full, 0) + 1
                largest.append((len(payload), f"monobehaviours/{full}/{fname}"))

        if idx % 5 == 0 or idx == len(unity_files):
            print(f"    ... {idx}/{len(unity_files)} | "
                  f"text={counts['text_assets']} mono={counts['mono_saved']} "
                  f"err={counts['mono_read_errors']}")

    largest.sort(reverse=True)
    with (out / "summary.txt").open("w", encoding="utf-8") as f:
        f.write(f"Game dir:  {game_dir}\n")
        f.write(f"Data dir:  {data_dir}\n")
        f.write(f"Unity:     {args.unity_version}\n")
        f.write(f"IL2CPP:    {'yes' if generator else 'skipped'}\n\n")
        for k, v in counts.items():
            f.write(f"{k:<28} {v}\n")
        f.write("\nClass hits (saved):\n")
        for cls, n in sorted(class_hits.items(), key=lambda kv: -kv[1])[:60]:
            f.write(f"  {n:>5}  {cls}\n")
        f.write("\nLargest outputs:\n")
        for size, name in largest[:50]:
            f.write(f"  {size:>12,}  {name}\n")

    print(f"\n[+] done -> {out}")
    print(json.dumps(counts, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
