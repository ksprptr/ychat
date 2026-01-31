import { getEnvUrl } from '@/configs/app.config';

import { MetadataRoute } from 'next';

/**
 * Function to generate a robots file
 */
export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `${getEnvUrl('app')}/sitemap.xml`,
    host: getEnvUrl('app'),
  };
}
