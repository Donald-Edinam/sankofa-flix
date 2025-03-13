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

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  favorite_genres?: Genre[];
  watchlist?: Movie[];
  watched?: Movie[];
}


interface FavoriteMovie {
  movie_id: number;
  created_at: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average?: number;
}
interface FavoriteMovieInput {
  movie_id: number;
}

interface FavoritesContextType {
  favorites: FavoriteMovie[];
  loading: boolean;
  error: string | null;
  isFavorite: (movieId: number) => boolean;
  getFavoriteId: (movieId: number) => number | null;
  addFavorite: (movieId: number) => Promise<boolean>;
  removeFavorite: (id: number) => Promise<boolean>;
  refreshFavorites: () => Promise<void>;
}

interface UserFavoritesResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  favorite_movies: FavoriteMovie[];
}

interface RegisterAuthResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export type { Movie, MovieResponse, User, FavoriteMovie, FavoriteMovieInput, FavoritesContextType, UserFavoritesResponse, RegisterAuthResponse };

export type Genre = "All Genres" | "Drama" | "Action" | "Comedy" | "Documentary";
