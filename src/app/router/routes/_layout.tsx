import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppLayout } from '../../layout/AppLayout/AppLayout';

const LayoutComponent = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});
