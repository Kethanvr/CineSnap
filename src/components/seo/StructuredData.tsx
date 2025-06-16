import React from "react";
import type { Movie } from "../../types/movie";

interface StructuredDataProps {
  type:
    | "WebApplication"
    | "Movie"
    | "WebSite"
    | "BreadcrumbList"
    | "Organization";
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let structuredData = {};

  switch (type) {
    case "WebApplication":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "CineSnap",
        url: "https://cinesnap.kethanvr.me",
        applicationCategory: "EntertainmentApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Person",
          name: "Kethan VR",
          url: "https://kethanvr.me",
        },
        description:
          "CineSnap is an AI-powered movie discovery platform that helps users find their perfect movie match through intelligent recommendations, mood analysis, and conversational AI.",
        keywords: [
          "movie discovery",
          "AI recommendations",
          "film finder",
          "cinema",
          "entertainment",
        ],
        inLanguage: "en-US",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString(),
        screenshot: "https://cinesnap.kethanvr.me/og-image.jpg",
        featureList: [
          "AI-powered movie recommendations",
          "Mood-based film discovery",
          "Voice and text chat interface",
          "Real-time movie database",
          "Personalized suggestions",
        ],
      };
      break;

    case "Movie":
      const movie = data as Movie;
      structuredData = {
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
        actor: movie.credits?.cast?.slice(0, 5).map((actor) => ({
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
        inLanguage: movie.original_language,
      };
      break;

    case "WebSite":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "CineSnap",
        url: "https://cinesnap.kethanvr.me",
        description:
          "Discover your next favorite movie with AI-powered recommendations",
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://cinesnap.kethanvr.me/search?query={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@type": "Person",
          name: "Kethan VR",
          url: "https://kethanvr.me",
        },
      };
      break;

    case "BreadcrumbList":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: item.path
            ? `https://cinesnap.kethanvr.me${item.path}`
            : undefined,
        })),
      };
      break;

    case "Organization":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "CineSnap",
        url: "https://cinesnap.kethanvr.me",
        logo: "https://cinesnap.kethanvr.me/logo.png",
        description: "AI-powered movie discovery platform by Kethan VR",
        foundingDate: "2024",
        founder: {
          "@type": "Person",
          name: "Kethan VR",
          url: "https://kethanvr.me",
        },
        sameAs: ["https://github.com/kethanvr", "https://kethanvr.me"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          url: "https://cinesnap.kethanvr.me/contact",
        },
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default StructuredData;
