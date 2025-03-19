import { useState } from "react";

export default function AuthForm({ isLogin, onSubmit, toggleMode }: { isLogin: boolean; onSubmit: (formData: { email: string; password: string; role: string }) => void; toggleMode: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ email, password, role });
    };
  
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" onClick={toggleMode} className="text-blue-600 hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    );
  }