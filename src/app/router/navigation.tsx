import type { ReactNode } from 'react';

import {
  BugOutlined,
  CarOutlined,
  GlobalOutlined,
  RocketOutlined,
  TeamOutlined,
  TruckOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { NAV_ENTRIES, type NavListRouteTo } from '@/common/navigation/navConfig';

import { Route as CharactersRoute } from './routes/_layout/characters/index';
import { Route as FilmsRoute } from './routes/_layout/films/index';
import { Route as HomeRoute } from './routes/_layout/index';
import { Route as PlanetsRoute } from './routes/_layout/planets/index';
import { Route as SpeciesRoute } from './routes/_layout/species/index';
import { Route as StarshipsRoute } from './routes/_layout/starships/index';
import { Route as TransportsRoute } from './routes/_layout/transports/index';
import { Route as VehiclesRoute } from './routes/_layout/vehicles/index';

export { HomeRoute };

interface NavItem<TRoute extends { readonly to: NavListRouteTo }> {
  route: TRoute;
  label: string;
  icon: ReactNode;
}

export const NAV_ITEMS = [
  {
    route: CharactersRoute,
    label: NAV_ENTRIES.characters.label,
    icon: <TeamOutlined />,
  },
  {
    route: FilmsRoute,
    label: NAV_ENTRIES.films.label,
    icon: <VideoCameraOutlined />,
  },
  {
    route: PlanetsRoute,
    label: NAV_ENTRIES.planets.label,
    icon: <GlobalOutlined />,
  },
  {
    route: SpeciesRoute,
    label: NAV_ENTRIES.species.label,
    icon: <BugOutlined />,
  },
  {
    route: StarshipsRoute,
    label: NAV_ENTRIES.starships.label,
    icon: <RocketOutlined />,
  },
  {
    route: TransportsRoute,
    label: NAV_ENTRIES.transports.label,
    icon: <TruckOutlined />,
  },
  {
    route: VehiclesRoute,
    label: NAV_ENTRIES.vehicles.label,
    icon: <CarOutlined />,
  },
] as const satisfies readonly NavItem<{ readonly to: NavListRouteTo }>[];

export type NavPath = typeof HomeRoute.to | (typeof NAV_ITEMS)[number]['route']['to'];

export const resolveNavPath = (pathname: string): NavPath => {
  if (pathname === HomeRoute.to) {
    return HomeRoute.to;
  }

  const matchedItem = NAV_ITEMS.find(
    (item) => pathname === item.route.to || pathname.startsWith(`${item.route.to}/`),
  );

  return matchedItem?.route.to ?? HomeRoute.to;
};
