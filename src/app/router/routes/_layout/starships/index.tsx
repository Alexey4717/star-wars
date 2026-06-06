import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { StarshipsPage } from '@/pages/starships';

export const Route = createFileRoute('/_layout/starships/')({
  component: StarshipsPage,
  pendingComponent: createRoutePending('звездолётов'),
  errorComponent: createRouteError('звездолёты'),
});
