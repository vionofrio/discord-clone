import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Layout } from "../../-components/Layout";
import { ChannelList } from "./-components/ChannelList";
import { MemberList } from "./-components/MemberList";
import { TitleBar } from "./-components/TitleBar";

export const Route = createFileRoute("/_authed/_main/channels/$serverId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout
      titleBar={<TitleBar />}
      channelsList={<ChannelList />}
      page={
        <div className="channel-grid-areas-layout channel-grid-cols-layout channel-grid-rows-layout grid flex-1">
          <Outlet />
          <MemberList />
        </div>
      }
    />
  );
}
