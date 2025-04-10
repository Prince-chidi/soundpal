import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { MusicGrid } from './components/MusicGrid';
import { SearchBar } from './components/SearchBar';
import { GenreFilter } from './components/GenreFilter';
import { MobileNav } from './components/MobileNav';
import { LibraryView } from './components/LibraryView';
import { usePlayerStore } from './store/playerStore';

function App() {
  const { currentView } = usePlayerStore();

  const renderContent = () => {
    switch (currentView) {
      case 'library':
        return <LibraryView />;
      default:
        return (
          <>
            {currentView === 'search' && (
              <div className="max-w-2xl">
                <SearchBar />
              </div>
            )}
            <GenreFilter />
            <h1 className="text-2xl font-bold">
              {currentView === 'home' && 'Discover AI-Generated Music'}
              {currentView === 'search' && 'Search Results'}
            </h1>
            <MusicGrid />
          </>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {renderContent()}
          </div>
        </main>
      </div>
      <Player />
      <MobileNav />
    </div>
  );
}

export default App;