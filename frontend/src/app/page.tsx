import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import Footer from '@/components/Footer';
import jobs from '@/data/jobs.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <SearchBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}