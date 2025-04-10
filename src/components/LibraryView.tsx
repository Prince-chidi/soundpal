import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Music, PlayCircle } from 'lucide-react';
import { usePlayerStore, Song } from '../store/playerStore';

export const LibraryView = () => {
  const { user } = useAuthStore();
  const { setCurrentSong } = usePlayerStore();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <Music className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Sign in to view your library</h2>
        <p className="text-gray-400">Create playlists and save your favorite songs</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {user.playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-medium mb-2">{playlist.name}</h3>
              <p className="text-sm text-gray-400">
                {playlist.songIds.length} songs
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Liked Songs</h2>
        <div className="space-y-2">
          {user.favorites.length === 0 ? (
            <p className="text-gray-400">No liked songs yet</p>
          ) : (
            user.favorites.map((songId) => {
              const song = usePlayerStore
                .getState()
                .playlist.find((s) => s.id === songId);
              if (!song) return null;
              return (
                <div
                  key={songId}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-900 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <h4 className="font-medium">{song.title}</h4>
                      <p className="text-sm text-gray-400">{song.genre}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentSong(song)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <PlayCircle className="h-8 w-8 text-green-500" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};