'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product } from '@/lib/types';
import ProductForm from '@/components/ui/ProductForm';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Edit Product Page - Client Component
 * Fetches product data from API to ensure consistent data across all contexts
 * This fixes the 404 error for newly added products
 */
export default function EditProductPage({ params }: EditProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
          setError(true);
          return;
        }

        const response = await fetch(`/api/admin/products/${id}`);

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params]);

  if (error) {
    notFound();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    notFound();
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
        <ProductForm product={product} isEdit />
      </div>
    </div>
  );
}
