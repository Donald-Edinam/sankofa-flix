"use client"
import React, { useEffect } from 'react';
import withAuth from '@/hoc/withAuth';
import { useFavorites } from '@/context/FavoriteContext';
import Image from 'next/image';
import Link from 'next/link';
import { Star, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Favorites = () => {
  const { favorites, loading, error, removeFavorite, refreshFavorites } = useFavorites();

  const handleRemoveFavorite = async (id: number, title: string) => {
    try {
      const success = await removeFavorite(id);
      if (success) {
        toast.success(`${title} removed from favorites`);
      }
    } catch (err) {
      toast.error('Failed to remove from favorites');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-4 text-xl font-bold">Something went wrong</h2>
        <p className="mb-4 text-muted-foreground">{error}</p>
        <button
          onClick={refreshFavorites}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasRefreshed = sessionStorage.getItem("hasRefreshed");

      if (!hasRefreshed) {
        sessionStorage.setItem("hasRefreshed", "true");
        window.location.reload();
      }
    }
  }, []);


  return (
    <div className="container mx-auto px-4 py-5 mt-20">
      <h1 className="mb-8 text-3xl font-bold">My Favorite Movies</h1>

      {favorites.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No favorites yet</h2>
          <p className="mb-4 text-muted-foreground">
            Start adding movies to your favorites to see them here
          </p>
          <Link
            href="/"
            className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map(favorite => (
            <div key={favorite.movie_id} className="relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={favorite.poster_path ? `https://image.tmdb.org/t/p/w500${favorite.poster_path}` : '/images/placeholder-poster.jpg'}
                  alt={favorite.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span className="text-xs font-medium text-white">{favorite?.vote_average?.toFixed(1)}</span>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(favorite.movie_id, favorite.title)}
                  className="absolute top-2 left-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  title="Remove from favorites"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 text-xs text-muted-foreground">
                  {favorite.release_date ? new Date(favorite.release_date).getFullYear() : 'Unknown'}
                </div>

                <h3 className="mb-2 line-clamp-1 font-semibold">{favorite.title}</h3>

                <p className="line-clamp-2 text-sm text-muted-foreground mb-4">
                  {favorite.overview || "No description available."}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/movies/${favorite.movie_id}`}
                    className="w-full rounded-md bg-primary px-3 py-2 text-xs sm:text-sm font-medium text-white text-center transition-colors hover:bg-accent-foreground block"
                    prefetch={true}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(Favorites);