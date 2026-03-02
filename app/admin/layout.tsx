'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, isAdmin } from '@/lib/auth-context';
import AdminNav from '@/components/ui/AdminNav';

/**
 * Admin Layout
 * Wraps all admin pages with navigation and auth check
 * Only accessible by admin users
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated or not admin (backup to middleware)
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login?redirect=/admin');
      } else if (!isAdmin(user)) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !isAdmin(user)) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
