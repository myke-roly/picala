// Color Palette for Picala App

// Fondos (Backgrounds)
export const BackgroundColors = {
  primary: '#eafcfc', // light cyan for cards
  secondary: '#1c434e', // dark teal background
  tertiary: '#4A2B34', // dark teal background
  elevated: '#afc8cc', // medium cyan for elevated surfaces
} as const;

// Texto (Text Colors)
export const TextColors = {
  primary: '#1c434e', // dark teal for primary text
  secondary: '#a58266', // warm brown for secondary text
  disabled: '#afc8cc', // medium cyan for disabled text
} as const;

// Colores de acento (Accent Colors)
export const AccentColors = {
  primary: '#dc285d', // vibrant pink/red for primary actions
  alternative: '#a58266', // warm brown for alternative actions
  warning: '#a58266', // warm brown for warnings
  error: '#dc285d', // vibrant pink/red for errors
} as const;

// Legacy colors for backward compatibility
export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: '#fff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#fff',
  },
  // New color palette
  backgrounds: BackgroundColors,
  text: TextColors,
  accents: AccentColors,
} as const;

// Utility functions for color usage
export const getBackgroundColor = (type: keyof typeof BackgroundColors) => {
  return BackgroundColors[type];
};

export const getTextColor = (type: keyof typeof TextColors) => {
  return TextColors[type];
};

export const getAccentColor = (type: keyof typeof AccentColors) => {
  return AccentColors[type];
};

// Common color combinations
export const ColorCombinations = {
  // Header gradient
  headerGradient: [BackgroundColors.elevated, BackgroundColors.primary],

  // Card backgrounds
  cardBackground: BackgroundColors.secondary,

  // Button styles
  primaryButton: {
    background: AccentColors.primary,
    text: BackgroundColors.secondary,
  },
  secondaryButton: {
    background: AccentColors.alternative,
    text: BackgroundColors.secondary,
  },
  warningButton: {
    background: AccentColors.warning,
    text: BackgroundColors.secondary,
  },
  errorButton: {
    background: AccentColors.error,
    text: BackgroundColors.secondary,
  },
} as const;

export default Colors;
