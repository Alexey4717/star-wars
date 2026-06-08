export const filmRelationsQueryKeys = {
  all: ['films', 'relations'] as const,
  characters: (filmId: number) => [...filmRelationsQueryKeys.all, filmId, 'characters'] as const,
  planets: (filmId: number) => [...filmRelationsQueryKeys.all, filmId, 'planets'] as const,
  species: (filmId: number) => [...filmRelationsQueryKeys.all, filmId, 'species'] as const,
  starships: (filmId: number) => [...filmRelationsQueryKeys.all, filmId, 'starships'] as const,
  vehicles: (filmId: number) => [...filmRelationsQueryKeys.all, filmId, 'vehicles'] as const,
};
