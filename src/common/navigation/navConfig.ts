import { type AppRouteTo, ROUTES } from './routes.gen';

export type NavListRouteTo = Extract<
  AppRouteTo,
  '/characters' | '/films' | '/planets' | '/species' | '/starships' | '/transports' | '/vehicles'
>;

// TODO переосмыслить конфигурацию роутинга, сделать удобнее
export const NAV_ENTRIES = {
  characters: {
    to: ROUTES.characters.$url,
    label: 'Персонажи',
  },
  films: {
    to: ROUTES.films.$url,
    label: 'Фильмы',
  },
  planets: {
    to: ROUTES.planets.$url,
    label: 'Планеты',
  },
  species: {
    to: ROUTES.species.$url,
    label: 'Виды',
  },
  starships: {
    to: ROUTES.starships.$url,
    label: 'Звездолёты',
  },
  transports: {
    to: ROUTES.transports.$url,
    label: 'Транспорт',
  },
  vehicles: {
    to: ROUTES.vehicles.$url,
    label: 'Транспортные средства',
  },
} as const satisfies Record<string, { to: NavListRouteTo; label: string }>;

export type NavEntryKey = keyof typeof NAV_ENTRIES;

export const getNavEntry = (key: NavEntryKey) => NAV_ENTRIES[key];

export const getNavEntryByPath = (to: NavListRouteTo) => {
  const entry = Object.values(NAV_ENTRIES).find((item) => item.to === to);

  if (!entry) {
    throw new Error(`Nav entry not found for route: ${to}`);
  }

  return entry;
};
