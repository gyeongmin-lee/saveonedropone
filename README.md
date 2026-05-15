# Save One Drop One

Save One Drop One is a streamer-first 1v1 tournament app built on React Router 7 framework mode and deployed to Cloudflare Workers.

## Stack

- React Router 7 framework mode with SSR enabled.
- Cloudflare Workers runtime through the official Cloudflare React Router scaffold.
- Supabase for Postgres, Auth, Storage, and Realtime in later stories.
- CSS custom properties in `app/styles/tokens.css` as the production design-token source of truth.
- Storybook for isolated React component review.

Do not introduce Next.js, Vercel-only server assumptions, Node-only route code, GraphQL, or a broad public REST API for MVP stories.

## Design Source

Future UI work must inspect `docs/design/README.md` and the relevant design prototypes before implementing screens. The current main app shell references:

- `docs/design/Save One Drop One.html`
- `docs/design/theme-streamer.jsx`
- `docs/design/data.jsx`

Tailwind is present as a utility layer from the scaffold, but brand colors, typography, radius, and layout constants must come from `app/styles/tokens.css`.

## Local Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run storybook
npm run build-storybook
```

`npm run dev` starts the React Router development server. `npm run deploy` builds and deploys with Wrangler.

## Environment

Copy `.env.example` for local placeholders. Server-only credentials such as `SUPABASE_SERVICE_ROLE_KEY` must be configured as Worker secrets and never exposed to browser bundles.
