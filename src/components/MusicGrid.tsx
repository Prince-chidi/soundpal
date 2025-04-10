import React from 'react';
import { Play, Heart, Plus } from 'lucide-react';
import { usePlayerStore, Song } from '../store/playerStore';
import { useAuthStore } from '../store/authStore';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const demoSongs: Song[] = [
  {
    id: '1',
    title: 'Eko Rythm',
    genre: 'Afrobeat',
    duration: 180,
    coverUrl: 'https://res.cloudinary.com/dqtyu2frf/image/upload/v1737417558/freepik__the-style-is-candid-image-photography-with-natural__18746_zriotr.jpg',
    audioUrl: 'https://res.cloudinary.com/dqtyu2frf/video/upload/v1737417197/Eko_Rhythm_o56rlw.mp3',
    streams: '3:36',
    mood: 'afro',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    title: 'Nefertiti Queen',
    genre: 'melodic, calm',
    duration: 180,
    coverUrl: 'https://res.cloudinary.com/dqtyu2frf/image/upload/v1737420071/freepik__the-style-is-candid-image-photography-with-natural__18747_uajozu.jpg',
    audioUrl: 'https://res.cloudinary.com/dqtyu2frf/video/upload/v1737419905/Nefertiti_Queen_smck0n.mp3',
    streams: '2:46',
    mood: 'Calm',
    createdAt: '2024-03-10',
  },
 
];

export const exportedSongs = demoSongs;

export const MusicGrid = () => {
  const { setCurrentSong, searchQuery, selectedGenre, currentView } = usePlayerStore();
  const { user, addToFavorites, removeFromFavorites } = useAuthStore();

  const filteredSongs = demoSongs.filter((song) => {
    if (currentView === 'library' && !user?.favorites.includes(song.id)) {
      return false;
    }
    
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleAddToPlaylist = (song: Song, playlistId: string) => {
    if (user) {
      const playlist = user.playlists.find(p => p.id === playlistId);
      if (playlist && !playlist.songIds.includes(song.id)) {
        useAuthStore.getState().addToPlaylist(playlistId, song.id);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredSongs.map((song) => (
        <div
          key={song.id}
          className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors group"
        >
          <div className="relative">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-full aspect-square object-cover rounded-md mb-4"
            />
            <button
              onClick={() => setCurrentSong(song)}
              className="absolute bottom-4 right-4 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 transform"
            >
              <Play className="h-6 w-6 text-black" fill="black" />
            </button>
          </div>
          <h3 className="text-white font-medium truncate">{song.title}</h3>
          <p className="text-sm text-gray-400">{song.genre}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">{song.streams.toLocaleString()}</span>
            <div className="flex items-center space-x-2">
              {user && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-gray-900 rounded-lg p-2 w-48 shadow-xl z-50">
                      {user.playlists.map((playlist) => (
                        <DropdownMenu.Item
                          key={playlist.id}
                          onClick={() => handleAddToPlaylist(song, playlist.id)}
                          className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-800 rounded-md cursor-pointer"
                        >
                          <span>{playlist.name}</span>
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              )}
              <button
                onClick={() => user?.favorites.includes(song.id) ? removeFromFavorites(song.id) : addToFavorites(song.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Heart
                  className="h-4 w-4"
                  fill={user?.favorites.includes(song.id) ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};