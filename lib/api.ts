import { Product } from './types';
import { FALLBACK_PRODUCTS } from './products-data';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStoreAPI
 *
 * Uses force-cache to ensure data is available at build time and cached
 * Falls back to embedded data if API fails (e.g., Cloudflare blocking)
 * @returns Promise<Product[]> - Array of products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: 'force-cache', // Cache at build time
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();

    // Replace fakestore image URLs with Unsplash to avoid Cloudflare blocking
    return products.map((product: Product) => ({
      ...product,
      image: getUnsplashImageForProduct(product.id, product.category),
    }));
  } catch (error) {
    // Fallback to embedded data if API fails
    console.warn('API fetch failed for all products, using fallback data:', error);
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Fetch a single product by ID from FakeStoreAPI
 *
 * Uses force-cache (like homepage) to ensure data is cached and available
 * Falls back to embedded data if API fails (e.g., Cloudflare blocking)
 * @param id - Product ID
 * @returns Promise<Product> - Product details
 */
export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'force-cache', // Use same caching as homepage to avoid Cloudflare blocking
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.status} ${response.statusText}`);
    }

    const product = await response.json();

    // Replace fakestore image URL with Unsplash to avoid Cloudflare blocking
    return {
      ...product,
      image: getUnsplashImageForProduct(product.id, product.category),
    };
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
 * Get Unsplash image URL for a product based on ID and category
 * This ensures we use reliable CDN images instead of Cloudflare-blocked fakestore images
 */
function getUnsplashImageForProduct(id: number, category: string): string {
  // Map of product IDs to their Unsplash images (matching our fallback data)
  const unsplashImages: Record<number, string> = {
    1: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    2: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    3: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
    4: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&h=500&fit=crop',
    5: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
    6: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    7: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
    8: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    9: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    10: 'https://images.unsplash.com/photo-1628557024746-af30c4d3793a?w=500&h=500&fit=crop',
    11: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    12: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
    13: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
    14: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
    15: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop',
    16: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop',
    17: 'https://images.unsplash.com/photo-1571513817779-37311e3fa0f7?w=500&h=500&fit=crop',
    18: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop',
    19: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop',
    20: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
  };

  return unsplashImages[id] || unsplashImages[1];
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
