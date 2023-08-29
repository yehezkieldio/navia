import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users } from "./schema/user.sql";

import { Environment } from "#/utils/env";

export const db = drizzle(postgres(Environment.get("DATABASE_URL")), {
    logger: true,
    schema: {
        users,
    },
});
