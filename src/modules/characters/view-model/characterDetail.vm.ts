import { Query } from 'mobx-tanstack-query';
import { ViewModelBase } from 'mobx-view-model';

import { queryClient } from '@/common/query/queryClient';

import { fetchCharacterById } from '../model/characters.api';
import { type CharacterDetailQueryKey, characterQueryKeys } from '../model/queryKeys';
import type { Character } from '../model/types';

type CharacterDetailQuery = Query<Character, Error, Character, Character, CharacterDetailQueryKey>;

export class CharacterDetailViewModel extends ViewModelBase<{ characterId: number }> {
  private detailQuery!: CharacterDetailQuery;
  private queryKey: CharacterDetailQueryKey = characterQueryKeys.detail(this.payload.characterId);

  protected willMount() {
    this.createDetailQuery(this.payload.characterId);
  }

  protected willUnmount() {
    this.detailQuery.destroy();
  }

  payloadChanged(payload: { characterId: number }, prevPayload: { characterId: number }) {
    if (payload.characterId === prevPayload.characterId) {
      return;
    }

    this.detailQuery.destroy();
    this.createDetailQuery(payload.characterId);
  }

  private createDetailQuery(characterId: number) {
    this.queryKey = characterQueryKeys.detail(characterId);
    this.detailQuery = new Query<Character, Error, Character, Character, CharacterDetailQueryKey>({
      queryClient,
      queryKey: this.queryKey,
      queryFn: ({ signal }) => fetchCharacterById(characterId, { signal }),
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
