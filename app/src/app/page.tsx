'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';
import SearchBar from '@/components/SearchBar';
import SyncButton from '@/components/SyncButton';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('34ABY');

  const fetchCharacters = async (searchParams?: {
    name?: string;
    gender?: string;
    homeworld?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (searchParams?.name) queryParams.append('name', searchParams.name);
      if (searchParams?.gender) queryParams.append('gender', searchParams.gender);
      if (searchParams?.homeworld) queryParams.append('homeworld', searchParams.homeworld);

      const url = `/api/characters${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }

      const data = await response.json();
      setCharacters(data.characters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearch = (searchParams: {
    name?: string;
    gender?: string;
    homeworld?: string;
  }) => {
    fetchCharacters(searchParams);
  };

  const handleSync = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sync', { method: 'POST' });
      
      if (!response.ok) {
        throw new Error('Failed to sync characters');
      }

      await fetchCharacters();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-yellow-400">
            Star Wars Character Database
          </h1>
          <p className="text-gray-300 mb-6">
            Search and explore characters from the Star Wars universe
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Current Date (for age calculation):
            </label>
            <input
              type="text"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              placeholder="e.g., 34ABY or 19BBY"
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Format: [number]BBY or [number]ABY (Before/After Battle of Yavin)
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <SearchBar onSearch={handleSearch} />
            <SyncButton onSync={handleSync} loading={loading} />
          </div>
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            <p className="mt-4 text-gray-400">Loading...</p>
          </div>
        )}

        {!loading && characters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No characters found.</p>
            <p className="text-gray-500 text-sm">
              Click "Sync from SWAPI" to load characters from the Star Wars API.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              currentDate={currentDate}
              onImageUpdate={() => fetchCharacters()}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
