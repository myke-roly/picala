import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {TextColors, AccentColors} from '@/constants/Colors';

export interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: keyof typeof TextColors | keyof typeof AccentColors | string;
}

const Icon: React.FC<IconProps> = ({name, size = 'md', color = 'white'}) => {
  const getSize = () => {
    if (typeof size === 'number') return size;

    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 24;
      case 'lg':
        return 32;
      case 'xl':
        return 48;
      default:
        return 24;
    }
  };

  const getColor = () => {
    if (typeof color === 'string' && !color.includes('#')) {
      // Check if it's a TextColor
      if (color in TextColors) {
        return TextColors[color as keyof typeof TextColors];
      }
      // Check if it's an AccentColor
      if (color in AccentColors) {
        return AccentColors[color as keyof typeof AccentColors];
      }
    }
    return color as string;
  };

  return <Ionicons name={name} size={getSize()} color={getColor()} />;
};

export default Icon;
