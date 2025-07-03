
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  noIndex?: boolean;
}

const SEOManager = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  noIndex = false
}: SEOProps) => {
  const baseUrl = 'https://www.revkonstriksyon.com';
  const defaultImage = `${baseUrl}/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png`;
  
  const fullTitle = title === 'Rev Konstriksyon' ? title : `${title} | Rev Konstriksyon`;
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgImage = ogImage || defaultImage;
  const finalCanonicalUrl = canonicalUrl || baseUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="Rev Konstriksyon" />
      <meta property="og:locale" content="ht_HT" />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalCanonicalUrl} />
      <meta property="twitter:title" content={finalOgTitle} />
      <meta property="twitter:description" content={finalOgDescription} />
      <meta property="twitter:image" content={finalOgImage} />
      
      {/* Article specific meta tags */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Additional SEO */}
      <meta name="author" content="Rev Konstriksyon - Firme de Construction Haiti" />
      <meta name="language" content="Haitian Creole, French" />
      <meta name="geo.region" content="HT" />
      <meta name="geo.country" content="Haiti" />
      <meta name="geo.placename" content="Port-au-Prince, Haïti" />
      
      {/* Hreflang for multilingual SEO */}
      <link rel="alternate" hrefLang="ht" href={finalCanonicalUrl} />
      <link rel="alternate" hrefLang="fr" href={finalCanonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />
    </Helmet>
  );
};

export default SEOManager;
