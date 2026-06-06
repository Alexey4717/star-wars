export const characterQueryKeys = {
  all: ['characters'] as const,
  list: () => [...characterQueryKeys.all] as const,
  detail: (id: number) => [...characterQueryKeys.all, id] as const,
};
