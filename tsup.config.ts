import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  target: "es2022",
  tsconfig: "tsconfig.json",
  shims: true,
});
