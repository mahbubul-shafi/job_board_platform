'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function EmployerDashboard() {
  return (
    <ProtectedRoute role="employer">
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>
        {/* Add employer-specific content here */}
      </div>
    </ProtectedRoute>
  );
}