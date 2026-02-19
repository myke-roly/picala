// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // Tab icons
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'sportscourt.fill': 'sports-tennis',
  'message.fill': 'chat',
  'person.fill': 'person',
  // Other icons
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'envelope.fill': 'email',
  'lock.fill': 'lock',
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'plus': 'add',
  'bell.fill': 'notifications',
  'soccerball': 'sports-soccer',
  'volleyball': 'sports-volleyball',
  'basketball': 'sports-basketball',
  'tennisball': 'sports-tennis',
  'sportscourt': 'sports-cricket', // Using as Padel fallback
  'trophy.fill': 'emoji-events',
  'clock.fill': 'schedule',
  'calendar': 'calendar-today',
  'mappin.and.ellipse': 'place',
} as Partial<
  Record<import('expo-symbols').SymbolViewProps['name'], React.ComponentProps<typeof MaterialIcons>['name']>
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
