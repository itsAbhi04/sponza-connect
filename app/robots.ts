import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/auth/',
        '/admin/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap: 'https://sponza.com/sitemap.xml',
    host: 'https://sponza.com',
  }
} 