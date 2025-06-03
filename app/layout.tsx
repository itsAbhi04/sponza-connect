import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import defaultMetadata from './metadata'
import { generateMetadata, generateViewport } from "@/lib/metadata"

const inter = Inter({ subsets: ['latin'] })

export const viewport = generateViewport()

export const metadata: Metadata = generateMetadata({
  title: "Sponza - Influencer Marketing Platform",
  description: "Connect with influencers, manage campaigns, and grow your brand with Sponza's comprehensive influencer marketing platform.",
  keywords: [
    "influencer marketing",
    "brand collaboration",
    "influencer platform",
    "campaign management",
    "social media marketing",
    "influencer discovery",
    "brand partnerships",
    "content creator platform",
  ],
  ogImage: "/og-image.jpg",
  twitterImage: "/twitter-image.jpg",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sponza" />
        <meta name="application-name" content="Sponza" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7c3aed" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://sponza.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Sponza",
              "url": "https://sponza.in",
              "logo": "https://sponza.in/logo.png",
              "sameAs": [
                "https://twitter.com/sponza",
                "https://linkedin.com/company/sponza",
                "https://facebook.com/sponza",
                "https://instagram.com/sponza"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "support@sponza.in",
                "availableLanguage": ["English", "Hindi"]
              }
            })
          }}
        /> 
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
