import { createRouter } from '@tanstack/react-router';

import { ErrorBoundary } from '@/common/ui/ErrorBoundary/ErrorBoundary';

import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {},
  defaultErrorComponent: ErrorBoundary,
  defaultPendingMs: 300,
  defaultPendingMinMs: 200,
});

export type AppRouter = typeof router;
