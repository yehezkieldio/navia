import { config as DotenvConfig, DotenvParseOutput } from "dotenv";

import { schema } from "./env.schema";

class EnvironmentLoader {
    private parsedEnv: DotenvParseOutput;

    constructor() {
        this.parsedEnv = DotenvConfig().parsed || {};
    }

    process(key: string): string {
        if (!(key in this.parsedEnv)) {
            throw new Error(`Environment variable ${key} is missing from .env file.`);
        }
        return this.parsedEnv[key];
    }

    load(): { [key in keyof typeof schema]: string } {
        const validatedEnv = {} as { [key in keyof typeof schema]: string };
        for (const key in schema) {
            validatedEnv[key] = this.process(key);
        }

        return validatedEnv;
    }
}

export const environmentLoader = new EnvironmentLoader();
export const loadedEnv = environmentLoader.load();
