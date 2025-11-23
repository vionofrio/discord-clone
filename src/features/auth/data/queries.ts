import { queryOptions } from "@tanstack/react-query";
import { getSessionFn } from ".";

export const authQueries = {
  all: () => ["auth"] as const,
  session: () =>
    queryOptions({
      queryKey: [...authQueries.all(), "session"] as const,
      queryFn: getSessionFn,
      staleTime: Infinity,
    }),
};
