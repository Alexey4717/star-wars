import { swapiFetch } from '@/common/api/swapiFetch';

import type { Vehicle, VehicleId } from './types';

export const fetchVehicles = ({ signal }: { signal?: AbortSignal } = {}): Promise<Vehicle[]> =>
  swapiFetch<Vehicle[]>('/vehicles', { signal });

export const fetchVehicleById = (
  id: VehicleId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Vehicle> => swapiFetch<Vehicle>(`/vehicles/${id}`, { signal });
