import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { PlanetsPage } from '@/pages/planets';

export const Route = createFileRoute('/_layout/planets/')({
  component: PlanetsPage,
  pendingComponent: createRoutePending('планет'),
  errorComponent: createRouteError('планеты'),
});
