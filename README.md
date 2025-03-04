# Movie Recommendation App - Project Documentation

## Project Overview
The **Movie Recommendation App** is a web application built with Next.js that allows users to browse trending movies, receive personalized recommendations, and save their favorite movies. The app integrates with external movie APIs to fetch real-time data and provides an engaging user experience.

---

## Table of Contents
1. [Technical Stack](#technical-stack)
2. [Running the App Locally](#running-the-app-locally)
2. [Architecture Overview](#architecture-overview)
3. [Feature Breakdown](#feature-breakdown)
4. [Development Timeline](#development-timeline)
5. [API Integration Guide](#api-integration-guide)
6. [Component Structure](#component-structure)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Plan](#deployment-plan)

---

## Technical Stack
### Core Technologies
- **Next.js**: Server-side rendering and dynamic routing
- **TypeScript**: Type safety and maintainability
- **Styled Components**: Styling and theming

### Additional Libraries
- **React Query**: API data fetching, caching, and state management
- **Framer Motion**: Animations and transitions
- **Jest & React Testing Library**: Unit and integration testing
- **ESLint & Prettier**: Code quality and formatting

---

## Running the App Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps
1. **Clone the repository:**
  ```bash
  git clone https://github.com/Donald-Edinam/sankofa-flix.git
  cd sankofa-flix
  ```

2. **Install dependencies:**
  ```bash
  npm install

3. **Set up the environment variables:**
  - Create a `.env.local` file in the root directory of the project.
  - Add the following environment variables:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
    ```

4. **Run the development server:**
  ```bash
  npm run dev

  ```

5. **Open the app in your browser:**
  - Navigate to `http://localhost:3000`

6. **Build for production (optional):**
  ```bash
  npm run build
  npm start
  ```

### Notes
- Ensure you have a valid TMDB API key. You can obtain one by creating an account on [The Movie Database (TMDB) website](https://www.themoviedb.org/).
- The `NEXT_PUBLIC_API_BASE_URL` should point to your local API endpoint during development.

---



## Architecture Overview
The application follows a modular architecture with clear separation of concerns:
```
/app
  /api            # API route handlers
  /components     # Reusable UI components
    /ui           # Basic UI elements
    /layout       # Layout components
    /movie        # Movie-specific components
  /contexts       # React contexts for state management
  /hooks          # Custom hooks
  /lib            # Utility functions and API clients
  /pages          # Page components and routes
  /public         # Static assets
  /styles         # Global styles and theme configurations
  /types          # TypeScript type definitions
```

---

## Feature Breakdown
### 1. Movie Dashboard (Homepage)
- **Components:** `MovieCard`, `TrendingSection`, `RecommendationSection`
- **Features:** Fetch trending movies, infinite scrolling for recommendations, skeleton loaders

### 2. Dynamic Movie Details Pages
- **Components:** `MovieHeader`, `MovieDetails`, `RelatedMovies`
- **Features:** Dynamic routing, server-side rendering, SEO optimization

### 3. Favorites Management
- **Components:** `FavoriteButton`, `FavoritesPage`
- **Features:** Save/remove favorites, local storage persistence, backend API integration

### 4. Search Functionality
- **Components:** `SearchBar`, `SearchResults`
- **Features:** Debounced search, API handler, filtering by genre, release year

---

## Development Timeline
### Week 1: Foundation and Core Features
- **Day 1-2:** Setup Next.js, API integration, folder structure
- **Day 3-4:** Implement Movie Dashboard UI, trending movies section
- **Day 5-6:** Create dynamic movie details pages
- **Day 7:** Code review, refactor, document API integration

### Week 2: Enhanced Features and Finalization
- **Day 8-9:** Implement favorites management
- **Day 10-11:** Build search functionality, animations
- **Day 12-13:** Testing and optimization
- **Day 14:** Documentation and deployment

---

## API Integration Guide
### Authentication
- Implement auth context for user sessions
- Create interceptors for API requests

### Endpoints
- `/api/movies/trending` - Fetch trending movies
- `/api/movies/recommended` - Get recommendations
- `/api/movies/{id}` - Fetch movie details
- `/api/user/favorites` - Manage user favorites
- `/api/search` - Search functionality

### Error Handling
- Global error utility
- Retry logic for failed requests
- User-friendly error messages

### Third-Party API
- Use **The Movie Database (TMDB) API**
- Service layer for API calls
- Implement caching to reduce API calls

---

## Component Structure
### Core Components
#### `<MovieCard />`
```typescript
interface MovieCardProps {
  movie: Movie;
  variant: 'poster' | 'horizontal' | 'detailed';
  onFavoriteToggle: (id: string) => void;
  isFavorite: boolean;
}
```
#### `<MovieGrid />`
```typescript
interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
}
```
#### `<FavoriteButton />`
```typescript
interface FavoriteButtonProps {
  movieId: string;
  isFavorite: boolean;
  onToggle: (id: string) => void;
}
```

---

## Testing Strategy
### Unit Testing
- Test components in isolation
- Mock API responses
- Verify behavior with different props

### Integration Testing
- Test interactions between components
- Verify context and API usage

### End-to-End Testing
- Simulate user journeys
- Ensure core functionality and responsiveness

---

## Deployment Plan
### Pre-Deployment Checklist
- Run final tests
- Verify API endpoints
- Optimize assets for production

### Deployment Steps
- Build for production
- Deploy to **Vercel/Netlify**
- Configure environment variables

### Post-Deployment
- Monitor errors and performance
- Validate all features in production

---

## Page Components Breakdown
### 1. Homepage (Dashboard)
**Sections:** Header, Hero Banner, Trending Movies, Recommendations, Categories, Footer
**Key Components:** `<Navbar />`, `<SearchBar />`, `<HeroBanner />`, `<MovieCarousel />`, `<MovieGrid />`

### 2. Movie Details Page
**Sections:** Movie Hero, Overview, Cast, Media, Reviews, Similar Movies
**Key Components:** `<MovieBackdrop />`, `<MovieInfo />`, `<RatingDisplay />`, `<CastCarousel />`

### 3. Favorites Page
**Sections:** Favorites Hero, Empty State, Favorites Grid
**Key Components:** `<FavoritesGrid />`, `<FavoriteMovieCard />`, `<SortDropdown />`

### 4. Search Results Page
**Sections:** Search Input, Search Results
**Key Components:** `<SearchBar />`, `<SearchResults />`, `<GenreFilter />`

---

## Conclusion
The **Movie Recommendation App** is designed for an engaging and seamless user experience, utilizing Next.js for performance optimization, React Query for state management, and TMDB API for real-time data. The structured development approach ensures maintainability and scalability.

---

### Future Enhancements
- Implement **user authentication** for personalized recommendations
- Add **watchlist feature** for users
- Improve **AI-based recommendations** using machine learning
- Implement **progressive web app (PWA) features** for offline access