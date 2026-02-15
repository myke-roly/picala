import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/Text';
import { BackgroundColors, TextColors, AccentColors } from '@/constants/Colors';

interface Match {
  id: string;
  team1: { name: string; logo: string };
  team2: { name: string; logo: string };
  date: string;
  sport: string;
  status: 'upcoming' | 'live' | 'completed';
  score?: string;
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    team1: { name: 'DET Lions', logo: '' },
    team2: { name: 'KC Chiefs', logo: '' },
    date: 'Friday, Nov 24 - 9:00 PM',
    sport: 'Football',
    status: 'upcoming',
  },
  {
    id: '2',
    team1: { name: 'NY Giants', logo: '' },
    team2: { name: 'DAL Cowboys', logo: '' },
    date: 'Sunday, Nov 26 - 4:30 PM',
    sport: 'Football',
    status: 'upcoming',
  },
  {
    id: '3',
    team1: { name: 'LAL Lakers', logo: '' },
    team2: { name: 'GSW Warriors', logo: '' },
    date: 'Live Now',
    sport: 'Basketball',
    status: 'live',
    score: '98 - 102',
  },
  {
    id: '4',
    team1: { name: 'NYY Yankees', logo: '' },
    team2: { name: 'BOS Red Sox', logo: '' },
    date: 'Final',
    sport: 'Baseball',
    status: 'completed',
    score: '5 - 3',
  },
];

const MatchItem = ({ match }: { match: Match }) => {
  const statusColors = {
    upcoming: AccentColors.alternative,
    live: AccentColors.primary,
    completed: TextColors.disabled,
  };

  return (
    <Pressable style={({ pressed }) => [styles.matchCard, pressed && { opacity: 0.8 }]}>
      <View style={styles.matchHeader}>
        <Text variant="caption" color={TextColors.secondary}>
          {match.sport}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[match.status] },
          ]}
        >
          <Text variant="caption" color={BackgroundColors.white}>
            {match.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.teamInfo}>
          <View style={styles.teamLogoPlaceholder} />
          <Text variant="subtitle" strong>
            {match.team1.name}
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          {match.score && (
            <Text variant="title" color={AccentColors.primary} strong>
              {match.score}
            </Text>
          )}
          {!match.score && (
            <Text variant="caption" color={TextColors.secondary}>
              VS
            </Text>
          )}
        </View>

        <View style={styles.teamInfo}>
          <View style={styles.teamLogoPlaceholder} />
          <Text variant="subtitle" strong>
            {match.team2.name}
          </Text>
        </View>
      </View>

      <Text variant="caption" color={TextColors.secondary} style={styles.dateText}>
        {match.date}
      </Text>
    </Pressable>
  );
};

const MatchesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title" level="xl" color={TextColors.primary}>
          Matches
        </Text>
        <Text variant="body" color={TextColors.secondary}>
          Upcoming and live matches
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.filtersContainer}>
          <Pressable style={({ pressed }) => [styles.filterChip, pressed && { opacity: 0.8 }]}>
            <Text variant="caption" color={BackgroundColors.white}>
              All
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.filterChip, styles.filterChipInactive, pressed && { opacity: 0.8 }]}
          >
            <Text variant="caption" color={TextColors.secondary}>
              Football
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.filterChip, styles.filterChipInactive, pressed && { opacity: 0.8 }]}
          >
            <Text variant="caption" color={TextColors.secondary}>
              Basketball
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.filterChip, styles.filterChipInactive, pressed && { opacity: 0.8 }]}
          >
            <Text variant="caption" color={TextColors.secondary}>
              Baseball
            </Text>
          </Pressable>
        </View>

        <View style={styles.matchesList}>
          {MOCK_MATCHES.map(match => (
            <MatchItem key={match.id} match={match} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

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
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AccentColors.primary,
  },
  filterChipInactive: {
    backgroundColor: BackgroundColors.white,
    borderWidth: 1,
    borderColor: TextColors.disabled,
  },
  matchesList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  matchCard: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamInfo: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BackgroundColors.elevated,
    marginBottom: 8,
  },
  scoreContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dateText: {
    textAlign: 'center',
  },
});

export default MatchesScreen;
