import { InferModel } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    discordId: varchar("discord_id").unique().notNull(),
});
