import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      "xmlhttprequest-ssl":
        "./node_modules/engine.io-client/lib/xmlhttprequest.js",
    },
    mainFields:
      [] /* Added this field because react-moment wouldn't work without it. */,
  },
});
