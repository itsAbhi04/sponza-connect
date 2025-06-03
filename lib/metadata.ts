import { Metadata, Viewport } from "next";
import defaultMetadata from "@/app/metadata";

type PageMetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  twitterImage?: string;
  noIndex?: boolean;
  canonical?: string;
  schema?: Record<string, any>;
};

// Separate viewport configuration
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
  };
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg",
  twitterImage = "/twitter-image.jpg",
  noIndex = false,
  canonical,
  schema,
}: PageMetadataProps): Metadata {
  const defaultTitle = "Sponza - Influencer Marketing Platform";
  const pageTitle = title 
    ? `${title} | Sponza` 
    : (typeof defaultMetadata.title === 'string' 
        ? defaultMetadata.title 
        : defaultTitle);
  
  const pageDescription = description || defaultMetadata.description || "";
  const pageKeywords = [...(defaultMetadata.keywords || []), ...keywords];
  const pageUrl = canonical || (defaultMetadata.metadataBase?.toString() || "https://sponza.in");

  // Remove viewport and themeColor from metadata
  const { viewport, themeColor, ...restMetadata } = defaultMetadata;

  return {
    ...restMetadata,
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    robots: noIndex
      ? { index: false, follow: false }
      : defaultMetadata.robots,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [twitterImage],
    },
    other: schema
      ? {
          "application/ld+json": JSON.stringify(schema),
        }
      : undefined,
  };
}

// Common schema generators
export const schemas = {
  faq: (faqs: Array<{ question: string; answer: string }>) => ({
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
  }),

  article: (article: {
    title: string;
    description: string;
    publishDate: string;
    modifiedDate: string;
    author: string;
    image: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Sponza",
      logo: {
        "@type": "ImageObject",
        url: "https://sponza.in/logo.png",
      },
    },
  }),

  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  pricing: (plans: Array<{
    name: string;
    description: string;
    price: number;
    currency: string;
    features: string[];
  }>) => ({
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.description,
      price: plan.price,
      priceCurrency: plan.currency,
      offers: plan.features.map((feature) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
      })),
    })),
  }),
}; 