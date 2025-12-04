import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/_main/discover/")({
  beforeLoad: async () => {
    throw redirect({
      to: "/discover/servers",
      replace: true,
    });
  },
});
