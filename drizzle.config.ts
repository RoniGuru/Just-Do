import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["just-do_*"],
} satisfies Config;
