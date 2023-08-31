export interface EnvironmentSchema {
    DISCORD_TOKEN: string;
    DATABASE_URL: string;
}
export const schema: EnvironmentSchema = {
    DISCORD_TOKEN: "",
    DATABASE_URL: "",
};
