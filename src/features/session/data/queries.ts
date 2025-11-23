import { queryOptions } from "@tanstack/react-query";
import { getSessionFn } from ".";

export const sessionQueries = {
  key: () => ["session"] as const,

  get: () =>
    queryOptions({
      queryKey: sessionQueries.key(),
      queryFn: getSessionFn,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }),
};
