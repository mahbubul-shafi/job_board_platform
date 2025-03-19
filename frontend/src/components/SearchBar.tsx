import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={query}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}