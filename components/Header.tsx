import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemedText} from '@/components/ThemedText';

interface HeaderProps {
  title: string;
  text?: string;
  button?: {
    title: string;
    onPress: () => void;
    disabled?: boolean;
  };
}

const Header: React.FC<HeaderProps> = ({title, text, button}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {text && <ThemedText style={styles.text}>{text}</ThemedText>}
        </View>

        {button && (
          <TouchableOpacity
            style={[styles.button, button.disabled && styles.buttonDisabled]}
            onPress={button.onPress}
            disabled={button.disabled}
            activeOpacity={0.7}
          >
            <ThemedText style={[styles.buttonText, button.disabled && styles.buttonTextDisabled]}>
              {button.title}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
    paddingTop: 50, // Extra padding for status bar
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonTextDisabled: {
    color: '#9ca3af',
  },
});

export default Header;
