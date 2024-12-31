import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Default output directory
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://abkcharity.duckdns.org",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
