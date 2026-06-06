import type { QueryClient } from 'mobx-tanstack-query';
import { Query } from 'mobx-tanstack-query';

import { fetchCharacters } from '../model/characters.api';
import { characterQueryKeys } from '../model/queryKeys';
import type { Character } from '../model/types';

export class CharactersListViewModel {
  private readonly listQuery;

  constructor(queryClient: QueryClient) {
    this.listQuery = new Query({
      queryClient,
      queryKey: characterQueryKeys.list(),
      queryFn: () => fetchCharacters(),
    });
  }

  get characters(): Character[] {
    return this.listQuery.data ?? [];
  }

  get isLoading(): boolean {
    return this.listQuery.isLoading;
  }

  get error(): Error | null {
    return this.listQuery.error;
  }
}
