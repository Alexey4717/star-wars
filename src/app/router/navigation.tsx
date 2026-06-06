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

import { Route as CharactersRoute } from './routes/_layout/characters/index';
import { Route as FilmsRoute } from './routes/_layout/films/index';
import { Route as HomeRoute } from './routes/_layout/index';
import { Route as PlanetsRoute } from './routes/_layout/planets/index';
import { Route as SpeciesRoute } from './routes/_layout/species/index';
import { Route as StarshipsRoute } from './routes/_layout/starships/index';
import { Route as TransportsRoute } from './routes/_layout/transports/index';
import { Route as VehiclesRoute } from './routes/_layout/vehicles/index';
import type { FileRouteTypes } from './routeTree.gen';

export { HomeRoute };

type NavListRouteTo = Extract<
  FileRouteTypes['to'],
  '/characters' | '/films' | '/planets' | '/species' | '/starships' | '/transports' | '/vehicles'
>;

interface NavItem<TRoute extends { readonly to: NavListRouteTo }> {
  route: TRoute;
  label: string;
  icon: ReactNode;
}

export const NAV_ITEMS = [
  {
    route: CharactersRoute,
    label: 'Персонажи',
    icon: <TeamOutlined />,
  },
  {
    route: FilmsRoute,
    label: 'Фильмы',
    icon: <VideoCameraOutlined />,
  },
  {
    route: PlanetsRoute,
    label: 'Планеты',
    icon: <GlobalOutlined />,
  },
  {
    route: SpeciesRoute,
    label: 'Виды',
    icon: <BugOutlined />,
  },
  {
    route: StarshipsRoute,
    label: 'Звездолёты',
    icon: <RocketOutlined />,
  },
  {
    route: TransportsRoute,
    label: 'Транспорт',
    icon: <TruckOutlined />,
  },
  {
    route: VehiclesRoute,
    label: 'Транспортные средства',
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
