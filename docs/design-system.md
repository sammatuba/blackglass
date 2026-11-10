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

## Paper register — Glassbox

Glassbox is the one intentional light surface inside the dark suite: the fiction is dark glass, the explorable is the paper workbench. `.paper-ledger` (full sheet) and `.paper-slip` (compact hub teaser) carry scoped tokens:

| Token | Value | Role |
| --- | --- | --- |
| --paper-bg | #f2ead9 | sheet |
| --paper-ink | #241d14 | primary text |
| --paper-dim | #6b5d4a | secondary text |
| --paper-faint | #9a8b74 | sample dots / non-text |
| --paper-line | rgba(36,29,20,.16) | rules and dividers |
| --paper-amber | #b45309 | replies |
| --paper-green | #047857 | paid |
| --paper-red | #b91c1c | loss / break-even marker |
| --paper-accent | #0f766e | slider fill and paper focus ring |

Rules:

- Warm paper is the only large light field. Never use it for chrome outside Glassbox.
- The ruled sheet and red margin rule are CSS-only (layered gradients + `::before`); no raster texture.
- Focus inside paper re-colors to `--paper-accent`; the global play-indigo ring lacks contrast on cream.
- Sliders keep native keyboard behavior and a 44px hit area; the visible 6px track is drawn with `--range-fill` so the filled share is readable. Thumb and fill are teal, not a second pillar accent.
- Meaning is never color-only: a paid dot is a square (and labeled), a loss reads “the line goes dead,” and the break-even marker is described in text.

### Scroll choreography — Glassbox scrollytelling

- A scene pins one paper sheet; steps scroll past it. Scroll changes **emphasis only** —
  every step stays in the DOM and reads in order without JavaScript.
- Use native CSS where it exists: `animation-timeline: scroll(root block)` for the top
  reading rail and `view()` for step reveals, always inside `@supports`. No scroll
  library and no per-frame JS.
- Active-step state comes from one passive scroll listener coalesced into one rAF. It
  reads the step rects and updates state only when the active step changes. The reading
  line is 48% of the viewport on desktop and 64% on mobile (the sheet owns the top 44dvh).
- Only `opacity` and `transform` animate. The 1,000-dot sample is memoized DOM, not
  canvas; only the marked dots carry an order variable.
- The stage stays inside 44dvh on phones and compacts by height: hide stage captions
  and the lever hint, then the Test button, and finally release sticky altogether below
  520px height. Never let the pinned sheet starve the reading column.
- `prefers-reduced-motion`: delete the rail, reveals, scroll cue, and step dimming;
  render all content at rest and make the lever jump instantly.

### Feed instruments — Glassbox 02

- The feed mix is a stacked bar with a text legend; the 35-day chart is 35 DOM spans,
  not canvas. The focused week is opaque, the rest recede by opacity; the chart is
  `aria-hidden` and a screen-reader sentence carries the same trend.
- The cap marker reuses the red break-even treatment. The context-payment toggle is a
  44px pressed button whose state is carried by text and `aria-pressed`, not colour alone.
- On short phones the lineup compacts post padding and body type, and the stage drops
  its head, control hint, cap copy, and footer before it drops a post. The four posts,
  the three stats, the lever, and the toggle always survive.
- Meta rows use a single non-wrapping likes/category label and an ellipsised handle on
  narrow screens; category meaning also appears in the step copy and the legend.

## UI as character — the os-skin contract

Phone screens are themed by CSS variable sets on `.os-skin` / `.theme-<character>`:
--os-bg, --os-panel, --os-ink, --os-dim, --os-faint, --os-hairline, --os-hover, --os-chip, --os-bub-in/-out (+ -ink), --os-accent (+ -ink), --os-chip-border/-bg/-bg-hover, --os-ok (+ -ink), --os-danger (+ -ink), --os-narr, --os-narr-size.

Examples of the range: Maya (near-black, amber ink #f0c46f, minimal), Tita (warm cream #fbf6ec, maximal, plum bubbles #7b54c4), Bea (white, link-blue #1d9bf0, system-ui narration). --os-faint is tuned per skin to hold WCAG AA at 11px: maya #857b68, tita #7f7563, bea #66717f. A component must never hardcode a color inside a phone — it consumes the skin variables so the same UI becomes a different person. The accent/ink pair is the pair that must survive: Tita’s `--os-accent-ink` and Bea’s are dark inks on their ochre and link-blue accents, because the prose-moment primary button is normal-size bold text (AA 4.5:1).

## The POV shell — the phone is the page

- At ≤899px the desk scene is removed rather than shrunk: `.stage-root`/`.device-frame`/`.os-skin` are `100dvh`, no bezel, no page header, no footer, no fullscreen button. Above 899px the desk, bevel, glow, tilt, sheen, and header stay.
- Chrome sits on `env(safe-area-inset-*)` through the `.os-safe-*` classes; `env()` is zero on desktop, so one markup serves both. The status bar takes the top inset, the lock/home/call/moment surfaces take the bottom one, and the banners start below the status bar.
- The home indicator is a real `.os-gesturebar` control: 44px tall hit area, visible 5px bar, bottom of the safe area. `.os-app-body` reserves `3rem + inset` on phones so the indicator never covers a reply, dock, or primary action.
- Returning runs wake locked. `LockScreen` receives `returning` and shows “While you were away” above the last threads; the opening push sequence is skipped on resume and unlock re-enters the rule pump. The lock screen’s “Put the phone down” is the mobile exit; desktop keeps the header exit.
- Gestures are accelerators, never the only door. Swipe up unlocks, pull down from the top centre opens the shade (pointer-captured), the home bar taps or swipes home, and an incoming call accepts on swipe up / declines on swipe down. The visible buttons, Enter unlock, Esc home→lock, and the notification bell remain the keyboard and screen-reader paths.
- No color-only meaning: “While you were away” is text plus a dot, the gesture hint is copy, and the power control has an explicit accessible name.

## The signal desk — the game layer around the glass

- The desk is the world outside the phone and uses the desk palette (`--color-*` game tokens, MOVE_COLOR/GRADE_COLOR in `score.ts`); the skin-variable rule governs phone screens only. Nothing of the desk may render inside the full-bleed phone.
- Two display channels, one truth (`scoreRun`): at ≥1200px the desk rails (`SignalDesk.tsx`) flank the phone — case file (objective, stakes, the episode pressure meter) and signal desk (clues, reflex feed, live total). Below 1200px the rails hide and the desk speaks in `.signal-toast`s fixed above the gesture bar: pointer-transparent, ≤3 on screen, 3s TTL, muted while a moment or call owns the screen (`quiet`).
- The pressure meter ratchets only on authored story flags — it is the episode's clock, not a player stat. Its fill is positional color (calm → amber → red) plus a text step label; never color alone.
- The verdict (`Verdict.tsx`) keeps two ledgers apart: the grade stamps what you SAW (clues) and the reflexes you practiced (moves, kind-annotated); WHAT HAPPENED tells the story outcome. The stamp animates from a dashed ghost to a solid slam; reduced motion gets the stamp and fanfare immediately and the total without the count-up.
- Every desk sound (`gameSfx`) is tied to a visible event, and the status-bar mute (broadcast through `glassos-mute`, consumed by Settings) silences desk and OS in one tap.

## One desk across the suite — the shared game layer

The anthology's desk language is the suite's language. One grade scale, one stamp,
one fanfare, one meter — extracted so every scored surface speaks them:

- **Where the primitives live:** `src/games/shared/grade.ts` is the pure logic (Grade, `gradeFor`, GRADE_NAME/GRADE_COLOR, RANKS/`rankFor`) with no UI and no engine imports — anything can pull it in, including the Hub. `src/games/shared/desk.tsx` is the UI voice over it (`useCountUp` — ticks, stamp slam, grade-sized fanfare, reduced-motion safe; `GradeStamp`; `DeskMeter`). `blackglass/score.ts` re-exports the grade logic, so the anthology's existing imports hold.
- **Who speaks it:** the anthology verdict dossier; the Scam Radar feed triage (the live desk block above the reads, the shift debrief as a dossier); the radar case debrief (case signal = outcome + evidence over `CASE_MAX` 60); the Tell Exam results (exam signal = tells spotted); and the Hub's season strip. The rack, the radar case cards, and the feed menu all stamp `✓ … · signal N` in the same voice.
- **The Hub season strip reads persisted records directly** (`cgAI_blackglass_v2`, `cgAI_scamradar_v1`, `cgAI_tellExam_best` localStorage) — never a game module import. The games stay lazy-loaded; the strip stays silent until something has been played.
- **Round/case/exam signals are all `/100` with honest denominators:** the feed round's max includes the streak bonus on both sides (`readMax`), the case divides by 60, the exam by the planted-tell count. `gradeFor` thresholds are shared, so a B means the same thing everywhere.
- **The grade still measures what you saw and practiced** — reads made, flags caught, clues seen, reflexes practiced — never what the scam did. Glassbox stays deliberately scoreless; its paper language is its own.

## The operator's console — the hub joins the desk fiction

The hub is not a landing page; it is the desk the suite already speaks about.
You arrive as the operator; everything playable is a station of equipment.

- **Station anatomy** (`src/ui/Station.tsx`): silhouette tile (icon + status LED, lit once a record exists via `--station-accent`), kicker in the desk metaphor (`PLAY · THE PHONE RACK`), product name, ONE line, and the record stamp in the shared chip voice (`✓ 159 · WATCHER` / `UNPLAYED`). Stations are plain links — Tab reaches them, Enter activates, keys 1–5 jump and 6 toggles the archive (HOTKEY_ROUTES in `Hub.tsx`).
- **Everything playable has one place:** three stations (rack/feed/lens), the glassbox lab (its live computed paper readouts stay — they are content, not chrome), the operator badge (the season strip, od-id `season`, unchanged data contract), and the archive drawer (all six legacy pieces, openable; no NEW/LEGACY badge guessing). One line per station; the games do the explaining on their own turf.
- **The route boot is part of the language** (`src/app/RouteBoot.tsx` + the `RouteBootGate` overlay in `App.tsx`): module loads show the console boot (brand mark, `.boot-scan` shimmer, honest first-visit line), never a bare black page — and because Router v7's startTransition retains the stale page, the overlay covers it whenever the destination chunk isn't warm. Static under reduced motion.
- **Chunks warm before the click** (`src/app/prefetch.ts`): stations fire `prefetchRoute()` on pointerenter/focus; the hub warms all routes at idle. The prefetch map mirrors App.tsx's lazy factories exactly — add new routes to BOTH (and to ROUTE_MODULES in App.tsx). `scripts/nav-perf.mjs` is the gate (isolated hover-prefetch proof, cold-click boot, time-to-interactive).

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
