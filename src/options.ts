import { GatewayIntentBits } from "discord.js";

import { NaviaClientOptions } from "@~/lib/extensions/client.extension";

export const options: NaviaClientOptions = {
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
};
