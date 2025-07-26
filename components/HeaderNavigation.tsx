import React, {memo, PropsWithChildren} from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {ThemedText} from '@/components/ThemedText';
import IconPress from '@/components/IconPress';
import {ColorCombinations, TextColors} from '@/constants';

interface HeaderNavigationProps extends PropsWithChildren {
  title: string;
  onBackPress?: () => void;
  rightButton?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({title, onBackPress, rightButton, children}) => {
  return (
    <LinearGradient
      colors={ColorCombinations.headerGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <IconPress name="chevron-back" size="md" color="white" onPress={onBackPress} />
        </View>

        <View style={styles.centerSection}>
          <ThemedText variant="subtitle" level="md" color="white" strong center>
            {title}
          </ThemedText>
        </View>

        <View style={styles.rightSection}>
          {rightButton && <IconPress name={rightButton.icon} size="md" color="white" onPress={rightButton.onPress} />}
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
    paddingVertical: 24,
    paddingTop: 50,
  },
  leftSection: {
    width: 60,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
  },
  rightSection: {
    width: 60,
    alignItems: 'flex-end',
  },

  subtitle: {
    fontSize: 14,
    color: TextColors.secondary,
    textAlign: 'center',
    marginTop: 2,
  },
  childrenContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default memo(HeaderNavigation);
