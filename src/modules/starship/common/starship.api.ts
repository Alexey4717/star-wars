import { swapiFetch } from '@/common/api/swapiFetch';

import type { Starship, StarshipId } from './types';

export const fetchStarships = ({ signal }: { signal?: AbortSignal } = {}): Promise<Starship[]> =>
  swapiFetch<Starship[]>('/starships', { signal });

export const fetchStarshipById = (
  id: StarshipId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Starship> => swapiFetch<Starship>(`/starships/${id}`, { signal });
