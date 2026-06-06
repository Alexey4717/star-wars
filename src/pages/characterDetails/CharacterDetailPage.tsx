import { Page } from '@/common/ui/Page/Page';

interface CharacterDetailPageProps {
  characterId: string;
}

export const CharacterDetailPage = ({ characterId }: CharacterDetailPageProps) => (
  <Page title={`Персонаж ${characterId}`}>Детали персонажа {characterId}</Page>
);
