#!/usr/bin/env python3
"""Extract narrative text from Grotto's ScriptableObject MonoBehaviours.

Grotto's narrative ScriptableObjects (`ScriptableVisit`, `ScriptableEvent`,
`ScriptableStarCombo`, `ConstellationDescription`, `NarratorEvent`,
`ScriptableSegment`, …) serialize their content into `List<T>` fields whose
element types are polymorphic — UnityPy's TypeTree reader returns empty
lists for them. So extract.py captures the header but loses the body.

This resolver bypasses the typetree and harvests printable UTF-8 runs from
each object's raw bytes. Noisier than a proper parse, but surfaces every
dialogue line and choice.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

import UnityPy
from UnityPy.helpers.TypeTreeGenerator import TypeTreeGenerator


ASCII_RUN = re.compile(rb"[\x20-\x7E\xC2-\xF4][\x20-\x7E\xC2-\xF4\t\r\n]{9,}")

# Narrative class names to extract (raw-bytes scan).
TARGET_CLASSES = {
    "ScriptableVisit", "ScriptableEvent", "ScriptableStarCombo",
    "ConstellationDescription", "NarratorEvent", "ScriptableSegment",
    "StarText", "ChoiceDetector", "VisitActivator",
    "NarrativeCharacter", "EndCharacter", "EndVisitInteraction",
    "MerchantInteraction", "OniricWorldCharacter",
}

NOISE = re.compile(
    r"^(?:"
    r"UnityEngine(?:\.[A-Za-z.]+)?"
    r"|System(?:\.[A-Za-z.]+)?"
    r"|MonoBehaviour|ScriptableObject"
    r"|[A-Za-z_]+Data|[A-Za-z_]+Controller|[A-Za-z_]+Manager"
    r")$"
)


def safe_name(name: str, fallback: str) -> str:
    base = re.sub(r"[^A-Za-z0-9_.-]", "_", (name or fallback)).strip("_.")
    return (base or fallback)[:140]


def extract_runs(raw: bytes) -> list[str]:
    runs: list[str] = []
    prev: str | None = None
    for m in ASCII_RUN.finditer(raw):
        try:
            s = m.group(0).decode("utf-8").strip()
        except UnicodeDecodeError:
            continue
        if not s or NOISE.match(s) or s == prev:
            continue
        prev = s
        runs.append(s)
    return runs


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--game-dir", required=True)
    ap.add_argument("--output-dir", default="./output")
    ap.add_argument("--unity-version", default="2020.2.1f1")
    args = ap.parse_args()

    game_dir = Path(args.game_dir).resolve()
    data_dirs = [p for p in game_dir.glob("*_Data") if p.is_dir()]
    if not data_dirs:
        raise SystemExit(f"No *_Data under {game_dir}")
    data_dir = data_dirs[0]

    out = Path(args.output_dir).resolve()
    gen = TypeTreeGenerator(args.unity_version)
    gen.load_local_game(str(game_dir))

    per_class: dict[str, int] = {}
    for p in sorted(data_dir.iterdir()):
        if not p.is_file() or p.suffix not in ("", ".assets"):
            continue
        if p.name.endswith((".resS", ".resource")) or p.name in ("app.info", "boot.config"):
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
                cls = script.m_ClassName
                if cls not in TARGET_CLASSES:
                    continue
                name = mb.m_Name or f"pathid_{o.path_id}"
                raw = o.get_raw_data()
            except Exception:
                continue
            runs = extract_runs(raw)
            if not runs:
                continue
            target = out / "scripts" / cls
            target.mkdir(parents=True, exist_ok=True)
            (target / f"{safe_name(name, str(o.path_id))}.txt").write_text(
                "\n".join(runs), encoding="utf-8"
            )
            per_class[cls] = per_class.get(cls, 0) + 1

    print(f"[+] wrote files -> {out / 'scripts'}")
    for cls, n in sorted(per_class.items(), key=lambda kv: -kv[1]):
        print(f"    {n:>4}  {cls}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
