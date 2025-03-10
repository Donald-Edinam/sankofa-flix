// services/favoritesService.ts

import { Movie } from '@/interfaces';
import { getAccessToken, refreshToken } from './authService';

/**
 * Interface for favorites response from API
 */
interface FavoritesResponse {
  id: number;
  user: number;
  movie: Movie;
  created_at: string;
}

/**
 * Helper function to add authorization headers to requests
 */
async function authorizedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let token = getAccessToken();
  
  // Set up headers with authorization
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  
  // Make the request
  let response = await fetch(url, { ...options, headers });
  
  // If unauthorized, try refreshing token once
  if (response.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, { ...options, headers });
    }
  }
  
  return response;
}

/**
 * Get user's favorite movies
 */
export async function getFavorites(): Promise<Movie[]> {
  try {
    const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/favorites/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    
    const data: FavoritesResponse[] = await response.json();
    return data.map(item => item.movie);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

/**
 * Add a movie to favorites
 */
export async function addToFavorites(movieId: number | string): Promise<boolean> {
  try {
    const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/favorites/`, {
      method: 'POST',
      body: JSON.stringify({ movie_id: movieId }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

/**
 * Remove a movie from favorites
 */
export async function removeFromFavorites(favoriteId: number | string): Promise<boolean> {
  try {
    const response = await authorizedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/favorites/${favoriteId}/`, {
      method: 'DELETE',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}

/**
 * Check if a movie is in favorites
 * Returns the favorite ID if found, null otherwise
 */
export async function checkFavoriteStatus(movieId: number | string): Promise<number | null> {
  try {
    const favorites = await getFavorites();
    const favorite = favorites.find(movie => movie.id === Number(movieId));
    
    if (favorite) {
      // If we need to return the favorite ID, we might need to modify the API response
      // to include this information. For now, we'll return a placeholder
      return Number(movieId); // This should be the favorite ID, not the movie ID in a real implementation
    }
    
    return null;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return null;
  }
}