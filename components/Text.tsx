import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useColorScheme } from '@/hooks/useColorScheme';

export type CustomTextProps = RNTextProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small' | 'link';
  weight?: keyof typeof Typography.fontFamily;
  color?: string;
  center?: boolean;
  opacity?: number;
};

export function Text({
  style,
  variant = 'body',
  weight,
  color,
  center = false,
  opacity,
  ...rest
}: CustomTextProps) {
  const colorScheme = useColorScheme() ?? 'light';

  // Base styles based on variant
  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'caption':
        return styles.caption;
      case 'small':
        return styles.small;
      case 'link':
        return styles.link;
      case 'body':
      default:
        return styles.body;
    }
  };

  // Font weight style
  const getWeightStyle = () => {
    if (weight && Typography.fontFamily[weight]) {
      return { fontFamily: Typography.fontFamily[weight] };
    }

    // Default weights for variants if not specified
    if (variant.startsWith('h')) {
      return { fontFamily: Typography.fontFamily.bold };
    }
    if (variant === 'link') {
      return { fontFamily: Typography.fontFamily.medium };
    }

    return { fontFamily: Typography.fontFamily.regular };
  };

  const getTextColor = () => {
    if (color) return color;

    if (variant === 'caption' || variant === 'small') {
      return Colors[colorScheme].text.secondary;
    }

    return Colors[colorScheme].text.primary;
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        getWeightStyle(),
        { color: getTextColor() },
        center && { textAlign: 'center' },
        opacity !== undefined && { opacity },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: Typography.sizes.h1,
    lineHeight: Typography.sizes.h1 * Typography.lineHeight.tight,
  },
  h2: {
    fontSize: Typography.sizes.h2,
    lineHeight: Typography.sizes.h2 * Typography.lineHeight.tight,
  },
  h3: {
    fontSize: Typography.sizes.h3,
    lineHeight: Typography.sizes.h3 * Typography.lineHeight.tight,
  },
  h4: {
    fontSize: Typography.sizes.h4,
    lineHeight: Typography.sizes.h4 * Typography.lineHeight.tight,
  },
  body: {
    fontSize: Typography.sizes.body,
    lineHeight: Typography.sizes.body * Typography.lineHeight.normal,
  },
  caption: {
    fontSize: Typography.sizes.caption,
    lineHeight: Typography.sizes.caption * Typography.lineHeight.normal,
  },
  small: {
    fontSize: Typography.sizes.small,
    lineHeight: Typography.sizes.small * Typography.lineHeight.normal,
  },
  link: {
    fontSize: Typography.sizes.body,
    textDecorationLine: 'underline',
  },
});
