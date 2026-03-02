import Link from 'next/link';
import ProductForm from '@/components/ui/ProductForm';

/**
 * New Product Page
 * Form for creating a new product
 */
export default function NewProductPage() {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
        <ProductForm />
      </div>
    </div>
  );
}
