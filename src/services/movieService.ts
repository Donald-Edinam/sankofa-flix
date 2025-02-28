// services/memoService.ts
import { Movie, Genre } from '@/interfaces';
import api from '@/lib/api';

export const movieApi = {
    fetchTrendingMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies');
  }
};


const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "1994",
    rating: 4.7,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genres: ["Drama"]
  },
  {
    id: 2,
    title: "The Godfather",
    backdropUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "1972",
    rating: 4.8,
    description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    genres: ["Drama", "Action"]
  },
  {
    id: 3,
    title: "Interstellar",
    backdropUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "2014",
    rating: 4.6,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genres: ["Drama", "Action"]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    backdropUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "1994",
    rating: 4.5,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genres: ["Drama", "Comedy"]
  },
  {
    id: 5,
    title: "The Dark Knight",
    backdropUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "2008",
    rating: 4.9,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genres: ["Action"]
  },
  {
    id: 6,
    title: "Inception",
    backdropUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "2010",
    rating: 4.7,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genres: ["Action", "Drama"]
  },
  {
    id: 7,
    title: "Atlantics",
    backdropUrl: "https://images.unsplash.com/photo-1559583109-3e7968e11449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "2019",
    rating: 4.5,
    description: "In a suburb of Dakar, a group of construction workers abandon their work on a tower to seek better fortunes abroad.",
    genres: ["Drama"]
  },
  {
    id: 8,
    title: "Planet Earth",
    backdropUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "2006",
    rating: 4.8,
    description: "A documentary series about Earth's natural wonders and wildlife.",
    genres: ["Documentary"]
  },
  {
    id: 9,
    title: "Superbad",
    backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    releaseDate: "2007",
    rating: 4.3,
    description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    genres: ["Comedy"]
  }
];

export const genreMovies = {
  fetchTrendingMovies: async (): Promise<Movie[]> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMovies);
      }, 800);
    });
  },
  
  fetchMoviesByGenre: async (genre: Genre | 'All Genres'): Promise<Movie[]> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        if (genre === "All Genres") {
          resolve(mockMovies);
        } else {
          const filteredMovies = mockMovies.filter(movie => 
            movie.genres?.includes(genre)
          );
          resolve(filteredMovies);
        }
      }, 400);
    });
  }
};