import { Query } from 'mobx-tanstack-query';
import { ViewModelBase } from 'mobx-view-model';

import { queryClient } from '@/common/query/queryClient';

import {
  fetchPlanetById,
  type Planet,
  type PlanetDetailQueryKey,
  planetQueryKeys,
} from '@/modules/planet/common';
import {
  fetchSpeciesById,
  type Species,
  type SpeciesDetailQueryKey,
  speciesQueryKeys,
} from '@/modules/species/common';

import { fetchCharacterById } from '../common/character.api';
import { type CharacterDetailQueryKey, characterQueryKeys } from '../common/queryKeys';
import type { Character } from '../common/types';

type CharacterDetailQuery = Query<Character, Error, Character, Character, CharacterDetailQueryKey>;
type PlanetDetailQuery = Query<Planet, Error, Planet, Planet, PlanetDetailQueryKey>;
type SpeciesDetailQuery = Query<Species, Error, Species, Species, SpeciesDetailQueryKey>;

export class CharacterDetailViewModel extends ViewModelBase<{ characterId: number }> {
  private characterQuery!: CharacterDetailQuery;
  private planetQuery: PlanetDetailQuery | null = null;
  private speciesQuery: SpeciesDetailQuery | null = null;

  protected willMount() {
    this.createCharacterQuery(this.payload.characterId);
  }

  protected willUnmount() {
    this.destroyRelatedQueries();
    this.characterQuery.destroy();
  }

  payloadChanged(payload: { characterId: number }, prevPayload: { characterId: number }) {
    if (payload.characterId === prevPayload.characterId) {
      return;
    }

    this.destroyRelatedQueries();
    this.characterQuery.destroy();
    this.createCharacterQuery(payload.characterId);
  }

  private createCharacterQuery(characterId: number) {
    this.characterQuery = new Query<
      Character,
      Error,
      Character,
      Character,
      CharacterDetailQueryKey
    >({
      queryClient,
      queryKey: characterQueryKeys.detail(characterId),
      queryFn: ({ signal }) => fetchCharacterById(characterId, { signal }),
    });

    this.characterQuery.onDone((character) => {
      this.setupRelatedQueries(character);
    });

    if (this.characterQuery.data) {
      this.setupRelatedQueries(this.characterQuery.data);
    }
  }

  private setupRelatedQueries(character: Character) {
    this.destroyRelatedQueries();

    this.planetQuery = new Query<Planet, Error, Planet, Planet, PlanetDetailQueryKey>({
      queryClient,
      queryKey: planetQueryKeys.detail(character.homeworld),
      queryFn: ({ signal }) => fetchPlanetById(character.homeworld, { signal }),
    });

    if (character.species_id) {
      this.speciesQuery = new Query<Species, Error, Species, Species, SpeciesDetailQueryKey>({
        queryClient,
        queryKey: speciesQueryKeys.detail(character.species_id),
        queryFn: ({ signal }) => fetchSpeciesById(character.species_id as number, { signal }),
      });
    }
  }

  private destroyRelatedQueries() {
    this.planetQuery?.destroy();
    this.planetQuery = null;
    this.speciesQuery?.destroy();
    this.speciesQuery = null;
  }

  get character(): Character | undefined {
    return this.characterQuery.data;
  }

  get speciesName(): string | undefined {
    return this.speciesQuery?.data?.name;
  }

  get homeworldName(): string | undefined {
    return this.planetQuery?.data?.name;
  }

  get metaLine(): string {
    const parts = ['Персонаж'];

    if (this.speciesName) {
      parts.push(this.speciesName);
    }

    if (this.homeworldName) {
      parts.push(this.homeworldName);
    }

    return parts.join(' · ');
  }

  get isCharacterLoading(): boolean {
    return this.characterQuery.isLoading;
  }

  get isCharacterReady(): boolean {
    return !!this.characterQuery.data && !this.characterQuery.isLoading;
  }

  get isRelatedLoading(): boolean {
    if (!this.isCharacterReady) {
      return false;
    }

    if (this.planetQuery?.isLoading) {
      return true;
    }

    if (this.character?.species_id && this.speciesQuery?.isLoading) {
      return true;
    }

    return false;
  }

  get isLoading(): boolean {
    if (this.characterQuery.isLoading) {
      return true;
    }

    return this.isRelatedLoading;
  }

  get error(): Error | null {
    return this.characterQuery.error;
  }
}
