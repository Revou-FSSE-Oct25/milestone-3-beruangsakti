import { Product } from './types';
import { FALLBACK_PRODUCTS } from './products-data';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStoreAPI
 *
 * NOTE: We use fallback data directly to ensure consistency between
 * homepage and product detail pages. The external API may fail or return
 * different data, causing images to be inconsistent across pages.
 *
 * @returns Promise<Product[]> - Array of products
 */
export async function getAllProducts(): Promise<Product[]> {
  // Use fallback data directly for consistency
  // This ensures homepage and product pages show the same images
  return FALLBACK_PRODUCTS;
}

/**
 * Fetch a single product by ID from FakeStoreAPI
 *
 * NOTE: We use fallback data directly to ensure consistency between
 * homepage and product detail pages. The external API may fail or return
 * different data, causing images to be inconsistent across pages.
 *
 * @param id - Product ID
 * @returns Promise<Product> - Product details
 */
export async function getProductById(id: string): Promise<Product> {
  // Use fallback data directly for consistency
  // This ensures homepage and product pages show the same images
  const product = FALLBACK_PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    throw new Error(`Product ${id} not found`);
  }

  return product;
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
