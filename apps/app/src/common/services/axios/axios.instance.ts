import { getEnvUrl } from '@/configs/app.config';

import axios from 'axios';

/**
 * Create an axios instance
 */
const http = axios.create({
  baseURL: getEnvUrl('api'),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

/**
 * Add a response interceptor
 */
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNRESET' && !error.config.__isRetry) {
      error.config.__isRetry = true;
      return http.request(error.config);
    }

    return Promise.reject(error);
  },
);

export default http;
