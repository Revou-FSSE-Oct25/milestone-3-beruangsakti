import { Product } from './types';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStoreAPI
 * @returns Promise<Product[]> - Array of products
 */
export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

/**
 * Fetch a single product by ID from FakeStoreAPI
 * @param id - Product ID
 * @returns Promise<Product> - Product details
 */
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
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
