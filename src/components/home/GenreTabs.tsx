"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Genre } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { genreMovies } from "@/services/movieService";
import MovieCard from "@/components/common/MovieCard";
import Loader from "@/components/common/Loader";
import ErrorDisplay from "@/components/common/ErrorDisplay";

// Define genres and their corresponding IDs
const genres: Genre[] = ["All Genres", "Drama", "Action", "Comedy", "Documentary"];
const genreIdMap: Record<string, number> = {
  Drama: 18,
  Action: 28,
  Comedy: 35,
  Documentary: 99,
};

const GenreTabs: React.FC = () => {
  const [activeGenre, setActiveGenre] = useState<Genre>("All Genres");

  const { data: movies, isLoading, isError, error } = useQuery({
    queryKey: ["movies-by-genre", activeGenre],
    queryFn: () => genreMovies.fetchMoviesByGenre(activeGenre),
  });

  const handleGenreChange = (genre: Genre) => {
    setActiveGenre(genre);
  };

  // Filter movies based on the active genre
  const filteredMovies = movies?.filter((movie) => {
    if (activeGenre === "All Genres") return true;
    const genreId = genreIdMap[activeGenre];
    return movie.genre_ids.includes(genreId);
  });

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl text-center font-bold text-gray-900 dark:text-white">Recommended For You</h2>
      
      <Tabs defaultValue="All Genres" value={activeGenre} onValueChange={(value) => handleGenreChange(value as Genre)}>
        <TabsList className="mb-6 bg-gray-100/80 dark:bg-gray-800/80 rounded-full py-2 my-2 w-full sm:w-auto flex">
          {genres.map((genre) => (
            <TabsTrigger 
              key={genre} 
              value={genre}
              className={`rounded-full px-5 text-sm font-medium transition-colors ${
                activeGenre === genre 
                  ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:text-white' 
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {genre}
            </TabsTrigger>
          ))}
        </TabsList>

        {genres.map((genre) => (
          <TabsContent key={genre} value={genre} className="mt-6">
            {isLoading ? (
              <div className="h-64">
                <Loader />
              </div>
            ) : isError ? (
              <ErrorDisplay message={error instanceof Error ? error.message : 'An unknown error occurred'} />
            ) : filteredMovies && filteredMovies.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 dark:text-gray-400">No movies found in this genre.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GenreTabs;