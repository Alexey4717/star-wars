import { swapiFetch } from '@/common/api/swapiFetch';

import type { PlanetId } from './common/types';

export interface PlanetFilmRef {
  id: number;
  title: string;
}

export interface PlanetCharacterRef {
  id: number;
  name: string;
}

export const fetchPlanetFilms = (
  id: PlanetId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<PlanetFilmRef[]> => swapiFetch<PlanetFilmRef[]>(`/planets/${id}/films`, { signal });

export const fetchPlanetCharacters = (
  id: PlanetId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<PlanetCharacterRef[]> =>
  swapiFetch<PlanetCharacterRef[]>(`/planets/${id}/characters`, { signal });
