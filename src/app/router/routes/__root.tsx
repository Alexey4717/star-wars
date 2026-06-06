import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { AppProviders } from '../../providers/AppProviders';

export type RouterContext = Record<string, never>;

const RootComponent = () => (
  <AppProviders>
    <Outlet />
  </AppProviders>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
