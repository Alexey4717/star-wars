import type { Character } from '../common/types';

interface CharactersListViewProps {
  characters: Character[];
}

export const CharactersListView = ({ characters }: CharactersListViewProps) => (
  <pre>{JSON.stringify(characters, null, 2)}</pre>
);
