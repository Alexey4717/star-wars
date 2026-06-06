import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { PlanetDetailPage } from '@/pages/planetDetails';

export const Route = createFileRoute('/_layout/planets/$planetId')({
  component: () => {
    const { planetId } = Route.useParams();
    return <PlanetDetailPage planetId={planetId} />;
  },
  pendingComponent: createRoutePending('планеты'),
  errorComponent: createRouteError('планету', { notFoundTitle: 'Планета не найдена' }),
});
