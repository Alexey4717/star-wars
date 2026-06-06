import type { Character } from '../model/types';

interface CharactersListViewProps {
  characters: Character[];
}

export const CharactersListView = ({ characters }: CharactersListViewProps) => (
  <pre>{JSON.stringify(characters, null, 2)}</pre>
);
