// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { SITE_METADATA } from "./src/consts.ts";
import robotsTxt from "astro-robots-txt";

/**
 * @typedef {Object} HastNode
 * @property {string} type
 * @property {string} [tagName]
 * @property {Record<string, unknown>} [properties]
 * @property {HastNode[]} [children]
 */

/**
 * 
 * @returns {(tree: HastNode) => void}
 */
function rehypeExternalLinks() {
  return (tree) => {
    /**
     * @param {HastNode} node
     */
    function walk(node) {
      if (!node || typeof node !== "object") return;
      if (node.type === "element" && node.tagName === "a" && node.properties) {
        const href = node.properties.href;
        if (
          typeof href === "string" &&
          (href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("//"))
        ) {
          node.properties.target = "_blank";
          node.properties.rel = "noopener noreferrer";
        }
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          walk(child);
        }
      }
    }

    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: SITE_METADATA.siteUrl,
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeExternalLinks],
    }),
  },

  integrations: [
    mdx(),
    sitemap(),
    metaTags(),
    robotsTxt(),
    react({
      include: ["**/react/*"],
    }),
  ],
  output:'static',
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel({ 
    webAnalytics: {
      enabled: true,
    },
  }),
  server: {
    port: 4000,
  },
});
