---
stepsCompleted: ["step-01-init", "step-02-discovery", "step-02b-vision", "step-02c-executive-summary", "step-03-success", "step-04-journeys", "step-05-domain", "step-06-innovation", "step-07-project-type", "step-08-scoping", "step-09-functional", "step-10-nonfunctional", "step-e-01-discovery", "step-e-02-review", "step-e-03-edit"]
releaseMode: phased
date: "2026-05-06"
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-saveonedropone.md"
  - "_bmad-output/planning-artifacts/product-brief-saveonedropone-distillate.md"
  - "_bmad-output/planning-artifacts/research/domain-saveonedropone-merged-streamer-bracket-research-2026-05-06.md"
  - "_bmad-output/brainstorming/brainstorming-session-2026-05-06-001.md"
briefCount: 2
researchCount: 1
brainstormingCount: 1
projectDocsCount: 0
workflowType: 'prd'
lastEdited: "2026-05-07"
editHistory:
  - date: "2026-05-06"
    changes: "Validation-guided edit: clarified success metrics, aligned MVP scope and FR traceability, retained MVP comments, and rewrote NFRs with measurable acceptance criteria."
  - date: "2026-05-07"
    changes: "Validation-guided cleanup: clarified result comparison as Growth scope, aligned web framework guidance with project context, and tightened minor measurability wording."
classification:
  projectType: web_app
  domain: entertainment_creator_tools
  complexity: medium
  projectContext: greenfield
---

# Product Requirements Document - saveonedropone

**Author:** GM
**Date:** 2026-05-06

## Executive Summary

Save One Drop One은 한국의 이상형 월드컵 포맷을 서구권 스트리머 시장에 맞게 재패키징한 **스트리머-퍼스트 1v1 브라켓 토너먼트 플랫폼**이다. 1차 타겟은 Twitch/YouTube에서 구독자 10K~500K를 보유하며 현재 TierMaker를 방송에 임시방편으로 활용하는 미드티어 스트리머다. 이들의 핵심 문제는 콘텐츠 고갈이며, "켜면 2~3시간이 채워지는 방송-ready 콘텐츠 패키지"를 필요로 한다. 서구권에는 1v1 브라켓 포맷과 스트리머 방송 워크플로우를 결합한 제품이 없다 — 이것이 이 제품이 존재하는 이유다.

스트리머가 방송에서 Bracket Pack을 실행하면 시청자가 공유 링크로 재플레이하고, 결과 이미지를 SNS에 공유하며, "내 결과와 다르다"는 반응이 Play again 흐름을 유도한다. 바이럴 루프 검증 후에는 두 사용자 결과를 나란히 보여주는 비교 화면을 Growth 기능으로 확장한다. 이 루프가 UGC 생성과 SEO 인덱싱으로 이어지고, 다시 신규 유저 유입을 만든다. 광고 수익 구조는 라운드마다 페이지가 전환되는 포맷 특성상 일반 콘텐츠 사이트 대비 세션당 PV가 약 3~4배 높다.

### What Makes This Special

경쟁사(TierMaker, BracketFights)는 도구를 제공한다. Save One Drop One은 **콘텐츠 단위**를 제공한다. 핵심 제품 객체는 단순한 브라켓이 아니라 Bracket Pack — 제목, 썸네일, 참가 항목, 예상 진행 시간, OBS-friendly 레이아웃, 결과 이미지 내보내기, 결과 공유 링크, 공유 메타데이터를 하나의 패키지로 묶은 방송-ready 콘텐츠 단위다. 스트리머는 준비 없이 10분 이내 방송에 올릴 수 있다.

차별화의 두 번째 축은 포맷 인지도다. "Save One Drop One"은 K-팝 팬덤 커뮤니티(YouTube, Quotev, uQuiz, r/kpop)에서 이미 자생적으로 수백 개 시리즈가 존재한다. 신규 행동을 만드는 것이 아니라, 이미 검증된 수요에 전용 플랫폼을 제공하는 것이다. TierMaker가 광고·마케팅 없이 5개월 만에 15만 세션을 달성한 것과 동일한 UGC-SEO 플라이휠이 작동한다.

방어력은 단일 기능이 아닌 루프에서 나온다. OBS 레이아웃, 결과 이미지, 결과 공유, UGC 생성, SEO 페이지는 각각 복제 가능하지만, 스트리머별 결과 페이지 → 시청자 재플레이 → 공유 링크 → 공개 브라켓 페이지가 연결된 콘텐츠 그래프는 복제할 수 없다. 두 사용자 결과 비교는 이 루프가 검증된 뒤 재방문을 강화하는 Growth 확장으로 다룬다.

## Project Classification

| 항목 | 값 |
|------|-----|
| **프로젝트 유형** | Web App (웹 우선, OBS 브라우저 소스 호환, 모바일 대응) |
| **도메인** | Entertainment / Creator Tools — 규제 도메인 해당 없음 |
| **복잡도** | Medium — UGC 모더레이션, SEO 플라이휠, 실시간 방송 UI, 바이럴 루프 설계 포함 |
| **프로젝트 컨텍스트** | Greenfield — 기존 시스템 없음, 신규 제품 |

## Success Criteria

### User Success

**스트리머 성공 기준**
- 스트리머가 Bracket Pack을 선택한 시점부터 OBS 방송 투입까지 10분 이내 완료
- 동일 스트리머가 Save One Drop One을 **2회 이상 반복 사용** (1회 체험 vs 정기 포맷 채택의 분기점)
- 방송 중 OBS 레이아웃에서 시각적 오류, 레이아웃 깨짐 없음

**시청자 성공 기준**
- 단일 스트리머 방송 1회에서 파생된 시청자 개인 플레이 세션 **1,000회 이상**
- 첫 방문자가 관심사 기반 온보딩(카테고리 선택 팝업)을 통해 10초 이내 첫 브라켓에 도달
- 결과 이미지 공유 후 링크를 통한 재방문 세션이 분석 이벤트로 추적되며, 초기 검증용 Bracket Pack 1개 이상에서 공유 링크 유입 세션 50회 이상 발생
- 계정 없이 투표·플레이 완료 가능 (마찰 제로)

**UGC 제작자 성공 기준**
- 브라켓 항목 추가 시 YouTube 링크 붙여넣기 → 제목, 썸네일, 시작 지점(second) 자동 추출
- 이미지 링크(imgur 등) 직접 붙여넣기로 항목 이미지 즉시 설정 가능
- 사용자가 생성한 브라켓이 공개 인덱싱 후 검색·공유를 통해 독립적인 플레이 세션을 만듦
- 초기 K-팝·애니 Bracket Pack 중 **10개 이상**이 방송 또는 커뮤니티 공유를 통해 각 100회 이상 플레이 세션 생성

### Business Success

**단기 (0~6개월) — 바이럴 루프 검증**
- TierMaker 또는 유사 랭킹 콘텐츠 사용 스트리머 **3명 이상**이 2회 이상 반복 사용
- 단일 방송 → 시청자 플레이 세션 1,000회 이상 (바이럴 루프 첫 검증)
- K-팝·애니 Bracket Pack 10개 이상이 각 100회 이상 플레이 세션 생성

**초기 Go-to-Market / 마케팅 실험**
- TierMaker를 주 콘텐츠로 활용하는 스트리머에게 도네이션 메시지와 함께 Save One Drop One Bracket Pack을 직접 제안한다
- 도네이션 메시지는 "새 도구 소개"가 아니라 "오늘 방송에서 바로 쓸 수 있는 브라켓 콘텐츠"로 포지셔닝한다
- 1차 타겟은 TierMaker 방송 빈도가 높고 채팅 참여가 활발한 미드티어 스트리머이며, 도네이션 후 방송 내 사용 여부·채팅 반응·파생 플레이 세션을 추적한다

**중기 (6~12개월) — SEO 플라이휠 가동**
- 월 세션 **50만 이상** (광고 수익 의미 있는 구간)
- UGC 브라켓 **500개 이상** 누적

**수익화 전환점**
- 초기 6개월: 광고 매출보다 반복 사용률, 파생 플레이 세션, 공유율, UGC 생성률 우선
- 50만 세션 도달 시: 광고(세션당 ~4 PV × CPM $3~11) 의미 있는 수익 구간 진입
- 중장기: 크리에이터 프리미엄 구독 도구 출시

### Technical Success

- 방송 화면(OBS 브라우저 소스 URL) 로드 시간 3초 이내, 방송 중 레이아웃 안정성 보장
- 공개 브라켓 페이지 — 각각 고유 title/description, Open Graph 이미지, canonical URL 보유
- 결과 이미지 생성(브라켓 트리) Twitter/Reddit/Discord 공유 최적화 포맷
- YouTube 링크 파싱: 제목, 썸네일, 시작 second 자동 추출 (항목 생성 시)
- 이미지 URL 직접 입력(imgur, 외부 CDN 등) → 항목 이미지 즉시 렌더링
- 시청자 익명 투표·플레이 — 계정 없이 완전 동작

### Measurable Outcomes

초기 검증의 세 가지 핵심 질문 (MVP 통과 기준):
1. **스트리머가 같은 플랫폼을 2회 이상 방송에 사용하는가?**
2. **한 번의 방송이 시청자 플레이 세션 1,000회 이상을 파생시키는가?**
3. **결과 이미지 공유가 공유 링크 유입 세션 50회 이상을 만드는가?**

## Product Scope

### MVP — Minimum Viable Product

- 방송-ready Bracket Pack 100개 이상 (K-팝·애니 우선, 게임·스포츠 확장 검증): 제목, 썸네일, 참가 항목, 예상 진행 시간, OBS 레이아웃, 공유 링크 포함
- 첫 방문자 관심사 온보딩 팝업: 카테고리 선택(Music / Anime / Sports / Gaming 등) → 즉시 해당 브라켓 화면 진입 (계정 불필요)
- 카테고리 내 세부 태그 탐색: 예) 카테고리 `게임` → 태그 `브롤스타즈`, `리그 오브 레전드`, `마인크래프트`
- 1v1 토너먼트 플레이 UI (방송 최적화, 모바일 대응)
- 비정규 참가자 수 지원 및 부전승 시스템: 참가자가 정확히 16/32/64/128명이 아니어도 브라켓 생성 가능
- 진행 상황 로컬 저장: 새로고침 후에도 진행 상태 유지, 미완료 브라켓 복귀 시 이어하기 선택 제공
- OBS 브라우저 소스 호환 방송 레이아웃
- 결과 브라켓 트리 이미지 내보내기 (Twitter/Reddit/Discord 공유 최적화)
- 결과 화면 플레이 통계: 총 소요 시간, 선택 경로, 커뮤니티 집계 결과 표시
- 방송 중 시청자 참여 링크 기반 실시간 투표
- 공개 결과 페이지 댓글: 방송 후 논쟁과 재방문을 유도하되 신고·삭제·비공개 처리와 연결
- UGC 브라켓 생성:
  - YouTube 링크 붙여넣기 → 제목·썸네일·시작 second 자동 추출
  - 이미지 URL 붙여넣기(imgur 등) → 항목 이미지 즉시 설정
  - 공개 인덱싱 지원
- Bracket Pack preview mode 및 Curated/UGC 구분 표시
- 최소 UGC 운영 기능: 공개/비공개 상태, 신고, 관리자 takedown
- 기본 광고 슬롯 (결과 화면)

### Growth Features (Post-MVP)

- 결과 비교 화면 (두 사용자 결과 나란히) — 바이럴 루프 검증 후 효과 재평가
- Twitch Extension 라이브 폴 연동 (v1.5)
- 즐겨찾기, 플레이 히스토리, 저장된 브라켓 재방문 흐름
- 크리에이터 애널리틱스 대시보드
- 커스텀 테마·브랜딩 (방송 프리미엄 스킨)
- B2B Featured 브라켓
- Discord 봇 연동
- Weekly Featured Bracket

### Vision (Future)

- AI Auto-Generate: 주제 입력 → 브라켓 자동 생성
- AI 패널, AI 배틀 시뮬레이션
- 크리에이터 rev-share
- 네이티브 앱
- 글로벌 확장 및 한국어 지원

## User Journeys

### Journey 1: 스트리머 — 첫 방송 성공 경로

**페르소나: Maya, Twitch 스트리머 (구독자 45K, K-팝 전문)**

*Opening Scene:* Maya는 오늘 저녁 방송 주제를 고민하고 있다. 지난 주 TierMaker로 아이돌 랭킹을 했는데 채팅이 꽤 활발했다. 비슷한 포맷을 찾다가 트위터에서 Save One Drop One 링크를 발견한다. 클릭하니 K-팝 카테고리 브라켓이 이미 수십 개 준비되어 있다.

*Rising Action:* "4세대 걸그룹 멤버 64강"을 클릭한다. 썸네일이 깔끔하고, 예상 진행 시간이 90분으로 표시된다. "방송 시작" 버튼을 누르자 OBS용 URL이 복사된다. OBS에 붙여넣고 미리보기를 확인한다 — 이미지가 크고 선명하다. 총 소요 시간: 6분.

*Climax:* 방송 중 "BLACKPINK vs aespa" 매치가 나오는 순간 채팅이 폭발한다. Maya가 aespa를 선택하자 구독자들이 "틀렸어요!" "이건 진짜 논란이다"를 쏟아낸다.

*Resolution:* 방송 후 결과 이미지를 트위터에 올린다. "내 최종 1위가 이거였는데 동의해?" — 6시간 만에 리트윗 200개. 링크를 타고 들어온 팬들이 직접 플레이를 시작한다. 다음 주 방송 주제는 이미 정했다: "4세대 보이그룹 편."

**요구 기능:** 카테고리별 큐레이션 라이브러리, 예상 진행 시간 표시, OBS URL 원클릭 복사, 결과 이미지 내보내기(Twitter 최적화)

---

### Journey 2: 시청자 — 방송 후 플레이 및 공유

**페르소나: Jin, 대학생 K-팝 팬 (Maya 구독자)**

*Opening Scene:* Jin은 Maya의 방송 VOD를 다음 날 보다가 "이거 나도 해보고 싶다"는 생각이 든다. 채팅에서 스트리머가 공유한 링크를 찾아 클릭한다.

*Rising Action:* 처음 사이트에 들어오자 팝업이 뜬다. "어떤 걸 좋아하세요?" — K-pop을 선택하자 바로 브라켓 목록이 나온다. "4세대 걸그룹 멤버 64강"을 클릭해 플레이 시작. 계정 없이 바로 된다.

*Climax:* 64강을 완주한다. 최종 1위가 나오는 순간 — Maya와 다른 결과다. 결과 이미지를 저장해 디코 친구들한테 올린다.

*Resolution:* 친구 셋이 공유 결과 링크를 타고 들어와 Jin의 우승자와 선택 경로를 확인한다. 한 명은 댓글로 "이 선택은 말이 안 된다"고 남기고, 나머지는 Play again 버튼으로 각자 플레이한다. 서로 결과가 다 다르다. Jin은 다음 날 애니 카테고리도 해본다.

**요구 기능:** 첫 방문 온보딩 팝업(카테고리 선택 → 즉시 브라켓 진입), 익명 플레이, 결과 이미지 내보내기(Discord/SNS 최적화), 스트리머 공유 링크 → 동일 브라켓 직접 연결, 공유 결과 링크 직접 진입, 공개 결과 댓글, Play again 재진입

---

### Journey 3: UGC 제작자 — 브라켓 제작 및 배포

**페르소나: Sam, 애니 팬 유튜버 (My Hero Academia 전문, 구독자 12K)**

*Opening Scene:* Sam은 MHA 캐릭터 토너먼트 콘텐츠를 만들려고 항상 브라켓 도구를 찾았다. BracketFights는 이미지 넣기가 너무 번거로웠다. 트위터에서 Save One Drop One을 발견한다.

*Rising Action:* 브라켓 만들기를 클릭한다. 항목 추가 화면에서 유튜브 링크를 붙여넣으니 캐릭터 소개 영상의 제목, 썸네일, 시작 초가 자동으로 채워진다. 이미지가 마음에 안 드는 항목은 imgur 링크를 바로 붙여넣어 교체한다. 32개 항목을 30분 만에 완성한다.

*Climax:* 공개 설정으로 저장 후 유튜브 커뮤니티 탭에 링크를 올린다. 구독자들이 몰려든다.

*Resolution:* 3일 후 r/BokuNoHeroAcademia에 이 브라켓 링크가 올라온다. 검색에도 잡히기 시작하고 플랫폼 인기 브라켓 상단에 노출된다.

**요구 기능:** YouTube URL 자동 파싱(제목·썸네일·시작 second), 이미지 URL 직접 입력(imgur 등), 공개/비공개 설정, 공개 브라켓 SEO 페이지, 제작자 attribution

---

### Journey 4: 플랫폼 운영자 — UGC 모더레이션

**페르소나: 플랫폼 관리자 (Admin)**

*Opening Scene:* 신고 알림이 들어온다. UGC 브라켓 하나에 NSFW 이미지가 포함됐다는 신고 3건.

*Rising Action:* 관리자 대시보드에서 신고된 브라켓과 댓글을 확인한다. 문제 항목을 즉시 비공개 처리하고 제작자에게 경고를 보낸다. 신고 누적 또는 명백한 고위험 콘텐츠는 광고 노출 제외 상태로 전환한다.

*Climax:* 해당 브라켓이 검색 인덱스에서 제거됐고 광고 슬롯이 비활성화됐는지 확인한다. 제작자가 재수정 후 재심을 요청한다.

*Resolution:* 수정된 브라켓을 검토 후 재공개 처리하고 광고 제한 상태를 해제한다. 전체 플로우 30분 이내 완료. 스트리머가 방송에 쓰기 전에 문제가 해결됐다.

**요구 기능:** 신고 수신 및 큐 관리, 브라켓/댓글 비공개·공개 전환(즉시 적용), 검색 인덱스 제거, 광고 제한 상태 관리, 제작자 알림/경고

---

### Journey Requirements Summary

| 기능 영역 | 스트리머 | 시청자 | UGC 제작자 | 운영자 |
|----------|---------|--------|------------|--------|
| 큐레이션 브라켓 라이브러리 | ★★★ | ★★ | — | — |
| 온보딩 팝업 (카테고리 선택) | — | ★★★ | — | — |
| OBS URL 복사 | ★★★ | — | — | — |
| 익명 플레이 | — | ★★★ | — | — |
| 결과 이미지 내보내기 | ★★★ | ★★★ | — | — |
| 공개 결과 댓글 | ★★ | ★★★ | — | ★★ |
| 실시간 시청자 투표 | ★★★ | ★★★ | — | — |
| YouTube 링크 자동 파싱 | — | — | ★★★ | — |
| 이미지 URL 직접 입력 | — | — | ★★★ | — |
| 공개 브라켓 SEO 페이지 | — | — | ★★★ | — |
| UGC 신고·모더레이션 | — | — | — | ★★★ |
| 관리자 비공개 전환 | — | — | — | ★★★ |

## Domain-Specific Requirements

### Compliance & Regulatory

**DMCA / 콘텐츠 신고-삭제 (Safe Harbor)**
- UGC 플랫폼으로서 DMCA Safe Harbor(Section 512) 요건 충족: 신고-삭제 절차, 반복 침해자 정책 문서화
- IP 신고 접수 → 검토 → 삭제/복구 흐름을 운영 프로세스로 구축
- 공개 브라켓 페이지의 팬아트·팬덤 이미지는 기회 중심으로 운영하되, 공식 권리자 요청 발생 시 빠른 대응 채널 확보

**광고 컴플라이언스**
- 광고 Day-one 운영 기준: 명백한 고위험 UGC(NSFW, 혐오, doxxing)는 광고 노출 제외
- Google AdSense/AdX 정책 준수: 콘텐츠 분류, 신고 누적 페이지 광고 제한 자동화

**아동·미성년 트래픽 (COPPA 관련)**
- K-팝, 애니, 게임 카테고리는 미성년 사용자 유입 가능성 있음
- MVP에서는 과도한 개인정보 수집 없이 익명 플레이 기본값으로 운영 → COPPA 리스크 최소화
- 계정 생성 시 연령 확인 플로우는 추후 기능 확장 시 추가 검토

**크리에이터 ToS (핵심 차별화 요소)**
- 스트리머의 방송 상업적 이용 명시적 허용 (광고 수익, 후원, 구독 포함)
- ToS 핵심 문구: "Save One Drop One 브라켓을 방송 콘텐츠로 사용할 수 있으며, 해당 방송에서 발생하는 일반적인 수익을 얻을 수 있다"

### Technical Constraints

**SEO & 크롤링**
- 모든 공개 브라켓 페이지: SSR 또는 Static Generation 필수 (SPA-only는 검색 인덱싱 불가)
- 각 페이지: 고유 `<title>`, `<meta description>`, Open Graph 태그, canonical URL
- 신고로 비공개 전환된 페이지: noindex 즉시 적용, 검색엔진 캐시 제거 요청 플로우 확보

**이미지 처리 & 외부 URL 의존**
- 외부 이미지 URL(imgur, YouTube 썸네일 등) 직접 참조 시 CORS, 핫링크 차단, URL 만료 리스크 존재
- 중요 항목 이미지는 자체 스토리지에 프록시·캐싱 권장 (특히 큐레이션 Bracket Pack)
- YouTube oEmbed/Data API 쿼터 관리: 항목 생성 시 API 호출 빈도 제한 처리

**방송 안정성 (OBS)**
- OBS 브라우저 소스는 복잡한 JS 로딩에 민감 — 방송 레이아웃 페이지는 경량화 필수
- 방송 중 네트워크 단절 시 라운드 상태 복구(round state persistence) 고려

### Risk Mitigations

| 리스크 | 완화 방향 |
|--------|----------|
| DMCA 신고 폭증 | 신고-삭제 자동화 + 관리자 큐 + 반복 침해자 차단 |
| K-팝/애니 IP 분쟁 | 팬 UGC 특성 유지, 상업 캠페인 확장 시 별도 라이선싱 검토 |
| 광고 차단기 (게이밍 오디언스 ~40%+) | 결과 화면 광고 집중, 크리에이터 프리미엄 수익 비중 중장기 확대 |
| OBS 방송 중 레이아웃 깨짐 | 방송 URL 별도 경량 페이지, 스트레스 테스트 필수 |
| 미성년 개인정보 | 익명 플레이 기본값, 계정 수집 최소화 |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. 포맷 혁신: 검증된 문화 포맷의 서구권 수출**

한국 이상형 월드컵은 스트리밍 문화와 결합해 수년간 검증된 포맷이다. 서구권에는 이 포맷에 전용으로 설계된 플랫폼이 존재하지 않는다. Save One Drop One은 새로운 포맷을 발명하는 것이 아니라, 이미 K-팝 팬덤 커뮤니티(YouTube, Quotev, uQuiz)에서 자생적으로 쓰이는 포맷에 전용 인프라를 제공한다. 시장 개척이 아닌 **검증된 수요의 패키징**이라는 점에서 리스크가 낮고 실행 속도가 빠른 혁신이다.

**2. 제품 단위 혁신: 도구 → 콘텐츠 단위**

기존 경쟁사(TierMaker, BracketFights)는 "도구"를 제공한다. Save One Drop One은 **Bracket Pack이라는 콘텐츠 단위**를 제공한다. 제목, 썸네일, 예상 진행 시간, OBS 레이아웃, 공유 메타데이터가 하나로 묶인 방송-ready 패키지는 스트리머의 준비 시간을 제거한다. "켜면 방송이 시작되는 콘텐츠 단위"는 스트리머 도구 시장에서 새로운 제품 범주를 정의한다.

**3. 채널 혁신: 브라켓 + 방송 워크플로우의 결합**

브라켓 도구와 방송 워크플로우 최적화(OBS 브라우저 소스)를 결합한 제품은 서구권에 존재하지 않는다. 스트리머가 방송 중 브라켓을 진행하면 시청자가 웹 링크로 동시 투표하고, 방송 후 같은 브라켓을 재플레이하는 "방송-재생산" 루프는 어떤 기존 제품도 완성하지 못한 인터랙션 패턴이다.

**4. 성장 루프 혁신: 스트리머-시청자-UGC-SEO 복합 플라이휠**

TierMaker는 UGC-SEO 플라이휠을 증명했다. Save One Drop One은 여기에 스트리머 채널을 선행 트리거로 추가한다: 스트리머 방송 → 시청자 재플레이 → 결과 이미지 공유 → UGC 생성 → SEO 인덱싱 → 신규 유저 유입 → 다시 스트리머 콘텐츠 소재. 이 4단계 복합 루프는 단일 채널 플라이휠보다 구조적으로 강력하며, 어느 한 단계가 끊겨도 나머지가 계속 작동한다.

### Market Context & Competitive Landscape

| 혁신 축 | 기존 대안 | Save One Drop One의 공백 |
|---------|---------|------------------------|
| 1v1 브라켓 포맷 | BracketFights (도구만) | 방송-ready 콘텐츠 단위 없음 |
| 스트리밍 콘텐츠 도구 | TierMaker (tier list), StreamElements (알림/오버레이) | 브라켓 콘텐츠 + 방송 최적화 결합 없음 |
| K-팝/애니 팬덤 브라켓 | Quotev, uQuiz (범용 퀴즈) | 전용 토너먼트 플랫폼 없음 |
| UGC-SEO 플라이휠 | TierMaker (tier list) | 브라켓 포맷으로 동일 플라이휠 적용한 제품 없음 |

### Validation Approach

1. **포맷 검증 (0~1개월)**: 스트리머 3명이 Bracket Pack을 방송에 사용하고 채팅 반응이 살아나는가?
2. **콘텐츠 단위 검증 (1~2개월)**: 스트리머가 10분 이내 방송에 올릴 수 있는가? 2회 이상 반복 사용하는가?
3. **루프 검증 (2~3개월)**: 단일 방송에서 시청자 플레이 1,000회 이상 파생되는가?
4. **플라이휠 검증 (3~6개월)**: UGC 브라켓이 검색 유입을 만드는가?

### Risk Mitigation

| 혁신 리스크 | 완화 방향 |
|-----------|---------|
| 서구권 팬덤이 포맷을 모를 수 있음 | "Save One Drop One"이 K-팝 커뮤니티에서 이미 통용 중 — 교육 비용 낮음 |
| 스트리머가 새 도구로 전환하지 않을 수 있음 | "새 도구"가 아니라 "오늘 방송할 콘텐츠"로 포지셔닝 |
| BracketFights가 OBS 지원을 빠르게 복제할 수 있음 | 큐레이션 Bracket Pack 라이브러리와 커뮤니티 축적은 코드보다 복제 어려움 |
| 바이럴 루프가 작동하지 않을 수 있음 | 4단계 루프가 독립적으로도 가치 — 어느 단계가 안 되도 다른 경로로 트래픽 유입 가능 |

## Web App Specific Requirements

### Project-Type Overview

Save One Drop One은 React Router 7 framework mode 기반의 SSR/SSG 하이브리드 웹 앱이다. 공개 브라켓 페이지의 SEO 인덱싱이 핵심 성장 엔진이므로 서버 사이드 렌더링 또는 정적 생성이 필수다. 플레이 UI와 방송 레이아웃은 인터랙티브 클라이언트 렌더링 방식으로 운영된다. 데이터 저장소, 백엔드 런타임, 배포 플랫폼은 아키텍처 단계에서 확정한다.

### Technical Architecture Considerations

**렌더링 전략**
- 공개 브라켓 페이지, 카테고리 페이지, 결과 공유 페이지: SSR 또는 Static Generation 필수 — 검색 인덱싱 보장
- 플레이 UI (1v1 진행 화면): 클라이언트 사이드 SPA — 빠른 인터랙션 우선
- OBS 방송 레이아웃 페이지: 경량 정적/SSR 페이지 — Chromium 브라우저 소스 환경에서 안정적 로드
- 프레임워크: **React Router 7 framework mode 확정**. Next.js는 사용하지 않는다.
- 데이터 저장소, 백엔드 런타임, 배포 플랫폼: **아키텍처 단계에서 결정**

**실시간 요건**
- 방송 컨트롤러(관리자) ↔ OBS 화면 동기화 필요 (다음 라운드 진행 시 즉시 반영)
- 구현 방식(WebSocket, SSE, 3rd-party 실시간 라이브러리): **아키텍처 단계에서 결정**

### Browser Matrix

| 환경 | 지원 범위 |
|------|---------|
| 일반 사용자 (플레이, UGC 생성) | Chrome, Firefox, Safari, Edge 최신 2버전 |
| OBS 브라우저 소스 (방송 레이아웃) | Chromium 기반 — OBS 내장 브라우저 최적화 필수 |
| 모바일 | iOS Safari, Android Chrome 최신 2버전 |
| IE / 구형 브라우저 | 미지원 |

### Responsive Design

- **방송 레이아웃**: 고정 해상도 최적화 (1920×1080 기준) — OBS 캔버스 사이즈 맞춤, 반응형 불필요
- **플레이 UI**: 모바일 우선 반응형 — 시청자가 스마트폰으로 플레이하는 시나리오가 주
- **UGC 생성 도구**: 데스크탑 위주이나 태블릿 대응 권장
- **랜딩·브라켓 목록·결과 페이지**: 완전 반응형 (SEO 트래픽의 모바일 비중 고려)

### Performance Targets

| 페이지 유형 | 목표 |
|-----------|------|
| 공개 브라켓 페이지 (SEO 랜딩) | LCP < 2.5s, CLS < 0.1 (Core Web Vitals 기준) |
| OBS 방송 레이아웃 | 초기 로드 < 3s, 이후 라운드 전환 < 500ms |
| 플레이 UI (1v1 선택 화면) | 선택 후 다음 매치 전환 < 300ms |
| 결과 이미지 생성 | < 3s (브라켓 트리 렌더링 + 다운로드 준비) |

### SEO Strategy

- 모든 공개 브라켓 페이지: 고유 `<title>`, `<meta description>`, Open Graph 태그, canonical URL 필수
- URL 구조: `/brackets/[category]/[slug]` — 카테고리 taxonomy가 URL에 반영
- 카테고리 페이지(`/kpop`, `/anime`, `/sports` 등): 독립 SEO 랜딩 페이지로 운영
- 결과 공유 페이지: Open Graph 이미지(브라켓 트리 이미지) 포함 — 소셜 미리보기 최적화
- 비공개 전환 브라켓: `noindex` 즉시 적용
- Sitemap 자동 생성: 공개 브라켓 페이지 포함

### Accessibility Level

- 목표: WCAG 2.1 AA 완전 준수보다 실용적 기본 접근성 확보
- 키보드 네비게이션: 플레이 UI에서 키보드로 선택 가능 (방향키 또는 단축키)
- 색상 대비: 텍스트/배경 대비비 4.5:1 이상
- 이미지 alt 텍스트: 브라켓 항목 이미지에 alt 속성 필수 (SEO 겸용)
- Focus 표시: 키보드 포커스 시각적 표시 유지

### Implementation Considerations

- **YouTube 데이터 API**: 항목 생성 시 메타데이터 자동 추출 — API 키 관리, 쿼터 제한 처리, 실패 시 수동 입력 fallback 필요
- **이미지 프록시/캐싱**: 외부 이미지 URL(imgur, YouTube CDN) 장기 안정성 불보장 — 중요 이미지 자체 스토리지 복사 권장
- **결과 이미지 생성**: 브라켓 트리 PNG/JPG 내보내기 — Canvas API 또는 서버 사이드 렌더링 방식은 아키텍처 단계에서 결정
- **광고 슬롯**: 결과 화면 광고 — AdSense/AdX 스크립트 삽입, Core Web Vitals 영향 최소화 필요

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP 접근 방식:** 바이럴 루프 검증 MVP — 광고 매출이 아니라 세 가지 루프 지표를 먼저 증명한다.
1. 스트리머가 2회 이상 반복 사용하는가?
2. 한 번의 방송이 시청자 플레이 세션 1,000회 이상을 파생시키는가?
3. 결과 이미지 공유가 공유 링크 유입 세션 50회 이상을 만드는가?

이 세 가지가 검증되면 광고, 크리에이터 프리미엄, B2B 브라켓은 트래픽 위에 얹히는 수익화 레이어가 된다.

**리소스:** GM 1인 개발 (AI-assisted vibe coding). 개발자 피드백 네트워크 보유. 외부 투자자 없음(현재). Vibe coding 방식으로 단일 개발자의 실행 속도를 팀 수준으로 끌어올릴 수 있어 MVP 타임라인이 일반 1인 개발보다 유리하다.

### MVP Feature Set (Phase 1)

**지원되는 핵심 사용자 여정:**
- Journey 1: 스트리머 — 방송-ready Bracket Pack 선택 → OBS 투입 → 결과 공유
- Journey 2: 시청자 — 온보딩 팝업 → 익명 플레이 → 결과 이미지 공유
- Journey 3: UGC 제작자 — YouTube/이미지 URL로 브라켓 생성 → 공개 인덱싱
- Journey 4: 운영자 — 신고 수신 → 비공개 처리 → 재심

**Must-Have 기능:**
- 큐레이션 Bracket Pack 100개 이상 (K-팝·애니 우선)
- 첫 방문자 관심사 온보딩 팝업 (카테고리 선택 → 즉시 브라켓 진입)
- 1v1 토너먼트 플레이 UI (방송 최적화, 모바일 대응)
- 진행 상황 로컬 저장 및 미완료 브라켓 이어하기
- OBS 브라우저 소스 호환 방송 레이아웃 (1920×1080)
- 결과 브라켓 트리 이미지 내보내기 (SNS 공유 최적화)
- 결과 화면 플레이 통계 및 커뮤니티 집계 결과
- 공개 결과 페이지 댓글
- 방송 중 시청자 참여 링크 기반 실시간 투표
- UGC 브라켓 생성 (YouTube URL 파싱, 이미지 URL 입력, 공개 인덱싱)
- Curated/UGC 구분 표시 및 preview mode
- 최소 UGC 운영 기능 (공개/비공개, 신고, 관리자 takedown)
- 기본 광고 슬롯 (결과 화면)
- 공개 브라켓 SEO 페이지 (SSR, Open Graph, sitemap)

### Post-MVP Features

**Phase 2 — Growth (바이럴 루프 검증 후):**
- 결과 비교 화면 (바이럴 루프 데이터 기반 효과 재평가 후 결정)
- Twitch Extension 라이브 폴 연동
- 즐겨찾기와 플레이 히스토리 기반 재방문 기능
- 크리에이터 애널리틱스 대시보드
- 커스텀 테마·브랜딩 (방송 프리미엄 스킨)
- B2B Featured 브라켓
- Discord 봇 연동
- Weekly Featured Bracket

**Phase 3 — Vision:**
- AI Auto-Generate (주제 → 브라켓 자동 생성)
- AI 패널, AI 배틀 시뮬레이션
- 크리에이터 rev-share
- 네이티브 앱
- 글로벌 확장 및 한국어 지원

### Risk Mitigation Strategy

**기술 리스크**

| 리스크 | 완화 방향 |
|--------|---------|
| OBS 방송 중 레이아웃 불안정 | 방송 URL 전용 경량 페이지 분리, OBS 환경 스트레스 테스트 우선 |
| YouTube API 쿼터 초과 | oEmbed fallback + 수동 입력 경로 확보, 캐싱으로 API 호출 최소화 |
| 결과 이미지 생성 지연 | 서버 사이드 렌더링 vs Canvas API 아키텍처 단계에서 성능 검증 |
| 실시간 동기화 복잡도 | 3rd-party 라이브러리 우선 검토, 아키텍처 단계에서 결정 |

**시장 리스크**

| 리스크 | 완화 방향 |
|--------|---------|
| 스트리머 채택 실패 | "새 도구"가 아닌 "오늘 방송할 콘텐츠"로 포지셔닝. 초기 DM 아웃리치 시 Bracket Pack 직접 제시 |
| 바이럴 루프 미작동 | 4단계 루프 중 어느 단계가 안 되도 나머지 경로로 트래픽 유입 가능 |
| UGC 품질 저하 | 기본 index + 빠른 대응 원칙 — 사전 검수보다 신고 후 대응으로 성장 속도 유지 |

**리소스 리스크**

| 리스크 | 완화 방향 |
|--------|---------|
| 1인 개발 병목 | Vibe coding으로 실행 속도 보완. 큐레이션 Bracket Pack 100개 준비는 개발과 병렬 진행 가능 |
| MVP 범위 과부하 | 바이럴 루프 검증 3가지 질문을 북극성으로 유지 — 이에 기여하지 않는 기능은 즉시 deferred |

---

## Functional Requirements

> **FR 분류 기준:**
> - **MVP** — 바이럴 루프 검증에 필수 (스트리머 온보딩 → 시청자 재플레이 → 결과 공유 → SEO 인덱싱)
> - **Growth** — 루프가 작동한 이후 성장 가속에 필요
> - **Vision** — 장기 차별화 또는 수익화

### 1. 브라켓 탐색 및 홈

| FR | 설명 | Phase |
|----|------|-------|
| FR1 | 방문자는 로그인 없이 공개 브라켓을 탐색하고 플레이할 수 있다 | MVP |
| FR2 | 홈 화면은 주간 Featured 브라켓과 트렌딩 브라켓 목록을 표시한다 | MVP |
| FR3 | 브라켓 카드에는 총 플레이 횟수와 현재 라이브 방송 중인 스트리머 수가 표시된다 | MVP |
| FR4 | 방문자는 현재 Save One Drop One을 방송 중인 스트리머 목록을 사이드바에서 확인할 수 있다 | Growth |
| FR5 | 방문자는 카테고리(K-팝, 애니메이션, 게임, 스포츠 등)로 브라켓을 필터링할 수 있다 | MVP |
| FR5a | 방문자는 카테고리 내 세부 태그로 브라켓을 추가 필터링할 수 있다 (예: 카테고리 `게임` → 태그 `브롤스타즈`) | MVP |
| FR6 | 방문자는 브라켓 제목 및 설명으로 검색할 수 있다 | Growth |
| FR7 | 사용자는 브라켓을 즐겨찾기(♡)에 추가할 수 있다 (로그인 필요) | Growth |

### 2. Bracket Pack 생성

| FR | 설명 | Phase |
|----|------|-------|
| FR8 | 인증된 사용자는 새 Bracket Pack을 생성할 수 있다 | MVP |
| FR9 | 생성자는 YouTube URL을 붙여넣으면 시스템이 제목과 썸네일을 자동으로 파싱한다 | MVP |
| FR10 | YouTube URL 파싱 시 시작 second(재생 시점)를 지정할 수 있다 | MVP |
| FR11 | 생성자는 이미지 URL(imgur 등)을 붙여넣어 브라켓 항목 이미지를 추가할 수 있다 | MVP |
| FR12 | 생성자는 로컬 이미지 파일을 업로드하여 브라켓 항목 이미지를 추가할 수 있다 | MVP |
| FR13 | 생성자는 항목 이름, 이미지, 선택적 부가 정보(그룹명 등)를 입력할 수 있다 | MVP |
| FR14 | 시스템은 항목 수에 따라 표준 토너먼트 크기와 전체 참가자 수 옵션을 제공한다 (예: 133개 항목이면 16/32/64/128/133 옵션 제공) | MVP |
| FR14a | 시스템은 선택한 토너먼트 크기가 2의 거듭제곱이 아니어도 부전승을 자동 배정해 유효한 1v1 브라켓으로 진행한다 | MVP |
| FR15 | 생성자는 브라켓을 공개/비공개로 설정할 수 있다 | MVP |
| FR16 | 생성자는 기존 Bracket Pack을 복제하여 수정할 수 있다 | Growth |
| FR17 | 시스템은 Bracket Pack 생성 완료 즉시 OBS 브라우저 소스 URL을 제공한다 | MVP |

### 3. 매치업 (1v1 게임 루프)

| FR | 설명 | Phase |
|----|------|-------|
| FR18 | 플레이어는 브라켓 시작 시 전체 참가자 목록과 예상 소요 시간을 확인할 수 있다 | MVP |
| FR19 | 플레이어는 매 라운드에서 두 항목(A vs B)을 비교하고 하나를 선택할 수 있다 | MVP |
| FR20 | 플레이어는 키보드(A / D 키) 또는 클릭으로 선택할 수 있다 | MVP |
| FR21 | 시스템은 현재 매치의 진행 경과(라운드, 매치 번호, 진행 도트)를 표시한다 | MVP |
| FR22 | 플레이어는 이전 선택으로 돌아가는 Undo를 사용할 수 있다 | MVP |
| FR23 | 플레이어는 처음부터 재시작하는 Restart를 사용할 수 있다 | MVP |
| FR24 | 시스템은 플레이어의 브라켓 진행 상태를 로컬에 자동 저장하며, 새로고침 후에도 현재 라운드·선택 이력·남은 매치가 유지된다 | MVP |
| FR24a | 플레이어가 미완료 브라켓에 다시 방문하면 처음부터 시작 또는 이어하기를 선택할 수 있다 | MVP |
| FR25 | OBS 시청자는 방송 모드 화면을 16:9 레이아웃으로 보며, 1920×1080 캔버스에서 주요 항목 이미지·이름·진행 상태가 잘림 없이 표시된다 | MVP |

### 4. 결과 및 공유

| FR | 설명 | Phase |
|----|------|-------|
| FR26 | 토너먼트 완료 시 챔피언 화면이 표시된다 (항목 이미지, 이름, 그룹 정보 포함) | MVP |
| FR27 | 결과 화면에서 사용자의 플레이 통계(총 소요 시간, 연승 기록, 속도 백분위)를 확인할 수 있다 | MVP |
| FR28 | 결과 화면에서 챔피언까지의 매치업 경로(Final Eight replay)를 시각적으로 확인할 수 있다 | MVP |
| FR29 | 결과 화면에서 전체 커뮤니티의 집계 결과(Most popular, Biggest upset, Fastest run)를 확인할 수 있다 | MVP |
| FR30 | 사용자는 결과를 이미지로 다운로드할 수 있다 | MVP |
| FR31 | 사용자는 결과 페이지 링크를 복사할 수 있다 | MVP |
| FR32 | 사용자는 결과를 X(Twitter), Reddit, Discord에 직접 공유할 수 있다 | MVP |
| FR33 | 공개 결과 페이지는 OG 이미지와 메타 태그를 포함한 SSR 렌더링으로 제공된다 | MVP |
| FR34 | 방문자는 결과 공유 링크를 클릭하면 해당 브라켓의 결과 화면으로 직접 이동할 수 있다 | MVP |
| FR35 | 방문자는 결과 화면에서 "Play again" 버튼으로 자신의 플레이를 시작할 수 있다 | MVP |

### 5. 소셜 참여 및 커뮤니티

| FR | 설명 | Phase |
|----|------|-------|
| FR36 | 방문자는 공개 브라켓 결과 페이지에 댓글을 작성할 수 있으며, 작성된 댓글은 신고·비공개 처리 대상이 될 수 있다 | MVP |
| FR37 | 방송 중 시청자는 현재 스트리머의 매치업에 실시간으로 투표할 수 있다 (라이브 참여 링크 공유 방식) | MVP |
| FR38 | 채팅 시청자는 !A 또는 !B 채팅 명령어로 현재 매치에 실시간 투표할 수 있다 (Twitch/YouTube 채팅 연동) | Growth |
| FR39 | 매치업 화면에는 실시간 채팅 투표 집계(A% vs B%)가 표시된다 | Growth |

### 6. 스트리머 워크플로우 및 방송 통합

| FR | 설명 | Phase |
|----|------|-------|
| FR40 | 스트리머는 OBS 브라우저 소스 URL 하나로 방송에 브라켓을 추가할 수 있다 | MVP |
| FR41 | OBS 레이아웃은 스트리머가 로컬에서 키보드로 조작하고 방송에서 실시간 반영된다 | MVP |
| FR42 | 스트리머 대시보드에서 자신이 만든 Bracket Pack 목록과 플레이 통계를 확인할 수 있다 | Growth |
| FR43 | 스트리머는 시청자 참여 링크를 채팅에 공유할 수 있는 단축 URL을 5초 이내 생성할 수 있다 | MVP |

### 7. UGC 모더레이션 및 플랫폼 안전

| FR | 설명 | Phase |
|----|------|-------|
| FR44 | 방문자는 부적절한 콘텐츠를 신고할 수 있다 | MVP |
| FR45 | 관리자는 신고된 콘텐츠를 검토하고 제거할 수 있다 | MVP |
| FR46 | 시스템은 DMCA Safe Harbor 요건에 따라 저작권 침해 신고 접수 및 처리 경로를 제공한다 | MVP |

### 8. 인증 및 사용자 계정

| FR | 설명 | Phase |
|----|------|-------|
| FR47 | 사용자는 소셜 로그인(Google, Twitch)으로 계정을 생성할 수 있다 | MVP |
| FR48 | 인증 없이 브라켓 플레이와 결과 공유는 가능하나, 브라켓 생성은 로그인이 필요하다 | MVP |
| FR49 | 사용자는 자신의 플레이 히스토리를 프로필에서 확인할 수 있다 | Growth |

### 9. 수익화

| FR | 설명 | Phase |
|----|------|-------|
| FR50 | 시스템은 브라켓 페이지 전환 시 광고 노출 슬롯을 지원한다 (라운드마다 페이지 전환 → 높은 PV) | Growth |
| FR51 | 프리미엄 구독 사용자는 광고 없이 플레이할 수 있다 | Vision |
| FR52 | 스트리머 파트너는 자신의 Bracket Pack에 스폰서 브랜딩을 추가할 수 있다 | Vision |

---

## Non-Functional Requirements

> **우선순위 기준:** 1인 바이브 코딩 환경 + 바이럴 루프 검증 북극성. MVP 단계는 "충분히 빠르고 안정적으로 루프가 작동하는가"에 집중하고, 엔터프라이즈급 요건은 Growth 이후 도입한다.

### 성능 (Performance)

| ID | 요건 | 측정 방법 / 수용 기준 | Phase |
|----|------|----------------------|-------|
| NFR-P1 | 매치업 화면 전환(라운드 간) LCP ≤ 1.5s | 데스크톱 Chrome, warm cache, 대표 64강 브라켓 기준 Lighthouse 또는 동등한 Web Vitals 측정에서 p75 LCP ≤ 1.5s | MVP |
| NFR-P2 | 공개 브라켓 결과 페이지 첫 로드 FCP ≤ 2s | 모바일 4G 시뮬레이션과 데스크톱 broadband 조건에서 대표 결과 페이지 5개를 측정해 p75 FCP ≤ 2s | MVP |
| NFR-P3 | OBS 브라우저 소스 키 입력 → 화면 반영 레이턴시 ≤ 100ms | OBS 내장 Chromium 환경에서 로컬 키 입력 후 라운드 UI 변경까지의 p95 지연 시간이 100ms 이하 | MVP |
| NFR-P4 | 결과 이미지 생성(다운로드 준비) ≤ 3s | 64강 브라켓 결과 기준, Generate 클릭부터 다운로드 가능 상태까지 p95 ≤ 3s | MVP |

### 확장성 (Scalability)

| ID | 요건 | 측정 방법 / 수용 기준 | Phase |
|----|------|----------------------|-------|
| NFR-S1 | MVP는 동시 접속 1,000명까지 핵심 플레이·결과 공유 플로우를 유지한다 | 부하 테스트에서 1,000 concurrent virtual users, 30분 지속, 오류율 < 1%, p95 플레이 화면 응답 ≤ 2s | MVP |
| NFR-S2 | Growth 단계는 동시 접속 10,000명 트래픽 모델을 수용할 확장 경로를 가진다 | 아키텍처 산출물에 10,000 concurrent users 기준 병목, 확장 단위, 비용 가정이 문서화되어야 함 | Growth |
| NFR-S3 | 인기 브라켓 페이지는 바이럴 스파이크 중 origin 부하를 제한할 수 있어야 한다 | 공개 브라켓/결과 페이지는 캐시 가능한 응답으로 제공되며, 부하 테스트에서 반복 조회 90% 이상이 캐시 계층 또는 정적 응답으로 처리됨 | MVP |

### 가용성 (Availability)

| ID | 요건 | 측정 방법 / 수용 기준 | Phase |
|----|------|----------------------|-------|
| NFR-A1 | 월간 가동률은 MVP ≥ 99.5%, Growth ≥ 99.9%를 유지해야 한다 | 외부 uptime monitor 기준으로 월별 측정하며, 사전 공지된 계획 점검은 별도 기록하되 사용자 영향 시간은 월간 리포트에 포함 | MVP |
| NFR-A2 | 계획 점검은 방송 피크 시간대 외에 진행한다 | KST 20:00-24:00 및 EST 19:00-24:00 시작 점검 금지. 긴급 보안 조치는 예외로 기록 | MVP |

### 보안 (Security)

| ID | 요건 | 측정 방법 / 수용 기준 | Phase |
|----|------|----------------------|-------|
| NFR-SEC1 | 모든 사용자-facing 통신은 HTTPS와 TLS 1.2 이상을 사용한다 | 보안 스캔에서 HTTP downgrade, mixed content, TLS 1.0/1.1 허용이 발견되지 않아야 함 | MVP |
| NFR-SEC2 | UGC 이미지 업로드는 허용된 이미지 타입과 10MB 이하 파일만 수락한다 | 업로드 테스트에서 비허용 MIME/확장자와 10MB 초과 파일은 저장 전 거부되고 사용자에게 오류가 표시됨 | MVP |
| NFR-SEC3 | 인증 토큰은 클라이언트 스크립트에서 읽을 수 없고 전송·저장 보호 속성을 갖춘다 | 보안 테스트에서 XSS 스크립트가 토큰 값을 직접 읽을 수 없어야 하며, 토큰은 HTTPS 연결에서만 전송됨 | MVP |
| NFR-SEC4 | DMCA 신고 접수 경로와 처리 로그를 제공한다 | 신고 접수, 상태 변경, 조치자, 조치 시간, 대상 URL을 1년 이상 조회 가능하게 보관 | MVP |
| NFR-SEC5 | 13세 미만 사용자의 개인정보 수집을 금지한다 | 익명 플레이 플로우는 생년월일, 실명, 연락처를 요구하지 않으며, 계정 생성 플로우에는 연령 정책 고지가 표시됨 | MVP |

### SEO 및 발견성 (Discoverability)

| ID | 요건 | 측정 방법 / 수용 기준 | Phase |
|----|------|----------------------|-------|
| NFR-SEO1 | 공개 브라켓 페이지와 결과 페이지는 크롤러가 제목, 설명, 대표 이미지를 초기 HTML에서 읽을 수 있어야 한다 | 대표 공개 브라켓/결과 페이지 10개를 HTML fetch로 검사해 title, meta description, canonical, og 태그가 JS 실행 없이 존재 | MVP |
| NFR-SEO2 | 결과 공유 링크는 og:image, og:title, og:description을 포함한다 | 공유 URL 샘플 10개에서 X/Reddit/Discord 미리보기 검사 또는 HTML 검사로 필수 OG 태그 100% 존재 | MVP |
| NFR-SEO3 | 공개 URL은 사람이 읽을 수 있는 slug를 사용한다 | slug는 소문자 영문/숫자/hyphen 조합, 80자 이하, 공백 및 추적 파라미터 없이 canonical URL에 반영 | MVP |

### 접근성 (Accessibility)

| ID | 요건 | 측정 방법 / 수용 기준 | Phase |
|----|------|----------------------|-------|
| NFR-ACC1 | 매치업 핵심 플로우는 WCAG 2.1 AA 기준의 주요 자동 검사와 수동 키보드 검사를 통과한다 | axe 또는 동등 도구에서 critical/serious issue 0건, 주요 텍스트 대비 4.5:1 이상, 포커스 표시 유지 | MVP |
| NFR-ACC2 | 플레이어는 키보드만으로 브라켓을 완료할 수 있다 | Tab, Enter/Space, A/D 키만 사용해 16강 브라켓 시작부터 결과 화면까지 완료 가능해야 함 | MVP |

### 유지보수성 (Maintainability)

| ID | 요건 | 측정 방법 / 수용 기준 | Phase |
|----|------|----------------------|-------|
| NFR-M1 | 핵심 도메인 개념은 AI-assisted 개발자가 파일과 함수 경계를 추적할 수 있게 분리된다 | 브라켓 생성, 플레이 진행, 결과 생성, UGC moderation, SEO metadata 생성 책임이 문서화된 모듈 경계에 매핑됨 | MVP |
| NFR-M2 | 비밀값과 환경별 설정은 코드베이스에 하드코딩되지 않는다 | 저장소 스캔에서 API key, secret, production credential 패턴이 발견되지 않으며 설정값은 배포 환경별로 교체 가능 | MVP |
| NFR-M3 | 릴리스 게이트는 기본 품질 검사 실패 시 배포를 차단한다 | Growth 단계부터 lint와 type check 실패 시 production 배포가 진행되지 않으며, 실패 로그가 PR 또는 배포 기록에 남음 | Growth |
