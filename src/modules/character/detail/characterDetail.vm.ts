import { Query } from 'mobx-tanstack-query';
import { ViewModelBase } from 'mobx-view-model';

import { queryClient } from '@/common/query/queryClient';

import {
  fetchPlanetById,
  type Planet,
  type PlanetDetailQuery,
  planetQueryKeys,
} from '@/modules/planet/common';
import {
  fetchSpeciesById,
  type Species,
  type SpeciesDetailQuery,
  speciesQueryKeys,
} from '@/modules/species/common';

import { type CharacterDetailQuery, characterQueryKeys, fetchCharacterById } from '../common';
import type { Character } from '../common/types';
import { selectCharacterMetaLine } from './characterDetail.selectors';

export class CharacterDetailViewModel extends ViewModelBase<{ characterId: number }> {
  private characterQuery!: CharacterDetailQuery;
  private planetQuery: PlanetDetailQuery | null = null;
  private speciesQuery: SpeciesDetailQuery | null = null;

  protected willMount() {
    this.initCharacterQuery(this.payload.characterId);
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
    this.initCharacterQuery(payload.characterId);
  }

  private initCharacterQuery(characterId: number) {
    this.characterQuery = new Query({
      queryClient,
      queryKey: characterQueryKeys.detail(characterId),
      queryFn: ({ signal }) => fetchCharacterById(characterId, { signal }),
    });

    this.characterQuery.onDone((character) => {
      this.initRelatedQueries(character);
    });

    if (this.characterQuery.data) {
      this.initRelatedQueries(this.characterQuery.data);
    }
  }

  private initRelatedQueries(character: Character) {
    this.destroyRelatedQueries();

    this.planetQuery = new Query({
      queryClient,
      queryKey: planetQueryKeys.detail(character.homeworld),
      queryFn: ({ signal }) => fetchPlanetById(character.homeworld, { signal }),
    });

    if (character.species_id) {
      this.speciesQuery = new Query({
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

  get isCharacterLoading(): boolean {
    return this.characterQuery.isLoading;
  }

  get characterError(): Error | null {
    return this.characterQuery.error;
  }

  get planet(): Planet | undefined {
    return this.planetQuery?.data;
  }

  get isPlanetLoading(): boolean {
    return this.planetQuery?.isLoading ?? false;
  }

  get planetError(): Error | null {
    return this.planetQuery?.error ?? null;
  }

  get species(): Species | undefined {
    return this.speciesQuery?.data;
  }

  get isSpeciesLoading(): boolean {
    if (!this.character?.species_id) {
      return false;
    }

    return this.speciesQuery?.isLoading ?? false;
  }

  get speciesError(): Error | null {
    return this.speciesQuery?.error ?? null;
  }

  get metaLine(): string {
    return selectCharacterMetaLine({
      species: this.species,
      planet: this.planet,
    });
  }
}
