# Streamer Native UI Kit

Click-thru recreation of Save One Drop One's chosen direction (Theme 04). Three core screens with shared navigation and a single shared data layer.

## Components

| File | What's in it |
| --- | --- |
| `TopNav.jsx` | Top nav, logo lockup, search, screen toggle |
| `Sidebar.jsx` | Category list + live-streamers rail (Home only) |
| `BracketCard.jsx` | Bracket grid card, quick-play tile, pill |
| `HomeScreen.jsx` | Hero + trending grid + quick-play (composes Sidebar) |
| `MatchupScreen.jsx` | Match info bar, contestant card, VS divider, toolbar |
| `ChatPanel.jsx` | Chat header, vote tally, message rows |
| `ResultScreen.jsx` | Champion hero, share buttons, mini-bracket, verdict |
| `data.jsx` | Mock K-Pop data + `placeholderBg(hue)` helper |

## Use

Open `index.html`. Top-right toggle switches between Home / Matchup / Result.

All components register on `window` (cross-Babel-script convention). Data lives at `window.KPOP_DATA`.
