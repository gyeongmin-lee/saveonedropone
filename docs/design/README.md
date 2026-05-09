# Save One Drop One — Design System

A streamer-first 1v1 tournament platform for "VS culture." Save One Drop One lets streamers run live bracket tournaments (K-pop idols, anime characters, video games, etc.) optimized for OBS broadcast and viewer-chat participation, with shareable result brackets that drive a "you're wrong" viral loop.

This design system is extracted from **Theme 04 — Streamer Native (Dark)**, the direction the team chose to take into production.

## Source

- `Save One Drop One.html` — the original 5-theme exploration. Theme 04 (`theme-streamer.jsx`) is the source of this system.
- Product brief: `_inputs/product-brief.md` (paste-in)

## Core product surfaces

1. **Browse / Home** — discover featured brackets, see live streamers, browse by category
2. **Matchup (1v1)** — the core game loop; pick A or B with live chat overlay
3. **Result + Share** — your champion bracket, social share, community comparison

## Index

- `README.md` — this file
- `colors_and_type.css` — design tokens (CSS custom properties)
- `preview/` — design-system preview cards
- `ui_kits/streamer-native/` — recreatable React components + interactive index.html
- `SKILL.md` — agent skill manifest

---

## CONTENT FUNDAMENTALS

**Voice:** Direct, second-person, slightly competitive. The product is about settling arguments, so copy leans into that energy without being mean.

**Examples from the prototype:**
- "K-Pop Girl Group Members 2026" (no fluff, just what it is)
- "Save Jiwoo →" (action verb + name, on every primary button)
- "▶ Start tournament" / "📺 OBS source URL" (functional, not marketing-y)
- "of 482K players agree" (social proof, no exclamation)
- "Press A / D · or click either side" (instructional, mono font)

**Casing:** Sentence case for everything. UPPERCASE only inside `.mono` micro-labels (section headers, badges).

**Numbers:** Always tabular (font-variant-numeric: tabular-nums). K/M abbreviations ("482K plays", "1,240 watching"). Round numbers when the precision doesn't matter.

**Emoji:** Sparingly, only in section labels (🔥 Hottest pick, 😱 Biggest upset, ⚡ Fastest run) — never in body or buttons. Twitch-adjacent but restrained.

**Mono font** is reserved for:
- Section labels ("BROWSE", "LIVE STREAMERS")
- Stats and counters (vote percentages, viewer counts)
- Keyboard shortcuts ("Press A / D")

---

## VISUAL FOUNDATIONS

**Background:** `#0e0e12` (near-black with a faint blue undertone). Top nav slightly darker at `#0a0a0e`. Cards sit on `#18181f`.

**Primary accent:** `#7c3aed` (purple) — used on primary buttons, active states, branded gradients.
**Secondary accent:** `#38e07b` (green) — used for live indicators, win states, positive deltas.
These two colors form the brand gradient: `linear-gradient(135deg, #7c3aed, #b794f4)` and avatar/champion treatments use a 2-stop purple→green sweep.

**Type:** Inter for everything (400/500/600/700/800). Display weights are 800 with letter-spacing -0.02em. Body is 14–15px / 1.5 line-height. JetBrains Mono for tabular numbers and labels.

**Cards:**
- `border-radius: 10px` standard, 12px on hero matchup tiles
- 1px hairline at `rgba(255,255,255,0.06)` (the `.ring` class)
- Background `#18181f`
- No shadow. The hairline is the entire elevation system.

**Buttons:**
- Primary: solid `#7c3aed` purple, white text, 6px radius, 600 weight, 10–12px vertical padding
- Secondary: `#1f1f28` charcoal background, `#e8e6f0` text
- Tertiary/utility: transparent + 1px `#1f1f28` border
- Icon buttons: square, transparent, 6px radius

**Pills/Badges:**
- 999px (fully rounded)
- Used for tags, vote percentages, seed numbers
- Live indicators use `rgba(56,224,123,0.2)` background with `#38e07b` foreground

**Layout:**
- Top nav: 56px tall, sticky
- Sidebar: 220px fixed (Browse view)
- Right rail: 320px fixed (Matchup chat)
- Main content gutters: 24–32px

**Animation:** None on this surface — the live chat scrolls but otherwise the UI is static. Hover states are subtle (no transitions, just color shifts).

**Hover/press:** Buttons darken slightly. Active nav items fill with `rgba(124,58,237,0.15)` and use the purple as foreground.

**Imagery:** Bracket thumbnails use diagonal-stripe gradient placeholders generated from a hue value (see `placeholderBg` in `data.jsx`). When real photos exist, they're treated edge-to-edge with a bottom protection gradient `linear-gradient(180deg, transparent 50%, rgba(14,14,18,0.92) 100%)` for legible captions.

**Iconography:** Unicode symbols only (▶ ↻ ⌕ ↓ 🔗 ★ ●). No icon font. Emoji used as category icons in the sidebar (🎤 🎮 📺 🏈) — these would be replaced with proper icon sprites in production.

---

## CAVEATS

- This system is extracted from a single design exploration, not a real production codebase. The token values are observed, not authoritative.
- No real photography exists yet — all visuals are placeholders. Imagery treatment is an assumption.
- Icons currently use Unicode + emoji; pick a real icon library (Lucide recommended for the modern dark look) before shipping.
- No mobile breakpoint defined. The current layout assumes ≥1280px.

---

**To share this design system across your org, set this project's File type to "Design System" in the Share menu.**
