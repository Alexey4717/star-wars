export interface Starship {
  id: number;
  MGLT: string;
  starship_class: string;
  hyperdrive_rating: string;
}

export type StarshipId = Starship['id'];
