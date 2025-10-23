
import React, { useState, useCallback } from 'react';
import ImageUpload from './components/ImageUpload';
import StyleSelector from './components/StyleSelector';
import PromptInput from './components/PromptInput';
import GeneratedImagesDisplay from './components/GeneratedImagesDisplay';
import BackgroundOptions from './components/BackgroundOptions';
import AdvancedStyleCustomizer from './components/AdvancedStyleCustomizer';
import { HEADSHOT_STYLES, CURATED_BACKGROUND_OPTIONS, DEFAULT_ADVANCED_STYLE_OPTIONS } from './constants';
import { AdvancedStyleOptions, GeneratedImage } from './types';
import { generateHeadshot } from './services/geminiService';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [additionalPrompt, setAdditionalPrompt] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New state for background options
  const [removeOriginalBackground, setRemoveOriginalBackground] = useState<boolean>(false);
  const [selectedCuratedBackgroundId, setSelectedCuratedBackgroundId] = useState<string | null>(null);
  const [customBackgroundDataUrl, setCustomBackgroundDataUrl] = useState<string | null>(null);

  // New state for advanced style options
  const [advancedStyleOptions, setAdvancedStyleOptions] = useState<AdvancedStyleOptions>(DEFAULT_ADVANCED_STYLE_OPTIONS);

  const handleImageSelected = useCallback((base64Image: string) => {
    setUploadedImage(base64Image);
    setError(null); // Clear previous errors
  }, []);

  const handleSelectStyle = useCallback((styleId: string) => {
    setSelectedStyleId(styleId);
    setError(null); // Clear previous errors
  }, []);

  const handlePromptChange = useCallback((prompt: string) => {
    setAdditionalPrompt(prompt);
    setError(null); // Clear previous errors
  }, []);

  const handleToggleRemoveBackground = useCallback((remove: boolean) => {
    setRemoveOriginalBackground(remove);
    setError(null);
  }, []);

  const handleSelectCuratedBackground = useCallback((id: string | null) => {
    setSelectedCuratedBackgroundId(id);
    setError(null);
  }, []);

  const handleCustomBackgroundUpload = useCallback((base64Image: string | null) => {
    setCustomBackgroundDataUrl(base64Image);
    // If a custom background is uploaded, deselect any curated background
    if (base64Image) {
      setSelectedCuratedBackgroundId(null);
    }
    setError(null);
  }, []);

  const handleAdvancedStyleOptionChange = useCallback((key: keyof AdvancedStyleOptions, value: string | null) => {
    setAdvancedStyleOptions(prev => ({ ...prev, [key]: value }));
    setError(null);
  }, []);


  const handleGenerateHeadshot = useCallback(async () => {
    if (!uploadedImage) {
      setError('Please upload a selfie first.');
      return;
    }
    if (!selectedStyleId) {
      setError('Please select a headshot style.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]); // Clear previous generated images

    const selectedStyle = HEADSHOT_STYLES.find(style => style.id === selectedStyleId);
    const styleDescription = selectedStyle ? selectedStyle.description : '';

    const selectedCuratedBackground = CURATED_BACKGROUND_OPTIONS.find(bg => bg.id === selectedCuratedBackgroundId);
    const selectedCuratedBackgroundDescription = selectedCuratedBackground ? selectedCuratedBackground.description : null;

    try {
      const generatedDataUrl = await generateHeadshot(
        uploadedImage,
        styleDescription,
        additionalPrompt,
        removeOriginalBackground,
        customBackgroundDataUrl,
        selectedCuratedBackgroundDescription,
        advancedStyleOptions,
      );
      setGeneratedImages([{ id: `gen-${Date.now()}`, dataUrl: generatedDataUrl }]);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
      console.error('Headshot generation error:', e);
    } finally {
      setIsLoading(false);
    }
  }, [
    uploadedImage,
    selectedStyleId,
    additionalPrompt,
    removeOriginalBackground,
    selectedCuratedBackgroundId,
    customBackgroundDataUrl,
    advancedStyleOptions,
  ]);

  const isGenerateButtonDisabled = isLoading || !uploadedImage || !selectedStyleId;

  return (
    <div className="flex flex-col items-center p-8 min-h-screen w-full lg:w-4/5 lg:max-w-full mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
        AI Headshot Photographer
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-3xl">
        Upload your casual selfie, choose a professional style, and let Gemini transform it into a stunning headshot.
        You can fine-tune backgrounds, lighting, colors, and add custom edits!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-10">
        <div className="flex flex-col items-center justify-start gap-8 w-full">
          <ImageUpload
            onImageSelected={handleImageSelected}
            previewImage={uploadedImage}
            isLoading={isLoading}
          />
          <StyleSelector
            styles={HEADSHOT_STYLES}
            selectedStyleId={selectedStyleId}
            onSelectStyle={handleSelectStyle}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col items-center justify-start gap-8 w-full">
          <BackgroundOptions
            removeOriginalBackground={removeOriginalBackground}
            onToggleRemoveBackground={handleToggleRemoveBackground}
            selectedCuratedBackgroundId={selectedCuratedBackgroundId}
            onSelectCuratedBackground={handleSelectCuratedBackground}
            customBackgroundDataUrl={customBackgroundDataUrl}
            onCustomBackgroundUpload={handleCustomBackgroundUpload}
            isLoading={isLoading}
          />
          <AdvancedStyleCustomizer
            advancedStyleOptions={advancedStyleOptions}
            onStyleOptionChange={handleAdvancedStyleOptionChange}
            isLoading={isLoading}
          />
          <PromptInput
            prompt={additionalPrompt}
            onPromptChange={handlePromptChange}
            isLoading={isLoading}
          />
        </div>
      </div>

      <button
        onClick={handleGenerateHeadshot}
        disabled={isGenerateButtonDisabled}
        className={`
          w-full max-w-md py-4 px-6 mb-10 rounded-lg text-xl font-bold
          transition-colors duration-300 shadow-lg transform
          ${isGenerateButtonDisabled
            ? 'bg-blue-300 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
          }
        `}
      >
        {isLoading ? 'Generating...' : 'Generate Professional Headshot'}
      </button>

      <GeneratedImagesDisplay
        images={generatedImages}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default App;
