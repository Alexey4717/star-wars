import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { HomePage } from '@/pages/home';

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
  pendingComponent: createRoutePending('главной'),
  errorComponent: createRouteError('главную'),
});
