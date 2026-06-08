import { SwapiHttpError } from './SwapiHttpError';
import { SWAPI_BASE_URL } from './swapi.config';

export const swapiFetch = async <T>(path: string, ...rest: [init?: RequestInit]): Promise<T> => {
  const response = await fetch(`${SWAPI_BASE_URL}${path}`, ...rest);

  if (!response.ok) {
    throw new SwapiHttpError(response.status, `SWAPI request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as T;
};
