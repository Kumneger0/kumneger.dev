import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { SITE_METADATA } from "@/consts";
const parser = new MarkdownIt();

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");
  return rss({
    title: "Kumneger’s Blog",
    description: SITE_METADATA.description,
    site: context.site ?? new URL(SITE_METADATA.siteUrl),
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.id}/`,
      ...(post.body
        ? {
            content: sanitizeHtml(parser.render(post.body), {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            }),
          }
        : {}),
    })),
  });
};
