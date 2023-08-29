CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"discord_id" varchar NOT NULL,
	CONSTRAINT "users_discord_id_unique" UNIQUE("discord_id")
);
