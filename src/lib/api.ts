import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create a base Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
});

// Generic error handler
const handleApiError = (error: AxiosError): never => {
  console.error(`API Error: ${error.message}`);
  throw error;
};

// Define a generic type for the API response
type ApiResponse<T> = Promise<T>;

// API methods
const api = {
  get: async <T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): ApiResponse<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.get<T>(url, config);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ): ApiResponse<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.post<T>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ): ApiResponse<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.patch<T>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  },

  delete: async <T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): ApiResponse<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  },
};

export default api;