# Sprint Change Proposal — Community Comments UI Gap Resolution

Date: 2026-05-13
Project: saveonedropone
Trigger: Pre-implementation review of Story 6.1 against `docs/design/theme-streamer.jsx`

---

## 1. Issue Summary

`docs/design/theme-streamer.jsx`의 Community 댓글 섹션에는 5가지 UI/동작 요소가 구현되어 있었으나, Epic 6 Story 6.1 AC, UX 스펙, Architecture 문서에 해당 사항이 명시되지 않아 구현 시 혼란 또는 임의 결정이 발생할 수 있는 상태였다. 이 제안은 Story 6.1 구현 착수 전 해당 갭 5개를 결정하고 관련 문서에 반영한다.

---

## 2. Impact Analysis

**영향 범위:** Epic 6 Story 6.1 — 나머지 Epic/Story 변경 없음. MVP 축소 없음.

**수정된 아티팩트:**
- `_bmad-output/planning-artifacts/epics.md` — Story 6.1 AC 보강
- `_bmad-output/planning-artifacts/architecture.md` — Data Architecture 스키마 보강

---

## 3. 갭별 결정 및 변경 내용

### 갭 1: 익명 댓글 Identity 모델

**결정:** 자동 생성 닉네임, localStorage UUID로 디바이스 고정 (90일 만료)

**변경 — Architecture (`comment_sessions` 테이블 신규):**
```
comment_sessions
  session_id   UUID  PK   -- localStorage "anon_token" 값
  display_name TEXT       -- 자동 생성 adjective+noun (최초 댓글 시 1회 생성)
  color_hue    INT        -- 0–360, 아바타 색상 고정
  created_at   TIMESTAMPTZ
  last_seen_at TIMESTAMPTZ
```
`comments` 테이블에 `session_id FK`, `display_name` denormalized 컬럼 추가.

**변경 — Story 6.1 AC 추가 (3개):**
- 최초 댓글 시 UUID 생성 → `comment_sessions` INSERT → `display_name`/`color_hue` 할당
- 재방문 시 기존 `anon_token`으로 동일 `display_name`/`color_hue` 재사용
- 목적: 답글 수신 시 원댓글 작성자 동일인 시각적 확인

---

### 갭 2: ▲▼ 투표 · 💬 답글 · ↗ 공유 액션

**결정:** 공유(↗)만 MVP 구현 (URL 복사), 투표/답글은 MVP에서 렌더링 자체 생략

**변경 — Story 6.1 AC 수정:**

OLD:
> "These controls may be displayed only if they are backed by working behavior or an explicitly disabled/unavailable state. Dead buttons that appear functional are not allowed."

NEW:
> "↗ Share는 comment URL 복사로 구현. ▲▼ 투표와 💬 답글은 MVP 렌더에서 완전히 생략 (disabled 버튼도 표시하지 않음). 레이아웃은 post-MVP 추가를 위한 여백 유지."

---

### 갭 3: 챔피언 pill 클릭 — Side-by-side 비교

**결정:** 단순 페이지 이동 (`/results/:resultId`), side-by-side 명시적 out of scope

**변경 — Story 6.1 AC 수정:**
- "link or route to commenter's public result" → `/results/:resultId`로 네비게이션 명시
- "side-by-side bracket comparison is explicitly out of scope" 추가

---

### 갭 4: 🔥 Hot takes 뱃지 판별 기준

**결정:** P25 percentile 기반, `total_plays >= 100` 표본 조건 포함

**알고리즘:**
```
picked_entries = entry_champion_stats where champion_count > 0 (해당 bracket_pack)
p25_rate       = 25th percentile of (champion_count / total_plays) among picked_entries

hot_takes_flag = true   if commenter's pick rate < p25_rate AND total_plays >= 100
               = null   if total_plays < 100  →  Hot takes 필터 칩 숨김
```

**변경 — Story 6.1 AC 추가 (1개), Architecture `comments` 테이블 설명 보강:**
- `hot_takes_flag BOOLEAN nullable` 컬럼 추가
- comment 저장 action에서 `entry_champion_stats` 조회 후 즉시 계산

---

### 갭 5: Bracket match % 데이터 출처

**결정:** 별도 테이블 불필요, 댓글 목록 조회 시 `entry_champion_stats` JOIN

**계산식:**
```
bracket_match_pct = champion_count / total_plays  (for commenter's champion entry)
```

**변경 — Story 6.1 AC 추가 (1개):**
- loader가 `entry_champion_stats JOIN`으로 `bracket_match_pct` 포함 반환
- `total_plays < 100` 또는 champion context 없으면 0%가 아닌 생략

---

## 4. 권장 접근법

**Option 1 (Direct Adjustment)** 채택 — 기존 Story 6.1 내 AC 보강으로 해결. 새 Epic/Story 불필요. MVP 축소 불필요.

| 항목 | 평가 |
|------|------|
| 노력 | Low |
| 리스크 | Low |
| 타임라인 영향 | 없음 |

---

## 5. 구현 핸드오프

**범위 분류: Minor** — Developer agent가 직접 구현 가능.

**구현 순서 (Story 6.1 내):**
1. `comment_sessions` 마이그레이션 + `comments` 스키마 업데이트
2. 클라이언트 `anon_token` 생성 유틸리티
3. comment action: session 조회/생성 + `hot_takes_flag` 계산 + 저장
4. comment 목록 loader: `entry_champion_stats` JOIN → `bracket_match_pct` 포함
5. UI: `display_name`/`color_hue` 렌더, 공유 액션만 표시, hot take 뱃지, match % 표시

**성공 기준:**
- 동일 디바이스 재방문 시 동일 닉네임/색상 유지
- 232-entry 브라켓에서 10위 pick이 hot take로 표시되지 않음
- 투표/답글 버튼이 어떤 형태로도 렌더링되지 않음
- bracket match %가 `total_plays < 100`인 경우 표시되지 않음
