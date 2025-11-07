'use client';

interface SyncButtonProps {
  onSync: () => void;
  loading: boolean;
}

export default function SyncButton({ onSync, loading }: SyncButtonProps) {
  return (
    <button
      onClick={onSync}
      disabled={loading}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
    >
      {loading ? 'Syncing...' : 'Sync from SWAPI'}
    </button>
  );
}
