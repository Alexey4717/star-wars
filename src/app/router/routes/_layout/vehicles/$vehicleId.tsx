import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { VehicleDetailPage } from '@/pages/vehicleDetails';

export const Route = createFileRoute('/_layout/vehicles/$vehicleId')({
  component: () => {
    const { vehicleId } = Route.useParams();
    return <VehicleDetailPage vehicleId={vehicleId} />;
  },
  pendingComponent: createRoutePending('транспортного средства'),
  errorComponent: createRouteError('транспортное средство', {
    notFoundTitle: 'Транспортное средство не найдено',
  }),
});
