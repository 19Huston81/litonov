import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Относительные пути к ассетам: сайт работает в любой папке хостинга
  // и при открытии dist/index.html напрямую (без абсолютных /assets/…)
  base: "./",
  plugins: [react()],
  server: {
    port: 3000,
  },
});