export interface Species {
  id: number;
  name: string;
  classification: string;
  designation: string;
  eye_colors: string;
  skin_colors: string;
  language: string;
  hair_colors: string;
  homeworld: number | null;
  average_lifespan: string;
  average_height: string;
}

export type SpeciesId = Species['id'];
