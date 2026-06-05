import type { UserConfig } from 'vite';

export const resolveConfig: UserConfig['resolve'] = {
  tsconfigPaths: true,
};
