import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/_main/channels/@me/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authed/_main/channels/me/"!</div>;
}
