import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { StarshipDetailPage } from '@/pages/starshipDetails';

export const Route = createFileRoute('/_layout/starships/$starshipId')({
  component: () => {
    const { starshipId } = Route.useParams();
    return <StarshipDetailPage starshipId={starshipId} />;
  },
  pendingComponent: createRoutePending('звездолёта'),
  errorComponent: createRouteError('звездолёт', { notFoundTitle: 'Звездолёт не найден' }),
});
