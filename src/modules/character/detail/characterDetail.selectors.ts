import type { Planet } from '@/modules/planet/common';
import type { Species } from '@/modules/species/common';

export type CharacterMetaLineParams = {
  species?: Species;
  planet?: Planet;
};

export const selectCharacterMetaLine = ({ species, planet }: CharacterMetaLineParams): string => {
  const parts = ['Персонаж'];

  if (species) {
    parts.push(species.name);
  }

  if (planet) {
    parts.push(planet.name);
  }

  return parts.join(' · ');
};
