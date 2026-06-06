import { createContext, type ReactNode, useContext, useMemo } from 'react';

import type { QueryClient } from 'mobx-tanstack-query';

import { CharactersListViewModel } from './charactersList.vm';

const CharactersListVmContext = createContext<CharactersListViewModel | null>(null);

interface CharactersListVmProviderProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export const CharactersListVmProvider = ({
  children,
  queryClient,
}: CharactersListVmProviderProps) => {
  const viewModel = useMemo(() => new CharactersListViewModel(queryClient), [queryClient]);

  return (
    <CharactersListVmContext.Provider value={viewModel}>
      {children}
    </CharactersListVmContext.Provider>
  );
};

export const useCharactersListVm = (): CharactersListViewModel => {
  const viewModel = useContext(CharactersListVmContext);

  if (!viewModel) {
    throw new Error('useCharactersListVm must be used within CharactersListVmProvider');
  }

  return viewModel;
};
