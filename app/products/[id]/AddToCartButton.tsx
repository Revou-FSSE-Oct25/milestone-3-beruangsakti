'use client';

import { useCart } from '@/lib/cart-context';
import { useToast } from '@/lib/toast-context';
import { Product } from '@/lib/types';

interface AddToCartButtonProps {
  product: Product;
}

/**
 * AddToCartButton component
 * Client component that adds product to cart and shows confirmation
 */
export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.title} added to cart!`, 'success');
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
    >
      Add to Cart
    </button>
  );
}
