import React from 'react';
import { Home, Search, Library, Music2, Plus, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usePlayerStore } from '../store/playerStore';
import { AuthModal } from './AuthModal';
import { UserMenu } from './UserMenu';

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const menuItems = [
  { icon: Home, label: 'Home', view: 'home' as const },
  { icon: Search, label: 'Search', view: 'search' as const },
  { icon: Library, label: 'Library', view: 'library' as const },
];

export const Sidebar = ({ isMobile, onClose }: SidebarProps) => {
  const { user } = useAuthStore();
  const { setCurrentView } = usePlayerStore();

  const handleNavClick = (view: 'home' | 'search' | 'library') => {
    setCurrentView(view);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className={`bg-black h-full flex flex-col text-gray-300 p-6 ${isMobile ? 'w-full' : 'w-64 lg:block hidden'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Music2 className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold text-white">SoundPal</span>
        </div>
        {isMobile && onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="space-y-4">
        {menuItems.map(({ icon: Icon, label, view }) => (
          <button
            key={label}
            onClick={() => handleNavClick(view)}
            className="flex items-center space-x-4 hover:text-white transition-colors w-full px-2 py-2 rounded-lg hover:bg-gray-900"
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase font-semibold text-gray-400">
            Your Playlists
          </h2>
          {user ? (
            <UserMenu />
          ) : (
            <AuthModal />
          )}
        </div>
        {user?.playlists.map((playlist) => (
          <button
            key={playlist.id}
            className="text-sm hover:text-white transition-colors w-full text-left px-2 py-2 rounded-lg hover:bg-gray-900"
          >
            {playlist.name}
          </button>
        ))}
      </div>
    </div>
  );
};