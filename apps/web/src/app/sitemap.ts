import { getEnvUrl } from '@/configs/app.config';

import { MetadataRoute } from 'next';

/**
 * Function to generate a sitemap file
 */
export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getEnvUrl('app'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
