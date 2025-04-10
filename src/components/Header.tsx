import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8" />
            <h1 className="text-2xl font-bold">ResumeCraft AI</h1>
          </div>
          <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
            <Sparkles className="h-5 w-5" />
            <span>Upgrade to Pro</span>
          </button>
        </div>
      </div>
    </header>
  );
};