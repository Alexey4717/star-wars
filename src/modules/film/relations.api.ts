import { swapiFetch } from '@/common/api/swapiFetch';

import type { FilmId } from './common/types';

export interface FilmCharacterRef {
  id: number;
  name: string;
}

export interface FilmPlanetRef {
  id: number;
  name: string;
}

export interface FilmSpeciesRef {
  id: number;
  name: string;
}

export interface FilmStarshipRef {
  id: number;
  name: string;
}

export interface FilmVehicleRef {
  id: number;
  name: string;
}

export const fetchFilmCharacters = (
  id: FilmId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<FilmCharacterRef[]> =>
  swapiFetch<FilmCharacterRef[]>(`/films/${id}/characters`, { signal });

export const fetchFilmPlanets = (
  id: FilmId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<FilmPlanetRef[]> => swapiFetch<FilmPlanetRef[]>(`/films/${id}/planets`, { signal });

export const fetchFilmSpecies = (
  id: FilmId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<FilmSpeciesRef[]> => swapiFetch<FilmSpeciesRef[]>(`/films/${id}/species`, { signal });

export const fetchFilmStarships = (
  id: FilmId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<FilmStarshipRef[]> =>
  swapiFetch<FilmStarshipRef[]>(`/films/${id}/starships`, { signal });

export const fetchFilmVehicles = (
  id: FilmId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<FilmVehicleRef[]> => swapiFetch<FilmVehicleRef[]>(`/films/${id}/vehicles`, { signal });
