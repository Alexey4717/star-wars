import { swapiFetch } from '@/common/api/swapiFetch';

import type { Character } from '@/modules/character/common/types';

import type { SpeciesId } from './common/types';

export const fetchSpeciesCharacters = (
  id: SpeciesId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Character[]> => swapiFetch<Character[]>(`/species/${id}/characters`, { signal });
