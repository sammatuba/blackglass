# The Life and Suffering of Sir Brante

Sever Studios / 101XP, 2021. Text-heavy interactive fiction set in an alternate-feudal theocracy. Life simulation with branching consequences across six acts, from childhood to death. Choices accumulate into social class, faith, and political allegiance; the world remembers.

Relevance to our work: Rashomon-adjacent (same events seen differently by different classes/paths), choices costed in stats the player has to budget, teaching happens through accumulated weight rather than explicit lectures. Worth studying.

## Engine and assets

- Unity 2018.3.0f2
- Text stored inside binary Unity asset bundles (`sharedassets*.assets`) under `*_Data/`
- Uses the **I2 Localization** plugin — narrative lines live as serialized `TextAsset` or `MonoBehaviour` entries inside the bundles, typically as JSON or CSV blobs
- No loose text files in `StreamingAssets/` — simple `cat`/`grep` will not work

## Extraction

Unity bundles require a deserializer. We use [UnityPy](https://github.com/K0lb3/UnityPy) via a local venv so the project itself stays zero-dependency.

See [`extraction/README.md`](extraction/README.md) for how to run.

## Status

- [x] Engine identified (Unity 2018.3 + I2 Localization)
- [x] Extraction script written (`extract.py`) — uses UnityPy + TypeTreeGenerator
- [x] Resolver written (`resolve.py`) — joins CSV with Interlude structure
- [x] Extraction run: full narrative pulled (~22 MB raw, gitignored)
- [ ] Output reviewed, [essence](essence.md) drafted

## What the extraction produced (summary)

- `Localization.csv` — 38,255 rows × RU / EN / ZH, ~12,500 unique English lines
- 47 Interlude structures (Childhood, Peace, Insurrection, Inquisitor, PeaceEnd…)
- 66 Characters, 47 Interludes, 50 GameEvents, 19 TextControllers (see `extraction/output/summary.txt` once run)
- Readable per-interlude transcripts under `extraction/output/scripts/`

Good starting point for reading: `extraction/output/scripts/interlude__ChildhoodInterlude0.txt`.
