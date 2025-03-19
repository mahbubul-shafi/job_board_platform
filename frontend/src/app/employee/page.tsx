'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import useAuth from '@/hooks/useAuth';
import { fetchApi } from '@/utils/api';
import { useEffect, useState } from 'react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
}

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await fetchApi<Job[]>('/jobs');
      if (error) {
        console.error('Failed to fetch jobs:', error);
      } else if (data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <ProtectedRoute role="employee">
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-600 mb-4">{job.location}</p>
              <p className="text-blue-600 font-semibold">{job.salary}</p>
              <p className="mt-4 text-gray-800">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}