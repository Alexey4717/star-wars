import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import type { PluginOption } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

import { generateRoutesPlugin } from './generateRoutesPlugin';

export function plugins(isBuild: boolean): PluginOption[] {
  const pluginList: (PluginOption | false | null | undefined)[] = [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/app/router/routes',
      generatedRouteTree: './src/app/router/routeTree.gen.ts',
      routeFileIgnorePrefix: '-',
    }),
    generateRoutesPlugin(),
    react(),
    svgr(),
    !isBuild &&
      checker({
        typescript: { tsconfigPath: './tsconfig.app.json' },
        overlay: { initialIsOpen: 'error' },
      }),
  ];

  return pluginList.filter((plugin): plugin is PluginOption => Boolean(plugin));
}
