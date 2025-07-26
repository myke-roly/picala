import {Text, type TextProps, StyleSheet} from 'react-native';
import {TextColors, AccentColors} from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  variant?: 'default' | 'title' | 'subtitle' | 'body' | 'caption' | 'link';
  level?: 'sm' | 'md' | 'lg' | 'xl';
  color?: keyof typeof TextColors | keyof typeof AccentColors | string;
  center?: boolean;
  strong?: boolean;
};

export function ThemedText({
  style,
  variant = 'default',
  level = 'md',
  color = TextColors.primary,
  center = false,
  strong = false,
  ...rest
}: ThemedTextProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      case 'link':
        return styles.link;
      default:
        return styles.default;
    }
  };

  const getLevelStyle = () => {
    switch (level) {
      case 'sm':
        return styles.sm;
      case 'md':
        return styles.md;
      case 'lg':
        return styles.lg;
      case 'xl':
        return styles.xl;
      default:
        return styles.md;
    }
  };

  const getColorStyle = () => {
    if (!color) return {};

    if (typeof color === 'string' && !color.includes('#')) {
      // Check if it's a TextColor
      if (color in TextColors) {
        return {color: TextColors[color as keyof typeof TextColors]};
      }
      // Check if it's an AccentColor
      if (color in AccentColors) {
        return {color: AccentColors[color as keyof typeof AccentColors]};
      }
    }
    return {color: color as string};
  };

  const getStrongStyle = () => {
    return strong ? styles.strong : {};
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        getLevelStyle(),
        getColorStyle(),
        getStrongStyle(),
        center ? styles.center : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Variant styles
  default: {
    fontWeight: '400',
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    fontWeight: '600',
  },
  body: {
    fontWeight: '400',
  },
  caption: {
    fontWeight: '400',
  },
  link: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },

  // Level styles (font sizes)
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 20,
  },
  xl: {
    fontSize: 24,
  },

  // Utility styles
  strong: {
    fontWeight: '700',
  },
  center: {
    textAlign: 'center',
  },
});
