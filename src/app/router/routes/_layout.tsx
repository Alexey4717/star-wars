import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppLayout } from '../../layout/AppLayout/AppLayout';
import { NotFoundRoute } from '../NotFoundRoute';

const LayoutComponent = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  notFoundComponent: NotFoundRoute,
});
