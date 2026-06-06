import { configure } from 'mobx';

export const configureMobx = (): void => {
  configure({
    enforceActions: import.meta.env.DEV ? 'observed' : 'never',
  });
};
