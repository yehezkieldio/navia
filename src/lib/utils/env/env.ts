import { loadedEnv } from "./loader";
import { schema } from "./schema";

export class Environment {
    public static get<T extends keyof typeof schema>(key: T): (typeof schema)[T] {
        return loadedEnv[key];
    }
}
