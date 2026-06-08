export interface Film {
  id: number;
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
}

export type FilmId = Film['id'];
