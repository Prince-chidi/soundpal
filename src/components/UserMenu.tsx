import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, User, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { CreatePlaylistModal } from './CreatePlaylistModal';

export const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const [showPlaylistModal, setShowPlaylistModal] = React.useState(false);

  if (!user) return null;

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">
            <User className="h-5 w-5" />
            <span>{user.name}</span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-gray-900 rounded-lg p-2 w-48 shadow-xl z-50">
            <DropdownMenu.Item
              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-800 rounded-md cursor-pointer"
              onClick={() => setShowPlaylistModal(true)}
            >
              <Plus className="h-4 w-4" />
              <span>New Playlist</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-red-400"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <CreatePlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
      />
    </>
  );
};