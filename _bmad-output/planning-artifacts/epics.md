---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories", "step-04-final-validation"]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
---

# saveonedropone - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for saveonedropone, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: 방문자는 로그인 없이 공개 브라켓을 탐색하고 플레이할 수 있다.
FR2: 홈 화면은 "Popular Brackets" 섹션과 "Browse by category" 5x2 카드 그리드를 표시한다.
FR3: 브라켓 카드에는 총 플레이 횟수와 현재 라이브 방송 중인 스트리머 수가 표시된다.
FR4: 방문자는 현재 Save One Drop One을 방송 중인 스트리머 목록을 사이드바에서 확인할 수 있다. Phase: Growth.
FR5: 방문자는 카테고리(K-팝, 애니메이션, 게임, 스포츠 등)로 브라켓을 필터링할 수 있다.
FR5a: 방문자는 카테고리 내 세부 태그로 브라켓을 추가 필터링할 수 있다.
FR6: 방문자는 브라켓 제목 및 설명으로 검색할 수 있다. Phase: Growth.
FR7: 사용자는 브라켓을 즐겨찾기에 추가할 수 있다. 로그인 필요. Phase: Growth.
FR8: 인증된 사용자는 새 Bracket Pack을 생성할 수 있다.
FR9: 생성자는 YouTube URL을 붙여넣으면 시스템이 제목과 썸네일을 자동으로 파싱한다.
FR10: YouTube URL 파싱 시 시작 second(재생 시점)를 지정할 수 있다.
FR11: 생성자는 이미지 URL(imgur 등)을 붙여넣어 브라켓 항목 이미지를 추가할 수 있다.
FR12: 생성자는 로컬 이미지 파일을 업로드하여 브라켓 항목 이미지를 추가할 수 있다.
FR12a: 생성자는 로컬 이미지 파일을 최대 64개까지 배치 업로드하여 항목 이미지를 일괄 추가할 수 있다.
FR13: 생성자는 항목 이름, 이미지, 선택적 부가 정보(그룹명 등)를 입력할 수 있다.
FR13a: 생성자는 시딩 방식을 Randomized(기본) 또는 Preset으로 선택할 수 있고, Preset 선택 시 큐에서 항목 순서를 드래그로 조정한다.
FR14: 시스템은 항목 수에 따라 표준 토너먼트 크기와 전체 참가자 수 옵션을 제공한다.
FR14a: 시스템은 선택한 토너먼트 크기가 2의 거듭제곱이 아니어도 부전승을 자동 배정해 유효한 1v1 브라켓으로 진행한다.
FR15: 생성자는 브라켓을 공개/비공개로 설정할 수 있다.
FR16: 생성자는 기존 Bracket Pack을 복제하여 수정할 수 있다. Phase: Growth.
FR17: 시스템은 Bracket Pack 생성 완료 즉시 공개 브라켓 URL을 제공한다.
FR18: 플레이어는 브라켓 시작 시 플레이할 총 라운드/브라켓 크기를 선택할 수 있다 (예: 4/8/16/32/64/128/256/2NN).
FR19: 플레이어는 매 라운드에서 두 항목(A vs B)을 비교하고 하나를 선택할 수 있다.
FR20: 플레이어는 키보드(A / D 키) 또는 클릭으로 선택할 수 있다.
FR21: 시스템은 현재 매치의 진행 경과(라운드, 매치 번호, 진행 도트)를 표시한다.
FR22: 플레이어는 이전 선택으로 돌아가는 Undo를 사용할 수 있다.
FR23: 플레이어는 처음부터 재시작하는 Restart를 사용할 수 있다.
FR24: 시스템은 플레이어의 브라켓 진행 상태를 로컬에 자동 저장하며, 새로고침 후에도 현재 라운드, 선택 이력, 남은 매치가 유지된다.
FR24a: 플레이어가 미완료 브라켓에 다시 방문하면 처음부터 시작 또는 이어하기를 선택할 수 있다.
FR25: 매치업 화면은 OBS screen capture 시 1920x1080 해상도에서 주요 항목 이미지, 이름, 진행 상태가 잘림 없이 표시된다.
FR26: 토너먼트 완료 시 챔피언 화면이 표시된다.
FR27: 결과 화면에서 사용자의 플레이 통계(총 소요 시간, 연승 기록, 속도 백분위)를 확인할 수 있다.
FR28: 결과 화면에서 챔피언까지의 매치업 경로(Final Eight replay)를 시각적으로 확인할 수 있다.
FR29: 결과 화면에서 전체 커뮤니티의 집계 결과(Most popular, Biggest upset, Fastest run)를 확인할 수 있다.
FR30: 사용자는 결과를 이미지로 다운로드할 수 있다.
FR31: 사용자는 결과 페이지 링크를 복사할 수 있다.
FR32: 사용자는 결과를 X(Twitter), Reddit, Discord에 직접 공유할 수 있다.
FR33: 공개 결과 페이지는 OG 이미지와 메타 태그를 포함한 SSR 렌더링으로 제공된다.
FR34: 방문자는 결과 공유 링크를 클릭하면 해당 브라켓의 결과 화면으로 직접 이동할 수 있다.
FR35: 방문자는 결과 화면에서 "Play again" 버튼으로 자신의 플레이를 시작할 수 있다.
FR35a: 방문자는 Community Verdict 패널에서 "View all N"을 눌러 전체 참가자의 커뮤니티 선택 % 랭킹을 볼 수 있다.
FR35b: 방문자는 Final Eight 패널에서 "View all N"을 눌러 전체 브라켓 트리를 풀스크린 모달로 볼 수 있다. 모달에는 zoom/drag, 슬라이더+FIT, 라운드 칩 필터, 뷰어 경로 하이라이트, Save Image 상태가 포함된다.
FR35c: 결과 화면은 Champion Hero 내부 공유 액션과 바로 아래 "More in [category]" 레일을 제공한다.
FR36: 방문자는 공개 브라켓 결과 페이지에 댓글을 작성할 수 있으며, 작성된 댓글은 신고/비공개 처리 대상이 될 수 있다.
FR37: 채팅 시청자는 !A 또는 !B 채팅 명령어로 현재 매치에 실시간 투표할 수 있다. MVP는 Twitch만 구현하고 YouTube 채팅은 Growth 범위다.
FR38: 매치업 화면에는 실시간 채팅 투표 집계(A% vs B%)가 표시된다.
FR40: 스트리머는 키보드(A/D 키)로 매치를 진행할 수 있다.
FR41: 스트리머 대시보드에서 자신이 만든 Bracket Pack 목록과 플레이 통계를 확인할 수 있다. Phase: Growth.
FR44: 방문자는 부적절한 콘텐츠를 신고할 수 있다.
FR45: 관리자는 신고된 콘텐츠를 검토하고 제거할 수 있다.
FR46: 시스템은 DMCA Safe Harbor 요건에 따라 저작권 침해 신고 접수 및 처리 경로를 제공한다.
FR47: 사용자는 소셜 로그인(Google, Twitch)으로 계정을 생성할 수 있다.
FR48: 인증 없이 브라켓 플레이와 결과 공유는 가능하나, 브라켓 생성은 로그인이 필요하다.
FR49: 사용자는 자신의 플레이 히스토리를 프로필에서 확인할 수 있다. Phase: Growth.
FR50: 시스템은 브라켓 페이지 전환 시 광고 노출 슬롯을 지원한다. Phase: Growth.
FR51: 프리미엄 구독 사용자는 광고 없이 플레이할 수 있다. Phase: Vision.
FR52: 스트리머 파트너는 자신의 Bracket Pack에 스폰서 브랜딩을 추가할 수 있다. Phase: Vision.

### NonFunctional Requirements

NFR-P1: 매치업 화면 전환 LCP는 대표 64강 브라켓 기준 p75 1.5초 이하를 만족해야 한다.
NFR-P2: 공개 브라켓 결과 페이지 첫 로드 FCP는 모바일 4G와 데스크톱 조건에서 p75 2초 이하를 만족해야 한다.
NFR-P3: 매치업 화면 키 입력(A/D)부터 UI 반영까지 p95 지연 시간은 100ms 이하이어야 한다.
NFR-P4: 64강 브라켓 결과 이미지 생성은 Generate 클릭부터 다운로드 가능 상태까지 p95 3초 이하이어야 한다.
NFR-S1: MVP는 동시 접속 1,000명까지 핵심 플레이/결과 공유 플로우를 유지하며 오류율 1% 미만, p95 응답 2초 이하를 만족해야 한다.
NFR-S2: Growth 단계는 동시 접속 10,000명 기준 병목, 확장 단위, 비용 가정을 문서화해야 한다.
NFR-S3: 인기 공개 페이지는 캐시 가능한 응답으로 제공되며 반복 조회 90% 이상을 캐시 계층 또는 정적 응답으로 처리해야 한다.
NFR-A1: 월간 가동률은 MVP 99.5% 이상, Growth 99.9% 이상을 유지해야 한다.
NFR-A2: 계획 점검은 KST 20:00-24:00 및 EST 19:00-24:00 시작을 피해야 한다. 긴급 보안 조치는 예외로 기록한다.
NFR-SEC1: 모든 user-facing 통신은 HTTPS와 TLS 1.2 이상을 사용해야 한다.
NFR-SEC2: UGC 이미지 업로드는 허용된 이미지 타입과 10MB 이하 파일만 수락해야 한다.
NFR-SEC3: 인증 토큰은 클라이언트 스크립트에서 읽을 수 없고 전송/저장 보호 속성을 갖춰야 한다.
NFR-SEC4: DMCA 신고 접수 경로와 처리 로그를 제공하고 대상 URL, 조치자, 상태 변경, 조치 시간을 1년 이상 조회 가능하게 보관해야 한다.
NFR-SEC5: 13세 미만 사용자의 개인정보 수집을 금지하고 익명 플레이 플로우에서 생년월일, 실명, 연락처를 요구하지 않아야 한다.
NFR-SEO1: 공개 브라켓 페이지와 결과 페이지는 초기 HTML에서 title, meta description, canonical, og 태그를 JS 없이 읽을 수 있어야 한다.
NFR-SEO2: 결과 공유 링크는 og:image, og:title, og:description을 포함해야 한다.
NFR-SEO3: 공개 URL slug는 소문자 영문/숫자/hyphen 조합, 80자 이하, 공백 및 추적 파라미터 없이 canonical URL에 반영되어야 한다.
NFR-ACC1: 매치업 핵심 플로우는 axe 또는 동등 도구에서 critical/serious issue 0건, 주요 텍스트 대비 4.5:1 이상, 포커스 표시 유지 기준을 통과해야 한다.
NFR-ACC2: 플레이어는 Tab, Enter/Space, A/D 키만으로 16강 브라켓 시작부터 결과 화면까지 완료할 수 있어야 한다.
NFR-M1: 브라켓 생성, 플레이 진행, 결과 생성, UGC moderation, SEO metadata 생성 책임은 AI-assisted 개발자가 추적할 수 있는 모듈 경계에 매핑되어야 한다.
NFR-M2: API key, secret, production credential은 코드베이스에 하드코딩하지 않고 환경별 설정으로 교체 가능해야 한다.
NFR-M3: Growth 단계부터 lint와 type check 실패 시 production 배포가 차단되어야 한다.

### Additional Requirements

- 첫 구현 스토리는 Cloudflare React Router scaffold 또는 공식 React Router 기본 템플릿으로 React Router 7 framework mode 앱을 초기화해야 한다. Next.js, Vercel-only 전제, Node-only 서버 런타임, GraphQL, 광범위 public REST API는 MVP에 도입하지 않는다.
- 배포 런타임은 Cloudflare Workers이며 서버 코드와 의존성은 Workers 호환성을 확인해야 한다. Node-only API는 loaders/actions에서 사용하지 않는다.
- 데이터, 인증, 스토리지, Realtime은 Supabase를 사용한다. Supabase URL/publishable key/service credentials는 Cloudflare Worker secrets 또는 환경 설정으로 관리한다.
- React Router loaders/actions/resource routes를 BFF 경계로 사용한다. Route module은 요청 파싱, auth check, validation, repository/service orchestration, metadata, headers, UI composition만 담당한다.
- 기본 코드 경계는 `domain/`, `repositories/`, `services/`, `schemas/`, `features/`, `components/`, `routes/`, `utils/`, `styles/`로 구성한다.
- `domain/`은 순수 TypeScript 규칙만 포함한다. React, Supabase, request/response, localStorage, browser API를 import하지 않는다.
- `repositories/`는 database row mapping과 persistence access를 담당하고 domain-shaped camelCase 객체를 반환한다. raw Supabase row type은 repository 경계 밖으로 새지 않는다.
- `services/`는 auth, storage, rate limiting, YouTube metadata, realtime setup, analytics, Twitch EventSub, live vote aggregation 등 외부 경계를 담당한다.
- 공개 route flow는 repository fetch -> visibility policy -> metadata helper -> route headers -> render 순서를 따라야 한다.
- visibility, SEO metadata, slug, cache, ad eligibility, moderation state 판단은 shared helper/policy로 중앙화해야 하며 route마다 hand-roll하지 않는다.
- 공개 브라켓/category/result 페이지는 SSR metadata와 CDN cache headers를 제공해야 한다. 비공개/takedown 전환 시 noindex, ad eligibility, cache behavior가 함께 반영되어야 한다.
- design token source of truth는 `docs/design/colors_and_type.css`이며 production UI는 hardcoded brand color를 사용하지 않는다. `app/styles/tokens.css`는 이 파일에서 파생되어야 한다.
- 익명 in-progress play state는 versioned localStorage key `sodo:play:{bracketPackId}`에 저장한다. 서버에는 완료된 shareable results, aggregate stats, broadcast checkpoints만 저장한다.
- tournament engine, byes, undo/restart, result reconstruction은 순수 domain module로 구현하고 unit test를 둔다.
- Result image export는 MVP에서 client-side Canvas 방식으로 구현한다. server-generated result image route는 별도 승인 전에는 추가하지 않는다.
- Twitch chat participation은 유일한 viewer participation mechanism이다. 웹 투표 링크를 만들지 않는다. YouTube chat은 Growth 범위다.
- Twitch EventSub `channel.chat.message`를 사용하고 IRC justinfan은 사용하지 않는다.
- Streamer social login과 chat collection OAuth는 별개다. Live Mode 채팅 수집은 `channel:bot` scope 동의가 필요하며 app bot token(`user:bot`, `user:read:chat`)은 서버에만 저장한다.
- `POST /api/twitch/eventsub` resource route는 HMAC signature를 검증하고 `!a`/`!b`를 case-insensitive로 파싱해야 한다.
- `live_votes`는 `(session_id, user_id, match_id)` unique로 last-vote-wins upsert를 수행하고, 집계 COUNT 후 Supabase Broadcast channel `live-session:{session_id}`에 vote summary를 broadcast해야 한다.
- Supabase Realtime Broadcast는 transient coordination만 담당한다. Durable session recovery는 persisted checkpoint를 사용해야 한다.
- Raw chat messages는 table에 저장하지 않는다. ChatPanel feed용 ephemeral broadcast만 허용된다.
- Rate limit helper는 comments, reports, auth callbacks, URL parsing, image upload, live vote submissions, moderation mutations 같은 high-risk writes에 적용해야 한다.
- Database naming은 snake_case plural table, `id` primary key, `{entity}_id` foreign key, `created_at`/`updated_at` timestamps, positive boolean names를 사용한다.
- TypeScript/domain fields는 camelCase를 사용하고 database snake_case 변환은 repository/service boundary에서 수행한다.
- Action/fetcher responses는 typed envelope `{ ok: true, data }` 또는 `{ ok: false, error }` 형태를 사용한다. Loader는 route data, redirect, thrown response를 반환한다.
- Supabase schema는 SQL migrations와 generated TypeScript database types를 사용한다. Generated types는 `app/types/database.types.ts`에 둔다.
- Core tables include `bracket_packs`, `bracket_entries`, `play_results`, `comments`, `reports`, `moderation_actions`, `dmca_requests`, `analytics_events`, `live_sessions`, `live_votes`, `entry_champion_stats`.
- MVP browse는 anonymous interest storage나 `user_preferences`를 사용하지 않는다. 개인화/For You는 Growth 재평가 전까지 제외한다.
- PostHog는 MVP product/application observability 방향으로 사용한다.
- Tests는 domain unit tests, route integration tests, e2e browse/play/result smoke, OBS/session smoke, accessibility checks를 포함해야 한다.

### UX Design Requirements

UX-DR1: Home/Browse는 SSR 기반 discovery surface로 sticky top nav, Popular Brackets, Browse by category 5x2 카드 그리드, category tabs/filter, loading/empty/error states를 제공해야 한다.
UX-DR2: MVP는 첫 방문 onboarding modal, For You 레일, Personalize navigation, interest localStorage를 제공하지 않는다.
UX-DR3: Category page는 Popular/New 2탭을 제공하고, K-pop 태그 필터는 서버 fetch + skeleton UI로 그리드만 갱신하며 URL 쿼리를 반영해야 한다.
UX-DR4: Matchup Play는 브라켓 이름, Round/Match 진행 도트, 타이머, 두 contestant card, A/D keyboard hint, undo/restart/share/report/Go Live toolbar, local save 상태를 제공해야 한다.
UX-DR5: Matchup은 image loading, selected/advance feedback, undo disabled, corrupted local state, image failed, localStorage unavailable 상태를 layout shift 없이 처리해야 한다.
UX-DR6: 미완료 local progress가 있는 사용자는 명확한 Resume / Restart 선택을 받아야 한다.
UX-DR7: Streamer Live Mode는 Matchup 화면 내 opt-in 패널이어야 하며 별도 OBS URL을 만들지 않는다. 모바일에서는 Go Live 버튼을 노출하지 않는다.
UX-DR8: Go Live 클릭 시 Twitch OAuth는 popup 방식으로 진행되어야 하며 redirect로 현재 매치 상태를 파괴하지 않아야 한다.
UX-DR9: Streamer Live Mode는 regular, oauth, connecting, connected, no_votes, disconnected 상태를 제공하고 각 상태에서 connection identity와 recovery action을 명확히 보여야 한다.
UX-DR10: Live vote tally는 연결 후 1표 이상일 때 contestant-level percentage indicator를 렌더링하고, 새 매치로 advance될 때 즉시 0으로 리셋해야 한다.
UX-DR11: Live mode chat display는 read-only여야 하며 스트리머와 시청자는 Twitch 앱에서 직접 채팅해야 한다.
UX-DR12: Result Page는 SSR 공개 페이지로 champion hero, final path/mini bracket, stats, share actions, Play again, comments, report action을 제공해야 한다.
UX-DR13: Result Page는 viewing context에 따라 primary CTA를 바꿔야 한다. 자신의 완료 직후는 Download image 또는 Copy result link, 타인 결과 조회 시 Play again을 우선한다.
UX-DR14: Result Page는 not found/private/removed, OG fallback, export pending/success/failure, insufficient community stats, comments empty/loading/error/locked 상태를 처리해야 한다.
UX-DR15: Full Community Ranking View는 Result의 "View all N"에서 열리는 client overlay로 전체 참가자를 community champion pick % 기준 내림차순 표시해야 한다.
UX-DR16: Full Community Ranking View는 MVP에서 All entrants 탭, 이름/그룹 검색, 무한 스크롤, 커뮤니티 1위 badge, viewer champion/runner-up badge를 제공해야 한다.
UX-DR17: Full Community Ranking insufficient 상태는 현재 플레이 수, 필요 수, 현재 라이브 수, "Early signal" 텍스트, "Share this bracket" CTA만 제공해야 한다. Notify me는 Growth다.
UX-DR18: Full Bracket Modal은 Result의 "View all N"에서 열리는 풀스크린 modal로 전체 bracket tree, zoom/drag, zoom slider, FIT, round chip filter, viewer path highlight, Save Image 상태를 제공해야 한다.
UX-DR19: Full Bracket Modal의 Save Image 캡처 범위는 선택된 round filter를 기준으로 하며 기본 Q-F, PNG 1080x1350을 지원해야 한다.
UX-DR20: Create Bracket Flow는 `/create`, `/create/new`의 단일 페이지 Composer로 smart paste, batch image upload, editable entry queue, bracket settings, source editing, publish readiness를 한 화면에 제공해야 한다.
UX-DR21: Creator login은 create/publish flow 진입 시에만 요청하고, browse/play/result/share/comments에는 로그인 요구를 하지 않아야 한다.
UX-DR22: Smart paste는 줄당 YouTube URL/image URL/text를 처리해야 하며 YouTube parse failure, quota/rate limit, unsupported URL, thumbnail unavailable, CORS/hotlink failure마다 manual fallback 또는 recovery path를 제공해야 한다.
UX-DR23: Image upload는 invalid type, over 10MB, batch failure 상태를 명확히 보여야 한다.
UX-DR24: Create entry row는 정상/소스 없음/제목 없음/선택됨 상태를 표시하고, 미완료 항목이 있으면 publish button을 "Finish N entries to publish" 비활성 상태로 보여야 한다.
UX-DR25: Non-power-of-two entry count는 blocking error가 아니라 bye preview와 설명으로 처리해야 한다.
UX-DR26: Publish 완료 후 공개 URL copy와 "Back to edit"를 제공해야 한다.
UX-DR27: Public bracket/result/comment에는 report path가 있어야 하고 report modal은 submitted, duplicate/too frequent, validation error 상태를 처리해야 한다.
UX-DR28: Admin report queue는 unread, grouped duplicates, high-risk, DMCA, resolved 상태를 구분하고 대상 preview, original URL, reason, report count, public/search/ad status, action history를 한 화면에 보여야 한다.
UX-DR29: Moderation action confirm modal은 hide/takedown/ad restriction 조치가 public visibility, noindex/cache, ad eligibility, comments에 미치는 영향을 명시해야 한다.
UX-DR30: Public unavailable/moderated content는 정책 세부를 노출하지 않는 짧고 일반적인 copy를 사용해야 한다.
UX-DR31: Mobile Home은 sidebar를 category drawer 또는 horizontal category rail로 접고 BracketCard는 읽기 쉬운 1-column 또는 large-phone 2-column layout을 사용해야 한다.
UX-DR32: Mobile Matchup은 stacked 또는 full-height split의 large tap target을 사용하고 desktop A/D hint를 과도하게 강조하지 않아야 한다.
UX-DR33: 1920x1080 OBS screen capture에서는 고정 aspect-ratio composition, no scrollbars, no clipping, readable labels를 보장해야 한다. 1280x720과 2560x1440 scale도 대응해야 한다.
UX-DR34: Core play flow는 keyboard only로 Home -> bracket detail -> play 16강 -> result -> copy link까지 완료 가능해야 한다.
UX-DR35: Modal focus는 trap되고 닫을 때 invoking control로 복원되어야 한다.
UX-DR36: Screen reader는 현재 round/match, contestant name, seed, selection instruction, copy/share/export status, blocking errors를 이해할 수 있어야 한다.
UX-DR37: Focus ring은 dark UI에서 인접 색 대비 3:1 이상이어야 하며 숨기면 안 된다.
UX-DR38: Normal text는 4.5:1, large display text는 3:1 대비를 목표로 하고 selection/live/winner/disabled/error state는 색상만으로 전달하면 안 된다.
UX-DR39: Touch targets는 mobile/tablet에서 최소 44x44px이어야 하며 nested controls가 accidental selection을 유발하지 않아야 한다.
UX-DR40: Motion은 prefers-reduced-motion을 존중하고 필수 정보를 animation만으로 전달하지 않아야 한다.
UX-DR41: Loading, empty, error, offline, removed, private, rate-limited 상태 copy는 짧고 기능적이어야 하며 사용자의 다음 행동을 명확히 해야 한다.
UX-DR42: Implementation agents는 화면 구현 전 관련 `docs/design` 및 Streamer Native UI kit 파일을 읽고 visual hierarchy, spacing, typography, color, component composition을 그쪽에서 가져와야 한다.

### FR Coverage Map

FR1: Epic 1 - 로그인 없는 공개 브라켓 탐색 및 플레이 진입.
FR2: Epic 1 - 홈 화면 Popular Brackets와 Browse by category discovery.
FR3: Epic 1 - BracketCard 플레이 수 및 live count 표시.
FR4: Epic 7 - Growth live streamer sidebar.
FR5: Epic 1 - 카테고리 기반 브라켓 필터링.
FR5a: Epic 1 - 카테고리 내 태그 기반 추가 필터링.
FR6: Epic 7 - Growth 브라켓 검색.
FR7: Epic 7 - Growth 즐겨찾기.
FR8: Epic 4 - 인증된 Bracket Pack 생성.
FR9: Epic 4 - YouTube URL 제목/썸네일 파싱.
FR10: Epic 4 - YouTube 시작 second 지정.
FR11: Epic 4 - 이미지 URL 기반 항목 이미지 추가.
FR12: Epic 4 - 로컬 이미지 파일 업로드.
FR12a: Epic 4 - 최대 64개 배치 이미지 업로드.
FR13: Epic 4 - 항목 이름, 이미지, 부가 정보 입력.
FR13a: Epic 4 - Randomized/Preset 시딩 및 drag reorder.
FR14: Epic 4 - 토너먼트 크기 옵션 제공.
FR14a: Epic 4 - 비-2의 거듭제곱 참가자 수 부전승 자동 배정.
FR15: Epic 4 - 공개/비공개 설정.
FR16: Epic 7 - Growth 기존 Bracket Pack 복제.
FR17: Epic 4 - 생성 완료 후 공개 브라켓 URL 제공.
FR18: Epic 2 - 시작 시 총 라운드/브라켓 크기 선택.
FR19: Epic 2 - 매 라운드 A/B 비교 선택.
FR20: Epic 2 - A/D 키 또는 클릭 선택.
FR21: Epic 2 - 라운드, 매치 번호, 진행 도트 표시.
FR22: Epic 2 - Undo.
FR23: Epic 2 - Restart.
FR24: Epic 2 - 로컬 진행 상태 자동 저장 및 refresh recovery.
FR24a: Epic 2 - 미완료 브라켓 재방문 시 resume/restart 선택.
FR25: Epic 2 - 1920x1080 OBS screen capture 안정성.
FR26: Epic 3 - 토너먼트 완료 champion screen.
FR27: Epic 3 - 결과 화면 플레이 통계.
FR28: Epic 3 - 챔피언까지의 Final Eight path.
FR29: Epic 3 - 커뮤니티 집계 결과.
FR30: Epic 3 - 결과 이미지 다운로드.
FR31: Epic 3 - 결과 페이지 링크 복사.
FR32: Epic 3 - X/Reddit/Discord 직접 공유.
FR33: Epic 3 - 공개 결과 페이지 SSR OG/meta.
FR34: Epic 3 - 공유 결과 링크 직접 진입.
FR35: Epic 3 - 결과 화면 Play again.
FR35a: Epic 3 - 전체 커뮤니티 선택 % 랭킹.
FR35b: Epic 3 - 전체 브라켓 트리 풀스크린 모달.
FR35c: Epic 3 - 결과 화면 More in category 재진입 레일.
FR36: Epic 6 - 공개 결과 페이지 댓글 및 댓글 moderation 대상화.
FR37: Epic 5 - Twitch 채팅 !A/!B 실시간 투표.
FR38: Epic 5 - 매치업 화면 실시간 투표 집계 표시.
FR40: Epic 2 - 스트리머 A/D 키 진행.
FR41: Epic 7 - Growth 스트리머 대시보드.
FR44: Epic 6 - 부적절 콘텐츠 신고.
FR45: Epic 6 - 관리자 신고 콘텐츠 검토 및 제거.
FR46: Epic 6 - DMCA Safe Harbor 신고 접수 및 처리 경로.
FR47: Epic 4 - Google/Twitch 소셜 로그인.
FR48: Epic 4 - 브라켓 생성 로그인 필요, 플레이/공유 인증 불필요.
FR49: Epic 7 - Growth 플레이 히스토리.
FR50: Epic 7 - Growth 광고 슬롯.
FR51: Epic 7 - Vision 프리미엄 광고 제거.
FR52: Epic 7 - Vision 스폰서 브랜딩.

## Epic List

### Epic 1: Public Discovery & Browse
방문자와 스트리머가 로그인 없이 공개 Bracket Pack을 발견하고, 홈의 Popular Brackets와 카테고리/태그 탐색을 통해 즉시 플레이 후보를 고를 수 있다. Bracket Pack 카드/상세는 item count, play count, live count, preview suitability를 보여줘 스트리머가 방송 적합성을 빠르게 판단하게 한다. 이 Epic은 discovery에 필요한 최소 seeded curated Bracket Pack data와 public visibility read path를 포함하되, 개인화/For You 온보딩이나 full moderation/admin foundation까지 포함하지 않는다.
**FRs covered:** FR1, FR2, FR3, FR5, FR5a

### Epic 2: Playable Tournament Experience
플레이어가 계정 없이 1v1 브라켓을 시작하고, 키보드/클릭으로 선택하며, undo/restart/local resume을 포함해 토너먼트를 완료할 수 있다. OBS screen capture 안정성과 향후 Live Mode를 위한 Matchup layout/state boundary도 이 플레이 경험 안에서 보장한다.
**FRs covered:** FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR24a, FR25, FR40

### Epic 3: Results, Sharing & Re-Entry Loop
완료된 결과가 SSR 공개 결과 페이지, 이미지 다운로드, 공유 링크, social share, community stats, full ranking/full bracket modal, Play again으로 이어져 바이럴 재진입 루프를 만든다. 댓글과 신고의 entry surface, empty/locked/unavailable 상태는 포함하되, 실제 댓글 작성/신고/moderation mutation은 Epic 6에서 구현한다. Stories should sequence basic shareability before expanded ranking/modal depth.
**FRs covered:** FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35, FR35a, FR35b, FR35c

### Epic 4: Creator Bracket Pack Composer
인증된 제작자가 YouTube URL, 이미지 URL, 로컬/배치 업로드, 시딩, 부전승 preview, 공개/비공개 설정을 통해 Bracket Pack을 만들고 공개 URL을 받을 수 있다. Auth는 creation/publish gate로만 도입하며 anonymous browse/play/share는 유지한다. Publish completion은 public discovery와 SEO path로 연결된다. Creator-generated Bracket Pack은 Epic 1에서 마련한 public content model과 visibility path를 재사용한다.
**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR12a, FR13, FR13a, FR14, FR14a, FR15, FR17, FR47, FR48

### Epic 5: Streamer Live Mode & Twitch Chat Voting
스트리머가 Matchup 화면에서 Live Mode를 켜고 Twitch 채팅 `!A/!B` 투표를 실시간 집계해 방송 중 표시할 수 있다. This remains separate because Twitch OAuth/EventSub/Realtime introduces integration risk beyond local play.
**FRs covered:** FR37, FR38

### Epic 6: Community Comments, Reports & Moderation
방문자가 결과 페이지에 댓글을 남기고 콘텐츠를 신고할 수 있으며, 관리자는 신고/DMCA를 검토해 공개, 검색, 광고, 댓글 상태를 일관되게 조치할 수 있다. 이 Epic은 public route visibility policy를 확장/완성하고, noindex/cache/ad eligibility side effect를 moderation action과 연결한다. Comments are grouped here because anonymous public writing must ship with reporting, rate-limit, and moderation controls.
**FRs covered:** FR36, FR44, FR45, FR46

### Epic 7: Deferred Growth & Monetization Backlog
MVP 이후 재방문, 스트리머 관리, 검색, 즐겨찾기, 히스토리, 광고/프리미엄/스폰서 기능을 확장할 수 있다. 이 Epic은 구현 우선순위가 아니라 MVP 범위 오염을 막는 Post-MVP 후보 묶음이다. Story creation should mark these as deferred candidates unless the user explicitly pulls them into scope.
**FRs covered:** FR4, FR6, FR7, FR16, FR41, FR49, FR50, FR51, FR52

## Epic 1: Public Discovery & Browse

방문자와 스트리머가 로그인 없이 공개 Bracket Pack을 발견하고, 홈의 Popular Brackets와 카테고리/태그 탐색을 통해 즉시 플레이 후보를 고를 수 있다. Bracket Pack 카드/상세는 item count, play count, live count, preview suitability를 보여줘 스트리머가 방송 적합성을 빠르게 판단하게 한다. 이 Epic은 discovery에 필요한 최소 seeded curated Bracket Pack data와 public visibility read path를 포함하되, 개인화/For You 온보딩이나 full moderation/admin foundation까지 포함하지 않는다.

### Story 1.1: Initial Cloudflare React Router Scaffold

As a developer,
I want the application initialized from the approved Cloudflare React Router scaffold,
So that all later product stories build on the correct framework, runtime, and project boundaries.

**Acceptance Criteria:**

**Given** the architecture specifies React Router 7 framework mode on Cloudflare Workers
**When** the initial project scaffold is created
**Then** it uses the approved Cloudflare React Router scaffold path or an equivalent official React Router framework-mode setup adapted to the repository root
**And** it does not introduce Next.js, Vercel-only assumptions, a Node-only server runtime, GraphQL, or a broad public REST API.

**Given** the app uses configured routes
**When** the scaffold is aligned to the architecture
**Then** `app/routes.ts` is present as the route registration source of truth
**And** route file names and generated route types follow the initialized React Router/Cloudflare starter conventions.

**Given** the project will deploy to Cloudflare Workers
**When** base configuration is added
**Then** Cloudflare-compatible config such as Wrangler/Vite/React Router configuration is present as required by the selected scaffold
**And** server-side code added in this story uses Workers-compatible APIs.

**Given** later stories need shared architecture boundaries
**When** the initial source tree is prepared
**Then** base folders exist for `domain/`, `repositories/`, `services/`, `schemas/`, `features/`, `components/`, `styles/`, `utils/`, and `types/` as appropriate for the scaffold
**And** no product-specific database tables are created in this scaffold story.

**Given** the UI must use the existing design system
**When** base styles are wired
**Then** the app has a token entry derived from or importing `docs/design/colors_and_type.css`
**And** scaffold/default styling does not become a competing brand token source.

**Given** later stories need Supabase and other service configuration
**When** environment configuration is documented
**Then** `.env.example` or equivalent documents the expected Supabase/Cloudflare/PostHog variables without real secrets
**And** production secrets are not committed.

**Given** implementation agents start future stories
**When** they inspect the scaffold
**Then** the README or project notes identify React Router 7 framework mode, Cloudflare Workers, Supabase, and design-token constraints
**And** dependency installation/build commands are documented enough for local verification.

### Story 1.2: Public Bracket Pack Data Foundation

As a visitor,
I want public Bracket Pack data to exist in a consistent discoverable model,
So that I can browse real curated brackets without needing an account.

**Acceptance Criteria:**

**Given** the application needs public discovery content
**When** the initial Supabase migration is created
**Then** it defines only the tables needed for public discovery: `bracket_packs`, `bracket_entries`, categories/tags as needed by the chosen schema, and the join data required for category/tag filtering
**And** it does not create unrelated future tables for results, comments, live voting, moderation actions, billing, or creator analytics.

**Given** public Bracket Packs are loaded by browse routes
**When** a route fetches bracket data
**Then** the fetch uses repository/server boundary code that maps database `snake_case` rows to domain-shaped `camelCase` objects
**And** route modules do not contain raw Supabase query logic beyond trivial session/context setup.

**Given** a Bracket Pack can be public, private, or unavailable
**When** discovery routes request public content
**Then** a minimal public visibility read policy decides whether the content can be shown
**And** the policy is limited to read-time visibility for discovery, not full report/admin/moderation workflows.

**Given** the MVP requires curated discovery content
**When** seed data is applied
**Then** at least a small representative set of curated Bracket Packs exists across multiple MVP categories
**And** each seeded Bracket Pack includes title, slug, category, tags, thumbnail/reference image, entries, item count, play count placeholder, and live count placeholder.

**Given** public pages require SEO and cache safety later
**When** public Bracket Pack records are created
**Then** each record includes stable slug and visibility fields sufficient for SSR metadata and future cache/noindex behavior
**And** slugs are lowercase, hyphenated, human-readable, and unique within the relevant category scope.

**Given** implementation agents work from the architecture rules
**When** this story is implemented
**Then** code placement follows `domain/`, `repositories/`, `services/`, `schemas/`, and `routes/` boundaries
**And** new server-side dependencies are checked for Cloudflare Workers compatibility.

### Story 1.3: SSR Home Browse Page

As a visitor,
I want the home page to show popular Bracket Packs and clear category entry points,
So that I can quickly choose something to play or use on stream without logging in.

**Acceptance Criteria:**

**Given** public Bracket Pack seed data exists
**When** a visitor opens `/`
**Then** the home page renders through SSR with a "Popular Brackets" section and a "Browse by category" card grid
**And** the initial HTML contains the page title, description, and enough content for crawlers and non-JS clients to understand the page.

**Given** the Popular Brackets section renders
**When** public Bracket Packs have engagement data
**Then** it sorts cross-category by `trending_score DESC`, where `trending_score = plays_7d + (live_now_count * 10) + (share_clicks_7d * 5)`
**And** it limits the home section to at most 3 Bracket Packs per category when at least 3 categories have content.

**Given** Popular Brackets has insufficient engagement data during Cold Start
**When** the home loader selects content
**Then** the section label remains "Popular Brackets"
**And** ordering falls back to `is_curated DESC, created_at DESC` without introducing a separate "Trending Now" label or transition threshold.

**Given** the Browse by category section renders
**When** MVP categories are available
**Then** it shows a 5x2 card grid for K-pop, Anime, Gaming, Movies, Sports, Music, TV, Tech, Books, and Food
**And** each card includes category emoji, 16:9 placeholder or representative thumbnail, label, and link to `/categories/:categorySlug`.

**Given** a Bracket Pack appears on the home page
**When** the card is rendered
**Then** it shows the title, thumbnail/reference image, category, relevant tags, item count, total play count, current live streamer count, and a primary start/play action
**And** the card does not require authentication to open or start.

**Given** streamers need to judge broadcast suitability quickly
**When** a Bracket Pack is shown prominently
**Then** the UI includes clear preview suitability signals such as item count, total play count, current live streamer count, and broadcast-friendly status where data exists
**And** these signals are derived from the Bracket Pack model rather than hardcoded per card.

**Given** the home page fetches public Bracket Packs
**When** the loader executes
**Then** it uses the bracket repository and public visibility read policy from Story 1.2
**And** private or unavailable packs are excluded from visible sections.

**Given** public home traffic may spike
**When** the home route returns a response
**Then** route headers are set through a shared helper suitable for public cache behavior
**And** cache behavior does not bypass the public visibility decision.

**Given** the home page is loading, empty, or fails to load one section
**When** the UI renders that state
**Then** it shows Streamer Native-compatible skeleton, empty, or retry/fallback states
**And** the state copy is short, functional, and does not block other available sections.

**Given** the implementation uses project visual rules
**When** Home/Browse UI is built
**Then** it imports or derives styles from `docs/design/colors_and_type.css` and relevant `docs/design` Streamer Native references
**And** it does not hardcode brand colors in component code.

### Story 1.4: Category and Tag Browse Routes

As a visitor,
I want to browse Bracket Packs by category and tag,
So that I can find brackets that match my fandom or stream topic quickly.

**Acceptance Criteria:**

**Given** public categories and tags exist
**When** a visitor uses the Home/Browse category navigation
**Then** the visitor can navigate to category-specific browse routes without signing in
**And** MVP does not introduce a separate `/brackets` collection route unless a later information architecture story explicitly adds it.

**Given** a visitor selects a category
**When** they open `/categories/:categorySlug`
**Then** the page shows only public Bracket Packs assigned to that category
**And** the page includes SSR title, description, canonical URL, and route metadata derived from the category.

**Given** a visitor opens a category page
**When** the category content renders
**Then** the page provides exactly two tabs: Popular and New
**And** Popular sorts by `trending_score DESC` while New sorts by `created_at DESC`.

**Given** the Popular tab ranks category content
**When** at least two Bracket Packs were created within the last 30 days
**Then** the top 10 results include at least 2 recently created Bracket Packs where possible
**And** the quota is skipped when fewer than 2 eligible recent Bracket Packs exist.

**Given** a category contains tags
**When** the visitor selects a tag within that category
**Then** the list filters to public Bracket Packs matching that category/tag combination
**And** the UI clearly shows the active category and tag filters
**And** the URL updates to include the selected tag query so direct access and sharing render the same SSR-filtered result.

**Given** the visitor changes a tag filter
**When** the filter request is made
**Then** only the grid area is replaced through server fetch with skeleton UI
**And** the full page is not reloaded.

**Given** MVP tag support is scoped
**When** a category other than K-pop renders
**Then** the tag filter bar is omitted unless that category has approved tag data
**And** K-pop initially supports All, aespa, BLACKPINK, NewJeans, IVE, TWICE, ITZY, LE SSERAFIM, (G)I-DLE, BTS, and Stray Kids.

**Given** a category or tag has no matching public Bracket Packs
**When** the filtered route renders
**Then** the page shows an empty state with a broader category or home recovery action
**And** it does not show private, unavailable, or unindexable Bracket Packs.

**Given** an invalid category slug is requested
**When** the loader cannot find the category
**Then** the route returns the appropriate not-found response
**And** the user-facing state is short, functional, and consistent with the app error treatment.

**Given** category/tag browse routes fetch public content
**When** loaders execute
**Then** they use the same repository, visibility read policy, metadata helper, and route headers helper established for public discovery
**And** filtering logic is not duplicated inside UI components.

**Given** users browse from mobile devices
**When** the category/tag UI renders below desktop width
**Then** category navigation collapses into a drawer or horizontal category rail
**And** cards remain readable without overlapping text or clipped controls.

### Story 1.5: First-Visit Interest Onboarding

**Status:** Removed from MVP scope by the 2026-05-13 Home/Browse correct-course decision.

As a product team,
I want first-visit personalization and the For You rail to remain out of MVP,
So that discovery stays aligned with the social sharing loop and avoids unnecessary onboarding friction.

**Acceptance Criteria:**

**Given** a visitor first opens the home page
**When** no prior preference exists
**Then** no interest onboarding modal appears
**And** the visitor can browse Popular Brackets and Browse by category without making a preference choice.

**Given** implementation agents work on Epic 1
**When** they inspect browse requirements
**Then** they do not add a For You rail, `sodo:interests`, "Personalize" navigation, or `user_preferences` persistence for MVP
**And** any future personalization work must be handled by a new Growth story.

**Given** category discovery is needed in MVP
**When** the visitor wants a specific fandom or topic
**Then** category pages and the K-pop tag filter provide the discovery path
**And** this path does not require onboarding, login, or local interest storage.

## Epic 2: Playable Tournament Experience

플레이어가 계정 없이 1v1 브라켓을 시작하고, 키보드/클릭으로 선택하며, undo/restart/local resume을 포함해 토너먼트를 완료할 수 있다. OBS screen capture 안정성과 향후 Live Mode를 위한 Matchup layout/state boundary도 이 플레이 경험 안에서 보장한다.

### Story 2.1: Pure Tournament Engine with Byes

As a player,
I want the system to create a valid 1v1 tournament from the selected bracket size,
So that I can play a fair Save One Drop One bracket even when the available entries are not a perfect power of two.

**Acceptance Criteria:**

**Given** a Bracket Pack has a list of playable entries
**When** the tournament engine receives entries, seeding mode, and a selected bracket size
**Then** it returns a deterministic tournament plan made of 1v1 matches and rounds
**And** the engine is implemented as a pure TypeScript domain module with no React, Supabase, localStorage, browser API, request, or response dependencies.

**Given** the selected bracket size is smaller than the total available entries
**When** the Bracket Pack uses Preset seeding
**Then** the engine selects entries by preset rank from 1 through the selected bracket size cutoff
**And** entries outside the cutoff are excluded from that run.

**Given** the selected bracket size is smaller than the total available entries
**When** the Bracket Pack uses Randomized seeding
**Then** the engine accepts a pre-randomized entry order or random seed from the caller and selects the required number of entries from that randomized order
**And** separate new runs may produce different entry selection or matchup order.

**Given** tournament engine purity is required
**When** randomized seeding is used
**Then** hidden randomness is not generated inside the engine
**And** the caller is responsible for producing and storing the random seed or shuffled order needed to replay, persist, or reconstruct the run.

**Given** the selected bracket size is a non-power-of-two custom size such as `2NN`
**When** the tournament plan is created
**Then** the engine assigns byes so the tournament still resolves through valid 1v1 matchups
**And** bye advancement is explicit in the tournament plan so UI and result reconstruction can explain it later.

**Given** the selected bracket size is greater than the number of playable entries
**When** the tournament engine validates input
**Then** it rejects the plan with a typed domain error
**And** the error is specific enough for the start flow to show a user-correctable message.

**Given** the Bracket Pack has fewer than two playable entries
**When** the tournament engine validates input
**Then** it rejects the plan as unplayable
**And** no partial tournament state is created.

**Given** the same entries, selected size, and seeding input are provided
**When** the tournament engine is called multiple times
**Then** it produces the same tournament plan
**And** randomness, if desired for a run, is supplied before calling the pure engine rather than generated inside hidden side effects.

**Given** tournament behavior is core domain logic
**When** this story is implemented
**Then** unit tests cover power-of-two sizes, non-power-of-two custom sizes, byes, too-few entries, selected size larger than available entries, Preset cutoff behavior, Randomized caller-supplied order/seed behavior, and deterministic output
**And** tests live with the tournament domain module.

**Given** later stories need undo, restart, result reconstruction, and local persistence
**When** the tournament plan shape is defined
**Then** it includes stable match, round, entry, and bye identifiers sufficient for those future stories
**And** it does not include UI-only state such as hover, focus, modal, or animation flags.

### Story 2.2: Tournament Size Selection Start Flow

As a player,
I want to choose how large a tournament run to play before the first matchup,
So that I can control the session length without reviewing every entrant.

**Acceptance Criteria:**

**Given** a visitor opens `/play/:bracketSlug` for a public Bracket Pack
**When** the route loads
**Then** it fetches the Bracket Pack through the repository and public visibility read policy
**And** it does not require authentication to start play.

**Given** the Bracket Pack has at least four playable entries
**When** the start flow renders
**Then** it shows a tournament size selection surface instead of a full entrant list
**And** the player can start a run after selecting a valid size.

**Given** the Bracket Pack has N playable entries
**When** size options are generated
**Then** the UI offers only valid choices from 4, 8, 16, 32, 64, 128, 256, and one custom non-power-of-2 size equal to N where applicable
**And** options larger than N are omitted.

**Given** the Bracket Pack has fewer than four playable entries
**When** the start flow loads
**Then** it shows a short functional insufficient entries state
**And** no tournament run is created.

**Given** the Bracket Pack uses Preset seeding
**When** size options are shown
**Then** the default selected size is the maximum valid size
**And** selecting a smaller size explains that the run uses the creator's top-ranked cutoff for that size.

**Given** the Bracket Pack uses Randomized seeding
**When** size options are shown
**Then** the default selected size is 32 if at least 32 entries are playable, otherwise the maximum valid size
**And** the start flow creates or stores the randomized order/seed for that run before calling the pure tournament engine.

**Given** a selected custom size is not a power of two
**When** the player starts that run
**Then** the start flow allows it as a valid non-power-of-2 size
**And** it communicates that automatic byes may be used.

**Given** the Bracket Pack is unavailable
**When** the start flow loads
**Then** it shows a short functional unavailable state
**And** no tournament run is created.

**Given** users may be on mobile or keyboard-only desktop
**When** they interact with the size selection surface
**Then** all options and the start action are reachable by keyboard and usable by touch
**And** focus is visible and screen reader labels describe the selected size and resulting run.

### Story 2.3: Matchup Selection Loop

As a player,
I want to choose between two entries each match,
So that I can progress through the tournament quickly and clearly.

**Acceptance Criteria:**

**Given** the player has started a tournament run
**When** the first playable matchup is available
**Then** the Matchup screen shows exactly two contestant cards for the current match
**And** each card shows the entry name, optional group/info, and a media renderer for image or YouTube-backed media.

**Given** a contestant card renders media
**When** the media is an image or YouTube-backed entry
**Then** the card preserves stable media dimensions and keeps the selection action available even if the media has not loaded
**And** the media renderer is separated from tournament selection logic so future media policy changes do not rewrite the match engine.

**Given** an entry uses YouTube media
**When** the contestant card renders
**Then** it uses the stored title, thumbnail, and optional start second from the Bracket Pack entry
**And** the media renderer preserves stable card dimensions whether showing a thumbnail, playable embed, or fallback state.

**Given** the current match is displayed
**When** the player clicks/taps a contestant card or selection action
**Then** the selected entry advances according to the tournament plan
**And** the UI transitions to the next playable match without requiring a page reload.

**Given** the player is using keyboard controls
**When** they press `A`
**Then** the left/top contestant is selected
**And** when they press `D`, the right/bottom contestant is selected.

**Given** YouTube embeds can capture focus or keyboard input
**When** the player uses `A` / `D` shortcuts
**Then** matchup shortcuts do not conflict with focused media controls
**And** each card still provides a non-embed selection target.

**Given** the player advances through matches
**When** the Matchup screen updates
**Then** it shows the current round, match number, progress indicator/dots, and bracket title
**And** progress text is also available to screen readers as text such as "Round 2, match 3 of 8."

**Given** a round includes automatic byes
**When** the tournament plan advances through bye-only positions
**Then** the UI skips non-playable bye decisions and lands on the next real 1v1 matchup
**And** no blank contestant card is shown for a bye.

**Given** the Matchup screen is running on desktop
**When** keyboard hints are shown
**Then** the UI presents the A/D shortcut hint without crowding the contestant cards
**And** the shortcuts do not trigger while focus is inside text inputs or modal controls.

**Given** the Matchup screen is running on mobile
**When** the two contestant cards render
**Then** the layout uses stacked or full-height split presentation with large tap targets
**And** A/D keyboard hints are de-emphasized or omitted.

**Given** entry media is loading or fails
**When** a contestant card renders
**Then** loading and failure states preserve stable card dimensions
**And** the entry name remains visible so the player can still make a choice.

**Given** the player chooses rapidly
**When** a selection is made
**Then** duplicate input is ignored until the next match is ready
**And** the perceived transition stays within the performance targets for local interaction.

**Given** this Matchup layout will later support Streamer Live Mode
**When** the layout and state boundaries are implemented
**Then** the core A/B play area remains usable without Live Mode
**And** the code leaves a clear extension point for a future live voting panel without introducing Twitch or realtime behavior in this story.

**Given** streamers may screen-capture the Matchup screen
**When** the screen is viewed at 1920x1080
**Then** the core A/B matchup, bracket title, and progress state fit without clipping or scrollbars
**And** labels remain readable at 1280x720, 1920x1080, and 2560x1440 viewport scales.

**Given** the Matchup UI is implemented
**When** automated and manual accessibility checks run
**Then** the core choice loop is completable with keyboard only
**And** focus indicators, card labels, shortcut behavior, and screen reader progress text meet the UX accessibility requirements.

**Given** implementation agents build Matchup cards, media rendering, progress, and keyboard hints
**When** visual implementation begins
**Then** they inspect `docs/design/Save One Drop One.html` and the Matchup portions of `docs/design/theme-streamer.jsx`
**And** the layout follows Streamer Native patterns without hardcoded brand colors.

### Story 2.4: Undo and Restart Controls

As a player,
I want to undo a recent choice or restart the run,
So that I can recover from mistakes without leaving the bracket.

**Acceptance Criteria:**

**Given** a tournament run is on its first playable match
**When** the Matchup toolbar renders
**Then** the Undo control is visible but disabled or clearly unavailable
**And** its disabled state is accessible to screen readers.

**Given** the player has completed at least one playable match
**When** they activate Undo
**Then** the most recent playable choice is reversed and the previous matchup is restored
**And** the tournament state, progress indicator, and completed match history are updated consistently.

**Given** the previous advance included automatic byes
**When** Undo restores the previous playable matchup
**Then** bye advancement state is also restored correctly
**And** the user is not placed on a non-playable bye-only decision.

**Given** the player activates Restart
**When** they confirm the restart action
**Then** the current run is reset to the beginning using the same selected tournament size
**And** for Preset seeding the same cutoff/order is reused.

**Given** the current run uses Randomized seeding
**When** the player confirms Restart
**Then** the current run is discarded and a new randomized order/seed is created for the restarted run
**And** the new order/seed is persisted as the active run state so future Resume continues the restarted run.

**Given** Undo or Restart is activated from keyboard
**When** the player tabs to the controls and presses Enter or Space
**Then** the action works without pointer input
**And** focus returns to a sensible control or matchup card after the state changes.

**Given** Restart is destructive to current progress
**When** the player activates Restart
**Then** a confirmation state is shown before clearing progress
**And** cancellation returns the player to the current matchup with no state loss.

**Given** controls render in desktop, mobile, and 1920x1080 screen capture contexts
**When** the toolbar is displayed
**Then** Undo and Restart remain reachable without covering contestant media or progress text
**And** toolbar layout does not introduce scrollbars or clipping in OBS-sized viewports.

**Given** the player repeatedly clicks or triggers controls rapidly
**When** Undo or Restart is already processing
**Then** duplicate actions are ignored or debounced
**And** tournament state remains valid.

### Story 2.5: Local Progress Persistence and Resume

As a returning player,
I want my in-progress tournament to resume after refresh or revisiting the bracket,
So that I do not lose progress during a long run.

**Acceptance Criteria:**

**Given** a player starts a tournament run
**When** the run state changes through start, selection, undo, or restart
**Then** the active run is saved to localStorage under a versioned key namespaced by Bracket Pack, such as `sodo:play:{bracketPackId}`
**And** the saved state includes schema version, bracketPackId, selected tournament size, seeding mode, active random order/seed when applicable, current round/match position, remaining matches, completed matches, selected entry IDs, and updatedAt.

**Given** the player refreshes the page during an incomplete run
**When** `/play/:bracketSlug` loads again
**Then** the app detects the incomplete saved state for that Bracket Pack
**And** it shows a Resume / Restart choice before entering the next matchup.

**Given** the player chooses Resume
**When** the saved state is valid and compatible with the current Bracket Pack
**Then** the tournament continues from the saved current matchup
**And** Randomized runs reuse the saved random order/seed instead of generating a new one.

**Given** the player chooses Restart from the resume prompt
**When** the new run starts
**Then** the old incomplete state is discarded
**And** Preset runs reuse the selected/default cutoff while Randomized runs create and persist a new random order/seed.

**Given** saved state has an unknown schema version, corrupted JSON, missing entries, or no longer matches the current Bracket Pack
**When** the app validates local progress
**Then** it does not load the corrupted state
**And** it offers a clear restart path without crashing.

**Given** localStorage is unavailable or write fails
**When** the player starts or advances a run
**Then** the player can continue the current in-memory run
**And** the UI shows a short functional warning that refresh recovery is unavailable.

**Given** a run reaches completion
**When** the final choice is made and the app transitions toward results
**Then** the incomplete local progress state is cleared or marked complete
**And** a stale resume prompt is not shown on later visits.

**Given** multiple Bracket Packs are played on the same device
**When** local progress is saved
**Then** each Bracket Pack uses an isolated key
**And** one bracket's resume state does not overwrite another bracket's run.

**Given** local persistence is domain-sensitive behavior
**When** this story is implemented
**Then** local play state serialization, validation, migration, and clearing are handled through a dedicated module
**And** route or UI components do not hand-roll localStorage parsing in multiple places.

## Epic 3: Results, Sharing & Re-Entry Loop

완료된 결과가 SSR 공개 결과 페이지, 이미지 다운로드, 공유 링크, social share, community stats, full ranking/full bracket modal, Play again으로 이어져 바이럴 재진입 루프를 만든다. 댓글과 신고의 entry surface, empty/locked/unavailable 상태는 포함하되, 실제 댓글 작성/신고/moderation mutation은 Epic 6에서 구현한다. Stories should sequence basic shareability before expanded ranking/modal depth.

### Story 3.1: Result Persistence on Tournament Completion

As a player,
I want my completed tournament result to be saved as a shareable result,
So that I can revisit, share, and let others replay from my outcome.

**Acceptance Criteria:**

**Given** a player completes the final match of a tournament run
**When** the final selection is made
**Then** the app creates a completed `play_result` record through a server action or equivalent route boundary
**And** it does not persist anonymous in-progress match-by-match state before completion.

**Given** a completed result is saved
**When** the result payload is persisted
**Then** it stores the Bracket Pack reference, selected tournament size, seeding mode, random order/seed when applicable, champion entry, completed match path, final bracket snapshot/version, startedAt, completedAt, and derived timing stats
**And** it stores enough data to reconstruct the viewer's result page even if Bracket Pack entries are later edited.

**Given** the result comes from an anonymous player
**When** the result is saved
**Then** no account is required
**And** the saved result does not require personally identifying information.

**Given** the Bracket Pack or entries have changed since the run started
**When** the completed result is saved
**Then** the result stores a snapshot of the relevant entry names, media references, and matchup path used in that run
**And** the result page can render the original completed outcome.

**Given** a completed result affects community aggregate stats
**When** the result is saved successfully
**Then** per-entry aggregate stats needed for community ranking are updated atomically or in the same reliable server flow
**And** repeated submission of the same local completion does not double-count if a client retries.
**And** the save flow uses a completed run identifier, client submission ID, or equivalent idempotency key to detect retries.

**Given** result saving fails due to validation, network, or server error
**When** the player reaches completion
**Then** the UI shows a recoverable error state with retry
**And** the completed local run data is not discarded until the result is saved or the player explicitly leaves.

**Given** the result is saved successfully
**When** the app receives the new result ID
**Then** it routes the player to `/results/:resultId`
**And** incomplete local progress for that Bracket Pack is cleared or marked complete so a stale resume prompt is not shown.

**Given** result persistence is implemented
**When** code is added
**Then** database access lives behind a result repository/server boundary
**And** action validation uses shared schemas and typed action responses rather than ad hoc route parsing.

### Story 3.2: SSR Public Result Page with Champion and Metadata

As a result viewer,
I want a public result page to render the champion and essential result context immediately,
So that shared links work for people and social crawlers without requiring client-side loading.

**Acceptance Criteria:**

**Given** a saved `play_result` exists
**When** a visitor opens `/results/:resultId`
**Then** the result page renders through SSR with the champion entry, Bracket Pack title, selected tournament size, completion timing, and basic result summary
**And** the page is viewable without authentication.

**Given** the result stores a snapshot of entries and matchup path
**When** the page renders
**Then** it uses the saved result snapshot for viewer outcome details
**And** it does not break if the original Bracket Pack has since been edited.

**Given** public result links may be shared to social platforms
**When** the result route renders initial HTML
**Then** it includes server-rendered title, meta description, canonical URL, `og:title`, `og:description`, and `og:image`
**And** `og:title` follows `[Champion name] wins [Bracket Pack title]!`, `og:description` includes the Bracket Pack play count where available, and the OG image uses the champion item image with a fallback if custom/generated image export is unavailable.

**Given** the result or parent Bracket Pack is private, unavailable, or removed
**When** the result route loader evaluates visibility
**Then** it uses the shared public visibility policy before metadata generation
**And** it renders a short unavailable state or not-found response without exposing moderation policy details.

**Given** result pages can receive viral traffic
**When** the route returns a public result response
**Then** route headers are set through a shared helper suitable for public cache behavior
**And** private, unavailable, or removed results are not cached as public visible content.

**Given** a result page is loaded by the original player immediately after completion
**When** the page renders
**Then** it can show context-aware primary actions for the owner/current session where local context exists
**And** it still renders a complete public result page if that local context is absent.

**Given** a result is missing or malformed
**When** `/results/:resultId` is requested
**Then** the route returns a functional not-found or unavailable state
**And** no client-side crash is required to recover.

**Given** visual implementation begins
**When** the Result page is built
**Then** implementers inspect the relevant `docs/design` Result references before styling
**And** champion hero, stats, and page layout use design tokens rather than hardcoded brand colors.

### Story 3.3: Result Sharing Actions and Play Again

As a result viewer,
I want to share a result or replay the same bracket,
So that the result becomes a re-entry point for myself and others.

**Acceptance Criteria:**

**Given** a public result page is visible
**When** the share action area renders
**Then** it includes actions to copy the result link and share or prepare sharing for X(Twitter), Reddit, and Discord
**And** each action uses the canonical result URL from the server-rendered route data.

**Given** a viewer activates Copy result link
**When** the copy succeeds
**Then** the UI provides a brief success state and screen-reader announcement
**And** the copied URL opens the same `/results/:resultId` page.

**Given** a viewer activates Copy result link and clipboard access fails
**When** the browser denies or does not support clipboard write
**Then** the UI provides a recoverable fallback state
**And** the page remains usable without losing result context.

**Given** a viewer selects a social share action
**When** the selected platform supports a direct share URL
**Then** the target receives the canonical result URL and appropriate share text
**And** when direct share is not reliably supported, the UI provides a copy/Web Share/fallback affordance without requiring Save One Drop One authentication.

**Given** the result is viewed immediately after the current player completed it
**When** primary actions are ordered
**Then** Copy result link and Save Image entry point are prioritized
**And** Play again remains available as a secondary action.

**Given** the result is viewed from someone else's shared link or without current completion context
**When** primary actions are ordered
**Then** Play again is prioritized
**And** sharing actions remain available.

**Given** a viewer chooses Play again
**When** they activate the CTA
**Then** they are routed to the same Bracket Pack's play start flow
**And** the route does not require authentication.

**Given** the result page includes Save Image
**When** the viewer activates Save Image
**Then** the action opens or routes into the Full Bracket Modal unified export flow from Story 3.6
**And** no separate champion-only image export flow is introduced.

**Given** share actions render on mobile and desktop
**When** the viewport changes
**Then** actions remain reachable, readable, and do not overlap champion or stats content
**And** touch targets meet the mobile target size requirement.

**Given** the result page layout renders
**When** Champion Hero is visible
**Then** Download image, Copy result link, X, Reddit, and Discord actions are integrated into the Champion Hero action area
**And** the page does not introduce a separate share section below stats.

**Given** share actions are implemented
**When** keyboard-only users navigate the result page
**Then** Copy, social share, Save Image, and Play again actions are reachable by Tab and operable with Enter or Space
**And** focus order matches the visual order of the action area.

### Story 3.4: Final Path and Community Summary Panels

As a result viewer,
I want to see how the champion won and how the community tends to vote,
So that the result feels debatable, replayable, and worth sharing.

**Acceptance Criteria:**

**Given** a public result page has a saved completed match path
**When** the result summary renders
**Then** it shows a Final Path or Final Eight panel summarizing the champion's route through the tournament
**And** the panel uses the saved result snapshot, not live mutable Bracket Pack entry data.

**Given** the completed run has fewer than eight final-path entries available
**When** the Final Path panel renders
**Then** it shows the available path without broken placeholders
**And** the copy remains clear for smaller tournament sizes.

**Given** the result has timing and run data
**When** stats render
**Then** the page shows available stats such as total time, selected tournament size, and path summary
**And** unavailable stats are omitted or shown as an insufficient-data state instead of fake values.

**Given** community aggregate stats exist for the Bracket Pack
**When** the Community Summary panel renders
**Then** it shows MVP aggregate highlights such as Most popular, Biggest upset, and Fastest run where data exists
**And** each value is derived from persisted aggregate/result data.

**Given** community aggregate stats are not yet sufficient
**When** the panel renders
**Then** it shows an insufficient-data state with short copy and a share/replay-oriented CTA
**And** it does not imply rankings are authoritative before the configured threshold is met.

**Given** a viewer wants deeper context
**When** the Final Path or Community Summary panel includes "View all N"
**Then** Final Path routes to the Full Bracket Modal story and Community Summary routes to the Full Community Ranking story
**And** those CTAs are hidden or disabled until the required data is available.

**Given** the result page is viewed on mobile
**When** the panels render
**Then** the page order is Champion Hero with share actions, "More in [category]", Stats/Final Path/Community Summary, then Comments
**And** panel content does not require horizontal scrolling.

**Given** the result page has a parent Bracket Pack category
**When** the page renders below the Champion Hero
**Then** it shows a "More in [category]" rail with 4 same-category Bracket Packs ordered by `trending_score DESC`
**And** the current `bracket_pack_id` is excluded from the rail.

**Given** the "More in [category]" rail loads
**When** same-category content is available
**Then** it can include curated and UGC Bracket Packs
**And** it includes a "See all in [category]" link to the category page.

**Given** screen reader users read the result page
**When** the panels are reached
**Then** headings and labels explain what each stat means
**And** purely visual paths or bars have equivalent text summaries.

### Story 3.5: Full Community Ranking View

As a result viewer,
I want to see how every entrant ranks in the community verdict,
So that I can compare my result against the broader audience.

**Acceptance Criteria:**

**Given** a result page has community aggregate data for its Bracket Pack
**When** the viewer selects "View all N" from the Community Summary panel
**Then** a Full Community Ranking overlay or modal opens
**And** it shows entrants ranked by community champion pick percentage in descending order.

**Given** the ranking view renders an entrant row
**When** data is available
**Then** the row shows rank, entrant media thumbnail or fallback, entrant name, optional group/info, percentage bar, and percentage value
**And** the row remains readable on mobile and desktop.

**Given** the current result snapshot includes the viewer's champion and runner-up
**When** those entrants appear in the ranking
**Then** the view marks them with "YOUR CHAMPION" and "YOUR RUNNER-UP" badges or equivalent labels
**And** if viewer selection data is unavailable, those badges are not rendered.

**Given** the community top-ranked entrant exists
**When** the ranking view renders
**Then** the community #1 entrant is clearly labeled
**And** the label is not conveyed by color alone.

**Given** the MVP ranking view supports filtering
**When** the view renders
**Then** it includes the `All entrants` tab as the only MVP tab
**And** Growth-only tabs such as My picks, By group, and Biggest upsets are not implemented in MVP.

**Given** the viewer searches by name or group
**When** they type in the ranking search field
**Then** the list filters by entrant name or group
**And** no matching results show a short empty state.

**Given** the Bracket Pack has more ranked entrants than the initial page size
**When** the viewer scrolls near the end or activates load more
**Then** additional rows load through cursor-based pagination
**And** the initial result route only needs to load the first page of ranking data.

**Given** aggregate data has not reached the configured sufficiency threshold
**When** the viewer opens the ranking view
**Then** the view shows an insufficient-data state with current play count, required count, early signal text where available, and one "Share this bracket" CTA
**And** it does not show "Notify me when ready" in MVP.

**Given** the ranking view is opened as a modal or overlay
**When** it opens and closes
**Then** focus is trapped while open and restored to the invoking "View all N" control on close
**And** Escape or a visible close control dismisses it.

**Given** ranking data is loading or fails to load
**When** the view renders
**Then** it shows skeleton/loading and recoverable error states
**And** errors do not break the underlying result page.

**Given** implementation agents build the Full Community Ranking view
**When** visual implementation begins
**Then** they inspect `docs/design/community-ranking/states.jsx` where available
**And** ranking rows, insufficient state, and modal behavior align with that reference unless a documented implementation constraint requires deviation.

### Story 3.6: Full Bracket Modal and Unified Bracket Image Export

As a result viewer,
I want to inspect and save the full tournament bracket,
So that I can understand the full path and share a complete visual result.

**Acceptance Criteria:**

**Given** a result page has a saved bracket snapshot and completed match path
**When** the viewer selects "View all N" from the Final Path panel or activates Save Image from the result actions
**Then** the Full Bracket Modal opens
**And** it uses the saved result snapshot rather than live mutable Bracket Pack data.

**Given** the Full Bracket Modal opens
**When** the bracket tree renders
**Then** it shows the full tournament bracket tree with rounds, matches, winner path, and champion
**And** non-power-of-2 runs with byes are represented without blank broken match cards.

**Given** the viewer's result path is available
**When** the bracket tree renders
**Then** the viewer's selected path is highlighted
**And** the highlight is also described through text or labels, not color alone.

**Given** the bracket tree is larger than the viewport
**When** the viewer interacts with the modal
**Then** zoom, drag/pan, zoom slider, plus/minus controls, and FIT reset are available
**And** the default view starts fit-to-screen.

**Given** the bracket has multiple rounds
**When** round filter chips render
**Then** the viewer can choose All rounds or specific round chips such as R128, R64, R32, R16, Q, S, and F where applicable
**And** selecting a round focuses that round while dimming non-selected rounds.

**Given** the viewer activates Save Image
**When** export begins
**Then** the UI shows a pending state and capture range overlay
**And** export uses a single client-side Canvas-based export module under the result feature area.

**Given** no round filter is selected for export
**When** the viewer saves an image
**Then** the default export range is Q-F where those rounds exist
**And** the output target is PNG 1080x1350 unless implementation constraints require a documented equivalent.

**Given** a round filter or focused range is selected
**When** the viewer saves an image
**Then** the export captures the selected range rather than a separate champion-only image
**And** the result page does not implement a second image export flow outside this modal/export module.

**Given** export succeeds
**When** the file is ready
**Then** the UI shows a success state with filename or resolution where available
**And** the viewer can download the image.

**Given** export fails due to media, canvas, browser, or memory constraints
**When** the failure occurs
**Then** the UI shows a recoverable failure state with "Try again"
**And** the modal remains open with the bracket still readable.

**Given** bracket entries include YouTube-backed media or external media
**When** the bracket image export is generated
**Then** export uses stored thumbnails, safe image references, or fallback artwork rather than attempting to capture live iframes/embeds
**And** export failure from unsupported media is handled with the recoverable failure state.

**Given** the modal is opened on keyboard or assistive technology
**When** it opens and closes
**Then** focus is trapped while open and restored to the invoking control on close
**And** zoom, FIT, round filters, Save Image, and close controls are reachable by keyboard.

**Given** the modal is rendered on mobile or desktop
**When** viewport size changes
**Then** controls remain reachable without covering critical bracket content
**And** the modal avoids incoherent text overlap or clipped controls.

**Given** implementation agents build the Full Bracket Modal
**When** visual implementation begins
**Then** they inspect `docs/design/full-bracket/states.jsx` where available
**And** zoom controls, round chips, path highlight, and Save Image states align with that reference unless a documented implementation constraint requires deviation.

### Story 3.7: Comments and Report Entry Surfaces on Result Page

As a result viewer,
I want to see where discussion and reporting will happen,
So that the result page is ready for community interaction and safety workflows without shipping unsafe write actions early.

**Acceptance Criteria:**

**Given** a public result page renders
**When** the page layout includes community sections
**Then** it reserves a comments section surface with loading, empty, locked, and unavailable display states
**And** it does not implement comment submission in this story.

**Given** comments are not yet enabled or no comments exist
**When** the comments section renders
**Then** it shows short functional copy explaining the current state
**And** the state does not block result sharing or Play again actions.

**Given** a result, Bracket Pack, or comments area is unavailable or locked by visibility policy
**When** the result page renders
**Then** the comments surface reflects the locked/unavailable state
**And** it does not reveal moderation policy details.

**Given** a public result page renders
**When** the safety actions area is shown
**Then** it includes a report entry point or placeholder connected to the future Epic 6 reporting workflow
**And** it does not submit reports or create moderation records in this story.

**Given** a viewer activates a not-yet-enabled comments or report action
**When** the feature is deferred to Epic 6
**Then** the UI either hides the inactive control or shows a non-blocking unavailable state
**And** it avoids dead buttons that appear functional but do nothing.

**Given** Epic 6 will implement comment/report mutations
**When** this story defines component and route boundaries
**Then** the comments/report surfaces are structured so Epic 6 can add form actions, validation, rate limiting, and moderation state without rewriting the result page layout
**And** no raw moderation or comment persistence logic is added prematurely.

**Given** keyboard and screen reader users reach the comments/report surfaces
**When** the result page is navigated
**Then** headings, section labels, locked states, and available controls are announced clearly
**And** focus order remains coherent after the primary result/share actions.

## Epic 4: Creator Bracket Pack Composer

인증된 제작자가 YouTube URL, 이미지 URL, 로컬/배치 업로드, 시딩, 부전승 preview, 공개/비공개 설정을 통해 Bracket Pack을 만들고 공개 URL을 받을 수 있다. Auth는 creation/publish gate로만 도입하며 anonymous browse/play/share는 유지한다. Publish completion은 public discovery와 SEO path로 연결된다. Creator-generated Bracket Pack은 Epic 1에서 마련한 public content model과 visibility path를 재사용한다.

### Story 4.1: Creator Auth Gate for Create Flow

As a creator,
I want to sign in only when I create or publish a Bracket Pack,
So that casual visitors can still browse, play, and share without account friction.

**Acceptance Criteria:**

**Given** a visitor is not authenticated
**When** they open `/create` or `/create/new`
**Then** the app prompts them to sign in with Google or Twitch before entering the creator flow
**And** the sign-in prompt clearly explains that login is required for creating Bracket Packs.

**Given** an unauthenticated visitor browses, plays, views a result, copies a result link, or uses Play again
**When** they use those flows
**Then** no login prompt is shown
**And** those anonymous flows continue to work independently of the creator auth gate.

**Given** the user chooses Google or Twitch sign-in
**When** the OAuth flow completes successfully
**Then** the user returns to the intended create route
**And** the app can identify them as the creator for saved Bracket Packs.

**Given** OAuth is denied, cancelled, or fails
**When** the user returns to the app
**Then** the create flow shows a short recoverable error state
**And** the user can retry with Google or Twitch.

**Given** Supabase Auth is used
**When** auth helpers are implemented
**Then** auth/session logic lives in server/service boundaries consistent with the architecture
**And** service-role credentials are never exposed to browser code.

**Given** Create Bracket UI is implemented around the auth gate
**When** the sign-in sheet, blocked state, or post-login transition is designed
**Then** implementers first inspect `docs/design/Create Bracket.html` and align the create-entry visual treatment with that reference where applicable
**And** they do not invent a separate visual language for the creator flow.

### Story 4.2: Create Composer Shell from Design Reference

As a creator,
I want a single-page composer for building a Bracket Pack,
So that I can add entries, edit settings, and understand publish readiness in one focused workspace.

**Acceptance Criteria:**

**Given** an authenticated creator opens `/create/new`
**When** the composer route renders
**Then** it shows a single-page Bracket Pack composer rather than a multi-step wizard
**And** the layout follows `docs/design/Create Bracket.html` as the primary implementation reference.

**Given** the composer shell is visible
**When** the creator starts a new Bracket Pack
**Then** the page provides the core regions represented in `docs/design/Create Bracket.html`, including title/context area, smart paste/intake area, editable entry queue, settings or detail rail, preview/readiness area, and publish action area
**And** naming and arrangement should stay close to the design reference unless implementation constraints require a documented deviation.

**Given** the creator has not added entries yet
**When** the composer renders its initial state
**Then** it shows the empty-state treatment from `docs/design/Create Bracket.html` or the closest matching state in that file
**And** the empty state directs the creator toward smart paste, image upload, or manual entry intake.

**Given** the creator edits composer data
**When** fields or entries change
**Then** the shell exposes an autosave/status placeholder or draft state area consistent with `docs/design/Create Bracket.html`
**And** actual persistence can remain local/client draft until later stories add publish behavior.

**Given** the composer shell is implemented
**When** styling and component structure are built
**Then** implementers inspect `docs/design/Create Bracket.html` before coding the layout
**And** color, typography, spacing, surfaces, button hierarchy, and disabled states use the project design tokens rather than hardcoded visual values.

**Given** the composer is viewed on desktop or tablet
**When** the layout renders
**Then** the primary intake/entry queue and settings/readiness areas remain visible and usable according to the design reference
**And** controls do not overlap or depend on hover-only behavior.

**Given** the composer is viewed on mobile
**When** the route renders
**Then** the page remains usable with stacked sections or an equivalent responsive adaptation
**And** text and controls do not clip, overlap, or require horizontal scrolling.

**Given** implementation agents add future intake/settings/publish behavior
**When** those stories are implemented
**Then** they extend this shell instead of creating parallel create-flow layouts
**And** shared composer state is owned in the create feature area, not scattered across unrelated route modules.

### Story 4.3: Smart Paste for YouTube URLs and Text Entries

As a creator,
I want to paste YouTube URLs or plain text into the composer,
So that I can build a Bracket Pack entry queue quickly without manual data entry for every item.

**Acceptance Criteria:**

**Given** the authenticated creator is using the composer from Story 4.2
**When** they paste one or more lines into the smart paste area
**Then** each line is parsed as either a YouTube URL or plain text entry candidate
**And** the resulting entries are added to the editable entry queue shown in `docs/design/Create Bracket.html`.

**Given** a pasted line is a supported YouTube URL
**When** parsing succeeds
**Then** the app extracts or resolves the title, thumbnail, video identifier, and optional start second where present
**And** the entry is added with YouTube-backed media metadata suitable for later Matchup rendering.

**Given** a pasted YouTube URL includes a timestamp or start parameter
**When** metadata is stored
**Then** the start second is preserved on the entry
**And** the creator can still edit the entry title or media details later.

**Given** YouTube parsing fails due to quota, unsupported URL shape, network error, missing thumbnail, or provider failure
**When** the composer handles the failure
**Then** it creates or preserves an editable incomplete entry with a short recoverable error state
**And** the creator can manually fill the title/media fields instead of losing the pasted line.

**Given** a pasted line is not a supported URL
**When** it is parsed
**Then** it is added as a plain text entry with the pasted text as the provisional title
**And** it is marked incomplete until media/source requirements are satisfied by later editing or intake stories.

**Given** multiple lines are pasted
**When** parsing is in progress
**Then** each line reports pending, success, or failure independently
**And** one failed line does not prevent successful lines from entering the queue.

**Given** smart paste can trigger external metadata requests
**When** the parser runs server-side or through a route action/resource route
**Then** requests are validated, rate-limited, and handled through a YouTube metadata service boundary
**And** provider API keys or secrets are not exposed to the browser.

**Given** smart paste UI and queue states are implemented
**When** implementers build pending/success/error row treatments
**Then** they first inspect `docs/design/Create Bracket.html` and match its row, status, and action patterns where available
**And** they do not create a separate visual grammar for pasted entries.

**Given** the creator uses keyboard or screen reader navigation
**When** paste results appear in the entry queue
**Then** new entries, parse failures, and editable fields are reachable and understandable without pointer input
**And** status changes are announced or exposed in accessible text.

### Story 4.4: Image URL and Local/Batch Upload Intake

As a creator,
I want to add images from URLs or local files,
So that I can build visual Bracket Pack entries quickly even when they are not YouTube-backed.

**Acceptance Criteria:**

**Given** the authenticated creator is using the composer
**When** they paste or enter a supported image URL
**Then** the composer adds or updates an entry with image-backed media metadata
**And** the entry appears in the queue using the visual row treatment from `docs/design/Create Bracket.html`.

**Given** an image URL is invalid, unreachable, blocked, or not renderable
**When** the composer validates or previews it
**Then** the affected entry shows a short recoverable error state
**And** the creator can replace the URL or choose another media source without losing the entry title.

**Given** the creator selects a local image file
**When** the file is uploaded
**Then** the app accepts only allowed image types and files at or below 10MB
**And** rejected files show a clear invalid type or over-size error before persistence.

**Given** the creator selects multiple local image files
**When** batch upload starts
**Then** the app supports up to 64 files in one batch
**And** each file reports pending, success, or failure independently.

**Given** a batch upload partially fails
**When** some files are accepted and others fail
**Then** successful files still create or update entries
**And** failed files show row-level recovery without cancelling the whole batch.

**Given** uploaded images are accepted
**When** the app stores or references them
**Then** storage behavior goes through the storage service boundary and configured Supabase Storage path
**And** browser code does not receive server-only storage credentials.

**Given** image URL and upload intake are implemented
**When** entry media is stored in composer state
**Then** it uses the same entry media model as YouTube-backed entries from Story 4.3
**And** future Matchup rendering can distinguish image-backed and YouTube-backed media without separate entry types.

**Given** intake actions can be abused
**When** image URL validation or file upload requests are submitted
**Then** server-side validation and shared rate limiting are applied where relevant
**And** user-facing errors remain short and recoverable.

**Given** implementers build upload buttons, image rows, pending states, or failure states
**When** they start implementation
**Then** they first inspect `docs/design/Create Bracket.html` for the expected composer visual pattern
**And** they keep row/action/status styling aligned with that reference.

**Given** the creator uses keyboard or assistive technology
**When** they upload files or fix failed image entries
**Then** upload controls, file errors, retry/replace actions, and row status labels are accessible without pointer-only interaction.

### Story 4.5: Entry Editing and Completion Validation

As a creator,
I want to edit entries and clearly see which ones are incomplete,
So that I can prepare a publishable Bracket Pack without guessing what is missing.

**Acceptance Criteria:**

**Given** entries exist in the composer queue
**When** the creator selects an entry
**Then** they can edit the entry name, media/source details, and optional group/info fields
**And** the editing surface follows the selected-entry treatment in `docs/design/Create Bracket.html`.

**Given** an entry is missing a required title
**When** the queue and detail rail render
**Then** the entry is marked incomplete with a title-missing state
**And** the publish readiness area counts it as blocking.

**Given** an entry is missing required media/source
**When** the queue and detail rail render
**Then** the entry is marked incomplete with a source/media-missing state
**And** the creator can fix it through smart paste, image URL, upload, or manual editing.

**Given** an entry has a recoverable media parse or upload error
**When** the entry is selected
**Then** the error is shown near the affected field or row
**And** the creator can retry, replace, or remove the failed media source.

**Given** the creator removes an entry
**When** deletion is confirmed or completed according to the design reference
**Then** the entry is removed from the queue and publish readiness updates immediately
**And** removing one entry does not corrupt other entries or settings.

**Given** the composer has fewer than four complete playable entries
**When** publish readiness is evaluated
**Then** publish is blocked with a short message explaining that at least four complete entries are required
**And** the disabled publish state is accessible.

**Given** the composer has four or more complete playable entries and no blocking validation errors
**When** publish readiness is evaluated
**Then** the publish action can become enabled subject to required bracket-level settings
**And** incomplete optional fields do not block publish.

**Given** entry validation state changes
**When** the creator edits fields, retries media, uploads files, or deletes rows
**Then** incomplete count, row badges, and publish readiness update without a full page reload
**And** state changes use the row/status patterns from `docs/design/Create Bracket.html`.

**Given** validation logic is implemented
**When** code is added
**Then** required-field validation is centralized in shared schemas or create-feature validation utilities
**And** publish actions do not reimplement conflicting validation rules.

**Given** keyboard and screen reader users edit entries
**When** they move between queue rows, detail fields, errors, and publish readiness
**Then** labels, error messages, selected row state, and disabled publish state are programmatically understandable
**And** row actions are operable without drag or hover-only controls.

### Story 4.6: Tournament Settings and Seeding Controls

As a creator,
I want to configure how my Bracket Pack is seeded and what run sizes players can choose,
So that the bracket plays as intended when viewers start a tournament.

**Acceptance Criteria:**

**Given** the creator opens the composer settings area
**When** tournament settings render
**Then** the UI follows the settings/readiness patterns in `docs/design/Create Bracket.html`
**And** it exposes seeding controls without creating a separate settings wizard.

**Given** the creator chooses Randomized seeding
**When** the Bracket Pack is played later
**Then** player runs can randomize entry selection/order according to the play start flow
**And** the composer communicates that randomized runs may differ each time.

**Given** the creator chooses Preset seeding
**When** Preset mode is active
**Then** the creator can reorder complete entries into a 1...N seed ranking
**And** later player run sizes use cutoff behavior from that preset order.

**Given** Preset reorder is implemented
**When** the creator changes entry order
**Then** the seed ranking updates visibly in the entry queue or settings area
**And** the reorder interaction has a keyboard-accessible alternative or fallback, not drag-only behavior.

**Given** the composer has N complete playable entries
**When** run size options are summarized
**Then** the composer shows the player-facing size options that will be available: 4, 8, 16, 32, 64, 128, 256, and one custom non-power-of-2 size equal to N where applicable
**And** options larger than N are not shown as playable.

**Given** N is not a power of two
**When** the custom non-power-of-2 size is included
**Then** the composer explains that automatic byes may apply
**And** it does not require a full visual bracket tree preview in this story.

**Given** Preset seeding is selected and the creator reviews a smaller run size
**When** cutoff behavior is described
**Then** the composer explains that smaller player-selected sizes use the top-ranked entries up to that size
**And** entries outside the cutoff remain part of larger run options where applicable.

**Given** the creator has fewer than four complete playable entries
**When** tournament settings render
**Then** run size options are unavailable or clearly blocked
**And** the composer explains that at least four complete entries are required before publishing/playing.

**Given** tournament settings are stored in composer state
**When** the creator changes seeding mode, order, or related settings
**Then** publish readiness updates immediately
**And** the data shape remains compatible with the tournament engine from Story 2.1.

### Story 4.7: Publish Bracket Pack with Visibility and Public URL

As a creator,
I want to publish or save my Bracket Pack with the right visibility,
So that I can share a public URL or keep the bracket private.

**Acceptance Criteria:**

**Given** the composer has a valid title, four or more complete playable entries, valid media, and valid tournament settings
**When** the creator activates Publish
**Then** the app validates the full Bracket Pack payload server-side
**And** invalid or stale client state returns typed field or form errors without creating a partial public Bracket Pack.

**Given** the creator chooses public visibility
**When** publish succeeds
**Then** the Bracket Pack is saved using the public content model and visibility path established in Epic 1
**And** it can appear in public discovery/category routes according to public visibility rules.

**Given** the creator chooses private visibility
**When** publish succeeds
**Then** the Bracket Pack is saved but not shown in public discovery/category routes
**And** public loaders respect the private state before metadata and cache behavior.

**Given** a Bracket Pack is published
**When** the save completes
**Then** the app provides the public bracket URL or private detail URL as appropriate
**And** the creator can copy the URL from the published state.

**Given** publish succeeds
**When** the completion state renders
**Then** the UI follows the published/completion treatment in `docs/design/Create Bracket.html` where available
**And** it includes a "Back to edit" or equivalent return action.

**Given** a slug is generated or edited for a public Bracket Pack
**When** the server saves it
**Then** the slug is lowercase, hyphenated, human-readable, unique within the required scope, and suitable for canonical URLs
**And** slug conflicts return a recoverable validation error.

**Given** entries include uploaded files, image URLs, and YouTube-backed media
**When** the Bracket Pack is saved
**Then** each entry persists enough media metadata for Matchup and Result rendering
**And** server-only credentials or provider secrets are not stored in public entry payloads.

**Given** publish actions can be abused
**When** publish is submitted
**Then** the action requires an authenticated creator, validates ownership/session, and applies shared rate limiting where relevant
**And** browse/play/share routes remain anonymous.

**Given** publish fails due to validation, auth, storage, provider, or server error
**When** the failure is returned
**Then** the composer keeps the creator's draft state intact
**And** the error is shown in the composer using short recoverable copy.

**Given** a creator-generated Bracket Pack is saved
**When** public discovery or play routes later load it
**Then** they use the same repository/domain shape as seeded curated Brackets
**And** implementation does not create a separate incompatible UGC bracket model.

## Epic 5: Streamer Live Mode & Twitch Chat Voting

스트리머가 Matchup 화면에서 Live Mode를 켜고 Twitch 채팅 `!A/!B` 투표를 실시간 집계해 방송 중 표시할 수 있다. This remains separate because Twitch OAuth/EventSub/Realtime introduces integration risk beyond local play.

### Story 5.1: Live Session Checkpoint Model

As a streamer,
I want Live Mode to create a durable session for the current bracket run,
So that chat voting can reconnect to the correct match without disrupting local play.

**Acceptance Criteria:**

**Given** a streamer is on the Matchup screen for a started tournament run
**When** they enable Live Mode
**Then** the app creates or resumes a `live_session` associated with the streamer, Bracket Pack, active run, and current match
**And** local matchup play continues to work even if Live Mode setup fails.

**Given** a live session exists
**When** the streamer advances matches locally
**Then** the session checkpoint can store the current match ID, round/match position, bracketPackId, and session status needed for vote context
**And** the checkpoint is durable enough to recover after a realtime reconnect.

**Given** Supabase Realtime is transient
**When** a client reconnects to a live session
**Then** it can fetch the persisted checkpoint before relying on broadcast messages
**And** missed broadcast messages are not treated as the source of truth.

**Given** Live Mode is not enabled
**When** a normal player uses the Matchup screen
**Then** no live session is required
**And** local play, undo, restart, and result completion continue without streamer session data.

**Given** a live session is created server-side
**When** persistence is implemented
**Then** raw database access lives in a session repository/server boundary
**And** route or feature code receives domain-shaped session data.

**Given** a session belongs to a streamer
**When** another user attempts to modify its checkpoint
**Then** the server rejects unauthorized updates
**And** service-role credentials are never exposed to the browser.

**Given** session state affects later Twitch voting
**When** the session model is defined
**Then** it includes fields sufficient for Twitch channel connection status, EventSub subscription identity, current match context, and reconnect status
**And** it does not store raw chat messages.

**Given** Live Mode UI is unavailable on mobile
**When** the Matchup screen is viewed below the supported desktop breakpoint
**Then** no Go Live control is shown
**And** the absence of Live Mode does not affect normal play.

### Story 5.2: Twitch Chat Collection OAuth Connection

As a streamer,
I want to connect my Twitch channel for chat collection,
So that Save One Drop One can count `!A` and `!B` votes from my stream chat.

**Acceptance Criteria:**

**Given** a streamer is signed in and has enabled Live Mode
**When** they choose to connect Twitch chat
**Then** the app starts a separate Twitch OAuth popup flow for chat collection
**And** it does not reuse or confuse this with Supabase Auth Twitch social login.

**Given** the Twitch chat collection OAuth flow starts
**When** Twitch consent is requested
**Then** the requested scope includes the required channel chat collection permission such as `channel:bot` according to the architecture contract
**And** the UI explains that the permission is for reading chat commands for Live Mode voting.

**Given** the OAuth popup completes successfully
**When** the app receives the callback
**Then** the server stores the streamer's Twitch channel identity, connection status, token expiry/refresh metadata where needed, and EventSub subscription identity when available
**And** bot/app tokens remain server-only.

**Given** the OAuth popup is blocked, cancelled, denied, or fails
**When** the Live Mode panel receives the outcome
**Then** it shows a short recoverable connection error state
**And** the streamer can retry without losing the local tournament run.

**Given** the streamer has connected Twitch chat before
**When** they enable Live Mode again
**Then** the app can reuse a valid existing connection or show reconnect if the connection is expired/revoked
**And** connection state is reflected in the live session.

**Given** the streamer connects a Twitch channel
**When** the connection is saved
**Then** only the owner streamer can manage or disconnect that channel connection
**And** other users cannot use the connection for their live sessions.

**Given** the connection setup needs Twitch EventSub
**When** the server creates or validates the EventSub subscription
**Then** it uses `channel.chat.message` only for MVP
**And** it does not implement IRC justinfan or YouTube chat integration.

**Given** the Live Mode panel shows OAuth states
**When** implementers build regular, oauth, connecting, connected, and disconnected states
**Then** they follow the Matchup/Streamer Native visual direction and keep the UI screen-capture-safe
**And** focus remains visible during OAuth/reconnect controls.

### Story 5.3: Twitch EventSub Webhook and Vote Aggregation

As a streamer,
I want Twitch chat votes to be counted accurately for the current match,
So that the broadcast can show reliable `!A` / `!B` audience preference.

**Acceptance Criteria:**

**Given** Twitch sends an EventSub request to `POST /api/twitch/eventsub`
**When** the resource route receives the request
**Then** it validates the Twitch EventSub HMAC signature before processing the body
**And** invalid signatures are rejected without updating votes or broadcasting messages.

**Given** the EventSub request is a verification/challenge request
**When** Twitch requires a challenge response
**Then** the route responds according to Twitch EventSub requirements
**And** no vote or chat broadcast is created for verification-only traffic.

**Given** the EventSub notification is not `channel.chat.message`
**When** the route processes it
**Then** the notification is ignored or handled as unsupported for MVP
**And** no IRC justinfan or YouTube chat pathway is introduced.

**Given** a valid `channel.chat.message` notification is received
**When** the message text starts with `!A` or `!B` case-insensitively as the command token
**Then** the server maps it to vote value `A` or `B` for the current live session match
**And** non-vote chat messages do not create vote rows.

**Given** a valid vote is parsed
**When** the vote is stored
**Then** the server upserts into `live_votes` with unique identity `(session_id, user_id, match_id)`
**And** a repeated vote by the same chat user for the same match overwrites the prior vote rather than double-counting.

**Given** a vote is stored successfully
**When** aggregate counts are fetched
**Then** the server counts votes grouped by `A` and `B` for the current `session_id` and `match_id`
**And** it broadcasts only aggregate counts to Supabase Broadcast channel `live-session:{session_id}`.

**Given** the server broadcasts a vote update
**When** the payload is sent
**Then** it includes event type, sessionId, matchId, voteA, voteB, sentAt, and version
**And** it does not include raw chat message text.

**Given** a valid chat message is received, whether it is a vote or not
**When** the Live Mode chat feed is enabled
**Then** the server may broadcast an ephemeral chat message payload to `live-session:{session_id}` for display
**And** raw chat messages are not persisted to any database table.

**Given** no active live session or current match checkpoint can be resolved
**When** a vote command is received
**Then** the server ignores or safely drops the vote with structured logging
**And** it does not create orphaned vote rows.

**Given** webhook traffic can spike or be abused
**When** EventSub requests are processed
**Then** validation, idempotency, and rate/abuse protections are applied where appropriate
**And** server failures return safe responses without exposing secrets or policy details.

**Given** this webhook runs on Cloudflare Workers
**When** implementation chooses libraries or APIs
**Then** HMAC verification and request parsing use Workers-compatible APIs
**And** Node-only dependencies are not introduced without explicit compatibility approval.

**Given** Twitch may retry or duplicate EventSub deliveries
**When** the same Twitch message or EventSub event is delivered more than once
**Then** duplicate deliveries do not create duplicate chat feed events or vote side effects beyond the intended last-vote-wins row
**And** the webhook uses Twitch event/message identity or an equivalent idempotency guard where available.

### Story 5.4: Streamer Live Mode Panel and Vote Display

As a streamer,
I want Live Mode to show chat connection and vote tally inside the Matchup screen,
So that I can run the bracket on stream while viewers see the current audience preference.

**Acceptance Criteria:**

**Given** a streamer is on a desktop Matchup screen
**When** Live Mode is available but not active
**Then** the toolbar or panel shows a Go Live entry point
**And** normal A/B local play remains the primary screen experience.

**Given** Live Mode is active
**When** the panel renders
**Then** it shows connection state such as regular, oauth, connecting, connected, no_votes, disconnected, or reconnecting
**And** the state copy is short, functional, and screen-capture-safe.

**Given** Twitch chat is connected for the live session
**When** the panel subscribes to `live-session:{session_id}`
**Then** it listens for vote summary broadcast events
**And** it initializes from the persisted session checkpoint before relying on realtime messages.

**Given** vote summary events arrive for the current match
**When** the panel receives them
**Then** it displays A vs B vote counts and percentages for the current contestants
**And** duplicate, delayed, or stale events for another match are ignored.

**Given** the current match has zero votes
**When** Live Mode is connected
**Then** the UI shows a no-votes state
**And** contestant-level percentage indicators are not rendered until at least one vote exists.

**Given** the realtime connection drops
**When** Live Mode becomes disconnected
**Then** the UI preserves the local matchup state and shows a reconnect state
**And** vote display can recover by refetching the session checkpoint and waiting for new broadcast events.

**Given** Live Mode panel is visible in OBS screen capture
**When** the viewport is 1920x1080
**Then** the panel, core A/B matchup, and progress state fit without clipping or scrollbars
**And** the panel does not cover contestant media or selection controls.

**Given** Live Mode is desktop-only
**When** the Matchup screen is viewed on mobile
**Then** Go Live and Live Mode panel are hidden
**And** normal player matchup UI remains usable.

**Given** keyboard users operate Live Mode controls
**When** they tab through Go Live, reconnect, and related panel controls
**Then** focus is visible and controls are operable with Enter/Space
**And** A/D match selection shortcuts remain reserved for matchup choice outside text/input contexts.

**Given** implementation agents build the panel
**When** they add UI states
**Then** they inspect `docs/design/Save One Drop One.html` and the Matchup Live Mode portions of `docs/design/theme-streamer.jsx` before implementation
**And** they follow the Matchup/Streamer Native visual direction and existing `docs/design` references
**And** they do not add web vote links or YouTube chat controls in MVP.

### Story 5.5: Live Mode Match Advance and Tally Reset

As a streamer,
I want vote counts to reset cleanly when I advance to the next match,
So that each matchup reflects only the current audience vote.

**Acceptance Criteria:**

**Given** Live Mode is connected and the streamer selects A or B for the current match
**When** the local tournament advances to the next playable match
**Then** the live session checkpoint is updated with the new current match ID and round/match position
**And** local play does not wait on realtime broadcast success to continue.

**Given** the current match changes
**When** the Matchup screen renders the next match
**Then** the visible vote tally resets immediately to zero for A and B
**And** the chat connection remains open.

**Given** new vote summary events arrive after match advance
**When** the panel receives an event for the previous match ID
**Then** the event is ignored for the visible tally
**And** no previous-match votes appear on the new match.

**Given** the streamer advances into a bye-only transition
**When** the tournament engine skips to the next playable 1v1 match
**Then** the checkpoint is updated to the next playable match only
**And** no vote tally is shown for non-playable bye positions.

**Given** checkpoint update fails due to network or server error
**When** the streamer advances locally
**Then** the local tournament continues
**And** the Live Mode panel shows a recoverable warning that vote context may be stale until reconnect or retry.

**Given** the streamer uses Undo while Live Mode is active
**When** the previous playable match is restored
**Then** the checkpoint is updated to that restored match
**And** the visible vote tally resets to zero rather than restoring prior votes.

**Given** the streamer uses Restart while Live Mode is active
**When** a new run begins
**Then** the live session checkpoint points to the new run/current match
**And** vote tally is cleared for the new run.

**Given** the panel announces match changes
**When** tally resets to no_votes
**Then** the UI communicates that the match changed and vote counter reset
**And** it does not imply the Twitch chat connection was lost.

**Given** implementation touches Matchup and Live Mode state together
**When** code is added
**Then** core tournament state remains owned by the Matchup/tournament modules
**And** Live Mode only observes match changes and updates checkpoints/broadcast context.

### Story 5.6: Live Chat Feed Display Without Persistence

As a streamer,
I want to see a lightweight live chat feed in Live Mode,
So that I can confirm the Twitch integration is active and react to chat without storing raw messages.

**Acceptance Criteria:**

**Given** Twitch EventSub receives valid chat messages for a connected live session
**When** the webhook broadcasts chat feed events
**Then** the Live Mode client can display recent chat messages in a read-only feed
**And** raw chat messages are not persisted to any database table.

**Given** the Live Mode panel subscribes to `live-session:{session_id}`
**When** chat message events arrive
**Then** it displays recent messages with available display name, message text, optional color, and sent time
**And** it tolerates duplicate, delayed, or missed realtime events.

**Given** a chat message is also a `!A` or `!B` vote
**When** it appears in the feed
**Then** the message may be displayed like other chat messages
**And** vote counting remains driven by the vote aggregation flow, not by client-side parsing.

**Given** chat feed is read-only
**When** the streamer views the feed
**Then** the UI does not provide a reply box or send-message control
**And** streamer and viewers continue chatting directly in Twitch.

**Given** the feed receives many messages quickly
**When** the UI updates
**Then** it keeps only a bounded recent-message window suitable for OBS display
**And** the feed does not cause the Matchup screen to resize, scroll unexpectedly, or cover contestant cards.

**Given** the realtime connection disconnects
**When** chat events stop arriving
**Then** the feed shows a short disconnected/reconnecting state
**And** existing local play and vote tally recovery behavior continue independently.

**Given** chat messages may contain unsafe or long text
**When** messages render
**Then** text is escaped, constrained, and wrapped/truncated according to the Live Mode layout
**And** message content cannot break layout or execute script.

**Given** the Live Mode view is screen-captured at 1920x1080
**When** chat feed is visible
**Then** it remains readable without covering the core A/B choice area
**And** it follows the same Streamer Native visual treatment as the Live Mode panel.

**Given** keyboard and screen reader users reach the chat feed
**When** they navigate Live Mode
**Then** the feed is labeled as read-only live chat
**And** it does not trap focus or interrupt A/D matchup shortcuts.

## Epic 6: Community Comments, Reports & Moderation

방문자가 결과 페이지에 댓글을 남기고 콘텐츠를 신고할 수 있으며, 관리자는 신고/DMCA를 검토해 공개, 검색, 광고, 댓글 상태를 일관되게 조치할 수 있다. 이 Epic은 public route visibility policy를 확장/완성하고, noindex/cache/ad eligibility side effect를 moderation action과 연결한다. Comments are grouped here because anonymous public writing must ship with reporting, rate-limit, and moderation controls.

### Story 6.1: Anonymous Result Comments with Rate Limits

As a result viewer,
I want to comment on a public result page without creating an account,
So that I can react to the bracket outcome and keep the debate going.

**Acceptance Criteria:**

**Given** a public result page is visible and comments are enabled
**When** the comments section renders
**Then** it follows the Community comments structure in `docs/design/Save One Drop One.html` / `docs/design/theme-streamer.jsx`
**And** it shows a Community heading, total comment count, current sort label, short section description, compose box, filter chips, comment list, and load-more control where data exists.

**Given** a viewer has just completed or is viewing a result with known champion context
**When** the comment compose box renders
**Then** it shows an input with placeholder copy aligned to "Share your take on this bracket..."
**And** it displays that the viewer's champion will attach to the comment when champion context is available.

**Given** champion context is unavailable for the viewer
**When** the compose box renders
**Then** the viewer can still write a comment if comments are enabled
**And** the UI omits the champion attachment line rather than showing fake champion data.

**Given** the viewer submits a comment anonymously
**When** the comment passes validation and rate limits
**Then** the comment is saved with result/bracket reference, comment body, optional attached champion/result context, createdAt, and moderation status
**And** no account, email, or personally identifying information is required.

**Given** a comment body is empty, too long, or invalid
**When** the viewer submits
**Then** the form shows a field-level validation error
**And** no comment is saved.

**Given** comment submission is too frequent or abusive
**When** rate limiting blocks the write
**Then** the UI shows a short "try again later" style message
**And** implementation uses the shared server-side rate-limit helper.

**Given** comments are listed
**When** each comment row renders
**Then** it follows the design reference by showing avatar/fallback, display name or anonymous label, timestamp, message body, optional hot-take badge, optional champion pill, action row, and bracket-match percentage where data exists
**And** missing optional data does not create broken placeholders.

**Given** a comment has an attached champion/result context
**When** the champion pill renders
**Then** it can link or route to the commenter's public result where available
**And** if no public result is available, the pill is shown as a non-link label.

**Given** filter chips are available
**When** the comments section renders
**Then** MVP supports `All`, champion-pick filters where data exists, and `Hot takes` if the backend can derive the flag
**And** unavailable filters are hidden rather than rendered as dead controls.

**Given** many comments exist
**When** the viewer activates "Load more comments"
**Then** additional comments load with pagination or cursor-based fetching
**And** the existing result page and share actions remain usable while loading.

**Given** comment voting, replies, and share actions appear in the design reference
**When** MVP comment rows render
**Then** these controls may be displayed only if they are backed by working behavior or an explicitly disabled/unavailable state
**And** dead buttons that appear functional are not allowed.

**Given** comments are locked, unavailable, or the result is removed/private
**When** the comments section renders
**Then** it shows locked/unavailable states using short generic copy
**And** it does not expose moderation policy details.

**Given** user-generated comment text is rendered
**When** comments display
**Then** message content is escaped and constrained so it cannot execute script or break layout
**And** long text wraps or truncates within the comment row.

**Given** keyboard and screen reader users interact with comments
**When** they reach compose, filters, comment actions, and load more
**Then** labels, errors, selected filter state, and loading states are programmatically understandable
**And** focus order follows the visible Community section structure.

### Story 6.2: Public Report Submission Flow

As a visitor,
I want to report inappropriate brackets, results, or comments,
So that unsafe or policy-violating content can be reviewed.

**Acceptance Criteria:**

**Given** a public bracket, result, or comment is visible
**When** the visitor opens the report action
**Then** a report modal or sheet opens for the specific target
**And** the target type and target summary are clear without exposing internal IDs as primary user-facing copy.

**Given** the report form renders
**When** the visitor chooses a reason
**Then** MVP supports a concise reason set covering inappropriate content, harassment/hate, spam, copyright/IP concern, and other
**And** the visitor can provide optional detail text.

**Given** the visitor submits a report without signing in
**When** the report passes validation and rate limits
**Then** the report is saved with target type, target ID, reason, optional details, createdAt, requester context available without PII, and open status
**And** no account is required to report content.

**Given** the report target is already private, removed, or unavailable
**When** the visitor attempts to report it
**Then** the UI shows a short unavailable state
**And** no duplicate report is created for an inaccessible target.

**Given** the visitor submits the same report repeatedly or too frequently
**When** duplicate or rate-limit rules trigger
**Then** the UI shows a short duplicate/too-frequent state
**And** the server does not create excessive duplicate rows.

**Given** the report form is missing required fields or includes invalid detail content
**When** the visitor submits
**Then** field-level validation errors are shown
**And** no report is saved until the form is valid.

**Given** the report is accepted
**When** the server returns success
**Then** the UI shows a submitted state and closes or allows dismissal
**And** the underlying result/bracket/comment page remains usable.

**Given** reports are high-risk writes
**When** report submission is implemented
**Then** the action uses shared server-side validation schemas and rate-limit helper
**And** route modules do not hand-roll persistence or rate-limit logic.

**Given** a report target is a comment
**When** the report is saved
**Then** the report links to the comment and its parent result/bracket context
**And** admin review can later preview the surrounding context.

**Given** report UI is built
**When** keyboard or screen reader users interact with it
**Then** modal focus is trapped while open and restored to the invoking control on close
**And** reason choices, detail field, submit state, errors, and success state are accessible without pointer input.

### Story 6.3: Admin Report Queue and Target Review

As an admin,
I want to review reported content with target context and action history,
So that I can decide what moderation action is appropriate.

**Acceptance Criteria:**

**Given** an authenticated user opens the admin report queue
**When** they do not have admin/moderator permission
**Then** access is denied server-side
**And** no report data or target details are exposed.

**Given** an admin opens the report queue
**When** open reports exist
**Then** the queue shows reports grouped or sorted by status, risk, duplicate count, recency, and target type where data exists
**And** unread/open/high-risk/DMCA-related states are visually distinguishable without relying on color alone.

**Given** a report row is visible
**When** the admin scans the queue
**Then** it shows target type, target summary, primary reason, report count, latest report time, current public status, search/index status, ad eligibility status, and comments status where applicable
**And** it avoids loading full unsafe media inline if a safer preview is needed.

**Given** the admin selects a report target
**When** the detail review view opens
**Then** it shows a target preview, original public URL, reporter reason/details where available, surrounding context for comments, and current visibility/moderation state
**And** it shows the action history for that target.

**Given** multiple reports target the same content
**When** the admin reviews the target
**Then** duplicate reports are grouped under the same target review context
**And** the admin can understand how many reports exist without opening each duplicate individually.

**Given** a report target no longer exists or was already removed
**When** the admin opens the review view
**Then** the UI shows a stale/unavailable target state
**And** the admin can still close or annotate the report.

**Given** the admin queue is loading or empty
**When** the route renders
**Then** it shows table/detail loading and empty states appropriate for an operational tool
**And** the UI remains dense and work-focused, not marketing-style.

**Given** report data is fetched
**When** route loaders execute
**Then** they use admin-only repository/service boundaries
**And** public route visibility logic is not duplicated in admin UI code.

**Given** admin review is implemented
**When** auditability is needed
**Then** report view and action history include actor, target, status, reason, and timestamps where available
**And** sensitive internal notes are not exposed on public pages.

**Given** keyboard users operate the admin queue
**When** they move between queue rows, filters, and detail view
**Then** focus order is predictable and row selection/action controls are accessible
**And** table-like content remains readable without horizontal scrolling where practical.

### Story 6.4: Moderation Actions and Visibility Policy Completion

As an admin,
I want moderation actions to update public visibility, indexing, ads, cache, and comments consistently,
So that unsafe content is handled without policy drift across the site.

**Acceptance Criteria:**

**Given** an admin is reviewing a reported bracket, result, or comment
**When** they choose a moderation action
**Then** available MVP actions include no action/close report, hide or make private, takedown/remove, restore where allowed, lock comments where applicable, and restrict ads where applicable
**And** actions unavailable for a target type are hidden or disabled with clear operational copy.

**Given** a moderation action is selected
**When** the admin confirms it
**Then** the confirmation modal explains the public visibility, noindex/search, cache, ad eligibility, and comments side effects that apply
**And** the action is not applied until confirmation.

**Given** an action is confirmed
**When** the server applies it
**Then** it records actor, target type, target ID, action, reason, previous state, new state, and timestamp
**And** the related reports can be marked resolved or annotated as appropriate.

**Given** content is hidden, private, or taken down
**When** public bracket/result/comment routes load that content
**Then** the shared visibility policy prevents normal public rendering
**And** metadata, canonical, noindex behavior, cache headers, ad eligibility, and comment availability are derived from that same policy decision.

**Given** a comment is removed or hidden
**When** the comments list renders
**Then** the removed comment is omitted or shown as a generic unavailable placeholder according to policy
**And** the public UI does not expose internal moderation reasons.

**Given** comments are locked for a result or bracket
**When** the result comments section renders
**Then** existing allowed comments may remain visible according to policy
**And** new comment submission is disabled with short generic copy.

**Given** ad restriction is applied to a bracket or result
**When** public pages render
**Then** ad slots are disabled or marked ineligible for that content
**And** this state is visible in the admin review UI.

**Given** moderation changes affect cached public pages
**When** a state transition occurs
**Then** the application updates cache behavior, bypasses stale public rendering, or triggers the configured purge/invalidation path where available
**And** the system does not knowingly serve a taken-down public page as visible.

**Given** a restore action is allowed
**When** the admin restores content
**Then** public visibility, noindex/search, ad eligibility, comments, and cache behavior are recalculated through the shared policy
**And** the restore is logged like any other moderation action.

**Given** a non-admin attempts a moderation mutation
**When** the request reaches the server
**Then** it is rejected server-side
**And** no moderation state changes occur.

**Given** implementation touches public routes and admin routes
**When** visibility behavior is added
**Then** public routes use the shared visibility policy rather than duplicating moderation checks
**And** admin actions update source moderation state consumed by that policy.

### Story 6.5: DMCA Request Intake and Action Log

As a rights holder or platform admin,
I want copyright complaints and actions to be tracked through a clear DMCA process,
So that Save One Drop One can respond to IP issues and preserve an auditable record.

**Acceptance Criteria:**

**Given** the DMCA intake and policy surface is implemented
**When** implementers define the required policy sections and intake fields
**Then** they reference TierMaker's DMCA page (`https://tiermaker.com/dmca/`) as a comparable UGC-platform example
**And** they adapt the structure for Save One Drop One rather than copying legal text verbatim.

**Given** the DMCA policy surface is drafted
**When** content requirements are defined
**Then** it includes sections or fields for designated agent/contact, takedown notice requirements, platform response, counter-notice, repeat infringer policy, safe harbor/fair use positioning, and policy update metadata
**And** final legal wording remains subject to product/legal review.

**Given** a visitor or rights holder needs to submit a copyright/IP complaint
**When** they open the copyright/IP report path
**Then** the app provides a DMCA/copyright intake form or route distinct from the lightweight public report modal where needed
**And** the form explains the required information in functional, non-legalistic copy.

**Given** a DMCA/copyright request is submitted
**When** required fields pass validation
**Then** the request is saved with target URL or target reference, claimant/contact fields required by the process, complaint details, submittedAt, status, and audit metadata
**And** the request is available to admins for review.

**Given** required DMCA intake fields are missing or invalid
**When** the requester submits the form
**Then** field-level validation errors are shown
**And** no incomplete DMCA request is marked ready for admin action.

**Given** a copyright/IP reason is submitted through the normal public report modal
**When** the report is saved
**Then** it is marked or routed so admins can escalate it into the DMCA review workflow
**And** the reporter is not shown internal escalation details.

**Given** an admin reviews a DMCA request
**When** they change its status
**Then** supported statuses include received, under review, actioned, rejected/no action, restored/countered where applicable, and closed
**And** every status change is logged with actor, timestamp, reason/notes, and target state impact.

**Given** a DMCA action requires takedown or restoration
**When** the admin applies that action
**Then** it uses the same moderation action and visibility policy path from Story 6.4
**And** public rendering, noindex/search, cache, ad eligibility, and comments behavior update consistently.

**Given** DMCA logs are required for operational records
**When** records are stored
**Then** request, status change, action, target URL, actor, and timestamp data are retained for at least one year
**And** admins can retrieve the log by target or request status.

**Given** DMCA information can contain sensitive contact or legal details
**When** public pages render unavailable/taken-down content
**Then** claimant details, admin notes, and legal process details are never exposed publicly
**And** public copy remains generic.

**Given** non-admin users access DMCA admin views or mutations
**When** the request reaches the server
**Then** admin-only access is enforced server-side
**And** sensitive complaint data is not exposed.

### Story 6.6: Public Unavailable and Locked States

As a visitor,
I want unavailable or restricted content states to be clear and safe,
So that I understand what I can do next without seeing internal moderation details.

**Acceptance Criteria:**

**Given** a public bracket or result is private, hidden, removed, under review, or otherwise unavailable
**When** a visitor opens its public URL
**Then** the page renders a short generic unavailable state or not-found response according to the shared visibility policy
**And** it does not expose internal moderation reasons, reporter details, claimant details, or admin notes.

**Given** a public result has comments locked
**When** the comments section renders
**Then** existing visible comments may remain readable according to policy
**And** the compose box is disabled or hidden with short generic copy.

**Given** a public result or bracket is ad restricted
**When** the page renders
**Then** ad slots are disabled or marked ineligible for that content
**And** this public state does not reveal the internal reason for ad restriction.

**Given** a removed or unavailable page is crawled
**When** SSR metadata and headers are generated
**Then** noindex/search behavior, canonical behavior, and cache headers match the visibility decision
**And** crawlers do not receive stale visible metadata for removed content.

**Given** a comment has been hidden or removed
**When** the comment list renders
**Then** the comment is omitted or replaced with a generic unavailable placeholder according to policy
**And** reply/action controls are not shown for removed comments unless explicitly allowed.

**Given** a visitor reaches unavailable content from a shared link
**When** the unavailable state renders
**Then** it provides a safe recovery action such as returning home, browsing categories, or playing another public bracket
**And** it does not require login to recover.

**Given** the content is restored by an admin
**When** a visitor opens the URL after restore
**Then** the page returns to normal public rendering if policy allows
**And** stale unavailable copy is not served from cache.

**Given** public unavailable/locked states are implemented
**When** route modules render public bracket, result, and comment surfaces
**Then** they consume the shared visibility policy result rather than duplicating private/removed/locked checks
**And** public copy remains consistent across routes.

**Given** keyboard or screen reader users encounter unavailable states
**When** the page renders
**Then** the state heading, explanation, and recovery action are programmatically clear
**And** focus order does not trap the user on unavailable content.

## Epic 7: Deferred Growth & Monetization Backlog

MVP 이후 재방문, 스트리머 관리, 검색, 즐겨찾기, 히스토리, 광고/프리미엄/스폰서 기능을 확장할 수 있다. 이 Epic은 구현 우선순위가 아니라 MVP 범위 오염을 막는 Post-MVP 후보 묶음이다. Story creation should mark these as deferred candidates unless the user explicitly pulls them into scope.

### Story 7.1: Deferred Live Streamer Discovery Sidebar

As a visitor,
I want to see which streamers are currently using Save One Drop One live,
So that I can join active broadcasts or discover popular live brackets.

**Acceptance Criteria:**

**Given** this is a Post-MVP candidate story
**When** implementation planning occurs
**Then** it is not included in MVP scope unless explicitly pulled forward
**And** it must not block MVP discovery, play, result sharing, creation, live voting, or moderation stories.

**Given** live sessions exist in the system
**When** the Home/Browse sidebar renders this Growth feature
**Then** it can show currently live streamers using Save One Drop One
**And** each item includes streamer identity, active Bracket Pack, and live status where data exists.

**Given** no streamers are currently live
**When** the sidebar renders
**Then** it shows a compact empty state or hides the section according to the final UX decision
**And** it does not create empty visual clutter.

**Given** live streamer discovery depends on active live sessions
**When** the feature is implemented
**Then** it reuses `live_sessions` or an approved summary source from Epic 5
**And** it does not introduce a separate incompatible live-presence model.

**Given** the sidebar links to an external stream platform
**When** a visitor activates a live streamer item
**Then** the link behavior is clear and safe
**And** the app does not require the visitor to sign in.

### Story 7.2: Deferred Bracket Search

As a visitor,
I want to search Bracket Packs by title and description,
So that I can find a specific fandom, streamer topic, or bracket quickly.

**Acceptance Criteria:**

**Given** this is a Post-MVP candidate story
**When** implementation planning occurs
**Then** it is not included in MVP scope unless explicitly pulled forward
**And** MVP category/tag discovery remains sufficient without this search feature.

**Given** public Bracket Packs exist
**When** a visitor enters a search query
**Then** the app searches public Bracket Pack titles and descriptions
**And** private, removed, hidden, or unindexable packs are excluded by the shared visibility policy.

**Given** search results render
**When** matching Bracket Packs are found
**Then** the UI shows BracketCard-style results with title, thumbnail, category/tags, item count, play count, and start action
**And** the card pattern remains consistent with Epic 1 discovery.

**Given** no results match the query
**When** the result state renders
**Then** it shows a short empty state with recovery actions such as clearing search or browsing categories
**And** it does not suggest logging in as a solution.

**Given** search can be expensive or abused
**When** implementation chooses the search mechanism
**Then** it respects public cache/visibility constraints and rate/abuse protections where needed
**And** it avoids introducing a broad public API beyond the app's route/resource boundary without an architecture update.

**Given** search UI is added to navigation
**When** it is built
**Then** it remains accessible by keyboard and screen reader users
**And** it does not crowd the Home/Browse primary discovery experience.

### Story 7.3: Deferred Favorites and Play History

As a signed-in user,
I want to save favorite brackets and revisit my play history,
So that I can return to brackets and results I care about.

**Acceptance Criteria:**

**Given** this is a Post-MVP candidate story
**When** implementation planning occurs
**Then** it is not included in MVP scope unless explicitly pulled forward
**And** anonymous MVP play and result sharing remain available without favorites or history.

**Given** a signed-in user views a public Bracket Pack
**When** they activate favorite
**Then** the bracket is saved to their favorites
**And** the favorite state is visible when they return to that Bracket Pack.

**Given** an anonymous visitor views a public Bracket Pack
**When** they try to favorite it
**Then** the app may prompt sign-in for the save action
**And** the prompt does not block browse, play, or result sharing.

**Given** a signed-in user completes or views their own results
**When** play history is enabled
**Then** their completed results can appear in a profile/history surface
**And** private/removed content respects visibility policy.

**Given** a user removes a favorite or clears a history item where allowed
**When** the action succeeds
**Then** the UI updates without a full page reload
**And** the action does not delete public Bracket Pack content or shared results.

**Given** favorites/history require user-owned data
**When** persistence is implemented
**Then** it uses authenticated user ownership and server/repository boundaries
**And** users cannot read or modify another user's private favorites/history.

### Story 7.4: Deferred Bracket Pack Duplication

As a creator,
I want to duplicate an existing Bracket Pack,
So that I can remix or adapt a bracket without rebuilding it from scratch.

**Acceptance Criteria:**

**Given** this is a Post-MVP candidate story
**When** implementation planning occurs
**Then** it is not included in MVP scope unless explicitly pulled forward
**And** MVP creation still supports creating a new Bracket Pack from scratch.

**Given** a signed-in creator views a Bracket Pack that can be duplicated
**When** they activate duplicate
**Then** a new draft Bracket Pack is created under their ownership
**And** the original Bracket Pack remains unchanged.

**Given** duplicated entries include image-backed or YouTube-backed media
**When** the copy is created
**Then** media metadata is copied in a way that remains compatible with the composer and Matchup media model
**And** server-only credentials or private storage details are not copied into public payloads.

**Given** the original Bracket Pack has Preset seeding
**When** it is duplicated
**Then** seed ordering is copied into the new draft
**And** the creator can edit the order before publishing.

**Given** the original Bracket Pack is private, removed, or not duplicable
**When** a creator attempts duplication
**Then** the server rejects the action or hides the duplicate control according to policy
**And** no unauthorized content is copied.

**Given** duplication succeeds
**When** the creator is redirected
**Then** they land in the same composer flow used by Epic 4
**And** implementation does not create a separate remix editor.

### Story 7.5: Deferred Streamer Dashboard

As a creator or streamer,
I want to see the Bracket Packs I own and their basic performance,
So that I can reuse successful content and plan future streams.

**Acceptance Criteria:**

**Given** this is a Post-MVP candidate story
**When** implementation planning occurs
**Then** it is not included in MVP scope unless explicitly pulled forward
**And** MVP stream usage can still happen from public Bracket Pack pages and Matchup Live Mode.

**Given** a signed-in creator opens their dashboard
**When** they have created Bracket Packs
**Then** the dashboard lists owned Bracket Packs with title, visibility, created/updated time, play count, share/result count where available, and quick actions
**And** the list excludes Bracket Packs not owned by that user unless admin permissions apply.

**Given** a creator has no Bracket Packs
**When** the dashboard renders
**Then** it shows an empty state with a create action
**And** it does not block browsing public brackets.

**Given** a creator selects a Bracket Pack in the dashboard
**When** details are shown
**Then** they can see basic performance stats available from existing analytics/result data
**And** the dashboard does not require a full analytics product to ship.

**Given** a Bracket Pack is private, removed, or ad-restricted
**When** it appears in the dashboard
**Then** status is shown clearly to the owner
**And** public visibility policy remains enforced for public routes.

**Given** dashboard data is user-owned
**When** loaders/actions run
**Then** access checks are server-side
**And** users cannot view or mutate another creator's dashboard data.

### Story 7.6: Deferred Advertising Slot Support

As the platform operator,
I want eligible public pages to support advertising slots,
So that high page-view bracket sessions can eventually generate revenue.

**Acceptance Criteria:**

**Given** this is a Post-MVP candidate story
**When** implementation planning occurs
**Then** it is not included in MVP scope unless explicitly pulled forward
**And** MVP validation remains focused on repeat streamer use, derived viewer sessions, and result sharing.

**Given** a public bracket, play transition, or result page is ad eligible
**When** ad slot support is enabled
**Then** the page can render configured ad slot placements without breaking core play, result, or share flows
**And** ad placement follows performance and layout constraints for the page type.

**Given** content is removed, private, under review, or ad restricted
**When** public pages render
**Then** ad slots are disabled or marked ineligible using the visibility/ad eligibility policy from Epic 6
**And** ad scripts do not load for ineligible content.

**Given** play sessions may produce multiple page views
**When** ad behavior is designed
**Then** slot refresh or reload behavior respects user experience, platform policy, and Core Web Vitals
**And** it does not slow local matchup selection below performance targets.

**Given** ad scripts can affect performance
**When** implementation adds provider code
**Then** loading is isolated, measured, and allowed only where it does not harm SSR metadata or critical play interactions
**And** failures degrade gracefully without blocking content.

**Given** privacy/compliance requirements apply
**When** ad support is configured
**Then** consent, policy, and provider configuration are handled before production enablement
**And** no ad provider assumptions are hardcoded into unrelated product features.

### Story 7.7: Deferred Premium and Sponsored Branding

As a platform operator and streamer partner,
I want future premium and sponsored branding options,
So that Save One Drop One can support monetization beyond ads.

**Acceptance Criteria:**

**Given** this is a Vision/Post-MVP candidate story
**When** implementation planning occurs
**Then** it is not included in MVP scope unless explicitly pulled forward
**And** no billing, subscription, or sponsored branding infrastructure is created during MVP stories.

**Given** a premium user entitlement exists in a future phase
**When** the user plays eligible brackets
**Then** the app can suppress ads for that user according to entitlement state
**And** ad suppression does not bypass moderation or visibility policy.

**Given** a streamer partner has sponsored branding enabled in a future phase
**When** their Bracket Pack renders
**Then** sponsor branding can appear in approved locations without breaking Streamer Native layout or OBS screen capture
**And** branding never obscures matchup choices, result sharing, or safety actions.

**Given** sponsored branding applies to a Bracket Pack
**When** public pages render
**Then** sponsor metadata is treated as part of the public content model
**And** removed/private/ad-restricted content still follows the shared visibility policy.

**Given** monetization features require billing or entitlement checks
**When** those systems are designed
**Then** they are introduced through explicit architecture decisions
**And** they do not retrofit hidden billing assumptions into existing MVP routes.

**Given** premium or sponsored features are disabled
**When** public pages render
**Then** the UI does not show broken placeholders
**And** MVP users see the normal free experience.
