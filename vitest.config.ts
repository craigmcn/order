import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      exclude: [...configDefaults.exclude, "e2e/**"],
      setupFiles: "./tests/setup.ts",
      coverage: {
        reporter: ["text", "json", "html"],
        exclude: [
          "node_modules/**",
          "coverage/**",
          "dist/**",
          "**/{vite,vitest,tailwind}.config.{js,ts}",
        ],
        include: ["src/**/*.{ts,tsx}"],
      },
    },
  }),
);
