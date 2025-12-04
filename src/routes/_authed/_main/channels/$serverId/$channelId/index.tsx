import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./-components/Header";
import { Main } from "./-components/Main";

export const Route = createFileRoute(
  "/_authed/_main/channels/$serverId/$channelId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Main>
        <div>Hello "/_authed/_main/channels/$serverId/$channelId/"!</div>
      </Main>
    </>
  );
}
