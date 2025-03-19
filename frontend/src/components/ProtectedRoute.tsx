'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function ProtectedRoute({ role, children }: { role: string; children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== role)) {
      router.push('/login');
    }
  }, [user, loading, role, router]);

  if (loading || !user || user.role !== role) {
    return <div>Loading...</div>;
  }

  return children;
}