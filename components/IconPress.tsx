import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { TextColors } from '@/constants';
import Icon, { IconProps } from './Icon';

export interface IconPressProps extends PressableProps, IconProps {
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
  style,
  ...props
}) => {
  const iconColor = disabled ? TextColors.disabled : color;

  return (
    <Pressable
      style={(state) => [
        styles.container,
        {
          opacity: disabled ? 0.5 : state.pressed ? activeOpacity : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Icon name={name} size={size} color={iconColor} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconPress;
