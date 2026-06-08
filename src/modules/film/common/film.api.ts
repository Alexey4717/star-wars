import { swapiFetch } from '@/common/api/swapiFetch';

import type { Film, FilmId } from './types';

export const fetchFilms = ({ signal }: { signal?: AbortSignal } = {}): Promise<Film[]> =>
  swapiFetch<Film[]>('/films', { signal });

export const fetchFilmById = (
  id: FilmId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Film> => swapiFetch<Film>(`/films/${id}`, { signal });
