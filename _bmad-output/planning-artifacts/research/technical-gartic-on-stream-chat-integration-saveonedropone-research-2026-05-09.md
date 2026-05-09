---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - "_bmad-output/project-context.md"
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/research/domain-saveonedropone-merged-streamer-bracket-research-2026-05-06.md"
workflowType: 'research'
lastStep: 1
research_type: 'technical'
research_topic: 'Gartic On Stream류 웹사이트의 채팅 연동 구현 방식과 Save One Drop One 적용 방안'
research_goals: 'Gartic On Stream 같은 방송용 웹 게임이 Twitch/YouTube 채팅을 어떻게 연결하고 명령어 기반 실시간 참여를 처리하는지 조사하고, React Router 7 + Cloudflare Workers + Supabase 기반 Save One Drop One에 적용 가능한 MVP/Growth 아키텍처를 제안한다.'
user_name: 'GM'
date: '2026-05-09'
web_research_enabled: true
source_verification: true
status: 'complete'
completedAt: '2026-05-09'
---

# Research Report: Technical

**Date:** 2026-05-09
**Author:** GM
**Research Type:** Technical

---

## Research Overview

이 문서는 Gartic On Stream류 방송용 웹 게임이 채팅을 입력 장치로 사용하는 방식을 조사하고, Save One Drop One에 적용 가능한 기술 아키텍처를 도출한다. 조사는 GOS/Onrizon의 공개 제품 설명, Twitch EventSub/IRC 공식 문서, YouTube Live Streaming API, OBS Browser Source, Cloudflare Workers/Durable Objects, Supabase Realtime 문서를 중심으로 검증했다.

핵심 결론은 명확하다. Save One Drop One의 MVP 참여 UX는 웹 투표 링크가 아니라 **Twitch 채팅 명령어 `!A/!B` 중심**이어야 한다. 별도 탭 투표는 방송 시청자 흐름을 끊기 때문에 스트리머-퍼스트 제품에 맞지 않는다. 웹 투표 링크는 장애/fallback 용도로만 둔다.

기술적으로는 **Twitch EventSub Webhook → Cloudflare Worker 검증 → LiveSessionRoom Durable Object → OBS/스트리머 화면 WebSocket fan-out → Supabase summary checkpoint** 구조를 권장한다. 자세한 최종 결론과 실행 로드맵은 아래 `Research Synthesis` 섹션에 정리했다.

---

## Technical Research Scope Confirmation

**Research Topic:** Gartic On Stream류 웹사이트의 채팅 연동 구현 방식과 Save One Drop One 적용 방안

**Research Goals:** Gartic On Stream 같은 방송용 웹 게임이 Twitch/YouTube 채팅을 어떻게 연결하고 명령어 기반 실시간 참여를 처리하는지 조사하고, React Router 7 + Cloudflare Workers + Supabase 기반 Save One Drop One에 적용 가능한 MVP/Growth 아키텍처를 제안한다.

**Technical Research Scope:**

- Architecture Analysis - 방송용 웹 앱, 채팅 수집기, 실시간 투표 집계, OBS 브라우저 소스 구조
- Implementation Approaches - OAuth/권한 부여, 채팅 메시지 수집, 명령어 파싱, 중복 투표 처리, 재연결/복구
- Technology Stack - Twitch IRC/EventSub, YouTube Live Chat API, OBS Browser Source, Cloudflare Workers, Supabase Realtime/Postgres
- Integration Patterns - Twitch/YouTube API, WebSocket/SSE/Realtime, 서버리스 백엔드, 브라우저 소스 동기화
- Performance Considerations - 실시간 레이턴시, API quota/rate limit, 방송 중 장애 복구, 개인정보/토큰 보안

**Research Methodology:**

- 현재 공개 웹 데이터와 공식 문서 기반 검증
- 핵심 기술 주장은 가능하면 공식 문서 또는 소스 코드로 우선 확인
- Gartic On Stream 자체의 내부 구현은 공개 범위가 제한될 수 있으므로, 관찰 가능한 제품 동작과 동일 도메인 공개 구현/공식 API 문서를 분리해 신뢰도를 표시
- Save One Drop One의 기존 PRD/Architecture/UX 문서와 충돌하는 지점을 별도 정리

**Scope Confirmed:** 2026-05-09

## GOS 유사 서비스 오픈소스 구현 사례 분석

### 채팅 투표 방송 게임 오픈소스 레퍼런스

Gartic On Stream의 내부 구현은 비공개이나, 동일 패턴을 구현한 오픈소스 프로젝트들을 통해 실제 구현 방식을 확인할 수 있었다.

**확인된 주요 오픈소스 프로젝트:**

| 프로젝트 | 채팅 수집 방식 | fan-out | 특징 |
|---|---|---|---|
| [darmiel/twitch-poll-overlay](https://github.com/darmiel/twitch-poll-overlay) | tmi.js IRC (브라우저 직접 연결) | DOM 직접 업데이트 | 서버 없음, `?channel=` 파라미터 |
| [Lethalchip/twitch-poll-overlay](https://github.com/Lethalchip/twitch-poll-overlay) | tmi.js IRC | DOM 직접 업데이트 | OBS Browser Source 전용 |
| [braddotcoffee/live-polls](https://github.com/braddotcoffee/live-polls) | IRC (서버) | WebSocket | 사용자당 1표, 투표 변경 가능 |
| [yoanbernabeu/OpenStreamPoll](https://github.com/yoanbernabeu/OpenStreamPoll) | IRC (서버) | Mercure (SSE) | PHP/Symfony + Docker, MIT |
| [tomaarsen/TwitchCubieBot](https://github.com/tomaarsen/TwitchCubieBot) | IRC | 없음 (CLI) | Python, 투표 집계·평균 계산 |

### 공통 구현 패턴

오픈소스 프로젝트에서 반복적으로 확인된 패턴:

1. **IRC justinfan 익명 연결:** `justinfan{숫자}` + 임의 패스워드로 OAuth 없이 공개 채팅 읽기 가능. 현재 대부분의 overlay가 이 방식. 단, Twitch는 EventSub 마이그레이션을 공식 권장하고 있으며 IRC에 점진적으로 제한이 추가되고 있다.
2. **명령어 파싱 방식:** 첫 단어 추출 후 case-insensitive 비교. 비투표 메시지 즉시 폐기.
3. **투표 정책:** last-vote-wins (`platform + userId + matchId` unique key). 투표 변경 허용이 일반적이다.
4. **fan-out:** 단순 overlay는 DOM 직접 업데이트. 서버 기반은 WebSocket broadcast 또는 SSE.
5. **Browser Source URL 패턴:** `?channel=채널명` 또는 `?sessionId=xxx`를 query param으로 전달.

### Twitch 네이티브 Predictions API 비교

| 항목 | Twitch Predictions API | 채팅 명령어 투표 (`!A/!B`) |
|---|---|---|
| 위치 | Twitch 플랫폼 내장 팝업 UI | 채팅창 메시지 |
| 투표 화폐 | Channel Points 필수 | 없음 |
| 커스텀 overlay | 어려움 (Twitch UI 종속) | 자유 구성 |
| scope | `channel:manage:predictions` | `user:read:chat` |

Save One Drop One에는 커스텀 OBS overlay가 핵심이므로 채팅 명령어 투표가 적합하다.

_Sources:_ https://github.com/darmiel/twitch-poll-overlay, https://github.com/Lethalchip/twitch-poll-overlay, https://github.com/braddotcoffee/live-polls, https://github.com/yoanbernabeu/OpenStreamPoll, https://dev.twitch.tv/docs/chat/irc-migration/

---

## Twitch 앱 등록 및 채팅 권한 요구사항

### channel.chat.message EventSub 구독 필요 scope

공식 Twitch 문서 기준으로 확인한 정확한 scope 목록:

**App Access Token 방식 (권장):**

| 토큰 주체 | 필요 scope |
|---|---|
| 봇/앱 계정 (chatting_user) | `user:bot`, `user:read:chat` |
| 스트리머 계정 (broadcaster) | `channel:bot` |

**`channel:bot` scope의 의미:** 스트리머가 OAuth 흐름에서 직접 동의해야 Save One Drop One 앱이 해당 채널의 `channel.chat.message` 구독을 생성할 수 있다. 즉, **스트리머의 OAuth 동의가 곧 채널 연동 onboarding 흐름이다.** 스트리머 동의 없이는 App Access Token으로 제3자 채널 채팅 읽기가 불가능하다 (403 반환).

대안: 봇 계정이 해당 채널의 moderator이면 `channel:bot` 없이도 구독 가능하다.

### Twitch 앱 심사 프로세스

| 항목 | 상태 |
|---|---|
| 앱 등록 (dev.twitch.tv/console) | 즉시 가능, 심사 없음 |
| `channel.chat.message` 구독 | 앱 심사 없이 사용 가능 |
| Twitch Extension 심사 | Save One Drop One 해당 없음 (외부 웹 앱) |
| Verified Bot 심사 | **현재 일시 중단** ("temporarily paused while we revise our processes") |

**결론:** `channel.chat.message` EventSub 사용에 Twitch 앱 심사는 필요 없다. Verified Bot 승인도 MVP에 불필요하다 (채팅 전송이 주 목적이 아닌 읽기 중심). 제약의 핵심은 심사가 아니라 **스트리머별 OAuth 동의 흐름 설계**다.

### 베타 테스트 범위

- 앱 등록 후 즉시 개발·테스트 가능.
- 소수 테스트 스트리머(1-3명)에게 `channel:bot` scope OAuth 동의를 요청하면 해당 채널 채팅 구독 즉시 생성 가능.
- Twitch CLI(`twitch event trigger channel.chat.message`)로 실제 라이브 방송 없이 webhook challenge/notification 시뮬레이션 가능.
- IRC justinfan 방식과의 차이: EventSub는 anonymous read 지원 없음. 스트리머 동의가 반드시 필요.

_Sources:_ https://dev.twitch.tv/docs/authentication/scopes/, https://dev.twitch.tv/docs/chat/authenticating/, https://dev.twitch.tv/docs/authentication/register-app, https://discuss.dev.twitch.com/t/explanation-of-channel-chat-message-event-auth/64378

---

## Technology Stack Analysis

### Web Search Analysis

웹 검색은 세 갈래로 나눠 수행했다.

1. **Gartic On Stream / Onrizon 계열 제품 관찰:** GOS 공식 사이트와 Onrizon 제품 페이지는 GOS가 설치 없는 100% 온라인 게임이며, 스트리머가 선호 스트리밍 서비스에 one-click으로 연결한 뒤 화면을 송출하고, 시청자는 라이브 채팅으로 정답을 입력한다고 설명한다. GarticTube 설명은 YouTube 라이브 채팅을 통해 실시간 추측을 받아 화면에 이름/사진/랭킹을 표시했으며, 동시 추측량을 YouTube가 충분히 수집하지 못한 확장 한계가 있었다고 설명한다. 이는 “채팅 메시지 수집 → 정답/명령어 판정 → 방송 화면에 집계/랭킹 반영” 구조라는 강한 정황이다. 단, GOS의 서버 코드나 정확한 API 선택은 공개되어 있지 않으므로 내부 구현 추정은 중간 신뢰도로 다룬다. Sources: https://gos.gg/en/, https://onrizon.com/en/products/gartictube, https://onrizon.com/pt/products/gos
2. **플랫폼 공식 API 확인:** Twitch는 채팅 수신을 EventSub `channel.chat.message` 또는 IRC 기반으로 처리할 수 있다. EventSub는 Webhook, WebSocket, Conduit transport를 지원하고, 중복 이벤트가 올 수 있으므로 `message_id` 기반 중복 제거가 필요하다고 명시한다. YouTube는 `liveChatMessages.streamList`를 저지연 서버 스트리밍 방식으로 권장하고, 기존 `list` polling은 `pollingIntervalMillis`와 quota/rate-limit 제약을 따른다. Sources: https://dev.twitch.tv/docs/eventsub/, https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/, https://dev.twitch.tv/docs/chat/irc/, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList
3. **Save One Drop One 호환 인프라 확인:** OBS Browser Source는 URL을 Chromium Embedded Framework 기반 브라우저로 렌더링하며, custom CSS, viewport width/height, refresh behavior를 제공한다. Cloudflare Workers는 WebSocket을 지원하지만 여러 연결을 한 방/게임 세션에 조율하려면 Durable Objects가 단일 조정 지점으로 권장된다. Supabase Realtime은 Broadcast와 Postgres Changes를 제공하지만, Postgres Changes는 구독자별 권한 확인 때문에 scale 병목이 생길 수 있어 고빈도 실시간 메시지는 Broadcast 또는 별도 re-stream 패턴이 더 적합하다. Sources: https://obsproject.com/kb/browser-source, https://developers.cloudflare.com/workers/runtime-apis/websockets/, https://workers.cloudflare.com/product/durable-objects, https://supabase.com/docs/guides/realtime/broadcast, https://supabase.com/docs/guides/realtime/postgres-changes

### Programming Languages

Save One Drop One의 기존 아키텍처는 React Router 7 framework mode, Cloudflare Workers, Supabase를 전제로 하므로 기본 구현 언어는 **TypeScript**가 맞다. 채팅 연동도 별도 Node 서버를 두지 않는다면 Workers-compatible TypeScript로 유지하는 것이 가장 일관적이다.

Gartic On Stream류 제품에서 핵심 언어 선택은 게임 UI보다 “플랫폼 채팅 수집기”에 의해 좌우된다. Twitch IRC/EventSub, YouTube Live Chat API, OBS Browser Source, Supabase Realtime 모두 JavaScript/TypeScript 생태계에서 브라우저와 서버리스 양쪽 SDK/HTTP/WebSocket 접근이 가능하다.

_Popular Languages:_ TypeScript/JavaScript가 Save One Drop One에 가장 적합하다. React UI, route loaders/actions, Workers API, Supabase JS client, WebSocket client/server 구현이 모두 한 언어권에 들어온다.

_Emerging Languages:_ Rust/Go 기반 로컬 데스크톱 채팅 오버레이도 존재하지만, 이는 ChallaChat/Ghost Chat 같은 로컬 앱 모델에 더 적합하다. Save One Drop One은 웹 서비스이므로 MVP에서는 과하다.

_Language Evolution:_ Twitch 쪽은 과거 IRC 라이브러리(tmi.js) 중심에서 공식 EventSub chat message 수신으로 이동할 수 있는 경로가 생겼다. 새 구현은 IRC만 전제로 고정하지 말고 EventSub와 IRC를 추상화할 수 있어야 한다.

_Performance Characteristics:_ `!A/!B` 투표 집계는 CPU보다 네트워크 지연, API 제한, 중복/재연결 처리, fan-out 비용이 중요하다. TypeScript + Workers/Durable Objects로 충분하며, 별도 고성능 언어가 필요한 단계는 아니다.

_Sources:_ https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/, https://dev.twitch.tv/docs/chat/irc/, https://developers.cloudflare.com/workers/runtime-apis/websockets/

### Development Frameworks and Libraries

핵심 프레임워크는 기존 결정대로 **React Router 7 framework mode**를 유지한다. 채팅 연동은 UI route가 아니라 `services/`와 `features/live-voting` 경계로 분리해야 한다.

Twitch 수집 방식은 두 가지가 있다.

- **EventSub `channel.chat.message`:** 공식 신형 이벤트 수신 방식. Webhook/WebSocket/Conduit transport가 있고, 메시지 객체가 구조화되어 있다. 권한 스코프와 bot/broadcaster 관계 설정은 더 엄격하지만 장기적으로 공식 경로다.
- **IRC / tmi.js 계열:** 구현이 단순하고 브라우저/Node 예제가 많다. 다만 토큰 관리와 rate limit, 장기 유지보수 측면에서는 공식 EventSub 우선 검토가 낫다.

YouTube는 Live Streaming API의 `liveChatMessages.streamList`가 저지연 수신에 적합하다. 구형 polling `list`도 가능하지만 Google 문서는 streamList가 quota 낭비를 줄인다고 안내한다. **단, `streamList`는 gRPC server-streaming 엔드포인트다.** Cloudflare Workers의 표준 `fetch`로는 직접 소비할 수 없어, HTTP/1.1 streaming 변환 레이어 또는 별도 구현이 필요하다. Workers 런타임에서 YouTube chat을 수신하려면 gRPC 호환성을 별도 검증해야 한다. MVP에서 YouTube를 Growth로 미루는 이유 중 하나다.

OBS는 별도 SDK가 아니라 Browser Source URL을 렌더링하는 방식이 MVP에 적합하다. OBS WebSocket은 OBS 자체 scene/source 제어용이지, Save One Drop One의 채팅 투표 수집 필수 요소는 아니다.

_Major Frameworks:_ React Router 7, Cloudflare Workers, Supabase JS, Twitch EventSub/IRC, YouTube Live Streaming API.

_Micro-frameworks:_ Twitch IRC에는 tmi.js가 널리 쓰이나, Cloudflare Workers 런타임 호환성과 장기 API 방향을 검토해야 한다.

_Evolution Trends:_ Twitch는 EventSub chat message 타입을 제공하고, YouTube는 streamList를 권장하며, OBS는 Browser Source를 일반 웹 페이지 실행 표면으로 유지한다. 즉 “브라우저 화면 + 서버 측 채팅 수집 + 실시간 fan-out”이 현재 안정적인 패턴이다.

_Ecosystem Maturity:_ Twitch/YouTube는 공식 API가 있고, OBS Browser Source는 성숙한 방송 워크플로우다. 단, YouTube chat은 liveChatId 확보, quota, “made for kids”/chat disabled/ended 상태 등 운영 조건이 복잡하다.

_Sources:_ https://dev.twitch.tv/docs/eventsub/, https://dev.twitch.tv/docs/chat/irc/, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList, https://obsproject.com/kb/browser-source

### Database and Storage Technologies

채팅 원문 전체를 영구 저장하는 것은 MVP에 적합하지 않다. Save One Drop One에 필요한 것은 “현재 매치의 집계 상태”와 “방송 세션 복구용 체크포인트”다.

권장 저장 분리:

- **Transient state:** 현재 matchId, A/B vote counts, userId별 마지막 투표, 연결 상태, 최근 이벤트 watermark. Durable Object 또는 메모리 + 짧은 TTL 저장.
- **Durable checkpoint:** match advance 시점의 투표 요약, 최종 결과 페이지에 표시할 집계, analytics event. Supabase Postgres.
- **Realtime fan-out:** Supabase Broadcast 또는 Durable Object WebSocket. Postgres Changes는 모든 투표 이벤트를 직접 구독시키는 용도로는 피하는 편이 낫다.

_Relational Databases:_ Supabase Postgres는 방송 세션, 결과, 요약 통계, 감사 가능한 이벤트 저장에 적합하다.

_NoSQL Databases:_ 별도 NoSQL은 MVP에 필요하지 않다. 단, Cloudflare Durable Objects 내장 SQLite/스토리지는 per-session coordinator state에 적합하다.

_In-Memory Databases:_ Redis류가 일반적인 선택이지만 현재 아키텍처에는 포함되어 있지 않다. Workers/Durable Objects를 쓰면 별도 Redis 없이 per-session state를 운영할 수 있다.

_Data Warehousing:_ Growth 단계에서 BigQuery/ClickHouse류로 투표/시청자 행동 분석을 확장할 수 있으나 MVP 범위는 아니다.

_Sources:_ https://workers.cloudflare.com/product/durable-objects, https://supabase.com/docs/guides/realtime/broadcast, https://supabase.com/docs/guides/realtime/postgres-changes

### Development Tools and Platforms

개발 도구는 기존 프로젝트 계약을 따른다. 코드 배치는 `services/`에 플랫폼 API 클라이언트, `domain/`에 투표/브라켓 순수 규칙, `repositories/`에 durable summary 저장, `features/`에 streamer live mode UI와 hooks를 둔다.

채팅 연동은 실제 플랫폼 계정/라이브 상태가 있어야 검증되므로 로컬 테스트 도구가 중요하다.

- Twitch: EventSub WebSocket 또는 IRC mock payload를 fixture로 저장하고 command parser를 순수 함수로 테스트.
- YouTube: `liveChatMessages.streamList` 응답 형태를 fixture로 저장하고 reconnect/pageToken 처리를 테스트.
- OBS: 1920x1080 Browser Source equivalent viewport에서 Playwright screenshot으로 clipping/scrollbar/연결 상태를 확인.

_IDE and Editors:_ 특별 요구 없음.

_Version Control:_ 일반 Git workflow.

_Build Systems:_ React Router/Workers 배포 파이프라인 안에서 처리. Workers에서 Node-only package 사용을 피해야 한다.

_Testing Frameworks:_ domain parser unit test, service adapter contract test, Playwright visual/interaction test가 필요하다.

_Sources:_ https://obsproject.com/kb/browser-source, https://dev.twitch.tv/docs/eventsub/, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList

### Cloud Infrastructure and Deployment

Save One Drop One의 현재 아키텍처 기준에서는 **Cloudflare Workers + Durable Objects + Supabase** 조합이 가장 자연스럽다.

권장 런타임 역할:

- **React Router routes/loaders/actions:** 세션 생성, OAuth 시작/콜백, 방송 모드 진입, 초기 session snapshot 반환.
- **Cloudflare Durable Object:** live voting room coordinator. 플랫폼 chat collector에서 들어온 메시지를 normalize하고, match별 vote state를 업데이트하고, OBS/스트리머 화면 구독자에게 fan-out.
- **Supabase Postgres:** 방송 세션 메타데이터, 결과 요약, match checkpoint, creator 계정 연결 상태 저장.
- **Supabase Realtime Broadcast:** Durable Object를 쓰지 않거나 Supabase 중심으로 단순화할 때의 fan-out 대안. 단, 고빈도 원문 chat event를 Postgres Changes로 직접 흘리는 구조는 피한다.

_Major Cloud Providers:_ Cloudflare와 Supabase가 현재 선택지다. AWS/GCP/Azure는 MVP에 불필요하다.

_Container Technologies:_ 컨테이너/Kubernetes는 MVP에 불필요하다.

_Serverless Platforms:_ Workers는 WebSocket을 지원하지만, 여러 클라이언트를 조정하는 게임/채팅방은 Durable Objects가 적합하다.

_CDN and Edge Computing:_ OBS 화면과 public pages는 edge cache 이점이 크지만, live voting room은 session affinity가 필요하므로 Durable Object 단일 조정 지점으로 분리한다.

_Sources:_ https://developers.cloudflare.com/workers/runtime-apis/websockets/, https://workers.cloudflare.com/product/durable-objects, https://supabase.com/docs/guides/realtime/broadcast

### Technology Adoption Trends

Gartic On Stream류의 핵심 패턴은 네이티브 앱 설치가 아니라 **웹 페이지를 방송에 송출하고, 플랫폼 채팅을 입력 장치로 사용하는 것**이다. GOS 공식 사이트도 다운로드 없이 온라인으로 동작하고, 한 번 연결 후 화면을 스트리밍한다고 설명한다. 이는 Save One Drop One의 OBS/browser-source-first 전략과 잘 맞는다.

다만 Save One Drop One의 PRD에는 Twitch/YouTube 채팅 명령어 투표가 MVP로 들어가 있고, 기존 도메인 리서치는 MVP를 OBS + 웹 투표 링크 중심으로 두라고 했다. 기술 관점에서는 둘 다 가능하지만 구현 리스크가 다르다.

- **웹 투표 링크:** 플랫폼 API 의존이 낮고 익명 참여/모바일 참여에 강하다. MVP 안정성에 유리하다.
- **채팅 명령어 투표:** 방송 몰입감은 높지만 OAuth, platform-specific chat APIs, YouTube quota/liveChatId, Twitch scopes, reconnect, duplicate event, moderation state, message visibility 이슈가 붙는다.
- **현실적 절충:** MVP에는 웹 투표 링크를 primary로 두고, Twitch-only `!A/!B`를 limited beta 또는 Growth 후보로 분리하는 것이 안전하다. PRD의 “Twitch/YouTube 채팅 연동 MVP”는 기술 리스크상 범위를 재조정할 필요가 있다.

_Migration Patterns:_ Twitch IRC 기반 단순 봇에서 EventSub 기반 구조화 이벤트 수신으로 옮길 수 있는 흐름이 있다. YouTube는 polling보다 streamList가 권장된다.

_Emerging Technologies:_ Durable Objects 같은 stateful serverless coordinator는 live room/multiplayer/chat aggregation에 잘 맞는다.

_Legacy Technology:_ polling-only YouTube chat 수집, 브라우저에 OAuth token을 노출하는 직접 IRC 연결, 모든 chat event를 Postgres row로 저장 후 Realtime Postgres Changes로 뿌리는 구조는 피해야 한다.

_Community Trends:_ 오픈소스 채팅 오버레이들은 Twitch/YouTube/Kick을 통합하고 OBS Browser Source 또는 local SSE/WebSocket overlay를 제공하는 구조를 많이 쓴다. 이는 Save One Drop One도 “수집기와 화면 표시를 분리”해야 함을 뒷받침한다.

_Sources:_ https://gos.gg/en/, https://onrizon.com/en/products/gartictube, https://dev.twitch.tv/docs/eventsub/, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList, https://www.challachat.com/

## Integration Patterns Analysis

### Web Search Analysis

통합 패턴 조사는 공식 API 권한/전송 방식과 OBS/Save One Drop One 인프라 사이의 접점을 중심으로 수행했다.

**Twitch:** Twitch 공식 문서는 채팅 메시지 수신 경로를 EventSub `channel.chat.message`와 IRC로 나눠 설명한다. EventSub는 Webhook/WebSocket/Conduit transport를 지원하고, WebSocket 연결은 welcome/keepalive/reconnect/revocation 메시지를 처리해야 한다. Twitch는 이벤트를 at-least-once로 전달할 수 있으므로 `message_id` 기반 중복 제거가 필요하다. 채팅 EventSub에는 `user:read:chat`, `user:bot`, `channel:bot` 같은 scope/권한 조합이 얽혀 있어 단순 공개 채팅 scraping과 다르다. Sources: https://dev.twitch.tv/docs/eventsub/, https://dev.twitch.tv/docs/eventsub/websocket-reference/, https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/, https://dev.twitch.tv/docs/authentication/scopes/, https://dev.twitch.tv/docs/chat/authenticating/

**YouTube:** YouTube Live Streaming API는 `liveChatMessages.streamList`를 저지연 서버 스트리밍 방식으로 제공하며, `liveChatMessages.list`에는 `pollingIntervalMillis`, `nextPageToken`, quota/rate-limit 제약이 있다. live chat ID는 `liveBroadcast.snippet.liveChatId` 또는 영상의 `liveStreamingDetails.activeLiveChatId` 경로로 얻는 경우가 있다. YouTube API는 OAuth scope와 앱 검증 부담이 크며, service account 흐름을 지원하지 않는다. Sources: https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/list, https://developers.google.com/youtube/v3/live/docs/liveBroadcasts, https://developers.google.com/youtube/v3/live/guides/auth/devices

**OBS / Browser Source / Save One Drop One:** OBS Browser Source는 URL 기반 웹 페이지를 렌더링하므로 Save One Drop One의 `/play/:bracketSlug?obs=1` 또는 별도 live route는 표준 웹 통신만 사용하면 된다. Cloudflare Workers는 WebSocket을 지원하지만, 여러 OBS/컨트롤러/투표 링크 연결을 같은 세션 상태로 조정하려면 Durable Objects가 권장된다. Supabase Realtime Broadcast는 WebSocket fan-out 대안이고, Postgres Changes는 고빈도 투표 이벤트 직접 전달보다 요약/상태 변경 전달에 적합하다. Sources: https://obsproject.com/kb/browser-source, https://developers.cloudflare.com/workers/runtime-apis/websockets/, https://workers.cloudflare.com/product/durable-objects, https://supabase.com/docs/guides/realtime/broadcast, https://supabase.com/docs/guides/realtime/postgres-changes

### API Design Patterns

Save One Drop One의 채팅 연동은 공개 REST API를 넓게 만들 필요가 없다. 기존 아키텍처의 BFF 원칙대로 React Router resource route/action과 service adapter를 사용하고, 플랫폼별 차이를 내부 contract로 흡수하는 편이 맞다.

권장 API 표면:

- `POST /live-sessions` 또는 route action: streamer live session 생성
- `POST /live-sessions/:id/connect/twitch`: Twitch OAuth 시작 또는 연결 검증
- `POST /live-sessions/:id/connect/youtube`: YouTube OAuth/LiveChat 연결 시작
- `GET /live-sessions/:id/snapshot`: OBS/컨트롤러 초기 상태 hydrate
- `POST /live-sessions/:id/vote`: 웹 투표 링크용 anonymous vote submit
- `GET /live-sessions/:id/events` 또는 WebSocket endpoint: OBS/컨트롤러 상태 구독

플랫폼 adapter contract는 다음처럼 정규화한다.

```ts
type ChatMessageEvent = {
  platform: "twitch" | "youtube";
  platformMessageId: string;
  broadcasterPlatformId: string;
  authorPlatformId: string;
  authorDisplayName: string;
  text: string;
  sentAt: string;
};
```

이 contract를 거친 뒤 domain layer가 `!A` / `!B` (대소문자 무시, 앞뒤 공백 제거)를 판정한다. 다른 aliases는 지원하지 않는다. 플랫폼 원본 payload를 UI와 domain에 직접 흘리지 않는다.

_RESTful APIs:_ 세션 생성, OAuth callback, snapshot, vote submit은 REST/resource route로 충분하다.

_GraphQL APIs:_ MVP에는 부적합하다. 기존 architecture에서도 GraphQL 금지에 가깝게 배제되어 있고, 실시간 fan-out 문제를 해결하지 않는다.

_RPC and gRPC:_ Workers/browser/OBS 환경에 불필요하다.

_Webhook Patterns:_ Twitch EventSub Webhook을 쓰는 경우 webhook signature 검증, replay 방지, `message_id` 중복 제거가 필요하다. 다만 Cloudflare Workers에서 Twitch EventSub WebSocket client를 직접 오래 유지하는 구조는 일반 request lifecycle과 맞지 않을 수 있어, Durable Object 또는 별도 collector 설계를 검토해야 한다.

_Sources:_ https://dev.twitch.tv/docs/eventsub/, https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList

### Communication Protocols

채팅 연동에는 세 종류의 통신이 있다.

1. **플랫폼 → collector:** Twitch EventSub Webhook/WebSocket 또는 IRC, YouTube `streamList`/polling.
2. **collector → session coordinator:** 내부 HTTP/WebSocket message. Workers/Durable Object 사용 시 같은 Cloudflare boundary 안에서 처리 가능하다.
3. **session coordinator → browser clients:** OBS Browser Source, streamer controller, viewer vote summary에 WebSocket/Supabase Broadcast/SSE로 fan-out.

Twitch IRC는 구현 단순성이 강점이지만 OAuth 토큰을 브라우저에 직접 두는 구조는 피해야 한다. EventSub는 공식 구조화 이벤트와 bot 권한 모델을 제공하지만 권한 설정과 reconnect 처리가 더 복잡하다. YouTube는 `streamList`가 저지연에 적합하지만, API quota와 liveChatId 탐색/방송 상태 에러를 처리해야 한다.

_HTTP/HTTPS Protocols:_ OAuth 시작/콜백, YouTube API 호출, Twitch subscription 관리, snapshot fetch에 사용한다.

_WebSocket Protocols:_ Twitch EventSub WebSocket, Cloudflare Workers/Durable Objects WebSocket, Supabase Realtime 모두 WebSocket 기반이다. OBS Browser Source는 일반 Chromium 페이지이므로 WebSocket client로 동작 가능하다.

_Message Queue Protocols:_ AMQP/MQTT/Kafka는 MVP에 불필요하다. 단일 live session coordination에는 Durable Object가 더 단순하다.

_grpc and Protocol Buffers:_ YouTube `streamList`의 문서상 server-streaming API는 효율적이지만, Save One Drop One 내부 통신을 gRPC로 만들 이유는 없다.

_Sources:_ https://dev.twitch.tv/docs/eventsub/websocket-reference/, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList, https://developers.cloudflare.com/workers/runtime-apis/websockets/, https://obsproject.com/kb/browser-source

### Data Formats and Standards

외부 플랫폼 데이터는 JSON 또는 IRC line format으로 들어온다. Save One Drop One 내부에서는 반드시 normalized JSON event로 변환한다.

중요한 식별자:

- `platform`
- `platformMessageId`
- `authorPlatformId`
- `sessionId`
- `matchId`
- `roundIndex`
- `choice`: `A` 또는 `B`
- `receivedAt`

중복 제거는 `platform + platformMessageId` 기준으로 한다. Twitch EventSub는 동일 `message_id`가 재전송될 수 있음을 명시한다. YouTube도 reconnect/pageToken 처리 중 같은 메시지를 다시 볼 수 있으므로 message ID 기반 idempotency가 필요하다.

투표 정책은 제품 결정이지만 기술적으로는 `sessionId + matchId + platform + authorPlatformId` unique key를 잡으면 “현재 매치에서 마지막 투표만 유효”를 안정적으로 구현할 수 있다.

_JSON and XML:_ JSON을 내부 표준으로 사용한다. XML은 필요 없다.

_Protobuf and MessagePack:_ fan-out payload가 작고 브라우저/Workers 디버깅이 중요하므로 MVP에서는 불필요하다.

_CSV and Flat Files:_ analytics export 단계 외에는 관련 없음.

_Custom Data Formats:_ Twitch IRC tag line은 adapter 내부에서만 파싱하고 domain으로 노출하지 않는다.

_Sources:_ https://dev.twitch.tv/docs/chat/irc/, https://dev.twitch.tv/docs/eventsub/, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList

### System Interoperability Approaches

권장 구조는 point-to-point 직접 결합이 아니라 **platform adapter + session coordinator + presentation clients**의 3계층 통합이다.

```text
Twitch EventSub/IRC      YouTube Live Chat API
        |                         |
        v                         v
  platform chat adapters normalize ChatMessageEvent
        |
        v
  LiveSession Coordinator (Durable Object preferred)
        |
        +--> OBS / streamer screen realtime state
        +--> controller UI realtime state
        +--> Supabase checkpoint on match advance
        +--> analytics events
```

이 구조의 장점은 Twitch-only beta에서 시작해도 YouTube adapter를 나중에 추가할 수 있다는 점이다. domain parser와 UI는 `ChatMessageEvent`만 알면 된다.

_Point-to-Point Integration:_ Twitch SDK 코드를 React component에 직접 넣거나, YouTube API를 OBS page에서 직접 호출하는 구조는 피한다. 토큰 노출, reconnect, quota 관리가 어려워진다.

_API Gateway Patterns:_ 별도 API Gateway는 필요 없고 React Router/Workers route가 BFF 역할을 한다.

_Service Mesh:_ 불필요하다.

_Enterprise Service Bus:_ 불필요하다.

_Sources:_ https://developers.cloudflare.com/workers/runtime-apis/websockets/, https://workers.cloudflare.com/product/durable-objects, https://supabase.com/docs/guides/realtime/broadcast

### Microservices Integration Patterns

MVP에서 microservices로 쪼갤 필요는 없다. 하지만 모듈 경계는 service처럼 잡아야 한다.

권장 모듈:

- `services/chat/twitch.server.ts`: Twitch auth/subscription/message adapter
- `services/chat/youtube.server.ts`: YouTube auth/live chat adapter
- `services/live-session-coordinator.server.ts`: Durable Object 또는 Realtime abstraction
- `domain/live-voting.ts`: command parser, vote policy, tally reducer
- `repositories/live-sessions.server.ts`: durable session/checkpoint persistence
- `features/live-voting/*`: UI hooks and panels

_API Gateway Pattern:_ React Router route/action이 외부 API 표면을 제한한다.

_Service Discovery:_ 없음. Durable Object namespace/session id로 routing한다.

_Circuit Breaker Pattern:_ 플랫폼 API 오류가 발생해도 bracket play는 계속 가능해야 한다. 서킷 브레이커 트립 기준: **120초 슬라이딩 윈도우 내에서 HMAC 검증 외 처리 실패가 5회** 누적되면 `degraded_webhook_failures` 상태로 자동 전환한다. DO가 이 상태를 추적하며, 연결된 클라이언트에 `ConnectionStateChanged` 이벤트를 broadcast한다. UI는 fallback 웹 투표 링크를 노출하고 스트리머는 A/D 키로 브라켓을 계속 진행할 수 있다.

_Saga Pattern:_ 불필요하다. OAuth 연결과 session start는 보상 트랜잭션보다 명시적 상태 전이가 낫다.

_Sources:_ https://dev.twitch.tv/docs/eventsub/handling-websocket-events, https://developers.google.com/youtube/v3/live/docs/liveChatMessages/list, https://workers.cloudflare.com/product/durable-objects

### Event-Driven Integration

채팅 투표는 본질적으로 event-driven이다. 그러나 모든 raw chat message를 durable event log로 저장하는 것은 비용과 개인정보 리스크가 크다.

권장 이벤트 흐름:

1. Platform adapter receives chat message.
2. Normalize to `ChatMessageEvent`.
3. Deduplicate by platform/message ID.
4. Parse command. Non-vote messages are dropped immediately unless debugging mode is explicitly enabled.
5. Apply vote reducer for current match.
6. Broadcast `VoteTallyChanged` to clients.
7. On match advance, persist compact `MatchVoteSummary`.

추천 durable event:

```ts
type MatchVoteSummary = {
  sessionId: string;
  matchId: string;
  aVotes: number;
  bVotes: number;
  uniqueVoters: number;
  winnerChoice: "A" | "B";  // 스트리머가 실제 선택한 항목 (A/D 키)
  startedAt: string;
  lockedAt: string;
};
```

_Publish-Subscribe Patterns:_ OBS/컨트롤러는 `VoteTallyChanged`, `ConnectionStateChanged`, `MatchAdvanced` 이벤트를 구독한다.

_Event Sourcing:_ 전체 채팅 원문 event sourcing은 MVP에 부적합하다. 결과 재현에 필요한 요약만 저장한다.

_Message Broker Patterns:_ Kafka/RabbitMQ는 불필요하다. Durable Object 또는 Supabase Broadcast로 충분하다.

_CQRS Patterns:_ 읽기 모델은 current tally snapshot, 쓰기 모델은 vote command로 분리하면 충분하다.

_Sources:_ https://dev.twitch.tv/docs/eventsub/, https://supabase.com/docs/guides/realtime/broadcast, https://supabase.com/docs/guides/realtime/postgres-changes

### Integration Security Patterns

가장 중요한 원칙은 **플랫폼 access/refresh token을 OBS Browser Source나 일반 브라우저 클라이언트에 노출하지 않는 것**이다. OBS는 스트리머 로컬 환경이지만 URL이 유출될 수 있고, Browser Source URL은 공유/로그/스크린샷에 노출될 수 있다.

보안 권고:

- Twitch/YouTube OAuth token은 server-side encrypted storage에만 저장한다.
- OBS URL은 긴 랜덤 secret 또는 signed session token을 포함하되, 권한은 해당 live session read-only로 제한한다.
- Web vote link는 익명 참여를 허용하되 rate limit과 per-user/session fingerprint 정책을 둔다.
- Chat command vote는 platform user ID를 key로 사용하고, display name을 장기 저장하지 않는다.
- Webhook 사용 시 signature/timestamp/replay 검증을 구현한다.
- EventSub/WebSocket 사용 시 `message_id` 중복 제거와 reconnect 상태를 UI에 노출한다.
- YouTube OAuth scope는 최소화한다. Live chat read에 필요한 scope와 앱 검증 부담을 별도 체크해야 한다.

_OAuth 2.0 and JWT:_ Twitch/YouTube 연결은 OAuth 기반이다. Save One Drop One 자체 로그인은 기존 결정대로 Google/Twitch social login을 쓰되, social login과 chat API authorization은 scope가 다르므로 분리해서 설계한다.

_API Key Management:_ YouTube API key만으로는 인증된 live chat 접근이 제한될 수 있다. OAuth token 중심으로 봐야 한다.

_Mutual TLS:_ MVP에 불필요하다.

_Data Encryption:_ refresh token 저장은 암호화가 필요하다. Supabase에 저장할 경우 service role 접근 제한과 별도 encryption strategy를 검토한다.

_Sources:_ https://dev.twitch.tv/docs/authentication/, https://dev.twitch.tv/docs/authentication/scopes/, https://developers.google.com/youtube/v3/live/guides/auth/devices, https://dev.twitch.tv/docs/eventsub/

### Save One Drop One Integration Recommendation

초기 기술 권고에서는 웹 투표 링크를 MVP primary로 두는 안을 검토했지만, 제품 UX 관점에서 부적합하다. 스트리밍 시청자는 이미 Twitch/YouTube 채팅이라는 참여 표면 안에 있고, 별도 탭이나 모바일 웹 링크로 이탈시키면 방송 몰입과 참여율이 크게 떨어진다. Gartic On Stream류 제품의 강점도 “시청자가 보고 있는 채팅창이 곧 입력 장치”라는 점이다.

따라서 Save One Drop One의 채팅 연동 전략은 다음처럼 수정한다.

**Rejected: 웹 투표 링크 primary**

- 장점: 플랫폼 OAuth/API 의존이 낮고 구현이 쉽다.
- 단점: 시청자가 방송/채팅 맥락을 벗어나 다른 탭이나 기기에서 투표해야 한다.
- 판단: 스트리머-퍼스트 방송 게임의 핵심 UX와 맞지 않는다. fallback 또는 보조 링크로는 가능하지만 primary interaction으로 두면 안 된다.

**MVP: Twitch-first chat command voting**

- Twitch EventSub 또는 IRC adapter 하나만 구현한다.
- `!A`, `!B` 명령어를 current match에 집계한다.
- 연결 실패 시 자동으로 웹 투표 링크만 남긴다.
- 스트리머/시청자 모두 기존 채팅 행동만 사용하므로 Gartic On Stream류의 참여 UX와 가장 가깝다.
- YouTube까지 MVP에 동시에 넣지는 않는다. Twitch에서 채팅 투표 UX, 집계 정확성, 방송 중 장애 처리, OBS 표시 안정성을 먼저 검증한다.

**Growth: YouTube chat command**

- YouTube `streamList` adapter 추가.
- YouTube-specific liveChatId discovery와 quota dashboard, error handling, app verification workflow를 갖춘 뒤 출시한다.

**Fallback: 웹 투표 링크**

- Twitch 연결 실패, 채팅 제한 모드, YouTube 방송, 멀티플랫폼 방송, 또는 API 장애 시에만 보조 수단으로 제공한다.
- UI에서는 primary CTA가 아니라 “Chat disconnected / Use backup voting link” 상태로 노출한다.

수정된 결론: Save One Drop One MVP는 “웹 투표 링크 중심”이 아니라 **Twitch 채팅 명령어 중심 + 웹 링크 fallback**으로 가야 한다. 이 방향은 기존 도메인 리서치의 보수적 API 회피 전략과 충돌하지만, 제품의 핵심 사용 장면을 고려하면 채팅 primary가 더 타당하다. 기술 리스크는 YouTube를 Growth로 미루고 Twitch-only로 범위를 자르는 방식으로 관리한다.

## Architectural Patterns and Design

### Web Search Analysis

아키텍처 패턴 조사는 Twitch-first chat command MVP를 전제로 다시 검증했다.

**Cloudflare Durable Objects:** 공식 문서는 Durable Objects가 WebSocket server로 동작하며, 단일 Object instance가 채팅방이나 멀티플레이어 게임처럼 여러 클라이언트를 조율하는 데 적합하다고 설명한다. WebSocket Hibernation API는 클라이언트 연결을 유지하면서 Object를 idle 시 hibernate할 수 있고, 메시지가 오면 다시 깨운다. 단, hibernation 중 in-memory state는 사라지므로 중요한 상태는 Storage API 또는 외부 DB에 저장해야 한다. Sources: https://developers.cloudflare.com/durable-objects/best-practices/websockets/, https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/, https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/, https://developers.cloudflare.com/durable-objects/api/state/

**Twitch EventSub:** Twitch 공식 문서는 EventSub가 Webhook, WebSocket, Conduit transport를 지원한다고 설명한다. WebSocket transport는 welcome/keepalive/reconnect/revocation을 처리해야 하고, per user token 기준 enabled subscription이 있는 WebSocket 연결은 최대 3개, connection당 enabled subscription은 최대 300개, max_total_cost는 10이라는 제한이 있다. Webhook transport는 HTTPS 443 callback, challenge response, HMAC signature 검증, 빠른 2XX 응답, 중복 처리, replay 방어가 필요하다. Sources: https://dev.twitch.tv/docs/eventsub/, https://dev.twitch.tv/docs/eventsub/handling-websocket-events, https://dev.twitch.tv/docs/eventsub/handling-webhook-events/, https://dev.twitch.tv/docs/eventsub/eventsub-reference/

**OBS Browser Source:** OBS Browser Source는 URL을 CEF 기반 브라우저로 로드하며 width/height, FPS, custom CSS, source visibility refresh를 설정할 수 있다. Save One Drop One은 OBS 전용 네이티브 통합이 아니라 웹 화면 안정성, 1920x1080 layout, reconnect state, transparent/fixed viewport rendering을 우선해야 한다. Source: https://obsproject.com/kb/browser-source

### System Architecture Patterns

MVP 권장 아키텍처는 **modular monolith + session-scoped realtime coordinator**다. 전체 제품은 React Router 7/Cloudflare Workers 앱 안에 두되, live voting만 Durable Object로 세션별 stateful island를 만든다.

```text
React Router app on Cloudflare Workers
  routes/actions/loaders
  services/twitch
  repositories/live-session
  domain/live-voting

Durable Object: LiveSessionRoom(sessionId)
  current match state
  Twitch message ingress endpoint
  OBS/controller WebSocket fan-out
  tally reducer
  short-lived idempotency set
  checkpoint writer

Supabase
  auth/account linkage
  live session metadata
  match vote summaries
  result data
```

이 구조는 broad microservices보다 단순하고, 현재 architecture.md의 `domain/`, `repositories/`, `services/`, `features/`, `routes/` 경계와 맞다. Durable Object는 별도 서비스라기보다 live session의 stateful runtime boundary로 본다.

Twitch collector 선택지는 두 가지다.

1. **Webhook-first:** Twitch EventSub Webhook을 Workers route에서 받고, HMAC 검증 후 session Durable Object에 전달한다. Workers serverless request/response 모델과 잘 맞고, Twitch가 직접 inbound HTTP를 호출하므로 outgoing long-lived Twitch WebSocket을 유지하지 않아도 된다.
2. **WebSocket collector:** Durable Object 또는 별도 Worker가 Twitch EventSub WebSocket client로 연결한다. 실시간성은 좋지만 outgoing WebSocket은 Cloudflare DO hibernation 대상이 아니고, reconnect/subscription lifecycle을 직접 관리해야 한다.

MVP에는 **Webhook-first EventSub**가 더 운영 친화적이다. Webhook callback은 빠르게 2XX를 반환하고, 처리 부담은 DO에 넘긴다. 단, Twitch Webhook은 공개 HTTPS callback과 signature 검증을 정확히 구현해야 한다.

**멀티 스트리머 웹훅 라우팅:** Save One Drop One이 여러 스트리머를 동시에 지원하는 경우, 모든 EventSub 구독의 callback URL은 동일한 Worker route(`/webhook`)를 가리키므로 들어온 웹훅이 어느 `LiveSessionRoom`으로 가야 하는지를 식별해야 한다. 권장 방식은 **Supabase 동기 쿼리**다.

```text
Worker webhook route 수신
  -> payload에서 event.broadcaster_user_id 추출
  -> live_sessions 테이블에서 status='connected' AND platform_channel_id=broadcaster_id 조회
  -> 해당 sessionId로 LiveSessionRoom DO stub 획득
  -> 정규화된 ChatMessageEvent 전달
```

Supabase 조회는 Cloudflare 엣지에서 ~20-60ms 추가 레이턴시가 예상되며, MVP 규모에서는 허용 수준이다. DO 전달이 완료되기 전에 Worker는 Twitch에 `204`를 반환한다(비동기 전달). 만약 sessionId를 찾지 못하면(`session not found`) 해당 구독은 revoked된 것으로 처리하고 `204`를 반환한다.

대안으로 EventSub subscription 생성 시 callback URL을 `/webhook/:sessionId`로 session-specific하게 구성하면 DB 조회를 생략할 수 있다. 이 경우 스트리머가 연결을 재시작할 때마다 새 subscription을 생성해야 하며, 세션 수명 동안 URL이 고정된다는 제약이 있다.

_Source:_ https://developers.cloudflare.com/durable-objects/best-practices/websockets/, https://dev.twitch.tv/docs/eventsub/handling-webhook-events/

### Design Principles and Best Practices

핵심 설계 원칙은 다음이다.

1. **Chat primary, web fallback:** 제품 인터랙션은 Twitch chat command가 primary다. 웹 투표 링크는 장애/fallback이다.
2. **Normalize at the edge:** Twitch payload는 `ChatMessageEvent`로 정규화한 뒤 domain으로 넘긴다.
3. **Pure voting domain:** 명령어 파싱, 중복 투표 정책, tally reducer는 `domain/live-voting.ts`에 순수 함수로 둔다.
4. **No token in clients:** OAuth token은 OBS/브라우저에 노출하지 않는다.
5. **Degrade without stopping bracket:** 채팅 연결이 끊겨도 스트리머는 A/D 키로 브라켓을 계속 진행할 수 있어야 한다.
6. **Persist summaries, not raw chat:** 결과/분석에 필요한 집계만 저장하고 원문 채팅 저장은 피한다.
7. **Session authority is single-writer:** 특정 live session의 current match/tally는 하나의 Durable Object가 authoritative하게 처리한다.

권장 domain API:

```ts
parseVoteCommand(text, config): "A" | "B" | null
applyVote(state, vote): LiveVoteState
lockMatch(state, matchId): MatchVoteSummary
resetForNextMatch(state, nextMatch): LiveVoteState
```

이 설계는 API나 플랫폼 변화가 있어도 Save One Drop One의 토너먼트/투표 규칙을 보호한다.

_Source:_ https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/, https://dev.twitch.tv/docs/eventsub/

### Scalability and Performance Patterns

MVP의 스케일 병목은 rendering보다 message ingress와 fan-out이다. 한 방송 세션에 수백~수천 명이 채팅에 투표할 수 있지만, OBS/컨트롤러 client 수는 적다. 따라서 raw vote ingress는 많고, fan-out 대상은 적은 구조다.

권장 패턴:

- **Per-session Durable Object:** `LiveSessionRoom:{sessionId}`가 current match state와 tally를 단독 관리한다.
- **Idempotency window:** Twitch `message_id` 또는 platform message ID를 짧은 TTL set에 저장해 duplicate를 무시한다.
- **Batching:** vote가 폭주할 때 모든 투표마다 UI를 갱신하지 않고 일정 window로 tally update를 coalesce한다. 적절한 배칭 간격은 실제 채팅 폭주량을 베타에서 측정한 뒤 결정한다. Cloudflare 문서도 high-frequency updates에는 batching이 context switch를 줄인다고 설명한다.
- **Compact broadcast:** clients에는 raw message가 아니라 `{aVotes,bVotes,total,leader,updatedAt}`만 보낸다.
- **Match lock:** 스트리머가 A/D로 선택하는 순간 match를 lock하고 이후 도착한 chat vote는 다음 match에 섞이지 않도록 reject한다.
- **Recovery snapshot:** OBS/컨트롤러 reconnect 시 `GET snapshot` 또는 WebSocket hello response로 current state를 즉시 복원한다.

Cloudflare Durable Object WebSocket hibernation은 OBS/컨트롤러 연결 유지 비용을 줄이는 데 유리하지만, hibernation 시 in-memory state가 사라질 수 있으므로 current match/tally는 Object storage에 주기적으로 기록해야 한다.

**DO 스냅샷 전략 (명시적 기준):**

| 트리거 | 동작 |
|---|---|
| 매치 lock 시점 | `MatchVoteSummary`를 Supabase에 영구 저장 |
| 투표 상태 변경마다 | DO Storage API에 `currentMatchState` 동기 기록 (JSON, ~1KB) |
| WebSocket 클라이언트 연결 시 | DO Storage에서 최신 `currentMatchState`를 읽어 즉시 응답 |
| 세션 종료 시 | DO Storage를 정리하고 Supabase에 최종 요약 기록 |

DO Storage 쓰기는 개별 vote마다 하면 write cost가 증가한다. vote를 DO 메모리에 집계한 뒤 coalesce window 단위로 Storage를 업데이트하는 것이 적합하다. 이 경우 DO가 갑자기 재시작되면 coalesce window 이내의 vote는 유실될 수 있다. 방송 게임 특성상 수 초 이내 유실은 허용 가능한 트레이드오프로 판단한다.

다만 vote 집계 중에는 메시지가 계속 들어와 Object가 active일 가능성이 높으므로, 실제 hibernation 진입은 주로 매치 간 대기 시간에 발생한다.

_Source:_ https://developers.cloudflare.com/durable-objects/best-practices/websockets/, https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/, https://developers.cloudflare.com/durable-objects/api/state/

### Integration and Communication Patterns

권장 MVP sequence:

```text
1. Streamer enables Live Mode.
2. App confirms Twitch account/channel authorization.
3. App creates live_session and LiveSessionRoom.
4. App creates Twitch EventSub channel.chat.message subscription with webhook transport.
5. OBS/streamer screen opens and connects to LiveSessionRoom WebSocket.
6. Viewer types !A or !B in Twitch chat.
7. Twitch sends EventSub webhook to Workers route.
8. Worker verifies HMAC/signature/timestamp and forwards normalized event to LiveSessionRoom.
9. LiveSessionRoom deduplicates, parses, applies vote, broadcasts tally.
10. Streamer advances match; LiveSessionRoom locks vote and persists summary.
```

Webhook route responsibilities:

- preserve raw body for HMAC verification
- handle `webhook_callback_verification`
- reject invalid signatures/timestamps
- return 2XX quickly
- forward normalized event to DO
- handle revocation by updating session connection state

Durable Object responsibilities:

- own session state
- maintain client sockets
- process normalized chat events
- enforce current match and vote policy
- broadcast compact state
- write match summary checkpoint

React UI responsibilities:

- show connection state: not connected, connecting, connected, disconnected, reconnecting
- show vote tally and total vote count
- show fallback link only on degraded state
- keep keyboard A/D authoritative for streamer selection

_Source:_ https://dev.twitch.tv/docs/eventsub/handling-webhook-events/, https://dev.twitch.tv/docs/eventsub/eventsub-reference/, https://obsproject.com/kb/browser-source

### Security Architecture Patterns

Security architecture는 세 가지 boundary를 구분해야 한다.

**Platform auth boundary:** Twitch OAuth scopes와 EventSub subscription 권한. Token은 server-side only로 저장하고, 최소 scope를 요청한다. Twitch 문서는 필요 이상 scope 요청 시 access suspension 가능성을 경고한다.

**Session access boundary:** OBS URL과 controller URL은 capability URL처럼 동작한다. URL 유출 시 세션 state가 노출될 수 있으므로 `sessionId`만으로 접근시키지 말고 `readToken`/`controlToken`을 분리한다.

**Webhook trust boundary:** Twitch EventSub webhook은 signature 검증 전까지 신뢰하지 않는다. Twitch는 message ID + timestamp + raw body로 HMAC-SHA256 검증하라고 안내한다. replay 방어를 위해 timestamp age와 message ID 중복을 확인한다.

권장 token 모델:

- `readToken`: OBS/browser read-only realtime state
- `controlToken`: streamer controller actions, match advance
- `webhookSecret`: Twitch EventSub subscription signature verification
- `platformRefreshToken`: encrypted server-side only

**토큰 생성 및 관리 방식:**

| 토큰 | 생성 방식 | 저장 | 만료 | 폐기 |
|---|---|---|---|---|
| `readToken` | `crypto.randomUUID()` (128-bit 랜덤) | `live_sessions.obs_read_token` (평문) | 세션 종료 시 | row 삭제 또는 `status='ended'` 처리 시 무효화 |
| `controlToken` | `crypto.randomUUID()` (128-bit 랜덤) | `live_sessions.control_token` (평문) | 세션 종료 시 | 동일 |
| `webhookSecret` | `crypto.randomUUID()` | Cloudflare Worker Secret (환경 변수) | 앱 수명 | Secret 교체 + 구독 재생성 |
| `platformRefreshToken` | Twitch OAuth 반환값 | Supabase, AES-256-GCM 암호화 | Twitch 정책 (만료 없음 또는 장기) | 스트리머 연결 해제 시 삭제 |

OBS URL 형태: `/obs/:sessionId?token=readToken`

OBS URL이 유출되면 해당 세션의 read-only 상태가 노출된다. read-only이므로 투표 조작은 불가하나 실시간 집계 데이터가 노출된다. 세션 종료 후 자동으로 무효화된다.

원문 채팅 저장은 기본 금지다. 문제 진단을 위해 필요하면 streamer opt-in debug mode에서 짧은 TTL로만 저장한다.

_Source:_ https://dev.twitch.tv/docs/authentication/scopes/, https://dev.twitch.tv/docs/eventsub/handling-webhook-events/, https://dev.twitch.tv/docs/eventsub/

### Data Architecture Patterns

데이터는 live/transient/durable로 분리한다.

**Transient in Durable Object**

- current match ID
- tally counts
- voter map for current match
- processed message IDs TTL set
- connected clients
- connection state

**Durable in Supabase**

- `live_sessions`
- `live_session_platform_connections`
- `match_vote_summaries`
- `live_session_events` for coarse lifecycle events only
- result page aggregated stats

예상 table sketch:

```sql
live_sessions(
  id,
  bracket_id,
  streamer_user_id,
  platform,
  platform_channel_id,
  status,
  started_at,
  ended_at
)

match_vote_summaries(
  id,
  live_session_id,
  match_id,
  round_index,
  a_votes,
  b_votes,
  unique_voters,
  winner_choice,  -- 'A' 또는 'B', 스트리머 선택 항목
  locked_at
)
```

`chat_votes` raw table은 만들지 않는 편이 기본값이다. 필요한 경우에도 author display name, message text는 저장하지 말고 hashed platform user ID 정도로 제한한다.

Supabase Realtime Postgres Changes는 고빈도 투표 원문에는 부적합할 수 있다. Supabase 문서는 Postgres Changes가 구독자별 권한 확인 때문에 throughput 병목이 생길 수 있고, scale이 불확실하면 Broadcast를 고려하라고 설명한다. 따라서 Save One Drop One은 DO WebSocket 또는 Broadcast로 compact state를 전달하고, Postgres는 checkpoint 저장에 집중한다.

_Source:_ https://supabase.com/docs/guides/realtime/postgres-changes, https://supabase.com/docs/guides/realtime/broadcast

### Deployment and Operations Architecture

MVP 운영 체크리스트:

- Twitch Developer app 등록과 callback URL 구성
- OAuth redirect URL과 EventSub webhook URL 분리
- Workers route에서 raw body 접근 가능하게 구현
- Webhook signature 검증 테스트를 Twitch CLI로 자동화
- Durable Object migration/wrangler 설정
- OBS 1920x1080 smoke test
- connection state observability: EventSub subscription status, webhook failures, DO active sessions, vote ingress rate
- fallback link 상태와 streamer-facing error copy

운영 상태 모델:

```text
not_configured          // Twitch 연결 미설정
authorizing             // OAuth 흐름 진행 중
connected               // EventSub 구독 활성, 채팅 수신 중
degraded_webhook_failures // 120초 내 5회 이상 처리 실패 → fallback 활성화
token_expired           // Twitch access token 만료 → 재인증 필요
rate_limited            // Twitch rate limit 도달 → 자동 복구 대기
chat_restricted         // 채널이 구독자 전용/느린 모드 → 투표 도달률 저하 경고
revoked                 // Twitch가 구독 취소 → 재연결 필요
disconnected            // 네트워크 단절 또는 스트리머 수동 해제
ended                   // 세션 정상 종료
```

`chat_restricted` 상태는 채팅이 구독자 전용이거나 느린 모드로 설정되었을 때다. 투표 자체가 불가능하진 않지만 일반 시청자의 `!A/!B`가 차단될 수 있으므로 스트리머에게 경고를 표시한다.

Twitch webhook은 응답이 늦거나 실패가 누적되면 subscription이 revoked될 수 있다. 따라서 webhook route는 검증과 enqueue/forward만 수행하고, 무거운 처리는 DO나 background task로 넘긴다. 만약 DO 전달이 실패하면 짧은 retry 또는 temporary storage가 필요하다. 단, 투표 메시지는 실시간성이 중요하므로 오래된 retry를 나중에 반영하면 안 된다. `receivedAt`과 current match lock을 기준으로 stale vote는 폐기한다.

_Source:_ https://dev.twitch.tv/docs/eventsub/handling-webhook-events/, https://dev.twitch.tv/docs/cli/event-command/, https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/

### Architectural Decision Summary

| Decision | Recommendation | Rationale |
|---|---|---|
| MVP interaction | Twitch chat command primary | 방송 UX상 채팅 이탈이 치명적 |
| YouTube support | Growth | API/quota/OAuth/liveChatId 복잡도 분리 |
| Twitch transport | EventSub Webhook-first | Workers request model과 운영성이 좋음 |
| Realtime coordinator | Cloudflare Durable Object per live session | single-writer state와 WebSocket fan-out에 적합 |
| Client fan-out | DO WebSocket, optional Supabase Broadcast later | compact state 전달에 적합 |
| Persistence | Supabase checkpoint summaries | raw chat 저장 회피 |
| Fallback | web vote link only when degraded | primary UX를 해치지 않음 |
| OBS integration | Browser Source URL | 기존 방송 워크플로우와 호환 |

## Implementation Approaches and Technology Adoption

### Web Search Analysis

구현 리서치는 실제 개발·테스트·운영 가능성에 초점을 맞췄다.

**Cloudflare testing:** Cloudflare 공식 문서는 Workers Vitest integration을 권장하며, `@cloudflare/vitest-pool-workers`를 통해 Workers runtime 안에서 테스트를 실행하고 Durable Object bindings/API에 직접 접근할 수 있다고 설명한다. Durable Object 테스트는 stub 호출, HTTP integration, `runInDurableObject`, SQLite storage, alarms까지 검증할 수 있다. Sources: https://developers.cloudflare.com/workers/testing/, https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/

**Twitch testing:** Twitch CLI는 EventSub webhook handler의 challenge response와 notification event를 테스트할 수 있다. 공식 문서는 CLI `event` command로 SSL 없이 webhook handler를 검증할 수 있다고 설명한다. Sources: https://dev.twitch.tv/docs/cli/event-command/, https://dev.twitch.tv/docs/eventsub/handling-webhook-events/

**Operational fit:** Durable Objects는 chat rooms, multiplayer sessions, live dashboards처럼 단일 조정자가 필요한 실시간 앱에 맞는 primitive로 설명된다. Save One Drop One의 live voting room은 이 패턴과 직접적으로 일치한다. Source: https://workers.cloudflare.com/product/durable-objects/

### Technology Adoption Strategies

채팅 연동은 한 번에 Twitch+YouTube+멀티플랫폼으로 확장하면 OAuth, quota, platform-specific error handling이 동시에 터진다. MVP는 **Twitch-first vertical slice**로 가야 한다.

권장 adoption 단계:

1. **Domain-only prototype:** `parseVoteCommand`, `applyVote`, `lockMatch`를 순수 TypeScript로 구현하고 테스트한다.
2. **Local LiveSessionRoom:** Durable Object 없이 in-memory adapter로 UI와 state machine을 검증한다.
3. **Durable Object integration:** per-session room, WebSocket snapshot/fan-out, match lock을 구현한다.
4. **Twitch webhook integration:** EventSub challenge/signature/notification을 Workers route로 받는다.
5. **Streamer live mode UI:** Twitch connect, connected/disconnected, tally, fallback link state를 Matchup 화면에 붙인다.
6. **OBS viewport hardening:** 1920x1080에서 끊김/재연결/스크롤바/텍스트 clipping을 검증한다.
7. **Limited beta:** Twitch 채널 1-3개에서 실제 채팅량과 운영 장애를 관찰한다.
8. **Growth expansion:** YouTube adapter와 multi-platform abstraction 추가.

이 순서는 플랫폼 API 이전에 core voting correctness를 검증하고, Twitch-only로 UX를 증명한 뒤 확장한다.

_Source:_ https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/, https://dev.twitch.tv/docs/cli/event-command/

### Development Workflows and Tooling

기존 architecture.md의 폴더 경계를 유지한다.

권장 파일 배치:

```text
app/
  domain/
    live-voting.ts
    live-voting.test.ts
  services/
    twitch/
      eventsub.server.ts
      eventsub-signature.server.ts
      eventsub-types.ts
      normalize-chat-message.server.ts
  repositories/
    live-sessions.server.ts
    match-vote-summaries.server.ts
  features/
    live-voting/
      LiveModePanel.tsx
      VoteTally.tsx
      useLiveSessionSocket.ts
  routes/
    live-sessions.$sessionId.webhook.ts
    live-sessions.$sessionId.websocket.ts
    live-sessions.$sessionId.snapshot.ts
  workers/
    LiveSessionRoom.ts
```

실제 route naming은 React Router 7 project scaffold에 맞춰 조정하되, 책임 경계는 유지한다.

개발 workflow:

- domain부터 unit test로 고정
- Twitch payload fixture를 `test/fixtures/twitch-eventsub`에 저장
- webhook signature verification은 raw body test로 별도 검증
- Durable Object는 Workers Vitest integration으로 테스트
- OBS UI는 Playwright 1920x1080 screenshot으로 검증
- 실제 Twitch webhook은 Twitch CLI로 challenge/notification smoke test

_Source:_ https://developers.cloudflare.com/workers/testing/, https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/, https://dev.twitch.tv/docs/cli/event-command/

### Testing and Quality Assurance

테스트 피라미드는 다음처럼 잡는다.

**Unit tests**

- `parseVoteCommand("!A") -> "A"`
- case-insensitive handling
- whitespace handling
- non-vote chat ignored
- aliases는 지원하지 않음: `!A` / `!B` (대소문자 무시, 앞뒤 공백 제거)만 인식
- current match에서 같은 user가 투표 변경 가능/불가 정책
- stale locked match vote reject

**Service tests**

- Twitch EventSub webhook challenge response
- HMAC signature pass/fail
- timestamp too old reject
- duplicate message ID reject
- normalized `ChatMessageEvent` shape
- revocation event updates connection state

**Durable Object tests**

- client connects and receives snapshot
- chat vote updates tally
- duplicate event does not double count
- match lock persists summary
- reconnect gets current state
- hibernation recovery strategy does not lose persisted state

**UI tests**

- connected state
- no votes yet
- votes updating
- disconnected fallback
- OBS 1920x1080 no clipping/scrollbar
- keyboard A/D still advances bracket when chat disconnected

**Manual beta checklist**

- Twitch channel connects successfully (OAuth → EventSub subscription created)
- EventSub subscription appears enabled in Twitch Developer Console
- chat `!A/!B` arrives and reflects on OBS screen within 1초 (p95)
- command spam does not freeze UI (tally coalesce 동작 확인)
- OBS source survives scene switch/refresh (snapshot on reconnect)
- streamer can finish full 64-item bracket with chat connected
- streamer can finish full 64-item bracket with chat disconnected (degraded 모드)
- duplicate `!A` from same user counted once per match
- match lock 이후 도착한 vote가 다음 match에 섞이지 않음

**베타 완료 기준:**

| 지표 | 목표 |
|---|---|
| 채널 규모 | 동시 시청자 200명 이하 채널 2-3개 |
| 브라켓 완주 | 64개 아이템 브라켓 전체 완료 1회 이상 |
| 채팅 투표 p95 레이턴시 | 채팅 입력 → OBS 화면 반영 1초 이하 |
| 중복 투표 반영 | 0건 (같은 user 같은 match에서 1표만 유효) |
| 채팅 단절 복구 | 단절 → 재연결 후 스트리머가 진행 재개 가능 |
| 오류 없는 방송 완주 | 스트리머가 브라켓을 중단 없이 완료 |

시청자 1000명 이상 규모의 부하 테스트는 Growth 단계에서 진행한다.

Twitch webhook tests should use Twitch CLI because official docs explicitly support challenge and notification simulation. Durable Object tests should run in Workers runtime because Node-based tests can miss Workers API/runtime issues.

_Source:_ https://dev.twitch.tv/docs/cli/event-command/, https://developers.cloudflare.com/workers/testing/, https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/

### Deployment and Operations Practices

MVP deployment prerequisites:

- Twitch Developer application
- production OAuth callback URL
- production EventSub webhook URL over HTTPS
- webhook secret generation and secure storage
- Cloudflare Worker environment secrets
- Durable Object binding and migration
- Supabase tables and RLS policies for live session summaries
- OBS route smoke test URL

Operational metrics:

- `eventsub_webhook_received_total`
- `eventsub_signature_invalid_total`
- `eventsub_duplicate_ignored_total`
- `live_session_connected_clients`
- `live_session_vote_events_total`
- `live_session_vote_parse_ignored_total`
- `live_session_tally_broadcast_latency_ms`
- `match_vote_summary_write_failures_total`
- `chat_connection_state_change_total`

Incident behaviors:

- invalid signature: reject 403, log minimal metadata
- webhook delivery spike: batch tally broadcast
- Supabase write failure: keep local summary and retry once; show streamer no blocking error unless result persistence fails
- EventSub revocation: show `chat disconnected`, expose fallback link
- DO restart/hibernation: reconstruct from storage/snapshot

Twitch webhook handlers must respond quickly. Twitch official docs warn that slow/failing responses can lead to subscription revocation. Heavy processing should not block the webhook response.

_Source:_ https://dev.twitch.tv/docs/eventsub/handling-webhook-events/, https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/

### Team Organization and Skills

필요 역량은 작은 팀 기준으로 세 축이다.

- **Full-stack TypeScript:** React Router routes/actions, Workers runtime, Supabase repository boundary
- **Realtime systems:** Durable Objects, WebSocket lifecycle, idempotency, reconnect/snapshot
- **Platform integration:** Twitch OAuth/EventSub scopes, webhook signature, subscription lifecycle

AI agent implementation 시 주의:

- Twitch EventSub 권한 모델을 단순 IRC 봇처럼 가정하지 말 것
- OBS Browser Source에 token을 넣지 말 것
- raw chat message를 저장하지 말 것
- Postgres Changes를 고빈도 vote stream으로 쓰지 말 것
- YouTube까지 MVP에 끌어오지 말 것

_Source:_ https://dev.twitch.tv/docs/authentication/scopes/, https://developers.cloudflare.com/durable-objects/best-practices/websockets/

### Cost Optimization and Resource Management

비용을 줄이는 핵심은 raw event 저장과 과도한 fan-out을 피하는 것이다.

권장:

- DO per live session, short-lived
- UI broadcast는 vote 폭주 시 coalesce (배칭 간격은 베타 실측 기반 조정)
- raw chat drop, summary only persist
- inactive session auto-end/cleanup alarm
- WebSocket Hibernation API 사용
- Supabase writes는 match lock 시점 summary 중심

Cloudflare Durable Objects는 WebSocket hibernation으로 idle duration cost를 줄일 수 있다. 그러나 vote ingress가 높은 동안에는 active compute가 발생하므로, command parsing과 fan-out payload를 작게 유지해야 한다.

_Source:_ https://developers.cloudflare.com/durable-objects/best-practices/websockets/, https://workers.cloudflare.com/product/durable-objects/

### Risk Assessment and Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Twitch EventSub scope/authorization complexity | streamer connect failure | Twitch-only beta, clear connect diagnostics, minimal scopes |
| Webhook signature bug | no votes counted | Twitch CLI tests, raw body fixtures |
| Event duplicate delivery | inflated vote count | platform message ID idempotency |
| Chat flood | UI jank, high cost | batching, compact tally payload, ignore non-votes early |
| Match race at advance | late votes counted on wrong match | match lock timestamp and current match ID check |
| DO hibernation state loss | reconnect wrong tally | persist current snapshot/checkpoint |
| Supabase write failure | result stats incomplete | retry summary writes, local DO storage buffer |
| OBS refresh/scene switch | blank or stale screen | snapshot on connect, reconnect state UI |
| YouTube added too early | MVP delay | keep YouTube Growth |
| Privacy concern | trust loss | no raw chat storage, hashed IDs only if needed |

_Source:_ https://dev.twitch.tv/docs/eventsub/, https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/, https://supabase.com/docs/guides/realtime/postgres-changes

## Technical Research Recommendations

### Implementation Roadmap

**Phase 0: Contract and tests**

- Define `ChatMessageEvent`, `VoteCommand`, `LiveVoteState`, `MatchVoteSummary`
- Implement domain parser/reducer
- Add fixtures and unit tests

**Phase 1: LiveSessionRoom**

- Add Durable Object binding
- Implement connect/snapshot/broadcast
- Implement vote ingress method
- Implement match lock and summary persistence stub

**Phase 2: Twitch EventSub webhook**

- Add OAuth connect flow if not already present
- Add EventSub subscription creation
- Add webhook verification/challenge/notification/revocation handling
- Normalize Twitch chat messages and forward to DO

**Phase 3: UI integration**

- Add `StreamerLiveModePanel`
- Add `VoteTally`
- Add connection states and fallback link
- Wire Matchup screen current match to LiveSessionRoom

**Phase 4: OBS hardening**

- 1920x1080 visual tests
- reconnect tests
- scene refresh behavior
- no normal app chrome in OBS mode

**Phase 5: Beta operations**

- Twitch CLI verification
- one or two live channel pilots
- telemetry dashboard
- post-stream summary review

### Technology Stack Recommendations

- TypeScript across domain/services/UI
- React Router 7 route actions/loaders/resource routes
- Cloudflare Workers for BFF/webhook endpoints
- Cloudflare Durable Objects for live session coordinator
- Durable Object WebSocket hibernation for OBS/controller fan-out
- Supabase Postgres for live session metadata and match vote summaries
- Twitch EventSub Webhook for MVP chat ingestion
- YouTube Live Chat API only after Twitch MVP proves retention/engagement

### Skill Development Requirements

- Twitch OAuth and EventSub subscription lifecycle
- Raw body HMAC verification in Workers
- Durable Object WebSocket and storage lifecycle
- OBS Browser Source rendering constraints
- Realtime UI state design with reconnect and stale state handling

### Success Metrics and KPIs

Product/UX:

- % active viewers participating via `!A/!B`
- votes per match
- matches with at least one chat vote
- streamer repeat use
- chat disconnect rate per session

Technical:

- p95 chat message received → tally visible latency
- duplicate event ignore rate
- webhook invalid signature rate
- DO reconnect success rate
- OBS visual regression pass rate
- match summary persistence success rate

MVP acceptance threshold:

- Twitch chat vote visible on streamer/OBS screen within 1 second p95
- duplicate/retry events do not inflate counts
- streamer can finish a full 64-item bracket with chat connected
- streamer can continue if chat disconnects
- no raw chat text stored by default

## Research Synthesis

# Twitch-First Chat Voting Architecture: Save One Drop One Technical Research

## Executive Summary

Gartic On Stream류 방송 게임의 핵심은 “시청자가 이미 보고 있는 채팅창이 곧 컨트롤러”라는 점이다. GOS 공식 사이트는 설치 없이 온라인으로 동작하고, 스트리밍 서비스에 one-click으로 연결한 뒤, 시청자가 라이브 채팅으로 정답을 입력한다고 설명한다. 이 패턴은 Save One Drop One에 그대로 중요하다. 시청자가 다른 탭이나 링크로 이동해 투표하게 만드는 방식은 기술적으로 안전해도 방송 UX를 망친다.

Save One Drop One의 MVP는 **Twitch-first chat command voting**으로 가야 한다. 즉 `!A` / `!B` 명령어를 Twitch 채팅에서 직접 받고, 현재 매치의 A/B 집계를 방송 화면에 실시간 표시한다. YouTube는 Live Chat API, OAuth 검증, liveChatId, quota 복잡도가 더 크므로 Growth로 미룬다. 웹 투표 링크는 Twitch 연결 실패나 API 장애 시 fallback으로만 제공한다.

권장 아키텍처는 기존 React Router 7 + Cloudflare Workers + Supabase 결정을 유지하면서, live voting만 Cloudflare Durable Object로 세션별 single-writer coordinator를 두는 방식이다. Twitch EventSub Webhook을 Worker route에서 검증하고, 정규화된 chat event를 `LiveSessionRoom` Durable Object로 전달한다. Durable Object는 vote reducer, 중복 제거, match lock, OBS/컨트롤러 fan-out을 담당하고, Supabase에는 raw chat이 아니라 match vote summary만 저장한다.

**Key Technical Findings**

- Gartic On Stream류 제품은 채팅을 별도 보조 입력이 아니라 primary interaction surface로 사용한다.
- Twitch는 EventSub `channel.chat.message`를 통해 구조화된 chat message event를 제공하며, Webhook/WebSocket/Conduit transport를 지원한다.
- EventSub는 at-least-once delivery와 webhook HMAC 검증, challenge response, revocation 처리가 필요하다.
- OBS Browser Source는 CEF 기반 웹 페이지를 로드하므로 Save One Drop One의 방송 화면은 표준 웹 앱 + WebSocket으로 충분하다.
- Cloudflare Durable Objects는 chat room/multiplayer session처럼 단일 조정자가 필요한 실시간 상태에 적합하다.
- Supabase Realtime Postgres Changes는 고빈도 raw vote stream보다 checkpoint/summary 저장에 더 적합하다.

**Technical Recommendations**

- MVP는 `Twitch chat command primary + web fallback`으로 정의한다.
- Twitch transport는 EventSub Webhook-first로 시작한다.
- `LiveSessionRoom` Durable Object를 live session당 하나씩 둔다.
- raw chat text는 기본 저장하지 않는다.
- YouTube chat command는 Twitch MVP 검증 후 Growth로 추가한다.
- PRD/UX/Architecture 문서에서 “웹 투표 링크 중심” 표현을 제거하고 “Twitch-first chat voting”으로 정렬한다.

## Strategic Technical Recommendations

### PRD 수정 권고

현재 PRD의 Twitch/YouTube 채팅 연동 MVP 항목은 범위를 좁혀야 한다.

권장 변경:

- `FR37`: “채팅 시청자는 Twitch 채팅에서 !A 또는 !B 명령어로 현재 매치에 실시간 투표할 수 있다.”로 MVP 범위 수정
- `FR37a`: “YouTube 채팅 명령어 투표는 Growth로 둔다.”
- `FR38`: “매치업/OBS 화면에는 Twitch 채팅 투표 집계가 A% vs B%로 표시된다.”
- fallback 요구사항 추가: “Twitch 연결 실패 시 웹 투표 링크를 backup으로 표시한다.”

### Architecture 수정 권고

architecture.md에 다음 ADR을 추가하는 것이 좋다.

- ADR: Twitch-first chat voting MVP
- ADR: LiveSessionRoom Durable Object as realtime coordinator
- ADR: EventSub Webhook-first ingestion
- ADR: Persist vote summaries, not raw chat messages

### UX 수정 권고

UX 문서에서 “viewer voting link primary” 또는 “웹 투표 링크 중심” 표현은 fallback으로 낮춘다. Streamer Live Mode Panel은 Twitch connect가 primary CTA여야 한다.

## Future Technical Outlook and Innovation Opportunities

### Growth Opportunities

- YouTube Live Chat API `streamList` adapter
- Multi-platform chat aggregation
- Twitch Extension live poll
- Channel Points integration
- streamer-specific command aliases
- vote weighting for subs/members, only if product wants it
- post-stream analytics from match vote summaries

YouTube should follow Twitch MVP, not ship alongside it. YouTube Live Chat API has useful streaming support, but liveChatId discovery, quota handling, OAuth verification, broadcast status errors, and “made for kids” constraints add enough complexity to delay MVP.

_Sources:_ https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList, https://developers.google.com/youtube/v3/live/docs/liveBroadcasts

## Source Verification and Research Limits

### Primary Sources

- Gartic On Stream official site: https://gos.gg/en/
- Onrizon GarticTube: https://onrizon.com/en/products/gartictube
- Twitch EventSub: https://dev.twitch.tv/docs/eventsub/
- Twitch EventSub Webhook handling: https://dev.twitch.tv/docs/eventsub/handling-webhook-events/
- Twitch EventSub Reference: https://dev.twitch.tv/docs/eventsub/eventsub-reference/
- Twitch scopes: https://dev.twitch.tv/docs/authentication/scopes/
- YouTube Live Chat `streamList`: https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList
- OBS Browser Source: https://obsproject.com/kb/browser-source
- Cloudflare Durable Object WebSockets: https://developers.cloudflare.com/durable-objects/best-practices/websockets/
- Cloudflare Workers testing: https://developers.cloudflare.com/workers/testing/
- Supabase Broadcast: https://supabase.com/docs/guides/realtime/broadcast
- Supabase Postgres Changes: https://supabase.com/docs/guides/realtime/postgres-changes

### Confidence Levels

- **High confidence:** Twitch EventSub requirements, OBS Browser Source capabilities, Durable Object fit, Supabase Realtime trade-offs.
- **Medium confidence:** Gartic On Stream internal implementation. Public docs confirm behavior, but not private server architecture.
- **High confidence product judgment:** Web vote link primary is poor UX for live stream viewers because it forces context switching away from chat.

### Final Technical Conclusion

Save One Drop One should not copy the safest technical path. It should copy the correct interaction model: chat is the controller. The technically pragmatic MVP is not “avoid platform integration”; it is “limit platform integration to Twitch, implement it correctly, and degrade cleanly.”

Final architecture:

```text
Twitch chat !A/!B
  -> Twitch EventSub Webhook
  -> Cloudflare Worker verification
  -> LiveSessionRoom Durable Object
  -> OBS/streamer WebSocket tally
  -> Supabase match summary
```

This is the best fit for Save One Drop One’s streamer-first product promise, existing Cloudflare/Supabase architecture, and the interaction pattern proven by Gartic On Stream류 products.

**Technical Research Completion Date:** 2026-05-09

<!-- Content will be appended sequentially through research workflow steps -->
