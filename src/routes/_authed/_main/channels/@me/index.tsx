import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { authQueries } from "@/features/auth/data/queries";

export const Route = createFileRoute("/_authed/_main/channels/@me/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useQuery(authQueries.session());

  return (
    <div>
      <h1>Welcome, {session?.user.displayUsername}!</h1>
    </div>
  );
}
