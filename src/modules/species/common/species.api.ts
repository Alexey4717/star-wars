import { swapiFetch } from '@/common/api/swapiFetch';

import type { Species, SpeciesId } from './types';

export const fetchSpecies = ({ signal }: { signal?: AbortSignal } = {}): Promise<Species[]> =>
  swapiFetch<Species[]>('/species', { signal });

export const fetchSpeciesById = (
  id: SpeciesId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Species> => swapiFetch<Species>(`/species/${id}`, { signal });
