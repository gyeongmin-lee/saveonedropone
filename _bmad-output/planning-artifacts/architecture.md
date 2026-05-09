---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/product-brief-saveonedropone.md"
  - "_bmad-output/planning-artifacts/product-brief-saveonedropone-distillate.md"
  - "_bmad-output/planning-artifacts/research/domain-saveonedropone-merged-streamer-bracket-research-2026-05-06.md"
  - "_bmad-output/planning-artifacts/research/technical-gartic-on-stream-chat-integration-saveonedropone-research-2026-05-09.md"
  - "_bmad-output/planning-artifacts/prd-validation-report.md"
  - "_bmad-output/project-context.md"
  - "docs/design/README.md"
  - "docs/design/SKILL.md"
  - "docs/design/ui_kits/streamer-native/README.md"
workflowType: 'architecture'
project_name: 'saveonedropone'
user_name: 'GM'
date: '2026-05-07'
lastStep: 8
status: 'complete'
completedAt: '2026-05-08'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Agent Implementation Brief

Implementation agents MUST read this brief before using the rest of this architecture.

### Non-Negotiable Decisions

- Use React Router 7 framework mode on Cloudflare Workers.
- Do not introduce Next.js, Vercel-only assumptions, a Node-only server runtime, a broad public REST API, or GraphQL for MVP.
- Use Supabase for Postgres, Auth, Storage, and Realtime.
- Treat React Router loaders/actions/resource routes as the BFF boundary.
- Treat Supabase Realtime as transient coordination only; durable broadcast/session recovery must use persisted checkpoints.
- Twitch chat (`!A/!B`) is the sole viewer participation mechanism. Do not implement a web vote link.
- Use Twitch EventSub `channel.chat.message` for chat collection. Do not use IRC justinfan.
- Vote state: upsert each vote to Supabase Postgres (`live_votes` table, idempotent on `(session_id, user_id, match_id)`), then broadcast aggregated counts via Supabase Realtime Broadcast. Do not stream raw chat events to Postgres Changes.
- YouTube chat integration is Growth. Do not implement it in MVP.
- Keep anonymous in-progress play local-first with versioned localStorage state.
- Public bracket/result/category pages must render SEO metadata and OG metadata server-side.
- Public visibility must be decided before metadata, cache headers, ad eligibility, and rendering.
- Use `docs/design/colors_and_type.css` as the design token source; do not hardcode brand colors.

### Where Code Belongs

- `domain/`: pure TypeScript rules. No React, Supabase, request/response, localStorage, or browser APIs.
- `repositories/`: database row mapping and persistence access. Return domain-shaped camelCase objects.
- `services/`: auth, storage, rate limiting, YouTube metadata, realtime setup, analytics, Twitch EventSub chat collection, live vote aggregation, and other external boundaries.
- `routes/`: request parsing, auth checks, validation, repository/service orchestration, metadata, headers, and route composition.
- `features/`: product-specific UI flows, hooks, and client interaction wiring.
- `components/`: reusable app-wide presentational UI only.

### MVP Scope Guardrails

- Do not create billing/premium infrastructure unless a later story explicitly adds it.
- Do not add server-generated result image routes unless a later story explicitly approves the runtime approach.
- Do not persist every anonymous in-progress match server-side.
- Do not hand-roll visibility, SEO metadata, slug, cache, or rate-limit behavior inside individual route modules.
- Do not add server-side packages until Cloudflare Workers compatibility is checked.

### Reading Thread for Implementation Agents

Use this document in this order:

1. Start with this brief and treat it as the active implementation contract.
2. Check `Core MUST Rules` and `Memory Anchors for Agents` before making architectural choices.
3. For technology decisions, read the relevant ADR before proposing alternatives.
4. For file placement, use `Where Code Belongs`, then confirm against `Project Structure & Boundaries`.
5. For route work, follow: repository fetch -> visibility policy -> metadata helper -> route headers -> render.
6. For interactive play, OBS, or live voting work, keep the thread clear: pure tournament/session rules live in `domain/`, durable checkpoints live in repositories, realtime transport lives in services, and UI subscriptions live in feature hooks.
7. For public UGC pages, always connect visibility, SEO metadata, cache headers, moderation state, and ad eligibility as one policy-driven flow.
8. If a story appears to require breaking this brief, stop and treat it as an architecture change requiring explicit approval.

### Default Implementation Order

1. Scaffold Cloudflare React Router app.
2. Add route registration through `app/routes.ts`.
3. Add design token entry derived from `docs/design/colors_and_type.css`.
4. Add Supabase environment contract and server-only client boundary.
5. Create base folders: `domain/`, `repositories/`, `services/`, `schemas/`, `features/`, `components/`.
6. Implement pure tournament/domain logic before wiring routes.
7. Implement public loaders in this order: repository fetch -> visibility policy -> metadata helper -> route headers -> render.

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Save One Drop One은 스트리머-퍼스트 1v1 브라켓 토너먼트 웹 앱이다. PRD는 55개 기능 요구사항을 브라켓 탐색, Bracket Pack 생성, 1v1 매치업 루프, 결과 및 공유, 소셜 참여, 방송 통합, UGC 모더레이션, 인증, 수익화 영역으로 구성한다.

아키텍처상 핵심 기능 표면은 다음과 같다.

- 공개 브라켓 탐색 및 SEO 랜딩 페이지
- 인증된 사용자의 Bracket Pack 생성 및 YouTube/image URL 기반 항목 입력
- 1v1 토너먼트 진행 엔진, 부전승 처리, undo/restart, 로컬 진행 상태 저장
- Streamer Live Mode 매치업 레이아웃 (OBS screen capture 최적화, 별도 OBS 라우트 없음) 및 로컬 키보드 조작
- 결과 페이지, 결과 이미지 생성, OG 메타데이터 기반 공유 링크
- 공개 결과 댓글, 신고, 관리자 takedown, DMCA 처리 경로
- 익명 플레이와 소셜 로그인 기반 생성 권한 분리
- 방송 중 Twitch 채팅 !A/!B 명령어 기반 실시간 투표 (채팅이 유일한 참여 방식; 웹 투표 링크 없음)
- Growth 이후 결과 비교, YouTube 채팅 연동, 즐겨찾기, 애널리틱스, 프리미엄 기능 확장

MVP는 단순 게임 UI가 아니라 `Bracket Pack`이라는 콘텐츠 단위를 중심으로 한다. 제목, 카테고리, 썸네일, 참가 항목, 예상 진행 시간, OBS 레이아웃, 공개 페이지, 결과 페이지, 공유 메타데이터가 하나의 도메인 객체처럼 일관되게 다뤄져야 한다.

**Non-Functional Requirements:**
아키텍처를 직접 좌우하는 NFR은 다음과 같다.

- 공개 브라켓/결과 페이지는 크롤러가 초기 HTML에서 title, description, canonical, OG 태그를 읽을 수 있어야 한다.
- 공개 브라켓 페이지와 결과 페이지는 SSR 또는 정적 응답 계층을 통해 SEO와 캐시 효율을 확보해야 한다.
- 매치업 전환은 빠른 클라이언트 인터랙션이 필요하며, 선택 후 다음 매치 전환 목표는 300ms 수준이다.
- OBS 브라우저 소스는 초기 로드 3초 이내, 키 입력 후 화면 반영 p95 100ms 이하를 목표로 한다.
- 결과 이미지 생성은 64강 기준 p95 3초 이하로 다운로드 준비가 가능해야 한다.
- MVP는 동시 접속 1,000명 기준 핵심 플레이·결과 공유 플로우를 유지해야 하며, Growth에서는 10,000명 확장 경로를 문서화해야 한다.
- 인기 공개 페이지는 캐시 가능한 응답으로 origin 부하를 제한해야 한다.
- UGC 이미지 업로드는 타입과 10MB 제한을 강제해야 한다.
- 인증 토큰은 클라이언트 스크립트에서 직접 읽을 수 없어야 하며 HTTPS/TLS 기준을 만족해야 한다.
- DMCA 신고 접수와 처리 로그는 1년 이상 조회 가능해야 한다.
- 핵심 플레이 플로우는 키보드만으로 완료 가능해야 하며, 주요 접근성 자동 검사에서 critical/serious issue 0건을 목표로 한다.

**Scale & Complexity:**
이 프로젝트의 복잡도는 medium으로 판단한다. CRUD 중심 웹 앱보다 복잡하지만, 고규제 엔터프라이즈 시스템은 아니다. 복잡도를 올리는 요소는 실시간 방송 동기화, UGC/SEO 플라이휠, 결과 이미지 생성, 광고/캐시 전략, 익명 사용자와 인증 사용자 권한 분리, 운영자 moderation workflow다.

- Primary domain: full-stack web app, entertainment creator tools, UGC SEO platform
- Complexity level: medium
- Estimated architectural components: 12
  - Web routing/rendering layer
  - Public SEO page layer
  - Bracket Pack domain model
  - Tournament engine
  - Play session/local persistence layer
  - OBS broadcast view
  - Live voting/session sync
  - Result and image generation
  - UGC creation/media ingestion
  - Auth/account layer
  - Moderation/DMCA/admin layer
  - Analytics/ad/event instrumentation

### Technical Constraints & Dependencies

- React Router 7 framework mode is the selected web framework pattern.
- Next.js must not be used or proposed.
- Public browse/result pages require SSR or static generation behavior for SEO and social previews.
- Matchup/play and OBS surfaces are primarily CSR/interactivity-heavy.
- Public result URLs must render OG metadata server-side because social crawlers must see previews without client JavaScript.
- Player bracket progress is stored locally for anonymous users and must survive refresh.
- Bracket creation requires authentication; browse, play, comments, and result sharing do not.
- Supported social login providers are Google and Twitch.
- YouTube URL metadata extraction requires quota/error handling and manual fallback.
- External image URLs have CORS, hotlinking, expiry, and reliability risks; important curated assets should be proxied/cached or stored.
- OBS browser source targets Chromium behavior and 1920x1080 layout stability.
- Design implementation should follow `docs/design/` tokens and Streamer Native UI kit conventions.

### Cross-Cutting Concerns Identified

- SEO correctness across public bracket, category, and result pages
- Cache strategy for viral public pages and OG assets
- Domain consistency for bracket seeding, byes, match history, undo, restart, and result reconstruction
- Anonymous session persistence without requiring account creation
- Real-time state propagation between Twitch EventSub webhook and streamer matchup page (vote aggregation broadcast and chat feed)
- Media ingestion safety, storage, proxying, and fallback behavior
- Moderation states affecting public visibility, noindex behavior, ad eligibility, and takedown logs
- Auth boundary between anonymous play and creator/admin capabilities
- Analytics events for streamer repeat use, derived viewer sessions, result shares, and share-link return sessions
- Accessibility and keyboard-first operation for both players and OBS operators
- UI token consistency with the existing Streamer Native design system

## Starter Template Evaluation

### Primary Technology Domain

Full-stack React Router 7 framework-mode web application based on project requirements analysis.

The architecture foundation must support SSR/SSG for public SEO pages, CSR-heavy interactive play surfaces, route loaders/actions, social metadata rendering, and a future backend integration path for UGC, auth, moderation, and live voting.

### Starter Options Considered

**Option 1: Official React Router default template**

Command:

```bash
npx create-react-router@latest saveonedropone
```

The official default template is the selected baseline for this project because it directly matches the project-context decision to use React Router 7 framework mode. The React Router templates repository describes the default template as production-ready with server-side rendering, TypeScript, TailwindCSS, Docker support, asset optimization, and hot module replacement.

Architectural fit:
- Strong fit for SSR/SEO public bracket and result pages
- Strong fit for route modules, loaders, actions, and Remix-style app structure
- Good starting point for TypeScript and framework-mode conventions
- Does not prematurely lock database, auth provider, realtime provider, or deployment platform
- TailwindCSS is included by default, but project UI should still use the existing `docs/design/` CSS custom properties as the design-token source of truth

Risk:
- Tailwind default styling conventions could drift from the existing Streamer Native design system if implementation agents use utility classes without token discipline.
- Backend/data architecture still needs explicit decisions in later architecture steps.

**Option 2: Official React Router node-postgres template**

Command:

```bash
npx create-react-router@latest saveonedropone --template remix-run/react-router-templates/node-postgres
```

This template adds PostgreSQL support with Drizzle ORM, migrations, and type-safe queries.

Architectural fit:
- Strong fit if PostgreSQL + Drizzle is chosen as the persistence layer
- Useful for UGC, moderation logs, comments, auth-linked creator data, and analytics events
- Reduces setup work for database-backed features

Risk:
- DB is still explicitly undecided in project context, so choosing this now would prematurely settle a major architecture decision.
- Realtime voting and media storage still require separate decisions.

**Option 3: Official React Router node-custom-server template**

Command:

```bash
npx create-react-router@latest saveonedropone --template remix-run/react-router-templates/node-custom-server
```

This template extends the default template with a customizable Node.js server.

Architectural fit:
- Useful if OBS/live voting synchronization needs custom WebSocket/SSE middleware in the same runtime
- Useful if deployment target is a traditional Node server

Risk:
- Backend runtime and deployment platform are undecided.
- A custom server may reduce portability to edge/serverless platforms.

**Option 4: Nx React Router workspace**

Nx provides React Router framework-mode setup inside an Nx workspace.

Architectural fit:
- Useful if this becomes a monorepo with separate app, shared packages, worker services, and test tooling
- Helpful for larger teams or multi-app structure

Risk:
- Adds workspace/tooling complexity before there is evidence the MVP needs it.
- For a 1-person AI-assisted build, this is likely heavier than necessary at project start.

**Option 5: Third-party SaaS starters**

Examples include React Router starter kits with Convex/Clerk/Polar or commercial SaaS kits with Supabase/Stripe.

Architectural fit:
- Can accelerate auth, billing, dashboard, realtime, and SaaS account features

Risk:
- This product is not primarily a SaaS dashboard or subscription app in MVP.
- These starters make large bundled decisions about auth, database, billing, UI components, and deployment before the architecture has evaluated them.
- They may conflict with the custom Streamer Native design system and creator-tool domain model.

### Selected Starter: Official React Router Default Template

**Rationale for Selection:**

Use the official React Router default template as the implementation foundation.

This is the conservative choice because the project already mandates React Router 7 framework mode and forbids Next.js. The default template gives the required SSR-capable framework structure without prematurely choosing database, auth, realtime, storage, or deployment vendors. Those decisions should be made explicitly in later architecture steps because they materially affect UGC moderation, media handling, live voting, OBS stability, SEO caching, and operating cost.

The first implementation story should initialize from the official default template, then replace or constrain styling to use the existing `docs/design/` CSS custom properties and Streamer Native UI kit conventions.

**Initialization Command:**

```bash
npx create-react-router@latest saveonedropone
```

If initializing inside the existing repository rather than creating a nested project, the implementation story should adapt the command or manually apply the generated structure at repo root after confirming the desired filesystem layout.

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript-first React application
- React Router 7 framework mode
- Route module conventions with loaders/actions
- SSR-capable server entry and client hydration structure

**Styling Solution:**
- Default template includes TailwindCSS
- Project-specific rule: production UI must use `docs/design/colors_and_type.css` CSS custom properties as design tokens
- Tailwind may be retained only as layout utility support if it does not replace or fork the design-token source of truth

**Build Tooling:**
- Vite-based React Router framework tooling
- Asset optimization
- Hot module replacement
- Production build structure aligned with React Router deployment guides

**Testing Framework:**
- Starter-level testing must be reviewed after initialization
- Architecture should explicitly add test expectations for tournament engine, route metadata, accessibility smoke checks, and critical play/result flows

**Code Organization:**
- React Router app structure with route modules
- Public SEO routes should be separated from CSR-heavy play/OBS routes
- Domain logic should live outside route components so tournament generation, byes, undo/restart, result reconstruction, and image generation can be tested independently

**Development Experience:**
- Framework-mode dev server
- Type-safe route module APIs
- HMR
- Docker support from the official default template
- Future deployment adapter choice deferred until hosting/runtime decision

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data platform: Supabase managed Postgres
- Authentication: Supabase Auth with Google and Twitch OAuth
- Media storage: Supabase Storage for uploaded/proxied images
- Realtime: Supabase Realtime Broadcast for OBS view and streamer controller sync; Supabase Postgres for vote state persistence (upsert + aggregation)
- Hosting: Cloudflare Workers for React Router SSR/BFF deployment
- API pattern: React Router loaders/actions/resource routes as the BFF layer
- Validation: shared server-side schemas for actions, loaders, and domain inputs

**Important Decisions (Shape Architecture):**
- SQL migrations and generated TypeScript database types are the default persistence workflow.
- Domain logic is kept outside route modules.
- Public SEO pages use SSR with explicit `meta` and `headers`.
- Anonymous play state is local-first, with server result persistence only at completion/share.
- Admin/moderation operations are server-only and never expose service credentials to the browser.
- Cloudflare Worker runtime compatibility is a hard constraint for server-side app code.
- Twitch chat integration requires a dedicated streamer OAuth consent flow: streamer must grant `channel:bot` scope; app bot account holds `user:bot` + `user:read:chat` tokens. These are separate from the user-facing Twitch social login.
- Live vote counting uses DB-level upsert on `(session_id, user_id, match_id)` for idempotent last-vote-wins semantics. Multiple Worker instances may receive EventSub webhooks concurrently; DB upsert is the coordination point.
- Supabase Realtime Broadcast carries aggregated vote state (`{ match_id, vote_a, vote_b }`) and ephemeral raw chat messages (`{ userId, displayName, message, sentAt }`) for the ChatPanel feed. Raw chat messages are not persisted to any table.

**Deferred Decisions (Post-MVP):**
- YouTube chat command integration (after Twitch stabilization; requires gRPC streamList Workers compatibility verification)
- Result comparison screen
- Creator analytics dashboard
- Billing/subscriptions
- Dedicated worker queue, unless image generation or media proxying proves too slow in MVP
- Direct Postgres connection optimization through Cloudflare Hyperdrive or equivalent

### Data Architecture

Use Supabase managed Postgres as the primary database.

Rationale:
- The product has relational domain data: users, Bracket Packs, entries, categories, tags, play results, comments, reports, moderation states, DMCA logs, and analytics events.
- PostgreSQL fits relational UGC and moderation workflows.
- Supabase reduces integration load by combining Postgres, Auth, Storage, and Realtime.

Data modeling approach:
- `bracket_packs` is the core content object.
- `bracket_entries` stores candidate items and media references.
- `play_results` stores completed public/shareable results, not every anonymous in-progress local state.
- `comments`, `reports`, `moderation_actions`, and `dmca_requests` are first-class tables.
- `analytics_events` records product loop metrics: streamer repeat use, derived viewer sessions, result shares, and share-link returns.
- `live_sessions` stores active broadcast session metadata: streamer user, bracket pack, current match, Twitch channel ID, connection status, and EventSub subscription ID.
- `live_votes` stores per-match vote state: `(session_id, user_id, match_id)` unique, `vote_value` ('A'|'B'), `voted_at`. Scoped to the session lifetime; may be cleared after session ends.

Migration approach:
- Use SQL migrations through Supabase CLI.
- Generate TypeScript database types from the schema.
- Keep migrations explicit and reviewable; avoid implicit schema drift.

Caching strategy:
- Public bracket/category/result pages should emit cache headers from React Router route `headers`.
- Viral public pages should use Cloudflare CDN cache with stale-while-revalidate behavior where safe.
- Moderation state changes must invalidate or bypass cached public visibility and immediately apply `noindex`.

### Authentication & Security

Use Supabase Auth with Google and Twitch OAuth.

Authorization:
- Anonymous users can browse, play, share results, and comment where allowed.
- Authenticated users can create Bracket Packs.
- Admin/moderator permissions are stored in app-owned profile/role tables.
- Supabase RLS protects user-owned data where client-side Supabase access is used.
- Service-role access is server-only and limited to route actions/loaders or server modules.

Twitch chat integration OAuth (separate from social login):
- Streamer social login (Supabase Auth Twitch OAuth) grants user identity only.
- Chat collection requires a second, distinct OAuth consent: streamer grants `channel:bot` scope to the Save One Drop One app. This is the channel connection onboarding step.
- App bot account holds `user:bot` + `user:read:chat` tokens server-side. Never expose bot tokens to the browser.
- Store per-streamer: `twitch_channel_id`, `eventsub_subscription_id`, connection status, token expiry. Handle token refresh and revocation.

Security patterns:
- Use SSR-compatible cookie/session handling for auth.
- Never expose service-role credentials or Twitch bot tokens to the browser.
- Validate all action inputs server-side, including EventSub webhook HMAC signatures.
- Enforce upload MIME/type/size limits before persistence.
- Record moderation and DMCA actions with actor, target, timestamp, and state transition.

### API & Communication Patterns

Use React Router loaders/actions/resource routes as the application BFF.

Pattern:
- Loaders fetch SSR data and public SEO metadata.
- Actions handle mutations: create bracket, submit comment, report content, moderation actions.
- Resource routes handle callbacks, generated assets, lightweight API endpoints, and webhook-style integrations.
- No separate GraphQL layer for MVP.
- No broad public REST API for MVP.

Realtime communication:
- Use Supabase Realtime Broadcast for live vote aggregation and ephemeral chat feed broadcast to the streamer's matchup page only. There are no viewer WebSocket clients (web vote link does not exist).
- Store authoritative match/session checkpoints in Postgres only where persistence is needed.
- Treat Realtime messages as transient coordination, not the durable source of truth.

Live voting architecture (Twitch chat):
- `POST /api/twitch/eventsub` resource route: validate EventSub HMAC signature, parse `channel.chat.message`, extract first word, match `!a`/`!b` case-insensitively.
- On valid vote: upsert to `live_votes (session_id, user_id, match_id, vote_value, voted_at)` with conflict target `(session_id, user_id, match_id)`.
- After upsert: fetch aggregated `COUNT` per vote_value, broadcast `{ type: 'vote_update', match_id, vote_a, vote_b }` to Supabase Broadcast channel `live-session:{session_id}`.
- For all chat messages (vote and non-vote): also broadcast `{ type: 'chat_message', userId, displayName, message, color, sentAt }` to the same Broadcast channel for the ChatPanel message feed. Do not persist raw chat messages to any table.
- Streamer's matchup page (Streamer Live Mode active) subscribes to `live-session:{session_id}` Broadcast channel on mount and handles both `vote_update` and `chat_message` event types.
- Do not subscribe to Postgres Changes for vote events. Do not log raw chat messages to any table.

Error handling:
- Route actions return typed validation errors for user-correctable problems.
- Unexpected server failures log structured context and return generic user-facing errors.
- Moderation/security failures should not reveal private policy or admin details.

Rate limiting:
- MVP should rate-limit high-risk writes: comments, reports, auth callbacks, URL parsing, image upload, and live vote submissions.
- Exact mechanism can be implementation-specific, but it must run server-side.

### Frontend Architecture

Use React Router framework mode with route modules.

State management:
- Server data comes from loaders.
- Mutations use actions/fetchers.
- Local bracket play state uses localStorage-backed domain state for anonymous refresh recovery.
- Avoid global client state libraries in MVP unless route/fetcher/local state becomes insufficient.

Component architecture:
- Route components compose feature components.
- Domain logic lives in `app/domain/*` or equivalent, outside UI components.
- Tournament engine is pure TypeScript and unit-tested.
- Design tokens come from `docs/design/colors_and_type.css`; do not fork color/type values into ad hoc constants.

Rendering strategy:
- Home/browse/category/public bracket/result pages: SSR.
- Matchup/play flow: CSR-heavy route with local state. Streamer Live Mode is an opt-in panel within this same route, optimized for 1920×1080 OBS screen capture; no separate OBS browser source route.
- Public result pages must render OG metadata on the server.

Testing:
- Use unit tests for tournament engine, domain utilities, validation, and metadata helpers.
- Use end-to-end tests for core browse/play/result/share smoke tests.
- Include accessibility checks for keyboard completion and critical/serious issues.

### Infrastructure & Deployment

Use Cloudflare Workers for the React Router application deployment.

Rationale:
- Cloudflare officially supports full-stack React Router v7 apps through Cloudflare tooling.
- The cost profile is a better fit for an early MVP than Vercel.
- Cloudflare's CDN/cache model fits public bracket/category/result pages and viral traffic spikes.
- Supabase remains the system of record for Postgres, Auth, Storage, and Realtime, so Cloudflare only needs to run the React Router SSR/BFF layer.

Deployment approach:
- Prefer Cloudflare's React Router scaffold/deploy path:

```bash
npm create cloudflare@latest -- saveonedropone --framework=react-router
```

- If starting from the official React Router default template, configure Cloudflare deployment with Wrangler and the Cloudflare Vite plugin during implementation.
- Store Supabase URL, publishable key, and server-only service credentials in Cloudflare Worker secrets.
- Use Cloudflare preview/deployment environments for staging.
- Use route-level `headers` for CDN cache behavior on public SEO pages.

Important caveat:
- Cloudflare's React Router support currently does not support SPA mode or prerendering through the Cloudflare Vite plugin.
- This is acceptable for MVP because public pages require SSR, while play/OBS routes can still be client-heavy after SSR/hydration.
- If static prerendering becomes a hard requirement for high-volume SEO pages, revisit hosting or introduce a separate static generation pipeline.

### Cloudflare Runtime Constraints

Because the React Router app will run on Cloudflare Workers, server-side code must be Worker-compatible.

Rules:
- Avoid Node-only APIs and libraries in route loaders/actions unless Worker compatibility is confirmed.
- Prefer Web Platform APIs (`fetch`, `Request`, `Response`, `crypto`, `URL`) over Node-specific modules.
- Treat Supabase as the backend service boundary; do not assume long-lived database connections from the Worker runtime.
- Use Supabase client/API access by default. Revisit direct Postgres connections only if query latency or cost requires it.
- If direct Postgres access becomes necessary, evaluate Cloudflare Hyperdrive as a separate architecture decision.
- Keep result image generation out of the critical SSR request path. Prefer client-side Canvas export for MVP, or a dedicated async/server endpoint if server rendering is required.
- Use SSR plus CDN cache headers for public pages rather than relying on prerendering in MVP.

### Pre-mortem Risk Controls

The architecture assumes these failure modes are likely enough to design against from MVP.

**Live session/chat reliability:**
- Realtime is a transient coordination layer, not the source of truth.
- Active broadcast sessions must have a durable current-match checkpoint for vote context.
- If the streamer's Supabase Realtime connection drops, local matchup play continues; vote counts resume on reconnect via `session_id`.
- Live vote failure must not affect streamer's local matchup progression.

**SEO/share reliability:**
- Public bracket/result metadata must be generated through shared server-side helpers.
- OG image URLs must always have a fallback.
- Moderation state changes must update visibility, `noindex`, ad eligibility, and cache behavior together.
- Slug, canonical URL, title, description, and OG metadata rules must be centralized.

**Worker runtime safety:**
- Server code must use Worker-compatible libraries.
- New server-side packages require a Workers compatibility check.
- Node-only APIs are not allowed in loaders/actions unless isolated behind an explicitly approved runtime boundary.

**Cost/load controls:**
- Anonymous in-progress play state stays local-first.
- Durable vote/result storage stores summaries by default, not every transient event.
- Public aggregate stats should use cached/materialized summaries.
- Supabase image transformations should be used deliberately, not as the default for every image request.

**Moderation consistency:**
- Public visibility must be controlled by a single policy path.
- Moderation transitions must affect page rendering, indexing, ad eligibility, cache, and public API access together.
- Admin/moderation actions must be logged with actor, target, action, reason, and timestamp.

### Architecture Decision Records

#### ADR-001: Use Supabase as the Backend Platform

**Status:** Accepted

**Context:**
Save One Drop One needs relational UGC data, social auth, media storage, realtime broadcast coordination, moderation logs, and low operational burden for a solo AI-assisted MVP.

**Decision:**
Use Supabase for managed Postgres, Auth, Storage, and Realtime.

**Consequences:**
- Positive: One platform covers database, auth, media, and transient realtime needs.
- Positive: PostgreSQL fits Bracket Pack, entries, results, comments, reports, and moderation data.
- Positive: Google and Twitch OAuth can be implemented without a custom auth system.
- Negative: The product becomes dependent on Supabase service boundaries and pricing.
- Negative: Some low-level database/runtime optimizations are less direct than self-hosted Postgres.

#### ADR-002: Use Cloudflare Workers for React Router Deployment

**Status:** Accepted

**Context:**
The app needs SSR for public SEO and result pages, low-cost viral traffic handling, CDN cache behavior, and React Router framework-mode support. The user prefers not to use Vercel.

**Decision:**
Deploy the React Router application to Cloudflare Workers.

**Consequences:**
- Positive: Better cost profile for early MVP and viral public pages.
- Positive: Strong CDN/cache fit for public bracket/category/result pages.
- Positive: Official React Router support exists through Cloudflare tooling.
- Negative: Server code must be Worker-compatible and avoid Node-only assumptions.
- Negative: Some server-side image generation and direct database connection patterns require extra care.
- Negative: Cloudflare React Router support does not make prerendering the default strategy, so MVP uses SSR plus CDN cache.

#### ADR-003: Use React Router Loaders/Actions as the BFF Layer

**Status:** Accepted

**Context:**
The app combines SSR public pages, authenticated UGC creation, server-side metadata, moderation actions, and client-heavy play routes. A separate API service would add complexity before it is needed.

**Decision:**
Use React Router loaders, actions, and resource routes as the application BFF layer.

**Consequences:**
- Positive: SSR data loading and mutations stay close to route boundaries.
- Positive: Public SEO metadata can be generated at the same layer as page data.
- Positive: MVP avoids GraphQL or a separate REST API service.
- Negative: Route modules can become too fat unless domain logic is kept outside routes.
- Negative: Future external API consumers may require a separate public API later.

#### ADR-004: Treat Realtime as Transient Coordination, Not Source of Truth

**Status:** Accepted

**Context:**
Live vote aggregation and chat feed display need low-latency broadcast to the streamer's matchup page, but broadcast reliability cannot depend only on transient websocket messages.

**Decision:**
Use Supabase Realtime Broadcast for transient vote aggregation updates and ephemeral chat messages, while storing durable current-match checkpoints for active broadcast sessions.

**Consequences:**
- Positive: Streamer's matchup page can recover vote context by `session_id` on reconnect.
- Positive: Live vote failure does not affect streamer's local matchup progression.
- Positive: Realtime traffic can stay lightweight (aggregated counts only, raw chat not persisted).
- Negative: Session state needs explicit modeling and checkpoint writes.
- Negative: Developers must distinguish transient votes/messages from durable results.

#### ADR-005: Keep Anonymous Play Local-First

**Status:** Accepted

**Context:**
The PRD requires account-free play and refresh recovery. Persisting every anonymous in-progress match server-side would add cost and complexity.

**Decision:**
Store anonymous in-progress bracket state in localStorage. Persist server-side only when needed for shareable results, aggregate stats, or broadcast sessions.

**Consequences:**
- Positive: Lower backend load and simpler anonymous UX.
- Positive: Refresh recovery works without account creation.
- Positive: Privacy risk is reduced.
- Negative: Cross-device continuation is not supported in MVP.
- Negative: Local storage corruption/clearing can lose in-progress state.

#### ADR-006: Centralize Public Visibility and SEO Metadata Policy

**Status:** Accepted

**Context:**
UGC moderation affects page visibility, search indexing, ad eligibility, OG metadata, and cache behavior. If these rules drift, takedown and ad-safety failures become likely.

**Decision:**
Implement shared visibility and metadata policy modules used by public route loaders, admin actions, and cache/header logic.

**Consequences:**
- Positive: Takedown, `noindex`, ad eligibility, and public rendering stay consistent.
- Positive: SEO metadata rules are reusable across bracket, category, and result pages.
- Positive: Implementation agents have one place to update visibility behavior.
- Negative: More upfront policy modeling is needed.
- Negative: Overly strict central policy could slow iteration unless kept small and explicit.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize official React Router default template or Cloudflare React Router scaffold, preserving framework mode.
2. Apply design token rules and base app shell.
3. Configure Supabase project, environment variables, SQL migrations, and generated DB types.
4. Implement Bracket Pack schema and public SSR pages.
5. Implement pure tournament engine and local play persistence.
6. Implement result persistence, OG metadata, and result image path.
7. Implement Supabase Auth for creator flows.
8. Implement UGC creation and media upload/proxying.
9. Implement comments, reports, moderation, and DMCA logs.
10. Implement Twitch EventSub webhook, live vote aggregation, and Supabase Realtime Broadcast for vote updates and chat feed to streamer matchup page.
11. Add Cloudflare deployment config, cache headers, secrets, and monitoring.

**Cross-Component Dependencies:**
- Auth affects Bracket Pack creation, moderation, admin, and creator dashboards.
- Moderation state affects SEO, caching, ads, public visibility, and result/comment availability.
- Media storage affects public page performance, OBS stability, and result image generation.
- Tournament engine affects play UI, OBS route, result reconstruction, and analytics.
- Realtime sync depends on durable session identifiers and bracket/match state shape.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
12 areas where AI agents could make different choices: database naming, route naming, file organization, domain boundaries, API/action response shape, validation ownership, realtime event names, local state shape, moderation visibility policy, cache headers, error/loading UI, and test placement.

### Rule Strength

Patterns in this section use three levels:

- **MUST:** Required for consistency, security, or architecture correctness.
- **SHOULD:** Default approach. Deviations are allowed when the local context clearly justifies them.
- **MAY:** Optional convention or example.

Implementation agents must treat MUST rules as blocking unless a story explicitly changes the architecture.

### Core MUST Rules

All implementation agents MUST follow these rules:

1. Do not introduce Next.js or a Node-only server runtime.
2. Keep route modules as orchestration boundaries; move domain logic to `domain/`.
3. Keep raw Supabase access inside server-only repository/service modules.
4. Keep domain modules pure: no React, Supabase clients, localStorage, browser APIs, or request/response objects.
5. Use shared schemas for server action validation.
6. Use shared visibility and metadata helpers for public pages.
7. Treat realtime messages as transient; persist durable session checkpoints separately.
8. Keep anonymous in-progress play state local-first with a schema version.
9. Use design tokens from `docs/design/colors_and_type.css`; do not hardcode brand colors.
10. Check Cloudflare Workers compatibility before adding server-side packages.
11. Route high-risk writes through a shared rate-limit helper.
12. Do not expose service-role credentials or admin-only policy details to browser code.

### Memory Anchors for Agents

Use these distinctions when implementing:

- **Domain = rules.** Pure TypeScript business logic. No React, Supabase, request/response, localStorage, or browser APIs.
- **Repository = persistence mapping.** Reads/writes database rows and returns domain-shaped objects.
- **Service = external boundary or orchestration.** Auth, storage, rate limiting, YouTube parsing, and cross-repository workflows.
- **Visibility before metadata.** Public loaders decide whether content can be shown/indexed before generating title, canonical, OG, or cache headers.
- **Realtime announces; checkpoint restores.** Realtime events coordinate active clients, durable checkpoints recover the current broadcast state.
- **Local in progress, server on share.** Anonymous play progress stays local; completed shareable results and aggregate summaries persist server-side.
- **Actions use envelopes; loaders use route data.** Action/fetcher responses use typed `{ ok, ... }`; loaders return route data, redirects, or thrown responses.

If an implementation agent is unsure where code belongs, choose by dependency:

- Needs no external dependency -> `domain/`
- Needs database rows -> `repositories/`
- Needs auth/storage/rate-limit/provider calls -> `services/`
- Needs route params/request/response/meta/headers -> `routes/`
- Needs interactive product UI or hooks -> `features/`
- Is reusable presentational UI -> `components/`

### Naming Patterns

**Database Naming Conventions:**
- Use `snake_case` for all table and column names.
- Use plural table names.
- Primary keys are `id`.
- Foreign keys use `{entity}_id`.
- Timestamp columns use `created_at`, `updated_at`, and domain-specific names like `published_at`, `taken_down_at`.
- Boolean columns use positive names: `is_public`, `is_indexable`, `is_ad_eligible`, `is_curated`.

Examples:
- Good: `bracket_packs`, `bracket_entries`, `play_results`, `moderation_actions`
- Good: `creator_id`, `bracket_pack_id`, `winner_entry_id`
- Avoid: `BracketPack`, `bracketPackId`, `fk_user`, `hidden`

**API and Route Naming Conventions:**
- Public URLs use lowercase kebab-case slugs.
- React Router params use readable names: `:categorySlug`, `:bracketSlug`, `:resultId`, `:sessionId`.
- URL paths use plural nouns for resource collections.
- Action intent names use camelCase strings.

Examples:
- Good: `/brackets/:categorySlug/:bracketSlug`
- Good: `/results/:resultId`
- Good: `/obs/:sessionId`
- Good: `intent=createBracketPack`
- Avoid: `/Bracket/:id`, `/result?id=...`, `intent=create_bracket_pack`

**Code Naming Conventions:**
- React components use `PascalCase`.
- Component files use `PascalCase.tsx`.
- Non-component TypeScript files use `kebab-case.ts`.
- Functions and variables use `camelCase`.
- Types/interfaces use `PascalCase`.
- Schemas use `{Name}Schema`.
- Server-only modules should include `.server.ts` where applicable.
- Client-only modules should include `.client.ts` where applicable.

Examples:
- Good: `BracketCard.tsx`, `MatchupScreen.tsx`
- Good: `tournament-engine.ts`, `visibility-policy.server.ts`
- Good: `BracketPackSchema`, `createBracketPack`
- Avoid: `bracket_card.tsx`, `TournamentEngineComponent.tsx` for pure domain logic

### Boundary Patterns

**Repository and Service Boundaries:**
- Route loaders/actions MUST NOT contain raw Supabase queries except for trivial session/auth reads.
- Database access belongs in server-only repository/service modules.
- Repository modules return domain-shaped camelCase objects, not raw database rows.
- Raw Supabase row types stay at the repository boundary.
- Domain modules MUST NOT import Supabase clients.

Preferred naming:
- `app/repositories/bracket-pack.repository.server.ts`
- `app/repositories/result.repository.server.ts`
- `app/repositories/moderation.repository.server.ts`
- `app/services/auth.server.ts`
- `app/services/storage.server.ts`
- `app/services/rate-limit.server.ts`

**Route Module Boundaries:**
- Route modules orchestrate request parsing, auth checks, validation, repository/service calls, metadata, headers, and UI composition.
- Route modules MUST NOT inline tournament algorithms, visibility policy, media proxy logic, or complex Supabase queries.
- Small glue code is acceptable in routes when it only connects already-defined boundaries.
- Route type imports and file naming must follow the initialized React Router starter output. Examples in this architecture document are illustrative unless verified against the generated route types.

**Feature and Component Boundaries:**
- Use `features/` for product-specific UI flows and client hooks.
- Use `components/` only for shared reusable UI primitives or cross-feature components.
- UI components MUST NOT call Supabase directly.
- Realtime client access MUST be wrapped by feature hooks such as `useBroadcastSession`.
- Result image export logic MUST live in one result export module, not inside individual result components.

**Rate Limit Boundary:**
- High-risk actions MUST call a shared rate-limit helper before performing writes or external API calls.
- High-risk actions include comments, reports, URL parsing, image upload, live vote submission, auth callback abuse points, and moderation mutation endpoints.

### Structure Patterns

**Project Organization:**
Use route modules for routing and data boundaries, but keep reusable domain logic outside route files.

Expected structure, subject to final project structure step:

```text
app/
  routes/
  features/
  components/
  domain/
  repositories/
  services/
  schemas/
  styles/
  utils/
```

Rules:
- `routes/` files may orchestrate loaders/actions/UI composition.
- `domain/` contains pure business logic and should not import React.
- `repositories/` contains persistence mapping.
- `services/` contains external service boundaries: Supabase, storage, auth, realtime, rate limiting, YouTube parsing.
- `schemas/` contains shared validation schemas used by actions and domain services.
- `features/` contains product-specific interactive flows and hooks.
- `components/` contains reusable UI components and should not directly call Supabase.

**Test Placement:**
- Pure domain tests SHOULD be colocated beside domain files: `tournament-engine.test.ts`.
- Route-level integration tests SHOULD live under `tests/routes/`.
- End-to-end tests SHOULD live under `tests/e2e/`.
- Accessibility smoke tests MAY live under `tests/e2e/accessibility.spec.ts`.

### Format Patterns

**Action Response Formats:**
React Router actions used by fetchers/forms SHOULD return consistent typed objects.

Success format:

```ts
type ActionSuccess<T> = {
  ok: true;
  data: T;
};
```

Validation error format:

```ts
type ActionValidationError = {
  ok: false;
  error: {
    type: "validation";
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
};
```

Domain/security error format:

```ts
type ActionError = {
  ok: false;
  error: {
    type: "not_found" | "unauthorized" | "forbidden" | "conflict" | "rate_limited" | "server_error";
    message: string;
    requestId?: string;
  };
};
```

Rules:
- User-correctable errors return typed messages.
- Unexpected errors return generic messages and log structured server context.
- Do not expose admin policy details, service errors, SQL errors, or provider secrets to the browser.
- Loaders return route data, redirects, or thrown responses; do not force every loader into the action envelope shape.

**Data Exchange Formats:**
- Database fields are `snake_case`.
- TypeScript/domain fields are `camelCase`.
- Boundary mapping must happen in repository/service modules, not scattered through UI components.
- JSON dates use ISO 8601 strings.
- Public URLs use slugs, not raw titles.

### Communication Patterns

**Realtime Event System Patterns:**
Realtime events SHOULD use dot-separated lowercase names.

Reserved initial event names:
- `session.match.changed`
- `session.vote.cast`
- `session.vote.summary`
- `session.chat.message`
- `session.streamer.connected`
- `session.snapshot.requested`
- `session.snapshot.sent`

Payload rules:
- Initial realtime payloads SHOULD include `eventId`, `sessionId`, `sentAt`, and `version`.
- Events are transient and MUST NOT be the only source of truth for active broadcast state.
- Durable session checkpoint shape is owned by the tournament/session domain module.
- Clients must tolerate duplicate, delayed, or missed realtime messages.

Example:

```ts
type SessionMatchChangedEvent = {
  version: 1;
  eventId: string;
  sessionId: string;
  sentAt: string;
  match: CurrentMatchSnapshot;
};
```

**State Management Patterns:**
- Loader data is the source for server-rendered public data.
- Fetchers/actions handle mutations.
- Anonymous play progress uses localStorage through one dedicated persistence module.
- LocalStorage keys are namespaced: `sodo:play:{bracketPackId}`.
- Local play state MUST include a schema version for migrations.

Example:

```ts
type LocalPlayState = {
  version: 1;
  bracketPackId: string;
  currentRoundIndex: number;
  currentMatchIndex: number;
  remainingMatches: Match[];
  completedMatches: CompletedMatch[];
  selectedEntryIds: string[];
  updatedAt: string;
};
```

### Process Patterns

**Validation Patterns:**
- Validate at every server action boundary.
- Use shared schemas for form/action payloads.
- Domain functions may assume typed inputs only after validation.
- Client-side validation is for UX only and never replaces server validation.

**Error Handling Patterns:**
- Route-level errors use React Router error boundaries.
- Expected action errors use typed action responses.
- Unexpected server errors are logged with `requestId`.
- User-facing messages should be direct and non-technical.
- Security/moderation errors should be deliberately vague where detail would reveal enforcement rules.

**Loading State Patterns:**
- Route navigation loading uses React Router navigation state.
- Form mutations use fetcher state.
- Component-level loading states are allowed for local client work such as image preview or Canvas export.
- Skeletons are used for page-level loading; buttons use disabled/pending states for mutations.

**Visibility and Moderation Patterns:**
- Public visibility MUST go through one shared policy module.
- Route loaders MUST NOT hand-roll public/private/moderated checks.
- Moderation state changes must update or affect:
  - public rendering
  - `noindex`
  - canonical behavior
  - ad eligibility
  - cache headers or purge behavior
  - public API/resource access

**SEO Metadata Patterns:**
- Title, description, canonical URL, and OG tags are generated through shared metadata helpers.
- Public result pages must always have an OG image fallback.
- Slug generation is centralized.
- Public route metadata should not be assembled ad hoc inside components.

### Enforcement Guidelines

**All AI Agents MUST:**
- Use React Router framework mode; do not introduce Next.js.
- Keep domain logic outside route components.
- Keep Supabase access behind repository/service boundaries.
- Use `docs/design/colors_and_type.css` tokens; do not hardcode brand colors.
- Treat Supabase Realtime as transient coordination, not source of truth.
- Keep anonymous in-progress play local-first.
- Use the shared visibility policy for public content.
- Check Cloudflare Workers compatibility before adding server-side packages.
- Avoid Node-only APIs in loaders/actions unless an explicit runtime boundary is approved.
- Use typed action response formats for actions/fetchers.
- Add tests for pure domain logic when changing tournament, visibility, metadata, or persistence behavior.

**Pattern Enforcement:**
- Pattern violations should be fixed in the same story when they affect touched code.
- New architectural exceptions require updating this architecture document or a follow-up ADR.
- Code review should check route/domain/repository/service boundaries, Workers compatibility, and visibility/SEO consistency.
- Generated stories should reference these patterns when assigning implementation tasks.

### Pattern Examples

**Note on examples:**
Route file names, generated route types, and helper names below are illustrative. Implementation must follow the actual initialized React Router/Cloudflare starter conventions.

**Good Examples:**

```ts
// app/routes/brackets.$categorySlug.$bracketSlug.tsx
export async function loader({ params }: LoaderArgs) {
  const bracket = await getPublicBracketBySlug(params.categorySlug, params.bracketSlug);
  return withPublicHeaders(bracket, bracket.cachePolicy);
}

export function meta({ data }: MetaArgs) {
  return bracketMeta(data.bracket);
}
```

```ts
// app/domain/tournament/tournament-engine.ts
export function createTournamentPlan(entries: BracketEntry[], options: TournamentOptions): TournamentPlan {
  // Pure deterministic tournament logic. No React, no Supabase, no localStorage.
}
```

```ts
// app/domain/visibility/visibility-policy.server.ts
export function getPublicVisibility(content: ModeratedContent): PublicVisibilityDecision {
  // Single policy path for public render/noindex/ad/cache decisions.
}
```

```ts
// app/repositories/bracket-pack.repository.server.ts
export async function getPublicBracketBySlug(categorySlug: string, bracketSlug: string): Promise<BracketPack | null> {
  // Supabase row access and snake_case -> camelCase mapping live here.
}
```

**Anti-Patterns:**

```ts
// Avoid: route file contains tournament algorithm, Supabase calls, metadata strings,
// visibility decisions, and UI rendering all together.
```

```ts
// Avoid: hardcoded design values.
const button = {
  background: "#7c3aed",
};
```

```ts
// Avoid: realtime event treated as durable source of truth.
await channel.send({ type: "winner_selected", winnerId });
```

```ts
// Avoid: public route hand-rolls moderation logic.
if (bracket.status === "hidden") {
  return null;
}
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
saveonedropone/
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── react-router.config.ts
├── wrangler.jsonc
├── worker-configuration.d.ts
├── .env.example
├── .gitignore
├── app/
│   ├── root.tsx
│   ├── routes.ts
│   ├── entry.client.tsx
│   ├── entry.server.tsx
│   ├── routes/
│   │   ├── _index.tsx
│   │   ├── brackets._index.tsx
│   │   ├── brackets.$categorySlug.$bracketSlug.tsx
│   │   ├── categories.$categorySlug.tsx
│   │   ├── play.$bracketSlug.tsx
│   │   ├── results.$resultId.tsx
│   │   ├── create._index.tsx
│   │   ├── create.new.tsx
│   │   ├── auth.callback.tsx
│   │   ├── admin.reports.tsx
│   │   └── admin.brackets.$bracketPackId.tsx
│   ├── features/
│   │   ├── browse/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── bracket-create/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── matchup/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── result/
│   │   │   ├── components/
│   │   │   └── export/
│   │   ├── comments/
│   │   ├── moderation/
│   │   └── auth/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   └── ui/
│   ├── domain/
│   │   ├── bracket/
│   │   │   ├── bracket-pack.ts
│   │   │   └── bracket-pack.test.ts
│   │   ├── tournament/
│   │   │   ├── tournament-engine.ts
│   │   │   ├── tournament-engine.test.ts
│   │   │   ├── local-play-state.ts
│   │   │   └── local-play-state.test.ts
│   │   ├── result/
│   │   │   ├── result-summary.ts
│   │   │   └── result-summary.test.ts
│   │   ├── session/
│   │   │   ├── broadcast-session.ts
│   │   │   └── broadcast-session.test.ts
│   │   └── visibility/
│   │       ├── visibility-policy.server.ts
│   │       └── visibility-policy.test.ts
│   ├── repositories/
│   │   ├── bracket-pack.repository.server.ts
│   │   ├── result.repository.server.ts
│   │   ├── comment.repository.server.ts
│   │   ├── moderation.repository.server.ts
│   │   └── session.repository.server.ts
│   ├── services/
│   │   ├── supabase.server.ts
│   │   ├── auth.server.ts
│   │   ├── storage.server.ts
│   │   ├── realtime.client.ts
│   │   ├── rate-limit.server.ts
│   │   ├── youtube-metadata.server.ts
│   │   ├── analytics.server.ts
│   │   └── request-context.server.ts
│   ├── schemas/
│   │   ├── bracket.schema.ts
│   │   ├── comment.schema.ts
│   │   ├── moderation.schema.ts
│   │   ├── result.schema.ts
│   │   └── vote.schema.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── app.css
│   ├── types/
│   │   └── database.types.ts
│   └── utils/
│       ├── metadata.server.ts
│       ├── route-headers.server.ts
│       ├── slug.ts
│       ├── action-response.server.ts
│       └── invariant.ts
├── public/
│   ├── favicon.ico
│   └── assets/
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   │   └── 0001_initial_schema.sql
│   └── seed.sql
├── tests/
│   ├── routes/
│   ├── e2e/
│   │   ├── browse-play-result.spec.ts
│   │   ├── obs-session.spec.ts
│   │   └── accessibility.spec.ts
│   ├── fixtures/
│   │   ├── bracket-packs.ts
│   │   └── users.ts
│   └── setup/
│       └── test-env.ts
├── docs/
│   └── design/
└── _bmad-output/
    └── planning-artifacts/
        └── architecture.md
```

### Structure Notes

- `app/routes.ts` is required and is the source of truth for configured routes.
- Files shown under `app/routes/` are the target route inventory. Exact filenames may be adjusted to match the initialized React Router/Cloudflare starter, but registration belongs in `app/routes.ts`.
- Generated Supabase types live in `app/types/database.types.ts`.
- Domain model types live with their owning domain modules.
- Supabase migrations include schema, indexes, RLS policies, and required seed data unless the Supabase CLI structure requires separate files.
- `app/styles/tokens.css` is the production token entry and must derive from `docs/design/colors_and_type.css`.
- `features/auth/` contains auth UI; session/OAuth provider logic belongs in `services/auth.server.ts`.
- No server-generated result image route is included in the initial structure. MVP result pages use fallback/static OG assets unless a later story explicitly adds a lightweight route.

### Structure Memory Rules

- A component graduates to `app/components/` only after it is reused by at least two features or is clearly app-wide layout/navigation/UI infrastructure.
- Result export has three layers: result summary rules in `domain/result/`, browser export UI in `features/result/export/`, and persisted media storage in `services/storage.server.ts`.
- Session state shape belongs to `domain/session/`; checkpoint persistence belongs to `repositories/session.repository.server.ts`; realtime transport belongs to `services/realtime.client.ts`; UI subscription hooks belong to the owning feature.
- Public route order: repository fetch -> visibility policy -> metadata helper -> route headers -> render.
- MVP analytics starts as `services/analytics.server.ts`. Split into domain/repository only when event taxonomy or aggregate querying becomes complex.

### Architectural Boundaries

**API Boundaries:**
- React Router loaders/actions/resource routes are the BFF boundary.
- No broad public REST or GraphQL API in MVP.
- Resource routes are allowed for callbacks and lightweight internal endpoints.
- Route modules may parse request data and call services/repositories, but may not inline raw persistence or domain algorithms.

**Component Boundaries:**
- `features/` owns product-specific flows and client hooks.
- `components/` owns reusable presentational UI.
- `domain/` owns pure business rules.
- `repositories/` owns persistence mapping.
- `services/` owns external provider boundaries.
- UI components do not import Supabase clients.

Feature vs component rule:
- `features/matchup/` owns the matchup screen flow, hooks, local state wiring, and route-specific composition.
- Shared `components/` owns app-wide layout, navigation, and UI infrastructure only.

**Service Boundaries:**
- Supabase access is centralized through `services/supabase.server.ts` and repository modules.
- Auth session helpers live in `services/auth.server.ts`.
- Upload/proxy/storage behavior lives in `services/storage.server.ts`.
- Realtime browser client setup lives in `services/realtime.client.ts`, but product flows access it through feature hooks.
- Rate limiting is centralized in `services/rate-limit.server.ts`.

**Data Boundaries:**
- Database rows use `snake_case`.
- Domain objects use `camelCase`.
- Mapping happens in repositories.
- Anonymous in-progress play state stays in localStorage through the tournament/local-play-state module.
- Completed shareable results, moderation state, comments, reports, session checkpoints, and aggregate summaries persist in Supabase.

### Requirements to Structure Mapping

**브라켓 탐색 및 홈 (FR1-FR7):**
- Routes: `app/routes/_index.tsx`, `app/routes/brackets._index.tsx`, `app/routes/categories.$categorySlug.tsx`
- Features: `app/features/browse/`
- Components: `app/components/navigation/`, `app/components/ui/`
- Repositories: `app/repositories/bracket-pack.repository.server.ts`
- Utils: `app/utils/metadata.server.ts`, `app/utils/route-headers.server.ts`

**Bracket Pack 생성 (FR8-FR17):**
- Routes: `app/routes/create._index.tsx`, `app/routes/create.new.tsx`
- Features: `app/features/bracket-create/`
- Schemas: `app/schemas/bracket.schema.ts`
- Services: `app/services/youtube-metadata.server.ts`, `app/services/storage.server.ts`
- Repositories: `app/repositories/bracket-pack.repository.server.ts`

**매치업 / 1v1 게임 루프 (FR18-FR25):**
- Routes: `app/routes/play.$bracketSlug.tsx`
- Features: `app/features/matchup/`
- Domain: `app/domain/tournament/`
- Local persistence: `app/domain/tournament/local-play-state.ts`

**결과 및 공유 (FR26-FR35):**
- Routes: `app/routes/results.$resultId.tsx`
- Features: `app/features/result/`
- Domain: `app/domain/result/`
- Repositories: `app/repositories/result.repository.server.ts`
- Utils: `app/utils/metadata.server.ts`

**소셜 참여 및 댓글 (FR36-FR37):**
- Features: `app/features/comments/`
- Schemas: `app/schemas/comment.schema.ts`, `app/schemas/vote.schema.ts`
- Repositories: `app/repositories/comment.repository.server.ts`, `app/repositories/session.repository.server.ts`
- Services: `app/services/rate-limit.server.ts`

**스트리머 워크플로우 및 Streamer Live Mode (FR40, FR37-FR38):**
- Routes: `app/routes/play.$bracketSlug.tsx` (스트리머는 동일한 매치업 라우트 사용)
- Features: `app/features/matchup/` (StreamerLiveModePanel 포함)
- Domain: `app/domain/session/`
- Repositories: `app/repositories/session.repository.server.ts`
- Services: `app/services/realtime.client.ts`

**UGC 모더레이션 및 DMCA (FR44-FR46):**
- Routes: `app/routes/admin.reports.tsx`, `app/routes/admin.brackets.$bracketPackId.tsx`
- Features: `app/features/moderation/`
- Domain: `app/domain/visibility/`
- Schemas: `app/schemas/moderation.schema.ts`
- Repositories: `app/repositories/moderation.repository.server.ts`

**인증 및 사용자 계정 (FR47-FR49):**
- Routes: `app/routes/auth.callback.tsx`
- Features: `app/features/auth/`
- Services: `app/services/auth.server.ts`, `app/services/supabase.server.ts`

**수익화 / 광고 (FR50-FR52):**
- MVP에서는 광고 슬롯 구조만 결과/공개 페이지 컴포넌트에 준비한다.
- Growth/Vision billing은 deferred; 별도 `billing` 구조를 지금 만들지 않는다.

### Integration Points

**Internal Communication:**
- Routes call schemas, auth helpers, repositories, services, and domain modules.
- Features compose feature-local components, shared components, and client hooks.
- Repositories do DB mapping and return domain-shaped objects.
- Domain modules are pure and independently testable.
- Visibility policy is called before metadata and cache/header generation.

**External Integrations:**
- Supabase Postgres: persistence
- Supabase Auth: Google/Twitch OAuth
- Supabase Storage: uploaded/proxied images
- Supabase Realtime Broadcast: live voting and OBS/session sync
- YouTube metadata: URL parsing and thumbnail/title extraction
- Cloudflare Workers: SSR/BFF runtime
- Cloudflare CDN: public page cache behavior

**Data Flow:**
1. Public visitor requests bracket page.
2. Route loader fetches domain-shaped bracket through repository.
3. Visibility policy decides render/index/ad/cache behavior.
4. Metadata helper generates title/canonical/OG.
5. Route headers helper sets cache/indexing-relevant headers.
6. UI renders via route + feature/components.
7. Player progress is local-first during play.
8. Completed result is persisted server-side for sharing.
9. Public result page renders SSR metadata and fallback OG image.
10. Comments/reports/moderation actions go through validated actions, rate limit helper, repositories, and visibility policy updates.

### File Organization Patterns

**Configuration Files:**
- `vite.config.ts`: React Router + Cloudflare Vite setup
- `react-router.config.ts`: React Router framework config
- `wrangler.jsonc`: Cloudflare Workers deployment config
- `.env.example`: required env var contract
- `supabase/config.toml`: Supabase local/project config

**Source Organization:**
- `routes/`: request and route boundaries
- `features/`: product flows and hooks
- `components/`: app-wide shared UI
- `domain/`: pure rules
- `repositories/`: persistence mapping
- `services/`: provider and infrastructure boundaries
- `schemas/`: validation
- `utils/`: small cross-cutting helpers

**Test Organization:**
- Domain tests colocated with domain files
- Route tests under `tests/routes/`
- E2E tests under `tests/e2e/`
- Fixtures under `tests/fixtures/`

**Asset Organization:**
- Static app assets under `public/assets/`
- Production media uploads in Supabase Storage
- Design reference assets remain under `docs/design/`
- Generated/share images should not be committed unless they are fixtures

### Development Workflow Integration

**Development Server Structure:**
- React Router dev server handles local app development.
- Supabase local project handles database/auth/storage where needed.
- Cloudflare Worker compatibility should be checked before adding server-side dependencies.

**Build Process Structure:**
- React Router builds SSR/client bundles.
- Cloudflare deployment uses Wrangler and Cloudflare-compatible Vite configuration.
- Generated Supabase database types should be refreshed after migrations.

**Deployment Structure:**
- Cloudflare Workers runs the React Router SSR/BFF layer.
- Supabase hosts Postgres/Auth/Storage/Realtime.
- Public cache behavior is controlled by route headers.
- Secrets are stored as Cloudflare Worker secrets, not committed files.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
The major decisions are coherent:
- React Router 7 framework mode provides SSR/BFF routing.
- Cloudflare Workers hosts the React Router SSR layer with CDN cache behavior.
- Supabase provides Postgres, Auth, Storage, and Realtime.
- React Router loaders/actions/resource routes fit the BFF pattern.
- Supabase Realtime Broadcast is correctly scoped as transient coordination, while durable session checkpoints are persisted separately.
- Anonymous play local-first persistence reduces backend load and matches account-free play requirements.
- Visibility policy, metadata helpers, and route headers align with UGC moderation, SEO, and cache requirements.

No critical contradictions were found.

**Pattern Consistency:**
The implementation patterns support the architectural decisions:
- Domain/repository/service boundaries prevent route modules from becoming inconsistent.
- Naming conventions are consistent across database, route, and code patterns.
- Action envelope rules are scoped to actions/fetchers, while loaders return route data.
- Worker compatibility rules match Cloudflare Workers deployment.
- Design token rules align with the existing `docs/design/` system.

**Structure Alignment:**
The project structure supports the chosen architecture:
- `routes.ts` is explicitly required as the configured routes source of truth.
- `domain/`, `repositories/`, `services/`, `features/`, and `components/` map cleanly to the documented boundaries.
- Supabase migrations/types, Cloudflare config, and React Router app structure are represented.
- Requirement categories map to concrete directories and files.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
No epics/stories were loaded, so validation used PRD FR categories. All major feature categories have architectural support.

**Functional Requirements Coverage:**
- FR1-FR7 browse/home: covered by public SSR routes, browse feature, bracket repository, metadata/cache helpers.
- FR8-FR17 Bracket Pack creation: covered by create routes, bracket schema, storage service, YouTube metadata service, repository layer, auth boundary.
- FR18-FR25 match/play/OBS display: covered by tournament domain, local play state, matchup feature, OBS route, session domain.
- FR26-FR35 result/share: covered by result route, result domain, result repository, metadata helpers, fallback OG policy.
- FR36-FR37 comments/live participation: covered by comments feature, schemas, rate limiting, session repository, realtime patterns.
- FR40, FR37-FR38 streamer workflow/live voting: covered by matchup route (Streamer Live Mode panel), session checkpoint model, Twitch EventSub service, realtime client, feature hooks.
- FR44-FR46 moderation/DMCA: covered by moderation routes, visibility policy, moderation repository, action logs.
- FR47-FR49 auth/account: covered by Supabase Auth, auth callback route, auth service.
- FR50-FR52 monetization: MVP ad slot support is structurally allowed; billing/subscription features are deferred by design.

**Non-Functional Requirements Coverage:**
- Performance: addressed through SSR/CDN cache, local-first play, lightweight OBS route, result image off critical SSR path.
- Scalability: addressed through Cloudflare cache, Supabase managed services, local-first transient state, summary persistence.
- Availability: supported by managed Cloudflare/Supabase split; operational monitoring uses PostHog for MVP product/application event visibility.
- Security: covered by Supabase Auth, server-only service role access, RLS, validation, rate limiting, Worker secrets.
- SEO/discoverability: covered by SSR metadata, canonical/OG helpers, visibility policy, route headers, fallback OG images.
- Accessibility: covered through keyboard-first requirements and E2E accessibility test placement.
- Maintainability: covered through strong boundaries, naming rules, MUST rules, ADRs, and structure memory rules.

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical decisions are documented:
- Framework/runtime
- Starter direction
- Data platform
- Auth
- Storage
- Realtime
- Deployment
- API/BFF pattern
- Local/session persistence
- Moderation/visibility/SEO policy
- Product analytics/observability direction through PostHog

**Structure Completeness:**
The project tree is concrete and implementable. It defines root config, app structure, domain modules, repositories, services, schemas, styles, generated types, Supabase files, and tests.

**Pattern Completeness:**
The architecture covers naming, structure, format, communication, process, enforcement, examples, and anti-patterns. The `MUST/SHOULD/MAY` strength model makes the rules enforceable.

### Gap Analysis Results

**Critical Gaps:**
None.

**Important Gaps:**
- Exact test runner packages are not finalized. Architecture defines test placement and expected coverage, but the first setup story should confirm unit and E2E test packages.

**Nice-to-Have Gaps:**
- Exact rate-limit implementation is not selected.
- Cache purge mechanism for moderation events is not detailed.
- Static vs generated OG image strategy is intentionally conservative for MVP and may need later expansion.

### Validation Issues Addressed

- Vercel was removed after user feedback and replaced with Cloudflare Workers.
- Cloudflare React Router scaffold was selected as the first implementation path.
- PostHog was selected as the planned product analytics/observability tool.
- Cloudflare Workers runtime constraints were added.
- Realtime source-of-truth risk was addressed with durable session checkpoints.
- Project structure was simplified to avoid premature folders.
- `app/routes.ts` was made mandatory because configured routes will be used.
- Feature/shared component boundaries were clarified.
- Visibility, metadata, route headers, result export, session state, and analytics memory rules were added.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY WITH MINOR GAPS

**Confidence Level:** high

**Key Strengths:**
- Clear separation between React Router, Cloudflare, and Supabase responsibilities.
- Strong domain/repository/service boundaries for AI-agent consistency.
- Explicit handling of OBS reliability, realtime durability, SEO metadata, moderation visibility, and cache behavior.
- Project structure maps directly to PRD FR categories.
- Worker runtime constraints are documented early, reducing package/runtime surprises.

**Areas for Future Enhancement:**
- Define exact rate-limit implementation.
- Add detailed cache purge strategy for moderation changes.
- Revisit server-generated result/OG image generation after MVP constraints are tested.
- Revisit direct Postgres optimization only if Supabase API/client access becomes a measurable bottleneck.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented.
- Use implementation patterns consistently across all components.
- Respect project structure and boundaries.
- Refer to this document for all architectural questions.
- Treat deviations from MUST rules as architecture changes requiring explicit approval.

**First Implementation Priority:**
Create the initial Cloudflare React Router application scaffold:

```bash
npm create cloudflare@latest -- saveonedropone --framework=react-router
```

Then align the generated project to this architecture:
- configured routes via `app/routes.ts`
- Cloudflare Workers deployment config
- design token entry from `docs/design/colors_and_type.css`
- Supabase environment contract
- PostHog observability/analytics setup
- base folders for `domain/`, `repositories/`, `services/`, `schemas/`, `features/`, and shared `components/`
