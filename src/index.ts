import "dotenv/config";
import { Config, Effect } from "effect";

import { NaviaClient } from "@~/lib/extensions/client.extension";

import { options } from "./options";

const main = Effect.all([Effect.config(Config.string("DISCORD_BOT_TOKEN"))]).pipe(
    Effect.flatMap(([token]) => Effect.sync(() => new NaviaClient(options).login(token)))
);

Effect.runSync(main);
