import { Movie } from "@/interfaces";

async function fetchTrendingMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/trending/`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
  
async function getMovieDetails(id: string): Promise<Movie | null> {
  try {
    // Use revalidation instead of no-store to improve performance
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${id}`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

const fetchRecommendedMovies = async ({ movieId }: { movieId: number | string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${movieId}/recommendations/`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) throw new Error('Failed to fetch recommended movies');
    return await response.json();
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
}

export { fetchRecommendedMovies, fetchTrendingMovies, getMovieDetails }