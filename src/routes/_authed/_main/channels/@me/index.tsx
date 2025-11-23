import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { sessionQueries } from "@/features/session/data/queries";

export const Route = createFileRoute("/_authed/_main/channels/@me/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSuspenseQuery(sessionQueries.get());

  return (
    <div>
      <h1>Welcome, {session?.user.displayUsername}!</h1>
    </div>
  );
}
