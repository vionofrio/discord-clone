import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import {
  directMessageQueryKeys as dmQueryKeys,
  getDirectMessagesQuery,
} from "@/data/dm/queries";
import { Layout } from "../../-components/Layout";
import {
  DirectMessageList,
  DirectMessageListFallback,
} from "./-components/DirectMessageList";

export const Route = createFileRoute("/_authed/_main/channels/@me")({
  beforeLoad: async ({ context }) => {
    const dms = await context.queryClient.ensureQueryData(
      getDirectMessagesQuery(),
    );

    dms.forEach((dm) => {
      context.queryClient.setQueryData(dmQueryKeys.detail(dm.id), dm);
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout
      titleBar={<>Friends</>}
      channelsList={
        <nav>
          <ul>
            <li>
              <Link to="/channels/@me">Friends</Link>
            </li>
          </ul>
          <div className="flex flex-col gap-1">
            <div className="group flex items-center justify-between px-4">
              <h2 className="font-medium text-muted text-sm transition-colors group-hover:text-foreground">
                Direct Messages
              </h2>
              <PlusIcon className="size-4 text-muted" />
            </div>
            <Suspense fallback={<DirectMessageListFallback />}>
              <DirectMessageList />
            </Suspense>
          </div>
        </nav>
      }
      page={<Outlet />}
    />
  );
}
