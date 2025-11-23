/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly BETTER_AUTH_SECRET: string;
      readonly BETTER_AUTH_URL: string;
      readonly GITHUB_CLIENT_ID: string;
      readonly GITHUB_CLIENT_SECRET: string;
      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
