import { swapiFetch } from '@/common/api/swapiFetch';

import type { StarshipId } from './common/types';

export interface StarshipCharacterRef {
  id: number;
  name: string;
}

export const fetchStarshipCharacters = (
  id: StarshipId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<StarshipCharacterRef[]> =>
  swapiFetch<StarshipCharacterRef[]>(`/starships/${id}/characters`, { signal });
