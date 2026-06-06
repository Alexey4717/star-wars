import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { TransportsPage } from '@/pages/transports';

export const Route = createFileRoute('/_layout/transports/')({
  component: TransportsPage,
  pendingComponent: createRoutePending('транспорта'),
  errorComponent: createRouteError('транспорт'),
});
