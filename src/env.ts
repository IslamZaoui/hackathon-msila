import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    BETTER_AUTH_SECRET: z.string(),
    GOOGLE_AI_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z
      .enum(["development", "production"])
      .default("development"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,

    DATABASE_URL: process.env.DATABASE_URL,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  },
  extends: [vercel()],
});

export const dev = env.NEXT_PUBLIC_NODE_ENV === "development";
