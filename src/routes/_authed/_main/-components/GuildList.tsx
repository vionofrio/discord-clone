import { Link } from "@tanstack/react-router";
import DiscoverIcon from "@/assets/icons/discover.svg?react";
import LogoIcon from "@/assets/icons/logo.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";

export const GuildList = () => {
  return (
    <div className="w-18 [grid-area:guildsList]">
      <ul className="flex flex-col gap-2">
        <li className="relative isolate flex items-center justify-center">
          <Link
            to="/channels/@me"
            className="peer grid size-10 place-items-center overflow-hidden rounded-xl bg-content-1 transition-colors hover:bg-primary active:translate-y-px [.active]:bg-primary"
          >
            <LogoIcon className="size-6 text-primary-foreground" />
          </Link>
          <div className="-z-10 -translate-x-full peer-hover:-translate-x-1/2 peer-[.active]:-translate-x-1/2 absolute left-0 w-2 rounded-full bg-primary-foreground transition-[height,translate] peer-hover:h-1/2 peer-[.active]:h-full" />
        </li>
        <li className="flex items-center justify-center">
          <div className="h-px w-8 bg-divider" />
        </li>
        <li className="flex items-center justify-center">
          <div className="grid size-10 place-items-center overflow-hidden rounded-xl bg-content-1 transition-colors hover:bg-primary active:translate-y-px [.active]:bg-primary">
            <PlusIcon className="size-5 text-primary-foreground" />
          </div>
        </li>
        <li className="relative isolate flex items-center justify-center">
          <Link
            to="/discover"
            className="peer grid size-10 place-items-center overflow-hidden rounded-xl bg-content-1 transition-colors hover:bg-primary active:translate-y-px [.active]:bg-primary"
          >
            <DiscoverIcon className="size-5 text-primary-foreground" />
          </Link>
          <div className="-z-10 -translate-x-full peer-hover:-translate-x-1/2 peer-[.active]:-translate-x-1/2 absolute left-0 w-2 rounded-full bg-primary-foreground transition-[height,translate] peer-hover:h-1/2 peer-[.active]:h-full" />
        </li>
      </ul>
    </div>
  );
};
