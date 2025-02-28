"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { movieApi } from '@/services/movieService';
import { Movie } from '@/interfaces/index';
import MovieCard from '@/components/common/MovieCard';
import Loader from '@/components/common/Loader';
import ErrorDisplay from '@/components/common/ErrorDisplay';

function MovieShowcase() {
  const { data: featuredMovies, isLoading, isError, error } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: movieApi.fetchTrendingMovies
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorDisplay message={error instanceof Error ? error.message : 'An unknown error occurred'} />;
  }

  return (
    <div className="min-h-full my-10 bg-gray-50 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Trending Movies</h2>
            <a
              href="#"
              className="flex items-center text-sm font-medium text-accent-foreground transition-colors hover:text-pr dark:text-primary-foreground dark:hover:text-accent"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMovies?.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieShowcase