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
| UI | React + CSS Custom Properties |
| 스타일 토큰 | `docs/design/colors_and_type.css` |
| 아직 미결정 | DB, 백엔드 런타임, 배포 플랫폼 |

**절대 사용 금지:** Next.js. 제안하지도 말 것.

React Router 7 framework mode는 Remix 패턴과 동일하다: `loader` / `action` / `clientLoader` 구조, 파일 기반 라우팅.

---

## 디자인 시스템 (단일 진실 출처)

모든 UI 구현은 `docs/design/`을 기준으로 한다. 디자인 토큰을 하드코딩하지 말 것.

### 토큰 참조 방법

```css
/* 올바름 */
background: var(--color-surface-card);
color: var(--color-accent-primary);

/* 금지 */
background: #18181f;
color: #7c3aed;
```

토큰 전체 목록: `docs/design/colors_and_type.css`

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

`docs/design/ui_kits/streamer-native/` 에 pixel-perfect 기준 컴포넌트가 있다. 새 화면을 구현할 때 반드시 먼저 읽을 것:

| 컴포넌트 | 파일 |
|----------|------|
| 홈 화면 | `HomeScreen.jsx` |
| 매치업 (1v1) | `MatchupScreen.jsx` |
| 결과 화면 | `ResultScreen.jsx` |
| 상단 네비 | `TopNav.jsx` |
| 사이드바 | `Sidebar.jsx` |
| 브라켓 카드 | `BracketCard.jsx` |
| 채팅 패널 | `ChatPanel.jsx` |

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
| OBS 브라우저 소스 | CSR | 방송 레이아웃 |

공유 결과 URL은 반드시 SSR로 렌더링해야 한다. 크롤러가 읽을 수 없으면 바이럴 루프 전체가 깨진다.

---

## 게임 상태 지속성 (매치업)

- 플레이어의 브라켓 진행 상태는 **로컬 스토리지에 자동 저장** (FR24)
- 새로고침 후 이어하기 가능 — 현재 라운드, 선택 이력, 남은 매치 유지
- 미완료 브라켓 재방문 시: "처음부터 / 이어하기" 선택 제공 (FR24a)
- 서버 동기화 불필요 — 로컬만으로 충분

---

## OBS 브라우저 소스 통합

- 스트리머는 단일 URL을 OBS에 추가하는 것으로 방송 통합 완료 (FR40)
- OBS 방송 모드: 16:9 레이아웃 최적화, 키보드(A/D)로 로컬 조작 → 방송에 실시간 반영 (FR41)
- OBS 모드와 일반 플레이 모드는 **동일한 URL, 다른 레이아웃** — `?obs=1` 쿼리 파라미터 또는 별도 경로로 구분
- OBS 브라우저 소스는 WebSocket 연결 지원. 실시간 동기화가 필요하면 이를 활용할 것

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
