import { RouterProvider } from '@tanstack/react-router';

import { router } from './router/router';

export const App = () => {
  return <RouterProvider router={router} />;
};
