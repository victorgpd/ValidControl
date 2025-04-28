import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["eea2-45-186-54-32.ngrok-free.app"],
    host: true,
  },
});
