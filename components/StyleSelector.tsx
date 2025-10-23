
import React from 'react';
import { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyleId: string | null;
  onSelectStyle: (styleId: string) => void;
  isLoading: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyleId, onSelectStyle, isLoading }) => {
  return (
    <div className="w-full lg:max-w-none p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose a Headshot Style</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar"> {/* Added custom-scrollbar for styling */}
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style.id)}
            disabled={isLoading}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg border-2
              transition-all duration-200 text-left flex-shrink-0 w-64 h-32
              ${selectedStyleId === style.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="font-medium text-gray-900">{style.name}</span>
            <span className="text-sm text-gray-600 mt-1 line-clamp-2">{style.description}</span>
          </button>
        ))}
      </div>
      {/* Basic scrollbar styling for better visibility on some browsers */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* gray-300 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0; /* gray-400 */
        }
      `}</style>
    </div>
  );
};

export default StyleSelector;
