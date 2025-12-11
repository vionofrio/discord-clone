import { queryOptions } from "@tanstack/react-query";
import { getDirectMessageFn, getDirectMessagesFn } from ".";

export const directMessageQueryKeys = {
  all: ["directMessages"] as const,
  lists: () => [...directMessageQueryKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [
      ...directMessageQueryKeys.lists(),
      {
        filters,
      },
    ] as const,
  details: () => [...directMessageQueryKeys.all, "detail"] as const,
  detail: (dmId: string) =>
    [...directMessageQueryKeys.details(), dmId] as const,
};

export const getDirectMessagesQuery = (filters?: Record<string, unknown>) => {
  return queryOptions({
    queryKey: directMessageQueryKeys.list(filters),
    queryFn: () => getDirectMessagesFn(),
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    refetchInterval: false,
  });
};

export const getDirectMessageQuery = (dmId: string) => {
  return queryOptions({
    queryKey: directMessageQueryKeys.detail(dmId),
    queryFn: () =>
      getDirectMessageFn({
        data: {
          dmId,
        },
      }),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: "always",
  });
};
