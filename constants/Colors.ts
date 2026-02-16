/**
 * Design System Colors for Picala redesign
 * Extracted from Stitch Minimalist Design
 */

export const Colors = {
  primary: '#E91E63', // Vibrant pink-red from redesign
  accent: '#1E3A8A',  // Deep indigo for buttons/actions

  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
    border: '#E2E8F0',
    card: '#FFFFFF',
    input: '#F3F4F6',
  },

  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    border: '#334155',
    card: '#1E293B',
    input: '#374151',
  },

  status: {
    success: '#16A34A',
    error: '#DC2626',
    warning: '#D97706',
    win: '#16A34A',
    loss: '#DC2626',
  },

  tabBar: {
    active: '#E91E63',
    inactive: '#64748B',
  }
} as const;

// Legacy mappings for backward compatibility during migration
export const BackgroundColors = {
  primary: Colors.light.background,
  secondary: Colors.light.surface,
  white: '#ffffff',
  light: Colors.light.background,
  dark: Colors.dark.background,
  elevated: Colors.light.surface,
} as const;

export const TextColors = {
  white: '#ffffff',
  dark: Colors.dark.text.primary,
  primary: Colors.light.text.primary,
  secondary: Colors.light.text.secondary,
  disabled: '#94A3B8',
} as const;

export const AccentColors = {
  primary: Colors.primary,
  alternative: Colors.accent,
  warning: Colors.status.warning,
  error: Colors.status.error,
} as const;

export default Colors;
