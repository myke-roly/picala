import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Text} from '@/components/Text';
import {ColorCombinations} from '@/constants';

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
    <LinearGradient
      colors={ColorCombinations.headerGradient}
      start={{x: 0.3, y: 0}}
      end={{x: 0.7, y: 0.5}}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {text && <Text style={styles.text}>{text}</Text>}
        </View>

        {button && (
          <TouchableOpacity
            style={[styles.button, button.disabled && styles.buttonDisabled]}
            onPress={button.onPress}
            disabled={button.disabled}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, button.disabled && styles.buttonTextDisabled]}>{button.title}</Text>
          </TouchableOpacity>
        )}
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
    color: '#ffffff',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#f3f4f6',
    lineHeight: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
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
