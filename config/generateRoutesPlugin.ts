import type { Plugin } from 'vite';

import { generateRoutes } from './generateRoutes';

const ROUTE_TREE_SEGMENT = `${'src/app/router/routeTree.gen.ts'}`;
const ROUTES_DIRECTORY_SEGMENT = `${'src/app/router/routes'}`;

const shouldRegenerate = (filePath: string): boolean =>
  filePath.replaceAll('\\', '/').includes(ROUTE_TREE_SEGMENT) ||
  filePath.replaceAll('\\', '/').includes(ROUTES_DIRECTORY_SEGMENT);

export const generateRoutesPlugin = (): Plugin => ({
  name: 'generate-routes',
  enforce: 'post',
  buildStart() {
    generateRoutes();
  },
  watchChange(file) {
    if (shouldRegenerate(file)) {
      generateRoutes();
    }
  },
});
