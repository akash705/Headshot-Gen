
import React from 'react';
import { AdvancedStyleOptions } from '../types';
import {
  COLOR_PALETTE_OPTIONS,
  LIGHTING_MOOD_OPTIONS,
  BACKGROUND_ELEMENT_OPTIONS,
} from '../constants';

interface AdvancedStyleCustomizerProps {
  advancedStyleOptions: AdvancedStyleOptions;
  onStyleOptionChange: (key: keyof AdvancedStyleOptions, value: string) => void;
  isLoading: boolean;
}

const AdvancedStyleCustomizer: React.FC<AdvancedStyleCustomizerProps> = ({
  advancedStyleOptions,
  onStyleOptionChange,
  isLoading,
}) => {
  const renderSelect = (
    label: string,
    key: keyof AdvancedStyleOptions,
    options: string[],
    currentValue: string | null,
  ) => (
    <div className="mb-4">
      <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
        {label}:
      </label>
      <select
        id={key}
        name={key}
        value={currentValue || 'Default'}
        onChange={(e) => onStyleOptionChange(key, e.target.value === 'Default' ? null : e.target.value)}
        disabled={isLoading}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-white text-gray-900"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full lg:max-w-none p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Fine-Tune Your Style (Optional)</h3>

      {renderSelect(
        'Color Palette',
        'colorPalette',
        COLOR_PALETTE_OPTIONS,
        advancedStyleOptions.colorPalette,
      )}
      {renderSelect(
        'Lighting Mood',
        'lightingMood',
        LIGHTING_MOOD_OPTIONS,
        advancedStyleOptions.lightingMood,
      )}
      {renderSelect(
        'Background Elements',
        'backgroundElements',
        BACKGROUND_ELEMENT_OPTIONS,
        advancedStyleOptions.backgroundElements,
      )}
    </div>
  );
};

export default AdvancedStyleCustomizer;
