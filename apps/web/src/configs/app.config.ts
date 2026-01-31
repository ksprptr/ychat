import { MetadataConfig } from '@/common/types/metadata.types';
import { getEnvString } from '@/common/utils/env.functions';

import nextConfig from '../../next.config';

// Is production environment?
export const isProduction = getEnvString('NODE_ENV') === 'production';

// Allowed cdn hosts
export const allowedCdnHosts: string[] =
  nextConfig.images?.remotePatterns?.map((pattern) => pattern.hostname) || ([] as string[]);

/**
 * Web metadata configuration
 */
export const metadataConfig: MetadataConfig = {
  title: '',
  shortTitle: '',
  description: '',
  keywords: [],
  colors: {
    background: '#000000',
    theme: '#000000',
  },
};

/**
 * Function to get the environment url based on the environment
 */
export const getEnvUrl = (type: 'app' | 'api'): string => {
  const requireEnv = (varName: string) => {
    const value = getEnvString(varName);

    if (!value) {
      throw new Error(`${varName} is not defined in environment variables`);
    }

    return value;
  };

  switch (type) {
    case 'app':
      return requireEnv('NEXT_PUBLIC_APP_URL');
    case 'api':
      return requireEnv('NEXT_PUBLIC_API_URL');
  }
};
