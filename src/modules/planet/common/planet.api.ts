import { swapiFetch } from '@/common/api/swapiFetch';

import type { Planet, PlanetId } from './types';

export const fetchPlanets = ({ signal }: { signal?: AbortSignal } = {}): Promise<Planet[]> =>
  swapiFetch<Planet[]>('/planets', { signal });

export const fetchPlanetById = (
  id: PlanetId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Planet> => swapiFetch<Planet>(`/planets/${id}`, { signal });
