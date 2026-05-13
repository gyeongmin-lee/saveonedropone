---
stepsCompleted: [1, 2, 10, 11, 12, 13, 14]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/project-context.md"
  - "docs/design/README.md"
  - "docs/design/Save One Drop One.html"
  - "docs/design/theme-streamer.jsx"
  - "docs/design/data.jsx"
  - "docs/design/Create Bracket.html"
  - "docs/design/create-bracket/composer.jsx"
  - "docs/design/create-bracket/published.jsx"
  - "docs/design/Live Mode States.html"
  - "docs/design/live-mode/states.jsx"
  - "docs/design/Full Bracket.html"
  - "docs/design/full-bracket/states.jsx"
  - "docs/design/Community Ranking.html"
  - "docs/design/community-ranking/states.jsx"
workflowType: "ux-design"
project_name: "saveonedropone"
user_name: "GM"
date: "2026-05-09"
designDirection: "Streamer Native"
status: "complete"
---

# UX Design Specification saveonedropone

**Author:** GM  
**Date:** 2026-05-09

---

## Executive Summary

### Project Vision

Save One Drop One은 스트리머가 준비 없이 방송에 올릴 수 있는 1v1 브라켓 콘텐츠 플랫폼이다. UX의 핵심은 "브라켓 도구"가 아니라 "방송-ready Bracket Pack"을 선택, 실행, 공유, 재플레이하게 만드는 것이다.

제품 경험은 네 가지 루프를 동시에 만족해야 한다.

1. 스트리머: Bracket Pack 발견 -> 방송 세팅 -> OBS 진행 -> 결과 공유
2. 시청자: 방송/공유 링크 유입 -> 익명 플레이 -> 결과 공유 -> Play again 유도
3. UGC 제작자: 브라켓 생성 -> 공개/SEO 인덱싱 -> 방송/커뮤니티 배포
4. 운영자: 신고 수신 -> 검토 -> 비공개/takedown -> 검색/광고/공개 상태 동기화

기존 디자인 방향은 `Streamer Native`로 확정한다. 새 디자인 방향을 탐색하지 않고, `docs/design`의 어두운 스트리머 친화 UI, 고대비 카드, 보라/초록 액센트, mono 카운터, 방송 화면 중심 구성을 확장한다.

### Target Users

**스트리머**

- Twitch/YouTube 미드티어 스트리머
- 목표: 10분 이내 방송 콘텐츠 준비, OBS에서 깨지지 않는 진행, 채팅 참여 유도
- 주요 디바이스: 데스크톱, OBS screen capture 대상 화면, 방송 중 키보드 조작

**시청자**

- 방송 채팅, VOD, SNS, Discord에서 링크로 유입되는 팬
- 목표: 계정 없이 즉시 플레이, 결과 이미지/링크 공유, 다른 사람 결과에 반응
- 주요 디바이스: 모바일 우선, 데스크톱/태블릿 보조

**UGC 제작자**

- 팬덤 콘텐츠 제작자, 유튜버, 커뮤니티 운영자
- 목표: YouTube URL과 이미지 URL로 빠르게 항목을 만들고 공개 브라켓을 배포
- 주요 디바이스: 데스크톱/태블릿

**운영자**

- 신고, DMCA, 광고 안전성, 공개 상태를 관리하는 관리자
- 목표: 문제가 있는 브라켓/댓글을 빠르게 식별하고 공개/검색/광고 상태를 일관되게 조치
- 주요 디바이스: 데스크톱

### Key Design Challenges

- 기존 UI kit은 Home, Matchup, Result 중심이라 streamer live mode, live chat voting, comments, report/takedown, create flow, onboarding, admin flow가 비어 있다.
- OBS는 1920x1080 고정 캔버스에서 안정성이 우선이고, 일반 플레이는 모바일/태블릿/데스크톱 반응형이 필요하다.
- 익명 플레이와 로그인 생성 권한이 섞여 있으므로 CTA와 권한 설명을 마찰 없이 분리해야 한다.
- UGC moderation 상태는 공개 UI, SEO, OG, 댓글, 광고 eligibility까지 한 번에 반영되어야 한다.
- 접근성은 "보조 기능"이 아니라 핵심 게임 루프의 입력 방식이다. A/D 키, Tab, Enter/Space만으로 16강 이상을 완료할 수 있어야 한다.

### Design Opportunities

- 브라켓 선택 순간부터 "방송에 바로 올릴 수 있음"을 확인시키는 Matchup 시작, Go Live 진입, viewer link를 하나의 방송 시작 패널로 묶는다.
- Matchup 화면의 대칭 구조를 일반 플레이, OBS 화면, live chat voting 상태에서 공유해 학습 비용을 낮춘다.
- 결과 화면은 정적 승자 발표가 아니라 "내 결과가 틀렸다고 말하게 만드는" 공유/댓글/재플레이 허브가 되어야 한다.
- 신고/비공개/takedown은 별도 관리자 도구로 숨기되, 공개 페이지에서는 사용자가 이해할 수 있는 최소한의 상태 메시지만 노출한다.

---

## Implementation Handoff Policy

This UX specification defines product intent, required user journeys, required states, accessibility expectations, and acceptance criteria.

It is not the source of truth for visual implementation details. When implementing screens or components, dev agents must read the relevant files in `docs/design` directly and extract layout, spacing, typography, color, component composition, and interaction patterns from those design artifacts.

Use this document for:

- which journeys must exist
- which UI states must be handled
- which surfaces are MVP vs Growth
- accessibility and responsive requirements
- route-level UX implications
- acceptance criteria

Use `docs/design` for:

- visual hierarchy
- layout grammar
- component anatomy
- color and type tokens
- spacing, radius, and surface treatment
- existing JSX/HTML patterns
- create flow, live mode, matchup, home, and result visual references

If this specification conflicts with `docs/design` on visual details, prefer `docs/design`.
If this specification conflicts with PRD or architecture on product behavior, resolve against PRD/architecture before implementation.

---

## Design Artifact Source

All visual implementation details live in `docs/design`. This UX specification intentionally avoids duplicating token values, component anatomy, layout measurements, and visual styling rules that can drift from those artifacts.

Dev agents should use this document to understand product UX requirements, then inspect the relevant `docs/design` files before implementing any screen or component.

---

## UX Principles

### 1. Broadcast First, Not Dashboard First

스트리머에게 첫 가치는 관리 기능이 아니라 방송 투입이다. 홈과 브라켓 상세 화면의 우선순위는 "어떤 콘텐츠인가", "얼마나 걸리는가", "OBS에 어떻게 넣는가", "시청자 링크는 어디인가" 순서다.

### 2. Anonymous Until Creation

탐색, 플레이, 결과 공유, 댓글 작성은 계정 없이 가능해야 한다. 로그인 요구는 브라켓 생성, 소유 브라켓 관리, 즐겨찾기 같은 저장/소유 기능에서만 등장한다.

### 3. Every Result Is a Re-entry Point

결과 화면과 공유 URL은 도착점이 아니라 재시작점이다. "Play again", "Copy result link", "Download image", "Comment", "Report"가 명확하게 보여야 한다.

### 4. State Is Product Copy

loading, empty, error, offline, removed, private, rate-limited 상태는 사용자가 다음 행동을 이해하는 순간이다. 모든 상태는 짧고 기능적인 문장으로 쓴다.

### 5. Same Bracket, Different Surfaces

동일한 Bracket Pack은 Home card, matchup, OBS, viewer vote, result, share preview에서 다르게 표현된다. 그러나 제목, 썸네일, category/tag, item count는 일관되어야 한다.

---

## Acceptance Criteria for UX Implementation

### Core Journey

- A new visitor can select a category, start a bracket, complete a 16강 tournament, and reach a result without creating an account.
- A returning visitor with incomplete local progress sees a clear resume/restart choice.
- Result page supports copy link, image export, direct social share, Play again, comments, and report entry.

### Streamer Journey

- A streamer can open a Bracket Pack, activate live mode, and connect their Twitch channel from the matchup screen.
- Once connected, !A/!B chat votes are counted and displayed in real time on the matchup screen.
- Streamer advances the bracket with A/D keys; the same screen is shared to viewers via OBS screen capture.

### UGC Journey

- Creator login is requested only when entering create/publish flow.
- YouTube URL parse failure has manual fallback.
- Image URL/upload failure explains recovery.
- Non-power-of-two entry count shows bye preview, not a blocking error.
- Publish completion returns the public bracket URL.

### Safety Journey

- Any public bracket/result/comment has a report path.
- Admin can see report queue, target preview, status, and action history.
- Hide/takedown/ad restriction actions communicate public visibility, noindex/cache, and ad effects.

### Accessibility

- Core play flow works with keyboard only.
- Focus is visible across dark UI.
- Automated axe critical/serious issues are 0 on core routes.
- Screen reader users can understand current round, contestants, selected action, result, and modal errors.

---

## Screen Inventory

### MVP Screens

| 화면 | 경로/표면 | 주 사용자 | 렌더링 | 목적 |
|---|---|---|---|---|
| Home / Browse | `/`, `/categories/:categorySlug` | 시청자, 스트리머 | SSR | Popular Brackets, category card grid, Popular/New category tabs 기반 브라켓 발견 |
| Matchup play | `/play/:bracketSlug` | 시청자, 스트리머 | CSR 중심 | 1v1 선택, undo/restart, 로컬 저장, 채팅 투표 집계 표시 |
| Streamer live mode | Matchup play 내 opt-in 패널 | 스트리머 | CSR | Twitch 채팅 연동 활성화, !A/!B 투표 집계 |
| Result page | `/results/:resultId` | 시청자, 스트리머 | SSR | 챔피언, 경로, 통계, 공유, 댓글 |
| Full Community Ranking View | Result 내 modal | 시청자 | Client overlay | 전체 N명 커뮤니티 선택 % 랭킹. 검색, All entrants 탭(MVP). My picks·By group·Biggest upsets(Growth). 무한 스크롤. Insufficient 상태 포함. |
| Full Bracket Modal | Result 내 modal | 시청자 | Client overlay | 전체 브라켓 트리 zoom/drag, 라운드 칩 필터(All·R128…F), 줌 슬라이더+FIT, 뷰어 경로 하이라이트, Save Image(점선 오버레이 포함). Offline(Growth). |
| Create bracket flow | `/create`, `/create/new` | UGC 제작자 | SSR + CSR form | 단일 페이지 Composer — 스마트 붙여넣기, 항목 큐, 브라켓 설정, 공개 URL 생성 |
| Auth callback / sign-in sheet | `/auth/callback`, modal | 제작자 | SSR/action | Google/Twitch 로그인 |

### Growth Screens

| 화면 | 목적 |
|---|---|
| Result comparison | 두 사용자 결과 나란히 비교. MVP 바이럴 루프 검증 후 추가 |
| Streamer dashboard | 만든 Bracket Pack, 플레이 통계, 방송 재사용 지표 |
| Favorites / history | 재방문과 저장된 브라켓 탐색 |
| Creator analytics | Bracket Pack별 플레이, 공유, 유입, completion |
| YouTube chat integration setup | Twitch MVP 안정화 이후 YouTube 채팅 명령어 연동 설정 |

---

## User Journey Flows

### Journey 1: Streamer First Broadcast Flow

**Goal:** 스트리머가 10분 이내 Bracket Pack을 OBS에 올리고 방송을 시작한다.

```mermaid
flowchart TD
  A[Home / category browse] --> B[Bracket detail]
  B --> C{방송에 사용할 만큼 적합한가?}
  C -- No --> A
  C -- Yes --> D[Matchup play 시작 — regular mode]
  D --> D2{Go Live 버튼 클릭?}
  D2 -- No --> G[A/D or click 선택 — regular mode]
  D2 -- Yes --> E[Twitch OAuth — popup 방식]
  E --> F[!A/!B 채팅 투표 집계 시작]
  F --> G
  G --> H{Tournament complete?}
  H -- No --> G
  H -- Yes --> I[Result page]
  I --> J[Download/share result image]
```

**Required UI states**

- Live mode: connecting, connected, disconnected, chat disconnected (투표 집계 없음 표시)
- Matchup: vote tally 표시 (A% vs B%), no votes yet, votes updating

**Key UX requirements**

- 스트리머는 일반 플레이 화면과 동일한 URL을 사용한다. 별도 OBS URL 없음. 화면 공유(OBS screen capture)로 방송에 올린다.
- Live mode는 Matchup 화면 내 opt-in 패널이다. 채널 연동 후 !A/!B 집계가 시작된다.
- 채팅 투표 집계는 매치업 화면의 우측 또는 하단 compact 영역에 표시한다. 스트리머 화면에 보이므로 시청자도 방송 화면에서 집계를 볼 수 있다.

### Journey 2: Viewer Play, Share, Comment Flow

**Goal:** 시청자가 계정 없이 플레이를 완료하고 결과를 공유하거나 댓글로 반응한다.

```mermaid
flowchart TD
  A[Shared link / Home / VOD link] --> D[Bracket or result page]
  D --> E[Start tournament]
  E --> F{미완료 로컬 진행 있음?}
  F -- Yes --> G[Resume / restart modal]
  F -- No --> I[Matchup]
  G -- Resume --> I
  G -- Restart --> I
  I --> J[A/D, click, tap 선택]
  J --> K[Progress saved locally]
  K --> L{Complete?}
  L -- No --> I
  L -- Yes --> M[Result page]
  M --> N[Download image / copy link / share]
  M --> O[Read or write comments]
  O --> P{문제 콘텐츠 발견?}
  P -- Yes --> Q[Report modal]
  P -- No --> R[Play again]
```

**Required UI states**

- Onboarding: not shown, category selected, dismissed, category list loading
- Matchup: first load, image loading, keyboard hint, undo available/unavailable, local save success implicit, localStorage unavailable warning
- Result: image export pending, export failed, share copied, no community stats yet, comments empty, comments disabled on moderated result

**Key UX requirements**

- 첫 방문 온보딩은 플레이를 막는 마케팅 팝업이 아니라 카테고리 선택 shortcut이어야 한다.
- 모바일 matchup은 두 항목을 상하 또는 swipe-friendly stacked layout으로 제공하되, A/D 키 설명은 데스크톱에서만 강조한다.
- 결과 화면의 primary CTA는 상황별로 달라진다. 완료 직후에는 "Download image" 또는 "Copy result link", 공유 링크 유입자는 "Play again"을 우선한다.

### Journey 3: UGC Bracket Creation Flow

**Goal:** 제작자가 단일 페이지 Composer에서 스마트 붙여넣기로 항목을 구성하고 Bracket Pack을 빠르게 공개한다.

```mermaid
flowchart TD
  A[Create CTA] --> B{로그인 상태?}
  B -- No --> C[Google / Twitch sign-in]
  C --> D[단일 페이지 Composer]
  B -- Yes --> D
  D --> E[스마트 붙여넣기 — URL/텍스트/배치 이미지]
  E --> F[큐에 항목 생성]
  F --> G{미완료 항목?}
  G -- Yes --> H[우측 레일: 소스 편집 / 제목 수정]
  H --> G
  G -- No --> I[우측 레일: 브라켓 정보·시딩·공개 설정]
  I --> J[Publish]
  J --> K[Published 화면 + 공개 URL]
```

**Required UI states**

- Auth: provider pending, denied, callback failed
- Entry parse: pending, quota/rate limited, unsupported URL, thumbnail unavailable, CORS/hotlink failure
- Image upload: invalid type, over 10MB, batch upload failed
- Incomplete entry: amber 경고 배지, source 없음, title 없음
- Publish: blocked(미완료 항목 존재), public, private, under review

**Key UX requirements**

- 단일 페이지 Composer에서 entry intake, bracket settings, source editing, publish readiness를 한 흐름으로 처리한다.
- 스마트 붙여넣기: 줄당 URL → YT/이미지 자동 파싱, 일반 텍스트 → 플레이스홀더 항목. 배치 이미지 업로드(최대 64파일) 스트립 병행 제공.
- 미완료 항목(소스 없음·제목 없음)은 명확한 경고와 publish blocking 상태를 제공한다. 시딩: Randomized(기본) / Preset(드래그 재정렬).
- 비-2의 거듭제곱 항목 수는 byes 자동 배정을 설명한다.

### Journey 4: Moderation, Report, Takedown Flow

**Goal:** 운영자가 신고와 DMCA를 처리하고 공개/검색/광고 상태를 일관되게 변경한다.

```mermaid
flowchart TD
  A[User reports bracket/comment/result] --> B[Report submitted]
  B --> C[Admin reports queue]
  C --> D[Review target content and history]
  D --> E{조치 유형}
  E -- No action --> F[Close report]
  E -- Hide content --> G[Private / hidden state]
  E -- Takedown --> H[Removed state + log]
  E -- Ad restriction --> I[Ad disabled state]
  G --> J[noindex/cache/ad/public policy update]
  H --> J
  I --> J
  J --> K[Public page state updated]
  K --> L[Reporter/creator notification when applicable]
```

**Required UI states**

- Public report modal: submitted, duplicate/too frequent, validation error
- Admin queue: unread, grouped duplicates, high-risk, DMCA, resolved
- Public content: available, private, removed, under review, comments locked, ads disabled
- Takedown log: action pending, action complete, restore requested, restored

**Key UX requirements**

- 공개 페이지에서는 정책 세부를 노출하지 않는다. "This bracket is unavailable"처럼 짧고 일반적인 문구를 쓴다.
- 관리자 화면은 신고 대상, 원본 URL, 신고 사유, 누적 신고 수, 공개 상태, 검색 상태, 광고 상태, 최근 조치 로그를 한 화면에 보여준다.
- Moderation action은 확인 modal을 사용하고, 조치 결과가 SEO/noindex/cache/ad eligibility에 미치는 영향을 명시한다.

---

## Screen Specifications

### Home / Browse

**Purpose:** 사용자가 방송 또는 개인 플레이에 적합한 Bracket Pack을 빠르게 발견한다.

**Primary content**

- Sticky top nav: logo, search, screen/route toggles, create CTA
- Popular Brackets: cross-category BracketCard 반복, 동일 카테고리 최대 3개
- Browse by category: 5x2 카드 그리드. 각 카드는 이모지, 16:9 placeholder/대표 썸네일, 카테고리 레이블을 포함하고 `/categories/:categorySlug`로 이동
- Category page tabs: Popular / New
- Category tag filter: MVP에서는 K-pop만 표시. 태그 없는 카테고리는 필터 바를 렌더링하지 않음

**States**

- Loading: section skeleton + card skeleton grid
- Empty category: "No brackets in this tag yet" + broader category CTA
- Error: retry action, cached/trending fallback 가능
- No live streamers: rail은 유지하되 빈 상태 메시지 표시

**Notes**

- Visual and component reference는 `docs/design`에서 직접 확인한다.
- 홈의 "Popular Brackets" 레이블은 데이터 상태와 무관하게 고정한다. "Trending Now" 전환 로직은 없다.
- Popular 정렬은 `trending_score = plays_7d + (live_now_count * 10) + (share_clicks_7d * 5)`를 사용하되, Cold Start에서는 `is_curated DESC, created_at DESC`로 fallback한다.
- 카테고리 페이지의 Popular 탭은 상위 10개 중 최소 2개를 최근 30일 내 생성 브라켓으로 보장한다. 대상이 2개 미만이면 쿼터를 적용하지 않는다.
- 태그 선택은 전체 페이지 리로드 없이 그리드 영역만 서버 fetch + skeleton UI로 갱신하고, URL 쿼리를 갱신한다.
- 모바일에서는 Home category grid와 category page tabs/filter가 겹치거나 잘리지 않도록 1-column 또는 large-phone 2-column card layout을 사용한다.

### Matchup Play

**Purpose:** 계정 없이 빠르고 명확한 A/B 선택을 반복한다.

**Primary content**

- Match info bar: 브라켓 이름, Round/Match 진행 도트, 경과 타이머
- Two contestant cards + "Save {name} →" 선택 버튼 (각 카드 하단)
- Keyboard hint: "Press A / D · or click either side"
- Toolbar: undo, restart, share, report, Go Live (streamer mode 진입), "✓ Saved locally" 상태 텍스트
- Optional community/vote hint if session-linked

**States**

- Image loading per card
- Selected/advance feedback은 `Streamer Native`의 정적 표면을 해치지 않도록 짧고 layout shift 없이 처리
- Undo disabled on first match
- localStorage unavailable: 계속 플레이 가능하되 refresh persistence 없음 표시

**Notes**

- Visual and component reference는 `docs/design`에서 직접 확인한다.
- **Live mode 진입점:** Matchup toolbar의 "Go Live" 버튼.
- Chat vote indicators are shown only while streamer live mode is active and chat is connected.
- 세션 중 live mode 비활성화 시 vote UI를 숨기고 tally를 초기화한다.

### Streamer Live Mode (Matchup 내 패널)

**Purpose:** 스트리머가 일반 플레이 화면에서 Twitch 채팅을 연동해 !A/!B 투표 집계를 받는다. 별도 화면이 아니라 Matchup 화면의 opt-in 패널이다. YouTube 채팅 연동은 Twitch MVP 안정화 이후 Growth 범위로 둔다.

**Primary content**

- Twitch 채널 연동 버튼
- 연동 상태 chip (connected / disconnected)
- 실시간 !A/!B 투표 집계 바 (A% vs B%)
- 현재 매치 vote count

**States**

- **regular**: Live Mode 없음, "Go Live" 버튼, 단일 컬럼
- **oauth**: popup OAuth 진행 중, `channel:bot` scope 동의 필요
- **connecting**: chat connection pending
- **connected**: 실시간 집계, vote count, 채팅 피드 표시
- **no_votes**: 연결됨 + 0표 (매치 전환 직후). "↻ New match · counter reset to 0. Chat connection still open."
- **disconnected**: 마지막 tally 유지, 배너 "Match state is safe. Votes will resume once we reconnect.", Reconnect 버튼

**Notes**

- 스트리머는 이 화면을 OBS screen capture로 방송에 올린다. 별도 OBS URL 없음.
- 투표 집계는 스트리머 화면에 보이므로 시청자도 방송 화면에서 집계를 확인한다.
- 키보드 focus ring을 숨기면 안 된다. 방송 중 실수 방지가 운영 안정성에 중요하다.
- **OAuth 방식:** "Go Live" 클릭 시 OAuth는 반드시 popup 방식으로 구현한다. redirect는 현재 매치 상태를 파괴한다.
- **OAuth scope:** Live Mode 채팅 연동은 bracket creation 로그인(FR47)과 별개의 OAuth flow다. Twitch 채팅 수집 동의가 필요하며, 구현 scope는 architecture.md의 Twitch EventSub/OAuth 계약을 따른다. 계정 생성 권한이 아님.
- vote count = 0일 때 contestant-level chat percentage indicator는 렌더링하지 않는다. 1표 이상부터 표시.
- **매치 전환 시 tally 리셋:** 스트리머가 A/D로 매치를 advance할 때 vote tally는 즉시 0으로 리셋된다. 채팅 커넥션은 유지하되 카운터만 초기화.
- Live mode chat display is read-only. 스트리머와 시청자는 Twitch 앱에서 직접 채팅한다.
- OAuth popup UI는 `channel:bot` scope와 채팅 수집 목적을 사용자가 이해할 수 있게 설명한다.
- Live mode status copy includes connection state and channel identity.
- **Streamer Live Mode는 데스크탑 전용:** 모바일에서는 Go Live 버튼을 노출하지 않는다. 방송은 데스크탑에서만 진행한다.

### Result Page

**Purpose:** 결과 공유와 재플레이를 유도하는 공개 SSR 페이지다.

**Primary content**

- Champion hero
- Share actions inside Champion Hero: copy link, download image, X/Reddit/Discord
- More in [category] rail directly below Champion Hero
- Final path / mini bracket
- Stats: total time, path, community aggregate
- Play again CTA
- Comments section
- Report action

**States**

- Result not found/private/removed
- OG fallback image used
- Image export generating/success/failure
- Community stats unavailable or insufficient data
- Comments empty/loading/error/locked

**Notes**

- Visual and component reference는 `docs/design`에서 직접 확인한다.
- SSR metadata가 핵심이므로 결과 title, description, canonical, og tags가 초기 HTML에 있어야 한다.
- 모바일 결과 페이지 순서는 Champion Hero(share 내장) -> More in [category] 4개 -> Stats/Final Path/Community Summary -> Comments로 고정한다.
- "More in [category]"는 같은 카테고리의 `trending_score` 상위 4개를 보여주며, 현재 `bracket_pack_id`는 제외한다. 푸터 링크는 "See all in [category]"로 카테고리 페이지에 연결한다.
- 동적 OG 스펙은 `og:title=[Champion] wins [Bracket Pack]!`, `og:image=champion item image or fallback`, `og:description=[plays_count]명이 플레이했습니다. 당신의 선택은?`를 기본으로 한다.

### Onboarding Modal

**Status:** Removed from MVP scope by the 2026-05-13 Home/Browse correct-course decision.

**Purpose:** MVP에서는 구현하지 않는다. 개인화/For You/관심사 저장은 소셜 공유 기반 발견 루프 검증 이후 Growth로 재평가한다.

**States**

- 없음. 첫 방문 시 모달을 띄우지 않는다.

**Interaction rules**

- `sodo:interests`, "For you" 레일, "Personalize" 사이드바 항목을 MVP에 추가하지 않는다.

**Post-selection home feed**

- 없음.

**Notes**

- 카테고리 선택 니즈는 Home의 5x2 category card grid와 `/categories/:categorySlug` 페이지가 담당한다.

---

### Full Community Ranking View

**Purpose:** 전체 참가자를 커뮤니티 선택 비율 순으로 보여준다. Result 페이지 Community Verdict 패널의 "View all N" 버튼으로 진입한다.

**Primary content**

- 전체 N명 참가자를 커뮤니티 선택 % 기준으로 내림차순 정렬한 리스트
- 각 항목: 순위, 참가자 이미지/이름, 퍼센트 바, 퍼센트 수치
- 현재 사용자가 선택한 챔피언·준우승 참가자에 "YOUR CHAMPION" / "YOUR RUNNER-UP" 뱃지 + 행 tint
- 커뮤니티 1위에 "★ COMMUNITY #1" 뱃지

**Filter tabs**

- **MVP**: `All entrants` 단일 탭
- **Growth**: `My picks` / `By group` / `Biggest upsets` 탭 추가

**Search & sort**

- 이름·그룹 검색 바 (MVP 포함)
- 정렬: "% picked as champion ↓" 기본 (MVP). 추가 정렬 옵션은 Growth.

**Pagination**

- 무한 스크롤 ("N more · scroll to load") — MVP 포함

**States**

- Loading: 스켈레톤 행 표시
- Populated: 전체 랭킹 + 본인 픽 하이라이트
- Insufficient: 플레이 수 미달 시 — 현재 플레이 수·필요 수·현재 라이브 수 표시, "Share this bracket" CTA 하나만 제공. "Notify me when ready"는 Growth. 조기 신호("Early signal: N picks so far") 텍스트 포함.

**Notes**

- 시각·컴포넌트 레퍼런스는 `docs/design/community-ranking/states.jsx` 참조.
- "Notify me when ready"는 Growth 범위. MVP insufficient 상태에서는 "Share this bracket" CTA만 노출.
- "YOUR CHAMPION / YOUR RUNNER-UP" 표시는 결과 페이지의 뷰어 선택 데이터를 기반으로 하며, 해당 데이터가 없으면(다른 사람 결과 조회 시) 뱃지를 렌더링하지 않음.

### Full Bracket Modal

**Purpose:** 전체 브라켓 트리를 탐색한다. Result 페이지 Final Eight 패널의 "View all N" 버튼으로 진입하며 풀스크린 모달로 표시된다.

**Primary content**

- 전체 토너먼트 브라켓 트리, zoom/drag 가능 (핀치/스크롤 줌, 드래그 패닝)
- 줌 컨트롤: −/슬라이더/+ + 퍼센트 표시 + `FIT` 버튼 (fit-to-screen 리셋). 우측 하단 고정.
- 라운드 칩 필터: `All rounds` + `R128 / R64 / R32 / R16 / Q / S / F` 개별 선택. 칩 선택 시 해당 라운드 포커스, 나머지 dim
- Save Image 버튼 (pending/complete/failure 상태 포함)

**States**

- **Loading**: 진행 표시 ("Drawing N entrants… X of 7 rounds"), 스캐폴드 시각 포함
- **Default**: fit-to-screen, 전체 라운드 가시, 뷰어 경로 하이라이트
- **Zoomed**: 드래그 패닝 가능, 드래그 힌트 표시, FIT 버튼으로 초기 배율 복귀
- **Round focus**: 라운드 칩 선택 시 해당 라운드 외 dim 처리
- **Save Image — pending**: 캡처 범위 점선 오버레이 + 토스트
- **Save Image — success**: 파일명·해상도 토스트
- **Save Image — failure**: 오류 토스트 + "Try again" 액션
- **Offline** *(Growth)*: 앰버 배너 "Connection lost · snapshot N min ago", Reconnect 버튼. 브라켓은 마지막 스냅샷으로 읽기 가능하게 유지. MVP에서는 offline 시 모달 자체를 닫음.

**Notes**

- 시각·컴포넌트 레퍼런스는 `docs/design/full-bracket/states.jsx` 참조.
- 뷰어 경로 하이라이트(보라 tint)는 현재 결과 페이지에서 전달된 뷰어 선택 데이터를 기반으로 함. 타인 결과 조회 시 하이라이트 없음.
- 브라켓 레이아웃은 좌우 미러 구조 (중앙 Final, 외곽 R128 방향). 세부 구조는 `docs/design/full-bracket/states.jsx` 참조.
- Save Image 캡처 범위는 사용자가 선택한 라운드 필터 범위를 기준으로 함 (기본: Q–F, PNG 1080×1350).

### Create Bracket Flow

**Purpose:** UGC 제작자가 단일 페이지 Composer에서 Bracket Pack을 생성하고 공개한다.

**Primary content**

- Bracket title, incomplete count, auto-saved status, exit action
- Smart paste input, batch image upload, editable entry queue
- Bracket settings, entry preview, source editing, publish action

**States**

- Entry row: 정상 / 소스 없음 / 제목 없음 / 선택됨
- Parse: pending / success / failed(manual fallback) / quota limited
- Publish button: 미완료 시 "Finish N entries to publish"(비활성) / 준비 완료 "▶ Publish bracket"
- Published: 완료 화면 + 공개 URL 복사 + "← Back to edit"

**Notes**

- Visual and component reference는 `docs/design/create-bracket/`에서 직접 확인한다.
- Publish 전 별도 preview 스텝 없음. Composer 안에서 matchup preview를 제공한다.
- Randomized seeding is the default; Preset seeding allows drag reorder.

---

## Loading, Empty, Error, and Failure States

| Surface | Loading | Empty | Error/Failure |
|---|---|---|---|
| Home | hero/card skeleton | no brackets for category/tag | retry + broader category fallback |
| Matchup | current match skeleton | invalid bracket has no playable entries | corrupted local state, image failed, localStorage unavailable |
| Streamer live mode | chat connecting | not connected | chat disconnected, auth failed, reconnecting |
| Result | champion/result skeleton | no community stats/comments | result unavailable, export failed, share copy failed |
| Comments | list skeleton | no comments yet | rate limited, submit failed, comments locked |
| Create | form saving/parsing | no entries yet | parse quota, invalid URL, upload over 10MB, publish validation |
| Report | submit pending | n/a | duplicate, rate limited, target unavailable |
| Admin queue | table skeleton | no open reports | action failed, stale target, permission denied |

### Copy Guidelines

- Use direct, second-person, functional copy.
- Keep button labels action-based: "Go Live", "Open voting", "Download image".
- Avoid cute error language. Use short recovery instructions.
- Emoji stays out of buttons/body; section labels may use restrained emoji only where design system already allows it.

---

## Responsive Design & OBS Strategy

### Breakpoints

| Range | Strategy |
|---|---|
| 320-767 mobile | single-column, touch-first, bottom/compact actions, category rail/drawer |
| 768-1023 tablet | two-column where useful, larger touch targets, condensed side panels |
| 1024-1279 small desktop | desktop navigation without assuming 1280 fixed minimum |
| 1280+ desktop | full desktop layout with persistent navigation and contextual side panels when appropriate |
| 1920x1080 OBS | fixed 16:9 composition, no normal responsive chrome |

### Mobile

- Home: sidebar becomes category drawer or horizontal scroller.
- Bracket cards: 1 column at narrow widths, 2 columns on large phones if spacing remains readable.
- Matchup: contestant cards stack vertically or use a full-height split with large tap targets.
- Matchup — Streamer Live Mode: 데스크탑 전용. 모바일에서는 Go Live 버튼을 노출하지 않는다.
- Result: champion hero first, share panel sticky or immediately after hero, comments below.

### Tablet

- Matchup can use side-by-side cards in landscape and stacked cards in portrait.
- Create flow can show paste queue and preview side-by-side in landscape.
- Admin is not tablet-first but should remain usable with horizontally scrollable tables avoided where possible.

### Desktop

- Home uses full browse navigation and category context.
- Matchup can expose chat/vote context alongside the core A/B choice.
- Result can place sharing, comments, and community stats near the champion result.
- Create flow benefits from keeping entry editing and preview visible together.

### OBS screen capture

- 스트리머는 별도 OBS Browser Source URL 없이 일반 매치업 화면을 OBS screen capture로 방송에 올린다.
- Streamer Live Mode 활성 시 매치업 화면은 1920×1080 해상도에서 잘림 없이 표시되어야 한다 (1280×720, 2560×1440 스케일 대응 포함).
- 레이아웃은 viewport-dependent font scaling이 아닌 고정 aspect-ratio 컨테이너를 사용한다.
- hover-only 어포던스는 사용하지 않는다.
- 정상 동작 시 스크롤바가 없어야 한다.

---

## Accessibility Specification

### Target

MVP target: practical WCAG 2.1 AA coverage for core flows, with automated axe critical/serious issues at 0 for Home, Matchup, Result, Create, Report, and Admin report queue.

### Keyboard

- Entire 16강 bracket must be completable with keyboard only.
- Matchup shortcuts:
  - `A`: choose left/top contestant
  - `D`: choose right/bottom contestant
  - `Enter`/`Space`: activate focused card or button
  - `Tab`: move through toolbar and controls
- Undo/restart/copy/report controls are reachable by Tab.
- Modal focus is trapped and restored to invoking control on close.
- Visible focus ring must meet 3:1 contrast against adjacent colors.

### Screen Reader

- Matchup cards expose contestant name, seed if available, and selection instruction.
- Progress is announced as text: "Round 2, match 3 of 8."
- Copy/share/export status uses polite live regions.
- Critical errors use assertive live regions only when they block progress.
- Images require meaningful alt text. Decorative placeholder gradients are hidden from assistive tech while item names remain text.

### Contrast and Color

- Normal text contrast target: at least 4.5:1.
- Large display text target: at least 3:1.
- Selection, live, winner, disabled, error states cannot rely on color alone.

### Touch and Pointer

- Interactive targets at least 44x44px on mobile/tablet.
- Matchup cards can be large tap targets, but nested controls must not accidentally trigger selection.
- Hover styles are enhancements only; all actions work without hover.

### Motion

- No essential information conveyed only by animation.
- Respect `prefers-reduced-motion`.
- Match transition motion should not block rapid play.

### Axe and Manual Test Checklist

- axe: critical/serious 0 for core routes.
- Keyboard-only: Home -> bracket detail -> play 16강 -> result -> copy link.
- Screen reader smoke: result page heading hierarchy, matchup card labels, report modal radio group.
- Color contrast: all text, badges, vote percentages, disabled controls.
- Zoom: 200% desktop and mobile viewport without overlapping critical controls.
- OBS: 1920x1080 screenshot has no clipping, scrollbars, or unreadable labels.

---

## Route and Rendering UX Notes

| Route/surface | UX implication |
|---|---|
| Public Home/category/bracket/result | SSR metadata and stable loading/error states are part of UX, not implementation detail |
| Play/matchup | CSR interaction can be fast, but initial page must explain resume/local state clearly |
| Matchup (Streamer Live Mode) | OBS screen capture 대상. Supabase Realtime 재연결 시 `session_id`로 vote context 복구 |
| Create actions | Field errors and provider fallbacks must be designed before implementation |
| Comments/reports | Rate limit and moderation feedback must be user-readable |
| Admin moderation | Visibility policy side effects must be visible in the action UI |

---

## UX Patterns

### Navigation

- Public discovery uses top nav + category sidebar on desktop.
- Mobile discovery uses top nav + horizontal category rail or drawer.
- Matchup/play removes non-essential navigation while preserving exit/report/restart controls.
- Admin routes use dense table/detail split layout, not streamer-facing decorative cards.

### Calls to Action

- Home card primary: "Start tournament"
- Home card secondary for streamers: "Start broadcast" (Matchup Live Mode 진입)
- Matchup primary: selecting A/B card
- Result primary after own completion: "Download image" or "Copy result link"
- Result primary when viewing someone else's result: "Play again"
- Create primary: "Publish" after validation; "Save private" as secondary

### Feedback

- Copy actions change label briefly and announce to screen readers.
- Long-running client tasks use button pending state, not full-page blocking.
- Route-level loading uses skeletons.
- Realtime degradation is a small persistent status, not a blocking modal.
- Moderation actions show final state and side effects: public visibility, noindex, ads, comments.

### Error Handling

- Expected action errors are field-level where possible.
- Provider/API failures offer manual fallback.
- Public unavailable content uses generic language.
- Admin errors include enough operational context without exposing secrets.
- Retry is shown only when the user can reasonably recover.

---

## Open UX Decisions

1. Viewer vote mutability: current-match vote can be changed until match advances, or one vote only. MVP recommendation: change allowed until match advances.
2. Result image export implementation: PRD wants generated bracket tree image; architecture warns server-generated route is not yet approved. MVP UX should support client-side export with clear pending/failure states and OG fallback.
3. Comment identity: PRD allows anonymous comments. UX must decide display name model, e.g. optional nickname + rate limiting.
4. Mobile matchup layout: stacked vertical cards vs full-height split. Prototype both before implementation; choose based on tap accuracy and image legibility.
5. Admin notification depth: creator/reporter notification copy and channels are not yet specified.
6. YouTube live chat UX: Growth scope after Twitch MVP stabilization; define OAuth, quota, connection error, and stream discovery states later.

---

## Handoff Summary

This UX specification keeps the chosen Streamer Native direction and fills the missing product UX around:

- detailed PRD journey flows
- additional MVP screens beyond Home, Matchup, Result
- OBS screen capture live mode
- live chat voting
- result sharing
- comments
- reports and takedown
- responsive and OBS viewport strategy
- keyboard, focus, contrast, screen reader, and axe criteria
- loading, empty, error, and failure states

Implementation should start by reading this UX specification for required journeys, states, and acceptance criteria, then inspect `docs/design` directly for the visual and component-level implementation reference. Do not reimplement visual details from this document when a corresponding `docs/design` artifact exists.
