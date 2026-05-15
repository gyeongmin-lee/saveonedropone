# Story 1.1: Initial Cloudflare React Router Scaffold

Status: done

## Story

As a developer,  
I want the application initialized from the approved Cloudflare React Router scaffold,  
so that all later product stories build on the correct framework, runtime, and project boundaries.

## Acceptance Criteria

1. Given the architecture specifies React Router 7 framework mode on Cloudflare Workers, when the initial project scaffold is created, then it uses the approved Cloudflare React Router scaffold path or an equivalent official React Router framework-mode setup adapted to the repository root, and it does not introduce Next.js, Vercel-only assumptions, a Node-only server runtime, GraphQL, or a broad public REST API.
2. Given the app uses configured routes, when the scaffold is aligned to the architecture, then `app/routes.ts` is present as the route registration source of truth, and route file names and generated route types follow the initialized React Router/Cloudflare starter conventions.
3. Given the project will deploy to Cloudflare Workers, when base configuration is added, then Cloudflare-compatible config such as Wrangler/Vite/React Router configuration is present as required by the selected scaffold, and server-side code added in this story uses Workers-compatible APIs.
4. Given later stories need shared architecture boundaries, when the initial source tree is prepared, then base folders exist for `domain/`, `repositories/`, `services/`, `schemas/`, `features/`, `components/`, `styles/`, `utils/`, and `types/` as appropriate for the scaffold, and no product-specific database tables are created in this scaffold story.
5. Given the UI must use the existing design system, when base styles are wired, then the app has a production token entry derived from the current `docs/design` HTML/JSX references, and scaffold/default styling does not become a competing brand token source.
6. Given later stories need Supabase and other service configuration, when environment configuration is documented, then `.env.example` or equivalent documents the expected Supabase/Cloudflare/PostHog variables without real secrets, and production secrets are not committed.
7. Given implementation agents start future stories, when they inspect the scaffold, then the README or project notes identify React Router 7 framework mode, Cloudflare Workers, Supabase, and design-token constraints, and dependency installation/build commands are documented enough for local verification.
8. Given later stories need consistent UI implementation and isolated review, when the scaffold is prepared, then Storybook or an equivalent isolated component environment is configured for React components, shares the production token CSS, and does not introduce a competing visual theme or broad pre-styled component library.

## Tasks / Subtasks

- [x] Create the React Router 7 + Cloudflare Workers scaffold at the repository root. (AC: 1, 3)
  - [x] Prefer the current Cloudflare C3 command: `npm create cloudflare@latest -- saveonedropone --framework=react-router`; adapt output into the existing repo root rather than nesting an app directory.
  - [x] Keep framework mode SSR enabled; do not switch to SPA mode or prerendering for this scaffold.
  - [x] Remove or overwrite starter demo content only as needed to establish the Save One Drop One shell.
- [x] Align route registration and generated route conventions. (AC: 2)
  - [x] Ensure `app/routes.ts` exists and is the single source of truth for configured routes.
  - [x] Keep starter-generated route type conventions intact; do not invent a separate routing abstraction.
  - [x] Include only the minimal initial route needed by the scaffold, typically `/`, unless the generated starter requires supporting files.
- [x] Add Cloudflare-compatible runtime and build configuration. (AC: 3)
  - [x] Keep `vite.config.ts`, `react-router.config.ts`, `wrangler.jsonc`, and Worker entry files aligned with the selected Cloudflare scaffold.
  - [x] Ensure server-side code uses Web/Workers-compatible APIs; do not use Node-only filesystem, process, TCP, or long-lived connection assumptions in route loaders/actions.
  - [x] Document local dev, build, typecheck, and deploy commands in README or project notes.
- [x] Create architecture boundary folders without implementing product data models. (AC: 4)
  - [x] Add base folders under `app/`: `domain/`, `repositories/`, `services/`, `schemas/`, `features/`, `components/`, `styles/`, `utils/`, and `types/`.
  - [x] Add placeholder files only where needed to keep empty directories tracked; placeholders must not define product-specific database tables or future schemas.
  - [x] Keep `domain/` pure TypeScript; no React, Supabase, request/response, localStorage, or browser APIs.
- [x] Wire production base styles and design tokens. (AC: 5)
  - [x] Create `app/styles/tokens.css` and `app/styles/app.css` or scaffold-equivalent style entries.
  - [x] Derive initial tokens from `docs/design/README.md`, `docs/design/Save One Drop One.html`, `docs/design/theme-streamer.jsx`, and `docs/design/data.jsx`.
  - [x] If Tailwind is included by the scaffold or added for utility styling, configure it to reference CSS custom-property tokens and document that `tokens.css` remains the source of truth.
  - [x] Prevent starter Tailwind/default theme from becoming the brand source of truth.
  - [x] Do not introduce a broad pre-styled component library in this story.
  - [x] Add Lucide only if the scaffold shell needs production icons; otherwise document Lucide as the preferred icon set for later UI stories.
- [x] Configure isolated component development. (AC: 8)
  - [x] Add Storybook for React/Vite, or document a justified equivalent if the selected scaffold requires adjustment.
  - [x] Ensure Storybook loads the same `app/styles/tokens.css` and base app styles used by production routes.
  - [x] Add at least one minimal smoke story for the app shell or a base UI component to verify styling loads.
  - [x] Add README commands for running Storybook and, if available, building Storybook.
  - [x] Do not add product-specific UI components beyond what is needed to validate the setup.
- [x] Document environment configuration without secrets. (AC: 6)
  - [x] Add `.env.example` with expected public and server-only variables for Supabase, Cloudflare, and PostHog.
  - [x] Include server-only credential names without real values; do not commit Supabase service role keys, Cloudflare tokens, PostHog project secrets, or production credentials.
  - [x] Keep Supabase access boundaries ready for future `app/services/supabase.server.ts`, but do not implement product queries in this story.
- [x] Add developer-facing project notes. (AC: 7)
  - [x] Update `README.md` to state React Router 7 framework mode, Cloudflare Workers deployment, Supabase platform choice, and design-token constraints.
  - [x] Include dependency installation and verification commands.
  - [x] Explicitly state that future UI work must inspect `docs/design/README.md` and relevant design prototypes before implementing screens.
- [x] Verify scaffold quality. (AC: 1-8)
  - [x] Run install/build/typecheck commands supported by the generated scaffold.
  - [x] If a test command exists, run it; otherwise document that no test suite exists yet.
  - [x] Inspect `git diff` for accidental secrets, nested scaffold directories, unrelated generated files, and product schema creep.

### Review Findings

- [x] [Review][Patch] Commit generated Worker env type file [worker-configuration.d.ts:1]
- [x] [Review][Patch] Production installs can fail from `postinstall` running Wrangler [package.json:10]
- [x] [Review][Patch] Root package does not declare the Node version required by Vite [package.json:1]
- [x] [Review][Dismiss] Tailwind theme tokens duplicate production token values instead of consuming CSS custom properties [app/styles/tokens.css:36] — dismissed, intentional Tailwind v4 theme mapping
- [x] [Review][Patch] README does not document that no test suite exists yet [README.md:25]
- [x] [Review][Patch] Storybook Vite plugin filtering keeps nested app runtime plugins [./.storybook/main.ts:6]

## Dev Notes

### Story Scope

This is a foundation story. It should create a working app scaffold and durable project boundaries, not implement browse data, Supabase migrations, tournament logic, auth, comments, moderation, live voting, or result sharing. Story 1.2 owns the first public Bracket Pack data foundation. [Source: `_bmad-output/planning-artifacts/epics.md#Story 1.1`; `_bmad-output/planning-artifacts/epics.md#Story 1.2`]

### Architecture Requirements

- Use React Router 7 framework mode on Cloudflare Workers. Next.js, Vercel-only assumptions, Node-only server runtime, broad REST APIs, and GraphQL are out of scope for MVP. [Source: `_bmad-output/planning-artifacts/architecture.md#Agent Implementation Brief`]
- Treat React Router loaders/actions/resource routes as the BFF boundary. Route modules should handle request parsing, auth checks, validation, repository/service orchestration, metadata, headers, and UI composition only. [Source: `_bmad-output/planning-artifacts/architecture.md#ADR-003`]
- Public browse/result/category pages later require SSR metadata and cache headers; do not choose a scaffold mode that blocks SSR. [Source: `_bmad-output/planning-artifacts/prd.md#SEO Strategy`; `_bmad-output/planning-artifacts/architecture.md#Non-Negotiable Decisions`]
- Cloudflare Workers is the deployment runtime. Server code must use Worker-compatible APIs and should not assume long-lived database connections. Supabase remains the system of record. [Source: `_bmad-output/planning-artifacts/architecture.md#Cloudflare Runtime Constraints`]
- UI infrastructure must follow ADR-007: Storybook is the isolated component environment, `app/styles/tokens.css` is the UI token source of truth, Tailwind is only a token-consuming utility layer, Lucide is the preferred icon set, and Radix primitives are introduced primitive-by-primitive when concrete accessibility-sensitive interactions need them. [Source: `_bmad-output/planning-artifacts/architecture.md#ADR-007`]
- Do not add server-side packages unless Cloudflare Workers compatibility is checked. [Source: `_bmad-output/planning-artifacts/architecture.md#MVP Scope Guardrails`]

### Current Repository State

- The repository currently contains planning/design artifacts and no initialized React Router app files at the root. Existing files include `_bmad-output/`, `_bmad/`, `docs/design/`, `README.md`, `AGENT.md`, `CLAUDE.md`, and skill metadata.
- There are existing uncommitted changes before this story creation: `_bmad-output/planning-artifacts/sprint-change-proposal-2026-05-13-design-artifact-alignment.md` is modified, and `_bmad-output/implementation-artifacts/` is untracked. Do not revert unrelated user changes.
- Because the app is not scaffolded yet, there are no UPDATE source files to preserve in `app/`. The implementation must still preserve planning/design docs and avoid overwriting existing repo metadata.

### File Structure Requirements

Target structure from architecture, adjusted only as required by the actual generated Cloudflare React Router scaffold:

```text
app/
  root.tsx
  routes.ts
  entry.client.tsx
  entry.server.tsx
  routes/
  features/
  components/
  domain/
  repositories/
  services/
  schemas/
  styles/
  types/
  utils/
workers/
  app.ts
public/
supabase/
tests/
```

Root-level config expected by the architecture includes `package.json`, `tsconfig.json`, `vite.config.ts`, `react-router.config.ts`, `wrangler.jsonc`, `worker-configuration.d.ts`, `.env.example`, and `.gitignore`, subject to exact scaffold output. [Source: `_bmad-output/planning-artifacts/architecture.md#Complete Project Directory Structure`]

Important placement rules:

- `app/routes.ts` is required and owns route registration. [Source: `_bmad-output/planning-artifacts/architecture.md#Structure Notes`]
- Generated Supabase database types eventually belong at `app/types/database.types.ts`; this story may create the path but should not generate real DB types before migrations exist. [Source: `_bmad-output/planning-artifacts/architecture.md#Structure Notes`]
- Raw Supabase access must stay inside server-only repository/service modules in later stories. Do not put Supabase queries in route modules while scaffolding. [Source: `_bmad-output/planning-artifacts/architecture.md#Memory Anchors for Agents`]
- A reusable UI component belongs in `app/components/` only when it is app-wide or reused by at least two features. Feature-specific UI should stay under `app/features/<feature>/`. [Source: `_bmad-output/planning-artifacts/architecture.md#Structure Memory Rules`]

### Design Token Requirements

Production UI must derive from `docs/design/`, not starter defaults. The initial token file should capture stable CSS custom properties for:

- Page background `#0e0e12`, top nav `#0a0a0e`, card background `#18181f`.
- Primary accent `#7c3aed`; lighter purple `#b794f4`; live/positive green `#38e07b`.
- Hairline/border color from `rgba(255,255,255,0.06)` or `#1f1f28` as observed in prototypes.
- Inter as default font and JetBrains Mono for numeric/label text.
- Display text weight `800`; prototype display letter spacing is `-0.02em`, but global coding instructions require avoiding negative letter spacing for new production UI. Prefer documenting this conflict in tokens or using neutral letter spacing unless product owner explicitly approves the prototype value.
- Layout constants: `56px` top nav, `220px` sidebar, `320px` matchup chat rail, `10px` standard card radius, `12px` hero tile radius. [Source: `docs/design/README.md#Visual language`; `_bmad-output/project-context.md#Design System`]

Prototype caveats:

- `docs/design` HTML files load React/Babel directly and use inline styles; do not copy the prototype runtime pattern into production.
- `docs/design/tweaks-panel.jsx` is prototype-only and must not ship in production.
- Icons in prototypes are Unicode placeholders; production should use a real icon set such as Lucide when adding interactive controls in later UI stories. [Source: `docs/design/README.md#For Claude Code`]

### UI Foundation Decision

Story 1.1 should set up UI infrastructure, not a finished component system.

- Storybook is the selected isolated component environment because it allows future UI stories to validate components outside route/page composition while sharing the same Vite/React styling pipeline.
- `app/styles/tokens.css` is the production token source of truth and must also be loaded in Storybook.
- Tailwind may be used as a utility layer only if configured around the project CSS variables. Tailwind defaults must not become the brand palette, spacing system, radius system, or typography source.
- Avoid broad pre-styled component libraries in this scaffold story. The design language comes from `docs/design`, and introducing an opinionated UI kit now creates unnecessary visual drift.
- Prefer Lucide for icons when icons are needed.
- Radix UI is the preferred primitive layer for accessibility-sensitive interactions such as Dialog, Popover, Tooltip, DropdownMenu, Tabs, Switch, Checkbox, RadioGroup, and Select.
- Install Radix packages primitive-by-primitive when a story needs the interaction; do not install broad Radix/shadcn-style component sets during scaffold setup.
- Radix primitives must be wrapped in app-owned components under `app/components/` or feature-owned components under `app/features/<feature>/` before reuse, so styling remains controlled by `app/styles/tokens.css`.

### Environment Contract

`.env.example` should document placeholders for at least:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY` or the current Supabase server package equivalent for publishable keys
- `SUPABASE_SERVICE_ROLE_KEY` or server-only secret naming chosen by the app
- `POSTHOG_KEY`
- `POSTHOG_HOST`
- Cloudflare/Wrangler environment notes for Worker secrets, without real tokens

Treat service role/admin credentials as server-only. Do not expose them to browser bundles. [Source: `_bmad-output/project-context.md#Auth`; `_bmad-output/planning-artifacts/prd.md#NFR-M2`]

### Cloudflare Deployment Timing

Story 1.1 should prepare Cloudflare deployment configuration and may run an optional smoke deploy to verify the React Router Worker runtime. It should not be treated as the product staging launch point.

Actual Supabase-backed Cloudflare staging deployment belongs during or after Story 1.2, once the public data foundation and required environment/secrets are available. Product-visible staging review should begin after Story 1.3, when the SSR Home Browse page exists.

### Latest Official Technical Notes

- Cloudflare's current official React Router Workers guide recommends creating a full-stack React Router v7 app with `npm create cloudflare@latest -- my-react-router-app --framework=react-router`. The generated project includes `app/routes.ts`, `workers/app.ts`, `react-router.config.ts`, `vite.config.ts`, and `wrangler.jsonc`. Source: Cloudflare Workers React Router guide, crawled May 2026: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
- Cloudflare's guide says the React Router config uses SSR and enables `future.v8_viteEnvironmentApi` for Cloudflare Vite plugin compatibility. It also notes SPA mode and prerendering are not currently supported with the Cloudflare Vite plugin. Source: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
- Cloudflare exposes configured bindings to loaders/actions through `context.cloudflare.env`. Future env helpers should use that Worker context rather than Node `process.env` assumptions on the server. Source: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
- Supabase's current server package docs describe standard environment variable patterns including `SUPABASE_URL`, publishable keys, and secret keys, while local CLI setups may accept single-key fallbacks. Validate the exact package/API during implementation before hard-coding names. Source: https://supabase.com/docs/guides/functions/auth

### Anti-Reinvention Guardrails

- Do not hand-roll a Vite/Worker integration if the Cloudflare React Router scaffold already provides one.
- Do not create product routes, database migrations, Supabase repositories, or tournament engine placeholders with fake behavior to appear complete.
- Do not fork visual tokens from Tailwind defaults or a generated starter theme.
- Do not hand-roll accessibility-sensitive primitives such as dialogs, menus, popovers, tabs, or tooltips when a proven primitive such as Radix is appropriate.
- Do not add an OBS-specific route, web vote link, or YouTube chat integration while scaffolding; those are either later stories or out of MVP scope.
- Do not introduce a custom API layer parallel to React Router resource routes/actions.

### Testing Requirements

Minimum verification for this story:

- Dependency install succeeds with the chosen package manager.
- Build succeeds.
- Typecheck succeeds if the scaffold provides a typecheck command; otherwise add/document one if consistent with the scaffold.
- Local dev command starts a Cloudflare-compatible React Router dev server.
- Storybook starts successfully or its config is validated with the available Storybook command.
- If a `build-storybook` command is added, it succeeds.
- A smoke story confirms production token CSS is visible in isolated component rendering.
- `wrangler` deploy configuration is syntactically valid enough for later deployment work.
- Manual inspection confirms no secrets are committed and no product-specific database tables/migrations were introduced.

Future test architecture will include domain unit tests, route integration tests, e2e browse/play/result smoke, OBS/session smoke, and accessibility checks, but this scaffold story should only add test infrastructure that the starter naturally provides or that is needed for basic verification. [Source: `_bmad-output/planning-artifacts/architecture.md#Testing Strategy`; `_bmad-output/planning-artifacts/epics.md#Additional Requirements`]

### Previous Story Intelligence

No previous story exists in Epic 1. This story establishes the first implementation patterns.

### Recent Git Intelligence

Recent commits are documentation and planning oriented:

- `de5fc83 docs: run implementation readyness report`
- `c968282 docs(bmad): Align planning artifacts with design prototypes`
- `e84f40a docs(design): Remove obsolete design kit files`
- `652a432 docs(design): Update Home Browse prototypes`
- `6a4b580 docs(planning): Align Home Browse MVP scope`

Implementation should respect the latest planning direction: Home/Browse MVP is based on current `docs/design` prototypes, and obsolete design kit assumptions should not be revived.

### References

- `_bmad-output/planning-artifacts/epics.md#Story 1.1`
- `_bmad-output/planning-artifacts/architecture.md#Agent Implementation Brief`
- `_bmad-output/planning-artifacts/architecture.md#ADR-007`
- `_bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries`
- `_bmad-output/planning-artifacts/prd.md#Functional Requirements`
- `_bmad-output/planning-artifacts/ux-design-specification.md#Home / Browse`
- `_bmad-output/project-context.md`
- `docs/design/README.md`
- `docs/design/Save One Drop One.html`
- `docs/design/theme-streamer.jsx`
- Cloudflare Workers React Router guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/
- Supabase server auth/environment docs: https://supabase.com/docs/guides/functions/auth

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- 2026-05-13: Ran `npm create cloudflare@latest -- /tmp/saveonedropone-scaffold --framework=react-router --no-deploy` and adapted the generated Cloudflare React Router scaffold into the repository root.
- 2026-05-13: Ran `npm install` after adding Storybook dependencies.
- 2026-05-13: Ran `npm run typecheck`; first sandboxed run failed because Wrangler could not write logs/open local runtime resources, reran with approved permissions and passed.
- 2026-05-13: Ran `npm run build`; first sandboxed run produced Wrangler log-write errors while still building, reran with approved permissions and passed cleanly.
- 2026-05-13: Ran `npm run build-storybook`; initial run failed because Storybook loaded the app React Router Vite plugin, then added Storybook-specific Vite config and passed.
- 2026-05-13: Inspected git status/diff and scanned for obvious committed secrets; only placeholder env variable names and package integrity hashes were found.
- 2026-05-13: Ran `npm run dev -- --host 0.0.0.0`; sandboxed run failed on network interface access, reran with approved permissions and started at `http://localhost:5173/`.
- 2026-05-14: Replaced Tailwind `@theme` self-references in `app/styles/tokens.css` with concrete token values.
- 2026-05-14: Added Cloudflare static assets directory binding to `wrangler.jsonc` for `./build/client`.
- 2026-05-14: Clarified `.env.example` guidance so `SUPABASE_SERVICE_ROLE_KEY` is configured with `wrangler secret put` and never placed in `wrangler.jsonc` `vars`.
- 2026-05-14: Ran `npm run typecheck`, `npm run build`, and `npm run build-storybook`; all passed.

### Completion Notes List

- Story context engine analysis completed on 2026-05-13.
- Comprehensive developer guide created from epics, PRD, architecture, UX specification, project context, design references, git history, and current official Cloudflare/Supabase docs.
- Official Cloudflare React Router scaffold is adapted at repo root with SSR enabled, `app/routes.ts`, Worker entry, Vite/React Router/Wrangler config, and generated route type conventions intact.
- Starter demo content was replaced with a minimal Save One Drop One app shell that uses Worker-compatible loader context and avoids product data models, Supabase queries, custom APIs, or database migrations.
- Architecture boundary directories are present under `app/` with `.gitkeep` placeholders only; `supabase/` and `tests/` placeholders are present for later stories.
- Production token CSS is derived from current `docs/design` references, loaded by the app and Storybook, and documented as the UI token source of truth.
- Storybook React/Vite is configured with a smoke story for `AppShell`; Storybook uses its own Vite config so route/runtime plugins do not interfere with isolated component builds.
- `.env.example` and `README.md` document Supabase, Cloudflare, PostHog, install, dev, build, typecheck, deploy, and Storybook expectations without real secrets.
- No test script exists yet in the scaffold; verification used install, typecheck, production build, Storybook build, and manual diff/secret inspection.
- Local React Router dev server starts successfully in the approved environment at `http://localhost:5173/`.
- Resolved review finding [Patch]: Tailwind `@theme` no longer self-references production CSS variables and now exposes concrete values matching `tokens.css`.
- Resolved review finding [Patch]: `wrangler.jsonc` now binds Cloudflare static assets from `./build/client`, matching the React Router production build output.
- Resolved review finding [Patch]: `.env.example` now explicitly keeps `SUPABASE_SERVICE_ROLE_KEY` out of `wrangler.jsonc` `vars` and browser-exposed env.

### File List

- `.env.example`
- `.gitignore`
- `.storybook/main.ts`
- `.storybook/preview.ts`
- `.storybook/vite.config.ts`
- `README.md`
- `_bmad-output/implementation-artifacts/1-1-initial-cloudflare-react-router-scaffold.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `app/app.css`
- `app/components/AppShell.stories.tsx`
- `app/components/AppShell.tsx`
- `app/domain/.gitkeep`
- `app/entry.server.tsx`
- `app/features/.gitkeep`
- `app/repositories/.gitkeep`
- `app/root.tsx`
- `app/routes.ts`
- `app/routes/home.tsx`
- `app/schemas/.gitkeep`
- `app/services/.gitkeep`
- `app/styles/app.css`
- `app/styles/tokens.css`
- `app/types/.gitkeep`
- `app/utils/.gitkeep`
- `package-lock.json`
- `package.json`
- `public/favicon.ico`
- `react-router.config.ts`
- `supabase/.gitkeep`
- `tests/.gitkeep`
- `tsconfig.cloudflare.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `workers/app.ts`
- `wrangler.jsonc`

### Review Findings

Code review run: 2026-05-14 | Reviewers: Blind Hunter + Edge Case Hunter + Acceptance Auditor

- [x] [Review][Patch] @theme circular CSS self-references — 5 of 7 @theme entries self-referential (`--font-sans: var(--font-sans)`, `--font-mono: var(--font-mono)`, `--color-accent: var(--color-accent)`, `--color-live: var(--color-live)`, `--radius-card: var(--radius-card)`) cause CSS cycle invalidity; Tailwind font/color utilities will silently fall back to initial values [app/styles/tokens.css:37-43]
- [x] [Review][Patch] wrangler.jsonc missing assets binding — no `"assets": { "directory": "./build/client" }` block; production deploy will 404 all static JS/CSS bundle requests [wrangler.jsonc]
- [x] [Review][Patch] .env.example SERVICE_ROLE_KEY comment ambiguity — comment says "Configure as a Cloudflare Worker secret" but placement alongside public vars could lead developers to put it in `wrangler.jsonc vars`, which would expose it in the bundle; add explicit note against `vars` [.env.example:5-6]
- [x] [Review][Defer] Empty Env interface — `worker-configuration.d.ts` has `interface Env extends Cloudflare.Env {}` with no bindings; env access is untyped until bindings are wired in future stories [worker-configuration.d.ts] — deferred, pre-existing (expected scaffold baseline; future stories add bindings)
- [x] [Review][Defer] SSR error suppression before shellRendered=true — shell rendering errors are silently swallowed (not logged) when they occur before the flag is set [app/entry.server.tsx:19-25] — deferred, pre-existing (standard scaffold boilerplate from React Router)
- [x] [Review][Defer] min-width: 1280px on html/body — enforces desktop-only minimum width globally; no mobile fallback [app/styles/app.css:6-8] — deferred, pre-existing (intentional desktop-first design for streamer platform)
- [x] [Review][Defer] Nav items rendered as `<span>` — Browse/Categories/Live/Results navigation uses non-interactive spans; inaccessible for keyboard navigation [app/components/AppShell.tsx:29-39] — deferred, pre-existing (scaffold shell only; real navigation is future story work)
- [x] [Review][Defer] @theme exposes only partial token subset — bg-nav, accent-light, border, border-strong are not in @theme; AppShell uses arbitrary var() syntax for these — deferred, pre-existing (working approach; no functional gap)

### Change Log

- 2026-05-13: Implemented Story 1.1 initial Cloudflare React Router scaffold and moved story to review.
- 2026-05-14: Code review complete. 3 patch items identified; status set to in-progress.
- 2026-05-14: Addressed code review findings - 3 patch items resolved; status set to review.
