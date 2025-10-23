
import React from 'react';
import { GeneratedImage } from '../types';

interface GeneratedImagesDisplayProps {
  images: GeneratedImage[];
  isLoading: boolean;
  error: string | null;
}

const GeneratedImagesDisplay: React.FC<GeneratedImagesDisplayProps> = ({ images, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full lg:max-w-none p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center text-blue-600">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg">Generating your professional headshot...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:max-w-none p-6 bg-red-100 rounded-lg shadow-md border border-red-400 text-center text-red-700">
        <p className="font-semibold text-lg mb-2">Error:</p>
        <p>{error}</p>
        <p className="mt-2 text-sm text-red-600">Please try again with a different image or prompt.</p>
      </div>
    );
  }

  if (images.length === 0) {
    return null; // Or a placeholder if desired
  }

  return (
    <div className="w-full lg:max-w-none p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Generated Headshot</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg border border-gray-300">
            <img
              src={image.dataUrl}
              alt="Generated Headshot"
              className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <a
              href={image.dataUrl}
              download={`headshot-${image.id}.png`}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedImagesDisplay;
