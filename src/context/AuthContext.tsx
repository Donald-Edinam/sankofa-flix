// contexts/AuthContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/interfaces';
import { loginUser, registerUser, logoutUser, isAuthenticated, getAccessToken } from '@/services/authService';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Fetch user data using the access token
  const fetchUserData = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setUser(null);
      return;
    }

    try {
      // Replace with your API endpoint to fetch user data
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      // Check if user is authenticated
      const isAuth = isAuthenticated();
      setAuthenticated(isAuth);

      // if (isAuth) {
      //   // Refresh token if needed
      //   await refreshToken();

      //   // Fetch user data
      //   await fetchUserData();
      // }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setLoading(true);

    const response = await loginUser({ username, password });

    if (response) {
      toast.success("Login successful");
      setUser(response.user);
      setAuthenticated(true);
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  // Register function
  const register = async (username: string, email: string, password: string, password2: string) => {
    setLoading(true);

    const response = await registerUser({ username, email, password, password2 });

    if (response) {
      setUser(response.user);
      setAuthenticated(true);
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, authenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}