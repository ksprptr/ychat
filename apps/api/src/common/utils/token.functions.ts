import { getEnvString } from './env.functions';
import * as cookie from 'cookie';
import { Request, Response } from 'express';
import { AppConfig } from 'src/configs/app.config';

/**
 * Function to extract a token from cookies
 */
export const extractTokenFromCookies = (
  type: 'accessToken' | 'refreshToken',
  request: Request,
): string | undefined => {
  const rawCookie = request.headers.cookie;

  if (!rawCookie) {
    return;
  }

  const cookies = cookie.parse(rawCookie);

  return cookies[type];
};

/**
 * Function to add a token into response cookies
 */
export const addTokenToResponse = async (
  response: Response,
  type: 'accessToken' | 'refreshToken',
  value: string,
  options?: { maxAge?: number },
) => {
  const maxAgeSeconds = type === 'accessToken' ? 24 * 60 * 60 : 7 * 24 * 60 * 60;

  const serializedCookie = cookie.serialize(type, value, {
    domain: getEnvString('COOKIE_DOMAIN'),
    httpOnly: true,
    secure: AppConfig.isProduction(),
    sameSite: 'lax',
    maxAge: options?.maxAge ?? maxAgeSeconds,
    path: '/',
  });

  const existingCookies = response.getHeader('Set-Cookie');

  if (existingCookies) {
    const cookiesArray = Array.isArray(existingCookies)
      ? [...existingCookies, serializedCookie]
      : [existingCookies as string, serializedCookie];

    response.setHeader('Set-Cookie', cookiesArray);
  } else {
    response.setHeader('Set-Cookie', serializedCookie);
  }
};
