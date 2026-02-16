import React, { PropsWithChildren, ReactNode } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Text';
import { ColorCombinations } from '@/constants';

interface HeaderProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  centerTitle?: boolean;
  // Legacy props support (to be deprecated or mapped)
  text?: string;
  button?: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
  };
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  left,
  right,
  centerTitle = false,
  children,
  // Legacy props
  text,
  button,
}) => {
  // Map legacy props to new API if used
  const effectiveSubtitle = subtitle || text;
  const effectiveRight = right || (button ? (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        button.disabled && styles.buttonDisabled,
        pressed && { opacity: 0.7 }
      ]}
      onPress={button.onPress}
      disabled={button.disabled}
    >
      <Text style={[styles.buttonText, button.disabled && styles.buttonTextDisabled]}>{button.title}</Text>
    </Pressable>
  ) : null);

  return (
    <LinearGradient
      colors={ColorCombinations.headerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={[styles.content, centerTitle ? styles.contentCenter : styles.contentLeft]}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {left}
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          <Text
            style={[styles.title, centerTitle && styles.textCenter]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {effectiveSubtitle && (
            <Text
              style={[styles.subtitle, centerTitle && styles.textCenter]}
              numberOfLines={1}
            >
              {effectiveSubtitle}
            </Text>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {effectiveRight}
        </View>
      </View>

      {children && <View style={styles.childrenContainer}>{children}</View>}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60, // Status bar padding
    minHeight: 100,
  },
  contentLeft: {
    justifyContent: 'flex-start',
  },
  contentCenter: {
    justifyContent: 'space-between',
  },
  leftSection: {
    minWidth: 40,
    alignItems: 'flex-start',
    marginRight: 8,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSection: {
    minWidth: 40,
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#f3f4f6',
    lineHeight: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  childrenContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  // Legacy button styles
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Header;
