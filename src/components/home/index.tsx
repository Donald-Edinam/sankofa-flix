"use client";

import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '@/services/movieService';
import { Movie } from '@/interfaces';
import ErrorDisplay from '../common/ErrorDisplay';

const HeroBanner = () => {

    const { fetchTrendingMovies } = movieApi;

    const {data: featuredMovies, isLoading, error, isError} = useQuery({
        queryKey: ['trending-movies'],
        queryFn: fetchTrendingMovies
    });

    if (isLoading){
        return (
            <h1>Loading...</h1>
        )
    }

    if (isError) {
        return <ErrorDisplay message={error instanceof Error ? error.message : 'An unknown error occurred'} />;
      }
    

    return (
        <div className="relative w-full h-screen">
            <Carousel className="w-full h-screen">
                <CarouselContent className="h-full">
                    {featuredMovies.map((movie: Movie) => (
                        <CarouselItem key={movie.id} className="h-screen">
                            <div className="relative h-full w-full overflow-hidden rounded-lg">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${movie.backdropUrl})` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-8">
                                    <h2 className="text-4xl font-bold text-white mb-2">{movie.title}</h2>
                                    <div className="flex items-center mb-4">
                                        <span className="text-gray-300 mr-4">{movie.releaseDate}</span>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={`${i < Math.floor(movie.rating) ? 'text-yellow-600' : 'text-gray-500'} ${i === Math.floor(movie.rating) && movie.rating % 1 > 0 ? 'fill-yellow-600' : ''}`}
                                                    fill={i < Math.floor(movie.rating) ? "currentColor" : "none"}
                                                />
                                            ))}
                                            <span className="ml-2 text-gray-300">{movie.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-6 max-w-lg">{movie.description}</p>
                                    <div className="flex space-x-4">
                                        <button className="px-6 py-2 bg-red-700 text-white font-medium rounded-md hover:bg-red-800 transition-colors">
                                            Watch Trailer
                                        </button>
                                        <button className="px-6 py-2 bg-gray-800 text-white font-medium rounded-md border border-gray-600 hover:bg-gray-700 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </div>
    );
};

export default HeroBanner;