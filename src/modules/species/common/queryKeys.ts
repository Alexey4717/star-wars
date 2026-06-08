export const speciesQueryKeys = {
  all: ['species'] as const,
  list: () => [...speciesQueryKeys.all] as const,
  detail: (id: number) => [...speciesQueryKeys.all, id] as const,
};

export type SpeciesListQueryKey = ReturnType<typeof speciesQueryKeys.list>;
export type SpeciesDetailQueryKey = ReturnType<typeof speciesQueryKeys.detail>;
