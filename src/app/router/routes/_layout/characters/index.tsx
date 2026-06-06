import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { CharactersPage } from '@/pages/characters';

export const Route = createFileRoute('/_layout/characters/')({
  component: CharactersPage,
  pendingComponent: createRoutePending('персонажей'),
  errorComponent: createRouteError('персонажей'),
});
