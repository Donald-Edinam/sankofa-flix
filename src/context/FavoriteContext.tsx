"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getFavorites, addToFavorites, removeFromFavorites } from '@/services/favoriteServices';
import { isAuthenticated } from '@/services/authService';
import toast from 'react-hot-toast';
import { FavoriteMovie, FavoritesContextType } from '@/interfaces';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshFavorites = async () => {
    if (!isAuthenticated()) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data);
      setError(null);
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(fav => fav.movie_id === movieId);
  };

  const getFavoriteId = (movieId: number): number | null => {
    const favorite = favorites.find(fav => fav.movie_id === movieId);
    return favorite ? favorite.movie_id : null;
  };

  const addFavorite = async (movieId: number): Promise<boolean> => {
    if (!isAuthenticated()) {
      toast.error('You must be logged in to add movies to your favorites.');
      return false;
    }
  
    try {
      const response = await addToFavorites(movieId);
      if (response) {
        setFavorites(prev => [...prev, response]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding favorite:', err);
      return false;
    }
  };

  const removeFavorite = async (id: number): Promise<boolean> => {
    try {
      const success = await removeFromFavorites(id);
      if (success) {
        setFavorites(prev => prev.filter(fav => fav.movie_id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error removing favorite:', err);
      return false;
    }
  };

  // Load favorites when component mounts or auth state changes
  useEffect(() => {
    refreshFavorites();
  }, []);

  const value = {
    favorites,
    loading,
    error,
    isFavorite,
    getFavoriteId,
    addFavorite,
    removeFavorite,
    refreshFavorites
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};