import { swapiFetch } from '@/common/api/swapiFetch';

import type { Character, CharacterId } from './types';

export const fetchCharacters = (): Promise<Character[]> => swapiFetch<Character[]>('/characters');

export const fetchCharacterById = (id: CharacterId): Promise<Character> =>
  swapiFetch<Character>(`/characters/${id}`);
