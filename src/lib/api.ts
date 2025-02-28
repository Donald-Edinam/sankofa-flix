// lib/api.ts
import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
  } from 'axios';
  
  const BASE_URL = "http://localhost:5000";
  
  const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  
  // Only run this on the client since localStorage is unavailable on the server
  if (typeof window !== 'undefined') {
    apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
  
  const handleApiError = (error: any): never => {
    console.error(`API Error: ${error}`);
    throw error;
  };
  
  const api = {
    get: async <T = any>(
      url: string,
      config?: InternalAxiosRequestConfig
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await apiClient.get<T>(url, config);
        return response.data;
      } catch (error) {
        console.error("Error at get: ", error);
        throw handleApiError(error);
      }
    },
    post: async <T = any>(
      url: string,
      data?: any,
      config?: InternalAxiosRequestConfig
    ): Promise<T> => {
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
        return handleApiError(error);
      }
    },
    patch: async <T = any>(
      url: string,
      data?: any,
      config?: InternalAxiosRequestConfig
    ): Promise<T> => {
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
        return handleApiError(error);
      }
    },
    delete: async <T = any>(
      url: string,
      config?: InternalAxiosRequestConfig
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await apiClient.delete<T>(url, config);
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
  };
  
  export default api;
  