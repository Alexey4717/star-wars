import { observer } from 'mobx-react-lite';

import { queryClient } from '@/common/query/queryClient';
import { Page } from '@/common/ui/Page/Page';

import {
  CharactersListView,
  CharactersListVmProvider,
  useCharactersListVm,
} from '@/modules/characters';

const CharactersPageContent = observer(() => {
  const viewModel = useCharactersListVm();

  if (viewModel.isLoading) {
    return <Page title="Персонажи">Загрузка...</Page>;
  }

  if (viewModel.error) {
    throw viewModel.error;
  }

  return (
    <Page title="Персонажи">
      <CharactersListView characters={viewModel.characters} />
    </Page>
  );
});

export const CharactersPage = () => (
  <CharactersListVmProvider queryClient={queryClient}>
    <CharactersPageContent />
  </CharactersListVmProvider>
);
