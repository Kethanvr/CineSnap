import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const SEO = ({ 
  title = "CineSnap | Discover Movies with AI",
  description = "CineSnap is your AI-powered movie buddy. Discover, explore, and get recommendations instantly. Built by Kethan VR.",
  image = "https://cinesnap.kethanvr.me/og-image.jpg",
  url = "https://cinesnap.kethanvr.me",
  type = "website",
  keywords = "CineSnap, AI Movie Finder, Kethan VR, Movie Recommendations, Film Discovery App"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
