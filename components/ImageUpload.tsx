
import React from 'react';

interface ImageUploadProps {
  onImageSelected: (base64Image: string, file: File) => void;
  previewImage: string | null;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, previewImage, isLoading }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageSelected(reader.result as string, file);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full lg:max-w-none">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Your Selfie</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        disabled={isLoading}
      />
      <label
        htmlFor="file-upload"
        className={`cursor-pointer w-full p-4 text-center text-white font-medium rounded-lg transition-colors duration-200 ${
          isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Processing...' : 'Choose File'}
      </label>
      {previewImage && (
        <div className="mt-6">
          <p className="text-gray-700 text-sm mb-2">Selected Image Preview:</p>
          <img
            src={previewImage}
            alt="Selfie Preview"
            className="w-48 h-48 object-cover rounded-lg shadow-sm border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
