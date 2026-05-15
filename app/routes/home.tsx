import type { Route } from "./+types/home";
import { AppShell } from "../components/AppShell";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Save One Drop One" },
    {
      name: "description",
      content:
        "Streamer-first 1v1 tournament platform scaffolded on React Router and Cloudflare Workers.",
    },
  ];
}

export function loader({ context: _context }: Route.LoaderArgs) {
  return { runtime: "cloudflare-workers" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <AppShell runtime={loaderData.runtime} />;
}
