import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { CharacterDetailPage } from '@/pages/characterDetails';

export const Route = createFileRoute('/_layout/characters/$characterId')({
  component: () => {
    const { characterId } = Route.useParams();
    return <CharacterDetailPage characterId={characterId} />;
  },
  pendingComponent: createRoutePending('персонажа'),
  errorComponent: createRouteError('персонажа', { notFoundTitle: 'Персонаж не найден' }),
});
