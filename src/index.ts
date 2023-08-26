import { GatewayIntentBits } from "discord.js";
import "dotenv/config";

import { SapphireClient } from "@sapphire/framework";

const client = new SapphireClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.login(process.env.DISCORD_TOKEN);
