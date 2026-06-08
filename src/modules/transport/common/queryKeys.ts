export const transportQueryKeys = {
  all: ['transports'] as const,
  list: () => [...transportQueryKeys.all] as const,
  detail: (id: number) => [...transportQueryKeys.all, id] as const,
};

export type TransportsListQueryKey = ReturnType<typeof transportQueryKeys.list>;
export type TransportDetailQueryKey = ReturnType<typeof transportQueryKeys.detail>;
