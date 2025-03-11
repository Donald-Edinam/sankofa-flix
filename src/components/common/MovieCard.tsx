"use client";

import React, { useState } from 'react';
import { BookmarkPlus, BookmarkCheck, Star } from 'lucide-react';
import { Movie } from '@/interfaces/index';
import Image from 'next/image';
import Link from 'next/link';
import { isAuthenticated } from '@/services/authService';
import { useFavorites } from '@/context/FavoriteContext';
import toast from 'react-hot-toast';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { isFavorite, getFavoriteId, addFavorite, removeFavorite } = useFavorites();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Check if movie is already in favorites
  const favorited = isFavorite(movie.id);
  const favoriteId = getFavoriteId(movie.id);

  // Format the release date
  const releaseDate = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';

  // Handle missing poster path
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/images/placeholder-poster.jpg';

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!isAuthenticated()) {
      toast.error('You must be logged in to add movies to your favorites.');
      return;
    }
  
    try {
      setIsProcessing(true);
      
      if (favorited && favoriteId) {
        // Remove from favorites
        const success = await removeFavorite(favoriteId);
        if (success) {
          toast.success(`${movie.title} removed from favorites!`);
        }
      } else {
        // Add to favorites
        const success = await addFavorite(movie.id);
        if (success) {
          toast.success(`${movie.title} added to favorites!`);
        }
      }
    } catch (error) {
      toast.error('Failed to update favorites. Please try again.');
      console.error('Error updating favorites:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={posterPath}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
          placeholder="blur"
          blurDataURL="/images/placeholder-poster.jpg"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400" />
          <span className="text-xs font-medium text-white">{movie?.vote_average?.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 text-xs text-muted-foreground">{releaseDate}</div>

        <h3 className="mb-2 line-clamp-1 font-semibold">{movie.title}</h3>

        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">
          {movie.overview || "No description available."}
        </p>

        <div className="mt-auto flex gap-2">
          <Link
            href={`/movies/${movie.id}`}
            className="flex-1 rounded-md bg-primary px-3 py-2 text-xs sm:text-sm font-medium text-white text-center transition-colors hover:bg-accent-foreground"
            prefetch={true}
          >
            View Details
          </Link>

          <button
            onClick={handleFavoriteToggle}
            disabled={isProcessing}
            className={`rounded-md px-3 py-2 text-xs sm:text-sm font-medium text-white transition-colors ${
              favorited 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center w-5 h-5">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              </span>
            ) : favorited ? (
              <BookmarkCheck className="w-5" />
            ) : (
              <BookmarkPlus className="w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;