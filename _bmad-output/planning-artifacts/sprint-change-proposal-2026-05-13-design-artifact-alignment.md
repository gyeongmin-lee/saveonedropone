# Sprint Change Proposal - Design Artifact Alignment

Date: 2026-05-13  
Project: saveonedropone  
Trigger document: `docs/design/README.md` and updated `docs/design` HTML/JSX prototypes

## 1. Issue Summary

`docs/design` was updated to use standalone HTML/JSX prototypes as the active design source of truth. Several planning artifacts still referenced older or nonexistent design assets:

- `docs/design/colors_and_type.css`
- `docs/design/ui_kits/streamer-native/README.md`
- `docs/design/SKILL.md`
- component files such as `HomeScreen.jsx`, `MatchupScreen.jsx`, `ResultScreen.jsx`, `TopNav.jsx`, `Sidebar.jsx`, `BracketCard.jsx`, and `ChatPanel.jsx`

The current design directory instead defines the implementation references through `docs/design/README.md`, the five HTML mockups, and the JSX files loaded by those pages. The same review also found two design/planning mismatches:

- Matchup `Skip` appears in the prototype toolbar but is a leftover design artifact, not an MVP requirement.
- Community Ranking includes a `Notify me when ready` CTA in the prototype, while UX/Epics already classify that as Growth. Per GM decision, this remains ignored for now.

## 2. Impact Analysis

### Epic Impact

No new epic is required. Existing epics remain valid after documentation alignment.

- Epic 1 and scaffold stories needed design-source wording updates so agents do not look for missing CSS/UI kit files.
- Result and Live Mode stories remain aligned with the current modal and Live Mode prototypes.
- No story should be added for `Skip`; it is not an approved functional requirement.

### Story Impact

Affected stories and requirements:

- Story 1.1: base styling/token setup now derives production tokens from the current `docs/design` HTML/JSX references.
- Story 1.3: Home/Browse visual implementation now references the relevant `docs/design` HTML/JSX prototypes directly.
- UX-DR42: implementation agents must read `docs/design/README.md` and the relevant HTML/JSX files, not a nonexistent Streamer Native UI kit folder.

### Artifact Conflicts

- PRD: stale "OBS browser source" wording remained in MVP scope and innovation sections. Updated to Streamer Live Mode / OBS screen capture language.
- Architecture: stale design-token and UI-kit file references remained in implementation brief, starter guidance, core rules, and handoff. Updated to direct `docs/design` HTML/JSX references.
- UX Design: stale `docs/design/ui_kits/streamer-native/README.md` and `docs/design/SKILL.md` input references remained. Updated to current design files.
- Epics: stale `colors_and_type.css` and UI kit references remained in additional requirements, scaffold acceptance criteria, and UX-DR42. Updated to current design files.
- Project Context: stale design system and OBS Browser Source integration guidance remained. Updated to current design files and Streamer Live Mode screen-capture model.

### Technical Impact

- Production should still create an app-owned token entry such as `app/styles/tokens.css`, but it must be derived from the current design prototypes rather than importing a nonexistent CSS file.
- Implementation agents must extract reusable components from `theme-streamer.jsx`, `create-bracket/*.jsx`, `live-mode/states.jsx`, `full-bracket/states.jsx`, and `community-ranking/states.jsx`.
- Canvas/tweaks/demo-only code should not be treated as production app structure.
- No database, API, or routing change is required for this correction.

## 3. Recommended Approach

Recommended path: Direct Adjustment.

Rationale:

- This is a documentation alignment issue, not a product pivot.
- The current `docs/design` structure is explicit in `README.md`; planning artifacts should point to it directly.
- The change reduces implementation risk by preventing agents from following broken paths.
- `Skip` should remain out of PRD/Epics because GM confirmed it is a prototype leftover.
- `Notify me when ready` is already guarded as Growth in UX/Epics; no immediate planning change is needed.

Effort estimate: Low.  
Risk level: Low.  
Timeline impact: Neutral.

## 4. Detailed Change Proposals

### Project Context

OLD:

- `docs/design/colors_and_type.css` is the style token source.
- `docs/design/ui_kits/streamer-native/` contains pixel-perfect components.
- OBS integration uses a single OBS URL / `?obs=1` / separate OBS mode.

NEW:

- `docs/design/README.md` and relevant HTML/JSX prototypes are the design source of truth.
- Production tokens should be extracted into app code from those prototypes.
- Implementers should map screens to:
  - `Save One Drop One.html`, `theme-streamer.jsx`, `data.jsx`
  - `Create Bracket.html`, `create-bracket/*.jsx`
  - `Live Mode States.html`, `live-mode/states.jsx`
  - `Full Bracket.html`, `full-bracket/states.jsx`
  - `Community Ranking.html`, `community-ranking/states.jsx`
- Streamer Live Mode uses the same matchup URL and OBS screen capture. No `?obs=1` or separate OBS route.

### PRD

OLD:

- MVP and innovation text referred to "OBS browser source" or "OBS layout."

NEW:

- MVP and innovation text refers to Streamer Live Mode / OBS screen capture layout.
- The product remains broadcast-optimized without implying a separate OBS Browser Source URL.

### Architecture

OLD:

- Implementation brief and rules referenced `docs/design/colors_and_type.css`.
- Input documents included nonexistent `docs/design/ui_kits/streamer-native/README.md`.

NEW:

- Architecture points to the current design HTML/JSX files directly.
- `app/styles/tokens.css` remains an app-owned production token entry, derived from current design references.
- Streamer Live Mode is the CSR-heavy screen-capture surface.

### UX Design

OLD:

- Input documents referenced nonexistent design skill/UI kit paths.
- Target device wording still mentioned OBS browser source.

NEW:

- Input documents list current design HTML/JSX files.
- Target device wording is OBS screen capture target screen.

### Epics

OLD:

- Additional requirements and scaffold criteria referenced `colors_and_type.css`.
- UX-DR42 referenced a Streamer Native UI kit folder.

NEW:

- Stories require deriving production tokens and component structure from current HTML/JSX prototypes.
- UX-DR42 directs agents to `docs/design/README.md` and relevant design files.
- No story is added for `Skip`.

## 5. Implementation Handoff

Scope classification: Minor.

Handoff recipients:

- Developer agent: follow updated direct design references when implementing UI.
- Product/UX owner: decide later whether to remove `Skip` from the prototype itself and whether to keep or visually disable `Notify me when ready`.

Success criteria:

- No planning artifact instructs agents to read nonexistent `docs/design/colors_and_type.css`, `docs/design/SKILL.md`, or `docs/design/ui_kits/streamer-native/README.md`.
- PRD and project context consistently describe Streamer Live Mode as an OBS screen-capture target, not a separate OBS Browser Source URL.
- Epics do not introduce `Skip` as an MVP requirement.
- Growth-only `Notify me when ready` remains outside MVP implementation.

## 6. Checklist Status

- [x] 1.1 Triggering change identified: `docs/design` updated to HTML/JSX prototype source-of-truth.
- [x] 1.2 Core problem defined: planning artifacts referenced stale/missing design files and stale OBS wording.
- [x] 1.3 Evidence gathered: missing files verified; current design file map inspected.
- [x] 2.1 Current epic impact assessed: no epic restructure required.
- [x] 2.2 Epic-level changes identified: wording and acceptance criteria only.
- [x] 2.3 Remaining epics reviewed for design-source references.
- [x] 2.4 Future epic invalidation checked: none.
- [x] 2.5 Epic order/priority checked: no change.
- [x] 3.1 PRD conflicts checked and updated.
- [x] 3.2 Architecture conflicts checked and updated.
- [x] 3.3 UX conflicts checked and updated.
- [x] 3.4 Secondary artifacts checked: project context updated.
- [x] 4.1 Direct Adjustment selected as viable.
- [N/A] 4.2 Rollback not needed.
- [N/A] 4.3 MVP review not needed beyond excluding `Skip`.
- [x] 4.4 Recommended path documented.
- [x] 5.1 Issue summary created.
- [x] 5.2 Artifact adjustment needs documented.
- [x] 5.3 Recommended path and rationale documented.
- [x] 5.4 MVP impact and action plan defined.
- [x] 5.5 Handoff plan established.
- [x] 6.1 Checklist completion reviewed.
- [x] 6.2 Proposal accuracy reviewed.
- [!] 6.3 Explicit approval pending from GM after review.
- [N/A] 6.4 `sprint-status.yaml` update not required; no epic/story status change.
- [x] 6.5 Next steps and handoff plan documented.
