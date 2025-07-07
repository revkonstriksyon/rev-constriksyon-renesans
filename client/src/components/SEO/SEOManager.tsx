
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOManagerProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  robots?: string;
  viewport?: string;
  language?: string;
  noIndex?: boolean;
  articlePublishedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
}

const SEOManager: React.FC<SEOManagerProps> = ({
  title = "Rev Konstriksyon - Firme de Construction nan Ayiti",
  description = "Firme de construction ak bureau d'étude prensipal nan Ayiti. Plan achitekti, renovasyon kay, siveyans chantye.",
  keywords = "firme de construction Haiti, bureau d'étude Ayiti, konstriksyon kay Haiti",
  canonicalUrl = "https://www.revkonstriksyon.com",
  ogTitle,
  ogDescription,
  ogImage = "https://www.revkonstriksyon.com/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterSite = "@revkonstriksyon",
  twitterCreator = "@revkonstriksyon",
  robots = "index, follow",
  viewport = "width=device-width, initial-scale=1.0",
  language = "ht",
  noIndex = false,
  articlePublishedTime,
  articleAuthor,
  articleSection
}) => {
  const robotsContent = noIndex ? "noindex, nofollow" : robots;

  try {
    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content={robotsContent} />
        <meta name="viewport" content={viewport} />
        <meta httpEquiv="Content-Language" content={language} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:locale" content="ht_HT" />
        <meta property="og:site_name" content="Rev Konstriksyon" />

        {/* Article-specific Open Graph tags */}
        {articlePublishedTime && (
          <meta property="article:published_time" content={articlePublishedTime} />
        )}
        {articleAuthor && (
          <meta property="article:author" content={articleAuthor} />
        )}
        {articleSection && (
          <meta property="article:section" content={articleSection} />
        )}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:site" content={twitterSite} />
        <meta name="twitter:creator" content={twitterCreator} />
        <meta name="twitter:title" content={ogTitle || title} />
        <meta name="twitter:description" content={ogDescription || description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Additional Meta Tags */}
        <meta name="author" content="Rev Konstriksyon" />
        <meta name="theme-color" content="#C8102E" />
        <meta name="msapplication-TileColor" content="#C8102E" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href={ogImage} />
      </Helmet>
    );
  } catch (error) {
    console.warn('SEO Manager error:', error);
    return (
      <Helmet>
        <title>Rev Konstriksyon - Firme de Construction nan Ayiti</title>
        <meta name="description" content="Firme de construction ak bureau d'étude prensipal nan Ayiti." />
      </Helmet>
    );
  }
};

export default SEOManager;
