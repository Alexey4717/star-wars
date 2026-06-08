import { swapiFetch } from '@/common/api/swapiFetch';

import type { CharacterId } from './common/types';

export interface CharacterFilmRef {
  id: number;
  title: string;
}

export const fetchCharacterFilms = (
  id: CharacterId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<CharacterFilmRef[]> =>
  swapiFetch<CharacterFilmRef[]>(`/characters/${id}/films`, { signal });
