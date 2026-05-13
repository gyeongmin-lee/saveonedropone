# Save One Drop One — Home/Browse Design System Update Prompt

Update the existing "Save One Drop One" design system (streamer-native dark theme) to reflect
the finalized Home/Browse and Result screen architecture. The existing design tokens, color
palette, typography, and component primitives (BracketCard, TopNav, Sidebar) are unchanged —
only the screen-level layouts and section structures need to change.

---

## 1. HomeScreen — replace current structure

Current HomeScreen has: Featured Hero card + "Trending K-Pop brackets" grid + Quick Play tiles.

Replace with:

  [TOP NAV — unchanged]
  ┌─────────────────────────────────────────────┐
  │  Popular Brackets                  See all →│  
  │  [BracketCard] [BracketCard] [BracketCard]  │  ← cross-category grid, 4 columns x 3 rows
  │  [BracketCard] [BracketCard] ...            │  
  ├─────────────────────────────────────────────┤
  │  K-pop · Anime · Gaming · Movies · Sports · │  ← CategoryNav: 5 column 2 row grid with the 10 categories
  └─────────────────────────────────────────────┘

Rules:
- Update sidebar as well to reflect current page
- Section label is always "Popular Brackets" (no dynamic switching).
- No Featured hero card. No Quick Play tiles. No For You / personalization rail.
- CategoryNav links to /categories/[id].

---

## 2. Category page

Route: /categories/[id]  (e.g. /categories/kpop)

Layout:

  [TOP NAV — unchanged]
  ┌─────────────────────────────────────────────┐
  │  Tag filter bar: All · aespa · BLACKPINK ·  │  ← horizontal scrollable pill bar
  │                  NewJeans · IVE · ...       │
  ├─────────────────────────────────────────────┤
  │  [Tab]  Popular  |  New                     │  ← 2 tabs only (no Top All-time)
  ├─────────────────────────────────────────────┤
  │  BracketCard Grid (4 col)                   │  ← filtered by selected tag + active tab
  └─────────────────────────────────────────────┘

- "Popular" tab: sorted by trending_score DESC. Label shows active tag if one is selected.
- "New" tab: sorted by created_at DESC.
- Tag pill "All" is always first; selecting a tag triggers a server-side data fetch
  (skeleton loading state on the grid, no full-page reload).
- Active tab + active tag are reflected in URL (?tab=popular&tag=aespa).
- Show skeleton placeholders (3–4 BracketCard-shaped grey blocks) while loading.

---

## 3. ResultScreen

Add "More in K-pop" rail under the hero N(horizontal scroll, 3 BracketCards, excludes the current bracket)

"More in [category]" rail specs:
- Horizontal scroll. Shows exactly 3 BracketCards.
- Footer link: "See all in K-pop →" pointing to /categories/kpop.
- The bracket that produced this result is excluded from the rail.

---

## 4. Removed — do not include in updated screens

- Featured hero card / "Featured this week" label
- Quick Play tiles row
- For You / personalization rail
- New & Rising tab (in category page)
- Top All-time tab

---

## What to produce

Update or create the following files:
- `ui_kits/streamer-native/HomeScreen.jsx` — new layout per §1
- `ui_kits/streamer-native/CategoryPage.jsx` — new component per §2
- `ui_kits/streamer-native/ResultScreen.jsx` — reordered layout per §3
