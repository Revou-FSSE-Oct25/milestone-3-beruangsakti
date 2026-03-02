'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

/**
 * Admin Navigation Component
 * Side navigation for admin dashboard
 */
export default function AdminNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
  ];

  return (
    <aside className="w-64 bg-gray-800 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <Link href="/admin" className="text-xl font-bold text-white">
          Admin Panel
        </Link>
        {user && (
          <p className="text-sm text-gray-400 mt-1">
            {user.firstname} {user.lastname}
          </p>
        )}
      </div>

      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white transition-colors"
        >
          <span>🏠</span>
          <span>Back to Store</span>
        </Link>
      </div>
    </aside>
  );
}
