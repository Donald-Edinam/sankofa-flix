import React from 'react';
import { Star, Play, Plus, Share } from 'lucide-react';

interface Movie {
  title: string;
  year: string;
  runtime: string;
  rating: number;
  genres: string[];
  overview: string;
  director: string;
  writers: string[];
  releaseDate: string;
  production: string;
  cast: { name: string; character: string; image: string }[];
}

const MovieDetails: React.FC<{ movie: Movie }> = ({ movie }) => {
  // Example movie data with values from the screenshot
  const exampleMovie = {
    title: "The Lion's Echo",
    year: "2025",
    runtime: "2h 15m",
    rating: 8.5,
    genres: ["Drama", "Historical", "Cultural"],
    overview: "A powerful tale of tradition and modernity colliding in contemporary Africa, as a young woman challenges centuries-old customs while honoring her heritage set against the backdrop of Ghana's vibrant culture; the story echoes through generations of her future.",
    director: "Kwame Mensah",
    writers: ["Abena Nyarko", "Samuel Osei"],
    releaseDate: "March 15, 2025",
    production: "SankofaStudios",
    cast: [
      { name: "Aisha Omar", character: "Amara", image: "/api/placeholder/160/160" },
      { name: "Kofi Boateng", character: "Elder Kwesi", image: "/api/placeholder/160/160" },
      { name: "Efua Mensah", character: "Mama Abena", image: "/api/placeholder/160/160" },
      { name: "David Owusu", character: "Kojo", image: "/api/placeholder/160/160" }
    ]
  };

  // Use provided movie data or fallback to example data
  const movieData = movie || exampleMovie;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        {/* Backdrop with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Movie backdrop" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-48 md:w-64 mx-auto md:mx-0 flex-shrink-0">
              <img 
                src="/api/placeholder/300/450" 
                alt="Movie poster" 
                className="w-full rounded-md shadow-lg"
              />
            </div>
            
            {/* Movie Info */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{movieData.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span>{movieData.year}</span>
                <span>{movieData.runtime}</span>
                <div className="flex items-center text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1">{movieData.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movieData.genres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition">
                  <Play size={16} fill="currentColor" />
                  <span>Watch Trailer</span>
                </button>
                
                <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md transition">
                  <Plus size={16} />
                  <span>Add to Watchlist</span>
                </button>
                
                <button className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-md transition">
                  <Share size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <p className="text-gray-300 mb-10">{movieData.overview}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
          <div className="flex">
            <span className="w-24 text-gray-400">Director</span>
            <span>{movieData.director}</span>
          </div>
          
          <div className="flex">
            <span className="w-24 text-gray-400">Writers</span>
            <span>{movieData.writers.join(', ')}</span>
          </div>
          
          <div className="flex">
            <span className="w-24 text-gray-400">Release Date</span>
            <span>{movieData.releaseDate}</span>
          </div>
          
          <div className="flex">
            <span className="w-24 text-gray-400">Production</span>
            <span>{movieData.production}</span>
          </div>
        </div>
      </section>
      
      {/* Cast Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Cast</h2>
          <a href="#" className="text-green-400 text-sm hover:underline">View All</a>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;