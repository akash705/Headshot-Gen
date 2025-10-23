
import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, isLoading }) => {
  return (
    <div className="w-full lg:max-w-none p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Edits (Optional)</h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[80px] text-gray-900 placeholder-gray-500 bg-white"
        placeholder="e.g., 'Add a retro filter', 'Remove the person in the background', 'Make the hair slightly curlier'"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        rows={3}
        disabled={isLoading}
        aria-label="Additional headshot editing prompt"
      />
      <p className="text-sm text-gray-500 mt-2">Describe any specific changes you'd like to make to the headshot.</p>
    </div>
  );
};

export default PromptInput;
