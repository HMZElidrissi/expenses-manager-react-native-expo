import * as Font from 'expo-font';
import { FONTS } from './theme';

// Load custom fonts
export const loadFonts = async () => {
  await Font.loadAsync({
    'Geist-Regular': require('../../assets/fonts/Geist-Regular.ttf'),
    'Geist-Medium': require('../../assets/fonts/Geist-Medium.ttf'),
    'Geist-Bold': require('../../assets/fonts/Geist-Bold.ttf'),
  });
};

// Get font family depending on weight
export const getFontFamily = (weight: 'regular' | 'medium' | 'bold' = 'regular') => {
  try {
    switch (weight) {
      case 'regular':
        return FONTS.regular;
      case 'medium':
        return FONTS.medium;
      case 'bold':
        return FONTS.bold;
      default:
        return FONTS.regular;
    }
  } catch (error) {
    // Fallback to system fonts if custom fonts fail to load
    switch (weight) {
      case 'regular':
        return FONTS.regularFallback;
      case 'medium':
        return FONTS.mediumFallback;
      case 'bold':
        return FONTS.boldFallback;
      default:
        return FONTS.regularFallback;
    }
  }
};