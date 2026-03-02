'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartContextType, CartItem, Product } from './types';

const CART_STORAGE_KEY = 'revoshop_cart';

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Component
 * Manages shopping cart state with localStorage persistence
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [cart, isLoaded]);

  /**
   * Add a product to the cart
   * If product already exists, increment quantity
   */
  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        // Increment quantity if product already in cart
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item to cart
      return [...prevCart, { product, quantity: 1 }];
    });
  }, []);

  /**
   * Remove a product from the cart
   */
  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  }, []);

  /**
   * Update quantity of a product in the cart
   */
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) {
      setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  /**
   * Clear all items from the cart
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  /**
   * Calculate total price of all items in cart
   */
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  /**
   * Calculate total number of items in cart
   */
  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Custom hook to use the Cart Context
 * Must be used within a CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
