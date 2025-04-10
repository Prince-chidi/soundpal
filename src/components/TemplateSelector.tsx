import React from 'react';
import { Layout } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern', preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=200&h=280' },
  { id: 'professional', name: 'Professional', preview: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=200&h=280' },
  { id: 'creative', name: 'Creative', preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=200&h=280' },
];

export const TemplateSelector = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Layout className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Choose Template</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative group cursor-pointer"
          >
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-[280px] object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <span className="text-white font-medium">{template.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};