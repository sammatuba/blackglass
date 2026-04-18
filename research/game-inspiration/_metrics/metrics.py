#!/usr/bin/env python3
"""Compute comparable corpus metrics across the six extracted game corpora.

For each game we produce:
  - total tokens (word-level, whitespace split)
  - unique tokens (lowercased)
  - type-token ratio (TTR, a vocabulary-diversity proxy)
  - scene/node count (format-specific)
  - mean / median tokens per scene
  - choice count (format-specific)
  - choices per scene
  - approximate sentence count and mean sentence length
  - top named-entity candidates (capitalized words appearing >= threshold)

Corpora are heterogeneous (Yarn, NaniScript, XML journals, CSV localization,
strings dumps), so each game has its own loader that produces a common
`Corpus` object. Output: `_metrics/out/<game>.json` per game plus a single
combined markdown summary at `_metrics/out/facts.md`.
"""
from __future__ import annotations

import json
import re
import statistics
from collections import Counter
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Callable

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).resolve().parent / "out"


# ---------------------------------------------------------------------------
# Shared text utilities

TOKEN_RE = re.compile(r"[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'\u2019-]+")
SENTENCE_RE = re.compile(r"[.!?]+\s+|[.!?]+$")
CAPITALIZED_RE = re.compile(r"\b[A-Z][a-zà-ÿ]{2,}\b")
STOPLIKE = {
    "The", "And", "But", "For", "Not", "You", "Your", "They", "Them",
    "He", "She", "His", "Her", "Him", "Hers", "Who", "What", "When",
    "Where", "Why", "How", "This", "That", "These", "Those", "There",
    "Then", "Than", "With", "From", "Into", "Upon", "Over", "Under",
    "After", "Before", "About", "Yes", "No", "Oh", "Ah", "Well",
    "Okay", "Ok", "Hey", "Hi", "Now", "Here", "Still", "Just",
    "Only", "Also", "Even", "Some", "Any", "One", "Two", "Three",
    "Many", "Much", "Most", "More", "Less", "Such", "Very", "Too",
    "All", "Both", "Each", "Every", "Same", "Other", "Another",
    "If", "As", "Is", "Are", "Was", "Were", "Be", "Been", "Being",
    "Has", "Have", "Had", "Do", "Does", "Did", "Can", "Could",
    "Will", "Would", "Shall", "Should", "May", "Might", "Must",
    "Let", "Let's", "Lets", "I'm", "I've", "I'd", "I'll",
}


def count_tokens(text: str) -> list[str]:
    return TOKEN_RE.findall(text)


def sentence_count(text: str) -> int:
    # Cheap: count sentence-ending punctuation runs.
    return max(1, len(re.findall(r"[.!?]+", text)))


def top_named_entities(text: str, top_n: int = 20, min_count: int = 5) -> list[tuple[str, int]]:
    caps = CAPITALIZED_RE.findall(text)
    # Drop words that appear only at sentence starts (heuristic: also common lowercase form)
    counter = Counter(caps)
    filtered = [
        (w, c) for w, c in counter.items()
        if c >= min_count and w not in STOPLIKE and len(w) >= 3
    ]
    filtered.sort(key=lambda t: -t[1])
    return filtered[:top_n]


# ---------------------------------------------------------------------------
# Corpus container

@dataclass
class Corpus:
    game: str
    scene_texts: list[str] = field(default_factory=list)  # per-scene prose
    choice_count: int | None = None                       # explicit count if known
    notes: list[str] = field(default_factory=list)

    def full_text(self) -> str:
        return "\n\n".join(self.scene_texts)

    def metrics(self) -> dict:
        full = self.full_text()
        tokens = count_tokens(full)
        unique = {t.lower() for t in tokens}
        scene_token_counts = [len(count_tokens(s)) for s in self.scene_texts]
        sentences = sentence_count(full)
        ne = top_named_entities(full)

        def safe_stat(fn, xs):
            return fn(xs) if xs else 0

        return {
            "game": self.game,
            "scenes": len(self.scene_texts),
            "tokens": len(tokens),
            "unique_tokens": len(unique),
            "ttr": round(len(unique) / max(1, len(tokens)), 4),
            "tokens_per_scene_mean": round(safe_stat(statistics.mean, scene_token_counts), 1),
            "tokens_per_scene_median": round(safe_stat(statistics.median, scene_token_counts), 1),
            "tokens_per_scene_max": max(scene_token_counts) if scene_token_counts else 0,
            "sentences": sentences,
            "mean_sentence_len": round(len(tokens) / sentences, 1),
            "choice_count": self.choice_count,
            "choices_per_scene": (round(self.choice_count / len(self.scene_texts), 2)
                                   if self.choice_count is not None and self.scene_texts else None),
            "top_named_entities": ne,
            "notes": self.notes,
        }


# ---------------------------------------------------------------------------
# Per-game loaders

def load_sir_brante() -> Corpus:
    """Sir Brante — flat line dump + resolved interludes."""
    base = ROOT / "sir-brante" / "extraction" / "output"
    c = Corpus("Sir Brante")
    # Per-interlude scripts (resolver output)
    scripts_dir = base / "scripts"
    if not scripts_dir.exists():
        c.notes.append("extraction/output/scripts missing — rerun resolve.py")
        return c
    for f in sorted(scripts_dir.glob("interlude__*.txt")):
        c.scene_texts.append(f.read_text(encoding="utf-8", errors="replace"))
    # Counting choices — scan the full localization csv for Button_ prefix keys
    csv = base / "text-assets" / "resources__Localization.csv"
    if csv.exists():
        c.choice_count = sum(
            1 for line in csv.read_text(encoding="utf-8", errors="replace").splitlines()
            if re.match(r"^[^,]*_Button_\d", line)
        )
    c.notes.append("scenes = 47 resolved interludes; actual game has ~500+ scenelets keyed in CSV")
    return c


def load_omen_exitio() -> Corpus:
    """Omen Exitio — pull DESCRIPTION text from the English XML files."""
    base = ROOT / "omen-exitio" / "extraction" / "output" / "text-assets"
    c = Corpus("Omen Exitio: Plague")
    if not base.exists():
        c.notes.append("extraction output missing")
        return c
    # ERIK_NOTES is the main narrative; other *_en.xml are auxiliary
    desc_re = re.compile(r'DESCRIPTION="([^"]*(?:"[^"]*"[^"]*)*)"', re.DOTALL)
    for f in sorted(base.glob("*_en.xml")):
        text = f.read_text(encoding="utf-8", errors="replace")
        # The files are structured <TAG ATTR=".." ATTR=".." /> ; grab DESCRIPTION content
        descs = desc_re.findall(text)
        if f.name.startswith("ERIK_NOTES") or f.name.startswith("NOTES"):
            # Journal entries — one scene per
            c.scene_texts.extend(descs)
        elif descs:
            # Aggregate auxiliary as a single blob if non-empty (for token counts)
            c.scene_texts.append("\n\n".join(descs))
    # Count choices by scanning Titles for `_Bis` branch markers as a proxy
    titles = base / "Titles_en.json"
    if titles.exists():
        try:
            data = json.loads(titles.read_text(encoding="utf-8"))
            tlist = data.get("titles", [])
            c.choice_count = sum(1 for t in tlist if "Bis" in (t.get("id", "") or ""))
            c.notes.append(f"Titles contains {len(tlist)} scene IDs; {c.choice_count} are 'Bis' branch variants (proxy for choice count)")
        except Exception:
            pass
    c.notes.append("scene bodies (CYOA prose) are in MonoBehaviours we couldn't read — this is journal-text only")
    return c


def load_grotto() -> Corpus:
    """Grotto — per-ScriptableVisit text files from the strings-based resolver."""
    base = ROOT / "grotto" / "extraction" / "output" / "scripts"
    c = Corpus("Grotto")
    if not base.exists():
        c.notes.append("extraction/output/scripts missing")
        return c
    # Treat each ScriptableVisit as a scene; each event/combo as scenelet
    total_choices = 0
    for sub in ["ScriptableVisit", "NarratorEvent", "ScriptableEvent",
                "ScriptableStarCombo", "EndCharacter"]:
        d = base / sub
        if not d.exists():
            continue
        for f in sorted(d.glob("*.txt")):
            text = f.read_text(encoding="utf-8", errors="replace")
            c.scene_texts.append(text)
            # Crude: count pipe chars as choice-list proxies
            total_choices += text.count("|")
    c.choice_count = total_choices or None
    c.notes.append("scenes = union of Visit/Event/StarCombo/NarratorEvent/EndCharacter dumps")
    c.notes.append("scene text is strings-harvested: scene IDs and tags mixed with prose — inflates token count 10-20%")
    return c


def load_grizzly_man() -> Corpus:
    """Grizzly Man — one scene per .nani file."""
    base = ROOT / "grizzly-man" / "extraction" / "output" / "scripts"
    c = Corpus("Grizzly Man")
    if not base.exists():
        c.notes.append("extraction/output/scripts missing")
        return c
    choices = 0
    for f in sorted(base.glob("*.nani")):
        text = f.read_text(encoding="utf-8", errors="replace")
        c.scene_texts.append(text)
        choices += len(re.findall(r"^@choice\b|@choice\b", text, flags=re.MULTILINE))
    c.choice_count = choices or None
    c.notes.append("source is Spanish (Pixel Pulps); English lives in ManagedText files not joined here")
    c.notes.append("strings-harvested: NaniScript class names still leak through despite NOISE filter")
    return c


def load_ticket_to_europe() -> Corpus:
    """Ticket to Europe — one scene per Yarn `title:` block."""
    base = ROOT / "ticket-to-europe" / "extraction" / "output" / "files" / "Data" / "Sequences" / "en"
    c = Corpus("Ticket to Europe")
    if not base.exists():
        c.notes.append("extraction output missing")
        return c
    # A Yarn file can hold multiple nodes, each: `title: X\n...\n---\n...\n===`
    total_choices = 0
    for f in sorted(base.glob("*.yarn")):
        text = f.read_text(encoding="utf-8", errors="replace")
        # Split on `===` node boundary
        nodes = [n for n in text.split("===") if "title:" in n]
        for n in nodes:
            # Strip the header (everything up to and including ---)
            parts = n.split("---", 1)
            body = parts[1] if len(parts) == 2 else n
            c.scene_texts.append(body)
        # Count [[...|...]] style choices
        total_choices += len(re.findall(r"\[\[[^\]]*\]\]", text))
    c.choice_count = total_choices or None
    c.notes.append("scene = one Yarn node (title: block); cleanest corpus of the six")
    return c


def load_tails_noir() -> Corpus:
    """Tails Noir Prologue — strings dump can't be segmented into scenes."""
    prose = ROOT / "tails-noir-prologue" / "extraction" / "output" / "strings_prose.txt"
    c = Corpus("Tails Noir Prologue")
    if not prose.exists():
        c.notes.append("strings_prose.txt missing")
        return c
    # Treat each line as a 'micro-scene' — really a string run. Note this is
    # the weakest segmentation of the six; use scene counts with suspicion.
    lines = prose.read_text(encoding="utf-8", errors="replace").splitlines()
    # Filter to lines that look like dialogue/prose (>= 40 chars, end in punctuation)
    prose_lines = [l for l in lines if len(l) >= 40 and l[-1:] in ".!?\"'"]
    c.scene_texts = prose_lines[:5000]  # cap to keep metrics honest
    c.notes.append("no scene segmentation possible — each entry is one string run, not one scene")
    c.notes.append(f"filtered to {len(prose_lines):,} prose-shaped lines (>=40 chars, sentence-ending)")
    c.notes.append("metric values here are not directly comparable to the other five")
    return c


LOADERS: dict[str, Callable[[], Corpus]] = {
    "sir-brante": load_sir_brante,
    "omen-exitio": load_omen_exitio,
    "grotto": load_grotto,
    "grizzly-man": load_grizzly_man,
    "ticket-to-europe": load_ticket_to_europe,
    "tails-noir-prologue": load_tails_noir,
}


# ---------------------------------------------------------------------------
# Output

def format_number(n) -> str:
    if n is None:
        return "—"
    if isinstance(n, float):
        return f"{n:,.1f}"
    if isinstance(n, int):
        return f"{n:,}"
    return str(n)


def render_facts_md(results: list[dict]) -> str:
    lines: list[str] = []
    lines.append("# Corpus Fact Sheets — Six Works")
    lines.append("")
    lines.append("Generated by `metrics.py`. Per-game loaders produce a `Corpus` "
                 "object (list of scene texts + an optional choice count); this "
                 "file collects the resulting metrics.")
    lines.append("")
    lines.append("## Comparative matrix")
    lines.append("")
    cols = [
        ("Scenes", "scenes"),
        ("Tokens", "tokens"),
        ("Unique", "unique_tokens"),
        ("TTR", "ttr"),
        ("Tokens/scene (μ)", "tokens_per_scene_mean"),
        ("Tokens/scene (med)", "tokens_per_scene_median"),
        ("Mean sent len", "mean_sentence_len"),
        ("Choices", "choice_count"),
        ("Choices/scene", "choices_per_scene"),
    ]
    lines.append("| Work | " + " | ".join(c[0] for c in cols) + " |")
    lines.append("|" + "---|" * (len(cols) + 1))
    for r in results:
        row = [r["game"]] + [format_number(r.get(c[1])) for c in cols]
        lines.append("| " + " | ".join(row) + " |")
    lines.append("")

    for r in results:
        lines.append(f"## {r['game']}")
        lines.append("")
        lines.append(f"- **Scenes:** {format_number(r['scenes'])}")
        lines.append(f"- **Tokens:** {format_number(r['tokens'])} "
                     f"({format_number(r['unique_tokens'])} unique, TTR={r['ttr']})")
        lines.append(f"- **Tokens per scene:** mean {format_number(r['tokens_per_scene_mean'])}, "
                     f"median {format_number(r['tokens_per_scene_median'])}, "
                     f"max {format_number(r['tokens_per_scene_max'])}")
        lines.append(f"- **Mean sentence length:** {r['mean_sentence_len']} tokens "
                     f"(sentences ≈ {format_number(r['sentences'])})")
        lines.append(f"- **Choices:** {format_number(r['choice_count'])} "
                     f"({format_number(r['choices_per_scene'])}/scene)")
        if r["top_named_entities"]:
            ne = ", ".join(f"**{w}** ({c})" for w, c in r["top_named_entities"][:15])
            lines.append(f"- **Top named entities:** {ne}")
        if r["notes"]:
            lines.append("- **Notes:**")
            for n in r["notes"]:
                lines.append(f"  - {n}")
        lines.append("")
    return "\n".join(lines)


def main() -> int:
    OUT.mkdir(exist_ok=True)
    results: list[dict] = []
    for slug, loader in LOADERS.items():
        print(f"[+] {slug}")
        corpus = loader()
        m = corpus.metrics()
        results.append(m)
        (OUT / f"{slug}.json").write_text(json.dumps(m, indent=2, ensure_ascii=False))
    facts = render_facts_md(results)
    (OUT / "facts.md").write_text(facts, encoding="utf-8")
    print(f"\n[+] wrote {OUT / 'facts.md'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
