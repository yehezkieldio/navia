import { loadedEnv } from "./env.loader";
import { schema } from "./env.schema";

export class Environment {
    public static get<T extends keyof typeof schema>(key: T): (typeof schema)[T] {
        return loadedEnv[key];
    }
}
