/**
 * Typography system for Picala redesign
 */

export const Typography = {
    fontFamily: {
        regular: 'Inter_400Regular',
        medium: 'Inter_500Medium',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        light: 'Inter_300Light',
    },

    sizes: {
        h1: 32,      // text-3xl
        h2: 24,      // text-2xl
        h3: 20,      // text-xl
        h4: 18,      // text-lg
        body: 14,    // text-sm
        caption: 12, // text-xs
        small: 10,   // text-[10px]
    },

    lineHeight: {
        tight: 1.25,
        normal: 1.5,
    }
} as const;
