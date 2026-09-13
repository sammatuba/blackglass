<!-- Canonical design-system prose. This file is the durable source of truth —
     the OpenDesign 'user:blackglass' package is an export of it (see
     ~/.agents/skills/opendesign-headless). Update here, then re-PATCH the package. -->

# Blackglass — Seeing Clearly in a World Shaped by AI

## Brand identity in three sentences

1. Blackglass is a dark-glass learning suite about AI-powered deception, culturally grounded in the Philippines — ink-deep navy canvases where a single accent color always means something (which pillar, which character, which truth).
2. Fraunces Variable carries the voice (editorial serif display, "magazine that respects you"), Inter Variable carries the interface (quiet, dense, never cute); narration inside phone screens uses ui-serif to feel like found text.
3. UI is character: each phone/OS skin re-themes the same component vocabulary (bg/panel/ink/hairline/bubble/accent variables) so the interface itself tells you who is holding the phone — never decorate, always characterize.

## Color — the ink scale (dark, blue-cast, never pure black)

| Token | Hex | Role |
| --- | --- | --- |
| --color-ink-950 | #04060b | deepest backdrop, letterbox edges |
| --color-ink-900 | #070b14 | page canvas (html background) |
| --color-ink-800 | #0e1526 | raised cards, panels |
| --color-ink-700 | #1c2740 | hairline borders, chip wells |
| --color-ink-600 | #31405f | strong borders, hover wells |
| --color-ink-400 | #8fa0bd | secondary text (body on cards) |
| --color-ink-300 | #c3cde0 | primary-muted text |
| --color-ink-200 | #dce4f0 | bright-muted text (highlights on dark) |
| --color-ink-100 | #f4f7fc | primary text (never pure white) |

## Verdict / state semantics

| Token | Hex | Meaning |
| --- | --- | --- |
| --color-ok | #34d399 | correct / legit / accept |
| --color-warn | #f5b942 | verify-first / partial / caution |
| --color-danger | #f87171 | scam / decline / miss |

Shared surface tokens: --radius-card (1rem), --radius-well (0.75rem), --shadow-card, --shadow-lift, --ease-glass, --text-2xs (11px — nothing goes below it).

## Pillar accents — one accent, one meaning

| Token | Hex | Meaning |
| --- | --- | --- |
| --color-play | #818cf8 | indigo — PLAY pillar (story/fiction), also the focus ring color |
| --color-train | #f5b942 | amber — TRAIN pillar (skills, scam radar) |
| --color-learn | #22d3ee | cyan — LEARN pillar (concepts, literacy tools) |

Accents appear as icon wells, chips, borders, and hover text — never as large background washes. If a screen needs emphasis, it borrows the pillar accent of the content it presents.

## Typography

- Display: "Fraunces Variable", Georgia, "Times New Roman", serif — headings, game titles, hero. Weights 500–650, tight leading (snug).
- UI: "Inter Variable", system-ui, -apple-system, sans-serif — everything else; body 14–16px, generous leading (relaxed).
- Narration: ui-serif, Georgia, serif at 13–14.5px inside phone threads — prose as found artifact.
- Chips/labels: 11–12px, uppercase, wide tracking, font-semibold — used sparingly for status and pillar names.

## Surface vocabulary (the "glass" in blackglass)

- Cards: rounded-2xl, 1px border ink-700, bg ink-800/70 with backdrop-blur-sm; hover lifts -translate-y-1 with a soft 0 12px 36px -12px shadow.
- Icon wells: rounded-xl, pillar-tinted background.
- Chips: rounded-full (status) or rounded-md (topics) on ink-700/60.
- Focus: :focus-visible → 2px solid var(--color-play), 2px offset, 4px radius — everywhere, no exceptions.
- Motion: 150–250ms ease transitions; hover lifts and arrow slides; always gated by prefers-reduced-motion (animation crushed to 0.01ms).

## UI as character — the os-skin contract

Phone screens are themed by CSS variable sets on `.os-skin` / `.theme-<character>`:
--os-bg, --os-panel, --os-ink, --os-dim, --os-faint, --os-hairline, --os-hover, --os-chip, --os-bub-in/-out (+ -ink), --os-accent (+ -ink), --os-chip-border/-bg/-bg-hover, --os-ok (+ -ink), --os-danger (+ -ink), --os-narr, --os-narr-size.

Examples of the range: Maya (near-black, amber ink #f0c46f, minimal), Tita (warm cream #fbf6ec, maximal, plum bubbles #7b54c4), Bea (white, link-blue #1d9bf0, system-ui narration). --os-faint is tuned per skin to hold WCAG AA at 11px: maya #857b68, tita #7f7563, bea #66717f. A component must never hardcode a color inside a phone — it consumes the skin variables so the same UI becomes a different person.

## Wallpapers — CSS only, scene-set by gradient

`.wall-*` classes paint scenes in pure CSS (dusk, dawn, leaf, grid, mtpulag, lastsupper, tweet): layered linear/radial gradients, optional ::before/::after for light shafts or oversized serif punctuation. No raster backgrounds for walls; diegetic imagery arrives as content artifacts, not decoration.

## Voice & content rules

- Culturally grounded in the Philippines (Tita, group chat, load, " SCAM" energy) — warmth without mockery.
- Depict deception, never enable it: every mechanic teaches the verify reflex.
- Status chips: uppercase single words (LIVE, BETA, SOON). Meta lines: uppercase, ink-400, tracking-wide.

## Do / Don't

- Do keep text on ink-100/300/400 tiers; contrast is non-negotiable.
- Do reserve Fraunces for display; never set UI body in serif.
- Do let pillar color carry meaning; don't mix two pillar accents in one component.
- Don't use pure #000/#fff; the ink scale and -100 tier exist for a reason.
- Don't add glow/gradient ornament that isn't a .wall or a diegetic artifact.
