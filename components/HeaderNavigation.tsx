import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {ThemedText} from '@/components/ThemedText';
import Colors, {ColorCombinations, TextColors, BackgroundColors} from '@/constants/Colors';

interface HeaderNavigationProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  onBackPress?: () => void;
  onClosePress?: () => void;
  rightButton?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  title,
  subtitle,
  showBackButton = false,
  showCloseButton = false,
  onBackPress,
  onClosePress,
  rightButton,
}) => {
  return (
    <LinearGradient
      colors={ColorCombinations.headerGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Left side - Back/Close button */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity style={styles.iconButton} onPress={onBackPress} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={24} color={TextColors.white} />
            </TouchableOpacity>
          )}

          {showCloseButton && (
            <TouchableOpacity style={styles.iconButton} onPress={onClosePress} activeOpacity={0.7}>
              <Ionicons name="close" size={24} color={TextColors.white} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center - Title and subtitle */}
        <View style={styles.centerSection}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
        </View>

        {/* Right side - Optional right button */}
        <View style={styles.rightSection}>
          {rightButton && (
            <TouchableOpacity style={styles.iconButton} onPress={rightButton.onPress} activeOpacity={0.7}>
              <Ionicons name={rightButton.icon} size={24} color={TextColors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 32, // Extra padding for status bar
  },
  leftSection: {
    width: 60,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 60,
    alignItems: 'flex-end',
  },
  iconButton: {
    color: TextColors.white,
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: TextColors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: TextColors.secondary,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default HeaderNavigation;
