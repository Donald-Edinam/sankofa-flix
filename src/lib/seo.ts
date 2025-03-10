// lib/seo.ts
import { Metadata } from 'next';
import { Movie } from '@/interfaces';

type SeoProps = {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
};

/**
 * Creates metadata for SankofaFlix pages
 */
export function generateMetadata({
  title,
  description = "Discover movies that connect you to African and diaspora cinema - SankofaFlix",
  keywords = ["african movies", "black cinema", "movie recommendations", "diaspora films"],
  ogImage = "/images/sankofa-og-default.jpg",
  noIndex = false,
}: SeoProps): Metadata {
  // Append site name to title
  const formattedTitle = `${title} | SankofaFlix`;
  
  return {
    title: formattedTitle,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: formattedTitle,
      description,
      images: [{ url: ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      }
    }),
  };
}

/**
 * Generates metadata specifically for movie pages
 */
export function generateMovieMetadata(movie: Movie): Metadata {
  if (!movie) {
    return generateMetadata({
      title: 'Movie Not Found',
      description: 'The requested movie could not be found on SankofaFlix.',
    });
  }
  
  // Get year from release date
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  
  // Get genre names for keywords
  const genreKeywords = movie.genres?.map(genre => genre.name.toLowerCase()) || [];
  
  // Build description with title, year, and overview
  const description = movie.overview 
    ? `${movie.title} (${year}). ${movie.overview.substring(0, 150)}${movie.overview.length > 150 ? '...' : ''}`
    : `Watch ${movie.title} on SankofaFlix - The best destination for African and diaspora cinema.`;
  
  // Use movie poster for OG image if available
  const posterPath = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : '/images/movie-default-og.jpg';
  
  return generateMetadata({
    title: movie.title,
    description: description,
    keywords: [
      ...genreKeywords,
      'african movies',
      'black cinema',
      movie.title.toLowerCase(),
      'SankofaFlix',
      'movie recommendations'
    ],
    ogImage: posterPath,
  });
}