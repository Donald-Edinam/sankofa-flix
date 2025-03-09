interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  adult: boolean;
  original_language: string;
  genre_ids?: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  
  // New optional properties from the JSON data
  belongs_to_collection?: null | object;
  budget?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  imdb_id?: string;
  origin_country?: string[];
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string;
  
  // Optional properties from the original implementation
  cast?: {
    name: string;
    character: string;
    image: string;
  }[];
  director?: string;
  writers?: string[];
  production?: string;
}

interface MovieResponse {
  page: number;
  results: Movie[];
}

export type { Movie, MovieResponse };

export type Genre = "All Genres" | "Drama" | "Action" | "Comedy" | "Documentary";