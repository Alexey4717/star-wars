export const characterRelationsQueryKeys = {
  all: ['characters', 'relations'] as const,
  films: (characterId: number) =>
    [...characterRelationsQueryKeys.all, characterId, 'films'] as const,
};
