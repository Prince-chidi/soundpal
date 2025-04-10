import React from 'react';
import { Home, Search, Library, Menu } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Sidebar } from './Sidebar';
import { usePlayerStore } from '../store/playerStore';

const navItems = [
  { icon: Home, label: 'Home', view: 'home' as const },
  { icon: Search, label: 'Search', view: 'search' as const },
  { icon: Library, label: 'Library', view: 'library' as const },
];

export const MobileNav = () => {
  const { setCurrentView } = usePlayerStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 lg:hidden z-10">
        <nav className="flex justify-around py-3">
          {navItems.map(({ icon: Icon, label, view }) => (
            <button
              key={label}
              onClick={() => setCurrentView(view)}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white"
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
          <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <Dialog.Trigger asChild>
              <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="text-xs">Menu</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 w-64 bg-black shadow-xl">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="h-full overflow-y-auto">
                  <Sidebar isMobile onClose={() => setIsMenuOpen(false)} />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </nav>
      </div>
      <div className="h-20 lg:hidden" />
    </>
  );
};