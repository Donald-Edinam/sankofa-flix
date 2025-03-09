import React from 'react';
import MovieDetails from '@/components/common/MovieDetails';
import Link from 'next/link';
import { getMovieDetails, fetchRecommendedMovies } from '@/services/services';

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

  const recommendedMovies = await fetchRecommendedMovies({ movieId: params.id });

  return <MovieDetails
    movie={movieData}
    recommendedMovies={recommendedMovies}
  />;
}