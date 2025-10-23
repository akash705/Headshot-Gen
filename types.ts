// types.ts
export interface HeadshotStyle {
  id: string;
  name: string;
  description: string;
}

export interface GeneratedImage {
  id: string;
  dataUrl: string; // Base64 encoded image data URL
}

export interface BackgroundOption {
  id: string;
  name: string;
  description: string;
}

export interface AdvancedStyleOptions {
  colorPalette: string | null;
  lightingMood: string | null;
  backgroundElements: string | null;
}