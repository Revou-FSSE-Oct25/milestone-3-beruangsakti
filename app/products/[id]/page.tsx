import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getAllProducts } from '@/lib/api';
import AddToCartButton from './AddToCartButton';

/**
 * Generate static params for product routes
 * This tells Next.js which product IDs are valid
 */
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    // Return first 10 products as static, rest will be SSR
    // This improves build time while still allowing dynamic routes
    return products.slice(0, 10).map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

/**
 * Product Detail Page - Server Component
 * Uses SSR (Server-Side Rendering) to fetch product data
 * Dynamic route: /products/[id]
 */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative h-96 bg-gray-100 rounded-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-sm text-gray-500 mb-2 capitalize">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-4xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
