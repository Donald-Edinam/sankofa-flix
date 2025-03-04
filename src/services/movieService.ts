// services/memoService.ts
import { Movie, Genre } from '@/interfaces';
import api from '@/lib/api';

// Map genre names to their corresponding IDs
const genreIdMap: Record<Genre, number> = {
  "Drama": 18,
  "Action": 28,
  "Comedy": 35,
  "Documentary": 99,
  "All Genres": -1, // Special case for "All Genres"
};

export const movieApi = {
  fetchTrendingMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies/trending');
  }
};

export const genreMovies = {
  fetchTrendingMovies: async (): Promise<Movie[]> => {
    // Fetch trending movies from the API
    const response = await api.get<Movie[]>('/movies/trending');
    return response; // Return the data property from the response
  },
  
  fetchMoviesByGenre: async (genre: Genre | 'All Genres'): Promise<Movie[]> => {
    // Fetch all trending movies
    const response = await api.get<Movie[]>('/movies/trending');
    const movies = response; // Access the data property

    // Filter movies by genre on the client side
    if (genre === "All Genres") {
      return movies; // Return all movies if no specific genre is selected
    } else {
      const genreId = genreIdMap[genre]; // Get the genre ID from the map
      return movies.filter((movie: Movie) => 
        movie.genre_ids.includes(genreId) // Filter movies that include the selected genre ID
      );
    }
  }
};