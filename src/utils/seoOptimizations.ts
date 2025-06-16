// SEO Enhancement Utilities
export const seoConfig = {
  baseUrl: "https://cinesnap.kethanvr.me",
  siteName: "CineSnap",
  defaultTitle: "CineSnap | AI-Powered Movie Discovery Platform",
  defaultDescription:
    "Discover your next favorite movie with CineSnap - the AI-powered movie recommendation platform. Get personalized suggestions, explore genres, and find films that match your mood.",
  defaultImage: "https://cinesnap.kethanvr.me/og-image.jpg",
  twitterHandle: "@cinesnap_ai",
  author: "Kethan VR",
  authorUrl: "https://kethanvr.me",
};

// Page-specific SEO configurations
export const pageConfigs = {
  home: {
    title: "CineSnap | AI-Powered Movie Discovery Platform",
    description:
      "Discover your next favorite movie with CineSnap - the AI-powered movie recommendation platform. Get personalized suggestions, explore genres, and find films that match your mood.",
    keywords:
      "movie recommendations, AI movie finder, film discovery, movie search, personalized movies, CineSnap, movie database, film suggestions",
    priority: 1.0,
    changefreq: "daily",
  },
  movies: {
    title: "Latest Movies | CineSnap - Discover New Films",
    description:
      "Explore the latest movie releases, trending films, and new cinema. Stay updated with fresh content and discover your next watch on CineSnap.",
    keywords:
      "latest movies, new movies, recent films, movie releases, trending movies, new cinema",
    priority: 0.9,
    changefreq: "daily",
  },
  categories: {
    title: "Movie Categories & Genres | CineSnap - Browse by Genre",
    description:
      "Explore movie genres and categories. Find action, comedy, drama, horror, sci-fi, romance, and more movies organized by genre on CineSnap.",
    keywords:
      "movie genres, movie categories, action movies, comedy films, drama movies, horror films, sci-fi movies",
    priority: 0.8,
    changefreq: "weekly",
  },
  search: {
    title: "Search Movies | CineSnap - Find Your Perfect Film",
    description:
      "Search through thousands of movies and find exactly what you're looking for. Use our powerful search and AI recommendations to discover films.",
    keywords:
      "movie search, film search, find movies, movie finder, search films, movie database search",
    priority: 0.7,
    changefreq: "daily",
  },
  about: {
    title: "About CineSnap | AI Movie Discovery Platform by Kethan VR",
    description:
      "Learn about CineSnap, the AI-powered movie discovery platform created by Kethan VR. Discover how we help you find your perfect movie match.",
    keywords:
      "about CineSnap, Kethan VR, AI movie platform, movie discovery technology, CineSnap story",
    priority: 0.6,
    changefreq: "monthly",
  },
  contact: {
    title: "Contact CineSnap | Get in Touch with Our Team",
    description:
      "Contact CineSnap for support, feedback, or partnership opportunities. We'd love to hear from you and help improve your movie discovery experience.",
    keywords:
      "contact CineSnap, movie platform support, CineSnap feedback, get in touch",
    priority: 0.5,
    changefreq: "monthly",
  },
};

// Generate breadcrumb structured data
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ label: string; path?: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.path ? `${seoConfig.baseUrl}${item.path}` : undefined,
    })),
  };
};

// Generate FAQ schema for better search results
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// Generate article schema for blog posts or detailed pages
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image || seoConfig.defaultImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author || seoConfig.author,
      url: seoConfig.authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: seoConfig.siteName,
      url: seoConfig.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${seoConfig.baseUrl}/logo.png`,
      },
    },
    url: article.url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
};

// Performance optimization helpers
export const preloadCriticalResources = () => {
  const criticalResources = [
    {
      href: "https://image.tmdb.org/t/p/w500",
      rel: "preconnect",
      crossOrigin: "anonymous",
    },
    {
      href: "https://api.themoviedb.org",
      rel: "preconnect",
      crossOrigin: "anonymous",
    },
    {
      href: "https://fonts.googleapis.com",
      rel: "preconnect",
      crossOrigin: "anonymous",
    },
    {
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
      crossOrigin: "anonymous",
    },
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = resource.rel;
    link.href = resource.href;
    if (resource.crossOrigin) {
      link.crossOrigin = resource.crossOrigin;
    }
    document.head.appendChild(link);
  });
};

// Add viewport meta tags for mobile optimization
export const optimizeForMobile = () => {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    viewportMeta.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes, viewport-fit=cover"
    );
  }

  // Add mobile-specific meta tags
  const mobileMetaTags = [
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "apple-mobile-web-app-title", content: "CineSnap" },
    { name: "application-name", content: "CineSnap" },
    { name: "msapplication-TileColor", content: "#1976d2" },
    { name: "theme-color", content: "#1976d2" },
  ];

  mobileMetaTags.forEach((tag) => {
    if (!document.querySelector(`meta[name="${tag.name}"]`)) {
      const meta = document.createElement("meta");
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    }
  });
};

// SEO keywords for different movie genres
export const genreKeywords = {
  28: "action movies, action films, adventure movies, superhero movies",
  12: "adventure movies, adventure films, exploration movies, journey films",
  16: "animated movies, animation films, cartoon movies, family animation",
  35: "comedy movies, funny films, humor movies, laugh movies",
  80: "crime movies, thriller films, detective movies, mystery films",
  99: "documentary films, documentaries, true story movies, educational films",
  18: "drama movies, dramatic films, emotional movies, serious films",
  10751: "family movies, family films, kids movies, children films",
  14: "fantasy movies, magical films, fantasy adventure, mystical movies",
  36: "historical movies, period films, history movies, biographical films",
  27: "horror movies, scary films, thriller horror, supernatural movies",
  10402: "musical movies, music films, singing movies, dance films",
  9648: "mystery movies, suspense films, detective movies, puzzle films",
  10749: "romance movies, romantic films, love stories, romantic comedy",
  878: "sci-fi movies, science fiction films, futuristic movies, space movies",
  10770: "TV movies, television films, made for TV movies",
  53: "thriller movies, suspense films, psychological thrillers, action thrillers",
  10752: "war movies, military films, combat movies, battle films",
  37: "western movies, cowboy films, frontier movies, old west films",
};

// Generate dynamic meta description based on content
export const generateDynamicDescription = (type: string, data: any) => {
  switch (type) {
    case "movie":
      return `Watch ${data.title} (${new Date(
        data.release_date
      ).getFullYear()}) on CineSnap. ${
        data.overview
          ? data.overview.slice(0, 120) + "..."
          : "Discover more about this movie, cast, reviews, and get personalized recommendations."
      } Rating: ${data.vote_average}/10`;

    case "search":
      return `Found ${data.totalResults} movies matching "${data.query}". Discover films, get AI recommendations, and explore cinema with CineSnap's powerful search.`;

    case "genre":
      return `Explore ${
        data.genreName
      } movies on CineSnap. Discover the best ${data.genreName.toLowerCase()} films, get recommendations, and find your next favorite movie.`;

    default:
      return seoConfig.defaultDescription;
  }
};
