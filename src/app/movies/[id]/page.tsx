// @ts-nocheck
import React from 'react';
import MovieDetails from '@/components/common/MovieDetails';
import { Movie } from '@/interfaces';
import Link from 'next/link';

async function fetchTrendingMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/trending/`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

async function getMovieDetails(id: string): Promise<Movie | null> {
  const movies = await fetchTrendingMovies();
  return movies.find((movie: Movie) => movie.id.toString() === id) || null;
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movieData = await getMovieDetails(params.id);

  if (!movieData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p className="mb-6">We couldn&apos;t find the movie you&apos;re looking for.</p>
          <Link 
            href="/" 
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <MovieDetails movie={movieData} />;
}