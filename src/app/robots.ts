import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/.well-known/', '/admin/'],
    },
    sitemap: 'https://tregioia.com/sitemap.xml',
  }
}