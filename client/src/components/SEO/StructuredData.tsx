
import React from 'react';
import SafeStructuredData from './SafeStructuredData';

interface OrganizationStructuredDataProps {
  type?: 'organization' | 'localBusiness';
}

export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({ 
  type = 'organization' 
}) => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": type === 'localBusiness' ? 'LocalBusiness' : 'Organization',
    "name": "Rev Konstriksyon",
    "alternateName": ["Rev Construction", "Rev Konstriksyon Haiti"],
    "description": "Firme de construction ak bureau d'étude prensipal nan Ayiti. Nou bay sèvis plan achitekti, deviz estimatif, renovasyon kay, siveyans chantye ak konsèltasyon pwojè.",
    "url": "https://www.revkonstriksyon.com",
    "logo": "https://www.revkonstriksyon.com/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png",
    "image": "https://www.revkonstriksyon.com/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png",
    "telephone": "+509 4762-4431",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Port-au-Prince",
      "addressCountry": "HT",
      "addressRegion": "Ouest"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.533333",
      "longitude": "-72.333333"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Haiti"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "18.533333",
        "longitude": "-72.333333"
      },
      "geoRadius": "100000"
    },
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "HTG,USD",
    "openingHours": "Mo-Fr 08:00-17:00, Sa 08:00-12:00",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Construction",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plan Achitekti",
            "description": "Konsepsyon ak kreye plan detaye pou pwojè konstriksyon yo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Renovasyon Kay",
            "description": "Renovasyon ak reamenajman kay ak espas yo"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Siveyans Chantye",
            "description": "Swivi ak jesyon pwofesyonèl nan travay konstriksyon yo"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Rev Konstriksyon Team"
    },
    "foundingDate": "2020",
    "numberOfEmployees": "10-50",
    "slogan": "Nou konstwi rèv ou yo ak ekspètiz, presizyon ak pasyon",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+509 4762-4431",
      "contactType": "customer service",
      "availableLanguage": ["Kreyòl", "Français", "English"]
    }
  };

  return (
    <SafeStructuredData>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </SafeStructuredData>
  );
};

interface ServiceStructuredDataProps {
  services: Array<{
    name: string;
    description: string;
  }>;
}

export const ServiceStructuredData: React.FC<ServiceStructuredDataProps> = ({ services }) => {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Services de Construction Rev Konstriksyon",
    "description": "Sèvis konstriksyon ak jesyon pwojè nou yo nan Ayiti",
    "numberOfItems": services.length,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
          "@type": "Organization",
          "name": "Rev Konstriksyon",
          "url": "https://www.revkonstriksyon.com"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Haiti"
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://www.revkonstriksyon.com/contact",
          "serviceName": "Contact Rev Konstriksyon"
        }
      }
    }))
  };

  return (
    <SafeStructuredData>
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>
    </SafeStructuredData>
  );
};

interface ProjectStructuredDataProps {
  project: {
    title: string;
    description: string;
    image_url?: string;
    date: string;
    location?: string;
    category?: string;
  };
}

export const ProjectStructuredData: React.FC<ProjectStructuredDataProps> = ({ project }) => {
  const projectData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": project.image_url,
    "dateCreated": project.date,
    "creator": {
      "@type": "Organization",
      "name": "Rev Konstriksyon",
      "url": "https://www.revkonstriksyon.com"
    },
    "locationCreated": project.location ? {
      "@type": "Place",
      "name": project.location,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "HT"
      }
    } : undefined,
    "about": project.category || "Construction",
    "inLanguage": "ht"
  };

  return (
    <SafeStructuredData>
      <script type="application/ld+json">
        {JSON.stringify(projectData)}
      </script>
    </SafeStructuredData>
  );
};

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  image?: string;
  url: string;
}

export const BlogPostStructuredData: React.FC<BlogPostStructuredDataProps> = ({
  title,
  description,
  author,
  datePublished,
  image,
  url
}) => {
  const blogData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "publisher": {
      "@type": "Organization",
      "name": "Rev Konstriksyon",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.revkonstriksyon.com/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "image": image ? {
      "@type": "ImageObject",
      "url": image
    } : undefined,
    "url": url,
    "inLanguage": "ht"
  };

  return (
    <SafeStructuredData>
      <script type="application/ld+json">
        {JSON.stringify(blogData)}
      </script>
    </SafeStructuredData>
  );
};
