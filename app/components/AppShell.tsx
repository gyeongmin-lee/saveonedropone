type AppShellProps = {
  runtime: string;
};

export function AppShell({ runtime }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] text-[var(--color-fg)]">
      <header className="sticky top-0 z-10 flex h-[var(--layout-top-nav)] items-center justify-between border-b border-[var(--color-border-strong)] bg-[var(--color-bg-nav)] px-6">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-accent),var(--color-live))] text-sm font-extrabold text-[var(--color-bg-nav)]">
            S
          </div>
          <div>
            <div className="display text-base leading-tight">Save One Drop One</div>
            <div className="mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-light)]">
              React Router 7 / Cloudflare Workers
            </div>
          </div>
        </div>
        <div className="mono rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] px-3 py-1 text-[11px] font-semibold text-[var(--color-fg-muted)]">
          {runtime}
        </div>
      </header>

      <main className="grid grid-cols-[var(--layout-sidebar)_minmax(0,1fr)]">
        <aside className="min-h-[calc(100vh-var(--layout-top-nav))] border-r border-[var(--color-border-strong)] bg-[var(--color-bg-nav)] p-4">
          <nav className="grid gap-2">
            {["Browse", "Categories", "Live", "Results"].map((item, index) => (
              <span
                className={[
                  "rounded-[var(--radius-button)] px-3 py-2 text-sm font-semibold",
                  index === 0
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-fg-muted)]",
                ].join(" ")}
                key={item}
              >
                {item}
              </span>
            ))}
          </nav>
        </aside>

        <section className="p-[var(--space-page-y)_var(--space-page-x)]">
          <div className="grid gap-5">
            <div className="ring rounded-[var(--radius-card)] bg-[var(--color-bg-card)] p-6">
              <p className="mono mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-live)]">
                Scaffold ready
              </p>
              <h1 className="display m-0 text-4xl leading-tight">
                Foundation for streamer-first brackets.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--color-fg-muted)]">
                This initial shell keeps the official Cloudflare React Router
                scaffold intact while replacing starter branding with the
                production token system derived from the design prototypes.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                ["SSR", "Framework-mode routes stay enabled."],
                ["Tokens", "Production CSS variables drive the brand."],
                ["Boundaries", "App folders are ready for later stories."],
              ].map(([label, text]) => (
                <div className="ring rounded-[var(--radius-card)] bg-[var(--color-bg-card)] p-4" key={label}>
                  <div className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent-light)]">
                    {label}
                  </div>
                  <p className="mb-0 mt-2 text-sm text-[var(--color-fg-muted)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
