import React from 'react';
import {TouchableOpacity, TouchableOpacityProps, StyleSheet} from 'react-native';
import {TextColors} from '@/constants';
import Icon, {IconProps} from './Icon';

export interface IconPressProps extends TouchableOpacityProps, IconProps {
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
}

const IconPress: React.FC<IconPressProps> = ({
  name,
  size = 'md',
  color = 'white',
  onPress,
  disabled = false,
  activeOpacity = 0.7,
  ...props
}) => {
  const iconColor = disabled ? TextColors.disabled : color;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      {...props}
    >
      <Icon name={name} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconPress;
