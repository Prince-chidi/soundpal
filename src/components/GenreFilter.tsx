import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const genres = ['All', 'Ambient', 'Electronic', 'Lo-fi', 'Synthwave', 'Classical'];

export const GenreFilter = () => {
  const { selectedGenre, setSelectedGenre } = usePlayerStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre === 'All' ? null : genre)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            (genre === 'All' && !selectedGenre) || genre === selectedGenre
              ? 'bg-purple-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};