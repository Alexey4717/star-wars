import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { VehiclesPage } from '@/pages/vehicles';

export const Route = createFileRoute('/_layout/vehicles/')({
  component: VehiclesPage,
  pendingComponent: createRoutePending('транспортных средств'),
  errorComponent: createRouteError('транспортные средства'),
});
