---
scene: 01-opening
revised: 2026-05-01
canonical_ink: craft/maya/scenes/01-opening/script.ink
applies_to: play/blackglass/story.js
status: applied
---

# Handoff: Scene 1 — Normal Day (revised opening)

Restructures Scene 1 around a 4-beat compressed opening with awareness-gated consequences. Form = theme: pattern recognition becomes the core mechanic. Implements *strong narrative > roleplaying mechanic* — character is established before the first consequential choice.

## What changed

- Replaced the original 5-passage flat walk (`s1_morning` → `s1_family` → `s1_family_after` → `s1_sms` → `s1_sms_after` → `s1_feed` → `s1_morning_end`) with a 4-beat structure plus consequence/aftermath variants.
- Beat 1 (lockscreen reach) is now its own passage with no choices — establishes muscle-memory dependence before any agency is offered.
- Beat 2 (notification scan) presents a 3-way fork (Family / SMS / Bea) with the "Knowing doesn't change what you do" line.
- Beat 3 (family GC scroll) weaves blessed-morning GIF, pasabuy, lumpia recipe, and Tita's health link into one threaded passage with the link as a callout embed.
- Beats 4 and 5 (notice + choice) are now **awareness-gated** — the player sees a different reflection and a different choice menu depending on whether they noticed the SMS pattern earlier.
- Each consequence branch carries its own emotional truth ("you knew, you clicked anyway" vs. "almost right, almost").
- All paths converge at `s1_morning_continues` → `s1_remaining_notifications` → `s1_morning_end` → `s2_intro`.

## New flags

The key gating flag is `s1_noticed_sms_pattern`. The rest are seeds for Act 3 reflection — wire them in when the reckoning is written.

| Flag | Set when | Read by |
|------|----------|---------|
| `s1_noticed_sms_pattern` | Player picks SMS first in Beat 2, or any SMS choice in `s1_sms_exposure` | `s1_tita_link_branch` (gates Beat 4 aware/unaware) |
| `s1_family_obligation` | Player opens Family GC first | Act 3 reflection (not yet wired) |
| `s1_scam_exposure` | Player picks SMS first | Act 3 reflection (not yet wired) |
| `s1_links_clicked` | Player taps any of: Tita's link (aware/unaware), GLife SMS link | Act 3 reflection (not yet wired) |
| `s1_messages_forwarded` | Player screenshots Tita's link to Renz, or SMS to Renz | Act 3 reflection (not yet wired) |
| `s1_automation_bias` | Player taps Tita's link (aware or unaware) | Act 3 reflection (not yet wired) |
| `s1_contextual_blindness` | Player picks Family first, taps link, or asks Tita the link source | Act 3 reflection (not yet wired) |
| `s1_social_proof_reliance` | Player heart-reacts to Tita's link (aware or unaware) | Act 3 reflection (not yet wired) |
| `s1_critical_thinking_penalized` | Player asks Tita where the link came from | Act 3 reflection (not yet wired) |
| `s1_family_obligation_weight` | Set after the question-link path resolves | Act 3 reflection (not yet wired) |
| `s1_noticed_headline_pattern` | Player taps link in aware state | Act 3 reflection (not yet wired) |
| `s1_noticed_url_suspicious` | Player taps link (aware or unaware) | Act 3 reflection (not yet wired) |

## New branch logic

- `s1_tita_link_branch` is a branch passage routing on `s1_noticed_sms_pattern`:
  - aware variant (`s1_tita_link_aware`): 4 choices — tap anyway / question Tita / heart-react / screenshot
  - unaware variant (`s1_tita_link_unaware`): 2 choices — tap / heart-react
- SMS-first and Bea-first openings each play their own brief beat (`s1_sms_exposure`, `s1_bea_video`) then route into `s1_family_gc_scroll`, so every player hits the family arc. SMS path sets `s1_noticed_sms_pattern` first, tripping the aware Beat 4.

## Stubs / open work

The Ink leaves `work_message`, `bea_video`, `sms_exposure` as placeholders. The build session bridges them with brief on-tone content and routes through `s1_morning_end → s2_intro`:

- `s1_remaining_work` — Jigs's "make it pop" brief
- `s1_remaining_bea` — TikTok callback
- `s1_remaining_sms` — same shape, deleted unfinished
- `s1_remaining_putdown` — phone face-down, ninety seconds, pick it up again

Replace these with full beats when the writing session continues the remaining notification scenes.

## Build notes

- The in-chat link preview renders as a callout (embed-styled) rather than a system notif, to distinguish "embedded in the thread" from "system-level alert."
- Browser pages render as callouts tagged with the URL, not separate notifs.
- Awareness-gated reflection paragraphs are inline in the aware/unaware passages, not in `s1_tita_link_branch` itself (the branch passage is body-less by design).
