#!/usr/bin/env python3
"""Extract Naninovel.Script bodies into readable .nani-ish files.

Naninovel.Script is stored as MonoBehaviour with a `List<ScriptLine>` of parsed
lines — the raw `ScriptText` field ends up empty or near-empty and UnityPy's
TypeTree reader can't deserialize the generic list cleanly. Instead we harvest
UTF-8 string runs (>=10 printable chars) directly from each object's raw bytes.

Output: `output/scripts/<name>.nani` — one file per Naninovel.Script object.

This is necessarily noisier than a proper parse (includes some identifier
names alongside prose), but it surfaces every NaniScript command
(`@back`, `@choice`, `@char`, `@bgm` …) and every dialogue line.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

import UnityPy
from UnityPy.helpers.TypeTreeGenerator import TypeTreeGenerator


ASCII_RUN = re.compile(rb"[\x20-\x7E\xC2-\xF4][\x20-\x7E\xC2-\xF4\t\r\n]{9,}")

# Serialized class-name tags Naninovel emits for every line — pure noise.
NOISE = re.compile(
    r"^(?:"
    r"[A-Za-z]*ScriptLine"              # CommentScriptLine, EmptyScriptLine, …
    r"|Elringus\.Naninovel(?:\.[A-Za-z.]+)?"
    r"|MonoBehaviour|ScriptableObject"
    r")$"
)


def safe_name(name: str, fallback: str) -> str:
    base = re.sub(r"[^A-Za-z0-9_.-]", "_", (name or fallback)).strip("_.")
    return (base or fallback)[:140]


def extract_runs(raw: bytes) -> list[str]:
    runs: list[str] = []
    seen_consecutive: str | None = None
    for m in ASCII_RUN.finditer(raw):
        try:
            s = m.group(0).decode("utf-8").strip()
        except UnicodeDecodeError:
            continue
        if not s or NOISE.match(s):
            continue
        if s == seen_consecutive:
            continue
        seen_consecutive = s
        runs.append(s)
    return runs


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--game-dir", required=True)
    ap.add_argument("--output-dir", default="./output")
    ap.add_argument("--unity-version", default="2020.3.20f1")
    args = ap.parse_args()

    game_dir = Path(args.game_dir).resolve()
    data_dirs = [p for p in game_dir.glob("*_Data") if p.is_dir()]
    if not data_dirs:
        raise SystemExit(f"No *_Data under {game_dir}")
    data_dir = data_dirs[0]

    out = Path(args.output_dir).resolve()
    scripts_dir = out / "scripts"
    scripts_dir.mkdir(parents=True, exist_ok=True)

    gen = TypeTreeGenerator(args.unity_version)
    gen.load_local_game(str(game_dir))

    n = 0
    for p in sorted(data_dir.iterdir()):
        if not p.is_file():
            continue
        if p.suffix not in ("", ".assets") or p.name.endswith((".resS", ".resource")):
            continue
        if p.name in ("app.info", "boot.config"):
            continue
        try:
            env = UnityPy.load(str(p))
            env.typetree_generator = gen
        except Exception:
            continue
        for o in env.objects:
            if o.type.name != "MonoBehaviour":
                continue
            try:
                mb = o.parse_monobehaviour_head()
                script = mb.m_Script.deref_parse_as_object()
                if script.m_ClassName != "Script":
                    continue
                if "Naninovel" not in (script.m_Namespace or ""):
                    continue
                name = mb.m_Name or f"pathid_{o.path_id}"
                raw = o.get_raw_data()
            except Exception:
                continue
            runs = extract_runs(raw)
            if not runs:
                continue
            fname = f"{safe_name(name, str(o.path_id))}.nani"
            (scripts_dir / fname).write_text("\n".join(runs), encoding="utf-8")
            n += 1

    print(f"[+] wrote {n} .nani files -> {scripts_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
