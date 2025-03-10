// contexts/FavoritesContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '@/interfaces';
import { getFavorites, addToFavorites, removeFromFavorites, checkFavoriteStatus } from '@/services/favoriteServices';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Movie[];
  loading: boolean;
  addFavorite: (movieId: number | string) => Promise<boolean>;
  removeFavorite: (favoriteId: number | string) => Promise<boolean>;
  isFavorite: (movieId: number | string) => boolean;
  refreshFavorites: () => Promise<void>;
}

// Create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider component
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { authenticated } = useAuth();

  // Initialize favorites
  useEffect(() => {
    if (authenticated) {
      refreshFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [authenticated]);

  // Refresh favorites list
  const refreshFavorites = async () => {
    if (!authenticated) return;
    
    setLoading(true);
    const data = await getFavorites();
    setFavorites(data);
    setLoading(false);
  };

  // Add movie to favorites
  const addFavorite = async (movieId: number | string) => {
    if (!authenticated) return false;
    
    const success = await addToFavorites(movieId);
    
    if (success) {
      await refreshFavorites();
    }
    
    return success;
  };

  // Remove movie from favorites
  const removeFavorite = async (favoriteId: number | string) => {
    if (!authenticated) return false;
    
    const success = await removeFromFavorites(favoriteId);
    
    if (success) {
      await refreshFavorites();
    }
    
    return success;
  };

  // Check if movie is in favorites
  const isFavorite = (movieId: number | string) => {
    return favorites.some(movie => movie.id === Number(movieId));
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      loading, 
      addFavorite, 
      removeFavorite, 
      isFavorite,
      refreshFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook for using the favorites context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
}