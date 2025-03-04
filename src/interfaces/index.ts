// interfaces/index.ts
export interface Movie {
  id: number;
  title: string;
  backdrop_path: string; // Updated to match API
  poster_path: string; // Added to match API
  overview: string; // Updated to match API
  release_date: string; // Updated to match API
  vote_average: number; // Updated to match API
  genre_ids: number[]; // Updated to match API
}

export type Genre = "All Genres" | "Drama" | "Action" | "Comedy" | "Documentary";