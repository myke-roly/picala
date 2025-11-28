import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';
import { signOut } from '@/services/auth';
import { useRouter } from 'expo-router';
import { CustomButton, Text, GradientHeader, CategoryFilter, FeaturedCard, MatchCard } from '@/components';
import { BackgroundColors } from '@/constants/Colors';
import { getUpcomingMatch, Match } from '@/services/matches';
import { Share, Alert } from 'react-native';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'football', name: 'Football', icon: 'american-football' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball' },
  { id: 'baseball', name: 'Baseball', icon: 'baseball' },
  { id: 'volleyball', name: 'Volleyball', icon: 'tennisball' },
];

const HomeScreen = () => {
  const { user, isAuthenticated } = usePersistentAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState('all');

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleMatchPress = (matchId: string) => {
    router.push({
      pathname: '/match',
      params: { matchId },
    });
  };

  const handleInvite = async () => {
    try {
      await Share.share({
        message: 'Join me for a match on Picala! Download the app now.',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share invite.');
    }
  };

  // Mock data for matches
  const matches = [
    {
      id: '1',
      team1: { logo: '', name: 'DET lions' },
      team2: { logo: '', name: 'KC Chiefs' },
      date: 'Friday, Nov 24 - 9:00 PM',
      odds1: '+225',
      odds2: '-265',
    },
    {
      id: '2',
      team1: { logo: '', name: 'NY Giants' },
      team2: { logo: '', name: 'DAL Cowboys' },
      date: 'Sunday, Nov 26 - 4:30 PM',
      odds1: '+150',
      odds2: '-180',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <GradientHeader
          onInvite={handleInvite}
          onMenuPress={isAuthenticated ? handleLogout : handleLogin}
          userEmail={user?.email}
        />

        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryPress={setActiveCategory}
        />

        <FeaturedCard
          imageSource={require('@/assets/images/featured-player.png')}
          label="American football"
          title={`November\nbroadcast`}
          time="59:45"
        />

        <View style={styles.matchesList}>
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              odds1={match.odds1}
              odds2={match.odds2}
              onPress={() => handleMatchPress(match.id)}
            />
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
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  matchesList: {
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default HomeScreen;
