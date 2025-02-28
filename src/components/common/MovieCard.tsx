import React from 'react';
import { Star } from 'lucide-react';
import { Movie } from '@/interfaces/index';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group flex w-full sm:w-[360px] flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-800">
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-white">{movie.rating.toFixed(1)}</span>
        </div>
        <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2 py-1">
          <span className="text-xs font-medium text-white">{movie.releaseDate}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{movie.title}</h3>
        <p className="mb-3 flex-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {movie.description}
        </p>
        <button className="mt-auto self-start rounded-md bg-primary px-3 py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-accent-foreground">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
