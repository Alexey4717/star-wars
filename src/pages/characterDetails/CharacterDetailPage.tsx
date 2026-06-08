import { observer } from 'mobx-react-lite';
import { type ViewModelProps, withViewModel } from 'mobx-view-model-react';

import { Page } from '@/common/ui/Page/Page';

import { CharacterDetailView, CharacterDetailViewModel } from '@/modules/character/detail';

interface CharacterDetailPageProps {
  characterId: string;
}

const CharacterDetailPageView = observer(({ model }: ViewModelProps<CharacterDetailViewModel>) => {
  const characterId = String(model.payload.characterId);

  const breadcrumbs = [
    { title: 'Персонажи', to: '/characters' },
    {
      title: model.isCharacterLoading
        ? `Персонаж ${characterId}`
        : (model.character?.name ?? `Персонаж ${characterId}`),
    },
  ];

  if (model.isCharacterLoading) {
    return <Page breadcrumbs={breadcrumbs}>Загрузка...</Page>;
  }

  if (model.error) {
    throw model.error;
  }

  if (!model.character) {
    return <Page breadcrumbs={breadcrumbs}>Нет данных</Page>;
  }

  return (
    <Page breadcrumbs={breadcrumbs}>
      <CharacterDetailView
        character={model.character}
        isRelatedLoading={model.isRelatedLoading}
        metaLine={model.metaLine}
      />
    </Page>
  );
});

const CharacterDetailPageWithVm = withViewModel(CharacterDetailViewModel, CharacterDetailPageView);

export const CharacterDetailPage = ({ characterId }: CharacterDetailPageProps) => (
  <CharacterDetailPageWithVm payload={{ characterId: Number(characterId) }} />
);
