export interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number; // Optional as it might not be in the API response
  cast?: {
    name: string;
    character: string;
    image: string;
  }[];
  director?: string;
  writers?: string[];
  production?: string;
}

export type Genre = "All Genres" | "Drama" | "Action" | "Comedy" | "Documentary";