import { useRouter } from '@tanstack/react-router';

import { ROUTES } from '@/common/navigation/routes.gen';

import { NotFoundPage } from '@/pages/notFound';

export const NotFoundRoute = () => {
  const router = useRouter();

  return <NotFoundPage onGoHome={() => router.navigate({ to: ROUTES.home })} />;
};
