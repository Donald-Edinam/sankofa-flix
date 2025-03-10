import React from 'react';
import { Metadata } from 'next';
import MovieDetails from '@/components/common/MovieDetails';
import Link from 'next/link';
import { getMovieDetails, fetchRecommendedMovies } from '@/services/services';
import { generateMovieMetadata } from '@/lib/seo';

// Generate metadata for the movie page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const movie = await getMovieDetails(params.id);
  if (!movie) {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found on SankofaFlix.',
    };
  }
  return generateMovieMetadata(movie);
}

// For the MoviePage component
export default async function MoviePage({ params }: { params: { id: string } }) {
  // Await the params first
  const { id } = await params;
  
  // Now use the id after it's been awaited
  const [movieData, recommendedMovies] = await Promise.all([
    getMovieDetails(id),
    fetchRecommendedMovies({ movieId: id })
  ]);
  
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

  return <MovieDetails
    movie={movieData}
    recommendedMovies={recommendedMovies}
  />;
}

