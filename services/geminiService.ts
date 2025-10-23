import { GoogleGenAI, Modality, GenerateContentResponse, Part } from "@google/genai";
import { getMimeTypeFromBase64 } from '../utils/imageUtils';
import { AdvancedStyleOptions } from '../types';

const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateHeadshot = async (
  base64Image: string, // User's selfie
  styleDescription: string,
  additionalPrompt: string,
  removeOriginalBackground: boolean,
  customBackgroundDataUrl: string | null, // Base64 for custom background
  selectedCuratedBackgroundDescription: string | null, // Description for curated background
  advancedStyleOptions: AdvancedStyleOptions, // New parameter
): Promise<string> => {
  if (!base64Image) {
    throw new Error('No image uploaded for headshot generation.');
  }

  const gemini = getGeminiClient();
  const selfieMimeType = getMimeTypeFromBase64(base64Image);
  const selfieData = base64Image.split(',')[1]; // Remove data URI prefix

  const parts: Part[] = [];
  parts.push({
    inlineData: {
      data: selfieData,
      mimeType: selfieMimeType,
    },
  });

  let promptBuilder = `Transform the provided image into a professional headshot.`;

  // --- Background handling ---
  if (removeOriginalBackground) {
    promptBuilder += ` Remove the original background.`;
    if (customBackgroundDataUrl) {
      promptBuilder += ` Use the provided second image as the new professional background for the headshot.`;
      parts.push({
        inlineData: {
          data: customBackgroundDataUrl.split(',')[1],
          mimeType: getMimeTypeFromBase64(customBackgroundDataUrl),
        },
      });
    } else if (selectedCuratedBackgroundDescription) {
      promptBuilder += ` Replace the background with a professional setting described as: '${selectedCuratedBackgroundDescription}'.`;
    } else {
      promptBuilder += ` Replace the background with a clean, professional, and neutral solid color.`;
    }
  } else if (customBackgroundDataUrl) {
    promptBuilder += ` Blend the subject from the first image seamlessly with the provided second image, which should serve as a professional background.`;
    parts.push({
      inlineData: {
        data: customBackgroundDataUrl.split(',')[1],
        mimeType: getMimeTypeFromBase64(customBackgroundDataUrl),
      },
    });
  } else if (selectedCuratedBackgroundDescription) {
    promptBuilder += ` Integrate the subject from the first image into a professional background described as: '${selectedCuratedBackgroundDescription}'.`;
  }

  // --- Primary style application ---
  if (styleDescription) {
    promptBuilder += ` Apply the overall aesthetic and professional requirements of a '${styleDescription}' style.`;
  }

  // --- Advanced style options ---
  if (advancedStyleOptions.colorPalette && advancedStyleOptions.colorPalette !== 'Default') {
    promptBuilder += ` The color palette should primarily feature ${advancedStyleOptions.colorPalette}.`;
  }
  if (advancedStyleOptions.lightingMood && advancedStyleOptions.lightingMood !== 'Default') {
    promptBuilder += ` Employ a ${advancedStyleOptions.lightingMood} lighting mood.`;
  }
  if (advancedStyleOptions.backgroundElements && advancedStyleOptions.backgroundElements !== 'Default') {
    promptBuilder += ` Incorporate ${advancedStyleOptions.backgroundElements} into the background.`;
  }

  // --- Additional user prompt ---
  if (additionalPrompt) {
    promptBuilder += ` Additionally, consider these specific modifications: '${additionalPrompt}'.`;
  }

  // Add the combined text prompt as the last part
  parts.push({ text: promptBuilder.trim() });

  try {
    const response: GenerateContentResponse = await gemini.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const generatedPart = response.candidates?.[0]?.content?.parts?.[0];

    if (generatedPart?.inlineData) {
      const generatedBase64ImageBytes: string = generatedPart.inlineData.data;
      const generatedMimeType: string = generatedPart.inlineData.mimeType;
      return `data:${generatedMimeType};base64,${generatedBase64ImageBytes}`;
    } else {
      throw new Error('No image data found in the Gemini API response.');
    }
  } catch (error) {
    console.error('Error generating headshot:', error);
    if (error instanceof Error && error.message.includes("400 Bad Request")) {
      throw new Error("Failed to generate headshot. The prompt or image might be unsuitable, or the model returned an error. Please try a different image or prompt.");
    }
    throw new Error(`Failed to generate headshot: ${error instanceof Error ? error.message : String(error)}`);
  }
};