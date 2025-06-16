export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export const generateStaticSitemapUrls = (): SitemapUrl[] => {
  const baseUrl = "https://cinesnap.kethanvr.me";
  const now = new Date().toISOString();

  return [
    {
      loc: baseUrl,
      lastmod: now,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/movies`,
      lastmod: now,
      changefreq: "daily",
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/movies/top-rated`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/movies/upcoming`,
      lastmod: now,
      changefreq: "daily",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/categories`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod: now,
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: now,
      changefreq: "yearly",
      priority: 0.3,
    },
  ];
};

export const generateMovieSitemapUrls = (movieIds: number[]): SitemapUrl[] => {
  const baseUrl = "https://cinesnap.kethanvr.me";
  const now = new Date().toISOString();

  return movieIds.map((id) => ({
    loc: `${baseUrl}/movie/${id}`,
    lastmod: now,
    changefreq: "weekly" as const,
    priority: 0.8,
  }));
};

export const generateGenreSitemapUrls = (genreIds: number[]): SitemapUrl[] => {
  const baseUrl = "https://cinesnap.kethanvr.me";
  const now = new Date().toISOString();

  return genreIds.map((id) => ({
    loc: `${baseUrl}/genre/${id}`,
    lastmod: now,
    changefreq: "weekly" as const,
    priority: 0.7,
  }));
};

export const generateSitemapXml = (urls: SitemapUrl[]): string => {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

// Generate robots.txt content
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Important pages
Allow: /movies
Allow: /search
Allow: /categories
Allow: /movie/*
Allow: /genre/*

# Block admin paths (if any in future)
Disallow: /admin/
Disallow: /api/private/

# Sitemap location
Sitemap: https://cinesnap.kethanvr.me/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1`;
};
