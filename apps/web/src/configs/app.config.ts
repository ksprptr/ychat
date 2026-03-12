import { MetadataConfig } from '@/common/types/metadata.types';
import { getEnvString } from '@/common/utils/env.functions';

/**
 * Web metadata configuration
 */
export const metadataConfig: MetadataConfig = {
  title: 'yChat - Simple, Fast, and Easy Communication',
  shortTitle: 'yChat',
  description:
    'yChat is a simple and modern chat application designed for fast and reliable communication. The project focuses on providing an intuitive user experience while using modern technologies and development principles.',
  keywords: [
    'yChat',
    'chat application',
    'real-time communication',
    'modern web app',
    'simple chat',
    'fast messaging',
    'reliable communication',
    'intuitive user experience',
    'modern technologies',
    'development principles',
  ],
  colors: {
    background: '#fafafa',
    theme: '#fafafa',
  },
};

/**
 * Function to get the environment url based on the environment
 */
export const getEnvUrl = (type: 'app'): string => {
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
  }
};
