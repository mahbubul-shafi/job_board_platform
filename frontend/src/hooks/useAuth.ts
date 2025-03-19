'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/utils/api';

interface User {
  id: string;
  email: string;
  role: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const { data, error } = await fetchApi<User>('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (error) {
        localStorage.removeItem('token');
        router.push('/login');
      } else if (data) {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const login = async (email: string, password: string) => {
    const { data, error } = await fetchApi<{ token: string; role: string }>('http://localhost:5000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (error) {
      throw new Error(error);
    } else if (data) {
      localStorage.setItem('token', data.token);
      setUser({ id: '1', email, role: data.role }); // Replace with actual user data from the backend
      router.push(data.role === 'employer' ? '/employer' : '/employee');
    }
  };

  const signup = async (email: string, password: string, role: string) => {
    const { data, error } = await fetchApi<{ token: string }>('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });

    if (error) {
      throw new Error(error);
    } else if (data) {
      localStorage.setItem('token', data.token);
      setUser({ id: '1', email, role }); // Replace with actual user data from the backend
      router.push(role === 'employer' ? '/employer' : '/employee');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return { user, loading, login, signup, logout };
}