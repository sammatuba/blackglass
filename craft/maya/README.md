# Maya — the IF

**Reading layer:** [`arc.md`](arc.md) — the polished full-narrative, 12 scenes across 3 acts, ~15K words. Read this for the story.

**Working layer:** [`scenes/`](scenes/) — per-scene dossiers (drafts, polished Ink, build handoffs). Read these to revise.

**Design context:** [`_meta/`](_meta/) — character baseline, continuity, editorial commentary, scene blueprints, Ink design foundation, craft guidelines, full design bible.

---

## Scene status

| # | Scene | Drafts | Script (Ink) | Handoff | Built into game |
|---|-------|:------:|:------------:|:-------:|:---------------:|
| 1 | [Opening — Lockscreen Morning](scenes/01-opening/) | ✅ | ✅ | ✅ applied | ✅ (revised 2026-05-01) |
| 2 | [GCash wrong-send](scenes/02-gcash-scam/) | ✅ | ✅ | — | partial (in `arc.md` form) |
| 3 | [The Feed Knows You](scenes/03-feed/) | ✅ | — | — | partial (in `arc.md` form) |
| 4 | [Family GC Pressure Cooker](scenes/04-family-pressure/) | ✅ | — | — | partial (in `arc.md` form) |
| 5 | [The Voice That Sounds Right](scenes/05-voice/) | ✅ | — | — | partial (in `arc.md` form) |
| 6 | [The Viral Truth](scenes/06-viral-truth/) | ✅ | — | — | partial (in `arc.md` form) |
| 7 | [The Algorithm Knows](scenes/07-algorithm/) | ✅ | — | — | partial (in `arc.md` form) |
| 8 | [The Invoice That Isn't](scenes/08-invoice/) | ✅ | — | — | partial (in `arc.md` form) |
| 9 | [The Conversation](scenes/09-conversation/) | ✅ | — | — | partial (in `arc.md` form) |
| 10 | [The Reckoning](scenes/10-reckoning/) | ✅ | — | — | partial (in `arc.md` form) |
| 11 | [The Echo](scenes/11-echo/) | ✅ | — | — | partial (in `arc.md` form) |
| 12 | [What You Carry Forward](scenes/12-carry-forward/) | ✅ | — | — | partial (in `arc.md` form) |

**Legend.** *Drafts* = workshop output exists. *Script* = polished into Ink. *Handoff* = build note written; `applied` means the build session has wired it into `play/blackglass/story.js`. *Built into game* = the player can walk it; "partial" means the build was generated from `arc.md` prose, not from a polished Ink.

**Drift watch.** When `script.ink` is more recent than `arc.md`'s corresponding section, list it here:

- Scene 1: `script.ink` is canonical (revised 2026-05-01). `arc.md`'s Scene 1 is one revision behind. Sync next time you touch the prose.

---

## How to revise a scene

1. **Drafts.** Workshop new approaches in `scenes/<NN>-<slug>/drafts.md`. Multi-writer parallel + editorial ranking lives here.
2. **Polish.** Promote the chosen draft into `scenes/<NN>-<slug>/script.ink`.
3. **Sync the reading layer.** Update the corresponding section in `arc.md` so the user's reading copy reflects the latest. Note any drift in the table above.
4. **Handoff.** Write `scenes/<NN>-<slug>/handoff.md` from [`../_handoff-template.md`](_handoff-template.md). Keep it short.
5. **Build session applies.** The build session reads the handoff, edits `play/blackglass/story.js`, sets `status: applied` in the handoff frontmatter.

For tiny edits, skip steps 4–5 and direct the build session in chat.
