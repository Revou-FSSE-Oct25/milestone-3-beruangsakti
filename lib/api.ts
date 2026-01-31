import { Product } from './types';
import { FALLBACK_PRODUCTS } from './products-data';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStoreAPI
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
 * @param id - Product ID
 * @returns Promise<Product> - Product details
 */
export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      // Disable caching for SSR - fetch fresh data on each request
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
  const response = await fetch(`${API_BASE_URL}/products/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

/**
 * Fetch products by category from FakeStoreAPI
 * @param category - Category name
 * @returns Promise<Product[]> - Array of products in the category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }

  return response.json();
}
