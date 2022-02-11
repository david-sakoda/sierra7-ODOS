import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from 'vite-plugin-eslint';
import env from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), env()],
  server:{
    proxy:{
      '/api/v1':{
        target: "http://localhost:8000",
        changeOrigin: true,
       
      }
    }
  }
});
