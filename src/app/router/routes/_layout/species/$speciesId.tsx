import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { SpeciesDetailPage } from '@/pages/speciesDetails';

export const Route = createFileRoute('/_layout/species/$speciesId')({
  component: () => {
    const { speciesId } = Route.useParams();
    return <SpeciesDetailPage speciesId={speciesId} />;
  },
  pendingComponent: createRoutePending('вида'),
  errorComponent: createRouteError('вид', { notFoundTitle: 'Вид не найден' }),
});
