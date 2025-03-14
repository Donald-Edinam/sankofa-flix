"use client";

import React from 'react';
import { Star, Plus, Share } from 'lucide-react';
import Image from 'next/image';
import { Movie, MovieResponse } from '@/interfaces';
import dynamic from 'next/dynamic';
import { useFavorites } from '@/context/FavoriteContext';
import toast from 'react-hot-toast';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/PageTransition';

// Dynamically import MovieCard with loading state
const MovieCard = dynamic(() => import('./MovieCard'), {
  loading: () => <div className="w-full h-64 bg-gray-800 rounded-md animate-pulse"></div>,
});

// Simple image placeholder component for better loading experience
const ImagePlaceholder = () => (
  <div className="w-full h-full bg-gray-800 animate-pulse rounded-md"></div>
);

// Extract MovieInfo to a separate component to reduce re-renders
const MovieInfo = ({ movie, year, runtime, genres }: { movie: Movie, year: string, runtime: string, genres: { name: string }[] }) => {
  const { addFavorite, isFavorite } = useFavorites();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleAddToFavorites = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const success = await addFavorite(movie.id);
      if (success) {
        toast.success(`${movie.title} added to favorites!`);
      } else {
        toast.error('Failed to add to favorites. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error adding to favorites:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: movie.title,
      text: `Check out this movie: ${movie.title}. ${movie.overview}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (error) {
        toast.error('Sharing failed. Please try again.');
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Link copied to clipboard!');
      }).catch(() => {
        toast.error('Failed to copy link to clipboard.');
      });
    }
  };

  return (
    <div className="flex-grow md:my-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-1">{movie.title}</h1>

      {movie.tagline && <p className="text-gray-400 italic mb-3">{movie.tagline}</p>}

      <div className="flex items-center gap-5 text-sm text-gray-400 mb-4">
        <span>{year}</span>
        <span>{runtime}</span>
        <div className="flex items-center text-yellow-400">
          <Star size={16} fill="currentColor" />
          <span className="ml-1">{movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map((genre, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-800 rounded-full text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleAddToFavorites}
          disabled={isProcessing || isFavorite(movie.id)}
          className={`flex items-center gap-2 ${isFavorite(movie.id)
              ? 'bg-green-800 cursor-not-allowed'
              : 'bg-green-700 hover:bg-green-800'
            } px-4 py-2 rounded-md transition`}
        >
          <Plus size={16} />
          <span>
            {isProcessing
              ? 'Adding...'
              : isFavorite(movie.id)
                ? 'In Favorites'
                : 'Add to Favorites'}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-md transition"
        >
          <Share size={16} />
        </button>
      </div>
    </div>
  );
};

const MovieDetails = React.memo(({ movie, recommendedMovies }: { movie: Movie, recommendedMovies: MovieResponse }) => {
  // Format release year
  const year = movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "";

  // Format runtime using the actual runtime from the data
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "";

  // Use actual genres from the data instead of mapping from IDs
  const genres = movie.genres || [];

  // Format image paths
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/api/placeholder/300/450";

  const backdropPath = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/api/placeholder/1920/1080";

  // Production companies
  const production = movie.production_companies
    ? movie.production_companies.map(company => company.name).join(', ')
    : "Information unavailable";

  // Get production countries
  const countries = movie.production_countries
    ? movie.production_countries.map(country => country.name).join(', ')
    : "";

  return (
    <div className="bg-background text-white min-h-screen dark:bg-black dark:text-gray-300">
      {/* Hero Section */}
      <FadeIn className="relative pt-8 md:pt-16" duration={0.6}>
        {/* Backdrop with overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-gray-500 dark:from-cyan-950 dark:to-transparent">
          <Image
            src={backdropPath}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            loading="eager"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <FadeIn duration={0.6} className="w-48 md:w-64 mx-auto md:mx-0 flex-shrink-0">
              <Image
                src={posterPath}
                alt={`${movie.title} poster`}
                className="w-full rounded-md shadow-lg"
                width={300}
                height={450}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                priority={true}
              />
            </FadeIn>

            {/* Movie Info */}
            <MovieInfo
              movie={movie}
              year={year}
              runtime={runtime}
              genres={genres}
            />
          </div>
        </div>
      </FadeIn>

      {/* Overview Section */}
      <FadeIn className="container mx-auto px-4 py-8" direction="up" duration={0.6}>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-300">Overview</h2>
        <p className="text-gray-800 mb-10 dark:text-gray-300">{movie.overview}</p>

        <StaggerContainer delay={0.5} staggerChildren={0.05} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm text-gray-800 mb-10 dark:text-gray-300">
          <StaggerItem>
            <div className="flex">
              <span className="w-24 text-gray-400">Status</span>
              <span>{movie.status}</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex">
              <span className="w-24 text-gray-400">Budget</span>
              <span>${movie.budget?.toLocaleString()}</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex">
              <span className="w-24 text-gray-400">Revenue</span>
              <span>${movie.revenue?.toLocaleString()}</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex">
              <span className="w-24 text-gray-400">Countries</span>
              <span>{countries}</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex">
              <span className="w-24 text-gray-400">Release Date</span>
              <span>{movie.release_date}</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex">
              <span className="w-24 text-gray-400">Production</span>
              <span>{production}</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex">
              <span className="w-24 text-gray-400">Languages</span>
              <span>{movie.spoken_languages?.map(lang => lang.english_name).join(', ')}</span>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </FadeIn>

      {/* Recommended Section - Only render if there are recommendations */}
      {recommendedMovies && recommendedMovies.results?.length > 0 && (
        <StaggerContainer className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className='text-secondary-foreground font-bold text-lg'>You might also like this</h1>
            {/* <a href="#" className="text-primary text-sm hover:underline">View All</a> */}
          </div>

          <StaggerItem direction='up' className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recommendedMovies.results.slice(0, 8).map((movie: Movie, index: number) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </StaggerItem>
        </StaggerContainer>
      )}
    </div>
  );
});

MovieDetails.displayName = 'MovieDetails';

export default MovieDetails;