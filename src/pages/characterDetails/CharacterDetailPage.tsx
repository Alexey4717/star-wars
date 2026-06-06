import { observer } from 'mobx-react-lite';

import { queryClient } from '@/common/query/queryClient';
import { Page } from '@/common/ui/Page/Page';

import {
  CharacterDetailView,
  CharacterDetailVmProvider,
  useCharacterDetailVm,
} from '@/modules/characters';

interface CharacterDetailPageProps {
  characterId: string;
}

const CharacterDetailPageContent = observer(({ characterId }: CharacterDetailPageProps) => {
  const viewModel = useCharacterDetailVm();

  if (viewModel.isLoading) {
    return <Page title={`Персонаж ${characterId}`}>Загрузка...</Page>;
  }

  if (viewModel.error) {
    throw viewModel.error;
  }

  if (!viewModel.character) {
    return <Page title={`Персонаж ${characterId}`}>Нет данных</Page>;
  }

  return (
    <Page title={`Персонаж ${characterId}`}>
      <CharacterDetailView character={viewModel.character} />
    </Page>
  );
});

export const CharacterDetailPage = ({ characterId }: CharacterDetailPageProps) => (
  <CharacterDetailVmProvider queryClient={queryClient} characterId={characterId}>
    <CharacterDetailPageContent characterId={characterId} />
  </CharacterDetailVmProvider>
);
