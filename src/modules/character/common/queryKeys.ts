export const characterQueryKeys = {
  all: ['characters'] as const,
  list: () => [...characterQueryKeys.all] as const,
  detail: (id: number) => [...characterQueryKeys.all, id] as const,
};

export type CharactersListQueryKey = ReturnType<typeof characterQueryKeys.list>;
export type CharacterDetailQueryKey = ReturnType<typeof characterQueryKeys.detail>;
