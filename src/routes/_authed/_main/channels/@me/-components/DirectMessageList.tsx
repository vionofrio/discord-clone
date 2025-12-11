import { Avatar } from "@base-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { tv } from "tailwind-variants";
import type { getDirectMessagesFn } from "@/data/dm";
import { getDirectMessagesQuery } from "@/data/dm/queries";

const list = tv({
  slots: {
    base: "flex flex-col gap-0.5 px-2",
    item: "group flex h-10.5 items-center gap-3 rounded-lg px-2 transition-colors hover:bg-white/6! active:bg-white/12! [.active]:bg-white/12",
    itemFallback: "h-10.5 animate-pulse rounded-lg bg-surface-2",
  },
});

const selectDirectMessageListItem = (
  dms: Awaited<ReturnType<typeof getDirectMessagesFn>>,
) =>
  dms.map((dm) => ({
    id: dm.id,
    type: dm.type,
    name: dm.name,
    icon: dm.icon,
    participants: dm.participants,
  }));

type DirectMessageListItem = ReturnType<
  typeof selectDirectMessageListItem
>[number];

export const DirectMessageList = () => {
  const { base } = list();
  const { data: dms } = useSuspenseQuery({
    ...getDirectMessagesQuery(),
    select: selectDirectMessageListItem,
  });

  return (
    <ul className={base()}>
      {dms.map((dm) => (
        <DirectMessageListItem key={dm.id} dm={dm} />
      ))}
    </ul>
  );
};

export const DirectMessageListFallback = () => {
  const { base, itemFallback } = list();

  return (
    <ul className={base()}>
      {[...Array(5)].map((_, index) => (
        <li
          // biome-ignore lint/suspicious/noArrayIndexKey: <ignore>
          key={index}
          className={itemFallback()}
        />
      ))}
    </ul>
  );
};

const DirectMessageListItem = memo(({ dm }: { dm: DirectMessageListItem }) => {
  const { item } = list();
  // biome-ignore lint/style/noNonNullAssertion: <ignore>
  const me = dm.participants.find((p) => p.isMe)!;
  const others = dm.participants.filter((p) => !p.isMe);

  if (dm.type === "ONE_ON_ONE") {
    const other = others[0];

    return (
      <li>
        <Link
          to="/channels/@me/$dmId"
          params={{
            dmId: dm.id,
          }}
          className={item()}
        >
          <Avatar.Root className="size-8 shrink-0 overflow-hidden rounded-full">
            <Avatar.Image src={other.image ?? ""} />
            <Avatar.Fallback>
              <div className="size-full animate-pulse bg-surface-2"></div>
            </Avatar.Fallback>
          </Avatar.Root>
          <span className="line-clamp-1 font-medium text-muted leading-tight transition-colors group-hover:text-foreground group-[.active]:text-foreground">
            {other.displayUsername}
          </span>
        </Link>
      </li>
    );
  }

  const displayName =
    dm.name ?? ["Você", ...others.map((p) => p.displayUsername)].join(", ");

  return (
    <li>
      <Link
        to="/channels/@me/$dmId"
        params={{
          dmId: dm.id,
        }}
        className={item()}
      >
        <div className="relative size-8 shrink-0">
          {[me, ...others].slice(0, 2).map((participant, index) => (
            <Avatar.Root
              key={participant.id}
              className={`absolute size-6 overflow-hidden rounded-full ring-2 ring-background ${
                index === 0 ? "right-0 bottom-0 z-10" : "top-0 left-0"
              }
           `}
            >
              <Avatar.Image src={participant.image ?? ""} />
              <Avatar.Fallback>
                <div className="size-full animate-pulse bg-surface-2"></div>
              </Avatar.Fallback>
            </Avatar.Root>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="line-clamp-1 font-medium text-muted leading-tight transition-colors group-hover:text-foreground group-[.active]:text-foreground">
            {displayName}
          </span>
          <span className="font-medium text-muted text-xs transition-colors group-hover:text-foreground group-[.active]:text-foreground">
            {dm.participants.length} Membros
          </span>
        </div>
      </Link>
    </li>
  );
});
