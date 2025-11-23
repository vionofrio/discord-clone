import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getSessionFn } from "./data";

export const sessionMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await getSessionFn();

  if (!session) {
    throw redirect({
      to: "/login",
    });
  }

  return next({
    context: {
      session,
    },
  });
});
