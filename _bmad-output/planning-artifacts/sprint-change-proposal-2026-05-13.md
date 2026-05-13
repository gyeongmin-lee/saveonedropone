# Sprint Change Proposal - Home/Browse Correct Course

Date: 2026-05-13  
Project: saveonedropone  
Trigger document: `_bmad-output/planning-artifacts/home-browse-design.html`

## 1. Issue Summary

Home/Browse 설계가 Option C로 확정되면서 기존 PRD, Epics, UX, Architecture 문서의 MVP discovery 범위와 충돌이 생겼다.

기존 문서는 홈을 Featured/Trending/For You 중심으로 설명하고, 첫 방문 관심사 온보딩과 `sodo:interests`/`user_preferences` 기반 개인화를 MVP에 포함했다. 새 설계는 소셜 공유 기반 발견 루프를 우선하며, MVP에서는 개인화 없이 다음 구조를 채택한다.

- Home: "Popular Brackets" + "Browse by category" 5x2 카드 그리드
- Category: Popular/New 2탭, K-pop 태그 필터만 MVP 활성화
- Result: Champion Hero 내부 공유 액션 + 바로 아래 "More in [category]" 4개 레일
- Removed: Featured home section, For You rail, first-visit interest onboarding, `sodo:interests`, `user_preferences`

## 2. Impact Analysis

### Epic Impact

Epic 1은 `Public Discovery & Personalized Browse`에서 `Public Discovery & Browse`로 조정된다. Story 번호 체계는 유지한다.

- Story 1.2: public data foundation에 trending score 데이터 소스와 category/tag model 의도를 반영
- Story 1.3: SSR Home Browse Page를 Featured/Trending에서 Popular Brackets + category card grid로 변경
- Story 1.4: Category and Tag Browse Routes에 Popular/New 탭, K-pop-only tag filter, server fetch + skeleton UI, URL query 반영 추가
- Story 1.5: First-Visit Interest Onboarding은 MVP 제거/폐기 범위로 변경
- Epic 3: Result page layout에 More in [category] 레일과 OG 태그 세부 스펙 추가

### Artifact Conflicts

- PRD: MVP scope, FR2, FR5a, FR33, result re-entry requirement, Journey 2가 기존 온보딩 중심으로 남아 있었다.
- Epics: Epic 1 제목/설명, Story 1.3/1.4/1.5, UX-DR, FR coverage가 기존 개인화 설계를 참조했다.
- UX Design: screen inventory, Journey 2, Home/Browse, Result Page, Onboarding Modal 섹션이 새 설계와 충돌했다.
- Architecture: `user_preferences`, `preferences.repository.server.ts`, browse onboarding folder, `/brackets` collection route가 MVP 구조에 남아 있었다.

### Technical Impact

- New DB table for `user_preferences` is no longer needed for MVP.
- Browse repository/service layer must support:
  - `trending_score = plays_7d + (live_now_count * 10) + (share_clicks_7d * 5)`
  - Cold Start fallback: `is_curated DESC, created_at DESC`
  - Home category cap: max 3 per category when enough categories exist
  - Category Popular freshness quota: at least 2 top-10 items from last 30 days where eligible
  - K-pop tag filtering via SSR-addressable query params and fetcher grid replacement
- Result route must load same-category recommendations excluding current `bracket_pack_id`.

## 3. Recommended Approach

Recommended path: Direct Adjustment.

Rationale:

- The change is a scope correction rather than a fundamental product pivot.
- Existing Epic 1 and Epic 3 structure can remain intact if Story 1.5 is converted to removed/deferred scope.
- No rollback is required because implementation has not been identified as complete against the old onboarding design.
- MVP becomes smaller and more coherent by removing personalization, reducing state storage, and keeping discovery aligned with the social sharing loop.

Effort estimate: Medium.  
Risk level: Low to Medium.  
Timeline impact: Net neutral or positive, because removing onboarding/personalization offsets the added browse ranking details.

## 4. Detailed Change Proposals

### PRD

Old:

- Home MVP included first-visit interest onboarding and a For You rail.
- FR2 referenced weekly Featured and trending lists.
- FR5a described generic category tag filtering.
- Result re-entry did not specify the More in [category] rail placement.

New:

- Home MVP is Popular Brackets + Browse by category.
- FR2 defines fixed "Popular Brackets" label, trending score sorting, Cold Start fallback, and category cap.
- FR5a scopes MVP tag filtering to K-pop and requires server fetch + skeleton UI with URL query reflection.
- FR35c adds Champion Hero share integration and More in [category] rail behavior.

### Epics

Old:

- Epic 1 was `Public Discovery & Personalized Browse`.
- Story 1.3 expected featured/trending sections.
- Story 1.4 lacked Popular/New tabs and filter fetch behavior.
- Story 1.5 implemented first-visit onboarding.

New:

- Epic 1 is `Public Discovery & Browse`.
- Story 1.3 defines Popular Brackets, Browse by category 5x2 grid, trending score, Cold Start fallback, and category cap.
- Story 1.4 defines Popular/New, UGC freshness quota, K-pop tag scope, URL query behavior, and grid-only fetch replacement.
- Story 1.5 explicitly prevents MVP onboarding/personalization implementation.

### UX Design

Old:

- Home/Browse included `/brackets`, featured/trending, sidebar category patterns, quick-play, and onboarding modal.
- Journey 2 routed first-time users through category onboarding.
- Result page placed share actions as a standalone content area.

New:

- Home/Browse inventory uses `/` and `/categories/:categorySlug`.
- Journey 2 starts directly from shared link/home/VOD link into bracket or result page.
- Result page order is Champion Hero with share actions, More in [category], stats/path/community, comments.
- Onboarding Modal is retained only as an explicit removed-from-MVP note.

### Architecture

Old:

- Data model included `user_preferences`.
- Requirements mapping included `preferences.repository.server.ts`, browse onboarding folder, and `brackets._index.tsx`.

New:

- MVP does not create `user_preferences` or store anonymous interests.
- Browse architecture documents ranking, Cold Start, category cap, UGC freshness quota, and K-pop tag fetch behavior.
- Initial structure removes MVP onboarding and preferences repository entries.

## 5. Implementation Handoff

Scope classification: Moderate.

Handoff recipients:

- Product Owner / Developer: update backlog status for Story 1.3, 1.4, and 1.5 based on revised acceptance criteria.
- Developer agent: implement browse/result behavior from the revised epics and architecture.

Success criteria:

- No MVP implementation depends on first-visit onboarding, For You, `sodo:interests`, or `user_preferences`.
- Home renders Popular Brackets and Browse by category from SSR-visible data.
- Category pages render Popular/New and K-pop tag filters with URL-addressable filter state.
- Result pages render share actions in Champion Hero and a same-category More in rail directly below it.
- OG tags are present in initial HTML for public result pages.

## 6. Checklist Status

- [x] Trigger and context identified
- [x] Epic impact assessed
- [x] PRD conflicts identified and updated
- [x] Architecture conflicts identified and updated
- [x] UI/UX conflicts identified and updated
- [x] Direct Adjustment selected
- [x] Sprint Change Proposal generated
- [N/A] `sprint-status.yaml` updated - file not present in repository
