import { Product } from './types';
import { FALLBACK_PRODUCTS } from './products-data';

/**
 * In-memory product store
 * Simulates a database for CRUD operations
 * Note: Data resets on server restart (for demo purposes)
 */

// Initialize empty - will fetch from API on first load
let products: Product[] = [];
let nextId = 21; // Start after FakeStoreAPI's max ID (20)
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

/**
 * Initialize products from FakeStoreAPI
 * Falls back to FALLBACK_PRODUCTS if API fails
 */
async function initializeProducts(): Promise<void> {
  if (isInitialized) return;

  // Prevent multiple simultaneous initialization calls
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (response.ok) {
        products = await response.json();
      } else {
        products = [...FALLBACK_PRODUCTS];
      }
    } catch {
      console.error('Failed to fetch from FakeStoreAPI, using fallback data');
      products = [...FALLBACK_PRODUCTS];
    }
    nextId = Math.max(...products.map(p => p.id)) + 1;
    isInitialized = true;
  })();

  return initializationPromise;
}

/**
 * Ensure products are initialized before any operation
 */
async function ensureInitialized(): Promise<void> {
  if (!isInitialized) {
    await initializeProducts();
  }
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return [...products];
}

/**
 * Get a single product by ID
 */
export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

/**
 * Initialize products from API - call this before using the store
 */
export { initializeProducts };

/**
 * Create a new product
 */
export function createProduct(productData: Omit<Product, 'id'>): Product {
  const newProduct: Product = {
    ...productData,
    id: nextId++,
  };
  products.push(newProduct);
  return newProduct;
}

/**
 * Update an existing product
 */
export function updateProduct(id: number, productData: Partial<Omit<Product, 'id'>>): Product | null {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...productData,
  };
  return products[index];
}

/**
 * Delete a product
 */
export function deleteProduct(id: number): boolean {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
}

/**
 * Reset store to initial state (useful for testing)
 */
export function resetStore(): void {
  products = [];
  nextId = 21;
  isInitialized = false;
  initializationPromise = null;
}
