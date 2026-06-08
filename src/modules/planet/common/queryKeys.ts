export const planetQueryKeys = {
  all: ['planets'] as const,
  list: () => [...planetQueryKeys.all] as const,
  detail: (id: number) => [...planetQueryKeys.all, id] as const,
};

export type PlanetsListQueryKey = ReturnType<typeof planetQueryKeys.list>;
export type PlanetDetailQueryKey = ReturnType<typeof planetQueryKeys.detail>;
