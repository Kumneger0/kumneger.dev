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
import inspectUrls from "@jsdevtools/rehype-url-inspector";


// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: SITE_METADATA.siteUrl,
  integrations: [
    mdx({
      rehypePlugins: [
        [
          inspectUrls,
          {
            selectors: ["a[href]"],
            /**
             * @param {{ node: { properties: { href?: string; target?: string; rel?: string } } }} url
             */
            inspectEach(url) {
              if (
                url.node.properties.href &&
                (url.node.properties.href.startsWith("http") ||
                  url.node.properties.href.startsWith("//"))
              ) {
                url.node.properties.target = "_blank";
                url.node.properties.rel = "noopener noreferrer";
              }
            },
          },
        ],
      ],
    }),
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
