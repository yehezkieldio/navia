import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const db = drizzle(postgres(process.env.DATABASE_URL, { max: 1 }));

async function main() {
    await migrate(db, { migrationsFolder: "drizzle" });
    process.exit(0);
}
main();
