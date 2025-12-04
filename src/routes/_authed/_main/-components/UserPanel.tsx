import { useSuspenseQuery } from "@tanstack/react-query";
import CogIcon from "@/assets/icons/cog.svg?react";
import { sessionQueries } from "@/features/session/data/queries";

export const UserPanel = () => {
  const { data: session } = useSuspenseQuery({
    ...sessionQueries.get(),
    select: (data) => ({
      image: data?.user.image,
      username: data?.user.username,
      displayUsername: data?.user.displayUsername,
    }),
  });

  return (
    <div className="absolute inset-x-0 bottom-2 mx-2 flex h-14 items-center gap-2 rounded-lg border border-white/4 bg-content-2 p-3">
      <div className="-ml-1 flex min-w-0 flex-1 items-center gap-2 rounded-sm p-1 transition-colors hover:bg-white/6">
        <div className="relative size-8 overflow-hidden rounded-full">
          <img
            src={session.image ?? ""}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-medium leading-none">
            {session.displayUsername}
          </span>
          <span className="truncate font-medium text-muted text-xs leading-none">
            {session.username}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="group flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-white/6">
          <CogIcon className="size-5 text-muted transition-colors group-hover:text-foreground" />
        </div>
      </div>
    </div>
  );
};
