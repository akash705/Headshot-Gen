import { AdvancedStyleOptions, BackgroundOption, HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  { id: 'corporate_grey', name: 'Corporate Grey Backdrop', description: 'A classic, professional look with a solid grey background.' },
  { id: 'modern_tech', name: 'Modern Tech Office', description: 'A contemporary setting with a blurred office background, clean lines, and soft light.' },
  { id: 'outdoor_natural', name: 'Outdoor Natural Light', description: 'A bright, friendly shot with soft natural lighting outdoors, green foliage, and blurred depth.' },
  { id: 'studio_white', name: 'Studio White Backdrop', description: 'Clean and minimalist, focusing on the subject with a pure white background and soft shadows.' },
  { id: 'warm_cozy_office', name: 'Warm Cozy Office', description: 'A comfortable office environment with warm lighting and a slightly blurred bookshelf background.' },
  { id: 'minimalist_blue', name: 'Minimalist Blue Backdrop', description: 'A simple and modern look with a subtle gradient blue background.' },
  { id: 'urban_professional', name: 'Urban Professional', description: 'A sophisticated look with a city skyline (blurred) in the background, hinting at an urban professional setting.' },
];

export const CURATED_BACKGROUND_OPTIONS: BackgroundOption[] = [
  { id: 'neutral_gradient', name: 'Neutral Gradient', description: 'A soft, subtle gradient in neutral tones.' },
  { id: 'minimalist_white', name: 'Minimalist White', description: 'A clean, bright, plain white background.' },
  { id: 'blurred_office', name: 'Blurred Office', description: 'A softly blurred modern office interior.' },
  { id: 'abstract_geometric', name: 'Abstract Geometric', description: 'A subtle background with abstract geometric shapes.' },
  { id: 'nature_bokeh', name: 'Nature Bokeh', description: 'A gentle, out-of-focus natural green background.' },
];

export const COLOR_PALETTE_OPTIONS: string[] = [
  'Default',
  'Warm Tones', // golden hour, earthy
  'Cool Tones', // blue, silver, grey
  'Neutral Tones', // beige, cream, light grey
  'Vibrant Accents', // pops of color
];

export const LIGHTING_MOOD_OPTIONS: string[] = [
  'Default',
  'Soft & Even', // flattering, no harsh shadows
  'Dramatic Contrast', // strong shadows, chiaroscuro
  'Bright & Airy', // high key, luminous
  'Studio Controlled', // clean, artificial, professional
];

export const BACKGROUND_ELEMENT_OPTIONS: string[] = [
  'Default',
  'Subtle Bokeh',
  'Solid Color',
  'Blurred Architectural',
  'Minimalist Pattern',
];

export const DEFAULT_ADVANCED_STYLE_OPTIONS: AdvancedStyleOptions = {
  colorPalette: null,
  lightingMood: null,
  backgroundElements: null,
};