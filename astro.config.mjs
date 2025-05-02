// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import { SITE_METADATA } from "./src/consts.ts";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: SITE_METADATA.siteUrl,
  integrations: [
    mdx(),
    sitemap(),
    metaTags(),
    robotsTxt(),
    react({
      include: ["**/react/*"],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  server: {
    port: 4000,
  },
});
