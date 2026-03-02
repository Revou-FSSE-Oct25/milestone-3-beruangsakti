'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';

interface LoginFormProps {
  redirectUrl?: string;
}

/**
 * Login Form Component
 * Handles user authentication with username and password
 */
export default function LoginForm({ redirectUrl = '/' }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setIsSubmitting(true);

    const result = await login(username, password);

    if (result.success) {
      showToast('Login successful! Welcome back.', 'success');
      router.push(redirectUrl);
    } else {
      setError(result.error || 'Login failed');
      showToast(result.error || 'Login failed', 'error');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your username"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your password"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p className="mb-2">Demo accounts:</p>
        <div className="space-y-2">
          <div className="bg-gray-100 px-3 py-2 rounded">
            <p className="font-medium text-gray-700">User Account</p>
            <p><code>user</code> / <code>user123</code></p>
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded">
            <p className="font-medium text-gray-700">Admin Account</p>
            <p><code>admin</code> / <code>admin123</code></p>
          </div>
        </div>
      </div>
    </form>
  );
}
