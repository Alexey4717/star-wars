import { useMemo } from 'react';

import { observer } from 'mobx-react-lite';
import { type ViewModelProps, withViewModel } from 'mobx-view-model-react';

import { NAV_ENTRIES } from '@/common/navigation/navConfig';
import { Page } from '@/common/ui/Page/Page';
import { PageEmptyState } from '@/common/ui/Page/PageEmptyState';

import { CharacterDetailView, CharacterDetailViewModel } from '@/modules/character/detail';

import { CharacterDetailPageSkeleton } from './CharacterDetailPageSkeleton';

interface CharacterDetailPageProps {
  characterId: string;
}

const CharacterDetailPageView = observer(({ model }: ViewModelProps<CharacterDetailViewModel>) => {
  const characterId = String(model.payload.characterId);

  const breadcrumbs = useMemo(
    () => [
      { title: NAV_ENTRIES.characters.label, to: NAV_ENTRIES.characters.to },
      {
        title: model.character?.name ?? `Персонаж ${characterId}`,
      },
    ],
    [characterId, model.character?.name],
  );

  if (model.isCharacterLoading) {
    return <CharacterDetailPageSkeleton />;
  }

  if (model.characterError) {
    throw model.characterError;
  }

  if (!model.character) {
    return <PageEmptyState entity="персонаж" />;
  }

  return (
    <Page breadcrumbs={breadcrumbs}>
      <CharacterDetailView character={model.character} metaLine={model.metaLine} />
    </Page>
  );
});

const CharacterDetailPageWithVm = withViewModel(CharacterDetailViewModel, CharacterDetailPageView);

export const CharacterDetailPage = ({ characterId }: CharacterDetailPageProps) => (
  <CharacterDetailPageWithVm payload={{ characterId: Number(characterId) }} />
);
