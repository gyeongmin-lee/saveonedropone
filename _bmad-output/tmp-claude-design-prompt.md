# Save One Drop One — Design Extension Brief

## Product Overview

Save One Drop One is a streamer-first 1v1 bracket tournament platform. The core unit is a **Bracket Pack** — a broadcast-ready content package a streamer can put on air within 10 minutes. Viewers arrive via stream links or shared result links, play anonymously, and share their results. UGC creators build new brackets using YouTube URLs and image URLs.

## Existing Design System

A complete design system exists (Streamer Native / Dark theme) with the following already designed:

- **Home / Browse screen** — bracket discovery, category sidebar, live streamer rail, BracketCard grid
- **Matchup (1v1) screen** — A/B contestant cards, VS divider, keyboard shortcut hints. In streamer live mode only: 320px ChatPanel right rail with vote percentage tally (!A/!B). The `%chat` badge on contestant cards and the ChatPanel are not rendered in regular mode.
- **Result screen** — champion hero, share buttons, Final Eight replay panel, Community Verdict panel
- **Supporting components**: TopNav, Sidebar, BracketCard, ChatPanel

Additionally, the **original design exploration** (`theme-streamer.jsx`) contains a fully-designed Comments section (compose box, filter chips, comment list with champion-pick pills, upvote/reply actions) that has not yet been extracted to the UI kit. This does **not** need to be redesigned — it just needs to be carried into the result page spec and any missing interaction states added.

The visual language: dark near-black backgrounds, high-contrast cards with hairline borders, purple as the primary action/brand color, green for live/win/positive states, monospace font for stats and counters. **Extend this design language exactly — do not introduce new visual directions.**

---

## What Needs to Be Designed

### 1. Matchup: Streamer Live Mode Existing Design Extension

Streamers use the same Matchup screen as regular players — no separate OBS URL or dedicated output surface. They share their screen via OBS screen capture. The only addition is an **opt-in Live Mode panel** within the Matchup screen that connects to Twitch chat for real-time !A/!B voting.

Do **not** redesign Matchup or ChatPanel from scratch. `docs/design/ui_kits/streamer-native/MatchupScreen.jsx` and `ChatPanel.jsx` already partially implement:

- two-column `1fr 320px` matchup + ChatPanel layout
- ContestantCard `%chat` badge pattern
- ChatPanel right rail
- VoteTally split bar
- ChatMessage row pattern

Use this existing design as the base. Improve it into production-ready states and conditional behavior rather than creating a new visual direction or a separate Live Mode surface.

**Behavior constraints**
- Entry point: desktop-only "Go Live" button in the Matchup toolbar.
- Regular mode: single-column `1fr`; no ChatPanel and no `%chat` badges.
- Live Mode active: two-column `1fr 320px`; ChatPanel appears and vote counting begins.
- ChatPanel is read-only: chat feed + VoteTally only. Remove/suppress the prototype "Send a message" input.
- `%chat` badges show only when Live Mode is active, chat is connected, and vote count is at least 1.
- Required states: not connected, connecting, connected, disconnected mid-session, no votes yet.
- OAuth for Live Mode must use a **popup**, not a redirect. A redirect destroys the current match state.
- YouTube chat integration is Growth scope and must not be designed as part of MVP Live Mode.
- YouTube remains relevant only for Create Bracket URL metadata parsing.
- Live Mode OAuth is separate from account creation (FR47). Follow `architecture.md`: streamer grants Twitch `channel:bot`; the app bot uses `user:bot` + `user:read:chat`.
- When the streamer advances a match (A/D key), vote tally resets to 0 immediately. The chat connection stays open; only the counter resets.

---

### 2. First-Visit Onboarding Modal

A conditional overlay shown to first-time visitors to personalize the home feed.

- Small set of interest categories (Music/K-pop, Anime, Gaming, Sports, etc.)
- Selecting a category immediately surfaces matching brackets — no navigation required
- Dismissible: users who skip still proceed normally
- Must feel like a shortcut, not a marketing gate
- No account creation required

---

### 3. Full Community Ranking View

Accessed when a user clicks "View all 64" (or "View all N") in the Community Verdict panel on the result page. Shows where every participant landed according to community picks.

- Displays all N participants as a ranked list with their community selection percentage
- Each entry: rank position, participant image/name, percentage bar, percentage number
- Visual distinction between participants the viewer picked vs. community consensus
- States: loading, insufficient community data

---

### 4. Full Bracket Modal

Accessed when a user clicks "View all 64" (or "View all N") in the Final Eight replay panel on the result page. Opens as a fullscreen modal.

- Complete bracket tree for the full tournament, zoomable and draggable
- Round range filter controls within the modal: e.g. "View all 128 / Top 64 / Top 32" — lets the user focus on specific rounds
- Save Image button within the modal (with pending/complete/failure states)
- States: loading, zoom interaction, connection lost (use last known snapshot)

---

### 5. Create Bracket Flow — Greenfield UX Exploration

This is a greenfield area with no existing UI kit implementation. Do not assume the first flow is the final design.

Explore multiple UX directions before committing to the final MVP flow. Keep the prompt simple: let the design agent decide the strongest alternatives, compare them, and synthesize the best direction.

The Create Bracket Flow still needs to cover the following functional requirements:

**Step 1 — Bracket Metadata:**
- Title, description, category and tag selection
- Visibility: public or private

**Step 2 — Add Entries (Paste Queue):**
- URL paste field accepting YouTube URLs or direct image URLs
- YouTube URL: auto-parses title, thumbnail, start timestamp
- Image URL: immediately previews
- Each parsed entry is an editable row: title, image, optional start time
- Failed parse shows inline error with manual fallback input fields
- Entries are reorderable and individually deletable

**Step 3 — Tournament Setup:**
- Show entry count and what bracket size it maps to
- When entry count isn't a power of two, explain byes automatically and reassuringly — not as an error

**Step 4 — Preview & Publish:**
- Show how the bracket will appear as a Home card, matchup card, and result share preview
- Publish returns the public bracket URL
- Save as private as a secondary path

---

## Result Page: Extract and Complete

The following sections exist in `theme-streamer.jsx` but are **not yet in the UI kit**. Do not redesign them — extract and add any missing interaction states:

- **Share buttons** (Download bracket, Copy link, X, Reddit, Discord) — already in ResultScreen; add pending/failure/copy-confirmed states
- **Comments section** — fully designed in theme-streamer.jsx; extract and add: rate-limited state, hidden comment state, locked comments state
- **Report entry point** — add to bracket, result, and per-comment level; do not design a full report flow modal at this stage

---

## Extensions to Existing Components

These existing components need targeted extensions — do not redesign:

**TopNav:** Add create bracket CTA, responsive behavior for mobile viewports, auth state (signed-in vs. anonymous)

**BracketCard:** Add live viewer count and private/removed visual states

**MatchupScreen:** Mobile-optimized contestant layout (touch-friendly, large tap targets), visible keyboard focus rings, local save status indicator

---

## Design Scope Discipline

Extend existing UI kit surfaces instead of redesigning them: Home/Browse, MatchupScreen, ChatPanel/VoteTally, ResultScreen, BracketCard, TopNav, and Sidebar. Extract existing `theme-streamer.jsx` patterns for Comments/Share/Report where available. Treat only Create Bracket Flow as greenfield, and let the design agent explore alternatives before choosing or synthesizing the MVP direction.

---

## Mobile Requirements

The following surfaces must be designed **mobile-first**:
- Matchup play (contestants adapt for narrow viewports and touch)
- Result page (champion and share actions immediately accessible before scrolling)
- Home/Browse (category navigation adapts to drawer or horizontal scroll on mobile)

---

## UX Principles for All New Surfaces

- **Anonymous until creation**: login gates appear only on create/publish flows, never on browse, play, or comment
- **State is product copy**: every loading, empty, error, and unavailable state needs short, functional text telling the user what to do next
- **Broadcast stability over decoration**: the Streamer Live Mode panel prioritizes stability and keyboard clarity over visual effects; the vote tally must remain readable under fast-changing chat conditions
