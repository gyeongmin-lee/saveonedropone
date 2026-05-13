---
stepsCompleted:
  - step-01-document-discovery
  - step-02-prd-analysis
  - step-03-epic-coverage-validation
  - step-04-ux-alignment
  - step-05-epic-quality-review
  - step-06-final-assessment
documentsIncluded:
  prd: _bmad-output/planning-artifacts/prd.md
  architecture: _bmad-output/planning-artifacts/architecture.md
  epics: _bmad-output/planning-artifacts/epics.md
  ux: _bmad-output/planning-artifacts/ux-design-specification.md
---

# Implementation Readiness Assessment Report

**Date:** 2026-05-13
**Project:** saveonedropone

## Step 1: Document Discovery

### 문서 인벤토리

#### PRD Files Found

**Whole Documents:**
- `prd.md` (48,887 bytes, modified 2026-05-13 09:31) — assessment input
- `prd-validation-report.md` (18,968 bytes, modified 2026-05-09 09:21) — validation report/reference, not primary PRD input

**Sharded Documents:**
- 없음

#### Architecture Files Found

**Whole Documents:**
- `architecture.md` (80,067 bytes, modified 2026-05-13 09:32) — assessment input

**Sharded Documents:**
- 없음

#### Epics & Stories Files Found

**Whole Documents:**
- `epics.md` (148,020 bytes, modified 2026-05-13 09:32) — assessment input

**Sharded Documents:**
- 없음

#### UX Design Files Found

**Whole Documents:**
- `ux-design-specification.md` (38,664 bytes, modified 2026-05-13 09:32) — assessment input

**Sharded Documents:**
- 없음

### 발견된 이슈

- 중복 형식 이슈: 없음
- 누락 문서: 없음
- 참고 사항: `prd-validation-report.md`는 PRD 검색 패턴에 포함되었지만 원본 PRD가 아니므로 평가 입력에서는 제외한다.

## Step 2: PRD Analysis

### Functional Requirements

FR1: 방문자는 로그인 없이 공개 브라켓을 탐색하고 플레이할 수 있다. Phase: MVP.

FR2: 홈 화면은 "Popular Brackets" 섹션과 "Browse by category" 5x2 카드 그리드를 표시한다. Popular Brackets는 cross-category `trending_score` 기반으로 정렬하되 Cold Start에서는 curated 우선 정렬을 사용하고, 동일 카테고리는 최대 3개까지만 노출한다. Phase: MVP.

FR3: 브라켓 카드에는 총 플레이 횟수와 현재 라이브 방송 중인 스트리머 수가 표시된다. Phase: MVP.

FR4: 방문자는 현재 Save One Drop One을 방송 중인 스트리머 목록을 사이드바에서 확인할 수 있다. Phase: Growth.

FR5: 방문자는 카테고리(K-팝, 애니메이션, 게임, 스포츠 등)로 브라켓을 필터링할 수 있다. Phase: MVP.

FR5a: 방문자는 카테고리 내 세부 태그로 브라켓을 추가 필터링할 수 있다. MVP에서는 K-pop 카테고리에만 태그 필터를 제공하며, 태그 선택은 전체 페이지 리로드 없이 그리드 영역을 서버 fetch + skeleton UI로 갱신하고 URL 쿼리에 반영한다. Phase: MVP.

FR6: 방문자는 브라켓 제목 및 설명으로 검색할 수 있다. Phase: Growth.

FR7: 사용자는 브라켓을 즐겨찾기(♡)에 추가할 수 있다 (로그인 필요). Phase: Growth.

FR8: 인증된 사용자는 새 Bracket Pack을 생성할 수 있다. Phase: MVP.

FR9: 생성자는 YouTube URL을 붙여넣으면 시스템이 제목과 썸네일을 자동으로 파싱한다. Phase: MVP.

FR10: YouTube URL 파싱 시 시작 second(재생 시점)를 지정할 수 있다. Phase: MVP.

FR11: 생성자는 이미지 URL(imgur 등)을 붙여넣어 브라켓 항목 이미지를 추가할 수 있다. Phase: MVP.

FR12: 생성자는 로컬 이미지 파일을 업로드하여 브라켓 항목 이미지를 추가할 수 있다. Phase: MVP.

FR12a: 생성자는 로컬 이미지 파일을 최대 64개까지 배치 업로드하여 항목 이미지를 일괄 추가할 수 있다. Phase: MVP.

FR13: 생성자는 항목 이름, 이미지, 선택적 부가 정보(그룹명 등)를 입력할 수 있다. Phase: MVP.

FR13a: 생성자는 브라켓 시딩 방식을 선택할 수 있다: Randomized(기본) 또는 Preset. Preset 선택 시 큐에서 항목 순서를 드래그로 조정해 시드 순위를 설정한다. Phase: MVP.

FR14: 시스템은 항목 수에 따라 표준 토너먼트 크기와 전체 참가자 수 옵션을 제공한다 (예: 133개 항목이면 16/32/64/128/133 옵션 제공). Phase: MVP.

FR14a: 시스템은 선택한 토너먼트 크기가 2의 거듭제곱이 아니어도 부전승을 자동 배정해 유효한 1v1 브라켓으로 진행한다. Phase: MVP.

FR15: 생성자는 브라켓을 공개/비공개로 설정할 수 있다. Phase: MVP.

FR16: 생성자는 기존 Bracket Pack을 복제하여 수정할 수 있다. Phase: Growth.

FR17: 시스템은 Bracket Pack 생성 완료 즉시 공개 브라켓 URL을 제공한다. Phase: MVP.

FR18: 플레이어는 브라켓 시작 시 플레이할 총 라운드/브라켓 크기를 선택할 수 있다 (예: 4/8/16/32/64/128/256/2NN). Phase: MVP.

FR19: 플레이어는 매 라운드에서 두 항목(A vs B)을 비교하고 하나를 선택할 수 있다. Phase: MVP.

FR20: 플레이어는 키보드(A / D 키) 또는 클릭으로 선택할 수 있다. Phase: MVP.

FR21: 시스템은 현재 매치의 진행 경과(라운드, 매치 번호, 진행 도트)를 표시한다. Phase: MVP.

FR22: 플레이어는 이전 선택으로 돌아가는 Undo를 사용할 수 있다. Phase: MVP.

FR23: 플레이어는 처음부터 재시작하는 Restart를 사용할 수 있다. Phase: MVP.

FR24: 시스템은 플레이어의 브라켓 진행 상태를 로컬에 자동 저장하며, 새로고침 후에도 현재 라운드·선택 이력·남은 매치가 유지된다. Phase: MVP.

FR24a: 플레이어가 미완료 브라켓에 다시 방문하면 처음부터 시작 또는 이어하기를 선택할 수 있다. Phase: MVP.

FR25: 매치업 화면은 OBS screen capture 시 1920×1080 해상도에서 주요 항목 이미지·이름·진행 상태가 잘림 없이 표시된다. Phase: MVP.

FR26: 토너먼트 완료 시 챔피언 화면이 표시된다 (항목 이미지, 이름, 그룹 정보 포함). Phase: MVP.

FR27: 결과 화면에서 사용자의 플레이 통계(총 소요 시간, 연승 기록, 속도 백분위)를 확인할 수 있다. Phase: MVP.

FR28: 결과 화면에서 챔피언까지의 매치업 경로(Final Eight replay)를 시각적으로 확인할 수 있다. Phase: MVP.

FR29: 결과 화면에서 전체 커뮤니티의 집계 결과(Most popular, Biggest upset, Fastest run)를 확인할 수 있다. Phase: MVP.

FR30: 사용자는 결과를 이미지로 다운로드할 수 있다. Phase: MVP.

FR31: 사용자는 결과 페이지 링크를 복사할 수 있다. Phase: MVP.

FR32: 사용자는 결과를 X(Twitter), Reddit, Discord에 직접 공유할 수 있다. Phase: MVP.

FR33: 공개 결과 페이지는 `og:title`, `og:image`, `og:description`, canonical URL을 포함한 SSR 렌더링으로 제공된다. Phase: MVP.

FR34: 방문자는 결과 공유 링크를 클릭하면 해당 브라켓의 결과 화면으로 직접 이동할 수 있다. Phase: MVP.

FR35: 방문자는 결과 화면에서 "Play again" 버튼으로 자신의 플레이를 시작할 수 있다. Phase: MVP.

FR35a: 방문자는 Community Verdict 패널에서 "View all N"을 눌러 전체 참가자의 커뮤니티 선택 % 랭킹을 볼 수 있다. Phase: MVP.

FR35b: 방문자는 Final Eight 패널에서 "View all N"을 눌러 전체 브라켓 트리를 풀스크린 모달로 볼 수 있다. 모달에는 zoom/drag(슬라이더+FIT), 라운드 칩 필터(All·R128·R64·R32·R16·Q·S·F), 뷰어 경로 하이라이트, Save Image(캡처 범위 오버레이·pending/success/failure) 기능이 포함된다. Phase: MVP.

FR35c: 결과 화면은 Champion Hero 내부에 공유 액션을 통합하고, 바로 아래에 같은 카테고리의 "More in [category]" 레일 4개를 표시한다. 레일은 현재 `bracket_pack_id`를 제외하고 `trending_score` 기준 큐레이션/UGC 혼합 브라켓을 보여준다. Phase: MVP.

FR36: 방문자는 공개 브라켓 결과 페이지에 댓글을 작성할 수 있으며, 작성된 댓글은 신고·비공개 처리 대상이 될 수 있다. Phase: MVP.

FR37: 채팅 시청자는 !A 또는 !B 채팅 명령어로 현재 매치에 실시간 투표할 수 있다 (Twitch/YouTube 채팅 연동). Phase: MVP.

FR38: 매치업 화면에는 실시간 채팅 투표 집계(A% vs B%)가 표시된다. Phase: MVP.

FR40: 스트리머는 키보드(A/D 키)로 매치를 진행할 수 있다. Phase: MVP.

FR41: 스트리머 대시보드에서 자신이 만든 Bracket Pack 목록과 플레이 통계를 확인할 수 있다. Phase: Growth.

FR44: 방문자는 부적절한 콘텐츠를 신고할 수 있다. Phase: MVP.

FR45: 관리자는 신고된 콘텐츠를 검토하고 제거할 수 있다. Phase: MVP.

FR46: 시스템은 DMCA Safe Harbor 요건에 따라 저작권 침해 신고 접수 및 처리 경로를 제공한다. Phase: MVP.

FR47: 사용자는 소셜 로그인(Google, Twitch)으로 계정을 생성할 수 있다. Phase: MVP.

FR48: 인증 없이 브라켓 플레이와 결과 공유는 가능하나, 브라켓 생성은 로그인이 필요하다. Phase: MVP.

FR49: 사용자는 자신의 플레이 히스토리를 프로필에서 확인할 수 있다. Phase: Growth.

FR50: 시스템은 브라켓 페이지 전환 시 광고 노출 슬롯을 지원한다 (라운드마다 페이지 전환 → 높은 PV). Phase: Growth.

FR51: 프리미엄 구독 사용자는 광고 없이 플레이할 수 있다. Phase: Vision.

FR52: 스트리머 파트너는 자신의 Bracket Pack에 스폰서 브랜딩을 추가할 수 있다. Phase: Vision.

**Total FRs:** 55개 항목. 숫자 ID 기준으로는 FR1-FR52 범위이나, a/b/c 보조 요구사항 7개가 포함되고 FR39, FR42, FR43은 존재하지 않는다.

### Non-Functional Requirements

NFR-P1: 매치업 화면 전환(라운드 간) LCP ≤ 1.5s. 측정 기준: 데스크톱 Chrome, warm cache, 대표 64강 브라켓 기준 Lighthouse 또는 동등한 Web Vitals 측정에서 p75 LCP ≤ 1.5s. Phase: MVP.

NFR-P2: 공개 브라켓 결과 페이지 첫 로드 FCP ≤ 2s. 측정 기준: 모바일 4G 시뮬레이션과 데스크톱 broadband 조건에서 대표 결과 페이지 5개를 측정해 p75 FCP ≤ 2s. Phase: MVP.

NFR-P3: 매치업 화면 키 입력(A/D) → UI 반영 레이턴시 ≤ 100ms. 측정 기준: 로컬 키 입력 후 다음 라운드 UI 변경까지의 p95 지연 시간이 100ms 이하. Phase: MVP.

NFR-P4: 결과 이미지 생성(다운로드 준비) ≤ 3s. 측정 기준: 64강 브라켓 결과 기준, Generate 클릭부터 다운로드 가능 상태까지 p95 ≤ 3s. Phase: MVP.

NFR-S1: MVP는 동시 접속 1,000명까지 핵심 플레이·결과 공유 플로우를 유지한다. 측정 기준: 부하 테스트에서 1,000 concurrent virtual users, 30분 지속, 오류율 < 1%, p95 플레이 화면 응답 ≤ 2s. Phase: MVP.

NFR-S2: Growth 단계는 동시 접속 10,000명 트래픽 모델을 수용할 확장 경로를 가진다. 측정 기준: 아키텍처 산출물에 10,000 concurrent users 기준 병목, 확장 단위, 비용 가정이 문서화되어야 함. Phase: Growth.

NFR-S3: 인기 브라켓 페이지는 바이럴 스파이크 중 origin 부하를 제한할 수 있어야 한다. 측정 기준: 공개 브라켓/결과 페이지는 캐시 가능한 응답으로 제공되며, 부하 테스트에서 반복 조회 90% 이상이 캐시 계층 또는 정적 응답으로 처리됨. Phase: MVP.

NFR-A1: 월간 가동률은 MVP ≥ 99.5%, Growth ≥ 99.9%를 유지해야 한다. 측정 기준: 외부 uptime monitor 기준으로 월별 측정하며, 사전 공지된 계획 점검은 별도 기록하되 사용자 영향 시간은 월간 리포트에 포함. Phase: MVP.

NFR-A2: 계획 점검은 방송 피크 시간대 외에 진행한다. 측정 기준: KST 20:00-24:00 및 EST 19:00-24:00 시작 점검 금지. 긴급 보안 조치는 예외로 기록. Phase: MVP.

NFR-SEC1: 모든 사용자-facing 통신은 HTTPS와 TLS 1.2 이상을 사용한다. 측정 기준: 보안 스캔에서 HTTP downgrade, mixed content, TLS 1.0/1.1 허용이 발견되지 않아야 함. Phase: MVP.

NFR-SEC2: UGC 이미지 업로드는 허용된 이미지 타입과 10MB 이하 파일만 수락한다. 측정 기준: 업로드 테스트에서 비허용 MIME/확장자와 10MB 초과 파일은 저장 전 거부되고 사용자에게 오류가 표시됨. Phase: MVP.

NFR-SEC3: 인증 토큰은 클라이언트 스크립트에서 읽을 수 없고 전송·저장 보호 속성을 갖춘다. 측정 기준: 보안 테스트에서 XSS 스크립트가 토큰 값을 직접 읽을 수 없어야 하며, 토큰은 HTTPS 연결에서만 전송됨. Phase: MVP.

NFR-SEC4: DMCA 신고 접수 경로와 처리 로그를 제공한다. 측정 기준: 신고 접수, 상태 변경, 조치자, 조치 시간, 대상 URL을 1년 이상 조회 가능하게 보관. Phase: MVP.

NFR-SEC5: 13세 미만 사용자의 개인정보 수집을 금지한다. 측정 기준: 익명 플레이 플로우는 생년월일, 실명, 연락처를 요구하지 않으며, 계정 생성 플로우에는 연령 정책 고지가 표시됨. Phase: MVP.

NFR-SEO1: 공개 브라켓 페이지와 결과 페이지는 크롤러가 제목, 설명, 대표 이미지를 초기 HTML에서 읽을 수 있어야 한다. 측정 기준: 대표 공개 브라켓/결과 페이지 10개를 HTML fetch로 검사해 title, meta description, canonical, og 태그가 JS 실행 없이 존재. Phase: MVP.

NFR-SEO2: 결과 공유 링크는 og:image, og:title, og:description을 포함한다. 측정 기준: 공유 URL 샘플 10개에서 X/Reddit/Discord 미리보기 검사 또는 HTML 검사로 필수 OG 태그 100% 존재. Phase: MVP.

NFR-SEO3: 공개 URL은 사람이 읽을 수 있는 slug를 사용한다. 측정 기준: slug는 소문자 영문/숫자/hyphen 조합, 80자 이하, 공백 및 추적 파라미터 없이 canonical URL에 반영. Phase: MVP.

NFR-ACC1: 매치업 핵심 플로우는 WCAG 2.1 AA 기준의 주요 자동 검사와 수동 키보드 검사를 통과한다. 측정 기준: axe 또는 동등 도구에서 critical/serious issue 0건, 주요 텍스트 대비 4.5:1 이상, 포커스 표시 유지. Phase: MVP.

NFR-ACC2: 플레이어는 키보드만으로 브라켓을 완료할 수 있다. 측정 기준: Tab, Enter/Space, A/D 키만 사용해 16강 브라켓 시작부터 결과 화면까지 완료 가능해야 함. Phase: MVP.

NFR-M1: 핵심 도메인 개념은 AI-assisted 개발자가 파일과 함수 경계를 추적할 수 있게 분리된다. 측정 기준: 브라켓 생성, 플레이 진행, 결과 생성, UGC moderation, SEO metadata 생성 책임이 문서화된 모듈 경계에 매핑됨. Phase: MVP.

NFR-M2: 비밀값과 환경별 설정은 코드베이스에 하드코딩되지 않는다. 측정 기준: 저장소 스캔에서 API key, secret, production credential 패턴이 발견되지 않으며 설정값은 배포 환경별로 교체 가능. Phase: MVP.

NFR-M3: 릴리스 게이트는 기본 품질 검사 실패 시 배포를 차단한다. 측정 기준: Growth 단계부터 lint와 type check 실패 시 production 배포가 진행되지 않으며, 실패 로그가 PR 또는 배포 기록에 남음. Phase: Growth.

**Total NFRs:** 21개.

### Additional Requirements

- MVP 북극성: 스트리머 2회 이상 반복 사용, 단일 방송 파생 플레이 1,000회 이상, 결과 이미지 공유 링크 유입 50회 이상.
- React Router 7 framework mode 확정. Next.js는 사용하지 않는다.
- 공개 브라켓 페이지, 카테고리 페이지, 결과 공유 페이지는 SSR 또는 Static Generation이 필수다.
- 플레이 UI는 빠른 인터랙션을 우선하는 클라이언트 사이드 SPA 방식이다.
- Streamer Live Mode는 별도 OBS Browser Source URL이 아니라 일반 매치업 URL 안의 screen capture 최적화 모드로 다룬다.
- Streamer Live Mode는 1920×1080 OBS screen capture에서 잘림 없이 표시되어야 한다.
- Twitch 채팅 !A/!B 명령어가 MVP의 유일한 시청자 참여 방식이며, 별도 웹 투표 링크는 없다.
- Twitch 채팅 투표 활성화에는 스트리머의 별도 OAuth `channel:bot` scope 동의가 필요하다.
- YouTube 채팅 연동은 Growth로 명시되어 있으나 FR37에는 Twitch/YouTube가 함께 적혀 있어 정정이 필요하다.
- 소셜 로그인은 Google, Twitch만 지원하며 이메일/비밀번호 인증은 없다.
- 브라켓 탐색·플레이, 결과 공유, 댓글 작성은 인증 없이 가능하다. 브라켓 생성과 즐겨찾기는 인증이 필요하다.
- UGC 플랫폼으로서 DMCA Safe Harbor 요건을 충족해야 하며 신고-삭제 절차, 반복 침해자 정책, 처리 로그가 필요하다.
- 광고 정책상 고위험 UGC(NSFW, 혐오, doxxing)는 광고 노출에서 제외해야 한다.
- 신고로 비공개 전환된 페이지는 즉시 `noindex` 처리하고 검색엔진 캐시 제거 요청 플로우를 확보해야 한다.
- 외부 이미지 URL은 CORS, 핫링크 차단, URL 만료 리스크가 있으므로 중요 이미지는 자체 스토리지 프록시·캐싱이 권장된다.
- YouTube API/oEmbed 쿼터 관리를 위해 API 호출 빈도 제한, 캐싱, 수동 입력 fallback이 필요하다.
- 비정규 참가자 수와 부전승 자동 배정을 지원해야 한다.
- 라운드마다 페이지 전환 또는 SPA 내 동등한 광고 슬롯 재로드가 수익 모델의 전제다.
- MVP는 큐레이션 Bracket Pack 100개 이상을 전제로 한다.

### PRD Completeness Assessment

PRD는 핵심 사용자 여정, MVP/Growth/Vision 범위, FR/NFR, 기술 제약, 규제·운영 요구를 대부분 포함하고 있어 구현 준비도 평가의 기준 문서로 사용 가능하다. 특히 MVP 범위와 NFR 수용 기준은 대체로 측정 가능하다.

다만 다음 불명확성은 후속 커버리지 검증에서 주의가 필요하다.

- FR 번호 체계에 공백이 있다: FR39, FR42, FR43이 없다. 누락 요구사항인지 단순 renumbering 오류인지 확인 필요.
- FR37은 Twitch/YouTube 채팅 연동을 MVP로 표기하지만, PRD 범위 설명과 프로젝트 컨텍스트는 YouTube 채팅을 Growth로 둔다.
- 첫 방문자 관심사 기반 온보딩은 Success Criteria에는 남아 있으나 MVP 범위에서는 개인화/For You/관심사 온보딩을 Growth로 정리했다. PRD 내부 정합성이 필요하다.
- 기본 광고 슬롯은 MVP Feature Set에는 포함되지만 FR50은 Growth로 표기되어 있다. MVP에 광고 슬롯이 필요한지, 또는 계측/자리만 MVP인지 구분해야 한다.
- Streamer Live Mode에 대한 PRD 일부 문구는 "OBS 방송 레이아웃 페이지"라고 표현하지만 프로젝트 컨텍스트는 별도 OBS route를 금지한다. 아키텍처와 epics가 일반 매치업 URL 내 opt-in 패널로 해석해야 한다.

## Step 3: Epic Coverage Validation

### Epic FR Coverage Extracted

- Epic 1: FR1, FR2, FR3, FR5, FR5a
- Epic 2: FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR24a, FR25, FR40
- Epic 3: FR26, FR27, FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35, FR35a, FR35b, FR35c
- Epic 4: FR8, FR9, FR10, FR11, FR12, FR12a, FR13, FR13a, FR14, FR14a, FR15, FR17, FR47, FR48
- Epic 5: FR37, FR38
- Epic 6: FR36, FR44, FR45, FR46
- Epic 7: FR4, FR6, FR7, FR16, FR41, FR49, FR50, FR51, FR52

**Total FRs in epics:** 55개 항목.

### Coverage Matrix

| FR Number | PRD Requirement | Epic Coverage | Status |
| --------- | --------------- | ------------- | ------ |
| FR1 | 로그인 없이 공개 브라켓 탐색 및 플레이 | Epic 1 | Covered |
| FR2 | 홈 Popular Brackets 및 Browse by category 5x2 grid | Epic 1 | Covered |
| FR3 | 브라켓 카드 play count/live count | Epic 1 | Covered |
| FR4 | 라이브 방송 중인 스트리머 사이드바 | Epic 7 | Covered, Deferred |
| FR5 | 카테고리 필터링 | Epic 1 | Covered |
| FR5a | K-pop 태그 필터 및 URL 반영 | Epic 1 | Covered |
| FR6 | 브라켓 검색 | Epic 7 | Covered, Deferred |
| FR7 | 즐겨찾기 | Epic 7 | Covered, Deferred |
| FR8 | 인증된 Bracket Pack 생성 | Epic 4 | Covered |
| FR9 | YouTube URL 제목/썸네일 파싱 | Epic 4 | Covered |
| FR10 | YouTube 시작 second 지정 | Epic 4 | Covered |
| FR11 | 이미지 URL 항목 이미지 추가 | Epic 4 | Covered |
| FR12 | 로컬 이미지 파일 업로드 | Epic 4 | Covered |
| FR12a | 최대 64개 배치 이미지 업로드 | Epic 4 | Covered |
| FR13 | 항목 이름/이미지/부가 정보 입력 | Epic 4 | Covered |
| FR13a | Randomized/Preset 시딩 및 drag reorder | Epic 4 | Covered |
| FR14 | 토너먼트 크기 옵션 제공 | Epic 4 | Covered |
| FR14a | 비-2의 거듭제곱 부전승 자동 배정 | Epic 4 | Covered |
| FR15 | 공개/비공개 설정 | Epic 4 | Covered |
| FR16 | 기존 Bracket Pack 복제 | Epic 7 | Covered, Deferred |
| FR17 | 생성 완료 후 공개 URL 제공 | Epic 4 | Covered |
| FR18 | 플레이할 라운드/브라켓 크기 선택 | Epic 2 | Covered |
| FR19 | 매 라운드 A/B 선택 | Epic 2 | Covered |
| FR20 | A/D 키 또는 클릭 선택 | Epic 2 | Covered |
| FR21 | 라운드/매치 번호/진행 도트 | Epic 2 | Covered |
| FR22 | Undo | Epic 2 | Covered |
| FR23 | Restart | Epic 2 | Covered |
| FR24 | 로컬 진행 상태 자동 저장 및 새로고침 복구 | Epic 2 | Covered |
| FR24a | 미완료 브라켓 재방문 Resume/Restart | Epic 2 | Covered |
| FR25 | 1920x1080 OBS screen capture 안정성 | Epic 2 | Covered |
| FR26 | 챔피언 화면 | Epic 3 | Covered |
| FR27 | 플레이 통계 | Epic 3 | Covered |
| FR28 | Final Eight replay/path | Epic 3 | Covered |
| FR29 | 커뮤니티 집계 결과 | Epic 3 | Covered |
| FR30 | 결과 이미지 다운로드 | Epic 3 | Covered |
| FR31 | 결과 링크 복사 | Epic 3 | Covered |
| FR32 | X/Reddit/Discord 공유 | Epic 3 | Covered |
| FR33 | 공개 결과 페이지 SSR OG/meta | Epic 3 | Covered |
| FR34 | 결과 공유 링크 직접 진입 | Epic 3 | Covered |
| FR35 | Play again | Epic 3 | Covered |
| FR35a | 전체 커뮤니티 선택 % 랭킹 | Epic 3 | Covered |
| FR35b | 전체 브라켓 트리 풀스크린 모달 | Epic 3 | Covered |
| FR35c | Champion Hero 공유 액션 및 More in category 레일 | Epic 3 | Covered |
| FR36 | 공개 결과 댓글 및 신고/비공개 대상화 | Epic 6 | Covered |
| FR37 | !A/!B 채팅 투표 | Epic 5 | Covered |
| FR38 | 실시간 투표 집계 표시 | Epic 5 | Covered |
| FR40 | 스트리머 A/D 키 진행 | Epic 2 | Covered |
| FR41 | 스트리머 대시보드 | Epic 7 | Covered, Deferred |
| FR44 | 부적절 콘텐츠 신고 | Epic 6 | Covered |
| FR45 | 관리자 신고 콘텐츠 검토/제거 | Epic 6 | Covered |
| FR46 | DMCA Safe Harbor 신고/처리 경로 | Epic 6 | Covered |
| FR47 | Google/Twitch 소셜 로그인 | Epic 4 | Covered |
| FR48 | 플레이/공유 anonymous, 생성 login required | Epic 4 | Covered |
| FR49 | 플레이 히스토리 | Epic 7 | Covered, Deferred |
| FR50 | 광고 슬롯 | Epic 7 | Covered, Deferred |
| FR51 | 프리미엄 광고 제거 | Epic 7 | Covered, Deferred/Vision |
| FR52 | 스폰서 브랜딩 | Epic 7 | Covered, Deferred/Vision |

### Missing Requirements

명시적으로 누락된 PRD FR은 없다.

### Coverage Notes

- Epic coverage는 PRD FR 전체를 포괄한다.
- Epic 7은 Growth/Vision 요구사항을 backlog로 묶어 MVP 범위 오염을 막는 구조다. 따라서 FR4, FR6, FR7, FR16, FR41, FR49, FR50, FR51, FR52는 "covered"이지만 MVP 구현 대상으로 보지 않아야 한다.
- PRD의 FR37은 "Twitch/YouTube 채팅 연동"으로 되어 있으나, Epics 문서는 "MVP는 Twitch만 구현하고 YouTube 채팅은 Growth"로 정정한다. 이는 프로젝트 컨텍스트와 일치한다.
- PRD의 MVP Feature Set에는 "기본 광고 슬롯"이 포함되지만 FR50과 Epic 7은 Growth로 둔다. 광고 슬롯의 MVP 포함 여부는 범위 정합성 이슈로 남는다.
- Story 1.5는 "First-Visit Interest Onboarding" 제목이지만 실제 내용은 onboarding/For You를 MVP에서 제거하는 guardrail이다. PRD Success Criteria에 남은 "관심사 기반 온보딩" 문구와 불일치한다.

### Coverage Statistics

- Total PRD FRs: 55개 항목
- FRs covered in epics: 55개 항목
- Missing FRs: 0개
- Coverage percentage: 100%

## Step 4: UX Alignment Assessment

### UX Document Status

Found: `_bmad-output/planning-artifacts/ux-design-specification.md`

Related visual source of truth:
- `docs/design/README.md`
- `docs/design/Save One Drop One.html`
- `docs/design/theme-streamer.jsx`
- `docs/design/Create Bracket.html`
- `docs/design/create-bracket/*.jsx`
- `docs/design/Live Mode States.html`
- `docs/design/live-mode/states.jsx`
- `docs/design/Full Bracket.html`
- `docs/design/full-bracket/states.jsx`
- `docs/design/Community Ranking.html`
- `docs/design/community-ranking/states.jsx`

### UX ↔ PRD Alignment

대체로 정렬됨.

- UX의 핵심 루프(스트리머 방송, 시청자 익명 플레이/공유/댓글, UGC 생성, 운영자 신고/모더레이션)는 PRD의 User Journeys 및 MVP Feature Set과 일치한다.
- Anonymous Until Creation 원칙은 PRD의 인증 규칙(FR47, FR48, 댓글/플레이/공유 anonymous)과 일치한다.
- Home/Browse는 PRD의 Option C 방향인 Popular Brackets + Browse by category 5x2 grid + K-pop tag filter와 일치한다.
- Matchup, local progress, Undo/Restart, OBS screen capture, Live Mode opt-in panel은 FR18-FR25, FR37-FR40 및 프로젝트 컨텍스트와 일치한다.
- Result page의 Champion Hero 공유 액션, More in category rail, Final Path, Community Ranking, Full Bracket Modal은 FR26-FR35c와 일치한다.
- Create Bracket Flow는 FR8-FR17과 일치하며 YouTube parse, 이미지 URL, 로컬/배치 업로드, Randomized/Preset seeding, publish URL을 포함한다.
- Safety/Moderation UX는 FR36, FR44-FR46 및 DMCA/광고 안전성 요구와 일치한다.

### UX ↔ Architecture Alignment

대체로 정렬됨.

- UX의 SSR Home/category/result 요구는 architecture의 React Router loaders, server metadata helpers, route headers, Cloudflare CDN cache 전략으로 지원된다.
- UX의 CSR-heavy Matchup 및 local resume 요구는 architecture의 `domain/tournament`, localStorage persistence module, client-heavy `/play/:bracketSlug` 구조로 지원된다.
- UX의 Streamer Live Mode는 architecture의 같은 matchup route 내 opt-in panel, Twitch EventSub, persisted live session checkpoint, Supabase Realtime Broadcast 구조로 지원된다.
- UX의 OAuth popup 요구는 architecture의 social login과 chat collection OAuth 분리, `channel:bot` scope, bot token server-only 규칙과 정렬된다.
- UX의 Full Community Ranking은 architecture의 `entry_champion_stats`, first-page loader, cursor pagination/fetcher 방향으로 지원된다.
- UX의 Full Bracket Modal 및 Save Image는 architecture의 client-side Canvas export, `features/result/export/`, server-generated image route 금지 원칙과 정렬된다.
- UX의 comments/reports/moderation feedback은 architecture의 shared rate limiting, moderation repositories, visibility policy, noindex/cache/ad eligibility policy로 지원된다.
- UX 접근성 요구는 architecture의ㅍ route/component boundaries만으로 자동 보장되지는 않지만, epics의 acceptance criteria와 NFR-ACC1/ACC2에 반영되어 있다.

### Alignment Issues

1. **Onboarding scope conflict**
   - UX Journey 2에는 "첫 방문 온보딩은 플레이를 막는 마케팅 팝업이 아니라 카테고리 선택 shortcut이어야 한다"는 문구가 남아 있다.
   - 같은 UX 문서의 Onboarding Modal 섹션은 2026-05-13 correct-course 결정으로 MVP에서 제거됨을 명시한다.
   - PRD Success Criteria에도 "첫 방문자가 관심사 기반 온보딩을 통해 10초 이내 첫 브라켓에 도달" 문구가 남아 있다.
   - 구현 기준은 제거/미구현이 맞지만, 문서 문구를 정리하지 않으면 구현자가 onboarding shortcut을 MVP로 오해할 수 있다.

2. **Advertising MVP/Growth scope conflict**
   - PRD MVP Feature Set은 "기본 광고 슬롯 (결과 화면)"을 포함한다.
   - PRD FR50과 Epic 7은 광고 슬롯을 Growth/deferred로 둔다.
   - UX는 moderation side effect로 ad eligibility를 다루지만, 실제 광고 슬롯 UI가 MVP인지 명확히 강제하지 않는다.
   - MVP에서 필요한 것이 실제 광고 provider/slot인지, 아니면 ad eligibility policy와 future placeholder인지 결정 필요.

3. **Bracket detail route/surface clarity**
   - UX Journey 1은 Home/category browse -> Bracket detail -> Matchup flow를 그린다.
   - UX Screen Inventory에는 Home/Browse와 Matchup은 있으나 Bracket detail 화면이 별도 MVP screen으로 명확히 listed되지 않는다.
   - Architecture는 public bracket page/route를 전제하고 있으므로, UX inventory와 epics story가 "public bracket detail"을 명확히 포함하는지 확인 필요.

4. **Architecture wording minor inconsistency**
   - Architecture의 일부 coverage summary에는 "OBS route"라는 표현이 남아 있으나, 본문과 프로젝트 컨텍스트는 별도 OBS route를 금지하고 같은 matchup route 내 Streamer Live Mode opt-in panel을 요구한다.
   - 구현 기준은 별도 OBS URL 없음이다. 해당 표현은 문서 정리 대상이다.

### Warnings

- UX documentation is present and rich enough for implementation, but visual implementation depends on `docs/design` artifacts. Stories correctly remind implementers to inspect the relevant HTML/JSX prototypes before coding.
- 접근성은 요구사항과 acceptance criteria에는 충분히 반영되어 있으나, 실제 구현 준비도는 테스트 계획과 자동화 설정에서 다시 검증해야 한다.
- Admin notification depth, anonymous comment display identity, mobile matchup layout choice는 UX Open Decisions로 남아 있다. MVP 구현을 막지는 않지만 각 story 구현 전 product decision이 필요할 수 있다.

## Step 5: Epic Quality Review

### Overall Quality Assessment

에픽/스토리 문서는 전반적으로 높은 품질이다. 대부분의 에픽은 사용자 가치 단위로 구성되어 있고, 스토리 acceptance criteria는 Given/When/Then 구조와 오류/빈 상태/접근성/성능 고려를 포함한다. 데이터베이스 생성도 "처음 필요한 시점에 필요한 테이블만 생성"하는 방향을 대체로 지킨다.

하지만 Phase 4 구현 준비도 관점에서는 몇 가지 구조적 결함이 있다. 특히 public bracket detail surface의 스토리 누락, deferred backlog를 정상 구현 에픽처럼 포함한 구조, MVP 범위 충돌(광고/온보딩)이 구현자에게 혼선을 줄 수 있다.

### Epic Structure Validation

| Epic | User Value Focus | Independence | Quality Notes |
| ---- | ---------------- | ------------ | ------------- |
| Epic 1: Public Discovery & Browse | 대체로 user-centric. 방문자가 공개 Bracket Pack을 발견하고 플레이 후보를 고르는 가치가 명확함. | Epic 1 단독으로 home/category discovery는 가능. | Story 1.1은 기술 scaffold지만 greenfield/starter requirement 때문에 허용 가능. Story 1.5는 "하지 말 것" guardrail이라 실행 story로는 부적절. Public bracket detail story가 명확하지 않음. |
| Epic 2: Playable Tournament Experience | 강함. 계정 없는 토너먼트 플레이 완주 가치가 명확함. | Epic 1의 public Bracket Pack data를 필요로 하며 Epic 3 없이 동작 가능. | 순수 tournament engine -> start flow -> matchup -> undo/restart -> persistence 순서가 좋음. |
| Epic 3: Results, Sharing & Re-Entry Loop | 강함. 완료 결과가 공유/재진입 루프가 되는 가치가 명확함. | Epic 1/2 출력(play result)을 기반으로 동작하며 Epic 4+ 없이 가능. | Story 3.7은 Epic 6 전 placeholder/surface만 제공하므로 실제 댓글/신고 가치를 완성하지 않음. 의도는 이해되나 story 목적이 guardrail에 가까움. |
| Epic 4: Creator Bracket Pack Composer | 강함. 제작자가 Bracket Pack을 만들고 공개 URL을 받는 가치가 명확함. | Epic 1 public content model과 discovery path 재사용. 전방 dependency는 없음. | Auth gate부터 publish까지 순서가 실용적. |
| Epic 5: Streamer Live Mode & Twitch Chat Voting | 강함. 스트리머가 같은 Matchup 화면에서 Twitch 투표를 집계하는 가치가 명확함. | Epic 2 Matchup 기반이 필요하며 Epic 6/7 불필요. | EventSub/OAuth/session/checkpoint/realtime 경계가 명확함. |
| Epic 6: Community Comments, Reports & Moderation | 강함. 댓글/신고/운영 조치 가치가 명확함. | Epic 3 result page surface를 활용하지만 핵심 mutation/운영 기능은 자체 완결됨. | 댓글과 moderation을 함께 묶은 결정은 안전상 합리적. |
| Epic 7: Deferred Growth & Monetization Backlog | 약함. 여러 Growth/Vision 후보의 parking lot이며 하나의 구현 가능한 user journey가 아님. | Deferred 후보 묶음이라 normal epic independence 기준과 맞지 않음. | MVP implementation epic으로 취급하면 안 됨. Backlog/parking-lot 문서로 분리 권장. |

### Critical Violations

없음. 구현을 즉시 불가능하게 만드는 전방 의존성, 순환 의존성, 전체 DB 선생성 같은 치명적 결함은 발견되지 않았다.

### Major Issues

1. **Public bracket detail story is missing or under-specified**
   - Evidence: UX Journey 1은 `Home/category browse -> Bracket detail -> Matchup` 흐름을 요구한다. Architecture도 public bracket/category/result pages와 public bracket route/metadata/cache를 반복적으로 전제한다. Epic 1 설명도 Bracket Pack card/detail을 언급한다.
   - Problem: Epic 1에는 Home Browse, Category Browse는 있으나 public bracket detail page/story가 명시적으로 없다. Story 2.2는 바로 `/play/:bracketSlug`를 다루며, Story 4.7은 publish 후 URL 제공만 다룬다.
   - Impact: 공개 브라켓 SEO 페이지, 방송 적합성 preview, Start tournament/Start broadcast CTA의 구현 위치가 모호해진다.
   - Recommendation: Epic 1에 "Public Bracket Detail Page" story를 추가하거나 Story 1.3/1.4/2.2 중 어디가 detail surface를 소유하는지 명확히 분리한다. SSR metadata, item count, play count, live count, preview suitability, Start tournament, Start broadcast entry, unavailable/private state를 포함해야 한다.

2. **Epic 7 is a deferred backlog, not an implementation-quality epic**
   - Evidence: Epic 7 description says it is not implementation priority and stories are "not included in MVP scope unless explicitly pulled forward."
   - Problem: Epic 7 covers FR4, FR6, FR7, FR16, FR41, FR49, FR50, FR51, FR52, but these are a mixed set of Growth/Vision features across discovery, creator, account, monetization, dashboard. It does not form one coherent user-value increment.
   - Impact: Phase 4 planning can accidentally treat deferred features as part of implementation sequence, or count them as ready stories when they intentionally are not ready for MVP.
   - Recommendation: Move Epic 7 to a separate `deferred-backlog.md` or mark it explicitly as non-Phase-4. If any item is pulled into MVP, create a dedicated user-value epic/story with normal acceptance criteria.

3. **Advertising scope is inconsistent**
   - Evidence: PRD MVP Feature Set includes "기본 광고 슬롯 (결과 화면)", but FR50 is Growth and Epic 7 Story 7.6 is deferred.
   - Problem: If ad slot support is MVP, Epic 7 deferral creates a missing implementation path. If it is Growth, PRD MVP Feature Set is wrong.
   - Impact: Could cause late-stage rework in result page, visibility/ad eligibility policy, Core Web Vitals, and moderation side effects.
   - Recommendation: Decide one of two paths before implementation: (a) remove ad slots from MVP and keep only ad eligibility policy hooks, or (b) create an MVP story for non-provider placeholder/ad eligibility-aware slot surfaces.

4. **Onboarding/interest personalization remains in conflicting places**
   - Evidence: Story 1.5 says removed from MVP; UX Onboarding Modal says removed; PRD Success Criteria and UX Journey 2 still mention first-visit onboarding/category shortcut.
   - Problem: Story 1.5 is a negative/guardrail story rather than a deliverable user story, and remaining PRD/UX wording can pull implementation in the opposite direction.
   - Impact: Implementers may build local interest storage or a category shortcut modal despite the correct-course decision.
   - Recommendation: Convert Story 1.5 into an explicit "MVP excluded behavior" note in Epic 1, and remove/annotate the conflicting PRD/UX journey text.

### Major Dependency Findings

- No Epic N was found to require Epic N+1 for its core value to function.
- Epic 3 Story 3.7 references future Epic 6 for comment/report mutations. This is not a hard blocker because it can render disabled/placeholder surfaces independently, but it is a weak story boundary.
- Epic 4 Story 4.2 uses local/client draft until later publish stories. This is acceptable because it remains independently completable as a composer shell.
- Epic 5 depends on Epic 2 Matchup foundation. This is a valid backward dependency.
- Epic 6 depends on result/comment/report surfaces from Epic 3 for some UI context. This is a valid backward dependency.

### Database/Entity Creation Timing

Positive finding:
- Story 1.1 explicitly forbids product-specific database tables.
- Story 1.2 creates only public discovery tables (`bracket_packs`, `bracket_entries`, category/tag data) and explicitly avoids future tables for results, comments, live voting, moderation, billing, and creator analytics.
- Later epics introduce result, session, vote, comment, report, moderation, and DMCA persistence where first needed.

No database timing violation found.

### Starter Template Requirement

Architecture specifies React Router 7 framework mode on Cloudflare Workers. Story 1.1 correctly covers:

- approved Cloudflare React Router scaffold or equivalent official framework-mode setup
- `app/routes.ts` route registration source of truth
- Wrangler/Vite/React Router configuration
- base folder boundaries
- design token entry
- `.env.example`/equivalent environment documentation
- local verification commands

Concern:
- Greenfield readiness normally benefits from early CI/typecheck/lint pipeline setup. Story 1.1 documents commands, but no early CI/check story is present. NFR-M3 defers deployment gating to Growth, so this is not a blocker, but it raises implementation risk for multi-story AI-assisted development.

### Story Quality Assessment

Strengths:
- Most stories use BDD-style acceptance criteria.
- Error, loading, empty, permission, accessibility, mobile/desktop, and abuse/rate-limit cases are widely covered.
- Stories generally create only the technical substrate needed for their own user value.
- Architecture boundaries are repeatedly reinforced in ACs, which is useful for AI-agent implementation.

Concerns:
- Several criteria use flexible phrases like "where available", "appropriate", "suitable", or "unless implementation constraints require deviation." These are reasonable for UI variability but should be tightened in implementation stories where test automation is expected.
- Some stories are guardrails rather than deliverables: Story 1.5 and Story 3.7 are the clearest examples.
- Admin notification depth, comment identity, mobile matchup layout remain open UX decisions. Stories touching those areas may need a quick product decision before implementation.

### Best Practices Compliance Checklist

| Check | Result |
| ----- | ------ |
| Epics deliver user value | Mostly pass. Epic 7 fails as normal implementation epic. |
| Epic independence | Pass for Epics 1-6. Epic 7 is deferred/non-sequential. |
| Stories appropriately sized | Mostly pass. Story 1.5 and Story 3.7 are guardrail/surface stories rather than full value stories. |
| No forward dependencies | Mostly pass. Future references exist but do not block completion, except they weaken Story 3.7 semantics. |
| Database tables created when needed | Pass. |
| Clear acceptance criteria | Mostly pass. Some wording should tighten before automation. |
| Traceability to FRs maintained | Pass, with known PRD scope conflicts. |

### Quality Recommendations

1. Add or clarify a public Bracket Pack detail story before Phase 4.
2. Move Epic 7 out of the MVP implementation sequence or split pulled-forward features into dedicated implementation stories.
3. Resolve advertising MVP/Growth scope before result page implementation.
4. Remove or explicitly annotate remaining onboarding references outside the negative guardrail.
5. Add an early CI/check story or extend Story 1.1 with lint/typecheck/test command verification if the repo will be implemented by multiple AI-agent story passes.
6. Before implementing comments/admin/mobile matchup, resolve the relevant UX Open Decisions in lightweight notes or story-specific acceptance criteria.

## Summary and Recommendations

### Overall Readiness Status

**NEEDS WORK**

구현으로 바로 들어갈 수 있는 수준의 산출물은 상당 부분 갖춰져 있다. 필수 문서는 모두 존재하고, PRD FR은 Epics에 100% 매핑되어 있으며, Epics 1-6은 대체로 사용자 가치와 구현 순서가 명확하다.

하지만 지금 상태로 Phase 4를 시작하면 구현자들이 서로 다른 해석을 할 가능성이 높은 범위/스토리 문제가 남아 있다. 특히 public bracket detail surface, 광고 MVP 여부, onboarding 제거 여부, Epic 7의 위치는 먼저 정리해야 한다.

### Critical Issues Requiring Immediate Action

치명적 결함은 없다. 즉, 문서 누락이나 FR 전체 미커버리지처럼 구현 준비를 완전히 막는 문제는 발견되지 않았다.

### Major Issues Requiring Resolution Before Implementation

1. **Public Bracket Detail Page story 누락/불명확**
   - UX와 Architecture는 public bracket detail/page를 전제하지만 Epics에는 명시 story가 없다.
   - Home/category에서 바로 play로 이동할지, detail page를 둘지, public bracket SEO page가 어떤 route와 story에 포함되는지 정리해야 한다.

2. **Advertising MVP/Growth 범위 충돌**
   - PRD MVP Feature Set은 기본 광고 슬롯을 포함하지만 FR50/Epic 7은 Growth/deferred다.
   - MVP에서 실제 광고 슬롯을 구현할지, ad eligibility policy hook만 둘지 결정해야 한다.

3. **Onboarding/interest personalization 문구 충돌**
   - correct-course 결정은 MVP에서 onboarding/For You를 제거했지만 PRD Success Criteria와 UX Journey 일부 문구가 남아 있다.
   - Story 1.5는 실행 story가 아니라 guardrail로 재배치하는 편이 맞다.

4. **Epic 7이 구현 에픽이 아니라 deferred backlog**
   - Epic 7은 여러 Growth/Vision 후보를 묶은 parking lot이다.
   - Phase 4 MVP implementation sequence에 포함하면 범위 오염이 발생한다.

### Recommended Next Steps

1. Epic 1에 **Public Bracket Detail Page** story를 추가하거나, 기존 story 중 어느 story가 public bracket SEO/detail surface를 소유하는지 명확히 수정한다.
2. 광고 정책을 결정한다: MVP에서 실제 ad slot을 빼고 policy hook만 둘지, 아니면 Result page에 MVP ad slot story를 추가할지 선택한다.
3. PRD와 UX에서 onboarding/category shortcut 관련 잔여 문구를 제거하거나 "Growth 재평가"로 명시한다.
4. Epic 7을 MVP 구현 순서에서 제외하고 `Deferred Growth Backlog`로 분리한다. MVP로 당길 기능은 별도 story로 승격한다.
5. Story 1.1에 lint/typecheck/test command verification 또는 최소 CI/check setup을 추가할지 결정한다.
6. Comments/admin/mobile matchup 관련 구현 전, UX Open Decisions 중 comment identity, admin notification depth, mobile matchup layout을 story-level decision으로 닫는다.

### Issue Count Summary

- Document discovery issues: 0 critical, 0 missing required documents
- PRD completeness issues: 5 consistency concerns
- Epic coverage issues: 0 missing FRs, 2 scope notes
- UX alignment issues: 4 alignment issues
- Epic quality issues: 0 critical, 4 major, 3 minor/concern areas

### Final Note

이 assessment는 총 14개 주의사항을 5개 범주에서 식별했다. 가장 중요한 조치는 구현 전 범위 정리다. 산출물의 기반은 충분히 강하지만, 위 4개 major issue를 정리하지 않으면 Phase 4에서 브라켓 상세/광고/onboarding/deferred backlog 해석이 갈라질 가능성이 높다.

**Assessor:** Codex using `bmad-check-implementation-readiness`  
**Completed:** 2026-05-13
