import { getEnvString } from '@/common/utils/env.functions';

/**
 * Function to get the environment url based on the environment
 */
export const getEnvUrl = (type: 'api' | 'ws'): string => {
  const requireEnv = (varName: string) => {
    const value = getEnvString(varName);

    if (!value) {
      throw new Error(`${varName} is not defined in environment variables`);
    }

    return value;
  };

  switch (type) {
    case 'api':
      return requireEnv('VITE_API_URL');
    case 'ws':
      return requireEnv('VITE_WEBSOCKET_URL');
  }
};

/**
 * Function to get some axios error messages
 */
export const getAxiosErrorMessage = (type: 400 | 'other'): string => {
  switch (type) {
    case 400:
      return 'Invalid form data. Please check your inputs.';
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
};
