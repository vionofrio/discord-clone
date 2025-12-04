import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Layout } from "../../-components/Layout";

export const Route = createFileRoute("/_authed/_main/channels/@me")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout
      titleBar={<>Friends</>}
      channelsList={
        <ul>
          <li>
            <Link to="/channels/@me">Friends</Link>
          </li>
        </ul>
      }
      page={<Outlet />}
    />
  );
}
