'use client';

import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Job Board
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === 'employee' && (
                <Link href="/employee" className="hover:underline">
                  Dashboard
                </Link>
              )}
              <button onClick={logout} className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}