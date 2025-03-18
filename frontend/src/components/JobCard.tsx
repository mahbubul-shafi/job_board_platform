interface JobCardProps {
    job: {
      id: number;
      title: string;
      company: string;
      location: string;
      salary: string;
    };
  }
  
  export default function JobCard({ job }: JobCardProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-2">{job.company}</p>
        <p className="text-gray-600 mb-4">{job.location}</p>
        <p className="text-blue-600 font-semibold">{job.salary}</p>
      </div>
    );
  }