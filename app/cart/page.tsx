'use client';

import { useCart } from '@/lib/cart-context';
import { useToast } from '@/lib/toast-context';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Cart Page - Client Component
 * Displays items in the shopping cart with total price
 */
export default function CartPage() {
  const { cart, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const { showToast } = useToast();

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {cartCount === 0
            ? 'Your cart is empty'
            : `You have ${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart`}
        </p>
      </div>

      {/* Empty Cart State */}
      {cart.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Cart Items */}
      {cart.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
              >
                {/* Product Image */}
                <div className="relative h-24 w-24 bg-gray-100 rounded flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.product.title}
                  </h3>
                  <p className="text-gray-600">
                    ${item.product.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>

                {/* Item Total & Remove Button */}
                <div className="text-right">
                  <p className="font-bold text-gray-900 mb-2">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full mt-4 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={() => showToast('Checkout functionality coming soon!', 'info')}
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/"
                  className="block text-center text-blue-600 hover:text-blue-800 mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
