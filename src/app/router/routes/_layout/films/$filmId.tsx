import { createFileRoute } from '@tanstack/react-router';

import { createRouteError } from '@/common/ui/ErrorBoundary/ErrorBoundary';
import { createRoutePending } from '@/common/ui/RoutePending/RoutePending';

import { FilmDetailPage } from '@/pages/filmDetails';

export const Route = createFileRoute('/_layout/films/$filmId')({
  component: () => {
    const { filmId } = Route.useParams();
    return <FilmDetailPage filmId={filmId} />;
  },
  pendingComponent: createRoutePending('фильма'),
  errorComponent: createRouteError('фильм', { notFoundTitle: 'Фильм не найден' }),
});
