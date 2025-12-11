import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getDirectMessageQuery } from "@/data/dm/queries";

export const Route = createFileRoute("/_authed/_main/channels/@me/$dmId/")({
  beforeLoad: async ({ context, params: { dmId } }) => {
    try {
      await context.queryClient.ensureQueryData(getDirectMessageQuery(dmId));
    } catch {
      throw redirect({
        to: "/channels/@me",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { dmId } = Route.useParams();
  const { data: dm } = useSuspenseQuery({
    ...getDirectMessageQuery(dmId),
    select: (dm) => ({
      id: dm.id,
      type: dm.type,
      name: dm.name,
      icon: dm.icon,
      participants: dm.participants,
    }),
  });

  return (
    <div>
      <div className="flex h-12 items-center border-border border-b px-2"></div>
      <code>
        <pre>{JSON.stringify(dm, null, 2)}</pre>
      </code>
    </div>
  );
}
