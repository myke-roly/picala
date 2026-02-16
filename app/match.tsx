import React from 'react';
import { View, StyleSheet, ScrollView, Share, Alert, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { Button, BaseCard, ScreenContainer } from '@/components/core';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { joinMatch } from '@/services/matches';

export default function MatchScreen() {
  const router = useRouter();
  const { matchId } = useLocalSearchParams();

  const handleJoinMatch = async () => {
    try {
      const success = await joinMatch(matchId as string || 'current-match-id');
      if (success) {
        Alert.alert('Success', 'You have joined the match!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to join match.');
    }
  };

  const handleShareMatch = async () => {
    try {
      await Share.share({
        message: 'Check out this match on Picala!',
        url: `https://picala.app/match/${matchId || 'id'}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share match.');
    }
  };

  return (
    <ScreenContainer withScroll>
      <View style={styles.navBar}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.navButton, pressed && { opacity: 0.7 }]}
        >
          <IconSymbol name="chevron.left" size={24} color={Colors.primary} />
        </Pressable>
        <Pressable
          onPress={handleShareMatch}
          style={({ pressed }) => [styles.navButton, pressed && { opacity: 0.7 }]}
        >
          <IconSymbol name="square.and.arrow.up" size={24} color={Colors.primary} />
        </Pressable>
      </View>

      <View style={styles.matchHero}>
        <View style={styles.teamSection}>
          <View style={styles.logoPlaceholder}>
            <Text variant="h2" weight="bold">B</Text>
          </View>
          <Text variant="body" weight="bold" center>Barcelona</Text>
        </View>

        <View style={styles.vsSection}>
          <Text variant="h3" weight="bold" opacity={0.2}>VS</Text>
          <View style={styles.timeBadge}>
            <Text variant="small" weight="bold" style={styles.timeText}>20:00</Text>
          </View>
        </View>

        <View style={styles.teamSection}>
          <View style={styles.logoPlaceholder}>
            <Text variant="h2" weight="bold">R</Text>
          </View>
          <Text variant="body" weight="bold" center>Real Madrid</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text variant="h3" weight="bold" style={styles.sectionTitle}>Match Information</Text>
        <BaseCard padding="md" style={styles.infoCard}>
          <InfoRow icon="mappin.and.ellipse" text="Camp Nou, Barcelona" />
          <InfoRow icon="calendar" text="Saturday, April 15, 2024" />
          <InfoRow icon="clock" text="20:00 - 22:00 (2 hours)" />
        </BaseCard>

        <Text variant="h3" weight="bold" style={styles.sectionTitle}>Player Availability</Text>
        <BaseCard padding="lg">
          <View style={styles.statsGrid}>
            <StatItem label="Players" value="8" total="11" />
            <StatItem label="Needed" value="3" />
            <StatItem label="Waitlist" value="0" />
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '73%' }]} />
          </View>
        </BaseCard>

        <Text variant="h3" weight="bold" style={styles.sectionTitle}>Rules & Requirements</Text>
        <BaseCard padding="md">
          <RuleItem text="11 players per team" />
          <RuleItem text="90 minutes duration" />
          <RuleItem text="Bring your own equipment" />
          <RuleItem text="Fair play required" />
        </BaseCard>

        <View style={styles.actions}>
          <Button
            variant="primary"
            title="Join Match"
            onPress={handleJoinMatch}
          />
          <Button
            variant="secondary"
            title="Contact Organizer"
            onPress={() => Alert.alert('Contact', 'Organizer contact details coming soon.')}
            style={{ marginTop: Spacing.md }}
          />
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScreenContainer>
  );
}

const InfoRow = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.infoRow}>
    <IconSymbol name={icon as any} size={20} color={Colors.primary} />
    <Text variant="body" style={styles.infoRowText}>{text}</Text>
  </View>
);

const StatItem = ({ label, value, total }: { label: string; value: string; total?: string }) => (
  <View style={styles.statItem}>
    <View style={styles.statValueContainer}>
      <Text variant="h3" weight="bold">{value}</Text>
      {total && <Text variant="caption" opacity={0.5}>/{total}</Text>}
    </View>
    <Text variant="small" opacity={0.6}>{label}</Text>
  </View>
);

const RuleItem = ({ text }: { text: string }) => (
  <View style={styles.ruleItem}>
    <IconSymbol name="checkmark.circle.fill" size={16} color={Colors.status.success} />
    <Text variant="body" style={styles.ruleItemText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  navButton: {
    padding: 8,
  },
  matchHero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  vsSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  infoCard: {
    gap: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRowText: {
    marginLeft: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleItemText: {
    marginLeft: 10,
  },
  actions: {
    marginTop: Spacing.xxl,
  },
});
