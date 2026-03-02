'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType, User, UserRole } from './types';

const AUTH_STORAGE_KEY = 'revoshop_auth';
const AUTH_COOKIE_KEY = 'revoshop_auth_token';

// Fixed users for demo
const DEMO_USERS: Array<User & { password: string }> = [
  {
    id: 1,
    username: 'user',
    email: 'user@revoshop.com',
    firstname: 'John',
    lastname: 'Doe',
    role: 'user',
    password: 'user123',
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@revoshop.com',
    firstname: 'Admin',
    lastname: 'User',
    role: 'admin',
    password: 'admin123',
  },
];

// Helper to set cookie (for middleware)
function setAuthCookie(value: string) {
  document.cookie = `${AUTH_COOKIE_KEY}=${value}; path=/; max-age=604800; SameSite=Lax`;
}

// Helper to remove cookie
function removeAuthCookie() {
  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0`;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages user authentication state with fixed demo users
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsedUser = JSON.parse(storedAuth);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Failed to load auth from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login function
   * Validates against fixed demo users
   */
  const login = useCallback(async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user by username (case-insensitive)
    const foundUser = DEMO_USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'Invalid username or password' };
    }

    // Validate password
    if (password !== foundUser.password) {
      setIsLoading(false);
      return { success: false, error: 'Invalid username or password' };
    }

    // Create user object without password
    const userWithoutPassword: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      role: foundUser.role,
    };

    // Store user in state, localStorage, and cookie
    setUser(userWithoutPassword);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    setAuthCookie(`${userWithoutPassword.id}:${userWithoutPassword.role}`);

    setIsLoading(false);
    return { success: true };
  }, []);

  /**
   * Logout function
   * Clears user from state, localStorage, and cookie
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    removeAuthCookie();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the Auth Context
 * Must be used within an AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

/**
 * Helper function to check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}
