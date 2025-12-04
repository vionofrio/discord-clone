import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/_main/discover/servers/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authed/_main/discover/servers/"!</div>;
}
