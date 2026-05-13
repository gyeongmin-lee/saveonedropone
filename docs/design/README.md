# Save One Drop One — Design Files

A streamer-first 1v1 tournament platform for "VS culture." Streamers run live bracket tournaments (K-pop idols, anime characters, video games, etc.) optimized for OBS broadcast and viewer-chat participation, with shareable result brackets that drive a "you're wrong" viral loop.

This project contains **5 HTML mockups** of the core product surfaces, plus their shared React component files. Each `.html` page is a standalone in-browser prototype (React + Babel via `<script type="text/babel">`); there is no build step.

---

## File map

### Source-of-truth HTML pages

| Page | What it is | Loads (in order) |
| --- | --- | --- |
| `Save One Drop One.html` | Main app — Home / Category / Matchup / Result screens, sidebar nav, top bar. Tweaks panel switches screens + tunes the home feed. | `data.jsx` → `tweaks-panel.jsx` → `theme-streamer.jsx` |
| `Create Bracket.html` | Streamer-facing bracket composer: name it, add contestants, publish. Two screens (Composer, Published) laid out side-by-side on a design canvas. | `create-bracket/shared.jsx` → `create-bracket/composer.jsx` → `create-bracket/published.jsx` |
| `Full Bracket.html` | Full tournament bracket view — round-by-round visualization of an in-progress or completed tournament. Multiple states on a design canvas. | `create-bracket/design-canvas.jsx` → `full-bracket/states.jsx` |
| `Live Mode States.html` | Streamer "Live Mode" panel states (overlay that extends MatchupScreen for OBS broadcast). Multiple states on a design canvas. | `create-bracket/design-canvas.jsx` → `create-bracket/shared.jsx` → `live-mode/states.jsx` |
| `Community Ranking.html` | Community-aggregated results / leaderboard view. Multiple states on a design canvas. | `create-bracket/design-canvas.jsx` → `community-ranking/states.jsx` |

### Shared component files

| File | Used by | Contents |
| --- | --- | --- |
| `data.jsx` | `Save One Drop One.html` | Mock data: `window.KPOP_DATA` — contestants `C`, `FEATURED_BRACKETS`, `CATEGORIES`, `ACTIVE_STREAMERS`, `TRENDING_NOW`, helpers (`placeholderBg`). |
| `theme-streamer.jsx` | `Save One Drop One.html` | The whole streamer-native theme: `StreamerTheme`, `StreamerHome`, `StreamerCategory`, `StreamerMatchup`, `StreamerResult`, `StreamerBracketCard`, `StreamerSidebar`. Exposed on `window.*`. |
| `tweaks-panel.jsx` | `Save One Drop One.html` | Reusable Tweaks panel + `useTweaks` hook (state + persistence via `__edit_mode_set_keys`). Standard starter component. |
| `create-bracket/design-canvas.jsx` | Create Bracket, Full Bracket, Live Mode States, Community Ranking | Pan/zoom design-canvas chrome — `DesignCanvas`, `DCSection`, `DCArtboard`, `DCPostIt`. Used to lay out multiple states side-by-side. |
| `create-bracket/shared.jsx` | Create Bracket, Live Mode States | Shared atoms: buttons, panels, headers, contestant tiles — anything reused across the bracket flows. |
| `create-bracket/composer.jsx` | Create Bracket | Composer screen — name the bracket, add contestants, configure. |
| `create-bracket/published.jsx` | Create Bracket | Published-state screen — bracket is live, share URL visible. |
| `full-bracket/states.jsx` | Full Bracket | Multiple full-bracket render states on the canvas. |
| `live-mode/states.jsx` | Live Mode States | Multiple Live Mode panel states on the canvas. |
| `community-ranking/states.jsx` | Community Ranking | Multiple community-ranking states on the canvas. |

### Other

- `uploads/` — reference screenshots and sample images the user pasted in. Not loaded by any page.

---

## Conventions

- **No build step.** All `.jsx` files are loaded directly via `<script type="text/babel" src="...">` and share a single `window` scope per HTML page. Components export themselves via `window.ComponentName = ComponentName` at the bottom of each file.
- **React 18.3.1 + Babel standalone 7.29.0** — pinned versions in every HTML.
- **No CSS files.** Styles are inline (`style={{}}` props) or in per-file `<style>` blocks scoped via a className like `.theme-streamer`.
- **Fonts:** Inter (400–800) + JetBrains Mono, loaded from Google Fonts in each HTML head.

## Visual language (observed)

The streamer-native theme is the canonical look. Values below are pulled from the live mocks — they're observations, not authoritative tokens.

- **Background:** `#0e0e12` (page), `#0a0a0e` (top nav), `#18181f` (cards)
- **Primary accent:** `#7c3aed` purple → `#b794f4` lighter purple
- **Secondary accent:** `#38e07b` green (live / win / positive)
- **Hairline:** `box-shadow: 0 0 0 1px rgba(255,255,255,0.06)` (the `.ring` class is the entire elevation system — no drop shadows)
- **Radius:** 10px standard, 12px on hero matchup tiles, 6px on buttons, 999px on pills
- **Type:** Inter for everything; display weight 800 with `letter-spacing: -0.02em`; body 14–15px / 1.5; JetBrains Mono for numbers and small UPPERCASE labels (the `.mono` class)
- **Layout:** 56px top nav, 220px left sidebar, 320px right chat rail (Matchup only), 24–32px content gutters
- **Imagery:** All bracket thumbnails are diagonal-stripe gradient placeholders generated from a hue (see `placeholderBg` in `data.jsx`). No real photography yet.
- **Iconography:** Unicode symbols (▶ ↻ ⌕ ↓ 🔗 ★ ●) + emoji in category labels (🎤 🎮 📺 🏈). Replace with a real icon set (Lucide recommended) before shipping.

## For Claude Code

When adapting this to a production codebase:

1. **Start with `Save One Drop One.html` + `theme-streamer.jsx`** — that's the source of truth for the main app shell and its four screens (Home, Category, Matchup, Result). Everything else extends from there.
2. **`data.jsx` is the data contract.** The shape of `KPOP_DATA` is what every screen reads. Map it to your real API.
3. **`tweaks-panel.jsx`** is a prototype-only dev panel — strip it from production.
4. **The other 4 HTMLs are design canvases**, not app routes. They each show multiple states of one surface side-by-side. The actual screens you ship are the components inside `create-bracket/composer.jsx`, `create-bracket/published.jsx`, `full-bracket/states.jsx`, `live-mode/states.jsx`, and `community-ranking/states.jsx` — extract those from their canvas wrappers.
5. **No mobile breakpoint** exists yet. The current layout assumes ≥1280px.
