# Grotto

Brainwash Gang / Digerati, 2021. Short first-person narrative. The player is an oracle reading constellations for a tribe of anthropomorphic beasts; the stars give fragmentary messages that the oracle interprets into advice that shapes tribal events. Rashomon-adjacent — the same truth looks different depending on which star-message you draw.

Relevance: **interpretation as gameplay** — the written text is deliberately ambiguous and the player's "choice" is how to read it. Very aligned with what we want in blackglass: learning to see through deceptive/incomplete information is the entire mechanic.

## Engine and assets

- Unity 2020.2.1f1, **Mono build** (`Managed/` folder, no IL2CPP)
- Narrative lives in **MonoBehaviour ScriptableObjects**, not TextAssets:
  - `ScriptableEvent` (~110) — narrative events
  - `ScriptableVisit` (~91) — visits to characters / tale-tellers
  - `NarratorEvent` (~38) — narrator lines
  - `ScriptableStarCombo` (~24) — star-combination readings
  - `ConstellationDescription` (~8), `StarText` (~4), `ScriptableSegment` (~7)
  - `ChoiceDetector` (~4) — branching logic
- TextAssets (~87) are **Spine skeleton animation data**, not dialogue — skipped by the extractor
- No localization layer — English only in the ScriptableObjects

## Extraction

See [`extraction/README.md`](extraction/README.md). Same venv as the other Unity games.

## Status

- [x] Engine identified (Unity 2020 Mono, custom ScriptableObject narrative)
- [x] Extraction script (`extract.py` + `resolve.py`)
- [x] Extraction run — ~260 narrative ScriptableObjects scraped into readable form (gitignored)
- [ ] Output reviewed, [essence](essence.md) drafted

### What the extraction produced

TypeTree reader returns empty `List<T>` fields for Grotto's polymorphic narrative ScriptableObjects, so `resolve.py` bypasses it and harvests printable text runs from raw bytes. Noisy (scene IDs and tags mixed in), but every dialogue line comes through:

- `scripts/ScriptableVisit/` — **90 visits** (the character encounters, each with branching reactions)
- `scripts/ScriptableEvent/` — **110 events**
- `scripts/NarratorEvent/` — **38 narrator beats**
- `scripts/ScriptableStarCombo/` — **9 star-combination readings**
- `scripts/EndCharacter/` — **14 endings**

Good starting point: `scripts/ScriptableVisit/` — those are where the tribe members come to have their constellation-reading interpreted.
