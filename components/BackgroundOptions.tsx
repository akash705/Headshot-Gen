
import React, { useCallback } from 'react';
import { BackgroundOption } from '../types';
import { CURATED_BACKGROUND_OPTIONS } from '../constants';

interface BackgroundOptionsProps {
  removeOriginalBackground: boolean;
  onToggleRemoveBackground: (remove: boolean) => void;
  selectedCuratedBackgroundId: string | null;
  onSelectCuratedBackground: (id: string | null) => void;
  customBackgroundDataUrl: string | null;
  onCustomBackgroundUpload: (base64Image: string | null) => void;
  isLoading: boolean;
}

const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({
  removeOriginalBackground,
  onToggleRemoveBackground,
  selectedCuratedBackgroundId,
  onSelectCuratedBackground,
  customBackgroundDataUrl,
  onCustomBackgroundUpload,
  isLoading,
}) => {

  const handleCustomFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          onCustomBackgroundUpload(reader.result as string);
          onToggleRemoveBackground(true); // Automatically enable background removal if custom background uploaded
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading custom background file:', error);
        onCustomBackgroundUpload(null);
      }
    } else {
      onCustomBackgroundUpload(null);
    }
  };

  const clearCustomBackground = useCallback(() => {
    onCustomBackgroundUpload(null);
    // Optionally uncheck remove original background if no other background is selected
    // if (!selectedCuratedBackgroundId) {
    //   onToggleRemoveBackground(false);
    // }
  }, [onCustomBackgroundUpload]);


  return (
    <div className="w-full lg:max-w-none p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Background Options</h3>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="remove-background"
          checked={removeOriginalBackground}
          onChange={(e) => onToggleRemoveBackground(e.target.checked)}
          disabled={isLoading}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="remove-background" className="ml-3 text-lg font-medium text-gray-700 cursor-pointer">
          Remove Original Background
        </label>
      </div>

      <p className="text-md font-medium text-gray-800 mb-3">Choose or Upload a New Background:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {CURATED_BACKGROUND_OPTIONS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => {
                onSelectCuratedBackground(bg.id);
                onCustomBackgroundUpload(null); // Clear custom background if a curated one is selected
                if (!removeOriginalBackground) onToggleRemoveBackground(true); // Suggest removal
            }}
            disabled={isLoading}
            className={`
              flex flex-col items-center justify-center p-3 rounded-lg border-2 text-center
              transition-all duration-200
              ${selectedCuratedBackgroundId === bg.id && !customBackgroundDataUrl
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="font-medium text-gray-900 text-sm">{bg.name}</span>
            <span className="text-xs text-gray-600 mt-1 hidden sm:block">{bg.description}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-md font-medium text-gray-800 mb-3">Upload Custom Background (Optional):</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleCustomFileChange}
          className="hidden"
          id="custom-background-upload"
          disabled={isLoading}
        />
        <label
          htmlFor="custom-background-upload"
          className={`cursor-pointer w-full p-3 text-center text-white font-medium rounded-lg transition-colors duration-200 ${
            isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          } ${customBackgroundDataUrl ? 'mb-2' : ''}`}
        >
          {isLoading ? 'Processing...' : (customBackgroundDataUrl ? 'Change Custom Background' : 'Upload Image')}
        </label>
        {customBackgroundDataUrl && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-gray-700 text-sm mb-2">Custom Background Preview:</p>
            <img
              src={customBackgroundDataUrl}
              alt="Custom Background Preview"
              className="w-48 h-auto object-cover rounded-lg shadow-sm border border-gray-300"
            />
            <button
              onClick={clearCustomBackground}
              disabled={isLoading}
              className={`mt-3 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isLoading ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Remove Custom Background
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundOptions;
