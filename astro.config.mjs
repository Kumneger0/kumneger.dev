// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://kumneger.dev",
  server: {
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    mdx(),
    react({
      include: ["**/react/*"],
    }),
  ],
});
