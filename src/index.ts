import { GatewayIntentBits } from "discord.js";
import "dotenv/config";

import { SapphireClient } from "@sapphire/framework";

import { Environment } from "#/utils/env";

const client = new SapphireClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.login(Environment.get("DISCORD_TOKEN"));
