import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: [
        { dir: "dist" },
        { dir: "dist/order" }, // For Netlify subdirectory
      ],
    },
  },
  server: {
    port: 3090,
  },
  plugins: [react(), tailwindcss()],
});
