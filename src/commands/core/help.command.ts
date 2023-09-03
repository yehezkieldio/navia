import { ComponentType, Message, SlashCommandBuilder, chatInputApplicationCommandMention } from "discord.js";

import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import { Command, CommandStore, RegisterBehavior } from "@sapphire/framework";

import { NaviaCommand } from "@~/lib/extensions/command.extension";

export class HelpCommand extends NaviaCommand {
    constructor(context: NaviaCommand.Context, options: NaviaCommand.Options) {
        super(context, {
            ...options,
            name: "help",
            description: "Retrive a helpful information about the bot and its available commands.",
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
        return await this.buildCommands(interaction);
    }

    async messageRun(message: Message) {
        return await this.buildCommands(message);
    }

    private async buildCommands(ctx: Message | NaviaCommand.ChatInputCommandInteraction) {
        const paginate: PaginatedMessage = new PaginatedMessage();
        const commands: CommandStore = this.container.stores.get("commands");
        const categories: (string | null)[] = [...new Set(commands.map((cmd: Command) => cmd.category))];
        categories.unshift("primary");

        paginate.addPageEmbed((embed) => {
            embed.setTitle("Hi-ya! I'm Navia.");
            embed.setDescription(
                "Navia is here as yet another multipurpose Discord bot, there's already a lot of them - but why not more? Navia supports both slash commands and message commands, but it is recommended to use slash commands.\n\n**Navia is currently a side-hobby project of elizielx. I'm working on it in my free time or when I'm bored, so it's not a priority.**"
            );
            return embed;
        });

        for (const category of categories) {
            if (category === "primary") continue;

            const categoryCommands = commands.filter((cmd: Command): boolean => cmd.category === category);
            const fields = categoryCommands.map((cmd: Command) => cmd);

            const commandFields = fields.map((cmd: Command) => {
                let command;
                const commandId = this.container.applicationCommandRegistries.acquire(cmd.name).globalCommandId;

                if (!commandId) {
                    command = `/${cmd.name}`;
                } else {
                    command = chatInputApplicationCommandMention(cmd.name, commandId);
                }

                return { name: command, value: cmd.description, inline: true };
            });

            paginate.addPageEmbed((embed) => {
                embed.setTitle(`Viewing ${category.charAt(0).toUpperCase() + category.slice(1)} commands.`);
                embed.addFields(commandFields);
                return embed;
            });
        }

        const selectMenuOptions = [];

        selectMenuOptions.push(
            ...categories.map((category) => ({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                description:
                    category === "primary"
                        ? "View the primary page."
                        : `View ${category.charAt(0).toUpperCase() + category.slice(1)}-related commands.`,
                value: category,
            }))
        );

        paginate.setActions([
            {
                customId: "help-command-experimental",
                type: ComponentType.StringSelect,
                options: selectMenuOptions,
                placeholder: "Select a category...",
                run: ({ handler, interaction }) => {
                    if (interaction.isStringSelectMenu()) {
                        handler.index = categories.indexOf(interaction.values[0]);
                    }
                },
            },
        ]);

        return paginate.run(ctx);
    }
}
