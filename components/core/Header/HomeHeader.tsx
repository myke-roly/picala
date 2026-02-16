import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

  // Extract name from email as a fallback
  const userName = userEmail ? userEmail.split('@')[0] : 'Guest';

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={onProfilePress} style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: Colors.primary }]}>
            <Text weight="bold" style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text variant="caption" weight="medium" opacity={0.6}>
            Welcome back,
          </Text>
          <Text variant="body" weight="bold">
            {userName}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: Colors[colorScheme].input }]}
          onPress={onNotificationPress}
        >
          <IconSymbol name="bell.fill" size={20} color={Colors[colorScheme].text.primary} />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  textContainer: {
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});
