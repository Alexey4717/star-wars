import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { SpeciesPage } from '@/pages/species';

export const Route = createFileRoute('/_layout/species/')({
  component: SpeciesPage,
  pendingComponent: createRoutePending('видов'),
  errorComponent: createRouteError('виды'),
});
