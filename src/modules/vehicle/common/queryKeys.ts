export const vehicleQueryKeys = {
  all: ['vehicles'] as const,
  list: () => [...vehicleQueryKeys.all] as const,
  detail: (id: number) => [...vehicleQueryKeys.all, id] as const,
};

export type VehiclesListQueryKey = ReturnType<typeof vehicleQueryKeys.list>;
export type VehicleDetailQueryKey = ReturnType<typeof vehicleQueryKeys.detail>;
