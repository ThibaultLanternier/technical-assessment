'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (params: {
    name?: string;
    gender?: string;
    homeworld?: string;
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [homeworld, setHomeworld] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      name: name || undefined,
      gender: gender || undefined,
      homeworld: homeworld || undefined,
    });
  };

  const handleReset = () => {
    setName('');
    setGender('');
    setHomeworld('');
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="n/a">N/A</option>
            <option value="hermaphrodite">Hermaphrodite</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Homeworld</label>
          <input
            type="text"
            value={homeworld}
            onChange={(e) => setHomeworld(e.target.value)}
            placeholder="Search by planet..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
