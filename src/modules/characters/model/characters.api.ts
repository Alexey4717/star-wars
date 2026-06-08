import { swapiFetch } from '@/common/api/swapiFetch';

import type { Character, CharacterId } from './types';

export const fetchCharacters = ({ signal }: { signal?: AbortSignal } = {}): Promise<Character[]> =>
  swapiFetch<Character[]>('/characters', { signal });

export const fetchCharacterById = (
  id: CharacterId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Character> => swapiFetch<Character>(`/characters/${id}`, { signal });
