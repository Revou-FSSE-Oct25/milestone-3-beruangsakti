// Product type from FakeStoreAPI
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart context type
export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// User role type
export type UserRole = 'user' | 'admin';

// User type
export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
