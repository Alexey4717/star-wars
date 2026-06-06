import { createContext, type ReactNode, useContext, useMemo } from 'react';

import type { QueryClient } from 'mobx-tanstack-query';

import { CharacterDetailViewModel } from './characterDetail.vm';

const CharacterDetailVmContext = createContext<CharacterDetailViewModel | null>(null);

interface CharacterDetailVmProviderProps {
  children: ReactNode;
  queryClient: QueryClient;
  characterId: string;
}

export const CharacterDetailVmProvider = ({
  children,
  queryClient,
  characterId,
}: CharacterDetailVmProviderProps) => {
  const numericId = Number(characterId);

  const viewModel = useMemo(
    () => new CharacterDetailViewModel(queryClient, numericId),
    [queryClient, numericId],
  );

  return (
    <CharacterDetailVmContext.Provider value={viewModel}>
      {children}
    </CharacterDetailVmContext.Provider>
  );
};

export const useCharacterDetailVm = (): CharacterDetailViewModel => {
  const viewModel = useContext(CharacterDetailVmContext);

  if (!viewModel) {
    throw new Error('useCharacterDetailVm must be used within CharacterDetailVmProvider');
  }

  return viewModel;
};
