import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/Text';
import { CustomButton } from '@/components';
import { BackgroundColors, TextColors, AccentColors } from '@/constants/Colors';

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', title: 'Edit Profile', subtitle: 'Change your info', icon: 'person' },
  { id: '2', title: 'Notifications', subtitle: 'Manage alerts', icon: 'bell' },
  { id: '3', title: 'Privacy', subtitle: 'Security settings', icon: 'lock' },
  { id: '4', title: 'Help & Support', subtitle: 'Get assistance', icon: 'help' },
  { id: '5', title: 'About', subtitle: 'App info', icon: 'info' },
];

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title" level="xl" color={TextColors.primary}>
          Profile
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text variant="title" level="xl" color={BackgroundColors.white}>
                JD
              </Text>
            </View>
            <Pressable style={({ pressed }) => [styles.editAvatarButton, pressed && { opacity: 0.8 }]}>
              <Text variant="caption" color={BackgroundColors.white}>
                Edit
              </Text>
            </Pressable>
          </View>

          <Text variant="title" level="lg" color={TextColors.primary} center>
            John Doe
          </Text>
          <Text variant="body" color={TextColors.secondary} center>
            john.doe@email.com
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text variant="title" level="lg" color={AccentColors.primary} strong>
                12
              </Text>
              <Text variant="caption" color={TextColors.secondary}>
                Matches
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="title" level="lg" color={AccentColors.primary} strong>
                8
              </Text>
              <Text variant="caption" color={TextColors.secondary}>
                Wins
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="title" level="lg" color={AccentColors.primary} strong>
                4.8
              </Text>
              <Text variant="caption" color={TextColors.secondary}>
                Rating
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text
            variant="caption"
            color={TextColors.secondary}
            style={styles.sectionTitle}
          >
            ACCOUNT
          </Text>
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.menuItem,
                  index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
                  pressed && { opacity: 0.8 }
                ]}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIcon}>
                    <Text variant="body" color={AccentColors.primary}>
                      {getIconEmoji(item.icon)}
                    </Text>
                  </View>
                  <View style={styles.menuText}>
                    <Text variant="body" color={TextColors.primary}>
                      {item.title}
                    </Text>
                    {item.subtitle && (
                      <Text variant="caption" color={TextColors.secondary}>
                        {item.subtitle}
                      </Text>
                    )}
                  </View>
                </View>
                <Text variant="body" color={TextColors.disabled}>
                  ›
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.logoutSection}>
          <CustomButton
            title="Log Out"
            onPress={() => { }}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

function getIconEmoji(icon: string): string {
  const emojis: Record<string, string> = {
    person: '👤',
    bell: '🔔',
    lock: '🔒',
    help: '❓',
    info: 'ℹ️',
  };
  return emojis[icon] || '•';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.light,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: BackgroundColors.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: BackgroundColors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AccentColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: AccentColors.alternative,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: BackgroundColors.elevated,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: BackgroundColors.elevated,
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BackgroundColors.light,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: BackgroundColors.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  logoutSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  logoutButton: {
    borderColor: AccentColors.primary,
  },
});

export default ProfileScreen;
