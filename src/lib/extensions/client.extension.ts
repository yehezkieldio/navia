import { ClientOptions } from "discord.js";

import {
    ApplicationCommandRegistries,
    RegisterBehavior,
    SapphireClient,
    SapphireClientOptions,
} from "@sapphire/framework";

export interface NaviaClientOptions extends SapphireClientOptions, ClientOptions {}

export class NaviaClient extends SapphireClient {
    constructor(options: NaviaClientOptions) {
        super(options);

        ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
    }
}
