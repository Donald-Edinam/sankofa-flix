"use client";

import React from 'react';
import { BookmarkPlus, Star } from 'lucide-react';
import { Movie } from '@/interfaces/index';
import Image from 'next/image';
import Link from 'next/link';
import { isAuthenticated } from '@/services/authService';
import toast from 'react-hot-toast';


interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // Format the release date
  const releaseDate = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';

  // Handle missing poster path
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/images/placeholder-poster.jpg';

  // Handle "Add to Favorite" click
  const handleAddToFavorite = () => {
    if (!isAuthenticated()) {
      toast.error('You must be logged in to add movies to your favorites.');
      return;
    }

    // Add the movie to favorites (replace with your API call or state update logic)
    toast.success(`${movie.title} added to favorites!`);
    console.log('Adding to favorites:', movie);
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
            onClick={handleAddToFavorite}
            className="rounded-md bg-secondary px-3 py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-secondary/80"
          >
            <BookmarkPlus className='w-5' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;