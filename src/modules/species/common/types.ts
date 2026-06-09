import type { Query } from 'mobx-tanstack-query';

import type { SpeciesDetailQueryKey } from './queryKeys';

export interface Species {
  id: number;
  name: string;
  classification: string;
  designation: string;
  eye_colors: string;
  skin_colors: string;
  language: string;
  hair_colors: string;
  homeworld: number | null;
  average_lifespan: string;
  average_height: string;
}

export type SpeciesId = Species['id'];

export type SpeciesDetailQuery = Query<Species, Error, Species, Species, SpeciesDetailQueryKey>;
