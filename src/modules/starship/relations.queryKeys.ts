export const starshipRelationsQueryKeys = {
  all: ['starships', 'relations'] as const,
  characters: (starshipId: number) =>
    [...starshipRelationsQueryKeys.all, starshipId, 'characters'] as const,
};
