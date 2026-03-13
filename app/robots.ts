import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://kanishkranjan.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example of disallowed route, can be adjusted
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
