import { Message, SlashCommandBuilder } from "discord.js";

import { RegisterBehavior } from "@sapphire/framework";

import { NaviaCommand } from "@~/lib/extensions/command.extension";

export class PingCommand extends NaviaCommand {
    constructor(context: NaviaCommand.Context, options: NaviaCommand.Options) {
        super(context, {
            ...options,
            name: "ping",
            description: "Get the bot's ping.",
        });
    }

    override registerApplicationCommands(registry: NaviaCommand.Registry) {
        const command: SlashCommandBuilder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    async chatInputRun(interaction: NaviaCommand.ChatInputCommandInteraction) {
        return interaction.reply("Pong!");
    }

    async messageRun(message: Message) {
        return message.reply("Pong!");
    }
}
