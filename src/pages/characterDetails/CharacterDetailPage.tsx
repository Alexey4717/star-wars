import { observer } from 'mobx-react-lite';
import { type ViewModelProps, withViewModel } from 'mobx-view-model-react';

import { Page } from '@/common/ui/Page/Page';

import { CharacterDetailView, CharacterDetailViewModel } from '@/modules/characters';

interface CharacterDetailPageProps {
  characterId: string;
}

const CharacterDetailPageView = observer(({ model }: ViewModelProps<CharacterDetailViewModel>) => {
  const characterId = String(model.payload.characterId);

  if (model.isLoading) {
    return <Page title={`Персонаж ${characterId}`}>Загрузка...</Page>;
  }

  if (model.error) {
    throw model.error;
  }

  if (!model.character) {
    return <Page title={`Персонаж ${characterId}`}>Нет данных</Page>;
  }

  return (
    <Page title={`Персонаж ${characterId}`}>
      <CharacterDetailView character={model.character} />
    </Page>
  );
});

const CharacterDetailPageWithVm = withViewModel(CharacterDetailViewModel, CharacterDetailPageView);

export const CharacterDetailPage = ({ characterId }: CharacterDetailPageProps) => (
  <CharacterDetailPageWithVm payload={{ characterId: Number(characterId) }} />
);
