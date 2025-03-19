'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
}

export default function JobDetails({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <p className="text-gray-600 mb-2">{job.company}</p>
          <p className="text-gray-600 mb-4">{job.location}</p>
          <p className="text-blue-600 font-semibold">{job.salary}</p>
          <p className="mt-4 text-gray-800">{job.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
}