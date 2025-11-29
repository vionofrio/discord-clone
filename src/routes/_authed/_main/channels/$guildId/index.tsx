import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/_main/channels/$guildId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authed/_main/channels/$guildId/"!</div>;
}
