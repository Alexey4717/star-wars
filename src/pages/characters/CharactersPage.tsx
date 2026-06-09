import { observer } from 'mobx-react-lite';
import { type ViewModelProps, withViewModel } from 'mobx-view-model-react';

import { NAV_ENTRIES } from '@/common/navigation/navConfig';
import { Page } from '@/common/ui/Page/Page';

import { CharactersListView, CharactersListViewModel } from '@/modules/character/list';

const CharactersPageView = observer(({ model }: ViewModelProps<CharactersListViewModel>) => {
  if (model.isLoading) {
    return <Page title={NAV_ENTRIES.characters.label}>Загрузка...</Page>;
  }

  if (model.error) {
    throw model.error;
  }

  return (
    <Page title={NAV_ENTRIES.characters.label}>
      <CharactersListView characters={model.characters} />
    </Page>
  );
});

export const CharactersPage = withViewModel(CharactersListViewModel, CharactersPageView);
