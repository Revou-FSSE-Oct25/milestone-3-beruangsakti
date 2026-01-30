'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component
 * Displays a product with image, title, price, and link to detail page
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        {/* Product Image */}
        <div className="relative h-64 w-full bg-gray-200">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Product Category */}
          <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>

          {/* Product Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-grow">
            {product.title}
          </h3>

          {/* Product Price */}
          <p className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
