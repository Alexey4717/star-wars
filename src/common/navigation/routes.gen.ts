/* eslint-disable */

// @ts-nocheck

// This file was automatically generated from routeTree.gen.ts.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should exclude this file from your linter and/or formatter.

import type { FileRouteTypes } from '@/app/router/routeTree.gen';

export type AppRouteTo = FileRouteTypes['to'];

export const ROUTES = {
  home: '/',
  characters: {
    $url: '/characters',
    $characterId: '/characters/$characterId',
  },
  films: {
    $url: '/films',
    $filmId: '/films/$filmId',
  },
  planets: {
    $url: '/planets',
    $planetId: '/planets/$planetId',
  },
  species: {
    $url: '/species',
    $speciesId: '/species/$speciesId',
  },
  starships: {
    $url: '/starships',
    $starshipId: '/starships/$starshipId',
  },
  transports: {
    $url: '/transports',
  },
  vehicles: {
    $url: '/vehicles',
    $vehicleId: '/vehicles/$vehicleId',
  },
} as const;
