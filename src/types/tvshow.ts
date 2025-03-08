import type { Genre, Image, Cast, Crew, Review } from "./movie";

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  last_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  genres: Genre[];
  in_production: boolean;
  languages: string[];
  networks: Network[];
  origin_country: string[];
  original_language: string;
  production_companies: ProductionCompany[];
  seasons: Season[];
  type: string;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  images?: {
    backdrops: Image[];
    posters: Image[];
    logos: Image[];
  };
  reviews?: {
    results: Review[];
    total_pages: number;
    total_results: number;
  };
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Season {
  id: number;
  air_date: string;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TVShowResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
  hasNextPage?: boolean;
}
