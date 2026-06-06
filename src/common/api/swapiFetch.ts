import { SwapiHttpError } from './SwapiHttpError';
import { SWAPI_BASE_URL } from './swapi.config';

export const swapiFetch = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${SWAPI_BASE_URL}${path}`);

  if (!response.ok) {
    throw new SwapiHttpError(response.status, `SWAPI request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as T;
};
