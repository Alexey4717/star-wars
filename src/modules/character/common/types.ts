import type { Query } from 'mobx-tanstack-query';

import type { CharacterDetailQueryKey, CharactersListQueryKey } from './queryKeys';

export interface Character {
  id: number;
  name: string;
  gender: string;
  skin_color: string;
  hair_color: string;
  height: string;
  eye_color: string;
  mass: string;
  homeworld: number;
  birth_year: string;
  species_id?: number;
}

export type CharacterId = Character['id'];

export type CharacterDetailQuery = Query<
  Character,
  Error,
  Character,
  Character,
  CharacterDetailQueryKey
>;

export type CharactersListQuery = Query<
  Character[],
  Error,
  Character[],
  Character[],
  CharactersListQueryKey
>;
