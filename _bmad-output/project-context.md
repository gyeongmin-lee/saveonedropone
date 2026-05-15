---
project_name: saveonedropone
user_name: GM
date: '2026-05-06'
sections_completed: ['technology_stack', 'design_system', 'business_rules', 'routing_and_rendering', 'auth', 'obs_integration']
---

# Project Context for AI Agents — Save One Drop One

_AI 에이전트가 이 프로젝트의 코드를 구현할 때 반드시 따라야 하는 규칙과 제약사항. 명백한 것은 생략하고 놓치기 쉬운 것만 기록한다._

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프레임워크 | **React Router 7 (framework mode)** |
| UI | React + CSS Custom Properties + Storybook |
| 디자인 기준 | `docs/design/README.md`와 `docs/design/*.html` / `docs/design/**/*.jsx` |
| DB / Auth / Storage / Realtime | **Supabase** (Postgres, Auth, Storage, Realtime Broadcast) |
| 백엔드 런타임 / 배포 | **Cloudflare Workers** |

**절대 사용 금지:** Next.js. 제안하지도 말 것.

React Router 7 framework mode는 Remix 패턴과 동일하다: `loader` / `action` / `clientLoader` 구조, 파일 기반 라우팅.

---

## 디자인 시스템 (단일 진실 출처)

모든 UI 구현은 `docs/design/`을 기준으로 한다. 현재 디자인 산출물은 별도 CSS 토큰 파일이나 `ui_kits/` 디렉터리가 아니라 HTML/JSX 프로토타입이다. 구현자는 `docs/design/README.md`의 파일 맵을 먼저 읽고, 해당 화면의 `.html`과 로드되는 `.jsx` 파일을 직접 확인해야 한다.

### 디자인 참조 방법

| 구현 대상 | 먼저 읽을 파일 |
|----------|----------------|
| 홈 / 카테고리 / 매치업 / 결과 | `docs/design/Save One Drop One.html`, `docs/design/theme-streamer.jsx`, `docs/design/data.jsx` |
| 브라켓 생성 | `docs/design/Create Bracket.html`, `docs/design/create-bracket/composer.jsx`, `docs/design/create-bracket/published.jsx`, `docs/design/create-bracket/shared.jsx` |
| Streamer Live Mode | `docs/design/Live Mode States.html`, `docs/design/live-mode/states.jsx` |
| 전체 브라켓 모달 | `docs/design/Full Bracket.html`, `docs/design/full-bracket/states.jsx` |
| 커뮤니티 랭킹 모달 | `docs/design/Community Ranking.html`, `docs/design/community-ranking/states.jsx` |

프로토타입의 inline style 값은 현재 시각 기준이다. Production 구현에서는 반복되는 색상, 타이포그래피, spacing을 `app/styles/tokens.css` 같은 앱 내부 토큰 엔트리로 추출하되, 값과 컴포넌트 구성은 위 디자인 파일에서 직접 파생한다.

### UI 개발 환경과 라이브러리 규칙

- Storybook은 reusable UI와 feature UI를 route/page composition 밖에서 검토하는 isolated component environment다.
- Storybook은 production route와 같은 `app/styles/tokens.css` 및 base app styles를 로드해야 한다.
- `app/styles/tokens.css`가 UI token source of truth다. Tailwind는 사용할 수 있지만 CSS custom property token을 소비하는 utility layer로만 사용한다.
- Tailwind default palette, spacing, radius, typography가 브랜드 기준이 되면 안 된다.
- Lucide를 production icon 기본 선택지로 사용한다.
- Radix UI는 Dialog, Popover, Tooltip, DropdownMenu, Tabs, Switch, Checkbox, RadioGroup, Select 같은 accessibility-sensitive primitive의 기본 선택지다.
- Radix는 필요한 primitive별로 설치하고, 재사용 전 `app/components/` 또는 `app/features/<feature>/`의 app-owned wrapper로 감싼다.
- scaffold 단계에서 shadcn/ui, Chakra, MUI, Mantine, DaisyUI 같은 broad pre-styled component library를 도입하지 않는다. 이후 필요하면 별도 ADR이 필요하다.

### 핵심 토큰 값 (참고용, 코드엔 var() 사용)

| 용도 | 값 |
|------|----|
| 배경 (페이지) | `#0e0e12` |
| 배경 (카드) | `#18181f` |
| 상단 네비 | `#0a0a0e` |
| 액센트 (보라) | `#7c3aed` |
| 액센트 (초록/라이브) | `#38e07b` |
| 카드 테두리 | `rgba(255,255,255,0.06)` |

### 구현 가능한 React 컴포넌트

디자인 프로토타입의 컴포넌트는 전역 `window.*`로 export된다. Production으로 옮길 때는 canvas/tweaks 전용 코드는 제외하고, 실제 화면 컴포넌트만 앱 구조에 맞게 추출한다.

| 컴포넌트/화면 | 파일 |
|----------|------|
| 홈 / 카테고리 / 매치업 / 결과 / 상단 네비 / 사이드바 / 브라켓 카드 / 채팅 패널 | `docs/design/theme-streamer.jsx` |
| 생성 Composer / Published 상태 | `docs/design/create-bracket/composer.jsx`, `docs/design/create-bracket/published.jsx`, `docs/design/create-bracket/shared.jsx` |
| Live Mode 상태 | `docs/design/live-mode/states.jsx` |
| 전체 브라켓 모달 상태 | `docs/design/full-bracket/states.jsx` |
| 커뮤니티 랭킹 모달 상태 | `docs/design/community-ranking/states.jsx` |

### 타이포그래피 규칙

- 본문: Inter (400/500/600/700/800)
- 숫자·레이블: JetBrains Mono (`font-variant-numeric: tabular-nums`)
- 디스플레이 헤딩: `font-weight: 800`, `letter-spacing: -0.02em`
- 이모지: 섹션 레이블에만 (🔥 😱 ⚡) — 버튼·본문 금지

### 레이아웃 치수

- 상단 네비 높이: `56px` (sticky)
- 사이드바 너비: `220px` (fixed, 홈 화면)
- 채팅 우측 레일: `320px` (fixed, 매치업)
- 최소 레이아웃 너비: `1280px` (모바일 브레이크포인트 미정의)
- 카드 반경: `10px` 기본, `12px` 히어로 타일

---

## 인증 규칙

| 행동 | 로그인 필요 여부 |
|------|----------------|
| 브라켓 탐색·플레이 | **불필요** |
| 결과 공유 | **불필요** |
| 댓글 작성 | **불필요** (FR36) |
| 브라켓 생성 | 필요 |
| 즐겨찾기 | 필요 |

소셜 로그인만 지원: Google, Twitch (FR47). 이메일/비밀번호 없음.

---

## 라우팅 및 렌더링 전략

| 페이지 | 렌더링 방식 | 이유 |
|--------|-------------|------|
| 홈 / 탐색 | SSR | SEO 필요 |
| 공개 결과 페이지 | **SSR 필수** | OG 이미지·메타태그 포함 (FR33) — 공유 링크 클릭 시 SNS 미리보기 동작해야 함 |
| 매치업 (플레이 중) | CSR | 실시간 인터랙션 |
| Streamer Live Mode | CSR | 방송용 screen capture 대상 |

공유 결과 URL은 반드시 SSR로 렌더링해야 한다. 크롤러가 읽을 수 없으면 바이럴 루프 전체가 깨진다.

---

## 게임 상태 지속성 (매치업)

- 플레이어의 브라켓 진행 상태는 **로컬 스토리지에 자동 저장** (FR24)
- 새로고침 후 이어하기 가능 — 현재 라운드, 선택 이력, 남은 매치 유지
- 미완료 브라켓 재방문 시: "처음부터 / 이어하기" 선택 제공 (FR24a)
- 서버 동기화 불필요 — 로컬만으로 충분

---

## Streamer Live Mode / OBS Screen Capture

- 스트리머는 일반 매치업 화면에서 Streamer Live Mode를 켜고, 그 화면을 OBS screen capture로 방송에 올린다.
- 별도 OBS Browser Source URL, `?obs=1`, 별도 OBS route를 만들지 않는다.
- Live Mode는 같은 매치업 URL 안의 opt-in 패널이며, 16:9 화면 캡처에서 잘림 없이 보여야 한다.
- Streamer Live Mode 클라이언트는 Supabase Realtime Broadcast 채널(`live-session:{session_id}`)을 구독해 투표 집계를 실시간으로 표시한다.

---

## 라이브 투표 & 채팅 연동

**시청자 참여 방식은 Twitch 채팅 명령어(!A/!B) 하나뿐이다. 웹 투표 링크는 존재하지 않는다.**

### 데이터 흐름

```
Twitch 채팅 → EventSub Webhook (POST /api/twitch/eventsub)
  → HMAC 서명 검증
  → !A / !B 파싱
  → live_votes upsert (session_id, user_id, match_id) — 중복 투표 자동 덮어쓰기
  → 집계 COUNT 조회
  → Supabase Broadcast { type: 'vote_update', match_id, vote_a, vote_b }
  → OBS 화면 + 스트리머 컨트롤러 실시간 반영
```

### 구현 규칙

- EventSub 수집: `channel.chat.message` only. IRC justinfan 사용 금지.
- `live_votes` 테이블: unique `(session_id, user_id, match_id)` — last-vote-wins upsert.
- Broadcast 페이로드에 원시 채팅 메시지를 포함하지 말 것. 집계값만 전달.
- Postgres Changes를 투표 이벤트 fan-out에 사용하지 말 것.
- YouTube 채팅은 Growth. MVP에서 구현하지 말 것.

### 스트리머 OAuth (채팅 연동용, 소셜 로그인과 별개)

- Supabase Auth Twitch 로그인 = 사용자 신원 확인용 (scope: 기본)
- 채팅 수집 활성화 = 별도 OAuth 동의 필요: 스트리머가 `channel:bot` scope를 앱에 부여
- 앱 봇 계정은 `user:bot` + `user:read:chat` 토큰을 서버에서만 보관 (브라우저에 노출 금지)
- 스트리머가 이 동의를 완료하기 전까지 채팅 투표는 비활성 상태

---

## 광고 수익 구조 (라우팅 설계에 영향)

라운드마다 페이지가 전환된다 (SPA 내비게이션이어도 광고 슬롯이 재로드되어야 함). 일반 콘텐츠 사이트 대비 세션당 PV 약 3~4배가 수익 모델의 근거. 매치업 컴포넌트를 구현할 때 각 라운드를 독립적인 뷰 전환으로 처리할 것.

---

## 토너먼트 브라켓 로직

- 항목 수가 2의 거듭제곱이 아니어도 **부전승 자동 배정**으로 유효한 1v1 브라켓 구성 (FR14a)
- 사용자가 항목 수를 입력하면 시스템이 표준 토너먼트 크기 옵션 제안 (예: 133개 → 16/32/64/128/133 선택)
- YouTube URL 붙여넣기 → 제목·썸네일·시작 second 자동 파싱 (FR9, FR10)

---

## MVP / Growth / Vision 구분

PRD에서 `Phase` 컬럼으로 구분됨. 구현 우선순위:

1. **MVP** — 바이럴 루프 검증 필수 기능 (스트리머 온보딩 → 시청자 재플레이 → 결과 공유 → SEO)
2. **Growth** — 루프 검증 이후
3. **Vision** — 장기 로드맵

MVP가 아닌 기능은 아키텍처에서 고려하되, 구현하지 말 것.
