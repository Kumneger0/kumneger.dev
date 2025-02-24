/**
 * Site metadata that is used across the site.
 *
 * A few of these are not used yet, and are subject to change, example of this is Author.
 */
export const SITE_METADATA = {
  title: "Kumneger Wondimu",
  theme: "system",
  siteUrl: "https://kumneger.dev",
  siteRepo: "https://github.com/kumneger0/kumneger-app",
  robots: "index, follow",
  email: "kumnegerwondimu@gmail.com",
  twitter: "https://x.com/Kumneger0",
  linkedin: "https://www.linkedin.com/in/kumneger-wondimu-2b8405241/",
  github: "https://github.com/Kumneger0",
};

/**
 * Default posts per page for pagination.
 */
export const ITEMS_PER_PAGE = 5;

/**
 * Navigation items.
 If title is not found in the translation file, it will be used as is.
 example: if title is "nav.home", and translation file does not have "nav.home", it will be displayed as "nav.home"

 You should add translations for these in src/i18n/ui.ts or use as is.
 */
export const NAVIGATION = [
  { href: "/", title: "nav.home" },
  { href: "/tags", title: "nav.tags" },
] as const;

export const POST_METADATA = {
  defaultLayout: "column", // Default layout for blog posts, options: simple and column
  showFullWidthCover: false, // Show full width cover image in blog post
  showCover: true, // Show cover image in blog post
  showTags: true, // Show tags in blog post, TODO: Add support for hiding tags
  showDate: true, // Show date in blog post, TODO: Add support for hiding date
  showSummary: true, // Show summary in blog post
  showAuthors: true, // Show authors in blog post, TODO: Add support for hiding authors
  showRelatedPosts: true, // Show related posts in blog post, TODO: Add support for hiding related posts
  showTableOfContents: true, // Show table of contents in blog post
  showShareButtons: "both", // Show share buttons in blog post, options: top, bottom, both, none
};
