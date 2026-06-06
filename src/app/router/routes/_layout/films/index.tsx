import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { FilmsPage } from '@/pages/films';

export const Route = createFileRoute('/_layout/films/')({
  component: FilmsPage,
  pendingComponent: createRoutePending('фильмов'),
  errorComponent: createRouteError('фильмы'),
});
