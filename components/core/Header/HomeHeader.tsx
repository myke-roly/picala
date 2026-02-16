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
  const userName = userEmail ? userEmail.split('@')[0] : 'Guest';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors[colorScheme].text.primary }]} weight="bold">
        Home
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
        >
          <IconSymbol name="bell.fill" size={24} color={Colors[colorScheme].text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfilePress} style={styles.avatarContainer}>
          {/* Ideally use an Image here if user has one, using initials for now matching Stitch somewhat */}
          <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.light.input }}>
            <Text weight="bold" style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
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
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
    letterSpacing: -0.5,
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
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 16,
    color: '#64748B',
  },
});
