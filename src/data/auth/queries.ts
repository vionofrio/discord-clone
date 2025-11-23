import { queryOptions } from "@tanstack/react-query";
import { verifySessionFn } from ".";

export const authQueryKeys = {
  session: ["session"] as const,
};

export const verifySessionQuery = () =>
  queryOptions({
    queryKey: authQueryKeys.session,
    queryFn: () => verifySessionFn(),
  });
