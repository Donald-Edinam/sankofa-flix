import axios, { AxiosError } from 'axios';
import { User } from '@/interfaces';
import toast from 'react-hot-toast';
import { setTimeout } from 'timers';

// Define interfaces for authentication
interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password2: string;
}

interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

// Define a type for the Axios error response
interface ApiError {
  message: string;
  status?: number;
  data?: any; // Additional error details from the server
}

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Login user with username and password
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse | null> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login/', credentials);

    // Store tokens in localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }

    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError<ApiError>);
    return null;
  }
}

/**
 * Register new user
 */
export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse | null> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register/', credentials);

    // Store tokens in localStorage (client-side only)
    if (typeof window !== 'undefined') {
      // toast.success("Account created successfully! Please login to continue", { duration: 3500 });
      setTimeout(
        window.location.href = "/login", 3000
      )
    }

    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError<ApiError>);
    return null;
  }
}

/**
 * Refresh access token using refresh token
 */
// export async function refreshToken(): Promise<string | null> {
//   try {
//     // Only execute on client-side
//     if (typeof window === 'undefined') return null;

//     const refreshToken = localStorage.getItem('refresh_token');
//     if (!refreshToken) return null;

//     const response = await apiClient.post<{ access: string }>('/auth/token/refresh/', {
//       refresh: refreshToken,
//     });

//     // Update the access token in localStorage
//     localStorage.setItem('access_token', response.data.access);

//     return response.data.access;
//   } catch (error) {
//     handleApiError(error as AxiosError<ApiError>);

//     // If refresh fails, clear tokens
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//       toast.error("Your session has expired, Please login to continue")
//       // setTimeout(
//       //   window.location.href = "/login", 3000
//       // )
//     }

//     return null;
//   }
// }

/**
 * Logout user by removing tokens
 */
export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

/**
 * Get current authentication status
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('access_token');
}

/**
 * Get access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

/**
 * Handle API errors
 */
function handleApiError(error: AxiosError<ApiError>): void {
  if (error.response) {
    const { status, data } = error.response;

    if (typeof data === 'object' && data !== null) {
      // Loop through all possible error fields dynamically
      Object.entries(data).forEach(([key, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg) => toast.error(`${key}: ${msg}`));
        } else if (typeof messages === 'string') {
          toast.error(`${key}: ${messages}`);
        } else {
          toast.error(`Error: ${JSON.stringify(messages)}`);
        }
      });
    } else {
      toast.error(`Error ${status}: ${typeof data === 'string' ? data : 'An unexpected error occurred.'}`);
    }

    console.error('API Error:', error.response);
  } else if (error.request) {
    toast.error('Network Error: Please check your internet connection.');
    console.error('Network Error:', error.request);
  } else {
    toast.error(`Error: ${error.message}`);
    console.error('Request Error:', error.message);
  }
}
