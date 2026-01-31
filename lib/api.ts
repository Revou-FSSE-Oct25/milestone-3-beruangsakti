import { Product } from './types';
import { FALLBACK_PRODUCTS } from './products-data';

/**
 * Fetch all products from FakeStoreAPI through our proxy
 *
 * Uses /api/proxy/products to bypass Cloudflare bot protection
 * Falls back to embedded data if proxy fails
 * @returns Promise<Product[]> - Array of products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    // Try to fetch through our proxy first
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/proxy/products`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Proxy request failed');
    }

    const data = await response.json();

    // Check if proxy returned an error
    if ('error' in data) {
      throw new Error(data.error);
    }

    return data as Product[];
  } catch (error) {
    // Fallback to embedded data if API fails (e.g., Cloudflare blocking on Vercel)
    console.warn('API fetch failed for all products, using fallback data:', error);
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Fetch a single product by ID from FakeStoreAPI through our proxy
 *
 * Uses /api/proxy/products/[id] to bypass Cloudflare bot protection
 * Falls back to embedded data if proxy fails
 * @param id - Product ID
 * @returns Promise<Product> - Product details
 */
export async function getProductById(id: string): Promise<Product> {
  try {
    // Try to fetch through our proxy first
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/proxy/products/${id}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Proxy request failed: ${response.status}`);
    }

    const data = await response.json();

    // Check if proxy returned an error
    if ('error' in data) {
      throw new Error(data.error);
    }

    return data as Product;
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
