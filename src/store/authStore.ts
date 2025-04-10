import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  playlists: Playlist[];
  favorites: string[];
}

export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
}

interface AuthState {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  addToFavorites: (songId: string) => void;
  removeFromFavorites: (songId: string) => void;
  createPlaylist: (name: string) => void;
  addToPlaylist: (playlistId: string, songId: string) => void;
  removeFromPlaylist: (playlistId: string, songId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, name) =>
        set({
          user: {
            id: Math.random().toString(36).slice(2),
            email,
            name,
            playlists: [],
            favorites: [],
          },
        }),
      logout: () => set({ user: null }),
      addToFavorites: (songId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: [...state.user.favorites, songId],
              }
            : null,
        })),
      removeFromFavorites: (songId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: state.user.favorites.filter((id) => id !== songId),
              }
            : null,
        })),
      createPlaylist: (name) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                playlists: [
                  ...state.user.playlists,
                  {
                    id: Math.random().toString(36).slice(2),
                    name,
                    songIds: [],
                  },
                ],
              }
            : null,
        })),
      addToPlaylist: (playlistId, songId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                playlists: state.user.playlists.map((playlist) =>
                  playlist.id === playlistId
                    ? {
                        ...playlist,
                        songIds: [...playlist.songIds, songId],
                      }
                    : playlist
                ),
              }
            : null,
        })),
      removeFromPlaylist: (playlistId, songId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                playlists: state.user.playlists.map((playlist) =>
                  playlist.id === playlistId
                    ? {
                        ...playlist,
                        songIds: playlist.songIds.filter((id) => id !== songId),
                      }
                    : playlist
                ),
              }
            : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);