import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Assuming this is deployed to a custom domain like kanishkranjan.com
  // Update this canonical URL later if the actual deployment domain is different.
  const baseUrl = 'https://kanishkranjan.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add other routes here as the application grows
  ];
}
