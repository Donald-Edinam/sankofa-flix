export interface Movie {
    id: number;
    title: string;
    backdropUrl: string;
    releaseDate: string;
    rating: number;
    description: string;
    genres?: Genre[];
  }
  
  export type Genre = "All Genres" | "Drama" | "Action" | "Comedy" | "Documentary";