"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieCard from '@/components/common/MovieCard';
import { Movie } from '@/interfaces/index';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Genres list (ideally this would come from an API)
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  // For demo purposes, I'm mocking some data
  // In a real app, you'd fetch from an API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/search?query=${query}&year=${year}&genre=${genre}&page=${page}`);
        
        // Check if response is OK
        if (!response.ok) {
          const text = await response.text();
          console.error(`API error (${response.status}):`, text);
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  // Apply filters
  useEffect(() => {
    let results = [...movies];
    
    if (year) {
      results = results.filter(movie => {
        const movieYear = movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '';
        return movieYear === year;
      });
    }
    
    if (genre) {
      const genreId = genres.find(g => g.name === genre)?.id;
      if (genreId) {
        results = results.filter(movie => movie?.genre_ids?.includes(genreId));
      }
    }
    
    // Filter by rating
    results = results.filter(movie => {
      const rating = parseFloat(movie?.vote_average?.toString());
      return rating >= ratingRange[0] && rating <= ratingRange[1];
    });
    
    setFilteredMovies(results);
  }, [movies, year, genre, ratingRange]);

  const clearFilters = () => {
    setYear('');
    setGenre('');
    setRatingRange([0, 10]);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Search Results: "{query}"</h1>
        <Button 
          onClick={toggleFilter} 
          variant="outline" 
          className="flex items-center gap-2 md:hidden"
        >
          <Filter className="h-4 w-4" />
          Filters
          {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - left side */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 lg:w-1/5 space-y-6 bg-card p-4 rounded-lg border shadow-sm`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Year</label>
            <Input
              type="number"
              placeholder="Filter by year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Genre</label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.name}>{genre.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Rating</label>
              <span className="text-sm text-muted-foreground">
                {ratingRange[0]} - {ratingRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[0, 10]}
              min={0}
              max={10}
              step={0.5}
              value={ratingRange}
              onValueChange={setRatingRange}
            />
          </div>
          
          <Button className="w-full" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
        
        {/* Results - right side */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold mb-2">No movies found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search for something else</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Found {filteredMovies.length} results
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-8 gap-2">
                <Button 
                  variant="outline" 
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center px-4">
                  Page {page} of {totalPages}
                </div>
                <Button 
                  variant="outline" 
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;