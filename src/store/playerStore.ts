import { create } from 'zustand';
import { Howl } from 'howler';

export interface Song {
  id: string;
  title: string;
  genre: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  streams: string;
  mood: string;
  createdAt: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  playlist: Song[];
  sound: Howl | null;
  progress: number;
  searchQuery: string;
  selectedGenre: string | null;
  currentView: 'home' | 'search' | 'library';
  setCurrentView: (view: 'home' | 'search' | 'library') => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string | null) => void;
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  addToPlaylist: (song: Song) => void;
  removeFromPlaylist: (songId: string) => void;
  incrementStreams: (songId: string) => void;
}

// This would typically be in a separate API file
const updateStreamCount = async (songId: string) => {
  try {
    const response = await fetch('/api/streams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId }),
    });
    if (!response.ok) throw new Error('Failed to update stream count');
    return await response.json();
  } catch (error) {
    console.error('Error updating stream count:', error);
  }
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  volume: 0.8,
  playlist: [],
  sound: null,
  progress: 0,
  searchQuery: '',
  selectedGenre: null,
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setCurrentSong: async (song) => {
    const { sound } = get();
    if (sound) {
      sound.unload();
    }
    
    const newSound = new Howl({
      src: [song.audioUrl],
      volume: get().volume,
      onend: () => {
        set({ isPlaying: false, progress: 0 });
      },
      onplay: async () => {
        // Increment stream count when song starts playing
        get().incrementStreams(song.id);
        requestAnimationFrame(() => {
          const progress = (sound?.seek() || 0) / (sound?.duration() || 1) * 100;
          set({ progress });
        });
      }
    });

    set({ currentSong: song, sound: newSound, isPlaying: true });
    newSound.play();
  },
  togglePlay: () => {
    const { sound, isPlaying } = get();
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      set({ isPlaying: !isPlaying });
    }
  },
  setVolume: (volume) => {
    const { sound } = get();
    if (sound) {
      sound.volume(volume);
    }
    set({ volume });
  },
  setProgress: (progress) => {
    const { sound } = get();
    if (sound) {
      const duration = sound.duration();
      sound.seek(duration * (progress / 100));
    }
    set({ progress });
  },
  addToPlaylist: (song) =>
    set((state) => ({ playlist: [...state.playlist, song] })),
  removeFromPlaylist: (songId) =>
    set((state) => ({
      playlist: state.playlist.filter((song) => song.id !== songId),
    })),
  incrementStreams: async (songId) => {
    await updateStreamCount(songId);
    set((state) => ({
      playlist: state.playlist.map((song) =>
        song.id === songId ? { ...song, streams: song.streams + 1 } : song
      ),
    }));
  },
}));