import { swapiFetch } from '@/common/api/swapiFetch';

import type { Transport, TransportId } from './types';

export const fetchTransports = ({ signal }: { signal?: AbortSignal } = {}): Promise<Transport[]> =>
  swapiFetch<Transport[]>('/transports', { signal });

export const fetchTransportById = (
  id: TransportId,
  { signal }: { signal?: AbortSignal } = {},
): Promise<Transport> => swapiFetch<Transport>(`/transports/${id}`, { signal });
