import type { QueryClient } from 'mobx-tanstack-query';
import { Query } from 'mobx-tanstack-query';

import { fetchCharacterById } from '../model/characters.api';
import { characterQueryKeys } from '../model/queryKeys';
import type { Character } from '../model/types';

export class CharacterDetailViewModel {
  private readonly detailQuery;

  constructor(queryClient: QueryClient, characterId: number) {
    this.detailQuery = new Query({
      queryClient,
      queryKey: characterQueryKeys.detail(characterId),
      queryFn: () => fetchCharacterById(characterId),
    });
  }

  get character(): Character | undefined {
    return this.detailQuery.data;
  }

  get isLoading(): boolean {
    return this.detailQuery.isLoading;
  }

  get error(): Error | null {
    return this.detailQuery.error;
  }
}
