import { Metadata } from "next";

const defaultMetadata: Metadata = {
  metadataBase: new URL("https://sponza.in"),
  title: {
    default: "Sponza - Influencer Marketing Platform",
    template: "%s | Sponza",
  },
  description: "Sponza is a leading influencer marketing platform connecting brands with content creators. Manage campaigns, discover influencers, and track performance in one place.",
  keywords: [
    "influencer marketing",
    "content creators",
    "brand collaboration",
    "social media marketing",
    "influencer platform",
    "campaign management",
    "creator economy",
    "brand partnerships",
    "social media influencers",
    "marketing platform",
  ],
  authors: [{ name: "Sponza Technologies Pvt. Ltd." }],
  creator: "Sponza Technologies Pvt. Ltd.",
  publisher: "Sponza Technologies Pvt. Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sponza.in",
    siteName: "Sponza",
    title: "Sponza - Influencer Marketing Platform",
    description: "Connect with influencers, manage campaigns, and grow your brand with Sponza's influencer marketing platform.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sponza - Influencer Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponza - Influencer Marketing Platform",
    description: "Connect with influencers, manage campaigns, and grow your brand with Sponza's influencer marketing platform.",
    images: ["/twitter-image.jpg"],
    creator: "@sponza",
    site: "@sponza",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  alternates: {
    canonical: "https://sponza.in",
    languages: {
      "en-IN": "https://sponza.in",
      "hi-IN": "https://sponza.in/hi",
    },
  },
};

export default defaultMetadata; 