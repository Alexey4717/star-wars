export interface Planet {
  id: number;
  name: string;
  climate: string;
  terrain: string;
  surface_water: string;
  diameter: string;
  rotation_period: string;
  gravity: string;
  orbital_period: string;
  population: string;
}

export type PlanetId = Planet['id'];
