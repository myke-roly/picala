import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface HomeHeaderProps {
  userEmail?: string | null;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
}

export function HomeHeader({
  userEmail,
  onProfilePress,
  onNotificationPress
}: HomeHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const userName = userEmail ? userEmail.split('@')[0] : 'Guest';

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            pressed && { opacity: 0.7 }
          ]}
          onPress={onNotificationPress}
        >
          <IconSymbol name="bell.fill" size={24} color={Colors[colorScheme].text.secondary} />
        </Pressable>

        <Pressable
          onPress={onProfilePress}
          style={({ pressed }) => [
            styles.avatarContainer,
            pressed && { opacity: 0.7 }
          ]}
        >
          {/* Ideally use an Image here if user has one, using initials for now matching Stitch somewhat */}
          <View style={styles.avatarInner}>
            <Text weight="bold" style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', // Fallback color
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6', // Colors.light.input fallback
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 16,
    color: '#64748B',
  },
});
