// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://dataplan.app",
  integrations: [partytown()],
  vite: {
    plugins: [tailwindcss()],
  },
});
