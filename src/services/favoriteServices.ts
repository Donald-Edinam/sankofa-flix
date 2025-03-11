import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { FavoriteMovie, UserFavoritesResponse, FavoriteMovieInput } from '@/interfaces';

// Create an Axios instance with a base URL and auth headers
const getFavoritesClient = () => {
  const token = localStorage.getItem('access_token');

  console.log("Debugging console", token)

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });
};

/**
 * Get all favorites for the current user
 */
export async function getFavorites(): Promise<FavoriteMovie[]> {
  try {
    const client = getFavoritesClient();
    const response = await client.get<UserFavoritesResponse>('/auth/favorites/');
    return response.data.favorite_movies;
  } catch (error) {
    handleApiError(error as AxiosError);
    return [];
  }
}

/**
 * Add a movie to favorites
 */
export async function addToFavorites(movieId: number): Promise<FavoriteMovie | null> {
  try {
    const client = getFavoritesClient();
    const response = await client.post<{ favorite_movie: FavoriteMovie }>(
      '/auth/favorites/',
      { movie_id: movieId }
    );

    // Return the newly added favorite movie
    return response.data.favorite_movie;
  } catch (error) {
    handleApiError(error as AxiosError);
    return null;
  }
}

/**
 * Remove a movie from favorites
 */
export async function removeFromFavorites(movieId: number): Promise<boolean> {
  try {
    const client = getFavoritesClient();
    await client.delete(`/auth/favorites/${movieId}/`);
    return true;
  } catch (error) {
    handleApiError(error as AxiosError);
    return false;
  }
}

/**
 * Check if a movie is in favorites
 */
export async function checkIsFavorite(movieId: number): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.movie_id === movieId);
  } catch (error) {
    return false;
  }
}

/**
 * Handle API errors
 */
function handleApiError(error: AxiosError): void {
  if (error.response) {
    const { status, data } = error.response;

    if (typeof data === 'object' && data !== null) {
      // Loop through all possible error fields dynamically
      Object.entries(data).forEach(([key, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => toast.error(`${key}: ${msg}`));
        } else if (typeof messages === 'string') {
          toast.error(`${key}: ${messages}`);
        } else {
          toast.error(`Error: ${JSON.stringify(messages)}`);
        }
      });
    } else {
      toast.error(`Error ${status}: ${typeof data === 'string' ? data : 'An unexpected error occurred.'}`);
    }
    console.error('API Error:', error.response);
  } else if (error.request) {
    toast.error('Network Error: Please check your internet connection.');
    console.error('Network Error:', error.request);
  } else {
    toast.error(`Error: ${error.message}`);
    console.error('Request Error:', error.message);
  }
}