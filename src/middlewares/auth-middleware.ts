import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { verifySessionFn } from "@/data/auth";

export const authMiddleware = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const { session } = await verifySessionFn();

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
