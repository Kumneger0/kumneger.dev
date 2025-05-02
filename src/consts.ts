export const SITE_TITLE = "Kumneger Wondimu";
export const SITE_DESCRIPTION = "A personal site of Kumneger Wondimu";
export const SITE_URL = "https://kumneger.dev";

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
  description: "A personal site of Kumneger Wondimu",
};

export const ITEMS_PER_PAGE = 5;

export const NAVIGATION = [
  { href: "/", title: "home" },
  { href: "/blog", title: "blog" },
  { href: "/tags", title: "tags" },
] as const;

export const POST_METADATA = {
  defaultLayout: "column",
  showFullWidthCover: false,
  showCover: true,
  showTags: true,
  showDate: true,
  showSummary: true,
  showAuthors: true,
  showRelatedPosts: true,
  showTableOfContents: true,
  showShareButtons: "both",
};
