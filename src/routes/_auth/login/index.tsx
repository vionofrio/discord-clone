import { createFileRoute } from "@tanstack/react-router";
import { APIError } from "better-auth";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/_auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col gap-2">
        {[
          { id: "github", name: "GitHub" },
          { id: "google", name: "Google" },
        ].map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={async () => {
              try {
                authClient.signIn.social({
                  provider: provider.id,
                  callbackURL: "/",
                });
              } catch (error) {
                if (error instanceof APIError) {
                  console.error(error.message);
                }
              }
            }}
          >
            Continue with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}
