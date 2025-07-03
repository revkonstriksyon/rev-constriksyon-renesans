
import { Helmet } from 'react-helmet-async';

interface OrganizationStructuredDataProps {
  type?: 'organization' | 'localBusiness';
}

export const OrganizationStructuredData = ({ type = 'organization' }: OrganizationStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'organization' ? "Organization" : "LocalBusiness",
    "name": "Rev Konstriksyon",
    "alternateName": "Rev Konstriksyon Haiti",
    "url": "https://www.revkonstriksyon.com",
    "logo": "https://www.revkonstriksyon.com/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png",
    "description": "Konpani konstriksyon ak renovasyon prensipal nan Ayiti. Nou bay sèvis plan achitekti, siveyans chantye, ak konsèltasyon pwojè.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pòtoprens",
      "addressCountry": "HT"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+509-4762-4431",
      "contactType": "customer service",
      "email": "revkonstriksyon@gmail.com"
    },
    "sameAs": [
      "https://www.facebook.com/revkonstriksyon",
      "https://www.instagram.com/revkonstriksyon",
      "https://www.tiktok.com/@revkonstriksyon",
      "https://www.youtube.com/@revkonstriksyon"
    ],
    "priceRange": "$$"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export const BlogPostStructuredData = ({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url
}: BlogPostStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rev Konstriksyon",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.revkonstriksyon.com/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

interface ServiceStructuredDataProps {
  services: Array<{
    name: string;
    description: string;
  }>;
}

export const ServiceStructuredData = ({ services }: ServiceStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Rev Konstriksyon",
    "description": "Sèvis konstriksyon ak renovasyon konplè nan Ayiti",
    "url": "https://www.revkonstriksyon.com",
    "telephone": "+509-4762-4431",
    "email": "revkonstriksyon@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pòtoprens",
      "addressCountry": "HT"
    },
    "serviceOffered": services.map(service => ({
      "@type": "Service",
      "name": service.name,
      "description": service.description
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
