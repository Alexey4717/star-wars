export const planetRelationsQueryKeys = {
  all: ['planets', 'relations'] as const,
  films: (planetId: number) => [...planetRelationsQueryKeys.all, planetId, 'films'] as const,
  characters: (planetId: number) =>
    [...planetRelationsQueryKeys.all, planetId, 'characters'] as const,
};
