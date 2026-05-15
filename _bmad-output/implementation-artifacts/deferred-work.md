# Deferred Work Log

## Deferred from: code review of 1-1-initial-cloudflare-react-router-scaffold (2026-05-14)

- **Empty Env interface** — `worker-configuration.d.ts` has empty `Env`; all `env.*` accesses are untyped until bindings are declared in `wrangler.jsonc` and `wrangler types` is re-run. Blocked on future stories adding actual bindings.
- **SSR shell error suppression** — `onError` in `renderToReadableStream` silently swallows shell-phase errors (before `shellRendered = true`). Standard React streaming SSR pattern from the scaffold; no stack trace in Cloudflare logs on initial render failure. Consider adding a fallback error reporter in a future story that adds observability.
- **min-width: 1280px on html/body** — desktop-only constraint hardcoded globally. Intentional for the streamer platform but will need a responsive strategy if mobile support is added.
- **Nav items as `<span>`** — AppShell navigation items are non-interactive spans. Must be replaced with `<Link>` from react-router when navigation routes are implemented in later stories.
- **@theme partial token subset** — Only 5 of the project's CSS variables are registered in the Tailwind `@theme` block; the rest are accessed via `bg-[var(--color-bg-nav)]` arbitrary syntax. No functional gap now, but as the token set grows, consider completing the `@theme` registration for consistency.
