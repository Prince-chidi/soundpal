import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { usePlayerStore } from '../store/playerStore';
import { clsx } from 'clsx';

export const Player = () => {
  const { currentSong, isPlaying, volume, togglePlay, setVolume } = usePlayerStore();

  return (
    <div className="h-20 bg-gradient-to-r from-gray-900 to-black border-t border-gray-800 px-4 flex items-center justify-between">
      {/* Current Song Info */}
      <div className="w-1/4 flex items-center space-x-4">
        {currentSong && (
          <>
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className="h-14 w-14 rounded-md"
            />
            <div>
              <h3 className="text-white font-medium">{currentSong.title}</h3>
              <p className="text-sm text-gray-400">{currentSong.genre}</p>
            </div>
          </>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-1/2">
        <div className="flex items-center space-x-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={togglePlay}
            className={clsx(
              "rounded-full p-2",
              "bg-white hover:bg-gray-200 transition-colors",
              "text-black"
            )}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
        
      </div>

      {/* Volume Control */}
      <div className="w-1/4 flex justify-end items-center space-x-2">
        <Volume2 className="text-gray-400 h-5 w-5" />
        <Slider.Root
          className="relative flex items-center select-none touch-none w-32 h-5"
          defaultValue={[volume * 100]}
          max={100}
          step={1}
          onValueChange={([value]) => setVolume(value / 100)}
        >
          <Slider.Track className="bg-gray-600 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-3 h-3 bg-white rounded-full hover:bg-gray-200 focus:outline-none"
            aria-label="Volume"
          />
        </Slider.Root>
      </div>
    </div>
  );
};