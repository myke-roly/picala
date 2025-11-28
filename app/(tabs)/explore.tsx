import React, { FC } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, MatchCard } from '@/components';
import { getFeaturedMatches, Match } from '@/services/matches';
import { BackgroundColors, TextColors, AccentColors } from '@/constants';

export default function ExploreScreen() {
  const router = useRouter();

  const [featuredMatches, setFeaturedMatches] = React.useState<Match[]>([]);

  React.useEffect(() => {
    const loadMatches = async () => {
      const matches = await getFeaturedMatches();
      setFeaturedMatches(matches);
    };
    loadMatches();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover new matches and events</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Featured Matches</Text>
          <View style={styles.matchesContainer}>
            <ExploreContentList
              featuredMatches={featuredMatches}
              onPressItem={(match) => router.push({ pathname: '/match', params: { id: match.id } })} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const ExploreContentList: FC<{ featuredMatches: Match[]; onPressItem: (match: Match) => void }> = ({
  featuredMatches,
  onPressItem,
}) => {
  return (
    <>
      {featuredMatches.map((match) => (
        <MatchCard
          key={match.id}
          team1={match.team1}
          team2={match.team2}
          date={match.date}
          odds1={match.odds1 || '+100'} // Fallback for mock data
          odds2={match.odds2 || '-100'} // Fallback for mock data
          onPress={() => onPressItem(match)}
        />
      ))}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.light,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: TextColors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: TextColors.secondary,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c434e',
    marginBottom: 16,
  },
  matchesContainer: {
    gap: 16,
  },
});

