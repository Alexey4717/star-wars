export const starshipQueryKeys = {
  all: ['starships'] as const,
  list: () => [...starshipQueryKeys.all] as const,
  detail: (id: number) => [...starshipQueryKeys.all, id] as const,
};

export type StarshipsListQueryKey = ReturnType<typeof starshipQueryKeys.list>;
export type StarshipDetailQueryKey = ReturnType<typeof starshipQueryKeys.detail>;
