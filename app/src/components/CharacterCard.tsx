'use client';

import { useState } from 'react';
import { Character } from '@/types';
import { getAgeDisplay } from '@/utils/starWarsDate';
import ImageUpload from './ImageUpload';

interface CharacterCardProps {
  character: Character;
  currentDate: string;
  onImageUpdate: () => void;
}

export default function CharacterCard({
  character,
  currentDate,
  onImageUpdate,
}: CharacterCardProps) {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-shadow">
      <div className="relative h-64 bg-gray-700">
        {character.image_url ? (
          <img
            src={character.image_url}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <svg
              className="w-24 h-24"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-2 rounded-full transition-colors"
          title="Upload image"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      {showUpload && (
        <div className="p-4 bg-gray-750 border-t border-gray-700">
          <ImageUpload
            characterId={character.id}
            onSuccess={() => {
              setShowUpload(false);
              onImageUpdate();
            }}
          />
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold text-yellow-400 mb-2">
          {character.name}
        </h2>

        <div className="space-y-2 text-sm">
          <InfoRow label="Gender" value={character.gender} />
          <InfoRow label="Homeworld" value={character.homeworld} />
          <InfoRow label="Birth Year" value={character.birth_year} />
          <InfoRow
            label="Age"
            value={getAgeDisplay(character.birth_year, currentDate)}
          />
          <InfoRow label="Height" value={`${character.height} cm`} />
          <InfoRow label="Mass" value={`${character.mass} kg`} />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <details className="text-xs text-gray-400">
            <summary className="cursor-pointer hover:text-yellow-400">
              More details
            </summary>
            <div className="mt-2 space-y-1">
              <InfoRow label="Hair Color" value={character.hair_color} />
              <InfoRow label="Skin Color" value={character.skin_color} />
              <InfoRow label="Eye Color" value={character.eye_color} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white font-medium capitalize">{value}</span>
    </div>
  );
}
