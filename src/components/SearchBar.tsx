import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { useDebounce } from 'use-debounce';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = usePlayerStore();
  const [debouncedCallback] = useDebounce(
    (value: string) => setSearchQuery(value),
    300
  );

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search for AI-generated music..."
        className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        defaultValue={searchQuery}
        onChange={(e) => debouncedCallback(e.target.value)}
      />
    </div>
  );
};