import type { Character } from '../model/types';

interface CharacterDetailViewProps {
  character: Character;
}

export const CharacterDetailView = ({ character }: CharacterDetailViewProps) => (
  <pre>{JSON.stringify(character, null, 2)}</pre>
);
