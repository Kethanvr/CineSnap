import { useEffect } from "react";
import type { Movie } from "../types/movie";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "video.movie";
  structuredData?: any;
  noIndex?: boolean;
  canonical?: string;
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Update title
    if (config.title) {
      document.title = config.title;
    }

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    if (config.description) {
      updateMetaTag("description", config.description);
    }

    if (config.keywords) {
      updateMetaTag("keywords", config.keywords);
    }

    // Open Graph tags
    updateMetaTag("og:title", config.title, true);
    if (config.description) {
      updateMetaTag("og:description", config.description, true);
    }
    if (config.image) {
      updateMetaTag("og:image", config.image, true);
    }
    if (config.url) {
      updateMetaTag("og:url", config.url, true);
    }
    updateMetaTag("og:type", config.type || "website", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", config.title);
    if (config.description) {
      updateMetaTag("twitter:description", config.description);
    }
    if (config.image) {
      updateMetaTag("twitter:image", config.image);
    }

    // Robots meta tag
    if (config.noIndex) {
      updateMetaTag("robots", "noindex, nofollow");
    } else {
      updateMetaTag(
        "robots",
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      );
    }

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonical || config.url || window.location.href;

    // Structured data
    if (config.structuredData) {
      const existingScript = document.querySelector(
        'script[type="application/ld+json"][data-dynamic]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-dynamic", "true");
      script.textContent = JSON.stringify(config.structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove dynamic structured data on unmount
      const dynamicScript = document.querySelector(
        'script[type="application/ld+json"][data-dynamic]'
      );
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [config]);
};

// Specialized hook for movie pages
export const useMovieSEO = (movie: Movie) => {
  const config: SEOConfig = {
    title: `${movie.title} (${new Date(
      movie.release_date
    ).getFullYear()}) | CineSnap - Movie Details`,
    description:
      movie.overview ||
      `Watch ${movie.title} and discover more movies like it on CineSnap. Get AI-powered recommendations, read reviews, and explore cast information.`,
    keywords: `${movie.title}, ${movie.genres
      ?.map((g) => g.name)
      .join(", ")}, movie, film, cinema, ${
      movie.release_date ? new Date(movie.release_date).getFullYear() : ""
    }, CineSnap`,
    image: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://cinesnap.kethanvr.me/og-image.jpg",
    url: `https://cinesnap.kethanvr.me/movie/${movie.id}`,
    type: "video.movie",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Movie",
      name: movie.title,
      url: `https://cinesnap.kethanvr.me/movie/${movie.id}`,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : undefined,
      description: movie.overview,
      datePublished: movie.release_date,
      genre: movie.genres?.map((g) => g.name),
      duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: movie.vote_average,
        ratingCount: movie.vote_count,
        bestRating: 10,
        worstRating: 0,
      },
      actor: movie.credits?.cast?.slice(0, 10).map((actor) => ({
        "@type": "Person",
        name: actor.name,
      })),
      director: movie.credits?.crew
        ?.filter((person) => person.job === "Director")
        .map((director) => ({
          "@type": "Person",
          name: director.name,
        })),
      productionCompany: movie.production_companies?.map((company) => ({
        "@type": "Organization",
        name: company.name,
      })),
    },
  };

  useSEO(config);
};

// Hook for performance optimization
export const usePagePerformance = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      {
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
        as: "style",
      },
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        as: "style",
      },
    ];

    preloadLinks.forEach((link) => {
      const existingLink = document.querySelector(`link[href="${link.href}"]`);
      if (!existingLink) {
        const linkElement = document.createElement("link");
        linkElement.rel = "preload";
        linkElement.href = link.href;
        linkElement.as = link.as;
        linkElement.crossOrigin = "anonymous";
        document.head.appendChild(linkElement);
      }
    });

    // Add performance hints
    const addMetaTag = (name: string, content: string) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Resource hints for better performance
    addMetaTag("format-detection", "telephone=no");
    addMetaTag("mobile-web-app-capable", "yes");
    addMetaTag("apple-mobile-web-app-capable", "yes");
    addMetaTag("apple-mobile-web-app-status-bar-style", "black-translucent");

    // Preconnect to external domains
    const preconnectDomains = [
      "https://image.tmdb.org",
      "https://api.themoviedb.org",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://pagead2.googlesyndication.com",
    ];

    preconnectDomains.forEach((domain) => {
      if (!document.querySelector(`link[href="${domain}"][rel="preconnect"]`)) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = domain;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }
    });
  }, []);
};
