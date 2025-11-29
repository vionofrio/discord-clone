import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/_main/channels/@me")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
