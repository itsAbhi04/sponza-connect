import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sponza.in'
  
  // Core pages
  const routes = [
    '',
    '/about',
    '/contact',
    '/pricing',
    '/features',
    '/blog',
    '/docs',
    '/security',
    '/privacy',
    '/terms',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog posts (example - you would typically fetch this from your database)
  const blogPosts = [
    {
      slug: 'getting-started-with-influencer-marketing',
      lastModified: new Date('2024-01-15'),
    },
    {
      slug: 'how-to-create-successful-campaigns',
      lastModified: new Date('2024-01-10'),
    },
    // Add more blog posts here
  ].map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Documentation pages
  const docsPages = [
    '/docs/getting-started',
    '/docs/api-reference',
    '/docs/authentication',
    '/docs/webhooks',
    '/docs/sdks',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogPosts, ...docsPages]
} 