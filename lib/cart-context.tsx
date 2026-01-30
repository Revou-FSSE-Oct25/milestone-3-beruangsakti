'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartContextType, CartItem, Product } from './types';

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Component
 * Manages shopping cart state and provides cart operations to children
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

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
