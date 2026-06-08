export const speciesRelationsQueryKeys = {
  all: ['species', 'relations'] as const,
  characters: (speciesId: number) =>
    [...speciesRelationsQueryKeys.all, speciesId, 'characters'] as const,
};
