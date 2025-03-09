import React from 'react';

const MovieDetailsSkeleton = () => {
  return (
    <div className="bg-background text-white min-h-screen dark:bg-black dark:text-gray-300">
      {/* Hero Section Skeleton */}
      <section className="relative pt-8 md:pt-16">
        {/* Backdrop with overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-gray-700 dark:from-gray-900 dark:to-gray-800">
          <div className="w-full h-full animate-pulse bg-gray-700 dark:bg-gray-800" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster Skeleton */}
            <div className="w-48 md:w-64 mx-auto md:mx-0 flex-shrink-0">
              <div className="w-full h-96 rounded-md shadow-lg animate-pulse bg-gray-700 dark:bg-gray-800" />
            </div>
            
            {/* Movie Info Skeleton */}
            <div className="flex-grow md:my-auto">
              {/* Title */}
              <div className="h-10 w-3/4 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800 mb-3" />
              
              {/* Tagline */}
              <div className="h-4 w-1/2 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800 mb-4" />
              
              {/* Meta info */}
              <div className="flex items-center gap-5 mb-4">
                <div className="h-4 w-16 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
                <div className="h-4 w-20 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
                <div className="h-4 w-16 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="h-8 w-20 rounded-full animate-pulse bg-gray-700 dark:bg-gray-800"
                  />
                ))}
              </div>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="h-10 w-32 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
                <div className="h-10 w-40 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
                <div className="h-10 w-10 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Overview Section Skeleton */}
      <section className="container mx-auto px-4 py-8">
        <div className="h-6 w-32 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800 mb-4" />
        <div className="h-20 w-full rounded-md animate-pulse bg-gray-700 dark:bg-gray-800 mb-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-10">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex">
              <div className="w-24 h-4 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800 mr-2" />
              <div className="flex-1 h-4 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </section>
      
      {/* Recommended Section Skeleton */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-48 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
          <div className="h-4 w-16 rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-[2/3] rounded-md animate-pulse bg-gray-700 dark:bg-gray-800" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieDetailsSkeleton;