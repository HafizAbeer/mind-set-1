import path from "path"; // 1. Add this import
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 2. Add the resolve block here
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // Override with VITE_API_PROXY=http://localhost:5000 to develop against
        // a local backend; defaults to the deployed backend.
        target: process.env.VITE_API_PROXY || "https://mind-set-1-s6gf.vercel.app/",
        changeOrigin: true,
      },
    },
  },
});
