import { Query } from 'mobx-tanstack-query';
import { ViewModelBase } from 'mobx-view-model';

import { queryClient } from '@/common/query/queryClient';

import { fetchCharacters } from '../common/character.api';
import { type CharactersListQueryKey, characterQueryKeys } from '../common/queryKeys';
import type { Character } from '../common/types';

type CharactersListQuery = Query<
  Character[],
  Error,
  Character[],
  Character[],
  CharactersListQueryKey
>;

export class CharactersListViewModel extends ViewModelBase {
  private listQuery!: CharactersListQuery;
  private readonly queryKey: CharactersListQueryKey = characterQueryKeys.list();

  protected willMount() {
    this.listQuery = new Query<
      Character[],
      Error,
      Character[],
      Character[],
      CharactersListQueryKey
    >({
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
