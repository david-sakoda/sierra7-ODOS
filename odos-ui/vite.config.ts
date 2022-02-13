// //// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import env from "vite-plugin-env-compatible";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), env()],
  // test: {
  //   coverage: { all: true },
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./jest-setup.ts",
  // },
    resolve : {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
  server: {
    watch:{
      ignored:["/coverage/*"]
    },
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
