import { Query } from 'mobx-tanstack-query';
import { ViewModelBase } from 'mobx-view-model';

import { queryClient } from '@/common/query/queryClient';

import {
  type Character,
  type CharactersListQuery,
  type CharactersListQueryKey,
  characterQueryKeys,
  fetchCharacters,
} from '../common';

export class CharactersListViewModel extends ViewModelBase {
  private listQuery!: CharactersListQuery;
  private readonly queryKey: CharactersListQueryKey = characterQueryKeys.list();

  protected willMount() {
    this.listQuery = new Query({
      queryClient,
      queryKey: this.queryKey,
      queryFn: ({ signal }) => fetchCharacters({ signal }),
    });
  }

  protected willUnmount() {
    this.listQuery.destroy();
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
