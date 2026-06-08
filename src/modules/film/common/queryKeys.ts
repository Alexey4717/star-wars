export const filmQueryKeys = {
  all: ['films'] as const,
  list: () => [...filmQueryKeys.all] as const,
  detail: (id: number) => [...filmQueryKeys.all, id] as const,
};

export type FilmsListQueryKey = ReturnType<typeof filmQueryKeys.list>;
export type FilmDetailQueryKey = ReturnType<typeof filmQueryKeys.detail>;
