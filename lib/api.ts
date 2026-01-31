import { Product } from './types';
import { FALLBACK_PRODUCTS } from './products-data';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStoreAPI
 * Falls back to embedded data if API fails
 * @returns Promise<Product[]> - Array of products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  } catch (error) {
    // Fallback to embedded data if API fails (e.g., Cloudflare blocking on Vercel)
    console.warn('API fetch failed for all products, using fallback data:', error);
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Fetch a single product by ID from FakeStoreAPI
 * Falls back to embedded data if API fails
 * @param id - Product ID
 * @returns Promise<Product> - Product details
 */
export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Fallback to embedded data if API fails (e.g., Cloudflare blocking on Vercel)
    console.warn(`API fetch failed for product ${id}, using fallback data:`, error);
    const fallbackProduct = FALLBACK_PRODUCTS.find(p => p.id === parseInt(id));
    if (!fallbackProduct) {
      throw new Error(`Product ${id} not found in fallback data`);
    }
    return fallbackProduct;
  }
}

/**
 * Fetch all categories from FakeStoreAPI
 * @returns Promise<string[]> - Array of category names
 */
export async function getCategories(): Promise<string[]> {
  // Categories are not currently used in the application
  // This is a placeholder for future category filtering
  return [];
}

/**
 * Fetch products by category from FakeStoreAPI
 * @param category - Category name
 * @returns Promise<Product[]> - Array of products in the category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Category filtering is not currently used in the application
  // This is a placeholder for future category filtering
  return [];
}
