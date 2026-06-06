import { useRouter } from '@tanstack/react-router';

import { NotFoundPage } from '@/pages/notFound';

export const NotFoundRoute = () => {
  const router = useRouter();

  return <NotFoundPage onGoHome={() => router.navigate({ to: '/' })} />;
};
