import react from '@vitejs/plugin-react';
import type { PluginOption } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

export function plugins(isBuild: boolean): PluginOption[] {
  const pluginList: (PluginOption | false | null | undefined)[] = [
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
