import { GatewayIntentBits, Partials } from "discord.js";
import { Config, Effect } from "effect";

import { LogLevel } from "@sapphire/framework";

import { NaviaClientOptions } from "@~/lib/extensions/client.extension";

const generateOptions = Effect.gen(function* (_) {
    const defaultPrefix = yield* _(Effect.config(Config.string("DEFAULT_PREFIX")));

    return {
        allowedMentions: {
            parse: ["users", "roles"],
        },
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
        partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User],
        loadMessageCommandListeners: true,
        loadDefaultErrorListeners: true,
        enableLoaderTraceLoggings: true,
        defaultPrefix: defaultPrefix ?? "navia!",
        typing: true,
        logger: {
            level: LogLevel.Debug,
        },
    } as NaviaClientOptions;
});
export const options = Effect.runSync(generateOptions);
