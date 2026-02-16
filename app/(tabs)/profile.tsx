import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { Button, ScreenContainer, BaseCard } from '@/components/core';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';
import { signOut } from '@/services/auth';

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
}

const ProfileScreen = () => {
  const { user, isAuthenticated } = usePersistentAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/(tabs)');
          } catch (error) {
            Alert.alert('Error', 'Failed to log out.');
          }
        }
      },
    ]);
  };

  const MENU_ITEMS: MenuItem[] = [
    {
      id: '1', title: 'Edit Profile', icon: 'person.fill',
      onPress: () => Alert.alert('Edit Profile', 'Coming soon!')
    },
    {
      id: '2', title: 'Notifications', icon: 'bell.fill',
      onPress: () => Alert.alert('Notifications', 'Coming soon!')
    },
    {
      id: '3', title: 'Privacy Settings', icon: 'lock.fill',
      onPress: () => Alert.alert('Privacy', 'Coming soon!')
    },
    {
      id: '4', title: 'Help & Support', icon: 'questionmark.circle.fill',
      onPress: () => Alert.alert('Support', 'Coming soon!')
    },
    {
      id: '5', title: 'About Picala', icon: 'info.circle.fill',
      onPress: () => Alert.alert('About', 'Picala v1.0.0')
    },
  ];

  const userInitial = user?.email?.[0].toUpperCase() || 'P';
  const userName = user?.email?.split('@')[0] || 'User';

  if (!isAuthenticated) {
    return <ScreenContainer withScroll>
      <Text variant="h2" weight="bold">You are not logged in</Text>
      <Button title="Log In" onPress={() => router.push('/(auth)/login')} />
    </ScreenContainer>;
  }

  return (
    <ScreenContainer withScroll>
      <BaseCard style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text variant="h1" weight="bold" style={styles.avatarText}>{userInitial}</Text>
        </View>
        <Text variant="h2" weight="bold" style={styles.userName}>{userName}</Text>
        <Text variant="body" opacity={0.6}>{user?.email}</Text>

        <View style={styles.statsRow}>
          <StatItem label="Matches" value="12" />
          <StatItem label="Wins" value="8" />
          <StatItem label="Rank" value="Gold" />
        </View>
      </BaseCard>

      <View style={styles.menuSection}>
        <Text variant="h3" weight="bold" style={styles.sectionTitle}>Account Settings</Text>
        <BaseCard padding="xs">
          {MENU_ITEMS.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.menuItem,
                index < MENU_ITEMS.length - 1 && styles.menuDivider,
                pressed && { backgroundColor: '#F8FAFC' }
              ]}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.iconContainer}>
                  <IconSymbol name={item.icon as any} size={20} color={Colors.primary} />
                </View>
                <Text variant="body" weight="medium">{item.title}</Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color="#94A3B8" />
            </Pressable>
          ))}
        </BaseCard>
      </View>

      <View style={styles.actions}>
        <Button
          variant="secondary"
          title="Log Out"
          onPress={handleLogout}
          textStyle={{ color: Colors.status.error }}
          style={{ borderColor: Colors.status.error }}
        />
      </View>
    </ScreenContainer>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statItem}>
    <Text variant="h3" weight="bold" style={{ color: Colors.primary }}>{value}</Text>
    <Text variant="small" weight="medium" opacity={0.5}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingVertical: Spacing.xl,
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 40,
  },
  userName: {
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statItem: {
    alignItems: 'center',
  },
  menuSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FCE7F3', // Light pink background for icons
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  actions: {
    marginTop: Spacing.sm,
  },
});

export default ProfileScreen;
