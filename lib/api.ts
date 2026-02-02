import { Product } from './types';
import { FALLBACK_PRODUCTS } from './products-data';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStoreAPI
 *
 * Uses force-cache to fetch at build time and cache the data
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
    // Fallback to embedded data if API fails
    console.warn('API fetch failed for all products, using fallback data:', error);
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Fetch a single product by ID from FakeStoreAPI
 *
 * Uses force-cache to fetch at build time and cache the data
 * Falls back to embedded data if API fails
 * @param id - Product ID
 * @returns Promise<Product> - Product details
 */
export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Fallback to embedded data if API fails
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

/**
 * Get proxied image URL to avoid CORB blocking
 *
 * fakestoreapi.com returns wrong Content-Type header (text/html instead of image/jpeg),
 * causing CORB (Cross-Origin Read Blocking) to block images in browsers.
 *
 * This function wraps the image URL in our proxy API route that fetches the image
 * and returns it with the correct Content-Type header.
 *
 * @param imageUrl - Original image URL from fakestoreapi.com
 * @returns Proxied URL through our API route (e.g., /api/image-proxy?url=...)
 *
 * Example:
 * Input:  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
 * Output: "/api/image-proxy?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F81fPKd-2AYL._AC_SL1500_.jpg"
 */
export function getProxiedImageUrl(imageUrl: string): string {
  return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
}
