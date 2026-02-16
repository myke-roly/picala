import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { BaseCard } from './BaseCard';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface MatchCardProps {
  team1: { name: string; logo: string };
  team2: { name: string; logo: string };
  date: string;
  location?: string;
  onPress?: () => void;
}

export function MatchCard({ team1, team2, date, location, onPress }: MatchCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <BaseCard style={styles.card}>
        <View style={styles.header}>
          <View style={styles.liveContainer}>
            <View style={styles.liveDot} />
            <Text variant="small" weight="bold" style={styles.liveText}>LIVE</Text>
          </View>
          <Text variant="caption" opacity={0.6}>{date}</Text>
        </View>

        <View style={styles.teamsContainer}>
          <View style={styles.team}>
            <View style={styles.logoPlaceholder}>
              <Text weight="bold" style={styles.logoInitial}>{team1.name[0]}</Text>
            </View>
            <Text variant="body" weight="semibold" center style={styles.teamName}>
              {team1.name}
            </Text>
          </View>

          <View style={styles.vsContainer}>
            <Text variant="h3" weight="bold" opacity={0.2}>VS</Text>
          </View>

          <View style={styles.team}>
            <View style={styles.logoPlaceholder}>
              <Text weight="bold" style={styles.logoInitial}>{team2.name[0]}</Text>
            </View>
            <Text variant="body" weight="semibold" center style={styles.teamName}>
              {team2.name}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <IconSymbol name="mappin.and.ellipse" size={14} color={Colors.primary} />
            <Text variant="small" style={styles.locationText}>
              {location || 'Main Stadium'}
            </Text>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text variant="small" weight="bold" style={styles.detailsText}>
              VIEW DETAILS
            </Text>
          </TouchableOpacity>
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.status.error,
    marginRight: 6,
  },
  liveText: {
    color: Colors.status.error,
    fontSize: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoInitial: {
    fontSize: 24,
    color: Colors.primary,
  },
  teamName: {
    fontSize: 14,
  },
  vsContainer: {
    paddingHorizontal: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    color: '#64748B',
  },
  detailsButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailsText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});
