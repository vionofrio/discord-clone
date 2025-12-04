import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import DiscoverIcon from "@/assets/icons/discover.svg?react";
import ServersIcon from "@/assets/icons/servers.svg?react";
import { Layout } from "../-components/Layout";

export const Route = createFileRoute("/_authed/_main/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout
      titleBar={
        <>
          <DiscoverIcon />
          <span>Discover</span>
        </>
      }
      channelsList={
        <ul className="flex flex-col gap-0.5 p-2">
          <li>
            <Link
              to="/discover/servers"
              className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/6 active:bg-white/8! [&.active]:bg-white/6"
            >
              <ServersIcon className="size-5 text-muted transition-colors group-[.active]:text-foreground" />
              <span className="font-medium text-muted transition-colors group-hover:text-foreground group-[.active]:text-foreground">
                Servers
              </span>
            </Link>
          </li>
        </ul>
      }
      page={<Outlet />}
    />
  );
}
