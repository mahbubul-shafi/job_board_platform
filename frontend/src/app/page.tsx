'use client'
import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import Footer from '@/components/Footer';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <SearchBar onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}