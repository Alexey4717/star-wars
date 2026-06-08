export interface Transport {
  id: number;
  name: string;
  consumables: string;
  cargo_capacity: string;
  passengers: string;
  max_atmosphering_speed: string;
  crew: string;
  length: string;
  cost_in_credits: string;
  manufacturer: string;
}

export type TransportId = Transport['id'];
