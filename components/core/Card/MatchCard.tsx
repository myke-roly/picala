import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

interface MatchCardProps {
  team1?: { name: string; logo?: string };
  team2?: { name: string; logo?: string };
  title?: string;
  date: string;
  time?: string;
  location?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export function MatchCard({
  team1,
  team2,
  title,
  date,
  time,
  location,
  onPress,
  style
}: MatchCardProps) {
  const colorScheme = useColorScheme() ?? 'light';

  // Default title if not provided, based on teams
  const displayTitle = title || (team1 && team2 ? `${team1.name} vs ${team2.name}` : 'Match Details');

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.container, style]}>
      <View style={[styles.card, { backgroundColor: Colors[colorScheme].card, borderColor: Colors[colorScheme].border }]}>
        <View style={styles.topSection}>
          <View style={styles.infoContainer}>
            <Text
              variant="caption"
              weight="bold"
              style={styles.dateText}
            >
              {date.toUpperCase()}
            </Text>
            <Text
              variant="h3"
              weight="bold"
              numberOfLines={1}
              style={[styles.matchTitle, { color: Colors[colorScheme].text.primary }]}
            >
              {displayTitle}
            </Text>
            <Text
              variant="small"
              style={{ color: Colors[colorScheme].text.secondary }}
            >
              {location || 'TBA'}
            </Text>
          </View>

          <View style={styles.teamsContainer}>
            {team1 && (
              <View style={[styles.teamAvatar, { backgroundColor: '#DBEAFE', zIndex: 2, borderColor: Colors[colorScheme].card }]}>
                {/* Placeholder for team logo */}
                <Text weight="bold" style={{ color: '#1E3A8A', fontSize: 10 }}>{team1.name[0]}</Text>
              </View>
            )}
            {team2 && (
              <View style={[styles.teamAvatar, { backgroundColor: '#FEE2E2', marginLeft: -8, zIndex: 1, borderColor: Colors[colorScheme].card }]}>
                {/* Placeholder for team logo */}
                <Text weight="bold" style={{ color: '#991B1B', fontSize: 10 }}>{team2.name[0]}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: Colors[colorScheme].border }]} />

        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <IconSymbol name="clock.fill" size={14} color={Colors[colorScheme].text.secondary} />
            <Text variant="small" weight="medium" style={[styles.timeText, { color: Colors[colorScheme].text.secondary }]}>
              {time || 'TBA'}
            </Text>
          </View>

          <TouchableOpacity style={[styles.viewButton, { backgroundColor: colorScheme === 'dark' ? '#FFFFFF' : '#0F172A' }]}>
            <Text variant="small" weight="semibold" style={{ color: colorScheme === 'dark' ? '#0F172A' : '#FFFFFF', fontSize: 10 }}>
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 260,
  },
  card: {
    borderRadius: Spacing.borderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    // Add shadow using platform specific styles if needed, mostly rely on border for minimalist look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  infoContainer: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  dateText: {
    color: Colors.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  matchTitle: {
    marginBottom: 2,
    fontSize: 16,
  },
  teamsContainer: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  teamAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    marginLeft: 0,
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
